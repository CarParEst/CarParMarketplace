import { useState } from 'react';
import { CreditCard, Building2, Check, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface PaymentMethod {
  id: string;
  type: 'stripe' | 'bank';
  stripeAccountId?: string;
  bankName?: string;
  accountNumber?: string;
  isVerified: boolean;
}

export function PaymentSettings() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    // Mock data - in production this would come from your backend
    {
      id: '1',
      type: 'stripe',
      stripeAccountId: 'acct_1234567890',
      isVerified: true,
    },
  ]);
  const [isAddingStripe, setIsAddingStripe] = useState(false);
  const [isAddingBank, setIsAddingBank] = useState(false);

  // Mock bank account form state
  const [bankForm, setBankForm] = useState({
    bankName: '',
    accountNumber: '',
    accountHolder: '',
  });

  const handleConnectStripe = async () => {
    setIsAddingStripe(true);

    // PRODUCTION SETUP:
    // 1. Create a Stripe Connect account link on your backend
    // 2. Redirect user to Stripe's onboarding flow
    // 3. Handle the return URL when user completes onboarding
    
    // Example backend call:
    // const response = await fetch('/api/stripe/create-account-link', {
    //   method: 'POST',
    // });
    // const { url } = await response.json();
    // window.location.href = url;

    // For this demo, we'll simulate a connection
    setTimeout(() => {
      const newMethod: PaymentMethod = {
        id: Date.now().toString(),
        type: 'stripe',
        stripeAccountId: `acct_${Math.random().toString(36).substr(2, 9)}`,
        isVerified: true,
      };
      setPaymentMethods([...paymentMethods, newMethod]);
      setIsAddingStripe(false);
      alert('Stripe konto edukalt ühendatud! (Demo)');
    }, 1500);
  };

  const handleAddBank = (e: React.FormEvent) => {
    e.preventDefault();
    
    // PRODUCTION: Send bank details to your backend for verification
    // Never store sensitive bank details directly in frontend code
    
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: 'bank',
      bankName: bankForm.bankName,
      accountNumber: '***' + bankForm.accountNumber.slice(-4),
      isVerified: false, // Would need verification in production
    };
    
    setPaymentMethods([...paymentMethods, newMethod]);
    setBankForm({ bankName: '', accountNumber: '', accountHolder: '' });
    setIsAddingBank(false);
  };

  const handleRemoveMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-lg mb-2">Maksemeetodid</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Halda, kuidas sa müügist raha saad
        </p>
      </div>

      {/* Existing Payment Methods */}
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {method.type === 'stripe' ? (
                  <div className="size-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <CreditCard className="size-5 text-purple-600" />
                  </div>
                ) : (
                  <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Building2 className="size-5 text-blue-600" />
                  </div>
                )}
                
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {method.type === 'stripe' ? 'Stripe konto' : method.bankName}
                    </p>
                    {method.isVerified && (
                      <span className="flex items-center text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                        <Check className="size-3 mr-1" />
                        Kinnitatud
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {method.type === 'stripe'
                      ? method.stripeAccountId
                      : method.accountNumber}
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveMethod(method.id)}
              >
                Eemalda
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add New Payment Method */}
      <div className="space-y-3">
        {!isAddingStripe && !isAddingBank && (
          <>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setIsAddingStripe(true)}
            >
              <CreditCard className="size-4 mr-2" />
              Ühenda Stripe konto
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setIsAddingBank(true)}
            >
              <Building2 className="size-4 mr-2" />
              Lisa pangakonto
            </Button>
          </>
        )}

        {/* Stripe Connection Flow */}
        {isAddingStripe && (
          <Card className="p-4 border-purple-200 bg-purple-50">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="size-5 text-purple-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm mb-1">Stripe Connect</p>
                <p className="text-sm text-gray-600">
                  Stripe võimaldab turvalist maksete vastuvõtmist. Sind suunatakse Stripe'i, 
                  et seadistada oma konto.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddingStripe(false)}
              >
                Tühista
              </Button>
              <Button
                size="sm"
                onClick={handleConnectStripe}
                disabled={isAddingStripe}
              >
                {isAddingStripe ? 'Ühendan...' : 'Jätka Stripe\'iga'}
              </Button>
            </div>
          </Card>
        )}

        {/* Bank Account Form */}
        {isAddingBank && (
          <Card className="p-4">
            <form onSubmit={handleAddBank} className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Panga nimi</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg bg-card text-sm"
                  placeholder="nt. SEB, Swedbank, LHV"
                  value={bankForm.bankName}
                  onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Kontonumber (IBAN)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg bg-card text-sm"
                  placeholder="EE123456789012345678"
                  value={bankForm.accountNumber}
                  onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Konto omanik</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg bg-card text-sm"
                  placeholder="Ees- ja perekonnanimi"
                  value={bankForm.accountHolder}
                  onChange={(e) => setBankForm({ ...bankForm, accountHolder: e.target.value })}
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsAddingBank(false);
                    setBankForm({ bankName: '', accountNumber: '', accountHolder: '' });
                  }}
                >
                  Tühista
                </Button>
                <Button type="submit" size="sm">
                  Lisa konto
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>

      {/* Info Box */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="size-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-1">Maksete kohta</p>
            <ul className="text-gray-600 space-y-1 text-xs">
              <li>• Stripe: 2.9% + €0.30 per tehing (kohene ülekanne)</li>
              <li>• Pangaülekanne: Tasuta, kuid ostja peab käsitsi maksma</li>
              <li>• Maksed kantakse üle 2-3 tööpäeva jooksul pärast tehingu kinnitamist</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
