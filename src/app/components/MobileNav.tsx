import { Link, useLocation } from 'react-router';
import { Home, Heart, MessageSquare, User, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export function MobileNav() {
  const location = useLocation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const navItems = [
    { path: '/', icon: Home, label: 'Avaleht' },
    { path: '/favorites', icon: Heart, label: 'Lemmikud' },
    { path: '/cart', icon: ShoppingCart, label: 'Ostukorv', badge: cartCount },
    { path: '/messages', icon: MessageSquare, label: 'Sõnumid' },
    { path: '/profile', icon: User, label: 'Profiil' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-40">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ path, icon: Icon, label, badge }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center flex-1 h-full relative ${
                isActive ? 'text-[#0ABAB5]' : 'text-muted-foreground'
              }`}
            >
              <Icon className="size-5" />
              <span className="text-xs mt-1">{label}</span>
              {badge && badge > 0 && (
                <span className="absolute top-2 right-1/4 bg-red-500 text-white text-xs rounded-full size-4 flex items-center justify-center">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
