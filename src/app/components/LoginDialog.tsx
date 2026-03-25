import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LogIn } from 'lucide-react';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose }) => {
  const { login } = useAuth();
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true); // Default to checked

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      login(email, name, rememberMe);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t.auth.loginTitle}</DialogTitle>
          <DialogDescription>
            {t.auth.loginDescription}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t.auth.email}</Label>
            <Input
              id="email"
              type="email"
              placeholder="maarika@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">{t.auth.name}</Label>
            <Input
              id="name"
              type="text"
              placeholder="Maarika Tamm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="size-4 rounded border-gray-300 text-[#0ABAB5] focus:ring-[#0ABAB5] cursor-pointer"
            />
            <Label htmlFor="rememberMe" className="cursor-pointer select-none">
              {t.auth.rememberMe}
            </Label>
          </div>

          <Button type="submit" className="w-full bg-[#0ABAB5] hover:bg-[#0ABAB5]/90">
            <LogIn className="size-4 mr-2" />
            {t.auth.loginButton}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};