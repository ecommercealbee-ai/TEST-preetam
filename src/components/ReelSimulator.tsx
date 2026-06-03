import React, { useState } from 'react';
import { X, Play, Heart, MessageCircle, Send, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ReelSimulatorProps {
  product: Product;
  onClose: () => void;
  onExploreProduct: (product: Product) => void;
}

export default function ReelSimulator({ product, onClose, onExploreProduct }: ReelSimulatorProps) {
  const [liked, setLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(418);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikesCount(prev => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-brand-dark/80 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="relative max-w-sm w-full rounded-[40px] border-[12px] border-slate-900 bg-black aspect-[9/19] shadow-2xl overflow-hidden flex flex-col justify-between select-none">
        
        {/* Smartphone Notch Camera */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-full z-40 flex items-center justify-around px-4">
          <div className="w-2 h-2 rounded-full bg-slate-805"></div>
          <div className="w-16 h-1 bg-slate-800 rounded-full"></div>
        </div>

        {/* REELS VIDEO BACKGROUND (SIMULATED VIA ACCENTS EMBED) */}
        <div className="absolute inset-0 z-10 bg-slate-950">
          <img 
            src={product.images[0]} 
            alt="Reels item showcase" 
            className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'scale-100' : 'scale-105 saturate-50'}`}
          />
          {/* Subtle overlay shading */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70"></div>
        </div>

        {/* REELS HEADER INTERFACE */}
        <div className="relative z-20 p-6 pt-10 flex justify-between items-center text-white text-xs bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase tracking-widest text-[#dfc384] text-[10px] bg-brand-cyan/80 px-2 py-0.5 rounded border border-brand-gold/30">
              REELS SHOPPING MOCK
            </span>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="bg-black/50 hover:bg-black p-2 rounded-full border border-white/20 transition-all text-white cursor-pointer"
            title="Exit Demo"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* MIDDLE WATERMARK (CLICK TO PAUSE/PLAY) */}
        <div 
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 z-15 flex items-center justify-center cursor-pointer"
        >
          {!isPlaying && (
            <div className="h-16 w-16 bg-black/60 rounded-full flex items-center justify-center border border-white/20 animate-pulse">
              <Play className="h-8 w-8 text-white fill-current ml-1" />
            </div>
          )}
        </div>

        {/* BOTTOM SECTION (MUTED INTERACTIVE BUTTONS, TITLES, & PRODUCT OVERLAYS) */}
        <div className="relative z-20 p-5 space-y-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
          
          {/* PRODUCT SHOPS OVERLAY BADGE - CAPTURES CUSTOMER ATTENTION */}
          <div className="animate-bounce">
            <button
              onClick={() => {
                onExploreProduct(product);
                onClose();
              }}
              className="bg-brand-rose border-2 border-brand-gold-light hover:bg-[#a0134f] text-white p-3 rounded-2xl w-full flex items-center justify-between shadow-2xl transition-all hover:scale-103 cursor-pointer"
              id="reels-product-shop-banner"
            >
              <div className="flex items-center gap-2 text-left">
                <ShoppingBag className="h-5 w-5 text-brand-gold-light animate-pulse" />
                <div>
                  <span className="text-[10px] text-brand-gold-light tracking-wider uppercase font-sans leading-none block font-semibold">TAP TO ORDER ON WEBSITE</span>
                  <strong className="text-[12px] font-serif tracking-wide truncate block max-w-44 text-white leading-tight font-editorial">
                    {product.title}
                  </strong>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] line-through text-slate-300 block">₹{product.originalPrice}</span>
                <span className="text-[12px] font-bold text-white font-mono">₹{product.price}</span>
              </div>
            </button>
          </div>

          <div className="flex justify-between items-end gap-3 text-white">
            
            {/* Merchant Details and caption info */}
            <div className="flex-grow space-y-2 text-left text-xs">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-brand-cyan border border-brand-gold flex items-center justify-center text-brand-gold font-bold text-[13px]">
                  P
                </div>
                <div>
                  <h4 className="font-bold font-serif text-[13px] tracking-wide text-brand-gold">@preetham_high_fashion</h4>
                  <span className="text-[10px] text-slate-300 block -mt-0.5">Mandya, KA • Instagram Boutique</span>
                </div>
              </div>
              
              <p className="text-[11px] leading-relaxed text-slate-200 font-sans pr-4 line-clamp-2">
                🌸 {product.title} is now on our display mannequins! Crafted carefully with premium fabric & heavy borders. Tap the red shop bundle to select your ready-to-wear standard size!
              </p>
              
              <div className="flex gap-1.5 items-center bg-white/10 p-1.5 rounded w-fit text-[9px] font-mono border border-white/5 uppercase tracking-wider text-[#dfc384]">
                <Sparkles className="h-3 w-3 animate-pulse" />
                <span>Sizes Available: {product.sizes.join(', ')}</span>
              </div>
            </div>

            {/* Floating Left Reels Control Panels */}
            <div className="flex flex-col items-center gap-4 shrink-0 text-white font-mono text-[10px]">
              
              {/* Like action */}
              <button 
                type="button"
                onClick={toggleLike}
                className="flex flex-col items-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              >
                <div className={`p-2.5 rounded-full ${liked ? 'bg-brand-rose' : 'bg-black/50'} border border-white/10 shadow-lg`}>
                  <Heart className={`h-4.5 w-4.5 ${liked ? 'fill-current text-white' : 'text-slate-200'}`} />
                </div>
                <span className="mt-1 font-bold">{likesCount}</span>
              </button>

              {/* Comments Mock */}
              <button 
                type="button" 
                onClick={() => alert("Savithaji M. commented: 'Gowru dress cloth was super soft!'")}
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="p-2.5 rounded-full bg-black/50 border border-white/10 shadow-lg">
                  <MessageCircle className="h-4.5 w-4.5 text-slate-200" />
                </div>
                <span className="mt-1 font-bold">18</span>
              </button>

              {/* Share */}
              <button 
                type="button" 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("📋 Simulated shareable catalog URL copied to your device keyboard!");
                }}
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                title="Share Reel Link"
              >
                <div className="p-2.5 rounded-full bg-black/50 border border-white/10 shadow-lg">
                  <Send className="h-4.5 w-4.5 text-slate-200" />
                </div>
                <span className="mt-1 font-bold">Share</span>
              </button>

            </div>

          </div>

          {/* Sizing Indicator home bar bottom */}
          <div className="w-24 h-1 bg-white/40 mx-auto rounded-full mt-3"></div>

        </div>

      </div>
    </div>
  );
}
