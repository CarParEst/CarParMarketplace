import { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface DeclineOrderDialogProps {
  orderId: string | null;
  onClose: () => void;
  onDecline: (orderId: string, reason: string) => void;
}

const declineReasons = [
  { value: 'already_sold', label: 'Toode on juba müüdud' },
  { value: 'sold_elsewhere', label: 'Müüdud mujal (teine platvorm/koht)' },
  { value: 'item_issue', label: 'Tootega on probleem/ei ole saadaval' },
  { value: 'price_error', label: 'Hinna viga kuulutuses' },
  { value: 'buyer_issue', label: 'Probleem ostjaga' },
  { value: 'other', label: 'Muu põhjus' },
];

export function DeclineOrderDialog({ orderId, onClose, onDecline }: DeclineOrderDialogProps) {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  if (!orderId) return null;

  const handleConfirm = () => {
    if (!selectedReason) {
      return;
    }
    
    const reasonLabel = declineReasons.find(r => r.value === selectedReason)?.label || selectedReason;
    const fullReason = additionalDetails 
      ? `${reasonLabel}: ${additionalDetails}`
      : reasonLabel;
    
    onDecline(orderId, fullReason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertCircle className="size-5 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-bold">Tellimuse tagasilükkamine</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="size-5" />
          </Button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Warning */}
          <Card className="p-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-900 dark:text-amber-100">
              <strong>Tähelepanu:</strong> Tellimuse tagasilükkamine teavitab ostjat, et tellimust ei saa täita. Palun vali põhjus, mis kirjeldab kõige paremini olukorda.
            </p>
          </Card>

          {/* Decline Reasons */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Miks sa lükkad tellimuse tagasi?
            </Label>
            <div className="space-y-2">
              {declineReasons.map((reason) => (
                <label
                  key={reason.value}
                  className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-muted/50 ${
                    selectedReason === reason.value
                      ? 'border-[#0ABAB5] bg-[#0ABAB5]/5'
                      : 'border-border'
                  }`}
                >
                  <input
                    type="radio"
                    name="decline-reason"
                    value={reason.value}
                    checked={selectedReason === reason.value}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="mt-1 size-4 text-[#0ABAB5] focus:ring-[#0ABAB5]"
                  />
                  <span className="flex-1 text-sm font-medium">{reason.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          {selectedReason && (
            <div>
              <Label htmlFor="additional-details" className="text-base font-semibold mb-2 block">
                Lisainfo (valikuline)
              </Label>
              <Textarea
                id="additional-details"
                placeholder="Kirjelda täpsemalt, kui soovid..."
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Ostja näeb seda põhjust oma tellimuste lehel.
              </p>
            </div>
          )}

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
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              onClick={handleConfirm}
              disabled={!selectedReason}
            >
              Kinnita tagasilükkamine
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}