import { beforeEach, describe, expect, it, vi } from "vitest";
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

describe("saved language preference", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it.each(["en", "zh-Hans"])(
    "preserves the selected %s language",
    (language) => {
      localStorage.setItem("selectedLanguage", JSON.stringify(language));
      expect(getLocalLanguage()).toBe(language);
    }
  );

  it("ignores malformed preferences", () => {
    localStorage.setItem("selectedLanguage", "invalid json");
    expect(getLocalLanguage()).toBe("zh-Hans");
  });

  it("ignores unsupported preferences", () => {
    localStorage.setItem("selectedLanguage", JSON.stringify("unknown"));
    expect(getLocalLanguage()).toBe("zh-Hans");
  });
});
