import { expect } from "$std/expect/mod.ts";
import { HeartColor } from "@/data/colors.ts";
import { withTestFixture } from "./utils/testHelper.ts";

Deno.test(
  "page has a title",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.openAsync();
    const title = await heartPage.getPageTitleAsync();
    expect(title).toBe("sg1981x");
  }),
);

Deno.test(
  "page shows heart",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.openAsync();
    const heartVisible = await heartPage.heart.isVisible();
    expect(heartVisible).toBe(true);
  }),
);

Deno.test(
  "heart is green initially",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.openAsync();
    expect(await heartPage.heart.getColorAsync()).toBe(HeartColor.Green);
  }),
);

Deno.test(
  "page sends initial Hue API request",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.openAsync();
    expect(heartPage.heart.getLastHueColorChange()).toBe(HeartColor.Green);
  }),
);
