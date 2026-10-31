import { test, expect } from "@playwright/test";
import { MOCK_CHAT_RESPONSE } from "../fixtures/mock-data";

test.describe("AI Agriculture Chatbot Tests", () => {
  test("CHAT-001: Chat page loads with greeting and quick prompt chips", async ({ page }) => {
    await page.goto("/chat");
    await page.waitForLoadState("domcontentloaded");

    // Title should be visible
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toContainText(/assistant|সহকারী/i);

    // Initial greeting in chat window
    const greeting = page.locator("div").getByText(/KrishiDrishti|AI কৃষি সহকারী|নমস্কার/i);
    await expect(greeting.first()).toBeVisible({ timeout: 6000 });
  });

  test("CHAT-002: Send message and display formatted assistant reply", async ({ page }) => {
    // Intercept chat API with deterministic mock
    await page.route("**/api/chat", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_CHAT_RESPONSE),
      });
    });

    await page.goto("/chat");
    await page.waitForLoadState("domcontentloaded");

    const textarea = page.getByPlaceholder(/প্রশ্ন লিখুন|ask/i);
    await textarea.fill("টমেটোর আগাম ধসা রোগের সমাধান কী?");

    // Click submit/send button
    const sendBtn = page.getByRole("button", { name: /send|পাঠান/i });
    await expect(sendBtn).toBeEnabled();
    await sendBtn.click();

    // User message should appear in chat history
    const userMsg = page.getByText("টমেটোর আগাম ধসা রোগের সমাধান কী?");
    await expect(userMsg).toBeVisible();

    // Assistant response should appear
    const assistantMsg = page.getByText(/কপার অক্সিক্লোরাইড|আক্রান্ত পাতা কেটে ধ্বংস করুন/i);
    await expect(assistantMsg.first()).toBeVisible({ timeout: 10000 });
  });

  test("CHAT-003: Empty message cannot be submitted", async ({ page }) => {
    await page.goto("/chat");
    await page.waitForLoadState("domcontentloaded");

    const textarea = page.getByPlaceholder(/প্রশ্ন লিখুন|ask/i);
    await textarea.fill("   ");

    const sendBtn = page.getByRole("button", { name: /send|পাঠান/i });
    await expect(sendBtn).toBeDisabled();
  });

  test("CHAT-004: Chatbot query via URL search parameters", async ({ page }) => {
    await page.goto("/chat?prompt=আলুর+ব্লাইট&crop=Potato&disease=Late+Blight");
    await page.waitForLoadState("domcontentloaded");

    // Input or chat history should contain the preloaded prompt
    const input = page.getByPlaceholder(/প্রশ্ন লিখুন|ask/i);
    const value = await input.inputValue();
    // Either pre-filled in input or auto-sent
    expect(value.length > 0 || (await page.getByText(/আলু|potato/i).count()) > 0).toBeTruthy();
  });
});
