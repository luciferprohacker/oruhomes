import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [currentPage, setCurrentPage] = useState("home"); // home, search, details, bookings, profile
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenderFilter, setSelectedGenderFilter] = useState("all"); // all, Men, Women, Unisex
  const [selectedSharingFilter, setSelectedSharingFilter] = useState("all"); // all, single

  // UI State toggles
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showMobileMap, setShowMobileMap] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  // Favorites state
  const [favorites, setFavorites] = useState({});

  // Carousel Image Index tracking (pgId -> activeImageIndex)
  const [carouselIndexes, setCarouselIndexes] = useState({});

  // Dynamic booking state
  const [selectedPg, setSelectedPg] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [moveInDate, setMoveInDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi"); // upi, card
  const [isBookingProcessing, setIsBookingProcessing] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  // User Bookings log
  const [userBookings, setUserBookings] = useState([
    {
      id: "b-1",
      pgName: "Sunrise Boys Hostel",
      location: "Koramangala 5th Blk",
      rent: "₹9,000",
      date: "2026-06-10",
      status: "Active"
    }
  ]);

  // Static Mock Data for PGs
  const pgData = [
    {
      id: "pg-1",
      name: "Urban Nest Co-living",
      location: "HSR Layout, Sec 2",
      city: "Bangalore",
      gender: "Unisex", // Co-living
      sharing: "double",
      rating: 4.8,
      price: 12500,
      verified: true,
      amenities: ["wifi", "ac_unit", "restaurant", "cleaning_services"],
      images: [
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Experience premium co-living in the heart of HSR Layout. Designed for young professionals. High speed fiber internet, fully furnished rooms, home-cooked food, and daily housekeeping."
    },
    {
      id: "pg-2",
      name: "Sunrise Boys Hostel",
      location: "Koramangala 5th Blk",
      city: "Bangalore",
      gender: "Men",
      sharing: "double",
      rating: 4.6,
      price: 9000,
      verified: true,
      amenities: ["wifi", "restaurant", "local_laundry_service"],
      images: [
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Comfortable and budget-friendly PG exclusively for boys in Koramangala. Steps away from restaurants and transit routes. CCTV security, biometric entry, and clean dining areas."
    },
    {
      id: "pg-3",
      name: "Blossom Girls PG",
      location: "Indiranagar",
      city: "Bangalore",
      gender: "Women",
      sharing: "single",
      rating: 4.5,
      price: 14000,
      verified: false,
      amenities: ["wifi", "security", "restaurant"],
      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
      ],
      description: "A secure and charming Girls PG situated in the serene lanes of Indiranagar. Fully managed with high speed WiFi, CCTV monitoring, and organic home-cooked meals."
    },
    {
      id: "pg-4",
      name: "Oru Premium Men's PG",
      location: "1st Block, Koramangala",
      city: "Bangalore",
      gender: "Men",
      sharing: "double",
      rating: 4.8,
      price: 8500,
      verified: true,
      amenities: ["wifi", "ac_unit", "restaurant", "local_laundry_service"],
      images: [
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Modern PG optimized for young working professionals in Koramangala. Includes gym facility, fast internet, power backup, and regular laundry cycles twice a week."
    },
    {
      id: "pg-5",
      name: "Comfort Stay Women's",
      location: "4th Block, Koramangala",
      city: "Bangalore",
      gender: "Women",
      sharing: "double",
      rating: 4.5,
      price: 7200,
      verified: true,
      amenities: ["wifi", "restaurant", "security"],
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
      ],
      description: "High-security women's PG located near major corporate offices. Features home-cooked meals, daily housekeeping, biometric lock entry, and full power backup."
    }
  ];

  // Filter listings based on active search queries and chips
  const filteredPgs = useMemo(() => {
    return pgData.filter(pg => {
      // Search matches
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchName = pg.name.toLowerCase().includes(query);
        const matchLoc = pg.location.toLowerCase().includes(query);
        if (!matchName && !matchLoc) return false;
      }

      // Gender filter matches
      if (selectedGenderFilter !== "all" && pg.gender !== selectedGenderFilter) {
        return false;
      }

      // Sharing filter matches
      if (selectedSharingFilter === "single" && pg.sharing !== "single") {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedGenderFilter, selectedSharingFilter]);

  // Click Handlers
  const handleNearMeClick = (e) => {
    e.preventDefault();
    setIsDetecting(true);
    setTimeout(() => {
      setSearchQuery("Koramangala, Bangalore");
      setIsDetecting(false);
      setCurrentPage("search");
    }, 1000);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage("search");
  };

  const handleCardClick = (pg) => {
    setSelectedPg(pg);
    setCurrentPage("details");
  };

  const toggleFavorite = (e, pgId) => {
    e.stopPropagation();
    setFavorites(prev => ({
      ...prev,
      [pgId]: !prev[pgId]
    }));
  };

  const cycleImage = (e, pgId, images, direction) => {
    e.stopPropagation();
    const currentIndex = carouselIndexes[pgId] || 0;
    let nextIndex = 0;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % images.length;
    } else {
      nextIndex = (currentIndex - 1 + images.length) % images.length;
    }
    setCarouselIndexes(prev => ({
      ...prev,
      [pgId]: nextIndex
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!moveInDate) {
      alert("Please select a move-in date.");
      return;
    }
    setIsBookingProcessing(true);
    setTimeout(() => {
      setIsBookingProcessing(false);
      setIsBookingSuccess(true);
      
      // Append booking to user state
      const newB = {
        id: `b-${Date.now()}`,
        pgName: selectedPg.name,
        location: selectedPg.location,
        rent: `₹${selectedPg.price.toLocaleString('en-IN')}`,
        date: moveInDate,
        status: "Active"
      };
      setUserBookings(prev => [newB, ...prev]);

      setTimeout(() => {
        setIsBookingSuccess(false);
        setShowBookingModal(false);
        setCurrentPage("bookings");
      }, 1500);
    }, 2000);
  };

  return (
    <div className="bg-[#f8f9fa] text-zinc-800 font-sans min-h-screen relative pb-24 md:pb-0">
      
      {/* ----------------- TOP APPBARS ----------------- */}
      {/* Mobile Top Nav */}
      <header className="fixed top-0 w-full z-50 bg-white shadow-sm flex justify-between items-center px-4 h-14 md:hidden border-b border-zinc-150">
        <motion.div 
          onClick={() => {
            setCurrentPage("home");
            setSearchQuery("");
            setSelectedGenderFilter("all");
            setSelectedSharingFilter("all");
          }}
          className="flex items-center gap-2 cursor-pointer"
          whileTap={{ scale: 0.95 }}
        >
          <span className="material-symbols-outlined text-[#b80035] fill">home</span>
          <span className="text-xl font-extrabold text-[#b80035] tracking-tight">Oruhomes</span>
        </motion.div>
        
        <div className="flex items-center gap-4 relative">
          <motion.button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            whileTap={{ scale: 0.9 }}
            className="p-1 rounded-full text-zinc-650 cursor-pointer"
          >
            <span className="material-symbols-outlined">notifications</span>
          </motion.button>
          
          <motion.div 
            onClick={() => setProfileOpen(!profileOpen)}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full bg-zinc-200 overflow-hidden cursor-pointer"
          >
            <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO_oTV1ZDidS6ssoGmdRKR_FxNM7tuKNMzJY80hXRhlzhKAhrfH8gKA_bYT9uUh0vkTEqdC9YgXpeQ8jN3NYSNvQewo7iVZC5UVlnUEM3Qz_rs0sGSCIvHp9MjIWr8yc_HU278vucKkAqTRyOvdjhcMz8Qb1Wn06JyRlFcE7oMjjBmhoXFih7H6TQoEZ2ku2pAz2-D8QS3o0EYI3E7nmT585X8NXhXU17GY0B1IQeV1Sr3WTwXEGH69Q"/>
          </motion.div>
        </div>
      </header>

      {/* Desktop Top Nav */}
      <header className="hidden md:flex fixed top-0 w-full z-50 bg-white shadow-sm justify-between items-center px-8 h-16 border-b border-zinc-150">
        <div 
          onClick={() => {
            setCurrentPage("home");
            setSearchQuery("");
            setSelectedGenderFilter("all");
            setSelectedSharingFilter("all");
          }} 
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[#b80035] fill">home</span>
          <span className="text-2xl font-black text-[#b80035] tracking-tight">Oruhomes</span>
        </div>
        <nav className="flex gap-8">
          {['home', 'search', 'bookings'].map((tab) => (
            <button 
              key={tab}
              onClick={() => {
                setCurrentPage(tab);
                if (tab === 'home') {
                  setSearchQuery("");
                  setSelectedGenderFilter("all");
                  setSelectedSharingFilter("all");
                }
              }}
              className={`font-semibold text-sm pb-1 transition-all capitalize cursor-pointer ${
                currentPage === tab 
                  ? 'text-[#b80035] border-b-2 border-[#b80035]' 
                  : 'text-zinc-500 hover:text-[#b80035]'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4 relative">
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="material-symbols-outlined text-zinc-500 hover:bg-zinc-100 transition-colors rounded-full p-2 cursor-pointer"
          >
            notifications
          </button>
          <div 
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden cursor-pointer hover:opacity-90"
          >
            <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZWwmXknTGWRScI4S0M88trTJLm1rJ-Htz6Ed_RxGoEXkMswj8uA_R-C6dV1EujGGY_a0NscECE5pv25StkoEQgayAxitbQ61bXHuJ-AaJP7Ff4534ZEGS4M9_GAdQEsShqZwf1TUVII3t1gV_x3D36AoXRKAhJ8DBylOJCQRvaJSG_m99Fd0fxXE0tzJT4ACcubB5v6KwJm1K9c0WFiKx5du7AoziG2QV2Ha5qPNsMlb0PGMNIk5L_A"/>
          </div>
        </div>
      </header>

      {/* Notifications Dropdown Drawer */}
      <AnimatePresence>
        {notificationsOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black/10" onClick={() => setNotificationsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="absolute right-4 top-16 z-50 bg-white border border-zinc-200 shadow-xl rounded-xl p-4 w-[280px] space-y-3"
            >
              <h4 className="text-xs font-black text-zinc-800 border-b border-zinc-100 pb-1.5">Notifications</h4>
              <div className="text-[11px] text-zinc-500 font-medium space-y-2">
                <div className="p-1.5 hover:bg-zinc-50 rounded">
                  🎉 Welcome to Oruhomes! Search now to book your first verified PG.
                </div>
                <div className="p-1.5 hover:bg-zinc-50 rounded">
                  📞 Booking confirmed for Sunrise Boys Hostel. Contact Warden.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Profile Details Dropdown Drawer */}
      <AnimatePresence>
        {profileOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black/10" onClick={() => setProfileOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="absolute right-4 top-16 z-50 bg-white border border-zinc-200 shadow-xl rounded-xl p-4 w-[240px] space-y-4 text-center"
            >
              <div className="flex flex-col items-center space-y-1.5">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#b80035]">
                  <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZWwmXknTGWRScI4S0M88trTJLm1rJ-Htz6Ed_RxGoEXkMswj8uA_R-C6dV1EujGGY_a0NscECE5pv25StkoEQgayAxitbQ61bXHuJ-AaJP7Ff4534ZEGS4M9_GAdQEsShqZwf1TUVII3t1gV_x3D36AoXRKAhJ8DBylOJCQRvaJSG_m99Fd0fxXE0tzJT4ACcubB5v6KwJm1K9c0WFiKx5du7AoziG2QV2Ha5qPNsMlb0PGMNIk5L_A"/>
                </div>
                <h4 className="text-xs font-bold text-zinc-800">Aditya Kumar</h4>
                <span className="text-[10px] text-zinc-400 font-mono">aditya@gmail.com</span>
              </div>
              <div className="h-px bg-zinc-100"></div>
              <button 
                onClick={() => {
                  setProfileOpen(false);
                  setCurrentPage("bookings");
                }}
                className="w-full btn btn-secondary btn-sm"
              >
                My Bookings
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>


      {/* ----------------- CORE VIEWS MAIN CANVAS ----------------- */}

      <AnimatePresence mode="wait">
        
        {/* 1. HOMEPAGE */}
        {currentPage === "home" && (
          <motion.main 
            key="home"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="pt-16 md:pt-24 max-w-[1200px] mx-auto pb-16"
          >
            {/* Search & Hero Section */}
            <section className="px-4 mt-6">
              <h1 className="text-4xl font-extrabold text-[#191c1d] mb-4 leading-tight tracking-tight">
                Find your next <br/><span className="text-[#b80035] underline decoration-rose-200">home.</span>
              </h1>
              
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-4 flex flex-col md:flex-row gap-4 border border-zinc-200">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 flex-1 bg-zinc-150 p-3 rounded-xl">
                  <span className="material-symbols-outlined text-zinc-500">search</span>
                  <input 
                    className="bg-transparent border-none focus:ring-0 w-full text-xs font-semibold text-zinc-800 outline-none placeholder:text-zinc-400" 
                    placeholder="Search locality, PG name..." 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                
                <div className="flex gap-2">
                  <motion.button 
                    onClick={handleNearMeClick}
                    disabled={isDetecting}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 bg-zinc-150 px-4 py-3 rounded-xl text-zinc-700 font-bold text-xs flex-1 md:flex-none hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    <span className={`material-symbols-outlined text-[#b80035] text-sm ${isDetecting ? 'animate-spin' : ''}`}>my_location</span>
                    {isDetecting ? 'Locating...' : 'Near Me'}
                  </motion.button>
                  
                  <motion.button 
                    onClick={() => setCurrentPage("search")}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#b80035] text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-[#a0002e] transition-colors shadow-sm cursor-pointer"
                  >
                    Search
                  </motion.button>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex overflow-x-auto hide-scrollbar gap-2.5 mt-5 pb-2">
                <motion.button 
                  onClick={() => {
                    setSelectedGenderFilter("all");
                    setSelectedSharingFilter("all");
                    setCurrentPage("search");
                  }} 
                  whileTap={{ scale: 0.95 }}
                  className="whitespace-nowrap px-4 py-1.5 rounded-full border border-[#0f172a] bg-[#0f172a] text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  All
                </motion.button>
                <motion.button 
                  onClick={() => {
                    setSelectedGenderFilter("Men");
                    setSelectedSharingFilter("all");
                    setCurrentPage("search");
                  }} 
                  whileTap={{ scale: 0.95 }}
                  className="whitespace-nowrap px-4 py-1.5 rounded-full border border-zinc-200 bg-white text-zinc-650 font-bold text-xs hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  Boys PG
                </motion.button>
                <motion.button 
                  onClick={() => {
                    setSelectedGenderFilter("Women");
                    setSelectedSharingFilter("all");
                    setCurrentPage("search");
                  }} 
                  whileTap={{ scale: 0.95 }}
                  className="whitespace-nowrap px-4 py-1.5 rounded-full border border-zinc-200 bg-white text-zinc-655 font-bold text-xs hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  Girls PG
                </motion.button>
                <motion.button 
                  onClick={() => {
                    setSelectedGenderFilter("Unisex");
                    setSelectedSharingFilter("all");
                    setCurrentPage("search");
                  }} 
                  whileTap={{ scale: 0.95 }}
                  className="whitespace-nowrap px-4 py-1.5 rounded-full border border-zinc-200 bg-white text-zinc-655 font-bold text-xs hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  Co-living
                </motion.button>
                <motion.button 
                  onClick={() => {
                    setSelectedGenderFilter("all");
                    setSelectedSharingFilter("single");
                    setCurrentPage("search");
                  }} 
                  whileTap={{ scale: 0.95 }}
                  className="whitespace-nowrap px-4 py-1.5 rounded-full border border-zinc-200 bg-white text-zinc-655 font-bold text-xs hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  Single Room
                </motion.button>
              </div>
            </section>

            {/* Top Rated PGs Section */}
            <section className="mt-8">
              <div className="flex justify-between items-end px-4 mb-4">
                <h2 className="text-lg font-extrabold text-zinc-800">Top Rated PGs</h2>
                <button 
                  onClick={() => {
                    setSelectedGenderFilter("all");
                    setSelectedSharingFilter("all");
                    setCurrentPage("search");
                  }} 
                  className="text-[#b80035] font-bold text-xs flex items-center gap-0.5 hover:underline cursor-pointer"
                >
                  View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>

              {/* Horizontal Scroll Deck */}
              <div className="flex overflow-x-auto hide-scrollbar gap-4 px-4 pb-4 snap-x">
                {pgData.map((pg) => (
                  <motion.div 
                    key={pg.id} 
                    onClick={() => handleCardClick(pg)}
                    whileHover={{ y: -3 }}
                    className="min-w-[285px] md:min-w-[320px] bg-white rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] overflow-hidden snap-start flex flex-col group cursor-pointer border border-zinc-150"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-zinc-100">
                      <img alt={pg.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" src={pg.images[0]}/>
                      {pg.verified && (
                        <div className="absolute top-2.5 left-2.5 bg-[#0d9488] text-white px-2 py-0.5 rounded flex items-center gap-0.5 shadow-sm text-[10px] font-bold">
                          <span className="material-symbols-outlined text-[12px] fill">verified</span>
                          <span>Verified</span>
                        </div>
                      )}
                      <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded flex items-center gap-0.5 text-[10px] font-bold text-zinc-800">
                        <span className="material-symbols-outlined text-amber-500 fill text-xs">star</span>
                        <span>{pg.rating}</span>
                      </div>
                    </div>
                    
                    <div className="p-4 flex flex-col flex-grow gap-2">
                      <div>
                        <h3 className="text-xs font-black text-zinc-850 truncate">{pg.name}</h3>
                        <p className="text-[10px] text-zinc-500 flex items-center gap-0.5 mt-0.5">
                          <span className="material-symbols-outlined text-xs">location_on</span> {pg.location}
                        </p>
                      </div>

                      {/* Amenities Row */}
                      <div className="flex items-center gap-2 pt-1 border-t border-zinc-100 mt-1">
                        {pg.amenities.map((am, idx) => (
                          <div key={idx} className="w-6 h-6 rounded-md bg-zinc-100 flex-center text-zinc-650" title={am}>
                            <span className="material-symbols-outlined text-sm">{am === 'wifi' ? 'wifi' : am === 'restaurant' ? 'restaurant' : am === 'ac_unit' ? 'ac_unit' : 'cleaning_services'}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex justify-between items-end mt-auto">
                        <div>
                          <span className="text-sm font-extrabold text-[#B45309]">₹{pg.price.toLocaleString('en-IN')}</span>
                          <span className="text-[10px] text-zinc-400">/mo</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#b80035] group-hover:translate-x-0.5 transition-transform">Book Room</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.main>
        )}

        {/* 2. SEARCH RESULTS PAGE */}
        {currentPage === "search" && (
          <motion.main 
            key="search"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="px-4 pt-14 md:pt-24 md:max-w-[1200px] md:mx-auto pb-16"
          >
            {/* Search inputs row */}
            <div className="flex gap-2 mb-4 sticky top-[56px] md:top-[64px] z-40 bg-[#f8f9fa] py-2">
              <div className="flex-1 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center px-4 h-12 border border-zinc-200">
                <span className="material-symbols-outlined text-zinc-500 mr-2">my_location</span>
                <input 
                  className="w-full bg-transparent border-none focus:ring-0 text-xs font-bold text-zinc-800 p-0 outline-none" 
                  placeholder="Koramangala, Bangalore" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                />
              </div>
              <button 
                onClick={() => setShowFilterModal(true)}
                className="bg-white rounded-full border border-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] h-12 w-12 flex items-center justify-center hover:bg-zinc-50 active:scale-95 transition-all shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-zinc-700">tune</span>
              </button>
            </div>

            {/* Search Page filter chips row */}
            <div className="flex overflow-x-auto no-scrollbar gap-2 mb-6 pb-1">
              {[
                { label: 'All PGs', val: 'all', type: 'gender' },
                { label: 'Men', val: 'Men', type: 'gender' },
                { label: 'Women', val: 'Women', type: 'gender' },
                { label: 'Unisex', val: 'Unisex', type: 'gender' },
                { label: 'Single Occupancy', val: 'single', type: 'sharing' }
              ].map((chip, idx) => {
                const isActive = chip.type === 'gender' 
                  ? selectedGenderFilter === chip.val 
                  : selectedSharingFilter === chip.val;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (chip.type === 'gender') {
                        setSelectedGenderFilter(chip.val);
                      } else {
                        setSelectedSharingFilter(chip.val === selectedSharingFilter ? 'all' : chip.val);
                      }
                    }}
                    className={`px-4 py-2 rounded-full whitespace-nowrap text-xs font-bold h-10 flex items-center border transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-[#0f172a] border-[#0f172a] text-white shadow-sm' 
                        : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>

            {/* Results Grid layout */}
            {filteredPgs.length === 0 ? (
              <div className="bg-white border border-zinc-200 rounded-2xl py-12 px-6 text-center space-y-3">
                <span className="material-symbols-outlined text-4xl text-zinc-400 animate-bounce">search_off</span>
                <h4 className="text-sm font-bold text-zinc-800">No matching listings found</h4>
                <p className="text-[11px] text-zinc-400 font-light max-w-xs mx-auto">Try clearing search parameters or selectors to show all rooms in Bangalore.</p>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedGenderFilter("all");
                    setSelectedSharingFilter("all");
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  Reset Parameters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPgs.map((pg) => {
                  const activeImgIndex = carouselIndexes[pg.id] || 0;
                  const isFav = favorites[pg.id];

                  return (
                    <motion.article 
                      key={pg.id}
                      onClick={() => handleCardClick(pg)}
                      whileHover={{ y: -3 }}
                      className="bg-white rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col border border-zinc-200 cursor-pointer"
                    >
                      {/* Image Slider Row */}
                      <div className="relative h-44 w-full bg-zinc-100 overflow-hidden">
                        <img className="w-full h-full object-cover" src={pg.images[activeImgIndex]} alt={pg.name}/>
                        
                        {/* Overlay Controls */}
                        {pg.images.length > 1 && (
                          <>
                            <button
                              onClick={(e) => cycleImage(e, pg.id, pg.images, 'prev')}
                              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-zinc-800 shadow-sm"
                            >
                              <span className="material-symbols-outlined text-sm font-bold">chevron_left</span>
                            </button>
                            <button
                              onClick={(e) => cycleImage(e, pg.id, pg.images, 'next')}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-zinc-800 shadow-sm"
                            >
                              <span className="material-symbols-outlined text-sm font-bold">chevron_right</span>
                            </button>
                          </>
                        )}

                        <div className="absolute top-2.5 left-2.5 bg-white/95 rounded-full px-2 py-0.5 flex items-center gap-0.5 shadow-sm text-[9px] font-bold text-zinc-800">
                          <span className="material-symbols-outlined text-[11px] text-[#0d9488] fill">verified</span>
                          <span>Verified</span>
                        </div>

                        <button 
                          onClick={(e) => toggleFavorite(e, pg.id)}
                          className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/80 hover:bg-white flex-center shadow-sm text-zinc-400 hover:text-rose-500 transition-colors"
                        >
                          <span className={`material-symbols-outlined text-sm ${isFav ? 'fill text-rose-500' : ''}`}>favorite</span>
                        </button>
                      </div>

                      {/* Detail block */}
                      <div className="p-4 flex flex-col gap-2 flex-grow">
                        <div>
                          <h2 className="text-xs font-black text-zinc-850 truncate">{pg.name}</h2>
                          <p className="text-[10px] text-zinc-500 flex items-center gap-0.5 mt-0.5">
                            <span className="material-symbols-outlined text-xs">location_on</span> {pg.location}
                          </p>
                        </div>

                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-sm font-extrabold text-[#B45309]">₹{pg.price.toLocaleString('en-IN')}</span>
                          <span className="text-[9px] text-zinc-400">/mo onwards</span>
                        </div>

                        {/* Amenity Icons */}
                        <div className="flex gap-4 mt-auto pt-2 border-t border-zinc-150">
                          {pg.amenities.map((am, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                              <span className="material-symbols-outlined text-sm text-zinc-500">{am === 'wifi' ? 'wifi' : am === 'ac_unit' ? 'ac_unit' : am === 'restaurant' ? 'restaurant' : 'local_laundry_service'}</span>
                              <span className="text-[8px] font-bold text-zinc-400 capitalize">{am.split('_')[0]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}

            {/* Map View FAB */}
            <button 
              onClick={() => setShowMobileMap(true)}
              className="fixed bottom-20 md:bottom-8 right-container-margin bg-primary text-on-primary rounded-full px-6 py-4 shadow-[0_8px_30px_rgba(184,0,53,0.3)] flex items-center gap-2 font-label-bold text-label-bold hover:scale-105 active:scale-95 transition-all z-40 cursor-pointer"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
              Map View
            </button>
          </motion.main>
        )}

        {/* 3. PG DETAILS PAGE */}
        {currentPage === "details" && selectedPg && (
          <motion.div 
            key="details"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="pb-32 bg-[#f9fafb]"
          >
            {/* Top Back Action navigation row overlay */}
            <header className="fixed top-0 w-full z-45 bg-transparent">
              <div className="flex justify-between items-center px-4 h-14 w-full pt-safe">
                <motion.button 
                  onClick={() => setCurrentPage("search")}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center shadow-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-zinc-800">arrow_back</span>
                </motion.button>
                <div className="flex gap-2">
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Shareable URL copied to clipboard!");
                    }}
                    className="w-10 h-10 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center shadow-md cursor-pointer text-zinc-850 hover:text-[#b80035]"
                  >
                    <span className="material-symbols-outlined">share</span>
                  </motion.button>
                  <motion.button 
                    onClick={(e) => toggleFavorite(e, selectedPg.id)}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center shadow-md cursor-pointer text-zinc-400 hover:text-rose-500"
                  >
                    <span className={`material-symbols-outlined ${favorites[selectedPg.id] ? 'fill text-rose-500' : ''}`}>favorite</span>
                  </motion.button>
                </div>
              </div>
            </header>

            <main className="md:max-w-4xl md:mx-auto md:pt-16">
              {/* Image Carousel */}
              <section className="relative w-full h-[320px] md:h-[450px] md:rounded-b-2xl overflow-hidden bg-zinc-200">
                <img className="w-full h-full object-cover" src={selectedPg.images[carouselIndexes[selectedPg.id] || 0]} alt={selectedPg.name}/>
                {selectedPg.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => cycleImage(e, selectedPg.id, selectedPg.images, 'prev')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/60 hover:bg-white flex items-center justify-center text-zinc-800 shadow"
                    >
                      <span className="material-symbols-outlined font-bold">chevron_left</span>
                    </button>
                    <button
                      onClick={(e) => cycleImage(e, selectedPg.id, selectedPg.images, 'next')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/60 hover:bg-white flex items-center justify-center text-zinc-800 shadow"
                    >
                      <span className="material-symbols-outlined font-bold">chevron_right</span>
                    </button>
                  </>
                )}
                {/* Carousel indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {selectedPg.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCarouselIndexes(prev => ({ ...prev, [selectedPg.id]: idx }));
                      }}
                      className="w-1.5 h-1.5 rounded-full transition-all"
                      style={{
                        backgroundColor: (carouselIndexes[selectedPg.id] || 0) === idx ? 'white' : 'rgba(255, 255, 255, 0.4)',
                        width: (carouselIndexes[selectedPg.id] || 0) === idx ? '18px' : '6px'
                      }}
                    />
                  ))}
                </div>
              </section>

              {/* Detail sheets container */}
              <div className="px-4 pt-6 bg-white rounded-t-3xl -mt-6 relative z-10 md:mt-8 md:rounded-none md:bg-transparent">
                <div className="flex flex-col gap-2 mb-6 border-b border-zinc-150 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 bg-[#eefff7] text-[#006855] px-2.5 py-1 rounded-sm font-bold text-xs border border-[#006855]/20">
                      <span className="material-symbols-outlined text-[16px] icon-fill">verified</span>
                      Verified Property
                    </span>
                    <span className="inline-flex items-center gap-1 bg-zinc-100 px-2 py-1 rounded-sm font-bold text-xs text-zinc-800">
                      <span className="material-symbols-outlined text-[16px] text-[#B45309] icon-fill">star</span>
                      {selectedPg.rating}
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black text-zinc-850 mb-1">{selectedPg.name}</h1>
                  <p className="text-xs font-semibold text-zinc-500 flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[16px]">location_on</span> {selectedPg.location}, {selectedPg.city}
                  </p>
                </div>

                {/* Amenities Bento Icons */}
                <section className="mb-6">
                  <h2 className="text-xs font-black text-zinc-800 mb-3 uppercase tracking-widest font-mono">What's included</h2>
                  <div className="grid grid-cols-4 gap-3">
                    {selectedPg.amenities.map((am, idx) => (
                      <div key={idx} className="bg-zinc-50 border border-zinc-150 p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 text-center shadow-sm">
                        <span className="material-symbols-outlined text-[#b80035] text-[24px]">{am === 'wifi' ? 'wifi' : am === 'ac_unit' ? 'ac_unit' : am === 'restaurant' ? 'restaurant' : am === 'local_laundry_service' ? 'local_laundry_service' : 'security'}</span>
                        <span className="text-[9px] font-black text-zinc-500 capitalize">{am.split('_')[0]}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* About section details */}
                <section className="mb-6">
                  <h2 className="text-xs font-black text-zinc-800 mb-2 uppercase tracking-widest font-mono">About this property</h2>
                  <p className="text-xs font-light text-zinc-650 leading-relaxed">
                    {selectedPg.description} Enjoy high-speed fiber WiFi, home-style organic meals prepared fresh, double door locker cabins, and professional maintenance checkouts.
                  </p>
                </section>

                {/* Maps Location Overlay */}
                <section className="mb-6">
                  <h2 className="text-xs font-black text-zinc-800 mb-2 uppercase tracking-widest font-mono">Location Map</h2>
                  <div className="w-full h-44 rounded-xl overflow-hidden bg-zinc-150 shadow-sm relative border border-zinc-200">
                    <img className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL8QaGuuf2T3EWhYVSIafXg-L8DhdbiGRrYnvq3wxxJVSLUdlKKIHrZz5WbtHpVLD3esKmg4nKJXRLgDSkF1ebSOjNpNTFvwgyyLQ31_2dq1qsVMwEwDfNmGMvo4le7jJVju7_6dv1I3aD-80v6NKF-yYbnnl-y38twoY_jBmItf5CfancjfFdMjnbYcuSeoNx6Z0fb4KhsdLlMC-UZiWpK9AS9gQG3Ha3pDSHF1uPlbaSQNsQd9b0XQ" alt="map"/>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-[#b80035] text-white rounded-full p-2 shadow-lg flex items-center justify-center animate-bounce">
                        <span className="material-symbols-outlined icon-fill">location_on</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </main>

            {/* Sticky Bottom Action Booking bar */}
            <div className="fixed bottom-14 md:bottom-0 w-full bg-white border-t border-zinc-200 px-4 py-3 pb-safe z-45 md:max-w-4xl md:left-1/2 md:-translate-x-1/2 md:rounded-t-2xl md:shadow-[0_-4px_25px_rgba(0,0,0,0.06)]">
              <div className="flex justify-between items-center max-w-4xl mx-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase leading-none">Starting from</span>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-lg font-black text-[#B45309] font-mono">₹{selectedPg.price.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-zinc-500 font-semibold">/mo</span>
                  </div>
                </div>
                <motion.button 
                  onClick={() => setShowBookingModal(true)}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#b80035] text-white px-8 py-3 rounded-xl font-bold text-xs flex items-center gap-1.5 active:scale-95 transition-transform shadow-md cursor-pointer hover:bg-[#a0002e]"
                >
                  Book Now
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. USER BOOKINGS LEDGER */}
        {currentPage === "bookings" && (
          <motion.main 
            key="bookings"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="px-4 pt-16 md:pt-24 max-w-[1200px] mx-auto pb-16 space-y-6"
          >
            <div className="border-b border-zinc-250 pb-2">
              <h1 className="text-xl font-extrabold text-zinc-800">My Bookings Ledger</h1>
              <p className="text-[11px] text-zinc-400 font-light">View active contracts, invoices, and room occupancy confirmations.</p>
            </div>

            <div className="space-y-4">
              {userBookings.map((b) => (
                <div key={b.id} className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-bold uppercase tracking-wider">{b.status}</span>
                      <span className="text-[9px] text-zinc-400 font-mono">Move-in: {b.date}</span>
                    </div>
                    <h3 className="text-xs font-black text-zinc-850">{b.pgName}</h3>
                    <p className="text-[10px] text-zinc-500 font-bold flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-xs">location_on</span> {b.location}
                    </p>
                  </div>
                  <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                    <span className="text-xs font-extrabold text-[#B45309] font-mono">{b.rent}/mo</span>
                    <button 
                      onClick={() => alert("Digital Contract PDF generated! Downloading file...")}
                      className="text-[10px] font-bold text-[#b80035] hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      <span className="material-symbols-outlined text-sm">download</span> Contract
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.main>
        )}

      </AnimatePresence>


      {/* ----------------- MOBILE FLOATING MAP VIEW DRAWER ----------------- */}
      <AnimatePresence>
        {showMobileMap && (
          <div className="fixed inset-0 z-50 bg-white flex flex-col">
            <div className="p-4 border-b border-zinc-200 flex justify-between items-center h-14">
              <h3 className="text-xs font-black text-zinc-850">Room Proximity Map</h3>
              <button 
                onClick={() => setShowMobileMap(false)}
                className="p-1 rounded bg-zinc-100 text-zinc-650 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            
            <div className="flex-1 relative bg-zinc-100 flex-center">
              {/* Simulated Map pins */}
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[size:25px_25px]"></div>
              <img className="w-full h-full object-cover opacity-75" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL8QaGuuf2T3EWhYVSIafXg-L8DhdbiGRrYnvq3wxxJVSLUdlKKIHrZz5WbtHpVLD3esKmg4nKJXRLgDSkF1ebSOjNpNTFvwgyyLQ31_2dq1qsVMwEwDfNmGMvo4le7jJVju7_6dv1I3aD-80v6NKF-yYbnnl-y38twoY_jBmItf5CfancjfFdMjnbYcuSeoNx6Z0fb4KhsdLlMC-UZiWpK9AS9gQG3Ha3pDSHF1uPlbaSQNsQd9b0XQ" alt="map"/>
              {filteredPgs.map((pg, idx) => (
                <button
                  key={pg.id}
                  onClick={() => {
                    setSelectedPg(pg);
                    setShowMobileMap(false);
                    setCurrentPage("details");
                  }}
                  className="absolute p-2 bg-[#b80035] text-white rounded-full shadow-lg flex items-center justify-center animate-pulse"
                  style={{
                    left: `${25 + idx * 15}%`,
                    top: `${40 + (idx % 2) * 15}%`
                  }}
                >
                  <span className="material-symbols-outlined text-sm font-bold">location_on</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>


      {/* ----------------- MOBILE FILTER DRAWER BOTTOM SHEET ----------------- */}
      <AnimatePresence>
        {showFilterModal && (
          <>
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs" onClick={() => setShowFilterModal(false)} />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="bottom-sheet p-6 space-y-4 max-h-[85vh]"
            >
              <div className="flex justify-between items-center pb-3 border-b border-zinc-200">
                <span className="text-xs font-black text-zinc-800">Filter Preferences</span>
                <button 
                  onClick={() => setShowFilterModal(false)}
                  className="p-1 text-zinc-400 hover:text-zinc-850"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>

              {/* Filters content */}
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">Gender Allowance</span>
                  <div className="grid grid-cols-2 gap-2">
                    {['all', 'Men', 'Women', 'Unisex'].map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGenderFilter(g)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          selectedGenderFilter === g 
                            ? 'bg-[#b80035] border-[#b80035] text-white' 
                            : 'bg-white border-zinc-200 text-zinc-700'
                        }`}
                      >
                        {g === 'all' ? 'All Genders' : g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">Occupancy</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedSharingFilter("all")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        selectedSharingFilter === 'all' 
                          ? 'bg-[#b80035] border-[#b80035] text-white' 
                          : 'bg-white border-zinc-200 text-zinc-700'
                      }`}
                    >
                      Any sharing
                    </button>
                    <button
                      onClick={() => setSelectedSharingFilter("single")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        selectedSharingFilter === 'single' 
                          ? 'bg-[#b80035] border-[#b80035] text-white' 
                          : 'bg-white border-zinc-200 text-zinc-700'
                      }`}
                    >
                      Single Room
                    </button>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowFilterModal(false)}
                className="btn btn-primary w-full !py-2.5 text-xs font-black uppercase tracking-wider mt-4"
              >
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>


      {/* ----------------- BOOKING / CHECKOUT MODAL ----------------- */}
      <AnimatePresence>
        {showBookingModal && selectedPg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-zinc-200 shadow-2xl p-6 max-w-sm w-full space-y-6 relative"
            >
              <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
                <h3 className="text-xs font-black text-zinc-800 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#b80035]">calendar_month</span> Confirm Booking
                </h3>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="text-zinc-400 hover:text-zinc-800 font-bold"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>

              {isBookingSuccess ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex-center text-emerald-500 mx-auto animate-bounce">
                    <span className="material-symbols-outlined text-3xl font-black">done_all</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-zinc-800">Booking Confirmed!</h4>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Redirecting to bookings portal...</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between text-zinc-500">
                      <span>Property:</span>
                      <span className="text-zinc-850 font-bold">{selectedPg.name}</span>
                    </div>
                    <div className="flex justify-between text-zinc-500">
                      <span>Monthly Rent:</span>
                      <span className="text-[#B45309] font-bold">₹{selectedPg.price.toLocaleString('en-IN')}/mo</span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-zinc-100"></div>

                  <div className="form-group">
                    <label className="form-label">Move-in Date</label>
                    <input 
                      type="date"
                      value={moveInDate}
                      onChange={(e) => setMoveInDate(e.target.value)}
                      required
                      className="form-input text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="form-label">Select Payment Method</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod("upi")}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          paymentMethod === 'upi' 
                            ? 'bg-rose-50 border-[#b80035] text-[#b80035]' 
                            : 'bg-white border-zinc-200 text-zinc-700'
                        }`}
                      >
                        UPI Scan
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          paymentMethod === 'card' 
                            ? 'bg-rose-50 border-[#b80035] text-[#b80035]' 
                            : 'bg-white border-zinc-200 text-zinc-700'
                        }`}
                      >
                        Credit Card
                      </button>
                    </div>
                  </div>

                  {paymentMethod === 'upi' ? (
                    <div className="p-3 bg-zinc-50 rounded-xl flex flex-col items-center border border-zinc-150 space-y-2">
                      <div className="w-20 h-20 bg-zinc-200 border-2 border-dashed border-zinc-300 flex-center text-zinc-500 text-[10px] font-black">
                        QR CODE
                      </div>
                      <span className="text-[9px] text-zinc-400 font-bold">Scan to complete reservation payment</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input type="text" placeholder="Card Number" className="form-input text-xs" />
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" placeholder="MM/YY" className="form-input text-xs" />
                        <input type="password" placeholder="CVV" className="form-input text-xs" />
                      </div>
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={isBookingProcessing}
                    className="btn btn-primary w-full !py-2.5 text-xs font-black uppercase tracking-wider flex-center gap-1.5"
                  >
                    {isBookingProcessing ? (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                        Processing...
                      </>
                    ) : (
                      'Pay & Confirm Booking'
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* ----------------- BOTTOM NAVIGATION BAR (Mobile only) ----------------- */}
      <nav className="fixed bottom-0 left-0 w-full h-16 flex justify-around items-center px-4 pb-safe bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-50 rounded-t-xl md:hidden border-t border-zinc-200">
        <button 
          onClick={() => {
            setCurrentPage("home");
            setSearchQuery("");
            setSelectedGenderFilter("all");
            setSelectedSharingFilter("all");
          }}
          className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer ${currentPage === 'home' ? 'text-[#b80035]' : 'text-zinc-400'}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: currentPage === 'home' ? "'FILL' 1" : "'FILL' 0" }}>home</span>
          <span className="font-bold text-[9px] mt-0.5">Home</span>
        </button>
        <button 
          onClick={() => setCurrentPage("search")}
          className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer ${currentPage === 'search' ? 'text-[#b80035]' : 'text-zinc-400'}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: currentPage === 'search' ? "'FILL' 1" : "'FILL' 0" }}>search</span>
          <span className="font-bold text-[9px] mt-0.5">Search</span>
        </button>
        <button 
          onClick={() => setCurrentPage("bookings")}
          className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer ${currentPage === 'bookings' ? 'text-[#b80035]' : 'text-zinc-400'}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: currentPage === 'bookings' ? "'FILL' 1" : "'FILL' 0" }}>book_online</span>
          <span className="font-bold text-[9px] mt-0.5">Bookings</span>
        </button>
        <button 
          onClick={() => setProfileOpen(!profileOpen)}
          className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer ${profileOpen ? 'text-[#b80035]' : 'text-zinc-400'}`}
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-bold text-[9px] mt-0.5">Profile</span>
        </button>
      </nav>

    </div>
  );
}
