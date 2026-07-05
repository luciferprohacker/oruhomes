import React, { useState } from 'react';
import { Search, Star, ShieldCheck, ChevronRight, Award, Flame, Navigation, Heart, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Homepage({ pgs, onSearch, onSelectPg }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleAutoDetectLocation = (e) => {
    e.preventDefault();
    setIsDetecting(true);
    // Simulate geo-detection
    setTimeout(() => {
      setSearchQuery("HSR Layout, Bangalore");
      setIsDetecting(false);
    }, 1200);
  };

  const trendingPgs = pgs.filter(pg => pg.approved && pg.featured).slice(0, 3);
  const budgetPgs = pgs.filter(pg => pg.approved && pg.sharingPrices.triple <= 8500).slice(0, 3);

  return (
    <div className="space-y-16 pb-16 bg-[#f9fafb]">
      {/* OYO-Style Top Banner Section */}
      <section className="relative bg-gradient-to-r from-[#ee2e24] to-[#ff4b6b] text-white py-16 md:py-24 text-center px-4">
        {/* Decorative Grid overlays */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Over 10,000+ Verified Spaces Across India
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto font-medium">
            Find premium PGs and co-living hubs near your IT park or college. Zero Brokerage. 1 Month Security Deposit.
          </p>

          {/* OYO-Style Central Horizontal Search Widget */}
          <form 
            onSubmit={handleSearchSubmit}
            className="max-w-3xl mx-auto bg-white p-2 rounded-xl flex flex-col md:flex-row gap-2 shadow-xl border border-zinc-200"
          >
            {/* Location input with detector */}
            <div className="flex-1 flex items-center gap-2 px-3 py-2 border-b md:border-b-0 md:border-r border-zinc-200">
              <Search size={18} className="text-[#ee2e24] flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Enter city, locality, or college..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-zinc-800 text-xs w-full placeholder:text-zinc-400 font-bold"
              />
              <button 
                onClick={handleAutoDetectLocation}
                disabled={isDetecting}
                title="Detect Location"
                className="p-1 rounded-md hover:bg-zinc-100 text-zinc-500 hover:text-[#ee2e24] flex items-center gap-1 text-[9px] font-bold flex-shrink-0 transition-all border border-zinc-200 cursor-pointer"
              >
                <Navigation size={10} className={isDetecting ? 'animate-spin' : ''} />
                <span>{isDetecting ? 'Detecting...' : 'Near Me'}</span>
              </button>
            </div>

            {/* Quick check-in details placeholder */}
            <div className="w-full md:w-[150px] px-3 py-2 border-b md:border-b-0 md:border-r border-zinc-200 flex items-center justify-start text-left">
              <div className="text-[10px] font-bold text-zinc-650">
                <span className="block text-[8px] text-zinc-400 uppercase leading-none">MOVE-IN DATE</span>
                <span>Immediate Entry</span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary !py-2.5 md:!py-1 px-6 text-xs font-black uppercase tracking-wider rounded-lg flex-shrink-0">
              Search PGs
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/90 font-bold pt-2">
            <span>Popular Cities:</span>
            {['Bangalore', 'Noida', 'Pune', 'Hyderabad'].map((loc, idx) => (
              <button 
                key={idx}
                onClick={() => onSearch(loc)}
                className="px-3 py-0.5 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer text-[10px]"
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Banner */}
      <section className="container max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white border border-[#e5e7eb] p-6 rounded-2xl shadow-sm text-center">
          <div className="flex flex-col items-center p-3 space-y-2">
            <div className="w-10 h-10 rounded-full bg-red-100 flex-center text-[#ee2e24]">
              <ShieldCheck size={20} />
            </div>
            <span className="text-xs font-bold text-zinc-800">Oruhomes Verified Guarantee</span>
            <span className="text-[10px] text-zinc-500 font-light leading-normal max-w-xs">On-site audit checklist of hygiene, kitchen services, and locks before live tags.</span>
          </div>

          <div className="flex flex-col items-center p-3 space-y-2 border-t md:border-t-0 md:border-x border-[#e5e7eb]">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex-center text-amber-600">
              <Award size={20} />
            </div>
            <span className="text-xs font-bold text-zinc-800">Zero Brokerage Fees</span>
            <span className="text-[10px] text-zinc-500 font-light leading-normal max-w-xs">Transact directly with owners. Safe transparent security payouts and refund terms.</span>
          </div>

          <div className="flex flex-col items-center p-3 space-y-2">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex-center text-purple-600">
              <Flame size={20} />
            </div>
            <span className="text-xs font-bold text-zinc-800">1-Month Security Deposit</span>
            <span className="text-[10px] text-zinc-500 font-light leading-normal max-w-xs">No hefty advanced commitments. Easy exits and flexible checkouts with a 15-day notice.</span>
          </div>
        </div>
      </section>

      {/* Horizontal Scrollable/Swipable Lists: Trending Rooms */}
      <section className="container max-w-5xl space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[9px] font-bold text-[#ee2e24] uppercase tracking-widest font-mono">HIGHEST RATED</span>
            <h2 className="text-xl font-extrabold text-zinc-850">Trending Properties on Oruhomes</h2>
          </div>
          <button 
            onClick={() => onSearch("")} 
            className="text-[11px] font-bold text-[#ee2e24] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            View All <ChevronRight size={12} />
          </button>
        </div>

        {/* Swipe container grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingPgs.map((pg) => (
            <div 
              key={pg.id} 
              className="card !p-0 flex flex-col group cursor-pointer border border-[#e5e7eb]"
              onClick={() => onSelectPg(pg)}
            >
              <div className="w-full h-44 relative bg-zinc-150">
                <img 
                  src={pg.images[0]} 
                  alt={pg.name} 
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                />
                
                {/* Badge tags overlay */}
                <div className="absolute top-2.5 left-2.5 flex gap-1">
                  <span className="badge badge-verified !text-[7px]">Verified</span>
                  <span className={`badge ${pg.gender === 'Boys' ? 'badge-boys' : pg.gender === 'Girls' ? 'badge-girls' : 'badge-coed'} !text-[7px]`}>
                    {pg.gender}
                  </span>
                </div>

                <div className="absolute bottom-2.5 right-2.5 bg-black/60 px-1.5 py-0.5 rounded text-[8px] font-bold text-white flex items-center gap-0.5">
                  <Star size={9} className="text-amber-400" fill="currentColor" />
                  <span>{pg.rating}</span>
                </div>

                <button className="absolute top-2.5 right-2.5 p-1 rounded-full bg-white/80 hover:bg-white text-zinc-400 hover:text-rose-500 transition-all shadow-sm">
                  <Heart size={12} />
                </button>
              </div>

              {/* Card info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-[#ee2e24] font-extrabold uppercase font-mono">{pg.location} • {pg.city}</span>
                  <h3 className="text-xs font-bold text-zinc-800 group-hover:text-[#ee2e24] transition-colors truncate">{pg.name}</h3>
                  <p className="text-[10px] text-zinc-500 font-light line-clamp-2 leading-relaxed">{pg.description}</p>
                </div>

                <div className="pt-2 border-t border-zinc-100 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-zinc-400 font-bold uppercase font-mono">starts from</span>
                    <span className="text-xs font-black text-[#ee2e24]">₹{pg.sharingPrices.triple}/mo</span>
                  </div>
                  <span className="text-[9px] font-bold text-[#ee2e24] flex items-center gap-0.5">
                    View Details <ChevronRight size={10} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Budget Friendly Section */}
      <section className="container max-w-5xl space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[9px] font-bold text-[#ee2e24] uppercase tracking-widest font-mono">POCKET FRIENDLY</span>
            <h2 className="text-xl font-extrabold text-zinc-850">Budget Co-Living Under ₹8,500</h2>
          </div>
          <button 
            onClick={() => onSearch("")} 
            className="text-[11px] font-bold text-[#ee2e24] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            View All <ChevronRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {budgetPgs.map((pg) => (
            <div 
              key={pg.id} 
              className="card !p-0 flex flex-col group cursor-pointer border border-[#e5e7eb]"
              onClick={() => onSelectPg(pg)}
            >
              <div className="w-full h-44 relative bg-zinc-150">
                <img 
                  src={pg.images[0]} 
                  alt={pg.name} 
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                />
                
                <div className="absolute top-2.5 left-2.5 flex gap-1">
                  <span className="badge badge-verified !text-[7px]">Verified</span>
                  <span className={`badge ${pg.gender === 'Boys' ? 'badge-boys' : pg.gender === 'Girls' ? 'badge-girls' : 'badge-coed'} !text-[7px]`}>
                    {pg.gender}
                  </span>
                </div>

                <div className="absolute bottom-2.5 right-2.5 bg-black/60 px-1.5 py-0.5 rounded text-[8px] font-bold text-white flex items-center gap-0.5">
                  <Star size={9} className="text-amber-400" fill="currentColor" />
                  <span>{pg.rating}</span>
                </div>
              </div>

              {/* Card info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-[#ee2e24] font-extrabold uppercase font-mono">{pg.location} • {pg.city}</span>
                  <h3 className="text-xs font-bold text-zinc-800 group-hover:text-[#ee2e24] transition-colors truncate">{pg.name}</h3>
                  <p className="text-[10px] text-zinc-500 font-light line-clamp-2 leading-relaxed">{pg.description}</p>
                </div>

                <div className="pt-2 border-t border-zinc-100 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-zinc-400 font-bold uppercase font-mono">starts from</span>
                    <span className="text-xs font-black text-[#ee2e24]">₹{pg.sharingPrices.triple}/mo</span>
                  </div>
                  <span className="text-[9px] font-bold text-[#ee2e24] flex items-center gap-0.5">
                    View Details <ChevronRight size={10} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
