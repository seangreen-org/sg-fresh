import { expect } from "$std/expect/mod.ts";
import { defaultColor, withTestFixture } from "./utils/testHelper.ts";
import { type ColorName, colorNames, rotationColorMap } from "@/data/colors.ts";

Deno.test(
  "heart changes colour when touched",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.open();
    const initialRotation = await heartPage.getHeartHueRotateValue();

    await heartPage.touchHeart();
    const newRotation = await heartPage.getHeartHueRotateValue();

    expect(newRotation).not.toBe(initialRotation);
    expect(Object.values(rotationColorMap)).toContain(newRotation);
  }),
);

Deno.test(
  "heart changes colour of light when touched",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.open();

    const {
      requestPromise: clickRequestPromise,
      requestData: clickRequestData
    } = await heartPage.interceptHueApiRequest();

    await heartPage.touchHeart();
    await clickRequestPromise;

    expect(clickRequestData.color).not.toBe(defaultColor);
    expect(colorNames).toContain(clickRequestData.color as ColorName);
  }),
);

Deno.test(
  "heart updates browser URL when touched",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.open();

    const { requestPromise: clickRequestPromise, requestData: clickRequestData } =
      await heartPage.interceptHueApiRequest();

    await heartPage.touchHeart();
    await clickRequestPromise;

    const expectedColor = clickRequestData.color;
    await heartPage.expectPageUrlToContain(`/${expectedColor}`);
  }),
);

Deno.test(
  "heart beats when touched",
  withTestFixture(async ({ heartPage }) => {
    await heartPage.open();
    await heartPage.expectHeartBeatingState(false);
    await heartPage.hoverHeart();
    await heartPage.expectHeartBeatingState(true);
    await heartPage.hoverOffHeart();
    await heartPage.expectHeartBeatingState(false);
  }),
);
