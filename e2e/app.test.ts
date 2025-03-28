// !! direct url tests

import { expect } from "$std/expect/mod.ts";
import { type ColorName, colorNames, rotationColorMap } from "../data/colors.ts";
import { TestFixture } from "./test-fixture.ts";

const defaultColor = Object.keys(rotationColorMap)[0];

const withFixture = async (testFn: (fixture: TestFixture) => Promise<void>) => {
  const fixture = new TestFixture();
  try {
    await fixture.setup();
    await testFn(fixture);
  } finally {
    await fixture.teardown();
  }
};

Deno.test({
  name: "Initial Load: Page loads with correct title",
  async fn(): Promise<void> {
    await withFixture(async ({ page, heartPage }) => {
      await heartPage.goto();
      const title = await page?.title();
      expect(title).toBe("sg1981x");
    });
  },
});

Deno.test({
  name: "Initial Load: Heart SVG is visible",
  async fn(): Promise<void> {
    await withFixture(async ({ heartPage }) => {
      await heartPage.goto();
      await heartPage.expectHeartToBeVisible();
    });
  },
});

Deno.test({
  name: "Initial Load: Heart has default color style",
  async fn(): Promise<void> {
    await withFixture(async ({ heartPage }) => {
      await heartPage.goto();
      await heartPage.expectHeartToHaveColor(defaultColor);
    });
  },
});

Deno.test({
  name: "Initial Load: Sends initial Hue API request",
  async fn(): Promise<void> {
    await withFixture(async ({ heartPage }) => {
      const { requestPromise, requestData } = await heartPage.interceptHueApiRequest();
      await heartPage.goto();
      await requestPromise;
      expect(requestData.color).toBe(defaultColor);
    });
  },
});

Deno.test({
  name: "Interaction: Clicking heart changes color style",
  async fn(): Promise<void> {
    await withFixture(async ({ page, heartPage }) => {
      await heartPage.goto();
      const initialRotation = await heartPage.getHeartHueRotateValue();
      await heartPage.clickHeart();
      await page?.waitForTimeout(100);
      const newRotation = await heartPage.getHeartHueRotateValue();
      expect(newRotation).not.toBe(initialRotation);
      expect(Object.values(rotationColorMap)).toContain(newRotation);
    });
  },
});

Deno.test.only({
  name: "Interaction: Clicking heart sends Hue API request with new color",
  async fn(): Promise<void> {
    await withFixture(async ({ heartPage }) => {
      await heartPage.goto();

      if (!heartPage) throw new Error("Heart page not initialized");

      const {
        requestPromise:
        initialRequestPromise
      } = await heartPage.interceptHueApiRequest();
      await initialRequestPromise;

      const {
        requestPromise: clickRequestPromise,
        requestData: clickRequestData
      } = await heartPage.interceptHueApiRequest();

      await heartPage.clickHeart();
      await clickRequestPromise;

      expect(clickRequestData.color).not.toBe(null);
      expect(clickRequestData.color).not.toBe(defaultColor);
      expect(colorNames).toContain(clickRequestData.color as ColorName);
    });
  },
});

Deno.test({
  name: "Interaction: Clicking heart updates URL",
  async fn(): Promise<void> {
    await withFixture(async ({ heartPage }) => {
      await heartPage.goto();
      const { requestPromise: initialRequestPromise } = await heartPage.interceptHueApiRequest();
      await initialRequestPromise;

      const { requestPromise: clickRequestPromise, requestData: clickRequestData } =
        await heartPage.interceptHueApiRequest();

      await heartPage.clickHeart();
      await clickRequestPromise;

      const expectedColor = clickRequestData.color;
      expect(expectedColor).not.toBe(null);
      await heartPage.expectPageUrlToContain(`/${expectedColor}`);
    });
  },
});

Deno.test({
  name: "Interaction: Hovering heart applies animation",
  async fn(): Promise<void> {
    await withFixture(async ({ page, heartPage }) => {
      await heartPage.goto();
      await heartPage.hoverHeart();
      await page?.waitForTimeout(100);
      await heartPage.expectHeartAnimation("heartbeat 1.5s ease-in-out infinite");
    });
  },
});

Deno.test({
  name: "Interaction: Moving mouse off heart removes animation",
  async fn(): Promise<void> {
    await withFixture(async ({ page, heartPage }) => {
      await heartPage.goto();
      await heartPage.hoverHeart();
      await page?.waitForTimeout(100);

      await page?.mouse.move(0, 0);
      await page?.waitForTimeout(100);

      await heartPage.expectHeartAnimation("none");
    });
  },
});
