export type Language = 'et' | 'en';

export const translations = {
  et: {
    // Common
    common: {
      search: 'Otsi tooteid...',
      loading: 'Laen...',
      error: 'Viga',
      success: 'Õnnestus',
      cancel: 'Tühista',
      save: 'Salvesta',
      delete: 'Kustuta',
      edit: 'Muuda',
      close: 'Sulge',
      back: 'Tagasi',
      next: 'Edasi',
      confirm: 'Kinnita',
      yes: 'Jah',
      no: 'Ei',
      all: 'Kõik',
    },

    // Header
    header: {
      favorites: 'Lemmikud',
      messages: 'Sõnumid',
      profile: 'Profiil',
      cart: 'Ostukorv',
      login: 'Logi sisse',
      logout: 'Logi välja',
      notifications: 'Teated',
    },

    // Auth
    auth: {
      loginTitle: 'Logi sisse',
      loginDescription: 'Sisesta oma e-mail ja nimi, et kasutada rakendust',
      email: 'E-mail',
      name: 'Nimi',
      loginButton: 'Logi sisse',
      rememberMe: 'Jäta mind meelde',
      logoutConfirm: 'Kas oled kindel, et soovid välja logida?',
    },

    // Home
    home: {
      title: 'Leia parimad autoosad',
      subtitle: 'Osta ja müü autosid ja varuosi turvaliselt',
      featured: 'Esiletõstetud',
      viewAll: 'Vaata kõiki',
      noResults: 'Tulemusi ei leitud',
      noResultsDescription: 'Proovi muuta otsingufiltrit',
    },

    // Categories
    categories: {
      all: 'Kõik kategooriad',
      bodyParts: 'Kereosad',
      engineParts: 'Mootoriosad',
      completeEngines: 'Täismootrid',
      driveline: 'Jõuülekanne',
      suspensionSteering: 'Vedrustus ja rool',
      brakes: 'Pidurid',
      electrical: 'Elektrisüsteem',
      interior: 'Interjöör',
      wheelsTires: 'Veljed ja rehvid',
    },

    // Product
    product: {
      condition: 'Seisukord',
      location: 'Asukoht',
      seller: 'Müüja',
      rating: 'Hinnang',
      reviews: 'arvustust',
      description: 'Kirjeldus',
      shipping: 'Tarneviis',
      addToCart: 'Lisa ostukorvi',
      buyNow: 'Osta kohe',
      contactSeller: 'Kontakteeru müüjaga',
      share: 'Jaga',
      report: 'Raporteeri',
      similarItems: 'Sarnased tooted',
      shippingOptions: {
        pickup: 'Kohapeal',
        dpd: 'DPD pakiautomaat',
        omniva: 'Omniva pakiautomaat',
        itella: 'Itella Smartpost',
        sellerTransport: 'Müüja transport',
      },
    },

    // Cart
    cart: {
      title: 'Ostukorv',
      empty: 'Ostukorv on tühi',
      emptyDescription: 'Lisa tooteid, et alustada ostu',
      continueShopping: 'Jätka ostlemist',
      checkout: 'Mine kassasse',
      total: 'Kokku',
      subtotal: 'Vahesumma',
      shipping: 'Tarne',
      remove: 'Eemalda',
      quantity: 'Kogus',
      seller: 'Müüja',
    },

    // Checkout
    checkout: {
      title: 'Vormista tellimus',
      paymentMethod: 'Makseviis',
      cardNumber: 'Kaardi number',
      expiryDate: 'Kehtivusaeg',
      cvc: 'CVC',
      billingAddress: 'Arveaadress',
      placeOrder: 'Kinnita tellimus',
      processing: 'Töötlen...',
      orderSuccess: 'Tellimus edastatud!',
      orderError: 'Tellimuse esitamine ebaõnnestus',
      multiSellerNotice: 'Tellimus sisaldab tooteid {count} müüjalt',
      paymentSummary: 'Makse kokkuvõte',
    },

    // Orders
    orders: {
      title: 'Tellimused',
      myOrders: 'Minu ostud',
      mySales: 'Minu müügid',
      orderNumber: 'Tellimus',
      date: 'Kuupäev',
      buyer: 'Ostja',
      seller: 'Müüja',
      total: 'Summa',
      status: 'Olek',
      actions: 'Tegevused',
      viewDetails: 'Vaata detaile',
      
      // Order statuses
      statusPending: 'Ootel',
      statusAccepted: 'Kinnitatud',
      statusShipped: 'Saadetud',
      statusDeclined: 'Tagasi lükatud',
      statusCompleted: 'Lõpetatud',

      // Actions
      acceptOrder: 'Kinnita tellimus',
      declineOrder: 'Lükka tagasi',
      markAsShipped: 'Märgi saadetud',
      confirmReceipt: 'Kinnita kättesaamine',
      
      // Messages
      orderAccepted: 'Tellimus kinnitatud!',
      orderDeclined: 'Tellimus tagasi lükatud',
      orderShipped: 'Tellimus märgitud saadetud!',
      orderCompleted: 'Kauba kättesaamine kinnitatud! Tehing lõpetatud.',
      
      // Decline dialog
      declineTitle: 'Lükka tellimus tagasi',
      declineDescription: 'Palun selgita, miks lükkasite tellimuse tagasi',
      declineReason: 'Põhjus',
      declineReasonPlaceholder: 'Näiteks: Toode pole enam saadaval',
      declineButton: 'Lükka tagasi',
    },

    // Profile
    profile: {
      editProfile: 'Muuda profiili',
      joinedDate: 'Liitus {month} {year}',
      totalSales: 'müüki lõpetatud',
      activeListings: 'Aktiivseid kuulutusi',
      totalSalesCount: 'Kokku müüke',
      
      // Tabs
      tabListings: 'Minu kuulutused',
      tabOrders: 'Tellimused',
      tabSeller: 'Müüja',
      tabFavorites: 'Lemmikud',
      tabReviews: 'Arvustused',
      
      // Empty states
      noListings: 'Aktiivseid kuulutusi pole',
      noListingsDescription: 'Alusta müümist esimese toote postitamisega',
      postListing: 'Postita kuulutus',
      noFavorites: 'Lemmikuid pole veel',
      noFavoritesDescription: 'Salvesta meeldivad tooted, et neid hiljem vaadata',
      noReviews: 'Arvustusi pole veel',
      noReviewsDescription: 'Arvustused ilmuvad siia pärast esimest tehingut',
    },

    // Seller Onboarding
    seller: {
      becomeSellerTitle: 'Hakka Müüjaks',
      becomeSellerDescription: 'Alusta autoosade müümist CarPari kaudu',
      createAccount: 'Loo Müüjakonto',
      accountActive: 'Müüjakonto Aktiivne',
      accountActiveDescription: 'Teie Stripe konto on seadistatud ja valmis makseid vastu võtma',
      setupIncomplete: 'Seadistus Pooleli',
      setupIncompleteDescription: 'Teie Stripe konto nõuab täiendavat seadistust',
      continueSetup: 'Jätka Seadistust',
      loginRequired: 'Logi sisse müüjaks saamiseks',
      loginRequiredDescription: 'Pead olema sisse logitud, et luua müüjakonto',
      
      // Benefits
      benefitsTitle: 'Müüjana saate:',
      benefit1: 'Postitada piiramatul hulgal tooteid',
      benefit2: 'Vastu võtta turvalisi makseid Stripe kaudu',
      benefit3: 'Hallata oma tellimusi ja ostjaid',
      benefit4: 'Saada makseid otse oma pangakontole',
      platformFee: '* Platvorm võtab 5% teenustasu igast tehingust',
      
      // Account info
      accountId: 'Konto ID',
      paymentsEnabled: 'Maksed lubatud',
      completeSetup: 'Palun lõpetage oma Stripe konto seadistus, et hakata makseid vastu võtma.',
    },

    // Post Listing
    postListing: {
      title: 'Lisa uus kuulutus',
      productInfo: 'Toote andmed',
      productTitle: 'Pealkiri',
      productTitlePlaceholder: 'Näiteks: BMW E46 Esituled',
      category: 'Kategooria',
      selectCategory: 'Vali kategooria',
      price: 'Hind (€)',
      condition: 'Seisukord',
      selectCondition: 'Vali seisukord',
      conditionNew: 'Uus',
      conditionUsed: 'Kasutatud',
      conditionDamaged: 'Vigastatud',
      description: 'Kirjeldus',
      descriptionPlaceholder: 'Kirjelda toodet üksikasjalikult...',
      
      // Vehicle info
      vehicleInfo: 'Sõiduki info',
      make: 'Mark',
      selectMake: 'Vali mark',
      model: 'Mudel',
      modelPlaceholder: 'Näiteks: 320i',
      year: 'Aasta',
      yearPlaceholder: 'Näiteks: 2005',
      
      // Shipping
      shippingTitle: 'Tarneviisid',
      selectShipping: 'Vali vähemalt üks tarneviis',
      
      // Images
      imagesTitle: 'Pildid',
      uploadImages: 'Lae üles pildid (max 8)',
      
      // Actions
      publish: 'Avalda kuulutus',
      saveDraft: 'Salvesta mustand',
    },

    // Messages
    messages: {
      title: 'Sõnumid',
      noMessages: 'Sõnumeid pole',
      noMessagesDescription: 'Alusta vestlust müüjaga või ostjaga',
      typeMessage: 'Kirjuta sõnum...',
      send: 'Saada',
      online: 'Võrgus',
      offline: 'Väljas',
      typing: 'kirjutab...',
    },

    // Favorites
    favorites: {
      title: 'Lemmikud',
      empty: 'Lemmikuid pole veel',
      emptyDescription: 'Salvesta meeldivad tooted, et neid hiljem vaadata',
      addedToFavorites: 'Lisatud lemmikutesse',
      removedFromFavorites: 'Eemaldatud lemmikutest',
    },

    // Notifications
    notifications: {
      title: 'Teated',
      markAllRead: 'Märgi kõik loetuks',
      noNotifications: 'Teateid pole',
      newOrder: 'Uus tellimus',
      orderUpdate: 'Tellimuse uuendus',
      newMessage: 'Uus sõnum',
      paymentReceived: 'Makse vastu võetud',
    },

    // Filters
    filters: {
      title: 'Filtrid',
      clear: 'Tühjenda filtrid',
      apply: 'Rakenda filtrid',
      priceRange: 'Hinnavahemik',
      minPrice: 'Min hind',
      maxPrice: 'Max hind',
      condition: 'Seisukord',
      location: 'Asukoht',
      sortBy: 'Sorteeri',
      sortNewest: 'Uusimad',
      sortOldest: 'Vanimad',
      sortPriceLow: 'Hind: madalam enne',
      sortPriceHigh: 'Hind: kõrgem enne',
    },

    // Months
    months: {
      january: 'jaanuar',
      february: 'veebruar',
      march: 'märts',
      april: 'aprill',
      may: 'mai',
      june: 'juuni',
      july: 'juuli',
      august: 'august',
      september: 'september',
      october: 'oktoober',
      november: 'november',
      december: 'detsember',
    },

    // Errors
    errors: {
      generic: 'Midagi läks valesti. Palun proovi uuesti.',
      network: 'Võrguühenduse viga. Kontrolli ühendust.',
      notFound: 'Lehte ei leitud',
      unauthorized: 'Sul pole õigust sellele toimingule',
      serverError: 'Serveri viga. Palun proovi hiljem uuesti.',
    },
  },

  en: {
    // Common
    common: {
      search: 'Search products...',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
      all: 'All',
    },

    // Header
    header: {
      favorites: 'Favorites',
      messages: 'Messages',
      profile: 'Profile',
      cart: 'Cart',
      login: 'Log In',
      logout: 'Log Out',
      notifications: 'Notifications',
    },

    // Auth
    auth: {
      loginTitle: 'Log In',
      loginDescription: 'Enter your email and name to use the app',
      email: 'Email',
      name: 'Name',
      loginButton: 'Log In',
      rememberMe: 'Remember me',
      logoutConfirm: 'Are you sure you want to log out?',
    },

    // Home
    home: {
      title: 'Find the best car parts',
      subtitle: 'Buy and sell cars and spare parts safely',
      featured: 'Featured',
      viewAll: 'View All',
      noResults: 'No results found',
      noResultsDescription: 'Try changing your search filters',
    },

    // Categories
    categories: {
      all: 'All Categories',
      bodyParts: 'Body Parts',
      engineParts: 'Engine Parts',
      completeEngines: 'Complete Engines',
      driveline: 'Driveline',
      suspensionSteering: 'Suspension & Steering',
      brakes: 'Brakes',
      electrical: 'Electrical',
      interior: 'Interior',
      wheelsTires: 'Wheels & Tires',
    },

    // Product
    product: {
      condition: 'Condition',
      location: 'Location',
      seller: 'Seller',
      rating: 'Rating',
      reviews: 'reviews',
      description: 'Description',
      shipping: 'Shipping',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      contactSeller: 'Contact Seller',
      share: 'Share',
      report: 'Report',
      similarItems: 'Similar Items',
      shippingOptions: {
        pickup: 'Pickup Only',
        dpd: 'DPD Parcel Locker',
        omniva: 'Omniva Parcel Locker',
        itella: 'Itella Smartpost',
        sellerTransport: 'Seller Transport',
      },
    },

    // Cart
    cart: {
      title: 'Shopping Cart',
      empty: 'Cart is empty',
      emptyDescription: 'Add products to start shopping',
      continueShopping: 'Continue Shopping',
      checkout: 'Checkout',
      total: 'Total',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      remove: 'Remove',
      quantity: 'Quantity',
      seller: 'Seller',
    },

    // Checkout
    checkout: {
      title: 'Checkout',
      paymentMethod: 'Payment Method',
      cardNumber: 'Card Number',
      expiryDate: 'Expiry Date',
      cvc: 'CVC',
      billingAddress: 'Billing Address',
      placeOrder: 'Place Order',
      processing: 'Processing...',
      orderSuccess: 'Order placed successfully!',
      orderError: 'Failed to place order',
      multiSellerNotice: 'Order contains items from {count} sellers',
      paymentSummary: 'Payment Summary',
    },

    // Orders
    orders: {
      title: 'Orders',
      myOrders: 'My Purchases',
      mySales: 'My Sales',
      orderNumber: 'Order',
      date: 'Date',
      buyer: 'Buyer',
      seller: 'Seller',
      total: 'Total',
      status: 'Status',
      actions: 'Actions',
      viewDetails: 'View Details',
      
      // Order statuses
      statusPending: 'Pending',
      statusAccepted: 'Accepted',
      statusShipped: 'Shipped',
      statusDeclined: 'Declined',
      statusCompleted: 'Completed',

      // Actions
      acceptOrder: 'Accept Order',
      declineOrder: 'Decline',
      markAsShipped: 'Mark as Shipped',
      confirmReceipt: 'Confirm Receipt',
      
      // Messages
      orderAccepted: 'Order accepted!',
      orderDeclined: 'Order declined',
      orderShipped: 'Order marked as shipped!',
      orderCompleted: 'Receipt confirmed! Transaction completed.',
      
      // Decline dialog
      declineTitle: 'Decline Order',
      declineDescription: 'Please explain why you are declining this order',
      declineReason: 'Reason',
      declineReasonPlaceholder: 'E.g., Product no longer available',
      declineButton: 'Decline Order',
    },

    // Profile
    profile: {
      editProfile: 'Edit Profile',
      joinedDate: 'Joined {month} {year}',
      totalSales: 'sales completed',
      activeListings: 'Active Listings',
      totalSalesCount: 'Total Sales',
      
      // Tabs
      tabListings: 'My Listings',
      tabOrders: 'Orders',
      tabSeller: 'Seller',
      tabFavorites: 'Favorites',
      tabReviews: 'Reviews',
      
      // Empty states
      noListings: 'No active listings',
      noListingsDescription: 'Start selling by posting your first product',
      postListing: 'Post Listing',
      noFavorites: 'No favorites yet',
      noFavoritesDescription: 'Save products you like to view them later',
      noReviews: 'No reviews yet',
      noReviewsDescription: 'Reviews will appear here after your first transaction',
    },

    // Seller Onboarding
    seller: {
      becomeSellerTitle: 'Become a Seller',
      becomeSellerDescription: 'Start selling car parts through CarPar',
      createAccount: 'Create Seller Account',
      accountActive: 'Seller Account Active',
      accountActiveDescription: 'Your Stripe account is set up and ready to accept payments',
      setupIncomplete: 'Setup Incomplete',
      setupIncompleteDescription: 'Your Stripe account requires additional setup',
      continueSetup: 'Continue Setup',
      loginRequired: 'Log in to become a seller',
      loginRequiredDescription: 'You must be logged in to create a seller account',
      
      // Benefits
      benefitsTitle: 'As a seller you can:',
      benefit1: 'Post unlimited products',
      benefit2: 'Accept secure payments via Stripe',
      benefit3: 'Manage your orders and buyers',
      benefit4: 'Receive payments directly to your bank account',
      platformFee: '* Platform takes 5% service fee from each transaction',
      
      // Account info
      accountId: 'Account ID',
      paymentsEnabled: 'Payments Enabled',
      completeSetup: 'Please complete your Stripe account setup to start accepting payments.',
    },

    // Post Listing
    postListing: {
      title: 'Post New Listing',
      productInfo: 'Product Information',
      productTitle: 'Title',
      productTitlePlaceholder: 'E.g., BMW E46 Headlights',
      category: 'Category',
      selectCategory: 'Select Category',
      price: 'Price (€)',
      condition: 'Condition',
      selectCondition: 'Select Condition',
      conditionNew: 'New',
      conditionUsed: 'Used',
      conditionDamaged: 'Damaged',
      description: 'Description',
      descriptionPlaceholder: 'Describe the product in detail...',
      
      // Vehicle info
      vehicleInfo: 'Vehicle Information',
      make: 'Make',
      selectMake: 'Select Make',
      model: 'Model',
      modelPlaceholder: 'E.g., 320i',
      year: 'Year',
      yearPlaceholder: 'E.g., 2005',
      
      // Shipping
      shippingTitle: 'Shipping Options',
      selectShipping: 'Select at least one shipping option',
      
      // Images
      imagesTitle: 'Images',
      uploadImages: 'Upload Images (max 8)',
      
      // Actions
      publish: 'Publish Listing',
      saveDraft: 'Save Draft',
    },

    // Messages
    messages: {
      title: 'Messages',
      noMessages: 'No messages',
      noMessagesDescription: 'Start a conversation with a seller or buyer',
      typeMessage: 'Type a message...',
      send: 'Send',
      online: 'Online',
      offline: 'Offline',
      typing: 'typing...',
    },

    // Favorites
    favorites: {
      title: 'Favorites',
      empty: 'No favorites yet',
      emptyDescription: 'Save products you like to view them later',
      addedToFavorites: 'Added to favorites',
      removedFromFavorites: 'Removed from favorites',
    },

    // Notifications
    notifications: {
      title: 'Notifications',
      markAllRead: 'Mark all as read',
      noNotifications: 'No notifications',
      newOrder: 'New order',
      orderUpdate: 'Order update',
      newMessage: 'New message',
      paymentReceived: 'Payment received',
    },

    // Filters
    filters: {
      title: 'Filters',
      clear: 'Clear filters',
      apply: 'Apply filters',
      priceRange: 'Price Range',
      minPrice: 'Min price',
      maxPrice: 'Max price',
      condition: 'Condition',
      location: 'Location',
      sortBy: 'Sort by',
      sortNewest: 'Newest',
      sortOldest: 'Oldest',
      sortPriceLow: 'Price: Low to High',
      sortPriceHigh: 'Price: High to Low',
    },

    // Months
    months: {
      january: 'January',
      february: 'February',
      march: 'March',
      april: 'April',
      may: 'May',
      june: 'June',
      july: 'July',
      august: 'August',
      september: 'September',
      october: 'October',
      november: 'November',
      december: 'December',
    },

    // Errors
    errors: {
      generic: 'Something went wrong. Please try again.',
      network: 'Network error. Check your connection.',
      notFound: 'Page not found',
      unauthorized: 'You are not authorized for this action',
      serverError: 'Server error. Please try again later.',
    },
  },
};