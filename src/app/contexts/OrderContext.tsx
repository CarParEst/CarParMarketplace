import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { Product } from '../data/mockData';
import { useNotifications } from './NotificationContext';

export type OrderStatus = 'pending' | 'accepted' | 'shipped' | 'declined' | 'completed';

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  paymentMethod: string;
  shippingMethod: string;
  declineReason?: string;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, declineReason?: string) => void;
  getBuyerOrders: (buyerId: string) => Order[];
  getSellerOrders: (sellerId: string) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, declineReason?: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status, declineReason } : order
      )
    );
  };

  const getBuyerOrders = (buyerId: string) => {
    return orders.filter((order) => order.buyerId === buyerId);
  };

  const getSellerOrders = (sellerId: string) => {
    return orders.filter((order) => order.sellerId === sellerId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        updateOrderStatus,
        getBuyerOrders,
        getSellerOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}