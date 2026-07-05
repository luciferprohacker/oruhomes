import React, { useState } from 'react';
import { Shield, Home, Users, Check, X, ShieldAlert, BadgeDollarSign, Activity, FileCheck, CheckCircle2, UserX } from 'lucide-react';

export default function AdminDashboard({ 
  pgs, 
  onApprovePg, 
  onRejectPg, 
  users, 
  onToggleUserStatus, 
  tickets, 
  onResolveTicket, 
  payments, 
  metrics 
}) {
  const [activeTab, setActiveTab] = useState("overview"); // overview, approvals, users, tickets, financials

  const pendingPgs = pgs.filter(pg => !pg.approved);
  const activeHosts = users.filter(u => u.role === 'host');
  const activeTenants = users.filter(u => u.role === 'tenant');

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 space-y-6 pb-20">
      
      {/* Admin Panel Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/5 border border-white/5 p-6 rounded-3xl">
        <div>
          <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest font-mono">System Control</span>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Shield size={20} className="text-amber-500" /> Super Admin Control Console
          </h1>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {['overview', 'approvals', 'users', 'tickets', 'financials'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all capitalize border ${
                activeTab === tab 
                  ? 'bg-amber-500 border-amber-500 text-black shadow-lg' 
                  : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10'
              }`}
            >
              {tab === 'approvals' && pendingPgs.length > 0 ? (
                <span className="flex items-center gap-1">
                  Approvals <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] flex-center">{pendingPgs.length}</span>
                </span>
              ) : tab === 'tickets' && tickets.filter(t => t.status === 'Open').length > 0 ? (
                <span className="flex items-center gap-1">
                  Tickets <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] flex-center">{tickets.filter(t => t.status === 'Open').length}</span>
                </span>
              ) : (
                tab
              )}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW PANEL */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card space-y-2">
              <div className="flex justify-between items-center text-zinc-500">
                <span className="text-xs font-bold">Total Platform Bookings</span>
                <Landmark size={16} className="text-amber-500" />
              </div>
              <span className="text-2xl font-black text-white">{metrics.totalBookings}</span>
              <span className="text-[9px] text-zinc-500 block">Total reservation actions logged</span>
            </div>

            <div className="card space-y-2">
              <div className="flex justify-between items-center text-zinc-500">
                <span className="text-xs font-bold">Gross Platform Revenue</span>
                <BadgeDollarSign size={16} className="text-emerald-500" />
              </div>
              <span className="text-2xl font-black text-emerald-400">₹{metrics.totalRevenue.toLocaleString('en-IN')}</span>
              <span className="text-[9px] text-zinc-500 block">Gross Rent payments processed</span>
            </div>

            <div className="card space-y-2">
              <div className="flex justify-between items-center text-zinc-500">
                <span className="text-xs font-bold">Oruhomes Commission (10%)</span>
                <BadgeDollarSign size={16} className="text-rose-500" />
              </div>
              <span className="text-2xl font-black text-rose-400">₹{metrics.platformCommission.toLocaleString('en-IN')}</span>
              <span className="text-[9px] text-zinc-500 block">Net commission revenues</span>
            </div>

            <div className="card space-y-2">
              <div className="flex justify-between items-center text-zinc-500">
                <span className="text-xs font-bold">Total Registered Users</span>
                <Users size={16} className="text-violet-500" />
              </div>
              <span className="text-2xl font-black text-white">{users.length}</span>
              <span className="text-[9px] text-zinc-500 block">
                {activeTenants.length} Tenants • {activeHosts.length} Hosts
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pending items notice */}
            <div className="card lg:col-span-2 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">System Alerts & Telemetry</h3>
              <div className="space-y-3">
                {pendingPgs.length > 0 && (
                  <div className="p-4 bg-amber-500/5 border border-amber-500/25 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="text-amber-500" size={18} />
                      <div className="text-xs">
                        <span className="font-bold text-white block">Pending PG Approvals Waiting</span>
                        <span className="text-zinc-500 font-semibold">{pendingPgs.length} listings require auditor validation.</span>
                      </div>
                    </div>
                    <button onClick={() => setActiveTab("approvals")} className="btn btn-secondary btn-sm !py-1 text-[10px] font-bold">Audit</button>
                  </div>
                )}
                {tickets.filter(t => t.status === 'Open').length > 0 && (
                  <div className="p-4 bg-rose-500/5 border border-rose-500/25 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Activity className="text-rose-500" size={18} />
                      <div className="text-xs">
                        <span className="font-bold text-white block">Active Tenant Complaints Open</span>
                        <span className="text-zinc-500 font-semibold">{tickets.filter(t => t.status === 'Open').length} unresolved support queries pending.</span>
                      </div>
                    </div>
                    <button onClick={() => setActiveTab("tickets")} className="btn btn-secondary btn-sm !py-1 text-[10px] font-bold">Resolve</button>
                  </div>
                )}
                {pendingPgs.length === 0 && tickets.filter(t => t.status === 'Open').length === 0 && (
                  <div className="p-6 bg-[#12141d]/50 border border-white/5 rounded-2xl text-center text-xs text-zinc-500 font-semibold">
                    All clear! No pending audits or support tickets.
                  </div>
                )}
              </div>
            </div>

            {/* Platform statistics */}
            <div className="card space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Audit Log Console</h3>
              <div className="text-[10px] font-mono text-zinc-500 space-y-1">
                <div>[06:48 AM] - System Initialized.</div>
                <div>[06:49 AM] - Mock databases populated.</div>
                <div>[06:50 AM] - Installed UI elements.</div>
                <div>[06:52 AM] - KYC verification system online.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LISTING APPROVAL SYSTEM */}
      {activeTab === 'approvals' && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Pending Audits ({pendingPgs.length})</h3>
          
          {pendingPgs.length === 0 ? (
            <div className="card py-16 text-center text-zinc-500 text-xs font-semibold space-y-2">
              <CheckCircle2 size={36} className="text-emerald-500 mx-auto" />
              <div>
                <h4 className="text-white font-bold text-sm">No Listings Pending Approval</h4>
                <p className="text-[10px] text-zinc-500 font-light max-w-xs mx-auto mt-0.5">When hosts list new properties, they will appear here for audit review.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingPgs.map((pg) => (
                <div key={pg.id} className="card p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-zinc-800 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={pg.images[0]} alt={pg.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="badge badge-warning">Pending Audit</span>
                        <span className="text-[10px] text-zinc-500 font-bold font-mono uppercase">{pg.gender}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{pg.name}</h4>
                      <p className="text-[10px] text-zinc-400 font-mono leading-none">{pg.address}</p>
                      <p className="text-xs font-black text-rose-400 pt-1">₹{pg.sharingPrices.double}/mo (Double Share)</p>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full md:w-auto">
                    <button 
                      onClick={() => onApprovePg(pg.id)}
                      className="btn btn-accent btn-sm text-[10px] font-bold flex-1 md:flex-none flex items-center gap-1"
                    >
                      <Check size={12} /> Approve (Make Live)
                    </button>
                    <button 
                      onClick={() => onRejectPg(pg.id)}
                      className="btn btn-secondary btn-sm text-[10px] font-bold flex-1 md:flex-none flex items-center gap-1 hover:border-rose-500/40 hover:text-rose-400"
                    >
                      <X size={12} /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* USER & HOST LEDGER */}
      {activeTab === 'users' && (
        <div className="card space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">User Moderation Ledger</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>User Profile</th>
                  <th>Contact info</th>
                  <th>Role</th>
                  <th>KYC Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, idx) => (
                  <tr key={u.id || idx}>
                    <td>
                      <span className="font-bold text-white block">{u.name}</span>
                      {u.company && <span className="text-[9px] text-zinc-500 font-semibold">{u.company}</span>}
                    </td>
                    <td>
                      <span className="block text-xs text-zinc-400 font-medium">{u.email}</span>
                      <span className="block text-[10px] text-zinc-500 font-mono">{u.phone}</span>
                    </td>
                    <td className="capitalize text-xs font-semibold text-zinc-400">{u.role}</td>
                    <td>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        u.kycStatus === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {u.kycStatus || 'Verified'}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => onToggleUserStatus(u.id)}
                        className="btn btn-secondary btn-sm !py-1 !px-2.5 text-[9px] font-bold hover:border-rose-500/30 hover:text-rose-400 flex items-center gap-1"
                      >
                        <UserX size={12} /> Suspend Account
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TENANT TICKETS DESK */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Unresolved Complaints Desk</h3>
          
          {tickets.filter(t => t.status === 'Open').length === 0 ? (
            <div className="card py-16 text-center text-zinc-500 text-xs font-semibold space-y-2">
              <CheckCircle2 size={36} className="text-emerald-500 mx-auto" />
              <div>
                <h4 className="text-white font-bold text-sm">All Support Tickets Resolved</h4>
                <p className="text-[10px] text-zinc-500 font-light max-w-xs mx-auto mt-0.5">Any complaints filed by guests in their dashboard will appear here in real-time.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {tickets.filter(t => t.status === 'Open').map((tick) => (
                <div key={tick.id} className="card p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="badge badge-warning">{tick.priority} Priority</span>
                      <span className="text-[10px] text-zinc-500 font-mono font-semibold">{tick.createdAt}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white">{tick.title}</h4>
                    <p className="text-[11px] text-zinc-400 leading-normal max-w-2xl">{tick.description}</p>
                    <div className="flex items-center gap-2.5 text-[9px] font-mono font-bold text-zinc-500 pt-1">
                      <span>TENANT: {tick.tenantName}</span>
                      <span>•</span>
                      <span>PG: {tick.pgName}</span>
                      <span>•</span>
                      <span>CAT: {tick.category}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => onResolveTicket(tick.id)}
                    className="btn btn-accent btn-sm text-[10px] font-bold flex items-center gap-1.5 self-stretch sm:self-auto flex-shrink-0"
                  >
                    <Check size={12} /> Resolve Complaint
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FINANCIALS & COMMISSION LEDGER */}
      {activeTab === 'financials' && (
        <div className="card space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Commission & Payout Ledger</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Booking Reference</th>
                  <th>Tenant Profile</th>
                  <th>Total Rent Paid</th>
                  <th>Platform Fee</th>
                  <th>Host Payout</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => {
                  const comm = Math.round(p.amount * 0.1);
                  return (
                    <tr key={p.id}>
                      <td className="font-mono font-bold text-xs text-white">{p.id}</td>
                      <td>
                        <span className="block font-bold text-xs text-zinc-300">{p.pgName}</span>
                        <span className="block text-[9px] text-zinc-500 font-mono">{p.date}</span>
                      </td>
                      <td className="text-xs font-semibold">{p.tenantName}</td>
                      <td className="font-mono text-white">₹{p.amount.toLocaleString()}</td>
                      <td className="font-mono text-rose-400">₹{comm.toLocaleString()} (10%)</td>
                      <td className="font-mono text-emerald-400">₹{(p.amount - comm).toLocaleString()}</td>
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
