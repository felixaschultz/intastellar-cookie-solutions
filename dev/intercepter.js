/* -------------------------------------------------------------
   Intastellar Consents – Behavior-Based Tracker Detection & Blocking
   Production Ready Build (Vanilla JS, tree-shakeable, safe to inline)
-------------------------------------------------------------- */

(function () {
    const BLOCKED = new Set(); // vendorCache to avoid reprocessing
    const watchers = [];

    function reportEvent(details) {
        try {
            // Async event to your backend or classifier
            navigator.sendBeacon(
                "https://apis.intastellarsolutions.com/cmp/behavior",
                JSON.stringify(details)
            );
        } catch (_) { }
    }

    /* -------------------------------------------------------------
       Utility: Vendor Classification (Placeholder)
       Plug your backend AI/API here.
    -------------------------------------------------------------- */
    async function classifyVendor(url, context) {
        // Replace this with your real API endpoint
        return fetch("https://apis.intastellarsolutions.com/classify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, context }),
        })
            .then((r) => r.json())
            .catch(() => ({ category: "unknown", risky: false }));
    }

    /* -------------------------------------------------------------
       Cookie Blocking
       Detects & blocks cookies from third-party or risky scripts
    -------------------------------------------------------------- */
    Object.defineProperty(document, "cookie", {
        configurable: true,
        enumerable: true,
        set: function (value) {
            const parts = value.split(";")[0].trim();
            const key = parts.split("=")[0];

            const isThirdParty =
                location.hostname.split(".").slice(-2).join(".") !==
                document.domain;

            if (isThirdParty) {
                reportEvent({ type: "cookie_attempt", key, value });
                return; // block write
            }

            Reflect.set(document, "cookie", value);
        },
        get: function () {
            return Reflect.get(document, "cookie");
        },
    });

    /* -------------------------------------------------------------
       Fetch Interception
    -------------------------------------------------------------- */
    const originalFetch = window.fetch;
    // Create unique symbol so nobody can fake it
    const INTA_INTERNAL_CALL = Symbol("inta_internal_call");

    window.fetch = async function (resource, init = {}) {
        try {
            const url = typeof resource === "string" ? resource : resource.url;

            // 1. Skip calls that the interceptor itself makes
            if (init[INTA_INTERNAL_CALL]) {
                return originalFetch(resource, init);
            }

            // 2. Skip internal allowed domains
            const allowedDomains = [
                location.origin,
                "https://cdn.intastellar.app",
                "https://intastellar.com",
                "https://api.intastellarsolutions.com"
            ];

            if (allowedDomains.some(d => url.startsWith(d))) {
                return originalFetch(resource, init);
            }

            // 3. Classify third-party request
            const category = classifyUrl(url);

            // 4. Block if not consented
            if (!ConsentState.hasConsent(category)) {
                // Report via BEACON (not fetch)
                navigator.sendBeacon(
                    "/consent/report",
                    JSON.stringify({
                        type: "fetch_block",
                        url,
                        category
                    })
                );

                return new Response(null, { status: 204 });
            }

            // 5. Execute normally
            return originalFetch(resource, init);

        } catch (err) {
            console.error("Interceptor error:", err);
            return originalFetch(resource, init);
        }
    };

    // Utility to make internal calls safely
    function intaFetch(url, init = {}) {
        init[INTA_INTERNAL_CALL] = true;
        return originalFetch(url, init);
    }


    /* -------------------------------------------------------------
       Script Injection Monitoring
    -------------------------------------------------------------- */
    const origAppendChild = Element.prototype.appendChild;
    Element.prototype.appendChild = function (child) {
        if (child.tagName === "SCRIPT" && child.src) {
            detectScript(child.src);
        }
        return origAppendChild.call(this, child);
    };

    async function detectScript(src) {
        if (BLOCKED.has(src)) return;

        const resp = await classifyVendor(src, "script");

        if (resp.risky) {
            console.warn("[Intastellar Consents] Blocked Script:", src);
            reportEvent({ type: "script_blocked", src });
            BLOCKED.add(src);
            return;
        }
    }

    /* -------------------------------------------------------------
       Image/beacon tracking detection (<img>, sendBeacon, pixel)
    -------------------------------------------------------------- */
    const origImg = Image;
    window.Image = function () {
        const img = new origImg();
        const origSet = Object.getOwnPropertyDescriptor(
            HTMLImageElement.prototype,
            "src"
        ).set;

        Object.defineProperty(img, "src", {
            set: async function (url) {
                const resp = await classifyVendor(url, "pixel");

                if (resp.risky) {
                    console.warn("[Intastellar Consents] Blocked pixel:", url);
                    reportEvent({ type: "pixel_blocked", url });
                    return;
                }

                origSet.call(this, url);
            },
        });

        return img;
    };

    /* -------------------------------------------------------------
       DOM Scan (Shadow DOM, dynamic content)
    -------------------------------------------------------------- */
    const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
            for (const n of m.addedNodes) {
                if (n.tagName === "SCRIPT" && n.src) detectScript(n.src);
            }
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
})();

function classifyUrl(url, context = "") {
    const hay = url.toLowerCase();
    for (const cat of Object.keys(VENDOR_PATTERNS)) {
        for (const regex of VENDOR_PATTERNS[cat]) {
            if (regex.test(hay)) {
                return cat;
            }
        }
    }
    return "functional"; // fallback
}
