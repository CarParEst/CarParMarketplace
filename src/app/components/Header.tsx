import { Link, useLocation } from 'react-router';
import { Search, Plus, User, Heart, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

export function Header({ searchQuery = '', onSearchChange }: HeaderProps) {
  const location = useLocation();
  const { getCartCount } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  const cartCount = getCartCount();

  // Define account-related pages where login/notifications should appear
  const accountPages = ['/profile', '/favorites', '/post'];
  const isAccountPage = accountPages.some(page => location.pathname.startsWith(page));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/logo.svg" 
              alt="CarPar Logo" 
              className="h-8 w-auto"
            />
            <span className="font-bold text-lg sm:text-xl text-[#0ABAB5]">CarPar</span>
          </Link>

          {location.pathname === '/' && (
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder={t.common.search}
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                />
              </div>
            </div>
          )}

          <nav className="flex items-center space-x-1 sm:space-x-2">
            <Button variant="ghost" size="sm" asChild className="hidden lg:flex">
              <Link to="/favorites">
                <Heart className="size-4 mr-2" />
                {t.header.favorites}
              </Link>
            </Button>
            <Button 
              size="sm"
              className="bg-[#0ABAB5] hover:bg-[#0ABAB5]/90 text-white p-2"
              asChild
            >
              <Link to="/post">
                <Plus className="size-4 sm:size-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="p-2">
              <Link to="/profile">
                <User className="size-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="relative p-2">
              <Link to="/cart">
                <ShoppingCart className="size-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full size-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>
          </nav>
        </div>

        {/* Mobile Search - Below header on home page */}
        {location.pathname === '/' && (
          <div className="md:hidden pb-3">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder={t.common.search}
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}