import React from "react";
import { Check, X, Sparkles } from "lucide-react";
import { Badge } from "@/components/common/Badge";

export const ComparisonTable: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
      <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-3">
          <Badge variant="info" size="md">
            Methodology Comparison
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Traditional Inspection vs. Laboratory vs. AI Scanning
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Compare diagnostic accuracy, turnaround speed, and operational costs across agricultural disease detection methods:
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left text-sm">
                <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Diagnostic Parameter
                    </th>
                    <th scope="col" className="px-6 py-4 text-slate-500">
                      Visual Field Scouting
                    </th>
                    <th scope="col" className="px-6 py-4 text-slate-500">
                      Laboratory Assay / PCR
                    </th>
                    <th scope="col" className="px-6 py-4 bg-agri-50 dark:bg-agri-950/40 text-agri-700 dark:text-agri-300 font-extrabold border-l border-r border-agri-200 dark:border-agri-800">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-agri-600" />
                        KrishiDrishti AI
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-sm">
                  <tr>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      Diagnostic Accuracy
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      60% - 75% (Subject to human error)
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      95%+ (High chemical purity)
                    </td>
                    <td className="px-6 py-4 bg-agri-50/50 dark:bg-agri-950/20 font-bold text-emerald-600 dark:text-emerald-400 border-l border-r border-agri-200 dark:border-agri-800">
                      98.2% (Validated Benchmarks)
                    </td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      Turnaround Speed
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      Hours to days per hectare
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      3 - 7 Business Days
                    </td>
                    <td className="px-6 py-4 bg-agri-50/50 dark:bg-agri-950/20 font-bold text-emerald-600 dark:text-emerald-400 border-l border-r border-agri-200 dark:border-agri-800">
                      Instant (&lt; 3.0 Seconds)
                    </td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      Cost per Diagnosis
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      Moderate labor expense
                    </td>
                    <td className="px-6 py-4 text-rose-600 font-medium">
                      High ($75 - $250 per sample)
                    </td>
                    <td className="px-6 py-4 bg-agri-50/50 dark:bg-agri-950/20 font-bold text-emerald-600 dark:text-emerald-400 border-l border-r border-agri-200 dark:border-agri-800">
                      Free / Low marginal cost
                    </td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      Specialized Expertise
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      Requires experienced agronomist
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      Certified laboratory pathologist
                    </td>
                    <td className="px-6 py-4 bg-agri-50/50 dark:bg-agri-950/20 font-bold text-emerald-600 dark:text-emerald-400 border-l border-r border-agri-200 dark:border-agri-800">
                      Zero (Any farmer with a smartphone)
                    </td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      Immediate Treatment Guidance
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      Manual reference books
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      Report only, no treatment plan
                    </td>
                    <td className="px-6 py-4 bg-agri-50/50 dark:bg-agri-950/20 font-bold text-emerald-600 dark:text-emerald-400 border-l border-r border-agri-200 dark:border-agri-800">
                      Full Organic & Agchem Prescription
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
