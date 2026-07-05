import React, { useState } from 'react';
import { Home, Users, Landmark, Coins, Plus, Eye, Check, X, FileCheck, ArrowUpRight, CheckCircle } from 'lucide-react';

export default function HostDashboard({ pgs, activeUser, onAddPg, tenants, onUpdateTenantRent }) {
  const [activeTab, setActiveTab] = useState("overview"); // overview, properties, add-pg, tenants
  
  // Add PG Form States
  const [pgName, setPgName] = useState("");
  const [pgDesc, setPgDesc] = useState("");
  const [pgAddress, setPgAddress] = useState("");
  const [pgLocation, setPgLocation] = useState("");
  const [pgCity, setPgCity] = useState("Bangalore");
  const [pgLandmark, setPgLandmark] = useState("");
  const [pgGender, setPgGender] = useState("Co-ed");
  const [singlePrice, setSinglePrice] = useState(15000);
  const [doublePrice, setDoublePrice] = useState(10000);
  const [triplePrice, setTriplePrice] = useState(8000);
  const [deposit, setDeposit] = useState(12000);
  const [maintenance, setMaintenance] = useState(1000);
  const [amenitiesList, setAmenitiesList] = useState({
    WiFi: true,
    AC: false,
    "Food included": true,
    Laundry: true,
    Gym: false,
    "Power Backup": true,
    "CCTV Security": true
  });

  const myPgs = pgs.filter(pg => pg.hostId === activeUser.id);
  const totalBeds = myPgs.reduce((sum, pg) => sum + Object.values(pg.availableBeds).reduce((a, b) => a + b, 0), 0);
  const activeTenantsCount = tenants.filter(t => t.bookings.some(b => myPgs.some(p => p.id === b.pgId))).length;
  const estimatedRevenue = myPgs.filter(p => p.approved).reduce((sum, pg) => sum + (pg.sharingPrices.double * 5), 0); // Simulated occupancy revenue

  const handleAddPgSubmit = (e) => {
    e.preventDefault();
    if (!pgName || !pgLocation || !pgAddress) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    const selectedAmenities = Object.keys(amenitiesList).filter(key => amenitiesList[key]);

    const newPg = {
      id: `pg-${Date.now()}`,
      name: pgName,
      description: pgDesc || "A modern verified PG listing hosted on Oruhomes.",
      address: pgAddress,
      location: pgLocation,
      city: pgCity,
      landmark: pgLandmark,
      gender: pgGender,
      rating: 5.0,
      reviewsCount: 0,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
      ],
      amenities: selectedAmenities,
      rules: [
        "Curfew time is 11:00 PM.",
        "Maintain silence in corridors.",
        "Keep rooms tidy."
      ],
      sharingPrices: {
        single: Number(singlePrice),
        double: Number(doublePrice),
        triple: Number(triplePrice)
      },
      securityDeposit: Number(deposit),
      maintenance: Number(maintenance),
      hostId: activeUser.id,
      approved: false, // Pending Super Admin approval!
      availableBeds: {
        single: 2,
        double: 4,
        triple: 6
      },
      reviews: []
    };

    onAddPg(newPg);
    alert(`Property "${pgName}" submitted successfully! It is now pending verification from the Super Admin.`);
    
    // Reset Form
    setPgName("");
    setPgDesc("");
    setPgAddress("");
    setPgLocation("");
    setPgLandmark("");
    setActiveTab("properties");
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 space-y-6 pb-20">
      
      {/* Host Metrics Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/5 border border-white/5 p-6 rounded-3xl">
        <div>
          <span className="text-[10px] text-rose-500 font-bold uppercase tracking-widest font-mono">Host Console</span>
          <h1 className="text-xl font-extrabold text-white">Owner Portal: {activeUser.company || activeUser.name}</h1>
        </div>
        
        <div className="flex gap-2">
          {['overview', 'properties', 'add-pg', 'tenants'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all capitalize border ${
                activeTab === tab 
                  ? 'bg-rose-500 border-rose-500 text-white shadow-lg' 
                  : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10'
              }`}
            >
              {tab === 'add-pg' ? 'List New PG' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW PANEL */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Analytics Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card space-y-2">
              <div className="flex justify-between items-center text-zinc-500">
                <span className="text-xs font-bold">Active Tenants</span>
                <Users size={16} className="text-rose-500" />
              </div>
              <span className="text-2xl font-black text-white">{activeTenantsCount}</span>
              <span className="text-[9px] text-zinc-500 block">Occupied beds across rooms</span>
            </div>

            <div className="card space-y-2">
              <div className="flex justify-between items-center text-zinc-500">
                <span className="text-xs font-bold">Listed Properties</span>
                <Home size={16} className="text-violet-500" />
              </div>
              <span className="text-2xl font-black text-white">{myPgs.length}</span>
              <span className="text-[9px] text-zinc-500 block">
                {myPgs.filter(p => !p.approved).length} pending admin review
              </span>
            </div>

            <div className="card space-y-2">
              <div className="flex justify-between items-center text-zinc-500">
                <span className="text-xs font-bold">Estimated Monthly Revenue</span>
                <Coins size={16} className="text-emerald-500" />
              </div>
              <span className="text-2xl font-black text-emerald-400">₹{estimatedRevenue.toLocaleString('en-IN')}</span>
              <span className="text-[9px] text-zinc-500 block">Calculated at 80% occupancy</span>
            </div>

            <div className="card space-y-2">
              <div className="flex justify-between items-center text-zinc-500">
                <span className="text-xs font-bold">Available Beds</span>
                <Landmark size={16} className="text-amber-500" />
              </div>
              <span className="text-2xl font-black text-white">{totalBeds}</span>
              <span className="text-[9px] text-zinc-500 block">Vacant beds in database</span>
            </div>
          </div>

          {/* Quick Tables Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Box: Pending Approvals list */}
            <div className="card lg:col-span-2 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Property Listing Statuses</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Property Name</th>
                      <th>Location</th>
                      <th>Rooms</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myPgs.map((pg) => (
                      <tr key={pg.id}>
                        <td className="font-bold text-white">{pg.name}</td>
                        <td>{pg.location}</td>
                        <td className="font-mono">₹{pg.sharingPrices.double}/mo</td>
                        <td>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            pg.approved ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {pg.approved ? 'Live (Approved)' : 'Pending Approval'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Box: Payout Config */}
            <div className="card space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Bank Account Payout</h3>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-2 text-xs font-semibold text-zinc-400">
                <div>HOLDER: <span className="text-white font-mono">{activeUser.payoutDetails?.accountHolder}</span></div>
                <div>BANK: <span className="text-white font-mono">{activeUser.payoutDetails?.bankName}</span></div>
                <div>ACCOUNT: <span className="text-white font-mono">{activeUser.payoutDetails?.accountNumber}</span></div>
                <div>IFSC: <span className="text-white font-mono">{activeUser.payoutDetails?.ifsc}</span></div>
              </div>
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl flex items-center gap-2">
                <CheckCircle className="text-emerald-500 flex-shrink-0" size={16} />
                <span className="text-[10px] text-emerald-400 font-semibold">Direct Deposit configured securely. Payouts processed every Saturday.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MY LISTINGS PANEL */}
      {activeTab === 'properties' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myPgs.map((pg) => (
            <div key={pg.id} className="card !p-0 flex flex-col justify-between">
              <div>
                <div className="w-full h-40 bg-zinc-800 relative">
                  <img src={pg.images[0]} alt={pg.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3">
                    <span className={`badge ${pg.approved ? 'badge-verified' : 'badge-warning'}`}>
                      {pg.approved ? 'Live' : 'Pending Verification'}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-bold text-white truncate">{pg.name}</h3>
                  <p className="text-[10px] text-zinc-400 font-mono">{pg.address}</p>
                  <div className="flex justify-between text-xs text-zinc-500 pt-2 border-t border-white/5">
                    <span>Rent (Double): ₹{pg.sharingPrices.double}</span>
                    <span>Deposit: ₹{pg.securityDeposit}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white/5 border-t border-white/5 flex gap-2">
                <button className="btn btn-secondary btn-sm flex-1 text-[10px] font-bold">Edit Info</button>
                <button className="btn btn-secondary btn-sm flex-1 text-[10px] font-bold flex-center gap-1"><Plus size={12} /> Add Beds</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD NEW PROPERTY PANEL */}
      {activeTab === 'add-pg' && (
        <div className="card max-w-3xl mx-auto">
          <div className="border-b border-white/5 pb-3 mb-6">
            <h2 className="text-base font-bold text-white">List Your PG with Oruhomes</h2>
            <p className="text-xs text-zinc-500">Provide accurate property details. Unverified details will be rejected by our auditing team.</p>
          </div>

          <form onSubmit={handleAddPgSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group col-span-2">
                <label className="form-label">Property Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Oruhomes Elite - Boys PG" 
                  value={pgName}
                  onChange={(e) => setPgName(e.target.value)}
                  required
                  className="form-input" 
                />
              </div>

              <div className="form-group col-span-2">
                <label className="form-label">Full Address *</label>
                <input 
                  type="text" 
                  placeholder="Street, Sector, City, Pincode" 
                  value={pgAddress}
                  onChange={(e) => setPgAddress(e.target.value)}
                  required
                  className="form-input" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location (Area) *</label>
                <input 
                  type="text" 
                  placeholder="e.g. HSR Layout, Sector 62" 
                  value={pgLocation}
                  onChange={(e) => setPgLocation(e.target.value)}
                  required
                  className="form-input" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Landmark / Proximity</label>
                <input 
                  type="text" 
                  placeholder="e.g. Near Metro Station / College Gate 3" 
                  value={pgLandmark}
                  onChange={(e) => setPgLandmark(e.target.value)}
                  className="form-input" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Gender Allowed *</label>
                <select 
                  value={pgGender} 
                  onChange={(e) => setPgGender(e.target.value)}
                  className="form-input"
                >
                  <option value="Boys">Boys Only</option>
                  <option value="Girls">Girls Only</option>
                  <option value="Co-ed">Co-ed (Co-living)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">City *</label>
                <select 
                  value={pgCity} 
                  onChange={(e) => setPgCity(e.target.value)}
                  className="form-input"
                >
                  <option value="Bangalore">Bangalore</option>
                  <option value="Noida">Noida</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>
            </div>

            <div className="h-px bg-white/10"></div>

            {/* Pricing Section */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-zinc-400 block">Monthly Sharing Price Structure & Deposit</span>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="form-group">
                  <label className="form-label">Single Share (₹) *</label>
                  <input type="number" value={singlePrice} onChange={(e) => setSinglePrice(e.target.value)} className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Double Share (₹) *</label>
                  <input type="number" value={doublePrice} onChange={(e) => setDoublePrice(e.target.value)} className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Triple Share (₹) *</label>
                  <input type="number" value={triplePrice} onChange={(e) => setTriplePrice(e.target.value)} className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Deposit (₹) *</label>
                  <input type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)} className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Maintenance (₹) *</label>
                  <input type="number" value={maintenance} onChange={(e) => setMaintenance(e.target.value)} className="form-input" required />
                </div>
              </div>
            </div>

            <div className="h-px bg-white/10"></div>

            {/* Amenities Checklist */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-zinc-400 block">Select Amenities Available</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.keys(amenitiesList).map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2 text-xs font-semibold text-zinc-300 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={amenitiesList[amenity]}
                      onChange={(e) => setAmenitiesList(prev => ({ ...prev, [amenity]: e.target.checked }))}
                      className="accent-rose-500 w-4 h-4 rounded" 
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              List Property for Verification
            </button>
          </form>
        </div>
      )}

      {/* TENANTS ROSTER PANEL */}
      {activeTab === 'tenants' && (
        <div className="card space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Active Tenants & Rent Tracking</h3>
          </div>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Tenant</th>
                  <th>Contact Info</th>
                  <th>Leased Property</th>
                  <th>Sharing type</th>
                  <th>Rent Status</th>
                  <th>KYC Docs</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((t, idx) => {
                  const activeB = t.bookings.find(b => myPgs.some(p => p.id === b.pgId));
                  if (!activeB) return null;
                  return (
                    <tr key={t.id || idx}>
                      <td>
                        <span className="font-bold text-white">{t.name}</span>
                      </td>
                      <td>
                        <span className="block text-xs font-medium text-zinc-400">{t.email}</span>
                        <span className="block text-[10px] text-zinc-500 font-mono">{t.phone}</span>
                      </td>
                      <td>
                        <span className="font-bold text-zinc-300 text-xs">{activeB.pgName}</span>
                      </td>
                      <td className="capitalize font-mono">{activeB.sharingType} Share</td>
                      <td>
                        <span className="badge badge-verified">
                          Rent Paid (July)
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                          <FileCheck size={14} />
                          <span>{t.kycStatus === 'Verified' ? 'Approved' : 'Pending Upload'}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
