import { TestFixture } from "../fixtures/Fixture.ts";

type TestLogicFn = (fixture: TestFixture) => Promise<void> | void;

export function withTestFixture(
  userLogic: TestLogicFn,
): Deno.TestDefinition["fn"] {
  return async () => {
    const fixture = new TestFixture();
    try {
      await fixture.setup();
      await userLogic(fixture);
    } finally {
      await fixture.teardown();
    }
  };
}
