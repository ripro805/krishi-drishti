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
      status: "Active AI v1.0",
    },
    {
      name: "Tomato (টমেটো)",
      diseasesCount: "10 AI Classes",
      keyIssues: "Early Blight, Late Blight, Leaf Mold, Bacterial Spot, Mosaic Virus",
      imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=400&auto=format&fit=crop&q=80",
      status: "Active AI v1.0",
    },
    {
      name: "Potato (আলু)",
      diseasesCount: "3 AI Classes",
      keyIssues: "Late Blight, Early Blight, Healthy Foliage Control",
      imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&auto=format&fit=crop&q=80",
      status: "Active AI v1.0",
    },
    {
      name: "Chili / Bell Pepper (মরিচ)",
      diseasesCount: "2 AI Classes",
      keyIssues: "Bacterial Spot, Healthy Foliage Control",
      imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&auto=format&fit=crop&q=80",
      status: "Active AI v1.0",
    },
    {
      name: "Corn / Maize (ভুট্টা)",
      diseasesCount: "v2.0 Roadmap",
      keyIssues: "Common Rust, Northern Leaf Blight (Reference Library)",
      imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&auto=format&fit=crop&q=80",
      status: "Research Phase",
    },
    {
      name: "Wheat (গম)",
      diseasesCount: "v2.0 Roadmap",
      keyIssues: "Leaf Rust, Wheat Blast (Reference Library)",
      imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format&fit=crop&q=80",
      status: "Research Phase",
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
            href="/library"
            className="inline-flex items-center gap-2 text-sm font-bold text-agri-600 hover:text-agri-700 dark:text-agri-400"
          >
            <span>Browse Full Disease Library</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="flex flex-col items-end gap-1">
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${
                        c.status === "Active AI v1.0"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-500/30"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-500/30"
                      }`}>
                        {c.status}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        {c.diseasesCount}
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {c.keyIssues}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold text-agri-600 dark:text-agri-400 flex items-center gap-1">
                    Scan {c.name} leaf &rarr;
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
