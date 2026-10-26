import { SupportedLanguage } from "./types";

const BANGLA_UNICODE_REGEX = /[\u0980-\u09FF]/;

// Common Romanized Bangla / Banglish keywords
const BANGLISH_INDICATORS = new Set([
  "amar", "amr", "apnar", "apnr", "tumi", "tmi", "ami", "amader",
  "gach", "gaach", "gache", "pata", "patay", "patar", "poka", "pokar",
  "dhan", "dhane", "dhaner", "alu", "alute", "alut", "aluer",
  "begun", "beguner", "tomato", "tomator", "morich", "shosha",
  "aam", "aamer", "lichu", "lichur", "garlic", "roshun", "peyaj", "pepe", "kola",
  "shitkale", "sheetkale", "gorshe", "borshay", "robi",
  "rog", "roog", "shomossha", "problem", "somossa",
  "holud", "badami", "kalo", "shukay", "shukiye", "sukay", "sukiye",
  "curl", "kokrano", "kokre", "dag", "daag",
  "ki", "kivabe", "kemne", "kono", "kon", "konta",
  "korbo", "krbo", "korte", "krte", "hobe", "hbe", "hocche", "hsse", "hoise",
  "ase", "ache", "nai", "geche", "lagse", "dibo", "dite", "chai", "chaichhi", "chassi",
  "sar", "shar", "oshudh", "osudh", "kitnashok", "pani", "shech",
  "valovabe", "bhalo", "balo", "khete", "jomi", "jomite", "chash", "chashe", "chaash", "chassh", "chashh"
]);

export interface LanguageAnalysisResult {
  detectedLanguage: "bn" | "en" | "banglish";
  targetResponseLanguage: "bn" | "en" | "banglish";
  hasExplicitLanguageCommand?: boolean;
}

/**
 * Detect language from text and user preference
 */
export function analyzeLanguage(
  text: string,
  userPreference: SupportedLanguage = "auto"
): LanguageAnalysisResult {
  const clean = text.trim();
  const lower = clean.toLowerCase();

  // 1. Check for explicit user language change commands
  if (
    lower.includes("english e bolo") ||
    lower.includes("in english") ||
    lower.includes("reply in english") ||
    lower.includes("speak in english") ||
    lower.includes("english please")
  ) {
    return {
      detectedLanguage: "en",
      targetResponseLanguage: "en",
      hasExplicitLanguageCommand: true,
    };
  }

  if (
    lower.includes("banglay bolo") ||
    lower.includes("bangla e bolo") ||
    lower.includes("বাংলায় বলুন") ||
    lower.includes("বাংলায় বল") ||
    lower.includes("in bangla") ||
    lower.includes("reply in bangla")
  ) {
    return {
      detectedLanguage: "bn",
      targetResponseLanguage: "bn",
      hasExplicitLanguageCommand: true,
    };
  }

  if (
    lower.includes("banglish e bolo") ||
    lower.includes("banglish please") ||
    lower.includes("romanized bangla")
  ) {
    return {
      detectedLanguage: "banglish",
      targetResponseLanguage: "banglish",
      hasExplicitLanguageCommand: true,
    };
  }

  // 2. Detect script
  let detected: "bn" | "en" | "banglish" = "en";

  if (BANGLA_UNICODE_REGEX.test(clean)) {
    // If it has substantial Bangla Unicode characters
    detected = "bn";
  } else {
    // Check if it's Romanized Bangla (Banglish) vs pure English
    const words = lower.replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
    let banglishMatchCount = 0;

    for (const w of words) {
      if (BANGLISH_INDICATORS.has(w)) {
        banglishMatchCount++;
      }
    }

    if (banglishMatchCount >= 1 || (words.length > 0 && banglishMatchCount / words.length >= 0.2)) {
      detected = "banglish";
    } else {
      detected = "en";
    }
  }

  // 3. Resolve target response language based on user preference
  let targetResponse: "bn" | "en" | "banglish" = "bn";

  if (userPreference === "bn") {
    targetResponse = "bn";
  } else if (userPreference === "en") {
    targetResponse = "en";
  } else if (userPreference === "banglish") {
    targetResponse = "banglish";
  } else {
    // "auto" mode
    if (detected === "en") {
      targetResponse = "en";
    } else if (detected === "bn") {
      targetResponse = "bn";
    } else {
      // Banglish defaults to natural easy Bangla script, as requested in prompt:
      // "Banglish question -> preferably answer in easy Bangla script, unless user requests English or Romanized Bangla"
      targetResponse = "bn";
    }
  }

  return {
    detectedLanguage: detected,
    targetResponseLanguage: targetResponse,
  };
}
