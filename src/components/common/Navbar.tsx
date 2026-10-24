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
  User as UserIcon,
  LogIn,
  LogOut,
  Globe,
  LayoutDashboard,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { currentUser, isAuthenticated, logout, isAdmin, isExpert } = useAuth();
  const { isBangla, toggleLanguage } = useLanguage();

  const navLinks = [
    {
      name: isBangla ? "রোগ নির্ণয় স্ক্যানার" : "Disease Scanner",
      href: "/scan",
      icon: Scan,
    },
    {
      name: isBangla ? "AI কৃষি সহকারী" : "AI Agri Assistant",
      href: "/chat",
      icon: Bot,
    },
    {
      name: isBangla ? "সমর্থিত ফসল" : "Supported Crops",
      href: "/supported-crops",
      icon: Layers,
    },
    {
      name: isBangla ? "রোগ কোষাগার" : "Disease Library",
      href: "/library",
      icon: BookOpen,
    },
    {
      name: isBangla ? "স্ক্যান ইতিহাস" : "Scan History",
      href: "/history",
      icon: History,
    },
  ];

  if (isExpert || currentUser?.role === "expert") {
    navLinks.push({
      name: isBangla ? "বিশেষজ্ঞ পোর্টাল" : "Expert Portal",
      href: "/expert",
      icon: Stethoscope,
    });
  }

  if (isAdmin) {
    navLinks.push({
      name: isBangla ? "অ্যাডমিন প্যানেল" : "Admin Panel",
      href: "/admin",
      icon: LayoutDashboard,
    });
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-xl border-b border-emerald-900/10 dark:bg-slate-950/85 dark:border-slate-800 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.04)] transition-all">
      {/* Top subtle emerald gradient highlight bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-green-500 opacity-90" />

      <div className="w-full flex h-16 sm:h-[76px] items-center justify-between px-4 sm:px-8 lg:px-10 xl:px-14 2xl:px-20 gap-6">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3.5 flex-shrink-0">
          <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-600/30 group-hover:scale-105 group-hover:shadow-emerald-600/50 transition-all duration-300">
            <Scan className="h-6 w-6 transition-transform group-hover:rotate-12 duration-300" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 ring-2 ring-white dark:ring-slate-900"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                {isBangla ? (
                  <>
                    কৃষি <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">দৃষ্টি</span>
                  </>
                ) : (
                  <>
                    Krishi<span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">Drishti</span>
                  </>
                )}
              </span>
              <span className="hidden sm:inline-flex rounded-full bg-emerald-100/90 px-2 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/60">
                AI 2.4
              </span>
            </div>
            <p className="text-xs font-medium tracking-wide text-slate-500 dark:text-slate-400 -mt-0.5">
              {isBangla ? "এআই ফসল সুরক্ষা ও বাংলা কৃষি সহকারী" : "98% AI Precision Screening"}
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href ||
              (link.href === "/chat" && (pathname === "/chat" || pathname === "/crop-doctor"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-emerald-50 text-emerald-800 font-bold dark:bg-emerald-950/60 dark:text-emerald-300 shadow-xs border border-emerald-200/70 dark:border-emerald-800"
                    : "text-slate-600 hover:bg-slate-100/90 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 group-hover:text-slate-600")} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Toolbar: Language Toggle + User Auth + Scan CTA */}
        <div className="hidden sm:flex items-center gap-3 xl:gap-4 flex-shrink-0">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-emerald-300 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 transition-all"
            title="ভাষা পরিবর্তন করুন / Change Language"
          >
            <Globe className="h-3.5 w-3.5 text-emerald-600" />
            <span>{isBangla ? "English" : "বাংলা"}</span>
          </button>

          {/* User Profile or Login */}
          {isAuthenticated && currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pr-3 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 transition-all"
              >
                <img
                  src={
                    currentUser.avatar ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                  }
                  alt={currentUser.name}
                  className="h-7 w-7 rounded-lg object-cover ring-1 ring-agri-500/30"
                />
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 max-w-[100px]">
                    {currentUser.name.split(" ")[0]}
                  </p>
                  <p className="text-[10px] text-slate-400 capitalize">
                    {currentUser.role === "admin"
                      ? "অ্যাডমিন"
                      : currentUser.role === "expert"
                      ? "বিশেষজ্ঞ"
                      : "কৃষক"}
                  </p>
                </div>
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-fadeIn z-50">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {currentUser.name}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">{currentUser.email}</p>
                    <span className="inline-block mt-1 rounded-md bg-agri-50 px-2 py-0.5 text-[10px] font-bold text-agri-700 dark:bg-agri-950 dark:text-agri-300">
                      {currentUser.district || "বাংলাদেশ"} ({currentUser.role})
                    </span>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/history"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <History className="h-4 w-4 text-slate-400" />
                      {isBangla ? "আমার স্ক্যান ইতিহাস" : "Scan History"}
                    </Link>

                    {(isExpert || currentUser?.role === "expert" || isAdmin) && (
                      <Link
                        href="/expert"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-950"
                      >
                        <Stethoscope className="h-4 w-4 text-emerald-600" />
                        {isBangla ? "বিশেষজ্ঞ পোর্টাল (Expert)" : "Expert Portal"}
                      </Link>
                    )}

                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-purple-700 hover:bg-purple-50 dark:text-purple-300 dark:hover:bg-purple-950"
                      >
                        <LayoutDashboard className="h-4 w-4 text-purple-600" />
                        {isBangla ? "অ্যাডমিন ড্যাশবোর্ড" : "Admin Dashboard"}
                      </Link>
                    )}
                  </div>

                  <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      {isBangla ? "লগআউট" : "Sign Out"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <Button size="sm" variant="outline" className="text-xs">
                <LogIn className="h-3.5 w-3.5 mr-1.5" />
                {isBangla ? "লগইন" : "Sign In"}
              </Button>
            </Link>
          )}

          {/* Instant Scan CTA */}
          <Link href="/scan">
            <button className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-600/30 hover:shadow-lg hover:shadow-emerald-600/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:rotate-12 duration-300" />
              <span>{isBangla ? "পাতা স্ক্যান" : "Scan Leaf"}</span>
            </button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            {isBangla ? "EN" : "বাং"}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 dark:border-slate-800 dark:bg-slate-900/95 animate-fadeIn">
          {/* Mobile User Profile Header */}
          {isAuthenticated && currentUser ? (
            <div className="mb-4 flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <img
                  src={
                    currentUser.avatar ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                  }
                  alt={currentUser.name}
                  className="h-10 w-10 rounded-xl object-cover"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-slate-400 capitalize">
                    {currentUser.role} • {currentUser.district || "বাংলাদেশ"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-bold text-rose-600 hover:underline"
              >
                {isBangla ? "লগআউট" : "Sign Out"}
              </button>
            </div>
          ) : (
            <div className="mb-4 flex gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1"
              >
                <Button variant="outline" size="sm" className="w-full justify-center">
                  <LogIn className="h-4 w-4 mr-1.5" />
                  {isBangla ? "লগইন" : "Sign In"}
                </Button>
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1"
              >
                <Button variant="primary" size="sm" className="w-full justify-center">
                  {isBangla ? "নিবন্ধন" : "Register"}
                </Button>
              </Link>
            </div>
          )}

          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                pathname === link.href ||
                (link.href === "/chat" && (pathname === "/chat" || pathname === "/crop-doctor"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl p-3 text-sm font-semibold transition-colors",
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
                {isBangla ? "পাতা রোগ স্ক্রিনিং শুরু করুন" : "Start Instant AI Scan"}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
