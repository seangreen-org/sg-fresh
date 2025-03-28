// !! direct url tests
// !! remove timeouts and direct page access

import { expect } from "$std/expect/mod.ts";
import { withTestFixture } from "./utils/testHelper.ts";
import { type ColorName, colorNames, rotationColorMap } from "@/data/colors.ts";

const defaultColor = Object.keys(rotationColorMap)[0];

Deno.test(
  "Initial Load: Page loads with correct title",
  withTestFixture(async ({ page, heartPage }) => {
    await heartPage.goto();
    const title = await page.title();
    expect(title).toBe("sg1981x");
  }),
);

Deno.test(
  "Initial Load: Heart SVG is visible",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.goto();
    await heartPage.expectHeartToBeVisible();
  }),
);

Deno.test(
  "Initial Load: Heart has default color style",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.goto();
    await heartPage.expectHeartToHaveColor(defaultColor);
  }),
);

Deno.test(
  "Initial Load: Sends initial Hue API request",
  withTestFixture(async ({ heartPage }) => {
  const { requestPromise, requestData } = await heartPage.interceptHueApiRequest();
    await heartPage.goto();
    await requestPromise;
    expect(requestData.color).toBe(defaultColor);
  }),
);

Deno.test(
  "Interaction: Clicking heart changes color style",
  withTestFixture(async ({ heartPage, page }) => {
    await heartPage.goto();
    const initialRotation = await heartPage.getHeartHueRotateValue();
    await heartPage.clickHeart();
    await page?.waitForTimeout(100);
    const newRotation = await heartPage.getHeartHueRotateValue();
    expect(newRotation).not.toBe(initialRotation);
    expect(Object.values(rotationColorMap)).toContain(newRotation);
  }),
);

Deno.test(
  "Interaction: Clicking heart sends Hue API request with new color",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.goto();

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
  }),
);

Deno.test(
  "Interaction: Clicking heart updates URL",
  withTestFixture(async ({ heartPage }) => {
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
  }),
);

Deno.test(
  "Interaction: Hovering heart applies animation",
  withTestFixture(async ({ heartPage, page }) => {
    await heartPage.goto();
    await heartPage.hoverHeart();
    await page?.waitForTimeout(100);
    await heartPage.expectHeartAnimation("heartbeat 1.5s ease-in-out infinite");
  }),
);

Deno.test(
  "Interaction: Moving mouse off heart removes animation",
  withTestFixture(async ({ heartPage, page }) => {
    await heartPage.goto();
    await heartPage.hoverHeart();
    await page?.waitForTimeout(100);

    await page?.mouse.move(0, 0);
    await page?.waitForTimeout(100);

    await heartPage.expectHeartAnimation("none");
  }),
);
