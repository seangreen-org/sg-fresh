// !! direct url tests
// !! remove timeouts and direct page access

import { expect } from "$std/expect/mod.ts";
import { withTestFixture } from "./utils/testHelper.ts";
import { rotationColorMap } from "@/data/colors.ts";

const defaultColor = Object.keys(rotationColorMap)[0];

Deno.test(
  "Page loads with correct title",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.goto();
    const title = await heartPage.getPageTitle();
    expect(title).toBe("sg1981x");
  }),
);

Deno.test(
  "Heart SVG is visible",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.goto();
    await heartPage.expectHeartToBeVisible();
  }),
);

Deno.test(
  "Heart has default color style",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.goto();
    await heartPage.expectHeartToHaveColor(defaultColor);
  }),
);

Deno.test(
  "Sends initial Hue API request",
  withTestFixture(async ({ heartPage }) => {
  const { requestPromise, requestData } = await heartPage.interceptHueApiRequest();
    await heartPage.goto();
    await requestPromise;
    expect(requestData.color).toBe(defaultColor);
  }),
);
