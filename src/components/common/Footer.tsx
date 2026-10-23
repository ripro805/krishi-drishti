"use client";

import React from "react";
import Link from "next/link";
import { Scan, ShieldCheck, Mail, ArrowUpRight, Heart, Leaf } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 dark:border-slate-800">
      <div className="mx-auto w-full max-w-[1720px] px-4 py-16 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-agri-500 to-agri-600 text-white shadow-md">
                <Scan className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Crop Disease <span className="text-agri-400">Detection</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Professional agricultural pathology platform powered by deep vision neural networks.
              Identify 200+ crop diseases in under 3 seconds with 98% laboratory benchmark accuracy.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-agri-300">
              <ShieldCheck className="h-4 w-4 text-agri-400" />
              <span>PlantVillage Dataset Validated • Global Field Agronomy Benchmarks</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Diagnostic Tools</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/scan" className="hover:text-agri-400 transition-colors flex items-center gap-1">
                  AI Leaf Scanner <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/crop-doctor" className="hover:text-agri-400 transition-colors flex items-center gap-1">
                  Crop Doctor AI Assistant <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-agri-400 transition-colors flex items-center gap-1">
                  Fertilizer Dosage Engine <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-agri-400 transition-colors flex items-center gap-1">
                  Pathology Encyclopedia <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-agri-400 transition-colors flex items-center gap-1">
                  Scan History & Reports <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Supported Crops */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Supported Crops</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-1.5"><Leaf className="h-3 w-3 text-agri-400" /> Solanaceae (Tomato, Potato)</li>
              <li className="flex items-center gap-1.5"><Leaf className="h-3 w-3 text-agri-400" /> Cereals (Corn, Wheat, Rice)</li>
              <li className="flex items-center gap-1.5"><Leaf className="h-3 w-3 text-agri-400" /> Peppers & Chilies</li>
              <li className="flex items-center gap-1.5"><Leaf className="h-3 w-3 text-agri-400" /> Orchards (Apple, Grape)</li>
              <li className="flex items-center gap-1.5"><Leaf className="h-3 w-3 text-agri-400" /> Cucurbits & Legumes</li>
            </ul>
          </div>

          {/* Outbreak Bulletin Newsletter */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Outbreak Alerts</h3>
            <p className="mt-4 text-xs text-slate-400 leading-relaxed">
              Subscribe to regional spore alerts, weather blight forecasts, and seasonal treatment bulletins.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex flex-col gap-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter farmer or agronomist email"
                  className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-agri-500"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-agri-600 px-3 py-2 text-xs font-semibold text-white hover:bg-agri-500 transition-colors"
              >
                <Mail className="h-3.5 w-3.5 mr-1.5" />
                Get Disease Bulletins
              </button>
            </form>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-12 border-t border-slate-800 pt-8">
          <div className="rounded-2xl bg-slate-800/60 p-4 border border-slate-700/60 text-xs text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-300">Agricultural Disclaimer:</span> KrishiDrishti Crop Disease Detection provides preliminary AI-based optical screening and agronomic treatment guidance. It is designed to assist farmers, students, and agronomists in early threat detection. For severe epidemics or commercial quarantine decisions, always verify with local agricultural extension officers and certified plant pathology laboratories.
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} Crop Disease Detection • KrishiDrishti. Built with Next.js & TypeScript.</p>
            <div className="flex items-center gap-2">
              <span>Empowering smart sustainable agriculture</span>
              <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
