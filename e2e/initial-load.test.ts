import { expect } from "$std/expect/mod.ts";
import { HeartColor } from "@data/colors.ts";
import { withTestFixture } from "./utils/testHelper.ts";

Deno.test({
  name: "page has a title",
  fn: withTestFixture(async ({ heartPage }) => {
    await heartPage.openAsync();
    const title = await heartPage.getPageTitleAsync();
    expect(title).toBe("sg1981x");
  }),
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "heart is green initially",
  fn: withTestFixture(async ({ heartPage }) => {
    await heartPage.openAsync();
    expect(await heartPage.heart.getColorAsync()).toBe(HeartColor.Green);
  }),
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "page sets colour of hue light to green initially",
  fn: withTestFixture(async ({ heartPage }) => {
    await heartPage.openAsync();
    expect(heartPage.heart.getLastHueColorChange()).toBe(HeartColor.Green);
  }),
  sanitizeResources: false,
  sanitizeOps: false,
});
