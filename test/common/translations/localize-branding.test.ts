import { describe, expect, it } from "vitest";
import { computeLocalize } from "../../../src/common/translations/localize";

describe("branded translations", () => {
  it("brands server translations without changing user-provided names", async () => {
    const localize = await computeLocalize<string>(
      document.createElement("div"),
      "en",
      { en: { greeting: "Welcome to Home Assistant, {name}" } }
    );

    expect(localize("greeting", { name: "Home Assistant lab" })).toBe(
      "Welcome to CHENGVIN, Home Assistant lab"
    );
  });

  it("brands companion app copy", async () => {
    const localize = await computeLocalize<string>(
      document.createElement("div"),
      "en",
      {
        en: {
          authorizing_app:
            "You're about to give the Home Assistant Companion app for {app} access to your Home Assistant instance.",
        },
      }
    );

    expect(localize("authorizing_app", { app: "Android" })).toBe(
      "You're about to give the CHENGVIN Assistant app for Android access to your CHENGVIN instance."
    );
  });
});
