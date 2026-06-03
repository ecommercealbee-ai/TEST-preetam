import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  ShoppingCart, 
  MessageSquare, 
  Phone, 
  Heart, 
  MapPin, 
  RotateCcw, 
  Truck, 
  ShieldCheck, 
  Star, 
  X, 
  Search, 
  Instagram, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Clock, 
  Send, 
  Copy, 
  Check, 
  Filter, 
  Package, 
  Sliders,
  HelpCircle,
  Eye,
  BadgeAlert,
  ThumbsUp,
  Share2,
  Trash2,
  Plus,
  RefreshCw,
  ExternalLink,
  Globe
} from 'lucide-react';

import { Product, Order, INITIAL_PRODUCTS } from './types';
import CheckoutModal from './components/CheckoutModal';
import ReelSimulator from './components/ReelSimulator';

export default function App() {
  // Navigation tabs: 'home' | 'shop' | 'collections' | 'about' | 'contact' | 'faq' | 'track' | 'woo-sync'
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Database lists in localStorage for persistent session review
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('phf_products_db_v1');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('phf_orders_db_v1');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState<{ product: Product; size: string; color: string; stitch: string; qty: number }[]>(() => {
    const saved = localStorage.getItem('phf_cart_v1');
    return saved ? JSON.parse(saved) : [];
  });

  // UI Intermediates
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedStitch, setSelectedStitch] = useState<string>('');
  
  // Custom Filters for Shop Screen
  const [shopCategory, setShopCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Simulated overlays
  const [reelSimulatedProduct, setReelSimulatedProduct] = useState<Product | null>(null);
  const [whatsappSimulationProduct, setWhatsappSimulationProduct] = useState<Product | null>(null);
  const [whatsappSimulationOpen, setWhatsappSimulationOpen] = useState<boolean>(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);

  // Tracking query inputs
  const [trackingCodeQuery, setTrackingCodeQuery] = useState<string>('PHF-9852');
  const [lookedUpTrackedStatus, setLookedUpTrackedStatus] = useState<any | null>(null);
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  // Synch localStorage
  useEffect(() => {
    localStorage.setItem('phf_products_db_v1', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('phf_orders_db_v1', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('phf_cart_v1', JSON.stringify(cart));
  }, [cart]);

  // Set default variants when product is loaded
  useEffect(() => {
    if (selectedProduct) {
      setSelectedSize(selectedProduct.sizes[0] || 'M');
      setSelectedColor(selectedProduct.colors[0] || 'Original Shade');
      setSelectedStitch(selectedProduct.stitchOptions[0] || 'Semi-Stitched fabric');
    }
  }, [selectedProduct]);

  // Trigger scroll on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, selectedProduct]);

  const triggerCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2500);
  };

  const handleAddToCart = (product: Product, size: string, color: string, stitch: string) => {
    const existingIdx = cart.findIndex(
      item => item.product.id === product.id && 
              item.size === size && 
              item.color === color && 
              item.stitch === stitch
    );

    if (existingIdx !== -1) {
      const updated = [...cart];
      updated[existingIdx].qty += 1;
      setCart(updated);
    } else {
      setCart([...cart, { product, size, color, stitch, qty: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (pId: string, size: string, color: string, stitch: string) => {
    setCart(cart.filter(item => !(item.product.id === pId && item.size === size && item.color === color && item.stitch === stitch)));
  };

  const handleAddProductFromAdmin = (newProd: Product) => {
    setProducts([newProd, ...products]);
  };

  const handleDeleteProductFromAdmin = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status'], courier?: Order['courierPartner'], trackingId?: string) => {
    setOrders(orders.map(o => {
      if (o.orderId === orderId) {
        const updatedTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const newStep = {
          date: `${new Date().toLocaleDateString()} - ${updatedTime}`,
          desc: status === 'Dispatched' 
            ? `Dispatched via ${courier}. Live routing code registered: ${trackingId}`
            : `Delivered safely. Cash deposit docket closed in showroom book.`,
          completed: true
        };

        return {
          ...o,
          status,
          courierPartner: courier || o.courierPartner,
          trackingId: trackingId || o.trackingId,
          timeline: [...o.timeline, newStep]
        };
      }
      return o;
    }));
  };

  const handleResetDatabase = () => {
    const check = window.confirm("Reset the showroom products catalog and delete all placed orders back to clean defaults?");
    if (check) {
      setProducts(INITIAL_PRODUCTS);
      setOrders([]);
      setCart([]);
      localStorage.removeItem('phf_products_db_v1');
      localStorage.removeItem('phf_orders_db_v1');
      localStorage.removeItem('phf_cart_v1');
      alert("Storefront databases restored successfully!");
    }
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = trackingCodeQuery.trim().toUpperCase();

    // 1. Check template order
    if (query === 'PHF-9852') {
      setLookedUpTrackedStatus({
        code: 'PHF-9852',
        customer: 'Meenakshi Gowda',
        destination: 'Gandhi Nagara, Mandya',
        deliveryPartner: 'DTDC Premium Express',
        status: 'In Transit',
        totalPrice: 2490,
        timeline: [
          { date: 'June 03, 2026 - 10:15 AM', desc: 'Out for Pickup from Preetham Boutique, Gandhi Nagar 2nd cross near Reliance Fresh.', completed: true },
          { date: 'June 02, 2026 - 04:30 PM', desc: 'Custom stitching guidelines and sleeves verified by Boutique Master Gowru.', completed: true },
          { date: 'June 01, 2526 - 11:00 AM', desc: 'Order submitted to showroom database book.', completed: true }
        ]
      });
      return;
    }

    // 2. Check live local storage WooCommerce orders
    const matched = orders.find(o => o.orderId.toUpperCase() === query || (o.trackingId && o.trackingId.toUpperCase() === query));
    if (matched) {
      setLookedUpTrackedStatus({
        code: matched.orderId,
        customer: matched.customerName,
        destination: `${matched.address}, ${matched.district}, ${matched.state}`,
        deliveryPartner: matched.courierPartner || 'Awaiting Partner Courier assignment',
        status: matched.status === 'Pending' ? 'Verification Pending' : matched.status,
        totalPrice: matched.totalPrice,
        timeline: matched.timeline
      });
    } else {
      setLookedUpTrackedStatus({
        error: true,
        desc: `No shipping registry matched "${query}". Please enter standard demo code "PHF-9852" or place an order to get a valid live tracking code!`
      });
    }
  };

  // Simulated WhatsApp chat popup
  const triggerWhatsAppMockup = (product: Product, size: string, color: string, stitch: string) => {
    setWhatsappSimulationProduct(product);
    setSelectedSize(size);
    setSelectedColor(color);
    setSelectedStitch(stitch);
    setWhatsappSimulationOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-sand flex flex-col font-sans selection:bg-brand-gold selection:text-brand-blue relative">
      
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-brand-blue text-brand-gold text-[10px] md:text-xs py-2.5 px-4 flex justify-between items-center tracking-wider text-center font-medium border-b border-brand-gold/10">
        <div className="flex items-center gap-1.5 mx-auto">
          <Sparkles className="h-3.5 w-3.5 animate-pulse text-brand-gold" />
          <span>MANDYA STOREFRONT SIGN SHIPMENT ROUTING DISPATCH ACTIVE • CALL SIZING MANAGER DIRECT AT 76760 58322</span>
        </div>
      </div>

      {/* REGAL HEADER */}
      <header className="sticky top-0 z-30 bg-brand-blue text-white shadow-xl bg-opacity-95 border-b border-brand-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            
            {/* BRAND LOGO CONSOLE */}
            <div 
              onClick={() => { setActiveTab('home'); setSelectedProduct(null); }}
              className="flex items-center gap-3 cursor-pointer group"
              id="brand-logo-container"
            >
              <div className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-brand-cyan border-2 border-brand-gold flex items-center justify-center p-1 relative shadow group-hover:scale-105 transition-transform">
                <span className="text-lg md:text-xl font-serif text-brand-gold font-bold relative z-10 font-editorial">
                  P
                </span>
                <div className="absolute inset-1 rounded-full border border-brand-gold/40 border-dashed animate-spin-slow"></div>
              </div>
              <div>
                <h1 className="text-base md:text-lg font-serif tracking-widest text-brand-gold font-editorial uppercase leading-none font-semibold">
                  Preetham
                </h1>
                <span className="text-[10px] tracking-[0.25em] text-[#dfc384] uppercase font-sans">
                  High Fashion
                </span>
                <span className="text-[7.5px] text-slate-400 block tracking-wider font-sans -mt-0.5">MANDYA, KARNATAKA</span>
              </div>
            </div>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex space-x-5 lg:space-x-7 text-[10.5px] uppercase tracking-widest font-semibold text-slate-350">
              <button 
                onClick={() => { setActiveTab('home'); setSelectedProduct(null); }}
                className={`py-2 transition-colors cursor-pointer hover:text-brand-gold ${activeTab === 'home' && !selectedProduct ? 'text-brand-gold border-b border-brand-gold font-bold' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => { setActiveTab('shop'); setSelectedProduct(null); }}
                className={`py-2 transition-colors cursor-pointer hover:text-brand-gold ${activeTab === 'shop' ? 'text-brand-gold border-b border-brand-gold font-bold' : ''}`}
              >
                Shop Catalog
              </button>
              <button 
                onClick={() => { setActiveTab('collections'); setSelectedProduct(null); }}
                className={`py-2 transition-colors cursor-pointer hover:text-brand-gold ${activeTab === 'collections' ? 'text-brand-gold border-b border-brand-gold font-bold' : ''}`}
              >
                Lookbook
              </button>
              <button 
                onClick={() => { setActiveTab('about'); setSelectedProduct(null); }}
                className={`py-2 transition-colors cursor-pointer hover:text-brand-gold ${activeTab === 'about' ? 'text-brand-gold border-b border-brand-gold font-bold' : ''}`}
              >
                Our Boutique
              </button>
              <button 
                onClick={() => { setActiveTab('track'); setSelectedProduct(null); }}
                className={`py-2 transition-colors cursor-pointer hover:text-brand-gold ${activeTab === 'track' ? 'text-brand-gold border-b border-brand-gold font-bold' : ''}`}
              >
                Track Shipping
              </button>
              <button 
                onClick={() => { setActiveTab('contact'); setSelectedProduct(null); }}
                className={`py-2 transition-colors cursor-pointer hover:text-brand-gold ${activeTab === 'contact' ? 'text-brand-gold border-b border-brand-gold font-bold' : ''}`}
              >
                Showroom
              </button>
            </nav>

            {/* ACTION TRIGGERS */}
            <div className="flex items-center gap-3">
              
              {/* Bag Trigger */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative py-2 text-slate-300 hover:text-brand-gold transition-colors flex items-center gap-2 cursor-pointer"
                id="cart-trigger-btn"
              >
                <div className="relative">
                  <ShoppingBag className="h-5.5 w-5.5 text-brand-gold-light" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-brand-rose text-white rounded-full text-[9px] w-4.5 h-4.5 flex items-center justify-center font-bold">
                      {cart.reduce((total, item) => total + item.qty, 0)}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline text-[11px] font-semibold uppercase tracking-wider text-slate-200">Bag</span>
              </button>

              {/* Direct Booking Call Button click to call physical ledger */}
              <a 
                href="tel:917676058322"
                className="bg-[#128c7e] text-white rounded-full px-3 py-1.5 text-[11px] font-semibold flex items-center gap-1.5 hover:bg-[#075e54] transition-all shadow"
                title="Book Directly via Phone Call / WhatsApp"
              >
                <Phone className="h-3 w-3 fill-current" />
                <span className="hidden lg:inline">76760 58322</span>
                <span className="lg:hidden">Call</span>
              </a>
            </div>

          </div>
        </div>

        {/* MOBILE PORT NAVIGATION */}
        <div className="md:hidden bg-[#123c4d]/95 text-slate-200 overflow-x-auto border-t border-brand-gold/10 flex space-x-1 justify-between py-2 px-3 whitespace-nowrap text-[10px] uppercase tracking-wider scrollbar-none">
          <button 
            onClick={() => { setActiveTab('home'); setSelectedProduct(null); }}
            className={`px-3 py-1.5 rounded-full ${activeTab === 'home' && !selectedProduct ? 'bg-brand-gold text-brand-blue font-bold' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => { setActiveTab('shop'); setSelectedProduct(null); }}
            className={`px-3 py-1.5 rounded-full ${activeTab === 'shop' ? 'bg-brand-gold text-brand-blue font-bold' : ''}`}
          >
            Ethnic Shop
          </button>
          <button 
            onClick={() => { setActiveTab('track'); setSelectedProduct(null); }}
            className={`px-3 py-1.5 rounded-full ${activeTab === 'track' ? 'bg-brand-gold text-brand-blue font-bold' : ''}`}
          >
            Track Parcel
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT CONTAINER */}
      <main className="flex-grow">
        
        {/* VIEW INDIVIDUAL PRODUCT DETAILS */}
        {selectedProduct ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            
            {/* Breadcrumb row */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="text-brand-blue mb-6 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider hover:text-brand-rose transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Showcase Catalog</span>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-white rounded-3xl p-5 md:p-8 shadow-xl border border-brand-gold/10">
              
              {/* Left Column Gallery */}
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative border bg-slate-50">
                  <img 
                    src={selectedProduct.images[0]} 
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                  />
                  {selectedProduct.isBestSeller && (
                    <span className="absolute top-4 left-4 bg-brand-rose text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border border-brand-gold-light">
                      BESTSELLER
                    </span>
                  )}
                </div>
                {selectedProduct.images.length > 1 && (
                  <div className="grid grid-cols-2 gap-4">
                    {selectedProduct.images.slice(0, 2).map((img, i) => (
                      <div key={i} className="aspect-[4/5] rounded-xl overflow-hidden border bg-slate-50">
                        <img src={img} alt="closeup detail" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column Specifications */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-xs font-bold text-brand-rose uppercase tracking-widest mb-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{selectedProduct.category}</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-serif text-brand-blue tracking-wide mb-3 leading-tight font-editorial">
                    {selectedProduct.title}
                  </h2>

                  {/* Stars review */}
                  <div className="flex items-center gap-2 mb-4 text-xs text-slate-500">
                    <div className="flex text-brand-gold">
                      {[1, 2, 3, 4, 5].map(v => <Star key={v} className="h-3.5 w-3.5 fill-current" />)}
                    </div>
                    <span>({selectedProduct.reviews.length} Verified Reviews collected)</span>
                  </div>

                  {/* Slashed Prices Block */}
                  <div className="flex items-baseline gap-3 mb-6 bg-brand-sand/50 p-4 rounded-xl border border-brand-gold/15">
                    <span className="text-2.5xl font-serif font-bold text-brand-rose">₹{selectedProduct.price}</span>
                    <span className="text-xs text-slate-400 line-through">₹{selectedProduct.originalPrice}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full ml-auto">
                      Save {Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}% Off
                    </span>
                  </div>

                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6">
                    {selectedProduct.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 font-bold block uppercase text-[10px]">Fabric lines</span>
                      <strong className="text-brand-blue font-semibold">{selectedProduct.fabric}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold block uppercase text-[10px]">Outfit Styling</span>
                      <strong className="text-brand-blue font-semibold">{selectedProduct.stitching}</strong>
                    </div>
                  </div>

                  {/* SELECTIVE VARIANTS SELECTIONS */}
                  <div className="space-y-4 pt-3 border-t">
                    
                    {/* Sizing Tags */}
                    <div>
                      <span className="text-slate-500 font-bold uppercase block text-[10px] mb-2">Available Fitting Sizing:</span>
                      <div className="flex gap-2">
                        {selectedProduct.sizes.map(sz => (
                          <button
                            key={sz}
                            onClick={() => setSelectedSize(sz)}
                            className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${selectedSize === sz ? 'bg-brand-rose text-white border-brand-rose scale-102' : 'bg-white border-slate-200 text-slate-700 hover:border-brand-gold'}`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Colors Selector */}
                    {selectedProduct.colors.length > 0 && (
                      <div>
                        <span className="text-slate-500 font-bold uppercase block text-[10px] mb-2">Select Fabric Hue:</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.colors.map(col => (
                            <button
                              key={col}
                              onClick={() => setSelectedColor(col)}
                              className={`px-3 py-1 rounded text-[10.5px] font-semibold border transition-all cursor-pointer ${selectedColor === col ? 'bg-brand-blue text-[#fcd34d] border-brand-blue' : 'bg-[#f8fafc] hover:border-slate-300 text-slate-600'}`}
                            >
                              {col}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Stitch options Selection */}
                    {selectedProduct.stitchOptions.length > 0 && (
                      <div>
                        <span className="text-slate-500 font-bold uppercase block text-[10px] mb-2">Outfit Wear Styling Type:</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.stitchOptions.map(st => (
                            <button
                              key={st}
                              onClick={() => setSelectedStitch(st)}
                              className={`px-3 py-1 rounded text-[10.5px] font-semibold border transition-all cursor-pointer ${selectedStitch === st ? 'bg-brand-blue text-[#dfc384] border-brand-blue' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                </div>

                {/* CALL TO ACTION BUTTONS */}
                <div className="space-y-3 mt-8 pt-6 border-t">
                  
                  {/* WhatsApp click */}
                  <button
                    onClick={() => triggerWhatsAppMockup(selectedProduct, selectedSize, selectedColor, selectedStitch)}
                    className="w-full bg-[#128c7e] hover:bg-[#0c6b60] text-white font-bold py-3.5 rounded-xl uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 transition-all shadow cursor-pointer"
                  >
                    <MessageSquare className="h-4.5 w-4.5 fill-current" />
                    <span>Inquire / Fit Adjustments via WhatsApp</span>
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        handleAddToCart(selectedProduct, selectedSize, selectedColor, selectedStitch);
                      }}
                      className="bg-brand-blue hover:bg-[#15465a] text-white font-bold py-3 text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="h-4 w-4 text-brand-gold-light" />
                      <span>Add to Bag</span>
                    </button>

                    <button
                      onClick={() => setReelSimulatedProduct(selectedProduct)}
                      className="bg-[#be185d] hover:bg-[#a0134f] text-white font-bold py-3 text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Instagram className="h-4 w-4" />
                      <span>Watch Instagram Reel</span>
                    </button>
                  </div>

                  {/* Guaranteed Trust checks */}
                  <div className="flex justify-around text-[10px] text-slate-400 pt-3">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <span>Authentic Cotton/Silk Sourcing</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Truck className="h-4 w-4 text-blue-600" />
                      <span>Express Karnataka Dispatching</span>
                    </span>
                  </div>

                </div>

              </div>

            </div>

            {/* REVIEWS COLLAPSE */}
            <div className="mt-12 bg-white rounded-3xl p-6 md:p-8 border">
              <h3 className="text-lg font-serif text-brand-blue font-bold tracking-wide flex items-center gap-2 font-editorial mb-6">
                <ThumbsUp className="h-5 w-5 text-brand-gold" />
                <span>Showroom Customer Chat Reviews</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedProduct.reviews.map((re, idx) => (
                  <div key={idx} className="bg-slate-50 border p-5 rounded-2xl relative">
                    <div className="flex text-brand-gold mb-2">
                      {[1,2,3,4,5].slice(0, re.rating).map(v => <Star key={v} className="h-3 w-3 fill-current" />)}
                    </div>
                    <p className="text-slate-600 italic text-[11px] leading-relaxed mb-4">"{re.text}"</p>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 border-t pt-3">
                      <strong>{re.author} ({re.location})</strong>
                      <span className="bg-[#128c7e]/15 text-[#128c7e] px-2 py-0.5 rounded uppercase font-bold text-[8.5px]">Verified Order</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RELATED PRODUCTS */}
            <div className="mt-12 max-w-7xl mx-auto">
              <h3 className="text-lg md:text-xl font-serif font-bold text-brand-blue mb-6 font-editorial">Related Catalog Selections</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {products
                  .filter(p => p.id !== selectedProduct.id)
                  .slice(0, 4)
                  .map(p => (
                    <div 
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className="bg-white rounded-xl overflow-hidden border hover:border-brand-gold transition-all shadow-sm cursor-pointer group"
                    >
                      <div className="aspect-[4/5] bg-slate-50 relative overflow-hidden">
                        <img src={p.images[0]} alt="releated" className="w-full h-full object-cover group-hover:scale-102 transition-transform" />
                      </div>
                      <div className="p-3 text-xs justify-between flex flex-col h-16 bg-white">
                        <h4 className="font-serif font-semibold text-brand-blue leading-tight truncate">{p.title}</h4>
                        <div className="flex justify-between items-baseline mt-1">
                          <span className="text-slate-400 font-mono text-[10px]">{p.category}</span>
                          <strong className="text-brand-rose font-bold">₹{p.price}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        ) : (
          <div>
            
            {/* TAB: HOME VIEW */}
            {activeTab === 'home' && (
              <div>
                
                {/* HERO GRAPHIC SECTIONS */}
                <section className="relative overflow-hidden bg-[#0d2c39] text-white py-16 md:py-28 border-b-4 border-brand-gold">
                  <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&q=80&w=1200')" }}></div>
                  
                  <div className="absolute inset-4 md:inset-8 border border-brand-gold/15 pointer-events-none rounded-xl"></div>

                  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
                    
                    <span className="text-brand-gold text-xs leading-none tracking-[0.43em] uppercase block font-semibold">
                      ✨ THE MANNEQUIN BOUTIQUE OF MANDYA CITY
                    </span>

                    <h2 className="text-3xl sm:text-5xl md:text-6.5xl font-serif text-brand-gold-light tracking-wide leading-tight font-editorial">
                      Salwar Suits & Kurti Sets.<br />
                      <span className="text-white italic">Shared on Instagram.</span>
                    </h2>

                    <p className="text-slate-200 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
                      Now shop direct from our showroom's ready-to-wear Salwar Suits and premium Kurti Sets! Pick your perfect size and enjoy easy WhatsApp ordering, or visit our physical boutique store located at Gandhi Nagar in Mandya City to explore our exclusive collections in person.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
                      <button 
                        onClick={() => setActiveTab('shop')}
                        className="bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-bold px-8 py-3.5 rounded text-xs uppercase tracking-widest transition-all cursor-pointer text-center w-full sm:w-auto"
                      >
                        Browse Premium Outfits
                      </button>
                      <button 
                        onClick={() => setActiveTab('track')}
                        className="border border-white/60 text-white font-bold px-8 py-3.5 rounded text-xs uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer text-center w-full sm:w-auto flex items-center justify-center gap-2"
                      >
                        <Truck className="h-4 w-4 text-brand-gold" />
                        <span>Track Shipping</span>
                      </button>
                    </div>

                  </div>
                </section>

                {/* SHOWROOM INFORMATION RIBBON */}
                <section className="bg-white py-8 border-b text-xs font-sans">
                  <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    
                    <div className="flex items-center gap-3 justify-center md:border-r border-slate-100 last:border-none py-1">
                      <div className="p-3 rounded-full bg-brand-rose/10 text-brand-rose shrink-0">
                        <ShoppingBag className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-bold text-brand-blue uppercase block">Easy to Order</span>
                        <span className="text-[10px] text-slate-400">Pick standard catalog sizing</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 justify-center md:border-r border-slate-100 last:border-none py-1">
                      <div className="p-3 rounded-full bg-brand-sand text-brand-cyan shrink-0">
                        <Truck className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-bold text-brand-blue uppercase block">Fast Delivery</span>
                        <span className="text-[10px] text-slate-400">Quick dispatch via express courier</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 justify-center md:border-r border-slate-100 last:border-none py-1">
                      <div className="p-3 rounded-full bg-brand-sand text-[#128c7e] shrink-0">
                        <MessageSquare className="h-5 w-5 fill-current" />
                      </div>
                      <div>
                        <span className="font-bold text-brand-blue uppercase block font-sans">WhatsApp Order</span>
                        <span className="text-[10px] text-slate-400">Message directly for instant booking</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 justify-center py-1">
                      <div className="p-3 rounded-full bg-[#128c7e]/10 text-[#128c7e] shrink-0">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-bold text-brand-blue uppercase block">Secure Payments</span>
                        <span className="text-[10px] text-slate-400">Safe direct transaction options</span>
                      </div>
                    </div>

                  </div>
                </section>



                {/* BESTSELLER PORTION */}
                <section className="bg-brand-sand py-12 md:py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
                      <div>
                        <span className="text-xs text-brand-rose font-bold block uppercase tracking-widest font-sans">SEASONAL RELEASES</span>
                        <h3 className="text-2xl md:text-3.5xl font-serif text-brand-blue font-editorial mt-1 font-semibold leading-tight">
                          Mannequin Showcase Bestsellers
                        </h3>
                      </div>
                      <button 
                        onClick={() => setActiveTab('shop')}
                        className="text-brand-blue font-bold text-xs uppercase tracking-widest flex items-center gap-1 mt-3 md:mt-0 hover:text-brand-rose transition-colors cursor-pointer"
                      >
                        <span>View All Catalogues</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {products.slice(0, 3).map(p => (
                        <div 
                          key={p.id}
                          className="bg-white rounded-2xl overflow-hidden border border-brand-gold/15 hover:shadow-xl hover:border-brand-gold/40 transition-all duration-300 cursor-pointer flex flex-col group relative"
                        >
                          <div 
                            className="aspect-[4/5] bg-slate-50 relative overflow-hidden"
                            onClick={() => setSelectedProduct(p)}
                          >
                            <img src={p.images[0]} alt="product hero" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                            {p.isBestSeller && (
                              <span className="absolute top-4 left-4 bg-brand-rose text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded">
                                BESTSELLER
                              </span>
                            )}
                            <div className="absolute inset-0 bg-[#0d2c39]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                              <span className="bg-white text-brand-blue font-bold text-[10px] uppercase py-2 px-4 shadow rounded flex items-center gap-1">
                                <Eye className="h-4.5 w-4.5 text-brand-rose" />
                                <span>Inspect Suit & Options</span>
                              </span>
                            </div>
                          </div>

                          <div className="p-4 flex-grow flex flex-col justify-between">
                            <div onClick={() => setSelectedProduct(p)}>
                              <span className="text-[10px] text-slate-400 font-mono tracking-widest block uppercase mb-1">{p.category}</span>
                              <h4 className="text-base font-serif font-semibold text-brand-blue group-hover:text-brand-rose transition-colors font-sans">
                                {p.title}
                              </h4>
                              <p className="text-slate-400 font-sans text-xs mt-1 truncate">
                                Fabric: {p.fabric}
                              </p>
                            </div>

                            <div className="mt-4 pt-3 border-t flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                              <div>
                                <span className="text-[9px] text-slate-450 block font-mono">STITCH PRICE</span>
                                <span className="font-bold text-brand-rose font-serif">₹{p.price}</span>
                                <span className="text-[10px] text-slate-400 line-through font-mono ml-1">₹{p.originalPrice}</span>
                              </div>
                              <button
                                onClick={() => setReelSimulatedProduct(p)}
                                className="bg-brand-blue hover:bg-brand-rose text-white px-2.5 py-1.5 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer flex items-center gap-1"
                                title="Play simulated Instagram Reel video"
                              >
                                <Instagram className="h-3 w-3" />
                                <span>Watch Reel</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </section>

                {/* TESTIMONIAL FEEDBACK highlights VERBATIM COPIED */}
                <section className="bg-[#123c4d] text-white py-12 md:py-16">
                  <div className="max-w-7xl mx-auto px-4 text-center">
                    <span className="text-brand-gold font-bold text-xs uppercase tracking-widest block mb-1">MANDYA COMMUNITY TRUST</span>
                    <h3 className="text-2xl md:text-3xl font-serif text-brand-gold-light mb-10 font-editorial leading-tight">
                      Boutique Customer Highlight Screenshots
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                      
                      <div className="bg-[#0d2c39]/70 border border-brand-gold/15 p-5 rounded-2xl">
                        <p className="italic text-slate-200 leading-relaxed text-[11px] mb-4">
                          "I received thank you so much cloth smooth and quality super! Sizing correct and thank you for timely delivery. Custom sleeves stitched fitting is extremely comfortable for worship puja."
                        </p>
                        <strong className="text-brand-gold block text-[10.5px]">Savithaji M. (Mysuru, KA)</strong>
                      </div>

                      <div className="bg-[#0d2c39]/70 border border-brand-gold/15 p-5 rounded-2xl">
                        <p className="italic text-slate-200 leading-relaxed text-[11px] mb-4">
                          "Sir received parcel. Georgette is very heavy fabric not see-through. Dupatta length is perfect 2.5 meters. Direct buying from Mandya store was extremely trustworthy."
                        </p>
                        <strong className="text-brand-gold block text-[10.5px]">Meenakshi K. (Tumakuru, KA)</strong>
                      </div>

                      <div className="bg-[#0d2c39]/70 border border-brand-gold/15 p-5 rounded-2xl">
                        <p className="italic text-slate-200 leading-relaxed text-[11px] mb-4">
                          "Excellent pure mulberry silk saree gold zari work is so shiny looking. Stitched custom blouse pattern perfectly. Recommended for family functions."
                        </p>
                        <strong className="text-brand-gold block text-[10.5px]">Savitha (Mandya Local, KA)</strong>
                      </div>

                    </div>
                  </div>
                </section>

              </div>
            )}

            {/* TAB: SHOP CATALOGUE */}
            {activeTab === 'shop' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                
                <div className="text-center max-w-3xl mx-auto mb-8">
                  <span className="text-xs text-brand-rose font-bold uppercase tracking-widest block">CATALOGUE ETHNIC</span>
                  <h2 className="text-3xl md:text-4.5xl font-serif text-brand-blue tracking-wide font-editorial mt-1 leading-tight font-semibold">
                    The Mannequin Ethnic Catalogues
                  </h2>
                  <p className="text-xs md:text-sm text-slate-500 mt-2 max-w-xl mx-auto leading-relaxed">
                    Browse our premium ready-to-wear Salwar Suits and elegant floral Mulmul Kurti Sets. Select standard clothing sizes directly for instant dispatch and delivery.
                  </p>
                </div>

                {/* Filters Controllers */}
                <div className="bg-white border p-4 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 justify-between items-center shadow-xs">
                  
                  {/* Category Filter Pills */}
                  <div className="flex flex-wrap gap-2 justify-center text-[10px]">
                    {['All', 'Anarkali Set', 'Salwar Suit', 'Kurti Set'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setShopCategory(cat)}
                        className={`px-4 py-2 rounded-full font-bold uppercase tracking-wider transition-all cursor-pointer ${shopCategory === cat ? 'bg-brand-blue text-white border-brand-blue' : 'bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Search / Order Controls */}
                  <div className="flex items-center gap-3 w-full md:w-auto text-xs">
                    <div className="relative flex-grow">
                      <input 
                        type="text" 
                        placeholder="Search fabrics, colors, zari..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-50 border border-slate-200 px-3 py-2 pl-9 rounded-lg w-full md:w-56 focus:outline-none focus:border-brand-gold text-slate-700"
                      />
                      <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
                    </div>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-slate-700 cursor-pointer font-medium"
                    >
                      <option value="featured">Best Matches</option>
                      <option value="low">Price: Low to High</option>
                      <option value="high">Price: High to Low</option>
                    </select>
                  </div>

                </div>

                {/* RENDER PRODUCTS LISTING GRID */}
                {(() => {
                  let filtered = products.filter(p => {
                    const matchesCategory = shopCategory === 'All' || p.category === shopCategory;
                    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                          p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
                    return matchesCategory && matchesSearch;
                  });

                  if (sortBy === 'low') {
                    filtered.sort((a, b) => a.price - b.price);
                  } else if (sortBy === 'high') {
                    filtered.sort((a, b) => b.price - a.price);
                  }

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-16 bg-white rounded-2xl border p-8 max-w-lg mx-auto space-y-3">
                        <BadgeAlert className="h-12 w-12 text-slate-400 mx-auto" />
                        <h4 className="font-serif font-semibold text-brand-blue font-editorial text-lg leading-none">No Custom Matches Plotted</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">
                          We don't currently have active digital categories matching "{searchQuery}" in our showroom ledger. Call Gowru directly at 76760 58322 — we stitch custom colors upon custom design photos!
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {filtered.map(p => (
                        <div 
                          key={p.id}
                          className="bg-white rounded-2xl overflow-hidden border border-brand-gold/15 hover:shadow-xl hover:border-brand-gold/40 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative"
                        >
                          <div 
                            className="aspect-[4/5] overflow-hidden relative bg-slate-50"
                            onClick={() => setSelectedProduct(p)}
                          >
                            <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                            {p.isBestSeller && (
                              <span className="absolute top-2.5 left-2.5 bg-brand-rose text-white text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 rounded">
                                INSTA POPULAR
                              </span>
                            )}
                          </div>

                          <div className="p-4 flex-grow flex flex-col justify-between bg-white text-xs">
                            <div onClick={() => setSelectedProduct(p)} className="space-y-1">
                              <span className="text-[9px] text-slate-400 font-mono tracking-widest block uppercase">{p.category}</span>
                              <h4 className="font-serif font-semibold text-brand-blue tracking-wide line-clamp-1 group-hover:text-brand-rose transition-colors leading-snug">
                                {p.title}
                              </h4>
                              <p className="text-slate-500 truncate block text-[11px] font-sans">
                                🧶 Fabric: {p.fabric}
                              </p>
                            </div>

                            <div className="mt-4 pt-3 border-t flex justify-between items-center">
                              <div>
                                <span className="font-bold text-brand-rose">₹{p.price}</span>
                                <span className="text-slate-400 line-through text-[10px] ml-1">₹{p.originalPrice}</span>
                              </div>
                              <button
                                onClick={() => setReelSimulatedProduct(p)}
                                className="text-[10px] text-brand-rose hover:text-white hover:bg-brand-rose bg-brand-rose/10 px-2 py-1 rounded transition-colors font-bold whitespace-nowrap flex items-center gap-1 cursor-pointer"
                              >
                                <Instagram className="h-3 w-3" />
                                <span>Reel tag</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}

              </div>
            )}

            {/* TAB: LOOKBOOK CURATED COLLECTIONS */}
            {activeTab === 'collections' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <span className="text-xs text-brand-rose font-bold uppercase tracking-widest block">SEASONAL EDITS</span>
                  <h2 className="text-3xl md:text-5xl font-serif text-brand-blue tracking-wide font-editorial mt-1 leading-tight font-semibold">
                    The Curated Lookbooks
                  </h2>
                  <p className="text-xs md:text-sm text-slate-500 mt-2 max-w-xl mx-auto leading-relaxed">
                    Explore visual boards matching the style metrics of Preetham Gowda’s Mandya regional handlooms catalog.
                  </p>
                </div>

                <div className="space-y-12">
                  
                  {/* Card 1 */}
                  <div className="bg-[#123c4d] text-white rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-xl border border-[#be185d]/30">
                    <div className="aspect-[4/3] md:aspect-auto bg-slate-100">
                      <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800" alt="Collection pink series" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <span className="text-brand-gold font-bold text-xs uppercase tracking-widest block">RELEASE EDIT 01 — CLASSIC GULABI</span>
                        <h3 className="text-2xl md:text-3xl font-serif text-[#f3df95] font-editorial leading-tight">Royal Pink Indian Wedding Silk</h3>
                        <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans">
                          A curated suite dedicated entirety to the bright wedding roses seen on our reels feed. Embroidered elegantly with gold zari split-neck collars and comfortable light organza linings.
                        </p>
                      </div>
                      <button 
                        onClick={() => { setShopCategory('Anarkali Set'); setActiveTab('shop'); }}
                        className="bg-brand-gold hover:bg-brand-gold-light text-brand-blue font-bold px-6 py-3 rounded text-xs uppercase tracking-wider self-start transition-all cursor-pointer"
                      >
                        Explore Gulabi Pieces
                      </button>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-md border border-slate-200">
                    <div className="p-8 md:p-12 flex flex-col justify-between space-y-6 md:order-1 order-2">
                      <div className="space-y-3">
                        <span className="text-brand-rose font-bold text-xs uppercase tracking-widest block">RELEASE EDIT 02 — THE HARVEST WINDOW</span>
                        <h3 className="text-2xl md:text-3.5xl font-serif text-brand-blue font-editorial leading-tight">Mustard & Haldi Festive sets</h3>
                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-sans">
                          Bright saffron tones mirroring the storefront display. Perfect for prayers, wedding haldi rituals, and regional rituals. High color resilience.
                        </p>
                      </div>
                      <button 
                        onClick={() => { setShopCategory('Salwar Suit'); setActiveTab('shop'); }}
                        className="bg-brand-blue hover:bg-[#123c4d] text-white font-bold px-6 py-3 rounded text-xs uppercase tracking-wider self-start transition-all cursor-pointer"
                      >
                        Explore Saffron Looks
                      </button>
                    </div>
                    <div className="aspect-[4/3] md:aspect-auto md:order-2 order-1 bg-slate-50">
                      <img src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800" alt="Harvest design cover" className="w-full h-full object-cover" />
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB: OUR BOUTIQUE SHOWROOM HISTORY */}
            {activeTab === 'about' && (
              <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center mb-8">
                  <span className="text-xs text-brand-rose font-bold uppercase tracking-widest block">BOUTIQUE HERITAGE</span>
                  <h2 className="text-3xl md:text-5xl font-serif text-brand-blue tracking-wide font-editorial leading-tight font-semibold mt-1">
                    The Preetham Showroom Legacy
                  </h2>
                </div>

                <div className="bg-white rounded-2xl border p-6 md:p-10 shadow-md space-y-6 text-slate-600 text-xs md:text-sm leading-relaxed">
                  <img src="https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&q=80&w=800" alt="Workshop layout" className="rounded-xl w-full h-72 object-cover" />
                  
                  <h3 className="font-serif text-base font-bold text-brand-blue">The Story of Preetham Ready-to-Wear Fashion</h3>
                  
                  <p>
                    Nestled behind the busy lanes of Gandhi Nagar 2nd cross, near the Reliance Fresh strip in Mandya City, Preetham High Fashion has grown into Mandya's premier destination for high-quality ethnic attire. Sourcing select, luxurious fabrics like pure Georgette, premium Mulmul Cotton, soft Rayon, and gorgeous Slub Silks, Preetham High Fashion handpicks and retails the absolute finest in ready-made Salwar Suits, designer Anarkali garments, and spectacular Kurti Sets.
                  </p>

                  <blockquote className="bg-brand-sand border-l-4 border-brand-rose p-4 rounded text-brand-blue italic text-[11px] font-semibold leading-relaxed">
                    "We don't sell fast fashion or machine polyester boxes. Each ready-to-wear salwar and kurti set is handpicked for its premium weave, soft lining comfort, and perfect dupatta designs."
                  </blockquote>

                  <p>
                    Understanding that our modern customers love shopping through Instagram Reels highlight catalogs and active chat, we have hosted this digital catalog to work in unison with WordPress and WhatsApp checkout options. Please note that we are exclusively a premium retail showroom for ready-to-wear and ready-to-stitch apparel sets and do not offer customized on-demand sewing or tailoring services.
                  </p>

                </div>
              </div>
            )}

            {/* TAB: TRACK SHIPPING */}
            {activeTab === 'track' && (
              <div className="max-w-3xl mx-auto px-4 py-12">
                
                <div className="text-center mb-8">
                  <span className="text-xs text-brand-rose font-bold uppercase tracking-widest block">POSTAL DELIVERY TIMELINE</span>
                  <h2 className="text-3xl md:text-5xl font-serif text-brand-blue tracking-wide font-editorial mt-1 leading-tight font-semibold">
                    Track Shipping Routing
                  </h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Lookup active Shiprocket / DTDC express courier status for your order using either order reference code.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border p-6 shadow-md mb-8">
                  <form onSubmit={handleTrackSubmit} className="flex gap-2">
                    <div className="relative flex-grow">
                      <input 
                        type="text" 
                        required 
                        value={trackingCodeQuery}
                        onChange={(e) => setTrackingCodeQuery(e.target.value)}
                        placeholder="e.g. PHF-9852 or order code WC-XXXXXX"
                        className="w-full bg-slate-50 border p-3 pl-9 rounded-lg font-mono text-xs uppercase font-bold text-slate-705 focus:outline-none focus:border-brand-gold"
                      />
                      <Package className="h-4 w-4 text-slate-400 absolute left-3 top-3.5" />
                    </div>
                    <button 
                      type="submit"
                      className="bg-brand-blue hover:bg-brand-cyan text-white px-5 rounded-lg text-xs uppercase tracking-wider font-bold cursor-pointer transition-all"
                    >
                      Search Ledger
                    </button>
                  </form>
                  <p className="text-[10px] text-slate-400 mt-2 font-mono">
                    *Tip: Use standard demo tracker code <code className="bg-slate-100 px-1 py-0.5 rounded font-bold text-brand-blue">PHF-9852</code>, or copy any generated <code className="bg-slate-100 px-1 py-0.5 rounded text-brand-rose">#WC-XXXXXX</code> from your Checkout successes!
                  </p>
                </div>

                {/* TRACK VIEW */}
                {lookedUpTrackedStatus && (
                  <div className="bg-white rounded-2xl border p-6 md:p-8 shadow-lg">
                    {lookedUpTrackedStatus.error ? (
                      <div className="text-center py-6 space-y-2 text-brand-rose">
                        <BadgeAlert className="h-10 w-10 mx-auto" />
                        <h4 className="font-bold text-sm font-serif">Registry Search Failed</h4>
                        <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto">{lookedUpTrackedStatus.desc}</p>
                      </div>
                    ) : (
                      <div className="space-y-6 text-xs font-sans">
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b gap-3">
                          <div>
                            <span className="text-slate-400 font-bold uppercase text-[9px] block">WooCommerce Tracking Registry ID</span>
                            <strong className="text-base font-mono text-brand-blue block uppercase leading-none">{lookedUpTrackedStatus.code}</strong>
                          </div>

                          <div className="text-right">
                            <span className="text-slate-400 font-bold uppercase text-[9px] block">Carrier Aggregator Status</span>
                            <span className="bg-emerald-100 text-emerald-800 border px-3 py-0.5 rounded-full font-bold text-[10px] inline-block mt-1">
                              {lookedUpTrackedStatus.status}
                            </span>
                          </div>
                        </div>

                        {/* Customer details info */}
                        <div className="grid grid-cols-2 gap-4 bg-slate-50 border p-4 rounded-xl text-xs">
                          <div>
                            <span className="text-slate-400 block font-bold uppercase text-[9px]">Consignee recipient</span>
                            <strong className="text-slate-700 block mt-0.5">{lookedUpTrackedStatus.customer}</strong>
                            <span className="text-slate-500 block text-[10.5px] mt-1">Destination: {lookedUpTrackedStatus.destination}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-400 block font-bold uppercase text-[9px]">Postal logistics network</span>
                            <strong className="text-slate-700 block mt-0.5">{lookedUpTrackedStatus.deliveryPartner}</strong>
                            <span className="text-[#a0134f] block text-[11px] font-bold mt-1.5">Est Value: ₹{lookedUpTrackedStatus.totalPrice}</span>
                          </div>
                        </div>

                        {/* Interactive Steps Timeline */}
                        <div className="space-y-6 pl-4 border-l-2 border-slate-200 ml-2 relative">
                          {lookedUpTrackedStatus.timeline && lookedUpTrackedStatus.timeline.map((step: any, sIdx: number) => (
                            <div key={sIdx} className="relative text-left space-y-1">
                              <span className={`absolute -left-[23px] top-1.5 rounded-full h-3.5 w-3.5 border-2 ${sIdx === 0 ? 'bg-brand-rose border-brand-rose ring-4 ring-rose-100' : 'bg-slate-300 border-white'}`} />
                              <span className="text-slate-400 font-bold font-mono text-[9px] block">{step.date}</span>
                              <strong className="text-slate-700 text-xs block leading-tight">{step.desc}</strong>
                              <p className="text-slate-400 text-[10px] font-sans">Verification scan logged successful.</p>
                            </div>
                          ))}
                        </div>

                      </div>
                    )}
                  </div>
                )}

              </div>
            )}

            {/* TAB: SHOWROOM ADDRESS & CALL DETAILS */}
            {activeTab === 'contact' && (
              <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="text-center mb-8">
                  <span className="text-xs text-brand-rose font-bold uppercase tracking-widest block">HOW TO COORDINATE</span>
                  <h2 className="text-3xl md:text-5xl font-serif text-brand-blue tracking-wide font-editorial leading-tight font-semibold mt-1">
                    Contact Our Mandya Showroom
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-xs font-sans">
                  
                  {/* Address info block */}
                  <div className="bg-[#123c4d] text-white p-8 rounded-3xl space-y-6 shadow-xl border border-brand-gold/30">
                    
                    <div>
                      <span className="bg-brand-gold text-brand-blue text-[9px] px-2 py-0.5 font-bold uppercase tracking-widest block w-fit rounded">
                        MAIN OUTLET & WORKSUIT SHOP
                      </span>
                      <h3 className="text-xl font-serif text-brand-gold-light mt-2 uppercase tracking-wide leading-tight">
                        PREETHAM HIGH FASHION SHOWROOM
                      </h3>
                    </div>

                    <div className="space-y-4 text-slate-200">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                        <div>
                          <strong>Street Coordinates:</strong>
                          <p className="text-slate-300 leading-relaxed mt-1">
                            Gandhi Nagara 2nd cross,<br />
                            Near Reliance Fresh Back Side strip,<br />
                            Mandya district, Karnataka - 571401
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                        <div>
                          <strong>Call Sizing Ledger Direct:</strong>
                          <p className="text-brand-gold-light font-mono text-sm mt-0.5">
                            76760 58322 | 95389 55475
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-brand-gold shrink-0" />
                        <div>
                          <strong>Showroom Active Hours:</strong>
                          <p className="text-slate-300">Monday - Sunday: 09:30 AM to 08:30 PM IST</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-700/60 flex flex-wrap gap-2">
                      <a href="tel:917676058322" className="bg-brand-gold text-brand-blue font-bold px-4 py-2 rounded text-[10px] uppercase tracking-wider hover:bg-[#dfc384] transition-all">
                        Dial Ledger
                      </a>
                      <a href="https://api.whatsapp.com/send?phone=917676058322&text=Hello%20Preetham%20High%20Fashion" target="_blank" rel="noreferrer" className="bg-[#128c7e] text-white font-bold px-4 py-2 rounded text-[10px] uppercase tracking-wider hover:bg-[#075e54] transition-all">
                        WhatsApp Line
                      </a>
                    </div>

                  </div>

                  {/* Message inquiry form */}
                  <div className="bg-white p-6 md:p-8 rounded-3xl border shadow-md space-y-4">
                    <h3 className="font-serif text-lg font-bold text-brand-blue font-editorial">Send Catalog Order Inquiries</h3>
                    <p className="text-slate-500 leading-tight">
                      Saw a gorgeous salvar suit or kurti set color in our catalog or on our Instagram Reels page and want to check stock availability in your size? Settle your query below.
                    </p>

                    {contactSuccess ? (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-2">
                        <Check className="h-10 w-10 text-emerald-600 mx-auto" />
                        <h4 className="font-bold">Inquiry Filed Successful!</h4>
                        <p className="text-xs">Showroom staff will review your request and connect with you on WhatsApp soon.</p>
                        <button onClick={() => setContactSuccess(false)} className="bg-brand-blue text-white py-1.5 px-3 rounded text-[10px] font-bold uppercase transition-colors">
                          Send Another
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={(e) => { e.preventDefault(); setContactSuccess(true); }} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="block text-slate-500 font-bold uppercase">Your Full Name</label>
                            <input required type="text" placeholder="Anjali Gowda" className="w-full bg-slate-50 border p-2.5 rounded-lg focus:outline-none focus:border-brand-gold text-slate-755" />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-slate-500 font-bold uppercase">WhatsApp Number</label>
                            <input required type="tel" placeholder="99165 38XXX" className="w-full bg-slate-50 border p-2.5 rounded-lg focus:outline-none focus:border-brand-gold text-slate-755" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-slate-500 font-bold uppercase">Product Color, Size, or Styling Questions</label>
                          <textarea required rows={3} placeholder="Provide specific style codes, color preferences, standard sizes S/M/L/XL/XXL, or general stock queries..." className="w-full bg-slate-50 border p-2.5 rounded-lg focus:outline-none text-slate-755" />
                        </div>

                        <button type="submit" className="w-full bg-brand-blue hover:bg-brand-cyan text-white font-bold py-3.5 rounded-lg uppercase tracking-widest text-[10px] shadow">
                          Submit to Boutique Ledger Book
                        </button>
                      </form>
                    )}

                  </div>

                </div>

              </div>
            )}

            {/* DETAILS CONTAINER */}

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-brand-dark text-slate-300 pt-12 pb-8 border-t-2 border-brand-gold/30 font-sans text-xs shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-cyan border border-brand-gold flex items-center justify-center text-brand-gold font-bold font-serif text-lg font-editorial">
                P
              </div>
              <div>
                <h4 className="font-serif tracking-widest font-semibold text-brand-gold uppercase text-sm leading-none font-editorial">
                  Preetham High Fashion
                </h4>
                <span className="text-[10px] block text-slate-400 mt-1">Mandya, Karnataka</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Durable Indian bridalwear and festival kurta salwar sets stitched to perfection at our physical Gandhi Nagar outlet workshop. Trusted across Southern India.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="font-serif tracking-widest text-brand-gold uppercase text-xs font-semibold">Shopping Links</h5>
            <ul className="space-y-2 text-slate-300 text-[11.5px]">
              <li><button onClick={() => { setActiveTab('shop'); setShopCategory('Anarkali Set'); setSelectedProduct(null); }} className="hover:text-white text-slate-300 transition-colors cursor-pointer text-left">Festive Anarkalis</button></li>
              <li><button onClick={() => { setActiveTab('shop'); setShopCategory('Salwar Suit'); setSelectedProduct(null); }} className="hover:text-white text-slate-300 transition-colors cursor-pointer text-left">Elegant Salwars</button></li>
              <li><button onClick={() => { setActiveTab('shop'); setShopCategory('Saree'); setSelectedProduct(null); }} className="hover:text-white text-slate-300 transition-colors cursor-pointer text-left">Golden Mulberry Sarees</button></li>
              <li><button onClick={() => { setActiveTab('shop'); setShopCategory('Kurti Set'); setSelectedProduct(null); }} className="hover:text-white text-slate-300 transition-colors cursor-pointer text-left">Floral Cotton duos</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-serif tracking-widest text-brand-gold uppercase text-xs font-semibold">User Guidance</h5>
            <ul className="space-y-2 text-slate-300 text-[11.5px]">
              <li><button onClick={() => { setActiveTab('track'); setSelectedProduct(null); }} className="hover:text-white text-slate-300 transition-colors cursor-pointer text-left">Track Parcel Delivery</button></li>
              <li><button onClick={() => { setActiveTab('about'); setSelectedProduct(null); }} className="hover:text-white text-slate-300 transition-colors cursor-pointer text-left">Showroom History</button></li>
              <li><button onClick={() => { setActiveTab('contact'); setSelectedProduct(null); }} className="hover:text-white text-slate-300 transition-colors cursor-pointer text-left">Storefront Coordinates</button></li>
              <li><button onClick={() => { setActiveTab('home'); setSelectedProduct(null); }} className="hover:text-white text-slate-300 transition-colors cursor-pointer text-left">Boutique Collection</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-serif tracking-widest text-brand-gold uppercase text-xs font-semibold">Showroom Depot</h5>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              📍 Gandhi Nagara 2nd cross,<br />
              Near Reliance Fresh Back Side strip,<br />
              Mandya, Karnataka - 571401
            </p>
            <p className="text-slate-400 block pt-1 text-[11px] font-mono leading-none">
              📞 Phone: +91 76760 58322
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-slate-800 text-center text-slate-500 text-[10px] flex flex-col sm:flex-row justify-between items-center gap-3">
          <span>© 2026 Preetham High Fashion Mandya. Handloomed with pure traditional fidelity in Karnataka.</span>
        </div>
      </footer>

      {/* WHATSAPP CONVERSION DETAILED SIMULATION CHAT WINDOW */}
      {whatsappSimulationOpen && whatsappSimulationProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#e5ddd5] max-w-sm w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-350 flex flex-col h-[480px]">
            
            <div className="bg-[#075e54] text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-cyan border border-brand-gold flex items-center justify-center font-bold text-brand-gold text-sm font-serif">
                  P
                </div>
                <div>
                  <strong className="block text-xs leading-none">Preetham Gowru (Boutique Rep)</strong>
                  <span className="text-[9.5px] text-emerald-250 flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Direct Showroom Consultation</span>
                  </span>
                </div>
              </div>
              <button onClick={() => setWhatsappSimulationOpen(false)} className="text-white hover:text-slate-205">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-grow p-4 overflow-y-auto space-y-4 text-xs font-sans flex flex-col justify-between bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-opacity-10">
              
              <div className="space-y-3">
                <div className="bg-[#dcf8c6] p-3 rounded-xl max-w-[85%] ml-auto shadow-sm text-slate-800 space-y-1.5 border border-[#c7e9a0]">
                  <span className="text-brand-rose font-bold block text-[8px] uppercase">PRODUCT STITCH SPEC INQUIRY</span>
                  <div className="flex gap-2">
                    <img src={whatsappSimulationProduct.images[0]} alt="preview" className="w-10 h-10 rounded object-cover" />
                    <div>
                      <strong className="block text-slate-800 text-[10.5px] truncate max-w-44 leading-tight">{whatsappSimulationProduct.title}</strong>
                      <span className="text-slate-500 block text-[9.5px] leading-none mt-1">₹{whatsappSimulationProduct.price} • Sizing: {selectedSize} • Hue: {selectedColor || 'Original'}</span>
                    </div>
                  </div>
                  <p className="text-[10px] leading-relaxed mt-1">
                    "Namaste Preetham High Fashion! 🌸 I'm interested in booking from your lookbook. Is size {selectedSize} with {selectedStitch} currently available?"
                  </p>
                  <span className="text-[8px] text-slate-400 block text-right">Just now ✓✓</span>
                </div>

                <div className="bg-white p-3 rounded-xl max-w-[85%] mr-auto shadow-sm text-slate-800 border">
                  <span className="font-bold text-brand-blue text-[9.5px] block">Showroom Operator</span>
                  <p className="leading-relaxed mt-1 text-[10px]">
                    "Namaste! Yes, the <strong className="text-brand-rose">{whatsappSimulationProduct.title}</strong> in Hue <strong className="text-brand-rose">{selectedColor || 'Original'}</strong> is currently on our main mannequins. Our Master Tailor can finalize adjustments and hand off to DTDC this afternoon! Shall we confirm booking receipt details?"
                  </p>
                  <span className="text-[8px] text-slate-400 block text-right mt-1">Just now ✓</span>
                </div>
              </div>

              <div className="bg-[#fffbeb] border border-[#fef3c7] p-2 rounded text-slate-700 text-center text-[9px]">
                🔒 <strong>Safe Checkout:</strong> In live production, this redirects to customer's WhatsApp application with preformatted booking links.
              </div>

            </div>

            <div className="bg-[#f0f0f0] p-3 flex gap-2 border-t items-center shrink-0">
              <input 
                type="text" 
                readOnly
                value="Yes please confirm custom stitch & share WooCommerce detail!"
                className="bg-white flex-grow px-3 py-2 rounded-full border text-slate-500 text-[10px] focus:none cursor-default"
              />
              <button 
                onClick={() => {
                  alert("🎉 WhatsApp Inquiry recorded! Added user contact info to showroom database.");
                  setWhatsappSimulationOpen(false);
                }}
                className="bg-[#075e54] text-white p-2 rounded-full hover:scale-102 transition-transform cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* SHOPPING BAG DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-brand-dark/60 flex justify-end backdrop-blur-3xs">
          <div className="bg-white max-w-sm w-full h-full flex flex-col justify-between shadow-2xl border-l animate-slide-in">
            
            <div className="p-5 border-b flex justify-between items-center bg-[#0d2c39] text-white shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingCart className="text-brand-gold h-5 w-5" />
                <h3 className="font-serif font-bold text-sm tracking-wide font-editorial">Boutique Suitcase Bag</h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="text-slate-300 hover:text-white cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <ShoppingBag className="h-12 w-12 text-slate-300 mx-auto" />
                  <h4 className="font-serif font-semibold text-brand-blue">Your suitcase bag is empty</h4>
                  <p className="text-slate-400 text-[10.5px] max-w-[200px] mx-auto leading-relaxed">
                    Browse our premium ready-to-wear salwar suits and kurti sets and add items here to prepare WooCommerce dispatcher.
                  </p>
                  <button 
                    onClick={() => { setIsCartOpen(false); setActiveTab('shop'); }}
                    className="bg-brand-blue text-white text-[10.5px] font-bold uppercase tracking-wider px-4 py-2 rounded cursor-pointer"
                  >
                    Go to shop
                  </button>
                </div>
              ) : (
                <div className="space-y-3 text-xs">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex gap-3 bg-slate-50 border p-3 rounded-xl relative">
                      <div className="w-14 h-18 bg-white border rounded overflow-hidden shrink-0">
                        <img src={item.product.images[0]} alt="cart item" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow space-y-1 pr-6">
                        <h4 className="font-serif font-bold text-brand-blue leading-tight truncate">{item.product.title}</h4>
                        
                        <div className="flex flex-wrap gap-1 text-[9px] font-mono text-slate-500 mt-1">
                          <span className="bg-white px-1.5 py-0.5 rounded border">📏 {item.size}</span>
                          <span className="bg-white px-1.5 py-0.5 rounded border">🎨 {item.color || 'Original'}</span>
                          <span className="bg-white px-1.5 py-0.5 rounded border font-semibold text-brand-blue">{item.stitch}</span>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <strong className="text-brand-rose font-bold">₹{item.product.price}</strong>
                          <span className="text-slate-400">Qty: {item.qty}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id, item.size, item.color, item.stitch)}
                        className="text-red-500 hover:text-red-700 absolute top-2.5 right-2 px-1 py-0.5 border transparent hover:border-slate-200 rounded cursor-pointer transition-colors"
                        title="Delete design"
                      >
                        <X className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t bg-brand-sand/65 space-y-4 shrink-0 font-sans text-xs">
                <div className="space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>Retail pieces sum value:</span>
                    <strong>₹{cartTotal = cart.reduce((total, item) => total + (item.product.price * item.qty), 0)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Handling Charges:</span>
                    <span className="text-emerald-700 font-bold uppercase text-[9px]">Calculated at Dispatch</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 text-brand-blue font-bold text-sm">
                    <span>Est WooCommerce Subtotal:</span>
                    <span>₹{cartTotal}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    setCheckoutModalOpen(true);
                  }}
                  className="w-full bg-[#be185d] hover:bg-[#a0134f] text-white font-bold py-3.5 rounded-xl uppercase tracking-widest text-[11px] transition-all cursor-pointer shadow-md block text-center"
                >
                  Proceed to WooCommerce billing checkout
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* WHATSAPP REEL PHONE FRAME SIMULATION */}
      {reelSimulatedProduct && (
        <ReelSimulator 
          product={reelSimulatedProduct}
          onClose={() => setReelSimulatedProduct(null)}
          onExploreProduct={(p) => {
            setSelectedProduct(p);
            setActiveTab('shop');
          }}
        />
      )}

      {/* WOOCOMMERCE CHECKOUT MODAL FLOW */}
      {checkoutModalOpen && (
        <CheckoutModal 
          cart={cart}
          onClose={() => setCheckoutModalOpen(false)}
          clearCart={() => setCart([])}
          onOrderPlaced={(newOrd) => {
            setOrders([newOrd, ...orders]);
          }}
        />
      )}

    </div>
  );
}

// Temporary variable inside JSX module block helper
let cartTotal = 0;
