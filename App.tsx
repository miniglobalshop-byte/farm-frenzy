import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Footer from './components/Footer';
import GeminiAssistant from './components/GeminiAssistant';
import { Product, CartItem, Category } from './types';
import { PRODUCTS } from './constants';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('trusted_mobile_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trusted_mobile_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    // Brief visual feedback or open cart
    // setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const resetView = () => {
    setSelectedProduct(null);
    setSelectedCategory('All');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLogoClick={resetView}
      />
      
      <main className="flex-grow">
        {selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
          />
        ) : (
          <>
            <Hero onShopNow={scrollToProducts} />
            
            <Features />
            
            <Categories 
              selected={selectedCategory} 
              setSelected={setSelectedCategory} 
            />
            
            <section id="products-section" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-[2px] w-8 bg-blue-600"></span>
                    <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-[10px]">Premium Store</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                    {selectedCategory === 'All' ? 'Featured Items' : `${selectedCategory}`}
                  </h2>
                </div>
                <div className="flex items-center gap-4 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-slate-500 font-bold text-xs uppercase tracking-widest">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  {filteredProducts.length} Premium Items Available
                </div>
              </div>
              
              <ProductGrid 
                products={filteredProducts} 
                onAddToCart={(p) => addToCart(p)} 
                onProductClick={(p) => setSelectedProduct(p)}
              />
            </section>
          </>
        )}
      </main>

      <Footer />
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <GeminiAssistant onAddToCart={(p) => addToCart(p)} />
    </div>
  );
};

export default App;