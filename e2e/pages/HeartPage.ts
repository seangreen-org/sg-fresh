import { type Page, type Locator, type Request } from "npm:playwright";
import { expect } from "npm:playwright/test";
import { ColorName, rotationColorMap } from "@/data/colors.ts";

export class HeartPage {
  readonly page: Page;
  readonly heartSvg: Locator;
  readonly interactivePath: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heartSvg = page.getByTestId("heart");
    this.interactivePath = page.locator('path.interactive-heart');
  }

  async open(color?: string): Promise<void> {
    const url = color ? `/${color}` : '/';
    await this.page.goto(`http://localhost:8000${url}`);
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async touchHeart(): Promise<void> {
    await this.interactivePath.click();
  }

  async hoverHeart(): Promise<void> {
    await this.interactivePath.hover();
  }

  async hoverOffHeart(): Promise<void> {
    await this.page.mouse.move(0, 0);
  }

  async getHeartHueRotateValue(): Promise<number | null> {
    const style = await this.heartSvg.getAttribute('style');
    if (!style) return null;
    const match = style.match(/hue-rotate\((\d+)deg\)/);
    return match ? parseInt(match[1], 10) : null;
  }

  async getHeartAnimationValue(): Promise<string | null> {
    const style = await this.heartSvg.getAttribute('style');
    if (!style) return null;
    const match = style.match(/animation:\s*([^;]+);/);
    return match ? match[1].trim().replace(/\s+/g, ' ') : null;
  }

  async expectHeartToBeVisible(): Promise<void> {
    await expect(this.heartSvg).toBeVisible();
  }

  async expectHeartColorToBe(colorName: ColorName): Promise<void> {
    const expectedRotation =
      rotationColorMap[colorName as keyof typeof rotationColorMap];
    await expect(this.getHeartHueRotateValue()).resolves.toBe(expectedRotation);
  }

  async expectHeartBeatingState(isBeating: boolean): Promise<void> {
    const beatingAnimationName = 'heartbeat';
    const animation = await this.getHeartAnimationValue();
    if (isBeating) {
        expect(animation).toContain(beatingAnimationName);
    } else {
        expect(animation).not.toContain(beatingAnimationName);
    }
}

  async expectPageUrlToContain(path: string): Promise<void> {
    await this.page.waitForURL(`**${path}`);
    expect(this.page.url()).toContain(path);
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
