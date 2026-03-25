import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

// Initialize Stripe (will use environment variable)
const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") || "";
const STRIPE_API_VERSION = "2024-11-20.acacia";

const stripeRequest = async (endpoint: string, options: any = {}) => {
  const response = await fetch(`https://api.stripe.com/v1/${endpoint}`, {
    method: options.method || "POST",
    headers: {
      "Authorization": `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Stripe-Version": STRIPE_API_VERSION,
    },
    body: options.body ? new URLSearchParams(options.body).toString() : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Stripe API error: ${JSON.stringify(error)}`);
  }

  return response.json();
};

export const createConnectAccount = async (email: string, userId: string) => {
  try {
    // Create Stripe Connect Express account
    const account = await stripeRequest("accounts", {
      body: {
        type: "express",
        email,
        capabilities: {
          "card_payments": { requested: true },
          "transfers": { requested: true },
        },
        metadata: {
          user_id: userId,
        },
      },
    });

    return account;
  } catch (error) {
    console.error("Error creating Stripe Connect account:", error);
    throw error;
  }
};

export const createAccountLink = async (accountId: string, returnUrl: string, refreshUrl: string) => {
  try {
    const accountLink = await stripeRequest("account_links", {
      body: {
        account: accountId,
        return_url: returnUrl,
        refresh_url: refreshUrl,
        type: "account_onboarding",
      },
    });

    return accountLink;
  } catch (error) {
    console.error("Error creating account link:", error);
    throw error;
  }
};

export const createPaymentIntent = async (
  amount: number,
  currency: string,
  connectedAccountId: string,
  applicationFeeAmount: number = 0,
  metadata: any = {}
) => {
  try {
    const body: any = {
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      "payment_method_types[]": "card",
      "transfer_data[destination]": connectedAccountId,
    };

    // Add application fee if specified (platform commission)
    if (applicationFeeAmount > 0) {
      body["application_fee_amount"] = Math.round(applicationFeeAmount * 100);
    }

    // Add metadata
    Object.keys(metadata).forEach(key => {
      body[`metadata[${key}]`] = metadata[key];
    });

    const paymentIntent = await stripeRequest("payment_intents", { body });

    return paymentIntent;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

export const retrieveAccount = async (accountId: string) => {
  try {
    const response = await fetch(`https://api.stripe.com/v1/accounts/${accountId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${STRIPE_SECRET_KEY}`,
        "Stripe-Version": STRIPE_API_VERSION,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Stripe API error: ${JSON.stringify(error)}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error retrieving Stripe account:", error);
    throw error;
  }
};
