import { expect } from "$std/expect/mod.ts";
import { ColorName } from "@/data/colors.ts";
import { withTestFixture } from "./utils/testHelper.ts";

Deno.test(
  "page has a title",
  withTestFixture(async ({ heart: heartPage }) => {
    await heartPage.open();
    const title = await heartPage.getPageTitle();
    expect(title).toBe("sg1981x");
  }),
);

Deno.test(
  "page shows heart",
  withTestFixture(async ({ heart: heartPage }) => {
    await heartPage.open();
    const heartVisible = await heartPage.isHeartVisible();
    expect(heartVisible).toBe(true);
  }),
);

Deno.test(
  "heart is green initially",
  withTestFixture(async ({ heart: heartPage }) => {
    await heartPage.open();
    const heartColor = await heartPage.getHeartColor();
    expect(heartColor).toBe(ColorName.Green);
  }),
);

Deno.test(
  "page sends initial Hue API request",
  withTestFixture(async ({ heart: heartPage }) => {
  const { requestPromise, requestData } = await heartPage.interceptHueApiRequest();
    await heartPage.open();
    await requestPromise;
    expect(requestData.color).toBe(ColorName.Green);
  }),
);
