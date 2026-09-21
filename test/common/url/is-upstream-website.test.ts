import { describe, expect, it } from "vitest";
import { isUpstreamWebsite } from "../../../src/common/url/is-upstream-website";

describe("isUpstreamWebsite", () => {
  it.each([
    "https://www.home-assistant.io/docs/",
    "https://community.home-assistant.io/",
    "https://newsletter.openhomefoundation.org/",
    "https://github.com/home-assistant/frontend",
    "https://fosstodon.org/@homeassistant",
    "https://my.home-assistant.io/redirect/example",
  ])("recognizes upstream website %s", (url) => {
    expect(isUpstreamWebsite(url)).toBe(true);
  });

  it.each([
    "/config/system",
    "homeassistant://config/system",
    "https://home-assistant.io.example.com/",
    "https://example.com/?redirect=https://home-assistant.io",
    "https://github.com/home-assistant-custom/integration",
    "https://192.168.1.2:8123/",
    "https://my-home.ui.nabu.casa/",
  ])("preserves unrelated and functional URLs %s", (url) => {
    expect(isUpstreamWebsite(url)).toBe(false);
  });
});
