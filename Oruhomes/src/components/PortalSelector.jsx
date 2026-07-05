import React from 'react';
import { User, Home, ShieldAlert, Zap } from 'lucide-react';

export default function PortalSelector({ activePortal, setActivePortal }) {
  const portals = [
    {
      id: 'guest',
      label: 'Tenant (Guest) Portal',
      icon: User,
      bgColor: '#fee2e2', // Light red
      textColor: '#dc2626', // Dark red
      borderActive: '#f87171',
      desc: 'Search, book, pay rent, view dashboard'
    },
    {
      id: 'host',
      label: 'Host (PG Owner) Portal',
      icon: Home,
      bgColor: '#ede9fe', // Light violet
      textColor: '#7c3aed', // Dark violet
      borderActive: '#c084fc',
      desc: 'Add/manage properties, tenant roster, earnings'
    },
    {
      id: 'admin',
      label: 'Super Admin Panel',
      icon: ShieldAlert,
      bgColor: '#fef3c7', // Light yellow
      textColor: '#d97706', // Dark yellow
      borderActive: '#fde68a',
      desc: 'Listing approvals, payouts, user management'
    }
  ];

  return (
    <div className="w-full bg-white border-b border-[#e5e7eb] py-2 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-rose-500 to-red-600 flex items-center justify-center">
            <Zap size={11} className="text-white" />
          </div>
          <span className="font-mono text-[10px] font-bold tracking-wider text-zinc-500">
            ORUHOMES PORTAL SELECTOR
          </span>
        </div>
        
        <div className="flex bg-[#f3f4f6] p-1 rounded-xl border border-[#e5e7eb]">
          {portals.map((portal) => {
            const Icon = portal.icon;
            const isActive = activePortal === portal.id;
            return (
              <button
                key={portal.id}
                onClick={() => setActivePortal(portal.id)}
                className="flex items-center gap-1.5 px-3.5 py-1 rounded-lg text-[11px] font-bold transition-all border border-transparent"
                style={{
                  backgroundColor: isActive ? portal.bgColor : 'transparent',
                  color: isActive ? portal.textColor : 'var(--text-secondary)',
                  borderColor: isActive ? portal.borderActive : 'transparent'
                }}
              >
                <Icon size={12} />
                <span>{portal.label.split(' ')[0]} Portal</span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-[10px] text-zinc-400 font-mono">
          <span>CONSOLE:</span>
          <span 
            className="px-2 py-0.5 rounded font-extrabold uppercase" 
            style={{ 
              backgroundColor: activePortal === 'guest' ? '#fee2e2' : activePortal === 'host' ? '#ede9fe' : '#fef3c7',
              color: activePortal === 'guest' ? '#dc2626' : activePortal === 'host' ? '#7c3aed' : '#d97706'
            }}
          >
            {activePortal}
          </span>
        </div>
      </div>
    </div>
  );
}
