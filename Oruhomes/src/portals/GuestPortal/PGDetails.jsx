import React, { useState } from 'react';
import { Star, Wifi, Shield, Check, ArrowLeft, Calendar, FileText, UserCheck, MessageSquarePlus, Wind, UtensilsCrossed, WashingMachine, Dumbbell, ShieldCheck, HelpCircle } from 'lucide-react';
import ImageCarousel from '../../components/ImageCarousel';

export default function PGDetails({ pg, onBack, onBook }) {
  const [sharingOption, setSharingOption] = useState("double"); // single, double, triple
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("11:00");
  const [visitScheduled, setVisitScheduled] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [reviewsList, setReviewsList] = useState(pg.reviews || []);

  const handleScheduleVisit = (e) => {
    e.preventDefault();
    if (!visitDate) return;
    setVisitScheduled(true);
    setTimeout(() => {
      setShowVisitModal(false);
      setVisitScheduled(false);
      alert(`Visit Scheduled Successfully for ${visitDate} at ${visitTime} AM/PM!`);
    }, 2000);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.comment) return;
    const reviewObj = {
      id: `r-${Date.now()}`,
      user: "Aditya Kumar",
      rating: Number(newReview.rating),
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    setReviewsList([reviewObj, ...reviewsList]);
    setNewReview({ rating: 5, comment: "" });
  };

  // Maps amenity string to Lucide Icon
  const getAmenityIcon = (name) => {
    const term = name.toLowerCase();
    if (term.includes('wifi')) return <Wifi size={16} className="text-[#ee2e24]" />;
    if (term.includes('ac')) return <Wind size={16} className="text-[#ee2e24]" />;
    if (term.includes('food')) return <UtensilsCrossed size={16} className="text-[#ee2e24]" />;
    if (term.includes('laundry')) return <WashingMachine size={16} className="text-[#ee2e24]" />;
    if (term.includes('gym')) return <Dumbbell size={16} className="text-[#ee2e24]" />;
    if (term.includes('security')) return <ShieldCheck size={16} className="text-[#ee2e24]" />;
    return <Check size={16} className="text-[#ee2e24]" />;
  };

  const currentRent = pg.sharingPrices[sharingOption];

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8 space-y-8 pb-24 bg-[#f9fafb]">
      {/* Back Link */}
      <button 
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-[#ee2e24] transition-colors cursor-pointer"
      >
        <ArrowLeft size={14} /> Back to Search Listings
      </button>

      {/* Main Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="h-[280px] sm:h-[380px] rounded-2xl overflow-hidden border border-[#e5e7eb] shadow-sm bg-zinc-200">
            <ImageCarousel images={pg.images} />
          </div>

          <div className="space-y-4 bg-white border border-[#e5e7eb] p-6 rounded-2xl shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`badge ${pg.gender === 'Boys' ? 'badge-boys' : pg.gender === 'Girls' ? 'badge-girls' : 'badge-coed'}`}>
                {pg.gender} PG
              </span>
              <span className="badge badge-verified">Oruhomes Approved</span>
              <span className="badge badge-warning !bg-rose-50 !text-[#ee2e24] !border-red-150">No Brokerage</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-800 leading-tight">{pg.name}</h1>
            <p className="text-xs font-bold text-zinc-400 font-mono">{pg.address}</p>
            <p className="text-xs font-light text-zinc-650 leading-relaxed pt-2 border-t border-zinc-100">{pg.description}</p>
          </div>

          {/* Amenities Icon Grid */}
          <div className="bg-white border border-[#e5e7eb] p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-xs font-black text-zinc-700 uppercase tracking-widest font-mono">Amenities & Services</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {pg.amenities.map((am, idx) => (
                <div key={idx} className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-100 text-xs font-bold text-zinc-700">
                  {getAmenityIcon(am)}
                  <span>{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rules lists */}
          <div className="bg-white border border-[#e5e7eb] p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-xs font-black text-zinc-700 uppercase tracking-widest font-mono">House Regulations</h3>
            <div className="flex flex-col gap-2.5">
              {pg.rules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-zinc-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ee2e24] mt-1.5 flex-shrink-0"></span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Block */}
          <div className="bg-white border border-[#e5e7eb] p-6 rounded-2xl shadow-sm space-y-6">
            <h3 className="text-xs font-black text-zinc-700 uppercase tracking-widest font-mono">Resident Feedback</h3>
            
            <div className="flex items-center gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
              <div className="text-center space-y-1">
                <span className="text-2xl font-black text-zinc-800">{pg.rating}</span>
                <div className="flex items-center justify-center gap-0.5 text-amber-500">
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                </div>
                <div className="text-[9px] text-zinc-400 font-bold">{reviewsList.length} reviews</div>
              </div>
              <div className="flex-1 text-[9px] font-bold text-zinc-500 space-y-1 pl-4 border-l border-zinc-200">
                <div className="flex items-center gap-2">
                  <span className="w-8">5 Star</span>
                  <div className="flex-1 h-1 bg-zinc-200 rounded overflow-hidden">
                    <div className="w-[85%] h-full bg-emerald-500"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8">4 Star</span>
                  <div className="flex-1 h-1 bg-zinc-200 rounded overflow-hidden">
                    <div className="w-[15%] h-full bg-emerald-400"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Post review */}
            <form onSubmit={handleAddReview} className="space-y-3 bg-zinc-50 border border-zinc-100 p-4 rounded-xl">
              <span className="text-[11px] font-bold text-zinc-700 block">Post a Resident Review</span>
              <div className="flex gap-4 items-center">
                <span className="text-[10px] text-zinc-500 font-bold">Rating:</span>
                <select 
                  value={newReview.rating} 
                  onChange={(e) => setNewReview(prev => ({ ...prev, rating: e.target.value }))}
                  className="bg-white border border-zinc-200 rounded px-2 py-0.5 text-[11px] font-bold text-zinc-800 outline-none"
                >
                  <option value="5">5 Star</option>
                  <option value="4">4 Star</option>
                  <option value="3">3 Star</option>
                </select>
              </div>
              <textarea 
                placeholder="Share clean details about food, wardens, or rooms..."
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                rows="2"
                className="w-full bg-white border border-zinc-200 p-2.5 rounded-lg text-xs text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-[#ee2e24]"
              />
              <button type="submit" className="btn btn-primary btn-sm flex items-center gap-1">
                <MessageSquarePlus size={12} /> Post Review
              </button>
            </form>

            <div className="space-y-3">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="p-4 bg-zinc-50/50 border border-zinc-100 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500">
                    <span className="text-zinc-800">{rev.user}</span>
                    <span className="font-mono">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={9} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs font-light text-zinc-650">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Pricing Block */}
        <div className="card bg-white border border-[#e5e7eb] p-6 rounded-2xl shadow-sm space-y-6 sticky top-24">
          <div className="pb-3 border-b border-zinc-100">
            <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider block mb-1">Select Share Configuration</span>
            <div className="flex bg-zinc-100 p-1 rounded-xl border border-zinc-200">
              {['single', 'double', 'triple'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSharingOption(opt)}
                  className="flex-1 py-1.5 text-xs font-bold rounded-lg transition-all capitalize"
                  style={{
                    background: sharingOption === opt ? '#ee2e24' : 'transparent',
                    color: sharingOption === opt ? '#ffffff' : 'var(--text-secondary)'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 text-xs font-bold text-zinc-500">
            <div className="flex justify-between items-center">
              <span>Monthly rent</span>
              <span className="text-zinc-800 font-mono">₹{currentRent?.toLocaleString('en-IN') || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Refundable Deposit</span>
              <span className="text-zinc-800 font-mono">₹{pg.securityDeposit.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Maintenance fee</span>
              <span className="text-zinc-800 font-mono">₹{pg.maintenance.toLocaleString('en-IN')}</span>
            </div>
            <div className="h-px bg-zinc-100 my-2"></div>
            <div className="flex justify-between items-center text-sm text-zinc-800">
              <span>Payable Total</span>
              <span className="text-[#ee2e24] font-mono">₹{(currentRent + pg.securityDeposit + pg.maintenance).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button 
              onClick={() => onBook(pg, sharingOption)}
              className="btn btn-primary w-full !py-2.5 text-xs font-black uppercase tracking-wider"
            >
              Instant Book
            </button>
            <button 
              onClick={() => setShowVisitModal(true)}
              className="btn btn-secondary w-full !py-2.5 text-xs font-black uppercase tracking-wider"
            >
              Schedule visit
            </button>
          </div>
        </div>
      </div>

      {/* OYO-Style Bottom Sticky Action Bar (Mobile only) */}
      <div className="lg:hidden sticky-action-bar">
        <div>
          <span className="text-[8px] text-zinc-400 font-bold block uppercase leading-none">double rent starts</span>
          <span className="text-sm font-black text-[#ee2e24] font-mono">₹{pg.sharingPrices[sharingOption]?.toLocaleString('en-IN')}/mo</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowVisitModal(true)}
            className="btn btn-secondary btn-sm !font-bold"
          >
            Visit
          </button>
          <button 
            onClick={() => onBook(pg, sharingOption)}
            className="btn btn-primary btn-sm !font-bold"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Schedule a Visit Modal */}
      {showVisitModal && (
        <div className="fixed inset-0 z-50 flex-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="card bg-white max-w-sm w-full border-[#e5e7eb] p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-zinc-800 flex items-center gap-1.5"><Calendar size={16} className="text-[#ee2e24]" /> Schedule a PG Visit</h3>
              <button 
                onClick={() => setShowVisitModal(false)}
                className="text-zinc-400 hover:text-zinc-800 font-bold text-xs"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              Plan your physical walkthrough at <span className="font-bold text-zinc-800">{pg.name}</span>. Visited rooms receive platform priority.
            </p>

            <form onSubmit={handleScheduleVisit} className="space-y-4">
              <div className="form-group">
                <label className="form-label">Visit Date</label>
                <input 
                  type="date" 
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  required
                  className="form-input text-xs" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Hour Slot</label>
                <select 
                  value={visitTime}
                  onChange={(e) => setVisitTime(e.target.value)}
                  className="form-input text-xs"
                >
                  <option value="10:00">10:00 AM (Morning)</option>
                  <option value="12:00">12:00 PM (Noon)</option>
                  <option value="15:00">03:00 PM (Afternoon)</option>
                  <option value="17:30">05:30 PM (Evening)</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-full !py-2.5 text-xs font-bold uppercase tracking-wider"
              >
                Confirm Visit Time
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
