# JavaScript Execution Optimization: Split Architecture

This document describes the split architecture used to reduce **initial script parse and execution time** for `uc.js`.

## Problem
The full `uc.js` bundle (~158KB minified) parses and executes synchronously on page load, contributing to high **Total CPU Time**, **Script Evaluation**, and **Script Parse** metrics (e.g. 951 ms total, 379 ms evaluation, 33 ms parse).

## Solution: Lazy-Load Vendor Maps
The heaviest data in `gdpr.dev.js` is the **detectCookieVendor** function with its `VENDOR_MAP` and `COOKIE_CONSENT_TYPE_MAP` (~530 lines, ~15KB). This data is only needed when:
- A cookie is set (to classify for `recordCookie`)
- The user opens the cookie list (to show vendor names)

### Implementation
1. **`dev/uc-vendors.dev.js`** – New file containing:
   - `VENDOR_MAP` (cookie name → vendor)
   - `COOKIE_CONSENT_TYPE_MAP` (cookie name → consent type)
   - `detectCookieVendor()` and `getConsentTypeForCookie()` implementations
   - Exposes: `window.__intaDetectCookieVendor`, `window.__intaCookieConsentTypeMap`, `window.__intaGetConsentTypeForCookie`

2. **`dev/gdpr.dev.js`** – Modified:
   - Replaced inline maps with stubs that delegate to `window.__inta*` when loaded
   - Added `loadUcVendors()` – loads `uc-vendors.js` on `DOMContentLoaded`
   - `detectCookieVendor()` returns `'unknown vendor'` until uc-vendors loads
   - `getConsentTypeForCookie()` returns `'marketing'` until uc-vendors loads

## Build & Deploy
For production:

1. **Minify and deploy** `uc-vendors.dev.js` as `uc-vendors.js` on your CDN:
   - URL: `https://consents.cdn.intastellarsolutions.com/uc-vendors.js`

2. **uc.js** remains the main entry point; it will load `uc-vendors.js` automatically on DOMContentLoaded.

3. Optional: Set `window.INTA.settings.vendorsUrl` to override the uc-vendors URL (e.g. for self-hosting or dev).

## Expected Impact
- **Initial uc.js parse**: ~15KB fewer tokens to parse (~10% reduction)
- **Initial execution**: ~15KB of object literals deferred until uc-vendors loads
- **Total CPU time**: Lower initial spike; uc-vendors load overlaps with other work

## cb.js locale split (per-language files)

### Problem
`cb.js` ships ~40+ language branches (~2k lines of HTML templates). Only one runs, but V8 still **parses and compiles** the whole file.

### Solution
1. **`dev/cb-locale-loader.dev.js`** – Concatenated into `cb.js` at build time. Provides:
   - `intaResolveCmpLocaleSlug()`
   - `intaBuildCmpUiFromLocale(payload)` – one generic settings/footer template
   - `intaTryApplyPreloadedCmpLocale()` – skips inline branches when a locale file loaded

2. **`dev/languages/{slug}.dev.js`** – One file per locale (e.g. `en`, `da`). Sets `window.__intaCmpLocalePayload` with **inline category text** (no dependency on `uc.js`).

3. **`scripts/cmp-language-categories.source.js`** – Build-time source for category labels/descriptions; used by `generate-cmp-locales.mjs` only (not loaded at runtime).

3. **`uc.js` preload** – Before injecting `cb.js`, `intaPreloadCmpLocaleScript()` loads `languages/{slug}.js` during `requestIdleCallback` (not blocking LCP).

4. **Vendor list** – `getVendorsForUI()` runs only when the user opens the vendor list (`intaEnsureVendorListLoaded`).

### Deploy
| File | CDN path |
|------|----------|
| `languages/en.js` | `https://consents.cdn.intastellarsolutions.com/languages/en.js` |
| `languages/da.js` | `https://consents.cdn.intastellarsolutions.com/languages/da.js` |

### Site config
```javascript
window.INTA = {
  settings: {
    language: "english", // or locale: "en"
    // localeSplit: false,  // disable external locale files (use inline cb branches)
    // localeUrl: "https://cdn.example.com/cmp/locales/{locale}.js"
  }
};
```

### Migration
Add `dev/languages/{slug}.dev.js` for each language (or run `node scripts/generate-cmp-locales.mjs`), then remove the matching inline branch from `cb.dev.js`. **All 21 supported locales are now externalized**; `cb.dev.js` no longer contains the ~2.2k-line inline language block.

### Regenerating locale files

```bash
node scripts/generate-cmp-locales.mjs
```

Sources: `messages` + `settingsMessagesLanguages` in `dev/cb.dev.js`, UI labels in `scripts/cmp-locale-catalog.mjs`. Production minify outputs `languages/*.js` on push to `production`.

### Other uc.js optimizations
- **`uc-boot` / `uc-core` split** – sync `uc.js` (~42 KB minified) installs interceptors and script blocking; `uc-core.js` (~58 KB) loads async with banner, Shopify, cookie lists, integrations
- **`intastellarSupportedLanguages` removed from `uc.js`** – ~35KB source / ~12KB minified saved; category copy lives in each `languages/{slug}.js` file instead
- **Blocked iframe / embed copy lazy-loaded** – multilingual placeholder messages and accept-button labels moved to `uc-blocked-iframe.js` (~8KB source); loaded on first iframe/embed block
- Intastellar analytics script deferred via `requestIdleCallback` (3s timeout)
- Pre-compiled `allScripts` regexes for fetch/XHR consent checks
- `requestIdleCallback` before loading `cb.js` (replaces fixed 800ms delay)
- Debounced `MutationObserver` (80ms batch)

## Blocked iframe message split

### Problem
`loopBlock` / `blockBlockQuotes` inlined ~400 lines of per-locale HTML templates and button labels for blocked YouTube, Facebook, Twitter embeds, etc. Most pages never hit this path, but every visitor still parsed it.

### Solution
1. **`dev/uc-blocked-iframe.dev.js`** – `SCRIPT_TYPE_LABELS`, `CONTENT_TEMPLATES`, locale resolver, and button builders. Exposes `window.__intaResolveBlockedIframeLocaleKey`, `window.__intaBlockedIframeContentMessage`, `window.__intaBlockedIframeButtonText`.

2. **`dev/gdpr.dev.js`** – Stubs + `loadUcBlockedIframeMessages()`; `intaPickBlockedIframeStrings()` delegates to the lazy-loaded module. English fallbacks until the script loads.

### Deploy
| File | CDN path |
|------|----------|
| `uc-blocked-iframe.js` | `https://consents.cdn.intastellarsolutions.com/uc-blocked-iframe.js` |

Optional: `window.INTA.settings.blockedIframeUrl` to override (dev mode loads `../../dev/uc-blocked-iframe.dev.js`).

## uc-boot / uc-core split (render-blocking)

### Problem
Even after lazy-loading vendors, locales, and iframe copy, `uc.js` still parsed ~114 KB synchronously on every page — blocking HTML parse and delaying LCP.

### Solution
1. **`scripts/build-uc-split.mjs`** – Extracts sync-critical code from `dev/gdpr.dev.js` into `dev/uc-boot.dev.js`; remainder → `dev/uc-core.dev.js`. Re-run after editing `gdpr.dev.js`:
   ```bash
   node scripts/build-uc-split.mjs
   ```
2. **Production** – `uc.js` = minified boot (entry URL unchanged for customers). `uc-core.js` loads async immediately after boot runs.
3. **Boot includes** – `allScripts` / `notRequired`, consent defaults, fetch/XHR/cookie interceptors, `MutationObserver`, blocked-embed placeholders.
4. **Core includes** – Banner (`cb.js` scheduling), Shopify/WordPress, cookie vendor lists, TCF, geo, experiments.

### Deploy
| File | CDN path |
|------|----------|
| `uc.js` | `https://consents.cdn.intastellarsolutions.com/uc.js` |
| `uc-core.js` | `https://consents.cdn.intastellarsolutions.com/uc-core.js` |

Optional: `window.INTA.settings.coreUrl` to override core script URL.

### Dev
Load `dev/uc-boot.dev.js` (not `gdpr.dev.js`); boot pulls in `dev/uc-core.dev.js` when `intastellarDevMode` is on.

## Files
| File | Purpose |
|------|---------|
| `dev/uc-vendors.dev.js` | Lazy-loaded vendor/cookie maps |
| `dev/uc-blocked-iframe.dev.js` | Lazy-loaded blocked iframe/embed copy |
| `dev/uc-boot.dev.js` | Sync CMP guard (production `uc.js`); generated by `build-uc-split.mjs` |
| `dev/uc-core.dev.js` | Async CMP core (production `uc-core.js`); generated by `build-uc-split.mjs` |
| `dev/gdpr.dev.js` | Monolithic source — edit this, then run `node scripts/build-uc-split.mjs` |
