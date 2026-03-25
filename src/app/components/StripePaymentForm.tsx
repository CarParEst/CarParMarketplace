import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

interface StripePaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export function StripePaymentForm({ amount, onSuccess, onCancel }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError('Kaardi element puudub');
      setProcessing(false);
      return;
    }

    // In a real app, you would:
    // 1. Create a payment intent on your backend
    // 2. Confirm the payment with Stripe
    // For demo purposes, we'll simulate a successful payment

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate successful payment
      // In production: const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, { ... });
      
      // Mock validation - reject if card is invalid
      const { error: cardError } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (cardError) {
        setError(cardError.message || 'Makse ebaõnnestus');
        setProcessing(false);
        return;
      }

      // Success!
      onSuccess();
    } catch (err) {
      setError('Makse ebaõnnestus. Palun proovi uuesti.');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Kaardi andmed
        </label>
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-900">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
              hidePostalCode: false,
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Makseandmed on krüpteeritud ja turvaliselt töödeldud Stripe poolt
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 bg-[#0ABAB5] hover:bg-[#0ABAB5]/90"
        >
          {processing ? (
            <>
              <Loader2 className="size-4 mr-2 animate-spin" />
              Töötleb...
            </>
          ) : (
            `Maksa ${amount.toFixed(2)}€`
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={processing}
        >
          Tühista
        </Button>
      </div>

      {/* Test card info */}
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Test kaart (Demo režiim):
        </p>
        <p className="text-xs text-blue-800 dark:text-blue-200 font-mono">
          Kaardi number: 4242 4242 4242 4242
        </p>
        <p className="text-xs text-blue-800 dark:text-blue-200 font-mono">
          Aegumiskuupäev: Mis tahes tulevik
        </p>
        <p className="text-xs text-blue-800 dark:text-blue-200 font-mono">
          CVC: Mis tahes 3 numbrit
        </p>
        <p className="text-xs text-blue-800 dark:text-blue-200 font-mono">
          Postiindeks: Mis tahes 5 numbrit
        </p>
      </div>
    </form>
  );
}
