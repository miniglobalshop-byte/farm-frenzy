
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded text-white">
              <i className="fa-solid fa-mobile-screen-button"></i>
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Trusted<span className="text-blue-400">Mobile</span>
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Your destination for premium tech. We specialize in bringing you the latest smartphones and high-quality accessories.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-400 transition-colors">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 transition-colors">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Products</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Categories</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Mobiles</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Chargers</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Headphones</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">New Arrivals</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Newsletter</h4>
          <p className="text-slate-400 mb-4">Subscribe for the latest tech updates and deals.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-slate-800 border-none rounded-l-lg px-4 py-2 w-full focus:ring-1 focus:ring-blue-400 text-sm"
            />
            <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-r-lg font-bold transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
        <p>&copy; 2024 Trusted Mobile. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
