import { useState } from 'react';
import { 
  Facebook, 
  Instagram, 
  MessageCircle, 
  Mail, 
  Link2, 
  Check,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  url: string;
  imageUrl?: string;
}

export function ShareDialog({ open, onOpenChange, title, url, imageUrl }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `Vaata seda: ${title}`;
  const fullUrl = `${window.location.origin}${url}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText,
          url: fullUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2] hover:bg-[#1877F2]/90',
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
          '_blank',
          'width=600,height=400'
        );
      },
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90',
      action: async () => {
        // Instagram doesn't have a direct share URL, so we copy the link and try to open Instagram
        try {
          await navigator.clipboard.writeText(fullUrl);
          // Try to open Instagram app on mobile
          window.location.href = 'instagram://';
          // Fallback to Instagram website after a short delay
          setTimeout(() => {
            window.open('https://www.instagram.com/', '_blank');
          }, 500);
        } catch (err) {
          window.open('https://www.instagram.com/', '_blank');
        }
      },
    },
    {
      name: 'Messenger',
      icon: MessageCircle,
      color: 'bg-[#0084FF] hover:bg-[#0084FF]/90',
      action: () => {
        window.open(
          `fb-messenger://share?link=${encodeURIComponent(fullUrl)}`,
          '_blank'
        );
      },
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366] hover:bg-[#25D366]/90',
      action: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + fullUrl)}`,
          '_blank'
        );
      },
    },
    {
      name: 'SMS',
      icon: MessageCircle,
      color: 'bg-green-600 hover:bg-green-600/90',
      action: () => {
        window.open(`sms:?body=${encodeURIComponent(shareText + ' ' + fullUrl)}`);
      },
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-600/90',
      action: () => {
        window.open(
          `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + ' ' + fullUrl)}`
        );
      },
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Jaga kuulutust</DialogTitle>
          <DialogDescription>
            Vali platvorm, kus soovid seda jagada
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Native Share (Mobile) */}
          {navigator.share && (
            <Button
              onClick={handleNativeShare}
              className="w-full bg-[#0ABAB5] hover:bg-[#0ABAB5]/90"
              size="lg"
            >
              Jaga...
            </Button>
          )}

          {/* Share Options Grid */}
          <div className="grid grid-cols-3 gap-3">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={option.action}
                className={`${option.color} text-white p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all hover:scale-105`}
              >
                <option.icon className="size-6" />
                <span className="text-xs font-medium">{option.name}</span>
              </button>
            ))}
          </div>

          {/* Copy Link */}
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <div className="flex-1 truncate text-sm">{fullUrl}</div>
            <Button
              size="sm"
              onClick={handleCopyLink}
              className={copied ? 'bg-green-600 hover:bg-green-600' : ''}
            >
              {copied ? (
                <>
                  <Check className="size-4 mr-1" />
                  Kopeeritud
                </>
              ) : (
                <>
                  <Link2 className="size-4 mr-1" />
                  Kopeeri
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}