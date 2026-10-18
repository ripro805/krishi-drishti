export interface ChatMessage {
  id: string;
  sender: "user" | "assistant" | "system";
  text: string;
  timestamp: string;
  attachments?: {
    type: "image" | "prescription" | "badge";
    content: string;
  }[];
  quickActions?: string[];
  suggestedProducts?: {
    name: string;
    type: "organic" | "chemical" | "biofertilizer";
    dosage: string;
  }[];
}

export interface QuickPrompt {
  id: string;
  label: string;
  prompt: string;
  iconName: string;
}
