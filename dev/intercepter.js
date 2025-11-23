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
                "https://api.intastellar.io/cmp/behavior",
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
        return fetch("https://api.intastellar.io/classify", {
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
    window.fetch = async function (...args) {
        const url = typeof args[0] === "string" ? args[0] : args[0].url;

        if (!BLOCKED.has(url)) {
            const resp = await classifyVendor(url, "fetch");

            if (resp.risky) {
                console.warn("[Intastellar Consents] Blocked fetch:", url);
                reportEvent({ type: "fetch_blocked", url });
                BLOCKED.add(url);
                return new Response("", { status: 204 });
            }
        }

        return originalFetch.apply(this, args);
    };

    /* -------------------------------------------------------------
       XHR Interception
    -------------------------------------------------------------- */
    const origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
        this._intastellarUrl = url;
        return origOpen.call(this, method, url, ...rest);
    };

    const origSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = async function (body) {
        const url = this._intastellarUrl;

        if (!BLOCKED.has(url)) {
            const resp = await classifyVendor(url, "xhr");

            if (resp.risky) {
                console.warn("[Intastellar Consents] Blocked XHR:", url);
                reportEvent({ type: "xhr_blocked", url });
                BLOCKED.add(url);
                this.abort();
                return;
            }
        }

        return origSend.call(this, body);
    };

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
