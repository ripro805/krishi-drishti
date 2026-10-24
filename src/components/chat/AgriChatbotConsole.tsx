"use client";

import React, { useRef, useEffect, useState } from "react";
import { useAgriChatbot } from "@/hooks/useAgriChatbot";
import { SafeMarkdown } from "./SafeMarkdown";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { SupportedLanguage } from "@/lib/ai/types";
import {
  Bot,
  Send,
  User,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  Trash2,
  Globe,
  Info,
  X,
  ShieldCheck,
  AlertCircle,
  Cpu,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

interface AgriChatbotConsoleProps {
  initialPrompt?: string | null;
  crop?: string | null;
  disease?: string | null;
  confidence?: string | null;
}

export const AgriChatbotConsole: React.FC<AgriChatbotConsoleProps> = ({
  initialPrompt,
  crop,
  disease,
  confidence,
}) => {
  const { isBangla } = useLanguage();
  const { currentUser } = useAuth();
  const {
    messages,
    input,
    setInput,
    isGenerating,
    languagePreference,
    setLanguagePreference,
    diseaseContext,
    clearDiseaseContext,
    providerStatus,
    suggestedChips,
    sendMessage,
    retryLastMessage,
    clearConversation,
    lastFailedMessage,
  } = useAgriChatbot({ initialPrompt, crop, disease, confidence });

  const chatScrollContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Auto-scroll ONLY the chat messages container to the bottom (without scrolling the page window or jumping to footer)
  useEffect(() => {
    if (chatScrollContainerRef.current) {
      chatScrollContainerRef.current.scrollTo({
        top: chatScrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isGenerating]);

  // Handle textarea keydown (Enter to send, Shift+Enter for newline)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isGenerating) {
        sendMessage();
      }
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[750px] sm:h-[800px] rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
      {/* ── Chat Header Bar ───────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/90 px-5 py-3.5 dark:border-slate-800 dark:bg-slate-800/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-agri-600 to-agri-500 text-white shadow-md shadow-agri-500/20">
            <Bot className="h-5 w-5" />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {isBangla ? "KrishiDrishti AI কৃষি সহকারী" : "KrishiDrishti AI Agricultural Assistant"}
              </h2>
              <Badge variant="success" size="sm" className="hidden sm:inline-flex text-[10px]">
                <ShieldCheck className="h-3 w-3 mr-1" />
                {isBangla ? "লাইভ এআই" : "Live AI"}
              </Badge>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2 mt-0.5">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  {providerStatus.groq || providerStatus.gemini || providerStatus.openai
                    ? isBangla
                      ? "সক্রিয় এআই"
                      : "Live AI"
                    : isBangla
                    ? "অফলাইন"
                    : "Offline"}
                </span>
              </span>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">&bull;</span>
              {currentUser ? (
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/80 dark:border-emerald-800/80 text-[10px]">
                  <User className="h-2.5 w-2.5 text-emerald-600" />
                  <span>{currentUser.name}</span>
                  <span className="opacity-70 capitalize">({currentUser.role})</span>
                  <span className="font-normal opacity-90">&bull; {isBangla ? "ইতিহাস সংরক্ষিত" : "History Saved"}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-[10px]">
                  <User className="h-2.5 w-2.5 text-slate-400" />
                  <span>{isBangla ? "অতিথি মোড (লগইন করলে স্থায়ী হবে)" : "Guest Mode (Log in to save history)"}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Controls: Language Selector & Clear */}
        <div className="flex items-center gap-2">
          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-2 py-1 shadow-xs">
            <Globe className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={languagePreference}
              onChange={(e) => setLanguagePreference(e.target.value as SupportedLanguage)}
              className="text-xs font-semibold bg-transparent text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
              title="উত্তর প্রদানের ভাষা নির্বাচন করুন"
            >
              <option value="auto">{isBangla ? "স্বয়ংক্রিয় (Auto)" : "Auto Detect"}</option>
              <option value="bn">বাংলা (Bangla)</option>
              <option value="en">English</option>
              <option value="banglish">Banglish (রোমানাইজড)</option>
            </select>
          </div>

          {/* Clear Chat Button */}
          <button
            type="button"
            onClick={() => {
              if (messages.length <= 1) return;
              if (window.confirm(isBangla ? "আপনি কি নিশ্চিতভাবে এই কথোপকথন মুছে ফেলতে চান?" : "Are you sure you want to clear this conversation?")) {
                clearConversation();
              }
            }}
            disabled={messages.length <= 1}
            title={isBangla ? "কথোপকথন মুছুন" : "Clear conversation"}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-rose-600 hover:border-rose-300 disabled:opacity-40 disabled:pointer-events-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 transition-colors shadow-xs"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ── Active Disease Context Banner (From Leaf Scanner) ───── */}
      {diseaseContext && (diseaseContext.crop || diseaseContext.diseaseName) && (
        <div className="bg-agri-50 dark:bg-agri-950/50 border-b border-agri-200/80 dark:border-agri-900/60 px-5 py-2.5 flex items-center justify-between gap-3 text-xs text-agri-900 dark:text-agri-200 animate-fadeIn">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-agri-200 dark:bg-agri-900 text-agri-700 dark:text-agri-300 flex-shrink-0">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div>
              <span className="font-bold text-agri-800 dark:text-agri-300">
                {isBangla ? "স্ক্যানকৃত ফসলের প্রসঙ্গ:" : "Leaf Scan Context:"}
              </span>{" "}
              <span>{diseaseContext.crop || "ফসল"}</span> &bull;{" "}
              <span className="font-semibold">{diseaseContext.diseaseName}</span>
              {diseaseContext.confidence && (
                <span className="ml-1 text-[11px] opacity-80">({diseaseContext.confidence}% মিল)</span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={clearDiseaseContext}
            className="text-agri-600 hover:text-agri-800 dark:text-agri-400 dark:hover:text-agri-200 p-1"
            title="প্রসঙ্গ মুছে ফেলুন"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ── Message Stream ────────────────────────────────────────── */}
      <div
        ref={chatScrollContainerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 scroll-smooth"
      >
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} animate-fadeIn`}
            >
              {!isUser && (
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-agri-100 text-agri-700 dark:bg-agri-950 dark:text-agri-300 flex-shrink-0 mt-1 shadow-xs">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`group relative max-w-[88%] sm:max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? "bg-agri-600 text-white rounded-br-xs shadow-md shadow-agri-600/10"
                    : msg.isError
                    ? "bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200 rounded-bl-xs border border-rose-200 dark:border-rose-900"
                    : "bg-slate-50/90 text-slate-800 dark:bg-slate-800/90 dark:text-slate-200 rounded-bl-xs border border-slate-200/80 dark:border-slate-700/80 shadow-xs"
                }`}
              >
                {/* Message Body */}
                {isUser ? (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <SafeMarkdown content={msg.content} />
                )}

                {/* Footer Meta & Actions */}
                <div className="mt-2.5 pt-2 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-700/60 text-[10px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span>{msg.timestamp}</span>
                    {msg.provider && !isUser && (
                      <span className="flex items-center gap-1 font-mono uppercase text-[9px] bg-slate-200/60 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">
                        <Cpu className="h-2.5 w-2.5" />
                        {msg.provider}
                      </span>
                    )}
                  </div>

                  {!isUser && (
                    <div className="flex items-center gap-2">
                      {msg.isError ? (
                        <button
                          type="button"
                          onClick={retryLastMessage}
                          className="flex items-center gap-1 text-rose-600 hover:text-rose-700 dark:text-rose-400 font-semibold"
                        >
                          <RotateCcw className="h-3 w-3" />
                          <span>{isBangla ? "পুনরায় চেষ্টা" : "Retry"}</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleCopy(msg.content, msg.id)}
                          className="flex items-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                          title="উত্তর কপি করুন"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-600" />
                              <span className="text-emerald-600 font-semibold">কপি হয়েছে!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>কপি</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {isUser && (
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white flex-shrink-0 mt-1 shadow-xs">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Generating Animation */}
        {isGenerating && (
          <div className="flex items-center gap-3 animate-fadeIn">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-agri-100 text-agri-700 dark:bg-agri-950 dark:text-agri-300">
              <Bot className="h-4 w-4" />
            </div>
            <div className="rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-800 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
              <span className="h-2 w-2 rounded-full bg-agri-500 animate-bounce" />
              <span
                className="h-2 w-2 rounded-full bg-agri-500 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
              <span
                className="h-2 w-2 rounded-full bg-agri-500 animate-bounce"
                style={{ animationDelay: "0.4s" }}
              />
              <span className="ml-1 font-medium">
                {isBangla ? "এআই কৃষি পরামর্শ তৈরি হচ্ছে..." : "AI analyzing agricultural data..."}
              </span>
            </div>
          </div>
        )}

        </div>

      {/* ── Suggested Question Chips Bar ──────────────────────────── */}
      <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 p-2.5 dark:bg-slate-900/70 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap pl-2">
            {isBangla ? "পরামর্শমূলক প্রশ্ন:" : "Suggested:"}
          </span>
          {suggestedChips.map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => sendMessage(chip.prompt)}
              disabled={isGenerating}
              className="whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-agri-500 hover:text-agri-700 hover:bg-agri-50/50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-agri-600 dark:hover:bg-slate-700 transition-colors shadow-xs disabled:opacity-50"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Input Box & Send Bar ──────────────────────────────────── */}
      <div className="border-t border-slate-100 bg-white p-3.5 sm:p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-end gap-2.5">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isBangla
                ? "ফসলের রোগবালাই, সার প্রয়োগ, সেচ বা চাষাবাদ নিয়ে যেকোনো প্রশ্ন লিখুন... (Enter চাপলে সেন্ড হবে)"
                : "Ask about crop diseases, pest remedies, fertilizer doses, or cultivation... (Press Enter to send)"
            }
            className="flex-1 max-h-32 min-h-[46px] resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-agri-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white placeholder:text-slate-400 leading-relaxed"
          />

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => sendMessage()}
            disabled={!input.trim() || isGenerating}
            className="rounded-2xl px-5 h-[46px] flex items-center justify-center shadow-lg"
          >
            <Send className="h-4 w-4 mr-1.5" />
            <span className="hidden sm:inline">{isBangla ? "পাঠান" : "Send"}</span>
          </Button>
        </div>

        {/* Disclaimer Footer */}
        <p className="mt-2 text-[10px] text-center text-slate-400 dark:text-slate-500">
          {isBangla
            ? "⚠️ বিজ্ঞপ্তি: এআই পরামর্শ প্রাথমিক নির্দেশনামূলক। মারাত্মক বা জটিল সমস্যার ক্ষেত্রে নিকটস্থ উপজেলা কৃষি কর্মকর্তা (SAAO)-এর পরামর্শ নিন।"
            : "Product Note: AI advice is for preliminary guidance. Consult local agricultural officers for severe infestations."}
        </p>
      </div>
    </div>
  );
};
