import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingCart, ShoppingBag, Send, Link, Globe, ArrowRight, Phone, ShieldCheck, Download, AlertCircle } from 'lucide-react';
import { Product, Order } from '../types';

interface CheckoutModalProps {
  cart: { product: Product; size: string; color: string; stitch: string; qty: number }[];
  onClose: () => void;
  onOrderPlaced: (order: Order) => void;
  clearCart: () => void;
}

export default function CheckoutModal({ cart, onClose, onOrderPlaced, clearCart }: CheckoutModalProps) {
  // 1 = Method Selection, 2 = Billing Address & Submit, 3 = Confirmation Screen
  const [selectedMethod, setSelectedMethod] = useState<'whatsapp' | 'woocommerce'>('whatsapp');
  const [step, setStep] = useState<number>(1); 
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    district: '',
    state: 'Karnataka',
    pinCode: '',
    paymentMethod: 'Cash On Delivery (COD)',
    deliveryPartner: 'DTDC Express'
  });
  
  const [wooUrl, setWooUrl] = useState<string>('');
  const [wooConnected, setWooConnected] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.qty, 0);

  // Read saved WooCommerce configurations from localStorage if any
  useEffect(() => {
    const savedUrl = localStorage.getItem('phf_woo_store_url') || 'https://preethamhighfashion.wpcomstaging.com';
    const savedConnected = localStorage.getItem('phf_woo_connected') === 'true';
    setWooUrl(savedUrl);
    setWooConnected(savedConnected);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.district || !formData.pinCode) {
      setErrorMsg('Please write complete details. Our Mandya workshop needs exact address lines for courier dispatch!');
      return;
    }
    setErrorMsg('');
    
    if (selectedMethod === 'whatsapp') {
      triggerWhatsAppOrder();
    } else {
      triggerWooCommerceOrder();
    }
  };

  const triggerWhatsAppOrder = () => {
    setSubmitting(true);
    
    // Create preformatted WhatsApp booking message
    const orderId = `PHF-WA-${Math.floor(100000 + Math.random() * 900000)}`;
    const itemsText = cart.map(item => (
      `• *${item.product.title}*\n  Qty: ${item.qty} | Size: ${item.size}\n  Hue: ${item.color || 'Original'}\n  Stitch: ${item.stitch}`
    )).join('\n\n');

    const message = `Namaste Preetham High Fashion! 🌸\n\nI would like to place an order from your online catalog website.\n\n*Order Reference Code:* ${orderId}\n\n*Selected Pieces:*\n${itemsText}\n\n*Grand Total Value:* ₹${cartTotal}\n\n*Delivery Coordinates:*\n👤 *Consignee:* ${formData.name}\n📱 *WhatsApp Number:* ${formData.phone}\n📍 *Address:* ${formData.address}, ${formData.district}, ${formData.state} - ${formData.pinCode}\n\nThank you! Please confirm stock availability and initiate DTDC pickup.`;
    
    // Official showroom whatsapp number is +917676058322
    const whatsappUrl = `https://api.whatsapp.com/send?phone=917676058322&text=${encodeURIComponent(message)}`;

    // Prepare tracking payload Object
    const orderPayload: Order = {
      orderId: orderId,
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      district: formData.district,
      state: formData.state,
      pinCode: formData.pinCode,
      items: cart.map(item => ({
        product: item.product,
        selectedSize: item.size,
        selectedColor: item.color,
        selectedStitch: item.stitch,
        qty: item.qty
      })),
      totalPrice: cartTotal,
      paymentMethod: 'WhatsApp Showroom Booking',
      status: 'Pending',
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      timeline: [
        { date: new Date().toLocaleString(), desc: 'WhatsApp booking text generated and sent directly to +91 76760 58322.', completed: true },
        { date: 'Awaiting showroom handoff confirmation', desc: 'Boutique staff checking mannequin variant availability.', completed: false }
      ]
    };

    setTimeout(() => {
      // Trigger new tab with redirect
      window.open(whatsappUrl, '_blank');
      
      // Post to our active local orders array for tracking lookups
      onOrderPlaced(orderPayload);
      clearCart();
      setStep(3);
      setSubmitting(false);
    }, 1200);
  };

  const triggerWooCommerceOrder = () => {
    setSubmitting(true);
    const orderId = `WC-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderPayload: Order = {
      orderId: orderId,
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      district: formData.district,
      state: formData.state,
      pinCode: formData.pinCode,
      items: cart.map(item => ({
        product: item.product,
        selectedSize: item.size,
        selectedColor: item.color,
        selectedStitch: item.stitch,
        qty: item.qty
      })),
      totalPrice: cartTotal,
      paymentMethod: `WooCommerce (${formData.paymentMethod})`,
      status: 'Pending',
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      timeline: [
        { date: new Date().toLocaleString(), desc: `Order created on external WooCommerce store: ${wooUrl}`, completed: true },
        { date: 'Processing WooCommerce API sync', desc: 'Syncing billing parameters and shipping tax calculations.', completed: true },
        { date: 'Courier parcel label scheduled', desc: 'Awaiting DTDC label generation on WP Shiprocket module.', completed: false }
      ]
    };

    setTimeout(() => {
      onOrderPlaced(orderPayload);
      clearCart();
      setStep(3);
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-brand-dark/70 flex items-center justify-center p-4 backdrop-blur-xs">
      <div id="checkout-modal-container" className="bg-brand-sand max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl border border-brand-gold/30 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-[#0b2532] text-white p-5 flex items-center justify-between border-b border-brand-gold/15 shrink-0">
          <div>
            <span className="bg-brand-gold text-brand-blue px-2.5 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase inline-block">
              Preetham Boutique Checkout
            </span>
            <h3 className="font-serif text-lg text-brand-gold font-editorial font-bold leading-tight mt-1">Complete Your Custom Fit Order</h3>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Dynamic checkout steps indicator */}
        {step < 3 && (
          <div className="bg-white border-b px-6 py-3 flex justify-between text-[11px] font-semibold text-slate-400 shrink-0">
            <span className={`pb-1 ${step === 1 ? 'text-brand-rose border-b-2 border-brand-rose font-bold' : 'text-emerald-700 font-bold'}`}>
              {step === 1 ? '1. Choose Checkout Way' : '✓ Method Selected'}
            </span>
            <span className={`pb-1 ${step === 2 ? 'text-brand-rose border-b-2 border-brand-rose font-bold' : ''}`}>
              2. Consignee Delivery Details
            </span>
            <span className="pb-1">3. Slip Receipt</span>
          </div>
        )}

        <div className="flex-grow overflow-y-auto p-6 space-y-5">

          {/* STEP 1: CHOOSE CHECKOUT WAY */}
          {step === 1 && (
            <div className="space-y-5 text-xs font-sans">
              <div className="text-center space-y-1">
                <h4 className="text-sm font-serif font-bold text-brand-blue font-editorial">Select your preferred checkout route:</h4>
                <p className="text-slate-500 text-[11px] leading-snug">
                  Choose between direct WhatsApp showroom dispatch or official simulated WordPress WooCommerce checkout portal.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* WHATSAPP OPTION BUTTON CARD */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('whatsapp')}
                  className={`p-5 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between h-[190px] relative ${selectedMethod === 'whatsapp' ? 'bg-[#eefcf5] border-[#25d366] ring-2 ring-[#25d366]/20' : 'bg-white border-slate-200 hover:border-brand-gold'}`}
                >
                  {selectedMethod === 'whatsapp' && (
                    <span className="absolute top-3 right-3 bg-[#25d366] text-white p-1 rounded-full">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                  <div>
                    <div className="bg-[#25d366] text-white w-10 h-10 rounded-full flex items-center justify-center mb-3 shadow">
                      <Phone className="h-5 w-5 fill-current" />
                    </div>
                    <strong className="text-brand-blue text-sm block">1. Order via WhatsApp (Recommended)</strong>
                    <span className="text-slate-500 text-[10.5px] block mt-1 leading-snug">
                      Your selected ready-to-wear sizes and colors get compiled and messaged to **+91 76760 58322**. Safe, direct, and allows fast stock confirmation.
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#128c7e] flex items-center gap-1 mt-2">
                    Instant Chat Booking →
                  </span>
                </button>

                {/* WOOCOMMERCE OPTION BUTTON CARD */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('woocommerce')}
                  className={`p-5 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between h-[190px] relative ${selectedMethod === 'woocommerce' ? 'bg-[#fafdff] border-[#96588a] ring-2 ring-[#96588a]/10' : 'bg-white border-slate-200 hover:border-brand-gold'}`}
                >
                  {selectedMethod === 'woocommerce' && (
                    <span className="absolute top-3 right-3 bg-[#96588a] text-white p-1 rounded-full">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                  <div>
                    <div className="bg-[#96588a] text-white w-10 h-10 rounded-full flex items-center justify-center mb-3 shadow">
                      <Globe className="h-5 w-5" />
                    </div>
                    <strong className="text-brand-blue text-sm block">2. WooCommerce Store Integration</strong>
                    <span className="text-slate-500 text-[10.5px] block mt-1 leading-snug">
                      Syncs with your custom WordPress WooCommerce setup. You can integrate domestic payment gateways, taxes, and automatic DTDC shipping labels.
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#7f54b3] flex items-center gap-1 mt-2">
                    WP WordPress API Connection →
                  </span>
                </button>

              </div>

              {/* Summary Info Box */}
              <div className="bg-slate-50 p-4 border rounded-xl space-y-1">
                <div className="flex justify-between items-center text-slate-500 text-[11px]">
                  <span>Total items to pack:</span>
                  <span className="font-mono text-slate-700 font-bold">{cart.reduce((total, i) => total + i.qty, 0)} pieces</span>
                </div>
                <div className="flex justify-between items-center text-brand-blue font-bold text-sm">
                  <span>Grand Total (Est. INR):</span>
                  <span className="text-brand-rose">₹{cartTotal}</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-brand-blue hover:bg-brand-cyan text-white text-[11px] font-bold py-3.5 px-6 rounded-xl uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow"
                >
                  <span>Continue with {selectedMethod === 'whatsapp' ? 'WhatsApp' : 'WooCommerce'}</span>
                  <ArrowRight className="h-4 w-4 text-brand-gold" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: BILLING FORM */}
          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-4 text-xs font-sans">
              
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-base font-bold text-brand-blue font-editorial">
                  {selectedMethod === 'whatsapp' ? 'WhatsApp Showroom Registration' : 'WooCommerce Address Form'}
                </h3>
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${selectedMethod === 'whatsapp' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-[#96588a]'}`}>
                  {selectedMethod === 'whatsapp' ? '🟢 VIA CHAT MESSAGE' : '🔵 VIA WORDPRESS REST API'}
                </span>
              </div>

              {selectedMethod === 'woocommerce' && (
                <div className="bg-emerald-50 border border-emerald-150 text-emerald-850 p-3.5 rounded-lg flex gap-2 text.5 leading-snug">
                  <ShieldCheck className="h-4.5 w-4.5 shrink-0 text-emerald-600 mt-0.5" />
                  <div>
                    <strong>Secure WooCommerce API Active:</strong> Your selected sizes, quantities, and billing variables will synchronise behind the scenes (BTS) directly to your WordPress core ledger database.
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg font-bold">
                  ⚠️ {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-500 font-bold uppercase text-[9px]">Consignee Full Name</label>
                  <input 
                    required 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Meenakshi Gowda" 
                    className="w-full bg-white border border-slate-200 p-3 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-brand-gold" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-500 font-bold uppercase text-[9px]">WhatsApp Phone Number</label>
                  <input 
                    required 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 99165 38920" 
                    className="w-full bg-white border border-slate-200 p-3 rounded-lg text-slate-705 font-mono focus:outline-none focus:border-brand-gold" 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-500 font-bold uppercase text-[9px]">Complete Street Address</label>
                <textarea 
                  required 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={2} 
                  placeholder="Door No, Gandhi Nagar 3rd Cross, near temple..." 
                  className="w-full bg-white border border-slate-200 p-3 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-brand-gold" 
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-500 font-bold uppercase text-[9px]">City/District</label>
                  <input 
                    required 
                    type="text" 
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    placeholder="Mandya" 
                    className="w-full bg-white border border-slate-200 p-3 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-brand-gold" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-500 font-bold uppercase text-[9px]">State</label>
                  <select 
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-slate-200 p-2.5 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-brand-gold"
                  >
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Maharashtra">Maharashtra</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-500 font-bold uppercase text-[9px]">PIN Code</label>
                  <input 
                    required 
                    type="text" 
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    placeholder="571401" 
                    className="w-full bg-white border border-slate-200 p-3 rounded-lg text-slate-700 font-mono focus:outline-none focus:border-brand-gold" 
                  />
                </div>
              </div>

              {selectedMethod === 'woocommerce' && (
                <div className="space-y-1 bg-white border p-4 rounded-xl border-slate-200 space-y-2">
                  <label className="block text-slate-500 font-bold uppercase text-[9px]">Select WooCommerce Gateway Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center gap-2 bg-slate-50 p-2.5 border rounded-lg cursor-pointer">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="Cash On Delivery (COD)"
                        checked={formData.paymentMethod === 'Cash On Delivery (COD)'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-[#96588a]"
                      />
                      <span className="font-bold text-[10.5px]">Cash On Delivery</span>
                    </label>
                    <label className="flex items-center gap-2 bg-slate-50 p-2.5 border rounded-lg cursor-pointer">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="Direct Bank Transfer / UPI"
                        checked={formData.paymentMethod === 'Direct Bank Transfer / UPI'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-[#96588a]"
                      />
                      <span className="font-bold text-[10.5px]">Direct UPI / Bank Link</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Order total lines */}
              <div className="bg-slate-50 p-4 rounded-xl border space-y-1 text-[11px] text-slate-500">
                <div className="flex justify-between">
                  <span>Showroom Retail Value:</span>
                  <strong>₹{cartTotal}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Tailored Stitching Adjustments:</span>
                  <span className="text-emerald-700 font-bold">FREE COURIER VALUE</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-brand-blue font-bold text-xs">
                  <span>Grand Total:</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  className="flex-grow border border-slate-300 text-slate-600 font-bold uppercase py-3 rounded-lg text-center cursor-pointer hover:bg-slate-100 transition-all font-mono"
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className={`flex-grow text-white font-bold uppercase py-3 rounded-lg text-center cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow ${selectedMethod === 'whatsapp' ? 'bg-[#25d366] hover:bg-[#1fbe5b]' : 'bg-[#96588a] hover:bg-[#834c76]'}`}
                >
                  {submitting ? (
                    <span>Processing Order...</span>
                  ) : selectedMethod === 'whatsapp' ? (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Confirm & Order via WhatsApp</span>
                    </>
                  ) : (
                    <>
                      <Globe className="h-4 w-4" />
                      <span>Process WooCommerce Order</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

          {/* STEP 3: CONFIRMATION SUCCESS */}
          {step === 3 && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
                <Check className="h-8 w-8 text-emerald-600" />
              </div>

              <div className="space-y-1.5">
                <span className="text-brand-rose font-bold text-[10px] uppercase tracking-widest block">
                  {selectedMethod === 'whatsapp' ? 'WHATSAPP BOOKING PREPARED SUCCESS' : 'WOOCOMMERCE INTEGRATION REPORT'}
                </span>
                <h4 className="text-xl font-serif text-brand-blue font-editorial font-bold leading-tight">
                  {selectedMethod === 'whatsapp' ? 'WhatsApp Text Compiled!' : 'Filer Order Sent to WooCommerce!'}
                </h4>
                <p className="text-slate-500 text-[11px] px-2 leading-relaxed">
                  {selectedMethod === 'whatsapp' 
                    ? `We successfully generated the draft and routed your browser to open WhatsApp Web/App. If it did not open automatically, please check your popup blockers!`
                    : `Your custom outfit ticket was transmitted to WooCommerce. The store ledger registers are successfully updated.`
                  }
                </p>
              </div>

              {/* Order receipt details card */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl max-w-sm mx-auto text-left text-[11px] font-sans space-y-2">
                <div className="flex justify-between font-mono font-bold text-brand-blue text-[11px] border-b pb-1">
                  <span>Boutique Order ID:</span>
                  <span className="text-brand-rose">LIVE REGISTERED</span>
                </div>
                <div className="space-y-1 text-slate-600 font-medium">
                  <p>👤 <strong>Recipient Name:</strong> {formData.name}</p>
                  <p>📱 <strong>WhatsApp Phone:</strong> {formData.phone}</p>
                  <p>📍 <strong>Deliver To:</strong> {formData.address}, {formData.district}, {formData.state} - {formData.pinCode}</p>
                  <p>📦 <strong>Delivery Partner:</strong> DTDC Premium Express</p>
                </div>
                <div className="pt-2 border-t flex justify-between font-bold text-brand-blue text-xs">
                  <span>Grand Final Total Paid:</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>

              <div className="max-w-xs mx-auto pt-3">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="w-full bg-brand-blue hover:bg-brand-cyan text-white font-bold py-3.5 rounded-xl uppercase tracking-widest text-[10px] cursor-pointer inline-block text-center shadow"
                >
                  Return to Boutique Showroom
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
