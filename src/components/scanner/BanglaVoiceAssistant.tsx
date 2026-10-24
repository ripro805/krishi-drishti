"use client";

import React, { useState, useEffect, useRef } from "react";
import { DiseaseInfo } from "@/types/disease";
import { Volume2, Play, Pause, Square, Sparkles, Cloud, Monitor } from "lucide-react";
import { Button } from "@/components/common/Button";

interface BanglaVoiceAssistantProps {
  disease: DiseaseInfo;
  cropName: string;
  confidence: number;
}

export const BanglaVoiceAssistant: React.FC<BanglaVoiceAssistantProps> = ({
  disease,
  cropName,
  confidence,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(0.95);
  const [engineType, setEngineType] = useState<"browser" | "server">("browser");
  const [hasCheckedVoices, setHasCheckedVoices] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // Construct clear, respectful Bangla spoken script for farmers
  const generateSpokenScript = (): string => {
    const banglaCrop = disease.banglaCrop || cropName;
    const banglaDisease = disease.banglaName || disease.commonName;
    const roundedConf = Math.round(confidence);

    let script = `কৃষি দৃষ্টি বাংলা সহকারী। আপনার ${banglaCrop} ফসলের পাতার ছবিতে ${banglaDisease} শনাক্ত হয়েছে। `;
    script += `শনাক্তকরণের নিশ্চয়তা প্রায় ${roundedConf} শতাংশ। `;

    if (disease.banglaSummary) {
      script += `${disease.banglaSummary} `;
    }

    if (disease.banglaSymptoms && disease.banglaSymptoms.length > 0) {
      script += `রোগের প্রধান লক্ষণগুলো হলো: ${disease.banglaSymptoms.slice(0, 3).join(", ")}। `;
    }

    if (disease.banglaTreatment?.managementAdvice && disease.banglaTreatment.managementAdvice.length > 0) {
      script += `জরুরি ব্যবস্থাপনার পরামর্শ: ${disease.banglaTreatment.managementAdvice.slice(0, 2).join(", ")}। `;
    }

    if (disease.isLowConfidenceWarning || confidence < 75) {
      script += `সতর্কতা: এই ফলাফলটি পুরোপুরি নিশ্চিত নয়। কোনো কীটনাশক দেওয়ার আগে অবশ্যই স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন। `;
    } else {
      script += `মনে রাখবেন, কোনো রাসায়নিক বা কীটনাশক অনুমান করে প্রয়োগ করবেন না। অনুমোদিত মাত্রা মেনে চলুন।`;
    }

    return script;
  };

  // Check voice availability on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkAvailableVoices = () => {
      if (!("speechSynthesis" in window)) {
        setEngineType("server");
        setHasCheckedVoices(true);
        return;
      }

      const voices = window.speechSynthesis.getVoices();
      const bnVoice = voices.find((v) => v.lang.toLowerCase().includes("bn"));
      if (bnVoice) {
        setEngineType("browser");
      } else {
        // Fall back to server-side Google TTS audio streaming if no Bengali voice is found
        setEngineType("server");
      }
      setHasCheckedVoices(true);
    };

    checkAvailableVoices();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = checkAvailableVoices;
    }

    return () => {
      stopAllAudio();
    };
  }, []);

  const stopAllAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
      audioElementRef.current = null;
    }
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handlePlayServerAudio = (script: string) => {
    if (audioElementRef.current && isPaused) {
      audioElementRef.current.play();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    stopAllAudio();

    const audioUrl = `/api/tts?text=${encodeURIComponent(script)}`;
    const audio = new Audio(audioUrl);
    audio.playbackRate = playbackRate;

    audio.onplay = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    audio.onended = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    audio.onerror = (e) => {
      console.warn("[VoiceAssistant] Server audio stream error:", e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    audioElementRef.current = audio;
    audio.play().catch((err) => {
      console.warn("[VoiceAssistant] Auto-play prevented or error:", err);
      setIsPlaying(false);
      setIsPaused(false);
    });
  };

  const handlePlayBrowserSpeech = (script: string) => {
    if (isPaused && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    stopAllAudio();

    const utterance = new SpeechSynthesisUtterance(script);
    const voices = window.speechSynthesis.getVoices();
    const bnVoice = voices.find((v) => v.lang.toLowerCase().includes("bn"));
    if (bnVoice) {
      utterance.voice = bnVoice;
    }
    utterance.lang = "bn-BD";
    utterance.rate = playbackRate;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      if (e.error !== "canceled" && e.error !== "interrupted") {
        console.warn("[VoiceAssistant] Browser speech error, switching to server audio fallback:", e);
        setEngineType("server");
        handlePlayServerAudio(script);
      } else {
        setIsPlaying(false);
        setIsPaused(false);
      }
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePlay = () => {
    const script = generateSpokenScript();
    if (engineType === "browser" && typeof window !== "undefined" && "speechSynthesis" in window) {
      handlePlayBrowserSpeech(script);
    } else {
      handlePlayServerAudio(script);
    }
  };

  const handlePause = () => {
    if (engineType === "browser" && typeof window !== "undefined" && "speechSynthesis" in window) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        setIsPaused(true);
        setIsPlaying(false);
      }
    } else if (audioElementRef.current) {
      audioElementRef.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    stopAllAudio();
  };

  const handleSpeedToggle = () => {
    const nextRate = playbackRate === 0.95 ? 1.15 : playbackRate === 1.15 ? 0.8 : 0.95;
    setPlaybackRate(nextRate);
    if (audioElementRef.current) {
      audioElementRef.current.playbackRate = nextRate;
    }
    if (isPlaying) {
      handleStop();
    }
  };

  return (
    <div className="rounded-2xl border-2 border-emerald-200/80 bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 p-4 sm:p-5 dark:border-emerald-900/60 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-slate-900 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Info & Indicator */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
            <Volume2 className={`h-6 w-6 ${isPlaying ? "animate-pulse" : ""}`} />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                বাংলা ভয়েস অ্যাসিস্ট্যান্ট (অডিও পরামর্শ)
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-500/30">
                <Sparkles className="h-3 w-3" />
                Bangla Voice
              </span>

              {/* Engine Source Badge */}
              {hasCheckedVoices && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/80 dark:bg-slate-800 px-2 py-0.5 text-[9px] font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {engineType === "browser" ? (
                    <>
                      <Monitor className="h-2.5 w-2.5 text-emerald-600" />
                      <span>ডিভাইস স্পিচ (Browser TTS)</span>
                    </>
                  ) : (
                    <>
                      <Cloud className="h-2.5 w-2.5 text-teal-600" />
                      <span>ক্লাউড বাংলা অডিও (Server Fallback)</span>
                    </>
                  )}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              {isPlaying
                ? "শব্দ শুনুন: ফলাফল ও জরুরি পরামর্শ বাংলায় পড়ে শোনানো হচ্ছে..."
                : isPaused
                ? "অডিও সাময়িক থামানো হয়েছে (Paused)"
                : "লেখা পড়তে অসুবিধা হলে বোতাম চেপে পুরো পরামর্শ অডিওতে শুনুন"}
            </p>
          </div>
        </div>

        {/* Right: Audio Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Wave animation bars when playing */}
          {isPlaying && (
            <div className="hidden md:flex items-center gap-0.5 h-6 px-2 bg-emerald-100/70 dark:bg-emerald-900/50 rounded-lg">
              <span className="w-1 h-3 bg-emerald-600 animate-pulse rounded-full"></span>
              <span className="w-1 h-5 bg-emerald-600 animate-pulse delay-75 rounded-full"></span>
              <span className="w-1 h-2 bg-emerald-600 animate-pulse delay-150 rounded-full"></span>
              <span className="w-1 h-4 bg-emerald-600 animate-pulse delay-100 rounded-full"></span>
            </div>
          )}

          {/* Speed Toggle */}
          <button
            type="button"
            onClick={handleSpeedToggle}
            className="rounded-xl border border-emerald-300/60 bg-white/80 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-emerald-100/50 dark:border-emerald-800 dark:bg-slate-800 dark:text-slate-200"
            title="গতি পরিবর্তন করুন"
          >
            গতি: {playbackRate}x
          </button>

          {/* Play / Pause Toggle Button */}
          {!isPlaying ? (
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handlePlay}
              className="bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/30"
            >
              <Play className="h-4 w-4 mr-1.5 fill-current" />
              {isPaused ? "চালিয়ে যান (Resume)" : "বাংলায় শুনুন (Play)"}
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePause}
              className="border-amber-400 bg-amber-50 text-amber-900 hover:bg-amber-100 dark:border-amber-700 dark:bg-amber-950/60 dark:text-amber-200"
            >
              <Pause className="h-4 w-4 mr-1.5 fill-current" />
              থামান (Pause)
            </Button>
          )}

          {/* Stop Button */}
          {(isPlaying || isPaused) && (
            <Button
              type="button"
              variant="soft"
              size="sm"
              onClick={handleStop}
              className="text-rose-700 hover:bg-rose-100 dark:text-rose-300 dark:hover:bg-rose-950"
              title="সম্পূর্ণ বন্ধ করুন"
            >
              <Square className="h-4 w-4 fill-current" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
