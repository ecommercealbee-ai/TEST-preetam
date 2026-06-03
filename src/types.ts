/**
 * Shared Type Definitions and Default Database for Preetham High Fashion
 */

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  description: string;
  fabric: string;
  stitching: string;
  images: string[];
  reviews: { author: string; text: string; date: string; rating: number; location: string }[];
  isBestSeller?: boolean;
  sizes: string[];
  colors: string[];
  stitchOptions: string[];
  reelUrl?: string;
  reelImage?: string;
}

export interface Order {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  district: string;
  state: string;
  pinCode: string;
  items: {
    product: Product;
    selectedSize: string;
    selectedColor: string;
    selectedStitch: string;
    qty: number;
  }[];
  totalPrice: number;
  paymentMethod: string;
  status: 'Pending' | 'Processing' | 'Dispatched' | 'Delivered' | 'Cancelled';
  courierPartner?: 'DTDC Express' | 'Shiprocket' | 'Delhivery' | 'India Post';
  trackingId?: string;
  estimatedDelivery?: string;
  timeline: { date: string; desc: string; completed: boolean }[];
  createdAt: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'phf-pink-anarkali',
    title: 'Gulabi Rose Embroidered Anarkali Suit Set',
    category: 'Anarkali Set',
    price: 2490,
    originalPrice: 3890,
    description: 'A luxurious Royal Indian Pink Anarkali set showcasing beautiful ready-made floral borders, detailed zari embroidery around the split neck, and a sheer matching organza dupatta with scalloped borders. Styled with premium inner lining for utmost comfort.',
    fabric: 'Premium Georgette with Scalloped Organza Dupatta',
    stitching: 'Ready-to-Wear Standard Fit',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&q=80&w=800'
    ],
    isBestSeller: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Gulabi Rose Pink', 'Rani Magenta'],
    stitchOptions: ['Ready-To-Wear'],
    reelUrl: 'https://www.instagram.com/reel/C7-pink-anarkali',
    reelImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400',
    reviews: [
      { author: 'Meenakshi K.', text: 'Parcel received sir, dress quality is so good and soft! Ready size fit is 100% correct. Thank you.', date: 'May 28, 2026', rating: 5, location: 'Mandya, KA' },
      { author: 'Avanthika R.', text: 'Super quality! I got so many compliments at the festival. I am buying another one for my sister.', date: 'May 15, 2026', rating: 5, location: 'Bengaluru, KA' }
    ]
  },
  {
    id: 'phf-mustard-festive',
    title: 'Haldii Mustard Embroidered Designer Salwar',
    category: 'Salwar Suit',
    price: 1890,
    originalPrice: 2850,
    description: 'Vibrant mustard yellow dress styled exactly like our famous storefront mannequins. Features rich floral handwork motifs, a premium cotton-silk blend fabric that feels buttery smooth, and an embroidered royal dupatta.',
    fabric: 'Premium Cotton-Silk Blend with Floral motifs',
    stitching: 'Ready-to-Wear Standard Fit',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&q=80&w=800'
    ],
    isBestSeller: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Haldii Mustard Gold', 'Saffron Yellow'],
    stitchOptions: ['Ready-To-Wear'],
    reelUrl: 'https://www.instagram.com/reel/C8-mustard-festive',
    reelImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=400',
    reviews: [
      { author: 'Savitha', text: 'I received the parcel. Fabric is very good, soft design and looks very premium like boutique!', date: 'May 24, 2026', rating: 5, location: 'Mysuru, KA' }
    ]
  },
  {
    id: 'phf-olive-emerald',
    title: 'Emerald Olive Designer Salwar Suit',
    category: 'Salwar Suit',
    price: 2250,
    originalPrice: 3400,
    description: 'Perfect blend of subtle sophistication and festive royalty. Comes in a deep olive green hue featuring heavy ready-made needlework embroidery on the sleeves and collar, complete with a sheer scalloped organza scarf.',
    fabric: 'Heavy Rayon Blend and Soft Organza Scarf',
    stitching: 'Ready-to-Wear Standard Fit',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Emerald Olive Green', 'Mint Sage'],
    stitchOptions: ['Ready-To-Wear'],
    reelUrl: 'https://www.instagram.com/reel/C9-olive-emerald',
    reelImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=400',
    reviews: [
      { author: 'Kavitha Hegde', text: 'Size was perfect, cloth quality is superb. Highly recommended for family events.', date: 'May 04, 2026', rating: 5, location: 'Hassan, KA' }
    ]
  },
  {
    id: 'phf-peacock-kurti',
    title: 'Mayuri Peacock Blue Designer Kurti Set',
    category: 'Kurti Set',
    price: 1650,
    originalPrice: 2500,
    description: 'A graceful royal navy and peacock blue traditional Kurti Set, adorned with delicate Kashmiri embroidery, styled with matching comfortable cigarette pants and a soft sheer Chiffon Dupatta.',
    fabric: 'Premium Slub Silk & Chiffon Dupatta',
    stitching: 'Ready-to-Wear Standard Fit',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Peacock Blue', 'Indigo Navy'],
    stitchOptions: ['Ready-To-Wear'],
    reelUrl: 'https://www.instagram.com/reel/C10-peacock-kurti',
    reelImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=400',
    reviews: [
      { author: 'Rekha Gowda', text: 'Excellent pure feel fabric. Hand embroidery is beautiful and premium. Direct buying from Mandya store was extremely trustworthy.', date: 'May 12, 2026', rating: 5, location: 'Maddur, KA' }
    ]
  }
];
