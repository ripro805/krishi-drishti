"use client";

import React, { useState } from "react";
import { FAQS_DATA } from "@/data/faqsData";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Badge } from "@/components/common/Badge";

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-3">
          <Badge variant="outline" size="md">
            <HelpCircle className="h-3.5 w-3.5" />
            Knowledge Base
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Answers to common questions regarding AI diagnostic accuracy, photography conditions, and treatment protocols.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS_DATA.map((faq) => {
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
                        Category: {faq.category}
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
