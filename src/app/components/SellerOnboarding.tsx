import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Store, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { sellerAPI } from '../services/api';

export const SellerOnboarding: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [accountStatus, setAccountStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      checkAccountStatus();
    }
  }, [user]);

  const checkAccountStatus = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      const status = await sellerAPI.getAccountStatus(user.id);
      setAccountStatus(status);
    } catch (err: any) {
      console.error('Error checking account status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBecomeSeller = async () => {
    if (!user?.email || !user?.id) {
      setError('Palun logige sisse, et müüjaks saada');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const result = await sellerAPI.createConnectAccount(user.email, user.id);
      
      // Redirect to Stripe onboarding
      window.location.href = result.onboardingUrl;
    } catch (err: any) {
      console.error('Error creating seller account:', err);
      setError(err.message || 'Müüjakonto loomine ebaõnnestus');
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center space-y-4">
            <Store className="size-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold mb-2">{t.seller.loginRequired}</h3>
              <p className="text-sm text-muted-foreground">
                {t.seller.loginRequiredDescription}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading && !accountStatus) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="size-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (accountStatus?.hasAccount && accountStatus?.chargesEnabled) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-green-500" />
            <CardTitle>{t.seller.accountActive}</CardTitle>
          </div>
          <CardDescription>
            {t.seller.accountActiveDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t.seller.accountId}:</span>
              <span className="font-mono text-xs">{accountStatus.accountId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t.seller.paymentsEnabled}:</span>
              <CheckCircle2 className="size-4 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (accountStatus?.hasAccount && !accountStatus?.chargesEnabled) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <XCircle className="size-5 text-orange-500" />
            <CardTitle>{t.seller.setupIncomplete}</CardTitle>
          </div>
          <CardDescription>
            {t.seller.setupIncompleteDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              {t.seller.completeSetup}
            </AlertDescription>
          </Alert>
          <Button onClick={handleBecomeSeller} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {t.common.loading}
              </>
            ) : (
              t.seller.continueSetup
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Store className="size-5 text-primary" />
          <CardTitle>{t.seller.becomeSellerTitle}</CardTitle>
        </div>
        <CardDescription>
          {t.seller.becomeSellerDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>{t.seller.benefitsTitle}</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>{t.seller.benefit1}</li>
            <li>{t.seller.benefit2}</li>
            <li>{t.seller.benefit3}</li>
            <li>{t.seller.benefit4}</li>
          </ul>
          <p className="mt-4 text-xs">
            {t.seller.platformFee}
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button 
          onClick={handleBecomeSeller} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {t.common.loading}
            </>
          ) : (
            <>
              <Store className="size-4" />
              {t.seller.createAccount}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};