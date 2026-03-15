
import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (p: Product, qty: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-blue-900 font-bold mb-8 transition-colors group"
      >
        <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
        Back to Gallery
      </button>

      <div className="bg-white rounded-[2.5rem] lg:rounded-[4rem] shadow-2xl overflow-hidden border border-slate-100 mb-16">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/2 bg-slate-50 p-8 sm:p-12 lg:p-20 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
            <div className="relative group w-full flex justify-center">
              <div className="absolute -inset-10 bg-blue-100 rounded-full blur-[80px] opacity-30"></div>
              <img 
                src={product.image} 
                alt={product.name} 
                className="relative z-10 w-full max-w-[450px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 p-8 sm:p-12 lg:p-20 flex flex-col justify-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Verified Authentic
                  </div>
                </div>
                
                <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter leading-none">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4">
                  <div className="flex text-yellow-400 gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => (
                      <i key={i} className="fa-solid fa-star text-sm"></i>
                    ))}
                  </div>
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-widest border-l border-slate-200 pl-4">Premium Selection</span>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-blue-900">${product.price}</span>
                <span className="text-slate-400 font-bold line-through text-lg opacity-50">${(product.price * 1.2).toFixed(0)}</span>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-3">The Highlights</h4>
                <p className="text-slate-500 leading-relaxed text-lg font-medium">
                  {product.description} Experience ultimate performance and craftsmanship. Engineered for the enthusiasts who demand only the best from their mobile tech.
                </p>
                <ul className="grid grid-cols-2 gap-y-3 pt-2">
                  <li className="flex items-center gap-2 text-sm font-bold text-slate-700"><i className="fa-solid fa-check text-blue-500"></i> Next-Gen Tech</li>
                  <li className="flex items-center gap-2 text-sm font-bold text-slate-700"><i className="fa-solid fa-check text-blue-500"></i> Premium Build</li>
                  <li className="flex items-center gap-2 text-sm font-bold text-slate-700"><i className="fa-solid fa-check text-blue-500"></i> 1Y Warranty</li>
                  <li className="flex items-center gap-2 text-sm font-bold text-slate-700"><i className="fa-solid fa-check text-blue-500"></i> Eco-Packaging</li>
                </ul>
              </div>

              <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex items-center bg-slate-100 rounded-2xl p-1 shrink-0">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white transition-all text-slate-600 hover:shadow-sm"
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span className="w-12 text-center font-black text-slate-900 text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white transition-all text-slate-600 hover:shadow-sm"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`flex-grow py-5 font-black rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden ${
                    added ? 'bg-green-600 text-white' : 'bg-blue-900 text-white hover:bg-blue-800 shadow-blue-900/20'
                  }`}
                >
                  {added ? (
                    <>
                      <i className="fa-solid fa-circle-check animate-bounce"></i>
                      Item Added!
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-cart-plus"></i>
                      Add to Collection - ${(product.price * quantity).toLocaleString()}
                    </>
                  )}
                </button>
              </div>

              <div className="pt-8 flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-widest border-t border-slate-100">
                <div className="flex items-center gap-2"><i className="fa-solid fa-shield-check text-blue-500"></i> Secure Payment</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-rotate-left text-blue-500"></i> 30-Day Returns</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
