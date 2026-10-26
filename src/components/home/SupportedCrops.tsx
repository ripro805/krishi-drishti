import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const SupportedCrops: React.FC = () => {
  const crops = [
    {
      name: "Rice / Paddy (ধান)",
      diseasesCount: "9 AI Classes",
      keyIssues: "Leaf Blast, Bacterial Leaf Blight, Brown Spot, Tungro, Sheath Blight",
      imageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&auto=format&fit=crop&q=80",
      status: "Active AI (ConvNeXt)",
    },
    {
      name: "Tomato (টমেটো)",
      diseasesCount: "10 AI Classes",
      keyIssues: "Early Blight, Late Blight, Leaf Mold, Bacterial Spot, Mosaic Virus",
      imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=400&auto=format&fit=crop&q=80",
      status: "Active AI (ConvNeXt)",
    },
    {
      name: "Potato (আলু)",
      diseasesCount: "3 AI Classes",
      keyIssues: "Late Blight, Early Blight, Healthy Foliage Control",
      imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&auto=format&fit=crop&q=80",
      status: "Active AI (ConvNeXt)",
    },
    {
      name: "Chili / Bell Pepper (মরিচ)",
      diseasesCount: "2 AI Classes",
      keyIssues: "Bacterial Spot, Healthy Foliage Control",
      imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&auto=format&fit=crop&q=80",
      status: "Active AI (ConvNeXt)",
    },
    {
      name: "Corn / Maize (ভুট্টা)",
      diseasesCount: "4 AI Classes",
      keyIssues: "Common Rust, Northern Leaf Blight, Gray Leaf Spot",
      imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&auto=format&fit=crop&q=80",
      status: "Active AI (ConvNeXt)",
    },
    {
      name: "Wheat (গম)",
      diseasesCount: "3 AI Classes",
      keyIssues: "Stripe Rust (Yellow Rust), Septoria Leaf Blight",
      imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format&fit=crop&q=80",
      status: "Active AI (ConvNeXt)",
    },
    {
      name: "Apple (আপেল)",
      diseasesCount: "4 AI Classes",
      keyIssues: "Apple Scab, Black Rot, Cedar Apple Rust, Healthy",
      imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=80",
      status: "Active AI (ConvNeXt)",
    },
    {
      name: "Grape (আঙ্গুর)",
      diseasesCount: "4 AI Classes",
      keyIssues: "Black Rot, Esca (Black Measles), Leaf Blight",
      imageUrl: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&auto=format&fit=crop&q=80",
      status: "Active AI (ConvNeXt)",
    },
    {
      name: "Strawberry (স্ট্রবেরি)",
      diseasesCount: "2 AI Classes",
      keyIssues: "Leaf Scorch, Healthy Foliage Control",
      imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&auto=format&fit=crop&q=80",
      status: "Active AI (ConvNeXt)",
    },
    {
      name: "Citrus / Orange (লেবু/কমলা)",
      diseasesCount: "1 AI Class",
      keyIssues: "Huanglongbing (HLB Citrus Greening)",
      imageUrl: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&auto=format&fit=crop&q=80",
      status: "Active AI (ConvNeXt)",
    },
    {
      name: "Peach (পিচ)",
      diseasesCount: "2 AI Classes",
      keyIssues: "Bacterial Spot, Healthy Foliage Control",
      imageUrl: "https://images.unsplash.com/photo-1629828874514-c1e5103f2150?w=400&auto=format&fit=crop&q=80",
      status: "Active AI (ConvNeXt)",
    },
    {
      name: "Cherry (চেরি)",
      diseasesCount: "2 AI Classes",
      keyIssues: "Powdery Mildew, Healthy Foliage Control",
      imageUrl: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&auto=format&fit=crop&q=80",
      status: "Active AI (ConvNeXt)",
    },
    {
      name: "Blueberry (ব্লুবেরি)",
      diseasesCount: "1 AI Class",
      keyIssues: "Healthy Leaf Diagnostics",
      imageUrl: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&auto=format&fit=crop&q=80",
      status: "Active AI (ConvNeXt)",
    },
    {
      name: "Raspberry (রাস্পবেরি)",
      diseasesCount: "1 AI Class",
      keyIssues: "Healthy Foliage Verification",
      imageUrl: "https://images.unsplash.com/photo-1577069808021-5a50787a718c?w=400&auto=format&fit=crop&q=80",
      status: "Active AI (ConvNeXt)",
    },
    {
      name: "Soybean (সয়াবিন)",
      diseasesCount: "1 AI Class",
      keyIssues: "Foliage Health & Pathogen Screening",
      imageUrl: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=400&auto=format&fit=crop&q=80",
      status: "Active AI (ConvNeXt)",
    },
    {
      name: "Squash / Pumpkin (মিষ্টি কুমড়া)",
      diseasesCount: "1 AI Class",
      keyIssues: "Powdery Mildew Screening",
      imageUrl: "https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=400&auto=format&fit=crop&q=80",
      status: "Active AI (ConvNeXt)",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-agri-600 dark:text-agri-400">
              Agricultural Spectrum
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Supported Crops & Plant Families
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Trained on extensive botanical pathology archives covering Solanaceae, field grains, tree fruits, and row vegetables.
            </p>
          </div>

          <Link
            href="/supported-crops"
            className="inline-flex items-center gap-2 text-sm font-bold text-agri-600 hover:text-agri-700 dark:text-agri-400"
          >
            <span>View All 16 Crops & 50 Classes &rarr;</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {crops.map((c) => (
            <Link
              key={c.name}
              href={`/scan?crop=${encodeURIComponent(c.name)}`}
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
                    Scan {c.name.split(" ")[0]} leaf &rarr;
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
