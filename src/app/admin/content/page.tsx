"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  getStoredNotices,
  saveStoredNotice,
  AgriculturalNotice,
} from "@/lib/storage";
import {
  FileEdit,
  Plus,
  AlertTriangle,
  BookOpen,
  CheckCircle,
  HelpCircle,
  X,
  Bell,
} from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";

export default function ContentManagementPage() {
  const [notices, setNotices] = useState<AgriculturalNotice[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBanglaTitle, setNewBanglaTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newBanglaContent, setNewBanglaContent] = useState("");
  const [category, setCategory] = useState<"alert" | "guideline" | "news">("alert");

  const loadNotices = () => {
    setNotices(getStoredNotices());
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBanglaTitle.trim() || !newBanglaContent.trim()) return;

    const notice: AgriculturalNotice = {
      id: `not-${Date.now().toString(36)}`,
      title: newTitle.trim() || newBanglaTitle.trim(),
      banglaTitle: newBanglaTitle.trim(),
      content: newContent.trim() || newBanglaContent.trim(),
      banglaContent: newBanglaContent.trim(),
      category,
      date: new Date().toISOString().split("T")[0],
      active: true,
    };

    saveStoredNotice(notice);
    loadNotices();
    setIsModalOpen(false);
    setNewTitle("");
    setNewBanglaTitle("");
    setNewContent("");
    setNewBanglaContent("");
  };

  const toggleNoticeActive = (notice: AgriculturalNotice) => {
    saveStoredNotice({ ...notice, active: !notice.active });
    loadNotices();
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              কনটেন্ট ও সহায়ক তথ্য পরিচালনা (Content & Advisory Management)
            </h2>
            <p className="text-xs text-slate-500">
              মাঠের কৃষকদের জন্য জরুরি আবহাওয়া ও রোগ সতর্কতা, সাধারণ জিজ্ঞাসা (FAQ) ও নির্দেশিকা
            </p>
          </div>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="shadow-md"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            নতুন কৃষি সতর্কতা / বুলেটিন যোগ করুন
          </Button>
        </div>

        {/* Notices Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {notices.map((n) => (
            <div
              key={n.id}
              className={`rounded-3xl border p-6 transition-all ${
                n.active
                  ? "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm"
                  : "border-slate-100 bg-slate-50/60 opacity-60 dark:border-slate-800 dark:bg-slate-900/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      n.category === "alert"
                        ? "danger"
                        : n.category === "guideline"
                        ? "info"
                        : "success"
                    }
                    size="sm"
                  >
                    {n.category === "alert"
                      ? "জরুরি সতর্কতা (Alert)"
                      : n.category === "guideline"
                      ? "নির্দেশিকা (Guideline)"
                      : "কৃষি বার্তা"}
                  </Badge>
                  <span className="text-[11px] text-slate-400 font-mono">{n.date}</span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleNoticeActive(n)}
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    n.active
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  {n.active ? "প্রকাশিত (Live)" : "নিষ্ক্রিয় (Draft)"}
                </button>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                {n.banglaTitle}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {n.banglaContent}
              </p>

              {n.title !== n.banglaTitle && (
                <p className="text-[11px] text-slate-400 italic border-t border-slate-100 dark:border-slate-800 pt-2">
                  EN: {n.title}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Modal for adding notices */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Bell className="h-5 w-5 text-purple-600" />
                  নতুন কৃষি সতর্কতা বা নোটিশ প্রকাশ
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreateNotice} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    ক্যাটাগরি
                  </label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="alert">জরুরি রোগ ও আবহাওয়া সতর্কতা (Alert)</option>
                    <option value="guideline">মাঠের নির্দেশিকা ও নিয়মাবলী (Guideline)</option>
                    <option value="news">সাধারণ কৃষি বার্তা (News)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    শিরোনাম (বাংলা)
                  </label>
                  <input
                    type="text"
                    required
                    value={newBanglaTitle}
                    onChange={(e) => setNewBanglaTitle(e.target.value)}
                    placeholder="যেমন: চলতি শৈত্যপ্রবাহে বোরো ধানের চারা সুরক্ষায় সতর্কতা"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    বিস্তারিত নির্দেশিকা ও করণীয় (বাংলা)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={newBanglaContent}
                    onChange={(e) => setNewBanglaContent(e.target.value)}
                    placeholder="কৃষকদের কী কী পদক্ষেপ নিতে হবে তা বিস্তারিত লিখুন..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    বাতিল
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    প্রকাশ করুন (Publish)
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
