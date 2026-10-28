import fs from "fs";
import path from "path";

export interface ChatKnowledgeRecord {
  id: string;
  topic: string;
  crop?: string;
  category: "cultivation" | "disease_remedy" | "fertilizer" | "general_faq";
  question: string;
  normalizedQuery: string;
  keywords: string[];
  answer: string;
  language: "bn" | "en" | "banglish";
  hitCount: number;
  createdAt: string;
  lastUsedAt: string;
}

const STORE_FILE = path.join(process.cwd(), "src", "data", "chat_knowledge_store.json");

/**
 * Standard Seeded Cultivation Knowledge Base (চাষ পদ্ধতি ও ঘন ঘন জিজ্ঞাসিত প্রশ্নসমূহ)
 */
const SEEDED_KNOWLEDGE: ChatKnowledgeRecord[] = [
  {
    id: "CKB-MANGO-001",
    topic: "Mango Cultivation Guide (আম চাষ পদ্ধতি)",
    crop: "Mango",
    category: "cultivation",
    question: "আম চাষ কিভাবে করব / Mango chas kivabe korbo",
    normalizedQuery: "mango aam chas chash kivabe korbo podhoti",
    keywords: ["mango", "aam", "আম", "আমের", "chas", "chash", "চাষ", "রোপণ", "কিবাবে", "kivabe"],
    language: "bn",
    hitCount: 5,
    createdAt: "2026-10-01T00:00:00.000Z",
    lastUsedAt: "2026-10-28T10:00:00.000Z",
    answer: `🥭 **উন্নত জাতের আম চাষ পদ্ধতি ও পূর্ণাঙ্গ পরিচর্যা গাইডলাইন:**

১. **উপযুক্ত মাটি ও জমি নির্বাচন:**
- সুনিষ্কাশিত উর্বর দোআঁশ ও বেলে-দোআঁশ মাটি আম চাষের জন্য সবচেয়ে ভালো।
- জমিতে বৃষ্টির পানি জমে না থাকে এমন উঁচু বা মাঝারি উঁচু জমি নির্বাচন করুন। জমি ২-৩ বার গভীর চাষ ও মই দিয়ে আগাছামুক্ত করে সমান করুন।

২. **গর্ত (মাদা) তৈরি ও সার প্রয়োগ:**
- চারা রোপণের ১৫-২০ দিন পূর্বে **৩×৩ ফুট (১×১ মিটার)** আকারের গর্ত তৈরি করুন।
- গর্তের উপরের মাটির সাথে মিশিয়ে দিন:
  - পচা গোবর বা কম্পোস্ট: **১০-১৫ কেজি**
  - টিএসপি (TSP): **২৫০-৩০০ গ্রাম**
  - এমওপি (পটাশ): **২০০ গ্রাম**
  - জিপসাম: **১৫০ গ্রাম**
  - দস্তা ও বোরন: **২০-২৫ গ্রাম**
- সারমিশ্রিত মাটি দিয়ে গর্ত ভরাট করে পানি দিয়ে রাখুন যাতে সার পচে গ্যাস দূর হয়।

৩. **চারা রোপণের সময় ও দূরত্ব:**
- **সময়:** আষাঢ়-শ্রাবণ (জুন-জুলাই) এবং ভাদ্র-আশ্বিন (আগস্ট-অক্টোবর) চারা রোপণের উত্তম সময়।
- **দূরত্ব:** প্রচলিত পদ্ধতিতে ৮-১০ মিটার, আর হাই-ডেনসিটি বা আল্ট্রা হাই-ডেনসিটি (আম্রপালি, বারি আম-৪) জাতের ক্ষেত্রে **১২×১২ ফুট বা ১০×১০ ফুট** দূরত্বে রোপণ করুন।
- সুস্থ, সোজা ও অনুমোদিত নার্সারির কলম (গ্রাফটিং) চারা নির্বাচন করুন।

৪. **সেচ ও পরিচর্যা:**
- চারা রোপণের পরপরই সেচ দিন এবং বাঁশের খুঁটি দিয়ে চারা বেঁধে দিন।
- শুকনো মৌসুমে ১৫ দিন পর পর সেচ দেওয়া দরকার।
- গাছে নতুন পাতা বের হলে হপার পোকা ও অ্যানথ্রাকনোজ রোগের জন্য আগাম ছত্রাকনাশক (ম্যানকোজেব ২ গ্রাম/লিটার) ও কীটনাশক স্প্রে করুন।

৫. **মুকুল ও ফল রক্ষার টিপস:**
- মুকুল আসার সময় সেচ বন্ধ রাখুন; ফল মটরদানার মতো হলে নিয়মিত সেচ ও বোরন স্প্রে করুন ফল ঝরা রোধে।`,
  },
  {
    id: "CKB-STRAWBERRY-001",
    topic: "Strawberry Cultivation Guide (স্ট্রবেরি চাষ পদ্ধতি)",
    crop: "Strawberry",
    category: "cultivation",
    question: "স্ট্রবেরি চাষ কিভাবে করব / Strabray kivabe chas korbo",
    normalizedQuery: "strawberry strabray strawbery chas chash kivabe korbo podhoti",
    keywords: ["strawberry", "strabray", "strawbery", "স্ট্রবেরি", "স্ট্রবেরী", "chas", "chash", "চাষ", "মালচিং", "kivabe", "কিভাবে"],
    language: "bn",
    hitCount: 4,
    createdAt: "2026-10-01T00:00:00.000Z",
    lastUsedAt: "2026-10-28T10:00:00.000Z",
    answer: `🍓 **বাংলাদেশে আধুনিক স্ট্রবেরি চাষ পদ্ধতি ও ফলন বৃদ্ধির উপায়:**

১. **রোপণের সঠিক সময়:**
- বাংলাদেশে স্ট্রবেরি চাষের মোক্ষম সময় হলো **কার্তিক মাস (অক্টোবরের মাঝামাঝি থেকে নভেম্বরের প্রথম সপ্তাহ)**। ঠান্ডা আবহাওয়া স্ট্রবেরির বৃদ্ধি ও মিষ্টতার জন্য অত্যন্ত জরুরি।

২. **জমি তৈরি ও বেড প্রস্তুতকরণ:**
- দোআঁশ থেকে বেলে-দোআঁশ মাটি যেখানে প্রচুর রোদ পড়ে এমন জমি বেছে নিন।
- মাটি ৪-৫ বার চাষ দিয়ে একদম ঝুরঝুরে করতে হবে।
- **বেডের মাপ:** উচ্চতা ৮-১০ ইঞ্চি (২০-২৫ সেমি), প্রস্থ ৩ ফুট এবং দুই বেডের মাঝে ১ ফুট নালা রাখুন পানি নিষ্কাশনের জন্য।

৩. **ব্ল্যাক পলিথিন মালচিং (অপরিহার্য):**
- বেড তৈরির পর বেডের উপর কালো পলিথিন বিছিয়ে দিন।
- এতে মাটির আর্দ্রতা থাকে, আগাছা জন্মায় না এবং ফল মাটির স্পর্শে না লেগে পচন থেকে রক্ষা পায়।
- পলিথিনের উপর সারি থেকে সারি **১২ ইঞ্চি** এবং গাছ থেকে গাছ **১০-১২ ইঞ্চি** দূরত্বে গোলাকার ছিদ্র করে চারা রোপণ করুন।

৪. **সার ব্যবস্থাপনা (প্রতি শতকে):**
- পচা গোবর/ভার্মিকম্পোস্ট: **৮০-১০০ কেজি**
- টিএসপি: **১ কেজি**
- এমওপি (পটাশ): **১.২ কেজি** (ফল মিষ্টি করার জন্য পটাশ আবশ্যক)
- জিপসাম: **৫০০ গ্রাম**
- বোরন ও জিংক: **১০০ গ্রাম করে**।
- ইউরিয়া সার রোপণের ২০ ও ৪০ দিন পর কিস্তিতে গোড়া থেকে দূরে তরল আকারে প্রয়োগ করুন।

৫. **সেচ ও ফল সংগ্রহ:**
- স্ট্রবেরি গাছের শিকড় অগভীর হওয়ায় ঘন ঘন হালকা সেচ (ড্রিপ বা ঝাঝরি দিয়ে) দেওয়া উচিত।
- ফল লালচে বর্ণ ধারণ করলেই ভোরে বোঁটাসহ আলতো করে কেটে সংগ্রহ করুন।`,
  },
  {
    id: "CKB-TOMATO-001",
    topic: "Tomato Cultivation Guide (টমেটো চাষ পদ্ধতি)",
    crop: "Tomato",
    category: "cultivation",
    question: "টমেটো চাষ কিভাবে করব / Tomato chas kivabe korbo",
    normalizedQuery: "tomato chas chash kivabe korbo podhoti",
    keywords: ["tomato", "টমেটো", "টমেটোর", "chas", "chash", "চাষ", "সার", "আর্লি ব্লাইট", "kivabe"],
    language: "bn",
    hitCount: 3,
    createdAt: "2026-10-01T00:00:00.000Z",
    lastUsedAt: "2026-10-28T10:00:00.000Z",
    answer: `🍅 **টমেটো চাষ পদ্ধতি ও রোগমুক্ত বাম্পার ফলন গাইড:**

১. **চারা রোপণের সময়:**
- শীতকালীন টমেটোর জন্য কার্তিক (অক্টোবর-নভেম্বর) সেরা। গ্রীষ্মকালীন টমেটো (বারি হাইব্রিড ৪/৮) মে-আগস্টেও চাষ করা যায়।
- ৩০-৩৫ দিন বয়সের সুস্থ চারা বিকেলে রোপণ করুন।

২. **দূরত্ব ও জমি তৈরি:**
- সারি থেকে সারির দূরত্ব **২ ফুট (৬০ সেমি)** এবং চারা থেকে চারা **১.৫ ফুট (৫০ সেমি)** রাখুন।
- জমি ৪-৫ বার চাষ দিয়ে সুষম গোবর, টিএসপি, পটাশ ও জিপসাম মাটিতে মিশিয়ে বেড তৈরি করুন।

৩. **বাঁশের খুঁটি দেওয়া (Staking):**
- গাছ বাড়ার সাথে সাথে বাঁশের খুঁটি দিয়ে বেঁধে দিন যাতে ফল মাটিতে না ঠেকে। এতে আর্লি ব্লাইট ও পচন রোগ ৫০% কমে যায়।

৪. **সার ও সেচ ব্যবস্থাপনা:**
- ইউরিয়া ও পটাশ সার সমান তিন কিস্তিতে (রোপণের ১৫, ৩৫ ও ৫০ দিন পর) উপরিপ্রয়োগ করুন।
- ফুল ও ফল আসার সময় মাটিতে পর্যাপ্ত রস থাকতে হবে, তবে জমিতে পানি জমতে দেওয়া যাবে না।

৫. **রোগবালাই প্রতিরোধ:**
- পাতা কুঁকড়ানো রোগ প্রতিরোধে সাদা মাছি দমনে নিম তেল স্প্রে করুন।
- আগাম ধসা বা পাতায় দাগ পড়লে KrishiDrishti স্ক্যানারে ছবি দিয়ে ছত্রাকনাশকের সঠিক মাত্রা নিশ্চিত করুন।`,
  },
  {
    id: "CKB-POTATO-001",
    topic: "Potato Cultivation Guide (আলু চাষ পদ্ধতি)",
    crop: "Potato",
    category: "cultivation",
    question: "আলু চাষ কিভাবে করব / Potato alu chas kivabe korbo",
    normalizedQuery: "potato alu chas chash kivabe korbo podhoti",
    keywords: ["potato", "alu", "আলু", "আলুর", "বীজ", "chas", "chash", "চাষ", "নাবী ধসা", "লেট ব্লাইট", "kivabe"],
    language: "bn",
    hitCount: 3,
    createdAt: "2026-10-01T00:00:00.000Z",
    lastUsedAt: "2026-10-28T10:00:00.000Z",
    answer: `🥔 **উচ্চফলনশীল আলু চাষ পদ্ধতি ও রোগ দমন গাইড:**

১. **উপযুক্ত সময়:**
- কার্তিক মাসের মাঝামাঝি থেকে অগ্রহায়ণের প্রথম সপ্তাহ (নভেম্বরের ১-১৫ তারিখ) আলু লাগানোর সেরা সময়।

২. **বীজ আলু শোধন ও প্রস্তুতি:**
- প্রত্যয়িত রোগমুক্ত বীজ আলু ব্যবহার করুন।
- বীজ কাটার প্রয়োজন হলে প্রতিটি খণ্ডে অন্তত দুটি চোখ রাখুন। কাটার পর ছাই বা ছত্রাকনাশক (ম্যানকোজেব) দিয়ে শুকিয়ে নিন।

৩. **দূরত্ব ও রোপণ:**
- সারি থেকে সারির দূরত্ব **২০-২৪ ইঞ্চি (৫০-৬০ সেমি)** এবং বীজ থেকে বীজের দূরত্ব **৮-১০ ইঞ্চি (২০-২৫ সেমি)**।
- আলু মাটির নিচে ২-৩ ইঞ্চি গভীরে রোপণ করতে হবে।

৪. **গাছে মাটি তোলা (Earthing-up):**
- আলু গাছ ২০-২৫ দিন হলে প্রথমবার এবং ৪০-৪৫ দিন পর দ্বিতীয়বার গাছের গোড়ায় দুই পাশ থেকে মাটি তুলে উঁচু আইল তৈরি করুন। এতে কন্দে আলো পড়ে না এবং আলু সবুজ হওয়া বন্ধ হয়।

৫. **নাবী ধসা (Late Blight) সতর্কতা:**
- কুয়াশাচ্ছন্ন আবহাওয়ায় আলুর নাবী ধসা রোগ দ্রুত ছড়িয়ে পড়ে। কুয়াশার পূর্বাভাস পাওয়া মাত্রই আগাম প্রতিষেধক হিসেবে ম্যানকোজেব (ডায়থেন এম-৪৫) প্রতি লিটার পানিতে ২ গ্রাম হারে স্প্রে করুন।`,
  },
  {
    id: "CKB-RICE-001",
    topic: "Paddy & Rice Cultivation Guide (ধান চাষ ও পরিচর্যা)",
    crop: "Rice",
    category: "cultivation",
    question: "ধান চাষ কিভাবে করব / Rice dhan chas kivabe korbo",
    normalizedQuery: "rice dhan chas chash kivabe korbo podhoti",
    keywords: ["rice", "dhan", "ধান", "ধানের", "বোরো", "আমন", "chas", "chash", "চাষ", "ব্লাস্ট", "kivabe"],
    language: "bn",
    hitCount: 4,
    createdAt: "2026-10-01T00:00:00.000Z",
    lastUsedAt: "2026-10-28T10:00:00.000Z",
    answer: `🌾 **আধুনিক ধান চাষ পদ্ধতি ও ফলন সর্বোচ্চকরণের উপায়:**

১. **মৌসুম অনুযায়ী জাত নির্বাচন:**
- **বোরো মৌসুম:** ব্রি ধান ২৮, ২৯, ৮৯, ৯২ অথবা হাইব্রিড জাত।
- **আমন মৌসুম:** ব্রি ধান ৪৯, ৭৫, ৮৭, স্বর্ণা।

২. **চারা রোপণের দূরত্ব:**
- সারি থেকে সারি **৮ ইঞ্চি (২০ সেমি)** এবং গুছি থেকে গুছি **৬ ইঞ্চি (১৫ সেমি)**।
- প্রতি গুছিতে ২-৩টি পুষ্ট চারা রোপণ করুন।

৩. **সুষম সার ও ৩ কিস্তি ইউরিয়া:**
- জমি তৈরিতে সম্পূর্ণ টিএসপি/ডিএপি, জিপসাম, জিংক ও অর্ধেক পটাশ প্রয়োগ করুন।
- **ইউরিয়া ৩ কিস্তিতে:** চারা লাগানোর ১৫ দিন পর, ৩০-৩৫ দিন পর (কুশি আসার সময়) এবং ৫০-৫৫ দিন পর (কাইচ থোড় আসার ৫-৭ দিন আগে)।

৪. **পানি ব্যবস্থাপনা (AWD পদ্ধতি):**
- ধান ক্ষেতে সার্বক্ষণিক পানি জমিয়ে না রেখে এডব্লিউডি (পর্যায়ক্রমে ভেজানো ও শুকানো) পদ্ধতি ব্যবহার করুন। এতে পানির সাশ্রয় হয় এবং শিকড় মজবুত হয়।

৫. **ব্লাস্ট ও পোকা দমন:**
- শীষে ব্লাস্ট রোগ দেখা দিলে ট্রাইসাইক্লাজল (যেমন ট্রুপার) স্প্রে করুন।
- মাজরা পোকা ও পাতা মোড়ানো পোকার জন্য জমিতে ডালপালা পুঁতে পার্চিং করুন।`,
  },
  {
    id: "CKB-DRAGON-001",
    topic: "Dragon Fruit Cultivation (ড্রাগন ফল চাষ পদ্ধতি)",
    crop: "Dragon Fruit",
    category: "cultivation",
    question: "ড্রাগন ফল চাষ কিভাবে করব / Dragon fruit chas kivabe korbo",
    normalizedQuery: "dragon fruit chas chash kivabe korbo podhoti",
    keywords: ["dragon", "dragon fruit", "ড্রাগন", "ড্রাগন ফল", "chas", "chash", "চাষ", "পিলার", "kivabe"],
    language: "bn",
    hitCount: 3,
    createdAt: "2026-10-01T00:00:00.000Z",
    lastUsedAt: "2026-10-28T10:00:00.000Z",
    answer: `🐉 **ড্রাগন ফল চাষ পদ্ধতি (পিলার ও টায়ার মেথড):**

১. **মাটি ও স্থান নির্বাচন:**
- জলবদ্ধতামুক্ত উঁচু বেলে-দোআঁশ মাটি এবং সারাদিন রোদ পাওয়া যায় এমন জায়গা ড্রাগন ফলের জন্য উপযুক্ত।

২. **পিলার স্থাপন ও দূরত্ব:**
- সিমেন্টের আরসিসি পিলার (দৈর্ঘ্য ৬.৫ থেকে ৭ ফুট) ব্যবহার করুন।
- সারি থেকে সারি **১০ ফুট** এবং পিলার থেকে পিলার **৮ ফুট** দূরত্বে স্থাপন করুন।
- পিলারের মাথায় ব্যবহৃত মোটরসাইকেল বা সাইকেলের টায়ার ও রড দিয়ে ফ্রেম তৈরি করে দিন যাতে গাছ ছড়িয়ে পড়তে পারে।

৩. **কাটিং চারা রোপণ:**
- প্রতিটি পিলারের চারদিকে ৪টি করে পরিপক্ক কাটিং চারা লাগান।
- চারাগুলোকে পিলারের সাথে সুতলি দিয়ে বেঁধে দিন।

৪. **সার ও সেচ:**
- ক্যাকটাস জাতীয় গাছ হলেও গ্রীষ্মকালে নিয়মিত সেচ দিলে ফল দ্রুত বড় হয়।
- প্রতি পিলারে বছরে অন্তত ২০ কেজি পচা গোবর, ৩০০ গ্রাম টিএসপি, ২৫০ গ্রাম পটাশ ও ৫০ গ্রাম বোরন ৪ কিস্তিতে দিন।

৫. **রোগ প্রতিরোধ:**
- বর্ষাকালে কাণ্ডে ক্যানকার বা ব্যাকটেরিয়াল পচন দেখা দিলে কপার অক্সিক্লোরাইড স্প্রে করুন।`,
  },
  {
    id: "CKB-CHILI-001",
    topic: "Chili & Pepper Cultivation (মরিচ চাষ পদ্ধতি)",
    crop: "Chili",
    category: "cultivation",
    question: "মরিচ চাষ কিভাবে করব / Morich chas kivabe korbo",
    normalizedQuery: "chili morich chas chash kivabe korbo podhoti",
    keywords: ["chili", "morich", "মরিচ", "মরিচের", "chas", "chash", "চাষ", "পাতা কুঁকড়ানো", "kivabe"],
    language: "bn",
    hitCount: 2,
    createdAt: "2026-10-01T00:00:00.000Z",
    lastUsedAt: "2026-10-28T10:00:00.000Z",
    answer: `🌶️ **উন্নত জাতের কাঁচা মরিচ চাষ পদ্ধতি ও পরিচর্যা:**

১. **রোপণের সময়:**
- শীতকালীন মরিচ: ভাদ্র-আশ্বিন (আগস্ট-অক্টোবর)।
- গ্রীষ্মকালীন মরিচ: ফাল্গুন-চৈত্র (ফেব্রুয়ারি-মার্চ)।

২. **জমি ও দূরত্ব:**
- সারি থেকে সারি ২০ ইঞ্চি এবং গাছ থেকে গাছ ১৫ ইঞ্চি দূরত্বে ৩০-৩৫ দিনের চারা লাগান।

৩. **মরিচের প্রধান সমস্যা - পাতা কুঁকড়ানো রোগ:**
- এটি কোনো ছত্রাক নয়, বরং থ্রিপস ও মাকড়ের আক্রমণে হয়।
- কচি পাতা উল্টো নৌকার মতো কুঁকড়ে গেলে মাকড়নাশক (ভার্টিমেক বা ওমাইট) প্রতি লিটার পানিতে ১.৫ মিলি হারে পাতার উল্টো পিঠে স্প্রে করুন।

৪. **ফলন বৃদ্ধির টিপস:**
- ফুল ঝরা রোধে ও ফলন বাড়াতে ফুল আসার মুখে পিজিআর (ফ্লোরা/মিরাকুলান ২ মিলি/লিটার) ও বোরন স্প্রে করুন।`,
  },
  {
    id: "CKB-GARLIC-ONION-001",
    topic: "Garlic & Onion Cultivation (রসুন ও পেঁয়াজ চাষ পদ্ধতি)",
    crop: "Garlic / Onion",
    category: "cultivation",
    question: "রসুন ও পেঁয়াজ চাষ কিভাবে করব / Roshun peyaj chas kivabe korbo",
    normalizedQuery: "garlic onion roshun peyaj chas chash kivabe korbo podhoti",
    keywords: ["garlic", "onion", "roshun", "peyaj", "রসুন", "পেঁয়াজ", "পেয়াজ", "chas", "chash", "চাষ", "বিনা চাষে", "kivabe"],
    language: "bn",
    hitCount: 2,
    createdAt: "2026-10-01T00:00:00.000Z",
    lastUsedAt: "2026-10-28T10:00:00.000Z",
    answer: `🧄🧅 **রসুন ও পেঁয়াজ চাষের বৈজ্ঞানিক পদ্ধতি:**

১. **বপনের সময়:**
- কার্তিক থেকে অগ্রহায়ণের প্রথম সপ্তাহ (অক্টোবর শেষ থেকে নভেম্বরের মাঝামাঝি)।

২. **বিনা চাষে রসুন চাষ (চলনবিলের জনপ্রিয় প্রযুক্তি):**
- আমন ধান কাটার পর নরম মাটিতে জমি চাষ ছাড়াই সারি করে রসুনের কোয়া পুঁতে উপরে ধানের নাড়া/খড় দিয়ে ৪-৬ ইঞ্চি পুরু মালচিং করে দেওয়া হয়।
- এতে সেচ ও নিড়ানি কম লাগে এবং উৎপাদন খরচ অর্ধেকের নিচে নেমে আসে।

৩. **ঐতিহ্যবাহী চাষে দূরত্ব:**
- সারি থেকে সারি **৬ ইঞ্চি (১৫ সেমি)** এবং কোয়া বা পেঁয়াজের চারা থেকে দূরত্ব **৪ ইঞ্চি (১০ সেমি)**।
- মাটির নিচে ২-৩ সেমি গভীরে সোজা করে কোয়া রোপণ করুন।

৪. **সার ও সেচ:**
- শেষ চাষে জিপসাম (সালফার) এবং পটাশ অবশ্যই দিন; সালফার পেঁয়াজ ও রসুনের ঝাঁঝ ও সংরক্ষণ ক্ষমতা বাড়ায়।`,
  },
  {
    id: "CKB-WATERMELON-001",
    topic: "Watermelon Cultivation Guide (তরমুজ চাষ পদ্ধতি)",
    crop: "Watermelon",
    category: "cultivation",
    question: "তরমুজ চাষ কিভাবে করব / Tormuj watermelon chas kivabe korbo",
    normalizedQuery: "watermelon tormuj chas chash kivabe korbo podhoti",
    keywords: ["watermelon", "tormuj", "তরমুজ", "তরমুজের", "chas", "chash", "চাষ", "kivabe"],
    language: "bn",
    hitCount: 2,
    createdAt: "2026-10-01T00:00:00.000Z",
    lastUsedAt: "2026-10-28T10:00:00.000Z",
    answer: `🍉 **উচ্চফলনশীল তরমুজ চাষ পদ্ধতি:**

১. **সময়:** অগ্রহায়ণ-পৌষ (ডিসেম্বর-জানুয়ারি)। আগাম চাষের জন্য পলিব্যাগে চারা তৈরি করে জমিতে লাগানো উত্তম।
২. **জমি ও বেড:** উঁচু বেড বানিয়ে কালো মালচিং পেপার দিয়ে ঢেকে দিন। সারি থেকে সারি ৬-৮ ফুট এবং মাদা থেকে মাদা ৫-৬ ফুট দূরত্ব রাখুন।
৩. **সার:** পচা গোবর, টিএসপি, ডিএপি ও পরিমিত পটাশ দিন। ফল বড় হওয়ার সময় পটাশ সার মিষ্টি স্বাদ এনে দেয়।
৪. **পরাগায়ন:** ড্রপ বা মাছি পোকা দমনে ফেরোমোন ফাঁদ ব্যবহার করুন। ফল ধরার সময় সকালে পুরুষ ফুল দিয়ে স্ত্রী ফুলে হাত পরাগায়ন করলে ফলন ৩০% বৃদ্ধি পায়।`,
  },
  {
    id: "CKB-PAPAYA-001",
    topic: "Papaya Cultivation Guide (পেঁপে চাষ পদ্ধতি)",
    crop: "Papaya",
    category: "cultivation",
    question: "পেঁপে চাষ কিভাবে করব / Pepe papaya chas kivabe korbo",
    normalizedQuery: "papaya pepe chas chash kivabe korbo podhoti",
    keywords: ["papaya", "pepe", "পেঁপে", "পেঁপের", "chas", "chash", "চাষ", "মোজাইক", "kivabe"],
    language: "bn",
    hitCount: 2,
    createdAt: "2026-10-01T00:00:00.000Z",
    lastUsedAt: "2026-10-28T10:00:00.000Z",
    answer: `🌱 **উন্নত জাতের পেঁপে চাষ পদ্ধতি ও পরিচর্যা:**

১. **উন্নত জাত:** রেড লেডি, শাহি, কাশিমপুরী বা দেশি হাইব্রিড।
২. **দূরত্ব ও গর্ত:** ৬×৬ ফুট দূরত্বে ২×২ ফুট গর্ত করে ১০ কেজি গোবর ও সুষম সার দিয়ে ১৫ দিন পর চারা রোপণ করুন।
৩. **পানি নিষ্কাশন:** পেঁপে গাছ সামান্যতম পানি জমলে শিকড় পচে মারা যায়। তাই উঁচু বেড ও নালার ব্যবস্থা রাখতে হবে।
৪. **রোগ প্রতিরোধ:** জাবপোকার মাধ্যমে ছড়ানো পেঁপের মোজাইক ভাইরাস দমনে আক্রান্ত গাছ তুলে মাটিতে পুঁতে ফেলুন এবং নিম তেল বা ইমিডাক্লোপ্রিড স্প্রে করুন।`,
  },
];

/**
 * Normalizes user queries for robust matching
 */
export function normalizeChatQuery(query: string): string {
  return query
    .toLowerCase()
    .replace(/[?!.,;:'"()।/\\_`~@#$%^&*+=<>{}\[\]-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Ensures knowledge store file exists with seeded data
 */
function ensureKnowledgeStore(): ChatKnowledgeRecord[] {
  try {
    const dir = path.dirname(STORE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(STORE_FILE)) {
      fs.writeFileSync(STORE_FILE, JSON.stringify(SEEDED_KNOWLEDGE, null, 2), "utf-8");
      return SEEDED_KNOWLEDGE;
    }

    const content = fs.readFileSync(STORE_FILE, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }

    fs.writeFileSync(STORE_FILE, JSON.stringify(SEEDED_KNOWLEDGE, null, 2), "utf-8");
    return SEEDED_KNOWLEDGE;
  } catch (err) {
    console.error("[chatKnowledge] Error accessing store file:", err);
    return SEEDED_KNOWLEDGE;
  }
}

/**
 * Persists knowledge records to disk
 */
function saveStore(records: ChatKnowledgeRecord[]): void {
  try {
    const dir = path.dirname(STORE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(records, null, 2), "utf-8");
  } catch (err) {
    console.error("[chatKnowledge] Error writing store file:", err);
  }
}

/**
 * Crop Synonym Dictionary for matching variations
 */
const CROP_MATCHERS: { crop: string; tokens: string[] }[] = [
  { crop: "Mango", tokens: ["mango", "aam", "আম", "আমের", "আমগাছ"] },
  { crop: "Strawberry", tokens: ["strawberry", "strabray", "strawbery", "স্ট্রবেরি", "স্ট্রবেরী", "স্ট্রবেরীর"] },
  { crop: "Tomato", tokens: ["tomato", "টমেটো", "টমেটোর"] },
  { crop: "Potato", tokens: ["potato", "alu", "আলু", "আলুর"] },
  { crop: "Rice", tokens: ["rice", "dhan", "ধান", "ধানের", "বোরো", "আমন", "paddy"] },
  { crop: "Dragon Fruit", tokens: ["dragon", "ড্রাগন"] },
  { crop: "Chili", tokens: ["chili", "chilli", "morich", "মরিচ", "মরিচের"] },
  { crop: "Garlic / Onion", tokens: ["garlic", "onion", "roshun", "peyaj", "রসুন", "পেঁয়াজ", "পেয়াজ"] },
  { crop: "Watermelon", tokens: ["watermelon", "tormuj", "তরমুজ", "তরমুজের"] },
  { crop: "Papaya", tokens: ["papaya", "pepe", "পেঁপে", "পেঁপের"] },
];

const CULTIVATION_INTENT_TOKENS = [
  "chas", "chash", "chaas", "cultivation", "cultivate", "grow", "planting",
  "রোপণ", "চাষ", "চাষাবাদ", "আবাদ", "কিভাবে করব", "kivabe korbo", "kivabe", "পদ্ধতি",
  "নিয়ম", "বপন", "how to", "technique"
];

/**
 * Searches the database for an existing answer before making any API call
 */
export function findCachedKnowledgeAnswer(query: string): ChatKnowledgeRecord | null {
  const normalized = normalizeChatQuery(query);
  if (!normalized) return null;

  const records = ensureKnowledgeStore();
  const queryWords = normalized.split(" ").filter((w) => w.length > 1);

  // 1. Direct Intent & Crop matching (handles "mango chas kivabe korbo", "strabray kivabe chas korbo", "টমেটো চাষ পদ্ধতি")
  let detectedCrop: string | null = null;
  for (const matcher of CROP_MATCHERS) {
    if (matcher.tokens.some((token) => normalized.includes(token))) {
      detectedCrop = matcher.crop;
      break;
    }
  }

  const isCultivationQuery = CULTIVATION_INTENT_TOKENS.some((token) => normalized.includes(token));

  if (detectedCrop && isCultivationQuery) {
    const cropCultivationRecord = records.find(
      (r) => r.crop === detectedCrop && r.category === "cultivation"
    );
    if (cropCultivationRecord) {
      // Increment hit count
      cropCultivationRecord.hitCount = (cropCultivationRecord.hitCount || 0) + 1;
      cropCultivationRecord.lastUsedAt = new Date().toISOString();
      saveStore(records);
      return cropCultivationRecord;
    }
  }

  // 2. Exact or Normalized Query Match
  const exactMatch = records.find((r) => {
    const targetNorm = normalizeChatQuery(r.question);
    return targetNorm === normalized || r.normalizedQuery === normalized;
  });

  if (exactMatch) {
    exactMatch.hitCount = (exactMatch.hitCount || 0) + 1;
    exactMatch.lastUsedAt = new Date().toISOString();
    saveStore(records);
    return exactMatch;
  }

  // 3. Keyword Overlap Scoring (Score >= 0.60 threshold)
  let bestMatch: ChatKnowledgeRecord | null = null;
  let highestScore = 0;

  for (const record of records) {
    const recordKeywords = record.keywords.map((k) => k.toLowerCase());
    let matchCount = 0;

    for (const word of queryWords) {
      if (recordKeywords.some((k) => k === word || word.includes(k) || k.includes(word))) {
        matchCount++;
      }
    }

    const score = queryWords.length > 0 ? matchCount / queryWords.length : 0;
    if (score > highestScore && score >= 0.50) {
      highestScore = score;
      bestMatch = record;
    }
  }

  if (bestMatch) {
    bestMatch.hitCount = (bestMatch.hitCount || 0) + 1;
    bestMatch.lastUsedAt = new Date().toISOString();
    saveStore(records);
    return bestMatch;
  }

  return null;
}

/**
 * Saves a newly generated AI answer into the database so future queries hit cache
 */
export function saveToKnowledgeDatabase(
  question: string,
  answer: string,
  meta?: {
    crop?: string;
    category?: "cultivation" | "disease_remedy" | "fertilizer" | "general_faq";
    language?: "bn" | "en" | "banglish";
  }
): ChatKnowledgeRecord {
  const records = ensureKnowledgeStore();
  const normalized = normalizeChatQuery(question);

  // Avoid saving trivial or empty answers or error messages
  if (!answer || answer.length < 20 || answer.includes("সাময়িক সমস্যা") || answer.includes("Error")) {
    throw new Error("Answer too short or invalid to store in knowledge base.");
  }

  // Detect crop if not provided
  let detectedCrop = meta?.crop;
  if (!detectedCrop) {
    for (const matcher of CROP_MATCHERS) {
      if (matcher.tokens.some((token) => normalized.includes(token))) {
        detectedCrop = matcher.crop;
        break;
      }
    }
  }

  // Detect category
  let category: ChatKnowledgeRecord["category"] = meta?.category || "general_faq";
  if (CULTIVATION_INTENT_TOKENS.some((t) => normalized.includes(t))) {
    category = "cultivation";
  } else if (normalized.includes("sar") || normalized.includes("সার") || normalized.includes("fertilizer") || normalized.includes("urea")) {
    category = "fertilizer";
  } else if (normalized.includes("rog") || normalized.includes("রোগ") || normalized.includes("পোকা") || normalized.includes("blight")) {
    category = "disease_remedy";
  }

  // Extract keywords
  const keywords = Array.from(
    new Set(
      normalized
        .split(" ")
        .filter((w) => w.length > 2 && !["the", "and", "for", "with", "kivabe", "korbo", "কিভাবে", "করব", "হবে"].includes(w))
    )
  );

  const newRecord: ChatKnowledgeRecord = {
    id: `CKB-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
    topic: detectedCrop ? `${detectedCrop} Agriculture Advisory` : "General Agricultural Q&A",
    crop: detectedCrop,
    category,
    question,
    normalizedQuery: normalized,
    keywords,
    answer,
    language: meta?.language || (/[ঁ-ঢ়]/.test(question) ? "bn" : "banglish"),
    hitCount: 1,
    createdAt: new Date().toISOString(),
    lastUsedAt: new Date().toISOString(),
  };

  records.push(newRecord);
  saveStore(records);
  console.log(`[chatKnowledge] Successfully saved new Q&A to database: "${question}" (ID: ${newRecord.id})`);

  return newRecord;
}

/**
 * Returns all stored knowledge records (for admin/analytics)
 */
export function getAllKnowledgeRecords(): ChatKnowledgeRecord[] {
  return ensureKnowledgeStore();
}
