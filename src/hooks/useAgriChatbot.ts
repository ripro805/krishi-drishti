"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { SupportedLanguage, DiseaseDetectionContext } from "@/lib/ai/types";

export interface ChatMessageDisplay {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  provider?: string;
  model?: string;
  isError?: boolean;
}

export const SUGGESTED_CHIPS = [
  { id: "s1", label: "ধানের পাতায় দাগ কেন হয়?", prompt: "ধানের পাতায় বাদামি দাগ কেন হয় এবং প্রতিকার কী?" },
  { id: "s2", label: "টমেটোর পাতা কুঁকড়ে যাচ্ছে", prompt: "টমেটো গাছের পাতা কুঁকড়ে যাচ্ছে কেন? কী সার বা ওষুধ দিব?" },
  { id: "s3", label: "ধান চাষে কোন সার দিব?", prompt: "ধান চাষে ইউরিয়া, ডিএপি ও পটাশ সার দেওয়ার সঠিক নিয়ম ও সময় কী?" },
  { id: "s4", label: "How to identify plant diseases?", prompt: "How can I easily identify fungal vs bacterial plant diseases?" },
  { id: "s5", label: "dhan er pata holud hole ki korbo?", prompt: "dhan gacher pata holud hoye jacche, ki shomossha hote pare?" },
  { id: "s6", label: "আলুর আগাম ও নাবী ধসা", prompt: "আলুর আগাম ধসা (Early Blight) ও নাবী ধসার (Late Blight) পার্থক্য এবং জৈব দমন পদ্ধতি কী?" },
];

const STORAGE_PREFIX = "krishi_chat_history_";

export function useAgriChatbot(initialContext?: {
  initialPrompt?: string | null;
  crop?: string | null;
  disease?: string | null;
  confidence?: string | null;
}) {
  const [conversationId, setConversationId] = useState<string>(() => {
    return `conv-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  });

  const [languagePreference, setLanguagePreference] = useState<SupportedLanguage>("auto");
  const [messages, setMessages] = useState<ChatMessageDisplay[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);

  const [diseaseContext, setDiseaseContext] = useState<DiseaseDetectionContext | undefined>(() => {
    if (initialContext?.crop || initialContext?.disease) {
      return {
        crop: initialContext.crop || undefined,
        diseaseName: initialContext.disease || undefined,
        confidence: initialContext.confidence ? parseFloat(initialContext.confidence) : undefined,
      };
    }
    return undefined;
  });

  const [providerStatus, setProviderStatus] = useState<{
    groq: boolean;
    gemini: boolean;
    openai: boolean;
    primary: string;
  }>({ groq: true, gemini: true, openai: false, primary: "auto" });

  // 1. Fetch Health & Provider Status on Mount
  useEffect(() => {
    fetch("/api/chat/health")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.providers) {
          setProviderStatus({
            groq: !!data.providers.groq,
            gemini: !!data.providers.gemini,
            openai: !!data.providers.openai,
            primary: data.primary || "auto",
          });
        }
      })
      .catch(() => {});
  }, []);

  // 2. Load LocalStorage on initial load
  useEffect(() => {
    // If arriving with fresh scan context or prompt, start fresh for this scan
    const hasIncomingContext = Boolean(initialContext?.crop || initialContext?.disease || initialContext?.initialPrompt);

    if (!hasIncomingContext) {
      try {
        const saved = localStorage.getItem(`${STORAGE_PREFIX}default`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
            return;
          }
        }
      } catch {
        // ignore
      }
    }

    // Default Welcome Message
    const welcomeMsg: ChatMessageDisplay = {
      id: "welcome-msg",
      role: "assistant",
      content: initialContext?.disease
        ? `নমস্কার! আমি **KrishiDrishti AI কৃষি সহকারী**। আপনি স্ক্যান করা **${initialContext.crop || "ফসল"}**-এর **${initialContext.disease}** রোগ সম্পর্কে জানতে চেয়েছেন। রোগ নিয়ন্ত্রণ, জৈব বা রাসায়নিক প্রতিকার, সার ও সেচ সম্পর্কে যেকোনো প্রশ্ন আমাকে করতে পারেন!`
        : `নমস্কার! আমি **KrishiDrishti AI কৃষি সহকারী** (কৃষি পরামর্শক)।\n\nধান, গম, আলু, টমেটো, শাকসবজি বা যেকোনো ফসলের রোগবালাই, পোকামাকড়, সারের সঠিক মাত্রা, সেচ বা পরিচর্যা নিয়ে প্রশ্ন করুন। বাংলা, English বা Banglish — যেকোনো ভাষায় সরাসরি লিখুন!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([welcomeMsg]);
  }, []);

  // 3. Save to LocalStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(`${STORAGE_PREFIX}default`, JSON.stringify(messages));
      } catch {
        // ignore storage errors
      }
    }
  }, [messages]);

  // 4. Initial prompt trigger (if routed from scanner result card)
  const hasTriggeredInitial = useRef(false);
  useEffect(() => {
    if (!hasTriggeredInitial.current && initialContext?.initialPrompt) {
      hasTriggeredInitial.current = true;
      sendMessage(initialContext.initialPrompt);
    }
  }, [initialContext]);

  // 5. Send Message Function
  const sendMessage = useCallback(
    async (textToSend?: string) => {
      const messageText = (textToSend !== undefined ? textToSend : input).trim();
      if (!messageText || isGenerating) return;

      const userMsg: ChatMessageDisplay = {
        id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        role: "user",
        content: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsGenerating(true);
      setLastFailedMessage(null);

      // Prepare history payload for API (role & content)
      const currentHistory = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: messageText,
            conversationId,
            languagePreference,
            history: currentHistory,
            diseaseContext,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          const assistantMsg: ChatMessageDisplay = {
            id: `asst-${Date.now()}`,
            role: "assistant",
            content: data.answer,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            provider: data.provider,
            model: data.model,
          };
          setMessages((prev) => [...prev, assistantMsg]);
        } else {
          throw new Error(data.message || data.error || "Failed to generate AI response.");
        }
      } catch (err: any) {
        setLastFailedMessage(messageText);
        const errorMsg: ChatMessageDisplay = {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: `দুঃখিত, সংযোগে সমস্যা হয়েছে: ${err.message || "সার্ভার রেসপন্স করছে না"}\n\nঅনুগ্রহ করে নিচের **"পুনরায় চেষ্টা করুন"** বাটনে চাপুন।`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isError: true,
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsGenerating(false);
      }
    },
    [input, isGenerating, messages, conversationId, languagePreference, diseaseContext]
  );

  // 6. Retry Last Failed Message
  const retryLastMessage = useCallback(() => {
    if (lastFailedMessage) {
      sendMessage(lastFailedMessage);
    }
  }, [lastFailedMessage, sendMessage]);

  // 7. Clear Conversation
  const clearConversation = useCallback(() => {
    const freshId = `conv-${Date.now().toString(36)}`;
    setConversationId(freshId);
    setLastFailedMessage(null);
    setDiseaseContext(undefined);

    const welcomeMsg: ChatMessageDisplay = {
      id: `welcome-${Date.now()}`,
      role: "assistant",
      content: `নতুন আলোচনা শুরু হয়েছে! আপনার ফসল, মাটি বা রোগবালাই সংক্রান্ত যেকোনো প্রশ্ন সরাসরি লিখুন।`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([welcomeMsg]);
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}default`);
    } catch {
      // ignore
    }
  }, []);

  // 8. Clear Disease Context Banner
  const clearDiseaseContext = useCallback(() => {
    setDiseaseContext(undefined);
  }, []);

  return {
    conversationId,
    messages,
    input,
    setInput,
    isGenerating,
    languagePreference,
    setLanguagePreference,
    diseaseContext,
    clearDiseaseContext,
    providerStatus,
    suggestedChips: SUGGESTED_CHIPS,
    sendMessage,
    retryLastMessage,
    clearConversation,
    lastFailedMessage,
  };
}
