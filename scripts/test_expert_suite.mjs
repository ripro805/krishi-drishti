import http from "http";

async function run() {
  console.log("🧪 Testing Expert Suite Endpoints...\n");

  const baseUrl = "http://localhost:3000";

  // Helper fetch
  async function fetchJson(url, options = {}) {
    const res = await fetch(`${baseUrl}${url}`, options);
    const data = await res.json().catch(() => ({}));
    return { status: res.status, data };
  }

  // 1. Test escalated scans query
  console.log("1. Fetching escalated scans for agronomist...");
  const scansRes = await fetchJson("/api/scans?escalated=true");
  console.log(`   Status: ${scansRes.status}, Total: ${scansRes.data.total}`);
  if (scansRes.status !== 200 || !Array.isArray(scansRes.data.scans)) {
    throw new Error("Failed to fetch escalated scans");
  }
  console.log(`   ✅ Successfully retrieved ${scansRes.data.scans.length} escalated scans`);

  // 2. Test saving expert consultation advisory
  const scanToConsult = scansRes.data.scans[0];
  console.log(`\n2. Submitting expert prescription on scan ${scanToConsult.id}...`);
  const consultRes = await fetchJson(`/api/scans/${scanToConsult.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      consultation: {
        expertName: "Nasrin Akhter (উপজেলা কৃষি কর্মকর্তা)",
        notes: "মাঠ পরিদর্শনে ব্লাইট তীব্র পাওয়া গেছে। অবিলম্বে পানি নিষ্কাশন করুন।",
        prescription: "ম্যানকোজেব ২ গ্রাম/লিটার পানিতে মিশিয়ে ৭ দিন পর পর ২ বার স্প্রে করুন।",
        verifiedDisease: "আলুর নাবী ধসা (Late Blight)",
        status: "Treated",
      },
    }),
  });
  console.log(`   Status: ${consultRes.status}, Message: ${consultRes.data.message}`);
  if (consultRes.status !== 200 || !consultRes.data.scan?.metadata?.expertConsultation) {
    throw new Error("Failed to update expert consultation");
  }
  console.log("   ✅ Consultation advisory saved with prescription & agronomist notes");

  // 3. Test retrieving feedback list for expert
  console.log("\n3. Fetching farmer feedback list...");
  const fbRes = await fetchJson("/api/feedback");
  console.log(`   Status: ${fbRes.status}, Feedbacks Count: ${fbRes.data.feedbackList?.length}`);
  if (fbRes.status !== 200) {
    throw new Error("Failed to fetch feedback list");
  }
  console.log("   ✅ Farmer feedbacks successfully retrieved for expert moderation");

  // 4. Test updating feedback status by expert
  if (fbRes.data.feedbackList && fbRes.data.feedbackList.length > 0) {
    const fbId = fbRes.data.feedbackList[0].id;
    console.log(`\n4. Moderating feedback ${fbId} to 'reviewed'...`);
    const modRes = await fetchJson(`/api/feedback/${fbId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "reviewed" }),
    });
    console.log(`   Status: ${modRes.status}, Message: ${modRes.data.message}`);
    if (modRes.status !== 200) {
      throw new Error("Failed to update feedback status");
    }
    console.log("   ✅ Feedback status successfully updated to reviewed");
  }

  // 5. Test disease catalog for expert CMS
  console.log("\n5. Fetching disease catalog for expert CMS...");
  const disRes = await fetchJson("/api/diseases");
  console.log(`   Status: ${disRes.status}, Diseases Count: ${disRes.data.diseases?.length}`);
  if (disRes.status !== 200) {
    throw new Error("Failed to retrieve disease list");
  }
  console.log("   ✅ Disease knowledge base accessible for expert management");

  console.log("\n🎉 ALL 5 EXPERT SUITE TESTS PASSED 100% SUCCESSFULLY!\n");
}

run().catch((err) => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
