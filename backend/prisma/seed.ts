import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

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

    // 2. Seed All 52 Expanded Disease Records
  const diseasesFilePath = new URL("./diseasesSeedData.json", import.meta.url);
  const diseasesRaw = fs.readFileSync(diseasesFilePath, "utf-8");
  const allDiseases = JSON.parse(diseasesRaw);

  console.log(`🌱 Upserting ${allDiseases.length} authoritative crop disease records into PostgreSQL...`);
  for (const disease of allDiseases) {
    await prisma.disease.upsert({
      where: { id: disease.id },
      update: {
        crop: disease.crop,
        banglaCrop: disease.banglaCrop || null,
        commonName: disease.commonName,
        banglaName: disease.banglaName || null,
        scientificName: disease.scientificName,
        pathogenType: disease.pathogenType,
        severity: disease.severity,
        confidence: disease.confidence || 95.0,
        summary: disease.summary,
        banglaSummary: disease.banglaSummary || null,
        symptoms: disease.symptoms || [],
        banglaSymptoms: disease.banglaSymptoms || [],
        favorableConditions: disease.favorableConditions || [],
        banglaCauses: disease.banglaCauses || [],
        affectedParts: disease.affectedParts || [],
        banglaAffectedParts: disease.banglaAffectedParts || [],
        banglaCropInfo: disease.banglaCropInfo || null,
        transmissionRisk: disease.transmissionRisk || "Moderate",
        treatmentPlan: disease.treatmentPlan,
        banglaTreatment: disease.banglaTreatment || null,
        sampleImageUrl: disease.sampleImageUrl || null,
        isLowConfidenceWarning: !!disease.isLowConfidenceWarning,
      },
      create: {
        id: disease.id,
        crop: disease.crop,
        banglaCrop: disease.banglaCrop || null,
        commonName: disease.commonName,
        banglaName: disease.banglaName || null,
        scientificName: disease.scientificName,
        pathogenType: disease.pathogenType,
        severity: disease.severity,
        confidence: disease.confidence || 95.0,
        summary: disease.summary,
        banglaSummary: disease.banglaSummary || null,
        symptoms: disease.symptoms || [],
        banglaSymptoms: disease.banglaSymptoms || [],
        favorableConditions: disease.favorableConditions || [],
        banglaCauses: disease.banglaCauses || [],
        affectedParts: disease.affectedParts || [],
        banglaAffectedParts: disease.banglaAffectedParts || [],
        banglaCropInfo: disease.banglaCropInfo || null,
        transmissionRisk: disease.transmissionRisk || "Moderate",
        treatmentPlan: disease.treatmentPlan,
        banglaTreatment: disease.banglaTreatment || null,
        sampleImageUrl: disease.sampleImageUrl || null,
        isLowConfidenceWarning: !!disease.isLowConfidenceWarning,
      },
    });
  }
  console.log(`✅ All ${allDiseases.length} disease entities successfully seeded across 16 crops!`);

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
