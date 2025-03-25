import { expect } from 'https://deno.land/std@0.216.0/expect/mod.ts';
import { chromium, type Browser, type Page } from 'npm:@playwright/test';

let browser: Browser;
let page: Page;

Deno.test({
  name: 'basic test',
  async fn(t): Promise<void> {
    await t.step('setup', async () => {
      browser = await chromium.launch();
      page = await browser.newPage();
    });

    await t.step('page loads with correct title', async () => {
      await page.goto('http://localhost:8000');
      const title = await page.title();
      expect(title).toBe('SG1981x');
    });

    await t.step('cleanup', async () => {
      await browser.close();
    });
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

