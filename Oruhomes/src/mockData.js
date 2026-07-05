// High-fidelity mock database for Oruhomes.in

export const initialPGs = [
  {
    id: "pg-1",
    name: "Oruhomes Elite - Co-living Hub",
    description: "Premium co-living PG located in the heart of HSR Layout. Designed for young IT professionals and students who want a hassle-free living experience. Close to corporate hubs and transit lines.",
    address: "24th Main Road, Sector 2, HSR Layout, Bangalore, Karnataka - 560102",
    location: "HSR Layout",
    city: "Bangalore",
    landmark: "Near NIFT College",
    gender: "Co-ed", // Boys, Girls, Co-ed
    rating: 4.8,
    reviewsCount: 34,
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["WiFi", "AC", "Food included", "Laundry", "Gym", "Power Backup", "CCTV Security"],
    rules: [
      "No entry inside premises after 11:30 PM.",
      "Visitors allowed in the lounge area until 8:00 PM.",
      "No loud music or parties after 10:00 PM.",
      "Strictly no smoking or drinking inside the rooms."
    ],
    sharingPrices: {
      single: 16500,
      double: 11000,
      triple: 8500
    },
    securityDeposit: 15000,
    maintenance: 1200,
    hostId: "host-1",
    approved: true,
    featured: true,
    availableBeds: {
      single: 2,
      double: 4,
      triple: 3
    },
    reviews: [
      { id: "r-1", user: "Rohan Sharma", rating: 5, comment: "Amazing food and neat rooms. The staff is very polite and helpful.", date: "2026-06-12" },
      { id: "r-2", user: "Aisha Patel", rating: 4, comment: "WiFi is super fast. Security is great for girls. Food is decent.", date: "2026-06-05" }
    ]
  },
  {
    id: "pg-2",
    name: "Oruhomes Grace - Girls Luxury PG",
    description: "A secure and high-end living space exclusively for women. Features biometric entry, beautiful common areas, and high-speed internet. Located steps away from Christ University campus.",
    address: "7th Cross Road, Koramangala 4th Block, Bangalore, Karnataka - 560034",
    location: "Koramangala",
    city: "Bangalore",
    landmark: "Opposite Christ University Lane 3",
    gender: "Girls",
    rating: 4.9,
    reviewsCount: 42,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["WiFi", "AC", "Food included", "Laundry", "Power Backup", "24/7 Security", "Biometric Entry"],
    rules: [
      "Curfew time is 10:00 PM sharp.",
      "No male visitors allowed inside the PG rooms.",
      "Prior notification required for late-night check-ins.",
      "Cleanliness must be maintained in common areas."
    ],
    sharingPrices: {
      single: 19000,
      double: 13500,
      triple: 9800
    },
    securityDeposit: 20000,
    maintenance: 1500,
    hostId: "host-2",
    approved: true,
    featured: true,
    availableBeds: {
      single: 1,
      double: 2,
      triple: 0
    },
    reviews: [
      { id: "r-3", user: "Priya Nair", rating: 5, comment: "Extremely clean and safe place. Highly recommend this for girls working in Bangalore.", date: "2026-05-20" },
      { id: "r-4", user: "Sneha Sen", rating: 5, comment: "Biometric entry makes it very secure. Food tastes like home.", date: "2026-05-18" }
    ]
  },
  {
    id: "pg-3",
    name: "Oruhomes Arena - Boys Premium PG",
    description: "Modern PG customized for young tech professionals working in Whitefield's IT parks. Equipped with a gaming lounge, fully operational gym, and delicious North & South Indian meals.",
    address: "ITPL Main Road, Hope Farm Junction, Whitefield, Bangalore, Karnataka - 560066",
    location: "Whitefield",
    city: "Bangalore",
    landmark: "Near ITPL Gate 2",
    gender: "Boys",
    rating: 4.6,
    reviewsCount: 28,
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc2c78a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["WiFi", "AC", "Food included", "Gym", "Power Backup", "Gaming Zone", "Laundry"],
    rules: [
      "No curfew, but silent hours start from 11:00 PM.",
      "Outsiders not allowed to stay overnight without permission.",
      "Wastage of food is strictly discouraged.",
      "No smoking in common corridors."
    ],
    sharingPrices: {
      single: 15000,
      double: 10500,
      triple: 7800
    },
    securityDeposit: 12000,
    maintenance: 1000,
    hostId: "host-1",
    approved: true,
    featured: false,
    availableBeds: {
      single: 3,
      double: 5,
      triple: 6
    },
    reviews: [
      { id: "r-5", user: "Vikram Malhotra", rating: 4, comment: "Gym is nice but gets crowded. Rooms are tidy. Food is okay.", date: "2026-06-01" }
    ]
  },
  {
    id: "pg-4",
    name: "Oruhomes Nest - Co-ed Tech PG",
    description: "Sleek co-living space near Sector 62 IT Parks, Noida. Perfect for software engineers and interns. High-speed fiber internet in every room, spacious terrace lounge, and biometric entry.",
    address: "B-Block, Sector 62, Noida, Uttar Pradesh - 201301",
    location: "Sector 62",
    city: "Noida",
    landmark: "Near JIIT College",
    gender: "Co-ed",
    rating: 4.5,
    reviewsCount: 19,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["WiFi", "AC", "Food included", "Power Backup", "24/7 Security", "Biometric Entry"],
    rules: [
      "Guests allowed until 9:00 PM in lobby.",
      "Maintain decent noise levels inside rooms.",
      "Keep common kitchen utilities clean.",
      "No illegal substances inside PG."
    ],
    sharingPrices: {
      single: 12000,
      double: 8500,
      triple: 6000
    },
    securityDeposit: 10000,
    maintenance: 800,
    hostId: "host-3",
    approved: true,
    featured: false,
    availableBeds: {
      single: 2,
      double: 3,
      triple: 4
    },
    reviews: [
      { id: "r-6", user: "Amit Verma", rating: 4, comment: "Noida's best co-living space. Clean rooms and fast WiFi.", date: "2026-06-15" }
    ]
  },
  {
    id: "pg-5",
    name: "Oruhomes Bliss - Girls PG",
    description: "Charming girls PG in the green lanes of Viman Nagar, Pune. Extremely safe environment, close to major shopping malls and colleges. Highly rated for security and hygiene.",
    address: "Lane 4, Viman Nagar, Pune, Maharashtra - 411014",
    location: "Viman Nagar",
    city: "Pune",
    landmark: "Near Symbiosis Campus",
    gender: "Girls",
    rating: 4.7,
    reviewsCount: 22,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["WiFi", "Food included", "AC", "Laundry", "Power Backup", "24/7 Security"],
    rules: [
      "Curfew is 10:30 PM.",
      "No visitors allowed inside rooms.",
      "Always inform warden before traveling out of city.",
      "Keep trash in designated bins."
    ],
    sharingPrices: {
      single: 14000,
      double: 9500,
      triple: 7000
    },
    securityDeposit: 15000,
    maintenance: 1000,
    hostId: "host-2",
    approved: true,
    featured: false,
    availableBeds: {
      single: 1,
      double: 1,
      triple: 2
    },
    reviews: [
      { id: "r-7", user: "Kriti Deshmukh", rating: 5, comment: "I feel very safe here. The warden is like a mother. Food quality is excellent.", date: "2026-06-22" }
    ]
  },
  {
    id: "pg-6",
    name: "Oruhomes Skyline - Premium Boys Co-living",
    description: "New modern PG offering spectacular skyline views from the balcony. Includes premium furniture, individual lockers, and laundry services twice a week. Located near IT Park, Madhapur.",
    address: "12-A, Image Gardens Road, Madhapur, Hyderabad, Telangana - 500081",
    location: "Madhapur",
    city: "Hyderabad",
    landmark: "Behind Cyber Towers",
    gender: "Boys",
    rating: 4.4,
    reviewsCount: 15,
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["WiFi", "AC", "Food included", "Gym", "Laundry", "Power Backup", "Biometric Entry"],
    rules: [
      "Entry restriction after midnight (12:00 AM).",
      "No guests allowed inside room after 9:00 PM.",
      "Loud audio inside rooms is strictly prohibited.",
      "Please switch off ACs when leaving the room."
    ],
    sharingPrices: {
      single: 16000,
      double: 11500,
      triple: 9000
    },
    securityDeposit: 15000,
    maintenance: 1200,
    hostId: "host-4",
    approved: false, // Pending Approval!
    featured: false,
    availableBeds: {
      single: 4,
      double: 6,
      triple: 6
    },
    reviews: []
  }
];

export const mockUsers = [
  {
    id: "user-1",
    name: "Aditya Kumar",
    email: "aditya@gmail.com",
    phone: "+91 98765 43210",
    role: "tenant",
    kycStatus: "Verified", // Pending, Verified, Unverified
    kycDocument: "Aadhaar_Aditya_Kumar.pdf",
    bookings: [
      {
        bookingId: "b-101",
        pgId: "pg-1",
        pgName: "Oruhomes Elite - Co-living Hub",
        sharingType: "double",
        rentAmount: 11000,
        securityDeposit: 15000,
        maintenance: 1200,
        moveInDate: "2026-07-10",
        status: "Confirmed" // Confirmed, Pending Approval, Completed
      }
    ]
  },
  {
    id: "host-1",
    name: "Rajesh Murthy",
    email: "rajesh.murthy@oruhomes.in",
    phone: "+91 99001 22334",
    role: "host",
    company: "Murthy Properties Ltd.",
    payoutDetails: {
      accountHolder: "Rajesh Murthy",
      accountNumber: "501002938475",
      ifsc: "HDFC0000104",
      bankName: "HDFC Bank"
    }
  },
  {
    id: "host-2",
    name: "Sunita Deshpande",
    email: "sunita.d@gmail.com",
    phone: "+91 91234 56789",
    role: "host",
    company: "Aura Co-Living Spaces",
    payoutDetails: {
      accountHolder: "Sunita Deshpande",
      accountNumber: "302910485762",
      ifsc: "SBIN0000301",
      bankName: "State Bank of India"
    }
  },
  {
    id: "admin-1",
    name: "Meera Nair",
    email: "admin.meera@oruhomes.in",
    phone: "+91 90000 11111",
    role: "admin"
  }
];

export const mockPayments = [
  {
    id: "p-001",
    bookingId: "b-101",
    tenantId: "user-1",
    tenantName: "Aditya Kumar",
    pgName: "Oruhomes Elite - Co-living Hub",
    amount: 27200, // Deposit (15000) + 1st Rent (11000) + Maint (1200)
    type: "Booking Advance",
    method: "UPI (Google Pay)",
    status: "Paid",
    date: "2026-07-05 11:32 AM",
    invoiceUrl: "#"
  },
  {
    id: "p-002",
    bookingId: "b-102",
    tenantId: "user-test",
    tenantName: "Sneha Sen",
    pgName: "Oruhomes Grace - Girls Luxury PG",
    amount: 15000,
    type: "Monthly Rent (June)",
    method: "Credit Card (HDFC)",
    status: "Paid",
    date: "2026-06-01 09:15 AM",
    invoiceUrl: "#"
  }
];

export const mockTickets = [
  {
    id: "t-001",
    tenantId: "user-1",
    tenantName: "Aditya Kumar",
    pgName: "Oruhomes Elite - Co-living Hub",
    title: "WiFi connectivity issue",
    description: "The WiFi router on the 2nd floor goes offline frequently. Getting disconnected every 15 minutes.",
    category: "Internet",
    priority: "High",
    status: "Open", // Open, Resolved
    createdAt: "2026-07-05"
  },
  {
    id: "t-002",
    tenantId: "user-2",
    tenantName: "Priya Nair",
    pgName: "Oruhomes Grace - Girls Luxury PG",
    title: "Geyser not heating",
    description: "The bathroom geyser in Room 302 is not heating the water fully.",
    category: "Plumbing/Electrical",
    priority: "Medium",
    status: "Resolved",
    createdAt: "2026-06-28"
  }
];

export const mockMetrics = {
  totalRevenue: 542000,
  platformCommission: 54200, // 10%
  activeTenants: 124,
  totalBookings: 289,
  payoutsPending: 184000
};
