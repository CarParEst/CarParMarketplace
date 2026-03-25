import { useState } from 'react';
import { useNavigate } from 'react-router';
import { X, CreditCard, Landmark, Package, MapPin, Truck } from 'lucide-react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../contexts/OrderContext';
import { useNotifications } from '../contexts/NotificationContext';
import { StripePaymentForm } from './StripePaymentForm';
import { toast } from 'sonner';

// Initialize Stripe with publishable key from environment variables
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Check if Stripe is configured
const isStripeConfigured = !!stripePublishableKey;

// Only show warning in development mode
if (!isStripeConfigured && import.meta.env.DEV) {
  console.warn('⚠️ Stripe not configured. Credit card payments will be disabled. Add VITE_STRIPE_PUBLISHABLE_KEY to enable.');
}

const stripePromise = isStripeConfigured ? loadStripe(stripePublishableKey) : null;

interface CartCheckoutDialogProps {
  onClose: () => void;
}

export function CartCheckoutDialog({ onClose }: CartCheckoutDialogProps) {
  const [selectedPayment, setSelectedPayment] = useState<'stripe' | 'bank' | null>(null);
  const [showStripeForm, setShowStripeForm] = useState(false);
  const [shippingMethods, setShippingMethods] = useState<Record<string, string>>({});
  const { cartItems, clearCart, getCartTotal } = useCart();
  const { createOrder } = useOrders();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const groupedBySeller = cartItems.reduce((acc, item) => {
    const sellerId = item.seller.id;
    if (!acc[sellerId]) {
      acc[sellerId] = {
        seller: item.seller,
        items: [],
        total: 0,
      };
    }
    acc[sellerId].items.push(item);
    acc[sellerId].total += item.price * item.quantity;
    return acc;
  }, {} as Record<string, { seller: any; items: typeof cartItems; total: number }>);

  const handleConfirmPurchase = () => {
    if (!selectedPayment) {
      toast.error('Palun vali maksemeetod');
      return;
    }

    // Check if all sellers have shipping method selected
    const allSellersHaveShipping = Object.keys(groupedBySeller).every(
      (sellerId) => shippingMethods[sellerId]
    );

    if (!allSellersHaveShipping) {
      toast.error('Palun vali saatmisviis kõikidele müüjatele');
      return;
    }

    // If Stripe is selected, show the payment form
    if (selectedPayment === 'stripe') {
      setShowStripeForm(true);
      return;
    }

    // For bank transfer, process immediately
    processOrder();
  };

  const processOrder = () => {
    // Create separate orders for each seller (auto-accepted)
    Object.values(groupedBySeller).forEach(({ seller, items, total }) => {
      const orderId = `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      createOrder({
        buyerId: 'seller1', // Logged in as Maarika Tamm
        buyerName: 'Maarika Tamm', // In real app, get from auth
        sellerId: seller.id,
        sellerName: seller.name,
        items: items.map((item) => ({
          product: item,
          quantity: item.quantity,
        })),
        total,
        status: 'accepted',
        paymentMethod: selectedPayment === 'stripe' ? 'Krediitkaart (Stripe)' : 'Pangaülekanne',
        shippingMethod: shippingMethods[seller.id],
      });

      // Send notification to seller
      addNotification({
        type: 'order',
        title: '🎉 Uus müük!',
        message: `Sul on uus tellimus ostjalt Maarika Tamm. Summa: ${total.toFixed(2)}. Palun valmista tellimus saatmiseks ette.`,
        orderId: orderId,
      });
    });

    clearCart();
    toast.success('Tellimused edukalt loodud ja kinnitatud!');
    onClose();
    navigate('/orders');
  };

  const handleStripeSuccess = () => {
    processOrder();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b p-4 sm:p-6 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold">
            {showStripeForm ? 'Maksa krediitkaardiga' : 'Maksmine'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="size-5" />
          </Button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {showStripeForm ? (
            /* Stripe Payment Form */
            <Elements stripe={stripePromise}>
              <StripePaymentForm
                amount={getCartTotal()}
                onSuccess={handleStripeSuccess}
                onCancel={() => setShowStripeForm(false)}
              />
            </Elements>
          ) : (
            <>
              {/* Order Summary by Seller */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Tellimuse kokkuvõte</h3>
                <div className="space-y-4">
                  {Object.values(groupedBySeller).map(({ seller, items, total }) => (
                    <Card key={seller.id} className="p-4">
                      <div className="mb-3">
                        <p className="font-semibold">Müüja: {seller.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {items.length} {items.length === 1 ? 'toode' : 'toodet'}
                        </p>
                      </div>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="line-clamp-1">
                              {item.title} x {item.quantity}
                            </span>
                            <span className="font-medium">
                              {(item.price * item.quantity).toFixed(2)}€
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t flex justify-between font-semibold">
                        <span>Vahesumma:</span>
                        <span className="text-[#0ABAB5]">{total.toFixed(2)}€</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Total */}
              <Card className="p-4 bg-muted/50">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Kokku tasuda:</span>
                  <span className="text-2xl font-bold text-[#0ABAB5]">
                    {getCartTotal().toFixed(2)}€
                  </span>
                </div>
              </Card>

              {/* Payment Methods */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Vali maksemeetod</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card
                    className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                      selectedPayment === 'stripe'
                        ? 'border-[#0ABAB5] border-2 bg-[#0ABAB5]/5'
                        : ''
                    }`}
                    onClick={() => {
                      setSelectedPayment('stripe');
                      setShowStripeForm(true);
                    }}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div
                        className={`p-4 rounded-full ${
                          selectedPayment === 'stripe'
                            ? 'bg-[#0ABAB5] text-white'
                            : 'bg-muted'
                        }`}
                      >
                        <CreditCard className="size-8" />
                      </div>
                      <div>
                        <p className="font-semibold">Krediitkaart</p>
                        <p className="text-sm text-muted-foreground">
                          Turvaline maksmine
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card
                    className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                      selectedPayment === 'bank'
                        ? 'border-[#0ABAB5] border-2 bg-[#0ABAB5]/5'
                        : ''
                    }`}
                    onClick={() => setSelectedPayment('bank')}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div
                        className={`p-4 rounded-full ${
                          selectedPayment === 'bank'
                            ? 'bg-[#0ABAB5] text-white'
                            : 'bg-muted'
                        }`}
                      >
                        <Landmark className="size-8" />
                      </div>
                      <div>
                        <p className="font-semibold">Pangaülekanne</p>
                        <p className="text-sm text-muted-foreground">
                          Otse pangast
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Shipping Methods */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Vali saatmisviis</h3>
                {Object.values(groupedBySeller).map(({ seller, items }) => {
                  const firstProduct = items[0];
                  const shippingOptions = firstProduct.shippingOptions;

                  return (
                    <div key={seller.id} className="mb-6">
                      <h4 className="font-medium mb-3">Müüja: {seller.name}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {shippingOptions.pickup && (
                          <label
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              shippingMethods[seller.id] === 'Pickup kohapeal'
                                ? 'border-[#0ABAB5] bg-[#0ABAB5]/5'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`shipping-${seller.id}`}
                              checked={shippingMethods[seller.id] === 'Pickup kohapeal'}
                              onChange={() =>
                                setShippingMethods({ ...shippingMethods, [seller.id]: 'Pickup kohapeal' })
                              }
                              className="size-4 mr-3 accent-[#0ABAB5]"
                            />
                            <MapPin className="size-5 mr-2 text-muted-foreground" />
                            <span className="font-medium">Pickup kohapeal</span>
                          </label>
                        )}

                        {shippingOptions.dpd && (
                          <label
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              shippingMethods[seller.id] === 'DPD'
                                ? 'border-[#0ABAB5] bg-[#0ABAB5]/5'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`shipping-${seller.id}`}
                              checked={shippingMethods[seller.id] === 'DPD'}
                              onChange={() =>
                                setShippingMethods({ ...shippingMethods, [seller.id]: 'DPD' })
                              }
                              className="size-4 mr-3 accent-[#0ABAB5]"
                            />
                            <Package className="size-5 mr-2 text-muted-foreground" />
                            <span className="font-medium">DPD</span>
                          </label>
                        )}

                        {shippingOptions.omniva && (
                          <label
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              shippingMethods[seller.id] === 'Omniva'
                                ? 'border-[#0ABAB5] bg-[#0ABAB5]/5'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`shipping-${seller.id}`}
                              checked={shippingMethods[seller.id] === 'Omniva'}
                              onChange={() =>
                                setShippingMethods({ ...shippingMethods, [seller.id]: 'Omniva' })
                              }
                              className="size-4 mr-3 accent-[#0ABAB5]"
                            />
                            <Package className="size-5 mr-2 text-muted-foreground" />
                            <span className="font-medium">Omniva</span>
                          </label>
                        )}

                        {shippingOptions.smartpost && (
                          <label
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              shippingMethods[seller.id] === 'Itella Smartpost'
                                ? 'border-[#0ABAB5] bg-[#0ABAB5]/5'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`shipping-${seller.id}`}
                              checked={shippingMethods[seller.id] === 'Itella Smartpost'}
                              onChange={() =>
                                setShippingMethods({ ...shippingMethods, [seller.id]: 'Itella Smartpost' })
                              }
                              className="size-4 mr-3 accent-[#0ABAB5]"
                            />
                            <Package className="size-5 mr-2 text-muted-foreground" />
                            <span className="font-medium">Itella Smartpost</span>
                          </label>
                        )}

                        {shippingOptions.sellerTransport && (
                          <label
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              shippingMethods[seller.id] === 'Müüja transport'
                                ? 'border-[#0ABAB5] bg-[#0ABAB5]/5'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`shipping-${seller.id}`}
                              checked={shippingMethods[seller.id] === 'Müüja transport'}
                              onChange={() =>
                                setShippingMethods({ ...shippingMethods, [seller.id]: 'Müüja transport' })
                              }
                              className="size-4 mr-3 accent-[#0ABAB5]"
                            />
                            <Truck className="size-5 mr-2 text-muted-foreground" />
                            <span className="font-medium">Müüja transport</span>
                          </label>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Info */}
              <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Märkus:</strong> Pärast tellimuse kinnitamist on tellimused automaatselt kinnitatud. Müüjad saavad vajaduse korral tellimused tagasi lükata ja lisada põhjuse. Sa saad tellimuste staatust jälgida \"Tellimused\" lehel.
                </p>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={onClose}
                >
                  Tühista
                </Button>
                <Button
                  className="flex-1 bg-[#0ABAB5] hover:bg-[#0ABAB5]/90"
                  onClick={handleConfirmPurchase}
                  disabled={!selectedPayment}
                >
                  Kinnita ost
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}