import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Grid, Star, ShieldAlert, ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, Map, X } from 'lucide-react';
import MockMap from '../../components/MockMap';

export default function SearchResults({ pgs, searchQuery, onSelectPg }) {
  // Filter States
  const [selectedGender, setSelectedGender] = useState("all");
  const [priceRange, setPriceRange] = useState(25000);
  const [sharingType, setSharingType] = useState({ single: false, double: false, triple: false });
  const [amenities, setAmenities] = useState({ WiFi: false, AC: false, Food: false, Laundry: false, Gym: false, Security: false });
  const [sortOrder, setSortOrder] = useState("rating-desc");
  const [selectedMapPg, setSelectedMapPg] = useState(null);

  // Mobile UX States
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMobileMap, setShowMobileMap] = useState(false);

  // Card Image Indexes (pgId -> activeImageIndex)
  const [cardImageIndexes, setCardImageIndexes] = useState({});

  const handlePrevImage = (e, pgId, imagesLength) => {
    e.stopPropagation();
    setCardImageIndexes(prev => {
      const current = prev[pgId] || 0;
      const next = (current - 1 + imagesLength) % imagesLength;
      return { ...prev, [pgId]: next };
    });
  };

  const handleNextImage = (e, pgId, imagesLength) => {
    e.stopPropagation();
    setCardImageIndexes(prev => {
      const current = prev[pgId] || 0;
      const next = (current + 1) % imagesLength;
      return { ...prev, [pgId]: next };
    });
  };

  // Filter Logic
  const filteredPGs = useMemo(() => {
    return pgs.filter(pg => {
      if (!pg.approved) return false;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = pg.name.toLowerCase().includes(query);
        const matchesLoc = pg.location.toLowerCase().includes(query);
        const matchesCity = pg.city.toLowerCase().includes(query);
        if (!matchesName && !matchesLoc && !matchesCity) return false;
      }

      if (selectedGender !== "all" && pg.gender !== selectedGender) return false;

      const minPrice = Math.min(...Object.values(pg.sharingPrices));
      if (minPrice > priceRange) return false;

      const isAnySharingChecked = Object.values(sharingType).some(v => v);
      if (isAnySharingChecked) {
        let match = false;
        if (sharingType.single && pg.sharingPrices.single) match = true;
        if (sharingType.double && pg.sharingPrices.double) match = true;
        if (sharingType.triple && pg.sharingPrices.triple) match = true;
        if (!match) return false;
      }

      if (amenities.WiFi && !pg.amenities.includes("WiFi")) return false;
      if (amenities.AC && !pg.amenities.includes("AC")) return false;
      if (amenities.Food && !pg.amenities.includes("Food included")) return false;
      if (amenities.Laundry && !pg.amenities.includes("Laundry")) return false;
      if (amenities.Gym && !pg.amenities.includes("Gym")) return false;
      if (amenities.Security && !pg.amenities.includes("24/7 Security") && !pg.amenities.includes("CCTV Security")) return false;

      return true;
    }).sort((a, b) => {
      if (sortOrder === "rating-desc") return b.rating - a.rating;
      const priceA = a.sharingPrices.double || a.sharingPrices.single;
      const priceB = b.sharingPrices.double || b.sharingPrices.single;
      if (sortOrder === "price-asc") return priceA - priceB;
      if (sortOrder === "price-desc") return priceB - priceA;
      return 0;
    });
  }, [pgs, searchQuery, selectedGender, priceRange, sharingType, amenities, sortOrder]);

  const renderFilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <h2 className="text-xs font-black text-zinc-800 flex items-center gap-2">
          <SlidersHorizontal size={12} className="text-[#ee2e24]" /> Refine Search
        </h2>
        <button 
          onClick={() => {
            setSelectedGender("all");
            setPriceRange(25000);
            setSharingType({ single: false, double: false, triple: false });
            setAmenities({ WiFi: false, AC: false, Food: false, Laundry: false, Gym: false, Security: false });
          }}
          className="text-[9px] font-bold text-zinc-400 hover:text-[#ee2e24]"
        >
          Reset Filters
        </button>
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-wider block">Gender Categories</span>
        <div className="grid grid-cols-2 gap-1.5">
          {['all', 'Boys', 'Girls', 'Co-ed'].map((gender) => (
            <button
              key={gender}
              onClick={() => setSelectedGender(gender)}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                selectedGender === gender
                  ? 'bg-[#ee2e24] border-[#ee2e24] text-white'
                  : 'bg-white border-zinc-200 text-zinc-650 hover:bg-zinc-50'
              }`}
            >
              {gender === 'all' ? 'All Rooms' : `${gender} Only`}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] font-bold">
          <span className="text-zinc-500 uppercase tracking-wider">Max Budget Limit</span>
          <span className="text-[#ee2e24]">₹{priceRange.toLocaleString('en-IN')}/mo</span>
        </div>
        <input 
          type="range" 
          min="5000" 
          max="25000" 
          step="1000"
          value={priceRange} 
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-[#ee2e24] bg-zinc-200 h-1.5 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[8px] font-mono text-zinc-400">
          <span>₹5k</span>
          <span>₹25k</span>
        </div>
      </div>

      {/* Occupancy */}
      <div className="space-y-2">
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-wider block">Room Occupancy</span>
        <div className="flex flex-col gap-1.5">
          {Object.keys(sharingType).map((type) => (
            <label key={type} className="flex items-center gap-2 text-xs text-zinc-650 font-bold cursor-pointer">
              <input 
                type="checkbox" 
                checked={sharingType[type]} 
                onChange={(e) => setSharingType(prev => ({ ...prev, [type]: e.target.checked }))}
                className="accent-[#ee2e24] w-4 h-4 rounded border-zinc-300"
              />
              <span className="capitalize">{type} sharing</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-2">
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-wider block">Room Amenities</span>
        <div className="flex flex-col gap-1.5">
          {Object.keys(amenities).map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 text-xs text-zinc-650 font-bold cursor-pointer">
              <input 
                type="checkbox" 
                checked={amenities[amenity]} 
                onChange={(e) => setAmenities(prev => ({ ...prev, [amenity]: e.target.checked }))}
                className="accent-[#ee2e24] w-4 h-4 rounded border-zinc-300"
              />
              <span>{amenity === 'Food' ? 'Meals Included' : amenity === 'Security' ? 'Access Control Security' : amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-100px)] overflow-hidden bg-[#f9fafb]">
      
      {/* Desktop Filters Sidebar */}
      <aside className="hidden lg:block w-[280px] bg-white border border-[#e5e7eb] rounded-2xl p-5 overflow-y-auto max-h-full flex-shrink-0 shadow-sm">
        {renderFilterContent()}
      </aside>

      {/* Results Deck */}
      <section className="flex-1 h-full overflow-y-auto pr-1 space-y-4 max-h-full w-full">
        {/* Sort & Stats Bar */}
        <div className="flex justify-between items-center bg-white border border-[#e5e7eb] p-3 rounded-xl shadow-sm">
          <div className="text-xs font-bold text-zinc-700">
            Showing <span className="text-[#ee2e24]">{filteredPGs.length}</span> matching spaces
            {searchQuery && <span> in <span className="text-[#ee2e24] font-black">"{searchQuery}"</span></span>}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Mobile Filter Button */}
            <button 
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden btn btn-secondary !py-1 !px-2.5 text-[10px] font-extrabold flex items-center gap-1"
            >
              <SlidersHorizontal size={10} /> Filters
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider hidden sm:inline">Sort:</span>
              <div className="relative">
                <select 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="appearance-none bg-zinc-50 border border-[#e5e7eb] rounded-lg px-3 py-1 pr-8 text-xs font-bold text-zinc-800 outline-none cursor-pointer hover:bg-zinc-100"
                >
                  <option value="rating-desc">Rating: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Cards List */}
        {filteredPGs.length === 0 ? (
          <div className="card bg-white flex-center flex-col py-16 text-center space-y-4 border border-[#e5e7eb]">
            <ShieldAlert size={44} className="text-zinc-400 animate-bounce" />
            <h3 className="text-sm font-bold text-zinc-800">No matching PGs found</h3>
            <p className="text-xs text-zinc-500 max-w-sm font-light">
              We couldn't find any rooms fitting those exact filters. Try relaxing price caps or amenity selections.
            </p>
            <button 
              onClick={() => {
                setSelectedGender("all");
                setPriceRange(25000);
                setSharingType({ single: false, double: false, triple: false });
                setAmenities({ WiFi: false, AC: false, Food: false, Laundry: false, Gym: false, Security: false });
              }}
              className="btn btn-secondary btn-sm"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPGs.map((pg) => {
              const isSelectedOnMap = selectedMapPg && selectedMapPg.id === pg.id;
              const imgIndex = cardImageIndexes[pg.id] || 0;

              return (
                <div 
                  key={pg.id} 
                  className={`card !p-0 flex flex-col group cursor-pointer border-[#e5e7eb] bg-white ${
                    isSelectedOnMap ? 'border-[#ee2e24] ring-1 ring-[#ee2e24]' : ''
                  }`}
                  onClick={() => onSelectPg(pg)}
                  onMouseEnter={() => setSelectedMapPg(pg)}
                >
                  {/* Card Image Block with Direct Arrow Navigation */}
                  <div className="w-full h-44 relative overflow-hidden bg-zinc-100 rounded-t-xl">
                    <img 
                      src={pg.images[imgIndex]} 
                      alt={pg.name} 
                      className="w-full h-full object-cover transition-all"
                    />

                    {/* Inline Image Navigation controls */}
                    {pg.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => handlePrevImage(e, pg.id, pg.images.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-zinc-800 shadow-sm"
                        >
                          <ChevronLeft size={14} strokeWidth={2.5} />
                        </button>
                        <button
                          onClick={(e) => handleNextImage(e, pg.id, pg.images.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-zinc-800 shadow-sm"
                        >
                          <ChevronRight size={14} strokeWidth={2.5} />
                        </button>
                      </>
                    )}

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

                  {/* Card Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[9px] text-[#ee2e24] font-extrabold uppercase font-mono">{pg.location} • {pg.city}</span>
                      <h3 className="text-xs font-bold text-zinc-800 group-hover:text-[#ee2e24] transition-colors truncate mt-0.5">{pg.name}</h3>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {pg.amenities.slice(0, 3).map((am, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded bg-zinc-100 text-[8px] text-zinc-550 font-bold border border-zinc-200">
                            {am}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 flex justify-between items-center">
                      <div>
                        <span className="text-[8px] text-zinc-400 font-bold uppercase block leading-none">Double sharing</span>
                        <span className="text-xs font-black text-zinc-850">₹{pg.sharingPrices.double}/mo</span>
                      </div>
                      <button className="btn btn-primary btn-sm !py-1 !px-2.5 text-[9px] font-black uppercase">
                        Book Room
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Desktop Map Canvas */}
      <section className="hidden lg:block w-[380px] h-full flex-shrink-0">
        <MockMap 
          pgs={filteredPGs} 
          selectedPg={selectedMapPg} 
          onSelectPg={(pg) => {
            setSelectedMapPg(pg);
            onSelectPg(pg);
          }} 
        />
      </section>

      {/* Mobile Floating Action Button: Map Toggle */}
      <button 
        onClick={() => setShowMobileMap(true)}
        className="lg:hidden fixed bottom-6 right-6 z-30 btn btn-accent flex items-center gap-1.5 !rounded-full shadow-lg !py-2.5 !px-4 text-xs"
      >
        <Map size={14} /> Map View
      </button>

      {/* Mobile Map Modal Drawer */}
      {showMobileMap && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="p-4 border-b border-[#e5e7eb] flex justify-between items-center">
            <h3 className="text-xs font-bold text-zinc-800">Room Location Maps</h3>
            <button 
              onClick={() => setShowMobileMap(false)}
              className="p-1 rounded bg-zinc-100 text-zinc-650"
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex-1">
            <MockMap 
              pgs={filteredPGs} 
              selectedPg={selectedMapPg} 
              onSelectPg={(pg) => {
                setSelectedMapPg(pg);
                setShowMobileMap(false);
                onSelectPg(pg);
              }} 
            />
          </div>
        </div>
      )}

      {/* Mobile Filter Slide-up Bottom Sheet */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bottom-sheet p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-200">
              <span className="text-xs font-extrabold text-zinc-800">Filter Preferences</span>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="p-1 text-zinc-400 hover:text-zinc-800"
              >
                <X size={16} />
              </button>
            </div>
            {renderFilterContent()}
            <button 
              onClick={() => setShowMobileFilters(false)}
              className="btn btn-primary w-full !py-2.5 text-xs font-bold uppercase tracking-wider mt-4"
            >
              Apply Filters ({filteredPGs.length} spaces)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
