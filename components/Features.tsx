
import React from 'react';

const Features: React.FC = () => {
  const features = [
    { icon: 'fa-truck-fast', title: 'Global Delivery', desc: 'Fast shipping worldwide' },
    { icon: 'fa-shield-check', title: 'Secure Payment', desc: '100% protected transactions' },
    { icon: 'fa-headset', title: '24/7 Support', desc: 'Dedicated tech experts' },
    { icon: 'fa-award', title: 'Official Warranty', desc: '1-year brand protection' },
  ];

  return (
    <div className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <i className={`fa-solid ${f.icon} text-lg`}></i>
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm tracking-tight">{f.title}</h4>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
