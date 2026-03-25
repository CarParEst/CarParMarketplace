export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  location: string;
  imageUrl: string;
  description: string;
  seller: {
    id: string;
    name: string;
    rating: number;
    totalReviews: number;
    joinedDate: string;
  };
  postedDate: string;
  views: number;
  favorites: number;
  shippingOptions: {
    pickup: boolean;
    dpd: boolean;
    omniva: boolean;
    smartpost: boolean;
    sellerTransport: boolean;
  };
  compatibility?: {
    make: string;
    model: string;
    yearFrom: number;
    yearTo: number;
  };
}

export const categories = [
  'Kõik',
  'Kereosad',
  'Mootoriosad',
  'Komplektmootorid',
  'Jõuülekanne',
  'Vedrustus ja roolisüsteem',
  'Pidurid',
  'Elektrisüsteem',
  'Salongivarustus',
  'Veljed ja rehvid',
];

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'OEM esikate - 2015-2020 Ford Mustang',
    price: 245,
    category: 'Kereosad',
    condition: 'good',
    location: 'Tallinn, Eesti',
    imageUrl: 'https://images.unsplash.com/photo-1638890701759-b2d8130a2b28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBob29kJTIwYm9keSUyMHBhbmVsfGVufDF8fHx8MTc3Mjg2MDE3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Originaal Ford esikate heas seisukorras. Väiksed kriimustused, kuid mõlke pole. Sobib ideaalselt 2015-2020 Mustang mudelitele. Värv on Race Red. Suurepärane asendus kahjustatud katele.',
    seller: {
      id: 'seller1',
      name: 'Maarika Tamm',
      rating: 4.8,
      totalReviews: 47,
      joinedDate: '2024-01-15',
    },
    postedDate: '2026-03-05',
    views: 234,
    favorites: 18,
    shippingOptions: {
      pickup: true,
      dpd: true,
      omniva: true,
      smartpost: true,
      sellerTransport: false,
    },
    compatibility: {
      make: 'Ford',
      model: 'Mustang',
      yearFrom: 2015,
      yearTo: 2020,
    },
  },
  {
    id: '2',
    title: 'Komplektmootor LS3 V8 - 6.2L 430HP',
    price: 4850,
    category: 'Komplektmootorid',
    condition: 'like-new',
    location: 'Tartu, Eesti',
    imageUrl: 'https://images.unsplash.com/photo-1642351376726-a96985803ee8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBtb3RvcnxlbnwxfHx8fDE3NzI4NjAxODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'GM LS3 6.2L V8 mootor vaid 15k kilomeetriga. Toodab 430HP. Komplektis kõik tarvikud, ECU ja juhtmestik. Ideaalne mootorite vahetamiseks või taastusprojektideks.',
    seller: {
      id: 'seller2',
      name: 'Jüri Kask',
      rating: 4.9,
      totalReviews: 93,
      joinedDate: '2023-08-20',
    },
    postedDate: '2026-03-06',
    views: 567,
    favorites: 45,
    shippingOptions: {
      pickup: true,
      dpd: true,
      omniva: true,
      smartpost: true,
      sellerTransport: false,
    },
  },
  {
    id: '3',
    title: 'Recaro võidusõiduistmed - Paar, must nahk',
    price: 1320,
    category: 'Salongivarustus',
    condition: 'like-new',
    location: 'Pärnu, Eesti',
    imageUrl: 'https://images.unsplash.com/photo-1760688965950-e8dcca426544?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzZWF0JTIwbGVhdGhlciUyMGludGVyaW9yfGVufDF8fHx8MTc3Mjg2MDE4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Kvaliteetsed Recaro kaussistmed suurepärases seisukorras. Must nahk punase õmblusega. Külgkinnitusega ühilduv. Suurepärane nimmetugi. Universaalne sobivus kohandatud raudadega.',
    seller: {
      id: 'seller3',
      name: 'Katrin Mägi',
      rating: 4.7,
      totalReviews: 28,
      joinedDate: '2024-11-10',
    },
    postedDate: '2026-03-04',
    views: 189,
    favorites: 22,
    shippingOptions: {
      pickup: true,
      dpd: true,
      omniva: true,
      smartpost: true,
      sellerTransport: false,
    },
  },
  {
    id: '4',
    title: 'Käsikäigukast - Honda K20 6-käik',
    price: 825,
    category: 'Jõuülekanne',
    condition: 'good',
    location: 'Narva, Eesti',
    imageUrl: 'https://images.unsplash.com/photo-1771402629439-8fc1c7547784?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFuc21pc3Npb24lMjBnZWFyYm94JTIwYXV0b21vdGl2ZXxlbnwxfHx8fDE3NzI4NjAxODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Honda K20 6-käiguline käsikäigukast 2006 Civic Si-st. Lülitub sujuvalt läbi kõikide käikude. Umbes 85k km läbisõit. Kaasas hooratas ja survekorv. Suurepärane K-seeria vahetusteks.',
    seller: {
      id: 'seller4',
      name: 'Peeter Saar',
      rating: 5.0,
      totalReviews: 15,
      joinedDate: '2025-02-28',
    },
    postedDate: '2026-03-06',
    views: 412,
    favorites: 56,
    shippingOptions: {
      pickup: true,
      dpd: true,
      omniva: true,
      smartpost: true,
      sellerTransport: false,
    },
    compatibility: {
      make: 'Honda',
      model: 'Civic',
      yearFrom: 2002,
      yearTo: 2011,
    },
  },
  {
    id: '5',
    title: 'Reguleeritav vedrustuskomplekt - BC Racing BR',
    price: 1200,
    category: 'Vedrustus ja roolisüsteem',
    condition: 'like-new',
    location: 'Viljandi, Eesti',
    imageUrl: 'https://images.unsplash.com/photo-1760836395865-0c20fff2aefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzdXNwZW5zaW9uJTIwY29pbG92ZXJ8ZW58MXx8fHwxNzcyODYwMTgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'BC Racing BR coilover komplekt reguleeritava summutusega. Kasutatud vaid 5k km. Kõrgus ja kompressioon/tagasilöök reguleeritav. Sobib 2013-2018 Subaru BRZ/Toyota 86. Võidusõiduks valmis.',
    seller: {
      id: 'seller5',
      name: 'Andrus Kalda',
      rating: 4.6,
      totalReviews: 34,
      joinedDate: '2024-06-12',
    },
    postedDate: '2026-03-03',
    views: 321,
    favorites: 38,
    shippingOptions: {
      pickup: true,
      dpd: true,
      omniva: true,
      smartpost: true,
      sellerTransport: false,
    },
    compatibility: {
      make: 'Subaru',
      model: 'BRZ',
      yearFrom: 2013,
      yearTo: 2018,
    },
  },
  {
    id: '6',
    title: 'Brembo pidurikomplekt - 6-kolvine esipidur',
    price: 1800,
    category: 'Pidurid',
    condition: 'like-new',
    location: 'Tallinn, Eesti',
    imageUrl: 'https://images.unsplash.com/photo-1750019487267-47568f388dfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFrZSUyMGNhbGlwZXIlMjBkaXNjfGVufDF8fHx8MTc3Mjg2MDE4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Brembo GT 6-kolvine esipiduri komplekt 15" soontega ketastega. Punased pidursuportid. Sobib BMW M3 (E90/E92). Vähe kasutatud, suurepärane pidurdusvõimsus. Kaasas terasest piduritorud ja klotsid.',
    seller: {
      id: 'seller6',
      name: 'Martin Lepp',
      rating: 4.8,
      totalReviews: 67,
      joinedDate: '2023-11-05',
    },
    postedDate: '2026-03-07',
    views: 445,
    favorites: 62,
    shippingOptions: {
      pickup: true,
      dpd: true,
      omniva: true,
      smartpost: true,
      sellerTransport: false,
    },
    compatibility: {
      make: 'BMW',
      model: 'M3',
      yearFrom: 2008,
      yearTo: 2013,
    },
  },
  {
    id: '7',
    title: 'BBS LM veljed 18x9.5 - Komplekt 4 tk',
    price: 3500,
    category: 'Veljed ja rehvid',
    condition: 'good',
    location: 'Rakvere, Eesti',
    imageUrl: 'https://images.unsplash.com/photo-1629818365729-35cc73f90d64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB3aGVlbHMlMjBhbGxveSUyMHJpbXN8ZW58MXx8fHwxNzcyODYwMTgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Autentsed BBS LM sepistatud veljed 18x9.5 ET22. Kuldsed keskmed poleeritud servadega. Väike äärekivi kriimustus kahel veljel. 5x120 poltmuster. Ideaalne BMW või Euro projektidele. Rehve ei kaasne.',
    seller: {
      id: 'seller7',
      name: 'Liisa Org',
      rating: 4.9,
      totalReviews: 82,
      joinedDate: '2024-03-18',
    },
    postedDate: '2026-03-07',
    views: 656,
    favorites: 129,
    shippingOptions: {
      pickup: true,
      dpd: true,
      omniva: true,
      smartpost: true,
      sellerTransport: false,
    },
  },
  {
    id: '8',
    title: 'Garrett GTX3576R turbokompressor',
    price: 1295,
    category: 'Mootoriosad',
    condition: 'new',
    location: 'Tartu, Eesti',
    imageUrl: 'https://images.unsplash.com/photo-1661303942176-3ec45ed186eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJib2NoYXJnZXIlMjBib29zdCUyMGVuZ2luZXxlbnwxfHx8fDE3NzI4NjAxODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Uus Garrett GTX3576R Gen II turbo. Toetab 500-650HP. Kuullaagriga CHRA. T3 sisendflants, 4" V-band väljund. Paigaldamata, kaasas kogu riistvara ja tihendid. Ideaalne tänavaautodele.',
    seller: {
      id: 'seller8',
      name: 'Toomas Kuusk',
      rating: 4.7,
      totalReviews: 41,
      joinedDate: '2024-07-22',
    },
    postedDate: '2026-03-05',
    views: 503,
    favorites: 81,
    shippingOptions: {
      pickup: true,
      dpd: true,
      omniva: true,
      smartpost: true,
      sellerTransport: false,
    },
  },
  {
    id: '9',
    title: 'LED esituli moodul - Audi A4 B9',
    price: 680,
    category: 'Elektrisüsteem',
    condition: 'like-new',
    location: 'Pärnu, Eesti',
    imageUrl: 'https://images.unsplash.com/photo-1693525542779-0f9aeda0a436?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBoZWFkbGlnaHRzJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzcyODYwMTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'OEM Audi matrix LED esituli moodul 2017-2020 A4-le (B9). Parem pool. Täielik LED adaptiivse valgustusega. Ideaalne seisukord, pragusid ega niiskust. Paigaldamine plug and play.',
    seller: {
      id: 'seller9',
      name: 'Rainer Uibo',
      rating: 5.0,
      totalReviews: 23,
      joinedDate: '2025-01-09',
    },
    postedDate: '2026-03-06',
    views: 278,
    favorites: 39,
    shippingOptions: {
      pickup: true,
      dpd: true,
      omniva: true,
      smartpost: true,
      sellerTransport: false,
    },
    compatibility: {
      make: 'Audi',
      model: 'A4',
      yearFrom: 2017,
      yearTo: 2020,
    },
  },
  {
    id: '10',
    title: 'Titaanist heitgaasisüsteem - Täielik Cat-Back',
    price: 2135,
    category: 'Mootoriosad',
    condition: 'like-new',
    location: 'Tallinn, Eesti',
    imageUrl: 'https://images.unsplash.com/photo-1759419282068-eb664e0f0a17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGhhdXN0JTIwc3lzdGVtJTIwbXVmZmxlcnxlbnwxfHx8fDE3NzI4NjAxODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Armytrix titaanist cat-back süsteem Porsche 911 GT3-le (991.2). Valvetronic süsteem kaugjuhtimispuldiga. Agressiivne heli, märkimisväärne kaaluvähendus. Vaid 3k km. Kaasas kogu riistvara.',
    seller: {
      id: 'seller10',
      name: 'Kristiina Vahter',
      rating: 4.8,
      totalReviews: 56,
      joinedDate: '2024-04-30',
    },
    postedDate: '2026-03-04',
    views: 467,
    favorites: 91,
    shippingOptions: {
      pickup: true,
      dpd: true,
      omniva: true,
      smartpost: true,
      sellerTransport: false,
    },
    compatibility: {
      make: 'Porsche',
      model: '911',
      yearFrom: 2017,
      yearTo: 2018,
    },
  },
  {
    id: '11',
    title: 'Alumiiniumist radiaator - Kõrge jõudlus',
    price: 285,
    category: 'Mootoriosad',
    condition: 'new',
    location: 'Võru, Eesti',
    imageUrl: 'https://images.unsplash.com/photo-1679486622067-a4cc6b796303?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWRpYXRvciUyMGNvb2xpbmclMjBzeXN0ZW18ZW58MXx8fHwxNzcyODYwMTgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Mishimoto alumiiniumist radiaator Honda Civic EG/EK-le (1992-2000). Kolmekordne südamik. Jahutusmaht suurenenud 30%. Uus karbis. Eluaegne garantii. Ideaalne turboprojektidele.',
    seller: {
      id: 'seller11',
      name: 'Taavi Kuusik',
      rating: 4.9,
      totalReviews: 74,
      joinedDate: '2023-12-14',
    },
    postedDate: '2026-03-07',
    views: 312,
    favorites: 47,
    shippingOptions: {
      pickup: true,
      dpd: true,
      omniva: true,
      smartpost: true,
      sellerTransport: false,
    },
    compatibility: {
      make: 'Honda',
      model: 'Civic',
      yearFrom: 1992,
      yearTo: 2000,
    },
  },
  {
    id: '12',
    title: 'Odyssey PC1200 aku - AGM 12V',
    price: 275,
    category: 'Elektrisüsteem',
    condition: 'new',
    location: 'Kuressaare, Eesti',
    imageUrl: 'https://images.unsplash.com/photo-1698707781839-8739e5db5f12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBiYXR0ZXJ5JTIwYWx0ZXJuYXRvcnxlbnwxfHx8fDE3NzI4NjAxODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Odyssey Extreme seeria AGM aku. 540 külmstardi amprit. Vibratsioonikindel, 3-10 aastat eluiga. Uus, kasutamata. Ideaalne kõrge jõudlusega autode ja võistlusautode jaoks.',
    seller: {
      id: 'seller12',
      name: 'Maria Lill',
      rating: 4.7,
      totalReviews: 39,
      joinedDate: '2024-09-07',
    },
    postedDate: '2026-03-05',
    views: 234,
    favorites: 32,
    shippingOptions: {
      pickup: true,
      dpd: true,
      omniva: true,
      smartpost: true,
      sellerTransport: false,
    },
  },
];

// Car makes and models for filter
export const carMakes = ['Audi', 'BMW', 'Ford', 'Honda', 'Porsche', 'Subaru', 'Toyota', 'Volkswagen', 'Mercedes-Benz', 'Nissan'];

export const carModelsByMake: Record<string, string[]> = {
  'Audi': ['A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q3', 'Q5', 'Q7', 'Q8', 'TT', 'R8'],
  'BMW': ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series', 'M3', 'M4', 'M5', 'X1', 'X3', 'X5', 'X6', 'X7', 'Z4'],
  'Ford': ['Fiesta', 'Focus', 'Mustang', 'Explorer', 'Escape', 'F-150', 'Ranger', 'Edge'],
  'Honda': ['Civic', 'Accord', 'CR-V', 'HR-V', 'Pilot', 'Odyssey', 'Fit', 'Ridgeline'],
  'Porsche': ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan', 'Boxster', 'Cayman'],
  'Subaru': ['Impreza', 'Legacy', 'Outback', 'Forester', 'Crosstrek', 'WRX', 'BRZ'],
  'Toyota': ['Corolla', 'Camry', 'RAV4', 'Highlander', '4Runner', 'Tacoma', 'Tundra', 'Prius', 'Supra', '86'],
  'Volkswagen': ['Golf', 'Jetta', 'Passat', 'Tiguan', 'Atlas', 'Arteon', 'ID.4'],
  'Mercedes-Benz': ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE', 'GLS', 'AMG GT'],
  'Nissan': ['Altima', 'Maxima', 'Sentra', 'Rogue', 'Pathfinder', 'Murano', '370Z', 'GT-R'],
};