import { type Page, type Locator, type Request } from "npm:playwright";
import { ColorName, rotationColorMap } from "@/data/colors.ts";

export class HeartPage {
  private readonly page: Page;
  private readonly heartSvg: Locator;
  private readonly interactivePath: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heartSvg = page.getByTestId("heart");
    this.interactivePath = page.locator('path.interactive-heart');
  }

  async open(color?: string): Promise<void> {
    const url = color ? `/${color}` : '/';
    await this.page.goto(`http://localhost:8000${url}`);
  }

  async touch(): Promise<void> {
    await this.interactivePath.click();
  }

  async hover(): Promise<void> {
    await this.interactivePath.hover();
  }

  async leave(): Promise<void> {
    await this.page.mouse.move(0, 0);
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getHeartColor(): Promise<ColorName | null> {
    const style = await this.heartSvg.getAttribute('style');
    if (!style) return null;

    const match = style.match(/hue-rotate\((\d+)deg\)/);
    if (!match) return ColorName.Green;

    const rotation = parseInt(match[1], 10);
    const color = Object.entries(rotationColorMap)
      .find(([_, degrees]) => degrees === rotation)?.[0] as ColorName;

    return color ?? ColorName.Green;
  }

  async isHeartVisible(): Promise<boolean> {
    return await this.heartSvg.isVisible();
  }

  async isHeartBeating(): Promise<boolean> {
    const beatingAnimationName = 'heartbeat';
    const style = await this.heartSvg.getAttribute('style') ?? '';
    const match = style.match(/animation:\s*([^;]+);/);
    const animation = match ? match[1].trim().replace(/\s+/g, ' ') : null;
    return animation?.includes(beatingAnimationName) ?? false;
  }

  async waitForUrlToMatch(expectedPath: string): Promise<boolean> {
    try {
      await this.page.waitForURL((url) => url.pathname.includes(expectedPath));
      return true;
    } catch {
      return false;
    }
  }

  interceptHueApiRequest(): Promise<{
    requestPromise: Promise<Request>;
    requestData: { color: string | null };
  }> {
    const requestData = { color: null };
    const requestPromise = this.page.waitForRequest((request) => {
      if (request.url().includes('/api/hue') && request.method() === 'POST') {
        try {
          const postData = request.postDataJSON();
          if (postData && typeof postData.color === 'string') {
            requestData.color = postData.color;
            return true;
          }
        } catch (e) {
          console.error('Error parsing POST data:', e);
        }
      }
      return false;
    });

    return Promise.resolve({ requestPromise, requestData });
  }
}
