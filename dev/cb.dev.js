/*
 *  Cookie Consents Banner by Intastellar Solutions, International
 *  intastellarsolutions.com/gdpr-cookiebanner
 *  consents.cdn.intastellarsolutions.com/uc.js
 *  @copy 2022-2024 Intastellar Solutions, International
 *
*/
// --- IAB Global Vendor List (GVL) fetch & cache utility ---
const GVL_URL = "https://apis.intastellarsolutions.com/gvl";
let gvlCache = null;
let gvlCacheTimestamp = 0;
const GVL_CACHE_TTL = 60 * 60 * 1000; // 1 hour

/**
 * Fetches the IAB Global Vendor List (GVL), with session-based caching.
 * @returns {Promise<Object>} The GVL JSON object.
 */
async function fetchGVL() {
    // Check session storage for cached GVL
    const cachedGVL = sessionStorage.getItem("gvlCache");
    const cachedTimestamp = sessionStorage.getItem("gvlCacheTimestamp");

    /* if (cachedGVL && cachedTimestamp) {
        const age = Date.now() - parseInt(cachedTimestamp, 10);
        if (age < GVL_CACHE_TTL) {
            gvlCache = JSON.parse(cachedGVL);
            gvlCacheTimestamp = parseInt(cachedTimestamp, 10);
            return gvlCache;
        }
    } */

    // Fetch GVL from server if not in cache or expired
    try {
        const response = await fetch(GVL_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch GVL: ${response.statusText}`);
        }
        gvlCache = await response.json();
        gvlCacheTimestamp = Date.now();

        // Store in session storage
        //sessionStorage.setItem("gvlCache", JSON.stringify(gvlCache));
        //sessionStorage.setItem("gvlCacheTimestamp", gvlCacheTimestamp.toString());

        return gvlCache;
    } catch (error) {
        console.error("Error fetching GVL:", error);
        return null;
    }
}

/**
 * Gets the list of vendors for UI rendering. Usage: await getVendorsForUI()
 * @returns {Promise<Array>} Array of vendor objects
 */
async function getVendorsForUI() {
    const gvl = await fetchGVL();

    // Returns an array of vendor objects (id, name, purposes, policyUrl, etc.)
    return Object.values(gvl || {});
}

function onSaveConsent() {
    // Purposes: collect from your UI (e.g., checkboxes with ids purpose1, purpose2, ...)
    const purposes = [];
    for (let i = 1; i <= 24; i++) {
        const el = document.getElementById('purpose' + i);
        purposes.push(el && el.checked);
    }
    // Vendors: collect from rendered checkboxes
    const vendors = [];
    for (let i = 1; i <= 24; i++) {
        const el = document.getElementById('vendor' + i);
        vendors.push(el && el.checked);
    }
    const userConsent = { purposes, vendors };
    const tcString = generateTcString(userConsent);
    // Save tcString, update __tcfapi, etc.
    console.log('User TCString:', tcString);
    // Call updateVwoConsent if available, pass a consent object if you have it
    if (typeof updateVwoConsent === 'function') {
        // You may need to adapt this to your actual consent object structure
        updateVwoConsent(window.intaCookieConsents || {});
    }
}

// Example usage (for development):
// getVendorsForUI().then(vendors => console.log('GVL Vendors:', vendors));
// You can now use getVendorsForUI() to populate your Manage Vendors modal.

const pSBC = (p, c0, c1, l) => {
    let r, g, b, P, f, t, h, i = parseInt, m = Math.round, a = typeof (c1) == "string";
    if (typeof (p) != "number" || p < -1 || p > 1 || typeof (c0) != "string" || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null;
    if (!this.pSBCr) this.pSBCr = (d) => {
        let n = d.length, x = {};
        if (n > 9) {
            [r, g, b, a] = d = d.split(","), n = d.length;
            if (n < 3 || n > 4) return null;
            x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1
        } else {
            if (n == 8 || n == 6 || n < 4) return null;
            if (n < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
            d = i(d.slice(1), 16);
            if (n == 9 || n == 5) x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000;
            else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1
        } return x
    };
    h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == "c" ? !h : false : h, f = this.pSBCr(c0), P = p < 0, t = c1 && c1 != "c" ? this.pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }, p = P ? p * -1 : p, P = 1 - p;
    if (!f || !t) return null;
    if (l) r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b);
    else r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5);
    a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
    if (h) return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";
    else return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2)
}

function darkLightCheck(color) {
    if(!color) return 'dark';
    let r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {
        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
            color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 173.5) {

        return 'light';
    }
    else {

        return 'dark';
    }
}

let message = "";
let cookieBtn = "";
function intaGetTextOverrides() {
    let settings = window.INTA && window.INTA.settings;
    if (settings && typeof settings.textOverrides === "object" && settings.textOverrides !== null) {
        return settings.textOverrides;
    }
    return {};
}

function intaGetRawTextOverride(key) {
    let overrides = intaGetTextOverrides();
    let value = overrides[key];
    if (typeof value === "string" && value.trim().length > 0) {
        return value;
    }
    return null;
}

function intaGetTextOverride(key, fallbackText) {
    let override = intaGetRawTextOverride(key);
    return override !== null ? override : fallbackText;
}

/** Decline / necessary-only label: `necessaryButton`, aliases `declineButton`, `declineAllButton`. */
function intaGetNecessaryButtonText(fallbackText) {
    let o = intaGetRawTextOverride("necessaryButton");
    if (o !== null) return o;
    o = intaGetRawTextOverride("declineButton");
    if (o !== null) return o;
    o = intaGetRawTextOverride("declineAllButton");
    if (o !== null) return o;
    return fallbackText;
}

/** Vendor list CTA; override with `textOverrides.vendorListButton`. */
function intaVendorListButtonLabel() {
    let lang = (typeof intastellarCookieLanguage !== "undefined" && intastellarCookieLanguage !== null) ? String(intastellarCookieLanguage).toLowerCase() : "";
    let sl = (window.INTA && window.INTA.settings && window.INTA.settings.language) ? String(window.INTA.settings.language).toLowerCase() : "";
    let def = "Vendor list";

    if (lang === "da-dk" || lang === "da" || lang === "dk" || sl === "danish" || sl === "da") def = "Leverandørliste";
    else if (lang === "de" || lang === "de-de" || sl === "german" || sl === "de") def = "Anbieterliste";
    else if (lang === "en" || lang === "en-gb" || lang === "en-us" || sl === "english" || sl === "en") def = "Vendor list";
    else if (lang === "es" || lang === "es-es" || sl === "spanish" || sl === "es") def = "Lista de proveedores";
    else if (lang === "fr" || lang === "fr-fr" || sl === "french" || sl === "fr") def = "Liste des fournisseurs";
    else if (lang === "it" || lang === "it-it" || sl === "italian" || sl === "it") def = "Elenco fornitori";
    else if (lang === "nl" || lang === "nl-nl" || sl === "dutch" || sl === "nl") def = "Leverancierslijst";
    else if (lang === "sv" || lang === "sv-se" || sl === "swedish" || sl === "sv") def = "Leverantörslista";
    else if (lang === "no" || lang === "no-no" || sl === "norwegian" || sl === "no") def = "Leverandørliste";
    else if (lang === "pl" || lang === "pl-pl" || sl === "polish" || sl === "pl") def = "Lista dostawców";
    else if (lang === "pt" || lang === "pt-pt" || sl === "portuguese" || sl === "pt") def = "Lista de fornecedores";
    else if (lang === "ru" || lang === "ru-ru" || sl === "russian" || sl === "ru") def = "Список поставщиков";
    else if (lang === "fi" || lang === "fi-fi" || sl === "finnish" || sl === "fi") def = "Toimittajaluettelo";
    else if (lang === "cs" || lang === "cs-cz" || sl === "czech" || sl === "cs") def = "Seznam dodavatelů";
    else if (lang === "hu" || lang === "hu-hu" || sl === "hungarian" || sl === "hu") def = "Szállítók listája";
    else if (lang === "tr" || lang === "tr-tr" || sl === "turkish" || sl === "tr") def = "Satıcı listesi";
    else if (lang === "zh" || lang === "zh-cn" || sl === "chinese" || sl === "zh") def = "供应商列表";
    else if (lang === "ja" || lang === "ja-jp" || sl === "japanese" || sl === "ja") def = "ベンダー一覧";
    else if (lang === "ko" || lang === "ko-kr" || sl === "korean" || sl === "ko") def = "공급업체 목록";
    else if (lang === "ar" || lang === "ar-sa" || sl === "arabic" || sl === "ar") def = "قائمة البائعين";
    else if (lang === "et" || lang === "et-ee") def = "Tarnijate loend";
    else if (lang === "he" || lang === "he-il" || sl === "hebrew" || sl === "he") def = "רשימת ספקים";
    else if (lang === "af" || lang === "af-za" || sl === "afrikaans" || sl === "af") def = "Verskafferlys";
    else if (lang === "bg" || lang === "bg-bg" || sl === "bulgarian" || sl === "bg") def = "Списък на доставчици";
    else if (lang === "ro" || lang === "ro-ro" || sl === "romanian" || sl === "ro") def = "Lista furnizorilor";
    else if (lang === "uk" || lang === "uk-ua" || sl === "ukrainian" || sl === "uk") def = "Список постачальників";
    else if (lang === "el" || lang === "el-gr" || sl === "greek" || sl === "el") def = "Λίστα προμηθευτών";
    else if (lang === "hi" || lang === "hi-in" || sl === "hindi" || sl === "hi") def = "विक्रेता सूची";
    else if (lang === "th" || lang === "th-th" || sl === "thai" || sl === "th") def = "รายชื่อผู้ขาย";
    else if (lang === "id" || lang === "id-id") def = "Daftar vendor";
    else if (lang === "ms" || lang === "ms-my") def = "Senarai vendor";
    else if (lang === "vi" || lang === "vi-vn") def = "Danh sách nhà cung cấp";

    return intaGetTextOverride("vendorListButton", def);
}

/** Cache for IAB device storage disclosure JSON (`deviceStorageDisclosureUrl`). */
window.__intaDeviceStorageJsonCache = window.__intaDeviceStorageJsonCache || {};

/**
 * GET JSON via XMLHttpRequest (often not wrapped when only `fetch` is intercepted).
 */
function intaFetchJsonViaXhr(url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.timeout = 25000;
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    resolve(JSON.parse(xhr.responseText));
                } catch (e) {
                    reject(e);
                }
            } else {
                reject(new Error(String(xhr.status)));
            }
        };
        xhr.onerror = function () {
            reject(new Error("network"));
        };
        xhr.ontimeout = function () {
            reject(new Error("timeout"));
        };
        try {
            xhr.send(null);
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * Load device-storage disclosure JSON without depending on a patched `fetch`.
 * 1) `INTA.settings.fetchDisclosure(url)` if set
 * 2) `window.__intaNativeFetch` (save `fetch` here before interceptors)
 * 3) XMLHttpRequest, then `fetch` as last resort
 */
function intaFetchDeviceStorageDisclosureJson(url) {
    let settings = window.INTA && window.INTA.settings;
    if (settings && typeof settings.fetchDisclosure === "function") {
        return Promise.resolve(settings.fetchDisclosure(url)).then(function (r) {
            if (r && typeof r.json === "function") {
                return r.json();
            }
            return r;
        });
    }
    if (typeof window.__intaNativeFetch === "function") {
        return window.__intaNativeFetch(url, { credentials: "omit", cache: "force-cache" }).then(function (resp) {
            if (!resp || !resp.ok) {
                throw new Error(resp ? String(resp.status) : "no response");
            }
            return resp.json();
        });
    }
    return intaFetchJsonViaXhr(url).catch(function () {
        if (typeof fetch !== "function") {
            throw new Error("no fetch");
        }
        return fetch(url, { credentials: "omit", cache: "force-cache" }).then(function (r) {
            if (!r.ok) {
                throw new Error(String(r.status));
            }
            return r.json();
        });
    });
}

/**
 * Collect vendor URLs your fetch/XHR interceptor may need to allow (GVL deviceStorage + policy links).
 * Sets `window.__intaGvlPassThroughUrls` / `window.__intaGvlPassThroughHosts`, fires `intastellar:vendor-pass-through-urls`,
 * and calls `INTA.settings.onVendorPassThroughUrlsReady(detail)` when defined.
 *
 * Interceptors: save the real fetch first (`window.__intaNativeFetch = fetch.bind(window)`), then patch `fetch`.
 * In your wrapper, if `window.intaIsGvlVendorPassThroughUrl(requestUrl)` is true, delegate to `__intaNativeFetch`
 * (and allow the same URL in XHR if you wrap `XMLHttpRequest.open`).
 */
function intaCollectVendorPassThroughUrls(vendors) {
    let urlMap = {};
    let hostMap = {};
    function addUrl(u) {
        if (!u || typeof u !== "string") {
            return;
        }
        let t = u.trim();
        if (!/^https?:\/\//i.test(t)) {
            return;
        }
        urlMap[t] = true;
        try {
            let h = new URL(t).hostname;
            if (h) {
                hostMap[h] = true;
            }
        } catch (e1) { }
    }
    (vendors || []).forEach(function (v) {
        if (!v) {
            return;
        }
        addUrl(v.deviceStorageDisclosureUrl);
        (v.urls || []).forEach(function (row) {
            if (row && row.privacy) {
                addUrl(row.privacy);
            }
        });
    });
    let urls = Object.keys(urlMap);
    let hosts = Object.keys(hostMap);
    window.__intaGvlPassThroughUrls = urls;
    window.__intaGvlPassThroughHosts = hosts;
    let detail = { urls: urls, hosts: hosts, vendors: vendors || [] };
    let settings = window.INTA && window.INTA.settings;
    if (settings && typeof settings.onVendorPassThroughUrlsReady === "function") {
        try {
            settings.onVendorPassThroughUrlsReady(detail);
        } catch (e2) { }
    }
    try {
        window.dispatchEvent(new CustomEvent("intastellar:vendor-pass-through-urls", { detail: detail }));
    } catch (e3) { }
}

/**
 * True when `url` is a full-string match in `__intaGvlPassThroughUrls`, or its hostname is in `__intaGvlPassThroughHosts`
 * (populated after GVL vendors load). Use inside a blocking fetch/XHR shim to pass these requests through unchanged.
 */
function intaIsGvlVendorPassThroughUrl(url) {
    if (!url || typeof url !== "string") {
        return false;
    }
    let u = url.trim();
    let list = window.__intaGvlPassThroughUrls;
    if (Array.isArray(list) && list.indexOf(u) !== -1) {
        return true;
    }
    try {
        let h = new URL(u).hostname;
        let hosts = window.__intaGvlPassThroughHosts;
        if (Array.isArray(hosts) && hosts.indexOf(h) !== -1) {
            return true;
        }
    } catch (e0) { }
    return false;
}

window.intaIsGvlVendorPassThroughUrl = intaIsGvlVendorPassThroughUrl;

function intaEscapeHtmlAttr(str) {
    return String(str == null ? "" : str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/'/g, "&#39;");
}

/**
 * HTML for GVL `deviceStorageDisclosureUrl` (machine-readable disclosure JSON).
 * Override labels via textOverrides: deviceStorageDisclosureLink, deviceStorageDetailsShow, deviceStorageDetailsHide.
 */
function intaFormatMaxAgeSecondsForDisclosure(sec) {
    let n = Number(sec);
    if (!isFinite(n) || n < 0) {
        return "";
    }
    let days = Math.round(n / 86400);
    if (days >= 1) {
        return days + (days === 1 ? " day" : " days");
    }
    let hours = Math.round(n / 3600);
    if (hours >= 1) {
        return hours + (hours === 1 ? " hour" : " hours");
    }
    return String(Math.round(n)) + " s";
}

/** Human-readable HTML from IAB-style device storage disclosure JSON (no raw JSON dump). */
function intaRenderDeviceStorageDisclosureHtml(data) {
    if (data == null) {
        return "<p>" + intaEscapeHtmlAttr(intaGetTextOverride("deviceStorageNoEntries", "No disclosure data.")) + "</p>";
    }
    if (typeof data !== "object") {
        return "<p>" + intaEscapeHtmlAttr(String(data)) + "</p>";
    }
    let parts = [];
    let disclosures = Array.isArray(data.disclosures) ? data.disclosures : [];
    let cookiesHeading = intaEscapeHtmlAttr(intaGetTextOverride("deviceStorageCookiesHeading", "Cookies and storage"));
    parts.push('<div class="inta-ds-section"><strong>' + cookiesHeading + "</strong>");
    if (!disclosures.length) {
        parts.push("<p style=\"margin:6px 0 0;\">" + intaEscapeHtmlAttr(intaGetTextOverride("deviceStorageNoEntries", "No entries in this disclosure.")) + "</p>");
    } else {
        parts.push("<ul style=\"margin:6px 0 0 18px;padding:0;list-style:disc;\">");
        disclosures.forEach(function (row) {
            if (!row || typeof row !== "object") {
                return;
            }
            let identifier = row.identifier != null ? String(row.identifier) : "";
            let typ = row.type != null ? String(row.type) : "";
            let doms = Array.isArray(row.domains) ? row.domains.map(function (d) {
                return intaEscapeHtmlAttr(String(d));
            }).join(", ") : "";
            let maxAge = intaFormatMaxAgeSecondsForDisclosure(row.maxAgeSeconds);
            let purposes = Array.isArray(row.purposes) ? row.purposes.map(function (p) {
                return intaEscapeHtmlAttr(String(p));
            }).join(", ") : "";
            let title = intaEscapeHtmlAttr(identifier || typ || "—");
            let typePart = typ ? " <span style=\"opacity:.85;\">(" + intaEscapeHtmlAttr(typ) + ")</span>" : "";
            let meta = [];
            if (doms) {
                meta.push(intaEscapeHtmlAttr(intaGetTextOverride("deviceStorageLabelDomains", "Domains")) + ": " + doms);
            }
            if (maxAge) {
                meta.push(intaEscapeHtmlAttr(intaGetTextOverride("deviceStorageLabelMaxAge", "Max age")) + ": " + intaEscapeHtmlAttr(maxAge));
            }
            if (purposes) {
                meta.push(intaEscapeHtmlAttr(intaGetTextOverride("deviceStorageLabelPurposes", "Purposes (IDs)")) + ": " + purposes);
            }
            if (row.cookieRefresh === true) {
                meta.push(intaEscapeHtmlAttr(intaGetTextOverride("deviceStorageLabelRefresh", "May refresh")));
            }
            parts.push("<li style=\"margin-bottom:8px;\"><span class=\"inta-ds-name\">" + title + "</span>" + typePart
                + (meta.length ? "<div style=\"margin-top:3px;font-size:10px;line-height:1.35;opacity:.92;\">" + meta.join(" · ") + "</div>" : "")
                + "</li>");
        });
        parts.push("</ul>");
    }
    parts.push("</div>");
    let domainRows = Array.isArray(data.domains) ? data.domains : [];
    if (domainRows.length) {
        let dh = intaEscapeHtmlAttr(intaGetTextOverride("deviceStorageDomainsHeading", "Domains in use"));
        parts.push('<div class="inta-ds-section" style="margin-top:10px;"><strong>' + dh + "</strong>");
        parts.push("<ul style=\"margin:6px 0 0 18px;padding:0;list-style:disc;\">");
        domainRows.forEach(function (d) {
            if (!d || typeof d !== "object") {
                return;
            }
            let dom = intaEscapeHtmlAttr(String(d.domain || ""));
            let use = d.use != null ? intaEscapeHtmlAttr(String(d.use)) : "";
            parts.push("<li style=\"margin-bottom:6px;\"><span>" + dom + "</span>"
                + (use ? "<div style=\"margin-top:2px;font-size:10px;opacity:.9;\">" + use + "</div>" : "")
                + "</li>");
        });
        parts.push("</ul></div>");
    }
    return parts.join("");
}

function intaDeviceStorageDisclosureBlock(vendor) {
    let url = vendor && vendor.deviceStorageDisclosureUrl;
    if (!url || typeof url !== "string" || !/^https?:\/\//i.test(url.trim())) {
        return "";
    }
    url = url.trim();
    let enc = encodeURIComponent(url);
    let linkText = intaEscapeHtmlAttr(intaGetTextOverride("deviceStorageDisclosureLink", "Device storage disclosure"));
    let btnShow = intaEscapeHtmlAttr(intaGetTextOverride("deviceStorageDetailsShow", "Show storage details"));
    let btnHide = intaEscapeHtmlAttr(intaGetTextOverride("deviceStorageDetailsHide", "Hide storage details"));
    return '<div class="inta-gvl-device-storage" style="margin-top:6px;">'
        + '<a class="intSettingsTitleLink" style="display:block;padding:0;text-align:left;" href="' + intaEscapeHtmlAttr(url) + '" target="_blank" rel="noopener noreferrer">' + linkText + '</a>'
        + '<button type="button" class="inta-device-storage-toggle" style="margin-top:4px;background:none;border:0;padding:0;cursor:pointer;text-decoration:underline;font:inherit;color:inherit;" data-device-storage-url="' + enc + '" data-inta-ds-show="' + btnShow + '" data-inta-ds-hide="' + btnHide + '" aria-expanded="false">' + btnShow + '</button>'
        + '<div class="inta-device-storage-details" style="display:none;margin:6px 0 0;padding:8px;background:#f5f5f5;border-radius:4px;font-size:14px;word-break:break-word;max-height:340px;width:100%;overflow:auto;line-height:1.35;"></div>'
        + "</div>";
}

function intaDeviceStorageToggleClick(ev) {
    let btn = ev.target && ev.target.closest && ev.target.closest(".inta-device-storage-toggle");
    if (!btn) {
        return;
    }
    ev.preventDefault();
    let wrap = btn.closest(".inta-gvl-device-storage");
    let panel = wrap && wrap.querySelector(".inta-device-storage-details");
    let enc = btn.getAttribute("data-device-storage-url");
    if (!panel || !enc) {
        return;
    }
    let url = decodeURIComponent(enc);
    let showL = btn.getAttribute("data-inta-ds-show") || "Show storage details";
    let hideL = btn.getAttribute("data-inta-ds-hide") || "Hide storage details";
    let open = panel.style.display !== "none" && panel.style.display !== "";
    if (open) {
        panel.style.display = "none";
        btn.textContent = showL;
        btn.setAttribute("aria-expanded", "false");
        return;
    }
    function fillPanel(json) {
        panel.innerHTML = intaRenderDeviceStorageDisclosureHtml(json);
    }
    if (window.__intaDeviceStorageJsonCache[url]) {
        fillPanel(window.__intaDeviceStorageJsonCache[url]);
        panel.style.display = "block";
        btn.textContent = hideL;
        btn.setAttribute("aria-expanded", "true");
        return;
    }
    btn.disabled = true;
    intaFetchDeviceStorageDisclosureJson(url)
        .then(function (json) {
            window.__intaDeviceStorageJsonCache[url] = json;
            fillPanel(json);
            panel.style.display = "block";
            btn.textContent = hideL;
            btn.setAttribute("aria-expanded", "true");
        })
        .catch(function () {
            panel.textContent = intaGetTextOverride("deviceStorageDetailsLoadError", "Could not load disclosure JSON. Open the link above.");
            panel.style.display = "block";
            btn.textContent = hideL;
            btn.setAttribute("aria-expanded", "true");
        })
        .finally(function () {
            btn.disabled = false;
        });
}

/** Merge server / experiment text override keys into `window.INTA.settings.textOverrides`. */
function intaMergeTextOverridesIntoSettings(incomingTO) {
    if (!incomingTO || typeof incomingTO !== "object" || incomingTO === null || Array.isArray(incomingTO)) {
        return;
    }
    if (!window.INTA || !window.INTA.settings) {
        return;
    }
    let existingTO = window.INTA.settings.textOverrides;
    let mergedTO = {};
    if (existingTO && typeof existingTO === "object" && existingTO !== null && !Array.isArray(existingTO)) {
        for (let bk in existingTO) {
            if (existingTO.hasOwnProperty(bk)) {
                mergedTO[bk] = existingTO[bk];
            }
        }
    }
    for (let ik in incomingTO) {
        if (incomingTO.hasOwnProperty(ik)) {
            mergedTO[ik] = incomingTO[ik];
        }
    }
    window.INTA.settings.textOverrides = mergedTO;
}

function intaCbExperimentGetQueryParam(name) {
    try {
        const params = new URLSearchParams(window.location.search || "");
        return params.get(name);
    } catch (e) {
        return null;
    }
}

/** Pre-check optional categories when visit is attributed to Capterra (utm_campaign or dedicated param). */
function intaIsCapterraTraffic() {
    try {
        const p = new URLSearchParams(window.location.search || "");
        const campaign = String(
            p.get("utm_campaign") || p.get("utmCampaign") || ""
        ).toLowerCase();
        if (campaign.indexOf("capterra") !== -1) {
            return true;
        }
        const capParamNames = ["utm_capterra", "utm_Capterra", "utmCapterra", "capterra"];
        for (let i = 0; i < capParamNames.length; i++) {
            const raw = p.get(capParamNames[i]);
            if (raw == null || String(raw).trim() === "") {
                continue;
            }
            const low = String(raw).trim().toLowerCase();
            if (low === "1" || low === "true" || low === "yes" || low.indexOf("capterra") !== -1) {
                return true;
            }
        }
    } catch (e) { /* ignore */ }
    return false;
}

/** Returns `"checked"` for optional consent checkboxes when Capterra traffic or stored consent is on. */
function intaConsentCheckboxAttr(consentField) {
    if (intaIsCapterraTraffic()) {
        return "checked";
    }
    if (typeof getCookie !== "function" || typeof decodeIntaConsentsObject !== "function") {
        return "";
    }
    try {
        const c = getCookie(int_hideCookieBannerName);
        if (c && c !== "" && c.indexOf("__inta") > -1) {
            const decoded = JSON.parse(decodeIntaConsentsObject(c.split(".")[2]) || "{}");
            const v = decoded && decoded.consents && decoded.consents[consentField];
            if (v === "checked" || v === true) {
                return "checked";
            }
        }
    } catch (e2) { /* ignore */ }
    return "";
}

function intaCbExperimentNormalizeValue(value) {
    return String(value == null ? "" : value).trim().toLowerCase();
}

function intaCbExperimentValueInList(value, list) {
    if (!Array.isArray(list)) {
        return false;
    }
    const normalized = intaCbExperimentNormalizeValue(value);
    if (!normalized) {
        return false;
    }
    for (let i = 0; i < list.length; i++) {
        if (intaCbExperimentNormalizeValue(list[i]) === normalized) {
            return true;
        }
    }
    return false;
}

function intaCbExperimentChannelMatches(exp, expKey) {
    if (!exp || !exp.channel) {
        return true;
    }
    const match = exp.channel.match || {};
    const utmSource = intaCbExperimentGetQueryParam("utm_source") || intaCbExperimentGetQueryParam("utmSource");
    const matched = intaCbExperimentValueInList(utmSource, match.utmSource);
    const channelKey = expKey + "_channel";
    if (matched) {
        try {
            sessionStorage.setItem(channelKey, "1");
        } catch (e) { }
        return true;
    }
    try {
        return sessionStorage.getItem(channelKey) === "1";
    } catch (e2) { }
    return false;
}

function intaCbResolveExperimentVariantId(exp) {
    if (!exp || !exp.id || !exp.variants || !Object.keys(exp.variants).length) {
        return null;
    }
    const expKey = "inta_exp_" + exp.id;
    if (!intaCbExperimentChannelMatches(exp, expKey)) {
        return null;
    }
    if (window.INTA && window.INTA.experimentVariant && exp.variants[window.INTA.experimentVariant]) {
        return window.INTA.experimentVariant;
    }
    let stored = null;
    try {
        stored = sessionStorage.getItem(expKey);
    } catch (e) { }
    let variantId = stored;
    if (!variantId) {
        let variants = exp.variants;
        let total = 0;
        let ids = [];
        for (let k in variants) {
            if (variants.hasOwnProperty(k)) {
                let w = Math.max(0, parseInt(variants[k].weight, 10) || 50);
                total += w;
                ids.push({ id: k, weight: w });
            }
        }
        if (total <= 0) {
            return null;
        }
        let r = (function simpleHash() {
            let s = exp.id + (navigator.userAgent || "") + (document.referrer || "") + (new Date().getDate());
            let h = 0;
            for (let i = 0; i < s.length; i++) {
                h = ((h << 5) - h) + s.charCodeAt(i) | 0;
            }
            return Math.abs(h) % 10000 / 10000;
        })();
        let bucket = r * total;
        for (let j = 0; j < ids.length; j++) {
            bucket -= ids[j].weight;
            if (bucket <= 0) {
                variantId = ids[j].id;
                break;
            }
        }
        variantId = variantId || (ids[0] && ids[0].id);
        try {
            sessionStorage.setItem(expKey, variantId);
        } catch (e2) { }
    }
    return variantId;
}

/** Preset slug from gdpr `__intaTextOverridePresetId`, `INTA.settings`, or active experiment variant. */
function intaCbResolveTextOverridePresetSlug() {
    if (typeof window.__intaTextOverridePresetId === "string" && window.__intaTextOverridePresetId.trim()) {
        return window.__intaTextOverridePresetId.trim();
    }
    let s = window.INTA && window.INTA.settings;
    if (s) {
        if (s.textOverridePresetId != null && String(s.textOverridePresetId).trim() !== "") {
            return String(s.textOverridePresetId).trim();
        }
        if (s.textOverridesPresetId != null && String(s.textOverridesPresetId).trim() !== "") {
            return String(s.textOverridesPresetId).trim();
        }
    }
    let exp = window.INTA && window.INTA.experiment;
    let variantId = intaCbResolveExperimentVariantId(exp);
    if (!exp || !variantId || !exp.variants || !exp.variants[variantId]) {
        return null;
    }
    let v = exp.variants[variantId];
    let overrides = (v && v.settings) || (exp.overrides && exp.overrides[variantId]) || {};
    if (overrides.textOverridePresetId != null && String(overrides.textOverridePresetId).trim() !== "") {
        return String(overrides.textOverridePresetId).trim();
    }
    if (overrides.textOverridesPresetId != null && String(overrides.textOverridesPresetId).trim() !== "") {
        return String(overrides.textOverridesPresetId).trim();
    }
    return null;
}

const intaCbTextOverridePresetApiUrl = "https://apis.intastellarsolutions.com/public/presets";

/**
 * Normalizes preset API JSON: either a flat textOverrides map or `{ textOverrides: { ... } }`.
 * Rejects non-objects; coerces a JSON string body once.
 */
function intaCbNormalizePresetApiBody(data) {
    if (data == null) {
        return null;
    }
    if (typeof data === "string") {
        try {
            data = JSON.parse(data);
        } catch (e) {
            return null;
        }
    }
    if (typeof data !== "object" || data === null || Array.isArray(data)) {
        return null;
    }
    const nested = data.textOverrides;
    if (nested && typeof nested === "object" && nested !== null && !Array.isArray(nested) && Object.keys(nested).length > 0) {
        return nested;
    }
    const flat = {};
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key) && key !== "textOverrides") {
            flat[key] = data[key];
        }
    }
    return Object.keys(flat).length ? flat : null;
}

/** After preset merge, refresh button labels that were built before fetch (cookieBtn + more-settings strip). */
function intaCbSyncTextOverrideLabelsInScope(scope) {
    if (!scope || typeof scope.querySelectorAll !== "function") {
        return;
    }
    scope.querySelectorAll(".intastellarCookieSettings--acceptAll").forEach(function (el) {
        const cur = el.textContent || "";
        el.textContent = intaGetTextOverride("acceptAllButton", cur);
    });
    scope.querySelectorAll(".intastellarCookieBanner__accpetNecssery").forEach(function (el) {
        const cur = el.textContent || "";
        el.textContent = intaGetNecessaryButtonText(cur);
    });
    scope.querySelectorAll(".intastellarCookieBanner__settings").forEach(function (el) {
        const cur = el.textContent || "";
        if (el.classList && el.classList.contains("--save")) {
            el.textContent = intaGetTextOverride("saveSettingsButton", cur);
        } else {
            el.textContent = intaGetTextOverride("settingsButton", cur);
        }
    });
}

/** Fetches published preset JSON when a text-override preset id exists; merges into `textOverrides`. */
function intaCbFetchTextOverridePresetFromApiIfNeeded() {
    let slug = intaCbResolveTextOverridePresetSlug();
    if (!slug || typeof fetch !== "function") {
        return Promise.resolve();
    }
    let url = intaCbTextOverridePresetApiUrl + "?slug=" + encodeURIComponent(slug);
    return fetch(url, { credentials: "omit", cache: "no-store" })
        .then(function (res) {
            if (!res.ok) {
                throw new Error("HTTP " + res.status);
            }
            return res.json();
        })
        .then(function (data) {
            const payload = intaCbNormalizePresetApiBody(data);
            if (payload && typeof payload === "object" && !Array.isArray(payload)) {
                intaMergeTextOverridesIntoSettings(payload);
            }
            try {
                window.dispatchEvent(new CustomEvent("inta:text-override-preset-loaded", { detail: { presetId: slug, source: "presets.php" } }));
            } catch (evErr) { }
        })
        .catch(function (err) {
            console.warn("[Intastellar] CMP preset fetch failed:", slug, err && err.message ? err.message : err);
        });
}
/* const poweredBy = `<a class="inta-poweredBy" href='https://www.intastellarsolutions.com?utm_source=${encodeURI(window.location.href)}&utm_content=powered_by&utm_medium=referral&utm_campaign=Consents+Block&utm_term=gdpr_banner_logo' target='_blank' rel='noopener' style="align-items: center; text-decoration: none;font-size: 11.5px; color: #000 !important; display: flex; justify-content: center;">powered by <img width="109px" height="20px" style="width: 109px !important; height: 20px !important;margin-left: 10px;" src="https://www.intastellarsolutions.com/assets/intastellar_solutions.svg" alt="Intastellar Solutions, International"></a>`; */
const banner = document.createElement("inta-consents-settings-btn");
const bannerContent = document.createElement("button");
const intastellarLogoLight = "https://www.intastellarsolutions.com/assets/logos/intastellar-consents-logo-white.svg";
const intastellarLogoDark = "https://www.intastellarsolutions.com/assets/logos/intastellar-consents-logo.svg";
const moreSettings = window._IntastellarConsentsBanner = document.createElement("inta-consents-banner");
const moreSettingsContent = document.createElement("section");
const moreintHeader = document.createElement("intheader");
const moreContentText = document.createElement("section");
const moreFooter = document.createElement("div");
const intaconsents = window.intaconsents = document.createElement("intastellarconsents");
window.platform = findScriptParameter("utm_source") === undefined ? "Manual" : findScriptParameter("utm_source");
(function () {
    function pushVisible() {
        if (window.dataLayer && Array.isArray(window.dataLayer)) {
            dataLayer.push({ event: 'intastellar_consents_widget_visible', platform: window.platform });
        }
    }
    if (typeof requestIdleCallback === "function") {
        requestIdleCallback(pushVisible, { timeout: 2500 });
    } else {
        setTimeout(pushVisible, 0);
    }
})();

// --- IAB TCF encoder bundle must be loaded above this script ---
// Paste the browser-ready bundle here or load it before this script.
// window.IABTCF.TCModel and window.IABTCF.TCString must be available.


/**
 * Single on/off switch for the whole TCF surface (window.__tcfapi, __tcfapiLocator,
 * tcString generation). Intastellar Consents is not currently an IAB Europe-registered
 * CMP, so there is no valid CmpId to issue — emitting a well-formed TC string anyway
 * would misrepresent TCF participation to vendors and compliance scanners alike.
 * Once registered, set window.INTA.settings.cmpId to the real registered ID; every
 * TCF code path below keys off this one flag and turns on automatically.
 */
function intaTcfIsRegistered() {
    return !!(window.INTA && window.INTA.settings && window.INTA.settings.cmpId > 0);
}

/**
 * Generates a valid TCF 2.x TC string using the minimal IAB encoder bundle.
 * TCF 2.3: includes the mandatory Disclosed Vendors segment (required for new/updated signals from Feb 28, 2026).
 * Returns null while Intastellar isn't IAB-registered (see intaTcfIsRegistered).
 * @param {Object} consentObj - {purposes: [bool,...], vendors: [bool,...], disclosedVendors?: [bool,...]}
 * @returns {string|null} Encoded TC string (core.disclosedVendors), or null if TCF is not enabled
 */
function generateTcString(consentObj) {
    if (!intaTcfIsRegistered()) {
        return null;
    }
    if (!window.IABTCF || !window.IABTCF.TCModel || !window.IABTCF.TCString) {
        throw new Error('IAB TCF encoder bundle not loaded.');
    }
    let model = new window.IABTCF.TCModel();
    model.cmpId = window.INTA.settings.cmpId;
    model.cmpVersion = window.INTA.settings.cmpVersion || model.cmpVersion;
    // Set purposes and vendors as boolean arrays (first 24)
    model.purposeConsents = (consentObj.purposes || []).slice(0, 24);
    model.vendorConsents = (consentObj.vendors || []).slice(0);
    // TCF 2.3: vendors disclosed to the user in the CMP (default: same as vendors we collect consent for)
    model.disclosedVendors = Array.isArray(consentObj.disclosedVendors)
        ? consentObj.disclosedVendors.slice(0)
        : (consentObj.vendors || []).slice(0).map(function() { return true; });
    // Add vendorLegitimateInterests if present
    if (Array.isArray(consentObj.vendorLegitimateInterests)) {
        model.vendorLegitimateInterests = consentObj.vendorLegitimateInterests.slice(0);
        window.vendorLegitimateInterests = consentObj.vendorLegitimateInterests.slice(0);
    }
    return window.IABTCF.TCString.encode(model);
}

// --- Example usage ---
// Suppose you have a consent object from your UI:
const exampleConsent = {
    /* Default declined purposes and vendors */
    purposes: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    vendors: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
};
const tcString = generateTcString(exampleConsent);

// --- Patch: Wire consent save/deny to TCF update ---
// Find the save/deny consent logic and call __tcfapiDispatchConsentChanged after consent changes

// Time-to-decision: compute and attach to consent object for analytics/backend
function recordTimeToDecision(decisionType) {
    let shownAt = window._intaBannerShownAt;
    if (typeof shownAt !== 'number') return;
    let elapsed = Math.round(Date.now() - shownAt);
    window._intaBannerShownAt = undefined;
    if (typeof intaConsentsObjectVariable !== 'undefined') {
        intaConsentsObjectVariable.time_to_decision = elapsed;
    }
    if (window.dataLayer) {
        window.dataLayer.push({ event: 'intastellar_consent_decision', time_to_decision_ms: elapsed, decision_type: decisionType });
    }
    return elapsed;
}

// Utility: Call this after any consent change (save/deny)
// Pass true/ 'useractioncomplete' when user clicked; false/'tcloaded' when consent loaded/restored without user interaction
function dispatchTCFConsentChangedIfAvailable(wasUserInteraction) {
    if (typeof window.__tcfapiDispatchConsentChanged === 'function') {
        let eventStatus = (wasUserInteraction === false || wasUserInteraction === 'tcloaded') ? 'tcloaded' : 'useractioncomplete';
        window.__tcfapiDispatchConsentChanged(eventStatus);
    }
}

/* LGPD Modal */
function showLGPDModal() {
    const lgpdModal = document.querySelector('#lgpd-modal');
    const intastellarConsents = document.querySelector('.intastellarCookieConstents');
    if (lgpdModal) {

        intastellarConsents.style.display = 'none';
        lgpdModal.classList.add('inta-lgpd-active');
    }
}

function createLGPDModal() {
    const modal = document.createElement('inta-lgpd-modal');
    modal.innerHTML = `
    <div id="lgpd-modal" role="dialog" aria-modal="true" aria-labelledby="lgpd-title">
        <div class="inta-lgpd-modal-box">

        <!-- Header -->
        <div class="inta-lgpd-modal-header">
            <div class="inta-lgpd-modal-header-left">
            <div class="inta-lgpd-modal-header-icon">⚖</div>
            <div>
                <div class="inta-lgpd-modal-title" id="lgpd-title">Seus Direitos de Privacidade</div>
                <div class="inta-lgpd-modal-subtitle">Lei Geral de Proteção de Dados · Art. 18</div>
            </div>
            </div>
            <button class="inta-lgpd-modal-close" onclick="closeLGPDModal()" aria-label="Fechar">✕</button>
        </div>

        <!-- Body -->
        <div class="inta-lgpd-modal-body">
            <p class="inta-lgpd-modal-intro">
            Nos termos da <strong>LGPD (Lei nº 13.709/2018)</strong>, você possui os seguintes direitos em relação aos seus dados pessoais. Para exercê-los, entre em contato com o nosso Encarregado de Dados (DPO).
            </p>

            <ul class="inta-lgpd-rights-list">
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">1</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Confirmação</strong> do Tratamento</div>
                <div class="inta-lgpd-right-desc">Você tem o direito de saber se tratamos seus dados pessoais.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">2</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Acesso</strong> aos Dados</div>
                <div class="inta-lgpd-right-desc">Você pode solicitar uma cópia completa dos dados pessoais que possuímos sobre você.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">3</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Correção</strong> de Dados Inexatos</div>
                <div class="inta-lgpd-right-desc">Você pode solicitar a correção de dados incompletos, inexatos ou desatualizados.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">4</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Anonimização, Bloqueio ou Eliminação</strong></div>
                <div class="inta-lgpd-right-desc">Você pode pedir a anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a LGPD.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">5</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Portabilidade</strong> dos Dados</div>
                <div class="inta-lgpd-right-desc">Você tem o direito de solicitar a transferência dos seus dados a outro fornecedor de serviço ou produto.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">6</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Eliminação</strong> dos Dados Tratados com Consentimento</div>
                <div class="inta-lgpd-right-desc">Você pode solicitar a eliminação dos dados tratados com base no seu consentimento, a qualquer momento.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">7</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Informação</strong> sobre Compartilhamento</div>
                <div class="inta-lgpd-right-desc">Você tem o direito de saber com quais entidades públicas e privadas seus dados foram compartilhados.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">8</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Revogação</strong> do Consentimento</div>
                <div class="inta-lgpd-right-desc">Você pode retirar seu consentimento a qualquer momento, sem prejuízo da licitude do tratamento realizado anteriormente.</div>
                </div>
            </li>
            </ul>

            <!-- DPO Contact -->
            <div class="inta-lgpd-dpo-section">
            <div class="inta-lgpd-dpo-label">Encarregado de Dados (DPO)</div>
            <div class="inta-lgpd-dpo-text">
                Para exercer qualquer um dos direitos acima, entre em contato com o responsável pelo tratamento de dados deste site:<br><br>
                📧 <a href="mailto:dpo@exemplo.com.br">dpo@exemplo.com.br</a>
            </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="inta-lgpd-modal-footer">
            <span class="inta-lgpd-footer-note">Lei nº 13.709/2018 · ANPD</span>
            <button class="inta-lgpd-btn-close-modal" onclick="closeLGPDModal()">Entendi</button>
        </div>

        </div>
    </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

function closeLGPDModal() {
    const lgpdModal = document.querySelector('#lgpd-modal');
    const intastellarConsents = document.querySelector('.intastellarCookieConstents');
    if (lgpdModal) {
        intastellarConsents.style.display = 'grid';
        lgpdModal.classList.remove('inta-lgpd-active');

    }
}

/* POPIA Modal (South Africa) */
function showPOPIAModal() {
    const popiaModal = document.querySelector('#popia-modal');
    const intastellarConsents = document.querySelector('.intastellarCookieConstents');
    if (popiaModal) {
        intastellarConsents.style.display = 'none';
        popiaModal.classList.add('inta-lgpd-active');
    }
}

function createPOPIAModal() {
    const modal = document.createElement('inta-popia-modal');
    modal.innerHTML = `
    <div id="popia-modal" role="dialog" aria-modal="true" aria-labelledby="popia-title">
        <div class="inta-lgpd-modal-box">

        <!-- Header -->
        <div class="inta-lgpd-modal-header">
            <div class="inta-lgpd-modal-header-left">
            <div class="inta-lgpd-modal-header-icon">⚖</div>
            <div>
                <div class="inta-lgpd-modal-title" id="popia-title">Your Privacy Rights</div>
                <div class="inta-lgpd-modal-subtitle">Protection of Personal Information Act (POPIA) · South Africa</div>
            </div>
            </div>
            <button class="inta-lgpd-modal-close" onclick="closePOPIAModal()" aria-label="Close">✕</button>
        </div>

        <!-- Body -->
        <div class="inta-lgpd-modal-body">
            <p class="inta-lgpd-modal-intro">
            Under the <strong>Protection of Personal Information Act, 2013 (POPIA)</strong>, you have a number of rights in relation to your personal information. To exercise these rights, please contact our Information Officer / Data Protection contact.
            </p>

            <ul class="inta-lgpd-rights-list">
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">1</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Right of Access</strong></div>
                <div class="inta-lgpd-right-desc">You may request confirmation of whether we hold personal information about you, and request access to that information.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">2</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Right to Correction</strong></div>
                <div class="inta-lgpd-right-desc">You may request that we correct or update personal information that is inaccurate, incomplete, or outdated.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">3</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Right to Deletion or Destruction</strong></div>
                <div class="inta-lgpd-right-desc">In certain circumstances, you may ask us to delete, destroy, or de‑identify personal information that we no longer have a lawful basis to keep.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">4</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Right to Object or Restrict Processing</strong></div>
                <div class="inta-lgpd-right-desc">You may object to certain types of processing, including for direct marketing, or request that we restrict processing in specific cases.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">5</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Right to Withdraw Consent</strong></div>
                <div class="inta-lgpd-right-desc">Where processing is based on your consent, you may withdraw that consent at any time. This will not affect prior lawful processing.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">6</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Right to Lodge a Complaint</strong></div>
                <div class="inta-lgpd-right-desc">You may lodge a complaint with the Information Regulator of South Africa if you believe your POPIA rights have been infringed.</div>
                </div>
            </li>
            </ul>

            <!-- Contact -->
            <div class="inta-lgpd-dpo-section">
            <div class="inta-lgpd-dpo-label">Information Officer / Data Protection Contact</div>
            <div class="inta-lgpd-dpo-text">
                To exercise your POPIA rights, please contact the responsible party for this site:<br><br>
                📧 <a href="mailto:privacy@yourcompany.co.za">privacy@yourcompany.co.za</a>
            </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="inta-lgpd-modal-footer">
            <span class="inta-lgpd-footer-note">POPIA · Act 4 of 2013 · South Africa</span>
            <button class="inta-lgpd-btn-close-modal" onclick="closePOPIAModal()">I understand</button>
        </div>

        </div>
    </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

function closePOPIAModal() {
    const popiaModal = document.querySelector('#popia-modal');
    const intastellarConsents = document.querySelector('.intastellarCookieConstents');
    if (popiaModal) {
        intastellarConsents.style.display = 'grid';
        popiaModal.classList.remove('inta-lgpd-active');
    }
}

/* PIPEDA Modal (Canada — federal) */
function showPIPEDAModal() {
    const modal = document.querySelector('#pipeda-modal');
    const intastellarConsents = document.querySelector('.intastellarCookieConstents');
    if (modal) {
        intastellarConsents.style.display = 'none';
        modal.classList.add('inta-lgpd-active');
    }
}

function createPIPEDAModal() {
    const modal = document.createElement('inta-pipeda-modal');
    modal.innerHTML = `
    <div id="pipeda-modal" role="dialog" aria-modal="true" aria-labelledby="pipeda-title">
        <div class="inta-lgpd-modal-box">

        <!-- Header -->
        <div class="inta-lgpd-modal-header">
            <div class="inta-lgpd-modal-header-left">
            <div class="inta-lgpd-modal-header-icon">⚖</div>
            <div>
                <div class="inta-lgpd-modal-title" id="pipeda-title">Your Privacy Rights / Vos droits en matière de vie privée</div>
                <div class="inta-lgpd-modal-subtitle">Personal Information Protection and Electronic Documents Act (PIPEDA) · Canada</div>
            </div>
            </div>
            <button class="inta-lgpd-modal-close" onclick="closePIPEDAModal()" aria-label="Close">✕</button>
        </div>

        <!-- Body -->
        <div class="inta-lgpd-modal-body">
            <p class="inta-lgpd-modal-intro">
            Under the <strong>Personal Information Protection and Electronic Documents Act (PIPEDA)</strong>, you have the following rights regarding your personal information collected and used by this website. To exercise them, contact our Privacy Officer.
            </p>

            <ul class="inta-lgpd-rights-list">
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">1</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Right of Access</strong></div>
                <div class="inta-lgpd-right-desc">You may request access to the personal information we hold about you and receive it in a generally understandable form.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">2</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Right to Correction</strong></div>
                <div class="inta-lgpd-right-desc">You may request that we correct personal information that is inaccurate or incomplete.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">3</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Right to Know the Purpose</strong></div>
                <div class="inta-lgpd-right-desc">You have the right to know why your personal information is collected and how it will be used before or at the time of collection.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">4</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Right to Withdraw Consent</strong></div>
                <div class="inta-lgpd-right-desc">You may withdraw consent at any time, subject to legal or contractual restrictions and reasonable notice. We will advise you of the implications.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">5</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Right to Know Third-Party Disclosures</strong></div>
                <div class="inta-lgpd-right-desc">You have the right to know to which third parties your personal information has been disclosed.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">6</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Right to Lodge a Complaint</strong></div>
                <div class="inta-lgpd-right-desc">You may file a complaint with the Office of the Privacy Commissioner of Canada (OPC) if you believe your PIPEDA rights have been violated.</div>
                </div>
            </li>
            </ul>

            <!-- Privacy Officer contact -->
            <div class="inta-lgpd-dpo-section">
            <div class="inta-lgpd-dpo-label">Privacy Officer / Responsable de la protection de la vie privée</div>
            <div class="inta-lgpd-dpo-text">
                To exercise your PIPEDA rights, contact the Privacy Officer for this website:<br><br>
                📧 <a href="mailto:privacy@yourcompany.ca">privacy@yourcompany.ca</a>
            </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="inta-lgpd-modal-footer">
            <span class="inta-lgpd-footer-note">PIPEDA · S.C. 2000, c. 5 · Office of the Privacy Commissioner of Canada</span>
            <button class="inta-lgpd-btn-close-modal" onclick="closePIPEDAModal()">I understand / Je comprends</button>
        </div>

        </div>
    </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

function closePIPEDAModal() {
    const modal = document.querySelector('#pipeda-modal');
    const intastellarConsents = document.querySelector('.intastellarCookieConstents');
    if (modal) {
        intastellarConsents.style.display = 'grid';
        modal.classList.remove('inta-lgpd-active');
    }
}

/* Law 25 Modal (Quebec, Canada — stricter than PIPEDA, French primary) */
function showLaw25Modal() {
    const modal = document.querySelector('#law25-modal');
    const intastellarConsents = document.querySelector('.intastellarCookieConstents');
    if (modal) {
        intastellarConsents.style.display = 'none';
        modal.classList.add('inta-lgpd-active');
    }
}

function createLaw25Modal() {
    const modal = document.createElement('inta-law25-modal');
    modal.innerHTML = `
    <div id="law25-modal" role="dialog" aria-modal="true" aria-labelledby="law25-title">
        <div class="inta-lgpd-modal-box">

        <!-- Header -->
        <div class="inta-lgpd-modal-header">
            <div class="inta-lgpd-modal-header-left">
            <div class="inta-lgpd-modal-header-icon">⚖</div>
            <div>
                <div class="inta-lgpd-modal-title" id="law25-title">Vos droits en matière de vie privée / Your Privacy Rights</div>
                <div class="inta-lgpd-modal-subtitle">Loi 25 — Loi modernisant des dispositions législatives en matière de protection des renseignements personnels · Québec</div>
            </div>
            </div>
            <button class="inta-lgpd-modal-close" onclick="closeLaw25Modal()" aria-label="Fermer">✕</button>
        </div>

        <!-- Body -->
        <div class="inta-lgpd-modal-body">
            <p class="inta-lgpd-modal-intro">
            En vertu de la <strong>Loi 25</strong> (Loi modernisant des dispositions législatives en matière de protection des renseignements personnels), vous disposez des droits suivants concernant vos renseignements personnels.<br><br>
            <em>Under Quebec's Law 25 modernising personal information protection legislation, you have the following rights regarding your personal information.</em>
            </p>

            <ul class="inta-lgpd-rights-list">
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">1</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Droit d'accès</strong> <em>/ Right of Access</em></div>
                <div class="inta-lgpd-right-desc">Vous pouvez demander à consulter les renseignements personnels que nous détenons à votre sujet et en obtenir une copie. / You may request access to and a copy of the personal information we hold about you.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">2</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Droit de rectification</strong> <em>/ Right to Rectification</em></div>
                <div class="inta-lgpd-right-desc">Vous pouvez demander la correction de renseignements inexacts, incomplets ou équivoques. / You may request correction of inaccurate, incomplete, or misleading information.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">3</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Droit de retrait du consentement</strong> <em>/ Right to Withdraw Consent</em></div>
                <div class="inta-lgpd-right-desc">Vous pouvez retirer votre consentement au traitement de vos renseignements personnels à tout moment. / You may withdraw consent to the processing of your personal information at any time.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">4</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Droit à la portabilité</strong> <em>/ Right to Data Portability</em></div>
                <div class="inta-lgpd-right-desc">Vous pouvez demander que vos renseignements personnels informatisés vous soient communiqués dans un format technologique couramment utilisé. / You may request your computerised personal information in a commonly used technological format.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">5</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Droit à la cessation de diffusion et à la désindexation</strong> <em>/ Right to Stop Dissemination and De-indexation</em></div>
                <div class="inta-lgpd-right-desc">Dans certaines circonstances, vous pouvez demander la cessation de diffusion de renseignements vous concernant ou leur désindexation des moteurs de recherche. / In certain circumstances, you may request that information about you stop being disseminated or be de-indexed from search engines.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">6</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Droit de déposer une plainte</strong> <em>/ Right to Lodge a Complaint</em></div>
                <div class="inta-lgpd-right-desc">Vous pouvez déposer une plainte auprès de la Commission d'accès à l'information (CAI) du Québec si vous estimez que vos droits n'ont pas été respectés. / You may lodge a complaint with Quebec's Commission d'accès à l'information (CAI).</div>
                </div>
            </li>
            </ul>

            <!-- Responsable de la protection des renseignements personnels -->
            <div class="inta-lgpd-dpo-section">
            <div class="inta-lgpd-dpo-label">Responsable de la protection des renseignements personnels / Privacy Officer</div>
            <div class="inta-lgpd-dpo-text">
                Pour exercer vos droits, communiquez avec le responsable de la protection des renseignements personnels de ce site :<br>
                To exercise your rights, contact the Privacy Officer for this website:<br><br>
                📧 <a href="mailto:confidentialite@votreentreprise.ca">confidentialite@votreentreprise.ca</a>
            </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="inta-lgpd-modal-footer">
            <span class="inta-lgpd-footer-note">Loi 25 · L.Q. 2021, c. 25 · Commission d'accès à l'information du Québec</span>
            <button class="inta-lgpd-btn-close-modal" onclick="closeLaw25Modal()">Je comprends / I understand</button>
        </div>

        </div>
    </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

function closeLaw25Modal() {
    const modal = document.querySelector('#law25-modal');
    const intastellarConsents = document.querySelector('.intastellarCookieConstents');
    if (modal) {
        intastellarConsents.style.display = 'grid';
        modal.classList.remove('inta-lgpd-active');
    }
}

/* Australian Privacy Act 1988 (Cth) — Australian Privacy Principles (APPs) */
function showAustralianPrivacyModal() {
    const modal = document.querySelector('#au-privacy-modal');
    const intastellarConsents = document.querySelector('.intastellarCookieConstents');
    if (modal) {
        intastellarConsents.style.display = 'none';
        modal.classList.add('inta-lgpd-active');
    }
}

function createAustralianPrivacyModal() {
    const modal = document.createElement('inta-au-privacy-modal');
    modal.innerHTML = `
    <div id="au-privacy-modal" role="dialog" aria-modal="true" aria-labelledby="au-privacy-title">
        <div class="inta-lgpd-modal-box">

        <!-- Header -->
        <div class="inta-lgpd-modal-header">
            <div class="inta-lgpd-modal-header-left">
            <div class="inta-lgpd-modal-header-icon">⚖</div>
            <div>
                <div class="inta-lgpd-modal-title" id="au-privacy-title">Your Privacy Rights</div>
                <div class="inta-lgpd-modal-subtitle">Privacy Act 1988 (Cth) · Australian Privacy Principles · Australia</div>
            </div>
            </div>
            <button class="inta-lgpd-modal-close" onclick="closeAustralianPrivacyModal()" aria-label="Close">✕</button>
        </div>

        <!-- Body -->
        <div class="inta-lgpd-modal-body">
            <p class="inta-lgpd-modal-intro">
            Under the <strong>Privacy Act 1988 (Cth)</strong> and the <strong>Australian Privacy Principles (APPs)</strong>, you have the following rights regarding personal information this website collects and holds about you. To exercise these rights, contact our Privacy Officer.
            </p>

            <ul class="inta-lgpd-rights-list">
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">1</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Right to Anonymity / Pseudonymity (APP 2)</strong></div>
                <div class="inta-lgpd-right-desc">Where lawful and practicable, you may interact with us anonymously or using a pseudonym.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">2</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Right of Access (APP 12)</strong></div>
                <div class="inta-lgpd-right-desc">You may request access to the personal information we hold about you. We must respond within 30 days.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">3</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Right to Correction (APP 13)</strong></div>
                <div class="inta-lgpd-right-desc">You may request that we correct personal information that is inaccurate, out-of-date, incomplete, irrelevant, or misleading.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">4</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Right to Know the Purpose of Collection (APP 5)</strong></div>
                <div class="inta-lgpd-right-desc">You have the right to know why we collect your personal information, how we will use and disclose it, and whether we are likely to disclose it to overseas recipients.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">5</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Right to Opt-Out of Direct Marketing (APP 7)</strong></div>
                <div class="inta-lgpd-right-desc">You may request at any time that we stop using your personal information for direct marketing purposes.</div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">6</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title"><strong>Right to Lodge a Complaint</strong></div>
                <div class="inta-lgpd-right-desc">You may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) if you believe we have not handled your personal information in accordance with the APPs.</div>
                </div>
            </li>
            </ul>

            <!-- Privacy Officer contact -->
            <div class="inta-lgpd-dpo-section">
            <div class="inta-lgpd-dpo-label">Privacy Officer</div>
            <div class="inta-lgpd-dpo-text">
                To exercise your rights under the Australian Privacy Act, contact our Privacy Officer:<br><br>
                📧 <a href="mailto:privacy@yourcompany.com.au">privacy@yourcompany.com.au</a>
            </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="inta-lgpd-modal-footer">
            <span class="inta-lgpd-footer-note">Privacy Act 1988 (Cth) · Office of the Australian Information Commissioner (OAIC)</span>
            <button class="inta-lgpd-btn-close-modal" onclick="closeAustralianPrivacyModal()">I understand</button>
        </div>

        </div>
    </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

function closeAustralianPrivacyModal() {
    const modal = document.querySelector('#au-privacy-modal');
    const intastellarConsents = document.querySelector('.intastellarCookieConstents');
    if (modal) {
        intastellarConsents.style.display = 'grid';
        modal.classList.remove('inta-lgpd-active');
    }
}

/* Saudi Arabia Personal Data Protection Law (PDPL) — SDAIA / NDMO — Arabic primary */
function showPDPLModal() {
    const modal = document.querySelector('#pdpl-modal');
    const intastellarConsents = document.querySelector('.intastellarCookieConstents');
    if (modal) {
        intastellarConsents.style.display = 'none';
        modal.classList.add('inta-lgpd-active');
    }
}

function createPDPLModal() {
    const modal = document.createElement('inta-pdpl-modal');
    modal.innerHTML = `
    <div id="pdpl-modal" role="dialog" aria-modal="true" aria-labelledby="pdpl-title">
        <div class="inta-lgpd-modal-box">

        <!-- Header -->
        <div class="inta-lgpd-modal-header">
            <div class="inta-lgpd-modal-header-left">
            <div class="inta-lgpd-modal-header-icon">⚖</div>
            <div>
                <div class="inta-lgpd-modal-title" id="pdpl-title" dir="rtl" lang="ar">حقوقك في مجال حماية البيانات <span dir="ltr" lang="en">/ Your Data Protection Rights</span></div>
                <div class="inta-lgpd-modal-subtitle" dir="rtl" lang="ar">نظام حماية البيانات الشخصية (PDPL) · المملكة العربية السعودية <span dir="ltr" lang="en">/ Personal Data Protection Law (PDPL) · Saudi Arabia</span></div>
            </div>
            </div>
            <button class="inta-lgpd-modal-close" onclick="closePDPLModal()" aria-label="إغلاق / Close">✕</button>
        </div>

        <!-- Body -->
        <div class="inta-lgpd-modal-body">
            <p class="inta-lgpd-modal-intro" dir="rtl" lang="ar">
            بموجب <strong>نظام حماية البيانات الشخصية (PDPL)</strong> الصادر بالمرسوم الملكي رقم م/19، تتمتع بالحقوق التالية فيما يتعلق ببياناتك الشخصية. للممارسة هذه الحقوق، يرجى التواصل مع مسؤول حماية البيانات لدينا.
            </p>
            <p class="inta-lgpd-modal-intro">
            <em>Under Saudi Arabia's <strong>Personal Data Protection Law (PDPL)</strong>, you have the following rights regarding your personal data processed by this website.</em>
            </p>

            <ul class="inta-lgpd-rights-list">
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">1</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title" dir="rtl" lang="ar"><strong>حق الاطلاع</strong> <span dir="ltr" lang="en">/ Right of Access</span></div>
                <div class="inta-lgpd-right-desc" dir="rtl" lang="ar">يحق لك طلب الاطلاع على بياناتك الشخصية التي نعالجها، والحصول على نسخة منها. <span dir="ltr" lang="en">/ You may request access to and a copy of the personal data we process about you.</span></div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">2</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title" dir="rtl" lang="ar"><strong>حق التصحيح</strong> <span dir="ltr" lang="en">/ Right to Rectification</span></div>
                <div class="inta-lgpd-right-desc" dir="rtl" lang="ar">يحق لك طلب تصحيح أي بيانات شخصية غير دقيقة أو غير مكتملة. <span dir="ltr" lang="en">/ You may request correction of any inaccurate or incomplete personal data we hold about you.</span></div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">3</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title" dir="rtl" lang="ar"><strong>حق الحذف</strong> <span dir="ltr" lang="en">/ Right to Erasure</span></div>
                <div class="inta-lgpd-right-desc" dir="rtl" lang="ar">يحق لك طلب حذف بياناتك الشخصية عند انتفاء الغرض من معالجتها أو في الحالات التي يحددها النظام. <span dir="ltr" lang="en">/ You may request deletion of your personal data when it is no longer necessary for the purpose collected, or in circumstances defined by the PDPL.</span></div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">4</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title" dir="rtl" lang="ar"><strong>حق سحب الموافقة</strong> <span dir="ltr" lang="en">/ Right to Withdraw Consent</span></div>
                <div class="inta-lgpd-right-desc" dir="rtl" lang="ar">يمكنك سحب موافقتك على معالجة بياناتك الشخصية في أي وقت، دون أن يؤثر ذلك على مشروعية المعالجة السابقة. <span dir="ltr" lang="en">/ You may withdraw consent at any time without affecting the lawfulness of prior processing based on that consent.</span></div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">5</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title" dir="rtl" lang="ar"><strong>حق الاعتراض</strong> <span dir="ltr" lang="en">/ Right to Object</span></div>
                <div class="inta-lgpd-right-desc" dir="rtl" lang="ar">يحق لك الاعتراض على معالجة بياناتك الشخصية في حالات معينة، بما في ذلك التسويق المباشر. <span dir="ltr" lang="en">/ You may object to the processing of your personal data in certain circumstances, including for direct marketing.</span></div>
                </div>
            </li>
            <li class="inta-lgpd-right-item">
                <span class="inta-lgpd-right-number">6</span>
                <div class="inta-lgpd-right-content">
                <div class="inta-lgpd-right-title" dir="rtl" lang="ar"><strong>حق تقديم شكوى</strong> <span dir="ltr" lang="en">/ Right to Lodge a Complaint</span></div>
                <div class="inta-lgpd-right-desc" dir="rtl" lang="ar">يحق لك تقديم شكوى إلى الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا) إذا رأيت أن حقوقك قد انتُهكت. <span dir="ltr" lang="en">/ You may lodge a complaint with the Saudi Data & AI Authority (SDAIA) if you believe your PDPL rights have been violated.</span></div>
                </div>
            </li>
            </ul>

            <!-- مسؤول حماية البيانات / Data Protection Officer -->
            <div class="inta-lgpd-dpo-section">
            <div class="inta-lgpd-dpo-label" dir="rtl" lang="ar">مسؤول حماية البيانات <span dir="ltr" lang="en">/ Data Protection Officer</span></div>
            <div class="inta-lgpd-dpo-text" dir="rtl" lang="ar">
                للتواصل بشأن حقوقك المتعلقة بحماية البيانات الشخصية، يرجى التواصل مع مسؤول حماية البيانات لدينا:<br>
                <span dir="ltr" lang="en">To exercise your PDPL rights, contact our Data Protection Officer:</span><br><br>
                📧 <a href="mailto:privacy@yourcompany.com.sa" dir="ltr">privacy@yourcompany.com.sa</a>
            </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="inta-lgpd-modal-footer">
            <span class="inta-lgpd-footer-note" dir="rtl" lang="ar">نظام حماية البيانات الشخصية · سدايا (SDAIA) · <span dir="ltr" lang="en">Personal Data Protection Law · Saudi Data &amp; AI Authority</span></span>
            <button class="inta-lgpd-btn-close-modal" onclick="closePDPLModal()"><span lang="ar">فهمت</span> / I understand</button>
        </div>

        </div>
    </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

function closePDPLModal() {
    const modal = document.querySelector('#pdpl-modal');
    const intastellarConsents = document.querySelector('.intastellarCookieConstents');
    if (modal) {
        intastellarConsents.style.display = 'grid';
        modal.classList.remove('inta-lgpd-active');
    }
}

/**
 * True only when this looks like a Shopify storefront (not a random script setting window.Shopify = {}).
 * Prevents creating fake Shopify globals on non-Shopify sites — those caused setTrackingConsent to be missing → TypeError.
 */
function intaIsShopifyStorefrontContext() {
    let s = window.Shopify;
    if (!s || typeof s !== "object") return false;
    return typeof s.loadFeatures === "function" || typeof s.shop === "string" || typeof s.theme === "object";
}

/**
 * Disable Shopify’s native Customer Privacy / cookie banner while Intastellar is active.
 * Shopify checks customerPrivacy.shouldShowBanner(); we also hide known DOM + inject CSS.
 * Does NOT create window.Shopify on non-Shopify sites (avoids empty customerPrivacy without setTrackingConsent).
 */
function intaHideShopifyNativeConsentBanner() {
    try {
        if (!intaIsShopifyStorefrontContext()) {
            return;
        }
        window.Shopify.customerPrivacy = window.Shopify.customerPrivacy || {};
        // Do not stub setTrackingConsent — Shopify's consent-tracking-api provides it; a no-op breaks sync and can cause "not a function" if the object is replaced later.
        window.Shopify.customerPrivacy.shouldShowBanner = function () {
            return false;
        };

        if (!document.getElementById('inta-shopify-native-banner-hide')) {
            let st = document.createElement('style');
            st.id = 'inta-shopify-native-banner-hide';
            st.textContent =
                '#shopify-pc__banner, #shopify-pc__prefs, .shopify-pc__banner, .shopify-pc__prefs, ' +
                '[data-shopify-pc-banner], [id^="shopify-pc"] { display: none !important; ' +
                'visibility: hidden !important; pointer-events: none !important; opacity: 0 !important; }';
            (document.head || document.documentElement).appendChild(st);
        }

        let shopifyPcSelectors = [
            '#shopify-pc__banner',
            '#shopify-pc__prefs',
            '.shopify-pc__banner',
            '.shopify-pc__prefs',
            '[data-shopify-pc-banner]',
        ];
        for (let si = 0; si < shopifyPcSelectors.length; si++) {
            try {
                document.querySelectorAll(shopifyPcSelectors[si]).forEach(function (el) {
                    el.style.setProperty('display', 'none', 'important');
                    el.setAttribute('hidden', '');
                    el.setAttribute('aria-hidden', 'true');
                });
            } catch (e) { /* ignore */ }
        }
    } catch (e) { /* ignore */ }
}

let intaShopifyHideBannerRaf = null;
function intaScheduleHideShopifyNativeBanner() {
    if (intaShopifyHideBannerRaf != null) {
        return;
    }
    intaShopifyHideBannerRaf = requestAnimationFrame(function () {
        intaShopifyHideBannerRaf = null;
        intaHideShopifyNativeConsentBanner();
    });
}

/** Watch for late-injected Shopify banners (e.g. after loadFeatures) for a short window */
(function intaObserveShopifyBannerSuppression() {
    intaHideShopifyNativeConsentBanner();
    if (typeof MutationObserver === 'undefined') {
        return;
    }
    let mo = new MutationObserver(function () {
        intaScheduleHideShopifyNativeBanner();
    });
    function attach() {
        if (!document.body) {
            return;
        }
        mo.observe(document.body, { childList: true, subtree: true });
    }
    if (document.body) {
        attach();
    } else {
        document.addEventListener('DOMContentLoaded', attach);
    }
    setTimeout(function () {
        try {
            mo.disconnect();
        } catch (e) { /* ignore */ }
    }, 60000);
})();

/** Inline critical styles so CMP UI stays hidden until cookie state is applied (prevents CLS / flash). */
function intaInjectCmpCriticalStyles() {
    if (document.getElementById('inta-cmp-critical-styles')) {
        return;
    }
    var style = document.createElement('style');
    style.id = 'inta-cmp-critical-styles';
    style.textContent =
        'intastellarconsents.inta-cmp-not-ready{visibility:hidden!important;pointer-events:none!important;}' +
        'html.inta-cmp-has-consent .intastellarCookieConstents:not(.--active){display:none!important;}' +
        '.intastellarCookieConstents{display:none!important;}' +
        '.intastellarCookieConstents.--active{display:grid!important;}' +
        '.intastellarCookie-settings__container{opacity:0!important;visibility:hidden!important;pointer-events:none!important;transform:scale(0)!important;}' +
        '.intastellarCookie-settings__container.intastellarCookie-settings__container--expand{opacity:1!important;visibility:visible!important;pointer-events:auto!important;transform:scale(1)!important;}' +
        '.intastellarToolTip{opacity:0!important;visibility:hidden!important;}' +
        '.intastellarCookie-settingsContainer:hover .intastellarToolTip{opacity:1!important;visibility:visible!important;}';
    (document.head || document.documentElement).appendChild(style);
    if (intaHasStoredConsentCookie()) {
        document.documentElement.classList.add('inta-cmp-has-consent');
    }
}

function intaHasStoredConsentCookie() {
    try {
        var cookieName = (typeof int_hideCookieBannerName !== 'undefined' && int_hideCookieBannerName)
            || 'IntastellarConsentSolution';
        var dc = document.cookie || '';
        if (dc.indexOf(cookieName + '=') !== -1 && dc.indexOf('__inta') !== -1) {
            return true;
        }
        if (typeof getCookie === 'function') {
            var c = getCookie(cookieName);
            if (c && c.indexOf && c.indexOf('__inta') > -1) {
                return true;
            }
        }
    } catch (e) {
        return false;
    }
    return false;
}

function intaApplyCmpVisibilityFromCookie() {
    var overlay = window._IntastellarConsentsBanner;
    var root = window.intaconsents;
    var hasConsent = intaHasStoredConsentCookie();
    var isFloating = window.INTA && window.INTA.settings && window.INTA.settings.design === 'floating';
    var design = window.INTA && window.INTA.settings && window.INTA.settings.design;

    if (hasConsent) {
        document.documentElement.classList.add('inta-cmp-has-consent');
    } else {
        document.documentElement.classList.remove('inta-cmp-has-consent');
    }

    if (overlay) {
        if (hasConsent) {
            overlay.classList.remove('--active');
        } else {
            overlay.classList.add('--active');
            if (typeof window._intaBannerShownAt === 'undefined') {
                window._intaBannerShownAt = Date.now();
            }
            if (window.dataLayer) {
                window.dataLayer.push({ event: 'intastellar_consents_widget_visible' });
            }
        }
    }

    var settingsPanel = document.querySelector('.intastellarCookie-settings__container');
    if (settingsPanel && hasConsent) {
        settingsPanel.classList.remove('intastellarCookie-settings__container--expand');
    }

    if (hasConsent) {
        document.documentElement.classList.remove('noScroll');
    } else {
        document.documentElement.classList.add('noScroll');
    }

    if (root) {
        var floatBtn = root.querySelector('.intastellarCookie-settings');
        if (floatBtn) {
            if (isFloating || design === 'bannerV2' || hasConsent) {
                floatBtn.style.display = '';
            } else {
                floatBtn.style.display = 'none';
            }
        }
        root.classList.remove('inta-cmp-not-ready');
    }
}

window.intaApplyCmpVisibilityFromCookie = intaApplyCmpVisibilityFromCookie;
intaInjectCmpCriticalStyles();

const IntastellarCookieConsent = {
    // Store reference to the banner element
    _banner: null,
    renew: function () {
        if (typeof moreSettings !== 'undefined') {
            moreSettings.classList.add("--active");
            document.documentElement.classList.add("noScroll");
        }
        if (window.intaconsents) {
            var floatBtn = window.intaconsents.querySelector('.intastellarCookie-settings');
            if (floatBtn) {
                floatBtn.style.display = '';
            }
        }
        if (typeof window._intaBannerShownAt === 'undefined') {
            window._intaBannerShownAt = Date.now();
        }
        if (window.dataLayer) {
            window.dataLayer.push({ event: "intastellar_consents_widget_visible" });
        }
        intaHideShopifyNativeConsentBanner();
    },
    remove: function (template) {
        // Use direct reference if available
        if (template && template.classList) {
            template.classList.remove("--active");
        } else if (this._banner) {
            this._banner.classList.remove("--active");
        }
    },
    initialize: function (template) {
        const self = this;
        function appendBannerWhenBodyReady() {
            function doAppend() {
                if (!document.body || !self._banner) {
                    return;
                }
                if (!document.body.contains(self._banner)) {
                    self._banner.classList.add('inta-cmp-not-ready');
                    document.body.appendChild(self._banner);
                }
                intaApplyCmpVisibilityFromCookie();
            }
            if (document.body) {
                doAppend();
                return;
            }
            function tryAppend() {
                if (document.body) {
                    doAppend();
                } else {
                    requestAnimationFrame(tryAppend);
                }
            }
            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", tryAppend);
            } else {
                requestAnimationFrame(tryAppend);
            }
        }
        function initTemplate() {
            if (!self._banner && template !== false) {
                self._banner = template;
                self._banner.classList.add('inta-cmp-not-ready');
                appendBannerWhenBodyReady();
                if (window.INTA && window.INTA.settings && window.INTA.settings.lgpd) {
                    createLGPDModal();
                }
                if (window.INTA && window.INTA.settings && window.INTA.settings.popia) {
                    createPOPIAModal();
                }
                if (window.INTA && window.INTA.settings && window.INTA.settings.law25) {
                    createLaw25Modal();
                } else if (window.INTA && window.INTA.settings && window.INTA.settings.pipeda) {
                    createPIPEDAModal();
                }
                if (window.INTA && window.INTA.settings && window.INTA.settings.australianPrivacy) {
                    createAustralianPrivacyModal();
                }
                if (window.INTA && window.INTA.settings && window.INTA.settings.pdpl) {
                    createPDPLModal();
                }
            } else {
                intaApplyCmpVisibilityFromCookie();
            }
            intaHideShopifyNativeConsentBanner();
        }

        function loadRemoteConfig() {
            let host = window.location.host
                .replace(/^(?:www\.)?/i, "")
                .replace(/:\d+$/, "");

            const url = `https://downloads.intastellarsolutions.com/cookieconsents/${host}/config.js`;

            return fetch(url, { method: "HEAD" })
                .then(res => {
                    if (res.ok) {
                        return new Promise(resolve => {
                            const script = document.createElement("script");
                            script.src = url;
                            script.onload = resolve;
                            script.onerror = resolve;
                            document.head.appendChild(script);
                        });
                    }
                })
                .catch(() => {
                    console.warn("No INTA config found for host:", host);
                });
        }

        function waitForINTA(timeout = 3000) {
            return new Promise(resolve => {
                if (typeof window.INTA !== "undefined") {
                    return resolve(true);
                }

                const start = Date.now();
                const timer = setInterval(() => {
                    if (typeof window.INTA !== "undefined") {
                        clearInterval(timer);
                        resolve(true);
                    } else if (Date.now() - start > timeout) {
                        clearInterval(timer);
                        resolve(false);
                    }
                }, 100);
            });
        }

        // Core logic
        waitForINTA().then(found => {
            if (found) {
                initTemplate();
            } else {
                loadRemoteConfig().then(() => {
                    initTemplate();
                });
            }
        });
    }
}

// Patch: Hook into consent save/deny actions
// Try to patch IntastellarCookieConsent.remove and any save/deny logic
const originalRemove = IntastellarCookieConsent.remove;
IntastellarCookieConsent.remove = function (template) {
    if (typeof originalRemove === 'function') {
        originalRemove.apply(this, arguments);
    }
    // After consent is removed/denied, dispatch TCF update
    dispatchTCFConsentChangedIfAvailable();
};

// Patch: Hook into consent save logic (look for save/accept button logic)
// If you have a function that handles consent save, call dispatchTCFConsentChangedIfAvailable() at the end
// Example: If you have a function like saveConsent() or acceptAllCookies(), patch it here

// Try to patch global save/accept/deny functions if they exist
if (typeof window.saveConsent === 'function') {
    const originalSaveConsent = window.saveConsent;
    window.saveConsent = function () {
        const result = originalSaveConsent.apply(this, arguments);
        dispatchTCFConsentChangedIfAvailable();
        if (typeof updateVwoConsent === 'function') updateVwoConsent(window.intaCookieConsents || {});
        return result;
    };
}
if (typeof window.acceptAllCookies === 'function') {
    const originalAcceptAllCookies = window.acceptAllCookies;
    window.acceptAllCookies = function () {
        const result = originalAcceptAllCookies.apply(this, arguments);
        dispatchTCFConsentChangedIfAvailable();
        if (typeof updateVwoConsent === 'function') updateVwoConsent(window.intaCookieConsents || {});
        return result;
    };
}
if (typeof window.denyAllCookies === 'function') {
    const originalDenyAllCookies = window.denyAllCookies;
    window.denyAllCookies = function () {
        const result = originalDenyAllCookies.apply(this, arguments);
        dispatchTCFConsentChangedIfAvailable();
        if (typeof updateVwoConsent === 'function') updateVwoConsent(window.intaCookieConsents || {});
        return result;
    };
}

// Use tcString in your __tcfapi response


// --- TCF 2.2 API stub with event listener registry and dynamic dispatch ---
// Not exposed at all until intaTcfIsRegistered() is true — a page with no window.__tcfapi
// correctly signals "no CMP here" rather than a fake one with an unregistered CmpId.
if (intaTcfIsRegistered()) {
(function () {
    // TCF event listener registry
    let tcfListeners = {};
    let tcfListenerId = 1;
    let lastUserActionAt = 0;  // timestamp when useractioncomplete was last dispatched
    const USER_ACTION_WINDOW_MS = 30000;  // getTCData returns useractioncomplete for this long after dispatch

    function getCurrentConsentForTCF() {
        try {
            let consentCookie = typeof getCookie === 'function' ? getCookie(int_hideCookieBannerName) : null;
            if (consentCookie && consentCookie.indexOf('__inta') > -1) {
                let consentsObj = JSON.parse(decodeIntaConsentsObject(consentCookie.split('.')[2]));
                let purposes = [
                    true, // 1: Always necessary
                    !!consentsObj.consents?.functionalCookies, // 2: functional
                    !!consentsObj.consents?.staticsticCookies, // 3: statistic
                    !!consentsObj.consents?.advertisementCookies // 4: marketing
                ];
                while (purposes.length < 24) purposes.push(false);
                let vendors = Array(24).fill(true);
                return { purposes, vendors };
            }
        } catch (e) { }
        return {
            purposes: [true, false, false, false].concat(Array(20).fill(false)),
            vendors: Array(24).fill(true)
        };
    }

    function buildTCData(eventStatus, listenerIdOverride) {
        let consentObj = getCurrentConsentForTCF();
        let tcString = generateTcString(consentObj);
        return {
            tcString: tcString,
            eventStatus: eventStatus || 'tcloaded',
            cmpStatus: 'loaded',
            gdprApplies: true,
            listenerId: listenerIdOverride || null
        };
    }

    function dispatchTCFEvent(eventStatus) {
        let status = (eventStatus === 'tcloaded' || eventStatus === 'cmpuishown') ? eventStatus : 'useractioncomplete';
        if (status === 'useractioncomplete') lastUserActionAt = Date.now();
        Object.keys(tcfListeners).forEach(function (id) {
            let cb = tcfListeners[id];
            if (typeof cb === 'function') {
                let tcData = buildTCData(status, parseInt(id));
                cb(tcData, true);
            }
        });
    }

    window.__tcfapi = function (command, version, callback, parameter) {
        if (command === 'getTCData') {
            let getStatus = (lastUserActionAt && (Date.now() - lastUserActionAt) < USER_ACTION_WINDOW_MS)
                ? 'useractioncomplete' : 'tcloaded';
            let tcData = buildTCData(getStatus);
            callback(tcData, true);
        } else if (command === 'addEventListener') {
            let id = tcfListenerId++;
            tcfListeners[id] = callback;
            // Initial eventStatus is 'tcloaded' per spec
            let tcData = buildTCData('tcloaded', id);
            callback(tcData, true);
        } else if (command === 'removeEventListener') {
            // parameter is the listenerId
            if (parameter && tcfListeners[parameter]) {
                delete tcfListeners[parameter];
                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(null, false);
        }
    };

    // Expose a function to dispatch TCF events after consent changes
    // eventStatus: 'useractioncomplete' (user clicked) | 'tcloaded' (no user action) | 'cmpuishown' (UI shown)
    window.__tcfapiDispatchConsentChanged = function (eventStatus) {
        dispatchTCFEvent(eventStatus);
    };
})();
}

// Recommended approach for monitoring: use addEventListener to detect user consent actions
if (typeof window.__tcfapi === 'function') {
    window.__tcfapi('addEventListener', 2, function (tcData, success) {
        if (success && tcData.eventStatus === 'useractioncomplete') {
            if (window.dataLayer) window.dataLayer.push({ event: 'intastellar_tcf_useractioncomplete', tcData: tcData });
            window.dispatchEvent(new CustomEvent('intastellar_consent_user_action', { detail: tcData }));
        }
    });
}

const intaStyleLink = document.createElement('link');
intaStyleLink.rel = 'stylesheet';
intaStyleLink.type = 'text/css';
intaStyleLink.href = 'https://downloads.intastellarsolutions.com/css/gdpr/' + cookieBannerStyles[window.INTA.settings.design || "overlay"] + '?v=' + new Date().getTime();
intaStyleLink.media = 'all';
intaInsertStylesheetLinkInHead(intaStyleLink);

let intastellarCookieLanguageSettings = "Cookie Indstillinger";
if (intastellarCookieLanguage == "de" || intastellarCookieLanguage == "de-DE" || window.INTA.settings.language == "de" || window.INTA.settings.language == "german") {
    intastellarCookieLanguageSettings = "Cookie Einstellungen";
} else if (intastellarCookieLanguage == "en" || intastellarCookieLanguage == "en-US" || window.INTA.settings.language == "en" || window.INTA.settings.language == "english") {
    intastellarCookieLanguageSettings = "Cookie Settings";
} else if (intastellarCookieLanguage == "es" || intastellarCookieLanguage == "es-ES" || window.INTA.settings.language == "es" || window.INTA.settings.language == "english") {
    intastellarCookieLanguageSettings = "Configuración de cookies";
} else if (intastellarCookieLanguage == "fr" || window.INTA.settings.language == "fr" || window.INTA.settings.language == "french") {
    intastellarCookieLanguageSettings = "Paramètres des cookies";
} else if (intastellarCookieLanguage == "sv" || window.INTA.settings.language == "sv" || window.INTA.settings.language == "swedish") {
    intastellarCookieLanguageSettings = "Kakinställningar";
} else if (intastellarCookieLanguage == "no" || window.INTA.settings.language == "no" || window.INTA.settings.language == "norwegian") {
    intastellarCookieLanguageSettings = "Informasjonskapselinnstillinger";
} else if (intastellarCookieLanguage == "nl" || window.INTA.settings.language == "nl" || window.INTA.settings.language == "dutch") {
    intastellarCookieLanguageSettings = "Cookie-instellingen";
} else if (intastellarCookieLanguage == "it" || window.INTA.settings.language == "it" || window.INTA.settings.language == "italian") {
    intastellarCookieLanguageSettings = "Impostazioni dei cookie";
} else if (intastellarCookieLanguage == "fi" || window.INTA.settings.language == "fi" || window.INTA.settings.language == "finnish") {
    intastellarCookieLanguageSettings = "Evästeasetukset";
} else if (intastellarCookieLanguage == "ru" || window.INTA.settings.language == "ru" || window.INTA.settings.language == "russian") {
    intastellarCookieLanguageSettings = "Настройки файлов cookie";
} else if (intastellarCookieLanguage == "pl" || window.INTA.settings.language == "pl" || window.INTA.settings.language == "polish") {
    intastellarCookieLanguageSettings = "Ustawienia plików cookie";
} else if (intastellarCookieLanguage == "da" || intastellarCookieLanguage == "da-DK" || window.INTA.settings.language == "da" || window.INTA.settings.language == "danish") {
    intastellarCookieLanguageSettings = "Cookie Indstillinger";
} else if (intastellarCookieLanguage == "pt" || intastellarCookieLanguage == "pt-PT" || window.INTA.settings.language == "pt" || window.INTA.settings.language == "portuguese") {
    intastellarCookieLanguageSettings = "Configurações de cookies";
} else if (intastellarCookieLanguage == "zh" || intastellarCookieLanguage == "zh-CN" || window.INTA.settings.language == "zh" || window.INTA.settings.language == "chinese") {
    intastellarCookieLanguageSettings = "Cookie 设置";
} else if (intastellarCookieLanguage == "ja" || intastellarCookieLanguage == "ja-JP" || window.INTA.settings.language == "ja" || window.INTA.settings.language == "japanese") {
    intastellarCookieLanguageSettings = "Cookie 設定";
} else if (intastellarCookieLanguage == "ko" || intastellarCookieLanguage == "ko-KR" || window.INTA.settings.language == "ko" || window.INTA.settings.language == "korean") {
    intastellarCookieLanguageSettings = "쿠키 설정";
} else if (intastellarCookieLanguage == "tr" || intastellarCookieLanguage == "tr-TR" || window.INTA.settings.language == "tr" || window.INTA.settings.language == "turkish") {
    intastellarCookieLanguageSettings = "Çerez Ayarları";
} else if (intastellarCookieLanguage == "cs" || intastellarCookieLanguage == "cs-CZ" || window.INTA.settings.language == "cs" || window.INTA.settings.language == "czech") {
    intastellarCookieLanguageSettings = "Nastavení cookies";
} else if (intastellarCookieLanguage == "hu" || intastellarCookieLanguage == "hu-HU" || window.INTA.settings.language == "hu" || window.INTA.settings.language == "hungarian") {
    intastellarCookieLanguageSettings = "Cookie beállítások";
} else if (intastellarCookieLanguage == "el" || intastellarCookieLanguage == "el" || window.INTA.settings.language == "el" || window.INTA.settings.language == "greek") {
    intastellarCookieLanguageSettings = "Ρυθμίσεις Cookies";
} else if (intastellarCookieLanguage == "ar" || intastellarCookieLanguage == "ar" || window.INTA.settings.language == "ar" || window.INTA.settings.language == "arabic") {
    intastellarCookieLanguageSettings = "إعدادات ملفات تعريف الارتباط";
} else if (intastellarCookieLanguage == "hi" || intastellarCookieLanguage == "hi" || window.INTA.settings.language == "hi" || window.INTA.settings.language == "hindi") {
    intastellarCookieLanguageSettings = "कुकी सेटिंग्स";
} else if (intastellarCookieLanguage == "th" || intastellarCookieLanguage == "th-TH" || window.INTA.settings.language == "th" || window.INTA.settings.language == "thai") {
    intastellarCookieLanguageSettings = "การตั้งค่า Cookie";
} else if (intastellarCookieLanguage == "af" || intastellarCookieLanguage == "af-ZA" || window.INTA.settings.language == "af" || window.INTA.settings.language == "afrikaans") {
    intastellarCookieLanguageSettings = "Koekie Instellings";
} else if (intastellarCookieLanguage == "bg" || intastellarCookieLanguage == "bg-BG" || window.INTA.settings.language == "bg" || window.INTA.settings.language == "bulgarian") {
    intastellarCookieLanguageSettings = "Настройки на бисквитките";
} else if (intastellarCookieLanguage == "ro" || intastellarCookieLanguage == "ro-RO" || window.INTA.settings.language == "ro" || window.INTA.settings.language == "romanian") {
    intastellarCookieLanguageSettings = "Setări cookie";
} else if (intastellarCookieLanguage == "he" || intastellarCookieLanguage == "he-IL" || window.INTA.settings.language == "he" || window.INTA.settings.language == "hebrew") {
    intastellarCookieLanguageSettings = "הגדרות עוגיות";
} else if (intastellarCookieLanguage == "uk" || intastellarCookieLanguage == "uk-UA" || window.INTA.settings.language == "uk" || window.INTA.settings.language == "ukrainian") {
    intastellarCookieLanguageSettings = "Налаштування куків";
}

moreSettings.setAttribute("class", "intastellarCookieConstents");
moreSettingsContent.setAttribute("class", "intastellarCookieConstents__content");
moreintHeader.setAttribute("class", "intastellarCookieConstents__content-intHeader");
moreFooter.setAttribute("class", "intastellarCookieConstents__content-footer");

moreContentText.setAttribute("class", "intastellarCookieConstents__content-main");;

const intastellarCookieConstents__Container = document.createElement("article");
const intastellarCookieButtons = document.createElement("section");


const testSection = document.createElement("section");
testSection.setAttribute("class", "intastellarCookieConstents__contentC");
testSection.appendChild(moreintHeader);
testSection.appendChild(moreContentText);

let vendorListContainer = document.createElement('div');
vendorListContainer.id = 'vendor-list';
vendorListContainer.classList.add("vendor-container");
vendorListContainer.innerHTML = '<h3>Vendors</h3>';

function applyTcStringToVendorCheckboxes(tcString, vendors) {
    if (typeof intastellarDevMode !== 'undefined' && intastellarDevMode) {
        console.log('[applyTcStringToVendorCheckboxes] called with tcString:', tcString ? 'present (' + tcString.length + ' chars)' : null, 'vendors:', vendors ? vendors.length : 0);
    }
    if (!tcString || !vendors || !vendors.length) {
        if (typeof intastellarDevMode !== 'undefined' && intastellarDevMode) {
            console.log('[applyTcStringToVendorCheckboxes] early return: missing tcString or empty vendors');
        }
        return;
    }
    try {
        let decoded = window.IABTCF && window.IABTCF.TCString && typeof window.IABTCF.TCString.decode === 'function'
            ? window.IABTCF.TCString.decode(tcString) : null;
        if (typeof intastellarDevMode !== 'undefined' && intastellarDevMode) {
            console.log('[applyTcStringToVendorCheckboxes] decoded:', decoded);
        }
        if (!decoded || !decoded.vendors) {
            if (typeof intastellarDevMode !== 'undefined' && intastellarDevMode) {
                console.log('[applyTcStringToVendorCheckboxes] early return: no decoded vendors');
            }
            return;
        }
        vendors.forEach(function (vendor, i) {
            let idx = parseInt(vendor.id, 10) - 1;
            if (idx < 0 || idx >= decoded.vendors.length) return;
            let cb = document.getElementById('vendor' + vendor.id);
            let legitCb = document.getElementById('vendor' + vendor.id + '-legit');
            if (cb) cb.checked = !!decoded.vendors[idx];
            if (legitCb && decoded.vendorLegitimateInterests && decoded.vendorLegitimateInterests[idx] !== undefined) {
                legitCb.checked = !!decoded.vendorLegitimateInterests[idx];
            }
        });
    } catch (e) {
        console.log(e);
    }
}

function getTcStringFromCookie() {
    try {
        let c = typeof getCookie === 'function' ? getCookie(int_hideCookieBannerName) : null;
        if (c && c.indexOf && c.indexOf('__inta') > -1) {
            let parts = c.split('.');
            let decoded = parts[2] ? JSON.parse(decodeIntaConsentsObject(parts[2]) || '{}') : {};
            return decoded.tcString || null;
        }
    } catch (e) {}
    return null;
}

    if (!vendorListContainer._intaDeviceStorageListener) {
        vendorListContainer._intaDeviceStorageListener = true;
        vendorListContainer.addEventListener("click", intaDeviceStorageToggleClick);
    }

let __intaVendorListLoaded = false;
function intaEnsureVendorListLoaded() {
    if (__intaVendorListLoaded) {
        return;
    }
    __intaVendorListLoaded = true;
    getVendorsForUI().then(vendors => {
        intaCollectVendorPassThroughUrls(vendors);
        vendors.forEach(vendor => {
            const vendorDiv = document.createElement('div');
            vendorDiv.classList.add('vendor-item');
            const hasLegit = Array.isArray(vendor.legitimateInterestPurposes) && vendor.legitimateInterestPurposes.length > 0;
            vendorDiv.innerHTML = `
                <label class="checkMarkContainer" style="height: auto; border-top: 1px solid #e0e0e0; align-items: flex-start;">
                    <span class="intSettingsTitle">
                        ${vendor.name}</br>
                        ${(vendor.urls || []).map(url => {
                            if(url.langId == intastellarCookieLanguage) {
                                return `<a class="intSettingsTitleLink" style="display: block; padding: 0; text-align: left;" href="${url.privacy}" target="_blank">${url.privacy}</a>`;
                            } else {
                                return `<a class="intSettingsTitleLink" style="display: block; padding: 0; text-align: left;" href="${url.privacy}" target="_blank">${url.privacy}</a>`;
                            }
                        }).join('<br />')}
                        ${intaDeviceStorageDisclosureBlock(vendor)}
                    </span>
                    <span class="intCheckmarkSliderContainer">
                        <input onchange="updateSaveButtonText()" id="vendor${vendor.id}" value="${vendor.id}" class="intCookieSetting__checkbox" type="checkbox" ${intaIsCapterraTraffic() ? "checked" : ""}>
                        <span class="checkmark round"></span>
                    </span>
                </label>
                ${hasLegit ? `
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Legitimate Interest</span>
                            <span class="intCheckmarkSliderContainer">
                                <input onchange="updateSaveButtonText()" id="vendor${vendor.id}-legit" value="${vendor.id}" class="intCookieSetting__checkbox" type="checkbox" ${intaIsCapterraTraffic() ? "checked" : ""}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    ` : ``
            }
            `;
            vendorListContainer.appendChild(vendorDiv);
    });
    let __intaTcStrForVendors = getTcStringFromCookie();
    if (__intaTcStrForVendors) {
        applyTcStringToVendorCheckboxes(__intaTcStrForVendors, vendors);
    }

    document.querySelectorAll('.intastellarCookie-settings__btn.--save').forEach(function (saveBtn) {
        if (saveBtn._vendorSaveListenerAttached) return;
        saveBtn._vendorSaveListenerAttached = true;
        saveBtn.addEventListener('click', function handleVendorSave() {
            // Build consent and disclosed arrays by GVL vendor ID (required for TCF 2.3)
            let maxVendorId = vendors.length ? Math.max.apply(null, vendors.map(function (v) { return parseInt(v.id, 10) || 0; })) : 0;
            let vendorConsentsById = [];
            let disclosedVendorsById = [];
            for (let i = 0; i < maxVendorId; i++) {
                vendorConsentsById[i] = false;
                disclosedVendorsById[i] = false;
            }
            vendors.forEach(function (vendor) {
                let id = parseInt(vendor.id, 10);
                if (id > 0) {
                    disclosedVendorsById[id - 1] = true;
                    let cb = document.getElementById('vendor' + vendor.id);
                    vendorConsentsById[id - 1] = !!(cb && cb.checked);
                }
            });
            let vendorLegitInterests = [];
            vendors.forEach(function (vendor) {
                let id = parseInt(vendor.id, 10);
                if (id > 0) {
                    let legitCb = document.getElementById('vendor' + vendor.id + '-legit');
                    while (vendorLegitInterests.length < id) vendorLegitInterests.push(false);
                    vendorLegitInterests[id - 1] = !!(legitCb && legitCb.checked);
                }
            });
            let purposes = Array(24).fill(true);
            let userConsent = {
                purposes: purposes,
                vendors: vendorConsentsById,
                disclosedVendors: disclosedVendorsById,
                vendorLegitimateInterests: vendorLegitInterests.length ? vendorLegitInterests : undefined
            };
            const tcString = generateTcString(userConsent);
            intaConsentsObjectVariable.tcString = tcString;
            intaConsentsObjectVariable.consents = {
                staticsticCookies: document.querySelector('#statics')?.checked ? 'checked' : false,
                functionalCookies: document.querySelector('#functional')?.checked ? 'checked' : false,
                advertisementCookies: document.querySelector('#marketing')?.checked ? 'checked' : false,
                
            };
            intaConsentsObjectVariable.time = new Date().getTime();
            window.intaCookieConsents = intaConsentsObjectVariable.consents;
            document.cookie = int_hideCookieBannerName + "=__inta1." + encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable), randomIntFromInterval(20, 34)) + "; expires=" + cookieLifeTime + "; path=/; " + intCookieDomain + "";
            window._latestTcString = tcString;
            dispatchTCFConsentChangedIfAvailable(true);
        });
    });
}).catch(function (err) {
    console.error('[VendorList] getVendorsForUI failed:', err);
    try {
        intaCollectVendorPassThroughUrls([]);
    } catch (eClear) { }
});
}

function openVendorList() {
    intaEnsureVendorListLoaded();
    vendorListContainer.classList.toggle('--open');
}



moreSettingsContent.appendChild(intastellarCookieConstents__Container);
intastellarCookieConstents__Container.appendChild(testSection);
intastellarCookieConstents__Container.appendChild(intastellarCookieButtons);
intastellarCookieConstents__Container.appendChild(moreFooter);

const cookieSettings = document.createElement("article");
const cookieSettingsContent = document.createElement("section");

bannerContent.setAttribute("class", "intastellarCookie-settingsContainer");
intastellarCookieButtons.setAttribute("class", "intastellarCookie-settings__buttons");
bannerContent.setAttribute("title", intastellarCookieLanguageSettings);
cookieSettings.setAttribute("class", "intastellarCookie-settings__container");
banner.setAttribute("onclick", "javascript:IntastellarCookieConsent.renew();");
const arrange = window?.INTA?.settings === undefined || window?.INTA?.settings.arrange === undefined ? "" : window?.INTA?.settings.arrange;
const intastellarLogo = darkLightCheck(window.INTA.settings.color) === "light" ? intastellarLogoDark : intastellarLogoLight;

function intaGetDocumentHead() {
    return (typeof intHead !== "undefined" && intHead)
        || document.head
        || document.getElementsByTagName("head")[0];
}

/**
 * Injects the banner stylesheet into document head.
 * Remix / ES modules / bundles: `document.currentScript` is usually null, and `previousSibling` is invalid — use fallbacks.
 */
function intaInsertStylesheetLinkInHead(stylesheetLink) {
    const head = intaGetDocumentHead();
    if (!head || !stylesheetLink) {
        console.error('[intaInsertStylesheetLinkInHead] early return: missing head or stylesheetLink');
        return;
    }
    try {
        const cs = document.currentScript;
        if (cs && cs.parentNode === head) {
            const prev = cs.previousSibling;
            if (prev && prev.parentNode === head) {
                head.insertBefore(stylesheetLink, prev);
                console.error('[intaInsertStylesheetLinkInHead] inserted before previous sibling');
                return;
            }
            head.insertBefore(stylesheetLink, cs);
            console.error('[intaInsertStylesheetLinkInHead] inserted before current script');
            return;
        }
    } catch (e) {
        /* ignore */
        console.error('[intaInsertStylesheetLinkInHead] error:', e);
    }
    try {
        if (head.firstChild) {
            head.insertBefore(stylesheetLink, head.firstChild);
            console.error('[intaInsertStylesheetLinkInHead] inserted before first child');
        } else {
            head.appendChild(stylesheetLink);
            console.error('[intaInsertStylesheetLinkInHead] appended to head');
        }
    } catch (e2) {
        /* ignore */
        console.error('[intaInsertStylesheetLinkInHead] error:', e2);
    }
}

if (window.location.host.indexOf("intastellarsolutions") == -1) {
    poweredBy = "<span class='intastellarCookie-settings__poweredBy' alt='This cookie banner is powered by Intastellar Consents Solutions'>Powered by <a class='intastellarCookie-settings__poweredByLink' href='https://www.intastellarsolutions.com' target='_blank' rel='noopener'><img class='intastellarCookie-settings__poweredByImg' width='100px' height='100px' src='" + intastellarLogo + "' alt='Intastellar Solutions, International'></a></span>";
}
if (arrange == "ltr") {
    bannerContent.classList.add("intastellarCookie-settingsContainer--otherSide");
    cookieSettings.classList.add("intastellarCookie-settings__container--otherSide");
}

function setIntastellarPartnerDomain() {
    if (window?.INTA?.settings.partnerDomain === null) return

    if (window?.INTA?.settings?.partnerDomain?.length > 0) {
        const intastellarSharingIframe = document.createElement("iframe");
        // intastellarSharingIframe.src = "https://consents.cdn.intastellarsolutions.com/cookieSharingIframe.html";
        intastellarSharingIframe.src = "/cookieSharingIframe.html";
        intastellarSharingIframe.id = "intastellarCrossSiteCheck";
        intastellarSharingIframe.style.display = "none";
        intastellarSharingIframe.style.position = "absolute";
        intastellarSharingIframe.style.top = "-100%";
        intastellarSharingIframe.style.left = "-100%";
        //document.body.appendChild(intastellarSharingIframe);

    }
}

function generatePoweredBy() {
    if (window.location.host.indexOf("intastellarsolutions") == -1) {
        let intastellarLogo = intastellarLogoLight;
        if (window.INTA.settings.design == "bannerV2") {
            intastellarLogo = intastellarLogoDark;
        }
        poweredBy = "<span class='intastellarCookie-settings__poweredBy' alt='This cookie banner is powered by Intastellar Consents Solutions'>Powered by <a class='intastellarCookie-settings__poweredByLink' href='https://www.intastellarsolutions.com' target='_blank' rel='noopener'><img class='intastellarCookie-settings__poweredByImg' width='100px' height='100px' src='" + intastellarLogo + "' alt='Intastellar Solutions, International'></a></span>";
    }
    return `<section class="intSettingsPoweredBy" > ${poweredBy}</section>`;
}

/* Locale UI from external dev/languages/{slug}.dev.js (preloaded in uc.js) or English fallback */
if (typeof intaEnsureCmpLocaleApplied === "function") {
    intaEnsureCmpLocaleApplied();
} else if (typeof intaTryApplyPreloadedCmpLocale === "function") {
    intaTryApplyPreloadedCmpLocale();
}
if (window.intaCmpUiState) {
    message = window.intaCmpUiState.message || message;
    cookieBtn = window.intaCmpUiState.cookieBtn || cookieBtn;
    settingsMessage = window.intaCmpUiState.settingsMessage || settingsMessage;
}

moreContentText.innerHTML = settingsMessage;
moreContentText.querySelectorAll(".intaExpandCookieList").forEach((btn) => {
    btn.onclick = () => {
        btn.querySelector(".intastellar__arrow").classList.toggle("open");
        btn.parentElement.querySelector(".intaCookieListOverview").classList.toggle("view");
    };
});
moreFooter.appendChild(vendorListContainer);

let ccpa = window?.INTA?.settings === undefined || window?.INTA?.settings.ccpa === undefined ? false : window?.INTA?.settings.ccpa;
let ccpaUrl = window?.INTA?.settings === undefined || window?.INTA?.settings.ccpa === undefined ? false : window?.INTA?.settings.ccpa.url;
let usPrivacy = window?.INTA?.settings?.usPrivacy;
let showUsPrivacyOptOut = ccpa || (usPrivacy && usPrivacy.on);

const _US_PRIVACY_LAW_NAMES = { VA: "Virginia Consumer Data Protection Act (CDPA)", CO: "Colorado Privacy Act (CPA)", UT: "Utah Consumer Privacy Act (UCPA)", CT: "Connecticut Data Privacy Act (CTDPA)" };
let usPrivacyLawFullName = (usPrivacy && usPrivacy.state && _US_PRIVACY_LAW_NAMES[usPrivacy.state]) || "California Consumer Privacy Act (CCPA/CPRA)";
let cookieColor = window?.INTA?.settings === undefined || window?.INTA?.settings.color === undefined || window?.INTA?.settings.color === false || window?.INTA?.settings.color.indexOf("[") > -1 || window?.INTA?.settings.color === "" ? "rgba(0, 51, 153, 1)" : window?.INTA?.settings.color;
let cookieLogo = window?.INTA?.settings === undefined || window?.INTA?.settings.logo === undefined || window?.INTA?.settings.logo === "" || window?.INTA?.settings.logo.indexOf("[") > -1 ? null : window?.INTA?.settings.logo;
let backgroundColor = window?.INTA?.settings === undefined || window?.INTA?.settings.background_color === undefined ? "#fff" : window?.INTA?.settings.background_color;
let cookieTextColor = invertColor(backgroundColor);
const checkMarkColor = cookieColor;
let brightColor = "";
if (cookieColor.indexOf("var") != -1) {
    /* document.documentElement.style
        .setProperty(cookieColor.split("(")[1].split(")")[0] + "--bright", pSBC(-0.60, getComputedStyle(document.documentElement)
            .getPropertyValue(cookieColor.split("(")[1].split(")")[0]))); */
    /* document.documentElement.style.setProperty(cookieColor.split("(")[1].split(")")[0] + "--bright", pSBC(-0.60, getComputedStyle(document.documentElement)
        .getPropertyValue(cookieColor.split("(")[1].split(")")[0]))); */
    const root = document.querySelector(':root');
    root.style.setProperty(cookieColor.split("(")[1].split(")")[0] + "--bright", pSBC(-0.60, getComputedStyle(document.documentElement)
        .getPropertyValue(cookieColor.split("(")[1].split(")")[0])));

    brightColor = "var(" + cookieColor.split("(")[1].split(")")[0] + "--bright)";
} else {
    brightColor = pSBC(-0.60, cookieColor);
}

const intaCookieBannerStyle = document.createElement("style");

let textSettings = window?.INTA?.settings === undefined || window?.INTA?.settings.text === undefined ? false : window?.INTA?.settings.text;
let withText = `
.intastellarCookie-settingsContainer{
    border-radius: 50%;
}

.intastellarCookieConstents__content-main p,
.intastellarCookieConstents__content-main h3,
.intastellarCookieConstents__content-main ol li,
.intastellarCookieConstents__content-main .intastellarCookie-settings__privacyLink{
    color: ${(darkLightCheck(window.INTA.settings.color) === "light") ? "#000" : "#fff"} !important;
}

.intaGDPR-content p{
    color: #000 !important;
    text-align: left !important;
    font-size: 16px;
    line-height: 17px;
}

.intaGDPR-content ol {
    list-style: none;
    counter-reset: item;
    padding: 0 !important;
}

.intaGDPR-content .paragraph__list:before {
    content: "§ " counters(item, ".") ". ";
    counter-increment: item;
}

.intaGDPR-content ol li {
    color: #000 !important;
    font-size: 16px;
    line-height: 17px;
}

.intaGDPR-content a{
    display: inline-block;
    padding: 5px 0px;
    color: #00a0a0;
}

.intaGDPR-content h2{
    text-align: left;
}

.intaGDPR-content h3{
    font-weight: lighter;
    font-size: 17px;
}

.intCookieIcon-openSettings{
    width: 55px;
    height: 55px;
}
`;
let position = "--right";
let text = "";
let cookieSize = "100%";
if (arrange == "ltr") {
    position = "--left";
}

let IntastellarToolTip = '<div class="intastellarToolTip ' + position + '">' + intastellarCookieLanguageSettings + '</div>';
if (textSettings) {
    IntastellarToolTip = "";
    withText = `
    .intastellarCookie-settingsContainer{
        border-radius: 20px;
    }
    .intCookieIcon-openSettings{
        width: 40px;
        height: 40px;
    }
    .intaGDPR-content p{
        color: #000 !important;
        text-align: left !important;
        font-size: 16px;
        line-height: 17px;
    }

    .intaGDPR-content ol {
        list-style: none;
        counter-reset: item;
        padding: 0 !important;
    }

    .intaGDPR-content .paragraph__list:before {
        content: "§ " counters(item, ".") ". ";
        counter-increment: item;
    }

    .intaGDPR-content ol li {
        color: #000 !important;
        font-size: 16px;
        line-height: 17px;
    }

    .intaGDPR-content a{
        display: inline-block;
        padding: 5px 0px;
        color: #00a0a0;
    }

    .intaGDPR-content h2{
        text-align: left;
    }

    .intaGDPR-content h3{
        font-weight: lighter;
        font-size: 17px;
    }
    `;
    text = "";
    cookieSize = "25%";
}
intaCookieBannerStyle.innerHTML = ".intastellarCookie-settingsContainer,.intastellarCookieConstents__contentC, .intastellarCCPAContainer, .intastellarCookie-settings__btn.intastellarCookieSettings--acceptAll{background: " + cookieColor + " !important;color: #fff !important;} .intCookie_ConsentLogo-container{border-color: #fff; background: linear-gradient(#fff 0 0) padding-box, " + cookieColor + " border-box;} .intCookie_ConsentContainer-content{border-color: #fff; background: linear-gradient(#fff 0 0) padding-box, " + cookieColor + " border-box;} .intastellarCookie-settings__btn.--changePermission{background: transparent !important; border-image-slice: 1;border-color: " + cookieColor + ";border-image:" + cookieColor + " 1 !important; border-width: 3px; border-style: solid; transition: background .25s ease-in-out; width: max-content; margin-inline: auto !important;} .intastellarCookie-settings__btn.--changePermission:hover{background: " + cookieColor + " !important; color: #fff !important;} .intCookieSetting__checkbox:checked ~ .checkmark{background: " + checkMarkColor + ";}.intastellarCCPA__popupClose{background:" + cookieColor + "; color: #fff;} .intastellarCookie-settings__close:hover{background: " + brightColor + " !important;} .intastellarCookieConstents__content-main .intastellarCookie-settings__privacyLink{color: #fff !important;} .intastellarCookie-settings__privacyLink{text-decoration: underline !important;}.intastellarCookie-settings__content .intastellarCookie-settings__privacyLink{color: " + cookieTextColor + ";}.intastellarCookie-settings__content p{color: " + cookieTextColor + " !important;}.intastellarCookie-settings__intHeader{color:" + cookieTextColor + " !important;}.intastellarCookie-settings__container{background-color: " + backgroundColor + " !important;} .intastellarCookie-settingsMoreContainer{display:none;position: fixed; top: 50%; left: 50%; background: #fff; padding: 15px;z-index: 1000; transform: translate(-50%,-50%);}" + withText;
intaGetDocumentHead().appendChild(intaCookieBannerStyle);

/* US opt-out laws: CCPA/CPRA (CA), CDPA (VA), CPA (CO), UCPA (UT), CTDPA (CT) — "Do not sell" opt-out widget */
if (showUsPrivacyOptOut) {
    const intastellarCCPAContainer = document.createElement("inta-consents-ccpa");
    const intastellarCCPAContainer__content = document.createElement("section");

    intastellarCCPAContainer.setAttribute("class", "intastellarCCPAContainer");
    intastellarCCPAContainer.setAttribute("title", usPrivacyLawFullName + ": Do not sell or share my personal data");
    intastellarCCPAContainer__content.setAttribute("class", "intastellarCCPAContainer__content")
    intastellarCCPAContainer__content.innerHTML = `
    <svg class="intastellarCCPA__icon" height="14" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 30 14" style="enable-background:new 0 0 30 14;" xml:space="preserve">
        <style type="text/css">
            .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}
            .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#0066FF;}
            .st2{fill:#FFFFFF;}
            .st3{fill:#0066FF;}
        </style>
        <g>
            <g id="final---dec.11-2020_1_">
                <g id="_x30_208-our-toggle_2_" transform="translate(-1275.000000, -200.000000)">
                    <g id="Final-Copy-2_2_" transform="translate(1275.000000, 200.000000)">
                        <path class="st0" d="M7.4,12.8h6.8l3.1-11.6H7.4C4.2,1.2,1.6,3.8,1.6,7S4.2,12.8,7.4,12.8z"/>
                    </g>
                </g>
            </g>
            <g id="final---dec.11-2020">
                <g id="_x30_208-our-toggle" transform="translate(-1275.000000, -200.000000)">
                    <g id="Final-Copy-2" transform="translate(1275.000000, 200.000000)">
                        <path class="st1" d="M22.6,0H7.4c-3.9,0-7,3.1-7,7s3.1,7,7,7h15.2c3.9,0,7-3.1,7-7S26.4,0,22.6,0z M1.6,7c0-3.2,2.6-5.8,5.8-5.8
                            h9.9l-3.1,11.6H7.4C4.2,12.8,1.6,10.2,1.6,7z"/>
                        <path id="x" class="st2" d="M24.6,4c0.2,0.2,0.2,0.6,0,0.8l0,0L22.5,7l2.2,2.2c0.2,0.2,0.2,0.6,0,0.8c-0.2,0.2-0.6,0.2-0.8,0
                            l0,0l-2.2-2.2L19.5,10c-0.2,0.2-0.6,0.2-0.8,0c-0.2-0.2-0.2-0.6,0-0.8l0,0L20.8,7l-2.2-2.2c-0.2-0.2-0.2-0.6,0-0.8
                            c0.2-0.2,0.6-0.2,0.8,0l0,0l2.2,2.2L23.8,4C24,3.8,24.4,3.8,24.6,4z"/>
                        <path id="y" class="st3" d="M12.7,4.1c0.2,0.2,0.3,0.6,0.1,0.8l0,0L8.6,9.8C8.5,9.9,8.4,10,8.3,10c-0.2,0.1-0.5,0.1-0.7-0.1l0,0
                            L5.4,7.7c-0.2-0.2-0.2-0.6,0-0.8c0.2-0.2,0.6-0.2,0.8,0l0,0L8,8.6l3.8-4.5C12,3.9,12.4,3.9,12.7,4.1z"/>
                    </g>
                </g>
            </g>
        </g>
        </svg> Do not sell or share my personal data
    `;

    intastellarCCPAContainer.appendChild(intastellarCCPAContainer__content);
    intaconsents.appendChild(intastellarCCPAContainer);

    intastellarCCPAContainer.addEventListener("click", optOutCCPA)

    const intastellarCCPApopup = document.createElement("inta-consents-ccpa-popup");
    intastellarCCPApopup.setAttribute("class", "intastellarCCPApopup");

    const instastellarCCPApopupContent = document.createElement("section");
    instastellarCCPApopupContent.setAttribute("class", "intastellarCCPApopup__content");

    if (window?.INTA?.settings?.ccpa?.collection != undefined) {
        instastellarCCPApopupContent.innerHTML = `
        <h2><svg class="intastellarCCPA__icon" width="18px" height="19px" viewBox=".2 0 19.4 20" width="13" xmlns="http://www.w3.org/2000/svg"><path d="m2.2 20c1 0 1.7-.5 2.4-.9.6-.3 1.2-.7 1.9-1 3.2-1.7 6.4-3.5 9.6-5.3 1-.5 2.3-1 3-1.9.2-.3.5-.7.4-1.2-.3-1.1-1.7-1.5-2.6-2-2.2-1.2-4.5-2.5-6.7-3.7-.8-.5-2-1.4-3-.7-.4.2-.6.4-.7.7-.1.4 0 .9 0 1.3v3.2c0 .9-.1 1.6.5 2 .2.1.6.2.9.1 1-.4.7-2.2.7-3.6v-1.1c1.7.9 3.4 1.8 5.1 2.6.6.3 1.6.6 1.8 1.4.2.9-1.7 1.6-2.3 1.9l-6.9 3.9c-.5.3-1.8 1.3-2.6 1-.3-.1-.5-.4-.5-.6-.1-.4-.1-1-.1-1.5v-3.2-5.4c0-.8-.1-1.8.2-2.3.7-1 2.3.8 2.8-.8.1-.4-.1-.8-.3-1-.4-.6-2.2-1.5-2.9-1.7-.2-.1-.7-.2-1-.2-1.7.3-1.3 3-1.3 5v9.9c0 1.5-.2 3.5.4 4.4.3.5.6.5 1.2.7zm5.2-6.5c1.5 0 1.6-1.9.2-2.2-.8-.1-1.4.7-1.2 1.4.2.5.5.6 1 .8z" fill="#000"/></svg> Do not sell or share my personal data</h2><button class="intastellarCCPA__popupClose">X</button>
        <p>This section is about our ${usPrivacyLawFullName}.</p>
        ${createCCPAPolicyLink(ccpaUrl)}
        <h3>Personal data we collect:</h3>
        <ul>
            <li>IP-Address</li>
            ${window?.INTA?.settings.ccpa.collection.map(name => '<li>' + name.charAt(0).toUpperCase() + '' + name.slice(1) + '</li>').join('')}
        </ul>
        `;
    } else {
        instastellarCCPApopupContent.innerHTML = `
        <h2><svg class="intastellarCCPA__icon" width="18px" height="19px" viewBox=".2 0 19.4 20" width="13" xmlns="http://www.w3.org/2000/svg"><path d="m2.2 20c1 0 1.7-.5 2.4-.9.6-.3 1.2-.7 1.9-1 3.2-1.7 6.4-3.5 9.6-5.3 1-.5 2.3-1 3-1.9.2-.3.5-.7.4-1.2-.3-1.1-1.7-1.5-2.6-2-2.2-1.2-4.5-2.5-6.7-3.7-.8-.5-2-1.4-3-.7-.4.2-.6.4-.7.7-.1.4 0 .9 0 1.3v3.2c0 .9-.1 1.6.5 2 .2.1.6.2.9.1 1-.4.7-2.2.7-3.6v-1.1c1.7.9 3.4 1.8 5.1 2.6.6.3 1.6.6 1.8 1.4.2.9-1.7 1.6-2.3 1.9l-6.9 3.9c-.5.3-1.8 1.3-2.6 1-.3-.1-.5-.4-.5-.6-.1-.4-.1-1-.1-1.5v-3.2-5.4c0-.8-.1-1.8.2-2.3.7-1 2.3.8 2.8-.8.1-.4-.1-.8-.3-1-.4-.6-2.2-1.5-2.9-1.7-.2-.1-.7-.2-1-.2-1.7.3-1.3 3-1.3 5v9.9c0 1.5-.2 3.5.4 4.4.3.5.6.5 1.2.7zm5.2-6.5c1.5 0 1.6-1.9.2-2.2-.8-.1-1.4.7-1.2 1.4.2.5.5.6 1 .8z" fill="#000"/></svg> Do not sell or share my personal data</h2><button class="intastellarCCPA__popupClose">X</button>
        <h3>Personal data we collect:</h3>
        <p>This section is about our ${usPrivacyLawFullName}.</p>
        <ul>
            <li>IP-Address</li>
        </ul>
        `;
    }
    intastellarCCPApopup.appendChild(instastellarCCPApopupContent);
    intaconsents.appendChild(intastellarCCPApopup);
} /* else if (!isValidCCPALink() && "ccpa" in window?.INTA?.settings && window?.INTA?.settings.ccpa.on === "true") {
    throw new IntastellarSolutionsSDK("Please add your valid 'California Consumer Privacy Act' url to the banner. Read more at https://www.intastellarsolutions.com/solutions/cookie-consents");
} */

cookieSettingsContent.setAttribute("class", "intastellarCookie-settings__content");
const intaCbBannerMessageBaseHtml = message;
/** Snapshot before async preset: `moreContentText` was filled earlier and would otherwise stay stale. */
const intaCbSettingsMessageBaseHtml = settingsMessage;

function intaCbApplyMainBannerDomAndInitialize() {
    message = intaGetTextOverride("bannerMessageHtml", intaCbBannerMessageBaseHtml);
    moreContentText.innerHTML = intaGetTextOverride("bannerMessageHtml", intaCbSettingsMessageBaseHtml);

    let intCookieIconSmallClass = cookieLogo == intCookieIcon ? " intastellarIcon" : "";
    let CompanyLogoName = cookieLogo == intCookieIcon ? "Cookie Icon" : `${document.domain} logo`;

    moreintHeader.innerHTML = `
    ${typeof window?.INTA?.settings.logo != "undefined" ? '<img onerror="this.onerror=null; this.style.display:none;" class="intSettingsCompanyLogo" src="' + window?.INTA?.settings.logo + '" alt="' + CompanyLogoName + '" title="' + CompanyLogoName + '">' : ``}
    ${(window.INTA.settings.design == "overlay" || window.INTA.settings.design == undefined || window.innerWidth < 900) ? `<section class="intSettingsPoweredBy">${poweredBy}</section>` : ""}
    `;

    cookieSettingsContent.innerHTML = '<intHeader class="intastellarCookie-settings__intHeader"><img onerror="this.onerror=null; this.style.display:none;" src="' + window?.INTA?.settings.logo + '" alt="' + CompanyLogoName + '" title="' + CompanyLogoName + '" style="width: 100%;float: left; max-width: 50px;max-height: 50px;object-fit:contain;"><h2>Cookie</h2><button class="intastellarCookie-settings__close" style="background: ' + cookieColor + ';" aria-label="Close cookie banner"></button></intHeader>'
        + message + cookieBtn
        + ((window.INTA.settings.design !== "overlay" || window.INTA.settings.design != undefined) ? poweredBy : (window.innerWidth < 768) ? null : poweredBy);

    intaCbSyncTextOverrideLabelsInScope(cookieSettingsContent);
    intaCbSyncTextOverrideLabelsInScope(moreSettingsContent);

    cookieSettings.appendChild(cookieSettingsContent);

    var bannerDesign = window.INTA.settings.design;
    if (bannerDesign === "banner" || bannerDesign === "bannerV2") {
        if (!moreSettings.contains(cookieSettings)) {
            moreSettings.appendChild(cookieSettings);
        }
    } else if (!intaconsents.contains(cookieSettings)) {
        intaconsents.appendChild(cookieSettings);
    }

    banner.setAttribute("class", "intastellarCookie-settings");

    bannerContent.innerHTML = '<img class="intCookieIcon-openSettings" style="filter: brightness(' + (darkLightCheck(window.INTA.settings.color) === "light" ? "0" : "100") + ') !important" src="' + intCookieIcon + '" alt="Cookie Icon">' + IntastellarToolTip + ' ' + text;

    banner.appendChild(bannerContent);
    moreSettings.appendChild(moreSettingsContent);
    intaconsents.classList.add('inta-cmp-not-ready');
    intaconsents.appendChild(banner);
    intaconsents.appendChild(moreSettings);
    window._intaCookieConstents = intaconsents;
    IntastellarCookieConsent.initialize(intaconsents);

    if (document.querySelector(".intastellarCCPAContainer") != null) {
        document.querySelector(".intastellarCCPAContainer").addEventListener("click", function () {
            document.querySelector(".intastellarCCPApopup").classList.toggle("--active");
        });
    }
}

if (intaCbResolveTextOverridePresetSlug()) {
    intaCbFetchTextOverridePresetFromApiIfNeeded().then(function () {
        intaCbApplyMainBannerDomAndInitialize();
    });
} else {
    intaCbApplyMainBannerDomAndInitialize();
}

function onWindowLoad(callback) {
    if (document.readyState === 'complete' && document.body
        && document.querySelector("intastellarconsents") != null
    ) {
        callback();
    } else {
        window.addEventListener('load', callback);
    }
}

/** Shopify: one setTrackingConsent with analytics + marketing + preferences (`sale_of_data` is CCPA-only; see gdpr.dev.js). */
function intaCbShopifySyncFromBannerCheckboxes() {
    const fn = document.querySelector("#functional");
    const st = document.querySelector("#statics");
    const mk = document.querySelector("#marketing");
    const payload = {
        analytics: !!(st && st.checked),
        marketing: !!(mk && mk.checked),
        preferences: !!(fn && fn.checked),
    };
    intaShopifySetTrackingConsentSafe(payload, function () {
        if (typeof window !== "undefined" && window.INTA_DEBUG) {
            console.log("Shopify Customer Privacy synced from banner", payload);
        }
    });
}

function IntaSaveSettings() {
    recordTimeToDecision('save_settings');
    const accepted = [];
    if (FunctionalCheckbox?.checked) {
        gtag('consent', 'update', {
            'functionality_storage': 'granted',
        })
        accepted.push("functionalCookies");

    } else if (!FunctionalCheckbox?.checked) {
        gtag('consent', 'update', {
            'functionality_storage': 'denied',
        });

        const index = accepted.indexOf("functionalCookies");
        if (index > -1) { // only splice array when item is found
            accepted.splice(index, 1); // 2nd parameter means remove one item only
        }
    }

    if (StaticsCheckBox?.checked) {
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
        })
        window.clarity && window.clarity('consentv2', {
            analytics_Storage: "granted"
        });
        accepted.push("staticsticCookies");
        _paq.push(['setConsentGiven']);
    } else if (!StaticsCheckBox?.checked) {
        gtag('consent', 'update', {
            'analytics_storage': 'denied',
        })

        _paq.push(['forgetConsentGiven']);

        window.clarity && window.clarity('consentv2', {
            analytics_Storage: "denied"
        });

        const index = accepted.indexOf("staticsticCookies");
        if (index > -1) { // only splice array when item is found
            accepted.splice(index, 1); // 2nd parameter means remove one item only
        }
    }

    if (MarketingCheckBox?.checked) {
        gtag('consent', 'update', {
            'ad_storage': 'granted',
            'personalization_storage': 'granted',
            'ads_data_redaction': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
        });
        window.uetq.push('consent', 'update', {
            'ad_storage': 'granted'
        });
        window.clarity && window.clarity('consentv2', {
            ad_Storage: "granted",
            analytics_Storage: "denied"
        });
        accepted.push("advertisementCookies");
        // Pintrk
        if (typeof pintrk === 'function') {
            try {
                pintrk('setconsent', true);
            } catch (e) { /* ignore */ }
        }
        // OpenAI Ads measurement consent mode
        if (typeof oaiq === 'function') {
            try {
                oaiq('consent', true);
            } catch (e) { /* ignore */ }
        }
        updateVwoConsent(intaConsentsObjectVariable.consents);

    } else if (!MarketingCheckBox?.checked || intastellar) {
        window.uetq.push('consent', 'update', {
            'ad_storage': 'denied'
        });
        gtag('consent', 'update', {
            'ad_storage': 'denied',
            'personalization_storage': 'denied',
            'ads_data_redaction': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
        });

        updateVwoConsent(intaConsentsObjectVariable.consents);
        // Pintrk
        if (typeof pintrk === 'function') {
            try {
                pintrk('setconsent', false);
            } catch (e) { /* ignore */ }
        }
        // OpenAI Ads measurement consent mode
        if (typeof oaiq === 'function') {
            try {
                oaiq('consent', false);
            } catch (e) { /* ignore */ }
        }

        window.clarity && window.clarity('consent', false);

        const index = accepted.indexOf("advertisementCookies");
        if (index > -1) { // only splice array when item is found
            accepted.splice(index, 1); // 2nd parameter means remove one item only
        }
    }
    if (typeof intaWpApplyConsentFromIntastellarChoices === "function") {
        intaWpApplyConsentFromIntastellarChoices(
            !!FunctionalCheckbox?.checked,
            !!StaticsCheckBox?.checked,
            !!MarketingCheckBox?.checked,
        );
    }
    saveINTCookieSettings("changePermission", accepted);
    // Dispatch TCF event after user action
    dispatchTCFConsentChangedIfAvailable();
};

function IntaAcceptAll() {
    recordTimeToDecision('accept_all');
    intaConsentsObjectVariable.consents = {
        staticsticCookies: "checked",
        functionalCookies: "checked",
        advertisementCookies: "checked",
    };
    window.intaCookieConsents = intaConsentsObjectVariable.consents;
    intaConsentsObjectVariable.time = new Date().getTime()
    let cV = 1;
    document.cookie =
        int_hideCookieBannerName + "=__inta1." + encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable), randomIntFromInterval(20, 34)) + "; expires=" + cookieLifeTime +
        "; path=/; " +
        intCookieDomain +
        "";
    document.cookie =
        "_vis_opt=" +
        cV +
        "; expires=" + cookieLifeTime +
        "; path=/; " +
        intCookieDomain +
        "";

    let addedNodes = document.getElementsByTagName("script");
    for (let i = 0; i < addedNodes.length; i++) {
        addedNodes.type = "";
    }



    document.querySelector("html").classList.toggle("noScroll");
    window._IntastellarConsentsBanner.classList.remove("--active");
    intaApplyCmpVisibilityFromCookie();
    dataLayer.push({ 'event': 'intastellar_consents_widget_visible' });

    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
        .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");

    gtag('consent', 'update', {
        'ad_storage': 'granted',
        'personalization_storage': 'granted',
        'analytics_storage': 'granted',
        'functionality_storage': 'granted',
        'ads_data_redaction': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'url_passthrough': true,
    });
    if (typeof intaWpApplyConsentFromIntastellarChoices === "function") {
        intaWpApplyConsentFromIntastellarChoices(true, true, true);
    }
    window.uetq.push('consent', 'update', {
        'ad_storage': 'granted'
    });
    window.clarity && window.clarity('consentv2', {
        ad_Storage: "granted",
        analytics_Storage: "granted"
    });
    intaShopifySetTrackingConsentSafe(
        {
            'analytics': true,
            'marketing': true,
            'preferences': true,
        },
        () => console.log("Consent captured")
    );
    dataLayer.push({
        'event': 'cookie_consent_update',
        'cookie_consent': intaConsentsObjectVariable.consents,
        'time_to_decision_ms': intaConsentsObjectVariable.time_to_decision
    });
    updateConsents("all");
    // Pintrk
    if (typeof pintrk === 'function') {
        try {
            pintrk('setconsent', true);
        } catch (e) { /* ignore */ }
    }
    // OpenAI Ads measurement consent mode
    if (typeof oaiq === 'function') {
        try {
            oaiq('consent', true);
        } catch (e) { /* ignore */ }
    }

    window._hsp.push(['doNotTrack', false]);
    window._hsp.push(['setHubSpotCookieConsent', {
        analytics: true,
        advertisement: true,
        functionality: true,
    }]);

    document.querySelector("#marketing").checked = true;
    document.querySelector("#statics").checked = true;
    document.querySelector("#functional").checked = true;
    // Dispatch TCF event after user action
    dispatchTCFConsentChangedIfAvailable();
}

function IntaSaveNeccessary() {
    recordTimeToDecision('decline_all');
    intaConsentsObjectVariable.consents = {
        staticsticCookies: false,
        functionalCookies: false,
        advertisementCookies: false,
    };
    window.intaCookieConsents = intaConsentsObjectVariable.consents;
    intaConsentsObjectVariable.time = new Date().getTime()
    let cV = 1;
    document.cookie =
        int_hideCookieBannerName + "=__inta1." + encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable), randomIntFromInterval(20, 34)) + "; expires=" + cookieLifeTime +
        "; path=/; " +
        intCookieDomain +
        "";
    document.cookie =
        "_vis_opt=" +
        cV +
        "; expires=" + cookieLifeTime +
        "; path=/; " +
        intCookieDomain +
        "";
    document.querySelector("html").classList.toggle("noScroll");
    window._intaCookieConstents.classList.toggle("--active");
    dataLayer.push({ 'event': 'intastellar_consents_widget_visible' });

    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
        .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");

    gtag('consent', 'update', {
        'ad_storage': 'denied',
        'personalization_storage': 'denied',
        'analytics_storage': 'denied',
        'functionality_storage': 'denied',
        'ads_data_redaction': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'url_passthrough': true,
    });
    if (typeof intaWpApplyConsentFromIntastellarChoices === "function") {
        intaWpApplyConsentFromIntastellarChoices(false, false, false);
    }
    window.uetq.push('consent', 'update', {
        'ad_storage': 'denied'
    });
    // Pintrk
    if (typeof pintrk === 'function') {
        try {
            pintrk('setconsent', false);
        } catch (e) { /* ignore */ }
    }
    // OpenAI Ads measurement consent mode
    if (typeof oaiq === 'function') {
        try {
            oaiq('consent', false);
        } catch (e) { /* ignore */ }
    }
    dataLayer.push({
        'event': 'cookie_consent_update',
        'cookie_consent': intaConsentsObjectVariable.consents,
        'time_to_decision_ms': intaConsentsObjectVariable.time_to_decision
    });
    updateConsents("denied");

    window._hsp.push(['doNotTrack']);
    window._hsp.push(['revokeCookieConsent']);
    window._hsp.push(['setHubSpotCookieConsent', {
        analytics: false,
        advertisement: false,
        functionality: false,
    }]);
    intaShopifySetTrackingConsentSafe(
        {
            'analytics': false,
            'marketing': false,
            'preferences': false,
        },
        () => console.log("Consent captured")
    );
    window.clarity && window.clarity('consent', false);
    document.querySelector("#marketing").checked = false;
    document.querySelector("#statics").checked = false;
    document.querySelector("#functional").checked = false;
    // Dispatch TCF event after user action
    dispatchTCFConsentChangedIfAvailable();
    /*window.location.reload();*/
}

const settingsSaveLang = {};

if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
    settingsSaveLang.necessaryCookiesText = "Decline All";
    settingsSaveLang.saveSettingsText = "Save settings";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
    settingsSaveLang.necessaryCookiesText = "Ablehnen";
    settingsSaveLang.saveSettingsText = "Speichern";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
    settingsSaveLang.necessaryCookiesText = "Afvis";
    settingsSaveLang.saveSettingsText = "Gem";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "es" || intastellarCookieLanguage === "es-ES") {
    settingsSaveLang.necessaryCookiesText = "Rechazar";
    settingsSaveLang.saveSettingsText = "Guardar";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fr" || intastellarCookieLanguage === "fr-FR") {
    settingsSaveLang.necessaryCookiesText = "Refuser";
    settingsSaveLang.saveSettingsText = "Enregistrer";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "it" || intastellarCookieLanguage === "it-IT") {
    settingsSaveLang.necessaryCookiesText = "Rifiuta";
    settingsSaveLang.saveSettingsText = "Salva";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "nl" || intastellarCookieLanguage === "nl-NL") {
    settingsSaveLang.necessaryCookiesText = "Weigeren";
    settingsSaveLang.saveSettingsText = "Opslaan";

} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pl" || intastellarCookieLanguage === "pl-PL") {
    settingsSaveLang.necessaryCookiesText = "Odrzuć";
    settingsSaveLang.saveSettingsText = "Zapisz";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "sv" || intastellarCookieLanguage === "sv-SE") {
    settingsSaveLang.necessaryCookiesText = "Avvisa";
    settingsSaveLang.saveSettingsText = "Spara";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pt" || intastellarCookieLanguage === "pt-PT") {
    settingsSaveLang.necessaryCookiesText = "Recusar";
    settingsSaveLang.saveSettingsText = "Salvar";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ru" || intastellarCookieLanguage === "ru-RU") {
    settingsSaveLang.necessaryCookiesText = "Отклонить";
    settingsSaveLang.saveSettingsText = "Сохранить";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "no" || intastellarCookieLanguage === "no-NO") {
    settingsSaveLang.necessaryCookiesText = "Avvis";
    settingsSaveLang.saveSettingsText = "Lagre";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fi" || intastellarCookieLanguage === "fi-FI") {
    settingsSaveLang.necessaryCookiesText = "Hylkää";
    settingsSaveLang.saveSettingsText = "Tallenna";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "cs" || intastellarCookieLanguage === "cs-CZ") {
    settingsSaveLang.necessaryCookiesText = "Odmítnout";
    settingsSaveLang.saveSettingsText = "Uložit";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "hu" || intastellarCookieLanguage === "hu-HU") {
    settingsSaveLang.necessaryCookiesText = "Elutasít";
    settingsSaveLang.saveSettingsText = "Mentés";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "tr" || intastellarCookieLanguage === "tr-TR") {
    settingsSaveLang.necessaryCookiesText = "Reddet";
    settingsSaveLang.saveSettingsText = "Ayarları Kaydet";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ch" || intastellarCookieLanguage === "zh-CN") {
    settingsSaveLang.necessaryCookiesText = "拒绝";
    settingsSaveLang.saveSettingsText = "保存设置";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "jp" || intastellarCookieLanguage === "ja-JP") {
    settingsSaveLang.necessaryCookiesText = "拒否";
    settingsSaveLang.saveSettingsText = "設定を保存";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pl" || intastellarCookieLanguage === "pl-PL") {
    settingsSaveLang.necessaryCookiesText = "Odrzuć";
    settingsSaveLang.saveSettingsText = "Zapisz";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ar" || intastellarCookieLanguage === "ar-SA") {
    settingsSaveLang.necessaryCookiesText = "رفض";
    settingsSaveLang.saveSettingsText = "حفظ الإعدادات";

} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "af" || intastellarCookieLanguage === "af-ZA") {
    settingsSaveLang.necessaryCookiesText = "Afwys";
    settingsSaveLang.saveSettingsText = "Stoor instellings";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ko" || intastellarCookieLanguage === "ko-KR") {
    settingsSaveLang.necessaryCookiesText = "거부";
    settingsSaveLang.saveSettingsText = "저장";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "th" || intastellarCookieLanguage === "th-TH") {
    settingsSaveLang.necessaryCookiesText = "ปฏิเสธทั้งหมด";
    settingsSaveLang.saveSettingsText = "บันทึกการตั้งค่า";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "et" || intastellarCookieLanguage === "et-EE") {
    settingsSaveLang.necessaryCookiesText = "Keeldu";
    settingsSaveLang.saveSettingsText = "Salvesta seaded";
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ja" || intastellarCookieLanguage === "ja-JP") {
    settingsSaveLang.necessaryCookiesText = "拒否";
    settingsSaveLang.saveSettingsText = "保存";
} else {
    settingsSaveLang.necessaryCookiesText = "Afvis";
    settingsSaveLang.saveSettingsText = "Gem";
}
settingsSaveLang.necessaryCookiesText = intaGetNecessaryButtonText(settingsSaveLang.necessaryCookiesText);

function updateSaveButtonText() {
    const FunctionalCheckbox = document.querySelector("#functional");
    const StaticsCheckBox = document.querySelector("#statics");
    const MarketingCheckBox = document.querySelector("#marketing");
    const saveBtn = document.querySelector(".intastellarCookie-settings__btn.--save");

    const vendorChecks = document.querySelectorAll('.intCookieSetting__checkbox');
    const vendorLegitChecks = document.querySelectorAll('.intCookieSetting__checkbox-legit');
    const vendorChecksChecked = vendorChecks.length > 0 && Array.from(vendorChecks).every(function (check) { return check.checked; });
    const vendorLegitChecksChecked = vendorLegitChecks.length > 0 && Array.from(vendorLegitChecks).every(function (check) { return check.checked; });

    if (!saveBtn) return;
    if (
        (FunctionalCheckbox && FunctionalCheckbox.checked) ||
        (StaticsCheckBox && StaticsCheckBox.checked) ||
        (MarketingCheckBox && MarketingCheckBox.checked) ||
        vendorChecksChecked || vendorLegitChecksChecked
    ) {
        saveBtn.innerText = intaGetTextOverride("saveSettingsButton", settingsSaveLang.saveSettingsText);
    } else {
        saveBtn.innerText = intaGetNecessaryButtonText(settingsSaveLang.necessaryCookiesText);
    }

    console.log((FunctionalCheckbox && FunctionalCheckbox.checked) ||
        (StaticsCheckBox && StaticsCheckBox.checked) ||
        (MarketingCheckBox && MarketingCheckBox.checked));

    console.log("Update save button text", saveBtn.innerText);
}

onWindowLoad(function () {

    // TCF API locator frame (required for cross-frame communication).
    // Only created once intaTcfIsRegistered() is true — see generateTcString().
    if (intaTcfIsRegistered() && !window.frames['__tcfapiLocator']) {
        let tcfApiLocator = document.createElement('iframe');
        tcfApiLocator.style.display = 'none';
        tcfApiLocator.name = '__tcfapiLocator';
        document.body.appendChild(tcfApiLocator);
    }

    (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;
    const temp = location.host.split('.').reverse();
    const domain = encodeURI(temp[1] + '.' + temp[0]);
    const trImage = document.createElement("iframe");
    trImage.name = "intastellar-solutions-sharinglibrary-iframe";
    trImage.style.display = "none";
    trImage.title = "Intastellar Solutions cookie sharing library";
    trImage.src = intastellarCookieBannerRootDomain + "/cookieSharingIframe.html";

    if (intastellarDevMode) {
        trImage.src = "/cookieSharingIframe.html";
    }

    document.body.appendChild(trImage);

    if (document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]") != null) {
        const intastellariframe = document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]");
        if (window?.INTA?.settings?.partnerDomain) {
            function sendCookieInformation(event) {
                if (event.origin !== "https://consents.cdn.intastellarsolutions.com") return;
                if (event.data === "ready" && intaConsentsObjectVariable.sharingDomains.length > 0 && intaConsentsObjectVariable.sharingDomains.includes(window.location.host)) {
                    intastellariframe.contentWindow.postMessage(intaConsentsObjectVariable, "https://consents.cdn.intastellarsolutions.com");
                    intastellariframe.contentWindow.postMessage("getConsents", "https://consents.cdn.intastellarsolutions.com");
                }
            }

            window.addEventListener("message", sendCookieInformation);
        }
    }

    gtag('set', {
        'user_id': (getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2])).uid : intaConsentsObjectVariable.uid
    });
    /* Setting Google consent default values to denied & granted based on user selection. Via that Google Ads can be shown on Webpage if user gives consents to Advertisment / Marketing cookies */
    /* (intaCookieConsents?.advertisementCookies == "false") ? '"denied"': '"granted"' */

    if (isValidPolicyLink()) {
        document.querySelectorAll(".intaCookieListOverview-vendor").forEach((vendor, i) => {
            if (window?.INTA?.settings.company != "" && window?.INTA?.settings.company != undefined && vendor.innerText == window.location.host) {
                vendor.innerText = window?.INTA?.settings.company;
                /* let msg = document.querySelectorAll(".intastellarCookie-settings__privacyLink")[i].innerText.replace(window.location.host, ""); */
                /* document.querySelectorAll(".intastellarCookie-settings__privacyLink")[i].innerText = window?.INTA?.settings.company; */
            }
        });
        document.querySelectorAll(".intCookie_ConsentLogo").forEach((logo) => {
            logo.src = window?.INTA?.settings.logo;
        });
        /* - - - Helper function for learn more click - - - */
        /* document.querySelectorAll(".intLearnMoreBtn").forEach((btn) => {
            btn.addEventListener("click", function (e) {
                learnMore(this);
            })
        }) */

        /* if (window.INTA.settings.tcf) {
            document.querySelector(".openVendorList").addEventListener("click", openVendorList);
        } */

        window?.INTA?.settings?.partnerDomain?.forEach((domain) => {
            intaConsentsObjectVariable.sharingDomains.push(domain);
        })

        if (window?.INTA?.settings?.partnerDomain) {
            dataLayer.push({
                "linker": {
                    "domains": window?.INTA?.settings?.partnerDomain
                }
            });
        }

        intaApplyCmpVisibilityFromCookie();


        // --- Banner and settings direct references ---
        /* if (!window._intaCookieBanner) {
            // If you create the banner dynamically, do it here and keep the reference
            window._intaCookieBanner = document.createElement('div');
            window._intaCookieBanner.className = 'intastellarCookieBanner';
            document.body.appendChild(window._intaCookieBanner);
        } */
        if (!window._intaCookieSettingsContainer) {
            window._intaCookieSettingsContainer = document.createElement('div');
            window._intaCookieSettingsContainer.className = 'intastellarCookie-settings__container';
            document.body.appendChild(window._intaCookieSettingsContainer);
        }
        const settings = window._intaCookieSettingsContainer;

        if (!window._intaCookieBannerSettings) {
            window._intaCookieBannerSettings = document.createElement('button');
            window._intaCookieBannerSettings.className = 'intastellarCookieBanner__settings';
            //banner.appendChild(window._intaCookieBannerSettings);
        }


        const bannerSettings = window._intaCookieBannerSettings;
        bannerSettings.addEventListener("click", () => {
            const consentBanner = window.IntastellarCookieConsent && window.IntastellarCookieConsent._banner;
            if (consentBanner && !consentBanner.classList.contains("--active")) {
                consentBanner.classList.add("--active");
                if (typeof window._intaBannerShownAt === 'undefined') {
                    window._intaBannerShownAt = Date.now();
                }
                dataLayer.push({ 'event': 'intastellar_consents_widget_visible' });
                settings.classList.remove("intastellarCookie-settings__container--expand");
            }
        });



        // Patch: re-attach listeners after banner/settings are shown
        if (window._intaCookieBannerSettings) {
            window._intaCookieBannerSettings.addEventListener("click", function () {
                setTimeout(attachConsentCheckboxListeners, 100); // Wait for DOM update
            });
        }
        if (window.IntastellarCookieConsent && window.IntastellarCookieConsent._banner) {
            window.IntastellarCookieConsent._banner.addEventListener("transitionend", function () {
                setTimeout(attachConsentCheckboxListeners, 100);
            });
        }


        if (showUsPrivacyOptOut) {
            /* const closeCCPAButton = document.querySelector(".intastellarCCPA__popupClose");

            closeCCPAButton.addEventListener("click", () => {
                document.querySelector(".intastellarCCPApopup").classList.remove("--active");
            }); */
        }

        if (button__acceptAll != null || button__acceptAll != undefined) {
            button__acceptAll.addEventListener("click", function () {

                let cV = 0;
                intaConsentsObjectVariable.consents = {
                    staticsticCookies: "checked",
                    functionalCookies: "checked",
                    advertisementCookies: "checked",
                };
                window.intaCookieConsents = intaConsentsObjectVariable.consents;
                intaConsentsObjectVariable.time = new Date().getTime();
                intaConsentsObjectVariable.time_to_decision = new Date().getTime() - window._intaBannerShownAt;
                document.cookie =
                    int_hideCookieBannerName + "=__inta1." + encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable), randomIntFromInterval(20, 34)) + "; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";

                document.cookie =
                    "_vis_opt=" +
                    cV +
                    "; expires=" +
                    new Date(
                        new Date().getTime() + 60 * 60 * 1000 * 24 * 100
                    ).toGMTString() +
                    "; path=/; " +
                    intCookieDomain +
                    "";

                document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                    .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");

                document.querySelector("html").classList.toggle("noScroll");
                window._intaCookieConstents.classList.toggle("--active");
                dataLayer.push({ 'event': 'intastellar_consents_widget_visible' });

                gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'personalization_storage': 'granted',
                    'analytics_storage': 'granted',
                    'functionality_storage': 'granted',
                    'ads_data_redaction': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted',
                    'url_passthrough': true,
                });
                window.uetq.push('consent', 'update', {
                    'ad_storage': 'granted'
                });
                window.clarity && window.clarity('consentv2', {
                    ad_Storage: "granted",
                    analytics_Storage: "granted"
                });
                dataLayer.push({
                    'event': 'cookie_consent_update',
                    'cookie_consent': intaConsentsObjectVariable.consents,
                    'time_to_decision_ms': intaConsentsObjectVariable.time_to_decision
                });

                window._hsp.push(['setHubSpotConsent', {
                    analytics: true,
                    advertisement: true,
                    functionality: true,
                }]);

                intaShopifySetTrackingConsentSafe(
                    {
                        'analytics': true,
                        'marketing': true,
                        'preferences': true,
                    },
                    () => console.log("Consent captured")
                );

                window["optimizely"].push({
                    "type": "optOut",
                    "isOptOut": false
                });


                updateConsents("all");
                intaCookieConsents.advertisementCookies = true;
                intaCookieConsents.staticsticCookies = true;
                intaCookieConsents.functionalCookies = true;

                // Dispatch TCF event after user action
                dispatchTCFConsentChangedIfAvailable();
                /*window.location.reload();*/
            });
        }

        if (button__acceptAll != null || button__acceptAll != undefined) {
            button__acceptAll.addEventListener("click", function () {

                let cV = 1;
                intaConsentsObjectVariable.consents = {
                    staticsticCookies: "checked",
                    functionalCookies: "checked",
                    advertisementCookies: "checked",
                };
                window.intaCookieConsents = intaConsentsObjectVariable.consents;

                intaCookieConsents.advertisementCookies = true;
                intaCookieConsents.staticsticCookies = true;
                intaCookieConsents.functionalCookies = true;

                intaConsentsObjectVariable.time = new Date().getTime()
                intaConsentsObjectVariable.time_to_decision = new Date().getTime() - window._intaBannerShownAt;
                document.cookie =
                    int_hideCookieBannerName + "=__inta1." + encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable), randomIntFromInterval(20, 34)) + "; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";
                document.cookie =
                    "_vis_opt=" +
                    cV +
                    "; expires=" +
                    new Date(
                        new Date().getTime() + 60 * 60 * 1000 * 24 * 100
                    ).toGMTString() +
                    "; path=/; " +
                    intCookieDomain +
                    "";
                let addedNodes = document.getElementsByTagName("script");
                for (let i = 0; i < addedNodes.length; i++) {
                    addedNodes.type = "";
                }
                document.querySelector("html").classList.toggle("noScroll");
                window._intaCookieConstents.classList.toggle("--active");
                dataLayer.push({ 'event': 'intastellar_consents_widget_visible' });
                const intastellarShared = {
                    intaConsentsObjectVariable: intaConsentsObjectVariable,
                    partnerDomain: window?.INTA?.settings.partnerDomain,
                }
                window.addEventListener("message", function (e) {
                    if (e.data != "ready" && e.origin != intastellarCookieBannerRootDomain) return
                    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                        .postMessage(JSON.stringify(intastellarShared), "*");

                })

                gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'personalization_storage': 'granted',
                    'analytics_storage': 'granted',
                    'functionality_storage': 'granted',
                    'ads_data_redaction': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted',
                    'url_passthrough': true,
                });
                window.uetq.push('consent', 'update', {
                    'ad_storage': 'granted'
                });
                window._hsp.push(['setHubSpotConsent', {
                    analytics: true,
                    advertisement: true,
                    functionality: true,
                }]);
                window.clarity && window.clarity('consentv2', {
                    ad_Storage: "granted",
                    analytics_Storage: "granted"
                });
                window["optimizely"].push({
                    "type": "optOut",
                    "isOptOut": false
                });

                intaShopifySetTrackingConsentSafe(
                    {
                        'analytics': true,
                        'marketing': true,
                        'preferences': true,
                    },
                    () => console.log("Consent captured")
                );

                dataLayer.push({
                    'event': 'cookie_consent_update',
                    'cookie_consent': intaConsentsObjectVariable.consents,
                    'time_to_decision_ms': intaConsentsObjectVariable.time_to_decision
                });
                updateConsents("all");
                /*window.location.reload();*/
            });
        }

        if (button__acceptAll != null || button__acceptAll != undefined) {
            button__acceptAllNecessary.addEventListener("click", function () {
                intaConsentsObjectVariable.consents = {
                    staticsticCookies: false,
                    functionalCookies: false,
                    advertisementCookies: false,
                };
                window.intaCookieConsents = intaConsentsObjectVariable.consents;
                intaCookieConsents.advertisementCookies = false;
                intaCookieConsents.staticsticCookies = false;
                intaCookieConsents.functionalCookies = false;

                intaConsentsObjectVariable.time = new Date().getTime()
                let cV = 1;
                intaConsentsObjectVariable.time_to_decision = new Date().getTime() - window._intaBannerShownAt;
                document.cookie =
                    int_hideCookieBannerName + "=__inta1." + encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable), randomIntFromInterval(20, 34)) + "; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";
                document.cookie =
                    "_vis_opt=" +
                    cV +
                    "; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";

                document.querySelector("html").classList.toggle("noScroll");
                window._intaCookieConstents.classList.toggle("--active");
                dataLayer.push({ 'event': 'intastellar_consents_widget_visible' });
                const intastellarShared = {
                    intaConsentsObjectVariable: intaConsentsObjectVariable,
                    partnerDomain: window?.INTA?.settings.partnerDomain,
                }
                window.addEventListener("message", function (e) {
                    if (e.data != "ready" && e.origin != intastellarCookieBannerRootDomain) return
                    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                        .postMessage(JSON.stringify(intastellarShared), "*");
                })
                gtag('consent', 'update', {
                    'ad_storage': 'denied',
                    'personalization_storage': 'denied',
                    'analytics_storage': 'denied',
                    'functionality_storage': 'denied',
                    'ads_data_redaction': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied',
                    'url_passthrough': true,
                });
                window.uetq.push('consent', 'update', {
                    'ad_storage': 'denied'
                });
                window._hsp.push(['setHubSpotConsent', {
                    analytics: false,
                    advertisement: false,
                    functionality: false,
                }]);
                window.clarity && window.clarity('consentv2', {
                    ad_Storage: "granted",
                    analytics_Storage: "granted"
                });
                intaShopifySetTrackingConsentSafe(
                    {
                        'analytics': false,
                        'marketing': false,
                        'preferences': false,
                    },
                    () => console.log("Consent captured")
                );
                window["optimizely"].push({
                    "type": "optOut",
                    "isOptOut": true
                });
                intaCookieConsents.advertisementCookies = "false" ;
                intaCookieConsents.functionalCookies = "false" ;
                intaCookieConsents.staticsticCookies = "false" ;
                updateConsents("denied");
                dataLayer.push({
                    'event': 'cookie_consent_update',
                    'cookie_consent': intaConsentsObjectVariable.consents,
                    'time_to_decision_ms': intaConsentsObjectVariable.time_to_decision
                });
                // Dispatch TCF event after user action
                dispatchTCFConsentChangedIfAvailable();
                /*window.location.reload();*/

            });
        }

        if (button__acceptAll != null || button__acceptAll != undefined) {
            const configBtn = document.querySelectorAll(".intastellarCookie-settingsContainer");

            const ness = document.querySelectorAll(".intastellarCookieBanner__accpetNecssery");
            const all = document.querySelectorAll(".intastellarCookieSettings--acceptAll");

            const analyticsBTN = document.querySelector(".analytics");
            const closeSettings = document.querySelector(".intastellarCookie-settings__close");

            configBtn.forEach((configs) => {
                configs.addEventListener("click", function () {
                    let settings = document.querySelector(".intastellarCookie-settings__container");
                    document.querySelector("html").classList.toggle("noScroll");
                    settings.classList.toggle("intastellarCookie-settings__container--expand");
                });
            });
            if (closeSettings) {
                closeSettings.addEventListener("click", function () {
                    let settings = document.querySelector(".intastellarCookie-settings__container");
                    settings.classList.toggle("intastellarCookie-settings__container--expand");
                });
            }
        } else {
            const configBtn = document.querySelectorAll(".intastellarCookie-settingsContainer");
            const config = document.querySelectorAll(".config");

            const ness = document.querySelectorAll(".intastellarCookieBanner__accpetNecssery");
            const all = document.querySelectorAll(".intastellarCookieSettings--acceptAll");
            const changePermission = document.querySelectorAll(".intastellarCookie-settings__btn.--changePermission");
            const closeCCPAButton = document.querySelector(".intastellarCCPA__popupClose");

            const analyticsBTN = document.querySelector(".analytics");
            const closeSettings = document.querySelector(".intastellarCookie-settings__close");
            let settings = document.querySelector(".intastellarCookie-settings__container");
            configBtn.forEach((configs) => {
                configs.addEventListener("click", function () {
                    let settings = window._intaCookieConstents;
                    document.querySelector("html").classList.toggle("noScroll");
                    settings.classList.add("--active");
                    dataLayer.push({ 'event': 'intastellar_consents_widget_visible' });
                });
            });


        }


        window.addEventListener("message", (e) => {
            if (e.data == "ready") {
                document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                    .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");
            }
            if (e.data) {
                const sharedCookies = e.data;
                /* console.log(sharedCookies); */
            }
        })

    } else {
        /* checkCookieStatus(); */
        /* Displaying a error message if no valid privacy url is giving */
        const errorMessage = document.createElement("div");
        const errorMessageContent = document.createElement("div");

        errorMessage.className = "intastellarErrorMessage";
        errorMessageContent.className = "intastellarErrorMessage-content";

        errorMessageContent.innerHTML = "Intastellar Solutions SDK: Please add a valid privacy & cookie policy to the banner. Read more at <a href='https://developers.intastellarsolutions.com/cookie-solutions/docs/add-privacy-policy' target='_blank' rel='noopener'>https://developers.intastellarsolutions.com/cookie-solutions/docs/add-privacy-policy</a>";

        errorMessage.appendChild(errorMessageContent);
        /* document.body.appendChild(errorMessage); */

        throw new IntastellarSolutionsSDK("Please add a valid privacy & cookie policy to the banner. Read more at https://developers.intastellarsolutions.com/cookie-solutions/docs/add-privacy-policy")
    }
});

/* --- Helper function to get Meta tags --- */
function getMeta(name) {
    let mtag = document.getElementsByTagName("meta");
    for (let i = 0; i < mtag.length; i++) {
        if (mtag[i].getAttribute('name') === name) {
            return mtag[i].getAttribute("content")
        }
    }
    return ''
}

function invertColor(color) {
    let r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {

        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
            color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );
    // Using the HSP value, determine whether the color is light or dark
    if (hsp >= 0 && 165 > hsp) {
        return '#fff';
    } else {
        return '#000';
    }
}

function listCookies() {
    let theCookies = document.cookie.split(";");
    let aString = "";
    for (let i = 1; i <= theCookies.length; i++) {
        aString += i + " " + theCookies[i - 1] + "\n";
    }
    return aString;
}

function allStorage() {

    let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        values.push(getCookie(keys[i]));
    }

    return values;
}

/* Helper function to list all cookies */
function listAllCookies(cookieList) {
    return cookieList.map((cookie) => {
        const vendor = cookie.vendor;
        if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
            return `
                <section class="intaCookieListOverview-grid">
                    <section class="intaCookieList-left">
                        <h3 class="intaCookieListOverview-heading">Udbyder</h3>
                        <p class="intaCookieListOverview-vendor">${vendor}</p>
                        <p class="intaCookieListOverview-heading">Privat Politik</p>
                        <p>${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Privatslivs politik`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Privatslivs politik</a>`}</p>
                        <h4 class="intaCookieList-CookieName">Domæne</h4>
                        ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                                <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                            `
                } else {
                    return `
                                                <p>${cookie}</p>
                                            `;
                }
            }).join(" ")}
                    </section>
                    <section>
                        <h3 class="intaCookieListOverview-heading">Cookies</h3>
                        <section>
                            ${cookie.cookies.map((cookie) => {
                if (cookie.cookie == undefined) return;
                return `
                                    <article class="intaCookieList-cookie">
                                        <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                        <p>${cookie.purpose}</p>
                                    </article>
                                `
            }).join(" ")}
                        </section>
                    </section>
                </section>
                `
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">Anbieter</h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">Datenschutzerklährung</p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Datenschutzerklährung`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Datenschutzerklährung</a>`}
                    <h4 class="intaCookieList-CookieName">Domain</h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">Cookies</h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                if (cookie.cookie == undefined) return;
                return `
                                <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>
                            `
            }).join(" ")}
                    </section>
                </section>
            </section>
            `
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">Vendor</h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">Privacy policy</p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Privacy policy`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Privacy policy</a>`}
                    <h4 class="intaCookieList-CookieName">Domains</h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">Cookies</h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                if (cookie.cookie == undefined) return;
                return `
                                <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>
                            `
            }).join(" ")}
                    </section>
                </section>
            </section>
            `
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "es" || intastellarCookieLanguage === "es-ES") {
            // Spanish
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">Proveedor</h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">Política de privacidad</p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Política de privacidad`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Política de privacidad</a>`}
                    <h4 class="intaCookieList-CookieName">Dominios</h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">Cookies</h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                if (cookie.cookie == undefined) return;
                return `
                                <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>
                            `
            }).join(" ")}
                    </section>
                </section>
            </section>
            `
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "sv" || intastellarCookieLanguage === "sv-SE") {
            // Swedish
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">Leverantör</h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Integritetspolicy
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Integritetspolicy`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Integritetspolicy</a>`}
                    <h4 class="intaCookieList-CookieName">Domäner</h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">Cookies</h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                if (cookie.cookie == undefined) return;
                return `
                                        <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>`
            }).join(" ")}
                    </section>
                </section>
            </section>
            `;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fr" || intastellarCookieLanguage === "fr-FR") {
            // French
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        Fournisseur
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Politique de confidentialité
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Politique de confidentialité`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Politique de confidentialité</a>`}
                    <h4 class="intaCookieList-CookieName">
                        Domaines
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">Cookies</h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                if (cookie.cookie == undefined) return;
                return `
                                        <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>`
            }).join(" ")}
                    </section>
                </section>
            </section>
            `;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pr" || intastellarCookieLanguage === "pr-PT") {
            // Portugese
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        Fornecedor
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Política de privacidade
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Política de privacidade`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Política de privacidade</a>`}
                    <h4 class="intaCookieList-CookieName">
                        Domaines
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">Cookies</h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                if (cookie.cookie == undefined) return;
                return `
                                        <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>`
            }).join(" ")}
                    </section>
                </section>
            </section>
            `;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "it" || intastellarCookieLanguage === "it-IT") {
            // Italian
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        Fornitore
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Informativa sulla privacy
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Informativa sulla privacy`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">
                        Informativa sulla privacy
                        </a>`}
                    <h4 class="intaCookieList-CookieName">
                        Domaines
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">Cookies</h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                if (cookie.cookie == undefined) return;
                return `
                                        <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>`
            }).join(" ")}
                    </section>
                </section>
            </section>
            `;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ru" || intastellarCookieLanguage === "ru-RU") {
            // Russian
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        Поставщик
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Политика конфиденциальности
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Политика конфиденциальности`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Политика конфиденциальности</a>`}
                    <h4 class="intaCookieList-CookieName">
                        Домены
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">
                        Cookies
                    </h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                return `
                                <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>
                            `
            }).join(" ")}
                    </section>
                </section>
            </section>
            `
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fi" || intastellarCookieLanguage === "fi-FI") {
            // Finnish
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        Toimittaja
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Tietosuojakäytäntö
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`
                        Tietosuojakäytäntö`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Tietosuojakäytäntö</a>`}
                    <h4 class="intaCookieList-CookieName">
                        Verkkotunnukset
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">
                        Cookies
                    </h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                return `
                                <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>
                            `
            }).join(" ")}
                    </section>
                </section>
            </section>
            `
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "no" || intastellarCookieLanguage === "no-NO") {
            // Norwegian
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        Leverandør
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Personvernerklæring
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`
                        Personvernerklæring`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Personvernerklæring</a>`}
                    <h4 class="intaCookieList-CookieName">
                        Domener
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">
                        Cookies
                    </h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                return `
                                <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>
                            `
            }).join(" ")}
                    </section>
                </section>
            </section>
            `
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "nl" || intastellarCookieLanguage === "nl-NL") {
            // dutch
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        Leverancier
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Privacybeleid
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`
                        Privacybeleid`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Privacybeleid</a>`}
                    <h4 class="intaCookieList-CookieName">
                        Domeinen
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">
                        Cookies
                    </h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                return `
                                <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>
                            `
            }).join(" ")}
                    </section>
                </section>
            </section>
            `
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pl" || intastellarCookieLanguage === "pl-PL") {
            // polish
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        Dostawca
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Polityka prywatności
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`
                        Polityka prywatności`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Polityka prywatności</a>`}
                    <h4 class="intaCookieList-CookieName">
                        Domeny
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">
                        Cookies
                    </h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                return `
                                <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>
                            `
            }).join(" ")}
                    </section>
                </section>
            </section>
            `
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "af" || intastellarCookieLanguage === "af-ZA") {
            // Afrikaans
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        Verskaffer
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Privaatheidsbeleid
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`
                        Privaatheidsbeleid`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Privaatheidsbeleid</a>`}
                    <h4 class="intaCookieList-CookieName">
                        Domeine
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">
                        Cookies
                    </h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                return `
                                <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>
                            `
            }).join(" ")}
                    </section>
                </section>
            </section>
            `;

        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ko" || intastellarCookieLanguage === "ko-KR") {
            // Korean
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        공급자
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        개인정보 처리방침
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`
                        개인정보 처리방침`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">개인정보 처리방침</a>`}
                    <h4 class="intaCookieList-CookieName">
                        도메인
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `;
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">
                        쿠키
                    </h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                return `
                                <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>
                            `;
            }).join(" ")}
                    </section>
                </section>
            </section>
            `;

        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ja" || intastellarCookieLanguage === "ja-JP") {
            // Japanese
            return `
                <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">提供者</h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">プライバシーポリシー</p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`プライバシーポリシー`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>`}
                    <h4 class="intaCookieList-CookieName">ドメイン</h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">クッキー</h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                return `
                                <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>
                            `
            }).join(" ")}
                    </section>
                </section>
            </section>
                `
        } else {
            return `
                <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">Udbyder</h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">Privat Politik</p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Privatslivs politik`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Privatslivs politik</a>`}
                    <h4 class="intaCookieList-CookieName">Domæne</h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">Cookies</h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                return `
                                <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>
                            `
            }).join(" ")}
                    </section>
                </section>
            </section>
                `
        }
    }).join(" ")
}

function isURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    const tmp = document.createElement('a');
    tmp.href = str;

    if (tmp.host !== window.location.host || tmp.host == window.location.host) {
        if (pattern.test(str) && str.indexOf("policy") != -1 ||
            pattern.test(str) && str.indexOf("cookie") != -1 ||
            pattern.test(str) && str.indexOf("privat") != -1 ||
            pattern.test(str) && str.indexOf("privacy") != -1 ||
            pattern.test(str) && str.indexOf("conditions") != -1 ||
            pattern.test(str) && str.indexOf("datenschutz") != -1 ||
            pattern.test(str) && str.indexOf("politica") != -1 ||
            pattern.test(str) && str.indexOf("handelsbetingelser") != -1) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function isCCPAURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    const tmp = document.createElement('a');
    tmp.href = str;

    if (tmp.host !== window.location.host || tmp.host == window.location.host) {
        if (pattern.test(str) && str.indexOf("policy") != -1 ||
            pattern.test(str) && str.indexOf("ccpa") != -1 ||
            pattern.test(str) && str.indexOf("california-consumer-privacy-act") != -1 ||
            pattern.test(str) && str.indexOf("california") != -1 ||
            pattern.test(str) && str.indexOf("privacy-act") != -1 ||
            pattern.test(str) && str.indexOf("california-consumer") != -1) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/* Helper function to get list of cookies */

function getCookies() {
    let cookies = document.cookie.split(';');
    let ret = '';
    for (let i = 1; i <= cookies.length; i++) {
        ret += i + ' - ' + cookies[i - 1] + "<br>";
    }
    return ret;
}

/* Adding Privacy Policy of Intastellar Solutions, International */

let intastellarSolutionsPrivacyPolicy = "https://www.intastellarsolutions.com/about/legal/privacy/gdpr-cookiebanner/embedded/privacy-policy";
const xhr = new XMLHttpRequest();
xhr.onload = function () {
    intastellarSolutionsPrivacyPolicy = "loading...";
    if (this.status === 200) {
        intastellarSolutionsPrivacyPolicy = this.responseText;
    }
}

xhr.open("GET", "https://www.intastellarsolutions.com/about/legal/privacy/gdpr-cookiebanner/embedded/privacy-policy?lang=" + (window?.INTA?.settings === undefined || window?.INTA?.settings.lang === "auto" || window?.INTA?.settings.lang === "" ? document.querySelector("html").getAttribute("lang") : window?.INTA?.settings.language == "german" ? "de" : window?.INTA?.settings.language == "danish" ? "da" : window?.INTA?.settings.language == "english" ? "en" : document.querySelector("html").getAttribute("lang")) + "&v=" + new Date().getTime());
xhr.send();
setIntastellarPartnerDomain();

function showPrivacy() {

    let paddingTop = "100px";
    if (window.INTA.settings.design === "banner") {
        paddingTop = "56px";
    } else if (window.INTA.settings.design === "bannerV2") {
        paddingTop = "26px";
    }

    document.querySelector(".intLearnMoreBtn").style.display = "none";
    document.querySelector(".intastellarCookieConstents__content").style.scrollPaddingTop = paddingTop;
    const moreContentText = document.querySelector(".intastellar_privacyPolicy");
    moreContentText.style.height = "100%";
    moreContentText.style.background = "#ffff";
    moreContentText.style.color = "#000";
    moreContentText.style.borderBottom = "1px solid #c4c4c4"
    moreContentText.style.textAlign = "left";
    moreContentText.innerHTML = `
                <div style = "padding: 25px;">
                    <button onClick="hidePrivacy()" class="intastellarCookieBannerPrivacy-BackButton">Back</button>
            ${intastellarSolutionsPrivacyPolicy}
        </div>
                `;

    moreContentText.scrollIntoView({
        behavior: "smooth",
        block: "start",
    })
}

function hidePrivacy() {
    document.querySelector(".intLearnMoreBtn").style.display = "block";
    const moreContentText = document.querySelector(".intastellar_privacyPolicy");
    moreContentText.style.height = "0";
}

function checkIfIncluded(file) {
    let links = document.getElementsByTagName("link");
    for (let i = 0; i < links.length; i++) {
        if (links[i].href.substr(-file.length) == file)
            return true;
    }

    let scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.substr(-file.length) == file)
            return true;
    }

    return false;
}

/* - - - Helper functions for Validate policy link - - - */
function isValidCCPALink() {
    if (typeof window?.INTA?.settings.ccpa === "object" && isCCPAURL(window?.INTA?.settings.ccpa.url)) {
        if (window?.INTA?.settings.ccpa.url.length > 0 && typeof window?.INTA?.settings.ccpa.url != "undefined") {
            return true;
        }
    }

    return false;
}

/* - - - Helper functions for Messages */
function generatePolicyUrl(policy_link_text) {
    let url = "";
    /* if (typeof window.INTA.policy_link === 'undefined') {
        throw new IntastellarSolutionsSDK("Policy URL has not been defined.")
        return;
    } */
    if (typeof window.INTA.policy_link === "object") {
        url = "<a href='" + window.INTA.policy_link.url + "' target='" + window.INTA.policy_link.target + "' class='intastellarCookie-settings__privacyLink'>" + policy_link_text + "</a>"
    } else if (typeof window.INTA.policy_link === "string") {
        url = "<a href='" + window.INTA.policy_link + "' class='intastellarCookie-settings__privacyLink'>" + policy_link_text + "</a>";
    }
    return url;
}
function generateCookieButtons(allCookiesText, necessaryCookiesText, cookieSettingsText) {
    let acceptAllText = intaGetTextOverride("acceptAllButton", allCookiesText);
    let necessaryOnlyText = intaGetNecessaryButtonText(necessaryCookiesText);
    let settingsText = intaGetTextOverride("settingsButton", cookieSettingsText);
    return '<button class="intastellarCookie-settings__btn --bg intastellarCookieSettings--acceptAll" onclick="javascript:IntaAcceptAll();">' + acceptAllText + '</button>'
        + '<button class="intastellarCookie-settings__btn intastellarCookieBanner__accpetNecssery" onclick="javascript:IntaSaveNeccessary();">' + necessaryOnlyText + '</button>'
        + '<button class="intastellarCookie-settings__btn intastellarCookieBanner__settings" onclick="javascript:IntaSaveSettings();">' + settingsText + '</button>';
}

function generateCookieSettingsButton(settingsText, allCookiesText) {
    let saveSettingsText = intaGetTextOverride("saveSettingsButton", settingsText);
    let acceptAllText = intaGetTextOverride("acceptAllButton", allCookiesText);
    return '<section class="intSettingsButton"><button class="intastellarCookie-settings__btn intastellarCookieBanner__settings --save" onclick="javascript:IntaSaveSettings();">' + saveSettingsText + '</button>'
        + '<button class="intastellarCookie-settings__btn --noBorderRadius --bg intastellarCookieSettings--acceptAll" onclick="javascript:IntaAcceptAll();">' + acceptAllText + '</button></section>'
        ;
}
/* - - - Helper function for ccpa URL generator */
function createCCPAPolicyLink(link) {
    let url = "";
    url = "<a href='" + link + "' class='intastellarCookie-settings__privacyLink'>Read more about our ccpa</a>";
    return url;
}
/* - - - Helper functions for Validate policy link - - - */
function isValidPolicyLink() {
    if (typeof window.INTA.policy_link === 'string' && isURL(window.INTA.policy_link)) {
        if (window.INTA.policy_link.length > 0) {
            return true;
        }
    }

    if (typeof window.INTA.policy_link === "object" && isURL(window.INTA.policy_link.url)) {
        if (window.INTA.policy_link.url.length > 0 && typeof window.INTA.policy_link.url != "undefined") {
            return true;
        }
    }

    return false;
}

/* - - - Cookie Banner API: lazy-load vendor/cookie data when details panel opens - - - */
var _intaCookieBannerApiLoaded = false;

function intaFetchCookieBannerData() {
    if (_intaCookieBannerApiLoaded) return;
    _intaCookieBannerApiLoaded = true;

    if (window.intaFoundCookieList?.categories) return;

    var domain = location.hostname;
    var apiUrl = 'https://www.intastellarconsents.com/api/cookie-banner.js?domain=' + encodeURIComponent(domain);

    fetch(apiUrl)
        .then(function (res) {


            console.log(res.status);
            if (!res.ok) throw new Error('API returned ' + res.status);
            return res.json();
        })
        .then(function (data) {
            var isEmpty = !data
                || (Array.isArray(data) && data.length === 0)
                || (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0);
            if (isEmpty) {
                intaTriggerCookieBannerScan(domain);
            } else {
                intaApplyCookieBannerApiData(data);
            }
        })
        .catch(function () {
            intaRenderFallbackCookieLists();
        });
}

function intaTriggerCookieBannerScan(domain) {
    ['functional', 'statistics', 'marketing'].forEach(function (cat) {
        var el = document.getElementById('inta-cookie-list-' + cat);
        if (el) el.innerHTML = '<p style="padding:8px;font-size:13px;color:#555;">Scanning website for cookies…</p>';
    });

    fetch('https://www.intastellarconsents.com/api/cookie-banner-scan?domain=' + encodeURIComponent(domain))
        .then(function (res) {
            if (!res.ok) throw new Error('Scan API returned ' + res.status);
            return res.json();
        })
        .then(function (data) {
            if (data && ((Array.isArray(data) && data.length) || (!Array.isArray(data) && Object.keys(data).length))) {
                intaApplyCookieBannerApiData(data);
            } else {
                intaRenderFallbackCookieLists();
            }
        })
        .catch(function () {
            intaRenderFallbackCookieLists();
        });
}

function intaApplyCookieBannerApiData(data) {
    var categories = { functional: [], statistics: [], marketing: [] };

    if (Array.isArray(data)) {
        data.forEach(function (vendor) {
            var cat = String(vendor.type || vendor.category || 'marketing').toLowerCase();
            if (categories[cat]) categories[cat].push(vendor);
            else categories.marketing.push(vendor);
        });
    } else {
        if (Array.isArray(data.functional))  categories.functional  = data.functional;
        if (Array.isArray(data.statistics))  categories.statistics  = data.statistics;
        if (Array.isArray(data.marketing))   categories.marketing   = data.marketing;
        // tolerate alternate key names from the API
        if (Array.isArray(data.statistic))   categories.statistics  = data.statistic;
        if (Array.isArray(data.analytics))   categories.statistics  = data.analytics;
        if (Array.isArray(data.advertising)) categories.marketing   = data.advertising;
    }

    Object.keys(categories).forEach(function (cat) {
        var el = document.getElementById('inta-cookie-list-' + cat);
        if (!el) return;
        var list = categories[cat];
        el.innerHTML = list.length ? listAllCookies(list) : '';
    });
}

function intaRenderFallbackCookieLists() {
    var map = {
        functional: (typeof inta_functionalCookieList !== 'undefined') ? inta_functionalCookieList : [],
        statistics: (typeof inta_statisticCookieList !== 'undefined') ? inta_statisticCookieList : [],
        marketing:  (typeof inta_marketingCookieList  !== 'undefined') ? inta_marketingCookieList  : []
    };
    Object.keys(map).forEach(function (cat) {
        var el = document.getElementById('inta-cookie-list-' + cat);
        if (el) el.innerHTML = listAllCookies(map[cat]);
    });
}

/* - - - Helper function to learn more - - - */
function learnMore(e) {
    /* if(document.querySelector(".intastellar_privacyPolicy").style.height === "100%") {
        document.querySelector(".intastellar_privacyPolicy").height = "0";
    } */

    let paddingTop = "140px";
    if (window.INTA.settings.design === "banner") {
        paddingTop = "56px";
    } else if (window.INTA.settings.design === "bannerV2") {
        paddingTop = "16px";
    }


    document.querySelector(".intReadMore").classList.toggle("view");
    document.querySelector(".intastellarCookieConstents__content").style.scrollPaddingTop = paddingTop;

    if (document.querySelector(".intReadMore").classList.contains("view")) {
        intaFetchCookieBannerData();
        if (intastellarCookieLanguage == "da-DK" || intastellarCookieLanguage == "da" || intastellarCookieLanguage == "dk") {
            e.innerHTML = "Skjul detaljer";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
            e.innerHTML = "Hide details";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de" || intastellarCookieLanguage === "de-DE") {
            e.innerHTML = "Details ausblenden";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "es" || intastellarCookieLanguage === "es-ES") {
            e.innerHTML = "Ocultar detalles";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fr" || intastellarCookieLanguage === "fr-FR") {
            e.innerHTML = "Masquer les détails";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "it" || intastellarCookieLanguage === "it-IT") {
            e.innerHTML = "Nascondi dettagli";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "nl" || intastellarCookieLanguage === "nl-NL") {
            e.innerHTML = "Verberg details";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pl" || intastellarCookieLanguage === "pl-PL") {
            e.innerHTML = "Ukryj szczegóły";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pt" || intastellarCookieLanguage === "pt-PT") {
            e.innerHTML = "Ocultar detalhes";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ru" || intastellarCookieLanguage === "ru-RU") {
            e.innerHTML = "Скрыть детали";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "sv" || intastellarCookieLanguage === "sv-SE") {
            e.innerHTML = "Dölj detaljer";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "af" || intastellarCookieLanguage === "af-ZA") {
            e.innerHTML = "Versteek besonderhede";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ko" || intastellarCookieLanguage === "ko-KR") {
            e.innerHTML = "세부정보 숨기기";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "th" || intastellarCookieLanguage === "th-TH") {
            e.innerHTML = "ซ่อนรายละเอียด";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fi" || intastellarCookieLanguage === "fi-FI") {
            e.innerHTML = "Piilota yksityiskohdat";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "no" || intastellarCookieLanguage === "no-NO") {
            e.innerHTML = "Skjul detaljer";
        }

        document.querySelector(".intReadMore").scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    } else {
        if (intastellarCookieLanguage == "da-DK" || intastellarCookieLanguage == "da" || intastellarCookieLanguage == "dk") {
            e.innerHTML = "Vis detaljer";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
            e.innerHTML = "Show details";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de" || intastellarCookieLanguage === "de-DE") {
            e.innerHTML = "Details einblenden";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "es" || intastellarCookieLanguage === "es-ES") {
            e.innerHTML = "Mostrar detalles";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fr" || intastellarCookieLanguage === "fr-FR") {
            e.innerHTML = "Afficher les détails";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "it" || intastellarCookieLanguage === "it-IT") {
            e.innerHTML = "Mostra dettagli";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "nl" || intastellarCookieLanguage === "nl-NL") {
            e.innerHTML = "Toon details";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pl" || intastellarCookieLanguage === "pl-PL") {
            e.innerHTML = "Pokaż szczegóły";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pt" || intastellarCookieLanguage === "pt-PT") {
            e.innerHTML = "Mostrar detalhes";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ru" || intastellarCookieLanguage === "ru-RU") {
            e.innerHTML = "Показать детали";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "sv" || intastellarCookieLanguage === "sv-SE") {
            e.innerHTML = "Visa detaljer";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "af" || intastellarCookieLanguage === "af-ZA") {
            e.innerHTML = "Wys besonderhede";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ko" || intastellarCookieLanguage === "ko-KR") {
            e.innerHTML = "세부정보 표시";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "th" || intastellarCookieLanguage === "th-TH") {
            e.innerHTML = "แสดงรายละเอียด";
        }

        document.querySelector(".intastellarCookieConstents__contentC").scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
}

/* - - - Helper function for saving settings - - - */

/* - - - END - - - */
function updateConsents(consent, type = null) {

    window.allScripts.map((script) => {
        if (script.type == "marketing") {
            script.scripts.forEach((src) => {
                document.querySelectorAll("script").forEach((script) => {

                    if (new RegExp(src, "ig").test(script.src) || script.innerText.indexOf(src) > -1) {
                        script.type = "text/javascript";
                    }
                })
            })
        }
    })

    let googleAdsScript = document.querySelector("script[src*='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js']")?.src;
    googleAdsScript = googleAdsScript?.split("client=")[1]?.split("&")[0];
    if (consent == "all") {
        let staticCookies = [...inta_statisticCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        let marketingCookie = [...inta_marketingCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        let functionalCookies = [...inta_functionalCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        int__cookiesToKeep.push.apply(int__cookiesToKeep, staticCookies);
        int__cookiesToKeep.push.apply(int__cookiesToKeep, marketingCookie);
        int__cookiesToKeep.push.apply(int__cookiesToKeep, functionalCookies);
        deleteAllCookies();

        return;
    }

    /*  if (consent == "all" || type.length > 0 && type.includes("advertisementCookies")) {
         (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;
         (adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 0;
         (adsbygoogle = window.adsbygoogle || []).push({});
     } else {
         (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 1;
         (adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;
     } */

    if (type != null && type.length > 0) {
        type.forEach((t) => {

            if (t == "staticsticCookies") {
                let staticCookies = [...inta_statisticCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
                const index = int__cookiesToKeep.indexOf(staticCookies);
                if (index == -1) { // only splice array when item is found
                    int__cookiesToKeep.push.apply(int__cookiesToKeep, staticCookies);
                }
                deleteAllCookies();
            } else if (t == "advertisementCookies") {
                let marketingCookie = [...inta_marketingCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
                const index = int__cookiesToKeep.indexOf(marketingCookie);
                if (index == -1) { // only splice array when item is found
                    int__cookiesToKeep.push.apply(int__cookiesToKeep, marketingCookie);
                }
                deleteAllCookies();
            } else if (t == "functionalCookies") {
                let functionalCookies = [...inta_functionalCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
                const index = int__cookiesToKeep.indexOf(functionalCookies);
                if (index == -1) {
                    int__cookiesToKeep.push.apply(int__cookiesToKeep, functionalCookies);
                }
                deleteAllCookies();
            }
        })
    }

    if (intaCookieConsents?.staticsticCookies === "checked") {
        window["optimizely"].push({
            "type": "optOut",
            "isOptOut": false
        });
        let newArray = [...inta_statisticCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray);
        _paq.push(['setConsentGiven']);
        deleteAllCookies();

        window.allScripts.map((script) => {
            if (script.type == "statics") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {
                        if (new RegExp(src, "ig").test(script.src) || script.innerText.indexOf(src) > -1) {
                            script.type = "text/javascript";
                        }
                    })
                })
            }
        })
    } else {
        window["optimizely"].push({
            "type": "optOut",
            "isOptOut": true
        });
        _paq.push(['forgetConsentGiven']);
        window.allScripts.map((script) => {
            if (script.type == "statics") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {
                        if (new RegExp(src, "ig").test(script.src) || script.innerText.indexOf(src) > -1) {
                            script.type = "text/blocked";
                        }
                    })
                })
            }
        })
    }

    if (intaCookieConsents?.functionalCookies === "checked") {
        const intaBlockItemsContainer = document.querySelectorAll("inta-consents[data-src]");

        window.allScripts.map((script) => {
            if (script.type == "functional") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {

                        if (new RegExp(src, "ig").test(script.src) || script.innerText.indexOf(src) > -1) {
                            script.type = "text/javascript";
                        }
                    })
                })
            }
        })

        let newArray = [...inta_functionalCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray);
        deleteAllCookies();

        intaBlockItemsContainer.forEach((container) => {
            const newIframe = document.createElement("iframe");
            newIframe.border = "0";
            newIframe.frameBorder = "0";

            if (container.getAttribute("data-class")) {
                newIframe.setAttribute("class", container.getAttribute("data-class"))
            } else {
                newIframe.width = "560";
                newIframe.height = "315";
            }

            if (container.getAttribute("data-src") !== "undefined") {
                newIframe.src = container.getAttribute("data-src");
                container.parentElement.replaceChild(newIframe, container);
            }
        })
    } else {
        window.allScripts.map((script) => {
            if (script.type == "functional") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {

                        if (new RegExp(src, "ig").test(script.src) || script.innerText.indexOf(src) > -1) {
                            script.type = "text/blocked";
                        }
                    })
                })
            }
        })
    }

    if (intaCookieConsents?.advertisementCookies === "checked") {
        const intaBlockItemsContainer = document.querySelectorAll("inta-consents-iframe[data-src]");
        const marketingScriptTags = document.querySelectorAll("script[data-marketing]");
        let newArray = [...inta_marketingCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray);
        deleteAllCookies();

        fbq('consent', 'grant');

        window.allScripts.map((script) => {
            if (script.type == "marketing") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {

                        if (new RegExp(src, "ig").test(script.src) || script.innerText.indexOf(src) > -1) {
                            script.type = "text/javascript";
                        }
                    })
                })
            }
        })

        intaBlockItemsContainer.forEach((container) => {
            const newIframe = document.createElement("iframe");
            newIframe.border = "0";
            newIframe.frameBorder = "0";
            newIframe.setAttribute("inta-yt-placeholder-img", container?.querySelector("inta-consents-bg")?.getAttribute("inta-bg-img"));

            if (container.getAttribute("data-src").indexOf("youtube") > -1 || container.getAttribute("data-src").indexOf("youtu.be") > -1) {
                newIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                newIframe.title = "YouTube video player";
            }

            if (container.getAttribute("data-class")) {
                newIframe.setAttribute("class", container.getAttribute("data-class"))
            } else {
                newIframe.width = "560";
                newIframe.height = "315";
            }

            newIframe.src = container.getAttribute("data-src");
            container.parentElement.replaceChild(newIframe, container);
        })
    } else {
        window.allScripts.map((script) => {
            if (script.type == "marketing") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {

                        if (new RegExp(src, "ig").test(script.src) || script.innerText.indexOf(src) > -1) {
                            script.type = "text/blocked";
                        }
                    })
                })
            }
        })
    }
}

function saveINTCookieSettings(consent, type = null) {
    recordTimeToDecision(type || 'save_settings');
    document.querySelector("html").classList.remove("noScroll");
    window._IntastellarConsentsBanner.classList.remove("--active");
    intaApplyCmpVisibilityFromCookie();
    const FunctionalCheckbox = document.querySelector("#functional");
    const StaticsCheckBox = document.querySelector("#statics");
    const MarketingCheckBox = document.querySelector("#marketing");

    window._hsp.push(['setHubSpotCookieConsent', {
        analytics: StaticsCheckBox?.checked,
        advertisement: MarketingCheckBox?.checked,
        functionality: FunctionalCheckbox?.checked,
    }]);

    if (MarketingCheckBox?.checked) {
        gtag('consent', 'update', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'url_passthrough': true,
        });
        window.uetq.push('consent', 'update', {
            'ad_storage': 'granted'
        });
        window.clarity && window.clarity('consentv2', {
            ad_Storage: "granted",
            analytics_Storage: "denied"
        });
        window._hsp.push(['doNotTrack', false]);

        /* window.allScripts.map((script) => {
            if (script.type == "marketing") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {
                        if (window.notRequired.test(script.src) || window.notRequired.test(script.innerText)) {

                            script.type = "text/javascript";

                        }
                    })
                })
            }
        }) */
    } else {
        window._hsp.push(['doNotTrack']);
        window._hsp.push(['revokeCookieConsent']);
        gtag('consent', 'update', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'url_passthrough': true
        });
        window.uetq.push('consent', 'update', {
            'ad_storage': 'denied'
        });
        window.clarity && window.clarity('consent', false);

        /* window.allScripts.map((script) => {
            if (script.type == "marketing") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {
                        if (window.notRequired.test(script.src) || window.notRequired.test(script.innerText)) {

                            script.type = "text/blocked";

                        }
                    })
                })
            }
        }) */
    }

    if (FunctionalCheckbox?.checked) {
        gtag('consent', 'update', {
            'functionality_storage': 'granted',
            'url_passthrough': true,
        })

        window.clarity && window.clarity('consent', false);

        window._hsp.push(['doNotTrack', false]);

        /* window.allScripts.map((script) => {
            if (script.type == "functional") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {
                        if (window.notRequired.test(script.src) || window.notRequired.test(script.innerText)) {

                            script.type = "text/javascript";

                        }
                    })
                })
            }
        }) */
    } else {
        window._hsp.push(['doNotTrack']);
        window._hsp.push(['revokeCookieConsent']);
        window.clarity && window.clarity('consent', false);
        gtag('consent', 'update', {
            'functionality_storage': 'denied',
        })

        /* window.allScripts.map((script) => {
            if (script.type == "functional") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {
                        if (window.notRequired.test(script.src) || window.notRequired.test(script.innerText)) {

                            script.type = "text/blocked";

                        }
                    })
                })
            }
        }) */
    }

    if (StaticsCheckBox?.checked) {
        window["optimizely"].push({
            "type": "optOut",
            "isOptOut": false
        });
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'url_passthrough': true,
        })
        window._hsp.push(['doNotTrack', false]);
        window.clarity && window.clarity('consentv2', {
            ad_Storage: "denied",
            analytics_Storage: "granted"
        });
        /* window.allScripts.map((script) => {
            if (script.type == "statics") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {
                        if (window.notRequired.test(script.src) || window.notRequired.test(script.innerText)) {

                            script.type = "text/javascript";

                        }
                    })
                })
            }
        }) */
    } else {
        window["optimizely"].push({
            "type": "optOut",
            "isOptOut": true
        });
        window._hsp.push(['doNotTrack']);
        window._hsp.push(['revokeCookieConsent']);
        gtag('consent', 'update', {
            'analytics_storage': 'denied',
            'url_passthrough': true,
        })

        window.clarity && window.clarity('consent', false);
        /* window.allScripts.map((script) => {
            if (script.type == "statics") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {
                        if (window.notRequired.test(script.src) || window.notRequired.test(script.innerText) > -1) {
                            script.type = "text/blocked";
                        }
                    })
                })
            }
        }) */
    }

    intaConsentsObjectVariable.consents = {
        staticsticCookies: (StaticsCheckBox?.checked) ? "checked" : false,
        functionalCookies: (FunctionalCheckbox?.checked) ? "checked" : false,
        advertisementCookies: (MarketingCheckBox?.checked) ? "checked" : false,
    };
    window.intaCookieConsents = intaConsentsObjectVariable.consents;
    /* One full-matrix Shopify sync (per-category calls removed — they caused multiple consent log entries). */
    intaCbShopifySyncFromBannerCheckboxes();
    dataLayer.push({
        'event': 'cookie_consent_update',
        'cookie_consent': intaConsentsObjectVariable.consents,
        'time_to_decision_ms': intaConsentsObjectVariable.time_to_decision
    });
    intaConsentsObjectVariable.time = new Date().getTime()

    document.cookie = int_hideCookieBannerName + "=__inta1." + encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable), randomIntFromInterval(20, 34)) + "; expires=" + cookieLifeTime +
        "; path=/; " +
        intCookieDomain +
        "";
    /*window.location.reload();*/
    updateConsents(consent, type);
    setTimeout(() => {
        restartObserver();
    }, 1000);
    if (document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]") != null) {
        document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
            .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");
    }
    dispatchTCFConsentChangedIfAvailable(true);
}