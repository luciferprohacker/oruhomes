import React, { useState } from 'react';
import { User, ShieldAlert, Award, FileText, CheckCircle, Clock, Trash2, Send, MessageSquare, AlertCircle } from 'lucide-react';

export default function GuestDashboard({ activeUser, onUploadKyc, tickets, onCreateTicket }) {
  const [kycFile, setKycFile] = useState(null);
  const [kycUploading, setKycUploading] = useState(false);
  
  // Ticket Form
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDesc, setTicketDesc] = useState("");
  const [ticketCat, setTicketCat] = useState("Internet");
  const [ticketPriority, setTicketPriority] = useState("High");

  const handleKycUpload = (e) => {
    e.preventDefault();
    if (!kycFile) return;
    setKycUploading(true);
    setTimeout(() => {
      setKycUploading(false);
      onUploadKyc(kycFile.name);
    }, 2000);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketTitle || !ticketDesc) return;
    
    const newTicket = {
      id: `t-${Date.now()}`,
      tenantId: activeUser.id,
      tenantName: activeUser.name,
      pgName: activeUser.bookings[0]?.pgName || "General Query",
      title: ticketTitle,
      description: ticketDesc,
      category: ticketCat,
      priority: ticketPriority,
      status: "Open",
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    onCreateTicket(newTicket);
    setTicketTitle("");
    setTicketDesc("");
    alert("Support ticket logged successfully! Our team will address it within 4 hours.");
  };

  const activeBooking = activeUser.bookings.find(b => b.status === "Confirmed");
  const pastBookings = activeUser.bookings.filter(b => b.status !== "Confirmed");

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start pb-20">
      
      {/* LEFT COLUMN: Profile & KYC */}
      <div className="space-y-6 lg:col-span-1">
        {/* Profile Card */}
        <div className="card space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-violet-600 flex-center font-black text-lg text-white">
              {activeUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white leading-none">{activeUser.name}</h2>
              <span className="text-[10px] text-zinc-500 font-mono font-semibold">{activeUser.email}</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                  activeUser.kycStatus === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  KYC {activeUser.kycStatus}
                </span>
              </div>
            </div>
          </div>
          <div className="text-[11px] font-semibold text-zinc-400 font-mono space-y-1 pt-2 border-t border-white/5">
            <div>PHONE: {activeUser.phone}</div>
            <div>ROLE: Tenant</div>
          </div>
        </div>

        {/* KYC Upload Console */}
        {activeUser.kycStatus !== 'Verified' && (
          <div className="card space-y-4">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><FileText size={16} className="text-rose-500" /> Complete KYC Verification</h3>
            <p className="text-[10px] text-zinc-400 font-light leading-relaxed">
              Upload your National Identity Proof (Aadhaar, Passport, or PAN Card) to verify your PG booking. Verification takes 10 minutes.
            </p>
            
            <form onSubmit={handleKycUpload} className="space-y-3">
              <div className="border-2 border-dashed border-white/10 rounded-xl p-4 flex-center flex-col text-center bg-white/5 hover:border-rose-500/40 transition-colors cursor-pointer relative">
                <input 
                  type="file" 
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => setKycFile(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <span className="text-[10px] font-semibold text-zinc-400 block mb-0.5">
                  {kycFile ? kycFile.name : 'Select Aadhaar/ID file'}
                </span>
                <span className="text-[9px] text-zinc-600 font-medium">PDF, PNG, JPG up to 5MB</span>
              </div>

              <button 
                type="submit" 
                disabled={!kycFile || kycUploading}
                className="btn btn-primary btn-sm w-full"
              >
                {kycUploading ? 'Uploading ID...' : 'Submit Documents'}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* CENTER/RIGHT COLUMNS: Bookings & Support Tickets */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Active Booking Card */}
        {activeBooking ? (
          <div className="card space-y-5 border-emerald-500/20">
            <div className="flex justify-between items-start border-b border-white/5 pb-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">Active Reservation</span>
                <h3 className="text-base font-bold text-white">{activeBooking.pgName}</h3>
              </div>
              <span className="badge badge-verified">Move-in Confirmed</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono font-semibold text-zinc-400">
              <div>
                <span className="text-[9px] text-zinc-600 block uppercase font-sans">Sharing type</span>
                <span className="text-white capitalize">{activeBooking.sharingType} Share</span>
              </div>
              <div>
                <span className="text-[9px] text-zinc-600 block uppercase font-sans">Move-in Date</span>
                <span className="text-white">{activeBooking.moveInDate}</span>
              </div>
              <div>
                <span className="text-[9px] text-zinc-600 block uppercase font-sans">Monthly Rent</span>
                <span className="text-white">₹{activeBooking.rentAmount}</span>
              </div>
              <div>
                <span className="text-[9px] text-zinc-600 block uppercase font-sans">Refundable Deposit</span>
                <span className="text-white">₹{activeBooking.securityDeposit}</span>
              </div>
            </div>

            {/* Rent Payment Portal */}
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-emerald-500" size={20} />
                <div className="text-xs">
                  <span className="font-bold text-white block">Rent Paid for July 2026</span>
                  <span className="text-zinc-500 font-semibold">Your next rent invoice will generate on August 1st</span>
                </div>
              </div>
              <button className="btn btn-secondary btn-sm !py-1 !px-3 text-[10px] font-bold btn-disabled" disabled>
                Paid
              </button>
            </div>
          </div>
        ) : (
          <div className="card py-10 flex-center flex-col text-center space-y-4">
            <AlertCircle size={36} className="text-zinc-600" />
            <div>
              <h3 className="text-sm font-bold text-white">No Active Booking Found</h3>
              <p className="text-xs text-zinc-400 font-light max-w-sm mt-0.5">Explore our listing search page and book your room to see active leases here.</p>
            </div>
          </div>
        )}

        {/* Past Bookings */}
        {pastBookings.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">Past Bookings</h3>
            <div className="space-y-2">
              {pastBookings.map((b, idx) => (
                <div key={idx} className="card !p-4 flex justify-between items-center bg-white/5 border-white/5">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-white">{b.pgName}</h4>
                    <span className="text-[10px] text-zinc-500 font-mono font-semibold">Checked out: {b.moveInDate}</span>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-500">Lease Completed</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Support Tickets Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Create ticket form */}
          <div className="card space-y-4">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><MessageSquare size={16} className="text-rose-500" /> Log a Complaint</h3>
            
            <form onSubmit={handleTicketSubmit} className="space-y-3">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select 
                  value={ticketCat} 
                  onChange={(e) => setTicketCat(e.target.value)}
                  className="form-input text-xs"
                >
                  <option value="Internet">WiFi / Internet</option>
                  <option value="Food">Food / Meals</option>
                  <option value="Cleaning">Hygiene & Cleaning</option>
                  <option value="Electricity">Electrical / AC</option>
                  <option value="Security">Security & Access</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input 
                  type="text" 
                  placeholder="e.g. WiFi not working in corridor"
                  value={ticketTitle}
                  onChange={(e) => setTicketTitle(e.target.value)}
                  required
                  className="form-input text-xs" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Description</label>
                <textarea 
                  placeholder="Provide rooms details or error signals..."
                  value={ticketDesc}
                  onChange={(e) => setTicketDesc(e.target.value)}
                  required
                  rows="2"
                  className="form-input text-xs" 
                />
              </div>

              <button type="submit" className="btn btn-primary btn-sm w-full flex-center gap-1">
                <Send size={12} /> Submit Ticket
              </button>
            </form>
          </div>

          {/* Active Tickets List */}
          <div className="card space-y-4 max-h-[350px] overflow-y-auto">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><Clock size={16} className="text-violet-500" /> Ticket History</h3>
            
            {tickets.length === 0 ? (
              <div className="text-center py-8 text-zinc-600 text-xs font-semibold">
                No active complaints filed.
              </div>
            ) : (
              <div className="space-y-3">
                {tickets.map((tick) => (
                  <div key={tick.id} className="p-3 bg-[#12141d]/50 border border-white/5 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                        tick.status === 'Open' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {tick.status}
                      </span>
                      <span className="text-[9px] text-zinc-500 font-mono font-semibold">{tick.createdAt}</span>
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-white">{tick.title}</h4>
                      <p className="text-[10px] text-zinc-400 leading-normal">{tick.description}</p>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-semibold text-zinc-500">
                      <span>Category: {tick.category}</span>
                      <span className={`text-${tick.priority === 'High' ? 'rose-400' : 'amber-400'}`}>
                        {tick.priority} Priority
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
