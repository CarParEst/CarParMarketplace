import { Package, ShoppingBag, Heart, Star, Store, LogIn, LogOut, MessageSquare, Settings } from 'lucide-react';
import { Card } from './ui/card';
import { NotificationDropdown } from './NotificationDropdown';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { LoginDialog } from './LoginDialog';
import { Button } from './ui/button';
import { Link } from 'react-router';

interface AccountMenuProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  listingsCount: number;
  ordersCount: number;
  favoritesCount: number;
  reviewsCount: number;
  messagesCount?: number;
}

export function AccountMenu({
  activeTab,
  onTabChange,
  listingsCount,
  ordersCount,
  favoritesCount,
  reviewsCount,
  messagesCount,
}: AccountMenuProps) {
  const { user, logout } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const menuItems = [
    {
      id: 'listings',
      label: 'Minu kuulutused',
      icon: Package,
      count: user ? listingsCount : null,
      isLink: false,
    },
    {
      id: 'orders',
      label: 'Tellimused',
      icon: ShoppingBag,
      count: user ? ordersCount : null,
      isLink: false,
    },
    {
      id: 'seller',
      label: 'Müüja',
      icon: Store,
      count: null,
      isLink: false,
    },
    {
      id: 'favorites',
      label: 'Lemmikud',
      icon: Heart,
      count: user ? favoritesCount : null,
      isLink: false,
    },
    {
      id: 'reviews',
      label: 'Arvustused',
      icon: Star,
      count: user ? reviewsCount : null,
      isLink: false,
    },
    {
      id: 'settings',
      label: 'Seaded',
      icon: Settings,
      count: null,
      isLink: false,
    },
  ];

  // Add Messages only if user is logged in
  if (user) {
    menuItems.push({
      id: 'messages',
      label: 'Sõnumid',
      icon: MessageSquare,
      count: messagesCount || null,
      isLink: true,
      href: '/messages',
    });
  }

  return (
    <>
      <Card className="p-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Menu Items */}
          <div className="flex flex-wrap gap-2 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              // If it's a link item (Messages), render as Link
              if (item.isLink && item.href) {
                return (
                  <Link
                    key={item.id}
                    to={item.href}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg transition-colors hover:bg-muted text-foreground"
                  >
                    <Icon className="size-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.count !== null && item.count > 0 && (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              }

              // Regular tab button
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#0ABAB5] text-white'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  <Icon className="size-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.count !== null && (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-muted-foreground/10 text-muted-foreground'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Side - Notifications and Auth */}
          <div className="flex items-center gap-2">
            <NotificationDropdown />
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="gap-2"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Logi välja</span>
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => setShowLoginDialog(true)}
                className="bg-[#0ABAB5] hover:bg-[#0ABAB5]/90 text-white gap-2"
              >
                <LogIn className="size-4" />
                <span className="hidden sm:inline">Logi sisse</span>
              </Button>
            )}
          </div>
        </div>
      </Card>

      <LoginDialog open={showLoginDialog} onClose={() => setShowLoginDialog(false)} />
    </>
  );
}