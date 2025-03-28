import { TestFixture } from "../fixtures/testFixture.ts";

type TestLogicFn = (fixture: TestFixture) => Promise<void> | void;

interface TestOptions {
  name: string;
  fn: TestLogicFn;
  ignore?: boolean;
  only?: boolean;
}

export function test(options: TestOptions): void;
export function test(name: string, fn: TestLogicFn): void;

export function test(
  nameOrOptions: string | TestOptions,
  fn?: TestLogicFn,
): void {
  let testName: string;
  let testLogic: TestLogicFn;
  let ignore = false;
  let only = false;

  if (typeof nameOrOptions === "string") {
    testName = nameOrOptions;
    if (!fn) {
      throw new Error(
        "Test function implementation is missing when using string name syntax.",
      );
    }
    testLogic = fn;
  } else {
    testName = nameOrOptions.name;
    testLogic = nameOrOptions.fn;
    ignore = nameOrOptions.ignore ?? false;
    only = nameOrOptions.only ?? false;
  }

  Deno.test({
    name: testName,
    ignore: ignore,
    only: only,
    async fn(): Promise<void> {
      const fixture = new TestFixture();
      try {
        await fixture.setup();
        await testLogic(fixture);
      } finally {
        await fixture.teardown();
      }
    },
  });
}

test.only = (nameOrOptions: string | Omit<TestOptions, "only">, fn?: TestLogicFn) => {
    if (typeof nameOrOptions === 'string') {
        if (!fn) {
          throw new Error("Test function implementation is missing when using string name syntax.");
        }
        test({ name: nameOrOptions, fn, only: true });
    } else {
        test({ ...nameOrOptions, only: true });
    }
};

test.ignore = (nameOrOptions: string | Omit<TestOptions, "ignore">, fn?: TestLogicFn) => {
    if (typeof nameOrOptions === 'string') {
      if (!fn) {
        throw new Error("Test function implementation is missing when using string name syntax.");
      }
      test({ name: nameOrOptions, fn: fn, ignore: true });
    } else {
        test({ ...nameOrOptions, ignore: true });
    }
};
