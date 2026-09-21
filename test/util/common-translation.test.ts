import { describe, expect, it, vi } from "vitest";
import { getLocalLanguage } from "../../src/util/common-translation";

vi.hoisted(() => {
  vi.stubGlobal("__STATIC_PATH__", "/static/");
});

vi.mock("../../src/resources/translations-metadata", () => ({
  translationMetadata: {
    translations: {
      en: { hash: "dev" },
      "zh-Hans": { hash: "dev" },
    },
  },
}));

describe("getLocalLanguage", () => {
  it("always uses Simplified Chinese", () => {
    localStorage.setItem("selectedLanguage", JSON.stringify("en"));
    expect(getLocalLanguage()).toBe("zh-Hans");
  });
});
