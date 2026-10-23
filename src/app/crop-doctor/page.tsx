"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AgriChatbotConsole } from "@/components/chat/AgriChatbotConsole";
import { Badge } from "@/components/common/Badge";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function CropDoctorContent() {
  const searchParams = useSearchParams();
  const { isBangla } = useLanguage();

  const prompt = searchParams.get("prompt");
  const crop = searchParams.get("crop");
  const disease = searchParams.get("disease");
  const confidence = searchParams.get("confidence");

  return (
    <div className="py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <Badge variant="success" size="md">
          <Sparkles className="h-3.5 w-3.5 mr-1" />
          {isBangla ? "ক্রপ ডক্টর ও এআই কৃষি সহকারী" : "Autonomous Agricultural Agronomist"}
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {isBangla ? "KrishiDrishti AI কৃষি সহকারী" : "Crop Doctor AI Assistant"}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {isBangla
            ? "ফসলের রোগবালাই, লক্ষণ, কীটনাশক নিরাপত্তা, জৈব সমাধান এবং সারের সঠিক মাত্রা সম্পর্কে তাৎক্ষণিক পরামর্শ।"
            : "Get real-time agronomic guidance, organic treatment recipes, chemical safety intervals, and fertilizer schedules."}
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

export default function CropDoctorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[700px] items-center justify-center p-12 text-center text-slate-500">
          <div className="space-y-3">
            <div className="h-10 w-10 mx-auto rounded-full border-4 border-agri-600 border-t-transparent animate-spin" />
            <p className="text-sm font-semibold">AI কৃষি সহকারী চালু হচ্ছে...</p>
          </div>
        </div>
      }
    >
      <CropDoctorContent />
    </Suspense>
  );
}
