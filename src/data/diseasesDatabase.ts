import { DiseaseInfo } from "@/types/disease";

export const DISEASES_DATABASE: DiseaseInfo[] = [
  {
    id: "tomato-early-blight",
    crop: "Tomato",
    commonName: "Early Blight",
    scientificName: "Alternaria solani",
    pathogenType: "Fungal",
    severity: "Moderate",
    confidence: 96.8,
    summary:
      "A destructive fungal disease characterized by concentric rings forming 'target board' lesions primarily on mature foliage, causing premature defoliation and fruit collar rot.",
    symptoms: [
      "Dark brown to black necrotic spots on older bottom leaves",
      "Concentric circular rings within lesions (target-pattern appearance)",
      "Yellow chlorotic halos surrounding leaf lesions",
      "Stems developing dark, sunken circular cankers",
      "Sunken, leathery dark spots on fruit near the stem calyx",
    ],
    favorableConditions: [
      "Warm temperatures between 24°C - 29°C (75°F - 85°F)",
      "Frequent rains, high relative humidity (>80%), or heavy overhead dew",
      "Dense canopy with poor air circulation",
    ],
    affectedParts: ["Lower leaves", "Stems", "Fruit"],
    transmissionRisk: "High",
    treatmentPlan: {
      immediateActions: [
        {
          title: "Prune Infected Lower Leaves",
          description: "Carefully snip and discard infected lower foliage at least 12 inches above soil level. Do not compost infected leaves.",
          priority: "High",
          timeframe: "Within 24 hours",
          effectiveness: "85-90%",
        },
        {
          title: "Apply Protective Barrier Spray",
          description: "Spray thorough leaf coverage (underside and tops) with an approved antifungal solution before rainfall.",
          priority: "High",
          timeframe: "Within 48 hours",
          effectiveness: "92-95%",
        },
        {
          title: "Soil Moisture Regulation",
          description: "Transition from overhead sprinkling to root-zone drip irrigation to prevent spore splash.",
          priority: "Medium",
          timeframe: "Day 3 onwards",
          effectiveness: "75-80%",
        },
      ],
      organicTreatments: [
        {
          name: "Copper Octanoate (Liquid Copper)",
          preparation: "Mix 15-30 ml per gallon of clean water",
          application: "Foliar mist every 7-10 days, ensuring complete leaf undersides coverage",
          certifications: "OMRI Listed, USDA Organic Compliant",
        },
        {
          name: "Bacillus amyloliquefaciens (Bio-fungicide strain D747)",
          preparation: "Mix 2 teaspoons per gallon of water with a natural surfactant",
          application: "Spray during early morning or late afternoon to protect living bacterial spores from UV",
          certifications: "EcoCert, OMRI Listed",
        },
        {
          name: "Neem Oil Extract (Clarified Hydrophobic)",
          preparation: "5 ml Neem extract + 2 ml organic biodegradable dish soap per liter of water",
          application: "Spray every 5 days during initial lesion breakout",
          certifications: "100% Bio-based",
        },
      ],
      chemicalTreatments: [
        {
          name: "Chlorothalonil (Bravo WeatherStik)",
          activeIngredient: "Chlorothalonil 54%",
          dosage: "1.5 - 2.0 pints per acre (or 15ml per 10L knapsack sprayer)",
          safetyInterval: "0 days (PHI for tomatoes), avoid during honeybee peak flight",
          cautions: "Protective eyewear and nitrile gloves required. Do not exceed 20 lbs active ingredient per season.",
        },
        {
          name: "Azoxystrobin + Difenoconazole (Quadris Top)",
          activeIngredient: "Azoxystrobin (18.2%) + Difenoconazole (11.4%)",
          dosage: "8.0 fl oz per acre",
          safetyInterval: "0 day pre-harvest interval, maximum 4 applications per year",
          cautions: "Rotate with non-Group 11 fungicides to prevent pathogen mutation and resistance.",
        },
      ],
      preventiveMeasures: [
        "Enforce strict 3-year crop rotation with non-solanaceous crops (avoid peppers, eggplants, potatoes)",
        "Apply 3-4 inches of clean straw or organic mulch around base stems to block soil splash",
        "Maintain minimum 24-inch in-row plant spacing and stake/trellis plants vertically",
        "Sterilize pruning shears with 70% isopropyl alcohol between plants",
      ],
      culturalPractices: [
        "Stake plants vertically using string trellising",
        "Water early in the morning so sun dries leaf surfaces quickly",
        "Test soil and maintain balanced nitrogen levels (excess nitrogen produces soft, susceptible foliage)",
      ],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "potato-late-blight",
    crop: "Potato",
    commonName: "Late Blight",
    scientificName: "Phytophthora infestans",
    pathogenType: "Fungal",
    severity: "Severe",
    confidence: 98.4,
    summary:
      "A devastating water mold that caused the historic Irish Potato Famine. Characterized by aggressive water-soaked black lesions and white fuzzy sporulation on leaf undersides under moist conditions.",
    symptoms: [
      "Irregular water-soaked pale-green to dark-brown lesions on leaves and petioles",
      "Delicate white fungal down/fuzz visible on underside of leaves in humid mornings",
      "Stems developing brittle dark purple to black necrotized patches",
      "Tubers displaying granular, reddish-brown dry rot below the skin",
      "Rapid vine collapse and putrid rotting odor across the field",
    ],
    favorableConditions: [
      "Cool to moderate temperatures (15°C - 21°C / 60°F - 70°F)",
      "Extended wet leaf periods (>10 hours) and relative humidity >90%",
      "Continuous overcast skies and foggy spells",
    ],
    affectedParts: ["Foliage", "Stems", "Tubers", "Stolons"],
    transmissionRisk: "High",
    treatmentPlan: {
      immediateActions: [
        {
          title: "Emergency Foliar Protection",
          description: "Immediately apply a systemic penetrant fungicide with translaminar activity across all surrounding healthy rows.",
          priority: "High",
          timeframe: "Immediate (within 12 hours)",
          effectiveness: "95%",
        },
        {
          title: "Destroy Severely Infected Hotspots",
          description: "Bag, pull, and burn or deeply bury (minimum 2 feet) isolated infected plants to stop airborne sporangia clouds.",
          priority: "High",
          timeframe: "Within 24 hours",
          effectiveness: "88%",
        },
        {
          title: "Halt Sprinkler Irrigation",
          description: "Stop all overhead watering. Tubers must stay dry to prevent zoospores washing down through soil fissures.",
          priority: "High",
          timeframe: "Immediate",
          effectiveness: "90%",
        },
      ],
      organicTreatments: [
        {
          name: "Bordeaux Mixture (Copper Sulfate + Hydrated Lime)",
          preparation: "10-10-100 formulation (10g copper sulfate, 10g lime in 1 liter water)",
          application: "Spray preventative coat before rain fronts; reapply every 5 days in wet weather",
          certifications: "Traditional Organic Standard",
        },
        {
          name: "Potassium Phosphite (Bio-systemic)",
          preparation: "Mix 30ml in 10 liters of water",
          application: "Triggers systemic acquired resistance (SAR) in plant vascular tissue",
          certifications: "EPA Biopesticide Registered",
        },
      ],
      chemicalTreatments: [
        {
          name: "Mandipropamid (Revus)",
          activeIngredient: "Mandipropamid 23.4%",
          dosage: "8.0 fl oz per acre",
          safetyInterval: "14 days PHI for potato",
          cautions: "Always tank-mix with a multi-site protectant (e.g. Mancozeb) to prevent resistance emergence.",
        },
        {
          name: "Cymoxanil + Mancozeb (Curzate M8)",
          activeIngredient: "Cymoxanil 8% + Mancozeb 64%",
          dosage: "1.0 - 1.25 kg per hectare",
          safetyInterval: "7-14 days pre-harvest",
          cautions: "Kickback activity effective if applied within 48 hours of infection event.",
        },
      ],
      preventiveMeasures: [
        "Plant only certified disease-free seed tubers with blue label guarantee",
        "Select late-blight resistant potato cultivars (e.g., Sarpo Mira, Defender, Mountain Gem)",
        "Hill potato ridges deeply (min 4-6 inches) to create a protective soil cushion over tubers",
        "Destroy all cull piles and volunteer potatoes in spring before planting",
      ],
      culturalPractices: [
        "Monitor local BlightCast and weather warning services daily",
        "Desiccate vines with haulm killer 2 weeks prior to harvest to toughen tuber skins",
        "Avoid harvesting during wet, muddy soil conditions",
      ],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "corn-common-rust",
    crop: "Corn (Maize)",
    commonName: "Common Rust",
    scientificName: "Puccinia sorghi",
    pathogenType: "Fungal",
    severity: "Moderate",
    confidence: 94.6,
    summary:
      "A common foliar fungal disease of sweet and field corn producing golden-brown to cinnamon powdery pustules (uredinia) on upper and lower leaf surfaces.",
    symptoms: [
      "Small, elongated cinnamon-brown to brick-red powdery pustules",
      "Pustules erupting through the epidermal leaf surface on both sides",
      "Leaves turning yellow and chlorotic around dense pustule clusters",
      "Premature leaf drying during ear-fill stage causing kernel shrinkage",
    ],
    favorableConditions: [
      "Moderate cool temperatures (16°C - 24°C / 60°F - 75°F)",
      "High atmospheric humidity (>95%) and night dew lasting 6+ hours",
      "Late planted corn following windblown spore currents from southern zones",
    ],
    affectedParts: ["Leaves", "Husks", "Stalks"],
    transmissionRisk: "Moderate",
    treatmentPlan: {
      immediateActions: [
        {
          title: "Assess Economic Threshold",
          description: "Count pustules on leaves below the ear leaf. If >6 pustules per leaf before tasseling, fungicide application is warranted.",
          priority: "High",
          timeframe: "Within 48 hours",
          effectiveness: "90%",
        },
        {
          title: "Targeted Fungicide Spray",
          description: "Apply strobilurin or triazole group fungicide before blister stage (R2) for maximum economic yield rescue.",
          priority: "High",
          timeframe: "Days 2-4",
          effectiveness: "94%",
        },
      ],
      organicTreatments: [
        {
          name: "Micronized Wettable Sulfur",
          preparation: "30-40 grams per 10 liters water",
          application: "Spray every 10 days during vegetative elongation",
          certifications: "OMRI Listed Organic",
        },
        {
          name: "Reynoutria sachalinensis extract (Regalia)",
          preparation: "1 quart per 50 gallons water per acre",
          application: "Stimulates plant phytoalexin natural immune response",
          certifications: "NOP Organic Compliant",
        },
      ],
      chemicalTreatments: [
        {
          name: "Pyraclostrobin + Fluxapyroxad (Priaxor)",
          activeIngredient: "Pyraclostrobin (28.58%) + Fluxapyroxad (14.33%)",
          dosage: "4.0 - 8.0 fl oz per acre",
          safetyInterval: "21 days for field corn harvest",
          cautions: "Do not apply with adjuvants after corn reaches V8 stage to avoid arrested ear syndrome.",
        },
      ],
      preventiveMeasures: [
        "Plant resistant corn hybrids containing Rp genes",
        "Plant early in the season to pass vulnerable pollination stages before spore migration peaks",
        "Incorporate deep crop residue tillage to break alternative host cycles",
      ],
      culturalPractices: [
        "Ensure optimal plant nutrition with balanced potassium levels to increase epidermal cell thickness",
      ],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "pepper-bacterial-spot",
    crop: "Bell Pepper",
    commonName: "Bacterial Spot",
    scientificName: "Xanthomonas euvesicatoria",
    pathogenType: "Bacterial",
    severity: "Moderate",
    confidence: 95.2,
    summary:
      "A widespread and destructive bacterial pathogen attacking peppers and chilies, resulting in small water-soaked lesions that turn necrotic with raised margins, causing widespread leaf drop.",
    symptoms: [
      "Small (1-3mm), circular, water-soaked dark spots on lower leaf surface",
      "Lesions turn purplish-brown to black with cracked, raised centers",
      "Severe chlorosis and massive premature leaf shedding",
      "Fruit displaying wart-like rough, scabbed, blistered spots",
    ],
    favorableConditions: [
      "Warm temperatures between 25°C - 30°C (77°F - 86°F)",
      "Heavy downpours, wind-driven rain, and high humidity",
      "Overhead tractor cultivation while plants are wet",
    ],
    affectedParts: ["Leaves", "Stems", "Fruit"],
    transmissionRisk: "High",
    treatmentPlan: {
      immediateActions: [
        {
          title: "Copper + Mancozeb Tank-Mix",
          description: "Mancozeb enhances copper ion release, providing the primary defensive strategy against copper-tolerant bacterial strains.",
          priority: "High",
          timeframe: "Immediate (24 hours)",
          effectiveness: "88%",
        },
        {
          title: "Sanitize Harvesting Equipment",
          description: "Disinfect crates, knives, and gloved hands with quaternary ammonium or 10% bleach solution.",
          priority: "High",
          timeframe: "Ongoing",
          effectiveness: "90%",
        },
      ],
      organicTreatments: [
        {
          name: "Basic Copper Sulfate + Bacteriophage (AgriPhage)",
          preparation: "Follow manufacturer biological phage ratio (1-2 pints/acre)",
          application: "Targeted viral lytic destruction of specific Xanthomonas bacterial cells",
          certifications: "OMRI Listed, Bio-Safe",
        },
      ],
      chemicalTreatments: [
        {
          name: "Acibenzolar-S-methyl (Actigard 50WG)",
          activeIngredient: "Acibenzolar-S-methyl 50%",
          dosage: "0.5 - 0.75 oz per acre",
          safetyInterval: "7 days PHI",
          cautions: "Plant defense activator; apply only to vigorous, unstressed plants.",
        },
      ],
      preventiveMeasures: [
        "Purchase hot-water treated certified disease-free seeds (50°C for 25 minutes)",
        "Use resistant commercial pepper varieties (races 1-10 resistant)",
        "Never enter or work in pepper rows while foliage is wet with dew or rain",
      ],
      culturalPractices: [
        "Rotate fields out of Solanaceae family for minimum 2 years",
        "Maintain clean field borders free from nightshade weed hosts",
      ],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "healthy-tomato-leaf",
    crop: "Tomato",
    commonName: "Healthy Leaf (No Pathogen Detected)",
    scientificName: "Solanum lycopersicum",
    pathogenType: "None",
    severity: "Healthy",
    confidence: 99.1,
    summary:
      "Vibrant green leaf tissue with intact epidermal cells, uniform chlorophyll distribution, and no visible signs of fungal sporulation, bacterial spots, or viral mosaic deformities.",
    symptoms: [
      "Deep uniform green coloration across lamina",
      "Clean margins without necrosis or chlorosis",
      "Sturdy petiole and healthy vascular venation",
      "Turgid leaf cells with high photosynthetic efficiency",
    ],
    favorableConditions: [
      "Optimal temperatures (20°C - 26°C)",
      "Balanced soil nutrients (N-P-K 10-10-10)",
      "Drip irrigation and proper staking",
    ],
    affectedParts: ["None - Plant is Healthy"],
    transmissionRisk: "None",
    treatmentPlan: {
      immediateActions: [
        {
          title: "Maintain Routine Preventative Inspection",
          description: "Continue weekly scouting of lower canopy leaves for earliest signs of fungal spores.",
          priority: "Low",
          timeframe: "Weekly",
          effectiveness: "99%",
        },
      ],
      organicTreatments: [
        {
          name: "Seaweed / Kelp Extract (Ascophyllum nodosum)",
          preparation: "5ml per liter of water",
          application: "Foliar nutrition every 14 days to enhance abiotic stress tolerance",
          certifications: "100% Organic",
        },
      ],
      chemicalTreatments: [],
      preventiveMeasures: [
        "Keep mulch layer intact to prevent soil pathogen splash",
        "Avoid high-nitrogen fertilizer spikes that attract sucking pests (aphids, thrips)",
      ],
      culturalPractices: [
        "Regular pruning of suckers to maintain optimal airflow in tomato cage",
      ],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600&auto=format&fit=crop&q=80",
  },
];
