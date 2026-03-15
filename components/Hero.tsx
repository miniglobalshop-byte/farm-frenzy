import React from 'react';

interface HeroProps {
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <div className="relative bg-[#020617] overflow-hidden min-h-[650px] lg:min-h-[850px] flex items-center">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16 text-white">
        <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md text-blue-400 text-xs font-bold uppercase tracking-widest">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            Official Trusted Retailer
          </div>
          
          <h1 className="text-5xl sm:text-7xl xl:text-8xl font-extrabold leading-[1.1] tracking-tight">
            Your Trusted <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Mobile Tech</span> <br />
            Accessories.
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
            Elevate your mobile experience with precision-engineered smartphones, studio-grade audio, and the world's fastest charging solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
            <button 
              onClick={onShopNow}
              className="group flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/20 hover:-translate-y-1 active:scale-95"
            >
              Shop Collection
              <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/10 transition-all">
              Learn More
            </button>
          </div>
        </div>

        <div className="lg:w-1/2 relative flex justify-center">
          <div className="relative w-full max-w-[500px]">
            {/* Main Visual */}
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=800&auto=format&fit=crop" 
                alt="Premium Smartphone" 
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-[2rem] shadow-2xl animate-float hidden md:block">
              <div className="flex items-center gap-4 text-slate-900">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <i className="fa-solid fa-check-circle text-xl"></i>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Quality</p>
                  <p className="font-extrabold">100% Genuine</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-blue-600 p-6 rounded-[2rem] shadow-2xl animate-float-delayed hidden md:block">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <i className="fa-solid fa-truck-fast text-xl"></i>
                </div>
                <div>
                  <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">Shipping</p>
                  <p className="font-extrabold">Next Day Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Hero;