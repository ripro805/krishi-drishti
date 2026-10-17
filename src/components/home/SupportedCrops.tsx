import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const SupportedCrops: React.FC = () => {
  const crops = [
    {
      name: "Tomato",
      diseasesCount: "10 Pathogens",
      keyIssues: "Early Blight, Late Blight, TYLCV, Septoria",
      imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=400&auto=format&fit=crop&q=80",
    },
    {
      name: "Potato",
      diseasesCount: "6 Pathogens",
      keyIssues: "Late Blight, Early Blight, Blackleg, Scab",
      imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&auto=format&fit=crop&q=80",
    },
    {
      name: "Corn (Maize)",
      diseasesCount: "8 Pathogens",
      keyIssues: "Common Rust, Northern Leaf Blight, Gray Leaf",
      imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&auto=format&fit=crop&q=80",
    },
    {
      name: "Bell Pepper",
      diseasesCount: "7 Pathogens",
      keyIssues: "Bacterial Spot, Anthracnose, Phytophthora",
      imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&auto=format&fit=crop&q=80",
    },
    {
      name: "Apple",
      diseasesCount: "5 Pathogens",
      keyIssues: "Apple Scab, Black Rot, Cedar Apple Rust",
      imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=80",
    },
    {
      name: "Grape",
      diseasesCount: "5 Pathogens",
      keyIssues: "Black Rot, Esca, Leaf Blight, Powdery Mildew",
      imageUrl: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                    <span className="rounded-full bg-agri-100 text-agri-800 dark:bg-agri-950 dark:text-agri-300 px-2 py-0.5 text-[10px] font-bold">
                      {c.diseasesCount}
                    </span>
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
