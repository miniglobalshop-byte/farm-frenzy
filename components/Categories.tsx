import React from 'react';
import { Category } from '../types';

interface CategoriesProps {
  selected: Category;
  setSelected: (c: Category) => void;
}

const CATEGORY_ITEMS = [
  { 
    label: 'Mobiles' as Category, 
    icon: 'fa-mobile-screen-button', 
    image: 'https://images.unsplash.com/photo-1556656793-062ff9878258?q=80&w=1000&auto=format&fit=crop',
    desc: 'Cutting-edge flagship devices.'
  },
  { 
    label: 'Chargers' as Category, 
    icon: 'fa-bolt-lightning', 
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=1000&auto=format&fit=crop',
    desc: 'Ultra-fast GaN technology.'
  },
  { 
    label: 'Headphones' as Category, 
    icon: 'fa-headphones-simple', 
    image: 'https://images.unsplash.com/photo-1546435770-a3e426ca472b?q=80&w=1000&auto=format&fit=crop',
    desc: 'Immersive spatial audio.'
  }
];

const Categories: React.FC<CategoriesProps> = ({ selected, setSelected }) => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Modern Split Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-12 bg-blue-600"></span>
              <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px]">Curation</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Explore Our <br /> <span className="text-blue-900/40">Collections.</span>
            </h2>
            <p className="text-slate-500 mt-6 font-medium text-lg leading-relaxed">
              We handpick only the most reliable and high-performing mobile accessories to ensure your digital life stays connected and protected.
            </p>
          </div>
          <button 
            onClick={() => setSelected('All')}
            className="group flex items-center gap-4 px-8 py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-sm text-slate-900 hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm active:scale-95"
          >
            View All Products
            <i className="fa-solid fa-arrow-right text-[12px] group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
        
        {/* Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORY_ITEMS.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelected(cat.label)}
              className={`group relative h-[500px] rounded-[3rem] overflow-hidden transition-all duration-700 ${
                selected === cat.label 
                  ? 'ring-4 ring-blue-600 ring-offset-8 scale-[0.98]' 
                  : 'hover:scale-[1.02] hover:shadow-3xl shadow-blue-900/5'
              }`}
            >
              <img 
                src={cat.image} 
                alt={cat.label} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end text-white text-left">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center mb-6 border border-white/20">
                  <i className={`fa-solid ${cat.icon} text-xl`}></i>
                </div>
                <h3 className="font-extrabold text-3xl sm:text-4xl tracking-tight mb-2">{cat.label}</h3>
                <p className="text-white/70 font-medium group-hover:text-white transition-colors">
                  {cat.desc}
                </p>
                <div className="mt-8 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
                  <span className="text-xs font-bold uppercase tracking-widest">Shop Category</span>
                  <div className="w-8 h-[2px] bg-white"></div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;