import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, Heart, MapPin, Star, Share2, ShoppingCart, Calendar, Eye } from 'lucide-react';
import { Header } from '../components/Header';
import { MobileNav } from '../components/MobileNav';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { mockProducts } from '../data/mockData';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';
import { ShareDialog } from '../components/ShareDialog';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = mockProducts.find((p) => p.id === id);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  
  const isProductFavorite = product ? isFavorite(product.id) : false;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="font-bold text-2xl mb-4">Toodet ei leitud</h2>
          <Link to="/">
            <Button>Tagasi turuplatsile</Button>
          </Link>
        </div>
      </div>
    );
  }

  const conditionColors = {
    new: 'bg-green-100 text-green-800',
    'like-new': 'bg-blue-100 text-blue-800',
    good: 'bg-yellow-100 text-yellow-800',
    fair: 'bg-orange-100 text-orange-800',
  };

  const conditionLabels = {
    new: 'Uus',
    'like-new': 'Nagu uus',
    good: 'Hea',
    fair: 'Rahuldav',
  };

  const postedDate = new Date(product.postedDate);
  const joinedDate = new Date(product.seller.joinedDate);

  const monthNames = ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 
                       'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/">
            <ArrowLeft className="size-4 mr-2" />
            Tagasi kuulutuste juurde
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="aspect-square bg-muted relative">
                <ImageWithFallback
                  src={product.imageUrl}
                  alt={product.title}
                  className="size-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className={conditionColors[product.condition]}>
                    {conditionLabels[product.condition]}
                  </Badge>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="mt-6 p-6">
              <h2 className="font-bold text-xl mb-4">Kirjeldus</h2>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              <Separator className="my-6" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Seisukord</p>
                  <p className="font-medium">
                    {conditionLabels[product.condition]}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Kategooria</p>
                  <p className="font-medium">{product.category}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Asukoht</p>
                  <p className="font-medium flex items-center">
                    <MapPin className="size-4 mr-1" />
                    {product.location}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Postitatud</p>
                  <p className="font-medium flex items-center">
                    <Calendar className="size-4 mr-1" />
                    {postedDate.getDate()}. {monthNames[postedDate.getMonth()]} {postedDate.getFullYear()}
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex items-center justify-between text-muted-foreground text-sm">
                <div className="flex items-center">
                  <Eye className="size-4 mr-2" />
                  <span>{product.views} vaatamist</span>
                </div>
                <div className="flex items-center">
                  <Heart className="size-4 mr-2" />
                  <span>{product.favorites} lemmikut</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Seller Info & Actions */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <div className="mb-6">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-bold text-3xl text-[#0ABAB5]">{product.price}€</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <Button 
                  className="w-full bg-[#0ABAB5] hover:bg-[#0ABAB5]/90" 
                  size="lg"
                  onClick={() => navigate('/messages', { 
                    state: { 
                      newConversation: {
                        sellerId: product.seller.id,
                        sellerName: product.seller.name,
                        productId: product.id,
                        productTitle: product.title
                      }
                    } 
                  })}
                >
                  Võta ühendust müüjaga
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg" 
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart className={`size-4 mr-2 ${isProductFavorite ? 'fill-[#0ABAB5] text-[#0ABAB5]' : ''}`} />
                  {isProductFavorite ? 'Eemalda lemmikutest' : 'Lisa lemmikutesse'}
                </Button>
                <Button variant="outline" className="w-full" size="lg" onClick={() => setShareDialogOpen(true)}>
                  <Share2 className="size-4 mr-2" />
                  Jaga
                </Button>
                <Button 
                  className="w-full bg-[#0ABAB5] hover:bg-[#0ABAB5]/90" 
                  size="lg"
                  onClick={() => {
                    addToCart(product);
                    toast.success('Toode lisatud ostukorvi');
                  }}
                >
                  <ShoppingCart className="size-4 mr-2" />
                  Lisa ostukorvi
                </Button>
              </div>

              <Separator className="my-6" />

              {/* Seller Info */}
              <div>
                <h3 className="font-bold text-lg mb-4">Müüja info</h3>
                <div className="flex items-start space-x-3 mb-4">
                  <div className="size-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {product.seller.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{product.seller.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Star className="size-3 mr-1 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{product.seller.rating}</span>
                      <span className="mx-1">·</span>
                      <span>{product.seller.totalReviews} arvustust</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="size-4 mr-2" />
                    <span>Liitus {monthNames[joinedDate.getMonth()]} {joinedDate.getFullYear()}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/profile">Vaata profiili</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <ShareDialog 
        open={shareDialogOpen} 
        onOpenChange={setShareDialogOpen} 
        title={product.title}
        url={`/product/${product.id}`}
        imageUrl={product.imageUrl}
      />
      
      <MobileNav />
    </div>
  );
}