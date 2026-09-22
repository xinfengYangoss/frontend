/**
 * @vitest-environment node
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

const jsBase = readFileSync(
  path.join(repoRoot, "src/html/_js_base.html.template"),
  "utf-8"
);

const evaluateIsModern = (userAgent, hasFindLast) => {
  const body = jsBase
    .replace(/<script>|<\/script>/g, "")
    .replace("<%= modernRegex %>", "/Chrome\\/(?:1[2-9]\\d|[2-9]\\d{2})\\./");
  const context = {
    navigator: { userAgent },
    document: {
      createElement: () => ({ onerror: null, src: "" }),
      head: { appendChild: (node) => node },
    },
    window: {},
    Array: {
      prototype: hasFindLast ? { findLast: () => undefined } : {},
    },
  };
  vm.runInNewContext(body, context);
  return context.isModern;
};

describe("authorize/onboarding modern browser detection", () => {
  it("serves modern JS to an up-to-date Chrome WebView", () => {
    expect(
      evaluateIsModern(
        "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
        true
      )
    ).toBe(true);
  });

  it("falls back to ES5 on companion HarmonyOS WebViews below the modern floor", () => {
    expect(
      evaluateIsModern(
        "Mozilla/5.0 (Linux; Android 12; HarmonyOS) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/99.0.4844.88 Mobile Safari/537.36 Home Assistant/2026.1.0 (Android 12; HMA-AL00)",
        true
      )
    ).toBe(false);
  });

  it("falls back to ES5 on vivo Z3-class WebViews without findLast", () => {
    expect(
      evaluateIsModern(
        "Mozilla/5.0 (Linux; Android 8.1.0; vivo Z3 Build/OPM1.171019.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 Mobile Safari/537.36 Home Assistant/2026.1.0 (Android 8.1.0; vivo Z3)",
        false
      )
    ).toBe(false);
  });
});
