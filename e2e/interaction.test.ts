import { expect } from "$std/expect/mod.ts";
import { withTestFixture } from "./utils/testHelper.ts";
import { type ColorName, colorNames, rotationColorMap } from "@/data/colors.ts";

const defaultColor = Object.keys(rotationColorMap)[0];  // !! duplicated

Deno.test(
  "Clicking heart changes color style",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.goto();
    const initialRotation = await heartPage.getHeartHueRotateValue();

    await heartPage.clickHeart();

    const newRotation = await heartPage.getHeartHueRotateValue();
    expect(newRotation).not.toBe(initialRotation);
    expect(Object.values(rotationColorMap)).toContain(newRotation);
  }),
);

Deno.test(
  "Clicking heart sends Hue API request with new color",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.goto();

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
  "Clicking heart updates URL",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.goto();

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
  "Hovering heart applies animation",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.goto();
    await heartPage.hoverHeart();
    await heartPage.expectHeartBeatingState(true);
  }),
);

Deno.test(
  "Moving mouse off heart removes animation",
  withTestFixture(async ({ heartPage, page }) => {
    await heartPage.goto();
    await heartPage.hoverHeart();
    await page?.waitForTimeout(100);

    await page?.mouse.move(0, 0);
    await page?.waitForTimeout(100);

    await heartPage.expectHeartBeatingState(false);
  }),
);
