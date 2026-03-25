import { useState } from 'react';
import { Star, MapPin, Calendar, Package, Heart, Settings, ShoppingBag, CheckCircle, Truck, X, Store } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { mockProducts } from '../data/mockData';
import { useOrders, OrderStatus } from '../contexts/OrderContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { DeclineOrderDialog } from '../components/DeclineOrderDialog';
import { SellerOnboarding } from '../components/SellerOnboarding';
import { WelcomeGuide } from '../components/WelcomeGuide';
import { AccountMenu } from '../components/AccountMenu';
import { SettingsDialog } from '../components/SettingsDialog';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export function Profile() {
  const [activeTab, setActiveTab] = useState('listings');
  const [orderViewMode, setOrderViewMode] = useState<'buyer' | 'seller'>('buyer');
  const [declineDialogOrderId, setDeclineDialogOrderId] = useState<string | null>(null);
  const { orders, updateOrderStatus } = useOrders();
  const { user: authUser } = useAuth();

  // Mock current user ID - in real app, get from auth
  const currentUserId = 'seller1'; // Logged in as Maarika Tamm

  // Mock user data
  const user = {
    name: 'Maarika Tamm',
    rating: 4.8,
    totalReviews: 47,
    joinedDate: '2024-01-15',
    location: 'Tallinn, Eesti',
    bio: 'Autohuvilane ja varuosade müüja. Osta ja müü kindlalt!',
    totalListings: 8,
    totalSales: 32,
  };

  // Filter products by this seller
  const userListings = mockProducts.filter(p => p.seller.name === user.name);
  const favoriteListings = mockProducts.slice(0, 3); // Mock favorites

  // Filter orders
  const buyerOrders = orders.filter((order) => order.buyerId === currentUserId);
  const sellerOrders = orders.filter((order) => order.sellerId === currentUserId);
  const displayOrders = orderViewMode === 'buyer' ? buyerOrders : sellerOrders;

  const joinedDate = new Date(user.joinedDate);
  const monthNames = ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 
                       'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'];

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'declined':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'Ootel';
      case 'accepted':
        return 'Kinnitatud';
      case 'shipped':
        return 'Saadetud';
      case 'declined':
        return 'Tagasi lükatud';
      case 'completed':
        return 'Lõpetatud';
    }
  };

  const handleDeclineOrderWithReason = (orderId: string, reason: string) => {
    updateOrderStatus(orderId, 'declined', reason);
    toast.error('Tellimus tagasi lükatud');
    setDeclineDialogOrderId(null);
  };

  const handleMarkAsShipped = (orderId: string) => {
    updateOrderStatus(orderId, 'shipped');
    toast.success('Tellimus märgitud saadetud!');
  };

  const handleConfirmReceipt = (orderId: string) => {
    updateOrderStatus(orderId, 'completed');
    toast.success('Kauba kättesaamine kinnitatud! Tehing lõpetatud.');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Guide */}
        <WelcomeGuide />

        {/* Account Menu - Full Width */}
        <AccountMenu
          activeTab={activeTab}
          onTabChange={setActiveTab}
          listingsCount={userListings.length}
          ordersCount={buyerOrders.length + sellerOrders.length}
          favoritesCount={favoriteListings.length}
          reviewsCount={user.totalReviews}
          messagesCount={3}
        />

        {/* Profile Header - Only show when logged in */}
        {authUser && (
          <Card className="p-6 mb-6 mt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="size-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-3xl">
                {user.name.charAt(0)}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="font-bold text-2xl mb-1">{user.name}</h1>
                    <div className="flex items-center gap-4 text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Star className="size-4 mr-1 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{user.rating}</span>
                        <span className="mx-1">·</span>
                        <span className="text-sm">{user.totalReviews} arvustust</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{user.bio}</p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="size-4 mr-1" />
                    {user.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="size-4 mr-1" />
                    Liitus {monthNames[joinedDate.getMonth()]} {joinedDate.getFullYear()}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Package className="size-4 mr-1" />
                    {user.totalSales} müüki lõpetatud
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <p className="font-bold text-2xl text-[#0ABAB5]">{user.totalListings}</p>
                <p className="text-gray-600 text-sm">Aktiivseid kuulutusi</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-2xl text-[#0ABAB5]">{user.totalSales}</p>
                <p className="text-gray-600 text-sm">Kokku müüke</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-2xl text-[#0ABAB5]">{user.rating}</p>
                <p className="text-gray-600 text-sm">Hinnang</p>
              </div>
            </div>
          </Card>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-4">
            {activeTab === 'listings' && (
              <>
                {authUser ? (
                  <>
                    {userListings.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userListings.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    ) : (
                      <Card className="p-12 text-center">
                        <Package className="size-12 mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-500 text-lg mb-2">Aktiivseid kuulutusi pole</p>
                        <p className="text-gray-400 mb-4">Alusta müümist esimese toote postitamisega</p>
                        <Button>Postita kuulutus</Button>
                      </Card>
                    )}
                  </>
                ) : (
                  <Card className="p-12 text-center">
                    <Package className="size-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-500 text-lg mb-2">Logi sisse, et vaadata oma kuulutusi</p>
                    <p className="text-gray-400">Pead olema sisse logitud, et oma kuulutusi hallata</p>
                  </Card>
                )}
              </>
            )}

            {activeTab === 'orders' && (
              <>
                {authUser ? (
                  <>
                    <div className="mb-6">
                      <div className="flex gap-2">
                        <Button
                          variant={orderViewMode === 'buyer' ? 'default' : 'outline'}
                          onClick={() => setOrderViewMode('buyer')}
                          className={orderViewMode === 'buyer' ? 'bg-[#0ABAB5] hover:bg-[#0ABAB5]/90' : ''}
                        >
                          Minu ostud ({buyerOrders.length})
                        </Button>
                        <Button
                          variant={orderViewMode === 'seller' ? 'default' : 'outline'}
                          onClick={() => setOrderViewMode('seller')}
                          className={orderViewMode === 'seller' ? 'bg-[#0ABAB5] hover:bg-[#0ABAB5]/90' : ''}
                        >
                          Müügid ({sellerOrders.length})
                        </Button>
                      </div>
                    </div>

                    {displayOrders.length === 0 ? (
                      <Card className="p-12 text-center">
                        <ShoppingBag className="size-16 mx-auto text-muted-foreground mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Tellimusi pole</h2>
                        <p className="text-muted-foreground">
                          {orderViewMode === 'buyer'
                            ? 'Sul pole veel tellimusi. Alusta ostlemist!'
                            : 'Sul pole veel müügitellimusi.'}
                        </p>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {displayOrders.map((order) => (
                          <Card key={order.id} className="p-4 sm:p-6">
                            {/* Order Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b">
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Tellimus #{order.id.slice(-8)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(order.createdAt).toLocaleDateString('et-EE', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </p>
                                <p className="font-semibold mt-1">
                                  {orderViewMode === 'buyer' ? `Müüja: ${order.sellerName}` : `Ostja: ${order.buyerName}`}
                                </p>
                              </div>
                              <div className="flex flex-col items-start sm:items-end gap-2">
                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                    order.status
                                  )}`}
                                >
                                  {getStatusLabel(order.status)}
                                </span>
                                <span className="text-lg font-bold text-[#0ABAB5]">
                                  {order.total.toFixed(2)}€
                                </span>
                              </div>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-3 mb-4">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex gap-3">
                                  <ImageWithFallback
                                    src={item.product.imageUrl}
                                    alt={item.product.title}
                                    className="size-16 rounded-lg object-cover flex-shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold line-clamp-2 text-sm">
                                      {item.product.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      Kogus: {item.quantity}
                                    </p>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <p className="font-semibold">
                                      {(item.product.price * item.quantity).toFixed(2)}€
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Payment Method */}
                            <div className="mb-4 text-sm text-muted-foreground">
                              <div>Maksemeetod: {order.paymentMethod}</div>
                              <div>Saatmisviis: {order.shippingMethod}</div>
                            </div>

                            {/* Seller Actions for Accepted Orders */}
                            {orderViewMode === 'seller' && order.status === 'accepted' && (
                              <div className="flex gap-3">
                                <Button
                                  variant="outline"
                                  className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                                  onClick={() => setDeclineDialogOrderId(order.id)}
                                >
                                  <X className="size-4 mr-2" />
                                  Keeldu
                                </Button>
                                <Button
                                  className="flex-1 bg-[#0ABAB5] hover:bg-[#0ABAB5]/90"
                                  onClick={() => handleMarkAsShipped(order.id)}
                                >
                                  <Truck className="size-4 mr-2" />
                                  Märgi saadetud
                                </Button>
                              </div>
                            )}

                            {/* Buyer waiting for shipment */}
                            {orderViewMode === 'buyer' && order.status === 'accepted' && (
                              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                                <p className="text-sm text-green-900 dark:text-green-100">
                                  <strong>Ootan saatmist:</strong> Müüja valmistab tellimust ette. Sa saad kinnitada kättesaamise pärast saatmist.
                                </p>
                              </div>
                            )}

                            {/* Buyer Actions for Shipped Orders */}
                            {orderViewMode === 'buyer' && order.status === 'shipped' && (
                              <div className="space-y-3">
                                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
                                  <p className="text-sm text-purple-900 dark:text-purple-100">
                                    <strong>Kaup on saadetud!</strong> Palun kinnita kättesaamine pärast kauba vastuvõtmist ja kontrollimist.
                                  </p>
                                </div>
                                <Button
                                  className="w-full bg-[#0ABAB5] hover:bg-[#0ABAB5]/90"
                                  onClick={() => handleConfirmReceipt(order.id)}
                                >
                                  <CheckCircle className="size-4 mr-2" />
                                  Kinnita kättesaamine
                                </Button>
                              </div>
                            )}

                            {/* Seller waiting for buyer confirmation */}
                            {orderViewMode === 'seller' && order.status === 'shipped' && (
                              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
                                <p className="text-sm text-purple-900 dark:text-purple-100">
                                  <strong>Saadetud:</strong> Ootan ostja kinnitust, et kaup on kätte saadud.
                                </p>
                              </div>
                            )}

                            {/* Status Messages */}
                            {order.status === 'declined' && (
                              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                                <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-1">
                                  {orderViewMode === 'buyer'
                                    ? 'Müüja lükkas tellimuse tagasi'
                                    : 'Sa lükkasid selle tellimuse tagasi'}
                                </p>
                                {order.declineReason && (
                                  <p className="text-sm text-red-800 dark:text-red-200">
                                    Põhjus: {order.declineReason}
                                  </p>
                                )}
                              </div>
                            )}

                            {order.status === 'completed' && (
                              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                                <p className="text-sm text-blue-900 dark:text-blue-100">
                                  Tehing on lõpetatud!
                                </p>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Card className="p-12 text-center">
                    <ShoppingBag className="size-16 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-500 text-lg mb-2">Logi sisse, et vaadata oma tellimusi</p>
                    <p className="text-gray-400">Pead olema sisse logitud, et oma tellimusi hallata</p>
                  </Card>
                )}
              </>
            )}

            {activeTab === 'seller' && (
              <SellerOnboarding />
            )}

            {activeTab === 'favorites' && (
              <>
                {authUser ? (
                  <>
                    {favoriteListings.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favoriteListings.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    ) : (
                      <Card className="p-12 text-center">
                        <Heart className="size-12 mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-500 text-lg mb-2">Lemmikuid pole veel</p>
                        <p className="text-gray-400">Salvesta meeldivad tooted, et neid hiljem vaadata</p>
                      </Card>
                    )}
                  </>
                ) : (
                  <Card className="p-12 text-center">
                    <Heart className="size-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-500 text-lg mb-2">Logi sisse, et vaadata oma lemmikuid</p>
                    <p className="text-gray-400">Pead olema sisse logitud, et lemmikuid hallata</p>
                  </Card>
                )}
              </>
            )}

            {activeTab === 'reviews' && (
              <>
                {authUser ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="size-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white font-bold">
                            {String.fromCharCode(65 + i)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-semibold">Ostja {i}</p>
                                <div className="flex items-center text-sm text-gray-600">
                                  <div className="flex items-center mr-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className="size-3 fill-yellow-400 text-yellow-400"
                                      />
                                    ))}
                                  </div>
                                  <span>2 nädalat tagasi</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700">
                              Suurepärane müüja! Toode oli täpselt nii nagu kirjeldatud ja saadeti kiiresti. Kindlasti ostaksin uuesti.
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-12 text-center">
                    <Star className="size-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-500 text-lg mb-2">Logi sisse, et vaadata oma arvustusi</p>
                    <p className="text-gray-400">Pead olema sisse logitud, et arvustusi vaadata</p>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <DeclineOrderDialog
        orderId={declineDialogOrderId}
        onDecline={handleDeclineOrderWithReason}
        onClose={() => setDeclineDialogOrderId(null)}
      />

      <SettingsDialog
        open={activeTab === 'settings'}
        onClose={() => setActiveTab('listings')}
        userData={{
          name: user.name,
          email: 'maarika.tamm@email.ee',
          phone: '+372 5123 4567',
          location: user.location,
          bio: user.bio,
        }}
      />
    </div>
  );
}