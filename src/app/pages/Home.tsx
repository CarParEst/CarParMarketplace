import { useState, useMemo, useRef, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { mockProducts, categories } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Header } from '../components/Header';
import { CarFilter, CarFilter as CarFilterType } from '../components/CarFilter';
import { ArrowUpDown, ChevronDown } from 'lucide-react';

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Kõik');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');
  const [carFilter, setCarFilter] = useState<CarFilterType | null>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    // Filter by category
    if (selectedCategory !== 'Kõik') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Filter by car compatibility
    if (carFilter) {
      filtered = filtered.filter((p) => {
        if (!p.compatibility) return false;
        
        const matchesMake = p.compatibility.make === carFilter.make;
        
        // If only make is selected, just check make
        if (!carFilter.model && !carFilter.year) {
          return matchesMake;
        }
        
        // If make and model are selected
        if (carFilter.model && !carFilter.year) {
          const matchesModel = p.compatibility.model === carFilter.model;
          return matchesMake && matchesModel;
        }
        
        // If all three are selected
        if (carFilter.model && carFilter.year) {
          const matchesModel = p.compatibility.model === carFilter.model;
          const matchesYear = 
            carFilter.year >= p.compatibility.yearFrom &&
            carFilter.year <= p.compatibility.yearTo;
          return matchesMake && matchesModel && matchesYear;
        }
        
        return false;
      });
    }

    // Sort products
    const sorted = [...filtered];
    if (sortBy === 'price-low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      sorted.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    }

    return sorted;
  }, [selectedCategory, searchQuery, sortBy, carFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
      />

      <div className="container mx-auto px-4 py-6">
        {/* Category Filter - Desktop only */}
        <div className="mb-6 hidden md:block">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="font-semibold text-lg text-[#0ABAB5]">Kategooriad</h2>
            <div className="relative">
              <ArrowUpDown className="absolute left-2 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
              <select
                className="pl-7 pr-2 py-1.5 border rounded-md bg-card text-xs sm:text-sm appearance-none cursor-pointer min-w-[100px] sm:min-w-[140px]"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="newest">Uusimad</option>
                <option value="price-low">Hind ↑</option>
                <option value="price-high">Hind ↓</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap ${
                  selectedCategory === category 
                    ? 'bg-[#0ABAB5] hover:bg-[#0ABAB5]/90' 
                    : ''
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Header with Categories and Sort */}
        <div className="mb-4 md:hidden">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-base text-[#0ABAB5]">Tooted</h2>
            <div className="relative">
              <ArrowUpDown className="absolute left-2 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
              <select
                className="pl-7 pr-2 py-1.5 border rounded-md bg-card text-xs appearance-none cursor-pointer min-w-[100px]"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="newest">Uusimad</option>
                <option value="price-low">Hind ↑</option>
                <option value="price-high">Hind ↓</option>
              </select>
            </div>
          </div>

          {/* Mobile Category Dropdown */}
          <div className="relative" ref={categoryDropdownRef}>
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="w-full flex items-center justify-between px-4 py-2.5 border rounded-lg bg-card hover:bg-muted transition-colors"
            >
              <span className="font-medium text-sm">Kategooriad: {selectedCategory}</span>
              <ChevronDown className={`size-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showCategoryDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-lg shadow-lg z-10 max-h-[300px] overflow-y-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategoryDropdown(false);
                    }}
                    className={`w-full px-4 py-3 text-left transition-colors ${
                      selectedCategory === category
                        ? 'bg-[#0ABAB5] text-white font-medium'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Car Filter */}
        <div className="mb-6">
          <CarFilter onFilterChange={setCarFilter} />
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'toode' : 'toodet'} leitud
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-2">Tooteid ei leitud</p>
            <p className="text-muted-foreground/60">Proovi muuta otsingut või filtreid</p>
          </div>
        )}
      </div>
    </div>
  );
}