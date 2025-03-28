import { expect } from "$std/expect/mod.ts";
import { withTestFixture } from "./utils/testHelper.ts";
import { HeartColor } from "@/data/colors.ts";

Deno.test(
  "heart changes colour when touched",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.openAsync();
    const initialColor = await heartPage.heart.getColorAsync();

    await heartPage.heart.touch();
    const newColor = await heartPage.heart.getColorAsync();

    expect(initialColor).not.toBe(newColor);
  }),
);

Deno.test(
  "heart changes colour of hue light when touched",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.openAsync();
    await heartPage.heart.touch();
    expect(heartPage.heart.getLastHueColorChange()).not.toBe(HeartColor.Green);
  }),
);

Deno.test(
  "heart updates browser URL when touched",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.openAsync();
    expect(heartPage.heart.getLastHueColorChange()).toBe(HeartColor.Green);

    await heartPage.heart.touch();

    const expectedColor = heartPage.heart.getLastHueColorChange();
    expect(await heartPage.waitForUrlToMatchAsync(`/${expectedColor}`))
      .toBe(true);
  }),
);

Deno.test(
  "heart beats when hovered",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.openAsync();
    expect(await heartPage.isHeartBeatingAsync()).toBe(false);

    await heartPage.heart.hover();
    expect(await heartPage.isHeartBeatingAsync()).toBe(true);

    await heartPage.heart.leave();
    expect(await heartPage.isHeartBeatingAsync()).toBe(false);
  }),
);
