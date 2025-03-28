import { expect } from "$std/expect/mod.ts";
import { withTestFixture } from "./utils/testHelper.ts";
import { ColorName, colorNames } from "@/data/colors.ts";

Deno.test(
  "heart changes colour when touched",
  withTestFixture(async ({ heart: heartPage }) => {
    await heartPage.open();
    const initialColor = await heartPage.getHeartColor();

    await heartPage.touch();
    const newColor = await heartPage.getHeartColor();

    expect(initialColor).not.toBe(newColor);
  }),
);

Deno.test(
  "heart changes colour of light when touched",
  withTestFixture(async ({ heart: heartPage }) => {
    await heartPage.open();

    const {
      requestPromise: clickRequestPromise,
      requestData: clickRequestData
    } = await heartPage.interceptHueApiRequest();

    await heartPage.touch();
    await clickRequestPromise;

    expect(clickRequestData.color).not.toBe(ColorName.Green);
    expect(colorNames).toContain(clickRequestData.color as ColorName);
  }),
);

Deno.test(
  "heart updates browser URL when touched",
  withTestFixture(async ({ heart: heartPage }) => {
    await heartPage.open();

    const { requestPromise: clickRequestPromise, requestData: clickRequestData } =
      await heartPage.interceptHueApiRequest();

    await heartPage.touch();
    await clickRequestPromise;

    const expectedColor = clickRequestData.color;
    expect(await heartPage.waitForUrlToMatch(`/${expectedColor}`)).toBe(true);
  }),
);

Deno.test(
  "heart beats when hovered",
  withTestFixture(async ({ heart: heartPage }) => {
    await heartPage.open();
    expect(await heartPage.isHeartBeating()).toBe(false);

    await heartPage.hover();
    expect(await heartPage.isHeartBeating()).toBe(true);

    await heartPage.leave();
    expect(await heartPage.isHeartBeating()).toBe(false);
  }),
);
