# Bundled translations

`zh-Hans.json` contains the official Simplified Chinese translations extracted
from `home-assistant-frontend==20260826.7` (Apache-2.0), including its page
fragments. It allows local builds without GitHub translation-download credentials.

The build merges this baseline with nightly translations when available, with
nightly translations taking precedence. Keys missing in both fall back to English.
