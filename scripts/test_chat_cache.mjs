import {
  findCachedKnowledgeAnswer,
  saveToKnowledgeDatabase,
  getAllKnowledgeRecords,
} from "../src/lib/ai/chatKnowledgeService.ts";

console.log("==================================================");
console.log("🧪 KrishiDrishti Chatbot Database Knowledge Cache Test");
console.log("==================================================\n");

// 1. Initial Records
const initialRecords = getAllKnowledgeRecords();
console.log(`[Setup] Knowledge database initialized with ${initialRecords.length} topics.\n`);

// 2. Test Case 1: Mango Cultivation Query in Banglish (user's exact example)
console.log("▶ Test 1: Query = 'mango chas kivabe korbo'");
const match1 = findCachedKnowledgeAnswer("mango chas kivabe korbo");
if (match1 && match1.crop === "Mango") {
  console.log(`✅ SUCCESS: Cache HIT from Database!`);
  console.log(`   Topic: ${match1.topic}`);
  console.log(`   Hit Count: ${match1.hitCount}`);
  console.log(`   Preview: ${match1.answer.slice(0, 80).replace(/\n/g, " ")}...\n`);
} else {
  console.error("❌ FAILED: Did not match Mango cultivation.");
  process.exit(1);
}

// 3. Test Case 2: Strawberry Cultivation Query in Banglish (user's exact example)
console.log("▶ Test 2: Query = 'strabray kivabe chas korbo'");
const match2 = findCachedKnowledgeAnswer("strabray kivabe chas korbo");
if (match2 && match2.crop === "Strawberry") {
  console.log(`✅ SUCCESS: Cache HIT from Database!`);
  console.log(`   Topic: ${match2.topic}`);
  console.log(`   Hit Count: ${match2.hitCount}`);
  console.log(`   Preview: ${match2.answer.slice(0, 80).replace(/\n/g, " ")}...\n`);
} else {
  console.error("❌ FAILED: Did not match Strawberry cultivation.");
  process.exit(1);
}

// 4. Test Case 3: Strawberry in Bangla
console.log("▶ Test 3: Query = 'স্ট্রবেরি চাষ কিভাবে করব'");
const match3 = findCachedKnowledgeAnswer("স্ট্রবেরি চাষ কিভাবে করব");
if (match3 && match3.crop === "Strawberry") {
  console.log(`✅ SUCCESS: Cache HIT from Database for Bangla query!`);
  console.log(`   Topic: ${match3.topic}`);
  console.log(`   Hit Count: ${match3.hitCount}\n`);
} else {
  console.error("❌ FAILED: Did not match Bangla query.");
  process.exit(1);
}

// 5. Test Case 4: Cache Miss followed by Auto-Save into Database
console.log("▶ Test 4: Testing Cache MISS and Auto-Saving newly generated AI Answer");
const uniqueQuestion = `পটল চাষের সার মাত্রা কি কি? (Test-${Date.now()})`;
const missBefore = findCachedKnowledgeAnswer(uniqueQuestion);
console.log(`   Cache before save: ${missBefore ? "FOUND (Unexpected)" : "NULL (Expected Cache Miss)"}`);

if (missBefore === null) {
  // Simulate AI API call generating an answer
  const simulatedAiAnswer = `পটল চাষে প্রতি শতকে ইউরিয়া ৮০০ গ্রাম, ডিএপি ১ কেজি এবং এমওপি ৮০০ গ্রাম তিন কিস্তিতে প্রয়োগ করুন। ফুল আসার সময় মাটির আর্দ্রতা বজায় রাখুন।`;
  
  const savedRecord = saveToKnowledgeDatabase(uniqueQuestion, simulatedAiAnswer, {
    category: "fertilizer",
    language: "bn",
  });
  console.log(`   Saved to Database with ID: ${savedRecord.id}`);

  // Now query again: must HIT the database without calling API!
  const hitAfter = findCachedKnowledgeAnswer(uniqueQuestion);
  if (hitAfter && hitAfter.id === savedRecord.id) {
    console.log(`✅ SUCCESS: Subsequent query for the same question fetched directly from Database Cache!`);
    console.log(`   Answer retrieved: "${hitAfter.answer}"\n`);
  } else {
    console.error("❌ FAILED: Could not retrieve freshly saved answer from database.");
    process.exit(1);
  }
}

console.log("==================================================");
console.log("🎉 ALL TESTS PASSED! Database Caching system is fully operational.");
console.log("==================================================");
