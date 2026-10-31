"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const SupportedCrops: React.FC = () => {
  const { isBangla } = useLanguage();

  const crops = [
    {
      name: isBangla ? "ধান (Rice / Paddy)" : "Rice / Paddy",
      cropParam: "Rice",
      diseasesCount: isBangla ? "৯টি এআই ক্লাস" : "9 AI Classes",
      keyIssues: isBangla
        ? "লিফ ব্লাস্ট, ব্যাকটেরিয়াল ব্লাইট, ব্রাউন স্পট, টুংরো ভাইরাস"
        : "Leaf Blast, Bacterial Leaf Blight, Brown Spot, Tungro",
      imageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&auto=format&fit=crop&q=80",
      status: isBangla ? "সক্রিয় এআই" : "Active AI (ConvNeXt)",
    },
    {
      name: isBangla ? "টমেটো (Tomato)" : "Tomato",
      cropParam: "Tomato",
      diseasesCount: isBangla ? "১০টি এআই ক্লাস" : "10 AI Classes",
      keyIssues: isBangla
        ? "আর্লি ব্লাইট, লেট ব্লাইট, লিফ মোল্ড, মোজাইক ভাইরাস"
        : "Early Blight, Late Blight, Leaf Mold, Mosaic Virus",
      imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=400&auto=format&fit=crop&q=80",
      status: isBangla ? "সক্রিয় এআই" : "Active AI (ConvNeXt)",
    },
    {
      name: isBangla ? "আলু (Potato)" : "Potato",
      cropParam: "Potato",
      diseasesCount: isBangla ? "৩টি এআই ক্লাস" : "3 AI Classes",
      keyIssues: isBangla
        ? "লেট ব্লাইট (নাবি ধসা), আর্লি ব্লাইট, সুস্থ পাতা"
        : "Late Blight, Early Blight, Healthy Foliage Control",
      imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&auto=format&fit=crop&q=80",
      status: isBangla ? "সক্রিয় এআই" : "Active AI (ConvNeXt)",
    },
    {
      name: isBangla ? "মরিচ (Chili / Pepper)" : "Chili / Bell Pepper",
      cropParam: "Chili",
      diseasesCount: isBangla ? "২টি এআই ক্লাস" : "2 AI Classes",
      keyIssues: isBangla
        ? "ব্যাকটেরিয়াল স্পট, সুস্থ পাতা যাচাই"
        : "Bacterial Spot, Healthy Foliage Control",
      imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&auto=format&fit=crop&q=80",
      status: isBangla ? "সক্রিয় এআই" : "Active AI (ConvNeXt)",
    },
    {
      name: isBangla ? "ভুট্টা (Corn / Maize)" : "Corn / Maize",
      cropParam: "Corn",
      diseasesCount: isBangla ? "৪টি এআই ক্লাস" : "4 AI Classes",
      keyIssues: isBangla
        ? "কমন মরিচা, নর্দার্ন লিফ ব্লাইট, গ্রে লিফ স্পট"
        : "Common Rust, Northern Leaf Blight, Gray Leaf Spot",
      imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&auto=format&fit=crop&q=80",
      status: isBangla ? "সক্রিয় এআই" : "Active AI (ConvNeXt)",
    },
    {
      name: isBangla ? "গম (Wheat)" : "Wheat",
      cropParam: "Wheat",
      diseasesCount: isBangla ? "৩টি এআই ক্লাস" : "3 AI Classes",
      keyIssues: isBangla
        ? "স্ট্রাইপ মরিচা (হলুদ মরিচা), সেপটোরিয়া লিফ ব্লাইট"
        : "Stripe Rust (Yellow Rust), Septoria Leaf Blight",
      imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format&fit=crop&q=80",
      status: isBangla ? "সক্রিয় এআই" : "Active AI (ConvNeXt)",
    },
    {
      name: isBangla ? "আপেল (Apple)" : "Apple",
      cropParam: "Apple",
      diseasesCount: isBangla ? "৪টি এআই ক্লাস" : "4 AI Classes",
      keyIssues: isBangla
        ? "আপেল স্ক্যাব, ব্ল্যাক রট (কালো পচন), সিডার রাস্ট"
        : "Apple Scab, Black Rot, Cedar Apple Rust, Healthy",
      imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=80",
      status: isBangla ? "সক্রিয় এআই" : "Active AI (ConvNeXt)",
    },
    {
      name: isBangla ? "আঙ্গুর (Grape)" : "Grape",
      cropParam: "Grape",
      diseasesCount: isBangla ? "৪টি এআই ক্লাস" : "4 AI Classes",
      keyIssues: isBangla
        ? "ব্ল্যাক রট, এসকা রোগ, লিফ ব্লাইট"
        : "Black Rot, Esca (Black Measles), Leaf Blight",
      imageUrl: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&auto=format&fit=crop&q=80",
      status: isBangla ? "সক্রিয় এআই" : "Active AI (ConvNeXt)",
    },
    {
      name: isBangla ? "স্ট্রবেরি (Strawberry)" : "Strawberry",
      cropParam: "Strawberry",
      diseasesCount: isBangla ? "২টি এআই ক্লাস" : "2 AI Classes",
      keyIssues: isBangla
        ? "লিফ স্কর্চ, সুস্থ পাতা মূল্যায়ন"
        : "Leaf Scorch, Healthy Foliage Control",
      imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&auto=format&fit=crop&q=80",
      status: isBangla ? "সক্রিয় এআই" : "Active AI (ConvNeXt)",
    },
    {
      name: isBangla ? "লেবু / কমলা (Citrus)" : "Citrus / Orange",
      cropParam: "Citrus",
      diseasesCount: isBangla ? "১টি এআই ক্লাস" : "1 AI Class",
      keyIssues: isBangla
        ? "সাইট্রাস গ্রিনিং (হুয়াংলংবিং - HLB)"
        : "Huanglongbing (HLB Citrus Greening)",
      imageUrl: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&auto=format&fit=crop&q=80",
      status: isBangla ? "সক্রিয় এআই" : "Active AI (ConvNeXt)",
    },
    {
      name: isBangla ? "পিচ ফল (Peach)" : "Peach",
      cropParam: "Peach",
      diseasesCount: isBangla ? "২টি এআই ক্লাস" : "2 AI Classes",
      keyIssues: isBangla
        ? "ব্যাকটেরিয়াল স্পট, সুস্থ পাতা মনিটরিং"
        : "Bacterial Spot, Healthy Foliage Control",
      imageUrl: "https://images.unsplash.com/photo-1629828874514-c1e5103f2150?w=400&auto=format&fit=crop&q=80",
      status: isBangla ? "সক্রিয় এআই" : "Active AI (ConvNeXt)",
    },
    {
      name: isBangla ? "চেরি (Cherry)" : "Cherry",
      cropParam: "Cherry",
      diseasesCount: isBangla ? "২টি এআই ক্লাস" : "2 AI Classes",
      keyIssues: isBangla
        ? "পাউডারি মিলডিউ, সুস্থ পাতা যাচাই"
        : "Powdery Mildew, Healthy Foliage Control",
      imageUrl: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&auto=format&fit=crop&q=80",
      status: isBangla ? "সক্রিয় এআই" : "Active AI (ConvNeXt)",
    },
    {
      name: isBangla ? "ব্লুবেরি (Blueberry)" : "Blueberry",
      cropParam: "Blueberry",
      diseasesCount: isBangla ? "১টি এআই ক্লাস" : "1 AI Class",
      keyIssues: isBangla
        ? "সুস্থ পাতার স্বাস্থ্য মূল্যায়ন"
        : "Healthy Leaf Diagnostics",
      imageUrl: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&auto=format&fit=crop&q=80",
      status: isBangla ? "সক্রিয় এআই" : "Active AI (ConvNeXt)",
    },
    {
      name: isBangla ? "রাস্পবেরি (Raspberry)" : "Raspberry",
      cropParam: "Raspberry",
      diseasesCount: isBangla ? "১টি এআই ক্লাস" : "1 AI Class",
      keyIssues: isBangla
        ? "উদ্ভিদের স্বাস্থ্য ও লক্ষণ নিরীক্ষা"
        : "Healthy Foliage Verification",
      imageUrl: "https://images.unsplash.com/photo-1577069808021-5a50787a718c?w=400&auto=format&fit=crop&q=80",
      status: isBangla ? "সক্রিয় এআই" : "Active AI (ConvNeXt)",
    },
    {
      name: isBangla ? "সয়াবিন (Soybean)" : "Soybean",
      cropParam: "Soybean",
      diseasesCount: isBangla ? "১টি এআই ক্লাস" : "1 AI Class",
      keyIssues: isBangla
        ? "পাতার স্বাস্থ্য ও প্যাথোজেন স্ক্রিনিং"
        : "Foliage Health & Pathogen Screening",
      imageUrl: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=400&auto=format&fit=crop&q=80",
      status: isBangla ? "সক্রিয় এআই" : "Active AI (ConvNeXt)",
    },
    {
      name: isBangla ? "মিষ্টি কুমড়া (Squash)" : "Squash / Pumpkin",
      cropParam: "Squash",
      diseasesCount: isBangla ? "১টি এআই ক্লাস" : "1 AI Class",
      keyIssues: isBangla
        ? "পাউডারি মিলডিউ ফাঙ্গাল স্ক্রিনিং"
        : "Powdery Mildew Screening",
      imageUrl: "https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=400&auto=format&fit=crop&q=80",
      status: isBangla ? "সক্রিয় এআই" : "Active AI (ConvNeXt)",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-agri-600 dark:text-agri-400">
              {isBangla ? "কৃষি বৈচিত্র্য ও কভারেজ" : "Agricultural Spectrum"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              {isBangla ? "সমর্থিত ফসল ও উদ্ভিদ পরিবার" : "Supported Crops & Plant Families"}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              {isBangla
                ? "সোলেসিয়াস, খাদ্যশস্য, বাগানের ফল ও শাকসবজির বিশাল প্যাথলজি ডেটাসেটে প্রশিক্ষিত ডিপ ভিশন এআই মডেল।"
                : "Trained on extensive botanical pathology archives covering Solanaceae, field grains, tree fruits, and row vegetables."}
            </p>
          </div>

          <Link
            href="/supported-crops"
            className="inline-flex items-center gap-2 text-sm font-bold text-agri-600 hover:text-agri-700 dark:text-agri-400"
          >
            <span>{isBangla ? "সকল ১৬টি ফসল ও ৫০টি রোগ দেখুন →" : "View All 16 Crops & 50 Classes →"}</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {crops.map((c) => (
            <Link
              key={c.cropParam}
              href={`/scan?crop=${encodeURIComponent(c.cropParam)}`}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40 p-5 hover:border-agri-500 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-700">
                  <img
                    src={c.imageUrl}
                    alt={c.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-agri-600 dark:group-hover:text-agri-400 transition-colors">
                      {c.name}
                    </h3>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-500/30">
                      {c.status}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                      {c.diseasesCount}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {c.keyIssues}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold text-agri-600 dark:text-agri-400 flex items-center gap-1">
                    {isBangla ? `${c.name.split(" ")[0]} পাতা স্ক্যান করুন →` : `Scan ${c.cropParam} leaf →`}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
