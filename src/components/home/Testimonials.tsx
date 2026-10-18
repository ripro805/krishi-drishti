import React from "react";
import { Star, Quote } from "lucide-react";
import { Badge } from "@/components/common/Badge";

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Agricultural Consultant & Pathologist",
      company: "Pacific AgriConsulting",
      quote:
        "The accuracy is remarkable. This platform has become essential for our disease identification work with commercial growers. Catching late blight within hours saved over 120 acres of prime potato crops.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: "Marcus Vance",
      role: "Commercial Greenhouse Manager",
      company: "Valley Ag Solutions",
      quote:
        "The dual organic and chemical treatment plans make this tool unique. Instead of just giving a diagnostic name, it gives exact dilution rates and safety intervals that our workers can immediately execute.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: "Tariqul Islam",
      role: "Precision Farming Agronomist",
      company: "Krishi Drishti Field Extension",
      quote:
        "Integrating the ConvNeXt AI with local crop varieties has transformed early detection for rural growers. The dosage calculator alone stopped nitrogen overuse and reduced fertilizer costs by 30%.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="success" size="md">
            Verified Field Impact
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Trusted by Agronomists and Commercial Growers
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            See how agricultural consultants and farm managers rely on our AI detection engine to safeguard harvests.
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
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>

                <Quote className="h-7 w-7 text-agri-400/40 mb-3" />

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 dark:border-slate-800 pt-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {t.role} &bull; <span className="text-agri-600 dark:text-agri-400">{t.company}</span>
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
