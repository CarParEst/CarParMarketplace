import { Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { mockProducts } from '../data/mockData';
import { useFavorites } from '../contexts/FavoritesContext';
import { Link } from 'react-router';

export function Favorites() {
  const { favorites } = useFavorites();
  
  // Get actual favorite products based on the favorites set
  const favoriteProducts = mockProducts.filter((product) => 
    favorites.has(product.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="font-bold text-3xl mb-2">Minu lemmikud</h1>
          <p className="text-gray-600">
            {favoriteProducts.length} {favoriteProducts.length === 1 ? 'toode' : 'toodet'} salvestatud
          </p>
        </div>

        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Heart className="size-16 mx-auto text-gray-400 mb-4" />
            <h2 className="font-bold text-xl mb-2">Lemmikuid pole veel</h2>
            <p className="text-gray-500 mb-6">
              Alusta sirvimist ja salvesta meeldivad tooted südame ikoonile klõpsates
            </p>
            <Button asChild>
              <Link to="/">Sirvi turuplatsil</Link>
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}