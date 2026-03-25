import { Link } from 'react-router';
import { Heart, MapPin } from 'lucide-react';
import { Product } from '../data/mockData';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useFavorites } from '../contexts/FavoritesContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isProductFavorite = isFavorite(product.id);

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

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg cursor-pointer group">
        <div className="relative aspect-[3/2] sm:aspect-square overflow-hidden bg-muted">
          <ImageWithFallback
            src={product.imageUrl}
            alt={product.title}
            className="size-full object-cover transition-transform group-hover:scale-105"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-1 right-1 sm:top-2 sm:right-2 size-6 sm:size-9 rounded-full bg-card/90 hover:bg-card p-0"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(product.id);
            }}
          >
            <Heart 
              className={`size-2.5 sm:size-4 ${isProductFavorite ? 'fill-[#0ABAB5] text-[#0ABAB5]' : ''}`} 
            />
          </Button>
          <Badge
            className={`absolute top-1 left-1 sm:top-2 sm:left-2 text-[9px] sm:text-xs px-1 py-0 sm:px-2 sm:py-0.5 ${conditionColors[product.condition]}`}
          >
            {conditionLabels[product.condition]}
          </Badge>
        </div>

        <div className="p-2 sm:p-4">
          <h3 className="font-semibold line-clamp-2 mb-1 sm:mb-2 text-xs sm:text-base leading-tight">{product.title}</h3>
          <div className="hidden sm:flex items-center text-muted-foreground text-sm mb-3">
            <MapPin className="size-3 mr-1" />
            <span className="truncate">{product.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-base sm:text-xl text-[#0ABAB5]">{product.price}€</span>
            <div className="hidden sm:flex items-center space-x-2 text-muted-foreground text-sm">
              <div className="flex items-center">
                <span className="font-medium">{product.seller.rating}</span>
                <span className="ml-1">★</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}