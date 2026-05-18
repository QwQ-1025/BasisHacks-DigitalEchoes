// ============================================
// Digital Echoes — Datasets
// Real statistics compiled from public sources
// (Pew Research, Statista, Privacy Affairs, ITRC)
// ============================================

// Habit categories with estimated daily data points collected
var habitCategories = [
  { id: "social", name: "Social Media (2 hrs/day)", dataPoints: 800, icon: "📱" },
  { id: "search", name: "Web Search (20 queries/day)", dataPoints: 450, icon: "🔍" },
  { id: "shopping", name: "Online Shopping", dataPoints: 320, icon: "🛒" },
  { id: "streaming", name: "Video Streaming (3 hrs/day)", dataPoints: 600, icon: "📺" },
  { id: "maps", name: "Maps & Location Services", dataPoints: 520, icon: "📍" },
  { id: "email", name: "Email & Messaging", dataPoints: 250, icon: "📧" },
  { id: "health", name: "Health & Fitness Apps", dataPoints: 380, icon: "❤️" },
  { id: "banking", name: "Online Banking", dataPoints: 180, icon: "🏦" },
  { id: "gaming", name: "Online Gaming", dataPoints: 340, icon: "🎮" },
  { id: "smartHome", name: "Smart Home Devices", dataPoints: 450, icon: "🏠" }
];

// Average number of third-party trackers per website category
// Source: WebXray, WhoTracksMe aggregate data
var trackerData = [
  { category: "News & Media", trackers: 28 },
  { category: "Social Media", trackers: 22 },
  { category: "Shopping", trackers: 35 },
  { category: "Health", trackers: 18 },
  { category: "Education", trackers: 12 },
  { category: "Government", trackers: 5 },
  { category: "Entertainment", trackers: 30 },
  { category: "Technology", trackers: 25 }
];

// Major data breaches 2013-2024 (millions of records exposed)
// Source: ITRC, CSIS, Privacy Rights Clearinghouse
var breachData = [
  { year: 2013, company: "Yahoo", records: 3000 },
  { year: 2014, company: "eBay", records: 145 },
  { year: 2015, company: "Anthem", records: 78 },
  { year: 2016, company: "Adult Friend Finder", records: 412 },
  { year: 2017, company: "Equifax", records: 147 },
  { year: 2018, company: "Aadhaar (India)", records: 1100 },
  { year: 2019, company: "Capital One", records: 106 },
  { year: 2020, company: "CAM4", records: 10880 },
  { year: 2021, company: "Facebook", records: 533 },
  { year: 2022, company: "Twitter", records: 221 },
  { year: 2023, company: "MOVEit", records: 2600 },
  { year: 2024, company: "National Public Data", records: 2900 }
];

// Data brokers and what they track
var dataBrokers = [
  { name: "Acxiom", collects: "Demographics, purchases, social media", profiles: 2500000000 },
  { name: "Experian", collects: "Credit history, income, loans", profiles: 1200000000 },
  { name: "Epsilon", collects: "Email, shopping habits, loyalty cards", profiles: 700000000 },
  { name: "Oracle (BlueKai)", collects: "Browsing history, cookies, IP address", profiles: 1500000000 },
  { name: "LiveRamp", collects: "Device IDs, location, app usage", profiles: 900000000 }
];

// Global privacy statistics (source: UN, Pew, Statista)
var privacyStats = {
  countriesWithPrivacyLaws: 137,       // Countries with data protection laws
  avgDataPointsPerPerson: 2500,        // Avg data points collected per person daily
  percentOfWebWithTracking: 79,        // % of websites with third-party trackers
  avgCostOfDataBreach: 4880000,        // Avg cost of a data breach in USD (IBM 2024)
  dataBrokerMarketSize: 319000000000,  // Data broker market size in USD (2024)
  percentConcerned: 81                 // % of people concerned about data privacy
};

// Privacy legislation timeline
var privacyLaws = [
  { year: 1995, law: "EU Data Protection Directive", region: "European Union" },
  { year: 2003, law: "CAN-SPAM Act", region: "United States" },
  { year: 2012, law: "Personal Data Protection Act", region: "Singapore" },
  { year: 2016, law: "GDPR (General Data Protection Regulation)", region: "European Union" },
  { year: 2018, law: "CCPA (California Consumer Privacy Act)", region: "California, US" },
  { year: 2020, law: "LGPD (Lei Geral de Protecao de Dados)", region: "Brazil" },
  { year: 2021, law: "PIPL (Personal Information Protection Law)", region: "China" },
  { year: 2022, law: "ADPPA (American Data Privacy)", region: "US (proposed)" },
  { year: 2023, law: "EU AI Act (privacy provisions)", region: "European Union" },
  { year: 2024, law: "Colorado Privacy Act enforced", region: "Colorado, US" }
];

// What major platforms collect about you
var platformData = [
  {
    name: "Google",
    icon: "🔍",
    collects: ["Search history", "Location (every minute)", "YouTube watch history", "Voice recordings", "Email content (Gmail)", "App usage", "Device info", "Contacts"],
    annualRevenuePerUser: 230,
    dataCategories: 18
  },
  {
    name: "Facebook (Meta)",
    icon: "📘",
    collects: ["Posts & reactions", "Messages (metadata)", "Location", "Offline purchases", "Web browsing (off-platform)", "Facial recognition data", "Device sensors", "Ad interactions"],
    annualRevenuePerUser: 200,
    dataCategories: 21
  },
  {
    name: "TikTok",
    icon: "🎵",
    collects: ["Watch duration (per video)", "Keystroke patterns", "Clipboard content", "Device motion", "Location", "Contacts", "Facial features", "Voice patterns"],
    annualRevenuePerUser: 45,
    dataCategories: 16
  },
  {
    name: "Amazon",
    icon: "📦",
    collects: ["Purchase history", "Search queries", "Alexa voice recordings", "Reading habits (Kindle)", "Streaming habits (Prime)", "Wishlist items", "Browsing behavior", "Shipping addresses"],
    annualRevenuePerUser: 350,
    dataCategories: 15
  }
];

// Privacy protection checklist items
var privacyChecklist = [
  { id: "vpn", text: "Use a VPN to encrypt your internet traffic", difficulty: "easy", impact: "high" },
  { id: "browser", text: "Switch to a privacy-focused browser (Firefox/Brave)", difficulty: "easy", impact: "high" },
  { id: "ublock", text: "Install uBlock Origin to block trackers and ads", difficulty: "easy", impact: "high" },
  { id: "passwords", text: "Use a password manager with unique passwords", difficulty: "easy", impact: "high" },
  { id: "2fa", text: "Enable two-factor authentication everywhere", difficulty: "easy", impact: "high" },
  { id: "cookies", text: "Clear cookies and browsing data regularly", difficulty: "easy", impact: "medium" },
  { id: "social", text: "Review and limit social media privacy settings", difficulty: "medium", impact: "medium" },
  { id: "messaging", text: "Use encrypted messaging (Signal, not SMS)", difficulty: "medium", impact: "high" },
  { id: "search", text: "Use a private search engine (DuckDuckGo)", difficulty: "easy", impact: "medium" },
  { id: "dns", text: "Use encrypted DNS (DNS over HTTPS)", difficulty: "medium", impact: "medium" },
  { id: "permissions", text: "Audit app permissions on your phone", difficulty: "medium", impact: "high" },
  { id: "brokers", text: "Request data removal from major data brokers", difficulty: "hard", impact: "high" },
  { id: "email", text: "Use email aliases (SimpleLogin/Firefox Relay)", difficulty: "medium", impact: "medium" },
  { id: "iot", text: "Secure smart home devices on a separate network", difficulty: "hard", impact: "medium" }
];
