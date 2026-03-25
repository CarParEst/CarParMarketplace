import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { X, Sparkles, Globe, CreditCard, Store } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const WelcomeGuide: React.FC = () => {
  const [isVisible, setIsVisible] = useState(() => {
    const dismissed = localStorage.getItem('carpar_welcome_dismissed');
    return !dismissed;
  });

  const { t, language } = useLanguage();

  const handleDismiss = () => {
    localStorage.setItem('carpar_welcome_dismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Card className="mb-6 border-2 border-[#0ABAB5] bg-gradient-to-br from-[#0ABAB5]/5 to-transparent">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-[#0ABAB5]" />
            <CardTitle className="text-lg">
              {language === 'et' ? 'Uued Funktsioonid!' : 'New Features!'}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-6 w-6 p-0"
          >
            <X className="size-4" />
          </Button>
        </div>
        <CardDescription>
          {language === 'et' 
            ? 'CarPar on nüüd veel võimsam! Vaata, mis uut on lisatud:' 
            : 'CarPar is now even more powerful! Check out what\'s new:'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-[#0ABAB5]/10 p-2">
            <Globe className="size-4 text-[#0ABAB5]" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">
              {language === 'et' ? 'Mitmekeelne Tugi' : 'Multi-Language Support'}
            </h4>
            <p className="text-xs text-muted-foreground">
              {language === 'et' 
                ? 'Vaheta eesti ja inglise keele vahel. Leia keelevalik päises!' 
                : 'Switch between Estonian and English. Find the language selector in the header!'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-full bg-[#0ABAB5]/10 p-2">
            <Store className="size-4 text-[#0ABAB5]" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">
              {language === 'et' ? 'Hakka Müüjaks' : 'Become a Seller'}
            </h4>
            <p className="text-xs text-muted-foreground">
              {language === 'et' 
                ? 'Loo müüjakonto "Müüja" sakis ja alusta autoosade müümist!' 
                : 'Create a seller account in the "Seller" tab and start selling car parts!'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-full bg-[#0ABAB5]/10 p-2">
            <CreditCard className="size-4 text-[#0ABAB5]" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">
              {language === 'et' ? 'Turvalised Maksed' : 'Secure Payments'}
            </h4>
            <p className="text-xs text-muted-foreground">
              {language === 'et' 
                ? 'Stripe Connect integratsioon tagab turvalised maksed otse pangakontole.' 
                : 'Stripe Connect integration ensures secure payments directly to your bank account.'}
            </p>
          </div>
        </div>

        <Button
          onClick={handleDismiss}
          variant="outline"
          size="sm"
          className="w-full mt-2"
        >
          {language === 'et' ? 'Sain aru!' : 'Got it!'}
        </Button>
      </CardContent>
    </Card>
  );
};
