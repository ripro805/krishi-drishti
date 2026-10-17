export interface SampleLeaf {
  id: string;
  crop: string;
  diseaseName: string;
  expectedSeverity: "Healthy" | "Mild" | "Moderate" | "Severe";
  imageUrl: string;
  matchedDiseaseId: string;
}

export const SAMPLE_LEAVES: SampleLeaf[] = [
  {
    id: "sample-tomato-early-blight",
    crop: "Tomato",
    diseaseName: "Early Blight (Alternaria solani)",
    expectedSeverity: "Moderate",
    imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=500&auto=format&fit=crop&q=80",
    matchedDiseaseId: "tomato-early-blight",
  },
  {
    id: "sample-potato-late-blight",
    crop: "Potato",
    diseaseName: "Late Blight (Phytophthora infestans)",
    expectedSeverity: "Severe",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80",
    matchedDiseaseId: "potato-late-blight",
  },
  {
    id: "sample-corn-common-rust",
    crop: "Corn (Maize)",
    diseaseName: "Common Rust (Puccinia sorghi)",
    expectedSeverity: "Moderate",
    imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500&auto=format&fit=crop&q=80",
    matchedDiseaseId: "corn-common-rust",
  },
  {
    id: "sample-pepper-bacterial-spot",
    crop: "Bell Pepper",
    diseaseName: "Bacterial Spot (Xanthomonas)",
    expectedSeverity: "Moderate",
    imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&auto=format&fit=crop&q=80",
    matchedDiseaseId: "pepper-bacterial-spot",
  },
  {
    id: "sample-tomato-healthy",
    crop: "Tomato",
    diseaseName: "Healthy Leaf (Control)",
    expectedSeverity: "Healthy",
    imageUrl: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=500&auto=format&fit=crop&q=80",
    matchedDiseaseId: "healthy-tomato-leaf",
  },
];
