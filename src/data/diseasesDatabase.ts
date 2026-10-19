import { DiseaseInfo } from "@/types/disease";

export const DISEASES_DATABASE: DiseaseInfo[] = [
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
    summary:
      "A destructive fungal disease characterized by concentric rings forming 'target board' lesions primarily on mature foliage, causing premature defoliation and fruit collar rot.",
    banglaSummary:
      "অল্টারনারিয়া সোলানি ছত্রাকজনিত একটি মারাত্মক রোগ। বয়স্ক পাতায় চক্রাকার দাগ বা টার্গেট বোর্ডের মতো রিং তৈরি হয় এবং আক্রান্ত পাতা দ্রুত শুকিয়ে ঝরে পড়ে ফলন কমে যায়।",
    symptoms: [
      "Dark brown to black necrotic spots on older bottom leaves",
      "Concentric circular rings within lesions (target-pattern appearance)",
      "Yellow chlorotic halos surrounding leaf lesions",
      "Stems developing dark, sunken circular cankers",
      "Sunken, leathery dark spots on fruit near the stem calyx",
    ],
    banglaSymptoms: [
      "গাছের নিচের বয়স্ক পাতায় গাঢ় বাদামী বা কালচে গোল দাগ দেখা যায়",
      "দাগগুলোর ভেতর একাধিক কেন্দ্রীভূত রিং বা চক্রাকার বলয় (টার্গেট বোর্ড) তৈরি হয়",
      "দাগের চারপাশের পাতার অংশ হলুদ হয়ে যায়",
      "কাণ্ডে গাঢ় ও কিছুটা দেবে যাওয়া ক্ষতচিহ্ন দেখা দেয়",
      "ফলের বোঁটার অংশে কালচে ও চামড়ার মতো শক্ত ক্ষতের সৃষ্টি হয়",
    ],
    favorableConditions: [
      "Warm temperatures between 24°C - 29°C (75°F - 85°F)",
      "Frequent rains, high relative humidity (>80%), or heavy overhead dew",
      "Dense canopy with poor air circulation",
    ],
    banglaCauses: [
      "২৪° থেকে ২৯° সেলসিয়াস তাপমাত্রা এবং উচ্চ আর্দ্রতা (>৮০%)",
      "ঘন কুয়াশা, গুঁড়ি গুঁড়ি বৃষ্টি বা পাতায় দীর্ঘক্ষণ শিশির জমে থাকা",
      "জমিতে ঘন করে চারা রোপণ ও অপর্যাপ্ত বাতাস চলাচল",
      "আগের মৌসুমে আক্রান্ত ফসলের অবশিষ্টাংশ মাটিতে থাকা",
    ],
    affectedParts: ["Lower leaves", "Stems", "Fruit"],
    banglaAffectedParts: ["নিচের পাতা", "ডালপালা ও কাণ্ড", "টমেটো ফল"],
    banglaCropInfo: "টমেটো (Solanaceae পরিবার) - বাংলাদেশের প্রধান শীতকালীন ও গ্রীষ্মকালীন অর্থকরী সবজি ফসল।",
    transmissionRisk: "High",
    banglaTreatment: {
      managementAdvice: [
        "গাছের নিচের আক্রান্ত ও হলুদ হওয়া পাতা সতর্কতার সাথে ছেঁটে পুড়িয়ে বা মাটিতে পুঁতে ফেলুন।",
        "ছাঁটাইয়ের পর জমিতে কোনো আক্রান্ত পাতা ফেলে রাখবেন না, এতে ছত্রাকের স্পোর ছড়াতে পারে।",
        "পাতার ওপর দিয়ে পানি না দিয়ে গাছের গোড়ায় বা ড্রিপ পদ্ধতিতে সেচ প্রদান করুন।",
      ],
      preventionMethods: [
        "একই জমিতে পর পর বেগুন, আলু বা টমেটো চাষ না করে শস্যপর্যায় (Crop Rotation) মেনে চলুন।",
        "রোপণের সময় সুস্থ, রোগমুক্ত ও প্রত্যায়িত বীজতলার চারা ব্যবহার করুন।",
        "গাছের গোড়ায় শুকনো খড়ের মালচিং ব্যবহার করুন যাতে সেচের পানির ছিটে পাতার গায়ে না লাগে।",
        "গাছ যাতে নুয়ে না পড়ে সেজন্য খুঁটি বা সুতলি দিয়ে বেঁধে দিন এবং আলো-বাতাস নিশ্চিত করুন।",
      ],
      fieldCareGuidance: [
        "সকালের দিকে সেচ দিন যাতে দিনের আলোতে পাতার পানি দ্রুত শুকিয়ে যায়।",
        "সুষম সার ব্যবহার করুন; অতিরিক্ত ইউরিয়া নাইট্রোজেন সার ব্যবহার করলে রোগ দ্রুত বৃদ্ধি পায়।",
        "গাছ ছাঁটাইয়ের কাঁচি বা ছুরি ব্যবহারের পূর্বে জীবাণুমুক্ত বা সাবান পানি দিয়ে ধুয়ে নিন।",
      ],
      whenToConsultExpert: [
        "যদি মাঠের ২০% এর বেশি গাছে দ্রুত রোগ ছড়িয়ে পড়ে এবং কাণ্ডে ক্ষত তৈরি হয়।",
        "প্রাথমিক ব্যবস্থা নেওয়ার ৩-৪ দিনের মধ্যেও রোগের বিস্তার না থামলে নিকটস্থ উপজেলা কৃষি অফিসে নমুনা পাতা নিয়ে যোগাযোগ করুন।",
      ],
      safetyNote:
        "⚠️ রাসায়নিক বা ছত্রাকনাশকের নির্দিষ্ট বাণিজ্যিক ডোজ অনুমান করে প্রয়োগ করা ঝুঁকিপূর্ণ। সর্বদা বোতলের গায়ে অনুমোদিত অনুমোদনের মাত্রা দেখুন এবং স্থানীয় উপজেলা উপসহকারী কৃষি কর্মকর্তার (SAAO) পরামর্শ অনুযায়ী অনুমোদিত ছত্রাকনাশক স্প্রে করুন।",
      verifiedSource: "বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI) ও কৃষি তথ্য সার্ভিস (AIS)",
    },
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
      ],
      organicTreatments: [
        {
          name: "Copper Octanoate (Liquid Copper)",
          preparation: "Mix 15-30 ml per gallon of clean water",
          application: "Foliar mist every 7-10 days, ensuring complete leaf undersides coverage",
          certifications: "OMRI Listed, USDA Organic Compliant",
        },
        {
          name: "Neem Oil Extract",
          preparation: "5 ml Neem extract + 2 ml organic biodegradable dish soap per liter of water",
          application: "Spray every 5 days during initial lesion breakout",
          certifications: "100% Bio-based",
        },
      ],
      chemicalTreatments: [
        {
          name: "Chlorothalonil (Bravo WeatherStik)",
          activeIngredient: "Chlorothalonil 54%",
          dosage: "Follow manufacturer registered label",
          safetyInterval: "0 days (PHI for tomatoes), avoid during honeybee peak flight",
          cautions: "Protective gear required. Strictly adhere to approved label dosage.",
        },
      ],
      preventiveMeasures: [
        "Enforce strict 3-year crop rotation with non-solanaceous crops",
        "Apply 3-4 inches of clean straw or organic mulch around base stems",
        "Maintain minimum 24-inch in-row plant spacing and stake/trellis plants vertically",
      ],
      culturalPractices: [
        "Stake plants vertically using string trellising",
        "Water early in the morning so sun dries leaf surfaces quickly",
      ],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=600&auto=format&fit=crop&q=80",
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
    summary:
      "A devastating water mold that caused the historic Irish Potato Famine. Characterized by aggressive water-soaked black lesions and white fuzzy sporulation on leaf undersides under moist conditions.",
    banglaSummary:
      "ফাইটোপথোরা ইনফেসট্যান্স দ্বারা সৃষ্ট আলুর সর্বাধিক ধ্বংসাত্মক রোগ। পাতা, কাণ্ড এবং কন্দে দ্রুত ছড়ায়; কুয়াশাচ্ছন্ন আর্দ্র আবহাওয়ায় ২-৩ দিনের মধ্যে পুরো মাঠ পুড়ে যাওয়ার মতো কালো হয়ে যায়।",
    symptoms: [
      "Irregular water-soaked pale-green to dark-brown lesions on leaves and petioles",
      "Delicate white fungal down/fuzz visible on underside of leaves in humid mornings",
      "Stems developing brittle dark purple to black necrotized patches",
      "Tubers displaying granular, reddish-brown dry rot below the skin",
      "Rapid vine collapse and putrid rotting odor across the field",
    ],
    banglaSymptoms: [
      "পাতার ডগায় বা কিনারে প্রথমে ভেজা ভেজা জলছাপের মতো হালকা সবুজ থেকে কালো দাগ",
      "সকালের কুয়াশায় বা আর্দ্র আবহাওয়ায় পাতার উল্টো পিঠে সাদা তুলোর মতো ছত্রাক দেখা যায়",
      "গাছের কাণ্ডে কালচে দাগ পড়ে এবং কাণ্ড সহজেই ভেঙে পড়ে",
      "মাটির নিচের আলুর খোসার নিচে লালচে-বাদামী শুকনো পচন ধরে",
      "আক্রমণ তীব্র হলে দূর থেকে পুরো খেত আগুনে ঝলসে যাওয়ার মতো দেখায় এবং পচা গন্ধ বের হয়",
    ],
    favorableConditions: [
      "Cool to moderate temperatures (15°C - 21°C / 60°F - 70°F)",
      "Extended wet leaf periods (>10 hours) and relative humidity >90%",
      "Continuous overcast skies and foggy spells",
    ],
    banglaCauses: [
      "টানা মেঘলা আকাশ, ঘন কুয়াশা ও গুঁড়ি গুঁড়ি বৃষ্টি",
      "১৫° থেকে ২০° সেলসিয়াস তাপমাত্রা এবং বাতাসে ৯০% এর বেশি আপেক্ষিক আর্দ্রতা",
      "বাতাসের মাধ্যমে স্পোর দ্রুত এক খেত থেকে অন্য খেতে ছড়িয়ে পড়ে",
    ],
    affectedParts: ["Foliage", "Stems", "Tubers", "Stolons"],
    banglaAffectedParts: ["পাতা", "বোঁটা ও কাণ্ড", "মাটির নিচে আলুর কন্দ"],
    banglaCropInfo: "আলু (Solanum tuberosum) - বাংলাদেশের প্রধান অর্থকরী কন্দ ফসল। মুন্সীগঞ্জ, বগুড়া, রংপুর ও জয়পুরহাটে ব্যাপক চাষ হয়।",
    transmissionRisk: "High",
    banglaTreatment: {
      managementAdvice: [
        "আক্রান্ত গাছে অবিলম্বে সেচ দেওয়া সম্পূর্ণ বন্ধ করুন। জমিতে পানি জমে থাকলে ছত্রাক দ্রুত আলুর কন্দে প্রবেশ করে।",
        "রোগের লক্ষণ দেখা মাত্র কুয়াশা কেটে যাওয়ার পর অনুমোদিত প্রতিরোধক বা স্পর্শক ছত্রাকনাশক পাতার উপরে ও নিচে ভালোভাবে ভিজিয়ে স্প্রে করুন।",
        "মাঠে ব্যাপকভাবে রোগ ছড়িয়ে পড়লে আলু তোলার ১০-১৫ দিন আগে গাছের ওপরের লতা কেটে অপসারণ (Haulm cutting) করুন যাতে আলু অক্ষত থাকে।",
      ],
      preventionMethods: [
        "বিএডিসি (BADC) বা প্রত্যয়িত রোগমুক্ত বীজ আলু ব্যবহার করুন।",
        "শীতকালে টানা ৩ দিন ঘন কুয়াশা ও মেঘলা আকাশ থাকলে আগাম সতর্কতা হিসেবে বোর্দো মিক্সচার বা অনুমোদিত ম্যানকোজেব স্প্রে করুন।",
        "গাছের গোড়ায় ভালো করে মাটি তুলে দিন যাতে বৃষ্টির পানি বা ছত্রাকের স্পোর আলুর সংস্পর্শে না যায়।",
        "ফসল কাটার পর জমির আক্রান্ত লতাপাতা পুড়িয়ে নষ্ট করে ফেলুন।",
      ],
      fieldCareGuidance: [
        "কুয়াশাচ্ছন্ন সকালে জমিতে কাজ করা বা পাতার সংস্পর্শে হাঁটা এড়িয়ে চলুন।",
        "মাটির অতিরিক্ত আর্দ্রতা নিষ্কাশনের জন্য নালা পরিষ্কার রাখুন।",
      ],
      whenToConsultExpert: [
        "আশেপাশের খেতে রোগ দেখা দিলে এবং আপনার খেতের পাতায় সাদা ছত্রাকের আস্তরণ দেখা দেওয়া মাত্র।",
        "জরুরি ভিত্তিতে সঠিক অনুমোদিত ছত্রাকনাশক নির্বাচনের জন্য অবিলম্বে উপজেলা কৃষি অফিসে যোগাযোগ করুন।",
      ],
      safetyNote:
        "⚠️ রাসায়নিক বা কীটনাশকের নির্দিষ্ট বাণিজ্যিক ডোজ অনুমান করে প্রয়োগ করবেন না। লেট ব্লাইটের জন্য কৃষি সম্প্রসারণ অধিদপ্তর (DAE) নির্দেশিত অনুমোদিত গ্রুপের ছত্রাকনাশক বোতলের লেবেলে উল্লেখিত সঠিক মাত্রায় স্প্রে করুন।",
      verifiedSource: "বাংলাদেশ কৃষি সম্প্রসারণ অধিদপ্তর (DAE) ও কন্দাল ফসল গবেষণা কেন্দ্র (BARI)",
    },
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
          title: "Halt Sprinkler Irrigation",
          description: "Stop all overhead watering. Tubers must stay dry to prevent zoospores washing down through soil fissures.",
          priority: "High",
          timeframe: "Immediate",
          effectiveness: "90%",
        },
      ],
      organicTreatments: [
        {
          name: "Bordeaux Mixture (1%)",
          preparation: "100g copper sulfate, 100g hydrated lime in 10 liters clean water",
          application: "Spray preventative coat before rain fronts; reapply every 5 days in wet weather",
          certifications: "Traditional Organic Standard",
        },
      ],
      chemicalTreatments: [
        {
          name: "Cymoxanil + Mancozeb",
          activeIngredient: "Cymoxanil 8% + Mancozeb 64%",
          dosage: "Refer to approved product package label",
          safetyInterval: "7-14 days pre-harvest",
          cautions: "Follow government approved safety precautions and wear mask.",
        },
      ],
      preventiveMeasures: [
        "Plant only certified disease-free seed tubers with blue label guarantee",
        "Select late-blight resistant potato cultivars",
        "Hill potato ridges deeply (min 4-6 inches) to protect tubers",
      ],
      culturalPractices: [
        "Monitor local weather warning services daily during December-January",
        "Desiccate vines with haulm cutter 10 days prior to harvest",
      ],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "pepper-bacterial-spot",
    crop: "Bell Pepper",
    banglaCrop: "মরিচ",
    commonName: "Bacterial Spot",
    banglaName: "মরিচের ব্যাকটেরিয়াল দাগ রোগ",
    scientificName: "Xanthomonas euvesicatoria",
    pathogenType: "Bacterial",
    severity: "Moderate",
    confidence: 95.2,
    summary:
      "A widespread and destructive bacterial pathogen attacking peppers and chilies, resulting in small water-soaked lesions that turn necrotic with raised margins, causing widespread leaf drop.",
    banglaSummary:
      "জ্যান্থোমোনাস ব্যাকটেরিয়াজনিত রোগ। পাতায় ছোট ছোট জলছাপের মতো দাগ পড়ে যা পরবর্তীতে কালচে বাদামী হয়ে কেন্দ্রভাগ ফেটে যায়। প্রচুর পাতা ঝরে পড়ে এবং ফল কুঁচকে যায়।",
    symptoms: [
      "Small (1-3mm), circular, water-soaked dark spots on lower leaf surface",
      "Lesions turn purplish-brown to black with cracked, raised centers",
      "Severe chlorosis and massive premature leaf shedding",
      "Fruit displaying wart-like rough, scabbed, blistered spots",
    ],
    banglaSymptoms: [
      "পাতার নিচের পিঠে ১-৩ মিমি আকারের ছোট জলছাপযুক্ত বাদামী বা কালচে দাগ",
      "দাগগুলোর কেন্দ্রভাগ খসখসে ও সামান্য উঁচু হয়ে যায়",
      "আক্রান্ত পাতা দ্রুত হলুদ হয়ে ঝরে পড়ে এবং গাছ পাতাশূন্য হয়ে পড়ে",
      "মরিচের গায়ে গুটি বা ফোস্কার মতো ক্ষতের দাগ দেখা যায়",
    ],
    favorableConditions: [
      "Warm temperatures between 25°C - 30°C (77°F - 86°F)",
      "Heavy downpours, wind-driven rain, and high humidity",
      "Overhead tractor cultivation while plants are wet",
    ],
    banglaCauses: [
      "উচ্চ তাপমাত্রা (২৫-৩০° সে.) এবং ভারী বৃষ্টিপাত",
      "ঝড়ো বাতাসে পাতার পারস্পরিক ঘর্ষণে ক্ষত সৃষ্টি হলে ব্যাকটেরিয়া প্রবেশ করে",
      "আক্রান্ত বীজ ও অতিরিক্ত ভেজা জমি",
    ],
    affectedParts: ["Leaves", "Stems", "Fruit"],
    banglaAffectedParts: ["পাতা", "ডগা", "কাঁচা ও পাকা মরিচ"],
    banglaCropInfo: "মরিচ (Capsicum annuum) - বাংলাদেশের অন্যতম প্রধান অর্থকরী মসলা জাতীয় ফসল।",
    transmissionRisk: "High",
    banglaTreatment: {
      managementAdvice: [
        "আক্রান্ত ডাল ও পাতা সাবধানে সংগ্রহ করে ধ্বংস করুন।",
        "ভেজা অবস্থায় জমিতে কোনো কাজ বা মরিচ তোলা থেকে বিরত থাকুন, অন্যথায় ব্যাকটেরিয়া সব গাছে ছড়াবে।",
        "অনুমোদিত কপার অক্সিক্লোরাইড জাতীয় ছত্রাক ও ব্যাকটেরিয়ানাশক অনুমোদিত মাত্রায় স্প্রে করুন।",
      ],
      preventionMethods: [
        "গরম পানিতে (৫০° সে. তাপমাত্রায় ২৫ মিনিট) বীজ শোধন করে চারা তৈরি করুন।",
        "রোগমুক্ত প্রত্যয়িত বীজ এবং প্রতিরোধী জাতের মরিচ চাষ করুন।",
        "পরপর দুই বছর একই জমিতে টমেটো বা মরিচ চাষ পরিহার করুন।",
      ],
      fieldCareGuidance: [
        "গাছের গোড়ায় পানি জমতে দেবেন না, সুষম নিষ্কাশন নিশ্চিত করুন।",
        "ইউরিয়ার মাত্রা কমিয়ে পটাশ সারের পরিমাণ বাড়ান, যা গাছের রোগ প্রতিরোধ ক্ষমতা বাড়ায়।",
      ],
      whenToConsultExpert: [
        "পাতার বড় অংশ ঝরে পড়তে শুরু করলে ও ফল ক্ষতিগ্রস্ত হলে স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন।",
      ],
      safetyNote:
        "⚠️ রাসায়নিক কীটনাশক বা ব্যাকটেরিয়ানাশকের নির্দিষ্ট বাণিজ্যিক ডোজ অনুমান করে ব্যবহার করবেন না। সবসময় সরকারি অনুমোদিত নির্দেশিকা ও কৃষি কর্মকর্তার প্রেসক্রিপশন অনুযায়ী সঠিক মাত্রায় ব্যবহার করুন।",
      verifiedSource: "বাংলাদেশ কৃষি গবেষণা কাউন্সিল (BARC) ও মসলা গবেষণা কেন্দ্র (Bari)",
    },
    treatmentPlan: {
      immediateActions: [
        {
          title: "Copper Protectant Spray",
          description: "Apply registered copper fungicide/bactericide mixture according to official approved agricultural label.",
          priority: "High",
          timeframe: "Immediate (24 hours)",
          effectiveness: "88%",
        },
      ],
      organicTreatments: [
        {
          name: "Bordeaux Mixture / Bio-copper",
          preparation: "Mix as per standard agricultural organic recommendation",
          application: "Spray during early morning hours ensuring underside coverage",
          certifications: "Bio-Safe Approved",
        },
      ],
      chemicalTreatments: [
        {
          name: "Copper Hydroxide formulation",
          activeIngredient: "Copper Hydroxide 77%",
          dosage: "Refer strictly to registered packaging directions",
          safetyInterval: "Approved pre-harvest interval",
          cautions: "Wear protective gloves and eye protection.",
        },
      ],
      preventiveMeasures: [
        "Purchase hot-water treated certified disease-free seeds",
        "Never enter or work in pepper rows while foliage is wet with dew or rain",
      ],
      culturalPractices: [
        "Rotate fields out of Solanaceae family for minimum 2 years",
      ],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "corn-common-rust",
    crop: "Corn (Maize)",
    banglaCrop: "ভুট্টা",
    commonName: "Common Rust",
    banglaName: "ভুট্টার সাধারণ মরিচা রোগ",
    scientificName: "Puccinia sorghi",
    pathogenType: "Fungal",
    severity: "Moderate",
    confidence: 94.6,
    summary:
      "A common foliar fungal disease of sweet and field corn producing golden-brown to cinnamon powdery pustules (uredinia) on upper and lower leaf surfaces.",
    banglaSummary:
      "পুকসিনিয়া সরঘি ছত্রাক দ্বারা সৃষ্ট রোগ। পাতার উভয় পিঠে ইটের রঙের বা মরিচা রঙের গুঁড়ো গুঁড়ো ফোস্কা দেখা যায়। সালোকসংশ্লেষণ কমে গিয়ে দানার আকার ছোট হয়ে যায়।",
    symptoms: [
      "Small, elongated cinnamon-brown to brick-red powdery pustules",
      "Pustules erupting through the epidermal leaf surface on both sides",
      "Leaves turning yellow and chlorotic around dense pustule clusters",
      "Premature leaf drying during ear-fill stage causing kernel shrinkage",
    ],
    banglaSymptoms: [
      "পাতার উভয় পিঠে লম্বাটে, মরিচা বা ইটের রঙের গুঁড়োযুক্ত ফোসকা",
      "হাত দিয়ে ঘষলে আঙুলে মরিচার মতো বাদামী গুঁড়ো লেগে যায়",
      "দাগগুলোর চারপাশের পাতার অংশ হলুদ হয়ে শুকিয়ে যায়",
      "ভুট্টার মোচায় দানা গঠন ব্যাহত হয় ও দানা কুঁচকে যায়",
    ],
    favorableConditions: [
      "Moderate cool temperatures (16°C - 24°C / 60°F - 75°F)",
      "High atmospheric humidity (>95%) and night dew lasting 6+ hours",
      "Late planted corn following windblown spore currents from southern zones",
    ],
    banglaCauses: [
      "১৬° থেকে ২৪° সে. তাপমাত্রা এবং রাতে দীর্ঘস্থায়ী শিশির",
      "বাতাসে আর্দ্রতা ৯৫% এর বেশি থাকা",
      "দেরিতে ভুট্টা বপন করা",
    ],
    affectedParts: ["Leaves", "Husks", "Stalks"],
    banglaAffectedParts: ["পাতা", "মোচার খোসা", "গাছের কাণ্ড"],
    banglaCropInfo: "ভুট্টা (Zea mays) - পোল্ট্রি ও মাছের খাদ্য এবং মানুষের পুষ্টির জন্য বাংলাদেশের দ্রুত বর্ধনশীল অন্যতম অর্থকরী দানা ফসল।",
    transmissionRisk: "Moderate",
    banglaTreatment: {
      managementAdvice: [
        "আক্রান্ত পাতা ছিঁড়ে মাটিতে পুঁতে ফেলুন যদি আক্রমণের তীব্রতা কম থাকে।",
        "ভুট্টায় ফুল আসার আগে বা মোচা আসার সময় রোগ বেশি দেখা দিলে অনুমোদিত ছত্রাকনাশক স্প্রে করুন।",
      ],
      preventionMethods: [
        "রোগ প্রতিরোধী হাইব্রিড ভুট্টার জাত নির্বাচন করুন।",
        "সময়মতো সঠিক মৌসুমে আগাম ভুট্টা বপন করুন।",
        "ফসল কাটার পর জমির আবর্জনা গভীরভাবে চাষ দিয়ে মাটির সাথে মিশিয়ে দিন।",
      ],
      fieldCareGuidance: [
        "জমিতে পরিমিত পটাশ সার ব্যবহার করুন, যা ভুট্টার পাতার শক্তি বাড়ায়।",
      ],
      whenToConsultExpert: [
        "যদি মোচার উপরের পাতায় মরিচার ফোসকা দ্রুত ছড়িয়ে পড়ে তবে ফলন বাঁচাতে দ্রুত বিশেষজ্ঞের পরামর্শ নিন।",
      ],
      safetyNote:
        "⚠️ রাসায়নিক ছত্রাকনাশকের নির্দিষ্ট ডোজ অনুমান করে দেওয়া নিষিদ্ধ। অনুমোদিত লেবেলের নির্দেশনা মেনে চলুন এবং স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন।",
      verifiedSource: "বাংলাদেশ গম ও ভুট্টা গবেষণা ইনস্টিটিউট (BWMRI)",
    },
    treatmentPlan: {
      immediateActions: [
        {
          title: "Economic Threshold Assessment",
          description: "Count pustules on leaves below the ear leaf. If threshold reached, apply recommended treatment.",
          priority: "High",
          timeframe: "Within 48 hours",
          effectiveness: "90%",
        },
      ],
      organicTreatments: [
        {
          name: "Micronized Wettable Sulfur",
          preparation: "Mix according to approved organic agricultural directions",
          application: "Spray every 10-14 days during vegetative stage",
          certifications: "Organic Standard Compliant",
        },
      ],
      chemicalTreatments: [
        {
          name: "Registered Azoxystrobin formulation",
          activeIngredient: "Azoxystrobin",
          dosage: "Refer to approved commercial product instructions",
          safetyInterval: "21 days for corn harvest",
          cautions: "Do not exceed registered seasonal limit.",
        },
      ],
      preventiveMeasures: [
        "Plant resistant corn hybrids containing Rp genes",
        "Plant early in the season to pass vulnerable pollination stages",
      ],
      culturalPractices: [
        "Ensure balanced potassium nutrition to strengthen foliage",
      ],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "rice-blast",
    crop: "Rice",
    banglaCrop: "ধান",
    commonName: "Rice Blast",
    banglaName: "ধানের ব্লাস্ট রোগ (পাতা ও শীষ ব্লাস্ট)",
    scientificName: "Pyricularia oryzae",
    pathogenType: "Fungal",
    severity: "Severe",
    confidence: 97.2,
    summary:
      "One of the most devastating diseases of rice. Symptoms include spindle or eye-shaped lesions with grayish centers on leaves, neck blast causing entire panicles to turn white and sterile.",
    banglaSummary:
      "ধানের প্রধান ও সবচেয়ে মারাত্মক ছত্রাকজনিত রোগ। পাতায় চোখের মতো বা মাকু আকৃতির দাগ তৈরি হয় যার কেন্দ্রভাগ ছাই রঙের। শীষের গোড়ায় আক্রমণ হলে পুরো শীষ চিটা হয়ে যায় (শীষ ব্লাস্ট)।",
    symptoms: [
      "Spindle-shaped or eye-shaped lesions with grayish centers and brown borders on leaves",
      "Lesions coalescing to kill entire leaf blades",
      "Blackening and rotting at the neck node of the panicle (Neck Blast)",
      "Completely white, sterile panicles standing erect without grains",
    ],
    banglaSymptoms: [
      "পাতায় দুই প্রান্ত চোখা মাকু আকৃতির দাগ যার কেন্দ্র ছাই রঙের এবং কিনারা বাদামী",
      "অনেক দাগ একত্রে মিলে পুরো পাতা ঝলসে শুকিয়ে যায়",
      "শীষের গোড়ায় বা গিট-এ কালচে পচন ধরে (শীষ বা নেক ব্লাস্ট)",
      "শীষ শুকিয়ে সাদা হয়ে খাড়া দাঁড়িয়ে থাকে এবং সম্পূর্ণ দানা চিটা হয়ে যায়",
    ],
    favorableConditions: [
      "Daytime temperature 25°C-28°C and cool nights (18°C-22°C)",
      "Continuous drizzle, cloudy weather, high humidity (>90%)",
      "Excessive nitrogen fertilizer application",
    ],
    banglaCauses: [
      "টানা মেঘলা আবহাওয়া, গুঁড়ি গুঁড়ি বৃষ্টি এবং রাতে বেশি শিশির",
      "জমিতে অতিরিক্ত মাত্রায় ইউরিয়া সারের ব্যবহার",
      "বাতাসের আর্দ্রতা বেশি থাকা এবং মাটিতে পানির ঘাটতি",
    ],
    affectedParts: ["Leaves", "Panicle neck", "Nodes"],
    banglaAffectedParts: ["পাতা", "শীষের গোড়া (নেক)", "কাণ্ডের গিট"],
    banglaCropInfo: "ধান (Oryza sativa) - বাংলাদেশের প্রধান খাদ্য ও প্রধানতম কৃষিজ ফসল। আউশ, আমন ও বোরো মৌসুমে চাষ হয়।",
    transmissionRisk: "High",
    banglaTreatment: {
      managementAdvice: [
        "রোগের লক্ষণ দেখামাত্র জমিতে ইউরিয়া সার প্রয়োগ অবিলম্বে বন্ধ করুন।",
        "জমিতে সবসময় পর্যাপ্ত পানি ধরে রাখুন; ব্লাস্ট আক্রান্ত জমি শুকিয়ে যেতে দিলে রোগ কয়েকগুণ বেড়ে যায়।",
        "শীষে রোগ দেখা দেওয়ার আগেই কুঁড়ি বা শিষ বের হওয়ার মুখে বিকেলে অনুমোদিত ছত্রাকনাশক স্প্রে করুন।",
      ],
      preventionMethods: [
        "রোগ প্রতিরোধী বা সহনশীল ব্রি (BRRI) উদ্ভাবিত ধানের জাত চাষ করুন।",
        "বীজ শোধন: বপনের আগে কার্বেনডাজিম বা অটোস্টিন দিয়ে বীজ শোধন করুন।",
        "ইউরিয়া সার কিস্তিতে এবং পরিমিত মাত্রায় পটাশ সারের সাথে মিশিয়ে ব্যবহার করুন।",
      ],
      fieldCareGuidance: [
        "জমির চারপাশের আগাছা পরিষ্কার রাখুন কারণ আগাছায় এই ছত্রাক বেঁচে থাকে।",
      ],
      whenToConsultExpert: [
        "শীষ বের হওয়ার মুখে যদি পাতায় মাকু আকৃতির দাগ ছড়িয়ে পড়ে, তবে দেরি না করে সাথে সাথে কৃষি কর্মকর্তার সাহায্য নিন।",
      ],
      safetyNote:
        "⚠️ রাসায়নিক বা ছত্রাকনাশকের নির্দিষ্ট ডোজ অনুমান করে ব্যবহার করবেন না। বাংলাদেশ ধান গবেষণা ইনস্টিটিউট (BRRI) নির্দেশিত অনুমোদিত গ্রুপের ছত্রাকনাশক প্যাকেটের লেবেল নির্দেশ অনুযায়ী ব্যবহার করুন।",
      verifiedSource: "বাংলাদেশ ধান গবেষণা ইনস্টিটিউট (BRRI) ও কৃষি তথ্য সার্ভিস (AIS)",
    },
    treatmentPlan: {
      immediateActions: [
        {
          title: "Halt Nitrogen Fertilization",
          description: "Stop urea top-dressing immediately and ensure standing water depth of 2-3 inches in paddy field.",
          priority: "High",
          timeframe: "Immediate",
          effectiveness: "92%",
        },
      ],
      organicTreatments: [
        {
          name: "Bio-fungicide Trichoderma harzianum",
          preparation: "Apply according to approved bio-agent instructions",
          application: "Root drenching and early foliar application",
          certifications: "Certified Bio-Input",
        },
      ],
      chemicalTreatments: [
        {
          name: "Tricyclazole / Azoxystrobin formulation",
          activeIngredient: "Tricyclazole 75% WP",
          dosage: "Refer to approved package directions",
          safetyInterval: "21 days PHI",
          cautions: "Spray in late afternoon; adhere strictly to label safety directions.",
        },
      ],
      preventiveMeasures: [
        "Treat seeds prior to sowing with recommended seed dressing agent",
        "Use BRRI recommended blast-tolerant varieties",
      ],
      culturalPractices: [
        "Maintain continuous standing water in field during high-risk periods",
      ],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "uncertain-low-confidence-sample",
    crop: "Tomato",
    banglaCrop: "টমেটো / অজানা ফসল",
    commonName: "Uncertain / Mixed Foliar Symptoms (Low Confidence)",
    banglaName: "অস্পষ্ট বা মিশ্র রোগ লক্ষণ (কম কনফিডেন্স)",
    scientificName: "Inconclusive pathology",
    pathogenType: "None",
    severity: "Mild",
    confidence: 58.4, // Deliberately < 75% to trigger Low-Confidence Warning!
    isLowConfidenceWarning: true,
    summary:
      "The neural vision model cannot reach a high-confidence diagnosis due to ambiguous visual symptoms, poor illumination, blurred focus, or complex co-infection. Secondary verification is strongly recommended.",
    banglaSummary:
      "এআই মডেল এই পাতার লক্ষণ দেখে কোনো নির্দিষ্ট রোগ সম্পর্কে নিশ্চিত হতে পারেনি (কনফিডেন্স মাত্র ৫৮.৪%)। অপর্যাপ্ত আলো, অস্পষ্ট ছবি বা মিশ্র পুষ্টি ঘাটতির কারণে ফলাফলটি অনিশ্চিত হতে পারে।",
    symptoms: [
      "Blurry or ambiguous foliar discoloration without distinct pathogen rings",
      "Mixed chlorosis potentially resembling physiological nutrient stress",
      "Overlapping edge blemishes with insufficient resolution",
    ],
    banglaSymptoms: [
      "পাতায় অস্পষ্ট দাগ যা কোনো নির্দিষ্ট রোগের সাথে পুরোপুরি মিলছে না",
      "পুষ্টির অভাবজনিত ফ্যাকাশে ভাব ও রোগের লক্ষণের মিশ্র রূপ",
      "ছবির অপর্যাপ্ত আলো বা অস্পষ্টতার কারণে স্পষ্ট লক্ষণ বোঝা যাচ্ছে না",
    ],
    favorableConditions: ["Suboptimal image capture", "Low lighting", "Camera out of focus"],
    banglaCauses: [
      "ছবি তোলার সময় ক্যামেরা ফোকাস না থাকা বা আলো কম থাকা",
      "গাছে একই সাথে একাধিক সমস্যা (যেমন: রোগ + পুষ্টির ঘাটতি) থাকা",
    ],
    affectedParts: ["Foliage"],
    banglaAffectedParts: ["পাতা"],
    banglaCropInfo: "স্ক্রিনিং অনিশ্চিত। পুনরায় স্পষ্ট ছবি তোলা প্রয়োজন।",
    transmissionRisk: "Low",
    banglaTreatment: {
      managementAdvice: [
        "⚠️ সতর্কবাণী: এই ফলাফলের ওপর ভিত্তি করে কোনো রাসায়নিক বা ওষুধ প্রয়োগ করবেন না!",
        "দিনের ভালো আলোতে পাতার একদম কাছে গিয়ে পরিষ্কার ও ফোকাসড ছবি আবার তুলুন।",
        "পাতার সামনের ও পেছনের অংশের স্পষ্ট লক্ষণ পরীক্ষা করুন।",
      ],
      preventionMethods: [
        "গাছের স্বাভাবিক পরিচর্যা ও সেচ বজায় রাখুন।",
        "অন্যান্য স্বাস্থ্যকর গাছের পাতার সাথে আক্রান্ত পাতার তুলনা করুন।",
      ],
      fieldCareGuidance: [
        "ছবি তোলার সময় পাতাটি স্থির রাখুন এবং ছায়া যাতে না পড়ে সেদিকে খেয়াল রাখুন।",
      ],
      whenToConsultExpert: [
        "ফলাফল অনিশ্চিত হওয়ায় অবিলম্বে আক্রান্ত পাতা সহ নিকটস্থ উপজেলা কৃষি কর্মকর্তা বা কৃষি তথ্য সার্ভিসের পরামর্শ নিন।",
      ],
      safetyNote:
        "⚠️ সতর্কতা: নিশ্চিত না হয়ে ভুল ওষুধ বা কীটনাশক স্প্রে করলে ফসলের অপূরণীয় ক্ষতি হতে পারে। বিশেষজ্ঞের পরামর্শ ব্যতীত কোনো কীটনাশক ব্যবহার করবেন না।",
      verifiedSource: "কৃষি তথ্য সার্ভিস (AIS) ও উপজেলা কৃষি সম্প্রসারণ কার্যালয়",
    },
    treatmentPlan: {
      immediateActions: [
        {
          title: "Retake Leaf Image",
          description: "Capture a well-lit, close-up photograph of the leaf surface with clear natural lighting.",
          priority: "High",
          timeframe: "Immediate",
          effectiveness: "99%",
        },
        {
          title: "Consult Local Extension Officer",
          description: "Show physical leaf sample to an Upazila Agricultural Extension Officer for manual lab examination.",
          priority: "High",
          timeframe: "Within 48 hours",
          effectiveness: "100%",
        },
      ],
      organicTreatments: [],
      chemicalTreatments: [],
      preventiveMeasures: [
        "Do not apply chemical pesticides based on inconclusive screening",
      ],
      culturalPractices: [
        "Inspect surrounding crops for consistent symptom patterns",
      ],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "healthy-tomato-leaf",
    crop: "Tomato",
    banglaCrop: "টমেটো",
    commonName: "Healthy Leaf (No Pathogen Detected)",
    banglaName: "সুস্থ ও সতেজ পাতা (কোনো রোগ নেই)",
    scientificName: "Solanum lycopersicum",
    pathogenType: "None",
    severity: "Healthy",
    confidence: 99.1,
    summary:
      "Vibrant green leaf tissue with intact epidermal cells, uniform chlorophyll distribution, and no visible signs of fungal sporulation, bacterial spots, or viral mosaic deformities.",
    banglaSummary:
      "পাতাটি সম্পূর্ণ সতেজ, সবুজ ও সুস্থ। পাতায় কোনো ছত্রাক, ব্যাকটেরিয়া বা ভাইরাসের সংক্রমণ দেখা যায়নি। ক্লোরোফিলের মাত্রা চমৎকার।",
    symptoms: [
      "Deep uniform green coloration across lamina",
      "Clean margins without necrosis or chlorosis",
      "Sturdy petiole and healthy vascular venation",
      "Turgid leaf cells with high photosynthetic efficiency",
    ],
    banglaSymptoms: [
      "পাতাজুড়ে স্বাভাবিক ও উজ্জ্বল গাঢ় সবুজ রঙ",
      "পাতার কিনারায় কোনো দাগ বা পোড়াভাব নেই",
      "শিরা-উপশিরা সতেজ এবং পাতা টানটান",
      "কোনো ক্ষত বা ফাঙ্গাসের উপস্থিতি নেই",
    ],
    favorableConditions: [
      "Optimal temperatures (20°C - 26°C)",
      "Balanced soil nutrients (N-P-K 10-10-10)",
      "Drip irrigation and proper staking",
    ],
    banglaCauses: ["উত্তম পরিচর্যা, সুষম সার ও অনুকূল পরিবেশ"],
    affectedParts: ["None - Plant is Healthy"],
    banglaAffectedParts: ["কোনো আক্রান্ত অংশ নেই - গাছ সুস্থ"],
    banglaCropInfo: "টমেটো - বর্তমানে গাছটি উৎকৃষ্ট স্বাস্থ্য অবস্থায় রয়েছে।",
    transmissionRisk: "None",
    banglaTreatment: {
      managementAdvice: [
        "বর্তমানে কোনো প্রকার বালাইনাশক স্প্রে করার প্রয়োজন নেই।",
        "নিয়মিত জমি পর্যবেক্ষণ ও সেচ ব্যবস্থাপনা বজায় রাখুন।",
      ],
      preventionMethods: [
        "মাটির আর্দ্রতা অনুযায়ী নিয়মিত ড্রিপ বা পরিমিত সেচ দিন।",
        "গাছের গোড়ায় জৈব কম্পোস্ট ও সুষম সার প্রয়োগ বজায় রাখুন।",
      ],
      fieldCareGuidance: [
        "সপ্তাহে একবার নিচের পাতার স্বাস্থ্য পরীক্ষা করুন যাতে প্রাথমিক অবস্থায় যে কোনো রোগ ধরা যায়।",
      ],
      whenToConsultExpert: [
        "গাছে কোনো নতুন অস্বাভাবিক হলুদ দাগ বা কুঁকড়ানো ভাব দেখা দিলে তবেই যোগাযোগ করুন।",
      ],
      safetyNote: "সুস্থ গাছে অপ্রয়োজনীয় কীটনাশক স্প্রে করবেন না, এতে উপকারী বন্ধু পোকা মারা যেতে পারে।",
      verifiedSource: "বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI)",
    },
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
          name: "Seaweed / Kelp Extract (Bio-nutrition)",
          preparation: "Dilute as per organic label",
          application: "Foliar nutrition every 14 days to boost immune vitality",
          certifications: "100% Organic",
        },
      ],
      chemicalTreatments: [],
      preventiveMeasures: [
        "Keep mulch layer intact to prevent soil pathogen splash",
        "Avoid high-nitrogen fertilizer spikes",
      ],
      culturalPractices: [
        "Regular pruning of suckers to maintain optimal airflow in crop canopy",
      ],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600&auto=format&fit=crop&q=80",
  },
];
