import { sanitizeHttpUrl } from "../../../common/url/sanitize-http-url";
import {
  getCustomBadgeEntry,
  getCustomCardEntry,
  isCustomType,
  stripCustomPrefix,
} from "../../../data/lovelace_custom_cards";
import type { HomeAssistant } from "../../../types";

export const getCardDocumentationURL = (
  _hass: HomeAssistant,
  type: string
): string | undefined => {
  if (isCustomType(type)) {
    return sanitizeHttpUrl(
      getCustomCardEntry(stripCustomPrefix(type))?.documentationURL
    );
  }

  return undefined;
};

export const getBadgeDocumentationURL = (
  _hass: HomeAssistant,
  type: string
): string | undefined => {
  if (isCustomType(type)) {
    return sanitizeHttpUrl(
      getCustomBadgeEntry(stripCustomPrefix(type))?.documentationURL
    );
  }

  return undefined;
};
