import { createContext, useContext, useState, ReactNode } from 'react';

export interface Notification {
  id: string;
  type: 'order' | 'message' | 'general';
  title: string;
  message: string;
  orderId?: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(7),
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    setNotifications((prev) => [newNotification, ...prev]);

    // Send email notification
    sendEmailNotification(notification);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

// Mock email service - in a real app, this would call a backend API
function sendEmailNotification(notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) {
  // Mock email sending
  console.log('📧 Email sent:', {
    to: 'seller@example.com', // In real app, get from user profile
    subject: notification.title,
    body: notification.message,
    timestamp: new Date().toISOString(),
  });

  // Simulating email API call
  // In production, you would call your backend:
  // await fetch('/api/send-email', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     to: sellerEmail,
  //     subject: notification.title,
  //     body: notification.message,
  //   }),
  // });
}
