import { useState } from 'react';
import { Link } from 'react-router';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Header } from '../components/Header';
import { MobileNav } from '../components/MobileNav';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useCart } from '../contexts/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { CartCheckoutDialog } from '../components/CartCheckoutDialog';

export function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const groupedBySeller = cartItems.reduce((acc, item) => {
    const sellerId = item.seller.id;
    if (!acc[sellerId]) {
      acc[sellerId] = {
        seller: item.seller,
        items: [],
      };
    }
    acc[sellerId].items.push(item);
    return acc;
  }, {} as Record<string, { seller: any; items: typeof cartItems }>);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Ostukorv</h1>

          {cartItems.length === 0 ? (
            <Card className="p-12 text-center">
              <ShoppingCart className="size-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Ostukorv on tühi</h2>
              <p className="text-muted-foreground mb-6">
                Lisa tooteid ostukorvi, et alustada ostlemist
              </p>
              <Button asChild className="bg-[#0ABAB5] hover:bg-[#0ABAB5]/90">
                <Link to="/">Sirvi tooteid</Link>
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              {Object.values(groupedBySeller).map(({ seller, items }) => (
                <Card key={seller.id} className="p-4 sm:p-6">
                  <div className="mb-4 pb-4 border-b">
                    <h3 className="font-semibold text-lg">Müüja: {seller.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {seller.rating} ★ ({seller.totalReviews} hinnangut)
                    </p>
                  </div>

                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <Link to={`/product/${item.id}`} className="flex-shrink-0">
                          <ImageWithFallback
                            src={item.imageUrl}
                            alt={item.title}
                            className="size-20 sm:size-24 rounded-lg object-cover"
                          />
                        </Link>

                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${item.id}`}>
                            <h4 className="font-semibold line-clamp-2 hover:text-[#0ABAB5] transition-colors">
                              {item.title}
                            </h4>
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.location}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center border rounded-lg">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2"
                              >
                                <Minus className="size-4" />
                              </Button>
                              <span className="px-3 text-sm font-medium">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2"
                              >
                                <Plus className="size-4" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="size-4 mr-1" />
                              Eemalda
                            </Button>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-lg text-[#0ABAB5]">
                            {item.price}€
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-muted-foreground">
                              Kokku: {(item.price * item.quantity).toFixed(2)}€
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}

              {/* Summary */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Kokku:</span>
                  <span className="text-2xl font-bold text-[#0ABAB5]">
                    {getCartTotal().toFixed(2)}€
                  </span>
                </div>
                <Button
                  className="w-full bg-[#0ABAB5] hover:bg-[#0ABAB5]/90"
                  size="lg"
                  onClick={() => setIsCheckoutOpen(true)}
                >
                  Jätka maksele
                </Button>
              </Card>
            </div>
          )}
        </div>
      </div>

      <MobileNav />
      {isCheckoutOpen && (
        <CartCheckoutDialog onClose={() => setIsCheckoutOpen(false)} />
      )}
    </div>
  );
}