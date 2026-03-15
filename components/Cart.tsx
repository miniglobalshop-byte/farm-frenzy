
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = items.length > 0 ? 15 : 0;
  const total = subtotal + shipping;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-blue-900">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <i className="fa-solid fa-xmark text-xl text-slate-400"></i>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 custom-scroll">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
              <i className="fa-solid fa-cart-shopping text-6xl opacity-20"></i>
              <p className="text-lg font-medium">Your cart is empty</p>
              <button 
                onClick={onClose}
                className="text-blue-600 hover:underline font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h4 className="font-bold text-slate-900 group-hover:text-blue-900 transition-colors">{item.name}</h4>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-slate-300 hover:text-red-500"
                      >
                        <i className="fa-solid fa-trash-can text-sm"></i>
                      </button>
                    </div>
                    <p className="text-sm text-slate-500 mb-2">${item.price}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-3 py-1 hover:bg-slate-50 text-slate-600"
                        >
                          <i className="fa-solid fa-minus text-xs"></i>
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-slate-700">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-3 py-1 hover:bg-slate-50 text-slate-600"
                        >
                          <i className="fa-solid fa-plus text-xs"></i>
                        </button>
                      </div>
                      <span className="text-sm font-bold text-blue-900 ml-auto">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span>${shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-blue-900 pt-2 border-t border-slate-200">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
          
          <button 
            disabled={items.length === 0}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
              items.length === 0 
                ? 'bg-slate-300 cursor-not-allowed' 
                : 'bg-blue-900 hover:bg-blue-800 active:scale-[0.98]'
            }`}
          >
            Checkout Now
          </button>
          
          <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest font-semibold">
            Secure 256-bit SSL Encrypted Payment
          </p>
        </div>
      </div>
    </>
  );
};

export default Cart;
