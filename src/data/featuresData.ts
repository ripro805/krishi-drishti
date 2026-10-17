export interface FeatureCardItem {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon key
  badge: string;
  stats: string;
  benefits: string[];
}

export const FEATURES_DATA: FeatureCardItem[] = [
  {
    id: "feat-ai-scanner",
    title: "AI Plant Disease Scanner",
    description: "Instant sub-second disease classification with 98% laboratory-grade accuracy across 200+ crop diseases and physiological disorders.",
    icon: "Scan",
    badge: "Core AI Engine",
    stats: "98% Accuracy",
    benefits: [
      "Real-time visual pathology scanning",
      "Camera & high-res image upload support",
      "Cell necrosis & lesion area quantification",
    ],
  },
  {
    id: "feat-crop-doctor",
    title: "Crop Doctor AI Chatbot",
    description: "24/7 autonomous agricultural intelligence. Ask questions regarding symptoms, weather resistance, organic spray recipes, and spray schedules.",
    icon: "Bot",
    badge: "Interactive Agronomist",
    stats: "< 1s Response",
    benefits: [
      "Contextual agronomic guidance",
      "Custom dosage calculation recommendations",
      "Safety interval & chemical toxicity alerts",
    ],
  },
  {
    id: "feat-dosage-calc",
    title: "Fertilizer & Urea Calculator",
    description: "Precision dosage optimization for Urea (N), DAP (P), and MOP (K) based on exact field acreage and regional soil test thresholds.",
    icon: "Calculator",
    badge: "Agronomic Precision",
    stats: "Up to 35% Input Savings",
    benefits: [
      "Acre, Hectare, Bigha unit conversions",
      "Split application schedule (Basal & Top-dressing)",
      "Reduces nitrogen runoff and greenhouse emissions",
    ],
  },
  {
    id: "feat-pathology-library",
    title: "Comprehensive Disease Library",
    description: "Explore clinical diagnostic profiles for Solanaceae, cereals, cucurbits, and tree fruits with microscopic pathogen details.",
    icon: "BookOpen",
    badge: "200+ Diseases",
    stats: "Verified Pathogens",
    benefits: [
      "Fungal, bacterial, viral, and pest categorization",
      "Interactive symptom timeline & infection cycle",
      "Preventative field management guidelines",
    ],
  },
  {
    id: "feat-analytics-reports",
    title: "Field Scan History & Analytics",
    description: "Track field health trends across seasons, log historical outbreaks, and export PDF pathology dossiers for agricultural certifiers.",
    icon: "BarChart3",
    badge: "Field Intelligence",
    stats: "Audit Ready",
    benefits: [
      "Historical scan timeline with GPS tagging",
      "Outbreak severity trending",
      "One-click PDF diagnostic report generator",
    ],
  },
  {
    id: "feat-early-warning",
    title: "Early Spore & Weather Alerts",
    description: "Predict disease germination risk using local temperature, relative humidity, and leaf wetness sensor integrations.",
    icon: "CloudRain",
    badge: "Predictive",
    stats: "48h Pre-Infection Alert",
    benefits: [
      "Microclimate disease pressure forecasting",
      "Optimal fungicide spray window determination",
      "Minimizes preventive spray expenses",
    ],
  },
];
