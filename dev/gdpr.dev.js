/*
 *  Cookie Consents Banner by Intastellar Solutions, International
 *  intastellarsolutions.com/gdpr-cookiebanner
 *  consents.cdn.intastellarsolutions.com/uc.js
 *  @copy 2022-2025 Intastellar Solutions, International
 *
*/
// --- Cross-site Consent Tracking ---
// Request consent state for a user
// Request consent state for a user
function requestConsentState(userId, rootDomain, partnerDomains = []) {
    consentIframe.contentWindow.postMessage({ type: 'getConsent', userId, rootDomain, partnerDomains }, 'https://consents.cdn.intastellarsolutions.com');
}

// Set consent state for a user
function setConsentState(userId, consents, rootDomain, partnerDomains = []) {
    consentIframe.contentWindow.postMessage({ type: 'setConsent', userId, consents, rootDomain, partnerDomains }, 'https://consents.cdn.intastellarsolutions.com');
    // VWO consent update
    updateVwoConsent(consents);
}

/**
 * Shopify: `sale_of_data` is separate from marketing/analytics/preferences (CCPA-style opt-out).
 * Only send `sale_of_data: false` when the visitor used the dedicated opt-out flow (`ccpa_opt_out`).
 * Do not map marketing cookies to sale_of_data — see Shopify Customer Privacy docs.
 * @see https://shopify.dev/docs/api/customer-privacy#collect-and-register-data-sale--sharing-opt-out
 */
function intaShopifyMergePayloadWithCcpaSaleOptOut(payload) {
    if (!payload || typeof payload !== "object") {
        return payload;
    }
    let out = Object.assign({}, payload);
    try {
        if (localStorage.getItem("ccpa_opt_out") === "true") {
            out.sale_of_data = false;
        }
    } catch (e) {
        /* ignore */
    }
    return out;
}

/* --- Shopify setTrackingConsent coalescing (one network write per burst + skip identical payload) --- */
let intaShopifyCoalesceTimer = null;
let intaShopifyCoalescePending = null;
let intaShopifyCoalesceCallbacks = [];
let intaShopifyLastSetTrackingConsentJson = null;
let intaShopifyFlushApiMisses = 0;

function intaShopifyStableConsentPayloadJson(p) {
    if (!p || typeof p !== "object") {
        return "";
    }
    let keys = ["analytics", "marketing", "preferences", "sale_of_data"].filter(function (k) {
        return Object.prototype.hasOwnProperty.call(p, k);
    });
    let o = {};
    for (let i = 0; i < keys.length; i++) {
        o[keys[i]] = p[keys[i]];
    }
    return JSON.stringify(o);
}

function intaShopifyShallowMergeConsentPatch(target, patch) {
    let base = target && typeof target === "object" ? Object.assign({}, target) : {};
    if (!patch || typeof patch !== "object") {
        return base;
    }
    if ("analytics" in patch) {
        base.analytics = patch.analytics;
    }
    if ("marketing" in patch) {
        base.marketing = patch.marketing;
    }
    if ("preferences" in patch) {
        base.preferences = patch.preferences;
    }
    if ("sale_of_data" in patch) {
        base.sale_of_data = patch.sale_of_data;
    }
    return base;
}

function intaShopifyRunCoalescedCallbacks(arr) {
    let list = arr || [];
    for (let i = 0; i < list.length; i++) {
        try {
            if (typeof list[i] === "function") {
                list[i]();
            }
        } catch (e) {
            /* ignore */
        }
    }
}

function intaShopifyFlushQueuedSetTrackingConsent() {
    intaShopifyCoalesceTimer = null;
    if (intaShopifyCoalescePending == null || typeof intaShopifyCoalescePending !== "object") {
        intaShopifyRunCoalescedCallbacks(intaShopifyCoalesceCallbacks.splice(0));
        return;
    }

    let merged = intaShopifyMergePayloadWithCcpaSaleOptOut(Object.assign({}, intaShopifyCoalescePending));
    let api = window.Shopify && window.Shopify.customerPrivacy;

    if (typeof api?.setTrackingConsent !== "function") {
        let canRetry = typeof window.Shopify?.loadFeatures === "function";
        if (!canRetry || intaShopifyFlushApiMisses > 80) {
            intaShopifyCoalescePending = null;
            intaShopifyFlushApiMisses = 0;
            intaShopifyRunCoalescedCallbacks(intaShopifyCoalesceCallbacks.splice(0));
            return;
        }
        intaShopifyFlushApiMisses++;
        intaShopifyCoalesceTimer = setTimeout(intaShopifyFlushQueuedSetTrackingConsent, 100);
        return;
    }
    intaShopifyFlushApiMisses = 0;

    let json = intaShopifyStableConsentPayloadJson(merged);
    if (json === intaShopifyLastSetTrackingConsentJson) {
        intaShopifyCoalescePending = null;
        intaShopifyRunCoalescedCallbacks(intaShopifyCoalesceCallbacks.splice(0));
        return;
    }

    intaShopifyCoalescePending = null;
    let cbs = intaShopifyCoalesceCallbacks.splice(0);

    try {
        api.setTrackingConsent(merged, function () {
            intaShopifyLastSetTrackingConsentJson = json;
            intaShopifyRefreshCustomerPrivacyState(null);
            intaShopifyRunCoalescedCallbacks(cbs);
        });
    } catch (e) {
        intaShopifyRunCoalescedCallbacks(cbs);
    }
}

function intaShopifyEnqueueSetTrackingConsent(payload, onDone) {
    try {
        intaShopifyCoalescePending = intaShopifyShallowMergeConsentPatch(intaShopifyCoalescePending, payload);
        if (typeof onDone === "function") {
            intaShopifyCoalesceCallbacks.push(onDone);
        }
        if (intaShopifyCoalesceTimer != null) {
            clearTimeout(intaShopifyCoalesceTimer);
        }
        intaShopifyCoalesceTimer = setTimeout(intaShopifyFlushQueuedSetTrackingConsent, 0);
    } catch (e) {
        /* ignore */
    }
}

/**
 * Shopify Customer Privacy: all writes go through the coalescing queue (one setTrackingConsent per tick / deduped).
 */
function intaShopifySetTrackingConsentSafe(consents, onDone) {
    try {
        if (!consents || typeof consents !== "object") {
            if (typeof onDone === "function") {
                onDone();
            }
            return;
        }
        intaShopifyEnqueueSetTrackingConsent(Object.assign({}, consents), onDone);
    } catch (e) {
        /* non-Shopify or API not ready */
    }
}

let allScripts = window.allScripts = [
    {
        /* Analytics Scripts which are beeing blocked */
        /* "([\-\.]clarity+)", */
        type: "statics",
        scripts: [
            "(mixpanel)",
            "([\-\.]googleoptimize+)",
            "([\-\.]piwik+)",
            "([\-\.]matomo+)",
            "([\-\.]bing+)",
            "([\-\.]slideshare+)",
            "([\-\.]siteimproveanalytics+)",
            "([\-\.]hotjar+)",
            "([\-\.]snapchat)",
            "([\-\.]contentsquare)",
            "([\-\.]6sc)",
            "([\-\.]nr-data)",
            "([\-\.]2o7)",
            "([\-\.]hackerone)",
            "([\-\.]gstatic)",
            "([\-\.]webtrends)",
            "([\-\.]webtrendslive)",
            "([\-\.]amplitude)",
            "([\-\.]adobe)",
            "([\-\.]mxpnl)",
            "([\-\.]mixpanel)",
            "([\-\.]gstatics+)",
            "([\-\.]adobedtm)",
            "([\-\.]adobedc)",
            "([\-\.]qualtrics+)",
            "([\-\.]pardot+)",
            "([\-\.]poultons+)",
            "([\-\.]chartbeat+)",
            "([\-\.]consensu+)",
            "([\-\.]clarity+)",
            "([\-\.]clarity-cdn+)",
            "([\-\.]vwo+)",
            "([\-\.]ip-only+)",
            "([\-\.]ggpht+)",
            "([\-\.]clearbitjs+)",
            "([\-\.]clearbitscripts+)",
            "([\-\.]optimizely+)",
            "(?:cdn\\.segment|api\\.segment|[\\-\\.]segment\\.(?:com|io))",
            "([\-\.]quantserve+)[a-z]{2,5}(:[0-9]{1,5})?(\\\\.*)"
        ]
    },
    {
        /* Marketing Scripts which are beeing blocked */
        /* 
            "([\-\.]googlesyndication+)",
            "([\-\.]googletagservices+)",
            "([\-\.]googleadservices+)",
            "([\-\.]omnisnippet+)",
        */
        type: "marketing",
        scripts: [
            "(_linkedin_partner_id|_linkedin_data_partner_ids|mailchimp|lntrk|twitter|instagram|trustpilot|chic_lite_data|openai|oaiq|bzrcdn\\.openai)",
            "([\-\.]twitter+)",
            "([\-\.]ads-twitter+)",
            "([\-\.]casalemedia+)",
            "(chimpstatic+)",
            "([\-\.]trustpilot+)",
            "([\-\.]mailchimp+)",
            "([\-\.]linkedin+)",
            "([\-\.]bing+)",
            "([\-\.]licdn+)",
            "([\-\.]amazon-adsystem+)",
            "([\-\.]adfrom+)",
            "([\-\.]demdex+)",
            "([\-\.]criteo+)",
            "([\-\.]clearbitjs+)",
            "([\-\.]clearbitscripts+)",
            "([\-\.]instagram+)",
            "([\-\.]stickyadstv+)",
            "([\-\.]mookie1+)",
            "([\-\.]doubleclick+)",
            "([\-\.]bidswitch+)",
            "([\-\.]jnqsge+)",
            "([\-\.]syuh+)",
            "([\-\.]youtube+)",
            "([\-\.]vimeo+)",
            "([\-\.]ninthdecimal+)",
            "([\-\.]casalemedia+)",
            "([\-\.]adsymptotic+)",
            "([\-\.]tremorhub+)",
            "([\-\.]agkn+)",
            "([\-\.]myvisualiq+)",
            "([\-\.]exelator+)",
            "([\-\.]openx+)",
            "([\-\.]adsrvr+)",
            "([\-\.]justpremium+)",
            "([\-\.]ants+)",
            "([\-\.]bluekai+)",
            "([\-\.]revcontent+)",
            "([\-\.]outbrain+)",
            "([\-\.]adscale+)",
            "([\-\.]pdst+)",
            "([\-\.]yahoo+)",
            "([\-\.]advertising+)",
            "([\-\.]adnxs+)",
            "([\-\.]scdn+)",
            "([\-\.]spotify+)",
            "([\-\.]facebook+)",
            "([\-\.]pinterest+)",
            "([\-\.]adform+)",
            "([\-\.]adnxs+)",
            "([\-\.]advertising+)",
            "([\-\.]adtech+)",
            "([\-\.]soundestlink+)",
            "([\-\.]soundest+)",
            "([\-\.]soundestvid+)",
            "([\-\.]soundestform+)",
            "([\-\.]tiktok+)",
            "([\-\.]taboola+)",
            "([\-\.]hubspot+)",
            "([\-\.]openai+)",
            /* "([\-\.]hs-sites+)", */
            "([a-z]+){2,5}(:[0-9]{1,5})?(\\\\.*)"
        ]
    },
    {
        /* Functional Scripts which are beeing blocked */
        type: "functional",
        scripts: [
            "(maps.google.com+)",
            "(www.google.com/maps/+)",
            "([\-\.]googleapis+)",
            "([\-\.]gstatics+)",
            "([\-\.]cludo+)",
            "([\-\.]qbrick+)",
            "([\-\.]klarna+)",
            "([\-\.]paypal+)",
            "([\-\.]usersnap+)",
            "([\-\.]zoom+)",
            "([\-\.]cdnjs+)",
            "([\-\.]jsdelivr+)",
            "([\-\.]disqus+)([a-z]+){2,5}(:[0-9]{1,5})?(\\\\.*)"
        ]
    }
];

let notRequired;

/** Map stored consent flags → precomputed pattern key (see build-not-required-patterns.mjs). */
function intaNotRequiredPatternKey(consents) {
    var c = consents || {};
    var f = c.functionalCookies === "checked";
    var s = c.staticsticCookies === "checked";
    var a = c.advertisementCookies === "checked";
    if (f && s && a) return "all_granted";
    if (f && !s && !a) return "functional_only";
    if (a && !s && !f) return "marketing_only";
    if (s && !f && !a) return "stats_only";
    if (f && s) return "functional_stats";
    if (f && a) return "functional_marketing";
    if (a && s) return "marketing_stats";
    return "default";
}

/** Build / refresh the script-blocking RegExp from current consent + allScripts. */
function intaBuildNotRequiredRegexp() {
    var sources = window.__intaNotRequiredPatternSources;
    if (sources && typeof sources === "object") {
        var key = intaNotRequiredPatternKey(intaCookieConsents);
        var source = Object.prototype.hasOwnProperty.call(sources, key) ? sources[key] : sources.default;
        notRequired = window.notRequired = new RegExp(source, "i");
        return notRequired;
    }
    var merge = function (first, second, third) {
        for (var i = 0; i < second.length; i++) {
            first.push(second[i]);
        }
        if (third !== undefined) {
            for (var j = 0; j < third.length; j++) {
                first.push(third[j]);
            }
        }
        return first;
    };
    var patterns;
    if (intaCookieConsents?.functionalCookies === "checked" &&
        intaCookieConsents?.staticsticCookies !== "checked" &&
        intaCookieConsents?.advertisementCookies !== "checked") {
        patterns = merge(allScripts[1].scripts.slice(), allScripts[0].scripts);
    } else if (intaCookieConsents?.advertisementCookies === "checked" &&
        intaCookieConsents?.staticsticCookies !== "checked" &&
        intaCookieConsents?.functionalCookies !== "checked") {
        patterns = merge(allScripts[2].scripts.slice(), allScripts[0].scripts);
    } else if (intaCookieConsents?.staticsticCookies === "checked" &&
        intaCookieConsents?.functionalCookies !== "checked" &&
        intaCookieConsents?.advertisementCookies !== "checked") {
        patterns = merge(allScripts[1].scripts.slice(), allScripts[2].scripts);
    } else if (intaCookieConsents?.functionalCookies === "checked" &&
        intaCookieConsents?.staticsticCookies === "checked") {
        patterns = allScripts[1].scripts;
    } else if (intaCookieConsents?.functionalCookies === "checked" &&
        intaCookieConsents?.advertisementCookies === "checked") {
        patterns = allScripts[0].scripts;
    } else if (intaCookieConsents?.advertisementCookies === "checked" &&
        intaCookieConsents?.staticsticCookies === "checked") {
        patterns = allScripts[2].scripts;
    } else {
        patterns = merge(allScripts[0].scripts.slice(), allScripts[1].scripts, allScripts[2].scripts);
    }
    notRequired = window.notRequired = new RegExp(patterns.join("|"), "i");
    return notRequired;
}

window.intaBuildNotRequiredRegexp = intaBuildNotRequiredRegexp;

/* ── Cookie detail list (dynamic, from API) ───────────────────────────── */
let intaFoundCookieList;

const intaGetDomainFoundCookieList = async (domain) => {
    try {
        const response = await fetch(`https://www.intastellarconsents.com/api/cookie-banner?domain=${domain}`);
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching domain found cookie list:', error);
        return null;
    }
};

const intaCategoryDomOrder = ['necessary', 'functional', 'analytics', 'marketing'];

function intaFormatCookieExpiry(c) {
    if (c.session || !c.expires) return 'Session';
    return new Date(c.expires * 1000).toLocaleDateString();
}

function intaBuildCategoryOverviewHTML(category) {
    const data = intaFoundCookieList?.categories?.[category];
    if (!data) return '';
    const { cookies = [], vendors = [] } = data;
    const vendorsWithCookies = vendors.filter(v => (v.cookies || []).length > 0);
    const attributedNames = new Set(vendorsWithCookies.flatMap(v => v.cookies.map(c => c.name)));
    const vendorRows = vendorsWithCookies.map(v => {
        const vendorCookieRows = v.cookies.map(c => `
            <article class="intaCookieList-cookie">
                <h4 class="intaCookieList-CookieName">${c.name}</h4>
                ${c.description ? `<p class="intaCookieList-description">${c.description}</p>` : ''}
                <p>${c.domain} · ${intaFormatCookieExpiry(c)}</p>
            </article>`).join('');
        return `
        <section class="intaCookieListOverview-grid">
            <section class="intaCookieList-left">
                <h3 class="intaCookieListOverview-heading">Provider</h3>
                <p class="intaCookieListOverview-vendor">${v.service}</p>
                ${v.description ? `<p class="intaCookieListOverview-vendorDesc">${v.description}</p>` : ''}
                ${v.privacyUrl ? `<a class="intaCookieListOverview-privacy" href="${v.privacyUrl}" target="_blank" rel="noopener">Privacy Policy</a>` : ''}
                <h4 class="intaCookieList-CookieName">Host</h4>
                ${[].concat(v.hosts).map(h => `<p>${h}</p>`).join('')}
            </section>
            <section>${vendorCookieRows}</section>
        </section>`;
    }).join('');
    const unattributed = cookies.filter(c => !attributedNames.has(c.name));
    const unattributedBlock = unattributed.length ? `
        <section class="intaCookieListOverview-grid">
            <section class="intaCookieList-left">
                <h3 class="intaCookieListOverview-heading">Provider</h3>
                <p class="intaCookieListOverview-vendor">${window.INTA?.settings?.company || ''}</p>
            </section>
            <section>${unattributed.map(c => `
                <article class="intaCookieList-cookie">
                    <h4 class="intaCookieList-CookieName">${c.name}</h4>
                    ${c.description ? `<p class="intaCookieList-description">${c.description}</p>` : ''}
                    <p>${c.domain} · ${intaFormatCookieExpiry(c)}</p>
                </article>`).join('')}
            </section>
        </section>` : '';
    return vendorRows + unattributedBlock;
}

function intaInjectFoundCookieDetailList() {
    if (!intaFoundCookieList) return false;
    const overviews = document.querySelectorAll('.intReadMore .intaCookieListOverview');
    if (!overviews.length) return false;
    intaCategoryDomOrder.forEach((category, i) => {
        if (overviews[i]) overviews[i].innerHTML = intaBuildCategoryOverviewHTML(category);
    });
    return true;
}

(async () => {
    window.intaFoundCookieList = intaFoundCookieList = await intaGetDomainFoundCookieList(document.domain);
    if (!intaInjectFoundCookieDetailList()) {
        const observer = new MutationObserver(() => {
            if (intaInjectFoundCookieDetailList()) observer.disconnect();
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
    }
})();
/* ── End cookie detail list ───────────────────────────────────────────── */

let __intaCompiledScriptPatterns = null;
var __intaPatternRegExpCache = Object.create(null);

/** Compile one script-block pattern on demand (avoids ~200+ RegExp at boot). */
function intaPatternToRegExp(pattern) {
    if (!Object.prototype.hasOwnProperty.call(__intaPatternRegExpCache, pattern)) {
        try {
            __intaPatternRegExpCache[pattern] = new RegExp(pattern, "i");
        } catch (eCompile) {
            __intaPatternRegExpCache[pattern] = null;
        }
    }
    return __intaPatternRegExpCache[pattern];
}

function intaGetCompiledScriptPatterns() {
    if (__intaCompiledScriptPatterns) {
        return __intaCompiledScriptPatterns;
    }
    __intaCompiledScriptPatterns = [];
    for (let i = 0; i < window.allScripts.length; i++) {
        let scriptType = window.allScripts[i].type;
        let patterns = window.allScripts[i].scripts;
        let regexes = [];
        for (let j = 0; j < patterns.length; j++) {
            let re = intaPatternToRegExp(patterns[j]);
            if (re) {
                regexes.push(re);
            }
        }
        __intaCompiledScriptPatterns.push({ type: scriptType, regexes: regexes });
    }
    return __intaCompiledScriptPatterns;
}

/* ── Synchronous script-injection guard ───────────────────────────────────
   Patches the DOM insertion points third-party trackers actually use
   (appendChild/insertBefore/src setter) so a script can be neutralized
   *before* the browser fetches/executes it, instead of reacting to a
   MutationObserver after the fact. Only catches scripts injected via JS
   (GTM, GA, pixels, etc.) — scripts hardcoded directly in the page's HTML
   are inserted by the parser, which bypasses these prototypes entirely;
   those still need the type="text/plain" convention. */
var INTA_SCRIPT_GUARD_ALLOWED_HOSTS = [
    "intastellarsolutions.com",
    "intastellarconsents.com",
    "intastellar.app",
    "intastellar.eu",
    "intastellar.dk",
    "intastellar.com"
];

function intaIsOwnScriptUrl(url) {
    if (!url) return false;
    try {
        var host = new URL(url, location.href).hostname;
        if (host === location.hostname) return true;
        for (let i = 0; i < INTA_SCRIPT_GUARD_ALLOWED_HOSTS.length; i++) {
            let d = INTA_SCRIPT_GUARD_ALLOWED_HOSTS[i];
            if (host === d || host.endsWith("." + d)) return true;
        }
        return false;
    } catch (eUrl) {
        return false;
    }
}

/** Classify a script src/inline body against the existing per-category patterns. */
function intaClassifyScriptContent(text) {
    if (!text) return null;
    let compiled = intaGetCompiledScriptPatterns();
    for (let i = 0; i < compiled.length; i++) {
        let regexes = compiled[i].regexes;
        for (let j = 0; j < regexes.length; j++) {
            if (regexes[j].test(text)) return compiled[i].type;
        }
    }
    return null;
}

function intaScriptCategoryConsented(type) {
    let c = window.intaCookieConsents;
    if (type === "statics") return c?.staticsticCookies === "checked";
    if (type === "marketing") return c?.advertisementCookies === "checked";
    if (type === "functional") return c?.functionalCookies === "checked";
    return true; // unclassified: treat as necessary, don't block
}

/** Mark a not-yet-inserted script node so the browser never fetches/executes it. */
function intaNeutralizeScriptNode(node, pendingSrc) {
    if (node.getAttribute("data-inta-blocked") === "1") return;
    node.setAttribute("data-inta-blocked", "1");
    if (pendingSrc) node.setAttribute("data-inta-pending-src", pendingSrc);
    node.type = "text/blocked";
}

/** Runs before a SCRIPT node is inserted; returns true if it neutralized the node. */
function intaGuardScriptNode(node) {
    if (!node || node.tagName !== "SCRIPT" || (typeof isGtmMode !== "undefined" && isGtmMode)) return false;
    if (node.getAttribute("data-inta-blocked") === "1") return false;
    let src = node.src || node.getAttribute("src") || "";
    if (src && intaIsOwnScriptUrl(src)) return false;
    let category = src ? intaClassifyScriptContent(src) : intaClassifyScriptContent(node.textContent || "");
    if (!category || intaScriptCategoryConsented(category)) return false;
    intaNeutralizeScriptNode(node);
    return true;
}

(function intaInstallSyncScriptGuard() {
    if (window.__intaScriptGuardInstalled) return;
    window.__intaScriptGuardInstalled = true;

    let nodeProto = Node.prototype;
    let origAppendChild = nodeProto.appendChild;
    let origInsertBefore = nodeProto.insertBefore;

    nodeProto.appendChild = function (child) {
        if (child && child.tagName === "SCRIPT") intaGuardScriptNode(child);
        return origAppendChild.call(this, child);
    };

    nodeProto.insertBefore = function (child, ref) {
        if (child && child.tagName === "SCRIPT") intaGuardScriptNode(child);
        return origInsertBefore.call(this, child, ref);
    };

    // Defense in depth: catches `s.src = url` set *after* the node is already connected.
    let scriptSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, "src");
    if (scriptSrcDescriptor && scriptSrcDescriptor.set) {
        Object.defineProperty(HTMLScriptElement.prototype, "src", {
            configurable: true,
            enumerable: scriptSrcDescriptor.enumerable,
            get: scriptSrcDescriptor.get,
            set: function (value) {
                if (!this.isConnected || (typeof isGtmMode !== "undefined" && isGtmMode) || intaIsOwnScriptUrl(value)) {
                    return scriptSrcDescriptor.set.call(this, value);
                }
                let category = intaClassifyScriptContent(value);
                if (!category || intaScriptCategoryConsented(category)) {
                    return scriptSrcDescriptor.set.call(this, value);
                }
                intaNeutralizeScriptNode(this, value);
            }
        });
    }
})();
/* ── End synchronous script-injection guard ───────────────────────────── */

let __intaCookieEventFlushTimer = null;
let __intaCookieEventPendingByKey = new Map();
let INTA_COOKIE_EVENT_DEBOUNCE_MS = 5000;
let INTA_COOKIE_EVENT_MIN_FLUSH_GAP_MS = 250;
let INTA_COOKIE_EVENT_MAX_BATCH = 50;
let INTA_COOKIE_EVENTS_URL = 'https://consents.intastellarsolutions.com/api/v1/cookie-events';

// Listen for consent state response
window.addEventListener('message', (event) => {
    if (event.origin !== 'https://consents.cdn.intastellarsolutions.com') return;
    if (event.data.type === 'consentState') {
        // Integrate with your banner logic
        window.intaCookieConsents = event.data.consents;
        intaShopifySetTrackingConsentFromConsentsObject(event.data.consents);
        // Optionally, update checkboxes or UI elements
        if (typeof updateConsentUI === 'function') {
            updateConsentUI(event.data.consents);
        }
        if (typeof window.intaApplyCmpVisibilityFromCookie === 'function') {
            window.intaApplyCmpVisibilityFromCookie();
        }
        console.log('Received consent state:', event.data.consents);
    }
});

window.INTA = window.INTA || {};
window.INTA.observedCookieSource = 'unknown';
// --- VWO Cookie Consent Integration (latest, per docs) ---
function updateVwoConsent(consents) {
    // VWO expects: 1 = accepted, 2 = pending, 3 = rejected
    // VWO runs when marketing OR statistical (analytics) cookies are accepted — not only marketing.
    var state = 2;
    if (!consents) {
        window.VWO = window.VWO || [];
        window.VWO.init = window.VWO.init || function (s) { window.VWO.consentState = s; };
        window.VWO.init(state);
        return;
    }
    function granted(v) {
        return v === true || v === "checked";
    }
    function denied(v) {
        return v === false || v === "unchecked";
    }
    var marketingOn = granted(consents.advertisementCookies) || consents.marketing === true;
    var statsOn = granted(consents.staticsticCookies) || consents.analytics === true;
    var marketingOff = denied(consents.advertisementCookies) || consents.marketing === false;
    var statsOff = denied(consents.staticsticCookies) || consents.analytics === false;

    if (marketingOn || statsOn) {
        state = 1;
    } else if (marketingOff && statsOff) {
        state = 3;
    } else {
        state = 2;
    }
    window.VWO = window.VWO || [];
    window.VWO.init = window.VWO.init || function (s) { window.VWO.consentState = s; };
    window.VWO.init(state);
    if (typeof window.VWO.onVariationApplied === 'function') {
        window.location.reload();
    }
}
// --- End VWO Cookie Consent Integration ---

/**
 * True when we should run WP Consent API integration (`wp_set_consent`, dataLayer mirror, cookie sync).
 * Requires `wp_set_consent` from WordPress. Set `INTA.settings.wpConsentApi = false` (before or early after
 * the script) when Google Advanced Consent Mode must be authoritative via `gtag`/GTM only — bridges such as
 * Site Kit that map WP cookies → Consent Mode can otherwise fight Intastellar’s updates.
 * @see https://wpconsentapi.org
 */
function intaWpConsentApiActive() {
    if (typeof wp_set_consent !== "function") {
        return false;
    }
    try {
        const s = window.INTA && window.INTA.settings;
        if (s && s.wpConsentApi === false) {
            return false;
        }
    } catch (e) { /* ignore */ }
    return true;
}

/** Google Consent Mode / gtag values → treat as granted (case-insensitive; tolerate common aliases). */
function intaWpConsentStorageIsGranted(value) {
    if (value === true) {
        return true;
    }
    if (value == null || value === false) {
        return false;
    }
    const s = String(value).toLowerCase();
    return s === "granted" || s === "grant" || s === "allow";
}

/**
 * CMP: `window.wp_consent_type = 'optin'` and `wp_consent_type_defined` on document (once per page when API is active).
 * @see https://wpconsentapi.org
 */
function intaWpEnsureConsentTypeOptinAnnouncedOnce() {
    if (!intaWpConsentApiActive() || window._intaWpConsentTypeDefinedSent) {
        return;
    }
    window._intaWpConsentTypeDefinedSent = true;
    try {
        window.wp_consent_type = "optin";
    } catch (e) { /* ignore */ }
    try {
        if (typeof document !== "undefined" && document.dispatchEvent) {
            document.dispatchEvent(new CustomEvent("wp_consent_type_defined"));
        }
    } catch (e) { /* ignore */ }
}

/**
 * When gtag pushes `consent` / `update`, mirror storage keys into `wp_set_consent`.
 * Does not dispatch a separate batched `wp_listen_for_consent_change` — each `wp_set_consent`
 * already fires the WP Consent API listener; an extra batched event can make Site Kit run a second gtag pass.
 * No-op unless `wp_set_consent` exists.
 * @see https://wpconsentapi.org
 */
function intaWpSetConsentFromGtagUpdateParams(params) {
    if (!intaWpConsentApiActive()) {
        return;
    }
    intaWpEnsureConsentTypeOptinAnnouncedOnce();
    const p = params && typeof params === "object" ? params : {};
    const lvl = (key) => (intaWpConsentStorageIsGranted(p[key]) ? "allow" : "deny");
    if ("functionality_storage" in p) {
        const fn = lvl("functionality_storage");
        wp_set_consent("functional", fn);
        wp_set_consent("preferences", fn);
    }
    if ("analytics_storage" in p) {
        const st = lvl("analytics_storage");
        wp_set_consent("statistics", st);
        wp_set_consent("statistics-anonymous", st);
    }
    if ("ad_storage" in p || "ad_user_data" in p || "ad_personalization" in p || "personalization_storage" in p) {
        const mk = (intaWpConsentStorageIsGranted(p.ad_storage) || intaWpConsentStorageIsGranted(p.ad_user_data) || intaWpConsentStorageIsGranted(p.ad_personalization) || intaWpConsentStorageIsGranted(p.personalization_storage))
            ? "allow"
            : "deny";
        wp_set_consent("marketing", mk);
    }
}

/**
 * Mirror consent from a single dataLayer item (Arguments object, array, or spread push).
 * Only handles `consent` / `update` (not `default`), so regional GTM defaults do not overwrite WP cookies incorrectly.
 */
function intaWpTryConsentUpdateFromDataLayerItem(item) {
    if (item == null) {
        return;
    }
    if (typeof item === "object" && !Array.isArray(item)) {
        const t0 = item[0];
        const t1 = item[1];
        const t2 = item[2];
        if (t0 === "consent" && t1 === "update" && t2 != null && typeof t2 === "object" && !Array.isArray(t2)) {
            intaWpSetConsentFromGtagUpdateParams(t2);
        }
    }
}

function intaWpTryConsentUpdateFromDataLayerPushArgs(pushArgs) {
    if (!intaWpConsentApiActive() || !pushArgs || pushArgs.length === 0) {
        return;
    }
    for (let i = 0; i < pushArgs.length; i++) {
        intaWpTryConsentUpdateFromDataLayerItem(pushArgs[i]);
    }
    if (pushArgs.length >= 3
        && pushArgs[0] === "consent"
        && pushArgs[1] === "update"
        && pushArgs[2] != null
        && typeof pushArgs[2] === "object"
        && !Array.isArray(pushArgs[2])) {
        intaWpSetConsentFromGtagUpdateParams(pushArgs[2]);
    }
}

/**
 * Keep our wrapper as the outermost `dataLayer.push`: GTM often replaces `push` after this script runs.
 * Mirroring runs inside the wrapper; `intaWpTryConsentUpdateFromDataLayerPushArgs` no-ops until `wp_set_consent` exists.
 */
function intaWpEnsureDataLayerPushMirrorBound() {
    const dl = window.dataLayer;
    if (!dl || typeof dl.push !== "function") {
        return;
    }
    const wrapped = dl._intaWpMirrorWrappedPush;
    if (wrapped && dl.push === wrapped) {
        return;
    }
    const upstream = dl.push;
    function intaWpMirrorWrappedPush() {
        window._intaWpDlPushDepth = (window._intaWpDlPushDepth || 0) + 1;
        const depthAtEntry = window._intaWpDlPushDepth;
        try {
            const ret = intaWpMirrorWrappedPush._upstream.apply(dl, arguments);
            // Site Kit (and others) listen to `wp_listen_for_consent_change` and call `gtag` → `dataLayer.push`
            // again. Only mirror the outermost push so we do not recurse until stack overflow.
            if (depthAtEntry === 1) {
                try {
                    intaWpTryConsentUpdateFromDataLayerPushArgs(Array.prototype.slice.call(arguments));
                } catch (e2) { /* ignore */ }
            }
            return ret;
        } finally {
            window._intaWpDlPushDepth--;
        }
    }
    intaWpMirrorWrappedPush._upstream = upstream;
    dl._intaWpMirrorWrappedPush = intaWpMirrorWrappedPush;
    dl.push = intaWpMirrorWrappedPush;
}

function intaWpInstallDataLayerConsentMirror() {
    const dl = window.dataLayer;
    if (!dl || typeof dl.push !== "function") {
        return;
    }
    if (!dl._intaWpMirrorSchedule) {
        dl._intaWpMirrorSchedule = true;
        const rebind = function () {
            intaWpEnsureDataLayerPushMirrorBound();
        };
        if (typeof window !== "undefined" && window.addEventListener) {
            window.addEventListener("load", rebind);
        }
        let n = 0;
        const id = setInterval(function () {
            rebind();
            if (++n >= 50) {
                clearInterval(id);
            }
        }, 100);
    }
    intaWpEnsureDataLayerPushMirrorBound();
}

/**
 * Apply WP Consent API cookies from Intastellar checkbox choices (works even when GTM owns `dataLayer.push` / `gtag`).
 * functional → `functional` + `preferences`; statistics → `statistics` + `statistics-anonymous`; marketing → `marketing`.
 */
function intaWpApplyConsentFromIntastellarChoices(functionalChecked, statisticsChecked, marketingChecked) {
    if (!intaWpConsentApiActive()) {
        return;
    }
    intaWpEnsureConsentTypeOptinAnnouncedOnce();
    const prefs = functionalChecked ? "allow" : "deny";
    const stats = statisticsChecked ? "allow" : "deny";
    const mkt = marketingChecked ? "allow" : "deny";
    wp_set_consent("functional", prefs);
    wp_set_consent("preferences", prefs);
    wp_set_consent("statistics", stats);
    wp_set_consent("statistics-anonymous", stats);
    wp_set_consent("marketing", mkt);
    /* Rely on native `wp_listen_for_consent_change` from each `wp_set_consent` only — a batched
     * duplicate dispatch here previously caused Site Kit to fire gtag consent twice (deny overwrite). */
}

/**
 * Read Intastellar consent flags from `window.intaCookieConsents` (set from cookie on load).
 * @returns {{ functional: boolean, statistics: boolean, marketing: boolean } | null} null if no consent object.
 */
function intaWpReadIntastellarConsentBooleansFromWindow() {
    const c = window.intaCookieConsents;
    if (!c || typeof c !== "object") {
        return null;
    }
    return {
        functional: c.functionalCookies === "checked" || c.functionalCookies === true,
        statistics: c.staticsticCookies === "checked" || c.staticsticCookies === true,
        marketing: c.advertisementCookies === "checked" || c.advertisementCookies === true,
    };
}

/**
 * Re-apply WP Consent API cookies from the stored Intastellar cookie (e.g. after reload).
 * On first paint, `gtag('consent','update')` often runs before `wp_set_consent` exists — this runs once WP is ready.
 */
function intaWpTrySyncWpFromStoredIntastellarConsentOnce() {
    if (!intaWpConsentApiActive() || window._intaWpStoredConsentSyncedToWp) {
        return !!window._intaWpStoredConsentSyncedToWp;
    }
    const b = intaWpReadIntastellarConsentBooleansFromWindow();
    if (!b) {
        return false;
    }
    intaWpApplyConsentFromIntastellarChoices(b.functional, b.statistics, b.marketing);
    window._intaWpStoredConsentSyncedToWp = true;
    return true;
}

function intaWpScheduleSyncWpFromStoredIntastellarConsent() {
    if (window._intaWpCookieSyncScheduled) {
        return;
    }
    if (!intaWpReadIntastellarConsentBooleansFromWindow()) {
        return;
    }
    window._intaWpCookieSyncScheduled = true;
    const tick = function () {
        return intaWpTrySyncWpFromStoredIntastellarConsentOnce();
    };
    if (tick()) {
        return;
    }
    if (typeof window !== "undefined" && window.addEventListener) {
        window.addEventListener("DOMContentLoaded", tick);
        window.addEventListener("load", tick);
    }
    let n = 0;
    const id = setInterval(function () {
        if (tick() || ++n >= 80) {
            clearInterval(id);
        }
    }, 100);
}

/**
 * Shopify Customer Privacy: map Intastellar consent values to booleans.
 * Send analytics + marketing + preferences together; omit `sale_of_data` unless CCPA opt-out is stored.
 */
function intaShopifyConsentFlag(v) {
    return v === "checked" || v === true;
}

/**
 * Build Shopify payload from current Intastellar cookie only (not stale window.intaCookieConsents).
 * If IntastellarConsentSolution is missing / invalid → deny all so Shopify does not keep old "yes".
 */
function intaShopifyBuildSetTrackingConsentPayload() {
    let denyAll = { analytics: false, marketing: false, preferences: false };
    try {
        let name = (typeof window !== "undefined" && window.int_hideCookieBannerName) || "IntastellarConsentSolution";
        let raw = typeof getCookie === "function" && name ? getCookie(name) : "";
        if (!raw || String(raw).indexOf("__inta") === -1) {
            return intaShopifyMergePayloadWithCcpaSaleOptOut(denyAll);
        }
        if (typeof decodeIntaConsentsObject !== "function") {
            return intaShopifyMergePayloadWithCcpaSaleOptOut(denyAll);
        }
        let parsed = JSON.parse(decodeIntaConsentsObject(String(raw).split(".")[2]));
        let c = parsed && parsed.consents;
        if (!c || typeof c !== "object") {
            return intaShopifyMergePayloadWithCcpaSaleOptOut(denyAll);
        }
        return intaShopifyMergePayloadWithCcpaSaleOptOut({
            analytics: intaShopifyConsentFlag(c.staticsticCookies),
            marketing: intaShopifyConsentFlag(c.advertisementCookies),
            preferences: intaShopifyConsentFlag(c.functionalCookies),
        });
    } catch (e) {
        return intaShopifyMergePayloadWithCcpaSaleOptOut(denyAll);
    }
}

function intaShopifyPayloadFromConsentsObject(c) {
    let denyAll = { analytics: false, marketing: false, preferences: false };
    if (!c || typeof c !== "object") {
        return intaShopifyMergePayloadWithCcpaSaleOptOut(denyAll);
    }
    return intaShopifyMergePayloadWithCcpaSaleOptOut({
        analytics: intaShopifyConsentFlag(c.staticsticCookies),
        marketing: intaShopifyConsentFlag(c.advertisementCookies),
        preferences: intaShopifyConsentFlag(c.functionalCookies),
    });
}

function intaShopifyApplyTrackingConsentPayload(payload, done) {
    if (!payload || typeof payload !== "object") {
        if (typeof done === "function") {
            done();
        }
        return;
    }
    intaShopifyEnqueueSetTrackingConsent(Object.assign({}, payload), done);
}

function intaShopifySetTrackingConsentFromIntastellar(done) {
    intaShopifyApplyTrackingConsentPayload(intaShopifyBuildSetTrackingConsentPayload(), done);
}

/** When consents come from postMessage before cookie is written, pass the object explicitly. */
function intaShopifySetTrackingConsentFromConsentsObject(consents, done) {
    intaShopifyApplyTrackingConsentPayload(intaShopifyPayloadFromConsentsObject(consents), done);
}

window.intaShopifySetTrackingConsentFromIntastellar = intaShopifySetTrackingConsentFromIntastellar;
window.intaShopifySetTrackingConsentFromConsentsObject = intaShopifySetTrackingConsentFromConsentsObject;

/**
 * Shopify Customer Privacy: *Allowed() methods combine merchant settings, visitor region, and consent.
 * @see https://shopify.dev/docs/api/customer-privacy
 */
function intaShopifyGetProcessingAllowedSnapshot() {
    let api = window.Shopify && window.Shopify.customerPrivacy;
    let snap = {
        preferencesProcessingAllowed: null,
        analyticsProcessingAllowed: null,
        marketingAllowed: null,
        saleOfDataAllowed: null,
        region: null,
        currentVisitorConsent: null,
    };
    if (!api) {
        return snap;
    }
    try {
        if (typeof api.preferencesProcessingAllowed === "function") {
            snap.preferencesProcessingAllowed = !!api.preferencesProcessingAllowed();
        }
        if (typeof api.analyticsProcessingAllowed === "function") {
            snap.analyticsProcessingAllowed = !!api.analyticsProcessingAllowed();
        }
        if (typeof api.marketingAllowed === "function") {
            snap.marketingAllowed = !!api.marketingAllowed();
        }
        if (typeof api.saleOfDataAllowed === "function") {
            snap.saleOfDataAllowed = !!api.saleOfDataAllowed();
        }
        if (typeof api.getRegion === "function") {
            snap.region = api.getRegion();
        }
        if (typeof api.currentVisitorConsent === "function") {
            snap.currentVisitorConsent = api.currentVisitorConsent();
        }
    } catch (e) {
        /* ignore */
    }
    return snap;
}

let intaShopifyVisitorConsentListenerInstalled = false;

function intaShopifyRefreshCustomerPrivacyState(visitorDetail) {
    let allowed = intaShopifyGetProcessingAllowedSnapshot();
    window.__intaShopifyCustomerPrivacy = {
        allowed: allowed,
        lastVisitorConsentEventDetail: visitorDetail != null ? visitorDetail : null,
        updatedAt: new Date().toISOString(),
    };
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
        try {
            window.dataLayer.push({
                event: "inta_shopify_customer_privacy_updated",
                intaShopifyAllowed: {
                    preferencesProcessingAllowed: allowed.preferencesProcessingAllowed,
                    analyticsProcessingAllowed: allowed.analyticsProcessingAllowed,
                    marketingAllowed: allowed.marketingAllowed,
                    saleOfDataAllowed: allowed.saleOfDataAllowed,
                },
                intaShopifyVisitorDetail: visitorDetail != null ? visitorDetail : undefined,
            });
        } catch (e) {
            /* ignore */
        }
    }
}

function intaShopifyOnVisitorConsentCollected(ev) {
    intaShopifyRefreshCustomerPrivacyState(ev && ev.detail);
}

function intaShopifyInstallCustomerPrivacyListeners() {
    if (intaShopifyVisitorConsentListenerInstalled) {
        return;
    }
    intaShopifyVisitorConsentListenerInstalled = true;
    document.addEventListener("visitorConsentCollected", intaShopifyOnVisitorConsentCollected, false);
}

window.intaShopifyGetProcessingAllowedSnapshot = intaShopifyGetProcessingAllowedSnapshot;
window.intaShopifyRefreshCustomerPrivacyState = intaShopifyRefreshCustomerPrivacyState;

// --- Helper function to detect Vendors of Cookies (lazy-loaded; stub until uc-vendors loads) ---
function detectCookieVendor(cookie) {
    if (typeof window.__intaDetectCookieVendor === 'function') {
        return window.__intaDetectCookieVendor(cookie);
    }
    return 'unknown vendor';
}

// --- Helper: Map cookie name to consent type (populated when uc-vendors loads) ---
var COOKIE_CONSENT_TYPE_MAP = null;

/** Append dynamically created scripts/styles; head may be missing briefly (SSR / Remix). */
function intaAppendToDocumentHead(node) {
    if (!node) {
        return;
    }
    const head = document.head
        || document.querySelector("head")
        || document.getElementsByTagName("head")[0];
    try {
        if (head) {
            head.appendChild(node);
            return;
        }
    } catch (e) {
        /* ignore */
    }
    try {
        const fallback = document.body || document.documentElement;
        if (fallback) {
            fallback.appendChild(node);
        }
    } catch (e2) {
        /* ignore */
    }
}

// Load uc-vendors.js on DOMContentLoaded to reduce initial parse/execute (detectCookieVendor + map ~15KB)
function loadUcVendors() {
    if (window.__intaDetectCookieVendor) return;
    var base = (typeof window.INTA !== 'undefined' && window.INTA.settings && window.INTA.settings.vendorsUrl) || 'https://consents.cdn.intastellarsolutions.com/uc-vendors.js';
    var s = document.createElement('script');
    s.src = base;
    s.async = true;
    intaAppendToDocumentHead(s);
    s.onload = function () {
        COOKIE_CONSENT_TYPE_MAP = window.__intaCookieConsentTypeMap || null;
    };
}

function getConsentTypeForCookie(cookieName) {
    // Delegate to uc-vendors when loaded
    if (typeof window.__intaGetConsentTypeForCookie === 'function') {
        return window.__intaGetConsentTypeForCookie(cookieName);
    }
    // Fallback until uc-vendors loads
    if (COOKIE_CONSENT_TYPE_MAP && COOKIE_CONSENT_TYPE_MAP[cookieName]) return COOKIE_CONSENT_TYPE_MAP[cookieName];
    if (COOKIE_CONSENT_TYPE_MAP) {
        for (let key in COOKIE_CONSENT_TYPE_MAP) {
            if (cookieName.startsWith(key)) return COOKIE_CONSENT_TYPE_MAP[key];
        }
    }
    return 'marketing';
}

// --- Blocked iframe / embed consent copy (lazy-loaded uc-blocked-iframe.js) ---
var __intaBlockedIframeLoadStarted = false;

function loadUcBlockedIframeMessages() {
    if (window.__intaBlockedIframeContentMessage) {
        return;
    }
    if (__intaBlockedIframeLoadStarted) {
        return;
    }
    __intaBlockedIframeLoadStarted = true;
    var base = (typeof window.INTA !== "undefined" && window.INTA.settings && window.INTA.settings.blockedIframeUrl)
        || "https://consents.cdn.intastellarsolutions.com/uc-blocked-iframe.js";
    if (typeof intastellarDevMode !== "undefined" && intastellarDevMode) {
        base = "../../dev/uc-blocked-iframe.dev.js";
    }
    var s = document.createElement("script");
    s.src = base;
    s.async = true;
    intaAppendToDocumentHead(s);
}

function intaEnsureBlockedIframeMessagesLoaded() {
    loadUcBlockedIframeMessages();
}

function intaResolveBlockedIframeLocaleKey() {
    if (typeof window.__intaResolveBlockedIframeLocaleKey === "function") {
        return window.__intaResolveBlockedIframeLocaleKey();
    }
    return "english";
}

function intaBlockedIframeContentMessage(domain, localeKey) {
    if (typeof window.__intaBlockedIframeContentMessage === "function") {
        return window.__intaBlockedIframeContentMessage(domain, localeKey);
    }
    return "<p>This content is provided by " + domain + ".</p>";
}

function intaBlockedIframeButtonText(scriptType, localeKey) {
    if (typeof window.__intaBlockedIframeButtonText === "function") {
        return window.__intaBlockedIframeButtonText(scriptType, localeKey);
    }
    return "Accept cookies";
}

function intaNormalizeBlockedIframeDomain(domain, node, cookieList) {
    if (node && node.classList && node.classList.contains("trustpilot-widget")) {
        domain = "www.trustpilot.com";
    }
    var list = cookieList || (typeof inta_marketingCookieList !== "undefined" ? inta_marketingCookieList : []);
    list.forEach(function (cookie) {
        var i = 0, d = domain, p = d.split(".");
        d = p.slice(-1 - ++i).join(".");
        domain = d;
        if (cookie && cookie.domains && cookie.domains.indexOf(domain) > -1) {
            domain = cookie.vendor;
        }
    });
    return domain;
}

function intaPickBlockedIframeStrings(domain, node, scriptType, cookieList) {
    intaEnsureBlockedIframeMessagesLoaded();
    var localeKey = intaResolveBlockedIframeLocaleKey();
    var normalized = intaNormalizeBlockedIframeDomain(domain, node, cookieList);
    return {
        textLanguage: intaBlockedIframeContentMessage(normalized, localeKey),
        btnText: intaBlockedIframeButtonText(scriptType, localeKey)
    };
}

// --- Start Cookie Interception ---
(function () {
    let desc = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
    Object.defineProperty(document, 'cookie', {
        configurable: true,
        enumerable: true,
        get: function () {
            return desc.get.call(this);
        },
        set: function (cookieString) {
            window.INTA.observedCookieSource = 'cookie';
            try {
                let cookieName = cookieString.split('=')[0].trim();
                let rawValue = cookieString.split('=')[1]?.split(';')[0];
                let cookieDomain = cookieString.split(';').find(part => part.trim().toLowerCase().startsWith('domain='))?.split('=')[1]?.trim() || window.location.hostname;
                // Use cookie name to determine consent type
                let consentType = getConsentTypeForCookie(cookieName);
                recordCookie({
                    name: cookieName,
                    source: window.INTA.observedCookieSource || 'unknown',
                    observedAt: Date.now(),
                    path: window.location.pathname,
                    domain: window.location.hostname,
                    cookieDomain,
                    rootDomain: window.INTA?.settings?.rootDomain || window.location.hostname,
                    hadValuePreConsent: typeof rawValue === 'string' && rawValue.length > 0,
                    consentGiven: hasConsent(consentType),
                    vendor: detectCookieVendor({ name: cookieName, value: rawValue })
                })
            } catch (e) { /* ignore */ }
            return desc.set.call(this, cookieString);
        }
    });
})();

// --- CookieStorage Observer ---
if ("cookieStore" in window) {
    cookieStore.addEventListener("change", (event) => {
        event.changed.forEach(cookie => {
            window.INTA.observedCookieSource = 'cookieStore';
            let consentType = getConsentTypeForCookie(cookie.name);
            recordCookie({
                name: cookie.name,
                source: 'cookieStore',
                observedAt: Date.now(),
                path: cookie.path || window.location.pathname,
                domain: cookie.domain || window.location.hostname,
                cookieDomain: cookie.domain || window.location.hostname,
                rootDomain: window.INTA?.settings?.rootDomain || window.location.hostname,
                hadValuePreConsent: 0,
                consentGiven: hasConsent(consentType),
                vendor: detectCookieVendor({ name: cookie.name, value: cookie.value })
            })
        })
    });
}

// --- Start localStorage Interception ---
(function () {
    let originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
        window.INTA.observedCookieSource = 'localStorage';
        let consentType = getConsentTypeForCookie(key);
        recordCookie({
            name: key,
            source: 'localStorage',
            observedAt: Date.now(),
            path: window.location.pathname,
            domain: window.location.hostname,
            rootDomain: window.INTA?.settings?.rootDomain || window.location.hostname,
            hadValuePreConsent: typeof value === 'string' && value.length > 0,
            consentGiven: hasConsent(consentType),
            vendor: detectCookieVendor({ name: key, value: value })
        });
        return originalSetItem.apply(this, arguments);
    };
})();

// --- Start memory Interception (example) ---
window.INTA.memorySet = function (key, value) {
    window.INTA.observedCookieSource = 'memory';
    let consentType = getConsentTypeForCookie(key);
    recordCookie({
        name: key,
        value: value,
        source: 'memory',
        observedAt: Date.now(),
        path: window.location.pathname,
        domain: window.location.hostname,
        rootDomain: window.INTA?.settings?.rootDomain || window.location.hostname,
        hadValuePreConsent: typeof value === 'string' && value.length > 0,
        consentGiven: hasConsent(consentType),
        vendor: detectCookieVendor({ name: key, value: value })
    });
    window.INTA._memory = window.INTA._memory || {};
    window.INTA._memory[key] = value;
};

function IntastellarSnapShot(stage) {

}

// Example usage:
// let rootDomain = "group1.com";
// let partnerDomains = ["domain-a.com", "domain-b.com"];
// requestConsentState('user-123', rootDomain, partnerDomains);
// setConsentState('user-123', { marketing: true, statistics: false, functional: true }, rootDomain, partnerDomains);
// --- End Cross-site Consent Tracking ---

/* - - - Setup - - - */

let intaCookiePref = "IntastellarConsentSolution";
let int_hideCookieBannerName = window.int_hideCookieBannerName = intaCookiePref;
let int_FunctionalCookies = intaCookiePref + ":Functional-cookies";
let int_marketingCookies = intaCookiePref + ":Advertisment-cookies";
let int_staticsticCookies = intaCookiePref + ":Statistics-cookies";
let int_visitorCheck = intaCookiePref + "visitorCheck";
let button__acceptAll = document.querySelector(".intastellarCookieBanner__acceptAll");
let button__acceptAllNecessary = document.querySelector(".intastellarCookieBanner__acceptNecessary");
let intastellarShowHideDetailsText = "Show details";
let adsbygoogle = window.adsbygoogle || [];
let intastellarCookieBannerRootDomain = "https://consents.cdn.intastellarsolutions.com";
let intastellarAssetsCDNdomain = "https://www.intastellar-consents.com";
let intaCookieConsents = window.intaCookieConsents = (getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents : null;
window.uetq = window.uetq || [];
let intaCookieConsentsUserId = (getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.uid : null;

/** Intastellar script URL when `document.currentScript` is null (Remix, Vite, Webpack, ES modules). */
function intaGuessIntastellarScriptSrc() {
    try {
        if (document.currentScript && document.currentScript.src) {
            return document.currentScript.src;
        }
    } catch (e) {
        /* ignore */
    }
    const scripts = document.getElementsByTagName("script");
    for (let i = scripts.length - 1; i >= 0; i--) {
        const s = scripts[i];
        const src = s && s.src;
        if (!src) {
            continue;
        }
        if (/uc\.js|\/uc\.js|consents\.cdn|intastellar-consents|gdpr\.dev|\/cb\.js|\/cb\.dev|floating\.js/i.test(src)) {
            return src;
        }
    }
    return "";
}

function findScriptParameter(value) {
    const currentURL = intaGuessIntastellarScriptSrc();
    if (!currentURL || currentURL.indexOf(value) === -1) {
        return undefined;
    }
    try {
        const url = new URL(currentURL, window.location.href);
        return url.searchParams.get(value);
    } catch (e) {
        return undefined;
    }
}

let isGtmMode = findScriptParameter("ref") === "gtm";

/** Google Consent Mode default — must fire before GTM/gtag.js can load and fire any tag,
 *  so this runs synchronously here rather than waiting for uc-core. */
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
function intaSetGtagConsentDefaults() {
    if (isGtmMode || window._gtagDefaultFired || typeof gtag !== 'function') {
        return;
    }
    if (window.google_tag_manager && window.google_tag_manager['consent_default_set']) {
        return;
    }
    gtag('consent', 'default', {
        "ad_storage": 'denied',
        "personalization_storage": 'denied',
        "analytics_storage": 'denied',
        "functionality_storage": 'denied',
        "ads_data_redaction": 'granted',
        "ad_user_data": 'denied',
        "ad_personalization": 'denied',
        "security_storage": 'granted',
        "url_passthrough": true,
        "wait_for_update": 500,
        "region": ['EU', 'UK', 'CH', 'NO', 'IS', 'LI', 'CA', 'BR', 'ZA', 'TR', 'AR', 'IL', 'TH', 'AU', 'SA']
    });
    gtag('consent', 'default', {
        "ad_storage": 'granted',
        "personalization_storage": 'granted',
        "analytics_storage": 'granted',
        "functionality_storage": 'granted',
        "ads_data_redaction": 'denied',
        "ad_user_data": 'granted',
        "ad_personalization": 'granted',
        "security_storage": 'granted',
        "url_passthrough": true,
        "wait_for_update": 500,
        "region": ['US-CA', 'US-VA', 'US-CO', 'US-UT', 'US-CT']
    });
    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'personalization_storage': 'denied',
        'analytics_storage': 'denied',
        'functionality_storage': 'denied',
        'ads_data_redaction': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'security_storage': 'granted',
        'url_passthrough': true,
        'wait_for_update': 500,
    });
    window._gtagDefaultFired = true;
}
intaSetGtagConsentDefaults();

// OpenAI Ads consent default — runs sync in uc-boot (same reason as intaSetGtagConsentDefaults).
// defineProperty getter returns falsy so the oaiq IIFE doesn't bail; setter prepends consent:false.
(function () {
    if (window.oaiq) return;
    Object.defineProperty(window, 'oaiq', {
        configurable: true,
        get: function () { return undefined; },
        set: function (stub) {
            Object.defineProperty(window, 'oaiq', { configurable: true, writable: true, value: stub });
            if (stub && Array.isArray(stub.q)) {
                stub.q.unshift((function () { return arguments; })('consent', false));
            }
        }
    });
}());

let isWordPress = document.getElementById('intastellar-gdpr-settings-js') !== null;
let FunctionalCheckbox = document.querySelector("#functional");
let StaticsCheckBox = document.querySelector("#statics");
let MarketingCheckBox = document.querySelector("#marketing");
let pluginSource = findScriptParameter("utm_source") === undefined ? "Intastellar+Solutions+Cookiebanner" : findScriptParameter("utm_source");
window.platform = findScriptParameter("utm_source") === undefined ? "Manual" : findScriptParameter("utm_source");
let poweredBy = "";
window.dataLayer = window.dataLayer || [];
intaWpInstallDataLayerConsentMirror();
let intaConsentsObjectVariable = {
    consents: {
        staticsticCookies: false,
        functionalCookies: false,
        advertisementCookies: false,
    },
    time: new Date().toGMTString(),
    uid: Math.random().toString(16).slice(2),
    domain: window?.INTA?.settings?.rootDomain || window.location.host,
    sharingDomains: [],
    tcString: null,
}

window._paq = window._paq || [];
_paq.push(['requireConsent']);


window.clarity && window.clarity('consentv2', {
    ad_Storage: "denied",
    analytics_Storage: "denied"
});

window.uetq.push('consent', 'default', {
    'ad_storage': 'denied'
});



window.disableHubSpotCookieBanner = true;
var _hsp = (window._hsp = window._hsp || []);

function gtag() {
    dataLayer.push(arguments);
}

function intaApplyGeoRegionalDefaults(data) {
    try {
        window._intaGeo = {
            country: data && data.country,
            region_code: data && data.region_code,
        };
    } catch (e) { /* ignore */ }

    if (data.country === "US" && data.region_code === "CA") {
        window.INTA = window.INTA || {};
        window.INTA.settings = window.INTA.settings || {};
        window.INTA.settings.ccpa = window.INTA.settings.ccpa || {};
        window.INTA.settings.ccpa.on = true;
    } else if (window.INTA?.settings?.ccpa) {
        window.INTA.settings.ccpa.on = false;
    }

    // US state opt-out laws: CDPA (VA), CPA (CO), UCPA (UT), CTDPA (CT)
    if (data.country === "US" && ["VA", "CO", "UT", "CT"].indexOf(data.region_code) !== -1) {
        window.INTA = window.INTA || {};
        window.INTA.settings = window.INTA.settings || {};
        window.INTA.settings.usPrivacy = window.INTA.settings.usPrivacy || {};
        window.INTA.settings.usPrivacy.on = true;
        window.INTA.settings.usPrivacy.state = data.region_code;
    } else if (window.INTA?.settings?.usPrivacy) {
        window.INTA.settings.usPrivacy.on = false;
    }

    // GPC: Global Privacy Control — legally required in CO + CT, honored for all US opt-out states
    try {
        if (navigator.globalPrivacyControl === true && data.country === "US") {
            localStorage.setItem("ccpa_opt_out", "true");
        }
    } catch (e) { /* ignore */ }

    if (data.country === "BR") {
        window.INTA = window.INTA || {};
        window.INTA.settings = window.INTA.settings || {};
        window.INTA.settings.lgpd = window.INTA.settings.lgpd || {};
        window.INTA.settings.lgpd = true;
    } else if (window.INTA?.settings?.lgpd) {
        window.INTA.settings.lgpd = false;
    }

    if (data.country === "ZA") {
        window.INTA = window.INTA || {};
        window.INTA.settings = window.INTA.settings || {};
        window.INTA.settings.popia = window.INTA.settings.popin || {};
        window.INTA.settings.popia = true;
    } else if (window.INTA?.settings?.popin) {
        window.INTA.settings.popin.on = false;
    }

    // Canada: PIPEDA (federal) applies to all provinces; Law 25 applies specifically to Quebec
    if (data.country === "CA") {
        window.INTA = window.INTA || {};
        window.INTA.settings = window.INTA.settings || {};
        window.INTA.settings.pipeda = true;
        if (data.region_code === "QC") {
            window.INTA.settings.law25 = true;
        } else if (window.INTA.settings.law25) {
            window.INTA.settings.law25 = false;
        }
    } else if (window.INTA?.settings?.pipeda) {
        window.INTA.settings.pipeda = false;
        window.INTA.settings.law25 = false;
    }

    // Australian Privacy Act 1988 (Cth) — Australian Privacy Principles (APPs)
    if (data.country === "AU") {
        window.INTA = window.INTA || {};
        window.INTA.settings = window.INTA.settings || {};
        window.INTA.settings.australianPrivacy = true;
    } else if (window.INTA?.settings?.australianPrivacy) {
        window.INTA.settings.australianPrivacy = false;
    }

    // Saudi Arabia Personal Data Protection Law (PDPL) — SDAIA / NDMO
    if (data.country === "SA") {
        window.INTA = window.INTA || {};
        window.INTA.settings = window.INTA.settings || {};
        window.INTA.settings.pdpl = true;
    } else if (window.INTA?.settings?.pdpl) {
        window.INTA.settings.pdpl = false;
    }
}

function intaGeoAlreadyConfigured() {
    var ccpa = window.INTA && window.INTA.settings && window.INTA.settings.ccpa;
    if (ccpa && (typeof ccpa.inUsCalifornia === "boolean"
        || (ccpa.country && ccpa.regionCode))) {
        return true;
    }
    var usPrivacy = window.INTA && window.INTA.settings && window.INTA.settings.usPrivacy;
    if (usPrivacy && usPrivacy.state) {
        return true;
    }
    if (window._intaGeo && window._intaGeo.country) {
        return true;
    }
    return false;
}

function intaFetchGeoForRegionalDefaults() {
    if (intaGeoAlreadyConfigured()) {
        return;
    }
    fetch('https://ipapi.co/json/')
        .then(function (response) { return response.json(); })
        .then(intaApplyGeoRegionalDefaults)
        .catch(function () {
            /* Geo optional; consent still works without window._intaGeo */
        });
}

(function intaScheduleGeoLookup() {
    if (intaGeoAlreadyConfigured()) {
        return;
    }
    if (typeof requestIdleCallback === "function") {
        requestIdleCallback(intaFetchGeoForRegionalDefaults, { timeout: 5000 });
    } else {
        setTimeout(intaFetchGeoForRegionalDefaults, 2000);
    }
})();

if (window._intaConsentInitialized) {
    console.log('Intastellar consent already initialized, skipping...');
}

window._intaConsentInitialized = true;

// Non-blocking vendor integrations run from intaRunUcCoreIntegrations (uc-core / monolithic tail).

function optOutCCPA() {
    // Google Tag Manager / gtag
    gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
    });

    // Microsoft Clarity
    if (window.clarity) {
        try {
            window.clarity('consent', 'denied');
            // For Clarity V2, if used:
            window.clarity('consentv2', {
                ad_Storage: "denied",
                analytics_Storage: "denied"
            });
        } catch (e) { /* ignore */ }
    }

    // Matomo
    if (window._paq) {
        try {
            window._paq.push(['requireConsent']);
            window._paq.push(['forgetUserOptOut']);
        } catch (e) { /* ignore */ }
    }

    // Pintrk
    if (typeof pintrk === 'function') {
        try {
            pintrk('setconsent', false);
        } catch (e) { /* ignore */ }
    }

    // Microsoft UET
    if (window.uetq) {
        try {
            window.uetq.push('consent', 'update', { 'ad_storage': 'denied' });
        } catch (e) { /* ignore */ }
    }

    // HubSpot
    if (window._hsp) {
        try {
            window._hsp.push(['setHubSpotCookieConsent', {
                analytics: false,
                advertisement: false,
                functional: false
            }]);
        } catch (e) { /* ignore */ }
    }

    // Shopify: data sale/sharing opt-out only — does not change analytics/marketing/preferences (Shopify docs).
    try {
        localStorage.setItem("ccpa_opt_out", "true");
        intaShopifySetTrackingConsentSafe({ sale_of_data: false }, function () {
            console.log("Shopify CCPA opt-out set");
        });
    } catch (e) { /* ignore */ }

    alert("Your opt-out has been saved. We won’t sell or share your personal information.");
}

// --- Server-Side Tagging & Interception Implementation ---
// Helper: Determine consent type for a given URL using allScripts regex
function getConsentTypeForUrl(url) {
    if (!url) return 'marketing';
    for (let i = 0; i < window.allScripts.length; i++) {
        let scriptType = window.allScripts[i].type;
        let patterns = window.allScripts[i].scripts;
        for (let j = 0; j < patterns.length; j++) {
            let re = intaPatternToRegExp(patterns[j]);
            if (re) {
                try {
                    if (re.test(url)) {
                        if (scriptType === 'statics') return 'statistics';
                        return scriptType;
                    }
                } catch (e) { /* ignore */ }
            }
        }
    }
    return 'marketing';
}

/**
 * Machine-readable IAB device-storage disclosures and GVL-listed vendor URLs.
 * cb.js sets `intaIsGvlVendorPassThroughUrl` / `__intaGvlPassThroughUrls` after vendors load; this also matches
 * common disclosure JSON paths so XHR is not blocked before the GVL finishes loading.
 */
function intaIsGvlPassThroughRequest(url) {
    if (!url || typeof url !== "string") {
        return false;
    }
    if (typeof window.intaIsGvlVendorPassThroughUrl === "function") {
        try {
            if (window.intaIsGvlVendorPassThroughUrl(url)) {
                return true;
            }
        } catch (eFn) { /* ignore */ }
    }
    let u = url.trim();
    let list = window.__intaGvlPassThroughUrls;
    if (Array.isArray(list) && list.indexOf(u) !== -1) {
        return true;
    }
    try {
        let parsed = new URL(u, window.location.origin);
        let hosts = window.__intaGvlPassThroughHosts;
        if (Array.isArray(hosts) && hosts.indexOf(parsed.hostname) !== -1) {
            return true;
        }
        let p = (parsed.pathname || "").toLowerCase();
        if (parsed.protocol === "https:" && p.endsWith(".json") && /devicestorage|device_storage|compliance_devicestorage/.test(p)) {
            return true;
        }
    } catch (e0) { /* ignore */ }
    return false;
}

// Helper: Send intercepted data to backend for storage/categorization
async function sendToBackend(data) {
    try {
        let base = 'https://www.consentsmanagement.com/api/beacon-collector.php';
        await fetch(base, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } catch (e) {
        console.log("[Intastellar Consents] Error sending observer data: " + e);
    }
    return;
}

// Helper: Server-side tagging - send GA4 events via backend (consent-aware)
// Server checks consents: accepted = full data (user_id, IP, etc); not accepted = minimal
window.sendEventToServerSideTagging = function (eventName, params, opts) {
    let measurementId = (opts && opts.measurement_id) || (window.INTA && window.INTA.settings && window.INTA.settings.gtagId) || '';
    if (!measurementId || !/^G-[A-Z0-9]+$/i.test(measurementId)) return;
    let consents = window.intaCookieConsents || {};
    var consentAcceptedAt = null;
    try {
        if (typeof getCookie === 'function' && typeof decodeIntaConsentsObject === 'function' && typeof int_hideCookieBannerName !== 'undefined') {
            var c = getCookie(int_hideCookieBannerName);
            if (c && c.indexOf && c.indexOf('__inta') > -1) {
                var parts = c.split('.');
                var decoded = parts[2] ? JSON.parse(decodeIntaConsentsObject(parts[2]) || '{}') : {};
                consentAcceptedAt = decoded.time || null;
            }
        }
    } catch (e) { }
    let uid = (window.intaConsentsObjectVariable && window.intaConsentsObjectVariable.uid) || '';
    let base = (typeof window.INTA !== 'undefined' && typeof window.INTA.settings?.backendUrl === 'string') ? window.INTA.settings.backendUrl : 'https://consents.cdn.intastellarsolutions.com/tests/backend/test.php';
    fetch(base, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: 'ga4_event',
            measurement_id: measurementId,
            consents: consents,
            consent_accepted_at: consentAcceptedAt,
            client_id: (opts && opts.client_id) || ('cid_' + Date.now().toString(36) + Math.random().toString(36).slice(2)),
            user_id: (opts && opts.user_id) || uid,
            session_id: (opts && opts.session_id) || ('sess_' + Date.now()),
            page_location: (opts && opts.page_location) || window.location.href,
            page_title: (opts && opts.page_title) || (document.title || ''),
            events: [{ name: eventName || 'page_view', params: params || {} }]
        })
    }).catch(function () { });
};

// IAB TC String generator
(function (window) {
    // Minimal IAB TCF encoder for browser use
    function padBits(num, len) {
        let s = num.toString(2);
        return "0".repeat(len - s.length) + s;
    }
    function strToBits(str) {
        // 2 chars, each 6 bits (A=0, Z=25, a=26, z=51)
        return padBits(str.charCodeAt(0) - 65, 6) + padBits(str.charCodeAt(1) - 65, 6);
    }
    function base64UrlEncode(bytes) {
        let binary = '';
        for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
        return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    function base64UrlDecode(str) {
        str = (str || '').replace(/-/g, '+').replace(/_/g, '/');
        while (str.length % 4) str += '=';
        var binary = atob(str);
        var out = '';
        for (var i = 0; i < binary.length; i++) out += String.fromCharCode(binary.charCodeAt(i));
        return out;
    }

    // Minimal TCModel
    function TCModel() {
        this.cmpId = 0; // REQUIRED: set to your IAB Europe-registered CMP ID before encoding (0 is not a valid registered ID)
        this.cmpVersion = 1;
        this.consentScreen = 0;
        // dev/gvl-local.json vendorListVersion as of its lastUpdated date. Keep in sync with
        // whatever GVL version consent was actually collected against; a live GVL loader
        // should override this at runtime once one exists.
        this.vendorListVersion = 137;
        this.isServiceSpecific = true; // this CMP issues one string per site, not a Global Consent string
        this.purposeConsents = [];
        this.purposeLegitimateInterests = [];
        this.vendorConsents = [];
        this.vendorLegitimateInterests = [];
        this.disclosedVendors = []; // TCF 2.3: vendors disclosed to user in CMP
    }

    /** MaxVendorId(16) + IsRangeEncoding(1, always 0/bitfield here) + one bit per vendor 1..maxVendorId. */
    function encodeVendorBitfieldSection(maxVendorId, flags) {
        let bits = padBits(maxVendorId, 16);
        bits += padBits(0, 1); // IsRangeEncoding: 0 = bitfield
        for (let i = 0; i < maxVendorId; i++) bits += (flags && flags[i]) ? "1" : "0";
        return bits;
    }

    /** TCF 2.3: Encode Disclosed Vendors segment (segment type 1). */
    function encodeDisclosedVendorsSegment(maxVendorId, disclosed) {
        if (maxVendorId <= 0) return '';
        let bits = padBits(1, 3); // segment type 1 = vendorsDisclosed
        bits += encodeVendorBitfieldSection(maxVendorId, disclosed);
        let bytes = [];
        for (let i = 0; i < bits.length; i += 8) bytes.push(parseInt(bits.substr(i, 8).padEnd(8, '0'), 2));
        return base64UrlEncode(bytes);
    }

    // TCF 2.2+: Purposes 3-6 may never carry a legitimate-interest legal basis.
    var PURPOSES_WITHOUT_LEGITIMATE_INTEREST = [3, 4, 5, 6];

    var TCString = {
        encode: function (tcModel) {
            let bits = "";
            bits += padBits(2, 6); // Version
            let now = Math.floor(Date.now() / 100); // 0.1s increments
            bits += padBits(now, 36); // Created
            bits += padBits(now, 36); // LastUpdated
            bits += padBits(tcModel.cmpId || 0, 12);
            bits += padBits(tcModel.cmpVersion || 0, 12);
            bits += padBits(tcModel.consentScreen || 0, 6);
            bits += strToBits("EN"); // ConsentLanguage
            bits += padBits(tcModel.vendorListVersion || 0, 12);
            bits += padBits(5, 6); // TcfPolicyVersion: 5 = TCF v2.3 (GVL specification v3)
            bits += padBits(tcModel.isServiceSpecific === false ? 0 : 1, 1);
            bits += padBits(0, 1); // UseNonStandardStacks/Texts
            bits += padBits(0, 12); // SpecialFeatureOptIns
            // PurposeConsents (24 bits)
            for (let i = 0; i < 24; i++) bits += tcModel.purposeConsents && tcModel.purposeConsents[i] ? "1" : "0";
            // PurposesLITransparency (24 bits) — purposes 3-6 are forced to 0 regardless of input.
            for (let i = 0; i < 24; i++) {
                let purposeId = i + 1;
                let isLi = tcModel.purposeLegitimateInterests && tcModel.purposeLegitimateInterests[i];
                bits += (isLi && PURPOSES_WITHOUT_LEGITIMATE_INTEREST.indexOf(purposeId) === -1) ? "1" : "0";
            }
            bits += padBits(0, 1); // PurposeOneTreatment
            bits += strToBits("EN"); // PublisherCC

            let maxVendorId = (tcModel.vendorConsents && tcModel.vendorConsents.length) || 0;
            bits += encodeVendorBitfieldSection(maxVendorId, tcModel.vendorConsents);

            let maxVendorIdLI = (tcModel.vendorLegitimateInterests && tcModel.vendorLegitimateInterests.length) || 0;
            bits += encodeVendorBitfieldSection(maxVendorIdLI, tcModel.vendorLegitimateInterests);

            bits += padBits(0, 12); // NumPubRestrictions: this CMP doesn't set per-publisher vendor restrictions

            // Convert bits to bytes
            let bytes = [];
            for (let i = 0; i < bits.length; i += 8) {
                bytes.push(parseInt(bits.substr(i, 8).padEnd(8, "0"), 2));
            }
            let coreString = base64UrlEncode(bytes);
            // TCF 2.3: mandatory Disclosed Vendors segment (required for new/updated signals from Feb 28, 2026)
            let disclosed = (tcModel.disclosedVendors && tcModel.disclosedVendors.length >= maxVendorId)
                ? tcModel.disclosedVendors.slice(0, maxVendorId)
                : (tcModel.vendorConsents || []).slice(0, maxVendorId).map(function () { return true; });
            let disclosedSegment = encodeDisclosedVendorsSegment(maxVendorId, disclosed);
            return disclosedSegment ? coreString + "." + disclosedSegment : coreString;
        },
        decode: function (tcString) {
            let coreOnly = (tcString || '').split('.')[0];
            let binary = base64UrlDecode(coreOnly);
            let bits = '';
            for (let i = 0; i < binary.length; i++) {
                bits += ('00000000' + binary.charCodeAt(i).toString(2)).slice(-8);
            }
            // Parse fields (see encoder for bit lengths)
            let offset = 0;
            function read(len) {
                let val = bits.substr(offset, len);
                offset += len;
                return val;
            }
            /** MaxVendorId(16) + IsRangeEncoding(1); reads a bitfield or expands a range list either way. */
            function readVendorSection() {
                let maxVendorId = parseInt(read(16), 2);
                let isRangeEncoding = parseInt(read(1), 2);
                if (isRangeEncoding) {
                    let numEntries = parseInt(read(12), 2);
                    let vendors = [];
                    for (let e = 0; e < numEntries; e++) {
                        let isRange = parseInt(read(1), 2);
                        let start = parseInt(read(16), 2);
                        let end = isRange ? parseInt(read(16), 2) : start;
                        for (let v = start; v <= end; v++) vendors[v - 1] = true;
                    }
                    return { maxVendorId: maxVendorId, vendors: vendors };
                }
                let vendorBits = maxVendorId > 0 ? read(maxVendorId) : '';
                return { maxVendorId: maxVendorId, vendors: vendorBits.split('').map(function (b) { return b === '1'; }) };
            }
            let version = parseInt(read(6), 2);
            let created = parseInt(read(36), 2);
            let lastUpdated = parseInt(read(36), 2);
            let cmpId = parseInt(read(12), 2);
            let cmpVersion = parseInt(read(12), 2);
            let consentScreen = parseInt(read(6), 2);
            let consentLanguage = String.fromCharCode(parseInt(read(6), 2) + 65, parseInt(read(6), 2) + 65);
            let vendorListVersion = parseInt(read(12), 2);
            let tcfPolicyVersion = parseInt(read(6), 2);
            let isServiceSpecific = !!parseInt(read(1), 2);
            let useNonStandardStacks = !!parseInt(read(1), 2);
            let specialFeatureOptIns = read(12);
            let purposes = read(24).split('').map(b => b === '1');
            let purposeLegitInterests = read(24).split('').map(b => b === '1');
            let purposeOneTreatment = !!parseInt(read(1), 2);
            let publisherCC = String.fromCharCode(parseInt(read(6), 2) + 65, parseInt(read(6), 2) + 65);
            let vendorSection = readVendorSection();
            let vendorLiSection = readVendorSection();
            let numPubRestrictions = parseInt(read(12), 2);
            return {
                version,
                created,
                lastUpdated,
                cmpId,
                cmpVersion,
                consentScreen,
                consentLanguage,
                vendorListVersion,
                tcfPolicyVersion,
                isServiceSpecific,
                useNonStandardStacks,
                specialFeatureOptIns,
                purposes,
                purposeLegitInterests,
                purposeOneTreatment,
                publisherCC,
                maxVendorId: vendorSection.maxVendorId,
                vendors: vendorSection.vendors,
                maxVendorIdLI: vendorLiSection.maxVendorId,
                vendorsLI: vendorLiSection.vendors,
                numPubRestrictions
            };
        }
    };

    window.IABTCF = {
        TCModel: TCModel,
        TCString: TCString
    };
})(window);

// Consent check helper
function hasConsent(type) {
    // type: 'functional', 'statistics', 'marketing'
    if (!window.intaCookieConsents) return false;
    if (type === 'functional') return window.intaCookieConsents.functionalCookies === 'checked';
    if (type === 'statistics' || type === 'analytics') return window.intaCookieConsents.staticsticCookies === 'checked';
    if (type === 'advertisement' || type === 'marketing') return window.intaCookieConsents.advertisementCookies === 'checked';
    return false;
}

let ALLOWLIST = [
    location.origin,
    "https://intastellar.app",
    "https://www.intastellarsolutions.com",
    "https://analytics.intastellarsolutions.com",
    "https://api.intastellarsolutions.com",
    "https://apis.intastellarsolutions.com",
    "https://apis.intastellaraccounts.com",
    'https://www.intastellarconsents.com',
    "https://consents.intastellarsolutions.com",
    "https://www.consentsmanagement.com",
    "https://analytics.consentsmanagement.com",
    "https://vendor-list.consensu.org",
    "/dev/gvl-local.json",
    "https://forms.hsforms.com",
    "https://js.hs-scripts.com",
    "https://js.hsforms.net",
    "https://api.hsforms.com",
    "https://forms.hubspot.com",
    "https://track.hubspot.com",
    "https://js.usemessages.com",
    "https://cdn2.hubspot.net",
    "https://cdn.hsforms.net",
    "https://cdn.weglot.com",
    "https://dev.visualwebsiteoptimizer.com",
    "https://www.google-analytics.com",
    "https://region1.google-analytics.com"
];

function intaNormalizeHostname(host) {
    if (!host) {
        return "";
    }
    return String(host).split(":")[0].replace(/^www\./i, "").toLowerCase();
}

/** Best-effort registrable domain when `INTA.settings.rootDomain` is not set (e.g. `booking.example.com` → `example.com`). */
function intaDeriveSiteRootFromHostname(hostname) {
    let h = intaNormalizeHostname(hostname);
    if (!h) {
        return "";
    }
    let parts = h.split(".");
    if (parts.length <= 2) {
        return h;
    }
    return parts.slice(-2).join(".");
}

function intaGetSiteRootCandidates(pageHostname) {
    let roots = [];
    let configured = window.INTA && window.INTA.settings && window.INTA.settings.rootDomain;
    if (configured) {
        roots.push(intaNormalizeHostname(String(configured)));
    }
    let derived = intaDeriveSiteRootFromHostname(pageHostname);
    if (derived) {
        roots.push(derived);
    }
    let partners = window.INTA && window.INTA.settings && window.INTA.settings.partnerDomain;
    if (Array.isArray(partners)) {
        partners.forEach(function (d) {
            if (d) {
                roots.push(intaNormalizeHostname(String(d)));
            }
        });
    }
    return roots.filter(function (r, i, arr) {
        return r && arr.indexOf(r) === i;
    });
}

function intaIsHostUnderSiteRoot(host, root) {
    let h = intaNormalizeHostname(host);
    let r = intaNormalizeHostname(root);
    if (!h || !r) {
        return false;
    }
    return h === r || h.endsWith("." + r);
}

/** True when target and page share the same configured/derived root (root ↔ subdomain in either direction). */
function intaIsSameSiteHost(targetHostname, pageHostname) {
    let t = intaNormalizeHostname(targetHostname);
    let p = intaNormalizeHostname(pageHostname);
    if (!t || !p) {
        return false;
    }
    if (t === p) {
        return true;
    }
    let roots = intaGetSiteRootCandidates(p);
    for (let i = 0; i < roots.length; i++) {
        if (intaIsHostUnderSiteRoot(t, roots[i]) && intaIsHostUnderSiteRoot(p, roots[i])) {
            return true;
        }
    }
    return false;
}

function isAllowed(url) {
    try {
        let parsedUrl = new URL(url, window.location.origin);
        // Allow all requests to the same origin
        if (parsedUrl.origin === window.location.origin) return true;

        if (
            /(?:\.hubspot\.com|\.hsforms\.com|\.hs-scripts\.com|\.hsforms\.net|\.usemessages\.com|\.cdn2\.hubspot\.net|\.cdn\.hsforms\.net)$/i.test(parsedUrl.hostname)
        ) {
            return true;
        }

        // Allow if matches any allowlist origin
        if (ALLOWLIST.some(domain => parsedUrl.origin === domain)) return true;

        // Root domain ↔ subdomain (either direction), e.g. booking.asasoftware.aero → asasoftware.aero/collect
        if (intaIsSameSiteHost(parsedUrl.hostname, window.location.hostname)) {
            return true;
        }

        // Optionally allow other trusted domains here
        return false;
    } catch (e) {
        return false;
    }
}

var intastellarDevMode = (function () {
    var hostname = window.location.hostname;
    return hostname === "localhost"
        || hostname.indexOf("127.0.0.1") > -1 && window.INTA && window.INTA.dev === true
        || hostname.indexOf("0.0.0.0") > -1 && window.INTA && window.INTA.dev === true
        || hostname.indexOf("192.168.") > -1 && window.INTA && window.INTA.dev === true
        || hostname.indexOf("::1") > -1 && window.INTA && window.INTA.dev === true
        ? true : false;
})();

// Intercept fetch with consent check
let originalFetch = window.fetch;
window.fetch = function (resource, config) {
    let url = (typeof resource === 'string') ? resource : resource.url;
    // Prevent recursion for backend endpoint
    if (isAllowed(url)) {
        return originalFetch.apply(this, arguments);
    }
    if (intaIsGvlPassThroughRequest(url)) {
        return originalFetch.apply(this, arguments);
    }
    let isExternal = !url.startsWith(window.location.origin);
    if (isExternal) {
        let consentType = getConsentTypeForUrl(url);
        if (!hasConsent(consentType)) {
            if (typeof intastellarDevMode !== 'undefined' && intastellarDevMode) {
                console.log('[GDPR] Blocked fetch:', url, 'type:', consentType);
            }

            sendToBackend({
                type: 'fetch',
                url,
                data: typeof data === 'string' ? data : '[binary]',
                consentType,
                timestamp: Date.now()
            });
            // Silently block: return a resolved Promise with undefined
            return Promise.resolve(undefined);
        }
    }
    return originalFetch.apply(this, arguments);
};

// Intercept XMLHttpRequest with consent check
let OriginalXHR = window.XMLHttpRequest;
function CustomXHR() {
    let xhr = new OriginalXHR();
    let open = xhr.open;
    xhr.open = function (method, url, ...args) {
        if (isAllowed(url)) {
            return open.apply(this, arguments);
        }
        if (intaIsGvlPassThroughRequest(url)) {
            return open.apply(this, arguments);
        }
        let isExternal = !url.startsWith(window.location.origin);
        if (isExternal) {
            let consentType = getConsentTypeForUrl(url);
            if (!hasConsent(consentType)) {
                if (typeof intastellarDevMode !== 'undefined' && intastellarDevMode) {
                    console.log('[GDPR] Blocked XHR:', url, 'type:', consentType);
                }
                // Silently block: do not send request
                return; // open not called, so request never sent
            }

            sendToBackend({
                type: 'xhr',
                url,
                data: typeof data === 'string' ? data : '[binary]',
                consentType,
                timestamp: Date.now()
            });
        }
        return open.apply(this, arguments);
    };
    return xhr;
}
window.XMLHttpRequest = CustomXHR;
// Intercept navigator.sendBeacon with consent check
let originalSendBeacon = navigator.sendBeacon;
navigator.sendBeacon = function (url, data) {
    // Prevent recursion for backend endpoint
    if (isAllowed(url)) {
        return originalSendBeacon.apply(this, arguments);
    }
    if (intaIsGvlPassThroughRequest(url)) {
        return originalSendBeacon.apply(this, arguments);
    }
    let isExternal = !url.startsWith(window.location.origin);
    if (isExternal) {
        let consentType = getConsentTypeForUrl(url);
        if (!hasConsent(consentType)) {
            if (typeof intastellarDevMode !== 'undefined' && intastellarDevMode) {
                console.log('[GDPR] Blocked beacon:', url, 'type:', consentType);
            }
            // Silently block: do not send beacon
            return false;
        }
        sendToBackend({
            type: 'beacon',
            url,
            data: typeof data === 'string' ? data : '[binary]',
            consentType,
            timestamp: Date.now()
        });
    }
    return originalSendBeacon.apply(this, arguments);
};
// --- End Server-Side Tagging & Interception Implementtion ---


let settingsMessage = "";
let foundScripts = window.foundScripts = [];
let intCookieIcon = intastellarAssetsCDNdomain + "/assets/icons/cookie_settings.svg";
window.dataLayer = window.dataLayer || [];
(adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 1;
(adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;

/* - - - Setup - - - */
if (window.INTA === undefined) {
    window.INTA = {
        policy_link: undefined,
        settings: {
            company: undefined,
            lang: "auto",
            color: "#c09f53",
            keepInLocalStorage: ["firstLoad", int_FunctionalCookies, int_hideCookieBannerName, int_marketingCookies, int_staticsticCookies],
            arrange: "ltr",
            logo: intCookieIcon,
            partnerDomain: null,
            StyleSheet: null,
            design: "overlay",
        }
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }

        /* console.log(localStorage.getItem(cname), cname); */

        if (c.indexOf(name) === 0 && localStorage.getItem(cname) === null) {
            return c.substring(name.length, c.length);
        } else if (localStorage.getItem(cname) !== null) {
            return localStorage.getItem(cname);
        }
    }
    return "";
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * CCPA / CPRA: persist `salesOfDataAllowed` only for visitors in California (no extra banner checkbox).
 * Region: `window._intaGeo` from ipapi (see fetch above), or override `INTA.settings.ccpa.inUsCalifornia` (boolean),
 * or both `INTA.settings.ccpa.country === "US"` and `INTA.settings.ccpa.regionCode === "CA"` (e.g. server-injected).
 * Value: false if `localStorage.ccpa_opt_out` ("Do not sell" flow); else mirrors marketing consent (`advertisementCookies === "checked"`).
 * When region is still unknown, the field is left unchanged (not added, not removed) until geo or override is available.
 */
function intaCaliforniaRegionState() {
    try {
        var ccpa = window.INTA && window.INTA.settings && window.INTA.settings.ccpa;
        if (ccpa && typeof ccpa.inUsCalifornia === "boolean") {
            return ccpa.inUsCalifornia ? "yes" : "no";
        }
        if (ccpa && ccpa.country && ccpa.regionCode) {
            return (ccpa.country === "US" && ccpa.regionCode === "CA") ? "yes" : "no";
        }
        var g = window._intaGeo;
        if (g && g.country && g.region_code) {
            return (g.country === "US" && g.region_code === "CA") ? "yes" : "no";
        }
    } catch (e) { /* ignore */ }
    return "unknown";
}

// Returns "yes" if the visitor is in any US opt-out jurisdiction (CA, VA, CO, UT, CT),
// "no" if their location is known and outside all of them, or "unknown" if geo isn't resolved yet.
function intaIsUsOptOutRegion() {
    var caState = intaCaliforniaRegionState();
    if (caState === "yes") return "yes";
    try {
        var usPrivacy = window.INTA && window.INTA.settings && window.INTA.settings.usPrivacy;
        if (usPrivacy && usPrivacy.on === true) return "yes";
        if (usPrivacy && usPrivacy.on === false) return "no";
        var g = window._intaGeo;
        if (g && g.country === "US" && ["VA", "CO", "UT", "CT"].indexOf(g.region_code) !== -1) return "yes";
        if (g && g.country && g.region_code) return "no";
    } catch (e) { /* ignore */ }
    return caState;
}

function intaMarketingConsentImpliesSaleAllowed(consents) {
    if (!consents || typeof consents !== "object") return false;
    return consents.advertisementCookies === "checked" || consents.advertisementCookies === true;
}

function intaSyncSalesOfDataAllowedOnConsents(consents) {
    if (!consents || typeof consents !== "object") return;
    var region = intaIsUsOptOutRegion();
    if (region === "no") {
        delete consents.salesOfDataAllowed;
        return;
    }
    if (region === "unknown") {
        return;
    }
    try {
        if (typeof localStorage !== "undefined" && localStorage.getItem("ccpa_opt_out") === "true") {
            consents.salesOfDataAllowed = false;
            return;
        }
    } catch (e) { /* ignore */ }
    consents.salesOfDataAllowed = intaMarketingConsentImpliesSaleAllowed(consents);
}

function encodeIntaConsentsObject(string, base) {
    try {
        var parsed = JSON.parse(string);
        if (parsed && typeof parsed === "object" && parsed.consents && typeof parsed.consents === "object") {
            intaSyncSalesOfDataAllowedOnConsents(parsed.consents);
            string = JSON.stringify(parsed);
        }
    } catch (e) {
        /* not a full consent JSON payload — encode as-is */
    }
    var number = "0";
    var length = string.length;
    for (var i = 0; i < length; i++)
        number += string.charCodeAt(i).toString(base);
    return base + "." + number;
}

function decodeIntaConsentsObject(number) {
    var string = "";
    number = number?.slice(1);
    var length = number?.length;
    for (var i = 0; i < length;) {
        var code = number?.slice(i, i += 2);
        string += String.fromCharCode(parseInt(code, parseInt(getCookie(int_hideCookieBannerName)?.split(".")[1])));
    }

    return string;
}

let tmpl = document.createElement('template');
tmpl.innerHTML = `
<style>:host { display:block; width: auto; max-width: 560px; }</style> <!-- look ma, scoped styles -->
<slot></slot>
`;

/* - - - Function to get Cookie Settings from url and set the cookie - - - */
function intaSetCookieSettings() {
    let urlParams = new URLSearchParams(window.location.search);
    let cookieSettings = urlParams.get('intaCookieSettings');
    let reload = urlParams.get('reload');

    /*  console.log("Cookie Settings from URL", window.location.host); */
    if (cookieSettings && !reload) {
        /* console.log("Setting the new cookie" + cookieSettings); */

        document.cookie = int_hideCookieBannerName + "=" + cookieSettings + "; expires=" + cookieLifeTime +
            "; path=/; " +
            intCookieDomain +
            "SameSite=Lax";
        // Reload the page and append to exising query string the reload parameter
        window.location.href = window.location.href + "&reload=true";
    }
};

window.addEventListener("DOMContentLoaded", (event) => {
    loadUcVendors(); // Lazy-load detectCookieVendor + COOKIE_CONSENT_TYPE_MAP to reduce initial parse
    window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments) };

    window.clarity && window.clarity('consentv2', {
        ad_Storage: "denied",
        analytics_Storage: "denied"
    });

    let optedOut = localStorage.getItem('ccpa_opt_out');
    if (optedOut === 'true') {
        gtag('consent', 'update', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
        });
        // Pintrk
        if (typeof pintrk === 'function') {
            try {
                pintrk('setconsent', false);
            } catch (e) { /* ignore */ }
        }
    }

    if (document.getElementById("intastellar-gdpr-settings-js-after") !== null) {
        console.warn(`IntastellarSolutionsSDK: You´re using an old version of our cookie solutions for WordPress. To make sure to get the latest updates and features, please download the latest version from our Website:
        https://www.intastellarsolutions.com/cookie-solutions/downloads`);
    }
    customElements.define('inta-consents-content', class extends HTMLElement {
        constructor() {
            super(); // always call super() first in the constructor.
            let templ = document.createElement("template");
            templ.innerHTML = `
                <style>
                    :host{
                        min-width: 400px;
                        margin-inline: auto;
                        padding: 25px 15px;
                        color: rgb(36, 36, 36);
                        background-color: #fff;
                        border: 3px dotted;
                        position: relative;
                        text-align: center;
                        border-radius: 5px;
                    }
                </style>
            `
            // Attach a shadow root to the element.
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
            shadowRoot.appendChild(templ.content.cloneNode(true))
        }
        // ...
    });

    customElements.define('intastellar-consents', class extends HTMLElement {
        constructor() {
            super(); // always call super() first in the constructor.
            let templ = document.createElement("template");
            templ.innerHTML = `
                <style>
                    :host{
    
                    }
                </style>
            `
            // Attach a shadow root to the element.
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
            shadowRoot.appendChild(templ.content.cloneNode(true))
        }
    })

    customElements.define('inta-consents-section', class extends HTMLElement {
        constructor() {
            super(); // always call super() first in the constructor.

            // Attach a shadow root to the element.
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
        }
        // ...
    });

    customElements.define('inta-consents-logo', class extends HTMLElement {
        constructor() {
            super(); // always call super() first in the constructor.

            // Attach a shadow root to the element.
            let tmplStyle = document.createElement("template");
            tmplStyle.innerHTML = `<style>:host{display:block; width: auto;}</style><slot></slot>`;
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(tmplStyle.content.cloneNode(true));
        }
        // ...
    });

    customElements.define('inta-consents-bg', class extends HTMLElement {
        constructor() {
            super(); // always call super() first in the constructor.
            // Attach a shadow root to the element.
            let tmplStyle = document.createElement("style");
            tmplStyle.innerHTML = `:host{display:block; width: auto;background-image: url(${this.getAttribute("inta-bg-img")}); background-size: cover;}`;
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(tmplStyle);
        }
        // ...
    });
});

/* Custom error message */

class IntastellarSolutionsSDK extends Error {
    constructor(message) {
        super(message);
        this.name = 'IntastellarSolutionsSDKError';
    }
};

/* True if the browser accepts a first-party cookie with this Domain= value (rejects public-suffix / illegal parents). */
function intaIsDocumentCookieDomainAccepted(domainAttr) {
    "use strict";
    var name = "__intaCdPrb_" + Math.random().toString(36).slice(2, 11);
    var base = "path=/;max-age=5;SameSite=Lax";
    document.cookie = name + "=1;" + base + ";domain=" + domainAttr;
    var ok = document.cookie.indexOf(name + "=") !== -1;
    document.cookie = name + "=;" + base + ";max-age=0;domain=" + domainAttr;
    return ok;
}

let intCookieDomain = (function () {
    "use strict";
    var i = 0,
        host = window.location.hostname,
        d = (document.domain === "localhost" || window.location.host === "localhost" || document.domain === "" || window.location.host === "127.0.0.1" || window.location.host.indexOf("127.0.0.1") > -1) ? "127.0.0.1" : document.domain || window.location.host,
        p = d.split(".");

    if (document.domain === "localhost" || window.location.host === "localhost" || document.domain === "" || window.location.host === "127.0.0.1" || window.location.host.indexOf("127.0.0.1") > -1) {
        return "domain=." + d + ";";
    }

    if (host.indexOf(":") !== -1 || /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(host)) {
        return "";
    }

    if (p.length < 2) {
        return "";
    }

    d = p.slice(-1 - ++i).join(".");

    if (!intaIsDocumentCookieDomainAccepted("." + d)) {
        return "";
    }

    return "domain=." + d + ";";
})();

let intCookieDomainWithWWW = (function () {
    "use strict";
    var i = 0,
        host = window.location.hostname,
        d = (document.domain === "localhost" || window.location.host === "localhost" || document.domain === "127.0.0.1" || window.location.host === "127.0.0.1") ? "" : document.domain || window.location.host,
        p = d.split(".");

    if (document.domain === "localhost" || window.location.host === "localhost" || document.domain === "127.0.0.1" || window.location.host === "127.0.0.1") {
        return "domain=www." + d + ";";
    }

    if (host.indexOf(":") !== -1 || /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(host) || p.length < 2) {
        return "";
    }

    d = p.slice(-1 - ++i).join(".");
    var wwwAttr = "www." + d;

    if (!intaIsDocumentCookieDomainAccepted(wwwAttr)) {
        return "";
    }

    return "domain=www." + d + ";";
})();

let allowAllCookieName = "__all__cookies";
let essentialsCookieName = "__essential__cookies";
let blockTrackingCookies = "__hideTrackingCookies";
let blockAdvertismentCookies = "__hideAdvertisementCookies";
let intHead = document.head || document.querySelector("head") || document.getElementsByTagName("head")[0];

let cookieLifeTime = new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * 200).toGMTString();
/* List of cookies that should not be deleted */

let inta_requiredCookieList = [{
    vendor: (window.INTA?.settings?.company) ? window.INTA?.settings?.company : window.location.host,
    cookies: [
        {
            cookie: "PHPSESSID",
            purpose: "This cookie is native to PHP applications. The cookie is used to store and identify a users' unique session ID for the purpose of managing user session on the website. The cookie is a session cookies and is deleted when all the browser windows are closed.",
        },
        {
            cookie: "SCJP",
            purpose: "",
        },
        {
            cookie: "SCJD",
            purpose: "",
        },
        {
            cookie: "SCWCD",
            purpose: "",
        },
        {
            cookie: "SCBCD",
            purpose: "",
        },
        {
            cookie: "SCDJWS",
            purpose: "",
        },
        {
            cookie: "__hs_cookie_cat_pref",
            purpose: "Hubspot uses this cookie to remember the user's cookie consent preferences. It is necessary for HubSpot's Cookie Consent functionality.",
        }
    ],
    domains: [
        window.INTA?.settings?.rootDomain,
        window.location.host
    ]
},
{
    vendor: "Intastellar Solutions, International",
    cookies: [
        {
            cookie: int_visitorCheck,
            purpose: "It´s function is the find out if a user has already visit the page, to know if information should be collected or not.",
        },
        {
            cookie: int_hideCookieBannerName,
            purpose: "It´s function is to hide the popup window onload after user has accept or rejected cookies.",
        },
        {
            cookie: int_marketingCookies,
            purpose: "Its function is to store users cookie choice regarding marketing / advertising cookies. Its purpose is to store a users cookie choice whether a user allows tracking & cookies for advertising purposes or not.",
        },
        {
            cookie: int_staticsticCookies,
            purpose: "Its function is to store users cookie choice regarding statistical cookies. Its purpose is to store a users cookie choice whether a user allows tracking & cookies for statistical purposes or not.",
        },
        {
            cookie: int_FunctionalCookies,
            purpose: "Its function is to store users cookie choice regarding functional cookies. Its purpose is to store a users cookie choice whether a user allows storing for functional purposes like chosen region, or not.",
        },
        {
            cookie: "c_user",
            purpose: ""
        }
    ],
    vendor_privacy: "https://www.intastellarsolutions.com/about/legal/privacy",
    domains: [
        "intastellarsolutions.com",
        "consents.cdn.intastellarsolutions.com",
        "intastellarconsents.com",
        window.location.host,
        window.INTA?.settings?.rootDomain
    ]
},
{
    vendor: "WooCommerce",
    cookies: [
        {
            cookie: "woocommerce_cart_hash",
            purpose: "Helps WooCommerce determine when cart contents/data changes",
        },
        {
            cookie: "woocommerce_items_in_cart",
            purpose: "Helps WooCommerce determine when cart contents/data changes.",
        },
        {
            cookie: "wp_woocommerce_session_",
            purpose: "Contains a unique code for each customer so that it knows where to find the cart data in the database for each customer"
        },
        {
            cookie: "woocommerce_recently_viewed",
            purpose: "Powers the Recent Viewed Products widget",
        },
        {
            cookie: "store_notice[notice id]",
            purpose: "Allows customers to dismiss the Store Notice."
        }
    ],
    vendor_privacy: "https://automattic.com/privacy/",
    domains: [
        window.location.host,
        window.INTA?.settings?.rootDomain
    ]
},
{
    vendor: "Microsoft Inc, ASP.NET",
    cookies: [
        {
            cookie: "ASP.NET_SessionId",
            purpose: "Supports the integration of third-party platform on the Website",
        },
        {
            cookie: ".AspNetCore.Session",
            purpose: ""
        }
    ],
    vendor_privacy: "https://privacy.microsoft.com/en-gb/privacystatement",
    domains: [
        window.location.host,
        window.INTA?.settings?.rootDomain
    ]
},
{
    vendor: "Amazon Web Services",
    cookies: [
        {
            cookie: "AWSALB",
            purpose: "Required for the website to perform properly.",
        },
        {
            cookie: "AWSALBCORS",
            purpose: "Supports the website's technical functions.",
        }
    ],
    vendor_privacy: "https://aws.amazon.com/privacy/",
    domains: [
        window.location.host,
        window.INTA?.settings?.rootDomain
    ]
},
{
    vendor: "HubSpot",
    cookies: [
        {
            cookie: "__hs_opt_out",
            purpose: "This cookie is used by the opt-in privacy policy to remember not to ask the visitor to accept cookies again.",
        },
        {
            cookie: "__hs_do_not_track",
            purpose: "This cookie can be set to prevent the HubSpot tracking cookie from being set.",
        },
        {
            cookie: "__hs_initial_opt_in",
            purpose: "This cookie is used to prevent the banner from always displaying when visitors are browsing in strict mode.",
        },
        {
            cookie: "__hs_cookie_cat_prefs",
            purpose: "This cookie is used to store the HubSpot cookie category preferences of a visitor.",
        }
    ],
    vendor_privacy: "https://legal.hubspot.com/privacy-policy",
    domains: [
        window.location.host
    ]
}
];
/* - - - List of Analytics / Statistics cookie names - - - */
let inta_statisticCookieList = [];
inta_statisticCookieList.push({
    vendor: "Microsoft Inc",
    cookies: [
        {
            cookie: "ANONCHK",
            purpose: "Indicates whether MUID is transferred to ANID, a cookie used for advertising. Clarity doesn't use ANID and so this is always set to 0."
        },
        {
            cookie: "MR",
            purpose: "Indicates whether to refresh MUID."
        },
        {
            cookie: "MUID",
            purpose: "Identifies unique web browsers visiting Microsoft sites. These cookies are used for advertising, site analytics, and other operational purposes."
        },
        {
            cookie: "SM",
            purpose: "Used in synchronizing the MUID across Microsoft domains."
        }
    ],
    vendor_privacy: "https://privacy.microsoft.com/en-gb/privacystatement",
    domains: [
        window.location.host,
        "microsoft.com",
        "bing.com",
    ]
});
inta_statisticCookieList.push({
    vendor: "Clarity / Microsoft Inc",
    cookies: [
        {
            cookie: "_clck",
            purpose: "Persists the Clarity User ID and preferences, unique to that site, on the browser. This ensures that behavior in subsequent visits to the same site will be attributed to the same user ID.",
        },
        {
            cookie: "_clsk",
            purpose: "Connects multiple page views by a user into a single Clarity session recording.",
        },
        {
            cookie: "CLID",
            purpose: "Identifies the first-time Clarity saw this user on any site using Clarity."
        }
    ],
    vendor_privacy: "https://privacy.microsoft.com/en-gb/privacystatement",
    domains: [
        window.location.host,
        "microsoft.com",
        "bing.com",
        "clarity.ms"
    ]
})
inta_statisticCookieList.push({
    vendor: "Mixpanel",
    cookies: [
        {
            cookie: "mp_*_mixpanel",
            purpose: "",
        },
        {
            cookie: "mp_[^/a-zA-Z/]_mixpanel",
            purpose: "",
        },
        {
            cookie: "mixpanel_distinct_id",
            purpose: "To store a unique user ID, store account details.",
        },
        {
            cookie: "mixpanel",
            purpose: ""
        }
    ],
    vendor_privacy: "https://mixpanel.com/legal/privacy-policy/",
    domains: [
        window.location.host,
        "mixpanel.com",
    ]
})
inta_statisticCookieList.push({
    vendor: "Google Inc",
    cookies: [
        {
            cookie: "_ga",
            purpose: "to store and count pageviews.",
        },
        {
            cookie: "__gp",
            purpose: "",
        },
        {
            cookie: "_gid",
            purpose: ""
        },
        {
            cookie: "_dc_gtm_",
            purpose: ""
        },
        {
            cookie: "_gaexp_rc",
            purpose: ""
        },
        {
            cookie: "_gaexp",
            purpose: ""
        },
        {
            cookie: "_gat",
            purpose: ""
        },
        {
            cookie: "_opt_expid",
            purpose: ""
        },
        {
            cookie: "FPAU",
            purpose: ""
        },
        {
            cookie: "FPGCLDC",
            purpose: ""
        },
        {
            cookie: "_gcl_dc",
            purpose: ""
        },
        {
            cookie: "_gcl_au",
            purpose: ""
        },
        {
            cookie: "FCNEC",
            purpose: ""
        },
        {
            cookie: "FPLC",
            purpose: ""
        },
        {
            cookie: "FPGCLAW",
            purpose: ""
        },
        {
            cookie: "FPGCLGB",
            purpose: ""
        },
        {
            cookie: "_gcl_aw",
            purpose: ""
        },
        {
            cookie: "_gac_gb_",
            purpose: ""
        },
        {
            cookie: "_gcl_gb",
            purpose: ""
        },
        {
            cookie: "__utma",
            purpose: "to Store the calculation of days and time to purchase."
        },
        {
            cookie: "__utmb",
            purpose: "to store time of visit."
        },
        {
            cookie: "__utmc",
            purpose: "to store time of visit."
        },
        {
            cookie: "__utmt",
            purpose: "to store time of visit."
        },
        {
            cookie: "__utmz",
            purpose: "to store used keyword and search engine."
        },
        {
            cookie: "__utmv",
            purpose: ""
        },
        {
            cookie: "FPID",
            purpose: ""
        },
        {
            cookie: "_opt",
            purpose: ""
        },
        {
            cookie: "_gcl",
            purpose: "to provide ad delivery or retargeting."
        }
    ],
    domains: [
        "youtube.com",
        "youtube-nocookie.com",
        "google.com"
    ],
    vendor_privacy: "https://policies.google.com/privacy"
})

inta_statisticCookieList.push({
    vendor: "Omnisend",
    cookies: [
        {
            cookie: "soundestID",
            purpose: "This cookie is set by the provider Omnisend. This cookie is used for determining if a visitor is new to the website or the visitor had visited before."
        },
        {
            cookie: "omnisendSessionID",
            purpose: "This cookie is set by the provider Omnisend. This cookie is used for setting a unique ID for the session. The cookie collects information on visitor behaviour on the website for statistical purposes."
        },
        {
            cookie: "page-views",
            purpose: null
        }
    ],
    domains: [
        "omnisend.com",
        "omnisnippet1.com",
        "soundestlink.com"
    ],
    vendor_privacy: ""
})

inta_statisticCookieList.push({
    vendor: "HubSpot Inc",
    cookies: [
        {
            "cookie": "__hssc",
            "purpose": "Tracks sessions. This is used to determine if HubSpot should increment the session number and timestamps in the __hstc cookie. It contains the domain, viewCount (increments each pageView in a session), and session start timestamp. It expires in 30 minutes."
        },
        {
            "cookie": "__hssrc",
            "purpose": "Whenever HubSpot changes the session cookie, this cookie is also set to determine if the visitor has restarted their browser. If this cookie doesn't exist when HubSpot manages cookies, it's considered a new session. It contains the value '1' when present. It expires at the end of the session."
        },
        {
            "cookie": "__hstc",
            "purpose": "The main cookie used for tracking visitors. It contains the domain, HubSpotutk, initial timestamp (first visit), last timestamp (last visit), current timestamp (this visit), and session number (increments for each subsequent session). It expires in six months."
        },
        {
            "cookie": "hs-messages-is-open",
            "purpose": `Used to determine and save whether the chat widget is open for future visits.

            It's set in your visitor's browser when they start a new chat, and resets to re-close the widget after 30 minutes of inactivity.`
        },
        {
            "cookie": "Hubspotutk",
            "purpose": "Keeps track of a visitor's identity. It's passed to HubSpot on form submission and used when deduplicating contacts. It contains an opaque GUID to represent the current visitor."
        }
    ],
    domains: [
        "hubspot.com",
        "hs-scripts.com",
        "hs-analytics.net",
        "hsforms.com",
        "hsadspixel.net",
        "hs-banner.com",
        "hscollectedforms.net",
        "hscta.net",
        "hsleadflows.net",
        "hs-scripts.net",
        "hsstatic.net",
        "hubspot.net",
        "hubspot.de",
    ],
    vendor_privacy: "https://legal.hubspot.com/privacy-policy"
})

inta_statisticCookieList.push({
    vendor: "x.clearbitjs.com",
    cookies: [
        {
            cookie: "cb%3Atest",
            purpose: "Collects data on the user's visits to the website, such as the number of visits, average time spent on the website and what pages have been loaded with the purpose of generating reports for optimising the website content."
        }
    ],
    domains: [
        "x.clearbitjs.com",
        "clearbit.com",
        window.location.host,
        window.INTA?.settings?.rootDomain
    ],
    vendor_privacy: "https://clearbit.com/privacy"
});

inta_statisticCookieList.push({
    vendor: "Hotjar Ltd.",
    cookies: [
        {
            cookie: "_hjIncludedInSample",
            purpose: "Used to determine whether a user is included in the sample which is used to generate funnels."
        },
        {
            cookie: "_hjMinimizedPolls",
            purpose: "This cookie is set when a visitor minimizes a feedback poll."
        },
        {
            cookie: "_hjDonePolls",
            purpose: "This cookie is set once a visitor has completed a feedback poll."
        },
        {
            cookie: "_hjClosedSurveyInvites",
            purpose: "This cookie is set when a visitor closes a survey invitation."
        },
        {
            cookie: "_hjSession",
            purpose: "This cookie is used to identify a single user session."
        },
        {
            cookie: "_hjSessionTooLarge",
            purpose: "This cookie is set to let Hotjar know whether a session recording size exceeded the limit."
        },
        {
            cookie: "_hjSessionResumed",
            purpose: "This cookie is set when a visitor resumes a session recording."
        },
        {
            cookie: "_hjLocalStorageTest",
            purpose: "This cookie is used to check if the visitor's browser supports local storage."
        },
        {
            cookie: "_hjAbsoluteSessionInProgress",
            purpose: "This cookie is used to count how many times a visitor has visited a site in a 30-minute time frame."
        },
        {
            cookie: "_hjTLDTest",
            purpose: "This cookie is used to determine the most generic domain possible to set the cookie for the site."
        },
        {
            cookie: "_hjRecordingEnabled",
            purpose: "This cookie is set to let Hotjar know whether recording is enabled for the session."
        },
        {
            cookie: "_hjRecordingLastActivity",
            purpose: "This cookie is used to store the last activity time of a visitor when they are recording a session."
        },
        {
            cookie: "_hjShownFeedbackMessage",
            purpose: "This cookie is set when a visitor has seen the 'Thank you' message after submitting feedback."
        },
        {
            cookie: "_hjViewportId",
            purpose: "This cookie is used to store the visitor's viewport size."
        },
        {
            cookie: "_hjFirstSeen",
            purpose: "This cookie is set to identify a new user’s first session."
        },
        {
            cookie: "_hjSessionUser_",
            purpose: "This cookie is used to persist the user ID of a returning user."
        },
        {
            cookie: "_hjid",
            purpose: "This cookie is set when the Hotjar script loads and is used to persist the Hotjar User ID."
        }
    ],
    domains: [
        "hotjar.com"
    ],
    vendor_privacy: "https://help.hotjar.com/hc/en-us/articles/115011789248-Hotjar-Cookies"
});

/* - - - List of Marketing cookies - - - */
let inta_marketingCookieList = [];
inta_marketingCookieList.push(
    {
        vendor: "Meta Inc",
        cookies: [
            {
                cookie: "_fbp",
                purpose: "to store and track visits across websites."
            },
            {
                cookie: "fr",
                purpose: "to deliver, measure and improve the relevancy of ads."
            },
            {
                cookie: "datr",
                purpose: "to identify browsers and devices for security and site integrity purposes."
            },
            {
                cookie: "sb",
                purpose: "to identify browsers and devices for security and site integrity purposes."
            },
            {
                cookie: "c_user",
                purpose: ""
            },
            {
                cookie: "xs",
                purpose: ""
            }
        ],
        domains: [
            "facebook.com",
            "facebook.net",
            "fbcdn.net",
            "instagram.com"
        ],
        vendor_privacy: "https://www.facebook.com/privacy/policy/?entry_point=comet_dropdown"
    }
);
inta_marketingCookieList.push({
    vendor: "Google Inc",
    cookies: [
        {
            cookie: "__gsas",
            purpose: ""
        },
        {
            cookie: "__gpi",
            purpose: ""
        },
        {
            cookie: "__gpi_optout",
            purpose: "",
        },
        {
            cookie: "__gads",
            purpose: ""
        },
        {
            cookie: "GED_PLAYLIST_ACTIVITY",
            purpose: ""
        },
        {
            cookie: "FPAU",
            purpose: "",
        },
        {
            cookie: "FPGCLDC",
            purpose: "",
        },
        {
            cookie: "_gcl_dc",
            purpose: "",
        },
        {
            cookie: "_gcl_gb",
            purpose: "",
        },
        {
            cookie: "_gcl_au",
            purpose: "",
        },
        {
            cookie: "FPGCLAW",
            purpose: "",
        },
        {
            cookie: "FPGCLGB",
            purpose: "",
        },
        {
            cookie: "_gac_gb_",
            purpose: "",
        },
        {
            cookie: "CONSENT",
            purpose: "",
        },
        {
            cookie: "_gcl_aw",
            purpose: "",
        },
        {
            cookie: "GoogleAdServingTest",
            purpose: ""
        },
        {
            cookie: "ga-audiences",
            purpose: "Used by Google AdWords to re-engage visitors that are likely convert to customers based on the visitor´s online behaviour across websites."
        }
    ],
    domains: [
        "googletagmanager.com",
        "googleadservice.com",
        "google-analytics.com",
        "google.com"
    ],
    vendor_privacy: "https://policies.google.com/privacy"
});

inta_marketingCookieList.push({
    vendor: "HubSpot Inc",
    cookies: [
        {
            cookie: "hubspotutk",
            purpose: "This cookie is used for to keep track of a visitor's identity. This cookie is passed to HubSpot on form submission and used when de-duplicating contacts."
        },
        {
            cookie: "messagesUtk",
            purpose: "This cookie is used to recognize visitors who chat with you via the messages tool. If the visitor leaves your site before they're added as a contact, they will have this cookie associated with their browser."
        },
        {
            cookie: "__hstc",
            purpose: "The main cookie for tracking visitors. It contains the domain, utk, initial timestamp (first visit), last timestamp (last visit), current timestamp (this visit), and session number (increments for each subsequent session)."
        },
        {
            cookie: "__hssc",
            purpose: "This cookie keeps track of sessions. This is used to determine if HubSpot should increment the session number and timestamps in the __hstc cookie. It contains the domain, viewCount (increments each pageView in a session), and session start timestamp."
        },
        {
            cookie: "__hssrc",
            purpose: "Whenever HubSpot changes the session cookie, this cookie is also set to determine if the visitor has restarted their browser. If this cookie does not exist when HubSpot manages cookies, it is considered a new session."
        },
        {
            cookie: "__hs_opt_out",
            purpose: "This cookie is used by the opt-in privacy policy to remember not to ask the visitor to accept cookies again."
        },
        {
            cookie: "__hs_do_not_track",
            purpose: "This cookie can be set to prevent the tracking code from sending any information to HubSpot. Setting this cookie is different from opting out of cookies, as it still allows anonymized information to be sent to HubSpot."
        },
        {
            cookie: "__cf_bm",
            purpose: "This cookie is used to distinguish between humans and bots. This is beneficial for the website, in order to make valid reports on the use of their website."
        },
        {
            cookie: "_cfuvid",
            purpose: "This cookie is used to distinguish between humans and bots. This is beneficial for the website, in order to make valid reports on the use of their website."
        }
    ],
    domains: [
        "hubspot.com",
        "hs-scripts.com",
        "hs-analytics.net",
        "hsforms.com",
        "hsadspixel.net",
        "hs-banner.com",
        "hscollectedforms.net",
        "hscta.net",
        "hsleadflows.net",
        "hs-scripts.net",
        "hsstatic.net",
        "hubspot.net",
        "hubspot.de",
    ],
    vendor_privacy: "https://legal.hubspot.com/privacy-policy"
});

inta_marketingCookieList.push({
    vendor: "x.clearbitjs.com",
    cookies: [
        {
            cookie: "__tld__",
            purpose: "Used to track visitors on multiple websites, in order to present relevant advertisement based on the visitor's preferences.",
        },
        {
            cookie: "cb_anonymous_id",
            purpose: "Collects data on visitor behaviour from multiple websites, in order to present more relevant advertisement - This also allows the website to limit the number of times that they are shown the same advertisement."
        },
        {
            cookie: "cb_user_id",
            purpose: "Collects data on visitor behaviour from multiple websites, in order to present more relevant advertisement - This also allows the website to limit the number of times that they are shown the same advertisement"
        },
        {
            cookie: "cb_group_id",
            purpose: "Collects data on visitors. This information is used to assign visitors into segments, making website advertisement more efficient."
        },
        {
            cookie: "cb_group_properties",
            purpose: "Collects data on visitor behaviour from multiple websites, in order to present more relevant advertisement - This also allows the website to limit the number of times that they are shown the same advertisement."
        },
        {
            cookie: "cb_user_traits",
            purpose: "Collects data on visitor behaviour from multiple websites, in order to present more relevant advertisement - This also allows the website to limit the number of times that they are shown the same advertisement"
        }
    ],
    domains: [
        "x.clearbitjs.com",
        "clearbit.com",
        window.location.host
    ],
    vendor_privacy: "https://clearbit.com/privacy"
})

inta_marketingCookieList.push({
    vendor: "LinkedIn Inc",
    cookies: [
        {
            cookie: "li_giant",
            purpose: "",
        },
        {
            cookie: "li_fat_id",
            purpose: ""
        },
        {
            cookie: "ln_or",
            purpose: "Used to determine if Oribi analytics can be carried out on a specific domain"
        }
    ],
    domains: [
        "linkedin.com",
        "licdn.com"
    ],
    vendor_privacy: "https://www.linkedin.com/legal/privacy-policy"
});

inta_marketingCookieList.push({
    vendor: "MailChimp",
    cookies: [
        {
            cookie: "MCPopupClosed",
            purpose: "to store if a message has been dismissed.",
        },
        {
            cookie: "Mailchimp.cart.*",
            purpose: ""
        },
        {
            cookie: "mctb_bar_hidden",
            purpose: ""
        },
        {
            cookie: "mailchimp_campaign_id",
            purpose: "to store and track the email campaign."
        },
        {
            cookie: "mailchimp_email_id",
            purpose: "to store and track the email campaign."
        },
        {
            cookie: "Mc_landing_site",
            purpose: "to store which page was visited first."
        },
        {
            cookie: "Mailchimp_landing_site",
            purpose: "to store which page was visited first."
        },
        {
            cookie: "Mailchimp_cart_previous_email",
            purpose: "to store information for remarketing purposes."
        },
        {
            cookie: "Mailchimp_cart_current_email",
            purpose: "to store information for remarketing purposes."
        },
        {
            cookie: "Mailchimp_user_previous_email",
            purpose: ""
        },
        {
            cookie: "mailchimp_user_email",
            purpose: ""
        },
        {
            cookie: "mailchimp.cart.previous_email",
            purpose: "to store information for remarketing purposes."
        },
        {
            cookie: "mailchimp.cart.current_email",
            purpose: "to store information for remarketing purposes."
        }
    ],
    domains: [
        "mailchimp.com",
        "mailchimp.com",
        "mailchimpapp.com",
        "tumblr.com"
    ],
    vendor_privacy: "https://mailchimp.com/en-gb/legal/privacy/"
});

inta_marketingCookieList.push({
    vendor: "Trustpilot A/S",
    cookies: [
        {
            cookie: "CONSENT",
            purpose: "",
        }
    ],
    domains: [
        "trustpilot.com",
        "trustpilot.dk",
        "trustpilot.co.uk",
        "cdn.segment.com",
        "trustpilot-assets.com",
        "trustpilot-api.com",
        "segment.com",
    ],
    vendor_privacy: "https://legal.trustpilot.com/for-reviewers/end-user-privacy-terms"
});

inta_marketingCookieList.push({
    vendor: "YouTube",
    cookies: [
        {
            cookie: "GPS",
            purpose: "",
        },
        {
            cookie: "PREF",
            purpose: "",
        },
        {
            cookie: "VISITOR_INFO1_LIVE",
            purpose: ""
        },
        {
            cookie: "YSC",
            purpose: "",
        }
    ],
    domains: [
        "youtube.com",
        "youtube-nocookie.com"
    ],
    vendor_privacy: "https://policies.google.com/privacy"
});

inta_marketingCookieList.push({
    vendor: "Microsoft Inc",
    cookies: [
        {
            cookie: "_uetvid",
            purpose: "",
        },
    ],
    domains: [
        "bing.com",
        "clarity.com"
    ],
    vendor_privacy: "https://privacy.microsoft.com/en-gb/privacystatement"
});

inta_marketingCookieList.push({
    vendor: "Twitter Intl Co",
    cookies: [
        {
            cookie: "personalization_id",
            purpose: "This cookie tracks activities on and off Twitter for a personalized experience",
        },
    ],
    domains: [
        "t.co",
        "x.com",
        "twitter.com"
    ],
    vendor_privacy: "https://privacy.microsoft.com/en-gb/privacystatement"
});

inta_marketingCookieList.push({
    vendor: "Casale Media",
    cookies: [
        {
            cookie: "CMID",
            purpose: "Casale Media sets thias cookie to collect information on user behavior, for targeted advertising.",
        },
        {
            cookie: "CMPS",
            purpose: "CMPS cookie is set by Casale Media for anonymous tracking based on user´s website visits, for displaying targeted ads.",
        }
    ],
    domains: [],
    vendor_privacy: null
});

inta_marketingCookieList.push({
    vendor: "Vimeo Inc",
    cookies: [
        {
            cookie: "Vuid",
            purpose: "to store the user's usage history.",
        },
        {
            cookie: "__utmt_player",
            purpose: "Google Analytics cookie deployed by Vimeo which is used to throttle the request rate for the service – limiting the collection of data on high traffic sites. As such, this cookie for the Vimeo player assists in the players performance/uptime monitoring and placement on customer sites. “Utmt” Indicates the type of request, which is one of: event, transaction, item, or custom variable. The item in this case being the Vimeo player as indicated by the word “player”."
        }
    ],
    domains: [
        "vimeo.com",
        "player.vimeo.com"
    ],
    vendor_privacy: "https://vimeo.com/privacy"
});

/* - - - List of functional cookies - - - */
let inta_functionalCookieList = [];
inta_functionalCookieList.push({
    vendor: (window.INTA?.settings?.company) ? window.INTA?.settings?.company : window.location.host,
    cookies: [
        {
            cookie: "language",
            purpose: "This cookie is used to set users prefrence regarding the selected language.",
        },
        {
            cookie: "lang",
            purpose: "This cookie is used to set users prefrence regarding the selected language.",
        },
        {
            cookie: "hl",
            purpose: "This cookie is used to set users prefrence regarding the selected language.",
        },
        {
            cookie: "locale",
            purpose: "This cookie is used to set users prefrence regarding the selected region.",
        }
    ],
    vendor_privacy: null,
    domains: [
        window.location.host
    ]
})

inta_functionalCookieList.push({
    vendor: "Google Inc",
    cookies: [
        {
            cookie: "FCCDCF",
            purpose: "",
        },
        {
            cookie: "NID",
            purpose: "",
        },
        {
            cookie: "AMP_TOKEN",
            purpose: "",
        },
        {
            cookie: "_GRECAPTCHA",
            purpose: "Ensures the website and application security.",
        }
    ],
    domains: [
        "googletagmanager.com",
        "googleadservice.com",
        "google-analytics.com",
        "google.com",
        "fonts.google.com"
    ],
    vendor_privacy: "https://policies.google.com/privacy"
})

inta_functionalCookieList.push({
    vendor: "Google Fonts",
    cookies: [
        {
            cookie: "FCCDCF",
            purpose: "",
        },
        {
            cookie: "NID",
            purpose: "",
        },
        {
            cookie: "AMP_TOKEN",
            purpose: "",
        }
    ],
    domains: [
        "fonts.google.com",
        "google.com",
        window.location.host
    ],
    vendor_privacy: "https://policies.google.com/privacy"
})

inta_functionalCookieList.push({
    vendor: "jsdelivr.com",
    cookies: [
        {
            cookie: "__cfduid",
            purpose: "Used by the content network, Cloudflare, to identify trusted web traffic.",
        }
    ],
    domains: [
        "jsdelivr.net",
        "cdnjs.com",
        "cdn.jsdelivr.net",
        "jsdelivr.com",
        "cdnjs.cloudflare.com",
        "cloudflare.com",
        "cloudflare.net",
        "cloudflareinsights.com",
        "cloudflarestream.com",
        "cloudflarewatch.com",
    ],
    vendor_privacy: "https://www.jsdelivr.com/terms/privacy-policy-jsdelivr-net"
})

inta_functionalCookieList.push({
    vendor: "Stripe",
    cookies: [
        {
            cookie: "__stripe_sid",
            purpose: "Fraud prevention",
        },
        {
            cookie: "__stripe_mid",
            purpose: "Fraud prevention",
        },
    ],
    domains: [
        "stripe.com"
    ],
    vendor_privacy: "https://stripe.com/gb/privacy"
})

inta_functionalCookieList.push({
    vendor: "CloudFlare",
    cookies: [
        {
            cookie: "__cf_bm",
            purpose: "to read and filter requests from bots.",
        }
    ],
    domains: [
        "vimeo.com",
        "player.vimeo.com"
    ],
    vendor_privacy: "https://www.cloudflare.com/en-gb/privacypolicy/"
})

inta_functionalCookieList.push({
    vendor: "Dynatrace",
    cookies: [
        {
            cookie: "rxvt",
            purpose: "Dynatrace. Session timeout.",
        },
        {
            cookie: "dtLatC",
            purpose: "Dynatrace. Measures server latency for performance monitoring.",
        },
        {
            cookie: "rxVisitor",
            purpose: "Dynatrace. This cookie is used to store an anonymous ID for the user to correlate across sessions on the world service.",
        },
        {
            cookie: "dtCookie",
            purpose: "Dynatrace. Tracks a visit across multiple requests",
        },
        {
            cookie: "dtPC",
            purpose: "Required to identify proper endpoints for beacon transmission; includes session ID for correlation.",
        }
    ],
    vendor_privacy: "https://www.dynatrace.com/company/trust-center/privacy",
    domains: []
})
let requiredToKeep = inta_requiredCookieList;
window.INTA?.settings?.requiredCookies?.forEach((cookie) => {
    if (cookie.type === "functional") {
        inta_functionalCookieList.forEach((vendor) => {
            if (vendor.vendor === window.INTA?.settings?.company) {
                vendor.cookies.push({
                    cookie: cookie.cookie,
                    purpose: cookie?.purpose,
                    domain: cookie?.domain
                });
            }
        });
    } else if (cookie.type === "statistic") {
        inta_statisticCookieList.forEach((vendor) => {
            if (vendor.vendor === window.INTA?.settings?.company) {
                vendor.cookies.push({
                    cookie: cookie.cookie,
                    purpose: cookie?.purpose,
                    domain: cookie?.domain
                });
                requiredToKeep.push(vendor);
            }
        });
    } else if (cookie.type === "marketing") {
        inta_marketingCookieList.forEach((vendor) => {
            if (vendor.vendor === window.INTA?.settings?.company) {
                vendor.cookies.push({
                    cookie: cookie.cookie,
                    purpose: cookie?.purpose,
                    domain: cookie?.domain
                });
                requiredToKeep.push(vendor);
            }
        });

    } else {
        inta_requiredCookieList.forEach((vendor) => {
            if (vendor.vendor === window.INTA?.settings?.company) {
                vendor.cookies.push({
                    cookie: cookie.cookie,
                    purpose: cookie?.purpose,
                    domain: cookie?.domain
                });
            }
        });
    }
});
let int__cookiesToKeep = [...requiredToKeep.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1);
/* - - - Helper function to get cookie type*/
function intaCookieType(type) {
    if (getCookie(type) === "checked") return true;
    return (getCookie(type) === "true")
}

/* function generateCookieRegex(item){ */
/* Cookie name list for functional cookies */
if (getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && !hasConsent("functional")) {
    let newArray = [...inta_functionalCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
    int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray);
}
/* Cookie name list for statistical cookies */
if (getCookie(int_hideCookieBannerName) != ""
    && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1
    && hasConsent("analytics")) {
    let newArray = [...inta_statisticCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
    int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray)
}

/* Cookie name list for marketing / advertisment cookies */
if (getCookie(int_hideCookieBannerName) != ""
    && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1
    && hasConsent("advertisement")) {
    let newArray = [...inta_marketingCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
    int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray)
}

if (getCookie(int_hideCookieBannerName) != ""
    && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1
    && hasConsent("functional")) {
    let newArray = [...inta_functionalCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
    int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray)
}

let int__cookiesToKeepRegx = new RegExp(int__cookiesToKeep.filter(function (entry) { return entry.trim() != ''; }).join("|"), "i");

let cookieBannerStyles = {
    banner: "banner.css",
    bannerV2: "bannerV2.css",
    overlay: "overlay.css",
    floating: "floating.css"
};

window.INTA.settings.language = typeof window.INTA?.settings?.language === "undefined" ?
    window.INTA?.settings?.language : window.INTA?.settings?.language;

let intastellarCookieLanguage
    = window.intastellarCookieLanguage
    = window.INTA?.settings === undefined
        || window.INTA?.settings?.language === "auto"
        || window.INTA?.settings?.language === ""
        || window.INTA?.settings?.language === undefined
        ? document.querySelector("html").getAttribute("lang")
        : window.INTA?.settings?.language == "german" ? "de"
            : window.INTA?.settings?.language == "danish" ? "da"
                : window.INTA?.settings?.language == "english" ? "en"
                    : window.INTA?.settings?.language == "spanish" ? "es"
                        : window.INTA?.settings?.language == "french" ? "fr"
                            : window.INTA?.settings?.language == "italian" ? "it"
                                : window.INTA?.settings?.language == "dutch" ? "nl"
                                    : window.INTA?.settings?.language == "portuguese" ? "pt"
                                        : window.INTA?.settings?.language == "russian" ? "ru"
                                            : window.INTA?.settings?.language == "swedish" ? "sv"
                                                : window.INTA?.settings?.language == "norwegian" ? "no"
                                                    : window.INTA?.settings?.language == "polish" ? "pl"
                                                        : window.INTA?.settings?.language == "turkish" ? "tr"
                                                            : window.INTA?.settings?.language == "arabic" ? "ar"
                                                                : window.INTA?.settings?.language == "japanese" ? "ja"
                                                                    : window.INTA?.settings?.language == "korean" ? "ko"
                                                                        : window.INTA?.settings?.language == "chinese" ? "zh"
                                                                            : window.INTA?.settings?.language == "ukrainian" ? "uk"
                                                                                : window.INTA?.settings?.language == "czech" ? "cs"
                                                                                    : window.INTA?.settings?.language == "hungarian" ? "hu"
                                                                                        : window.INTA?.settings?.language == "finnish" ? "fi"
                                                                                            : window.INTA?.settings?.language == "greek" ? "el"
                                                                                                : window.INTA?.settings?.language == "bulgarian" ? "bg"
                                                                                                    : window.INTA?.settings?.language == "slovak" ? "sk"
                                                                                                        : window.INTA?.settings?.language == "slovenian" ? "sl"
                                                                                                            : window.INTA?.settings?.language == "croatian" ? "hr"
                                                                                                                : window.INTA?.settings?.language == "lithuanian" ? "lt"
                                                                                                                    : window.INTA?.settings?.language == "latvian" ? "lv"
                                                                                                                        : window.INTA?.settings?.language == "estonian" ? "et"
                                                                                                                            : window.INTA?.settings?.language == "arabic" ? "ar"
                                                                                                                                : window.INTA?.settings?.language == "malay" ? "ms"
                                                                                                                                    : window.INTA?.settings?.language == "thai" ? "th"
                                                                                                                                        : window.INTA?.settings?.language == "vietnamese" ? "vi"
                                                                                                                                            : window.INTA?.settings?.language == "indonesian" ? "id"
                                                                                                                                                : window.INTA?.settings?.language == "filipino" ? "tl"
                                                                                                                                                    : window.INTA?.settings?.language == "hebrew" ? "he"
                                                                                                                                                        : window.INTA?.settings?.language == "afrikaans" ? "af"

                                                                                                                                                            : document.querySelector("html").getAttribute("lang");

if (document.querySelector("html").getAttribute("lang") == null) {
    intastellarCookieLanguage = "en";
}

// Shopify: sync from Intastellar cookie (or deny all if cookie cleared so currentVisitorConsent is not stale)
intaShopifySetTrackingConsentFromIntastellar();

/* --- Segment Consent Integration (classic analytics.js) --- */
(function initSegmentConsent() {
    function hasAnalyticsConsent() {
        let c = window.intaCookieConsents;
        return c?.staticsticCookies === "checked" ||
            c?.functionalCookies === "checked";
    }
    function getSegmentConsent() {
        var c = window.intaCookieConsents;
        if (!c || typeof c !== "object") {
            // No explicit consent object yet -> don't attach context.consent at all.
            return null;
        }
        var isChecked = function (v) { return v === "checked" || v === true; };
        return {
            categoryPreferences: {
                Analytics: isChecked(c.staticsticCookies),
                Advertising: isChecked(c.advertisementCookies),
                Functional: isChecked(c.functionalCookies)
            }
        };
    }
    function injectConsentIntoOptions(opts) {
        if (opts && typeof opts === "function") return injectConsentIntoOptions({});
        var consent = getSegmentConsent();
        opts = opts && typeof opts === "object" ? opts : {};
        if (consent) {
            opts.context = Object.assign({}, opts.context || {}, { consent: consent });
        }
        return opts;
    }
    function injectConsentIntoQueuedArgs(args) {
        if (!Array.isArray(args) || args.length < 1) return;
        var method = args[0];
        if (method !== "track" && method !== "page" && method !== "identify") return;
        var opts;
        if (method === "track") {
            opts = (args.length >= 4 && typeof args[3] === "object" && !Array.isArray(args[3])) ? args[3] : {};
            opts = injectConsentIntoOptions(opts);
            if (args.length >= 4) {
                args[3] = opts;
            } else {
                args.push(opts);
            }
        } else if (method === "page") {
            opts = (args.length >= 4 && typeof args[3] === "object" && !Array.isArray(args[3])) ? args[3] : {};
            opts = injectConsentIntoOptions(opts);
            if (args.length >= 4) {
                args[3] = opts;
            } else {
                args.push(opts);
            }
        } else if (method === "identify") {
            opts = (args.length >= 3 && typeof args[2] === "object" && !Array.isArray(args[2])) ? args[2] : {};
            opts = injectConsentIntoOptions(opts);
            if (args.length >= 3) {
                args[2] = opts;
            } else {
                args.push(opts);
            }
        }
    }
    function wrapStubQueue(analytics) {
        if (!analytics || !analytics.push) return;
        var origPush = analytics.push;
        analytics.push = function () {
            for (var i = 0; i < arguments.length; i++) {
                if (Array.isArray(arguments[i])) injectConsentIntoQueuedArgs(arguments[i]);
            }
            return origPush.apply(this, arguments);
        };
        for (var j = 0; j < analytics.length; j++) {
            if (Array.isArray(analytics[j])) injectConsentIntoQueuedArgs(analytics[j]);
        }
    }
    function wrapSegmentAnalytics() {
        if (!window.analytics) return false;
        wrapStubQueue(window.analytics);
        if (typeof window.analytics.ready !== "function") return true;
        window.analytics.ready(function () {
            var origTrack = window.analytics.track;
            var origPage = window.analytics.page;
            var origIdentify = window.analytics.identify;
            if (typeof origTrack === "function") {
                window.analytics.track = function (event, properties, options, callback) {
                    if (typeof options === "function") { callback = options; options = {}; }
                    options = injectConsentIntoOptions(options);
                    return callback ? origTrack.call(this, event, properties, options, callback) : origTrack.call(this, event, properties, options);
                };
            }
            if (typeof origPage === "function") {
                window.analytics.page = function () {
                    var args = Array.prototype.slice.call(arguments);
                    var opts = (args.length >= 4 && typeof args[3] === "object") ? args[3] : {};
                    opts = injectConsentIntoOptions(opts);
                    args.length >= 4 ? (args[3] = opts) : args.push(opts);
                    return origPage.apply(this, args);
                };
            }
            if (typeof origIdentify === "function") {
                window.analytics.identify = function (userId, traits, options, callback) {
                    if (typeof options === "function") { callback = options; options = {}; }
                    options = injectConsentIntoOptions(options);
                    return callback ? origIdentify.call(this, userId, traits, options, callback) : origIdentify.call(this, userId, traits, options);
                };
            }
        });
        return true;
    }
    if (wrapSegmentAnalytics()) return;
    var attempts = 0;
    var t = setInterval(function () {
        if (wrapSegmentAnalytics() || ++attempts > 100) clearInterval(t);
    }, 20);
})();
/* --- End Segment Consent Integration --- */

if (window.INTA?.settings?.gtagId) {
    gtag('config', window.INTA?.settings?.gtagId, {
        'user_id': '' + intaCookieConsentsUserId + ''
    });
}

intaBuildNotRequiredRegexp();
let analyticsScript = document.createElement("script");
analyticsScript.async = true;
analyticsScript.src = "https://www.intastellarsolutions.com/js/analytics.js?v=" + new Date().getTime();

intaScheduleWhenIdle(function () {
    intaAppendToDocumentHead(analyticsScript);
}, 3000);

/** Merge experiment / server text override keys into `window.INTA.settings.textOverrides`. */
function intaMergeTextOverridesIntoSettings(incomingTO) {
    if (!incomingTO || typeof incomingTO !== "object" || incomingTO === null || Array.isArray(incomingTO)) {
        return;
    }
    if (!window.INTA || !window.INTA.settings) {
        return;
    }
    var existingTO = window.INTA.settings.textOverrides;
    var mergedTO = {};
    if (existingTO && typeof existingTO === "object" && existingTO !== null && !Array.isArray(existingTO)) {
        for (var bk in existingTO) {
            if (existingTO.hasOwnProperty(bk)) {
                mergedTO[bk] = existingTO[bk];
            }
        }
    }
    for (var ik in incomingTO) {
        if (incomingTO.hasOwnProperty(ik)) {
            mergedTO[ik] = incomingTO[ik];
        }
    }
    window.INTA.settings.textOverrides = mergedTO;
}

/** Coerce preset JSON to a flat textOverrides map (flat body or `{ textOverrides }`, optional JSON string). */
function intaNormalizeTextOverridePresetBody(data) {
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
    var nested = data.textOverrides;
    if (nested && typeof nested === "object" && nested !== null && !Array.isArray(nested) && Object.keys(nested).length > 0) {
        return nested;
    }
    var flat = {};
    for (var key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key) && key !== "textOverrides") {
            flat[key] = data[key];
        }
    }
    return Object.keys(flat).length ? flat : null;
}

/**
 * Build URL for a preset text bundle. Optional `window.INTA.experiment.textOverridesPresetUrl`
 * with `{id}` placeholder, or a directory base (trailing slash optional); otherwise CDN default.
 */
function intaBuildTextOverridePresetUrl(presetId) {
    var exp = window.INTA && window.INTA.experiment;
    var tmpl = exp && exp.textOverridesPresetUrl;
    if (typeof tmpl === "string" && tmpl.indexOf("{id}") !== -1) {
        return tmpl.split("{id}").join(encodeURIComponent(presetId));
    }
    if (typeof tmpl === "string" && tmpl.replace(/\s/g, "").length) {
        return tmpl.replace(/\/?$/, "/") + encodeURIComponent(presetId) + ".json";
    }
    return "https://downloads.intastellarsolutions.com/cookieconsents/text-overrides/" + encodeURIComponent(presetId) + ".json";
}

/** Fetch JSON preset from server; body may be a flat textOverrides map or `{ textOverrides: { ... } }`. */
function intaFetchTextOverridePresetPromise(presetId) {
    if (!presetId || typeof fetch !== "function") {
        return Promise.resolve();
    }
    var url = intaBuildTextOverridePresetUrl(presetId);
    return fetch(url, { credentials: "omit", cache: "no-store" })
        .then(function (res) {
            if (!res.ok) {
                throw new Error("HTTP " + res.status);
            }
            return res.json();
        })
        .then(function (data) {
            var payload = intaNormalizeTextOverridePresetBody(data);
            if (payload && typeof payload === "object" && !Array.isArray(payload)) {
                intaMergeTextOverridesIntoSettings(payload);
            }
            try {
                window.dispatchEvent(new CustomEvent("inta:text-override-preset-loaded", { detail: { presetId: presetId } }));
            } catch (e) {
                /* ignore */
            }
        })
        .catch(function (err) {
            console.warn("[Intastellar] textOverride preset fetch failed:", presetId, err && err.message ? err.message : err);
        });
}

function intaExperimentGetQueryParam(name) {
    try {
        var params = new URLSearchParams(window.location.search || "");
        return params.get(name);
    } catch (e) {
        return null;
    }
}

function intaExperimentNormalizeValue(value) {
    return String(value == null ? "" : value).replace(/^\s+|\s+$/g, "").toLowerCase();
}

function intaExperimentValueInList(value, list) {
    if (!Array.isArray(list)) {
        return false;
    }
    var normalized = intaExperimentNormalizeValue(value);
    if (!normalized) {
        return false;
    }
    for (var i = 0; i < list.length; i++) {
        if (intaExperimentNormalizeValue(list[i]) === normalized) {
            return true;
        }
    }
    return false;
}

function intaExperimentChannelMatches(exp, expKey) {
    if (!exp || !exp.channel) {
        return true;
    }
    var match = exp.channel.match || {};
    var utmSource = intaExperimentGetQueryParam("utm_source") || intaExperimentGetQueryParam("utmSource");
    var matched = intaExperimentValueInList(utmSource, match.utmSource);
    var channelKey = expKey + "_channel";
    if (matched) {
        try { sessionStorage.setItem(channelKey, "1"); } catch (e) { }
        return true;
    }
    try {
        return sessionStorage.getItem(channelKey) === "1";
    } catch (e2) { }
    return false;
}

// --- A/B experiment: resolve variant and apply overrides from window.INTA.experiment ---
(function applyIntaExperiment() {
    window.__intaTextOverridePresetId = null;
    var exp = window.INTA && window.INTA.experiment;
    if (!exp || !exp.id || !exp.variants || !Object.keys(exp.variants).length) return;
    var expKey = 'inta_exp_' + exp.id;
    if (!intaExperimentChannelMatches(exp, expKey)) return;
    var stored = null;
    try { stored = sessionStorage.getItem(expKey); } catch (e) { }
    var variantId = stored;
    if (!variantId) {
        var variants = exp.variants;
        var total = 0;
        var ids = [];
        for (var k in variants) {
            if (variants.hasOwnProperty(k)) {
                var w = Math.max(0, parseInt(variants[k].weight, 10) || 50);
                total += w;
                ids.push({ id: k, weight: w });
            }
        }
        if (total <= 0) return;
        var r = (function simpleHash() {
            var s = exp.id + (navigator.userAgent || '') + (document.referrer || '') + (new Date().getDate());
            var h = 0;
            for (var i = 0; i < s.length; i++) h = ((h << 5) - h) + s.charCodeAt(i) | 0;
            return Math.abs(h) % 10000 / 10000;
        })();
        var bucket = r * total;
        for (var j = 0; j < ids.length; j++) {
            bucket -= ids[j].weight;
            if (bucket <= 0) {
                variantId = ids[j].id;
                break;
            }
        }
        variantId = variantId || (ids[0] && ids[0].id);
        try { sessionStorage.setItem(expKey, variantId); } catch (e) { }
    }
    var v = exp.variants[variantId];
    var overrides = (v && v.settings) || (exp.overrides && exp.overrides[variantId]) || {};
    if (overrides && typeof overrides === 'object' && window.INTA.settings) {
        for (var key in overrides) {
            if (!overrides.hasOwnProperty(key)) continue;
            if (key === "textOverridePresetId" || key === "textOverridesPresetId") {
                continue;
            }
            if (key === 'textOverrides' && overrides[key] && typeof overrides[key] === 'object' && overrides[key] !== null && !Array.isArray(overrides[key])) {
                intaMergeTextOverridesIntoSettings(overrides[key]);
            } else {
                window.INTA.settings[key] = overrides[key];
            }
        }
    }
    var presetIdToFetch = null;
    if (overrides && typeof overrides === "object") {
        if (overrides.textOverridePresetId != null && String(overrides.textOverridePresetId).trim() !== "") {
            presetIdToFetch = String(overrides.textOverridePresetId).trim();
        } else if (overrides.textOverridesPresetId != null && String(overrides.textOverridesPresetId).trim() !== "") {
            presetIdToFetch = String(overrides.textOverridesPresetId).trim();
        }
    }
    window.__intaTextOverridePresetId = presetIdToFetch;
    window.INTA.experimentVariant = variantId;
    exp.currentVariant = variantId;
    exp.currentChannel = exp.channel && exp.channel.id ? exp.channel.id : "";
    if (window.dataLayer) {
        window.dataLayer.push({
            event: 'intastellar_experiment_view',
            experiment_id: exp.id,
            variant: variantId,
            channel_id: exp.currentChannel
        });
    }
})();

let intastellarCreateBanner = document.createElement("script");
intastellarCreateBanner.src = "https://consents.cdn.intastellarsolutions.com/cb.js";
if (window.INTA.settings.design === "floating") {
    intastellarCreateBanner.src = "https://consents.cdn.intastellarsolutions.com/floating.js";
}
if (intastellarDevMode) {
    if (window.INTA.settings.design === "floating") {
        intastellarCreateBanner.src = "../../dev/styles/floating.js";
    } else {
        intastellarCreateBanner.src = "../../dev/cb.dev.js";
    }
}

intastellarCreateBanner.async = true;
intastellarCreateBanner.defer = true;

function intaScheduleWhenIdle(fn, timeoutMs) {
    timeoutMs = timeoutMs == null ? 2000 : timeoutMs;
    if (typeof requestIdleCallback === "function") {
        return requestIdleCallback(fn, { timeout: timeoutMs });
    }
    return setTimeout(fn, Math.min(timeoutMs, 250));
}

/** Resolve CMP locale slug from INTA.settings / browser (used before cb.js). */
function intaUcResolveCmpLocaleSlug() {
    if (typeof window.intaResolveCmpLocaleSlug === "function") {
        return window.intaResolveCmpLocaleSlug();
    }
    var settings = window.INTA && window.INTA.settings;
    if (settings && settings.locale) {
        var locale = String(settings.locale).trim().toLowerCase();
        if (locale !== "auto" && locale !== "") {
            return locale.split("-")[0];
        }
    }
    if (settings && settings.language) {
        var lang = String(settings.language).trim().toLowerCase();
        if (lang !== "auto" && lang !== "") {
            if (lang === "danish") return "da";
            if (lang === "english") return "en";
            if (lang === "german") return "de";
            if (lang === "spanish") return "es";
            if (lang === "french") return "fr";
            if (lang === "swedish") return "sv";
            if (lang === "norwegian") return "no";
            if (lang === "dutch") return "nl";
            if (lang === "italian") return "it";
            if (lang === "finnish") return "fi";
            if (lang === "russian") return "ru";
            if (lang === "polish") return "pl";
            if (lang === "portuguese") return "pt";
            if (lang === "thai") return "th";
            if (lang === "chinese") return "zh";
            if (lang === "japanese") return "ja";
            if (lang === "korean") return "ko";
            if (lang === "greek") return "el";
            if (lang === "afrikaans") return "af";
            if (lang === "arabic") return "ar";
            if (lang === "estonian") return "et";
            return lang.split("-")[0];
        }
    }
    var browser = (typeof intastellarCookieLanguage !== "undefined" && intastellarCookieLanguage)
        ? String(intastellarCookieLanguage).toLowerCase()
        : String(navigator.language || "en").toLowerCase();
    if (browser.indexOf("da") === 0) return "da";
    if (browser.indexOf("de") === 0) return "de";
    if (browser.indexOf("en") === 0) return "en";
    return browser.split("-")[0];
}

function intaUcCmpLocaleScriptUrl(slug) {
    var settings = window.INTA && window.INTA.settings;
    if (settings && typeof settings.localeUrl === "string" && settings.localeUrl.indexOf("{locale}") !== -1) {
        return settings.localeUrl.replace(/\{locale\}/g, slug);
    }
    if (typeof intastellarDevMode !== "undefined" && intastellarDevMode) {
        return "../../dev/languages/" + slug + ".dev.js";
    }
    return "https://consents.cdn.intastellarsolutions.com/languages/" + slug + ".js";
}

/** Load one locale file before cb.js so cb can skip the inline language branches. */
function intaPreloadCmpLocaleScript() {
    var settings = window.INTA && window.INTA.settings;
    if (settings && settings.localeSplit === false) {
        return Promise.resolve();
    }
    var slug = intaUcResolveCmpLocaleSlug();
    if (window.__intaCmpLocalePayload && window.__intaCmpLocalePayload.slug === slug) {
        return Promise.resolve();
    }
    function loadSlug(targetSlug) {
        return new Promise(function (resolve) {
            var done = false;
            function finish() {
                if (done) {
                    return;
                }
                done = true;
                resolve(!!(window.__intaCmpLocalePayload && window.__intaCmpLocalePayload.slug === targetSlug));
            }
            var s = document.createElement("script");
            s.async = true;
            s.src = intaUcCmpLocaleScriptUrl(targetSlug);
            s.onload = finish;
            s.onerror = finish;
            intaAppendToDocumentHead(s);
            setTimeout(finish, 3500);
        });
    }
    return loadSlug(slug).then(function (ok) {
        if (ok || slug === "en") {
            return;
        }
        return loadSlug("en");
    });
}

(function intaScheduleBannerScriptAfterExperimentText() {
    var presetId = typeof window.__intaTextOverridePresetId === "string" && window.__intaTextOverridePresetId.length
        ? window.__intaTextOverridePresetId
        : null;
    var fetchP = presetId ? intaFetchTextOverridePresetPromise(presetId) : Promise.resolve();
    var idleP = new Promise(function (resolve) {
        intaScheduleWhenIdle(resolve, 2000);
    });
    var loaderP = Promise.resolve();
    if (typeof intastellarDevMode !== "undefined" && intastellarDevMode) {
        loaderP = new Promise(function (resolve) {
            var s = document.createElement("script");
            s.async = true;
            s.src = "../../dev/cb-locale-loader.dev.js";
            s.onload = resolve;
            s.onerror = resolve;
            intaAppendToDocumentHead(s);
            setTimeout(resolve, 1500);
        });
    }
    Promise.all([fetchP, idleP])
        .then(function () {
            return loaderP;
        })
        .then(function () {
            return intaPreloadCmpLocaleScript();
        })
        .then(function () {
            if (window.INTA && window.INTA.settings) {
                intaAppendToDocumentHead(intastellarCreateBanner);
            }
        })
        .catch(function () {
            if (window.INTA && window.INTA.settings) {
                intaAppendToDocumentHead(intastellarCreateBanner);
            }
        });
})();

function updateCookiePreferenceOfBlockedIframes(dataType) {
    if (dataType == "intMarketingCookies") {
        document.querySelector("#marketing").checked = true;
    } else if (dataType == "intFunctionalCookies") {
        document.querySelector("#functional").checked = true;
    }
    saveINTCookieSettings("changePermission");
    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
        .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");
    // Dispatch TCF event after user action
    dispatchTCFConsentChangedIfAvailable();

    window.location.reload();
}
window.__INTA__COOKIE_EVENTS__ = window.__INTA__COOKIE_EVENTS__ || [];

/** Debounced + deduped POST to cookie-events API (interceptor fires very often). */

function __intaBuildCookieEventsPayload(batch) {
    return JSON.stringify({
        events: batch,
        website: window.location.href,
        timestamp: new Date().toISOString()
    });
}

function flushCookieEventsToApi(options) {
    options = options || {};
    if (__intaCookieEventFlushTimer !== null) {
        clearTimeout(__intaCookieEventFlushTimer);
        __intaCookieEventFlushTimer = null;
    }
    if (!__intaCookieEventPendingByKey.size) return;
    let batch = Array.from(__intaCookieEventPendingByKey.values());
    __intaCookieEventPendingByKey.clear();
    window.__intaCookieEventLastFlushAt = Date.now();
    let body = __intaBuildCookieEventsPayload(batch);
    var eventsUrl = (typeof window.INTA !== "undefined" && window.INTA.settings && window.INTA.settings.cookieEventsUrl)
        || INTA_COOKIE_EVENTS_URL;
    try {
        if (typeof navigator.sendBeacon === "function" && body.length < 60000) {
            var sent = navigator.sendBeacon(eventsUrl, new Blob([body], { type: "application/json" }));
            if (sent) {
                return;
            }
        }
        fetch(eventsUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body,
            keepalive: !!options.keepalive,
            priority: 'low',
            mode: 'cors',
            credentials: 'omit'
        }).catch(function () {});
    } catch (e) { /* ignore */ }
}

function intaScheduleCookieEventFlush() {
    if (__intaCookieEventFlushTimer !== null) {
        clearTimeout(__intaCookieEventFlushTimer);
    }
    var debounceMs = (typeof window.INTA !== "undefined" && window.INTA.settings && window.INTA.settings.cookieEventDebounceMs)
        || INTA_COOKIE_EVENT_DEBOUNCE_MS;
    __intaCookieEventFlushTimer = setTimeout(function () {
        __intaCookieEventFlushTimer = null;
        var run = function () { flushCookieEventsToApi(); };
        if (typeof requestIdleCallback === "function") {
            requestIdleCallback(run, { timeout: 8000 });
        } else {
            run();
        }
    }, debounceMs);
}

window.addEventListener('pagehide', function () {
    flushCookieEventsToApi({ keepalive: true });
});

function recordCookie(value) {
    window.__INTA__COOKIE_EVENTS__ = window.__INTA__COOKIE_EVENTS__ || [];
    window.__INTA__COOKIE_EVENTS__.push(value);

    if (window.INTA?.settings?.recordCookieEvents === false) {
        return;
    }

    var key = (value.source || 'unknown') + '\0' + (value.name || '');
    __intaCookieEventPendingByKey.set(key, value);

    if (__intaCookieEventPendingByKey.size >= INTA_COOKIE_EVENT_MAX_BATCH) {
        flushCookieEventsToApi();
        return;
    }

    intaScheduleCookieEventFlush();
}

/* Helper function to create Consents Block message for iframes etc.*/
function ConsentsBlock(logo, textLanguage, btnText, datatype, img) {
    let p = "";
    if (window.location.host.indexOf("intastellarsolutions.com") == -1) {
        p = `<a class="inta-poweredBy" href='https://www.intastellarsolutions.com' target='_blank' rel='noopener' style="align-items: center; text-decoration: none;font-size: 11.5px; color: #000 !important; display: flex; justify-content: center;">powered by <img width="90px" height="40px" style="width: 170px !important; height: 40px !important;margin-left: 10px;" src="https://www.intastellarsolutions.com/assets/logos/intastellar-consents-logo.svg" alt="Intastellar Consents"></a>`;
    }
    if (img !== undefined && img != "") {
        return `
        <inta-consents-content class="intCookie_ConsentContainer-content yt-frame">
            <inta-consents-bg class="intCookie_ConsentContainer-bgIMG" inta-bg-img="${img}"></inta-consents-bg>
            <inta-consents-section class="intCookie_ConsentContainer-info">
                ${textLanguage}
                <button class='intastellarCookie-settings__btn --changePermission' onClick='updateCookiePreferenceOfBlockedIframes("${datatype}")' data-type='${datatype}'>${btnText}</button>
                ${p}
            </inta-consents-section>
        </inta-consents-content>
        `
    } else {
        return `
            <inta-consents-content class="intCookie_ConsentContainer-content">
                ${logo === null ? "" : `
                <inta-consents-logo class="intCookie_ConsentLogo-container">
                    <img src="${logo}" class="intCookie_ConsentLogo" alt="Company logo">
                </inta-consents-logo>
                `}
                
                <inta-consents-section class="intCookie_ConsentContainer-info">
                    ${textLanguage}
                    <button class='intastellarCookie-settings__btn --changePermission' onClick='updateCookiePreferenceOfBlockedIframes("${datatype}")' data-type='${datatype}'>${btnText}</button>
                    ${p}
                </inta-consents-section>
            </inta-consents-content>
        `
    }
}

/* Helper function to check class names */
function containsClass(element, searchString) {
    return element?.classList?.contains(searchString) || element?.className?.split(' ')?.some(cls => cls?.includes(searchString));
}

/** Only real embeds (iframes / Facebook div widgets) — never generic DIV/IMG nodes. */
function intaIsLoopBlockEmbedTarget(frae) {
    if (!frae || frae.nodeType !== 1) {
        return false;
    }
    if (frae.tagName === "IFRAME") {
        return true;
    }
    if (frae.tagName === "DIV" && containsClass(frae, "fb-") && frae.getAttribute("data-href")) {
        return true;
    }
    return false;
}

function intaLoopBlockEmbedSrc(frae) {
    var src = frae.src || frae.getAttribute("src") || "";
    if (src && src !== "about:blank") {
        return src;
    }
    return "";
}

function loopBlock(addedNodes, script, logo) {
    addedNodes.forEach((frae) => {
        if (!intaIsLoopBlockEmbedTarget(frae)) {
            return;
        }
        if (getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.advertisementCookies === "checked"
            && intaCookieConsents?.functionalCookies === "checked" && intaCookieConsents?.staticsticCookies === "checked") {
            return;
        }
        let settingsContent = document.createElement("inta-consents-iframe");
        if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1 || getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && !intaCookieConsents?.advertisementCookies && script.type == "statics") {
            if (frae?.src?.indexOf("hs-sites.com") > -1) {
                frae?.parentElement?.replaceChild("", frae);
            }
        }
        if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1 || getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && !intaCookieConsents?.advertisementCookies && script.type == "marketing") {
            if (containsClass(frae, "fb-") && frae.getAttribute("data-href")?.indexOf("facebook.com") > -1) {
                frae?.parentElement?.replaceChild(settingsContent, frae);
            }
            var embedSrc = intaLoopBlockEmbedSrc(frae);
            if (embedSrc && new RegExp(script.scripts.join("|"), "ig").test(embedSrc)) {
                frae.sandbox = "";
                let ytIMG = "";
                let video_id = "";

                if (embedSrc.match("^(?:https?:)?//[^/]*(?:youtube(?:-nocookie)?\.com|youtu\.be).*[=/]([-\\w]{11})(?:\\?|=|&|$)")) {
                    video_id = embedSrc.match("^(?:https?:)?//[^/]*(?:youtube(?:-nocookie)?\.com|youtu\.be).*[=/]([-\\w]{11})(?:\\?|=|&|$)")?.pop();
                    if (video_id && !frae?.hasAttribute("inta-yt-placeholder-img")) {
                        ytIMG = "https://img.youtube.com/vi/" + video_id + "/maxresdefault.jpg";
                    } else if (frae?.hasAttribute("inta-yt-placeholder-img")) {
                        ytIMG = frae?.getAttribute("inta-yt-placeholder-img");
                    }
                } else if (frae?.hasAttribute("inta-yt-placeholder-img")) {
                    ytIMG = frae?.getAttribute("inta-yt-placeholder-img");
                }
                let a = document.createElement('a');
                a.href = embedSrc;
                let externalDomain = a.hostname;

                inta_marketingCookieList.forEach((cookie) => {
                    var i = 0,
                        d = externalDomain,
                        p = d.split(".")

                    d = p.slice(-1 - ++i).join(".");
                    externalDomain = d;

                    if (cookie?.domains?.includes(externalDomain)) {
                        externalDomain = cookie.vendor;
                    }
                })
                if (embedSrc !== window.INTA?.settings?.partnerDomain) {
                    frae.src = "about:blank";
                }
                let copy = intaPickBlockedIframeStrings(externalDomain, frae, script.type, inta_marketingCookieList);
                let textLanguage = copy.textLanguage;
                let btnText = copy.btnText;
                if (!frae.classList.contains("trustpilot-widget")) {
                    settingsContent.setAttribute("data-src", a?.href);
                }
                settingsContent.classList.add("intCookie_ConsentContainer");
                if (ytIMG !== undefined && ytIMG != "") {
                    settingsContent.classList.add("yt-frame");
                }
                if (frae.classList.length > 0) {
                    settingsContent.setAttribute("data-class", frae.className);
                }
                settingsContent.innerHTML = ConsentsBlock(logo, textLanguage, btnText, "intMarketingCookies", ytIMG);

                if (frae.style.display != "none" && embedSrc) {
                    frae?.parentElement?.replaceChild(settingsContent, frae);
                }

            }
        } else if (getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && !intaCookieConsents?.functionalCookies && script.type == "functional") {
            var functionalEmbedSrc = intaLoopBlockEmbedSrc(frae);
            if (functionalEmbedSrc && new RegExp(script.scripts.join("|"), "ig").test(functionalEmbedSrc)) {
                frae.sandbox = "";
                let a = document.createElement('a');
                a.href = functionalEmbedSrc;
                let externalDomain = a.hostname;

                inta_functionalCookieList.forEach((cookie) => {
                    var i = 0,
                        d = externalDomain,
                        p = d.split(".")

                    d = p.slice(-1 - ++i).join(".");
                    externalDomain = d;
                    if (cookie?.domains?.includes(externalDomain)) {
                        externalDomain = cookie.vendor;
                    }
                })

                let copy = intaPickBlockedIframeStrings(externalDomain, frae, script.type, inta_functionalCookieList);
                let textLanguage = copy.textLanguage;
                let btnText = copy.btnText;

                let settingsContent = document.createElement("inta-consents");
                settingsContent.classList.add("intCookie_ConsentContainer");
                settingsContent.setAttribute("data-src", a?.href);
                settingsContent.innerHTML = ConsentsBlock(logo, textLanguage, btnText, "intFunctionalCookies");

                if (functionalEmbedSrc.indexOf("hs-sites.com") > -1) {
                    frae?.parentElement?.replaceChild("", frae);
                } else {
                    if (frae.style.display != "none" && functionalEmbedSrc) {

                        frae?.parentElement?.replaceChild(settingsContent, frae);
                    }

                }
            } else if (frae?.id?.indexOf("map") > -1 || frae?.id?.indexOf("google") > -1 && frae?.id?.indexOf("google_translate_element2") == -1) {
                let externalDomain = "www.google.com";
                inta_functionalCookieList.forEach((cookie) => {
                    var i = 0,
                        d = externalDomain,
                        p = d.split(".")

                    d = p.slice(-1 - ++i).join(".");
                    externalDomain = d;
                    if (cookie?.domains?.includes(externalDomain)) {
                        externalDomain = cookie.vendor;
                    }
                })

                let copy = intaPickBlockedIframeStrings(externalDomain, frae, script.type, inta_functionalCookieList);
                let textLanguage = copy.textLanguage;
                let btnText = copy.btnText;

                let settingsContent = document.createElement("inta-consents");
                settingsContent.classList.add("intCookie_ConsentContainer");

                settingsContent.innerHTML = ConsentsBlock(logo, textLanguage, btnText, "intFunctionalCookies");

                var mapEmbedSrc = intaLoopBlockEmbedSrc(frae);
                settingsContent.setAttribute("data-src", mapEmbedSrc || frae.src || "");
                if (mapEmbedSrc.indexOf("hs-sites.com") > -1) {
                    frae?.parentElement?.replaceChild("", frae);
                } else {
                    if (frae.style.display != "none" && mapEmbedSrc) {
                        frae.parentElement.replaceChild(settingsContent, frae);
                    }
                }
            } else if (frae?.id?.indexOf("google_translate_element2") > -1) {
                frae?.parentElement?.replaceChild("", frae);
            }
        }
    })
}

function blockBlockQuotes(tweet, script, logo) {
    if (tweet != " " && getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1 || !intaCookieConsents?.advertisementCookies && script.type == "marketing" && notRequired.test(tweet.className)) {
        let a = document.createElement('a');
        a.href = tweet.querySelector("a")?.href;
        let externalDomain = a.hostname;

        inta_marketingCookieList.forEach((cookie) => {
            var i = 0,
                d = externalDomain,
                p = d.split(".")

            d = p.slice(-1 - ++i).join(".");
            externalDomain = d;

            if (cookie?.domains?.includes(externalDomain)) {
                externalDomain = cookie.vendor;
            }
        })

        let copy = intaPickBlockedIframeStrings(externalDomain, tweet, script.type, inta_marketingCookieList);
        let textLanguage = copy.textLanguage;
        let btnText = copy.btnText;
        let settingsContent = document.createElement("inta-consents");
        settingsContent.classList.add("intCookie_ConsentContainer");
        settingsContent.innerHTML = ConsentsBlock(logo, textLanguage, btnText, "intMarketingCookies");

        settingsContent.setAttribute("data-src", a?.href);
        if (tweet.src.indexOf("hs-sites.com") > -1) {
            tweet.parentElement.replaceChild("", tweet);
        } else {
            if (tweet.style.display != "none" && tweet.src != undefined) {
                tweet.parentElement.replaceChild(settingsContent, tweet);

            }
        }
    }
}

/* - - - Helper function for message on the content block - - - */
function handleInputChange(event) {
    let target = event.target;
    if (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA') {

        // Update consent tracker object for checkbox inputs
        if (target.type === 'checkbox') {
            if (target.name === "statics" || target.id === "statics") {
                window.pendingConsents = window.pendingConsents || {};
                window.pendingConsents.staticsticCookies = target.checked ? "checked" : "false";
            } else if (target.name === "functional" || target.id === "functional") {
                window.pendingConsents = window.pendingConsents || {};
                window.pendingConsents.functionalCookies = target.checked ? "checked" : "false";
            } else if (target.name === "advertisement" || target.id === "marketing") {
                window.pendingConsents = window.pendingConsents || {};
                window.pendingConsents.advertisementCookies = target.checked ? "checked" : "false";
            }
        }
    }
}

document.addEventListener('change', handleInputChange);

/* - - - HubSpot forms: legacy postMessage + Forms v4 global events (landing pages often use v4 only) - - - */
function intaNormalizePostMessageData(raw) {
    if (raw == null) return null;
    if (typeof raw === 'string') {
        try {
            return JSON.parse(raw);
        } catch (e) {
            return null;
        }
    }
    if (typeof raw === 'object') return raw;
    return null;
}

function intaIsLegacyHubspotFormSubmitPostMessage(data) {
    if (!data || data.type !== 'hsFormCallback') return false;
    var en = data.eventName;
    return en === 'onFormSubmit' || en === 'onFormSubmitted' || en === 'onFormSubmitSuccessful' || en === 'onFormSubmissionSuccessful';
}

function intaCollectHubSpotFormToIntastellar(data) {
    if (!data || typeof data !== 'object') return;
    var IntastellarFormConsentState = Object.assign({}, data);
    IntastellarFormConsentState.type = 'hsFormCallback';
    IntastellarFormConsentState.eventName = data.eventName || 'onFormSubmit';
    IntastellarFormConsentState.formId = data.formId;
    IntastellarFormConsentState.formName = data.formName;
    IntastellarFormConsentState.formSubmittedAt = data.submittedAt || data.formSubmittedAt;
    IntastellarFormConsentState.formSubmittedBy = data.submittedBy;
    IntastellarFormConsentState.formSubmittedByEmail = data.submittedByEmail;
    IntastellarFormConsentState.formSubmittedByFirstName = data.submittedByFirstName;
    IntastellarFormConsentState.formSubmittedByLastName = data.submittedByLastName;
    IntastellarFormConsentState.formSubmittedByPhone = data.submittedByPhone;
    IntastellarFormConsentState.formSubmittedByCompany = data.submittedByCompany;
    IntastellarFormConsentState.formSubmittedByCountry = data.submittedByCountry;
    IntastellarFormConsentState.formSubmittedByState = data.submittedByState;
    IntastellarFormConsentState.formSubmittedByCity = data.submittedByCity;
    IntastellarFormConsentState.formSubmittedByZip = data.submittedByZip;
    IntastellarFormConsentState.formSubmittedByIp = data.submittedByIp;
    IntastellarFormConsentState.formSubmittedByUserAgent = data.submittedByUserAgent;
    IntastellarFormConsentState.provider = 'hubspot';
    IntastellarFormConsentState.timestamp = new Date().toISOString();
    IntastellarFormConsentState.uid = intaCookieConsentsUserId;
    IntastellarFormConsentState.domain = window.INTA?.settings?.rootDomain || window.location.host;
    IntastellarFormConsentState.path = window.location.pathname;
    IntastellarFormConsentState.cookieConsentState = window.intaCookieConsents;

    fetch('https://analytics.intastellarsolutions.com/form/collect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(IntastellarFormConsentState)
    }).then(function (response) { return response.json(); }).then(function (res) {
        if (typeof intastellarDevMode !== 'undefined' && intastellarDevMode) {
            console.log('Form consent state collected:', res);
        }
    }).catch(function (error) {
        console.error('Error collecting form consent state:', error);
    });
}

window.addEventListener('message', function (event) {
    var data = intaNormalizePostMessageData(event.data);
    if (!intaIsLegacyHubspotFormSubmitPostMessage(data)) return;
    intaCollectHubSpotFormToIntastellar(data);
});

/* HubSpot updated forms editor (v4): no postMessage — use global CustomEvents on window */
window.addEventListener('hs-form-event:on-submission:success', function (event) {
    var detail = event.detail || {};
    (async function () {
        var extra = { formEditor: 'hubspot-v4', formId: detail.formId, instanceId: detail.instanceId };
        try {
            if (window.HubSpotFormsV4 && typeof window.HubSpotFormsV4.getFormFromEvent === 'function') {
                var form = window.HubSpotFormsV4.getFormFromEvent(event);
                if (form) {
                    if (typeof form.getFormFieldValues === 'function') {
                        extra.formFieldValues = await form.getFormFieldValues();
                    }
                    if (typeof form.getConversionId === 'function') {
                        try { extra.conversionId = form.getConversionId(); } catch (e) { /* ignore */ }
                    }
                    if (typeof form.getRedirectUrl === 'function') {
                        try { extra.redirectUrl = form.getRedirectUrl(); } catch (e) { /* ignore */ }
                    }
                }
            }
        } catch (e) { /* ignore */ }
        intaCollectHubSpotFormToIntastellar(Object.assign({ eventName: 'onFormSubmit' }, extra));
    })();
});

window.addEventListener('hs-form-event:on-submission:failed', function (event) {
    var detail = event.detail || {};
    intaCollectHubSpotFormToIntastellar({
        formEditor: 'hubspot-v4',
        formId: detail.formId,
        instanceId: detail.instanceId,
        eventName: 'onFormSubmissionFailed',
        submissionFailed: true
    });
});

/* - - - Listen for Form submit events to capture form consent state - - - */
// One fetch per real DOM submit: capture may run + preventDefault hook may run on same event.
let intaSeenSubmitEvents = new WeakSet();

// Capture on window + document (as early as possible). preventDefault() does not stop other
// listeners; stopImmediatePropagation on an earlier capture listener can — see preventDefault patch.
function intaIsDomSubmitEvent(event) {
    return event && typeof event === 'object' && event.type === 'submit' && typeof Event !== 'undefined' && event instanceof Event;
}

window.addEventListener('submit', inastellarFormConsentState, true);
document.addEventListener('submit', inastellarFormConsentState, true);

/* - - - If a site handler calls preventDefault(), we still want a record (same event, deduped) - - - */
(function intastellarPatchPreventDefaultForFormSubmit() {
    if (typeof Event === 'undefined' || Event.prototype.__intaPreventDefaultPatched) {
        return;
    }
    Event.prototype.__intaPreventDefaultPatched = true;
    let nativePreventDefault = Event.prototype.preventDefault;
    Event.prototype.preventDefault = function intastellarWrappedPreventDefault() {
        try {
            if (this.type === 'submit' && this.target && this.target.nodeName === 'FORM' && typeof inastellarFormConsentState === 'function') {
                inastellarFormConsentState(this);
            }
        } catch (e) { /* ignore */ }
        return nativePreventDefault.apply(this, arguments);
    };
})();

/* - - - Programmatic submit: HTMLFormElement.prototype.submit() does NOT fire "submit" listeners - - - */
(function intastellarPatchNativeFormSubmit() {
    if (typeof HTMLFormElement === 'undefined' || HTMLFormElement.prototype.__intaNativeSubmitPatched) {
        return;
    }
    HTMLFormElement.prototype.__intaNativeSubmitPatched = true;
    let nativeSubmit = HTMLFormElement.prototype.submit;
    HTMLFormElement.prototype.submit = function intastellarWrappedNativeSubmit() {
        try {
            if (typeof inastellarFormConsentState === 'function') {
                inastellarFormConsentState({
                    type: 'submit',
                    target: this,
                    preventDefault: function () {},
                    stopPropagation: function () {}
                });
            }
        } catch (e) { /* ignore */ }
        return nativeSubmit.apply(this, arguments);
    };
})();

/* jQuery $('form').submit(handler) still fires a real DOM submit event → capture listener runs first.
   jQuery $('form').submit() with no args calls elem.submit() → patched HTMLFormElement.submit below. */

/* - - - Function to send form data to Intastellar Consents API - - - */
function inastellarFormConsentState(event) {
    let form = event.target;
    if (!form || form.nodeName !== 'FORM') {
        return;
    }

    if (intaIsDomSubmitEvent(event)) {
        if (intaSeenSubmitEvents.has(event)) {
            return;
        }
        intaSeenSubmitEvents.add(event);
    }

    // Collect form data without event prevent default
    let formData = new FormData(form);
    let IntastellarFormConsentState = Object.fromEntries(formData.entries());
    IntastellarFormConsentState.type = 'formConsentState';
    IntastellarFormConsentState.formId = form.id || form.getAttribute('data-form-id');
    IntastellarFormConsentState.formName = form.name || form.getAttribute('data-form-name');
    IntastellarFormConsentState.provider = "native";
    IntastellarFormConsentState.cookieConsentState = intaCookieConsents;
    IntastellarFormConsentState.timestamp = new Date().toISOString();

    IntastellarFormConsentState.uid = intaCookieConsentsUserId;
    IntastellarFormConsentState.domain = window.INTA?.settings?.rootDomain || window.location.host;
    IntastellarFormConsentState.path = window.location.pathname;

    // Send form consent state to Intastellar Consents API
    fetch('https://analytics.intastellarsolutions.com/form/collect', {
        method: 'POST',
        body: JSON.stringify(IntastellarFormConsentState)
    }).then(response => response.json()).then(data => {
        console.log('Form consent state collected:', data);
    }).catch(error => {
        console.error('Error collecting form consent state:', error);
    });
}

function updateNotRequiredRegexp() {
    intaBuildNotRequiredRegexp();
    console.log("Updated consent blocking patterns");

    // Process existing scripts that may need to be updated
    processExistingScripts();
}

function processExistingScripts() {
    // Process blocked scripts that should now be allowed
    document.querySelectorAll('script[type="text/blocked"]').forEach(script => {
        // Scripts neutralized by the sync guard's src-setter path never had a real
        // src assigned — the intended URL lives in data-inta-pending-src instead.
        let pendingSrc = script.getAttribute('data-inta-pending-src');
        let src = pendingSrc || script.src || '';
        let stillBlocked;
        if (script.getAttribute('data-inta-blocked') === '1') {
            let category = src ? intaClassifyScriptContent(src) : intaClassifyScriptContent(script.textContent || '');
            stillBlocked = category ? !intaScriptCategoryConsented(category) : false;
        } else {
            stillBlocked = notRequired.test(src) || notRequired.test(script.innerText);
        }
        if (!stillBlocked) {
            // This script should now be allowed - replace it
            let newScript = document.createElement('script');
            newScript.type = 'text/javascript';
            if (src) newScript.src = src;
            if (script.innerText) newScript.text = script.innerText;
            script.parentNode?.replaceChild(newScript, script);
        }
    });

    // Process blocked iframes that should now be allowed
    document.querySelectorAll('inta-consents-iframe[data-src], inta-consents[data-src]').forEach(blocked => {
        let type = blocked.querySelector('.--changePermission')?.dataset?.type;
        if ((type === 'intMarketingCookies' && intaCookieConsents?.advertisementCookies === "checked") ||
            (type === 'intFunctionalCookies' && intaCookieConsents?.functionalCookies === "checked") ||
            (type === 'intStaticsCookies' && intaCookieConsents?.staticsticCookies === "checked")) {

            let iframe = document.createElement('iframe');
            iframe.src = blocked.getAttribute('data-src');
            iframe.border = '0';
            iframe.frameBorder = '0';

            if (blocked.getAttribute('data-class')) {
                iframe.setAttribute('class', blocked.getAttribute('data-class'));
            } else {
                iframe.width = '560';
                iframe.height = '315';
            }

            blocked.parentElement?.replaceChild(iframe, blocked);
        }
    });
}


function restartObserver() {
    // Disconnect any existing observer
    if (window.currentObserver) {
        window.currentObserver.disconnect();
    }

    // Create a new observer with updated consent settings
    window.currentObserver = checkCookieStatus();

    // Process any existing blocked content that should now be allowed
    processExistingScripts();

}

let beforeScriptExecuteListener = function (event, node) {
    let src = node.src || "";

    if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1 || intaCookieConsents?.advertisementCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.staticsticCookies == "false" || intaCookieConsents?.advertisementCookies == "null" && intaCookieConsents?.functionalCookies == "null" && intaCookieConsents?.staticsticCookies == "null"
        || intaCookieConsents?.advertisementCookies == "" && intaCookieConsents?.functionalCookies == "" && intaCookieConsents?.staticsticCookies == ""
        || !FunctionalCheckbox?.checked || !StaticsCheckBox?.checked || !MarketingCheckBox?.checked
    ) {
        if (
            src.indexOf(window.location.hostname) == -1
            && src.indexOf("jquery") == -1 && src.indexOf("elementor") == -1
        ) {
            if (
                notRequired.test(src)
            ) {
                node.defer = true;
                node.async = true;
                node.type = "text/blocked";
                /*if(node.parentElement !== null) node.parentElement.removeChild(node);*/
            }
        } else if (src.indexOf(window.location.hostname) == -1
            && src.indexOf("jquery") > -1) {
            node.type = "text/javascript";
            node.defer = false;
            node.async = false;
        } else {
            node.type = "text/javascript";
            /* if(document.querySelector(scriptTag) === null){
                node.parentElement.appendChild(scriptTag);
            } */
        }

        if (
            notRequired.test(node.innerText)
            && node.innerText.toLowerCase().indexOf("elementor") == -1
        ) {
            node.defer = true;
            node.async = true;
            node.type = "text/blocked";
            /*if(node.parentElement !== null) node.parentElement.removeChild(node);*/
        } else {
            /* if(document.querySelector(scriptTag) === null){
                node.parentElement.appendChild(scriptTag);
            } */
        }
    } else if (intaCookieConsents?.functionalCookies === "checked" &&
        intaCookieConsents?.advertisementCookies === "checked" &&
        intaCookieConsents?.staticsticCookies === "checked"
        || FunctionalCheckbox?.checked && StaticsCheckBox?.checked && MarketingCheckBox?.checked) {
        node.type = "text/javascript";
    }

    if (node.getAttribute("type") === "text/blocked")
        event.preventDefault();
    node.removeEventListener(
        "beforescriptexecute",
        (e, node) => beforeScriptExecuteListener(e, node)
    );

    // Disconnect the observer if it exists
    if (window.currentObserver) {
        window.currentObserver.disconnect();
    }
};

function checkCookieStatus() {
    if (isGtmMode) {
        /* console.log("Observer disabled in GTM mode"); */
        return null; // Return null instead of creating an observer
    }
    /* To get anonymous cookie banner usage */
    /* - - - Observer - - - */

    let __intaObserverPendingMutations = [];
    let __intaObserverDebounceTimer = null;
    let observer = new MutationObserver((mutations) => {
        for (let mi = 0; mi < mutations.length; mi++) {
            __intaObserverPendingMutations.push(mutations[mi]);
        }
        if (__intaObserverDebounceTimer !== null) {
            clearTimeout(__intaObserverDebounceTimer);
        }
        __intaObserverDebounceTimer = setTimeout(function () {
            __intaObserverDebounceTimer = null;
            let batch = __intaObserverPendingMutations;
            __intaObserverPendingMutations = [];
            requestAnimationFrame(() => {
                batch.forEach(({ addedNodes }) => {
                addedNodes.forEach((node) => {

                    if (node.nodeType === 1 && (node.tagName === "IFRAME" || (node.tagName === "DIV" && typeof node.className === "string" && node.className.indexOf("fb-") !== -1))) {
                        allScripts.map((script) => {
                            intaEnsureBlockedIframeMessagesLoaded();
                            let INTAlogo = (window.INT) ? window.INT.settings.logo : (window.INTA?.settings?.logo) ? window.INTA?.settings?.logo : null;
                            loopBlock(addedNodes, script, INTAlogo);
                        })
                    }

                    if (node.nodeType === 1 && node.tagName === "BLOCKQUOTE") {
                        allScripts.map((script) => {
                            addedNodes.forEach((tweet) => {
                                intaEnsureBlockedIframeMessagesLoaded();
                                let INTAlogo = (window.INT) ? window.INT.settings.logo : (window.INTA?.settings?.logo) ? window.INTA?.settings?.logo : null;
                                blockBlockQuotes(tweet, script, INTAlogo);
                            });
                        });
                    }

                    if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1 || intaCookieConsents?.advertisementCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.staticsticCookies == "false" || intaCookieConsents?.advertisementCookies == "null" && intaCookieConsents?.functionalCookies == "null" && intaCookieConsents?.staticsticCookies == "null"
                        || intaCookieConsents?.advertisementCookies == "" && intaCookieConsents?.functionalCookies == "" && intaCookieConsents?.staticsticCookies == "") {
                        if (node.nodeType === 1 && node.tagName === "LINK") {
                            addedNodes.forEach((link) => {
                                let linkSrc = link?.href;
                                if (notRequired.test(linkSrc) && linkSrc !== undefined) {
                                    link.disabled = true;
                                }
                            })
                        }
                    }

                    if (node.nodeType === 1 && node.tagName === "SCRIPT" && node.type !== 'application/ld+json' && node.innerText.indexOf("window.INTA") == -1 && node.innerText.indexOf("window.INT") == -1 && node.innerText.indexOf("window.INTA") == -1 && node.innerText.toLowerCase().indexOf("elementor") == -1 && node.innerText.toLowerCase().indexOf("chic_lite_data") == -1 && node.innerText.toLowerCase().indexOf("mailchimp_public_data") == -1 && node.innerText.toLowerCase().indexOf("monsterinsights_frontend") == -1) {
                        let src = node.src || "";


                        node.removeAttribute("charset");
                        addedNodes.forEach((node) => {

                            src = node.src;
                            if (src.indexOf(window.location.hostname) == -1) {
                                if (src.trim() === "") {
                                    return;
                                }
                                window.foundScripts.push(src);
                                // Filter out scripts that are empty or contain only whitespace

                            }

                            if (intaCookieConsents?.advertisementCookies === "checked" || intaCookieConsents?.functionalCookies === "checked" || intaCookieConsents?.staticsticCookies === "checked"
                                || FunctionalCheckbox?.checked || StaticsCheckBox?.checked || MarketingCheckBox?.checked
                            ) {
                                node.type = "text/javascript";
                                return;
                            }



                            if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1 || getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1 || intaCookieConsents?.advertisementCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.staticsticCookies == "false" || intaCookieConsents?.advertisementCookies == "null" && intaCookieConsents?.functionalCookies == "null" && intaCookieConsents?.staticsticCookies == "null"
                                || intaCookieConsents?.advertisementCookies == "" && intaCookieConsents?.functionalCookies == "" && intaCookieConsents?.staticsticCookies == ""
                                || !FunctionalCheckbox?.checked && !StaticsCheckBox?.checked && !MarketingCheckBox?.checked
                            ) {
                                if (
                                    src.indexOf(window.location.hostname) == -1
                                    && src.indexOf("jquery") == -1 && src.indexOf("elementor") == -1
                                ) {
                                    if (
                                        notRequired.test(src)
                                    ) {
                                        node.type = "text/blocked";
                                        node.defer = true;
                                        node.async = true;

                                        /*if(node.parentElement !== null) node.parentElement.removeChild(node);*/

                                        /* deleteAllCookies(); */
                                    }
                                } else if (src.indexOf(window.location.hostname) == -1
                                    && src.indexOf("jquery") == 1) {
                                    node.type = "text/javascript";
                                    node.defer = false;
                                    node.async = false;
                                }

                                if (
                                    notRequired.test(node.innerText)
                                ) {
                                    node.defer = true;
                                    node.async = true;
                                    node.type = "text/blocked";
                                    /*if(node.parentElement !== null) node.parentElement.removeChild(node);*/
                                    /* deleteAllCookies(); */
                                }
                            } else if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1
                                || intaCookieConsents?.advertisementCookies == "false" &&
                                getCookie(int_hideCookieBannerName) != "" &&
                                getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 &&
                                intaCookieConsents?.functionalCookies == "false" &&
                                getCookie(int_hideCookieBannerName) != "" &&
                                getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 &&
                                intaCookieConsents?.staticsticCookies == "false" ||
                                intaCookieConsents?.advertisementCookies == "null" &&
                                intaCookieConsents?.functionalCookies == "null" &&
                                intaCookieConsents?.staticsticCookies == "null"
                                || intaCookieConsents?.advertisementCookies == "" &&
                                intaCookieConsents?.functionalCookies == "" &&
                                intaCookieConsents?.staticsticCookies == ""
                                || !FunctionalCheckbox?.checked &&
                                !StaticsCheckBox?.checked &&
                                !MarketingCheckBox?.checked
                            ) {
                                if (
                                    src.indexOf(window.location.hostname) == -1
                                    && src.indexOf("jquery") == -1 && src.indexOf("elementor") == -1
                                ) {
                                    if (
                                        notRequired.test(src)
                                    ) {
                                        node.type = "text/blocked";
                                        node.defer = true;
                                        node.async = true;
                                        /*if(node.parentElement !== null) node.parentElement.removeChild(node);*/
                                    }
                                } else if (src.indexOf(window.location.hostname) == -1
                                    && src.indexOf("jquery") == 1) {
                                    node.type = "text/javascript";
                                    node.defer = false;
                                    node.async = false;
                                }
                                if (
                                    notRequired.test(node.innerText)
                                    && node.innerText.toLowerCase().indexOf("elementor") == -1
                                ) {
                                    node.type = "text/blocked";
                                    node.defer = true;
                                    node.async = true;
                                    /*if(node.parentElement !== null) node.parentElement.removeChild(node);*/
                                }
                            }

                            if (node.getAttribute("type") === "text/blocked") {
                                node.addEventListener(
                                    "beforescriptexecute",
                                    (e) => beforeScriptExecuteListener(e, node)
                                );
                            }
                        });
                    } else if (node.nodeType === 1 && node.tagName === "NOSCRIPT" && node.type !== 'application/ld+json' && node.innerText.indexOf("window.INTA") == -1 && node.innerText.indexOf("window.INT") == -1 && node.innerText.toLowerCase().indexOf("elementor") == -1) {
                        if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1 || intaCookieConsents?.advertisementCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.staticsticCookies == "false" || intaCookieConsents?.advertisementCookies == "null" && intaCookieConsents?.functionalCookies == "null" && intaCookieConsents?.staticsticCookies == "null"
                            || intaCookieConsents?.advertisementCookies == "" && intaCookieConsents?.functionalCookies == "" && intaCookieConsents?.staticsticCookies == ""
                            || FunctionalCheckbox?.checked && StaticsCheckBox?.checked && MarketingCheckBox?.checked
                        ) {

                            if (
                                notRequired.test(node.innerText)
                                && node.innerText.toLowerCase().indexOf("elementor") == -1
                            ) {
                                node.defer = true;
                                node.async = true;
                                node.type = "text/blocked";
                                /*if(node.parentElement !== null) node.parentElement.removeChild(node);*/
                                /* deleteAllCookies(); */
                            }
                        } else if (intaCookieConsents?.functionalCookies == "false" && intaCookieConsents?.advertisementCookies == "false" && intaCookieConsents?.staticsticCookies == "false"
                            || !FunctionalCheckbox?.checked && !StaticsCheckBox?.checked && !MarketingCheckBox?.checked
                        ) {

                            if (
                                notRequired.test(node.innerText)
                                && node.innerText.toLowerCase().indexOf("elementor") == -1
                            ) {
                                node.defer = true;
                                node.async = true;
                                node.type = "text/blocked";
                                /*if(node.parentElement !== null) node.parentElement.removeChild(node);*/
                            } else {
                                /* node.parentElement.appendChild(node); */
                            }
                        } else if (intaCookieConsents?.functionalCookies === "checked" &&
                            intaCookieConsents?.advertisementCookies === "checked" &&
                            intaCookieConsents?.staticsticCookies === "checked" ||
                            FunctionalCheckbox?.checked &&
                            StaticsCheckBox?.checked &&
                            MarketingCheckBox?.checked

                        ) {
                            node.type = "text/javascript";
                        }
                    }
                });
            });
        });
        }, 80);
    });
    startObserving(observer, document.documentElement);
    return observer;

}

function startObserving(observer) {
    observer.observe(document.documentElement, {
        childList: !0,
        subtree: !0,
        attributes: true,
        attributeFilter: ["src", "href", "type", "value", "checked", "innerText"],
    })
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        if (!int__cookiesToKeepRegx.test(name)) {
            let localS = window.INTA?.settings === undefined || window.INTA?.settings?.keepInLocalStorage === undefined ? "" : window.INTA?.settings?.keepInLocalStorage;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; " + intCookieDomain + " path=/";
            clearLocalStorage(localS);
        }
    }
}

function clearLocalStorage(ls) {
    if (ls != null) {
        let lsA = Object.values(ls);

        if (lsA.length != 0 || lsA != null) {
            for (let i = 0; i < lsA.length; i++) {
                let item = localStorage.getItem(lsA[i]);
                let itemName = lsA[i];
                localStorage.clear();
                sessionStorage.clear();
                if (item != undefined || item != null) {
                    localStorage.setItem(itemName, item);
                }
            }
        } else {
            localStorage.clear();
            sessionStorage.clear();
        }
    } else {
        localStorage.clear();
        sessionStorage.clear();
    }
}
/* deleteAllCookies();
clearLocalStorage(); */

/** gtag / HubSpot / Shopify / WP / ad-network consent sync — deferred to uc-core (non-blocking). */
function intaRunUcCoreIntegrations() {
    window["optimizely"] = window["optimizely"] || [];
    window["optimizely"].push({
        "type": "optOut",
        "isOptOut": true
    });

    window.pintrk = window.pintrk || function () {
        window.pintrk.queue.push(Array.prototype.slice.call(arguments));
    };
    window.pintrk.queue = window.pintrk.queue || [];
    pintrk('setconsent', false);

    // OpenAI Ads measurement consent mode
    window.oaiq = window.oaiq || function () {
        window.oaiq.q = window.oaiq.q || [];
        window.oaiq.q.push(arguments);
    };
    oaiq('consent', false);

    updateVwoConsent(window.intaCookieConsents);

    intaWpEnsureConsentTypeOptinAnnouncedOnce();

    // Already fired synchronously in uc-boot (see intaSetGtagConsentDefaults); this is a no-op
    // safety net in case boot ran before isGtmMode/gtag were ready for some reason.
    if (typeof intaSetGtagConsentDefaults === 'function') {
        intaSetGtagConsentDefaults();
    }

    if (typeof fbq === "undefined" || typeof fbq === "null") {
        function fbq() { }
    }

    if (!hasConsent("advertisement")) {
        fbq('consent', 'revoke');
    }

    if (hasConsent("advertisement")) {
        gtag('consent', 'update', {
            'personalization_storage': 'granted',
            'ads_data_redaction': 'granted',
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'url_passthrough': true,
        });
        if (typeof pintrk === 'function') {
            try {
                pintrk('setconsent', true);
            } catch (e) { /* ignore */ }
        }
        if (typeof oaiq === 'function') {
            try {
                oaiq('consent', true);
            } catch (e) { /* ignore */ }
        }
        window.uetq.push('consent', 'update', {
            'ad_storage': 'granted'
        });
        window.clarity && window.clarity('consentv2', {
            ad_Storage: "granted",
            analytics_Storage: "denied"
        });
        fbq('consent', 'grant');
        (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;
        (adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 0;
    }

    if (hasConsent("analytics")) {
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'url_passthrough': true,
        });
        window.clarity && window.clarity('consentv2', {
            ad_Storage: "denied",
            analytics_Storage: "granted"
        });
        window.uetq.push('consent', 'update', {
            'analytics_storage': 'granted'
        });
        _paq.push(['setConsentGiven']);
    }

    if (hasConsent("functional")) {
        gtag('consent', 'update', {
            'functionality_storage': 'granted',
        });
        window.uetq.push('consent', 'update', {
            'functionality_storage': 'granted'
        });
    }

    intaWpScheduleSyncWpFromStoredIntastellarConsent();

    function intaIsShopifyStorefrontContext() {
        if (typeof window.Shopify !== "undefined" && typeof window.Shopify.loadFeatures === "function") {
            return true;
        }
        if (document.querySelector('script[src*="cdn.shopify.com"], script[src*="shopifycdn.com"]')) {
            return true;
        }
        if (typeof window.ShopifyAnalytics !== "undefined" || typeof window.ShopifyPay !== "undefined") {
            return true;
        }
        return false;
    }

    if (window._hsp) {
        window._hsp.push([
            'setHubSpotCookieConsent',
            {
                'analytics': intaCookieConsents?.staticsticCookies === "checked",
                'advertisement': intaCookieConsents?.advertisementCookies === "checked",
                'functional': intaCookieConsents?.functionalCookies === "checked",
            }
        ]);
    }

    if (intaIsShopifyStorefrontContext()) {
        window.Shopify = window.Shopify || {};
        window.Shopify.customerPrivacy = window.Shopify.customerPrivacy || {};
        window.Shopify.customerPrivacy.shouldShowBanner = function () { return false; };

        intaShopifyInstallCustomerPrivacyListeners();

        var intaShopifyConsentApiLoadStarted = false;
        function intaShopifyLoadConsentTrackingApi() {
            if (intaShopifyConsentApiLoadStarted) {
                return true;
            }
            if (typeof window.Shopify.loadFeatures !== 'function') {
                return false;
            }
            intaShopifyConsentApiLoadStarted = true;
            window.Shopify.loadFeatures(
                [
                    {
                        name: 'consent-tracking-api',
                        version: '0.1',
                    },
                ],
                (error) => {
                    if (error) {
                        console.error("Shopify consent tracking API error:", error);
                        return;
                    }
                    intaShopifySetTrackingConsentFromIntastellar(() => console.log("Shopify Customer Privacy synced from Intastellar"));
                    window.Shopify.customerPrivacy.shouldShowBanner = function () {
                        return false;
                    };
                },
            );
            return true;
        }

        if (!intaShopifyLoadConsentTrackingApi()) {
            var intaShopifyRetries = 0;
            var intaShopifyRetryId = setInterval(function () {
                if (intaShopifyLoadConsentTrackingApi() || ++intaShopifyRetries > 50) {
                    clearInterval(intaShopifyRetryId);
                }
            }, 100);
        }
    }
}
window.intaRunUcCoreIntegrations = intaRunUcCoreIntegrations;

if (!isGtmMode) {
    checkCookieStatus();
}

// Recommended approach for monitoring: use addEventListener to detect user consent actions (TCF)
function registerTCFEventListener(retries) {
    retries = retries || 0;
    if (typeof window.__tcfapi === 'function') {
        window.__tcfapi('addEventListener', 2, function (tcData, success) {
            if (success && tcData.eventStatus === 'useractioncomplete') {
                if (window.dataLayer) window.dataLayer.push({ event: 'intastellar_tcf_useractioncomplete', tcData: tcData });
                window.dispatchEvent(new CustomEvent('intastellar_consent_user_action', { detail: tcData }));
            }
        });
    } else if (retries < 50) {
        setTimeout(function () { registerTCFEventListener(retries + 1); }, 100);
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerTCFEventListener);
} else {
    registerTCFEventListener();
}

if (typeof intaLoadUcCore !== "function") {
    intaRunUcCoreIntegrations();
}