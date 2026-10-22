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
    crop: "Uncertain / Non-Leaf",
    banglaCrop: "অনির্ণীত / পাতা নয়",
    commonName: "Inconclusive Diagnosis (Low Confidence)",
    banglaName: "অনির্ণীত ফলাফল (কম কনফিডেন্স)",
    scientificName: "Inconclusive pathology",
    pathogenType: "None",
    severity: "Mild",
    confidence: 20.0,
    isLowConfidenceWarning: true,
    summary:
      "The neural vision model cannot reach a high-confidence diagnosis because the image does not match leaf pathology classes, is out of focus, or features a fruit/stem instead of a crop leaf.",
    banglaSummary:
      "এআই মডেল এই ছবি দেখে কোনো নির্দিষ্ট রোগ নিশ্চিত করতে পারেনি। মডেলটি শুধুমাত্র ফসলের পাতার (Leaves) রোগ নির্ণয়ের জন্য ট্রেইন করা—ফলের ছবি, অন্য কোনো অঙ্গ বা অস্পষ্ট ছবিতে মডেল কোনো অনুমান করতে পারে না।",
    symptoms: [
      "Image does not display clear crop foliar disease symptoms",
      "Subject may be a fruit, stem, or non-foliar tissue",
      "Blurry or ambiguous foliar discoloration without distinct pathogen patterns",
    ],
    banglaSymptoms: [
      "ছবিতে ফসলের পাতার স্পষ্ট কোনো রোগ লক্ষণ বোঝা যাচ্ছে না",
      "ছবিটি পাতার বদলে ফল, কাণ্ড বা অন্য কোনো অঙ্গের হতে পারে",
      "অস্পষ্ট আলো বা ফোকাস না থাকার কারণে লক্ষণ অস্পষ্ট",
    ],
    favorableConditions: ["Non-leaf specimen uploaded", "Poor illumination", "Camera out of focus"],
    banglaCauses: [
      "ছবিটি ফসলের পাতার নয় (যেমন: ফল, ফুল বা ডালের ছবি)",
      "মডেলের ২৪টি ট্রেইন্ড ক্লাসের বাইরে কোনো সমস্যা বা পুষ্টির অভাব",
      "ছবি তোলার সময় আলো কম থাকা বা ক্যামেরা কাঁপুনির কারণে ঘোলা হওয়া",
    ],
    affectedParts: ["Inconclusive"],
    banglaAffectedParts: ["অনির্ণীত / পাতা নয়"],
    banglaCropInfo: "মডেলটি পাতার জন্য নির্ধারিত। নিশ্চিত ফলাফলের জন্য আক্রান্ত পাতার ছবি প্রদান করুন।",
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

  // ═══════════════════════════════════════════════════════════════════
  // NEW ENTRIES: One per model class for dynamic, accurate detection
  // ═══════════════════════════════════════════════════════════════════

  // ── Potato: Early Blight ─────────────────────────────────────────
  {
    id: "potato-early-blight",
    crop: "Potato",
    banglaCrop: "আলু",
    commonName: "Potato Early Blight",
    banglaName: "আলুর আগাম ধসা রোগ (আর্লি ব্লাইট)",
    scientificName: "Alternaria solani",
    pathogenType: "Fungal",
    severity: "Moderate",
    confidence: 95.0,
    summary:
      "A foliar disease of potato caused by Alternaria solani. Concentric ring ('target board') lesions appear on older lower leaves, progressing upward, causing premature defoliation and reduced tuber size.",
    banglaSummary:
      "অল্টারনারিয়া সোলানি ছত্রাক দ্বারা সৃষ্ট আলুর একটি সাধারণ পাতার রোগ। গাছের নিচের দিকের পুরনো পাতায় বাদামী-কালো গোলাকৃতির দাগ (টার্গেট বোর্ড প্যাটার্ন) তৈরি হয়। আক্রান্ত পাতা শুকিয়ে ঝরে পড়ে, ফলে আলুর আকার ছোট হয়।",
    symptoms: [
      "Dark brown to black concentric ring lesions on older lower leaves",
      "Lesions expand to form characteristic 'target board' patterns",
      "Progressive yellowing and premature defoliation from bottom up",
      "Tuber yield reduction due to loss of photosynthetic leaf area",
    ],
    banglaSymptoms: [
      "পুরনো নিচের পাতায় বাদামী-কালো গোল দাগ, ভেতরে চক্রাকার বলয়",
      "দাগগুলো ক্রমশ বড় হয়ে টার্গেট বোর্ডের আকৃতি তৈরি করে",
      "আক্রান্ত পাতা হলুদ হয়ে নিচ থেকে উপরের দিকে শুকিয়ে ঝরে পড়ে",
      "সালোকসংশ্লেষণ কমে গিয়ে আলুর কন্দের আকার ছোট হয়",
    ],
    favorableConditions: [
      "Warm temperatures between 24°C–29°C with alternating wet-dry conditions",
      "Heavy dew, frequent light rain, or overhead irrigation",
      "Nutrient-stressed or aging plants",
    ],
    banglaCauses: [
      "২৪°–২৯° সেলসিয়াস তাপমাত্রা এবং পর্যায়ক্রমে ভেজা-শুকনো আবহাওয়া",
      "ভারী শিশির, হালকা বৃষ্টি বা ওপর থেকে সেচ",
      "পুষ্টির ঘাটতিজনিত দুর্বল বা বয়স্ক গাছ",
    ],
    affectedParts: ["Lower leaves", "Stems", "Tubers (occasionally)"],
    banglaAffectedParts: ["নিচের পাতা", "কাণ্ড", "কন্দ (মাঝে মাঝে)"],
    banglaCropInfo: "আলু (Solanum tuberosum) — বাংলাদেশের প্রধান কন্দ ফসল। শীতকালে ব্যাপকভাবে চাষ হয়।",
    transmissionRisk: "Moderate",
    banglaTreatment: {
      managementAdvice: [
        "আক্রান্ত নিচের পাতাগুলো সতর্কতার সাথে ছেঁটে সরিয়ে পুড়িয়ে ফেলুন।",
        "পাতায় ওপর থেকে সেচ না দিয়ে গোড়ায় বা ড্রিপ পদ্ধতিতে সেচ দিন।",
        "অনুমোদিত ম্যানকোজেব বা ক্লোরোথ্যালনিল ছত্রাকনাশক লেবেল অনুযায়ী স্প্রে করুন।",
      ],
      preventionMethods: [
        "রোগমুক্ত প্রত্যায়িত বীজ আলু ব্যবহার করুন।",
        "শস্যপর্যায় (Crop Rotation) মেনে চলুন — পর পর আলু বা টমেটো চাষ করবেন না।",
        "গাছের গোড়ায় মালচিং ব্যবহার করুন।",
      ],
      fieldCareGuidance: [
        "সকালে সেচ দিন যাতে দিনের আলোতে পাতা শুকিয়ে যায়।",
        "সুষম সার ব্যবহার করুন, অতিরিক্ত নাইট্রোজেন এড়িয়ে চলুন।",
      ],
      whenToConsultExpert: [
        "মাঠের ২০% এর বেশি গাছে রোগ ছড়িয়ে পড়লে উপজেলা কৃষি অফিসে যোগাযোগ করুন।",
      ],
      safetyNote:
        "⚠️ ছত্রাকনাশক ব্যবহারের আগে বোতলের লেবেলে অনুমোদিত মাত্রা দেখুন। স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন।",
      verifiedSource: "বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI)",
    },
    treatmentPlan: {
      immediateActions: [
        {
          title: "Remove Infected Lower Leaves",
          description: "Prune and destroy infected bottom leaves to slow upward disease progression.",
          priority: "High",
          timeframe: "Within 24 hours",
          effectiveness: "85%",
        },
      ],
      organicTreatments: [
        {
          name: "Copper Hydroxide (Bordeaux Mixture)",
          preparation: "100g copper sulfate + 100g lime in 10L water",
          application: "Preventive foliar spray every 7–10 days",
          certifications: "Traditional Organic Compliant",
        },
      ],
      chemicalTreatments: [
        {
          name: "Mancozeb 75% WP",
          activeIngredient: "Mancozeb",
          dosage: "Follow approved product label directions",
          safetyInterval: "7 days PHI",
          cautions: "Wear protective gear during application.",
        },
      ],
      preventiveMeasures: [
        "Use certified disease-free seed tubers",
        "Practice 2–3 year crop rotation away from Solanaceae",
      ],
      culturalPractices: [
        "Water in the morning to allow foliage to dry during the day",
        "Maintain balanced fertilization avoiding excess nitrogen",
      ],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
  },

  // ── Potato: Healthy ─────────────────────────────────────────────
  {
    id: "potato-healthy",
    crop: "Potato",
    banglaCrop: "আলু",
    commonName: "Healthy Potato Leaf (No Disease)",
    banglaName: "সুস্থ আলু পাতা (কোনো রোগ নেই)",
    scientificName: "Solanum tuberosum",
    pathogenType: "None",
    severity: "Healthy",
    confidence: 98.0,
    summary: "Healthy potato leaf with vibrant green color, intact epidermis, and no signs of fungal, bacterial, or viral infection.",
    banglaSummary: "আলু গাছের পাতা সম্পূর্ণ সুস্থ ও সতেজ। কোনো রোগের লক্ষণ নেই। ক্লোরোফিলের মাত্রা স্বাভাবিক।",
    symptoms: ["Uniform deep green coloration", "No lesions or spots", "Healthy leaf structure"],
    banglaSymptoms: ["সমান গাঢ় সবুজ রঙ", "কোনো দাগ বা ক্ষত নেই", "পাতার গঠন স্বাভাবিক ও সতেজ"],
    favorableConditions: ["Optimal growing conditions", "Balanced nutrition", "Proper irrigation"],
    banglaCauses: ["সুষম সার ও সঠিক সেচ ব্যবস্থাপনা"],
    affectedParts: ["None — Plant is Healthy"],
    banglaAffectedParts: ["কোনো আক্রান্ত অংশ নেই — গাছ সুস্থ"],
    banglaCropInfo: "আলু — গাছটি বর্তমানে উৎকৃষ্ট স্বাস্থ্য অবস্থায় রয়েছে।",
    transmissionRisk: "None",
    banglaTreatment: {
      managementAdvice: ["কোনো বালাইনাশক স্প্রে করার প্রয়োজন নেই।", "নিয়মিত পর্যবেক্ষণ বজায় রাখুন।"],
      preventionMethods: ["মাটির আর্দ্রতা অনুযায়ী নিয়মিত সেচ দিন।", "সুষম সার প্রয়োগ করুন।"],
      fieldCareGuidance: ["সপ্তাহে একবার নিচের পাতা পরীক্ষা করুন।"],
      whenToConsultExpert: ["নতুন অস্বাভাবিক দাগ দেখা দিলে যোগাযোগ করুন।"],
      safetyNote: "সুস্থ গাছে অপ্রয়োজনীয় কীটনাশক স্প্রে করবেন না।",
      verifiedSource: "BARI",
    },
    treatmentPlan: {
      immediateActions: [{ title: "Routine Monitoring", description: "Continue weekly inspection of lower leaves.", priority: "Low", timeframe: "Weekly", effectiveness: "99%" }],
      organicTreatments: [{ name: "Seaweed Extract", preparation: "Dilute per label", application: "Foliar nutrition every 14 days", certifications: "Organic" }],
      chemicalTreatments: [],
      preventiveMeasures: ["Maintain mulch layer", "Avoid nitrogen spikes"],
      culturalPractices: ["Hill soil regularly around stems"],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
  },

  // ── Pepper: Healthy ─────────────────────────────────────────────
  {
    id: "pepper-healthy",
    crop: "Bell Pepper",
    banglaCrop: "মরিচ",
    commonName: "Healthy Pepper Leaf (No Disease)",
    banglaName: "সুস্থ মরিচ পাতা (কোনো রোগ নেই)",
    scientificName: "Capsicum annuum",
    pathogenType: "None",
    severity: "Healthy",
    confidence: 98.0,
    summary: "Healthy bell pepper leaf with vibrant green tissue, no lesions, spots, or signs of pathogen infection.",
    banglaSummary: "মরিচ গাছের পাতা সম্পূর্ণ সুস্থ। কোনো ব্যাকটেরিয়া, ছত্রাক বা ভাইরাসের সংক্রমণ নেই।",
    symptoms: ["Vibrant green color", "Clean margins without spots", "Strong leaf structure"],
    banglaSymptoms: ["উজ্জ্বল সবুজ রঙ", "কোনো দাগ বা পোড়াভাব নেই", "পাতার গঠন মজবুত"],
    favorableConditions: ["Warm climate 25°C–30°C", "Well-drained soil", "Balanced nutrition"],
    banglaCauses: ["সুষম সার ও পরিমিত সেচ"],
    affectedParts: ["None — Plant is Healthy"],
    banglaAffectedParts: ["কোনো আক্রান্ত অংশ নেই"],
    banglaCropInfo: "মরিচ — গাছটি সুস্থ ও উৎকৃষ্ট অবস্থায় আছে।",
    transmissionRisk: "None",
    banglaTreatment: {
      managementAdvice: ["কোনো বালাইনাশক দরকার নেই।", "নিয়মিত পরিচর্যা বজায় রাখুন।"],
      preventionMethods: ["পানি জমতে দেবেন না।", "পটাশ সার ব্যবহারে গাছের রোগ প্রতিরোধ ক্ষমতা বাড়ে।"],
      fieldCareGuidance: ["পোকামাকড়ের উপস্থিতি পর্যবেক্ষণ করুন।"],
      whenToConsultExpert: ["নতুন দাগ দেখা দিলে বিশেষজ্ঞের পরামর্শ নিন।"],
      safetyNote: "সুস্থ গাছে অপ্রয়োজনীয় কীটনাশক প্রয়োগ করবেন না।",
      verifiedSource: "BARI",
    },
    treatmentPlan: {
      immediateActions: [{ title: "Continue Monitoring", description: "Inspect leaves weekly for early detection.", priority: "Low", timeframe: "Weekly", effectiveness: "99%" }],
      organicTreatments: [{ name: "Compost Tea", preparation: "Standard compost tea recipe", application: "Soil drench monthly", certifications: "Organic" }],
      chemicalTreatments: [],
      preventiveMeasures: ["Rotate crops every 2 years", "Remove weeds around plants"],
      culturalPractices: ["Ensure proper spacing for airflow"],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80",
  },

  // ── Rice: Bacterial Leaf Blight ─────────────────────────────────
  {
    id: "rice-bacterial-leaf-blight",
    crop: "Rice",
    banglaCrop: "ধান",
    commonName: "Bacterial Leaf Blight (BLB)",
    banglaName: "ধানের পাতা পোড়া রোগ (ব্যাকটেরিয়াল লিফ ব্লাইট)",
    scientificName: "Xanthomonas oryzae pv. oryzae",
    pathogenType: "Bacterial",
    severity: "Severe",
    confidence: 95.0,
    summary:
      "One of the most destructive bacterial diseases of rice. Yellowish-white to gray lesions start from leaf tips or margins and advance along the veins, turning entire leaves straw-colored. Causes significant yield loss in flooded paddy fields.",
    banglaSummary:
      "ধানের সবচেয়ে ক্ষতিকর ব্যাকটেরিয়াজনিত রোগ। পাতার ডগা বা কিনারা থেকে হলুদাভ-সাদা দাগ শুরু হয়ে শিরা বরাবর ছড়িয়ে পড়ে এবং পুরো পাতা শুকনো খড়ের রঙ ধারণ করে। ব্যাপক ফলন হ্রাস ঘটায়।",
    symptoms: [
      "Yellowish-white to grayish lesions starting from leaf tips or margins",
      "Lesions advance along veins, turning leaves straw-colored",
      "Bacterial ooze (milky droplets) visible on leaf surface in humid mornings",
      "Kresek phase: wilting and drying of entire seedlings in severe cases",
    ],
    banglaSymptoms: [
      "পাতার ডগা বা কিনারা থেকে হলুদাভ-সাদা দাগ শুরু হয়",
      "দাগ শিরা বরাবর বড় হয়ে পুরো পাতা শুকনো খড়ের মতো হয়ে যায়",
      "ভোরের আর্দ্র আবহাওয়ায় পাতায় দুধের মতো ব্যাকটেরিয়া ক্ষরণ দেখা যায়",
      "চারা অবস্থায় পুরো গাছ হঠাৎ ঢলে পড়ে শুকিয়ে মারা যায় (ক্রিসেক ফেজ)",
    ],
    favorableConditions: [
      "High temperature (25°C–34°C) with continuous rainfall",
      "Flooded paddy fields with wind-driven rain",
      "Excessive nitrogen fertilizer application",
    ],
    banglaCauses: [
      "উচ্চ তাপমাত্রা (২৫°–৩৪° সে.) এবং টানা বৃষ্টিপাত",
      "বন্যা পানি বা বাতাসের সাথে ব্যাকটেরিয়া ছড়ায়",
      "অতিরিক্ত ইউরিয়া সার প্রয়োগ",
    ],
    affectedParts: ["Leaves", "Leaf sheaths", "Entire seedlings (Kresek)"],
    banglaAffectedParts: ["পাতা", "পাতার খোল", "সম্পূর্ণ চারা (ক্রিসেক)"],
    banglaCropInfo: "ধান (Oryza sativa) — বাংলাদেশের প্রধান খাদ্য ফসল।",
    transmissionRisk: "High",
    banglaTreatment: {
      managementAdvice: [
        "ইউরিয়া সার প্রয়োগ অবিলম্বে বন্ধ করুন।",
        "জমিতে দাঁড়ানো পানি কমিয়ে দিন।",
        "আক্রান্ত গাছ সরিয়ে ফেলুন এবং জমির নিষ্কাশন নিশ্চিত করুন।",
      ],
      preventionMethods: [
        "রোগ প্রতিরোধী জাত (BRRI dhan52, BRRI dhan71 ইত্যাদি) চাষ করুন।",
        "সুষম সার ব্যবহার করুন, অতিরিক্ত নাইট্রোজেন এড়িয়ে চলুন।",
        "রোগমুক্ত বীজতলা থেকে চারা সংগ্রহ করুন।",
      ],
      fieldCareGuidance: [
        "ঝড় বা শিলাবৃষ্টির পর পাতায় ক্ষত হলে ব্যাকটেরিয়া প্রবেশ করে — তখন সতর্ক থাকুন।",
      ],
      whenToConsultExpert: [
        "চারা অবস্থায় ক্রিসেক দেখা দিলে জরুরি ভিত্তিতে কৃষি কর্মকর্তার পরামর্শ নিন।",
      ],
      safetyNote:
        "⚠️ ব্যাকটেরিয়াজনিত রোগে ছত্রাকনাশক কাজ করে না। সঠিক ব্যাকটেরিয়ানাশক ব্যবহারে কৃষি কর্মকর্তার পরামর্শ নিন।",
      verifiedSource: "বাংলাদেশ ধান গবেষণা ইনস্টিটিউট (BRRI)",
    },
    treatmentPlan: {
      immediateActions: [
        { title: "Stop Nitrogen Application", description: "Halt urea fertilization immediately to reduce bacterial multiplication.", priority: "High", timeframe: "Immediate", effectiveness: "90%" },
        { title: "Drain Excess Water", description: "Reduce standing water level in the paddy field.", priority: "High", timeframe: "Within 24 hours", effectiveness: "85%" },
      ],
      organicTreatments: [
        { name: "Copper-based Bactericide", preparation: "As per approved agricultural label", application: "Foliar spray at early symptom appearance", certifications: "Standard Agricultural" },
      ],
      chemicalTreatments: [
        { name: "Streptomycin Sulfate + Tetracycline", activeIngredient: "Antibiotics", dosage: "Follow registered label directions only", safetyInterval: "As per label", cautions: "Use only when recommended by extension officer." },
      ],
      preventiveMeasures: ["Plant BLB-resistant rice varieties", "Avoid excess nitrogen fertilization"],
      culturalPractices: ["Maintain proper field drainage", "Remove crop residues after harvest"],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80",
  },

  // ── Rice: Brown Spot ────────────────────────────────────────────
  {
    id: "rice-brown-spot",
    crop: "Rice",
    banglaCrop: "ধান",
    commonName: "Rice Brown Spot",
    banglaName: "ধানের বাদামী দাগ রোগ (ব্রাউন স্পট)",
    scientificName: "Bipolaris oryzae (Cochliobolus miyabeanus)",
    pathogenType: "Fungal",
    severity: "Moderate",
    confidence: 93.0,
    summary:
      "A fungal disease producing oval to circular dark brown spots on leaves, sheaths, and grain hulls. Associated with nutrient-deficient soils and causes grain discoloration and yield loss.",
    banglaSummary:
      "বাইপোলারিস অরাইজি ছত্রাক দ্বারা সৃষ্ট। পাতায় ডিম্বাকার বা গোলাকৃতির বাদামী দাগ তৈরি হয়। পুষ্টি ঘাটতিযুক্ত মাটিতে বেশি হয়। দানার রঙ পরিবর্তন ও ফলন কমায়।",
    symptoms: [
      "Oval to circular dark brown spots with gray or whitish centers on leaves",
      "Spots may have yellowish halos around them",
      "Brown discoloration on grain hulls",
      "Seedlings may show brown spots on coleoptile",
    ],
    banglaSymptoms: [
      "পাতায় ডিম্বাকার বা গোলাকার গাঢ় বাদামী দাগ, কেন্দ্র ধূসর বা সাদাটে",
      "দাগের চারপাশে হালকা হলুদ বলয়",
      "ধানের খোসায় বাদামী দাগ ও বিবর্ণতা",
      "চারা গাছেও কোলিওপটাইলে বাদামী দাগ দেখা যেতে পারে",
    ],
    favorableConditions: [
      "Nutrient-deficient soils (especially potassium and silicon deficiency)",
      "Temperature 25°C–30°C with high humidity",
      "Water stress or irregular irrigation",
    ],
    banglaCauses: [
      "পটাশিয়াম ও সিলিকনের ঘাটতিযুক্ত মাটি",
      "২৫°–৩০° সে. তাপমাত্রা ও উচ্চ আর্দ্রতা",
      "অনিয়মিত সেচ বা পানির অভাব",
    ],
    affectedParts: ["Leaves", "Leaf sheaths", "Grain hulls", "Seedlings"],
    banglaAffectedParts: ["পাতা", "পাতার খোল", "ধানের খোসা", "চারা"],
    banglaCropInfo: "ধান — পুষ্টিহীন জমিতে এই রোগ বেশি দেখা যায়।",
    transmissionRisk: "Moderate",
    banglaTreatment: {
      managementAdvice: [
        "মাটি পরীক্ষা করিয়ে পটাশ ও জিংক সারের ঘাটতি পূরণ করুন।",
        "অনুমোদিত ছত্রাকনাশক লেবেল অনুযায়ী স্প্রে করুন।",
      ],
      preventionMethods: [
        "সুষম সার (বিশেষ করে পটাশ ও জিংক) ব্যবহার করুন।",
        "রোগমুক্ত ও শোধিত বীজ ব্যবহার করুন।",
        "জমিতে পর্যাপ্ত পানি ধরে রাখুন।",
      ],
      fieldCareGuidance: ["মাটির পুষ্টি উপাদান পরীক্ষা করিয়ে নিন।"],
      whenToConsultExpert: ["ব্যাপকভাবে দানায় দাগ দেখা দিলে কৃষি কর্মকর্তার পরামর্শ নিন।"],
      safetyNote: "⚠️ ছত্রাকনাশকের সঠিক মাত্রা লেবেল থেকে দেখে নিন।",
      verifiedSource: "বাংলাদেশ ধান গবেষণা ইনস্টিটিউট (BRRI)",
    },
    treatmentPlan: {
      immediateActions: [
        { title: "Correct Nutrient Deficiency", description: "Apply potassium and zinc fertilizers to address the underlying soil deficiency.", priority: "High", timeframe: "Within 48 hours", effectiveness: "88%" },
      ],
      organicTreatments: [
        { name: "Trichoderma Seed Treatment", preparation: "As per bio-agent label", application: "Seed treatment before sowing", certifications: "Certified Bio-Input" },
      ],
      chemicalTreatments: [
        { name: "Propiconazole 25% EC", activeIngredient: "Propiconazole", dosage: "Follow registered label", safetyInterval: "21 days PHI", cautions: "Use protective gear." },
      ],
      preventiveMeasures: ["Apply balanced NPK with adequate potassium", "Seed treatment before sowing"],
      culturalPractices: ["Maintain consistent water levels in paddy"],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80",
  },

  // ── Rice: Healthy ───────────────────────────────────────────────
  {
    id: "rice-healthy",
    crop: "Rice",
    banglaCrop: "ধান",
    commonName: "Healthy Rice Leaf (No Disease)",
    banglaName: "সুস্থ ধান পাতা (কোনো রোগ নেই)",
    scientificName: "Oryza sativa",
    pathogenType: "None",
    severity: "Healthy",
    confidence: 98.0,
    summary: "Healthy rice leaf with uniform green coloration and no visible signs of disease, pest damage, or nutrient deficiency.",
    banglaSummary: "ধান গাছের পাতা সম্পূর্ণ সুস্থ ও সতেজ সবুজ। কোনো রোগ, পোকার আক্রমণ বা পুষ্টির ঘাটতির লক্ষণ নেই।",
    symptoms: ["Uniform deep green color", "No spots or lesions", "Healthy leaf blade structure"],
    banglaSymptoms: ["সমান গাঢ় সবুজ রঙ", "কোনো দাগ বা ক্ষত নেই", "পাতার গঠন সতেজ"],
    favorableConditions: ["Adequate standing water", "Balanced fertilization", "Proper spacing"],
    banglaCauses: ["সুষম সার ও পর্যাপ্ত পানি ব্যবস্থাপনা"],
    affectedParts: ["None — Plant is Healthy"],
    banglaAffectedParts: ["কোনো আক্রান্ত অংশ নেই"],
    banglaCropInfo: "ধান — গাছ সুস্থ অবস্থায় রয়েছে।",
    transmissionRisk: "None",
    banglaTreatment: {
      managementAdvice: ["কোনো ওষুধ প্রয়োজন নেই।", "নিয়মিত পর্যবেক্ষণ করুন।"],
      preventionMethods: ["সুষম সার ও পর্যাপ্ত সেচ বজায় রাখুন।"],
      fieldCareGuidance: ["জমির আগাছা পরিষ্কার রাখুন।"],
      whenToConsultExpert: ["নতুন অস্বাভাবিক দাগ দেখা দিলে যোগাযোগ করুন।"],
      safetyNote: "সুস্থ ধান গাছে অপ্রয়োজনীয় কীটনাশক স্প্রে করবেন না।",
      verifiedSource: "BRRI",
    },
    treatmentPlan: {
      immediateActions: [{ title: "Continue Monitoring", description: "Inspect paddy weekly.", priority: "Low", timeframe: "Weekly", effectiveness: "99%" }],
      organicTreatments: [],
      chemicalTreatments: [],
      preventiveMeasures: ["Maintain standing water depth", "Balanced potash application"],
      culturalPractices: ["Proper spacing between hills"],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80",
  },

  // ── Rice: Hispa ─────────────────────────────────────────────────
  {
    id: "rice-hispa",
    crop: "Rice",
    banglaCrop: "ধান",
    commonName: "Rice Hispa (Leaf Mining Beetle)",
    banglaName: "ধানের হিস্পা পোকা (পাতা সুড়ঙ্গকারী পোকা)",
    scientificName: "Dicladispa armigera",
    pathogenType: "Pest Infestation",
    severity: "Moderate",
    confidence: 92.0,
    summary:
      "Rice hispa beetle larvae mine tunnels inside leaf tissue creating white streaks, while adults scrape the upper leaf surface leaving parallel white streaks. Heavy infestations cause leaves to turn whitish and dry up.",
    banglaSummary:
      "হিস্পা পোকার শূককীট পাতার ভেতরে সুড়ঙ্গ তৈরি করে এবং পূর্ণাঙ্গ পোকা পাতার উপরের দিকে চেঁছে খায়। তীব্র আক্রমণে পাতা সাদা হয়ে শুকিয়ে যায়।",
    symptoms: [
      "White parallel streaks on upper leaf surface (adult feeding marks)",
      "Blister-like mining tunnels within leaf blade (larval damage)",
      "Leaves turn whitish and dry up in severe infestations",
      "Small, spiny metallic-blue or black beetles visible on leaves",
    ],
    banglaSymptoms: [
      "পাতার উপরিভাগে সমান্তরাল সাদা দাগ (পূর্ণাঙ্গ পোকার খাওয়ার চিহ্ন)",
      "পাতার ভেতরে ফোস্কার মতো সুড়ঙ্গ (শূককীটের ক্ষতি)",
      "তীব্র আক্রমণে পাতা সম্পূর্ণ সাদা হয়ে শুকিয়ে যায়",
      "পাতায় ছোট, কাঁটাযুক্ত নীলচে-কালো পোকা দেখা যায়",
    ],
    favorableConditions: [
      "Humid, rainy conditions with dense canopy",
      "Excessive nitrogen fertilization promoting lush growth",
      "Shaded or waterlogged field edges",
    ],
    banglaCauses: [
      "ঘন গাছের মধ্যে আর্দ্র ও বৃষ্টিযুক্ত আবহাওয়া",
      "অতিরিক্ত ইউরিয়া সারে নরম সবুজ পাতা বেশি হওয়া",
      "জমির ছায়াযুক্ত কিনারায় বেশি দেখা যায়",
    ],
    affectedParts: ["Leaves (primarily)"],
    banglaAffectedParts: ["পাতা (প্রধানত)"],
    banglaCropInfo: "ধান — হিস্পা পোকা আমন মৌসুমে বেশি দেখা যায়।",
    transmissionRisk: "Moderate",
    banglaTreatment: {
      managementAdvice: [
        "আক্রান্ত পাতার ডগা কেটে পোকাসহ ধ্বংস করুন।",
        "জমিতে আলোর ফাঁদ ব্যবহার করে পূর্ণাঙ্গ পোকা ধরুন।",
        "তীব্র আক্রমণে অনুমোদিত কীটনাশক স্প্রে করুন।",
      ],
      preventionMethods: [
        "অতিরিক্ত ইউরিয়া সার ব্যবহার কমান।",
        "জমির আগাছা ও ছায়া পরিষ্কার রাখুন।",
        "পাখি ও প্রাকৃতিক শত্রু পোকাকে সংরক্ষণ করুন।",
      ],
      fieldCareGuidance: ["জমির কিনারার গাছগুলোতে বিশেষ নজর রাখুন।"],
      whenToConsultExpert: ["জমির ২০% এর বেশি গাছে আক্রমণ দেখা দিলে কৃষি কর্মকর্তার পরামর্শ নিন।"],
      safetyNote: "⚠️ কীটনাশক ব্যবহারের আগে কৃষি কর্মকর্তার পরামর্শ ও লেবেলের নির্দেশনা মানুন।",
      verifiedSource: "বাংলাদেশ ধান গবেষণা ইনস্টিটিউট (BRRI)",
    },
    treatmentPlan: {
      immediateActions: [
        { title: "Clip Infested Leaf Tips", description: "Cut the top 2–3 cm of infested leaves to destroy larvae inside the mines.", priority: "High", timeframe: "Immediate", effectiveness: "80%" },
      ],
      organicTreatments: [
        { name: "Neem Oil Spray", preparation: "5ml neem oil per liter of water + soap emulsifier", application: "Spray on infested leaves every 5–7 days", certifications: "Bio-based" },
      ],
      chemicalTreatments: [
        { name: "Chlorpyrifos 20% EC", activeIngredient: "Chlorpyrifos", dosage: "Follow registered label", safetyInterval: "14 days", cautions: "Toxic to aquatic organisms. Use with care near water." },
      ],
      preventiveMeasures: ["Reduce excessive nitrogen", "Conserve natural predators"],
      culturalPractices: ["Use light traps to capture adult beetles", "Clear shaded field margins"],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80",
  },

  // ── Rice: Leaf Scald ────────────────────────────────────────────
  {
    id: "rice-leaf-scald",
    crop: "Rice",
    banglaCrop: "ধান",
    commonName: "Rice Leaf Scald",
    banglaName: "ধানের পাতা ঝলসানো রোগ (লিফ স্কল্ড)",
    scientificName: "Microdochium oryzae",
    pathogenType: "Fungal",
    severity: "Moderate",
    confidence: 90.0,
    summary:
      "A fungal disease causing alternating light and dark brown zones (banding patterns) on leaf tips and margins. Lesions can coalesce and cause leaves to dry and curl.",
    banglaSummary:
      "মাইক্রোডোকিয়াম অরাইজি ছত্রাক দ্বারা সৃষ্ট। পাতার ডগা ও কিনারায় হালকা ও গাঢ় বাদামী পর্যায়ক্রমিক ব্যান্ড তৈরি হয়। পাতা শুকিয়ে কুঁকড়ে যায়।",
    symptoms: [
      "Alternating light tan and dark brown banding on leaf tips",
      "Lesions start from tips and advance downward along margins",
      "Leaves may curl and dry up",
      "Oblong brown spots on upper leaves",
    ],
    banglaSymptoms: [
      "পাতার ডগায় হালকা ও গাঢ় বাদামী রঙের পর্যায়ক্রমিক ব্যান্ড",
      "ক্ষত ডগা থেকে কিনারা বরাবর নিচের দিকে ছড়ায়",
      "পাতা কুঁকড়ে শুকিয়ে যায়",
      "উপরের পাতায় লম্বাটে বাদামী দাগ",
    ],
    favorableConditions: ["High humidity and warm temperatures", "Overcast conditions with drizzle", "Dense planting"],
    banglaCauses: ["উচ্চ আর্দ্রতা ও উষ্ণ তাপমাত্রা", "মেঘলা আকাশ ও গুঁড়ি গুঁড়ি বৃষ্টি", "ঘন রোপণ"],
    affectedParts: ["Leaf tips", "Leaf margins", "Upper leaves"],
    banglaAffectedParts: ["পাতার ডগা", "পাতার কিনারা", "উপরের পাতা"],
    banglaCropInfo: "ধান — আমন ও বোরো উভয় মৌসুমে দেখা যেতে পারে।",
    transmissionRisk: "Moderate",
    banglaTreatment: {
      managementAdvice: ["আক্রান্ত পাতা সরিয়ে ধ্বংস করুন।", "অনুমোদিত ছত্রাকনাশক স্প্রে করুন।"],
      preventionMethods: ["ঘন রোপণ পরিহার করুন।", "সুষম সার ব্যবহার করুন।", "রোগমুক্ত বীজ ব্যবহার করুন।"],
      fieldCareGuidance: ["বাতাস চলাচল নিশ্চিত করতে সঠিক দূরত্বে রোপণ করুন।"],
      whenToConsultExpert: ["পাতায় দ্রুত ক্ষত ছড়িয়ে পড়লে পরামর্শ নিন।"],
      safetyNote: "⚠️ লেবেল নির্দেশনা অনুযায়ী ছত্রাকনাশক ব্যবহার করুন।",
      verifiedSource: "BRRI",
    },
    treatmentPlan: {
      immediateActions: [
        { title: "Remove Affected Leaves", description: "Remove and destroy severely affected leaves.", priority: "Medium", timeframe: "Within 48 hours", effectiveness: "75%" },
      ],
      organicTreatments: [
        { name: "Trichoderma viride", preparation: "As per bio-agent label", application: "Soil and foliar application", certifications: "Certified Bio-Input" },
      ],
      chemicalTreatments: [
        { name: "Carbendazim 50% WP", activeIngredient: "Carbendazim", dosage: "Follow label", safetyInterval: "14 days", cautions: "Standard precautions." },
      ],
      preventiveMeasures: ["Avoid dense planting", "Use treated seeds"],
      culturalPractices: ["Ensure proper plant spacing"],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80",
  },

  // ── Rice: Narrow Brown Spot ─────────────────────────────────────
  {
    id: "rice-narrow-brown-spot",
    crop: "Rice",
    banglaCrop: "ধান",
    commonName: "Rice Narrow Brown Spot",
    banglaName: "ধানের সরু বাদামী দাগ রোগ (ন্যারো ব্রাউন স্পট)",
    scientificName: "Cercospora janseana",
    pathogenType: "Fungal",
    severity: "Mild",
    confidence: 88.0,
    summary:
      "A minor fungal disease producing narrow, linear, dark brown lesions on leaf blades. Usually causes limited damage unless conditions are highly favorable.",
    banglaSummary:
      "সারকোস্পোরা ছত্রাক দ্বারা সৃষ্ট। পাতায় সরু, লম্বাটে, গাঢ় বাদামী দাগ তৈরি হয়। সাধারণত কম ক্ষতিকর তবে অনুকূল পরিবেশে বাড়তে পারে।",
    symptoms: [
      "Narrow, linear, dark brown streaks on leaves parallel to veins",
      "Lesions are typically 2–10 mm long and 1–1.5 mm wide",
      "Minor leaf drying in severe cases",
    ],
    banglaSymptoms: [
      "পাতায় শিরা বরাবর সরু, লম্বাটে, গাঢ় বাদামী দাগ",
      "দাগগুলো সাধারণত ২–১০ মিমি লম্বা ও ১–১.৫ মিমি চওড়া",
      "তীব্র আক্রমণে পাতা কিছুটা শুকিয়ে যেতে পারে",
    ],
    favorableConditions: ["Humid conditions with moderate temperatures", "Nutrient deficiency in soil"],
    banglaCauses: ["আর্দ্র আবহাওয়া ও পরিমিত তাপমাত্রা", "মাটিতে পুষ্টি ঘাটতি"],
    affectedParts: ["Leaf blades", "Leaf sheaths"],
    banglaAffectedParts: ["পাতা", "পাতার খোল"],
    banglaCropInfo: "ধান — এই রোগ সাধারণত গুরুতর নয় তবে পুষ্টিহীন জমিতে বাড়তে পারে।",
    transmissionRisk: "Low",
    banglaTreatment: {
      managementAdvice: ["সুষম সার প্রয়োগ করলে রোগ কমে যায়।", "সাধারণত আলাদা ওষুধের দরকার হয় না।"],
      preventionMethods: ["মাটি পরীক্ষা করিয়ে পুষ্টি ঘাটতি পূরণ করুন।"],
      fieldCareGuidance: ["জমিতে পর্যাপ্ত পানি ধরে রাখুন।"],
      whenToConsultExpert: ["অন্যান্য রোগের সাথে মিশ্র সংক্রমণ হলে পরামর্শ নিন।"],
      safetyNote: "⚠️ সাধারণত রাসায়নিক ছত্রাকনাশক প্রয়োজন হয় না।",
      verifiedSource: "BRRI",
    },
    treatmentPlan: {
      immediateActions: [
        { title: "Apply Balanced Fertilizer", description: "Address underlying nutrient deficiency with potassium and micronutrients.", priority: "Medium", timeframe: "Within 48 hours", effectiveness: "80%" },
      ],
      organicTreatments: [],
      chemicalTreatments: [],
      preventiveMeasures: ["Correct soil nutrient deficiencies", "Use balanced NPK fertilization"],
      culturalPractices: ["Maintain adequate field water level"],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80",
  },

  // ── Rice: Sheath Blight ─────────────────────────────────────────
  {
    id: "rice-sheath-blight",
    crop: "Rice",
    banglaCrop: "ধান",
    commonName: "Rice Sheath Blight",
    banglaName: "ধানের খোলপচা রোগ (শিথ ব্লাইট)",
    scientificName: "Rhizoctonia solani",
    pathogenType: "Fungal",
    severity: "Severe",
    confidence: 94.0,
    summary:
      "A major fungal disease of rice caused by Rhizoctonia solani. Irregular greenish-gray water-soaked lesions appear on leaf sheaths near the water line, spreading upward and causing lodging in severe cases.",
    banglaSummary:
      "রাইজোকটোনিয়া সোলানি ছত্রাক দ্বারা সৃষ্ট ধানের একটি প্রধান রোগ। পানির সীমানার কাছে পাতার খোলে সবুজাভ-ধূসর অনিয়মিত জলছাপের দাগ তৈরি হয়, ওপরের দিকে ছড়ায় এবং গাছ ঢলে পড়ে।",
    symptoms: [
      "Irregular oval or elongated greenish-gray lesions on leaf sheaths",
      "Lesions start near water line and progress upward",
      "White mycelial growth visible on lesion surface in humid conditions",
      "Plant lodging due to weakened stems in severe infections",
    ],
    banglaSymptoms: [
      "পাতার খোলে অনিয়মিত ডিম্বাকার সবুজাভ-ধূসর দাগ",
      "দাগ পানির সীমানা থেকে শুরু হয়ে ওপরে ছড়ায়",
      "আর্দ্র আবহাওয়ায় দাগের উপরিভাগে সাদা ছত্রাকের জাল দেখা যায়",
      "তীব্র আক্রমণে কাণ্ড দুর্বল হয়ে গাছ ঢলে পড়ে",
    ],
    favorableConditions: [
      "High temperature (28°C–32°C) with high humidity",
      "Dense planting with excessive tillering",
      "High nitrogen fertilization",
    ],
    banglaCauses: [
      "উচ্চ তাপমাত্রা (২৮°–৩২° সে.) ও আর্দ্রতা",
      "ঘন রোপণ ও অতিরিক্ত কুশি",
      "বেশি ইউরিয়া সার প্রয়োগ",
    ],
    affectedParts: ["Leaf sheaths", "Stems", "Panicles", "Leaves"],
    banglaAffectedParts: ["পাতার খোল", "কাণ্ড", "শীষ", "পাতা"],
    banglaCropInfo: "ধান — বোরো মৌসুমে এই রোগ বেশি দেখা যায়।",
    transmissionRisk: "High",
    banglaTreatment: {
      managementAdvice: [
        "ইউরিয়া সার কমিয়ে পটাশ সার বাড়ান।",
        "জমিতে পানির স্তর কমিয়ে দিন।",
        "অনুমোদিত ছত্রাকনাশক (যেমন ভ্যালিডামাইসিন বা হেক্সাকোনাজল) স্প্রে করুন।",
      ],
      preventionMethods: [
        "ঘন রোপণ পরিহার করুন, সঠিক দূরত্বে রোপণ করুন।",
        "অতিরিক্ত ইউরিয়া সার এড়িয়ে চলুন।",
        "ফসল কাটার পর জমির আবর্জনা পরিষ্কার করুন।",
      ],
      fieldCareGuidance: ["দুপুরে পানি শুকিয়ে যেতে দিন, পরে আবার দিন (AWD পদ্ধতি)।"],
      whenToConsultExpert: ["গাছ ঢলে পড়ার আশঙ্কা দেখা দিলে জরুরি ভিত্তিতে পরামর্শ নিন।"],
      safetyNote: "⚠️ ছত্রাকনাশকের লেবেলে নির্দেশিত মাত্রা মেনে চলুন।",
      verifiedSource: "BRRI ও কৃষি সম্প্রসারণ অধিদপ্তর (DAE)",
    },
    treatmentPlan: {
      immediateActions: [
        { title: "Reduce Nitrogen & Water", description: "Cut nitrogen application and lower water level to slow fungal spread.", priority: "High", timeframe: "Immediate", effectiveness: "85%" },
      ],
      organicTreatments: [
        { name: "Trichoderma harzianum", preparation: "As per bio-agent label", application: "Soil application at tillering stage", certifications: "Certified Bio-Input" },
      ],
      chemicalTreatments: [
        { name: "Validamycin 3% SL", activeIngredient: "Validamycin", dosage: "Follow registered label", safetyInterval: "14 days", cautions: "Spray on lower plant parts." },
      ],
      preventiveMeasures: ["Proper plant spacing", "Balanced nitrogen application"],
      culturalPractices: ["Alternate wetting and drying (AWD) irrigation"],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80",
  },

  // ── Rice: Tungro ────────────────────────────────────────────────
  {
    id: "rice-tungro",
    crop: "Rice",
    banglaCrop: "ধান",
    commonName: "Rice Tungro Disease",
    banglaName: "ধানের টুংরো রোগ (ভাইরাসজনিত)",
    scientificName: "Rice Tungro Bacilliform Virus (RTBV) + Rice Tungro Spherical Virus (RTSV)",
    pathogenType: "Viral",
    severity: "Severe",
    confidence: 91.0,
    summary:
      "A devastating viral disease transmitted by green leafhoppers (Nephotettix virescens). Infected plants show stunted growth, yellow-orange discoloration of leaves, and drastically reduced or no grain filling.",
    banglaSummary:
      "সবুজ পাতাফড়িং (Green Leafhopper) দ্বারা ছড়ানো ধানের ভয়াবহ ভাইরাস রোগ। আক্রান্ত গাছ বামন হয়, পাতা হলুদ-কমলা হয়ে যায় এবং শীষ বের হলেও দানা চিটা হয়।",
    symptoms: [
      "Stunted plant growth with reduced tillering",
      "Yellow to orange discoloration of leaves, starting from lower leaves",
      "Leaves may become mottled or show interveinal chlorosis",
      "Delayed heading and sterile or partially filled panicles",
    ],
    banglaSymptoms: [
      "গাছের বৃদ্ধি মারাত্মকভাবে কমে যায় (বামন হয়)",
      "পাতা হলুদ থেকে কমলা রঙ ধারণ করে, নিচ থেকে শুরু হয়",
      "পাতায় ছোপ ছোপ দাগ বা শিরার মধ্যবর্তী স্থানে হলুদভাব",
      "শীষ বের হতে দেরি হয় এবং দানা চিটা বা আংশিক পূর্ণ হয়",
    ],
    favorableConditions: [
      "Presence of green leafhopper (Nephotettix virescens) vector",
      "Late transplanting during peak leafhopper population",
      "Tungro-infected rice stubble or ratoon crops nearby",
    ],
    banglaCauses: [
      "সবুজ পাতাফড়িং পোকার উপস্থিতি (ভাইরাসের বাহক)",
      "দেরিতে রোপণ করলে পাতাফড়িংয়ের সংখ্যা বেশি থাকে",
      "আশেপাশের জমিতে আক্রান্ত ফসলের অবশিষ্টাংশ",
    ],
    affectedParts: ["Entire plant", "Leaves", "Panicles"],
    banglaAffectedParts: ["সম্পূর্ণ গাছ", "পাতা", "শীষ"],
    banglaCropInfo: "ধান — টুংরো বাংলাদেশের ধান চাষের অন্যতম মারাত্মক ভাইরাস রোগ।",
    transmissionRisk: "High",
    banglaTreatment: {
      managementAdvice: [
        "আক্রান্ত গাছ উপড়ে ফেলে ধ্বংস করুন।",
        "সবুজ পাতাফড়িং নিয়ন্ত্রণে অনুমোদিত কীটনাশক স্প্রে করুন।",
        "আশেপাশের আক্রান্ত গাছ ও রেটুন ফসল সরিয়ে ফেলুন।",
      ],
      preventionMethods: [
        "টুংরো প্রতিরোধী ধানের জাত (যেমন BRRI উদ্ভাবিত) চাষ করুন।",
        "সময়মতো আগাম রোপণ করুন।",
        "পাতাফড়িং নিয়ন্ত্রণে আলোর ফাঁদ ব্যবহার করুন।",
      ],
      fieldCareGuidance: ["সন্ধ্যায় আলোর ফাঁদ ব্যবহার করে পাতাফড়িংয়ের উপস্থিতি পর্যবেক্ষণ করুন।"],
      whenToConsultExpert: ["জমিতে হলুদ-কমলা গাছ দেখামাত্র অবিলম্বে কৃষি কর্মকর্তার পরামর্শ নিন।"],
      safetyNote: "⚠️ ভাইরাস রোগে ছত্রাকনাশক বা কীটনাশক সরাসরি ভাইরাস মারতে পারে না — বাহক পোকা নিয়ন্ত্রণই প্রধান উপায়।",
      verifiedSource: "BRRI ও কৃষি সম্প্রসারণ অধিদপ্তর (DAE)",
    },
    treatmentPlan: {
      immediateActions: [
        { title: "Remove Infected Plants", description: "Uproot and destroy tungro-infected plants immediately to reduce virus reservoir.", priority: "High", timeframe: "Immediate", effectiveness: "70%" },
        { title: "Control Leafhopper Vector", description: "Apply approved insecticide to control green leafhopper populations.", priority: "High", timeframe: "Within 24 hours", effectiveness: "85%" },
      ],
      organicTreatments: [
        { name: "Neem Seed Kernel Extract", preparation: "5% NSKE solution", application: "Spray to deter leafhopper feeding", certifications: "Bio-based" },
      ],
      chemicalTreatments: [
        { name: "Imidacloprid 17.8% SL", activeIngredient: "Imidacloprid", dosage: "Follow registered label", safetyInterval: "14 days", cautions: "Toxic to bees. Avoid during flowering." },
      ],
      preventiveMeasures: ["Plant tungro-resistant varieties", "Timely transplanting to avoid peak leafhopper"],
      culturalPractices: ["Synchronize planting in the area", "Remove ratoon crops and volunteer rice"],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80",
  },

  // ── Tomato: Bacterial Spot ──────────────────────────────────────
  {
    id: "tomato-bacterial-spot",
    crop: "Tomato",
    banglaCrop: "টমেটো",
    commonName: "Tomato Bacterial Spot",
    banglaName: "টমেটোর ব্যাকটেরিয়াল দাগ রোগ",
    scientificName: "Xanthomonas vesicatoria",
    pathogenType: "Bacterial",
    severity: "Moderate",
    confidence: 94.0,
    summary:
      "A bacterial disease causing small, dark, water-soaked spots on leaves and fruit. Severe infections cause extensive defoliation and scabby fruit lesions.",
    banglaSummary:
      "জ্যান্থোমোনাস ব্যাকটেরিয়া দ্বারা সৃষ্ট। পাতায় ছোট, গাঢ়, জলছাপযুক্ত দাগ এবং ফলে খসখসে দাগ তৈরি হয়। তীব্র আক্রমণে পাতা ঝরে পড়ে।",
    symptoms: [
      "Small (1–3mm) dark, water-soaked spots on lower leaf surfaces",
      "Spots turn brown-black with raised, scabby texture",
      "Severe leaf yellowing and defoliation",
      "Raised, wart-like scabs on fruit surface",
    ],
    banglaSymptoms: [
      "পাতার নিচে ১–৩ মিমি আকারের গাঢ় জলছাপযুক্ত দাগ",
      "দাগ বাদামী-কালো হয়ে খসখসে ও সামান্য উঁচু হয়",
      "পাতা হলুদ হয়ে ব্যাপকভাবে ঝরে পড়ে",
      "ফলের গায়ে উঁচু, আঁচিলের মতো খসখসে দাগ",
    ],
    favorableConditions: ["Warm temperatures 25°C–30°C with heavy rain", "Wind-driven rain spreading bacteria", "Working in wet fields"],
    banglaCauses: ["২৫°–৩০° সে. তাপমাত্রা ও ভারী বৃষ্টি", "বাতাসের সাথে বৃষ্টির ছিটায় ব্যাকটেরিয়া ছড়ায়", "ভেজা অবস্থায় জমিতে কাজ করা"],
    affectedParts: ["Leaves", "Stems", "Fruit"],
    banglaAffectedParts: ["পাতা", "ডগা", "ফল"],
    banglaCropInfo: "টমেটো — বাংলাদেশের প্রধান শীতকালীন সবজি ফসল।",
    transmissionRisk: "High",
    banglaTreatment: {
      managementAdvice: [
        "আক্রান্ত পাতা ও ডাল সরিয়ে ধ্বংস করুন।",
        "ভেজা অবস্থায় গাছ স্পর্শ করবেন না।",
        "অনুমোদিত কপার-ভিত্তিক ব্যাকটেরিয়ানাশক স্প্রে করুন।",
      ],
      preventionMethods: [
        "গরম পানিতে (৫০° সে., ২৫ মিনিট) বীজ শোধন করুন।",
        "রোগমুক্ত চারা ব্যবহার করুন।",
        "শস্যপর্যায় মেনে চলুন।",
      ],
      fieldCareGuidance: ["পানি নিষ্কাশন নিশ্চিত করুন।"],
      whenToConsultExpert: ["পাতা ব্যাপকভাবে ঝরে পড়লে পরামর্শ নিন।"],
      safetyNote: "⚠️ ব্যাকটেরিয়ার বিরুদ্ধে সাধারণ ছত্রাকনাশক কাজ করে না। কপার-ভিত্তিক ওষুধ ব্যবহার করুন।",
      verifiedSource: "BARI",
    },
    treatmentPlan: {
      immediateActions: [
        { title: "Copper Spray", description: "Apply approved copper hydroxide bactericide immediately.", priority: "High", timeframe: "Within 24 hours", effectiveness: "85%" },
      ],
      organicTreatments: [
        { name: "Bordeaux Mixture", preparation: "Standard 1% recipe", application: "Preventive spray before rain", certifications: "Traditional Organic" },
      ],
      chemicalTreatments: [
        { name: "Copper Hydroxide 77% WP", activeIngredient: "Copper Hydroxide", dosage: "Follow label", safetyInterval: "As per label", cautions: "Protective gloves required." },
      ],
      preventiveMeasures: ["Hot-water seed treatment", "Avoid overhead irrigation"],
      culturalPractices: ["Never work in wet fields", "Rotate away from Solanaceae"],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=600&auto=format&fit=crop&q=80",
  },

  // ── Tomato: Late Blight ─────────────────────────────────────────
  {
    id: "tomato-late-blight",
    crop: "Tomato",
    banglaCrop: "টমেটো",
    commonName: "Tomato Late Blight",
    banglaName: "টমেটোর নাবী ধসা রোগ (লেট ব্লাইট)",
    scientificName: "Phytophthora infestans",
    pathogenType: "Fungal",
    severity: "Severe",
    confidence: 96.0,
    summary:
      "A devastating oomycete disease that rapidly destroys tomato foliage and fruit. Irregularly shaped water-soaked lesions turn dark brown to black, often with white fungal growth on the underside of leaves.",
    banglaSummary:
      "ফাইটোপথোরা ইনফেসট্যান্স দ্বারা সৃষ্ট টমেটোর ভয়াবহ রোগ। পাতায় অনিয়মিত জলছাপের দাগ দ্রুত কালো হয়ে যায়। কুয়াশাচ্ছন্ন আর্দ্র আবহাওয়ায় ২–৩ দিনে পুরো গাছ পুড়ে যাওয়ার মতো কালো হয়।",
    symptoms: [
      "Irregular water-soaked dark brown to black lesions on leaves",
      "White fuzzy fungal growth on leaf undersides in humid conditions",
      "Firm, dark brown lesions on green fruit",
      "Rapid vine collapse with putrid smell",
    ],
    banglaSymptoms: [
      "পাতায় অনিয়মিত জলছাপের দাগ, দ্রুত গাঢ় বাদামী-কালো হয়",
      "আর্দ্র সকালে পাতার নিচে সাদা তুলোর মতো ছত্রাক",
      "কাঁচা ফলে শক্ত, গাঢ় বাদামী দাগ",
      "সম্পূর্ণ গাছ দ্রুত ঢলে পড়ে ও পচা গন্ধ বের হয়",
    ],
    favorableConditions: ["Cool temperatures 15°C–21°C with continuous wetness", "Fog, drizzle, overcast conditions", "Overhead irrigation"],
    banglaCauses: ["১৫°–২১° সে. শীতল তাপমাত্রা ও টানা আর্দ্র আবহাওয়া", "কুয়াশা ও গুঁড়ি গুঁড়ি বৃষ্টি", "ওপর থেকে সেচ দেওয়া"],
    affectedParts: ["Leaves", "Stems", "Fruit"],
    banglaAffectedParts: ["পাতা", "কাণ্ড", "ফল"],
    banglaCropInfo: "টমেটো — শীতকালে এই রোগ সবচেয়ে বেশি দেখা যায়।",
    transmissionRisk: "High",
    banglaTreatment: {
      managementAdvice: [
        "ওপর থেকে সেচ দেওয়া সম্পূর্ণ বন্ধ করুন।",
        "আক্রান্ত গাছের অংশ কেটে পুড়িয়ে ফেলুন।",
        "অনুমোদিত সিস্টেমিক ছত্রাকনাশক জরুরি ভিত্তিতে স্প্রে করুন।",
      ],
      preventionMethods: [
        "কুয়াশা শুরু হওয়ার আগেই প্রতিরোধক ছত্রাকনাশক স্প্রে করুন।",
        "গোড়ায় মালচিং ব্যবহার করুন।",
        "খুঁটি দিয়ে গাছ বেঁধে দিন।",
      ],
      fieldCareGuidance: ["সকালে সেচ দিন, পাতা ভেজা রাখবেন না।"],
      whenToConsultExpert: ["দ্রুত ছড়ানো শুরু হলে অবিলম্বে পরামর্শ নিন।"],
      safetyNote: "⚠️ ছত্রাকনাশক লেবেল অনুযায়ী সঠিক মাত্রায় ব্যবহার করুন।",
      verifiedSource: "BARI ও কৃষি সম্প্রসারণ অধিদপ্তর (DAE)",
    },
    treatmentPlan: {
      immediateActions: [
        { title: "Emergency Fungicide", description: "Apply systemic fungicide with translaminar activity immediately.", priority: "High", timeframe: "Within 12 hours", effectiveness: "93%" },
      ],
      organicTreatments: [
        { name: "Bordeaux Mixture 1%", preparation: "100g CuSO4 + 100g lime in 10L water", application: "Preventive spray before rain", certifications: "Traditional Organic" },
      ],
      chemicalTreatments: [
        { name: "Metalaxyl + Mancozeb", activeIngredient: "Metalaxyl 8% + Mancozeb 64%", dosage: "Follow label", safetyInterval: "7–14 days", cautions: "Wear mask and gloves." },
      ],
      preventiveMeasures: ["Pre-season preventive sprays during fog season", "Improve air circulation"],
      culturalPractices: ["Stake plants vertically", "Avoid overhead irrigation"],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=600&auto=format&fit=crop&q=80",
  },

  // ── Tomato: Leaf Mold ───────────────────────────────────────────
  {
    id: "tomato-leaf-mold",
    crop: "Tomato",
    banglaCrop: "টমেটো",
    commonName: "Tomato Leaf Mold",
    banglaName: "টমেটোর পাতার ছাতা রোগ (লিফ মোল্ড)",
    scientificName: "Passalora fulva (syn. Cladosporium fulvum)",
    pathogenType: "Fungal",
    severity: "Moderate",
    confidence: 92.0,
    summary:
      "A fungal disease primarily affecting greenhouse and high-tunnel tomatoes. Pale green to yellowish spots on upper leaf surfaces with olive-green to brown velvety fungal growth on the underside.",
    banglaSummary:
      "ক্ল্যাডোস্পোরিয়াম ছত্রাক দ্বারা সৃষ্ট। পাতার উপরিভাগে হালকা সবুজ-হলুদ দাগ এবং নিচের পিঠে জলপাই-সবুজ থেকে বাদামী মখমলের মতো ছত্রাক দেখা যায়। আবদ্ধ পরিবেশে বেশি হয়।",
    symptoms: [
      "Pale green to yellowish diffuse spots on upper leaf surface",
      "Olive-green to brown velvety fungal growth on leaf undersides",
      "Leaves curl upward and dry out",
      "Progressive defoliation from lower leaves upward",
    ],
    banglaSymptoms: [
      "পাতার উপরে হালকা সবুজ-হলুদ ছড়ানো দাগ",
      "পাতার নিচে জলপাই-সবুজ বা বাদামী মখমলের মতো ছত্রাক",
      "পাতা উপরের দিকে কুঁকড়ে শুকিয়ে যায়",
      "নিচ থেকে ওপরের দিকে ক্রমশ পাতা ঝরে পড়ে",
    ],
    favorableConditions: ["High humidity (>85%) in enclosed growing structures", "Poor air circulation", "Temperature 20°C–25°C"],
    banglaCauses: ["আবদ্ধ পরিবেশে ৮৫% এর বেশি আর্দ্রতা", "বাতাস চলাচলের অভাব", "২০°–২৫° সে. তাপমাত্রা"],
    affectedParts: ["Leaves (primarily lower)", "Stems (rarely)"],
    banglaAffectedParts: ["পাতা (প্রধানত নিচের)", "কাণ্ড (বিরল)"],
    banglaCropInfo: "টমেটো — বিশেষ করে গ্রিনহাউস বা পলিটানেলে এই রোগ বেশি হয়।",
    transmissionRisk: "Moderate",
    banglaTreatment: {
      managementAdvice: [
        "বাতাস চলাচল বাড়ান — জানালা খুলুন বা ফ্যান ব্যবহার করুন।",
        "নিচের আক্রান্ত পাতা ছেঁটে ফেলুন।",
        "অনুমোদিত ছত্রাকনাশক স্প্রে করুন।",
      ],
      preventionMethods: ["গাছের মধ্যে পর্যাপ্ত ফাঁক রাখুন।", "পাতা ভিজিয়ে সেচ দেবেন না।", "প্রতিরোধী জাত ব্যবহার করুন।"],
      fieldCareGuidance: ["আর্দ্রতা কমানোর ব্যবস্থা করুন।"],
      whenToConsultExpert: ["দ্রুত ছড়িয়ে পড়লে পরামর্শ নিন।"],
      safetyNote: "⚠️ ছত্রাকনাশক লেবেল মোতাবেক ব্যবহার করুন।",
      verifiedSource: "BARI",
    },
    treatmentPlan: {
      immediateActions: [
        { title: "Increase Ventilation", description: "Improve air circulation to reduce humidity below 85%.", priority: "High", timeframe: "Immediate", effectiveness: "80%" },
      ],
      organicTreatments: [
        { name: "Sulfur-based Fungicide", preparation: "Micronized wettable sulfur as per label", application: "Foliar spray every 7–10 days", certifications: "Organic Approved" },
      ],
      chemicalTreatments: [
        { name: "Chlorothalonil", activeIngredient: "Chlorothalonil 54%", dosage: "Follow label", safetyInterval: "0 days (tomato PHI)", cautions: "Protective gear required." },
      ],
      preventiveMeasures: ["Ensure proper greenhouse ventilation", "Use resistant cultivars"],
      culturalPractices: ["Prune lower leaves for airflow", "Avoid wetting foliage"],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=600&auto=format&fit=crop&q=80",
  },

  // ── Tomato: Septoria Leaf Spot ──────────────────────────────────
  {
    id: "tomato-septoria-leaf-spot",
    crop: "Tomato",
    banglaCrop: "টমেটো",
    commonName: "Septoria Leaf Spot",
    banglaName: "টমেটোর সেপটোরিয়া পাতার দাগ রোগ",
    scientificName: "Septoria lycopersici",
    pathogenType: "Fungal",
    severity: "Moderate",
    confidence: 93.0,
    summary:
      "A common fungal foliar disease with numerous small circular spots with dark brown margins and grayish-white centers containing tiny black pycnidia (fruiting bodies).",
    banglaSummary:
      "সেপটোরিয়া ছত্রাক দ্বারা সৃষ্ট। পাতায় অনেক ছোট গোলাকৃতির দাগ যার কিনারা গাঢ় বাদামী এবং কেন্দ্র ধূসর-সাদা। দাগের মাঝে কালো বিন্দুর মতো ছত্রাকের ফলন্ত অংশ দেখা যায়।",
    symptoms: [
      "Numerous small (2–3mm) circular spots with dark borders and gray centers",
      "Tiny black dots (pycnidia) visible in lesion centers under magnification",
      "Lower leaves affected first, progressing upward",
      "Severe defoliation leaving only upper leaves",
    ],
    banglaSymptoms: [
      "২–৩ মিমি আকারের অসংখ্য ছোট গোলাকৃতির দাগ, কিনারা গাঢ়, কেন্দ্র ধূসর",
      "দাগের মাঝে কালো বিন্দুর মতো পিকনিডিয়া দেখা যায়",
      "প্রথমে নিচের পাতায়, তারপর ওপরের দিকে ছড়ায়",
      "তীব্র আক্রমণে শুধু ওপরের কয়েকটি পাতা বাকি থাকে",
    ],
    favorableConditions: ["Warm temperatures 20°C–25°C with frequent rain", "Splashing water from soil to leaves", "Dense canopy"],
    banglaCauses: ["২০°–২৫° সে. তাপমাত্রা ও ঘন ঘন বৃষ্টি", "সেচের ছিটা মাটি থেকে পাতায় লাগা", "ঘন গাছপালা"],
    affectedParts: ["Lower leaves", "Stems", "Rarely fruit"],
    banglaAffectedParts: ["নিচের পাতা", "কাণ্ড", "ফল (বিরল)"],
    banglaCropInfo: "টমেটো — এই রোগ বৃষ্টির মৌসুমে বেশি দেখা যায়।",
    transmissionRisk: "Moderate",
    banglaTreatment: {
      managementAdvice: [
        "আক্রান্ত নিচের পাতা সাবধানে ছেঁটে পুড়িয়ে ফেলুন।",
        "গোড়ায় মালচিং ব্যবহার করুন যাতে মাটির ছিটা পাতায় না লাগে।",
        "অনুমোদিত ছত্রাকনাশক স্প্রে করুন।",
      ],
      preventionMethods: ["শস্যপর্যায় মেনে চলুন।", "খুঁটি দিয়ে গাছ উঁচু করুন।", "মালচিং ব্যবহার করুন।"],
      fieldCareGuidance: ["সকালে সেচ দিন।"],
      whenToConsultExpert: ["দ্রুত পাতা ঝরে পড়লে পরামর্শ নিন।"],
      safetyNote: "⚠️ ছত্রাকনাশকের সঠিক মাত্রা লেবেল থেকে দেখে নিন।",
      verifiedSource: "BARI",
    },
    treatmentPlan: {
      immediateActions: [
        { title: "Prune Lower Foliage", description: "Remove and destroy lower infected leaves to slow splash-based spread.", priority: "High", timeframe: "Within 24 hours", effectiveness: "82%" },
      ],
      organicTreatments: [
        { name: "Copper Fungicide", preparation: "As per organic label", application: "Foliar spray every 7 days", certifications: "OMRI Listed" },
      ],
      chemicalTreatments: [
        { name: "Mancozeb + Chlorothalonil", activeIngredient: "Contact fungicides", dosage: "Follow label", safetyInterval: "7 days", cautions: "Standard precautions." },
      ],
      preventiveMeasures: ["Mulch around plant base", "Stake plants for airflow"],
      culturalPractices: ["Avoid overhead irrigation", "3-year crop rotation"],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=600&auto=format&fit=crop&q=80",
  },

  // ── Tomato: Spider Mites ────────────────────────────────────────
  {
    id: "tomato-spider-mites",
    crop: "Tomato",
    banglaCrop: "টমেটো",
    commonName: "Two-Spotted Spider Mite Infestation",
    banglaName: "টমেটোর মাকড়সা মাইট (লাল মাকড়সা পোকা)",
    scientificName: "Tetranychus urticae",
    pathogenType: "Pest Infestation",
    severity: "Moderate",
    confidence: 89.0,
    summary:
      "Tiny spider mites feed on leaf undersides, causing stippled yellow spots that merge into bronzed, dried leaves. Fine webbing visible between leaves in heavy infestations.",
    banglaSummary:
      "ক্ষুদ্র মাকড়সা মাইট পাতার নিচের দিকে রস চুষে খায়। পাতায় হালকা হলুদ বিন্দু বিন্দু দাগ (স্টিপলিং) দেখা যায়, পরে পাতা ব্রোঞ্জ রঙ ধরে শুকিয়ে যায়। তীব্র আক্রমণে সূক্ষ্ম জাল দেখা যায়।",
    symptoms: [
      "Fine yellow stippling (tiny dots) on upper leaf surface",
      "Leaves turn bronze/rusty and dry out",
      "Fine silken webbing visible between leaves and stems",
      "Tiny moving dots (mites) visible on leaf undersides with magnification",
    ],
    banglaSymptoms: [
      "পাতার উপরে হালকা হলুদ বিন্দু বিন্দু দাগ",
      "পাতা ব্রোঞ্জ বা মরিচা রঙ ধরে শুকিয়ে যায়",
      "পাতা ও কাণ্ডের মাঝে সূক্ষ্ম রেশমি জাল",
      "পাতার নিচে ম্যাগনিফায়িং গ্লাসে ক্ষুদ্র নড়াচড়া করা মাইট দেখা যায়",
    ],
    favorableConditions: ["Hot, dry weather (>30°C)", "Dusty conditions", "Low humidity"],
    banglaCauses: ["গরম ও শুষ্ক আবহাওয়া (৩০° সে. এর বেশি)", "ধুলোযুক্ত পরিবেশ", "কম আর্দ্রতা"],
    affectedParts: ["Leaves", "Stems", "Buds"],
    banglaAffectedParts: ["পাতা", "কাণ্ড", "কুঁড়ি"],
    banglaCropInfo: "টমেটো — গরম ও শুষ্ক সময়ে মাইটের আক্রমণ বেশি হয়।",
    transmissionRisk: "Moderate",
    banglaTreatment: {
      managementAdvice: [
        "জোরে পানির ধারায় পাতার নিচে স্প্রে করে মাইট ধুয়ে ফেলুন।",
        "তীব্র আক্রমণে অনুমোদিত মাইটিসাইড স্প্রে করুন।",
        "প্রাকৃতিক শত্রু (লেডিবাগ, প্রিডেটরি মাইট) সংরক্ষণ করুন।",
      ],
      preventionMethods: ["জমিতে ধুলো কমাতে পানি স্প্রে করুন।", "অতিরিক্ত ব্রডস্পেকট্রাম কীটনাশক এড়িয়ে চলুন।"],
      fieldCareGuidance: ["আবহাওয়া গরম-শুষ্ক হলে পাতার নিচে নিয়মিত পর্যবেক্ষণ করুন।"],
      whenToConsultExpert: ["পাতা ব্রোঞ্জ হয়ে ব্যাপকভাবে ঝরে পড়লে পরামর্শ নিন।"],
      safetyNote: "⚠️ মাইটিসাইড ও কীটনাশক ভিন্ন — সাধারণ কীটনাশকে মাইট মরে না। সঠিক ওষুধ নির্বাচনে কৃষি কর্মকর্তার পরামর্শ নিন।",
      verifiedSource: "BARI",
    },
    treatmentPlan: {
      immediateActions: [
        { title: "Water Spray Knockdown", description: "Blast leaf undersides with strong water spray to dislodge mites.", priority: "High", timeframe: "Immediate", effectiveness: "70%" },
      ],
      organicTreatments: [
        { name: "Neem Oil", preparation: "5ml per liter + soap emulsifier", application: "Spray every 5 days, targeting leaf undersides", certifications: "Bio-based" },
      ],
      chemicalTreatments: [
        { name: "Abamectin 1.8% EC", activeIngredient: "Abamectin", dosage: "Follow label", safetyInterval: "7 days", cautions: "Highly toxic to aquatic organisms." },
      ],
      preventiveMeasures: ["Maintain humidity by irrigation", "Conserve natural predators"],
      culturalPractices: ["Remove weeds that harbor mites", "Avoid dust buildup"],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=600&auto=format&fit=crop&q=80",
  },

  // ── Tomato: Target Spot ─────────────────────────────────────────
  {
    id: "tomato-target-spot",
    crop: "Tomato",
    banglaCrop: "টমেটো",
    commonName: "Tomato Target Spot",
    banglaName: "টমেটোর টার্গেট দাগ রোগ",
    scientificName: "Corynespora cassiicola",
    pathogenType: "Fungal",
    severity: "Moderate",
    confidence: 91.0,
    summary:
      "A fungal disease producing brown circular spots with concentric rings on leaves, stems, and fruit. Affects all aerial plant parts and can cause significant defoliation.",
    banglaSummary:
      "করিনেস্পোরা ছত্রাক দ্বারা সৃষ্ট। পাতায় কেন্দ্রীভূত রিং সহ বাদামী গোলাকৃতির দাগ তৈরি হয়। পাতা, কাণ্ড ও ফলে আক্রমণ করে এবং পাতা ব্যাপকভাবে ঝরে পড়ে।",
    symptoms: [
      "Brown circular lesions with concentric rings (target-like) on leaves",
      "Dark, sunken spots on stems and petioles",
      "Small, round, brown spots on fruit",
      "Lower leaf defoliation progressing upward",
    ],
    banglaSymptoms: [
      "পাতায় কেন্দ্রীভূত রিং সহ বাদামী গোলাকৃতির দাগ (টার্গেটের মতো)",
      "কাণ্ড ও বোঁটায় গাঢ়, দেবে যাওয়া দাগ",
      "ফলে ছোট, গোলাকার বাদামী দাগ",
      "নিচের পাতা থেকে ওপরের দিকে পাতা ঝরে পড়া",
    ],
    favorableConditions: ["Warm humid conditions (25°C–30°C)", "Extended leaf wetness", "Poor pruning and dense canopy"],
    banglaCauses: ["উষ্ণ আর্দ্র আবহাওয়া (২৫°–৩০° সে.)", "দীর্ঘক্ষণ পাতা ভেজা থাকা", "ঘন গাছপালা ও অপর্যাপ্ত ছাঁটাই"],
    affectedParts: ["Leaves", "Stems", "Fruit"],
    banglaAffectedParts: ["পাতা", "কাণ্ড", "ফল"],
    banglaCropInfo: "টমেটো — গরম ও আর্দ্র মৌসুমে বেশি দেখা যায়।",
    transmissionRisk: "Moderate",
    banglaTreatment: {
      managementAdvice: [
        "আক্রান্ত পাতা ছেঁটে পুড়িয়ে ফেলুন।",
        "গাছের নিচের দিকে ছাঁটাই করে বাতাস চলাচল বাড়ান।",
        "অনুমোদিত ছত্রাকনাশক স্প্রে করুন।",
      ],
      preventionMethods: ["নিয়মিত ছাঁটাই করুন।", "মালচিং ব্যবহার করুন।", "শস্যপর্যায় মেনে চলুন।"],
      fieldCareGuidance: ["পাতা ভিজিয়ে সেচ দেবেন না।"],
      whenToConsultExpert: ["ফলেও দাগ দেখা দিলে পরামর্শ নিন।"],
      safetyNote: "⚠️ ছত্রাকনাশক লেবেল মোতাবেক ব্যবহার করুন।",
      verifiedSource: "BARI",
    },
    treatmentPlan: {
      immediateActions: [
        { title: "Prune Infected Tissue", description: "Remove infected leaves and improve canopy airflow.", priority: "High", timeframe: "Within 24 hours", effectiveness: "80%" },
      ],
      organicTreatments: [
        { name: "Neem Oil Spray", preparation: "5ml/L + soap", application: "Every 7 days", certifications: "Bio-based" },
      ],
      chemicalTreatments: [
        { name: "Azoxystrobin + Difenoconazole", activeIngredient: "Strobilurin + Triazole", dosage: "Follow label", safetyInterval: "7 days", cautions: "Standard precautions." },
      ],
      preventiveMeasures: ["Regular pruning", "Mulching around base"],
      culturalPractices: ["Maintain plant spacing", "Stake plants vertically"],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=600&auto=format&fit=crop&q=80",
  },

  // ── Tomato: Yellow Leaf Curl Virus ──────────────────────────────
  {
    id: "tomato-yellow-leaf-curl-virus",
    crop: "Tomato",
    banglaCrop: "টমেটো",
    commonName: "Tomato Yellow Leaf Curl Virus (TYLCV)",
    banglaName: "টমেটোর পাতা হলুদ কোঁকড়ানো ভাইরাস রোগ (TYLCV)",
    scientificName: "Tomato Yellow Leaf Curl Virus (Begomovirus)",
    pathogenType: "Viral",
    severity: "Severe",
    confidence: 90.0,
    summary:
      "A devastating viral disease transmitted by whiteflies (Bemisia tabaci). Plants show upward curling of leaflets, interveinal yellowing, stunted growth, and severe flower drop resulting in little to no fruit set.",
    banglaSummary:
      "সাদামাছি (Whitefly) পোকা দ্বারা ছড়ানো ভয়াবহ ভাইরাস রোগ। পাতা উপরের দিকে কুঁকড়ে যায়, শিরার মাঝে হলুদভাব, গাছ বামন হয় এবং ফুল ঝরে পড়ে — ফলে ফল খুব কম বা হয় না।",
    symptoms: [
      "Upward curling and cupping of young leaflets",
      "Interveinal yellowing (chlorosis) of leaves",
      "Severe stunting of entire plant",
      "Flower drop and drastically reduced fruit set",
    ],
    banglaSymptoms: [
      "কচি পাতা উপরের দিকে কুঁকড়ে কাপের মতো হয়ে যায়",
      "পাতার শিরার মাঝের অংশ হলুদ হয়ে যায়",
      "গাছের বৃদ্ধি মারাত্মকভাবে কমে যায় (বামন হয়)",
      "ফুল ঝরে পড়ে, ফল খুব কম হয় বা একেবারেই হয় না",
    ],
    favorableConditions: ["High whitefly (Bemisia tabaci) population", "Warm dry weather favoring whitefly multiplication", "Proximity to infected crops or weeds"],
    banglaCauses: [
      "সাদামাছি পোকার উচ্চ জনসংখ্যা (ভাইরাসের বাহক)",
      "গরম-শুষ্ক আবহাওয়ায় সাদামাছি দ্রুত বাড়ে",
      "আশেপাশে আক্রান্ত ফসল বা আগাছা",
    ],
    affectedParts: ["Leaves", "Flowers", "Entire plant"],
    banglaAffectedParts: ["পাতা", "ফুল", "সম্পূর্ণ গাছ"],
    banglaCropInfo: "টমেটো — TYLCV বাংলাদেশে টমেটোর সবচেয়ে ক্ষতিকর ভাইরাস রোগের একটি।",
    transmissionRisk: "High",
    banglaTreatment: {
      managementAdvice: [
        "আক্রান্ত গাছ দ্রুত উপড়ে ফেলে ধ্বংস করুন।",
        "সাদামাছি নিয়ন্ত্রণে হলুদ স্টিকি ট্র্যাপ ব্যবহার করুন।",
        "অনুমোদিত কীটনাশক দিয়ে সাদামাছি নিয়ন্ত্রণ করুন।",
      ],
      preventionMethods: [
        "TYLCV প্রতিরোধী টমেটোর জাত চাষ করুন।",
        "চারা অবস্থায় নেটহাউস বা মশারি দিয়ে ঢেকে রাখুন।",
        "সাদামাছির আশ্রয়দাতা আগাছা পরিষ্কার করুন।",
      ],
      fieldCareGuidance: ["হলুদ স্টিকি ট্র্যাপ দিয়ে সাদামাছির উপস্থিতি পর্যবেক্ষণ করুন।"],
      whenToConsultExpert: ["পাতা কুঁকড়ানো ও গাছ বামন দেখামাত্র পরামর্শ নিন।"],
      safetyNote: "⚠️ ভাইরাস রোগে কোনো ওষুধ সরাসরি কাজ করে না — বাহক পোকা নিয়ন্ত্রণই একমাত্র উপায়।",
      verifiedSource: "BARI ও কৃষি সম্প্রসারণ অধিদপ্তর (DAE)",
    },
    treatmentPlan: {
      immediateActions: [
        { title: "Remove Infected Plants", description: "Uproot and destroy TYLCV-infected plants immediately.", priority: "High", timeframe: "Immediate", effectiveness: "60%" },
        { title: "Whitefly Control", description: "Deploy yellow sticky traps and apply approved insecticide.", priority: "High", timeframe: "Within 24 hours", effectiveness: "80%" },
      ],
      organicTreatments: [
        { name: "Neem Oil + Yellow Sticky Traps", preparation: "Neem oil 5ml/L for spraying; yellow traps for monitoring", application: "Spray every 5 days; traps at canopy level", certifications: "Bio-based" },
      ],
      chemicalTreatments: [
        { name: "Imidacloprid 17.8% SL", activeIngredient: "Imidacloprid (Neonicotinoid)", dosage: "Follow registered label", safetyInterval: "14 days", cautions: "Toxic to bees. Avoid during flowering." },
      ],
      preventiveMeasures: ["Plant TYLCV-resistant cultivars", "Use insect-proof net during seedling stage"],
      culturalPractices: ["Remove weed hosts around fields", "Synchronize planting dates"],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=600&auto=format&fit=crop&q=80",
  },

  // ── Tomato: Mosaic Virus ────────────────────────────────────────
  {
    id: "tomato-mosaic-virus",
    crop: "Tomato",
    banglaCrop: "টমেটো",
    commonName: "Tomato Mosaic Virus (ToMV)",
    banglaName: "টমেটোর মোজাইক ভাইরাস রোগ (ToMV)",
    scientificName: "Tomato Mosaic Virus (Tobamovirus)",
    pathogenType: "Viral",
    severity: "Moderate",
    confidence: 88.0,
    summary:
      "A highly stable and mechanically transmitted virus causing mosaic patterns of light and dark green on leaves, leaf distortion, and occasionally internal fruit browning. Easily spread through contaminated hands, tools, and seeds.",
    banglaSummary:
      "অত্যন্ত স্থায়ী ও যান্ত্রিকভাবে ছড়ানো ভাইরাস। পাতায় হালকা ও গাঢ় সবুজের মোজাইক প্যাটার্ন, পাতা কুঁচকে যাওয়া এবং কখনও ফলের ভেতরে বাদামী দাগ দেখা যায়। হাত, যন্ত্রপাতি ও বীজের মাধ্যমে সহজে ছড়ায়।",
    symptoms: [
      "Mosaic pattern of alternating light green and dark green areas on leaves",
      "Leaf curling, distortion, and 'fern leaf' appearance",
      "Stunted plant growth",
      "Internal browning (brown wall) of fruit in some strains",
    ],
    banglaSymptoms: [
      "পাতায় হালকা ও গাঢ় সবুজ রঙের মোজাইক বা ছোপ ছোপ প্যাটার্ন",
      "পাতা কুঁচকে যায়, বিকৃত হয় ও ফার্ন পাতার মতো দেখায়",
      "গাছের বৃদ্ধি কমে যায়",
      "কিছু ক্ষেত্রে ফল কাটলে ভেতরে বাদামী দাগ দেখা যায়",
    ],
    favorableConditions: ["Mechanical transmission through contaminated hands and tools", "Infected seeds", "Tobacco users handling plants"],
    banglaCauses: [
      "আক্রান্ত গাছ ছোঁয়ার পর সুস্থ গাছ ধরা (যান্ত্রিক সংক্রমণ)",
      "আক্রান্ত বীজ থেকে সংক্রমণ",
      "তামাক ব্যবহারকারীদের হাত থেকে ছড়ানো (TMV ক্রস-ইনফেকশন)",
    ],
    affectedParts: ["Leaves", "Fruit (internal)", "Entire plant"],
    banglaAffectedParts: ["পাতা", "ফল (ভেতরে)", "সম্পূর্ণ গাছ"],
    banglaCropInfo: "টমেটো — ToMV অত্যন্ত স্থায়ী ভাইরাস, মাটি ও সরঞ্জামে দীর্ঘদিন বেঁচে থাকতে পারে।",
    transmissionRisk: "High",
    banglaTreatment: {
      managementAdvice: [
        "আক্রান্ত গাছ দ্রুত উপড়ে ফেলে পুড়িয়ে ফেলুন।",
        "গাছ ছোঁয়ার আগে সাবান দিয়ে হাত ধুয়ে নিন।",
        "ছাঁটাইয়ের কাঁচি ও সরঞ্জাম জীবাণুমুক্ত করুন।",
      ],
      preventionMethods: [
        "ভাইরাসমুক্ত প্রত্যায়িত বীজ ব্যবহার করুন।",
        "প্রতিরোধী জাতের টমেটো (Tm-2 জিন যুক্ত) চাষ করুন।",
        "তামাক ব্যবহারের পর দুধ দিয়ে হাত ধুয়ে তবে গাছ ধরুন।",
      ],
      fieldCareGuidance: ["সরঞ্জাম ব্যবহারের আগে ও পরে জীবাণুমুক্ত করুন।"],
      whenToConsultExpert: ["মোজাইক প্যাটার্ন দেখামাত্র পরামর্শ নিন।"],
      safetyNote: "⚠️ ভাইরাসের কোনো সরাসরি ওষুধ নেই। প্রতিরোধই একমাত্র উপায়।",
      verifiedSource: "BARI",
    },
    treatmentPlan: {
      immediateActions: [
        { title: "Remove Infected Plants", description: "Uproot and destroy infected plants. Do NOT compost.", priority: "High", timeframe: "Immediate", effectiveness: "65%" },
        { title: "Sanitize All Tools", description: "Disinfect pruning shears, stakes, and hands with 10% bleach or milk solution.", priority: "High", timeframe: "Immediate", effectiveness: "90%" },
      ],
      organicTreatments: [],
      chemicalTreatments: [],
      preventiveMeasures: ["Use certified virus-free seeds", "Plant TMV/ToMV-resistant cultivars (Tm-2 gene)"],
      culturalPractices: ["Wash hands with soap or milk before handling plants", "Sterilize tools between plants"],
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=600&auto=format&fit=crop&q=80",
  },
];
