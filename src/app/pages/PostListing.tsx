import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Upload, Truck, Package, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Header } from '../components/Header';
import { categories } from '../data/mockData';
import { toast } from 'sonner';

export function PostListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    condition: '',
    location: '',
    description: '',
    shippingOptions: {
      pickup: false,
      dpd: false,
      omniva: false,
      smartpost: false,
      sellerTransport: false,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.price || !formData.category || !formData.condition || !formData.location) {
      toast.error('Palun täida kõik kohustuslikud väljad');
      return;
    }

    // Validate at least one shipping option is selected
    const hasShippingOption = Object.values(formData.shippingOptions).some(value => value === true);
    if (!hasShippingOption) {
      toast.error('Palun vali vähemalt üks tarneviis');
      return;
    }

    // In a real app, this would send data to backend
    toast.success('Kuulutus edukalt postitatud!');
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/">
            <ArrowLeft className="size-4 mr-2" />
            Tagasi
          </Link>
        </Button>

        <Card className="p-6">
          <h1 className="font-bold text-2xl mb-6">Postita uus kuulutus</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Images */}
            <div>
              <Label htmlFor="images">Fotod *</Label>
              <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <Upload className="size-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600 mb-1">Klõpsa üleslaadimiseks või lohista siia</p>
                <p className="text-gray-400 text-sm">PNG, JPG või WEBP (max. 5MB)</p>
              </div>
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title">Pealkiri *</Label>
              <Input
                id="title"
                placeholder="nt. OEM esikate - 2015-2020 Ford Mustang"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-2"
                required
              />
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price">Hind (EUR) *</Label>
              <div className="relative mt-2">
                <Input
                  id="price"
                  type="number"
                  placeholder="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="pr-7"
                  min="0"
                  step="1"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
              </div>
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category">Kategooria *</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mt-2 w-full px-3 py-2 border rounded-lg bg-card"
                required
              >
                <option value="">Vali kategooria</option>
                {categories.filter(c => c !== 'Kõik').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition */}
            <div>
              <Label htmlFor="condition">Seisukord *</Label>
              <select
                id="condition"
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="mt-2 w-full px-3 py-2 border rounded-lg bg-card"
                required
              >
                <option value="">Vali seisukord</option>
                <option value="new">Uus</option>
                <option value="like-new">Nagu uus</option>
                <option value="good">Hea</option>
                <option value="fair">Rahuldav</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location">Asukoht *</Label>
              <Input
                id="location"
                placeholder="nt. Tallinn, Eesti"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-2"
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Kirjeldus</Label>
              <Textarea
                id="description"
                placeholder="Kirjelda oma toodet üksikasjalikult..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-2 min-h-32"
              />
              <p className="text-gray-500 text-sm mt-1">
                Kaasa võtta toote seisukord, omadused ja miks keegi peaks selle ostma.
              </p>
            </div>

            {/* Shipping Options */}
            <div>
              <Label className="text-base">Tarneviisid *</Label>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Vali vähemalt üks transpordivõimalus
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.shippingOptions.pickup
                      ? 'border-[#0ABAB5] bg-[#0ABAB5]/5'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.shippingOptions.pickup}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shippingOptions: { ...formData.shippingOptions, pickup: e.target.checked },
                      })
                    }
                    className="size-4 mr-3 accent-[#0ABAB5]"
                  />
                  <MapPin className="size-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">Pickup kohapeal</span>
                </label>

                <label
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.shippingOptions.dpd
                      ? 'border-[#0ABAB5] bg-[#0ABAB5]/5'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.shippingOptions.dpd}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shippingOptions: { ...formData.shippingOptions, dpd: e.target.checked },
                      })
                    }
                    className="size-4 mr-3 accent-[#0ABAB5]"
                  />
                  <Package className="size-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">DPD</span>
                </label>

                <label
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.shippingOptions.omniva
                      ? 'border-[#0ABAB5] bg-[#0ABAB5]/5'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.shippingOptions.omniva}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shippingOptions: { ...formData.shippingOptions, omniva: e.target.checked },
                      })
                    }
                    className="size-4 mr-3 accent-[#0ABAB5]"
                  />
                  <Package className="size-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">Omniva</span>
                </label>

                <label
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.shippingOptions.smartpost
                      ? 'border-[#0ABAB5] bg-[#0ABAB5]/5'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.shippingOptions.smartpost}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shippingOptions: { ...formData.shippingOptions, smartpost: e.target.checked },
                      })
                    }
                    className="size-4 mr-3 accent-[#0ABAB5]"
                  />
                  <Package className="size-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">Itella Smartpost</span>
                </label>

                <label
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.shippingOptions.sellerTransport
                      ? 'border-[#0ABAB5] bg-[#0ABAB5]/5'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.shippingOptions.sellerTransport}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shippingOptions: { ...formData.shippingOptions, sellerTransport: e.target.checked },
                      })
                    }
                    className="size-4 mr-3 accent-[#0ABAB5]"
                  />
                  <Truck className="size-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">Toon ise kohale</span>
                </label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" size="lg" className="flex-1">
                Postita kuulutus
              </Button>
              <Button type="button" variant="outline" size="lg" asChild>
                <Link to="/">Tühista</Link>
              </Button>
            </div>
          </form>
        </Card>

        <p className="text-gray-500 text-sm text-center mt-6">
          Kuulutuse postitamisega nõustud meie teenuse tingimuste ja privaatsuspoliitikaga.
        </p>
      </div>
    </div>
  );
}