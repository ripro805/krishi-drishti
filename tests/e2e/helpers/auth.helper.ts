import { Page, expect } from "@playwright/test";

export type RoleType = "farmer" | "expert" | "admin";

/**
 * Logs in via the application's supported 1-click demo account buttons.
 */
export async function loginWithDemoRole(page: Page, role: RoleType): Promise<void> {
  await page.goto("/login");
  await page.waitForLoadState("domcontentloaded");

  const buttonTexts: Record<RoleType, RegExp> = {
    farmer: /farmer|কৃষক/i,
    expert: /officer|কৃষিবিদ|expert/i,
    admin: /admin|অ্যাডমিন/i,
  };

  const demoButton = page.getByRole("button", { name: buttonTexts[role] });
  await expect(demoButton).toBeVisible();
  await demoButton.click();

  // Wait for redirect to /scan or /admin
  const expectedUrl = role === "admin" ? "**/admin" : "**/scan";
  await page.waitForURL(expectedUrl, { timeout: 12000 });
}

/**
 * Logs out the current user via the navbar dropdown.
 */
export async function logout(page: Page): Promise<void> {
  // Check if profile avatar/button is present
  const userButton = page.locator("header button img[alt]").locator("..");
  if (await userButton.isVisible()) {
    await userButton.click();
    const logoutBtn = page.getByRole("button", { name: /sign out|লগআউট/i });
    await expect(logoutBtn).toBeVisible();
    await logoutBtn.click();
    await page.waitForURL("**/login", { timeout: 8000 });
  }
}

/**
 * Resets local browser storage and authentication tokens.
 */
export async function clearAuthSession(page: Page): Promise<void> {
  await page.evaluate(() => {
    try {
      localStorage.removeItem("KRISHI_DRISHTI_AUTH_TOKEN");
      localStorage.removeItem("KRISHI_DRISHTI_CURRENT_USER");
    } catch {
      // ignore
    }
  });
  await page.context().clearCookies();
}
