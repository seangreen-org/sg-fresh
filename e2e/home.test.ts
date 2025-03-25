import { expect } from "https://deno.land/std@0.216.0/expect/mod.ts";
import { chromium, type Browser, type Page } from "playwright";

let browser: Browser;
let page: Page;

Deno.test({
  name: "homepage test",
  async fn(t) {
    // Setup: Start browser and create new page
    await t.step("setup", async () => {
      browser = await chromium.launch();
      page = await browser.newPage();
    });

    // Test homepage loads
    await t.step("homepage should load", async () => {
      await page.goto("http://localhost:8000");
      const title = await page.title();
      expect(title).toBe("SG1981x");
    });

    // Cleanup
    await t.step("cleanup", async () => {
      await browser.close();
    });
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

