import { useState } from 'react';
import { CreditCard, Building2, X, Lock, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Product } from '../data/mockData';

interface CheckoutDialogProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutDialog({ product, isOpen, onClose }: CheckoutDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'bank'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });

  const handleStripePayment = async () => {
    setIsProcessing(true);

    // PRODUCTION SETUP:
    // 1. Install @stripe/stripe-js and @stripe/react-stripe-js
    // 2. Create a payment intent on your backend:
    //    const response = await fetch('/api/create-payment-intent', {
    //      method: 'POST',
    //      body: JSON.stringify({ 
    //        amount: product.price * 100, // Stripe uses cents
    //        productId: product.id 
    //      }),
    //    });
    //    const { clientSecret } = await response.json();
    //
    // 3. Use Stripe Elements to handle card input and confirmation:
    //    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    //      payment_method: {
    //        card: elements.getElement(CardElement),
    //      },
    //    });
    //
    // 4. Handle success/error and update order status in your database

    // Demo simulation
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Makse edukas! Ostetud: ${product.title} - €${product.price}`);
      onClose();
    }, 2000);
  };

  const handleBankTransfer = () => {
    // Show bank transfer instructions
    alert(`Pangaülekande info:\n\nSaaja: ${product.seller.name}\nSumma: €${product.price}\nViide: ${product.id}\n\nPalun lisa makse viidale toote ID, et müüja saaks tellimust kinnitada.`);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'stripe') {
      handleStripePayment();
    } else {
      handleBankTransfer();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Maksa toote eest</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Product Summary */}
          <Card className="p-4 bg-gray-50">
            <div className="flex gap-4">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="size-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-sm line-clamp-2">{product.title}</p>
                <p className="text-xs text-muted-foreground">Müüja: {product.seller.name}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-[#0ABAB5]">€{product.price}</p>
              </div>
            </div>
          </Card>

          {/* Payment Method Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Vali maksemeetod</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                  paymentMethod === 'stripe'
                    ? 'border-[#0ABAB5] bg-[#0ABAB5]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setPaymentMethod('stripe')}
              >
                <CreditCard className="size-6" />
                <span className="text-sm font-medium">Kaart (Stripe)</span>
                <span className="text-xs text-muted-foreground">Kohene</span>
              </button>

              <button
                type="button"
                className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                  paymentMethod === 'bank'
                    ? 'border-[#0ABAB5] bg-[#0ABAB5]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setPaymentMethod('bank')}
              >
                <Building2 className="size-6" />
                <span className="text-sm font-medium">Pangaülekanne</span>
                <span className="text-xs text-muted-foreground">1-2 päeva</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {paymentMethod === 'stripe' && (
              <>
                {/* Card Details */}
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Kaardi number</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Kehtivus</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="MM/AA"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">CVC</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="123"
                        value={cardDetails.cvc}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Kaardi omanik</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="Ees- ja perekonnanimi"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <Lock className="size-4 text-green-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-green-700">
                    Sinu makse on kaitstud Stripe'i poolt. Kaardi andmeid ei salvestata meie serveris.
                  </p>
                </div>
              </>
            )}

            {paymentMethod === 'bank' && (
              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex gap-3">
                  <AlertCircle className="size-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-2">Pangaülekande juhised</p>
                    <p className="text-gray-600 mb-3">
                      Pärast kinnitamist näidatakse sulle müüja pangakonto detailid. 
                      Palun täida makse 24 tunni jooksul.
                    </p>
                    <p className="text-xs text-gray-500">
                      Märkus: Toode broneeritakse sinu jaoks 24 tunniks
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Total and Submit */}
            <div className="pt-4 border-t space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Toote hind</span>
                <span className="font-medium">€{product.price}</span>
              </div>
              {paymentMethod === 'stripe' && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Tehingu tasu</span>
                  <span>€{(product.price * 0.029 + 0.30).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-lg font-bold pt-2 border-t">
                <span>Kokku</span>
                <span className="text-[#0ABAB5]">
                  €{paymentMethod === 'stripe' 
                    ? (product.price + product.price * 0.029 + 0.30).toFixed(2)
                    : product.price}
                </span>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isProcessing}
                >
                  Tühista
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Töötlen...' : paymentMethod === 'stripe' ? 'Maksa nüüd' : 'Kinnita tellimus'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
