"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { AgriChatbotConsole } from "@/components/chat/AgriChatbotConsole";
import { Badge } from "@/components/common/Badge";
import { Sparkles, Bot } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ChatPageClient() {
  const searchParams = useSearchParams();
  const { isBangla } = useLanguage();

  const prompt = searchParams.get("prompt");
  const crop = searchParams.get("crop");
  const disease = searchParams.get("disease");
  const confidence = searchParams.get("confidence");

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <Badge variant="success" size="md">
          <Sparkles className="h-3.5 w-3.5 mr-1" />
          {isBangla ? "স্মার্ট বহুভাষিক কৃষি পরামর্শক" : "Multilingual Agri Intelligence"}
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {isBangla ? "KrishiDrishti AI কৃষি সহকারী" : "KrishiDrishti AI Agriculture Assistant"}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {isBangla
            ? "ফসলের রোগবালাই, পোকামাকড়, সারের সঠিক ডোজ, সেচ ও মাটি প্রস্তুতি নিয়ে যেকোনো প্রশ্ন করুন — বাংলা, ইংরেজি বা বাংলিশে।"
            : "Ask any questions regarding crop pathology, IPM pest management, fertilizer scheduling, and irrigation."}
        </p>
      </div>

      {/* Main Chatbot Console */}
      <AgriChatbotConsole
        initialPrompt={prompt}
        crop={crop}
        disease={disease}
        confidence={confidence}
      />
    </div>
  );
}
