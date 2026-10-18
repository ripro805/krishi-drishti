"use client";

import { useState, useCallback } from "react";
import { ChatMessage, QuickPrompt } from "@/types/chat";

export const DEFAULT_QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: "p1",
    label: "Prevent Early Blight",
    prompt: "How can I prevent early blight from spreading on my tomato plants organically?",
    iconName: "Shield",
  },
  {
    id: "p2",
    label: "Late Blight Emergency",
    prompt: "My potato leaves have dark water-soaked lesions and white fuzz underneath. Is it Late Blight?",
    iconName: "AlertTriangle",
  },
  {
    id: "p3",
    label: "Dosage & Spray Schedule",
    prompt: "What is the recommended dilution and spraying schedule for copper fungicide?",
    iconName: "Droplet",
  },
  {
    id: "p4",
    label: "Yellow Leaves Diagnosis",
    prompt: "Why are my bottom tomato leaves turning yellow with brown concentric rings?",
    iconName: "Leaf",
  },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-init",
    sender: "assistant",
    text: "Hello! I am Crop Doctor AI, your 24/7 senior agricultural pathologist and farming assistant. Upload a leaf scan or describe your plant symptoms, pest problems, or soil issues. How can I assist your harvest today?",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    quickActions: [
      "Diagnose Tomato Early Blight",
      "Organic Fungicide Recipes",
      "Urea Fertilizer Timing",
      "Pest Control Guidelines",
    ],
  },
];

export function useCropDoctor(initialPrompt?: string | null) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (initialPrompt) {
      return [
        ...INITIAL_MESSAGES,
        {
          id: "msg-prompt",
          sender: "user",
          text: initialPrompt,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        generateAssistantResponse(initialPrompt),
      ];
    }
    return INITIAL_MESSAGES;
  });

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI agronomist inference time
    setTimeout(() => {
      const reply = generateAssistantResponse(text);
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1200);
  }, [input]);

  return {
    messages,
    input,
    setInput,
    isTyping,
    sendMessage,
    quickPrompts: DEFAULT_QUICK_PROMPTS,
  };
}

function generateAssistantResponse(query: string): ChatMessage {
  const q = query.toLowerCase();
  let responseText = "";
  let products: ChatMessage["suggestedProducts"] = [];

  if (q.includes("early blight") || q.includes("alternaria")) {
    responseText = `**Early Blight (*Alternaria solani*) Treatment Protocol:**\n\n1. **Immediate Cultural Action:** Prune and destroy all infected foliage up to 12 inches from ground level. Never overhead water; switch immediately to root-zone drip irrigation to halt spore splashing.\n2. **Organic Bio-Fungicide:** Spray Liquid Copper Octanoate or *Bacillus amyloliquefaciens* (strain D747) every 7-10 days, coating both top and bottom of leaves.\n3. **Conventional Agchem:** For severe outbreaks, apply Chlorothalonil (1.5-2.0 pt/acre) or Azoxystrobin (Quadris Top). Always adhere to the 0-day Pre-Harvest Interval (PHI).`;
    products = [
      { name: "Liquid Copper Octanoate", type: "organic", dosage: "25ml / gallon water" },
      { name: "Bacillus Bio-Fungicide", type: "organic", dosage: "2 tsp / gallon water" },
      { name: "Chlorothalonil 54%", type: "chemical", dosage: "15ml / 10L sprayer" },
    ];
  } else if (q.includes("late blight") || q.includes("phytophthora")) {
    responseText = `⚠️ **Critical Alert: Late Blight (*Phytophthora infestans*) Detected**\n\nLate blight is an aggressive water mold capable of destroying entire potato/tomato fields in 7 to 10 days.\n\n- **Containment:** Quarantine infected zone. Pull and deeply bury heavily diseased plants.\n- **Preventive Rows:** Spray systemic translaminar fungicides (Mandipropamid/Revus or Cymoxanil + Mancozeb) across adjacent healthy rows.\n- **Storage Warning:** Do not harvest tubers during wet conditions to prevent zoospores washing down into soil fissures.`;
    products = [
      { name: "Mandipropamid (Revus)", type: "chemical", dosage: "8.0 fl oz / acre" },
      { name: "Bordeaux Mixture 10-10-100", type: "organic", dosage: "Preventative foliar spray" },
    ];
  } else if (q.includes("copper") || q.includes("spray schedule") || q.includes("fungicide")) {
    responseText = `**Copper Fungicide Best Practice Guidelines:**\n\n- **Dilution:** Typically 15ml to 30ml per gallon of clean water (refer to specific product label).\n- **Timing:** Apply early in the morning or late evening when temperature is below 28°C (82°F) to avoid phytotoxic leaf scorch.\n- **Frequency:** Reapply every 7 to 10 days, or immediately following heavy rain (>1 inch).\n- **Safety:** Copper is toxic to sheep and aquatic organisms; maintain a 15-meter buffer from open water canals.`;
    products = [
      { name: "Copper Hydroxide 50% WP", type: "chemical", dosage: "2.0 kg / hectare" },
      { name: "Clarified Neem Oil Extract", type: "organic", dosage: "5ml / liter water" },
    ];
  } else if (q.includes("yellow") || q.includes("nitrogen") || q.includes("fertilizer")) {
    responseText = `**Foliar Yellowing Diagnostic:**\n\n- **Lower Leaves Yellowing Uniformly:** Classic Nitrogen (N) deficiency. Apply top-dressing Urea in a ring 2 inches from plant base, or spray 1% Urea solution on foliage for fast greening.\n- **Interveinal Yellowing (Green veins, yellow tissue):** Magnesium (Mg) or Iron deficiency. Apply Epsom salts (Magnesium sulfate) at 10g per liter water.\n- **Yellow Halos Around Spots:** Indicates active fungal or bacterial infection. Inspect closely with our AI Leaf Scanner!`;
    products = [
      { name: "Neem Coated Urea (46% N)", type: "chemical", dosage: "Refer to Dosage Calculator" },
      { name: "Epsom Salt (MgSO4)", type: "biofertilizer", dosage: "10g / liter foliar" },
    ];
  } else {
    responseText = `Thank you for consulting Crop Doctor AI. Based on your inquiry regarding **"${query}"**:\n\n1. **Scouting:** Closely inspect leaf margins, undersides, and stem junctions for early mycelium, pustules, or insect eggs.\n2. **Prevention:** Maintain proper plant spacing (minimum 24 inches for Solanaceae) and clean weeds within 1 meter of the crop bed.\n3. **Diagnostic Scan:** Capture a clear photo of the symptomatic leaf with our **AI Leaf Scanner** for an instant 98% accurate pathology breakdown and customized prescription.`;
    products = [
      { name: "Multi-Spectrum Bio-Protectant", type: "organic", dosage: "Standard label rate" },
    ];
  }

  return {
    id: `asst-${Date.now()}`,
    sender: "assistant",
    text: responseText,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    suggestedProducts: products,
  };
}
