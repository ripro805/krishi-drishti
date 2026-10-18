import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Crop Disease Detection - AI Plant Disease Identification with 98% Accuracy",
  description:
    "Identify 200+ plant and crop diseases using AI powered image analysis. Professional agricultural pathology tools for disease diagnosis with 98% accuracy.",
  keywords: [
    "crop disease detection",
    "plant disease identification",
    "agricultural pathology",
    "AI plant analysis",
    "plant disease scanner",
    "crop protection technology",
    "agricultural diagnostic tools",
    "plant disease ai",
    "crop disease ai",
  ],
  authors: [{ name: "Crop Disease Detection Team • KrishiDrishti" }],
  openGraph: {
    title: "Crop Disease Detection - AI Plant Disease Identification",
    description:
      "Identify 200+ plant diseases with 98% accuracy using AI-powered image analysis for agricultural professionals.",
    type: "website",
    siteName: "Crop Disease Detection",
    url: "https://cropdiseasedetection.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crop Disease Detection - AI Plant Disease Identification",
    description:
      "Identify 200+ plant diseases with 98% accuracy using AI-powered image analysis for agricultural professionals.",
    site: "@CropDiseaseAI",
    creator: "@CropDiseaseAI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Crop Disease Detection",
    description:
      "Professional plant disease identification with 98% accuracy. Specialized AI platform for identifying 200+ plant diseases instantly.",
    url: "https://cropdiseasedetection.com",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    author: {
      "@type": "Organization",
      name: "Crop Disease Detection",
      url: "https://cropdiseasedetection.com",
    },
    areaServed: "Worldwide",
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#fafbf9] text-slate-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
