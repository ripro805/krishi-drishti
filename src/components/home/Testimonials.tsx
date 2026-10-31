"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { useLanguage } from "@/context/LanguageContext";

export const Testimonials: React.FC = () => {
  const { isBangla } = useLanguage();

  const testimonials = [
    {
      name: isBangla ? "ড. সারাহ চেন" : "Dr. Sarah Chen",
      role: isBangla ? "উদ্ভিদ রোগতত্ত্ববিদ ও কৃষি পরামর্শক" : "Agricultural Consultant & Pathologist",
      company: "Pacific AgriConsulting",
      quote: isBangla
        ? "শনাক্তকরণের নির্ভুলতা সত্যিই প্রশংসনীয়। লেট ব্লাইট সংক্রমণের প্রাথমিক পর্যায়েই সতর্কবার্তা পাওয়ায় আমাদের ক্লায়েন্টদের ১২০ একরের বেশি আলু রক্ষা পেয়েছে।"
        : "The accuracy is remarkable. This platform has become essential for our disease identification work with commercial growers. Catching late blight within hours saved over 120 acres of prime potato crops.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: isBangla ? "মার্কাস ভ্যান্স" : "Marcus Vance",
      role: isBangla ? "বাণিজ্যিক গ্রিনহাউস ম্যানেজার" : "Commercial Greenhouse Manager",
      company: "Valley Ag Solutions",
      quote: isBangla
        ? "জৈব ও রাসায়নিক উভয় ধরনের সুনির্দিষ্ট প্রেসক্রিপশন এবং পানির সাথে সঠিক মাত্রার নির্দেশনা আমাদের মাঠকর্মীদের দ্রুত সিদ্ধান্ত নিতে দারুণ সাহায্য করে।"
        : "The dual organic and chemical treatment plans make this tool unique. Instead of just giving a diagnostic name, it gives exact dilution rates and safety intervals that our workers can immediately execute.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: isBangla ? "তরিকুল ইসলাম" : "Tariqul Islam",
      role: isBangla ? "প্রিসিশন এগ্রোনমি বিশেষজ্ঞ" : "Precision Farming Agronomist",
      company: "Krishi Drishti Field Extension",
      quote: isBangla
        ? "কনভোলিউশনাল এআই ও বাংলা ইন্টারফেস প্রান্তিক কৃষকদের রোগ শনাক্তকরণে বৈপ্লবিক গতি এনে দিয়েছে। সার ক্যালকুলেটর অতিরিক্ত ইউরিয়া অপচয় ৩০% পর্যন্ত কমিয়েছে।"
        : "Integrating the ConvNeXt AI with local crop varieties has transformed early detection for rural growers. The dosage calculator alone stopped nitrogen overuse and reduced fertilizer costs by 30%.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
      <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-3">
          <Badge variant="success" size="md">
            {isBangla ? "মাঠ পর্যায়ের বাস্তব প্রভাব" : "Verified Field Impact"}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {isBangla ? "কৃষিবিদ ও খামারিদের আস্থার প্রতীক" : "Trusted by Agronomists and Commercial Growers"}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            {isBangla
              ? "দেখুন কীভাবে কৃষি বিশেষজ্ঞ ও বাণিজ্যিক চাষিরা ফসল সুরক্ষায় আমাদের এআই ইঞ্জিনের ওপর ভরসা রাখছেন।"
              : "See how agricultural consultants and farm managers rely on our AI detection engine to safeguard harvests."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <div className="relative mb-6">
                  <Quote className="h-8 w-8 text-agri-500/20 mb-2" />
                  <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {t.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t.role} • {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
