import { type Locator, type Page } from "npm:playwright@^1.40";
import { HeartColor, rotationColorMap } from "@data/colors.ts";

export class HeartPage {
  #lastHueColorChange: string | null = null;
  readonly #page: Page;
  readonly #heartSvg: Locator;
  readonly interactivePath: Locator;
  readonly heart: {
    touch: () => Promise<void>;
    hover: () => Promise<void>;
    leave: () => Promise<void>;
    isVisible: () => Promise<boolean>;
    getColorAsync: () => Promise<HeartColor | null>;
    getLastHueColorChange: () => string | null;
  };

  constructor(page: Page) {
    this.#page = page;
    this.#heartSvg = page.getByTestId("heart");
    this.interactivePath = page.locator("path.interactive-heart");

    this.#page.on("request", (request) => {
      if (request.url().includes("/api/hue") && request.method() === "POST") {
        try {
          const postData = request.postDataJSON();
          if (postData && typeof postData.color === "string") {
            this.#lastHueColorChange = postData.color;
          }
        } catch (e) {
          console.error("Error parsing POST data:", e);
        }
      }
    });

    this.heart = {
      touch: () => this.interactivePath.click(),
      hover: () => this.interactivePath.hover(),
      leave: () => this.#page.mouse.move(0, 0),
      isVisible: () => this.#heartSvg.isVisible(),
      getColorAsync: async () => {
        const style = await this.#heartSvg.getAttribute("style");
        if (!style) return null;

        const match = style.match(/hue-rotate\((\d+)deg\)/);
        if (!match) return HeartColor.Green;

        const rotation = parseInt(match[1], 10);
        const color = Object.entries(rotationColorMap)
          .find(([_, degrees]) => degrees === rotation)?.[0] as HeartColor;

        return color ?? HeartColor.Green;
      },
      getLastHueColorChange: () => this.#lastHueColorChange,
    };
  }

  async openAsync(color?: string): Promise<void> {
    const url = color ? `/${color}` : "/";
    await this.#page.goto(`http://localhost:8000${url}`);
    await this.heart.isVisible();
  }

  async getPageTitleAsync(): Promise<string> {
    return await this.#page.title();
  }

  async isHeartBeatingAsync(): Promise<boolean> {
    const beatingAnimationName = "heartbeat";
    const style = await this.#heartSvg.getAttribute("style") ?? "";
    const match = style.match(/animation:\s*([^;]+);/);
    const animation = match ? match[1].trim().replace(/\s+/g, " ") : null;
    return animation?.includes(beatingAnimationName) ?? false;
  }

  async waitForUrlToMatchAsync(expectedPath: string): Promise<boolean> {
    try {
      await this.#page.waitForURL((url) => url.pathname.includes(expectedPath));
      return true;
    } catch {
      return false;
    }
  }
}
