import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 w-full bg-[#000000]/60 backdrop-blur-md border-b border-white/5 z-50 px-6 py-4 flex justify-between items-center select-none">
      {/* Brand Logo */}
      <a href="#" className="flex items-center gap-2 text-white font-bold text-sm tracking-tight hover:opacity-90 transition-opacity">
        <Globe size={16} className="text-white animate-pulse" />
        <span>KALYAN NEXUS</span>
      </a>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-400">
        <a href="#products" className="hover:text-white transition-colors">Products</a>
        <a href="#playground" className="hover:text-white transition-colors">AI Playground</a>
        <a href="#ecovolt" className="hover:text-white transition-colors">EcoVolt Grid</a>
        <a href="#investors" className="hover:text-white transition-colors">Venture Fund</a>
      </div>

      {/* Action Button */}
      <a 
        href="#investors" 
        className="btn-primary text-xs py-1.5 px-3.5 flex items-center gap-1 font-semibold rounded-lg"
      >
        Pitch Deck <ArrowRight size={12} />
      </a>
    </nav>
  );
}
