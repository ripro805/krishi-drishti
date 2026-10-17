"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scan,
  Bot,
  BookOpen,
  Calculator,
  History,
  Sparkles,
  Menu,
  X,
  ShieldCheck,
  Layers,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Badge } from "./Badge";

const NAV_LINKS = [
  { name: "Disease Scanner", href: "/scan", icon: Scan },
  { name: "Crop Doctor AI", href: "/crop-doctor", icon: Bot },
  { name: "Disease Library", href: "/library", icon: BookOpen },
  { name: "Dosage Calculator", href: "/calculator", icon: Calculator },
  { name: "Scan History", href: "/history", icon: History },
  { name: "Features", href: "/features", icon: Layers },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-agri-500 to-agri-700 text-white shadow-md shadow-agri-600/30 group-hover:scale-105 transition-transform">
            <Scan className="h-6 w-6 transition-transform group-hover:rotate-12" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-agri-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-agri-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Crop Disease <span className="text-agri-600 dark:text-agri-400">Detection</span>
              </span>
            </div>
            <p className="text-[11px] font-medium tracking-wide text-slate-500 dark:text-slate-400">
              KrishiDrishti • 98% AI Diagnostic Precision
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-agri-50 text-agri-700 dark:bg-agri-950/50 dark:text-agri-300 font-semibold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-agri-600" : "text-slate-400")} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Badge variant="success" size="md" className="hidden xl:inline-flex shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5" />
            98% Lab Benchmark
          </Badge>
          <Link href="/scan">
            <Button size="md" className="shadow-agri-600/30">
              <Sparkles className="h-4 w-4" />
              Scan Leaf Now
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden rounded-xl p-2.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 dark:border-slate-800 dark:bg-slate-900/95 animate-fadeIn">
          <div className="space-y-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl p-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-agri-50 text-agri-700 dark:bg-agri-950/50 dark:text-agri-300"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-agri-600" />
                    <span>{link.name}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
            <Link href="/scan" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full justify-center">
                <Sparkles className="h-4 w-4" />
                Start Instant AI Scan
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
