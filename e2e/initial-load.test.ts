// !! direct url tests
import { expect } from "$std/expect/mod.ts";
import { defaultColor, withTestFixture } from "./utils/testHelper.ts";

Deno.test(
  "page loads with correct title",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.open();
    const title = await heartPage.getPageTitle();
    expect(title).toBe("sg1981x");
  }),
);

Deno.test(
  "page shows heart",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.open();
    await heartPage.expectHeartToBeVisible();
  }),
);

Deno.test(
  "heart is green by default",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.open();
    await heartPage.expectHeartColorToBe(defaultColor);
  }),
);

Deno.test(
  "page sends initial Hue API request",
  withTestFixture(async ({ heartPage }) => {
  const { requestPromise, requestData } = await heartPage.interceptHueApiRequest();
    await heartPage.open();
    await requestPromise;
    expect(requestData.color).toBe(defaultColor);
  }),
);
