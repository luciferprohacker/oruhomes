import React, { useState } from 'react';
import PortalSelector from './components/PortalSelector';
import Navbar from './components/Navbar';

// Portals
import Homepage from './portals/GuestPortal/Homepage';
import SearchResults from './portals/GuestPortal/SearchResults';
import PGDetails from './portals/GuestPortal/PGDetails';
import Checkout from './portals/GuestPortal/Checkout';
import GuestDashboard from './portals/GuestPortal/GuestDashboard';
import HostDashboard from './portals/HostPortal/HostDashboard';
import AdminDashboard from './portals/AdminPortal/AdminDashboard';

// Mock Data
import { 
  initialPGs, 
  mockUsers, 
  mockPayments, 
  mockTickets, 
  mockMetrics 
} from './mockData';

export default function App() {
  const [activePortal, setActivePortal] = useState("guest"); // guest, host, admin
  
  // Shared Live Database States
  const [pgs, setPgs] = useState(initialPGs);
  const [users, setUsers] = useState(mockUsers);
  const [payments, setPayments] = useState(mockPayments);
  const [tickets, setTickets] = useState(mockTickets);
  const [metrics, setMetrics] = useState(mockMetrics);

  // Active Users mapping
  const tenantUser = users.find(u => u.id === "user-1");
  const hostUser = users.find(u => u.id === "host-1");
  const adminUser = users.find(u => u.id === "admin-1");

  const getActiveUser = () => {
    if (activePortal === 'guest') return tenantUser;
    if (activePortal === 'host') return hostUser;
    return adminUser;
  };

  // Guest State Router
  const [guestPage, setGuestPage] = useState("home"); // home, search, details, checkout, dashboard
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPg, setSelectedPg] = useState(null);
  const [sharingOption, setSharingOption] = useState("double");

  // Guest Handlers
  const handleSearch = (query) => {
    setSearchQuery(query);
    setGuestPage("search");
  };

  const handleSelectPg = (pg) => {
    setSelectedPg(pg);
    setGuestPage("details");
  };

  const handleBookPg = (pg, option) => {
    setSelectedPg(pg);
    setSharingOption(option);
    setGuestPage("checkout");
  };

  const handleBookingSuccess = (newBooking, totalPaid) => {
    // 1. Add booking to user
    setUsers(prevUsers => prevUsers.map(user => {
      if (user.id === "user-1") {
        return {
          ...user,
          bookings: [newBooking, ...user.bookings]
        };
      }
      return user;
    }));

    // 2. Add transaction payment log
    const newPayment = {
      id: `p-${Date.now().toString().slice(-4)}`,
      bookingId: newBooking.bookingId,
      tenantId: "user-1",
      tenantName: tenantUser.name,
      pgName: newBooking.pgName,
      amount: totalPaid - 299, // Base Amount without fee
      type: "Booking Advance",
      method: "UPI / Card",
      status: "Paid",
      date: new Date().toLocaleString(),
      invoiceUrl: "#"
    };
    setPayments(prevPayments => [newPayment, ...prevPayments]);

    // 3. Update Platform Metrics
    setMetrics(prevMetrics => ({
      totalBookings: prevMetrics.totalBookings + 1,
      totalRevenue: prevMetrics.totalRevenue + totalPaid,
      platformCommission: Math.round(prevMetrics.platformCommission + (totalPaid * 0.1)),
      activeTenants: prevMetrics.activeTenants + 1,
      payoutsPending: prevMetrics.payoutsPending + (totalPaid - Math.round(totalPaid * 0.1))
    }));

    // 4. Redirect to dashboard
    setGuestPage("dashboard");
  };

  const handleKycUpload = (fileName) => {
    setUsers(prevUsers => prevUsers.map(user => {
      if (user.id === "user-1") {
        return {
          ...user,
          kycStatus: "Verified",
          kycDocument: fileName
        };
      }
      return user;
    }));
  };

  const handleCreateTicket = (newTicket) => {
    setTickets(prevTickets => [newTicket, ...prevTickets]);
  };

  // Host Handlers
  const handleAddPg = (newPg) => {
    setPgs(prevPgs => [newPg, ...prevPgs]);
  };

  // Admin Handlers
  const handleApprovePg = (pgId) => {
    setPgs(prevPgs => prevPgs.map(pg => {
      if (pg.id === pgId) {
        return { ...pg, approved: true };
      }
      return pg;
    }));
  };

  const handleRejectPg = (pgId) => {
    setPgs(prevPgs => prevPgs.filter(pg => pg.id !== pgId));
  };

  const handleToggleUserStatus = (userId) => {
    alert(`Account ${userId} has been suspended by Admin action.`);
    setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
  };

  const handleResolveTicket = (ticketId) => {
    setTickets(prevTickets => prevTickets.map(t => {
      if (t.id === ticketId) {
        return { ...t, status: "Resolved" };
      }
      return t;
    }));
    alert("Support ticket resolved. The tenant dashboard will reflect this instantly!");
  };

  // Render Portals based on active selection
  const renderActivePortalContent = () => {
    switch (activePortal) {
      case 'guest':
        if (guestPage === 'home') {
          return (
            <Homepage 
              pgs={pgs} 
              onSearch={handleSearch} 
              onSelectPg={handleSelectPg} 
            />
          );
        }
        if (guestPage === 'search') {
          return (
            <SearchResults 
              pgs={pgs} 
              searchQuery={searchQuery} 
              onSelectPg={handleSelectPg} 
            />
          );
        }
        if (guestPage === 'details') {
          return (
            <PGDetails 
              pg={selectedPg} 
              onBack={() => setGuestPage("search")} 
              onBook={handleBookPg} 
            />
          );
        }
        if (guestPage === 'checkout') {
          return (
            <Checkout 
              pg={selectedPg} 
              sharingOption={sharingOption} 
              onBack={() => setGuestPage("details")} 
              onBookingSuccess={handleBookingSuccess} 
            />
          );
        }
        if (guestPage === 'dashboard') {
          return (
            <GuestDashboard 
              activeUser={tenantUser} 
              onUploadKyc={handleKycUpload} 
              tickets={tickets.filter(t => t.tenantId === tenantUser.id)} 
              onCreateTicket={handleCreateTicket} 
            />
          );
        }
        return null;

      case 'host':
        return (
          <HostDashboard 
            pgs={pgs} 
            activeUser={hostUser} 
            onAddPg={handleAddPg} 
            tenants={users.filter(u => u.role === 'tenant')} 
          />
        );

      case 'admin':
        return (
          <AdminDashboard 
            pgs={pgs} 
            onApprovePg={handleApprovePg} 
            onRejectPg={handleRejectPg} 
            users={users} 
            onToggleUserStatus={handleToggleUserStatus} 
            tickets={tickets} 
            onResolveTicket={handleResolveTicket} 
            payments={payments} 
            metrics={metrics} 
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#06070b] text-white selection:bg-white selection:text-black font-sans relative">
      {/* Background radial overlays */}
      <div className="bg-glow-orange"></div>
      <div className="bg-glow-violet"></div>

      {/* Floating Navigator Bar */}
      <PortalSelector 
        activePortal={activePortal} 
        setActivePortal={(portal) => {
          setActivePortal(portal);
          if (portal === 'guest') setGuestPage('home');
        }} 
      />

      {/* Primary Header */}
      <Navbar 
        activePortal={activePortal} 
        setGuestPage={setGuestPage} 
        activeUser={getActiveUser()} 
      />

      {/* Content Canvas */}
      <main className="relative z-10">
        {renderActivePortalContent()}
      </main>
      
      {/* Global Footer */}
      <footer className="border-t border-white/5 bg-[#030407] py-8 text-center text-xs text-zinc-650 font-mono relative z-20">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© 2026 ORUHOMES CO-LIVING NETWORKS. ALL RIGHTS RESERVED.</span>
          <span className="text-[10px] text-rose-500 font-bold">SECURE PG BOOKINGS PLATFORM</span>
        </div>
      </footer>
    </div>
  );
}
