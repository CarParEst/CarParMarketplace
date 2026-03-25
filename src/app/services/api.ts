import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-c9629957`;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${publicAnonKey}`,
};

// Seller API
export const sellerAPI = {
  createConnectAccount: async (email: string, userId: string) => {
    const response = await fetch(`${API_BASE_URL}/seller/create-connect-account`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, userId }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create connect account');
    }
    
    return response.json();
  },

  getAccountStatus: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/seller/account-status/${userId}`, {
      headers,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get account status');
    }
    
    return response.json();
  },
};

// Product API
export const productAPI = {
  createProduct: async (product: any) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers,
      body: JSON.stringify(product),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create product');
    }
    
    return response.json();
  },

  getAllProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      headers,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch products');
    }
    
    return response.json();
  },

  getProductById: async (productId: string) => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      headers,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch product');
    }
    
    return response.json();
  },
};

// Payment API
export const paymentAPI = {
  createPaymentIntent: async (items: any[], userId: string) => {
    const response = await fetch(`${API_BASE_URL}/payments/create-intent`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ items, userId }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create payment intent');
    }
    
    return response.json();
  },
};

// Order API
export const orderAPI = {
  createOrder: async (order: any) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(order),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create order');
    }
    
    return response.json();
  },

  getOrders: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/${userId}`, {
      headers,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch orders');
    }
    
    return response.json();
  },

  updateOrder: async (orderId: string, updates: any) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update order');
    }
    
    return response.json();
  },
};
