"use client";

import React, { Suspense, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCropDoctor } from "@/hooks/useCropDoctor";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import {
  Bot,
  Send,
  User,
  Sparkles,
  ShieldAlert,
  Leaf,
  FlaskConical,
  MessageSquare,
} from "lucide-react";

function CropDoctorContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("prompt");
  const { messages, input, setInput, isTyping, sendMessage, quickPrompts } =
    useCropDoctor(initialQuery);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="py-10 sm:py-14 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <Badge variant="success" size="md">
          <Sparkles className="h-3.5 w-3.5" />
          Autonomous Agricultural Agronomist
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Crop Doctor AI Assistant
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Get real-time agronomic guidance, organic treatment recipes, chemical safety intervals, and fertilizer schedules.
        </p>
      </div>

      {/* Main Chat Console */}
      <div className="flex flex-col h-[700px] rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        {/* Chat Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-agri-600 to-agri-500 text-white shadow-sm">
              <Bot className="h-5 w-5" />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-900" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                KrishiDrishti Crop Doctor
              </h2>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                Online &bull; Agricultural Pathology Knowledgebase
              </p>
            </div>
          </div>
          <Badge variant="outline" size="sm">
            GPT-4 Vision / ConvNeXt Model
          </Badge>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} animate-fadeIn`}
              >
                {!isUser && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-agri-100 text-agri-700 dark:bg-agri-950 dark:text-agri-300 flex-shrink-0 mt-1">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? "bg-agri-600 text-white rounded-br-xs shadow-md"
                      : "bg-slate-100/80 text-slate-800 dark:bg-slate-800 dark:text-slate-200 rounded-bl-xs border border-slate-200/50 dark:border-slate-700/50"
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Suggested Products Card */}
                  {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Prescribed Agchem & Bio Solutions:
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {msg.suggestedProducts.map((p, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between rounded-xl bg-white p-2.5 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 shadow-xs"
                          >
                            <div className="flex items-center gap-2">
                              {p.type === "organic" ? (
                                <Leaf className="h-3.5 w-3.5 text-agri-600" />
                              ) : (
                                <FlaskConical className="h-3.5 w-3.5 text-blue-600" />
                              )}
                              <span className="font-semibold">{p.name}</span>
                            </div>
                            <span className="text-[11px] font-mono text-slate-500">
                              {p.dosage}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <span
                    className={`block mt-2 text-[10px] text-right ${
                      isUser ? "text-agri-200" : "text-slate-400"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {isUser && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white flex-shrink-0 mt-1">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-agri-100 text-agri-700 dark:bg-agri-950 dark:text-agri-300">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-800 flex items-center gap-1.5 text-xs text-slate-500">
                <span className="h-2 w-2 rounded-full bg-agri-500 animate-bounce" />
                <span
                  className="h-2 w-2 rounded-full bg-agri-500 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className="h-2 w-2 rounded-full bg-agri-500 animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
                <span className="ml-2 font-mono">Analyzing pathology database...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 p-3 dark:bg-slate-900/50 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap pl-2">
              Suggested Queries:
            </span>
            {quickPrompts.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => sendMessage(q.prompt)}
                className="whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-agri-500 hover:text-agri-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors shadow-xs"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about crop diseases, organic remedies, fungicide dosages, or fertilizer..."
            className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-agri-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!input.trim() || isTyping}
            className="rounded-2xl px-5"
          >
            <Send className="h-4 w-4 mr-1.5" />
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function CropDoctorPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading Crop Doctor AI...</div>}>
      <CropDoctorContent />
    </Suspense>
  );
}
