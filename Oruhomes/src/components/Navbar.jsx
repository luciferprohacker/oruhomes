import React from 'react';
import { LogOut, User, Home, ShieldAlert, Phone, HelpCircle, Bell } from 'lucide-react';

export default function Navbar({ activePortal, setGuestPage, activeUser, setActiveUser }) {
  const getNavLinks = () => {
    switch (activePortal) {
      case 'guest':
        return [
          { label: 'Find PGs', onClick: () => setGuestPage('search') },
          { label: 'Why Oruhomes', onClick: () => setGuestPage('home') },
          { label: 'My Bookings', onClick: () => setGuestPage('dashboard') }
        ];
      case 'host':
        return [
          { label: 'Dashboard', onClick: () => {} },
          { label: 'Properties', onClick: () => {} },
          { label: 'Tenants & Payouts', onClick: () => {} }
        ];
      case 'admin':
        return [
          { label: 'System Overview', onClick: () => {} },
          { label: 'Pending Approvals', onClick: () => {} },
          { label: 'Users Ledger', onClick: () => {} }
        ];
      default:
        return [];
    }
  };

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] py-3.5 sticky top-[41px] z-40 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => activePortal === 'guest' && setGuestPage('home')}
        >
          <div className="w-8 h-8 rounded-lg bg-[#ee2e24] flex items-center justify-center font-black text-white text-base tracking-tighter">
            O
          </div>
          <div>
            <span className="font-extrabold text-base text-[#111827] tracking-tight">Oruhomes</span>
            <span className="text-xs text-[#ee2e24] font-black ml-0.5">.in</span>
          </div>
        </div>

        {/* Portal links */}
        <div className="hidden md:flex items-center gap-8">
          {getNavLinks().map((link, idx) => (
            <button
              key={idx}
              onClick={link.onClick}
              className="text-xs font-bold text-zinc-655 hover:text-[#ee2e24] transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {activePortal === 'guest' && (
            <button 
              onClick={() => setGuestPage('search')}
              className="btn btn-secondary btn-sm hidden sm:flex text-[10px] !py-1.5"
            >
              Search Map
            </button>
          )}

          {/* Notification bell */}
          <div className="relative p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 cursor-pointer transition-all">
            <Bell size={14} className="text-zinc-600" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#ee2e24]"></span>
          </div>

          {/* User info */}
          <div className="flex items-center gap-2.5 pl-3 border-l border-zinc-200">
            <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-[10px] text-white">
              {activeUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[11px] font-extrabold text-zinc-800 leading-none">{activeUser.name}</span>
              <span className="text-[9px] text-[#ee2e24] font-bold uppercase tracking-wider">{activeUser.role}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
