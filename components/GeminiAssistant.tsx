
import React, { useState, useRef, useEffect } from 'react';
import { askGemini, GeminiResponse } from '../services/geminiService';
import { Product } from '../types';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  sources?: { title: string; uri: string }[];
}

interface GeminiAssistantProps {
  onAddToCart: (p: Product) => void;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ onAddToCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      text: "Hi! I'm your Trusted Mobile expert. I can help you find products in our store or look up the latest tech news and price comparisons. What's on your mind?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const result: GeminiResponse = await askGemini(userMsg);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      text: result.text,
      sources: result.sources
    }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
      >
        {isOpen ? (
          <i className="fa-solid fa-chevron-down text-xl"></i>
        ) : (
          <div className="relative">
            <i className="fa-solid fa-robot text-2xl"></i>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 border-2 border-blue-900"></span>
            </span>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-[550px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-5 bg-blue-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-800/50 flex items-center justify-center border border-blue-400/30">
                <i className="fa-solid fa-brain text-blue-300"></i>
              </div>
              <div>
                <h3 className="font-bold text-base leading-none">Store Expert</h3>
                <span className="text-[10px] text-blue-300 font-medium uppercase tracking-wider flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  Online & Grounded
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-blue-300 hover:text-white transition-colors">
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow p-5 overflow-y-auto space-y-4 custom-scroll bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[90%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-blue-900 text-white rounded-tr-none shadow-md shadow-blue-900/10' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-200 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-2">Sources from Google Search:</p>
                      <div className="flex flex-wrap gap-2">
                        {m.sources.map((source, idx) => (
                          <a 
                            key={idx} 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-100 text-blue-700 rounded-md text-[11px] hover:bg-blue-50 transition-colors border border-slate-200 truncate max-w-[150px]"
                          >
                            <i className="fa-solid fa-link text-[9px]"></i>
                            {source.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 rounded-tl-none">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-blue-900/30 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-blue-900/30 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-blue-900/30 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about store products or latest tech..."
                className="flex-grow bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-12 h-12 bg-blue-900 text-white rounded-2xl flex items-center justify-center hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-900/20"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-2 font-medium">
              Information can vary. Double check critical details.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiAssistant;
