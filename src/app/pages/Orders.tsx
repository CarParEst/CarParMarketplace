import { useState } from 'react';
import { Package, Check, X, Clock, CheckCircle, Truck } from 'lucide-react';
import { Header } from '../components/Header';
import { MobileNav } from '../components/MobileNav';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useOrders, OrderStatus } from '../contexts/OrderContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { DeclineOrderDialog } from '../components/DeclineOrderDialog';
import { toast } from 'sonner';

export function Orders() {
  const { orders, updateOrderStatus } = useOrders();
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');
  const [declineDialogOrderId, setDeclineDialogOrderId] = useState<string | null>(null);
  
  // Mock current user ID - in real app, get from auth
  const currentUserId = 'seller1'; // Logged in as Maarika Tamm
  const currentUserName = 'Maarika Tamm';

  const buyerOrders = orders.filter((order) => order.buyerId === currentUserId);
  const sellerOrders = orders.filter((order) => order.sellerId === currentUserId);

  const displayOrders = activeTab === 'buyer' ? buyerOrders : sellerOrders;

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'declined':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'Ootel';
      case 'accepted':
        return 'Kinnitatud';
      case 'shipped':
        return 'Saadetud';
      case 'declined':
        return 'Tagasi lükatud';
      case 'completed':
        return 'Lõpetatud';
    }
  };

  const handleAcceptOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'accepted');
    toast.success('Tellimus vastu võetud!');
  };

  const handleDeclineOrderWithReason = (orderId: string, reason: string) => {
    updateOrderStatus(orderId, 'declined', reason);
    toast.error('Tellimus tagasi lükatud');
    setDeclineDialogOrderId(null);
  };

  const handleMarkAsShipped = (orderId: string) => {
    updateOrderStatus(orderId, 'shipped');
    toast.success('Tellimus märgitud saadetud!');
  };

  const handleConfirmReceipt = (orderId: string) => {
    updateOrderStatus(orderId, 'completed');
    toast.success('Kauba kättesaamine kinnitatud! Tehing lõpetatud.');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Tellimused</h1>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={activeTab === 'buyer' ? 'default' : 'outline'}
              onClick={() => setActiveTab('buyer')}
              className={activeTab === 'buyer' ? 'bg-[#0ABAB5] hover:bg-[#0ABAB5]/90' : ''}
            >
              Minu ostud
            </Button>
            <Button
              variant={activeTab === 'seller' ? 'default' : 'outline'}
              onClick={() => setActiveTab('seller')}
              className={activeTab === 'seller' ? 'bg-[#0ABAB5] hover:bg-[#0ABAB5]/90' : ''}
            >
              Müügid
            </Button>
          </div>

          {/* Orders List */}
          {displayOrders.length === 0 ? (
            <Card className="p-12 text-center">
              <Package className="size-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Tellimusi pole</h2>
              <p className="text-muted-foreground">
                {activeTab === 'buyer'
                  ? 'Sul pole veel tellimusi. Alusta ostlemist!'
                  : 'Sul pole veel müügitellimusi.'}
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {displayOrders.map((order) => (
                <Card key={order.id} className="p-4 sm:p-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Tellimus #{order.id.slice(-8)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString('et-EE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      <p className="font-semibold mt-1">
                        {activeTab === 'buyer' ? `Müüja: ${order.sellerName}` : `Ostja: ${order.buyerName}`}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                      <span className="text-lg font-bold text-[#0ABAB5]">
                        {order.total.toFixed(2)}€
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <ImageWithFallback
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          className="size-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold line-clamp-2 text-sm">
                            {item.product.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Kogus: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-semibold">
                            {(item.product.price * item.quantity).toFixed(2)}€
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payment Method */}
                  <div className="mb-4 text-sm text-muted-foreground">
                    <div>Maksemeetod: {order.paymentMethod}</div>
                    <div>Saatmisviis: {order.shippingMethod}</div>
                  </div>

                  {/* Seller Actions for Accepted Orders */}
                  {activeTab === 'seller' && order.status === 'accepted' && (
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        onClick={() => setDeclineDialogOrderId(order.id)}
                      >
                        <X className="size-4 mr-2" />
                        Keeldu
                      </Button>
                      <Button
                        className="flex-1 bg-[#0ABAB5] hover:bg-[#0ABAB5]/90"
                        onClick={() => handleMarkAsShipped(order.id)}
                      >
                        <Truck className="size-4 mr-2" />
                        Märgi saadetud
                      </Button>
                    </div>
                  )}

                  {/* Buyer waiting for shipment */}
                  {activeTab === 'buyer' && order.status === 'accepted' && (
                    <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                      <p className="text-sm text-green-900 dark:text-green-100">
                        <strong>Ootan saatmist:</strong> Müüja valmistab tellimust ette. Sa saad kinnitada kättesaamise pärast saatmist.
                      </p>
                    </div>
                  )}

                  {/* Buyer Actions for Shipped Orders */}
                  {activeTab === 'buyer' && order.status === 'shipped' && (
                    <div className="space-y-3">
                      <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
                        <p className="text-sm text-purple-900 dark:text-purple-100">
                          <strong>Kaup on saadetud!</strong> Palun kinnita kättesaamine pärast kauba vastuvõtmist ja kontrollimist.
                        </p>
                      </div>
                      <Button
                        className="w-full bg-[#0ABAB5] hover:bg-[#0ABAB5]/90"
                        onClick={() => handleConfirmReceipt(order.id)}
                      >
                        <CheckCircle className="size-4 mr-2" />
                        Kinnita kättesaamine
                      </Button>
                    </div>
                  )}

                  {/* Seller waiting for buyer confirmation */}
                  {activeTab === 'seller' && order.status === 'shipped' && (
                    <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
                      <p className="text-sm text-purple-900 dark:text-purple-100">
                        <strong>Saadetud:</strong> Ootan ostja kinnitust, et kaup on kätte saadud.
                      </p>
                    </div>
                  )}

                  {/* Status Messages */}
                  {order.status === 'declined' && (
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                      <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-1">
                        {activeTab === 'buyer'
                          ? 'Müüja lükkas tellimuse tagasi'
                          : 'Sa lükkasid selle tellimuse tagasi'}
                      </p>
                      {order.declineReason && (
                        <p className="text-sm text-red-800 dark:text-red-200">
                          Põhjus: {order.declineReason}
                        </p>
                      )}
                    </div>
                  )}

                  {order.status === 'completed' && (
                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                      <p className="text-sm text-blue-900 dark:text-blue-100">
                        Tehing on lõpetatud!
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <MobileNav />
      <DeclineOrderDialog
        orderId={declineDialogOrderId}
        onDecline={handleDeclineOrderWithReason}
        onClose={() => setDeclineDialogOrderId(null)}
      />
    </div>
  );
}