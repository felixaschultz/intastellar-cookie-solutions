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

## Files
| File | Purpose |
|------|---------|
| `dev/uc-vendors.dev.js` | Lazy-loaded vendor/cookie maps |
| `dev/gdpr.dev.js` | Main GDPR logic; stubs for detectCookieVendor/getConsentTypeForCookie; calls `loadUcVendors()` |
