/** Identifies upstream promotional and documentation websites, without matching lookalike domains. */
export const isUpstreamWebsite = (value: string): boolean => {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return false;
    }
    const host = url.hostname.toLowerCase();
    return (
      host === "home-assistant.io" ||
      host.endsWith(".home-assistant.io") ||
      host === "openhomefoundation.org" ||
      host.endsWith(".openhomefoundation.org") ||
      (host === "github.com" &&
        /^\/home-assistant(?:\/|$)/.test(url.pathname)) ||
      (host === "fosstodon.org" && url.pathname === "/@homeassistant")
    );
  } catch {
    return false;
  }
};
