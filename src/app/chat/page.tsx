import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ChatPageClient } from "./ChatPageClient";

export const metadata: Metadata = {
  title: "AI কৃষি সহকারী — KrishiDrishti Multilingual Agri Chatbot",
  description:
    "ধান, আলু, গম, টমেটোসহ যেকোনো ফসলের রোগবালাই, সার প্রয়োগ, সেচ ও আধুনিক কৃষি পদ্ধতির নির্ভরযোগ্য এআই সমাধান। বাংলা, English ও Banglish এ প্রশ্ন করুন।",
  keywords: [
    "কৃষি চ্যাটবট",
    "AI Agriculture Chatbot",
    "KrishiDrishti",
    "ফসলের রোগবালাই",
    "বাংলা কৃষি সহকারী",
    "Bangla Agri Assistant",
    "Crop Doctor",
  ],
};

export default function ChatPage() {
  return (
    <main className="min-h-[calc(100vh-5rem)] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <Suspense
        fallback={
          <div className="flex h-[700px] items-center justify-center rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xl">
            <div className="text-center space-y-3">
              <div className="h-10 w-10 mx-auto rounded-full border-4 border-agri-600 border-t-transparent animate-spin" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                AI কৃষি সহকারী চালু হচ্ছে...
              </p>
            </div>
          </div>
        }
      >
        <ChatPageClient />
      </Suspense>
    </main>
  );
}
