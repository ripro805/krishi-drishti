import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting KrishiDrishti database seed...");

  // 1. Seed Users
  const defaultPassword = await bcrypt.hash("krishi123", 10);
  const adminPassword = await bcrypt.hash("admin123", 10);

  const users = [
    {
      id: "usr-admin-01",
      name: "অ্যাডমিন (KrishiDrishti Admin)",
      email: "admin@krishi.gov.bd",
      passwordHash: adminPassword,
      phone: "01711000001",
      role: Role.ADMIN,
      district: "ঢাকা",
      upazila: "মিরপুর",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "usr-farmer-01",
      name: "মোঃ রফিকুল ইসলাম",
      email: "farmer@krishi.gov.bd",
      passwordHash: defaultPassword,
      phone: "01722000002",
      role: Role.FARMER,
      district: "বগুড়া",
      upazila: "শিবগঞ্জ",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "usr-expert-01",
      name: "ড. নাজমুল হুদা (কৃষি সম্প্রসারণ কর্মকর্তা)",
      email: "expert@krishi.gov.bd",
      passwordHash: defaultPassword,
      role: Role.EXPERT,
      district: "গাজীপুর",
      upazila: "জয়দেবপুর",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
  }
  console.log("✅ Users seeded (3 initial accounts)");

  // 2. Seed Diseases
  const diseases = [
    {
      id: "tomato-early-blight",
      crop: "Tomato",
      banglaCrop: "টমেটো",
      commonName: "Early Blight",
      banglaName: "টমেটোর আগাম ধসা রোগ",
      scientificName: "Alternaria solani",
      pathogenType: "Fungal",
      severity: "Moderate",
      confidence: 96.8,
      summary: "A destructive fungal disease characterized by concentric rings forming 'target board' lesions primarily on mature foliage, causing premature defoliation and fruit collar rot.",
      banglaSummary: "অল্টারনারিয়া সোলানি ছত্রাকজনিত একটি মারাত্মক রোগ। বয়স্ক পাতায় চক্রাকার দাগ বা টার্গেট বোর্ডের মতো রিং তৈরি হয় এবং আক্রান্ত পাতা দ্রুত শুকিয়ে ঝরে পড়ে ফলন কমে যায়।",
      symptoms: [
        "Dark brown to black necrotic spots on older bottom leaves",
        "Concentric circular rings within lesions (target-pattern appearance)",
        "Yellow chlorotic halos surrounding leaf lesions",
        "Stems developing dark, sunken circular cankers"
      ],
      banglaSymptoms: [
        "গাছের নিচের বয়স্ক পাতায় গাঢ় বাদামী বা কালচে গোল দাগ দেখা যায়",
        "দাগগুলোর ভেতর একাধিক কেন্দ্রীভূত রিং বা চক্রাকার বলয় (টার্গেট বোর্ড) তৈরি হয়",
        "দাগের চারপাশের পাতার অংশ হলুদ হয়ে যায়",
        "কাণ্ডে গাঢ় ও কিছুটা দেবে যাওয়া ক্ষতচিহ্ন দেখা দেয়"
      ],
      favorableConditions: [
        "Warm temperatures between 24°C - 29°C (75°F - 85°F)",
        "Frequent rains, high relative humidity (>80%), or heavy overhead dew",
        "Dense canopy with poor air circulation"
      ],
      banglaCauses: [
        "২৪° থেকে ২৯° সেলসিয়াস তাপমাত্রা এবং উচ্চ আর্দ্রতা (>৮০%)",
        "ঘন কুয়াশা, গুঁড়ি গুঁড়ি বৃষ্টি বা পাতায় দীর্ঘক্ষণ শিশির জমে থাকা",
        "জমিতে ঘন করে চারা রোপণ ও অপর্যাপ্ত বাতাস চলাচল"
      ],
      affectedParts: ["Lower leaves", "Stems", "Fruit"],
      banglaAffectedParts: ["নিচের পাতা", "ডালপালা ও কাণ্ড", "টমেটো ফল"],
      banglaCropInfo: "টমেটো (Solanaceae পরিবার) - বাংলাদেশের প্রধান শীতকালীন ও গ্রীষ্মকালীন অর্থকরী সবজি ফসল।",
      transmissionRisk: "High",
      treatmentPlan: {
        immediateActions: [
          {
            title: "Prune Infected Bottom Foliage",
            description: "Sterilize pruning shears with 70% isopropyl alcohol and prune all symptomatic leaves up to 18 inches above ground level.",
            priority: "High",
            timeframe: "Within 24 hours",
            effectiveness: "85-90%"
          }
        ],
        organicTreatments: [
          {
            name: "Copper Octanoate (Copper Soap)",
            preparation: "Dilute 10-20 mL per liter of water.",
            application: "Foliar mist every 7-10 days, coating both upper and lower leaf surfaces thoroughly.",
            certifications: "OMRI Listed, EcoCert"
          }
        ],
        chemicalTreatments: [
          {
            name: "Azoxystrobin + Difenoconazole",
            activeIngredient: "Amistar Top (Azoxystrobin 200 g/L + Difenoconazole 125 g/L)",
            dosage: "1 mL per Liter of water",
            safetyInterval: "7 Days (Pre-Harvest Interval)",
            cautions: "Wear nitrile gloves, eye goggles, and respirator. Avoid spraying during bee pollination hours."
          }
        ],
        preventiveMeasures: [
          "Maintain minimum 60cm row spacing for optimal airflow",
          "Drip irrigation to avoid leaf wetness",
          "Rotate nightshade crops with legumes or cereals on 3-year cycles"
        ],
        culturalPractices: [
          "Mulch root zones with clean straw to halt soil splash",
          "Burn or bury severely diseased plant residues post-harvest"
        ]
      },
      banglaTreatment: {
        managementAdvice: [
          "গাছের নিচের আক্রান্ত ও হলুদ হওয়া পাতা সতর্কতার সাথে ছেঁটে পুড়িয়ে বা মাটিতে পুঁতে ফেলুন।",
          "ছাঁটাইয়ের পর জমিতে কোনো আক্রান্ত পাতা ফেলে রাখবেন না, এতে ছত্রাকের স্পোর ছড়াতে পারে।"
        ],
        preventionMethods: [
          "গাছের গোড়ায় ড্রিপ বা প্লাবন সেচ দিন, পাতার ওপর কখনই পানি ছিটাবেন না।",
          "পরবর্তী মৌসুমে জমিতে শস্য পর্যায় (Crop Rotation) অবলম্বন করুন।"
        ],
        fieldCareGuidance: [
          "গাছের গোড়ায় খড় দিয়ে মালচিং করুন যাতে বৃষ্টির পানিতে মাটি ছিটকে পাতায় না লাগে।"
        ],
        whenToConsultExpert: [
          "স্প্রে করার ৩-৫ দিন পরেও নতুন পাতায় দ্রুত দাগ ছড়িয়ে পড়লে উপজেলা কৃষি কর্মকর্তার পরামর্শ নিন।"
        ],
        safetyNote: "কীটনাশকের সঠিক ডোজ জানতে বোতলের লেবেল পড়ুন। কখনই অনুমান করে অতিরিক্ত মাত্রা প্রয়োগ করবেন না।"
      },
      sampleImageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=600&auto=format&fit=crop&q=80",
      isLowConfidenceWarning: false
    },
    {
      id: "potato-late-blight",
      crop: "Potato",
      banglaCrop: "আলু",
      commonName: "Late Blight",
      banglaName: "আলুর নাবী ধসা (লেট ব্লাইট)",
      scientificName: "Phytophthora infestans",
      pathogenType: "Fungal",
      severity: "Severe",
      confidence: 98.4,
      summary: "Devastating oomycete pathogen capable of destroying entire potato fields within 7 to 10 days under cool, damp climatic conditions.",
      banglaSummary: "ফাইটোফথোরা ইনফেস্ট্যান্স ছত্রাকজাতীয় মারাত্মক জীবাণু দ্বারা সৃষ্ট। কুয়াশাচ্ছন্ন ও ঠান্ডা আবহাওয়ায় কয়েক দিনের মধ্যেই পুরো আলুর ক্ষেত পুড়িয়ে দেওয়ার মতো ধ্বংসাত্মক রূপ নেয়।",
      symptoms: [
        "Water-soaked irregular pale-to-dark lesions on leaf tips and margins",
        "Delicate white downy fungal mildew on leaf undersides in humid morning air",
        "Rapidly expanding black necrotic areas causing foliage collapse",
        "Brown granular rotting beneath potato skin"
      ],
      banglaSymptoms: [
        "পাতার ডগায় ও কিনারায় ভেজা জলছাপযুক্ত বাদামী বা কালচে দাগ",
        "ভোরের কুয়াশায় বা আর্দ্র আবহাওয়ায় পাতার উল্টো পিঠে তুলার মতো সাদা ছত্রাক",
        "দ্রুত পাতা পচে কালো হয়ে যাওয়া এবং ক্ষেত থেকে পচা গন্ধ বের হওয়া",
        "আলুর খোসার নিচে লালচে-বাদামী শুষ্ক পচন ধরা"
      ],
      favorableConditions: [
        "Temperatures between 12°C - 20°C (53°F - 68°F)",
        "Relative humidity above 90% or continuous fog/dew for 8+ hours"
      ],
      banglaCauses: [
        "টানা কুয়াশাচ্ছন্ন আবহাওয়া, গুঁড়ি গুঁড়ি বৃষ্টি এবং ১২° থেকে ২০° সে. তাপমাত্রা",
        "পাতার উপর একটানা ৮ ঘণ্টার বেশি শিশির বা আর্দ্রতা জমে থাকা"
      ],
      affectedParts: ["Foliage", "Petioles", "Stems", "Tubers"],
      banglaAffectedParts: ["পাতা", "বোঁটা ও কাণ্ড", "মাটির নিচের আলু"],
      banglaCropInfo: "আলু (Solanaceae) - বাংলাদেশের অন্যতম প্রধান খাদ্য ও অর্থকরী কন্দ ফসল।",
      transmissionRisk: "High",
      treatmentPlan: {
        immediateActions: [
          {
            title: "Prophylactic & Curative Fungicidal Barrier",
            description: "Apply systemically active Mancozeb + Cymoxanil or Metalaxyl immediately upon weather warning.",
            priority: "High",
            timeframe: "Immediate (within 12 hours)",
            effectiveness: "95-98%"
          }
        ],
        organicTreatments: [
          {
            name: "Bordeaux Mixture (1%)",
            preparation: "100g Copper Sulphate + 100g Slaked Lime in 10L clean water.",
            application: "Thorough foliar spray early morning before disease outbreaks.",
            certifications: "OMRI Listed"
          }
        ],
        chemicalTreatments: [
          {
            name: "Cymoxanil 8% + Mancozeb 64% WP",
            activeIngredient: "Curzate M8 / Acrobat MZ",
            dosage: "2.5 g per Liter of water",
            safetyInterval: "14 Days",
            cautions: "Do not harvest within PHI window. Rotate chemistries to prevent fungicide resistance."
          }
        ],
        preventiveMeasures: [
          "Use certified disease-free seed tubers (BARI approved varieties)",
          "Avoid excessive nitrogen fertilization which produces succulent susceptible leaves"
        ],
        culturalPractices: [
          "High earthing-up to prevent spores washing into the soil to reach tubers",
          "Harvest when soil is dry and allow tuber skins to cure before storage"
        ]
      },
      banglaTreatment: {
        managementAdvice: [
          "কুয়াশাচ্ছন্ন আবহাওয়ার পূর্বাভাস পাওয়া মাত্রই আক্রমণ হওয়ার আগেই প্রতিষেধক হিসেবে ম্যানকোজেব স্প্রে করুন।",
          "আক্রান্ত ক্ষেতে সেচ প্রদান তাৎক্ষণিকভাবে বন্ধ রাখুন।"
        ],
        preventionMethods: [
          "সবসময় বিএডিসি অনুমোদিত রোগমুক্ত প্রত্যয়িত বীজ আলু ব্যবহার করুন।",
          "আলুর গাছে পর্যাপ্ত মাটি তুলে দিন যাতে বৃষ্টির পানিতে ছত্রাকের স্পোর কন্দে না পৌঁছায়।"
        ],
        fieldCareGuidance: [
          "গাছের বৃদ্ধি পর্যায়ে অতিরিক্ত ইউরিয়া সার পরিহার করুন, সুষম মাত্রায় পটাশ সার ব্যবহার করুন।"
        ],
        whenToConsultExpert: [
          "ক্ষেতে ৩% এর বেশি গাছে লেট ব্লাইটের লক্ষণ দেখামাত্র কৃষি উপ-সহকারী কর্মকর্তার সাথে যোগাযোগ করুন।"
        ],
        safetyNote: "ছত্রাকনাশক স্প্রে করার পর অন্তত ১৪ দিনের মধ্যে সেই ক্ষেতের আলু তোলা যাবে না।"
      },
      sampleImageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
      isLowConfidenceWarning: false
    },
    {
      id: "rice-blast",
      crop: "Rice",
      banglaCrop: "ধান",
      commonName: "Rice Blast",
      banglaName: "ধানের ব্লাস্ট রোগ",
      scientificName: "Magnaporthe oryzae",
      pathogenType: "Fungal",
      severity: "Severe",
      confidence: 97.2,
      summary: "One of the most catastrophic fungal rice diseases, causing spindle-shaped leaf lesions, collar rot, and neck rot leading to blank panicles.",
      banglaSummary: "ম্যাগনাপোর্থ ওরাইজি ছত্রাক দ্বারা সৃষ্ট ধানের শীর্ষ মারাত্মক রোগ। পাতার ওপর চোখের মতো বা মাকু আকৃতির দাগ পড়ে এবং শীষের গোড়া পচে ধান চিটা হয়ে যায়।",
      symptoms: [
        "Spindle-shaped elliptical lesions with gray/whitish centers and dark necrotic margins",
        "Blackish-brown lesions at node causing stem breakage",
        "Neck rot at panicle base resulting in completely empty, erect whiteheads"
      ],
      banglaSymptoms: [
        "পাতায় চোখের বা মাকুর আকৃতির দাগ যার মাঝের অংশ ছাই রঙের এবং চারপাশ বাদামী",
        "গাছের গিঁটে কালচে দাগ ও গাছ ভেঙে পড়া",
        "শীষের গোড়ায় কালো দাগ ও শীষ ভেঙে চিটা হয়ে যাওয়া (নেক ব্লাস্ট)"
      ],
      favorableConditions: [
        "Temperatures 20°C - 26°C with nighttime cool drops",
        "High nitrogen usage and continuous leaf wetness"
      ],
      banglaCauses: [
        "রাতে ঠান্ডা শিশির ও দিনে গরম আবহাওয়া এবং উচ্চ আর্দ্রতা",
        "জমিতে মাত্রাতিরিক্ত ইউরিয়া সারের প্রয়োগ এবং পটাশের ঘাটতি"
      ],
      affectedParts: ["Leaves", "Collar", "Nodes", "Neck", "Panicle"],
      banglaAffectedParts: ["পাতা", "গাছের গিঁট", "শীষের গোড়া বা নেক"],
      banglaCropInfo: "ধান (Gramineae) - বাংলাদেশের মানুষের প্রধান খাদ্য শস্য।",
      transmissionRisk: "High",
      treatmentPlan: {
        immediateActions: [
          {
            title: "Tricyclazole / Kasugamycin Targeted Application",
            description: "Spray Trooper (Tricyclazole 75% WP) at first detection of leaf blast spots or booting stage.",
            priority: "High",
            timeframe: "Immediate",
            effectiveness: "92-96%"
          }
        ],
        organicTreatments: [
          {
            name: "Pseudomonas fluorescens Bio-agent",
            preparation: "5 g per Liter seed treatment or foliar spray at 10-day intervals.",
            application: "Apply late afternoon.",
            certifications: "Bio-certified"
          }
        ],
        chemicalTreatments: [
          {
            name: "Tricyclazole 75% WP",
            activeIngredient: "Tricyclazole (Trooper / Beam)",
            dosage: "0.75 g per Liter of water",
            safetyInterval: "21 Days",
            cautions: "Wear mask and goggles. Do not spray against the wind."
          }
        ],
        preventiveMeasures: [
          "Seed treatment with Carbendazim before germination",
          "Balanced N-P-K fertilizer application with silica supplementation"
        ],
        culturalPractices: [
          "Keep standing water in field during blast prone weather",
          "Burn crop residue after severe neck blast outbreaks"
        ]
      },
      banglaTreatment: {
        managementAdvice: [
          "শীষে ব্লাস্ট ছড়ানোর আগেই বিকেলে ট্রাইসাইক্লাজল জাতীয় ওষুধ স্প্রে করুন।",
          "জমিতে সার্বক্ষণিক ২-৩ ইঞ্চি পানি ধরে রাখুন যাতে শিকড় শুকিয়ে না যায়।"
        ],
        preventionMethods: [
          "বপনের পূর্বে কার্বেন্ডাজিম দিয়ে বীজ শোধন করে নিন।",
          "বোরো ও আমন মৌসুমে ব্লাস্ট সহনশীল জাত (যেমন ব্রি ধান ৮৯, ৯২) চাষ করুন।"
        ],
        fieldCareGuidance: [
          "ইউরিয়া সারের উপরিপ্রয়োগ বন্ধ রাখুন এবং শতকে অন্তত ৩০০-৪০০ গ্রাম এমওপি (পটাশ) সার দিন।"
        ],
        whenToConsultExpert: [
          "শীষ বের হওয়ার মুখে ৫% শীষে আক্রমণ দেখলে তাৎক্ষণিক জরুরি পরামর্শ নিন।"
        ],
        safetyNote: "ধান কাটার ২১ দিনের ভেতরে কোনো রাসায়নিক স্প্রে করবেন না।"
      },
      sampleImageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80",
      isLowConfidenceWarning: false
    },
    {
      id: "healthy-leaf-control",
      crop: "Tomato",
      banglaCrop: "টমেটো",
      commonName: "Healthy Leaf (No Pathogen Detected)",
      banglaName: "সুস্থ ও সতেজ পাতা",
      scientificName: "Solanum lycopersicum",
      pathogenType: "None",
      severity: "Healthy",
      confidence: 99.1,
      summary: "Normal physiological cellular leaf tissue exhibiting optimal chlorophyll coloration and uninhibited photosynthetic capacity.",
      banglaSummary: "পাতার স্বাভাবিক শারীরবৃত্তীয় গঠন ও স্বাস্থ্যকর কোষকলা। ক্লোরোফিলের ভারসাম্য স্বাভাবিক এবং কোনো রোগজীবাণু বা পুষ্টি ঘাটতি পাওয়া যায়নি।",
      symptoms: [
        "Uniform rich green pigmentation without chlorosis or yellowing",
        "Intact cuticle and laminar margin without necrotic lesions",
        "Clean venation with vigorous vascular turgidity"
      ],
      banglaSymptoms: [
        "পাতার সর্বত্র সমান সতেজ সবুজ বর্ণ",
        "পাতার কিনারা ও ডগা অক্ষত এবং কোনো দাগ বা পোড়া ভাব নেই",
        "পাতার শিরা ও উপ-শিরা সতেজ এবং স্বাভাবিক দৃঢ়তা বিদ্যমান"
      ],
      favorableConditions: [
        "Standard agronomic range: 20°C - 28°C",
        "Balanced soil moisture (60-70% Field Capacity) and full sunlight"
      ],
      banglaCauses: [
        "অনুকূল তাপমাত্রা (২০°-২৮° সে.) ও পর্যাপ্ত সূর্যালোক",
        "মাটিতে পরিমিত আর্দ্রতা এবং সুষম সার ও পুষ্টি উপাদান বজায় থাকা"
      ],
      affectedParts: ["None"],
      banglaAffectedParts: ["কোনো অংশ আক্রান্ত নয়"],
      banglaCropInfo: "উদ্ভিদ সম্পূর্ণ সুস্থ ও স্বাভাবিক বৃদ্ধির ধারায় রয়েছে।",
      transmissionRisk: "None",
      treatmentPlan: {
        immediateActions: [
          {
            title: "Continue Routine Preventative Monitoring",
            description: "No corrective chemical or curative biological intervention is required. Continue routine scouting.",
            priority: "Low",
            timeframe: "Weekly routine",
            effectiveness: "100%"
          }
        ],
        organicTreatments: [],
        chemicalTreatments: [],
        preventiveMeasures: [
          "Follow standard IPM (Integrated Pest Management) protocols",
          "Scout underside of leaves twice weekly for early aphid or whitefly activity"
        ],
        culturalPractices: [
          "Maintain balanced drip irrigation scheduling",
          "Apply organic compost to preserve beneficial mycorrhizal soil flora"
        ]
      },
      banglaTreatment: {
        managementAdvice: [
          "কোনো ওষুধ বা ছত্রাকনাশক স্প্রে করার প্রয়োজন নেই।",
          "সাপ্তাহিক রুটিন পর্যবেক্ষণ চালিয়ে যান যাতে প্রাথমিক অবস্থায় পোকা বা রোগ শনাক্ত করা যায়।"
        ],
        preventionMethods: [
          "মাটির আর্দ্রতা পরীক্ষা করে নিয়মিত সুষম সেচ বজায় রাখুন।",
          "জৈব সার বা ভার্মিকম্পোস্ট প্রয়োগ করে মাটির উর্বরতা ধরে রাখুন।"
        ],
        fieldCareGuidance: [
          "ক্ষেত সবসময় আগাছামুক্ত ও পরিষ্কার রাখুন।"
        ],
        whenToConsultExpert: [
          "ভবিষ্যতে হঠাৎ কোনো দাগ বা পাতার রঙ পরিবর্তন চোখে পড়লে দ্রুত ছবি তুলে স্ক্যান করুন।"
        ],
        safetyNote: "সুস্থ গাছে অপ্রয়োজনীয় রাসায়নিক প্রয়োগ করবেন না। এতে উপকারী কীটপতঙ্গ ধ্বংস হয়।"
      },
      sampleImageUrl: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600&auto=format&fit=crop&q=80",
      isLowConfidenceWarning: false
    }
  ];

  for (const disease of diseases) {
    await prisma.disease.upsert({
      where: { id: disease.id },
      update: disease,
      create: disease,
    });
  }
  console.log("✅ Diseases seeded (4 key representative crops & controls)");

  // 3. Seed Initial Scan History
  const scans = [
    {
      scanCode: "SCAN-HIST-001",
      userId: "usr-farmer-01",
      cropDetected: "Potato",
      banglaCropDetected: "আলু",
      diseaseId: "potato-late-blight",
      diseaseName: "Late Blight",
      banglaDiseaseName: "আলুর নাবী ধসা (লেট ব্লাইট)",
      confidence: 98.4,
      severity: "Severe",
      imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&auto=format&fit=crop&q=80",
      imageName: "potato_field_scan_01.jpg",
      isLowConfidence: false,
      affectedAreaPercentage: 46.8,
      chlorophyllIndex: "Critical (14.6 SPAD)",
      lesionCount: 18,
      tissueNecrosis: true,
      recommendationsCount: 5,
      status: "Active",
      feedbackRating: "accurate",
    },
    {
      scanCode: "SCAN-HIST-002",
      userId: "usr-farmer-01",
      cropDetected: "Tomato",
      banglaCropDetected: "টমেটো",
      diseaseId: "tomato-early-blight",
      diseaseName: "Early Blight",
      banglaDiseaseName: "টমেটোর আগাম ধসা রোগ",
      confidence: 96.8,
      severity: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=300&auto=format&fit=crop&q=80",
      imageName: "tomato_leaf_sample.jpg",
      isLowConfidence: false,
      affectedAreaPercentage: 22.4,
      chlorophyllIndex: "Moderate (27.9 SPAD)",
      lesionCount: 7,
      tissueNecrosis: false,
      recommendationsCount: 4,
      status: "Treated",
      feedbackRating: "accurate",
    },
    {
      scanCode: "SCAN-HIST-003",
      userId: "usr-farmer-01",
      cropDetected: "Rice",
      banglaCropDetected: "ধান",
      diseaseId: "rice-blast",
      diseaseName: "Rice Blast",
      banglaDiseaseName: "ধানের ব্লাস্ট রোগ",
      confidence: 97.2,
      severity: "Severe",
      imageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=300&auto=format&fit=crop&q=80",
      imageName: "boro_rice_leaf.jpg",
      isLowConfidence: false,
      affectedAreaPercentage: 38.0,
      chlorophyllIndex: "Critical (16.2 SPAD)",
      lesionCount: 15,
      tissueNecrosis: true,
      recommendationsCount: 5,
      status: "Active",
    },
    {
      scanCode: "SCAN-HIST-005",
      userId: "usr-farmer-01",
      cropDetected: "Tomato",
      banglaCropDetected: "টমেটো",
      diseaseId: "healthy-leaf-control",
      diseaseName: "Healthy Leaf (No Pathogen Detected)",
      banglaDiseaseName: "সুস্থ ও সতেজ পাতা",
      confidence: 99.1,
      severity: "Healthy",
      imageUrl: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=300&auto=format&fit=crop&q=80",
      imageName: "healthy_specimen.jpg",
      isLowConfidence: false,
      affectedAreaPercentage: 0.5,
      chlorophyllIndex: "Optimal (48.2 SPAD)",
      lesionCount: 0,
      tissueNecrosis: false,
      recommendationsCount: 2,
      status: "Monitoring",
      feedbackRating: "accurate",
    }
  ];

  for (const scan of scans) {
    await prisma.scan.upsert({
      where: { scanCode: scan.scanCode },
      update: scan,
      create: scan,
    });
  }
  console.log("✅ Scan history seeded (4 records)");

  // 4. Seed Feedback
  const createdScan1 = await prisma.scan.findUnique({ where: { scanCode: "SCAN-HIST-001" } });
  const createdScan2 = await prisma.scan.findUnique({ where: { scanCode: "SCAN-HIST-002" } });

  if (createdScan1) {
    await prisma.feedback.upsert({
      where: { scanId: createdScan1.id },
      update: {},
      create: {
        feedbackCode: "FB-001",
        scanId: createdScan1.id,
        userId: "usr-farmer-01",
        crop: "Potato",
        disease: "Late Blight",
        banglaDisease: "আলুর নাবী ধসা (লেট ব্লাইট)",
        confidence: 98.4,
        rating: "accurate",
        comment: "মুন্সীগঞ্জের জমিতে হুবহু এই লক্ষণ দেখা গিয়েছিল। কুয়াশার পর রোগটি হয়েছিল। সঠিক প্রেডিকশন।",
        userName: "মোঃ রফিকুল ইসলাম (কৃষক, বগুড়া)",
        status: "reviewed",
      },
    });
  }

  if (createdScan2) {
    await prisma.feedback.upsert({
      where: { scanId: createdScan2.id },
      update: {},
      create: {
        feedbackCode: "FB-002",
        scanId: createdScan2.id,
        userId: "usr-farmer-01",
        crop: "Tomato",
        disease: "Early Blight",
        banglaDisease: "টমেটোর আগাম ধসা রোগ",
        confidence: 96.8,
        rating: "accurate",
        comment: "টার্গেট বোর্ডের রিং দেখে নিশ্চিত হয়েছি। ছত্রাকনাশক স্প্রে করার পর আক্রমণ নিয়ন্ত্রণে এসেছে।",
        userName: "আমিনুল হক (সবজি চাষী)",
        status: "reviewed",
      },
    });
  }
  console.log("✅ Prediction feedback seeded");

  // 5. Seed Agricultural Notices
  const notices = [
    {
      noticeCode: "not-01",
      title: "Cold Wave Alert for Potato & Boro Seedbeds",
      banglaTitle: "চলতি শৈত্যপ্রবাহে আলু ও বোরো ধানের বীজতলার সুরক্ষায় বিশেষ সতর্কতা",
      content: "Cover seedbeds with polythene sheets at night and drain cold water in the morning. Inspect potato leaves for early water-soaked spots.",
      banglaContent: "রাতে বীজতলা স্বচ্ছ পলিথিন দিয়ে ঢেকে রাখুন এবং সকালে তুলে ফেলুন। আলুর পাতায় জলছাপযুক্ত দাগ দেখা দেওয়া মাত্র অনুমোদিত প্রতিরোধক ছত্রাকনাশক স্প্রে করুন।",
      category: "alert",
      date: "২০২৬-১০-১৯",
      active: true,
    },
    {
      noticeCode: "not-02",
      title: "Safe Pesticide Application Notice",
      banglaTitle: "কীটনাশক প্রয়োগে সংবিধিবদ্ধ স্বাস্থ্য ও নিরাপত্তা বিধি",
      content: "Never guess dosage. Use personal protective equipment, mask, and spray in late afternoon.",
      banglaContent: "কীটনাশকের ডোজ কখনই অনুমান করে প্রয়োগ করবেন না। গ্লাভস ও মাস্ক পরিধান করুন এবং বাতাসের অনুকূলে বিকেলে স্প্রে করুন।",
      category: "guideline",
      date: "২০২৬-১০-১৫",
      active: true,
    },
  ];

  for (const notice of notices) {
    await prisma.notice.upsert({
      where: { noticeCode: notice.noticeCode },
      update: notice,
      create: notice,
    });
  }
  console.log("✅ Agricultural notices seeded");

  console.log("✨ KrishiDrishti database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed with error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
