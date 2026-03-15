
import React from 'react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onLogoClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, searchQuery, setSearchQuery, onLogoClick }) => {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div 
            onClick={onLogoClick}
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-blue-900 p-2 rounded-lg text-white group-hover:bg-blue-800 transition-colors">
              <i className="fa-solid fa-mobile-screen-button text-xl"></i>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-blue-900 tracking-tight">
              Trusted<span className="text-blue-600">Mobile</span>
            </span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search phones, chargers, headphones..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
              />
              <div className="absolute left-3 top-2.5 text-slate-400">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
          </div>

          {/* Links & Cart */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            <div className="hidden lg:flex items-center space-x-6">
              <button onClick={onLogoClick} className="text-slate-600 hover:text-blue-900 font-medium transition-colors">Home</button>
              <a href="#products" onClick={onLogoClick} className="text-slate-600 hover:text-blue-900 font-medium transition-colors">Products</a>
              <a href="#" className="text-slate-600 hover:text-blue-900 font-medium transition-colors">Contact</a>
            </div>

            <button 
              onClick={onCartClick}
              className="relative p-2 text-slate-700 hover:text-blue-900 transition-colors"
            >
              <i className="fa-solid fa-cart-shopping text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center bg-blue-600 text-white text-[10px] font-bold h-5 w-5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-300 text-sm"
            />
            <div className="absolute left-3 top-2 text-slate-400">
              <i className="fa-solid fa-magnifying-glass text-sm"></i>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
