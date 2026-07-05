import React from 'react';
import { MapPin, ZoomIn, ZoomOut, Navigation, Star } from 'lucide-react';

export default function MockMap({ pgs, selectedPg, onSelectPg }) {
  // Map simulated grid size
  const mapCoordinates = {
    "pg-1": { x: 30, y: 40, label: "HSR Layout" },
    "pg-2": { x: 45, y: 65, label: "Koramangala" },
    "pg-3": { x: 75, y: 35, label: "Whitefield" },
    "pg-4": { x: 60, y: 15, label: "Noida Sec 62" },
    "pg-5": { x: 20, y: 75, label: "Viman Nagar" },
    "pg-6": { x: 80, y: 70, label: "Madhapur" }
  };

  return (
    <div className="w-full h-full bg-[#f3f4f6] rounded-2xl border border-[#e5e7eb] relative overflow-hidden flex flex-col shadow-sm">
      {/* Map Control Bar */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/95 border border-[#e5e7eb] p-1.5 rounded-lg shadow-md">
        <button className="p-1 rounded hover:bg-zinc-100 text-zinc-500 hover:text-[#ee2e24] transition-all">
          <ZoomIn size={14} />
        </button>
        <button className="p-1 rounded hover:bg-zinc-100 text-zinc-500 hover:text-[#ee2e24] transition-all">
          <ZoomOut size={14} />
        </button>
        <div className="w-px h-3.5 bg-zinc-200"></div>
        <button className="p-1 rounded hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 transition-all flex items-center gap-1 text-[9px] font-bold">
          <Navigation size={10} className="text-[#ee2e24]" /> Current Location
        </button>
      </div>

      <div className="absolute top-4 right-4 z-10 flex flex-col gap-1 bg-white/95 border border-[#e5e7eb] p-2 rounded-lg text-[9px] font-bold text-zinc-500 shadow-md">
        <span className="text-[8px] font-black text-zinc-400 uppercase tracking-wider mb-0.5">LEGEND</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-500"></span> Boys PGs
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500"></span> Girls PGs
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span> Co-ed PGs
        </div>
      </div>

      {/* Grid Map Canvas */}
      <div className="flex-1 w-full relative bg-[#f3f5f8] flex items-center justify-center min-h-[350px]">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[size:25px_25px]"></div>
        
        {/* Mock Roads */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <path d="M 0,150 Q 300,180 600,100 T 1200,200" fill="none" stroke="#ffffff" strokeWidth="12" />
          <path d="M 200,0 L 200,800" fill="none" stroke="#ffffff" strokeWidth="8" />
          <path d="M 500,0 Q 450,400 650,800" fill="none" stroke="#ffffff" strokeWidth="8" strokeDasharray="3,3" />
          <path d="M 0,400 L 1200,450" fill="none" stroke="#ffffff" strokeWidth="6" />
        </svg>

        {/* Mock Green Zones */}
        <div className="absolute top-[20%] left-[10%] w-[16%] h-[10%] bg-emerald-500/10 rounded-full filter blur-lg border border-emerald-500/20 flex items-center justify-center text-[8px] text-emerald-600 font-extrabold uppercase tracking-wider">Park</div>
        <div className="absolute bottom-[30%] right-[15%] w-[18%] h-[12%] bg-indigo-500/5 rounded-full filter blur-lg border border-indigo-500/10 flex items-center justify-center text-[8px] text-indigo-500 font-extrabold uppercase tracking-wider">Tech Hub</div>
        
        {/* Render PG Pins */}
        {pgs.map((pg) => {
          const coord = mapCoordinates[pg.id] || { x: 50, y: 50 };
          const isSelected = selectedPg && selectedPg.id === pg.id;
          
          let pinColor = "#ee2e24"; // Red default
          if (pg.gender === "Boys") pinColor = "#0284c7"; // Sky Blue
          if (pg.gender === "Girls") pinColor = "#db2777"; // Rose Pink
          if (pg.gender === "Co-ed") pinColor = "#7c3aed"; // Purple

          return (
            <button
              key={pg.id}
              onClick={() => onSelectPg(pg)}
              className="absolute group transition-transform duration-300"
              style={{
                left: `${coord.x}%`,
                top: `${coord.y}%`,
                transform: `translate(-50%, -50%) ${isSelected ? 'scale(1.2)' : 'scale(1)'}`,
                zIndex: isSelected ? 30 : 20
              }}
            >
              {/* Pin ripple */}
              {isSelected && (
                <span className="absolute -inset-2 rounded-full animate-ping opacity-60" style={{ backgroundColor: pinColor }}></span>
              )}
              
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center shadow-md border border-white transition-all group-hover:scale-115"
                style={{
                  backgroundColor: isSelected ? pinColor : 'white',
                  color: isSelected ? 'white' : pinColor
                }}
              >
                <MapPin size={13} strokeWidth={3} />
              </div>

              {/* Pin tooltip */}
              <div className="absolute top-7 left-1/2 -translate-x-1/2 bg-white border border-[#e5e7eb] px-2 py-0.5 rounded text-[8px] font-bold text-zinc-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                ₹{(pg.sharingPrices.double / 1000).toFixed(1)}k/mo
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected PG Detail Popup */}
      {selectedPg && (
        <div className="p-3.5 bg-white border-t border-[#e5e7eb] flex items-center gap-3 shadow-lg relative z-20">
          <div className="w-14 h-14 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0">
            <img src={selectedPg.images[0]} alt={selectedPg.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className={`badge ${selectedPg.gender === 'Boys' ? 'badge-boys' : selectedPg.gender === 'Girls' ? 'badge-girls' : 'badge-coed'} !px-1 !py-0 !text-[8px]`}>
                {selectedPg.gender}
              </span>
              <div className="flex items-center gap-0.5 text-amber-500 text-[10px]">
                <Star size={9} fill="currentColor" />
                <span className="font-extrabold">{selectedPg.rating}</span>
              </div>
            </div>
            <h4 className="text-[11px] font-extrabold text-[#111827] truncate">{selectedPg.name}</h4>
            <p className="text-[9px] text-zinc-500 font-bold">{selectedPg.location}, {selectedPg.city}</p>
            <p className="text-[11px] font-extrabold text-[#ee2e24] mt-0.5">₹{selectedPg.sharingPrices.double} / month <span className="text-[8px] text-zinc-400 font-normal font-sans">(Double share)</span></p>
          </div>
          <button 
            onClick={() => onSelectPg(selectedPg)}
            className="btn btn-primary btn-sm !px-3 !py-1 text-[9px] font-bold flex-shrink-0"
          >
            Details
          </button>
        </div>
      )}
    </div>
  );
}
