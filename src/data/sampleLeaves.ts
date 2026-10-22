export interface SampleLeaf {
  id: string;
  crop: string;
  banglaCrop?: string;
  diseaseName: string;
  banglaDiseaseName?: string;
  expectedSeverity: "Healthy" | "Mild" | "Moderate" | "Severe";
  imageUrl: string;
  matchedDiseaseId: string;
  isLowConfidenceDemo?: boolean;
}

export const SAMPLE_LEAVES: SampleLeaf[] = [
  {
    id: "sample-tomato-early-blight",
    crop: "Tomato",
    banglaCrop: "টমেটো",
    diseaseName: "Early Blight (Alternaria solani)",
    banglaDiseaseName: "টমেটোর আগাম ধসা",
    expectedSeverity: "Moderate",
    imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=500&auto=format&fit=crop&q=80",
    matchedDiseaseId: "tomato-early-blight",
  },
  {
    id: "sample-potato-late-blight",
    crop: "Potato",
    banglaCrop: "আলু",
    diseaseName: "Late Blight (Phytophthora infestans)",
    banglaDiseaseName: "আলুর নাবী ধসা",
    expectedSeverity: "Severe",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80",
    matchedDiseaseId: "potato-late-blight",
  },
  {
    id: "sample-rice-blast",
    crop: "Rice",
    banglaCrop: "ধান",
    diseaseName: "Rice Blast (Pyricularia oryzae)",
    banglaDiseaseName: "ধানের ব্লাস্ট রোগ",
    expectedSeverity: "Severe",
    imageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500&auto=format&fit=crop&q=80",
    matchedDiseaseId: "rice-blast",
  },
  {
    id: "sample-pepper-bacterial-spot",
    crop: "Bell Pepper",
    banglaCrop: "মরিচ",
    diseaseName: "Bacterial Spot (Xanthomonas)",
    banglaDiseaseName: "মরিচের ব্যাকটেরিয়াল দাগ",
    expectedSeverity: "Moderate",
    imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&auto=format&fit=crop&q=80",
    matchedDiseaseId: "pepper-bacterial-spot",
  },
  {
    id: "sample-corn-common-rust",
    crop: "Corn (Maize)",
    banglaCrop: "ভুট্টা",
    diseaseName: "Common Rust (Puccinia sorghi)",
    banglaDiseaseName: "ভুট্টার মরিচা রোগ",
    expectedSeverity: "Moderate",
    imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500&auto=format&fit=crop&q=80",
    matchedDiseaseId: "corn-common-rust",
  },
  {
    id: "sample-low-confidence-test",
    crop: "Tomato",
    banglaCrop: "অস্পষ্ট নমুনা",
    diseaseName: "Uncertain / Mixed Foliar (Low Confidence Demo)",
    banglaDiseaseName: "অস্পষ্ট লক্ষণ (কম কনফিডেন্স ডেমো)",
    expectedSeverity: "Mild",
    imageUrl: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&auto=format&fit=crop&q=80",
    matchedDiseaseId: "uncertain-low-confidence-sample",
    isLowConfidenceDemo: true,
  },
  {
    id: "sample-tomato-healthy",
    crop: "Tomato",
    banglaCrop: "টমেটো",
    diseaseName: "Healthy Leaf (Control)",
    banglaDiseaseName: "সুস্থ পাতা (রোগমুক্ত)",
    expectedSeverity: "Healthy",
    imageUrl: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=500&auto=format&fit=crop&q=80",
    matchedDiseaseId: "healthy-tomato-leaf",
  },
];
