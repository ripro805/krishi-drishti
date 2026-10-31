"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { useLanguage } from "@/context/LanguageContext";

export const FAQSection: React.FC = () => {
  const { isBangla } = useLanguage();
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const faqs = [
    {
      id: "faq-1",
      category: isBangla ? "এআই ও নির্ভুলতা" : "Accuracy & AI",
      question: isBangla
        ? "কৃষি দৃষ্টি এআই কীভাবে ৯৮% নির্ভুলতায় ফসলের রোগ শনাক্ত করে?"
        : "How does the AI achieve 98% accuracy in crop disease detection?",
      answer: isBangla
        ? "আমাদের সিস্টেমটি ৫০০,০০০-এর বেশি উচ্চ-রেজোলিউশন উদ্ভিদের প্যাথলজি ইমেজে প্রশিক্ষিত ডিপ কনভোলিউশনাল নিউরাল নেটওয়ার্ক (ConvNeXt) ও ভিশন ট্রান্সফরমার ব্যবহার করে। এটি পাতার নেক্রোটিক দাগ, ক্লোরোটিক বলয় এবং শিরা বিন্যাস নিখুঁতভাবে বিশ্লেষণ করে আন্তর্জাতিক গবেষণাগারের মানের সাথে মিলিয়ে সঠিক রোগ নির্ধারণ করে।"
        : "Our system leverages deep convolutional vision neural networks and Vision Transformer (ViT) architectures trained on over 500,000 multi-spectral and high-resolution plant pathology images across 200+ distinct pathogens. The model evaluates micro-features such as lesion margins, concentric sporulation rings, chlorotic halos, and leaf vein patterns against university pathology benchmarks.",
    },
    {
      id: "faq-2",
      category: isBangla ? "মাঠে ব্যবহার" : "Field Use",
      question: isBangla
        ? "সঠিক ফলাফলের জন্য পাতার ছবি কীভাবে তোলা উচিত?"
        : "What photography conditions provide the most reliable diagnosis?",
      answer: isBangla
        ? "সর্বোত্তম ফলাফলের জন্য প্রাকৃতিক দিনের আলোতে একটি একক আক্রান্ত পাতার সুস্পষ্ট ছবি তুলুন। অতিরিক্ত ফ্ল্যাশ বা গাঢ় ছায়া এড়িয়ে চলুন। আক্রান্ত অংশটি ক্যামেরার ফ্রেমের অন্তত ৭০% অংশ জুড়ে রাখুন। সম্ভব হলে পাতার উপরিভাগ ও নিচের অংশ উভয়ই পর্যবেক্ষণ করুন।"
        : "For optimal diagnosis, capture a single leaf showing visible symptoms in natural indirect daylight. Avoid harsh flash glare or deep shadows. Hold the camera 6 to 12 inches away so the diseased leaf surface fills at least 70% of the viewfinder. Ensure both the upper side and underside are inspected.",
    },
    {
      id: "faq-3",
      category: isBangla ? "এআই ও নির্ভুলতা" : "Accuracy & AI",
      question: isBangla
        ? "সিস্টেমটি কি পুষ্টির ঘাটতি এবং ছত্রাকজনিত রোগের পার্থক্য বুঝতে পারে?"
        : "Can this system distinguish between nutrient deficiencies and fungal infections?",
      answer: isBangla
        ? "হ্যাঁ। পুষ্টির ঘাটতি (যেমন নাইট্রোজেন, ম্যাগনেসিয়াম বা আয়রন) সাধারণত পুরো পাতাজুড়ে বা শিরাগুলোর মাঝে সুষমভাবে দেখা যায়। অপরদিকে ছত্রাক ও ব্যাকটেরিয়ার আক্রমণে অনিয়মিত দাগ, ক্ষতের বলয় বা পচন সৃষ্টি হয়। এআই এই টেক্সচারাল ভিন্নতা বিশ্লেষণ করে সঠিক কারণ চিহ্নিত করে।"
        : "Yes. Nutritional chlorosis (such as Nitrogen, Magnesium, or Iron deficiency) typically follows uniform interveinal or broad foliage patterns, whereas fungal and bacterial infections present with localized irregular necrotic lesions, halos, or sporulation centers. Our AI evaluates spatial texture variance to differentiate between abiotic stress and biotic pathogens.",
    },
    {
      id: "faq-4",
      category: isBangla ? "চিকিৎসা ও সমাধান" : "Treatments",
      question: isBangla
        ? "প্রস্তাবিত চিকিৎসার পরামর্শ কি জৈব ও নিরাপদ চাষাবাদের জন্য উপযুক্ত?"
        : "Are the treatment recommendations suitable for certified organic farms?",
      answer: isBangla
        ? "প্রতিটি রোগ শনাক্তকরণের পর দ্বৈত চিকিৎসা পরিকল্পনা প্রদান করা হয়: নিম নির্যাস, ট্রাইকোডার্মা ও ব্যাসিলাস জাতীয় সম্পূর্ণ জৈব ও পরিবেশবান্ধব সমাধান, পাশাপাশি নিবন্ধিত অনুমোদিত রাসায়নিক সমাধান—যার মধ্যে সঠিক মাত্রা, স্প্রে করার সঠিক সময় ও ফল সংগ্রহের পূর্ববর্তী নিরাপত্তা সময়সীমা (PHI) উল্লেখ থাকে।"
        : "Every diagnosis provides a dual-protocol treatment plan: OMRI-listed biological and organic solutions (such as Bacillus bio-fungicides, copper octanoate, cold-pressed neem formulations) alongside registered conventional options, detailing exact dosages, dilution rates, and pre-harvest safety intervals (PHI).",
    },
    {
      id: "faq-5",
      category: isBangla ? "মোবাইল ও নেটওয়ার্ক" : "Field Use",
      question: isBangla
        ? "কৃষি দৃষ্টি কি মোবাইল ফোনে এবং ধীরগতির ইন্টারনেটেও কাজ করে?"
        : "Does the scanner work on mobile devices and without reliable field internet?",
      answer: isBangla
        ? "হ্যাঁ! প্ল্যাটফর্মটি সকল স্মার্টফোন ও ট্যাবলেটের জন্য সম্পূর্ণ অপ্টিমাইজড। আলাদা কোনো ভারী অ্যাপ ইন্সটল ছাড়াই ব্রাউজার থেকে সরাসরি ক্যামেরা অন করে ছবি স্ক্যান করা যায় এবং অফলাইনে পূর্বে দেখা রিপোর্ট পর্যালোচনা করা যায়।"
        : "Yes! Our frontend is fully responsive for smartphones and tablets. It supports direct camera integration with zero app download required. Scanned reports and treatment protocols are cached locally on your device for immediate offline review in remote field zones.",
    },
    {
      id: "faq-6",
      category: isBangla ? "রিপোর্ট ও শেয়ারিং" : "Privacy & Tech",
      question: isBangla
        ? "কীভাবে আমি এআই রিপোর্টটি ডাউনলোড করে কৃষি কর্মকর্তার সাথে শেয়ার করব?"
        : "How do I export and share pathology reports with agronomists?",
      answer: isBangla
        ? "যে কোনো স্ক্যান ফলাফলের পৃষ্ঠায় থাকা 'Export PDF Medical Report' বাটনে ক্লিক করলেই মুহূর্তের মধ্যে রোগীর ছবির প্রমাণ, রোগ নির্ণয়, কনফিডেন্স স্কোর ও চিকিৎসাপত্রসহ একটি প্রফেশনাল পিডিএফ রিপোর্ট তৈরি হয় যা সরাসরি প্রিন্ট বা হোয়াটসঅ্যাপে শেয়ার করা যায়।"
        : "Click the 'Export PDF Medical Report' button on any scan result. The platform generates an executive agronomic summary containing photographic evidence, pathogen classification, severity metrics, and the itemized treatment plan ready for instant printing or emailing.",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-3">
          <Badge variant="outline" size="md">
            <HelpCircle className="h-3.5 w-3.5" />
            {isBangla ? "জ্ঞান কোষ ও সহায়তা" : "Knowledge Base"}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {isBangla ? "সাধারণ জিজ্ঞাসাসমূহ (FAQ)" : "Frequently Asked Questions"}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            {isBangla
              ? "এআই নির্ভুলতা, ক্যামেরা নির্দেশনা ও চিকিৎসা প্রোটোকল সম্পর্কিত প্রয়োজনীয় প্রশ্নোত্তর।"
              : "Answers to common questions regarding AI diagnostic accuracy, photography conditions, and treatment protocols."}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left font-bold text-slate-900 dark:text-white focus:outline-none"
                >
                  <span className="text-sm sm:text-base pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-agri-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-200/60 dark:border-slate-800/80 px-5 sm:px-6 pb-6 pt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed animate-fadeIn">
                    <p>{faq.answer}</p>
                    <div className="mt-3">
                      <span className="rounded-md bg-slate-200/60 dark:bg-slate-700/60 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                        {isBangla ? `বিভাগ: ${faq.category}` : `Category: ${faq.category}`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
