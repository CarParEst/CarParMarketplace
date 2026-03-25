import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";
import * as stripe from "./stripe.tsx";

const app = new Hono();

// Supabase client helper
const getSupabaseClient = () => createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-c9629957/health", (c) => {
  return c.json({ status: "ok" });
});

// ============================================
// SELLER ONBOARDING ROUTES
// ============================================

// Create Stripe Connect account for seller
app.post("/make-server-c9629957/seller/create-connect-account", async (c) => {
  try {
    const { email, userId } = await c.req.json();

    if (!email || !userId) {
      return c.json({ error: "Email and userId are required" }, 400);
    }

    // Create Stripe Connect account
    const account = await stripe.createConnectAccount(email, userId);

    // Save account ID to database
    await kv.set(`user:${userId}:stripe_account`, account.id);

    // Create onboarding link
    const origin = c.req.header('origin') || 'http://localhost:5173';
    const accountLink = await stripe.createAccountLink(
      account.id,
      `${origin}/profile?seller_onboarding=success`,
      `${origin}/profile?seller_onboarding=refresh`
    );

    return c.json({
      accountId: account.id,
      onboardingUrl: accountLink.url,
    });
  } catch (error: any) {
    console.error("Error creating Connect account:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Get seller's Stripe account status
app.get("/make-server-c9629957/seller/account-status/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const accountId = await kv.get(`user:${userId}:stripe_account`);

    if (!accountId) {
      return c.json({ hasAccount: false });
    }

    const account = await stripe.retrieveAccount(accountId);

    return c.json({
      hasAccount: true,
      accountId: account.id,
      chargesEnabled: account.charges_enabled,
      detailsSubmitted: account.details_submitted,
    });
  } catch (error: any) {
    console.error("Error getting account status:", error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// PRODUCT ROUTES
// ============================================

// Create product listing
app.post("/make-server-c9629957/products", async (c) => {
  try {
    const product = await c.req.json();
    const productId = `product:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;
    
    await kv.set(productId, {
      ...product,
      id: productId,
      createdAt: new Date().toISOString(),
    });

    // Add to seller's products list
    const sellerProducts = await kv.get(`user:${product.sellerId}:products`) || [];
    sellerProducts.push(productId);
    await kv.set(`user:${product.sellerId}:products`, sellerProducts);

    return c.json({ success: true, productId });
  } catch (error: any) {
    console.error("Error creating product:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Get all products
app.get("/make-server-c9629957/products", async (c) => {
  try {
    const products = await kv.getByPrefix("product:");
    return c.json({ products });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Get product by ID
app.get("/make-server-c9629957/products/:id", async (c) => {
  try {
    const productId = c.req.param("id");
    const product = await kv.get(productId);
    
    if (!product) {
      return c.json({ error: "Product not found" }, 404);
    }

    return c.json({ product });
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// PAYMENT ROUTES
// ============================================

// Create payment intent for checkout
app.post("/make-server-c9629957/payments/create-intent", async (c) => {
  try {
    const { items, userId } = await c.req.json();

    // Group items by seller
    const sellerGroups: any = {};
    for (const item of items) {
      if (!sellerGroups[item.sellerId]) {
        sellerGroups[item.sellerId] = [];
      }
      sellerGroups[item.sellerId].push(item);
    }

    // Create payment intents for each seller
    const paymentIntents = [];
    for (const [sellerId, sellerItems] of Object.entries(sellerGroups)) {
      const items = sellerItems as any[];
      const totalAmount = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
      
      // Get seller's Stripe account
      const stripeAccountId = await kv.get(`user:${sellerId}:stripe_account`);
      
      if (!stripeAccountId) {
        throw new Error(`Seller ${sellerId} has not connected their Stripe account`);
      }

      // Calculate platform fee (5% commission)
      const platformFee = totalAmount * 0.05;

      const paymentIntent = await stripe.createPaymentIntent(
        totalAmount,
        "eur",
        stripeAccountId,
        platformFee,
        {
          buyer_id: userId,
          seller_id: sellerId,
          item_count: items.length.toString(),
        }
      );

      paymentIntents.push({
        sellerId,
        clientSecret: paymentIntent.client_secret,
        amount: totalAmount,
        items: items,
      });
    }

    return c.json({ paymentIntents });
  } catch (error: any) {
    console.error("Error creating payment intent:", error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// ORDER ROUTES
// ============================================

// Create order after payment
app.post("/make-server-c9629957/orders", async (c) => {
  try {
    const order = await c.req.json();
    const orderId = `order:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;
    
    const orderData = {
      ...order,
      id: orderId,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    await kv.set(orderId, orderData);

    // Add to buyer's orders
    const buyerOrders = await kv.get(`user:${order.buyerId}:orders`) || [];
    buyerOrders.push(orderId);
    await kv.set(`user:${order.buyerId}:orders`, buyerOrders);

    // Add to seller's orders
    const sellerOrders = await kv.get(`user:${order.sellerId}:orders`) || [];
    sellerOrders.push(orderId);
    await kv.set(`user:${order.sellerId}:orders`, sellerOrders);

    return c.json({ success: true, orderId, order: orderData });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Get orders for a user
app.get("/make-server-c9629957/orders/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const orderIds = await kv.get(`user:${userId}:orders`) || [];
    
    const orders = await Promise.all(
      orderIds.map((id: string) => kv.get(id))
    );

    return c.json({ orders: orders.filter(Boolean) });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Update order status
app.put("/make-server-c9629957/orders/:orderId", async (c) => {
  try {
    const orderId = c.req.param("orderId");
    const updates = await c.req.json();
    
    const order = await kv.get(orderId);
    if (!order) {
      return c.json({ error: "Order not found" }, 404);
    }

    const updatedOrder = {
      ...order,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(orderId, updatedOrder);

    return c.json({ success: true, order: updatedOrder });
  } catch (error: any) {
    console.error("Error updating order:", error);
    return c.json({ error: error.message }, 500);
  }
});

Deno.serve(app.fetch);