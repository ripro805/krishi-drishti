# 🤖 KrishiDrishti Crop Doctor AI Chatbot Subsystem

This module serves as the agricultural agronomist chatbot and decision-support advisor.

---

## 🌾 Capabilities

- **Bilingual Dialogue**: Bangla & English conversational fluency tailored to Bangladeshi farmers and agricultural extension officers.
- **RAG Architecture**: Retrieval-Augmented Generation indexing:
  - BARI & BRRI crop protection handbooks.
  - OMRI-listed organic remediation recipes.
  - National fungicide & pesticide registration schedules.
- **Agronomic Safety Guards**:
  - Never hallucinate chemical doses or toxic cocktails.
  - Enforce Pre-Harvest Intervals (PHI) for consumer safety.
  - Mandatory disclaimer when severe infestations require on-field Extension Officer inspection.

---

## 📡 API Contract (Crop Doctor Conversation Service)

### Request (`POST /api/v1/chatbot/message`):
```json
{
  "message": "টমেটো গাছের নিচের পাতায় গোল গোল কালো দাগ দেখা দিয়েছে, কী করব?",
  "cropContext": "Tomato",
  "history": [
    { "sender": "user", "text": "নমস্কার" },
    { "sender": "assistant", "text": "নমস্কার! আপনার ফসলে কী সমস্যা দেখতে পাচ্ছেন?" }
  ]
}
```

### Response:
```json
{
  "reply": "আপনার বর্ণনামতে এটি টমেটোর আগাম ধসা (Early Blight) হতে পারে। অবিলম্বে নিচের আক্রান্ত পাতাগুলো ছেঁটে পুড়িয়ে ফেলুন এবং কপার অক্সিক্লোরাইড স্প্রে করুন।",
  "suggestedProducts": [
    {
      "name": "Amistar Top",
      "type": "chemical",
      "dosage": "১ মিলি / লিটার পানি"
    }
  ],
  "quickActions": [
    "জৈব ছত্রাকনাশকের নিয়ম",
    "স্প্রে করার সঠিক সময়"
  ]
}
```
