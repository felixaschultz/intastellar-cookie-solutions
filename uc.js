/*
 *  Cookie Consents Banner by Intastellar Solutions, International
 *  intastellarsolutions.com/gdpr-cookiebanner
 *  consents.cdn.intastellarsolutions.com/uc.js
 *  @copy 2022-2025 Intastellar Solutions, International
 *
*/
/* - - - Setup - - - */
const intaCookiePref = "IntastellarConsentSolution";
const int_hideCookieBannerName = window.int_hideCookieBannerName = intaCookiePref;
const int_FunctionalCookies = intaCookiePref + ":Functional-cookies";
const int_marketingCookies = intaCookiePref + ":Advertisment-cookies";
const int_staticsticCookies = intaCookiePref + ":Statistics-cookies";
const int_visitorCheck = intaCookiePref + "visitorCheck";
const button__acceptAll = document.querySelector(".intastellarCookieBanner__acceptAll");
const button__acceptAllNecessary = document.querySelector(".intastellarCookieBanner__acceptNecessary");
let intastellarShowHideDetailsText = "Show details";
let adsbygoogle = window.adsbygoogle || [];
const intastellarCookieBannerRootDomain = "https://consents.cdn.intastellarsolutions.com";
const intastellarAssetsCDNdomain = "https://www.intastellar-consents.com";
const intaCookieConsents = window.intaCookieConsents = (getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents : null;
const intaCookieConsentsUserId = (getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.uid : null;
const isGtmMode = findScriptParameter("ref") === "gtm";
const isWordPress = document.getElementById('intastellar-gdpr-settings-js') !== null;
const FunctionalCheckbox = document.querySelector("#functional");
const StaticsCheckBox = document.querySelector("#statics");
const MarketingCheckBox = document.querySelector("#marketing");
const pluginSource = findScriptParameter("utm_source") === undefined ? "Intastellar+Solutions+Cookiebanner" : findScriptParameter("utm_source");
window.platform = findScriptParameter("utm_source") === undefined ? "Manual" : findScriptParameter("utm_source");
let poweredBy = "";
window.dataLayer = window.dataLayer || [];
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
}

function gtag() {
    dataLayer.push(arguments);
}

if (window._intaConsentInitialized) {
    console.log('Intastellar consent already initialized, skipping...');
}

window._intaConsentInitialized = true;

if (!isGtmMode && !window._gtagDefaultFired && typeof gtag === 'function') {
    // Only set defaults if GTM hasn't already done so
    if (!window.google_tag_manager || !window.google_tag_manager['consent_default_set']) {
        // Strict opt-in regions (GDPR-style)
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
            "region": ['EU', 'UK', 'CH', 'NO', 'IS', 'LI', 'CA', 'BR', 'ZA', 'TR', 'AR', 'IL']
        });
        console.log("Intastellar Consents: Applied STRICT defaults (EU/UK/CA/BR/etc.)");

        // California opt-out (Do Not Sell)
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
            "region": ['US-CA']
        });
        console.log("Intastellar Consents: Applied CALIFORNIA defaults (US-CA)");

        // Rest of the world fallback
        gtag('consent', 'default', {
            "ad_storage": 'granted',
            "personalization_storage": 'granted',
            "analytics_storage": 'granted',
            "functionality_storage": 'granted',
            "ads_data_redaction": 'granted',
            "ad_user_data": 'granted',
            "ad_personalization": 'granted',
            "security_storage": 'granted',
            "url_passthrough": true,
            "wait_for_update": 500
        });
        console.log("Intastellar Consents: Applied REST-OF-WORLD defaults");
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
} else if (isGtmMode) {
    console.log('GTM mode detected - skipping consent default initialization');
}

if (typeof fbq === "undefined" || typeof fbq === "null") {
    function fbq() { }
}


window.clarity && window.clarity('consentv2', {
    ad_Storage: "denied",
    analytics_Storage: "denied"
});

window.uetq = window.uetq || [];
window.uetq.push('consent', 'default', {
    'ad_storage': 'denied'
});
window.disableHubSpotCookieBanner = true;
var _hsp = (window._hsp = window._hsp || []);
/* _hsp.push(['doNotTrack']);
_hsp.push(['revokeCookieConsent']); */
window._hsp.push([
    'setHubSpotCookieConsent',
    {
        'analytics': intaCookieConsents?.staticsticCookies === "checked",
        'advertisement': intaCookieConsents?.advertisementCookies === "checked",
        'functional': intaCookieConsents?.functionalCookies === "checked",
    }
]);

window.Shopify ?? window?.Shopify?.loadFeatures(
    [
        {
            name: 'consent-tracking-api',
            version: '0.1',
        },
    ],
    error => {
        if (error) {
            // Rescue error
            console.error(error);
        }
        // If error is false, the API has loaded and ready to use!
        window.Shopify.customerPrivacy.setTrackingConsent(
            {
                'analytics': intaCookieConsents?.staticsticCookies === "checked",
                'marketing': intaCookieConsents?.advertisementCookies === "checked",
                'preferences': intaCookieConsents?.functionalCookies === "checked",
            },
            () => console.log("Consent captured")
        );
    },
);

function optOutCCPA() {
    gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
    });

    // Optional: store the choice locally so you don’t ask again
    localStorage.setItem('ccpa_opt_out', 'true');

    alert("Your opt-out has been saved. We won’t sell or share your personal information.");
}

// --- Server-Side Tagging & Interception Implementation ---
// Helper: Determine consent type for a given URL using allScripts regex
function getConsentTypeForUrl(url) {
    if (!url) return 'marketing';
    for (let i = 0; i < allScripts.length; i++) {
        const scriptType = allScripts[i].type;
        const patterns = allScripts[i].scripts;
        for (let j = 0; j < patterns.length; j++) {
            try {
                const regex = new RegExp(patterns[j], 'i');
                if (regex.test(url)) {
                    // statics => statistics
                    if (scriptType === 'statics') return 'statistics';
                    return scriptType;
                }
            } catch (e) { /* ignore invalid regex */ }
        }
    }
    // Default fallback
    return 'marketing';
}

// Helper: Send intercepted data to backend for storage/categorization
async function sendToBackend(data) {
    try {
        // Use await to ensure the fetch is handled as an async background request
        await fetch('/tests/backend/test.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } catch (e) {
        // Optionally log error
        console.log(e);
    }
    // Never trigger navigation or download
    return;
}

// Consent check helper
function hasConsent(type) {
    // type: 'functional', 'statistics', 'marketing'
    if (!window.intaCookieConsents) return false;
    if (type === 'functional') return window.intaCookieConsents.functionalCookies === 'checked';
    if (type === 'statistics') return window.intaCookieConsents.staticsticCookies === 'checked';
    if (type === 'marketing') return window.intaCookieConsents.advertisementCookies === 'checked';
    return false;
}

const ALLOWLIST = [
    location.origin,
    "https://intastellar.app",
    "https://www.intastellarsolutions.com",
    "https://analytics.intastellarsolutions.com",
    "https://api.intastellarsolutions.com"
];


// Intercept fetch with consent check
const originalFetch = window.fetch;
window.fetch = function (resource, config) {
    const url = typeof resource === 'string' ? resource : resource.url;
    if (ALLOWLIST.some(domain => url.startsWith(domain))) {
        return originalFetch.apply(this, arguments);
    }
    const isExternal = !url.startsWith(window.location.origin);
    if (isExternal) {
        const consentType = getConsentTypeForUrl(url);
        if (!hasConsent(consentType)) {
            if (typeof intastellarDevMode !== 'undefined' && intastellarDevMode) {
                console.log('[GDPR] Blocked fetch:', url, 'type:', consentType);
            }
            // Silently block: return a resolved Promise with undefined
            return Promise.resolve(undefined);
        }
    }
    return originalFetch.apply(this, arguments);
};

// Intercept XMLHttpRequest with consent check
const OriginalXHR = window.XMLHttpRequest;
function CustomXHR() {
    const xhr = new OriginalXHR();
    const open = xhr.open;
    xhr.open = function (method, url, ...args) {
        if (ALLOWLIST.some(domain => url.startsWith(domain))) {
            return open.apply(this, arguments);
        }
        const isExternal = !url.startsWith(window.location.origin);
        if (isExternal) {
            const consentType = getConsentTypeForUrl(url);
            if (!hasConsent(consentType)) {
                if (typeof intastellarDevMode !== 'undefined' && intastellarDevMode) {
                    console.log('[GDPR] Blocked XHR:', url, 'type:', consentType);
                }
                // Silently block: do not send request
                return; // open not called, so request never sent
            }
        }
        return open.apply(this, arguments);
    };
    return xhr;
}
window.XMLHttpRequest = CustomXHR;
// Intercept navigator.sendBeacon with consent check
const originalSendBeacon = navigator.sendBeacon;
navigator.sendBeacon = function (url, data) {
    // Prevent recursion for backend endpoint
    if (ALLOWLIST.some(domain => url.startsWith(domain))) {
        return originalSendBeacon.apply(this, arguments);
    }
    const isExternal = !url.startsWith(window.location.origin);
    if (isExternal) {
        const consentType = getConsentTypeForUrl(url);
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


if (intaCookieConsents?.advertisementCookies !== "checked") {
    fbq('consent', 'revoke');
}

const IntastellarCookieConsent = {
    renew: function () {
        document.querySelector(".intastellarCookieConstents").classList.add("--active");
        document.querySelector("html").classList.add("noScroll");
        dataLayer.push({ 'event': 'intastellar_consents_widget_visible' });
    },
    remove: function (template) {
        template.classList.remove("--active");
    },
    initialize: function (template) {
        function initTemplate() {
            if (!document.querySelector(".intastellarCookieConstents") && template !== false) {
                document.body.append(template);
            }

            if (!getCookie(int_hideCookieBannerName)) {
                const el = document.querySelector(".intastellarCookieConstents");
                if (el) el.classList.add("--active");
                if (window.dataLayer) {
                    window.dataLayer.push({ event: "intastellar_consents_widget_visible" });
                }
            }
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
                console.info("Using existing INTA");
                initTemplate();

            } else {
                console.info("INTA not found, loading remote config…");
                loadRemoteConfig().then(() => {
                    initTemplate();
                });
            }
        });
    }
}
let scriptTypelang = {};
let settingsMessage;
const foundScripts = window.foundScripts = [];
const intCookieIcon = intastellarAssetsCDNdomain + "/assets/icons/cookie_settings.svg";
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
            color: "rgba(0, 51, 153, 1)",
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

function findScriptParameter(value) {
    const currentURL = document.currentScript.src;

    if (currentURL.indexOf(value) > -1) {
        let url = new URL(currentURL);
        let param = url.searchParams;
        return param.get(value);
    }

    return undefined;

}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function encodeIntaConsentsObject(string, base) {
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

const intastellarDevMode = (function () {
    return window.location.host === "localhost"
        || window.location.host.indexOf("127.0.0.1") > -1 && window.INTA.dev === true
        || window.location.host.indexOf("0.0.0.0") > -1 && window.INTA.dev === true
        || window.location.host.indexOf("192.168.") > -1 && window.INTA.dev === true
        || window.location.host.indexOf("::1") > -1 && window.INTA.dev === true
        ? true : false;
})();

/* Object for supported languages */
const intastellarSupportedLanguages = {
    english: {
        saveSettings: "Decline All",
        necessary: { // Object for cookie info
            title: "Necessary", //"Necessary Cookies:",
            description: "Required web technologies and cookies are essential for making our website accessible and functional for you. They enable key features, such as navigation, proper display in your browser, and managing your consent preferences. Without these technologies and cookies, our website cannot function properly.",
        },
        functional: {
            title: "Functional",
            description: "Functional cookies allow us to store information that alters how the website appears or behaves, such as your preferred language or region."
        },
        statisic: {
            title: "Statics",
            description: "We strive to continuously enhance the user experience and performance of our website. To achieve this, we use analytical technologies (including cookies) that pseudonymously track and assess how, when, and which features and content of our website are used. This data helps us improve our site for users."
        },
        marketing: {
            title: "Marketing",
            description: "We use web technologies (including cookies) from trusted partners to deliver content and advertisements tailored specifically to you on websites and social media platforms. This content is selected and displayed based on your browsing behavior. Advertising and marketing cookies are used to show relevant ads and campaigns, tracking visitors across sites and gathering information to present personalized advertisements."
        },
    },
    german: {
        saveSettings: "Ablehnen",
        necessary: {
            title: "Erforderliche", //"Necessary Cookies:",
            description: "Erforderliche Webtechnologien und Cookies sind notwendig, um unsere Website für Sie zugänglich und funktionsfähig zu machen. Sie gewährleisten grundlegende Funktionen wie die Navigation auf der Seite, die korrekte Anzeige im Browser und das Einholen Ihrer Einwilligung. Ohne diese Technologien und Cookies ist die Nutzung unserer Website nicht möglich.",
        },
        functional: {
            title: "Funktionel",
            description: "Funktionale Cookies ermöglichen es, Informationen zu speichern, die das Erscheinungsbild oder Verhalten der Website anpassen, wie zum Beispiel Ihre bevorzugte Sprache oder Region."
        },
        statisic: {
            title: "Statistik",
            description: "Wir möchten die Benutzerfreundlichkeit und Leistung unserer Websites kontinuierlich verbessern. Daher setzen wir Analysetechnologien (einschließlich Cookies) ein, die pseudonym ermitteln und auswerten, welche Funktionen und Inhalte unserer Websites wie und wie oft genutzt werden. Auf dieser Basis können wir unsere Websites für die Nutzer optimieren."
        },
        marketing: {
            title: "Werbung",
            description: "Werbe- oder Marketing-Cookies werden eingesetzt, um Besuchern relevante Anzeigen und Marketingkampagnen anzuzeigen. Diese Cookies verfolgen Besucher über verschiedene Websites und sammeln Informationen, um personalisierte Werbung bereitzustellen."
        },
    },
    danish: {
        saveSettings: "Afvis",
        necessary: {
            title: "Nødvendige", //"Necessary Cookies:",
            description: "Påkrævede webteknologier og cookies gør vores hjemmeside teknisk tilgængelig og brugbar for dig. Dette gælder grundlæggende basisfunktioner såsom navigation rundt på hjemmesiden, korrekt visning i din internetbrowser eller anmodning om dit samtykke. Uden disse webteknologier og cookies fungerer vores hjemmeside ikke.",
        },
        functional: {
            title: "Funktion",
            description: "Funktionelle cookies gør det muligt at gemme information, der ændrer måden hjemmesiden fremstår eller fungerer på. For eksempel dit foretrukne sprog eller område."
        },
        statisic: {
            title: "Statistik",
            description: "Vi ønsker konstant at forbedre brugervenligheden og ydeevnen på vores hjemmesider. Af denne grund bruger vi analyseteknologier (inklusive cookies), som pseudonymt måler og vurderer, hvilke funktioner og indhold på vores hjemmesider der bruges, hvordan og hvor ofte. På dette grundlag kan vi forbedre vores hjemmesider for brugerne."
        },
        marketing: {
            title: "Marketing",
            description: "Vi bruger webteknologier (også cookies) fra udvalgte partnere for at kunne vise dig indhold og annoncer, der er specielt skræddersyet til dig på hjemmesider og sociale medier. Dette indhold udvælges og vises på baggrund af din brugsadfærd. Annonce- eller marketingcookies bruges til at give besøgende relevante annoncer og marketingkampagner. Disse cookies sporer besøgende på tværs af websteder og indsamler oplysninger for at levere tilpassede annoncer."
        }
    },
    spanish: {
        saveSettings: "Rechazar",
        necessary: {
            title: "Necesario", //"Necessary Cookies:",
            description: "Las tecnologías web y las cookies necesarias hacen que nuestro sitio web sea técnicamente accesible y utilizable para usted. Esto se aplica a funcionalidades básicas fundamentales como la navegación en el sitio web, la visualización correcta en su navegador de Internet o la solicitud de su consentimiento. Sin estas tecnologías web y cookies, nuestro sitio web no funciona.",
        },
        functional: {
            title: "Funcional",
            description: "Las cookies funcionales permiten guardar información que cambia la forma en que aparece o actúa el sitio web. Por ejemplo, su idioma o región preferidos."
        },
        statisic: {
            title: "Estadísticas",
            description: "Queremos mejorar constantemente la facilidad de uso y el rendimiento de nuestros sitios web. Por esta razón, utilizamos tecnologías de análisis (incluidas las cookies) que miden y evalúan de forma seudónima qué funciones y contenidos de nuestros sitios web se utilizan, cómo y con qué frecuencia. Sobre esta base, podemos mejorar nuestros sitios web para los usuarios."
        },
        marketing: {
            title: "Marketing",
            description: "Utilizamos tecnologías web (también cookies) de socios seleccionados para poder mostrarle contenido y publicidad especialmente adaptados a usted en sitios web y redes sociales. Este contenido se selecciona y muestra en función de su comportamiento de uso. Las cookies publicitarias o de marketing se utilizan para proporcionar a los visitantes anuncios y campañas de marketing relevantes. Estas cookies rastrean a los visitantes a través de sitios web y recopilan información para proporcionar anuncios personalizados."
        }
    },
    french: {
        saveSettings: "Refuser",
        necessary: {
            title: "Nécessaire", //"Necessary Cookies:",
            description: "Les technologies web et les cookies nécessaires rendent notre site web techniquement accessible et utilisable pour vous. Cela s'applique aux fonctionnalités de base fondamentales telles que la navigation sur le site web, l'affichage correct dans votre navigateur Internet ou la demande de votre consentement. Sans ces technologies web et cookies, notre site web ne fonctionne pas.",
        },
        functional: {
            title: "Fonctionnel",
            description: "Les cookies fonctionnels permettent de stocker des informations qui modifient l'apparence ou le comportement du site web. Par exemple, votre langue ou région préférée."
        },
        statisic: {
            title: "Statistiques",
            description: "Nous voulons constamment améliorer la convivialité et les performances de nos sites web. Pour cette raison, nous utilisons des technologies d'analyse (y compris des cookies) qui mesurent et évaluent de manière pseudonyme quelles fonctions et quels contenus de nos sites web sont utilisés, comment et à quelle fréquence. Sur cette base, nous pouvons améliorer nos sites web pour les utilisateurs."
        },
        marketing: {
            title: "Marketing",
            description: "Nous utilisons des technologies web (également des cookies) de partenaires sélectionnés pour pouvoir vous montrer du contenu et de la publicité spécialement adaptés à vous sur des sites web et des réseaux sociaux. Ce contenu est sélectionné et affiché sur la base de votre comportement d'utilisation. Les cookies publicitaires ou de marketing sont utilisés pour fournir aux visiteurs des annonces et des campagnes marketing pertinentes. Ces cookies suivent les visiteurs à travers les sites web et collectent des informations pour fournir des annonces personnalisées."
        }
    },
    italian: {
        saveSettings: "Rifiuta",
        necessary: {
            title: "Necessario",
            description: "Le tecnologie web e i cookie necessari rendono il nostro sito web tecnicamente accessibile e utilizzabile per te. Questo si applica a funzionalità di base fondamentali come la navigazione sul sito web, la visualizzazione corretta nel tuo browser Internet o la richiesta del tuo consenso. Senza queste tecnologie web e cookie, il nostro sito web non funziona.",
        },
        functional: {
            title: "Funzionale",
            description: "I cookie funzionali consentono di salvare informazioni che modificano l'aspetto o il comportamento del sito web. Ad esempio, la tua lingua o regione preferita."
        },
        statisic: {
            title: "Statistiche",
            description: "Vogliamo migliorare costantemente l'usabilità e le prestazioni dei nostri siti web. Per questo motivo utilizziamo tecnologie di analisi (compresi i cookie) che misurano e valutano in modo pseudonimo quali funzioni e contenuti dei nostri siti web vengono utilizzati, come e con quale frequenza. Su questa base possiamo migliorare i nostri siti web per gli utenti."
        },
        marketing: {
            title: "Marketing",
            description: "Utilizziamo tecnologie web (anche cookie) da partner selezionati per poterti mostrare contenuti e pubblicità appositamente studiati per te su siti web e social media. Questi contenuti vengono selezionati e visualizzati in base al tuo comportamento d'uso. I cookie pubblicitari o di marketing vengono utilizzati per fornire ai visitatori annunci e campagne di marketing pertinenti. Questi cookie tracciano i visitatori tra i siti web e raccolgono informazioni per fornire annunci personalizzati."
        }
    },
    dutch: {
        saveSettings: "Weigeren",
        necessary: {
            title: "Noodzakelijk",
            description: "Noodzakelijke webtechnologieën en cookies maken onze website technisch toegankelijk en bruikbaar voor u. Dit geldt voor fundamentele basisfunctionaliteiten zoals navigatie op de website, correcte weergave in uw internetbrowser of het vragen van uw toestemming. Zonder deze webtechnologieën en cookies werkt onze website niet.",
        },
        functional: {
            title: "Functioneel",
            description: "Functionele cookies maken het mogelijk informatie op te slaan die de manier waarop de website verschijnt of werkt, verandert. Bijvoorbeeld uw voorkeurstaal of regio."
        },
        statisic: {
            title: "Statistieken",
            description: "We willen de gebruiksvriendelijkheid en prestaties van onze websites voortdurend verbeteren. Daarom gebruiken we analyse technologieën (inclusief cookies) die pseudoniem meten en evalueren welke functies en inhoud van onze websites worden gebruikt, hoe en hoe vaak. Op basis hiervan kunnen we onze websites verbeteren voor gebruikers."
        },
        marketing: {
            title: "Marketing",
            description: "We gebruiken webtechnologieën (ook cookies) van geselecteerde partners om u inhoud en advertenties te tonen die speciaal op u zijn afgestemd op websites en sociale media. Deze inhoud wordt geselecteerd en weergegeven op basis van uw gebruiksgedrag. Advertentie- of marketingcookies worden gebruikt om bezoekers relevante advertenties en marketingcampagnes te bieden. Deze cookies volgen bezoekers over websites heen en verzamelen informatie om aangepaste advertenties te leveren."
        }
    },
    portuguese: {
        saveSettings: "Recusar",
        necessary: {
            title: "Necessário",
            description: "As tecnologias web e os cookies necessários tornam o nosso site tecnicamente acessível e utilizável para si. Isto aplica-se a funcionalidades básicas fundamentais como a navegação no site, a visualização correta no seu navegador de Internet ou o pedido do seu consentimento. Sem estas tecnologias web e cookies, o nosso site não funciona.",
        },
        functional: {
            title: "Funcional",
            description: "Os cookies funcionais permitem guardar informações que alteram a forma como o site aparece ou se comporta. Por exemplo, o seu idioma ou região preferidos."
        },
        statisic: {
            title: "Estatísticas",
            description: "Queremos melhorar constantemente a usabilidade e o desempenho dos nossos sites. Para isso, utilizamos tecnologias de análise (incluindo cookies) que medem e avaliam de forma pseudónima quais as funções e conteúdos dos nossos sites que são utilizados, como e com que frequência. Com base nisso, podemos melhorar os nossos sites para os utilizadores."
        },
        marketing: {
            title: "Marketing",
            description: "Utilizamos tecnologias web (também cookies) de parceiros selecionados para lhe mostrar conteúdo e publicidade especialmente adaptados a si em sites web e redes sociais. Este conteúdo é selecionado e exibido com base no seu comportamento de utilização. Os cookies publicitários ou de marketing são utilizados para fornecer aos visitantes anúncios e campanhas de marketing relevantes. Estes cookies rastreiam visitantes em sites web e recolhem informações para fornecer anúncios personalizados."
        }

    },
    russian: {
        saveSettings: "Отклонить",
        necessary: {
            title: "Необходимые", //"Necessary Cookies:",
            description: "Необходимые веб-технологии и файлы cookie делают наш сайт технически доступным и используемым для вас. Это относится к основным базовым функциям, таким как навигация по сайту, правильное отображение в вашем интернет-браузере или запрос вашего согласия. Без этих веб-технологий и файлов cookie наш сайт не работает.",
        },
        functional: {
            title: "Функциональные",
            description: "Функциональные файлы cookie позволяют сохранять информацию, которая изменяет внешний вид или действие сайта. Например, ваш предпочитаемый язык или регион."
        },
        statisic: {
            title: "Статистика",
            description: "Мы постоянно стремимся улучшить удобство использования и производительность наших сайтов. Для этого мы используем технологии анализа (включая файлы cookie), которые псевдонимно измеряют и оценивают, какие функции и содержимое наших сайтов используются, как и как часто. На этой основе мы можем улучшить наши сайты для пользователей."
        },
        marketing: {
            title: "Маркетинг",
            description: "Мы используем веб-технологии (также файлы cookie) от выбранных партнеров, чтобы показывать вам контент и рекламу, специально подобранную для вас на сайтах и социальных сетях. Этот контент выбирается и отображается на основе вашего поведения. Файлы cookie для рекламы или маркетинга используются для предоставления посетителям релевантных объявлений и маркетинговых кампаний. Эти файлы cookie отслеживают посетителей по различным сайтам и собирают информацию для предоставления настраиваемых объявлений."
        }
    },
    swedish: {
        saveSettings: "Avvisa",
        necessary: {
            title: "Nödvändiga", //"Necessary Cookies:",
            description: "Nödvändiga webbteknologier och cookies gör vår webbplats tekniskt tillgänglig och användbar för dig. Detta gäller grundläggande basfunktioner som navigering på webbplatsen, korrekt visning i din webbläsare eller begäran om ditt samtycke. Utan dessa webbteknologier och cookies fungerar inte vår webbplats.",
        },
        functional: {
            title: "Funktionell",
            description: "Funktionella cookies gör det möjligt att spara information som ändrar hur webbplatsen visas eller fungerar. Till exempel ditt föredragna språk eller region."
        },
        statisic: {
            title: "Statistik",
            description: "Vi vill ständigt förbättra användarvänligheten och prestandan på våra webbplatser. Därför använder vi analys tekniker (inklusive cookies) som pseudonymt mäter och utvärderar vilka funktioner och innehåll på våra webbplatser som används, hur och hur ofta. På denna grund kan vi förbättra våra webbplatser för användarna."
        },
        marketing: {
            title: "Marknadsföring",
            description: "Vi använder webbteknologier (även cookies) från utvalda partners för att kunna visa dig innehåll och annonser som är speciellt anpassade för dig på webbplatser och sociala medier. Detta innehåll väljs och visas baserat på ditt användarbeteende. Annons- eller marknadsföringscookies används för att ge besökare relevanta annonser och marknadsföringskampanjer. Dessa cookies spårar besökare över webbplatser och samlar in information för att tillhandahålla anpassade annonser."
        }
    },
    norwegian: {
        saveSettings: "Avslå",
        necessary: {
            title: "Nødvendige", //"Necessary Cookies:",
            description: "Nødvendige webteknologier og informasjonskapsler gjør nettstedet vårt teknisk tilgjengelig og brukbart for deg. Dette gjelder grunnleggende funksjoner som navigasjon på nettstedet, riktig visning i nettleseren din eller forespørsel om samtykke. Uten disse webteknologiene og informasjonskapslene fungerer ikke nettstedet vårt.",
        },
        functional: {
            title: "Funksjonell",
            description: "Funksjonelle informasjonskapsler gjør det mulig å lagre informasjon som endrer måten nettstedet vises eller fungerer på. For eksempel ditt foretrukne språk eller region."
        },
        statisic: {
            title: "Statistikk",
            description: "Vi ønsker å forbedre brukervennligheten og ytelsen til nettstedene våre kontinuerlig. Derfor bruker vi analyse teknologier (inkludert informasjonskapsler) som måler og evaluerer pseudonymt hvilke funksjoner og innhold på nettstedene våre som brukes, hvordan og hvor ofte. På denne bakgrunn kan vi forbedre nettstedene våre for brukerne."
        },
        marketing: {
            title: "Markedsføring",
            description: "Vi bruker webteknologier (også informasjonskapsler) fra utvalgte partnere for å kunne vise deg innhold og annonser som er spesielt tilpasset deg på nettsteder og sosiale medier. Dette innholdet velges og vises basert på bruksatferden din. Annonse- eller markedsføringskapsler brukes til å gi besøkende relevante annonser og markedsføringskampanjer. Disse informasjonskapslene sporer besøkende på tvers av nettsteder og samler inn informasjon for å levere tilpassede annonser."
        }
    },
    finnish: {
        saveSettings: "Hylätä",
        necessary: {
            title: "Välttämätön", //"Necessary Cookies:",
            description: "Välttämättömät verkkoteknologiat ja evästeet tekevät verkkosivustostamme teknisesti saavutettavan ja käyttökelpoisen sinulle. Tämä koskee perustavanlaatuisia perustoimintoja, kuten sivuston navigointia, oikeaa näyttöä Internet-selaimessasi tai suostumuksesi pyytämistä. Ilman näitä verkkoteknologioita ja evästeitä verkkosivustomme ei toimi.",
        },
        functional: {
            title: "Toiminnallinen",
            description: "Toiminnalliset evästeet mahdollistavat tietojen tallentamisen, jotka muuttavat sivuston ulkonäköä tai toimintaa. Esimerkiksi suosikkikieli tai alue."
        },
        statisic: {
            title: "Tilastot",
            description: "Haluamme jatkuvasti parantaa verkkosivustojemme käytettävyyttä ja suorituskykyä. Tätä varten käytämme analyysitekniikoita (mukaan lukien evästeet), jotka mittaavat ja arvioivat pseudonyymisti, mitä sivustojemme toimintoja ja sisältöjä käytetään, miten ja kuinka usein. Tällä perusteella voimme parantaa sivustoja käyttäjille."
        },
        marketing: {
            title: "Markkinointi",
            description: "Käytämme valittujen kumppaneiden web-tekniikoita (myös evästeitä) voidaksemme näyttää sinulle sisältöä ja mainoksia, jotka on räätälöity sinulle erityisesti verkkosivustoilla ja sosiaalisissa medioissa. Tämä sisältö valitaan ja näytetään käyttäytymisesi perusteella. Mainos- tai markkinointievästeitä käytetään tarjoamaan vierailijoille relevantteja mainoksia ja markkinointikampanjoita. Nämä evästeet seuraavat vierailijoita sivustoilla ja keräävät tietoja räätälöityjen mainosten tarjoamiseksi."
        }
    },
    polish: {
        saveSettings: "Odrzuć",
        necessary: {
            title: "Niezbędne", //"Necessary Cookies:",
            description: "Niezbędne technologie internetowe i pliki cookie sprawiają, że nasza strona internetowa jest technicznie dostępna i użyteczna dla Ciebie. Dotyczy to podstawowych funkcji, takich jak nawigacja po stronie, prawidłowe wyświetlanie w przeglądarce internetowej lub żądanie Twojej zgody. Bez tych technologii internetowych i plików cookie nasza strona nie działa.",
        },
        functional: {
            title: "Funkcjonalne",
            description: "Pliki cookie funkcjonalne umożliwiają przechowywanie informacji, które zmieniają wygląd lub działanie strony. Na przykład preferowany język lub region."
        },
        statisic: {
            title: "Statystyki",
            description: "Stale dążymy do poprawy użyteczności i wydajności naszych stron internetowych. Dlatego korzystamy z technologii analitycznych (w tym plików cookie), które pseudonimizują pomiar i ocenę, które funkcje i treści naszych stron są używane, jak i jak często. Na tej podstawie możemy poprawić nasze strony dla użytkowników."
        },
        marketing: {
            title: "Reklama",
            description: "Korzystamy z technologii internetowych (w tym plików cookie) od wybranych partnerów, aby móc wyświetlać Ci treści i reklamy specjalnie dostosowane do Ciebie na stronach internetowych i w mediach społecznościowych. Treści te są wybierane i wyświetlane na podstawie Twojego zachowania podczas korzystania z sieci. Pliki cookie reklamowe lub marketingowe są używane do dostarczania odwiedzającym odpowiednich reklam i kampanii marketingowych. Te pliki cookie śledzą odwiedzających na różnych stronach internetowych i zbierają informacje w celu dostarczenia spersonalizowanych reklam."
        }
    },
    chinese: {
        saveSettings: "拒绝",
        necessary: {
            title: "必要的", //"Necessary Cookies:",
            description: "必要的网络技术和Cookie使我们的网站在技术上对您可访问和可用。这适用于基本的基本功能，例如网站导航、在您的互联网浏览器中的正确显示或请求您的同意。没有这些网络技术和Cookie，我们的网站无法正常工作。",
        },
        functional: {
            title: "功能性",
            description: "功能性Cookie允许我们存储更改网站外观或行为的信息。例如，您首选的语言或地区。"
        },
        statisic: {
            title: "统计",
            description: "我们希望不断改善我们网站的可用性和性能。因此，我们使用分析技术（包括Cookie），这些技术以假名方式测量和评估我们网站的哪些功能和内容被使用、如何使用以及使用频率。基于此，我们可以改善我们的网站以满足用户需求。"
        },
        marketing: {
            title: "营销",
            description: "我们使用来自精选合作伙伴的网络技术（包括Cookie），以便在网站和社交媒体上向您展示特别为您量身定制的内容和广告。这些内容根据您的使用行为进行选择和显示。广告或营销Cookie用于向访问者提供相关的广告和营销活动。这些Cookie在不同的网站上跟踪访问者，并收集信息以提供个性化的广告。"
        }
    },
    japanese: {
        saveSettings: "拒否",
        necessary: {
            title: "必要な", //"Necessary Cookies:",
            description: "必要なWeb技術とCookieは、当社のWebサイトを技術的にアクセス可能で使用可能にします。これは、Webサイトのナビゲーション、インターネットブラウザでの正しい表示、または同意の要求など、基本的な機能に適用されます。これらのWeb技術とCookieがないと、当社のWebサイトは機能しません。",
        },
        functional: {
            title: "機能的",
            description: "機能的なCookieは、Webサイトの外観や動作を変更する情報を保存できます。たとえば、お好みの言語や地域などです。"
        },
        statisic: {
            title: "統計",
            description: "当社は、Webサイトの使いやすさとパフォーマンスを継続的に改善したいと考えています。そのため、分析技術（Cookieを含む）を使用して、当社のWebサイトのどの機能やコンテンツがどのように使用されているかを匿名で測定および評価しています。これに基づいて、ユーザー向けにWebサイトを改善できます。"
        },
        marketing: {
            title: "マーケティング",
            description: "当社は、選択されたパートナーからのWeb技術（Cookieも含む）を使用して、Webサイトやソーシャルメディア上で特にあなた向けにカスタマイズされたコンテンツや広告を表示します。これらのコンテンツは、あなたの使用行動に基づいて選択および表示されます。広告またはマーケティングCookieは、訪問者に関連する広告やマーケティングキャンペーンを提供するために使用されます。これらのCookieは、異なるWebサイトで訪問者を追跡し、個別化された広告を提供するための情報を収集します。"
        }
    },
    greek: {
        saveSettings: "Απόρριψη",
        necessary: {
            title: "Απαραίτητα", //"Necessary Cookies:",
            description: "Οι απαραίτητες τεχνολογίες ιστού και τα cookies καθιστούν τον ιστότοπό μας τεχνικά προσβάσιμο και χρήσιμο για εσάς. Αυτό ισχύει για βασικές λειτουργίες όπως η πλοήγηση στον ιστότοπο, η σωστή εμφάνιση στον περιηγητή σας στο διαδίκτυο ή η αίτηση της συγκατάθεσής σας. Χωρίς αυτές τις τεχνολογίες ιστού και cookies, ο ιστότοπός μας δεν λειτουργεί.",
        },
        functional: {
            title: "Λειτουργικά",
            description: "Τα λειτουργικά cookies επιτρέπουν την αποθήκευση πληροφοριών που αλλάζουν την εμφάνιση ή τη λειτουργία του ιστότοπου. Για παράδειγμα, η προτιμώμενη γλώσσα ή περιοχή σας."
        },
        statisic: {
            title: "Στατιστικά",
            description: "Θέλουμε να βελτιώνουμε συνεχώς τη χρησιμότητα και την απόδοση των ιστότοπών μας. Για το λόγο αυτό, χρησιμοποιούμε τεχνολογίες ανάλυσης (συμπεριλαμβανομένων των cookies) που μετρούν και αξιολογούν ανώνυμα ποιες λειτουργίες και περιεχόμενο των ιστότοπών μας χρησιμοποιούνται, πώς και πόσο συχνά. Με βάση αυτό, μπορούμε να βελτιώσουμε τους ιστότοπούς για τους χρήστες."
        },
        marketing: {
            title: "Μάρκετινγκ",
            description: "Χρησιμοποι    ούμε τεχνολογίες ιστού (συμπεριλαμβανομένων των cookies) από επιλεγμένους συνεργάτες για να σας δείχνουμε περιεχόμενο και διαφημίσεις ειδικά προσαρμοσμένες για εσάς σε ιστότοπους και κοινωνικά μέσα. Αυτό το περιεχόμενο επιλέγεται και εμφανίζεται με βάση τη συμπεριφορά χρήσης σας. Τα cookies διαφήμισης ή μάρκετινγκ χρησιμοποιούνται για να παρέχουν στους επισκέπτες σχετικές διαφημίσεις και εκστρατείες μάρκετινγκ. Αυτά τα cookies παρακολουθούν τους επισκέπτες σε διάφορους ιστότοπους και συλλέγουν πληροφορίες για την παροχή εξατομικευμένων διαφημίσεων."
        }
    },
    afrikaans: {
        saveSettings: "Weier",
        necessary: {
            title: "Noodsaaklik", //"Necessary Cookies:",
            description: "Noodsaaklike webtegnologieë en koekies maak ons webwerf tegnies toeganklik en bruikbaar vir u. Dit geld vir fundamentele basiese funksies soos navigasie op die webwerf, korrekte vertoon in u internetblaaier of versoek om u toestemming. Sonder hierdie webtegnologieë en koekies werk ons webwerf nie.",
        },
        functional: {
            title: "Funksioneel",
            description: "Funksionele koekies maak dit moontlik om inligting te stoor wat die voorkoms of gedrag van die webwerf verander. Byvoorbeeld, u voorkeurtaal of -streek."
        },
        statisic: {
            title: "Statistiek",
            description: "Ons wil die bruikbaarheid en prestasie van ons webwerwe voortdurend verbeter. Daarom gebruik ons analise tegnologieë (insluitend koekies) wat pseudoniem meet en evalueer watter funksies en inhoud van ons webwerwe gebruik word, hoe en hoe gereeld. Op hierdie basis kan ons ons webwerwe vir gebruikers verbeter."
        },
        marketing: {
            title: "Bemarking",
            description: "Ons gebruik webtegnologieë (ook koekies) van geselekte vennote om u inhoud en advertensies te wys wat spesifiek vir u opgestel is op webwerwe en sosiale media. Hierdie inhoud word gekies en vertoon op grond van u gebruiksgedrag. Advertensie- of bemarkingskoekies word gebruik om besoekers relevante advertensies en bemarkingsveldtogte te bied. Hierdie koekies volg besoekers oor verskillende webwerwe en versamel inligting om gepersonaliseerde advertensies te lewer."
        }
    },
    arabic: {
        saveSettings: "رفض",
        necessary: {
            title: "ضروري", //"Necessary Cookies:",
            description: "تجعل تقنيات الويب وملفات تعريف الارتباط الضرورية موقعنا الإلكتروني متاحًا تقنيًا وقابلًا للاستخدام بالنسبة لك. ينطبق هذا على الوظائف الأساسية الأساسية مثل التنقل في الموقع، والعرض الصحيح في متصفح الإنترنت الخاص بك، أو طلب موافقتك. بدون هذه التقنيات وملفات تعريف الارتباط، لا يعمل موقعنا الإلكتروني.",
        },
        functional: {
            title: "وظيفي",
            description: "تسمح ملفات تعريف الارتباط الوظيفية بتخزين المعلومات التي تغير مظهر الموقع أو سلوكه. على سبيل المثال، لغتك المفضلة أو منطقتك."
        },
        statisic: {
            title: "إحصائيات",
            description: "نريد تحسين سهولة استخدام وأداء مواقعنا الإلكترونية باستمرار. لهذا السبب، نستخدم تقنيات التحليل (بما في ذلك ملفات تعريف الارتباط) التي تقيس وتقييم بشكل مجهول أي الميزات والمحتوى من مواقعنا الإلكترونية يتم استخدامه، وكيف ومتى. بناءً على ذلك، يمكننا تحسين مواقعنا الإلكترونية للمستخدمين."
        },
        marketing: {
            title: "تسويق",
            description: "نستخدم تقنيات الويب (بما في ذلك ملفات تعريف الارتباط) من شركاء مختارين لعرض محتوى وإعلانات مصممة خصيصًا لك على مواقع الويب ووسائل التواصل الاجتماعي. يتم اختيار هذا المحتوى وعرضه بناءً على سلوك استخدامك. تُستخدم ملفات تعريف الارتباط الإعلانية أو التسويقية لتزويد الزوار بإعلانات وحملات تسويقية ذات صلة. تتبع هذه الملفات الزوار عبر مواقع الويب المختلفة وتجمع المعلومات لتقديم إعلانات مخصصة."
        }
    },
    korean: {
        saveSettings: "거부",
        necessary: {
            title: "필수", //"Necessary Cookies:",
            description: "필수 웹 기술과 쿠키는 웹사이트를 기술적으로 접근 가능하고 사용 가능하게 만듭니다. 이는 웹사이트 탐색, 인터넷 브라우저에서 올바르게 표시 또는 동의 요청과 같은 기본 기능에 적용됩니다. 이러한 웹 기술과 쿠키가 없으면 웹사이트가 작동하지 않습니다.",
        },
        functional: {
            title: "기능적",
            description: "기능적 쿠키는 웹사이트의 모양이나 동작을 변경하는 정보를 저장할 수 있습니다. 예를 들어, 선호하는 언어나 지역입니다."
        },
        statisic: {
            title: "통계",
            description: "우리는 웹사이트의 사용 편의성과 성능을 지속적으로 개선하고자 합니다. 이를 위해 분석 기술(쿠키 포함)을 사용하여 웹사이트의 어떤 기능과 콘텐츠가 어떻게, 얼마나 자주 사용되는지를 익명으로 측정하고 평가합니다. 이를 바탕으로 사용자에게 더 나은 웹사이트를 제공할 수 있습니다."
        },
        marketing: {
            title: "마케팅",
            description: "우리는 선택된 파트너의 웹 기술(쿠키 포함)을 사용하여 웹사이트와 소셜 미디어에서 귀하에게 맞춤형 콘텐츠와 광고를 표시합니다. 이 콘텐츠는 귀하의 사용 행동에 따라 선택되고 표시됩니다. 광고 또는 마케팅 쿠키는 방문자에게 관련 광고와 마케팅 캠페인을 제공하는 데 사용됩니다. 이러한 쿠키는 다양한 웹사이트에서 방문자를 추적하고 개인화된 광고를 제공하기 위해 정보를 수집합니다."
        }
    },
    estonian: {
        saveSettings: "Keeldu",
        necessary: {
            title: "Nõutav", //"Necessary Cookies:",
            description: "Nõutavad veebitehnoloogiad ja küpsised muudavad meie veebisaidi tehniliselt kättesaadavaks ja kasutatavaks. See kehtib põhiliste funktsioonide kohta, nagu veebisaidil navigeerimine, õige kuvamine teie veebibrauseris või teie nõusoleku küsimine. Ilma nende veebitehnoloogiate ja küpsisteta meie veebisait ei tööta.",
        },
        functional: {
            title: "Funktsionaalne",
            description: "Funktsionaalsed küpsised võimaldavad salvestada teavet, mis muudab veebisaidi välimust või käitumist. Näiteks teie eelistatud keel või piirkond."
        },
        statisic: {
            title: "Statistika",
            description: "Soovime pidevalt parandada meie veebisaitide kasutatavust ja jõudlust. Selleks kasutame analüüsitehnoloogiaid (sealhulgas küpsiseid), mis mõõdavad ja hindavad anonüümselt, milliseid funktsioone ja sisu meie veebisaitidel kasutatakse, kuidas ja kui sageli. Selle alusel saame oma veebisaite kasutajatele paremaks muuta."
        },
        marketing: {
            title: "Turundus",
            description: "Kasutame valitud partnerite veebitehnoloogiaid (ka küpsiseid), et näidata teile sisu ja reklaame, mis on spetsiaalselt teie jaoks kohandatud veebisaitidel ja sotsiaalmeedias. See sisu valitakse ja kuvatakse vastavalt teie kasutuskäitumisele. Reklaami- või turundusküpsiseid kasutatakse külastajatele asjakohaste reklaamide ja turunduskampaaniate pakkumiseks. Need küpsised jälgivad külastajaid erinevatel veebisaitidel ja koguvad teavet isikupärastatud reklaamide esitamiseks."
        }
    }
}

let tmpl = document.createElement('template');
tmpl.innerHTML = `
<style>:host { display:block; width: auto; max-width: 560px; }</style> <!-- look ma, scoped styles -->
<slot></slot>
`;

/* - - - Function to get Cookie Settings from url and set the cookie - - - */
function intaSetCookieSettings() {
    const urlParams = new URLSearchParams(window.location.search);
    const cookieSettings = urlParams.get('intaCookieSettings');
    const reload = urlParams.get('reload');

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

    window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments) };

    window.clarity && window.clarity('consentv2', {
        ad_Storage: "denied",
        analytics_Storage: "denied"
    });

    const optedOut = localStorage.getItem('ccpa_opt_out');
    if (optedOut === 'true') {
        gtag('consent', 'update', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
        });
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

const intCookieDomain = (function () {
    "use strict";
    var i = 0,
        d = (document.domain === "localhost" || window.location.host === "localhost" || document.domain === "" || window.location.host === "127.0.0.1" || window.location.host.indexOf("127.0.0.1") > -1) ? "127.0.0.1" : document.domain || window.location.host,
        p = d.split(".")

    d = p.slice(-1 - ++i).join(".");
    d = d;

    return "domain=." + d + ";";
})();

const intCookieDomainWithWWW = (function () {
    "use strict";
    var i = 0,
        d = (document.domain === "localhost" || window.location.host === "localhost" || document.domain === "127.0.0.1" || window.location.host === "127.0.0.1") ? "" : document.domain || window.location.host,
        p = d.split(".")

    d = p.slice(-1 - ++i).join(".");
    d = d;

    return "domain=www." + d + ";";
})();

/* Find specific parameter on current Script */

function findScriptParameter(value) {
    const currentURL = document.currentScript.src;

    if (currentURL.indexOf(value) > -1) {
        let url = new URL(currentURL);
        let param = url.searchParams;
        return param.get(value);
    }

    return undefined;

}

const allowAllCookieName = "__all__cookies";
const essentialsCookieName = "__essential__cookies";
const blockTrackingCookies = "__hideTrackingCookies";
const blockAdvertismentCookies = "__hideAdvertisementCookies";
const intHead = document.querySelector("head");

const cookieLifeTime = new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * 200).toGMTString();
/* List of cookies that should not be deleted */

const inta_requiredCookieList = [{
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
        window.INTA.settings.rootDomain,
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
        window.INTA.settings.rootDomain
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
        window.INTA.settings.rootDomain
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
        window.INTA.settings.rootDomain
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
        window.INTA.settings.rootDomain
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
const inta_statisticCookieList = [];
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
    vendor: "Hotjar Ltd.",
    cookies: [
        {
            cookie: "_hjSessionUser_",
            purpose: "",
        },
        {
            cookie: "_hjid",
            purpose: "_hjUserAttributesHash",
        },
        {
            cookie: "_hjFirstSeen",
            purpose: "",
        },
        {
            cookie: "_hjUserAttributesHash",
            purpose: "",
        },
        {
            cookie: "_hjCachedUserAttributes",
            purpose: "",
        },
        {
            cookie: "_hjViewportId",
            purpose: "",
        },
        {
            cookie: "_hjSession_",
            purpose: "",
        },
        {
            cookie: "_hjSessionTooLarge",
            purpose: "",
        },
        {
            cookie: "_hjSessionRejected",
            purpose: "",
        },
        {
            cookie: "_hjSessionResumed",
            purpose: "",
        },
        {
            cookie: "_hjLocalStorageTest",
            purpose: "",
        },
        {
            cookie: "_hjIncludedInPageviewSample",
            purpose: "",
        },
        {
            cookie: "_hjIncludedInSessionSample",
            purpose: "",
        },
        {
            cookie: "_hjAbsoluteSessionInProgress",
            purpose: "",
        },
        {
            cookie: "_hjTLDTest",
            purpose: "",
        },
        {
            cookie: "_hjRecordingEnabled",
            purpose: "",
        },
        {
            cookie: "_hjRecordingLastActivity",
            purpose: "",
        },
        {
            cookie: "_hjShownFeedbackMessage",
            purpose: "",
        },
        {
            cookie: "_hjMinimizedPolls",
            purpose: "",
        },
        {
            cookie: "_hjDonePolls",
            purpose: "",
        },
        {
            cookie: "_hjClosedSurveyInvites",
            purpose: "",
        }
    ],
    domains: [
        "hotjar.com"
    ],
    vendor_privacy: "https://help.hotjar.com/hc/en-us/articles/115011789248-Hotjar-Cookies"
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
        window.INTA.settings.rootDomain
    ],
    vendor_privacy: "https://clearbit.com/privacy"
});

/* - - - List of Marketing cookies - - - */
const inta_marketingCookieList = [];
inta_marketingCookieList.push(
    {
        vendor: "Meta Inc",
        cookies: [
            {
                cookie: "_fbp",
                purpose: "to store and track visits across websites."
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
const inta_functionalCookieList = [];
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
const int__cookiesToKeep = [...requiredToKeep.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1);
/* - - - Helper function to get cookie type*/
function intaCookieType(type) {
    if (getCookie(type) === "checked") return true;
    return (getCookie(type) === "true")
}

/* function generateCookieRegex(item){ */
/* Cookie name list for functional cookies */
if (getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && !intaCookieConsents?.functionalCookies) {
    let newArray = [...inta_functionalCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
    int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray);
}
/* Cookie name list for statistical cookies */
if (getCookie(int_hideCookieBannerName) != ""
    && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1
    && intaCookieConsents?.staticsticCookies) {
    let newArray = [...inta_statisticCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
    int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray)
}

/* Cookie name list for marketing / advertisment cookies */
if (getCookie(int_hideCookieBannerName) != ""
    && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1
    && intaCookieConsents?.advertisementCookies) {
    let newArray = [...inta_marketingCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
    int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray)
}

if (getCookie(int_hideCookieBannerName) != ""
    && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1
    && intaCookieConsents?.functionalCookies) {
    let newArray = [...inta_functionalCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
    int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray)
}

const int__cookiesToKeepRegx = new RegExp(int__cookiesToKeep.filter(function (entry) { return entry.trim() != ''; }).join("|"), "i");

const cookieBannerStyles = {
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

const allScripts = window.allScripts = [
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
            "(_linkedin_partner_id|_linkedin_data_partner_ids|mailchimp|lntrk|twitter|instagram|trustpilot|chic_lite_data)",
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

if (intaCookieConsents?.advertisementCookies) {
    gtag('consent', 'update', {
        'personalization_storage': 'granted',
        'ads_data_redaction': 'granted',
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

    window.Shopify && window.Shopify.customerPrivacy.setTrackingConsent(
        {
            'analytics': false,
            'marketing': true,
            'preferences': false,
        },
        () => console.log("Consent captured")
    );

    fbq('consent', 'grant');
    // Enable ads
    (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;
    (adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 0;

}

if (intaCookieConsents?.staticsticCookies) {
    gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'url_passthrough': true,
    })
    window.clarity && window.clarity('consentv2', {
        ad_Storage: "denied",
        analytics_Storage: "granted"
    });
    window.uetq.push('consent', 'update', {
        'analytics_storage': 'granted'
    });

    window.Shopify && window.Shopify.customerPrivacy.setTrackingConsent(
        {
            'analytics': true,
            'marketing': false,
            'preferences': false,
        },
        () => console.log("Consent captured")
    );
}

if (intaCookieConsents?.functionalCookies) {
    gtag('consent', 'update', {
        'functionality_storage': 'granted',
    })
    window.uetq.push('consent', 'update', {
        'functionality_storage': 'granted'
    });

    window.Shopify && window.Shopify.customerPrivacy.setTrackingConsent(
        {
            'analytics': false,
            'marketing': false,
            'preferences': true,
        },
        () => console.log("Consent captured")
    );

}

if (window.INTA?.settings?.gtagId) {
    gtag('config', window.INTA?.settings?.gtagId, {
        'user_id': '' + intaCookieConsentsUserId + ''
    });
}

let notRequired;
let m;
/* Helper function to merge arrays */
const merge = (first, second, third) => {
    /* first.splice(1, 0, "^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+"); */
    for (let i = 0; i < second.length; i++) {
        first.push(second[i]);
    }
    if (third !== undefined) {
        for (let i = 0; i < third.length; i++) {
            first.push(third[i])
        }
    }
    return first;
}
/* autoads-preview.googleusercontent.com */
/* Getting user prefrence settings from Local storage: checked means user has allowed. False means cookies needs to be blocked */
if (intaCookieConsents?.functionalCookies === "checked" &&
    intaCookieConsents?.staticsticCookies !== "checked" &&
    intaCookieConsents?.advertisementCookies !== "checked") {
    m = merge(allScripts[1].scripts, allScripts[0].scripts);
} else if (intaCookieConsents?.advertisementCookies === "checked" &&
    intaCookieConsents?.staticsticCookies !== "checked" &&
    intaCookieConsents?.functionalCookies !== "checked") {
    m = merge(allScripts[2].scripts, allScripts[0].scripts);
} else if (intaCookieConsents?.staticsticCookies === "checked" &&
    intaCookieConsents?.functionalCookies !== "checked" &&
    intaCookieConsents?.advertisementCookies !== "checked") {
    m = merge(allScripts[1].scripts, allScripts[2].scripts);
} else if (intaCookieConsents?.functionalCookies === "checked" &&
    intaCookieConsents?.staticsticCookies === "checked") {
    m = allScripts[1].scripts;
} else if (intaCookieConsents?.functionalCookies === "checked" &&
    intaCookieConsents?.advertisementCookies === "checked") {
    m = allScripts[0].scripts;
} else if (intaCookieConsents?.advertisementCookies === "checked" &&
    intaCookieConsents?.staticsticCookies === "checked") {
    m = allScripts[2].scripts;
} else {
    m = merge(allScripts[0].scripts, allScripts[1].scripts, allScripts[2].scripts);
}
notRequired = window.notRequired = new RegExp(m.join("|"), "ig");
let analyticsScript = document.createElement("script");
analyticsScript.async = true;
analyticsScript.src = "https://www.intastellarsolutions.com/js/analytics.js?v=" + new Date().getTime();


intHead.appendChild(analyticsScript);

const intastellarCreateBanner = document.createElement("script");
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

console.log("Debugging: " + intastellarCreateBanner.src);
analyticsScript.async = true;
intHead.appendChild(intastellarCreateBanner);

/* Helper function to create Consents Block message for iframes etc.*/
function ConsentsBlock(logo, textLanguage, btnText, datatype, img) {
    let p = "";
    if (window.location.host.indexOf("intastellarsolutions.com") == -1) {
        p = `<a class="inta-poweredBy" href='https://www.intastellarsolutions.com' target='_blank' rel='noopener' style="align-items: center; text-decoration: none;font-size: 11.5px; color: #000 !important; display: flex; justify-content: center;">powered by <img width="90px" height="40px" style="width: 90px !important; height: 40px !important;margin-left: 10px;" src="https://www.intastellarsolutions.com/assets/logos/intastellar-logo-new.svg" alt="Intastellar Solutions, International"></a>`;
    }
    if (img !== undefined && img != "") {
        return `
        <inta-consents-content class="intCookie_ConsentContainer-content yt-frame">
            <inta-consents-bg class="intCookie_ConsentContainer-bgIMG" inta-bg-img="${img}"></inta-consents-bg>
            <inta-consents-section class="intCookie_ConsentContainer-info">
                ${textLanguage}
                <button class='intastellarCookie-settings__btn --changePermission' data-type='${datatype}'>${btnText}</button>
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
                    <button class='intastellarCookie-settings__btn --changePermission' data-type='${datatype}'>${btnText}</button>
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

function loopBlock(addedNodes, message, script, buttonText, logo) {
    addedNodes.forEach((frae) => {
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
            // Check if an element is from Facebook, check by looking at the class name if it contains "fb"
            if (containsClass(frae, "fb-") && frae.getAttribute("data-href")?.indexOf("facebook.com") > -1) {
                frae?.parentElement?.replaceChild(settingsContent, frae);
            }
            if (new RegExp(script.scripts.join("|"), "ig").test(frae.src) || frae?.className?.match(new RegExp(script.scripts.join("|"), "ig"))) {
                frae.sandbox = "";
                let ytIMG = "";
                let video_id = "";

                if (frae.src != undefined) {
                    if (frae.src.match("^(?:https?:)?//[^/]*(?:youtube(?:-nocookie)?\.com|youtu\.be).*[=/]([-\\w]{11})(?:\\?|=|&|$)")) {
                        video_id = frae?.src?.match("^(?:https?:)?//[^/]*(?:youtube(?:-nocookie)?\.com|youtu\.be).*[=/]([-\\w]{11})(?:\\?|=|&|$)")?.pop();
                        if (video_id && !frae?.hasAttribute("inta-yt-placeholder-img")) {
                            ytIMG = "https://img.youtube.com/vi/" + video_id + "/maxresdefault.jpg";
                        } else if (frae?.hasAttribute("inta-yt-placeholder-img")) {
                            ytIMG = frae?.getAttribute("inta-yt-placeholder-img");
                        }
                    } else {
                        if (frae?.hasAttribute("inta-yt-placeholder-img")) {
                            ytIMG = frae?.getAttribute("inta-yt-placeholder-img");
                        }
                    }
                }
                let a = document.createElement('a');
                a.href = frae.src;
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
                if (frae.src !== window.INTA?.settings?.partnerDomain) {
                    frae.src = "about:blank";
                }
                let textLanguage;
                let btnText;

                if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
                    textLanguage = message(externalDomain, frae).danish;
                    btnText = buttonText().danish;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
                    textLanguage = message(externalDomain, frae).german;
                    btnText = buttonText().german;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
                    textLanguage = message(externalDomain, frae).english;
                    btnText = buttonText().english;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "es" || intastellarCookieLanguage === "es-ES") {
                    textLanguage = message(externalDomain, frae).spanish;
                    btnText = buttonText().spanish;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fr" || intastellarCookieLanguage === "fr-FR") {
                    textLanguage = message(externalDomain, frae).french;
                    btnText = buttonText().french;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "it" || intastellarCookieLanguage === "it-IT") {
                    textLanguage = message(externalDomain, frae).italian;
                    btnText = buttonText().italian;

                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ru" || intastellarCookieLanguage === "ru-RU") {
                    textLanguage = message(externalDomain, frae).russian;
                    btnText = buttonText().russian;

                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "sv" || intastellarCookieLanguage === "sv-SE") {
                    textLanguage = message(externalDomain, frae).swedish;
                    btnText = buttonText().swedish;

                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "no" || intastellarCookieLanguage === "no-NO") {
                    textLanguage = message(externalDomain, frae).norwegian;
                    btnText = buttonText().norwegian;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "nl" || intastellarCookieLanguage === "nl-NL") {
                    textLanguage = message(externalDomain, frae).dutch;
                    btnText = buttonText().dutch;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fi" || intastellarCookieLanguage === "fi-FI") {
                    textLanguage = message(externalDomain, frae).finish;
                    btnText = buttonText().finish;
                } else {
                    textLanguage = message(externalDomain, frae).danish;
                    btnText = buttonText().danish;
                }
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

                if (frae.style.display != "none" && frae.src != undefined) {
                    frae?.parentElement?.replaceChild(settingsContent, frae);
                }

            }
        } else if (getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && !intaCookieConsents?.functionalCookies && script.type == "functional") {
            if (new RegExp(script.scripts.join("|"), "ig").test(frae.src)) {
                frae.sandbox = "";
                let a = document.createElement('a');
                a.href = frae.src;
                let externalDomain = a.hostname;
                /* frae.src = "about:blank"; */


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

                let textLanguage;
                let btnText;

                if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
                    textLanguage = bannerContentMessage(externalDomain).danish;
                    btnText = buttonText().danish;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
                    textLanguage = bannerContentMessage(externalDomain).german;
                    btnText = buttonText().german;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
                    textLanguage = bannerContentMessage(externalDomain).english;
                    btnText = buttonText().english;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "es" || intastellarCookieLanguage === "es-ES") {
                    textLanguage = bannerContentMessage(externalDomain).spanish;
                    btnText = buttonText().spanish;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "no" || intastellarCookieLanguage === "no-NO") {
                    textLanguage = bannerContentMessage(externalDomain).norwegian;
                    btnText = buttonText().norwegian;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "nl" || intastellarCookieLanguage === "nl-NL") {
                    textLanguage = bannerContentMessage(externalDomain).dutch;
                    btnText = buttonText().dutch;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fi" || intastellarCookieLanguage === "fi-FI") {
                    textLanguage = bannerContentMessage(externalDomain).finish;
                    btnText = buttonText().finish;
                } else {
                    textLanguage = bannerContentMessage(externalDomain).danish;
                    btnText = buttonText().danish;
                }

                let settingsContent = document.createElement("inta-consents");
                settingsContent.classList.add("intCookie_ConsentContainer");
                settingsContent.setAttribute("data-src", a.href);
                settingsContent.innerHTML = ConsentsBlock(logo, textLanguage, btnText, "intFunctionalCookies");

                if (frae?.src?.indexOf("hs-sites.com") > -1) {
                    frae?.parentElement?.replaceChild("", frae);
                } else {
                    if (frae.style.display != "none" && frae.src != undefined) {

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

                let textLanguage;
                let btnText;
                if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
                    textLanguage = bannerContentMessage(externalDomain).danish;
                    btnText = buttonText().danish;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
                    textLanguage = bannerContentMessage(externalDomain).german;
                    btnText = buttonText().german;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
                    textLanguage = bannerContentMessage(externalDomain).english;
                    btnText = buttonText().english;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "es" || intastellarCookieLanguage === "es-ES") {
                    textLanguage = bannerContentMessage(externalDomain).spanish;
                    btnText = buttonText().spanish;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "nl" || intastellarCookieLanguage === "nl-NL") {
                    textLanguage = bannerContentMessage(externalDomain).dutch;
                    btnText = buttonText().dutch;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fr" || intastellarCookieLanguage === "fr-FR") {
                    textLanguage = bannerContentMessage(externalDomain).french;
                    btnText = buttonText().french;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fi" || intastellarCookieLanguage === "fi-FI") {
                    textLanguage = bannerContentMessage(externalDomain).finish;
                    btnText = buttonText().finish;
                } else {
                    textLanguage = bannerContentMessage(externalDomain).danish;
                    btnText = buttonText().danish;
                }

                let settingsContent = document.createElement("inta-consents");
                settingsContent.classList.add("intCookie_ConsentContainer");

                settingsContent.innerHTML = ConsentsBlock(logo, textLanguage, btnText, "intFunctionalCookies");

                settingsContent.setAttribute("data-src", frae.src);
                if (frae?.src?.indexOf("hs-sites.com") > -1) {
                    frae?.parentElement?.replaceChild("", frae);
                } else {
                    if (frae.style.display != "none" && frae.src != undefined) {
                        frae.parentElement.replaceChild(settingsContent, frae);
                    }
                }
            } else if (frae?.id?.indexOf("google_translate_element2") > -1) {
                frae?.parentElement?.replaceChild("", frae);
            }
        }
    })
}

function blockBlockQuotes(tweet, message, script, buttonText, logo) {
    if (tweet != " " && getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1 || !intaCookieConsents?.advertisementCookies && script.type == "marketing" && notRequired.test(tweet.className)) {
        let a = document.createElement('a');
        a.href = tweet.querySelector("a").href;
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

        let textLanguage;
        let btnText;
        if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
            textLanguage = message(externalDomain).danish;
            btnText = buttonText().danish;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
            textLanguage = message(externalDomain).german;
            btnText = buttonText().german;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
            textLanguage = message(externalDomain).english;
            btnText = buttonText().english;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "es" || intastellarCookieLanguage === "es-ES") {
            textLanguage = bannerContentMessage(externalDomain).spanish;
            btnText = buttonText().spanish;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "sv" || intastellarCookieLanguage === "sv-SE") {
            // Swedish
            textLanguage = message(externalDomain).swedish;
            btnText = buttonText().swedish;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fr" || intastellarCookieLanguage === "fr-FR") {
            // French
            textLanguage = message(externalDomain).french;
            btnText = buttonText().french;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pr" || intastellarCookieLanguage === "pr-PT") {
            // Portuguese
            textLanguage = message(externalDomain).portuguese;
            btnText = buttonText().portuguese;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "it" || intastellarCookieLanguage === "it-IT") {
            // Italian
            textLanguage = message(externalDomain).italian;
            btnText = buttonText().italian;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ru" || intastellarCookieLanguage === "ru-RU") {
            textLanguage = message(externalDomain, frae).russian;
            btnText = buttonText().russian;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "no") {
            textLanguage = message(externalDomain, frae).norwegian;
            btnText = buttonText().norwegian;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fi" || intastellarCookieLanguage === "fi-FI") {
            textLanguage = message(externalDomain, frae).finish;
            btnText = buttonText().finish;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "nl" || intastellarCookieLanguage === "nl-NL") {
            textLanguage = message(externalDomain, frae).dutch;
            btnText = buttonText().dutch;
        } else {
            textLanguage = message(externalDomain).danish;
            btnText = buttonText().danish;
        }
        let settingsContent = document.createElement("inta-consents");
        settingsContent.classList.add("intCookie_ConsentContainer");
        settingsContent.innerHTML = ConsentsBlock(logo, textLanguage, btnText, "intMarketingCookies");

        settingsContent.setAttribute("data-src", a.href);
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
const bannerContentMessage = (domain, node) => {
    if (node?.classList?.contains("trustpilot-widget")) {
        domain = "www.trustpilot.com";
    }
    inta_marketingCookieList.forEach((cookie) => {
        var i = 0,
            d = domain,
            p = d.split(".")

        d = p.slice(-1 - ++i).join(".");
        domain = d;

        if (cookie?.domains?.includes(domain)) {
            domain = cookie.vendor;
        }
    })
    return {
        danish: `<p>Dette indhold leveres af ${domain}.</p>`,
        english: `<p>This content is provided by ${domain}.</p>`,
        german: `<p>Dieser Inhalt wird von ${domain} bereitgestellt.</p>`,
        spanish: `<p>Este contenido es proporcionado por ${domain}.</p>`,
        swedish: `<p>Denna innehåll tillhandahålls av ${domain}.</p>`,
        french: `<p>Ce contenu est fourni par ${domain}.</p>`,
        portuguese: `<p>Este conteúdo é fornecido por ${domain}.</p>`,
        italian: `<p>Questo contenuto è fornito da ${domain}.</p>`,
        russian: `<p>Этот контент предоставлен ${domain}.</p>`,
        norwegian: `<p>Dette innholdet leveres av ${domain}.</p>`,
        finish: `<p>Tämä sisältö toimitetaan ${domain}.</p>`,
        dutch: `<p>Deze inhoud wordt geleverd door ${domain}.</p>`,
        polish: `<p>Ta zawartość jest dostarczana przez ${domain}.</p>`,
        afrikaans: `<p>Hierdie inhoud word verskaf deur ${domain}.</p>`,
        arabic: `<p>هذا المحتوى مقدم من ${domain}.</p>`,
        hindi: `<p>यह सामग्री ${domain} द्वारा प्रदान की गई है।</p>`,
        turkish: `<p>Bu içerik ${domain} tarafından sağlanmaktadır.</p>`,
        japanese: `<p>このコンテンツは${domain}によって提供されています。</p>`,
        korean: `<p>이 콘텐츠는 ${domain}에서 제공됩니다.</p>`,
        thai: `<p>เนื้อหานี้จัดทำโดย ${domain}.</p>`,
        vietnamese: `<p>Nội dung này được cung cấp bởi ${domain}.</p>`,
        indonesian: `<p>Konten ini disediakan oleh ${domain}.</p>`,
        filipino: `<p>Ang nilalamang ito ay ibinibigay ng ${domain}.</p>`,
        malay: `<p>Kandungan ini disediakan oleh ${domain}.</p>`,
        ukrainian: `<p>Цей контент надається ${domain}.</p>`,
        hebrew: `<p>תוכן זה מסופק על ידי ${domain}.</p>`,
        arabic: `<p>هذا المحتوى مقدم من ${domain}.</p>`,
    }
};

function handleInputChange(event) {
    const target = event.target;
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

function updateNotRequiredRegexp() {
    // Create the correct RegExp based on current consent settings
    let m;
    if (intaCookieConsents?.functionalCookies === "checked" &&
        intaCookieConsents?.staticsticCookies !== "checked" &&
        intaCookieConsents?.advertisementCookies !== "checked") {
        allScripts.forEach((script) => {
            if (script.type === "functional") {
                m = merge(allScripts[1].scripts, allScripts[0].scripts);
            }
        });
    } else if (intaCookieConsents?.advertisementCookies === "checked" &&
        intaCookieConsents?.staticsticCookies !== "checked" &&
        intaCookieConsents?.functionalCookies !== "checked") {

        allScripts.forEach((script) => {
            if (script.type === "marketing") {
                m = merge(script.scripts, allScripts[0].scripts);
            }
        });

    } else if (intaCookieConsents?.staticsticCookies === "checked" &&
        intaCookieConsents?.functionalCookies !== "checked" &&
        intaCookieConsents?.advertisementCookies !== "checked") {
        allScripts.forEach((script) => {
            if (script.type === "statics") {
                m = merge(script.scripts, allScripts[2].scripts);
            }
        });
    } else if (intaCookieConsents?.functionalCookies === "checked" &&
        intaCookieConsents?.staticsticCookies === "checked") {
        m = allScripts[1].scripts;
    } else if (intaCookieConsents?.functionalCookies === "checked" &&
        intaCookieConsents?.advertisementCookies === "checked") {
        m = allScripts[0].scripts;
    } else if (intaCookieConsents?.advertisementCookies === "checked" &&
        intaCookieConsents?.staticsticCookies === "checked") {
        m = allScripts[2].scripts;
    } else if (intaCookieConsents?.functionalCookies === "checked" &&
        intaCookieConsents?.advertisementCookies === "checked" &&
        intaCookieConsents?.staticsticCookies === "checked") {
        m = [];
    } else {
        m = merge(allScripts[0].scripts, allScripts[1].scripts, allScripts[2].scripts);
    }

    // Update the notRequired RegExp
    notRequired = new RegExp(m.length ? m.join("|") : "^$", "ig");
    window.notRequired = notRequired;
    console.log("Updated consent blocking patterns");

    // Process existing scripts that may need to be updated
    processExistingScripts();
}

function processExistingScripts() {
    // Process blocked scripts that should now be allowed
    document.querySelectorAll('script[type="text/blocked"]').forEach(script => {
        const src = script.src || '';
        if (!notRequired.test(src) && !notRequired.test(script.innerText)) {
            // This script should now be allowed - replace it
            const newScript = document.createElement('script');
            newScript.type = 'text/javascript';
            if (script.src) newScript.src = script.src;
            if (script.innerText) newScript.text = script.innerText;
            script.parentNode?.replaceChild(newScript, script);
        }
    });

    // Process blocked iframes that should now be allowed
    document.querySelectorAll('inta-consents-iframe[data-src], inta-consents[data-src]').forEach(blocked => {
        const type = blocked.querySelector('.--changePermission')?.dataset?.type;
        if ((type === 'intMarketingCookies' && intaCookieConsents?.advertisementCookies === "checked") ||
            (type === 'intFunctionalCookies' && intaCookieConsents?.functionalCookies === "checked") ||
            (type === 'intStaticsCookies' && intaCookieConsents?.staticsticCookies === "checked")) {

            const iframe = document.createElement('iframe');
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

const beforeScriptExecuteListener = function (event, node) {
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

    const observer = new MutationObserver((mutations) => {
        requestAnimationFrame(() => {
            mutations.forEach(({ addedNodes }) => {
                addedNodes.forEach((node) => {

                    if (node.nodeType === 1 && node.tagName === "DIV" || node.nodeType === 1 && node.tagName === "IFRAME") {
                        allScripts.map((script) => {

                            const buttonText = () => {
                                if (script.type == "marketing") {
                                    scriptTypelang = {
                                        danish: "marketing",
                                        english: "marketing",
                                        german: "werbe",
                                        spanish: "publicidad",
                                        swedish: "marknadsföring",
                                        french: "publicité",
                                        portuguese: "publicidade",
                                        italian: "pubblicità",
                                        russian: "реклама",
                                        norwegian: "markedsføring",
                                        finish: "mainonta",
                                        dutch: "reclame",
                                        polish: "reklama",
                                        afrikaans: "bemarking",
                                        arabic: "تسويق",
                                        hindi: "विपणन",
                                        turkish: "pazarlama",
                                        japanese: "マーケティング",
                                        korean: "마케팅",
                                        thai: "การตลาด",
                                        vietnamese: "tiếp thị",
                                        indonesian: "pemasaran",
                                        filipino: "pagmemerkado",
                                        malay: "pemasaran",
                                        chinese: "营销",
                                        ukrainian: "маркетинг",
                                        hebrew: "שיווק",
                                    }
                                } else if (script.type == "functional") {
                                    scriptTypelang = {
                                        danish: "funktionelle",
                                        english: "functional",
                                        german: "funktionelle",
                                        spanish: "funcional",
                                        swedish: "funktionell",
                                        french: "fonctionnel",
                                        portuguese: "funcional",
                                        italian: "funzionale",
                                        russian: "функциональный",
                                        norwegian: "funksjonelle",
                                        finish: "toiminnallinen",
                                        dutch: "functioneel",
                                        polish: "funkcjonalne",
                                        afrikaans: "funksionele",
                                        arabic: "وظيفي",
                                        hindi: "कार्यात्मक",
                                        turkish: "fonksiyonel",
                                        japanese: "機能的",
                                        korean: "기능적",
                                        thai: "ฟังก์ชัน",
                                        vietnamese: "chức năng",
                                        indonesian: "fungsional",
                                        filipino: "pampagana",
                                        chinese: "功能性",
                                        malay: "fungsional",
                                        ukrainian: "функціональний",
                                        hebrew: "פונקציונלי",
                                    }
                                } else if (script.type == "statics") {
                                    scriptTypelang = {
                                        danish: "statistiske",
                                        english: "statics",
                                        german: "statistische",
                                        spanish: "estadísticas",
                                        swedish: "statistik",
                                        french: "statistiques",
                                        portuguese: "estatísticas",
                                        italian: "statistico",
                                        russian: "статистика",
                                        norwegian: "statistiske",
                                        finish: "tilastollinen",
                                        dutch: "statistieken",
                                        polish: "statystyczne",
                                        afrikaans: "statistiese",
                                        arabic: "إحصائية",
                                        hindi: "सांख्यिकी",
                                        turkish: "istatistik",
                                        japanese: "統計",
                                        korean: "통계",
                                        thai: "สถิติ",
                                        vietnamese: "thống kê",
                                        indonesian: "statistik",
                                        filipino: "istatiska",
                                        malay: "statistik",
                                        chinese: "统计",
                                        ukrainian: "статистичний",
                                        hebrew: "סטטיסטי",
                                    }
                                }

                                return {
                                    danish: `Accepter ${scriptTypelang.danish} cookies`,
                                    english: `Accept ${scriptTypelang.english} cookies`,
                                    german: `Akzeptiere ${scriptTypelang.german} cookies`,
                                    spanish: `Aceptar cookies ${scriptTypelang.spanish}`,
                                    swedish: `Acceptera ${scriptTypelang.swedish} cookies`,
                                    french: `Accepter les cookies ${scriptTypelang.french}`,
                                    portuguese: `Aceitar cookies ${scriptTypelang.portuguese}`,
                                    italian: `Accetta i cookie ${scriptTypelang.italian}`,
                                    russian: `Принять файлы cookie ${scriptTypelang.russian}`,
                                    norwegian: `Aksepter ${scriptTypelang.danish} cookies`,
                                    finish: `Hyväksy ${scriptTypelang.danish} evästeet`,
                                    dutch: `Accepteer ${scriptTypelang.danish} cookies`,
                                    polish: `Akceptuj pliki cookie ${scriptTypelang.polish}`,
                                    afrikaans: `Aanvaar ${scriptTypelang.afrikaans} koekies`,
                                    arabic: `قبول ملفات تعريف الارتباط ${scriptTypelang.arabic}`,
                                    hindi: `स्वीकार करें ${scriptTypelang.hindi} कुकीज़`,
                                    turkish: `Kabul et ${scriptTypelang.turkish} çerezleri`,
                                    japanese: `クッキーを受け入れる ${scriptTypelang.japanese}`,
                                    korean: `쿠키 수락 ${scriptTypelang.korean}`,
                                    thai: `ยอมรับคุกกี้ ${scriptTypelang.thai}`,
                                    vietnamese: `Chấp nhận cookie ${scriptTypelang.vietnamese}`,
                                    indonesian: `Terima cookie ${scriptTypelang.indonesian}`,
                                    filipino: `Tanggapin ang cookies ${scriptTypelang.filipino}`,
                                    malay: `Terima kuki ${scriptTypelang.malay}`,
                                    chinese: `接受 ${scriptTypelang.chinese} cookies`,
                                    ukrainian: `Прийняти файли cookie ${scriptTypelang.ukrainian}`,
                                    hebrew: `קבל עוגיות ${scriptTypelang.hebrew}`,
                                }
                            }
                            let INTAlogo = (window.INT) ? window.INT.settings.logo : (window.INTA?.settings?.logo) ? window.INTA?.settings?.logo : null;
                            loopBlock(addedNodes, bannerContentMessage, script, buttonText, INTAlogo);
                        })
                    }
                    if (node.nodeType === 1 && node.tagName === "IFRAME") {
                        allScripts.map((script) => {

                            const buttonText = () => {
                                if (script.type == "marketing") {
                                    scriptTypelang = {
                                        danish: "marketing",
                                        english: "marketing",
                                        german: "werbe",
                                        spanish: "publicidad",
                                        swedish: "marknadsföring",
                                        french: "publicité",
                                        portuguese: "publicidade",
                                        italian: "pubblicità",
                                        russian: "реклама",
                                        norwegian: "markedsføring",
                                        finish: "mainonta",
                                        dutch: "reclame",
                                        polish: "reklama",
                                        afrikaans: "bemarking",
                                        arabic: "تسويق",
                                        hindi: "विपणन",
                                        turkish: "pazarlama",
                                        japanese: "マーケティング",
                                        korean: "마케팅",
                                        thai: "การตลาด",
                                        vietnamese: "tiếp thị",
                                        indonesian: "pemasaran",
                                        filipino: "pagmemerkado",
                                        malay: "pemasaran",
                                        chinese: "营销",
                                        ukrainian: "маркетинг",
                                        hebrew: "שיווק",
                                    }
                                } else if (script.type == "functional") {
                                    scriptTypelang = {
                                        danish: "funktionelle",
                                        english: "functional",
                                        german: "funktionelle",
                                        spanish: "funcional",
                                        swedish: "funktionell",
                                        french: "fonctionnel",
                                        portuguese: "funcional",
                                        italian: "funzionale",
                                        russian: "функциональный",
                                        norwegian: "funksjonelle",
                                        finish: "toiminnallinen",
                                        dutch: "functioneel",
                                        polish: "funkcjonalne",
                                        afrikaans: "funksionele",
                                        arabic: "وظيفي",
                                        hindi: "कार्यात्मक",
                                        turkish: "fonksiyonel",
                                        japanese: "機能的",
                                        korean: "기능적",
                                        thai: "ฟังก์ชัน",
                                        vietnamese: "chức năng",
                                        indonesian: "fungsional",
                                        filipino: "pampagana",
                                        chinese: "功能性",
                                        malay: "fungsional",
                                        ukrainian: "функціональний",
                                        hebrew: "פונקציונלי",
                                    }
                                } else if (script.type == "statics") {
                                    scriptTypelang = {
                                        danish: "statistiske",
                                        english: "statics",
                                        german: "statistische",
                                        spanish: "estadísticas",
                                        swedish: "statistik",
                                        french: "statistiques",
                                        portuguese: "estatísticas",
                                        italian: "statistico",
                                        russian: "статистика",
                                        norwegian: "statistiske",
                                        finish: "tilastollinen",
                                        dutch: "statistieken",
                                        polish: "statystyczne",
                                        afrikaans: "statistiese",
                                        arabic: "إحصائية",
                                        hindi: "सांख्यिकी",
                                        turkish: "istatistik",
                                        japanese: "統計",
                                        korean: "통계",
                                        thai: "สถิติ",
                                        vietnamese: "thống kê",
                                        indonesian: "statistik",
                                        filipino: "istatiska",
                                        malay: "statistik",
                                        chinese: "统计",
                                        ukrainian: "статистичний",
                                        hebrew: "סטטיסטי",
                                    }
                                }

                                return {
                                    danish: `Accepter ${scriptTypelang.danish} cookies`,
                                    english: `Accept ${scriptTypelang.english} cookies`,
                                    german: `Akzeptiere ${scriptTypelang.german} cookies`,
                                    spanish: `Aceptar cookies ${scriptTypelang.spanish}`,
                                    swedish: `Acceptera ${scriptTypelang.swedish} cookies`,
                                    french: `Accepter les cookies ${scriptTypelang.french}`,
                                    portuguese: `Aceitar cookies ${scriptTypelang.portuguese}`,
                                    italian: `Accetta i cookie ${scriptTypelang.italian}`,
                                    russian: `Принять файлы cookie ${scriptTypelang.russian}`,
                                    norwegian: `Aksepter ${scriptTypelang.danish} cookies`,
                                    finish: `Hyväksy ${scriptTypelang.danish} evästeet`,
                                    dutch: `Accepteer ${scriptTypelang.danish} cookies`,
                                    polish: `Akceptuj pliki cookie ${scriptTypelang.polish}`,
                                    afrikaans: `Aanvaar ${scriptTypelang.afrikaans} koekies`,
                                    arabic: `قبول ملفات تعريف الارتباط ${scriptTypelang.arabic}`,
                                    hindi: `स्वीकार करें ${scriptTypelang.hindi} कुकीज़`,
                                    turkish: `Kabul et ${scriptTypelang.turkish} çerezleri`,
                                    japanese: `クッキーを受け入れる ${scriptTypelang.japanese}`,
                                    korean: `쿠키 수락 ${scriptTypelang.korean}`,
                                    thai: `ยอมรับคุกกี้ ${scriptTypelang.thai}`,
                                    vietnamese: `Chấp nhận cookie ${scriptTypelang.vietnamese}`,
                                    indonesian: `Terima cookie ${scriptTypelang.indonesian}`,
                                    filipino: `Tanggapin ang cookies ${scriptTypelang.filipino}`,
                                    malay: `Terima kuki ${scriptTypelang.malay}`,
                                    chinese: `接受 ${scriptTypelang.chinese} cookies`,
                                    ukrainian: `Прийняти файли cookie ${scriptTypelang.ukrainian}`,
                                    hebrew: `קבל עוגיות ${scriptTypelang.hebrew}`,
                                }
                            }
                            let INTAlogo = (window.INT) ? window.INT.settings.logo : (window.INTA?.settings?.logo) ? window.INTA?.settings?.logo : null;
                            loopBlock(addedNodes, bannerContentMessage, script, buttonText, INTAlogo);
                        })
                    }

                    if (node.nodeType === 1 && node.tagName === "BLOCKQUOTE") {
                        allScripts.map((script) => {
                            addedNodes.forEach((tweet) => {

                                const buttonText = () => {
                                    if (script.type == "marketing") {
                                        scriptTypelang = {
                                            danish: "marketing",
                                            english: "marketing",
                                            german: "werbe",
                                            spanish: "publicidad",
                                            swedish: "marknadsföring",
                                            french: "publicité",
                                            portuguese: "publicidade",
                                            italian: "pubblicità",
                                            russian: "реклама",
                                            norwegian: "markedsføring",
                                            finish: "mainonta",
                                            dutch: "reclame",
                                            polish: "reklama",
                                            afrikaans: "bemarking",
                                            arabic: "تسويق",
                                            hindi: "विपणन",
                                            turkish: "pazarlama",
                                            japanese: "マーケティング",
                                            korean: "마케팅",
                                            thai: "การตลาด",
                                            vietnamese: "tiếp thị",
                                            indonesian: "pemasaran",
                                            filipino: "pagmemerkado",
                                            malay: "pemasaran",
                                            chinese: "营销",
                                            ukrainian: "маркетинг",
                                            hebrew: "שיווק",
                                        }
                                    } else if (script.type == "functional") {
                                        scriptTypelang = {
                                            danish: "funktionelle",
                                            english: "functional",
                                            german: "funktionelle",
                                            spanish: "funcional",
                                            swedish: "funktionell",
                                            french: "fonctionnel",
                                            portuguese: "funcional",
                                            italian: "funzionale",
                                            russian: "функциональный",
                                            norwegian: "funksjonelle",
                                            finish: "toiminnallinen",
                                            dutch: "functioneel",
                                            polish: "funkcjonalne",
                                            afrikaans: "funksionele",
                                            arabic: "وظيفي",
                                            hindi: "कार्यात्मक",
                                            turkish: "fonksiyonel",
                                            japanese: "機能的",
                                            korean: "기능적",
                                            thai: "ฟังก์ชัน",
                                            vietnamese: "chức năng",
                                            indonesian: "fungsional",
                                            filipino: "pampagana",
                                            chinese: "功能性",
                                            malay: "fungsional",
                                            ukrainian: "функціональний",
                                            hebrew: "פונקציונלי",
                                        }
                                    } else if (script.type == "statics") {
                                        scriptTypelang = {
                                            danish: "statistiske",
                                            english: "statics",
                                            german: "statistische",
                                            spanish: "estadísticas",
                                            swedish: "statistik",
                                            french: "statistiques",
                                            portuguese: "estatísticas",
                                            italian: "statistico",
                                            russian: "статистика",
                                            norwegian: "statistiske",
                                            finish: "tilastollinen",
                                            dutch: "statistieken",
                                            polish: "statystyczne",
                                            afrikaans: "statistiese",
                                            arabic: "إحصائية",
                                            hindi: "सांख्यिकी",
                                            turkish: "istatistik",
                                            japanese: "統計",
                                            korean: "통계",
                                            thai: "สถิติ",
                                            vietnamese: "thống kê",
                                            indonesian: "statistik",
                                            filipino: "istatiska",
                                            malay: "statistik",
                                            chinese: "统计",
                                            ukrainian: "статистичний",
                                            hebrew: "סטטיסטי",
                                        }
                                    }

                                    return {
                                        danish: `Accepter ${scriptTypelang.danish} cookies`,
                                        english: `Accept ${scriptTypelang.english} cookies`,
                                        german: `Akzeptiere ${scriptTypelang.german} cookies`,
                                        spanish: `Aceptar cookies ${scriptTypelang.spanish}`,
                                        swedish: `Acceptera ${scriptTypelang.swedish} cookies`,
                                        french: `Accepter les cookies ${scriptTypelang.french}`,
                                        portuguese: `Aceitar cookies ${scriptTypelang.portuguese}`,
                                        italian: `Accetta i cookie ${scriptTypelang.italian}`,
                                        russian: `Принять файлы cookie ${scriptTypelang.russian}`,
                                        norwegian: `Aksepter ${scriptTypelang.danish} cookies`,
                                        finish: `Hyväksy ${scriptTypelang.danish} evästeet`,
                                        dutch: `Accepteer ${scriptTypelang.danish} cookies`,
                                        polish: `Akceptuj pliki cookie ${scriptTypelang.polish}`,
                                        afrikaans: `Aanvaar ${scriptTypelang.afrikaans} koekies`,
                                        arabic: `قبول ملفات تعريف الارتباط ${scriptTypelang.arabic}`,
                                        hindi: `स्वीकार करें ${scriptTypelang.hindi} कुकीज़`,
                                        turkish: `Kabul et ${scriptTypelang.turkish} çerezleri`,
                                        japanese: `クッキーを受け入れる ${scriptTypelang.japanese}`,
                                        korean: `쿠키 수락 ${scriptTypelang.korean}`,
                                        thai: `ยอมรับคุกกี้ ${scriptTypelang.thai}`,
                                        vietnamese: `Chấp nhận cookie ${scriptTypelang.vietnamese}`,
                                        indonesian: `Terima cookie ${scriptTypelang.indonesian}`,
                                        filipino: `Tanggapin ang cookies ${scriptTypelang.filipino}`,
                                        malay: `Terima kuki ${scriptTypelang.malay}`,
                                        chinese: `接受 ${scriptTypelang.chinese} cookies`,
                                        ukrainian: `Прийняти файли cookie ${scriptTypelang.ukrainian}`,
                                        hebrew: `קבל עוגיות ${scriptTypelang.hebrew}`,
                                    }
                                }
                                let INTAlogo = (window.INT) ? window.INT.settings.logo : (window.INTA?.settings?.logo) ? window.INTA?.settings?.logo : null;
                                blockBlockQuotes(tweet, bannerContentMessage, script, buttonText, INTAlogo);
                            })
                        });
                    }

                    if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1 || intaCookieConsents?.advertisementCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.staticsticCookies == "false" || intaCookieConsents?.advertisementCookies == "null" && intaCookieConsents?.functionalCookies == "null" && intaCookieConsents?.staticsticCookies == "null"
                        || intaCookieConsents?.advertisementCookies == "" && intaCookieConsents?.functionalCookies == "" && intaCookieConsents?.staticsticCookies == "") {
                        if (node.nodeType === 1 && node.tagName === "LINK") {
                            addedNodes.forEach((link) => {
                                const linkSrc = link.href;
                                if (notRequired.test(linkSrc)) {
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

                                        deleteAllCookies();
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
                                    deleteAllCookies();
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
                                deleteAllCookies();
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


                        if (node.getAttribute("type") === "text/blocked") {
                            node.addEventListener(
                                "beforescriptexecute",
                                (e) => beforeScriptExecuteListener(e, node)
                            );
                        }
                        beforeScriptExecuteListener(null, node);
                    }
                });
            });
        });
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
deleteAllCookies();
clearLocalStorage();
if (!isGtmMode) {
    checkCookieStatus();
}