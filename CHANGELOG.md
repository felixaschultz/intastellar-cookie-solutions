# Changelog

## v1.6.0 — 2026-07-14 — Multi-jurisdiction expansion: US state laws, PIPEDA, Law 25, Australian Privacy Act & Saudi PDPL

### New regulations

**US State Privacy Laws (opt-out model)**
- Added geo-detection and consent logic for Virginia (CDPA), Colorado (CPA), Utah (UCPA), and Connecticut (CTDPA) via `window.INTA.settings.usPrivacy`
- Geo-detected visitors in these states receive opt-out defaults (consents pre-checked, with a "Do not sell or share my personal data" button)
- Global Privacy Control (GPC) signal (`navigator.globalPrivacyControl`) is now automatically honoured for all US visitors — auto-triggers opt-out for CO and CT where it is legally required
- New `intaIsUsOptOutRegion()` helper covers all five US opt-out jurisdictions (CA + VA + CO + UT + CT)
- `salesOfDataAllowed` in the consent object is now written for all US opt-out states, not just California
- Opt-out button and popup are now state-aware: label, title, and law name update dynamically per detected state (CCPA/CPRA, CDPA, CPA, UCPA, CTDPA)
- Google Consent Mode: `US-VA`, `US-CO`, `US-UT`, `US-CT` added to the opt-out (granted-by-default) region array

**PIPEDA — Canada (federal)**
- Added geo-detection for all Canadian visitors (`country === "CA"`) via `window.INTA.settings.pipeda`
- Applies opt-in defaults (same model as GDPR)
- New bilingual (English primary, French secondary) rights modal covering the six PIPEDA rights, with a reference to the Office of the Privacy Commissioner of Canada (OPC)

**Law 25 — Quebec, Canada**
- Added geo-detection for Quebec visitors (`country === "CA"`, `region_code === "QC"`) via `window.INTA.settings.law25`
- Quebec visitors receive the Law 25 modal instead of the PIPEDA modal (stricter law takes precedence)
- New French-primary bilingual modal covering all Law 25 rights, including the two rights unique to Quebec vs PIPEDA: data portability and right to stop dissemination / de-indexation
- References the Commission d'accès à l'information (CAI) as the supervisory authority

**Australian Privacy Act 1988 (Cth)**
- Added geo-detection for Australian visitors (`country === "AU"`) via `window.INTA.settings.australianPrivacy`
- Applies opt-in defaults
- New English rights modal citing the Australian Privacy Principles (APP 2, 5, 7, 12, 13) and the Office of the Australian Information Commissioner (OAIC)
- `AU` added to the Google Consent Mode denied-by-default region list

**Saudi Arabia PDPL (Personal Data Protection Law)**
- Added geo-detection for Saudi visitors (`country === "SA"`) via `window.INTA.settings.pdpl`
- Applies opt-in defaults
- New Arabic-primary bilingual modal with inline `dir="rtl" lang="ar"` on Arabic elements and `dir="ltr"` English spans — no CSS changes required
- Covers six PDPL rights including the right to erasure and the right to object
- References SDAIA (الهيئة السعودية للبيانات والذكاء الاصطناعي / Saudi Data & AI Authority) as the supervisory authority
- `SA` added to the Google Consent Mode denied-by-default region list

### New features

- **Automatic cookie list & cookie detection** — integration with the Intastellar cookie scanner; detected cookies are now automatically listed in the consent banner without manual configuration
- All new regulation modals reuse the existing `inta-lgpd-modal-*` CSS class structure, inheriting styling with zero additional stylesheet changes

### Bug fixes

- General bug fixes and stability improvements

---

## v1.3.0
- First public release
- MIT license applied
- Documentation added
- Multi-language support included
- Support for Shopify Consent API
- Support for Google Consent Mode V2
- Support for Meta Consent Mode
- Support for HubSpot Cookie consent API
