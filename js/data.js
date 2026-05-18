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
