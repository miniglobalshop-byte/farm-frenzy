import React from 'react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onProductClick: (p: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, onProductClick }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 border border-slate-100">
          <i className="fa-solid fa-magnifying-glass text-4xl text-slate-300"></i>
        </div>
        <h3 className="text-2xl font-bold text-slate-900">No items match your criteria</h3>
        <p className="text-slate-500 mt-2 max-w-xs">Try different keywords or check out our other categories.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
      {products.map((product) => (
        <div key={product.id} className="group flex flex-col">
          {/* Image Canvas */}
          <div 
            onClick={() => onProductClick(product)}
            className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 mb-6 cursor-pointer group-hover:border-blue-100 transition-all duration-500"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Hover Actions */}
            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <div className="bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-xl flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="flex-grow py-3 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                >
                  Quick Add
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-white rounded-xl text-slate-400 hover:text-red-500 transition-colors">
                  <i className="fa-regular fa-heart"></i>
                </button>
              </div>
            </div>

            {/* Price Badge */}
            <div className="absolute top-6 right-6">
              <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-bold text-blue-900 shadow-sm">
                ${product.price}
              </span>
            </div>
          </div>
          
          {/* Info Area */}
          <div className="px-2">
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-2">{product.category}</p>
            <h3 
              onClick={() => onProductClick(product)}
              className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-900 transition-colors cursor-pointer line-clamp-1 mb-2"
            >
              {product.name}
            </h3>
            <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed font-medium">
              {product.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;