export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Accuracy & AI" | "Field Use" | "Treatments" | "Privacy & Tech";
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "How does the AI achieve 98% accuracy in crop disease detection?",
    answer:
      "Our system leverages deep convolutional vision neural networks and Vision Transformer (ViT) architectures trained on over 500,000 multi-spectral and high-resolution plant pathology images across 200+ distinct pathogens. The model evaluates micro-features such as lesion margins, concentric sporulation rings, chlorotic halos, and leaf vein patterns against university pathology benchmarks.",
    category: "Accuracy & AI",
  },
  {
    id: "faq-2",
    question: "What photography conditions provide the most reliable diagnosis?",
    answer:
      "For optimal diagnosis, capture a single leaf showing visible symptoms in natural indirect daylight. Avoid harsh flash glare or deep shadows. Hold the camera 6 to 12 inches away so the diseased leaf surface fills at least 70% of the viewfinder. Ensure both the upper side and underside are inspected.",
    category: "Field Use",
  },
  {
    id: "faq-3",
    question: "Can this system distinguish between nutrient deficiencies and fungal infections?",
    answer:
      "Yes. Nutritional chlorosis (such as Nitrogen, Magnesium, or Iron deficiency) typically follows uniform interveinal or broad foliage patterns, whereas fungal and bacterial infections present with localized irregular necrotic lesions, halos, or sporulation centers. Our AI evaluates spatial texture variance to differentiate between abiotic stress and biotic pathogens.",
    category: "Accuracy & AI",
  },
  {
    id: "faq-4",
    question: "Are the treatment recommendations suitable for certified organic farms?",
    answer:
      "Every diagnosis provides a dual-protocol treatment plan: OMRI-listed biological and organic solutions (such as Bacillus bio-fungicides, copper octanoate, cold-pressed neem formulations) alongside registered conventional options, detailing exact dosages, dilution rates, and pre-harvest safety intervals (PHI).",
    category: "Treatments",
  },
  {
    id: "faq-5",
    question: "Does the scanner work on mobile devices and without reliable field internet?",
    answer:
      "Yes! Our frontend is fully responsive for smartphones and tablets. It supports direct camera integration with zero app download required. Scanned reports and treatment protocols are cached locally on your device for immediate offline review in remote field zones.",
    category: "Field Use",
  },
  {
    id: "faq-6",
    question: "How do I export and share pathology reports with agronomists?",
    answer:
      "Click the 'Export PDF Medical Report' button on any scan result. The platform generates an executive agronomic summary containing photographic evidence, pathogen classification, severity metrics, and the itemized treatment plan ready for instant printing or emailing.",
    category: "Privacy & Tech",
  },
];
