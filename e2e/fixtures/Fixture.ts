import { type Browser, chromium, type Page } from "npm:@playwright/test";
import { HeartPage } from "../pages/HeartPage.ts";

export class TestFixture {
  private browser!: Browser;
  private page!: Page;
  heartPage!: HeartPage;

  async setup(): Promise<void> {
    this.browser = await chromium.launch();
    this.page = await this.browser.newPage();
    if (this.page) {
      this.heartPage = new HeartPage(this.page);
    } else {
      throw new Error("Failed to create Playwright page.");
    }
  }

  async teardown(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }
}
