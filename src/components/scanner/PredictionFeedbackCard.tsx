"use client";

import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, HelpCircle, Check, MessageSquare, Send, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/common/Button";
import { FeedbackRating } from "@/types/feedback";
import { saveFeedback } from "@/lib/storage";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/context/AuthContext";
import confetti from "canvas-confetti";

interface PredictionFeedbackCardProps {
  scanId: string;
  crop: string;
  disease: string;
  banglaDisease?: string;
  confidence: number;
}

export const PredictionFeedbackCard: React.FC<PredictionFeedbackCardProps> = ({
  scanId,
  crop,
  disease,
  banglaDisease,
  confidence,
}) => {
  const { currentUser } = useAuth();
  const [selectedRating, setSelectedRating] = useState<FeedbackRating | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showCommentBox, setShowCommentBox] = useState(false);

  const handleRatingSelect = (rating: FeedbackRating) => {
    setSelectedRating(rating);
    setShowCommentBox(true);
    setSubmitError(null);

    if (rating === "accurate") {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
        });
      } catch {
        // ignore
      }
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedRating || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await apiClient.feedback.submit({
        scanId,
        crop,
        disease,
        banglaDisease,
        confidence,
        rating: selectedRating,
        comment: comment.trim() || undefined,
        userName: currentUser ? `${currentUser.name} (${currentUser.role})` : "অতিথি ব্যবহারকারী (Guest)",
      });

      // Synchronize locally as well for offline cache
      saveFeedback({
        scanId,
        crop,
        disease,
        banglaDisease,
        confidence,
        rating: selectedRating,
        comment: comment.trim() || undefined,
        userId: currentUser?.id,
        userName: currentUser ? `${currentUser.name} (${currentUser.role})` : "অতিথি ব্যবহারকারী (Guest)",
      });

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("[PredictionFeedbackCard] Submission failed:", err);
      setSubmitError(err?.message || "ফিডব্যাক পাঠানো সম্ভব হয়নি। পুনরায় চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-agri-600" />
            ব্যবহারকারী মূল্যায়ন ও ফিডব্যাক (User Feedback)
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            এই রোগ শনাক্তকরণের ফলাফলটি কি আপনার মাঠের বাস্তব লক্ষণের সাথে সঠিক মিলেছে?
          </p>
        </div>

        {isSubmitted ? (
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
            <Check className="h-4 w-4 text-emerald-600" />
            <span>ধন্যবাদ! আপনার মূল্যবান মতামত সংরক্ষিত হয়েছে।</span>
          </div>
        ) : (
          <div className="flex items-center flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleRatingSelect("accurate")}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                selectedRating === "accurate"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500"
                  : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              হ্যাঁ, সঠিক (Accurate)
            </button>

            <button
              type="button"
              onClick={() => handleRatingSelect("inaccurate")}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                selectedRating === "inaccurate"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 ring-2 ring-rose-500"
                  : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-rose-50 hover:text-rose-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              <ThumbsDown className="h-3.5 w-3.5" />
              না, ভুল (Inaccurate)
            </button>

            <button
              type="button"
              onClick={() => handleRatingSelect("unsure")}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                selectedRating === "unsure"
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/30 ring-2 ring-amber-500"
                  : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-amber-50 hover:text-amber-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              <HelpCircle className="h-3.5 w-3.5" />
              নিশ্চিত নই (Unsure)
            </button>
          </div>
        )}
      </div>

      {/* Error banner if submission rejected */}
      {submitError && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-200 dark:border-rose-900">
          <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Optional comment field once a rating is picked */}
      {showCommentBox && !isSubmitted && (
        <form onSubmit={handleSubmit} className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 animate-fadeIn">
          <div className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={isSubmitting}
              maxLength={500}
              placeholder="আপনার মাঠের পর্যবেক্ষণ বা সঠিক রোগটি জানা থাকলে লিখুন (ঐচ্ছিক)..."
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-agri-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white disabled:opacity-50"
            />
            <Button type="submit" size="sm" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
                  সংরক্ষণ হচ্ছে...
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5 mr-1" />
                  জমা দিন (Submit)
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
