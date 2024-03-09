/*
 *  GDPR Cookie banner by Intastellar Solutions, International
 *  intastellarsolutions.com/gdpr-cookiebanner
 *  consents.cdn.intastellarsolutions.com/gdpr.js
 *  @copy 2022-2023 Intastellar Solutions, International
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
const intaCookieConsents = (getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents : null;
const intaCookieConsentsUserId = (getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.uid : null;
let poweredBy = "";
let intaConsentsObjectVariable = {
    consents: {
        staticsticCookies: false,
        functionalCookies: false,
        advertisementCookies: false,
    },
    time: new Date().toGMTString(),
    uid: Math.random().toString(16).slice(2),
    domain: window.location.host,
    sharingDomains: [],
}
let scriptTypelang = {};
let settingsMessage;
const foundScripts = window.foundScripts = [];
const intCookieIcon = intastellarAssetsCDNdomain + "/assets/icons/cookie_settings.svg";
const IntastellarCookieConsent = {
    renew: function () {
        document.querySelector(".intastellarCookieConstents").classList.add("--active");
        document.querySelector("html").classList.add("noScroll");
    },
    inizilize: function (template) {
        document.body.append(template);
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
        }else if(localStorage.getItem(cname) !== null){
            return localStorage.getItem(cname);
        }
    }
    return "";
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function encodeIntaConsentsObject(string, base) {
    var number = "0";
    var length = string.length;
    for (var i = 0; i < length; i++)
        number += string.charCodeAt(i).toString(base);
    return base+"."+number;
}

function decodeIntaConsentsObject(number) {
    var string = "";
    number = number?.slice(1);
    var length = number?.length;
    for (var i = 0; i < length;) {
        var code = number?.slice(i, i += 2);
        string += String.fromCharCode(parseInt(code, parseInt(getCookie(int_hideCookieBannerName).split(".")[1])));
    }

    return string;
}

const intastellarCreateBanner = document.createElement("script");
intastellarCreateBanner.src = intastellarCookieBannerRootDomain + "/cb.js";
intastellarCreateBanner.async = true;
if(window?.INTA?.settings?.dev){
    intastellarCreateBanner.src = "../../dev/cb.dev.js";
}
document.head.appendChild(intastellarCreateBanner);

/* Object for supported languages */
const intastellarSupportedLanguages = {
    english: {
        saveSettings: "Decline All",
        necessary: { // Object for cookie info
            title: "Strictly necessary", //"Necessary Cookies:",
            description:"Required web technologies and cookies make our website technically accessible to and usable for you. This applies to fundamental base functionalities such as navigation on the website, correct display in your internet browser or requesting your consent. Without these web technologies and cookies our website does not work.",
        },
        functional:{
            title: "Functional",
            description: "Functional cookies make it possible to save information that changes the way the website appears or acts. For instance your preferred language or region."
        },
        statisic:{
            title: "Statics",
            description:"We want to constantly improve the user-friendliness and performance of our websites. For this reason we use analysis technologies (including cookies) which pseudonymously measure and evaluate which functions and content of our websites are used, how and how often. On this basis we can improve our websites for users."
        },
        marketing: {
            title: "Marketing",
            description:"We use web technologies (also cookies) from selected partners in order to be able to show you content and advertising specially tailored to you on websites and social media sites. This content is selected and displayed on the basis of your usage behaviour. Advertisement or Marketing cookies are used to provide visitors with relevant ads and marketing campaigns. These cookies track visitors across websites and collect information to provide customized ads."
        },
    },
    german: {
        saveSettings: "Ablehnen",
        necessary: {
            title: "Erforderliche", //"Necessary Cookies:",
            description:"Erforderliche Webtechnologien und Cookies machen unsere Website für Sie technisch zugänglich und nutzbar. Dies betrifft grundlegende Basisfunktionalitäten wie die Navigation auf der Website, die korrekte Anzeige in Ihrem Internetbrowser oder das Einholen Ihrer Einwilligung. Ohne diese Webtechnologien und Cookies funktioniert unsere Website nicht.",
        },
        functional:{
            title: "Funktionel",
            description: "Funktionale Cookies ermöglichen es, Informationen zu speichern, die das Erscheinungsbild oder die Handlungen auf der Website ändern können. Dabei könnte es sich um Ihre bevorzugte Sprache oder Region handeln"
        },
        statisic:{
            title: "Statistik",
            description:"Wir möchten die Benutzerfreundlichkeit und Leistung unserer Websites stetig verbessern. Aus diesem Grund verwenden wir Analysetechnologien (einschließlich Cookies), die pseudonym messen und auswerten, welche Funktionen und Inhalte unserer Websites wie und wie oft genutzt werden. Auf dieser Grundlage können wir unsere Websites für die Nutzer verbessern."
        },
        marketing: {
            title: "Werbung",
            description:"Werbe- oder Marketing-Cookies werden verwendet, um Besuchern relevante Anzeigen und Marketingkampagnen bereitzustellen. Diese Cookies verfolgen Besucher über Websites hinweg und sammeln Informationen, um angepasste Anzeigen bereitzustellen."
        },
    },
    danish: {
        saveSettings: "Afvis",
        necessary: {
            title: "Nødvendige", //"Necessary Cookies:",
            description:"Påkrævede webteknologier og cookies gør vores hjemmeside teknisk tilgængelig for og brugbar for dig. Dette gælder grundlæggende basisfunktioner såsom navigation på hjemmesiden, korrekt visning i din internetbrowser eller anmodning om dit samtykke. Uden disse webteknologier og cookies fungerer vores hjemmeside ikke.",
        },
        functional:{
            title: "Funktionel",
            description: "Funktionelle cookies gør det muligt at gemme information, der ændrer måden hjemmesiden fremstår eller fungerer på. For eksempel dit foretrukne sprog eller område."
        },
        statisic:{
            title: "Statistik",
            description:"Vi ønsker konstant at forbedre brugervenligheden og ydeevnen på vores hjemmesider. Af denne grund bruger vi analyseteknologier (inklusive cookies), som pseudonymt måler og vurderer, hvilke funktioner og indhold på vores hjemmesider der bruges, hvordan og hvor ofte. På dette grundlag kan vi forbedre vores hjemmesider for brugerne."
        },
        marketing: {
            title: "Marketing",
            description:"Vi bruger webteknologier (også cookies) fra udvalgte partnere for at kunne vise dig indhold og annoncer, der er specielt skræddersyet til dig på hjemmesider og sociale medier. Dette indhold udvælges og vises på baggrund af din brugsadfærd. Annonce- eller marketingcookies bruges til at give besøgende relevante annoncer og marketingkampagner. Disse cookies sporer besøgende på tværs af websteder og indsamler oplysninger for at levere tilpassede annoncer."
        }
    }
}

if(window.INTA === undefined){
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
            StyleSheet: null
        }
    }
}
const INTA = window.INTA;

let tmpl = document.createElement('template');
tmpl.innerHTML = `
<style>:host { display:block; width: auto; max-width: 560px; }</style> <!-- look ma, scoped styles -->
<slot></slot>
`;

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
        let shadowRoot = this.attachShadow({mode: 'open'});
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
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(tmpl.content.cloneNode(true));
        shadowRoot.appendChild(templ.content.cloneNode(true))
    }
})

customElements.define('inta-consents-section', class extends HTMLElement {
    constructor() {
        super(); // always call super() first in the constructor.

        // Attach a shadow root to the element.
        let shadowRoot = this.attachShadow({mode: 'open'});
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
        let shadowRoot = this.attachShadow({mode: 'open'});
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
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(tmplStyle);
    }
    // ...
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
        d = (document.domain === "localhost" || window.location.host === "localhost" || document.domain === "127.0.0.1" || window.location.host === "127.0.0.1" || window.location.host.indexOf("127.0.0.1") > -1) ? "" : "." + document.domain || window.location.host,
        p = d.split(".")
    
        d = p.slice(-1 - ++i).join(".");
        d = d;

    return  "domain="+d+";";
})();

const intCookieDomainWithWWW = (function () {
    "use strict";
    var i = 0,
        d = (document.domain === "localhost" || window.location.host === "localhost" || document.domain === "127.0.0.1" || window.location.host === "127.0.0.1") ? "" : "." + document.domain || window.location.host,
        p = d.split(".")
    
        d = p.slice(-1 - ++i).join(".");
        d = d;

    return  "domain=www."+d+";";
})();

const allowAllCookieName = "__all__cookies";
const essentialsCookieName = "__essential__cookies";
const blockTrackingCookies = "__hideTrackingCookies";
const blockAdvertismentCookies = "__hideAdvertisementCookies";
const intHead = document.querySelector("head");

const cookieLifeTime = new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * 200).toGMTString();
/* List of cookies that should not be deleted */

const inta_requiredCookieList = [{
    vendor: (INTA.settings.company) ? INTA.settings.company : window.location.host,
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
        }
    ],
    domains: [
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
            window.location.host
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
            window.location.host
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
            window.location.host
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
    vendor: (INTA.settings.company) ? INTA.settings.company : window.location.host,
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
    if(cookie.type === "functional"){
        inta_functionalCookieList.forEach((vendor) => {
            if(vendor.vendor === window.INTA.settings.company){
                vendor.cookies.push({
                    cookie: cookie.cookie,
                    purpose: cookie?.purpose,
                    domain: cookie?.domain
                });
                requiredToKeep.push(vendor);
            }
        });
    }else if(cookie.type === "statistic"){
        inta_statisticCookieList.forEach((vendor) => {
            if(vendor.vendor === window.INTA.settings.company){
                vendor.cookies.push({
                    cookie: cookie.cookie,
                    purpose: cookie?.purpose,
                    domain: cookie?.domain
                });
                requiredToKeep.push(vendor);
            }
        });
    }else if(cookie.type === "marketing"){
        inta_marketingCookieList.forEach((vendor) => {
            if(vendor.vendor === window.INTA.settings.company){
                vendor.cookies.push({
                    cookie: cookie.cookie,
                    purpose: cookie?.purpose,
                    domain: cookie?.domain
                });
                requiredToKeep.push(vendor);
            }
        });
        
    }else{
        inta_requiredCookieList.forEach((vendor) => {
            if(vendor.vendor === window.INTA.settings.company){
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
/* Checking if config file needs to be loaded */
if(typeof window.INTA.policy_link === "undefined" && document.querySelector('script[src*="config.js"]') === null && window.INTA.settings.partnerDomain.indexOf(window.location.host) === -1){
    const intastellarDefaultConfigFile = "https://downloads.intastellarsolutions.com/cookieconsents/" + window.location.host.replace("www.", "") + "/config.js";
    const configScript = document.createElement("script");
    configScript.src = intastellarDefaultConfigFile;

    if (document.currentScript.async) {
        configScript.async = false;
        console.log("Executing asynchronously");
    } else {
        configScript.async = true;
        console.log("Executing synchronously");
    }

    document.head.insertBefore(configScript, document.currentScript);
}

/* - - - Helper function to get cookie type*/
function intaCookieType(type) {
    if (getCookie(type) === "checked") return true;
    return (getCookie(type) === "true")
}

/* function generateCookieRegex(item){ */
    /* Cookie name list for functional cookies */
if (getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1  && !intaCookieConsents?.functionalCookies) {
    let newArray = [...inta_functionalCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
    int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray);
}
/* Cookie name list for statistical cookies */
if(getCookie(int_hideCookieBannerName) != ""
&& getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 
&& intaCookieConsents?.staticsticCookies){
    let newArray = [...inta_statisticCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
    int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray)
}

/* Cookie name list for marketing / advertisment cookies */
if(getCookie(int_hideCookieBannerName) != ""
&& getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 
&& intaCookieConsents?.advertisementCookies){
    let newArray = [...inta_marketingCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
    int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray)
}

if(getCookie(int_hideCookieBannerName) != ""
&& getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 
&& intaCookieConsents?.functionalCookies){
    let newArray = [...inta_functionalCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
    int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray)
}

const int__cookiesToKeepRegx = new RegExp(int__cookiesToKeep.filter(function(entry) { return entry.trim() != ''; }).join("|"), "i");


const intaStyleLink = document.createElement('link');
intaStyleLink.rel = 'stylesheet';
intaStyleLink.type = 'text/css';
intaStyleLink.href = 'https://downloads.intastellarsolutions.com/css/gdpr/banner.css?v=' + new Date().getTime();
intaStyleLink.media = 'all';
intHead.insertBefore(intaStyleLink, document.currentScript.previousSibling);
const intastellarCookieLanguage = window.intastellarCookieLanguage = window.INTA.settings === undefined || window.INTA.settings.lang === "auto" || window.INTA.settings.lang === "" || window.INTA.settings.lang === undefined ? document.querySelector("html").getAttribute("lang") : window.INTA.settings.language == "german" ? "de" : window.INTA.settings.language == "danish" ? "da" : window.INTA.settings.language == "english" ? "en" : document.querySelector("html").getAttribute("lang");
const allScripts = [
    {
        /* Analytics Scripts which are beeing blocked */
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
            "([\-\.]clarity+)",
            "([\-\.]consensu+)",
            "([\-\.]ip-only+)",
            "([\-\.]ggpht+)",
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
window.dataLayer = window.dataLayer || [];
(adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=1;
(adsbygoogle=window.adsbygoogle||[]).requestNonPersonalizedAds=1;
function gtag() {
    dataLayer.push(arguments);
}
if(typeof fbq === "undefined" || typeof fbq === "null"){
    function fbq(){}
}

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

if(intaCookieConsents?.advertisementCookies){
    gtag('consent', 'update', {
        'personalization_storage': 'granted',
        'ads_data_redaction': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'url_passthrough': true,
    });
    (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0;
    (adsbygoogle=window.adsbygoogle||[]).requestNonPersonalizedAds=0;
}

if(intaCookieConsents?.staticsticCookies){
    gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'url_passthrough': true,
    })
}

if(intaCookieConsents?.functionalCookies){
    gtag('consent', 'update', {
        'functionality_storage': 'granted',
    })

}

if(window.INTA.settings.gtagId){
    gtag('config', window.INTA.settings.gtagId, {
        'user_id': ''+ intaCookieConsentsUserId+''
    });
}
fbq('consent', 'revoke');

let notRequired;
let m;
/* Helper function to merge arrays */
const merge = (first, second, third) => {
    /* first.splice(1, 0, "^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+"); */
    for(let i=0; i<second.length; i++) {
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
if (getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "checked" && intaCookieConsents?.staticsticCookies != "checked" && intaCookieConsents?.advertisementCookies != "checked") {
    m = merge(allScripts[1].scripts, allScripts[0].scripts)
    notRequired = new RegExp(m.join("|"), "ig"); 
} else if (getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.advertisementCookies == "checked" && intaCookieConsents?.staticsticCookies != "checked" && intaCookieConsents?.functionalCookies != "checked") {
    m = merge(allScripts[2].scripts, allScripts[0].scripts)
    notRequired = new RegExp(m.join("|"), "ig");
} else if (getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.staticsticCookies == "checked" && intaCookieConsents?.functionalCookies != "checked" && intaCookieConsents?.advertisementCookies != "checked") {
    m = merge(allScripts[1].scripts, allScripts[2].scripts)
    notRequired = new RegExp(m.join("|"), "ig");
} else if (getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "checked" && intaCookieConsents?.staticsticCookies == "checked") {
    m = allScripts[1].scripts;
    notRequired = new RegExp(m.join("|"), "ig");
} else if (getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "checked" && intaCookieConsents?.advertisementCookies == "checked") {
    m = allScripts[0].scripts;
    notRequired = new RegExp(m.join("|"), "ig");
} else if (getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.advertisementCookies == "checked" && intaCookieConsents?.staticsticCookies == "checked") {
    m = allScripts[2].scripts;
    notRequired = new RegExp(m.join("|"), "ig");
} else {
    m = merge(allScripts[0].scripts, allScripts[1].scripts, allScripts[2].scripts);
    notRequired = new RegExp(m.join("|"), "ig");
}
let s = document.createElement("script");
s.async = true;
s.src = "https://www.intastellarsolutions.com/js/analytics.js?v=" + new Date().getTime();
intHead.appendChild(s);

function checkCookieStatus() {
    /* To get anonymous cookie banner usage */

    /* Helper function to create Consents Block message for iframes etc.*/
    function ConsentsBlock(logo, textLanguage, btnText, datatype, img){
        let p = "";
        if(window.location.host.indexOf("intastellarsolutions.com") == -1){
            p = `<a class="inta-poweredBy" href='https://www.intastellarsolutions.com?utm_source=${encodeURI(window.location.href)}&utm_content=powered_by&utm_medium=referral&utm_campaign=Consents+Block&utm_term=gdpr_banner_logo' target='_blank' rel='noopener' style="align-items: center; text-decoration: none;font-size: 11.5px; color: #000 !important; display: flex; justify-content: center;">powered by <img width="109px" height="20px" style="width: 109px !important; height: 20px !important;margin-left: 10px;" src="https://www.intastellarsolutions.com/assets/intastellar_solutions.svg" alt="Intastellar Solutions, International"></a>`;
        }
        if(img !== undefined && img != ""){
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
        }else{
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

    function loopBlock(addedNodes, message, script, buttonText, logo) {
        addedNodes.forEach((frae) => {
            if(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.advertisementCookies === "checked"
                && intaCookieConsents?.functionalCookies === "checked" && intaCookieConsents?.staticsticCookies === "checked"){
                    return;
            }

            if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName).indexOf("__inta") == -1 || getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && !intaCookieConsents?.advertisementCookies && script.type == "marketing") {
                if (new RegExp(script.scripts.join("|"), "ig").test(frae.src) || frae?.className?.match(new RegExp(script.scripts.join("|"), "ig"))) {
                    frae.sandbox = "";
                    let ytIMG = "";
                    let video_id = "";
                    
                    if(frae.src != undefined){
                        if(frae.src.match("^(?:https?:)?//[^/]*(?:youtube(?:-nocookie)?\.com|youtu\.be).*[=/]([-\\w]{11})(?:\\?|=|&|$)")){
                            video_id = frae?.src?.match("^(?:https?:)?//[^/]*(?:youtube(?:-nocookie)?\.com|youtu\.be).*[=/]([-\\w]{11})(?:\\?|=|&|$)")?.pop();
                            if(video_id && !frae?.hasAttribute("inta-yt-placeholder-img")){
                                ytIMG = "https://img.youtube.com/vi/" + video_id + "/maxresdefault.jpg";
                            }else if(frae?.hasAttribute("inta-yt-placeholder-img")){
                                ytIMG = frae?.getAttribute("inta-yt-placeholder-img");
                            }
                        }else{
                            if(frae?.hasAttribute("inta-yt-placeholder-img")){
                                ytIMG = frae?.getAttribute("inta-yt-placeholder-img");
                            }
                        }
                    }
                    let a      = document.createElement('a');
                    a.href = frae.src;
                    let externalDomain = a.hostname;

                    
                    inta_marketingCookieList.forEach((cookie) => {
                        var i = 0,
                        d = externalDomain,
                        p = d.split(".")
                    
                        d = p.slice(-1 - ++i).join(".");
                        externalDomain = d;

                        if(cookie?.domains?.includes(externalDomain)){
                            externalDomain = cookie.vendor;
                        }    
                    })                
                    if(frae.src !== window.INTA.settings?.partnerDomain){
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
                    } else {
                        textLanguage = message(externalDomain, frae).danish;
                        btnText = buttonText().danish;
                    }

                    let settingsContent = document.createElement("inta-consents-iframe");
                    if(!frae.classList.contains("trustpilot-widget")){
                        settingsContent.setAttribute("data-src", a.href);
                    }
                    settingsContent.classList.add("intCookie_ConsentContainer");
                    if(ytIMG !== undefined && ytIMG != ""){
                        settingsContent.classList.add("yt-frame");
                    }
                    if(frae.classList.length > 0){
                        settingsContent.setAttribute("data-class", frae.className);
                    }
                    settingsContent.innerHTML = ConsentsBlock(logo, textLanguage, btnText, "intMarketingCookies", ytIMG);
                    if (frae.style.display != "none") {
                        frae.parentElement.replaceChild(settingsContent, frae);
                    }
                }
            } else if (getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && !intaCookieConsents?.functionalCookies && script.type == "functional") {
                if (new RegExp(script.scripts.join("|"), "ig").test(frae.src)) {
                    frae.sandbox = "";
                    let a      = document.createElement('a');
                    a.href = frae.src;
                    let externalDomain = a.hostname;
                    /* frae.src = "about:blank"; */

                    
                    inta_functionalCookieList.forEach((cookie) => {
                        var i = 0,
                        d = externalDomain,
                        p = d.split(".")
                    
                        d = p.slice(-1 - ++i).join(".");
                        externalDomain = d;
                        if(cookie?.domains?.includes(externalDomain)){
                            externalDomain = cookie.vendor;
                        }    
                    }) 

                    let textLanguage;
                    let btnText;
                    let intastellarCookieLanguage = window.intastellarCookieLanguage = window.INTA.settings === undefined || window.INTA.settings.lang === "auto" || window.INTA.settings.lang === "" ? document.querySelector("html").getAttribute("lang") : window.INTA.settings.language == "german" ? "de" : window.INTA.settings.language == "danish" ? "da" : window.INTA.settings.language == "english" ? "en" : document.querySelector("html").getAttribute("lang");
                    if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
                        textLanguage = message(externalDomain).danish;
                        btnText = buttonText().danish;
                    } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
                        textLanguage = message(externalDomain).german;
                        btnText = buttonText().german;
                    } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
                        textLanguage = message(externalDomain).english;
                        btnText = buttonText().english;
                    } else {
                        textLanguage = message(externalDomain).danish;
                        btnText = buttonText().danish;
                    }

                    let settingsContent = document.createElement("inta-consents");
                    settingsContent.classList.add("intCookie_ConsentContainer");
                    settingsContent.setAttribute("data-src", a.href);
                    settingsContent.innerHTML = ConsentsBlock(logo, textLanguage, btnText, "intFunctionalCookies");
                    if (frae.style.display != "none") {
                    frae.parentElement.replaceChild(settingsContent, frae);
                    }
                } else if (frae?.id?.indexOf("map") > -1 || frae?.id?.indexOf("google") > -1 && frae?.id?.indexOf("google_translate_element2") == -1) {
                    let externalDomain = "www.google.com";
                    inta_functionalCookieList.forEach((cookie) => {
                        var i = 0,
                        d = externalDomain,
                        p = d.split(".")
                    
                        d = p.slice(-1 - ++i).join(".");
                        externalDomain = d;
                        if(cookie?.domains?.includes(externalDomain)){
                            externalDomain = cookie.vendor;
                        }    
                    }) 

                    let textLanguage;
                    let btnText;
                    let intastellarCookieLanguage = window.intastellarCookieLanguage = window.INTA.settings === undefined || window.INTA.settings.lang === "auto" || window.INTA.settings.lang === "" ? document.querySelector("html").getAttribute("lang") : window.INTA.settings.language == "german" ? "de" : window.INTA.settings.language == "danish" ? "da" : window.INTA.settings.language == "english" ? "en" : document.querySelector("html").getAttribute("lang");
                    if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
                        textLanguage = message(externalDomain).danish;
                        btnText = buttonText().danish;
                    } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
                        textLanguage = message(externalDomain).german;
                        btnText = buttonText().german;
                    } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
                        textLanguage = message(externalDomain).english;
                        btnText = buttonText().english;
                    } else {
                        textLanguage = message(externalDomain).danish;
                        btnText = buttonText().danish;
                    }

                    let settingsContent = document.createElement("inta-consents");
                    settingsContent.classList.add("intCookie_ConsentContainer");
                    settingsContent.innerHTML = ConsentsBlock(logo, textLanguage, btnText, "intFunctionalCookies");
                    settingsContent.setAttribute("data-src", frae.src);
                    if (frae.style.display != "none") {
                        frae.parentElement.replaceChild(settingsContent, frae);
                    }
                }else if(frae?.id?.indexOf("google_translate_element2") > -1 ){
                    frae.parentElement.replaceChild("", frae);
                }
            }
        })
    }

    function blockBlockQuotes(tweet, message, script, buttonText, logo) {
        if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName).indexOf("__inta") == -1 || !intaCookieConsents?.advertisementCookies && script.type == "marketing" && notRequired?.test(tweet.className)) {
            let a      = document.createElement('a');
            a.href = tweet?.querySelector("a").href;
            let externalDomain = a.hostname;

            inta_marketingCookieList.forEach((cookie) => {
                var i = 0,
                d = externalDomain,
                p = d.split(".")
            
                d = p.slice(-1 - ++i).join(".");
                externalDomain = d;

                if(cookie?.domains?.includes(externalDomain)){
                    externalDomain = cookie.vendor;
                }    
            })

            let textLanguage;
            let btnText;
            let intastellarCookieLanguage = window.intastellarCookieLanguage = window.INTA.settings === undefined || window.INTA.settings.lang === "auto" || window.INTA.settings.lang === "" ? document.querySelector("html").getAttribute("lang") : window.INTA.settings.language == "german" ? "de" : window.INTA.settings.language == "danish" ? "da" : window.INTA.settings.language == "english" ? "en" : document.querySelector("html").getAttribute("lang");
            if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
                textLanguage = message(externalDomain).danish;
                btnText = buttonText().danish;
            } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
                textLanguage = message(externalDomain).german;
                btnText = buttonText().german;
            } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
                textLanguage = message(externalDomain).english;
                btnText = buttonText().english;
            } else {
                textLanguage = message(externalDomain).danish;
                btnText = buttonText().danish;
            }
            let settingsContent = document.createElement("inta-consents");
            settingsContent.classList.add("intCookie_ConsentContainer");
            settingsContent.innerHTML = ConsentsBlock(logo, textLanguage, btnText, "intMarketingCookies");
            settingsContent.setAttribute("data-src", a.href);
            if (tweet.style.display != "none") {
                tweet.parentElement.replaceChild(settingsContent, tweet);
            }
        }
    }

    /* - - - Helper function for message on the content block - - - */
    const message = (domain, node) => {
        if(node?.classList?.contains("trustpilot-widget")){
            domain = "www.trustpilot.com";  
        }
        inta_marketingCookieList.forEach((cookie) => {
            var i = 0,
            d = domain,
            p = d.split(".")
        
            d = p.slice(-1 - ++i).join(".");
            domain = d;
            
            if(cookie?.domains?.includes(domain)){
                domain = cookie.vendor;
            }    
        })
        return {
            danish: `<p>Dette indhold leveres af ${domain}.</p>`,
            english: `<p>This content is provided by ${domain}.</p>`,
            german: `<p>Dieser Inhalt wird von ${domain} bereitgestellt.</p>`
        }
    };

    document.fonts.addEventListener("loading", (event) => {
        /* console.log(event); */
    });

    /* - - - Cookie banner settings btn - - - */
    const ness = document.querySelectorAll(".intastellarCookieBanner__accpetNecssery");
    const all = document.querySelectorAll(".intastellarCookieSettings--acceptAll");
    const changePermission = document.querySelectorAll(".intastellarCookie-settings__btn.--changePermission");
    /* - - - Observer - - - */
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(({ addedNodes }) => {
            addedNodes.forEach((node) => {

                /* if(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && !intaCookieConsents?.functionalCookies){
                    window.INTA.settings.settings.styleSheets.map((sheet) => {

                    })
                } */

                /* Adding  custom button to all blocked embedded content on the site */
                if (node.nodeType === 1 && node.tagName === "IFRAME") {
                    allScripts.map((script) => {
                        const buttonText = () => {
                            if(script.type == "marketing"){
                               scriptTypelang = {
                                    danish: "marketing",
                                    english: "advertisement",
                                    german: "werbe"
                               } 
                            }else if(script.type == "functional"){
                                scriptTypelang = {
                                    danish: "funktionelle",
                                    english: "functional",
                                    german: "funktionelle"
                               }
                            }else if(script.type == "statics"){
                                scriptTypelang = {
                                    danish: "statistiske",
                                    english: "statics",
                                    german: "statistische"
                               }
                            }

                            return {
                                danish: `Accepter ${scriptTypelang.danish} cookies`,
                                english: `Accept ${scriptTypelang.english} cookies`,
                                german: `Akzeptiere ${scriptTypelang.german} cookies`
                            }
                        }
                        let INTAlogo = (window.INT) ? window.INT.settings.logo : (window.INTA.settings.logo) ? window.INTA.settings.logo : null;
                        loopBlock(addedNodes, message, script, buttonText, INTAlogo);
                    });   
                }

                if (node.nodeType === 1 && node.tagName === "DIV") {
                    allScripts.map((script) => {
                        
                        const buttonText = () => {
                            if(script.type == "marketing"){
                               scriptTypelang = {
                                    danish: "marketing",
                                    english: "advertisement",
                                    german: "werbe"
                               } 
                            }else if(script.type == "functional"){
                                scriptTypelang = {
                                    danish: "funktionelle",
                                    english: "functional",
                                    german: "funktionelle"
                               }
                            }else if(script.type == "statics"){
                                scriptTypelang = {
                                    danish: "statistiske",
                                    english: "statics",
                                    german: "statistische"
                               }
                            }

                            return {
                                danish: `Accepter ${scriptTypelang.danish} cookies`,
                                english: `Accept ${scriptTypelang.english} cookies`,
                                german: `Akzeptiere ${scriptTypelang.german} cookies`
                            }
                        }
                        let INTAlogo = (window.INT) ? window.INT.settings.logo : (window.INTA.settings.logo) ? window.INTA.settings.logo : null;
                        loopBlock(addedNodes, message, script, buttonText, INTAlogo);
                    })
                }

                if (node.nodeType === 1 && node.tagName === "BLOCKQUOTE") {
                    allScripts.map((script) => {
                        addedNodes.forEach((tweet) => {

                            const buttonText = () => {
                                if(script.type == "marketing"){
                                   scriptTypelang = {
                                        danish: "marketing",
                                        english: "advertisement",
                                        german: "werbe"
                                   } 
                                }else if(script.type == "functional"){
                                    scriptTypelang = {
                                        danish: "funktionelle",
                                        english: "functional",
                                        german: "funktionelle"
                                   }
                                }else if(script.type == "statics"){
                                    scriptTypelang = {
                                        danish: "statistiske",
                                        english: "statics",
                                        german: "statistische"
                                   }
                                }

                                return {
                                    danish: `Accepter ${scriptTypelang.danish} cookies`,
                                    english: `Accept ${scriptTypelang.english} cookies`,
                                    german: `Akzeptiere ${scriptTypelang.german} cookies`
                                }
                            }
                            let INTAlogo = (window.INT) ? window.INT.settings.logo : (window.INTA.settings.logo) ? window.INTA.settings.logo : null;
                            blockBlockQuotes(tweet, message, script, buttonText, INTAlogo);
                        })
                    });   
                }

                

                if(getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName).indexOf("__inta") == -1 || intaCookieConsents?.advertisementCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.staticsticCookies == "false" || intaCookieConsents?.advertisementCookies == "null" && intaCookieConsents?.functionalCookies == "null" && intaCookieConsents?.staticsticCookies== "null"
                    || intaCookieConsents?.advertisementCookies == "" && intaCookieConsents?.functionalCookies == "" && intaCookieConsents?.staticsticCookies == ""){
                        if (node.nodeType === 1 && node.tagName === "LINK") {
                        addedNodes.forEach((link) => {
                            const linkSrc = link.href;
                            if(notRequired.test(linkSrc)){
                                link.disabled = true;
                            }
                        })
                    }          
                }

                if (node.nodeType === 1 && node.tagName === "SCRIPT" && node.type !== 'application/ld+json' && node.innerText.indexOf("window.INTA") == -1 && node.innerText.indexOf("window.INT") == -1 && node.innerText.indexOf("window.INTA") == -1 && node.innerText.toLowerCase().indexOf("elementor") == -1 && node.innerText.toLowerCase().indexOf("chic_lite_data") == -1 && node.innerText.toLowerCase().indexOf("mailchimp_public_data") == -1 && node.innerText.toLowerCase().indexOf("monsterinsights_frontend") == -1) {
                    let src = node.src || "";

                    /* if(node.){
                        node.setAttribute("data-marketing", "")
                    } */

                    node.removeAttribute("charset");
                    addedNodes.forEach((node) => {
                        
                        src = node.src;
                        if (src.indexOf(window.location.hostname) == -1){
							window.foundScripts.push(src);
                        }
                            
                        const scriptTag = document.createElement("script");
                        scriptTag.src = src;

                        if(intaCookieConsents?.advertisementCookies === "checked" || intaCookieConsents?.functionalCookies === "checked" || intaCookieConsents?.staticsticCookies === "checked"){
                            node.type = "text/javascript";
                            return;
                        }

                        
                        
                        if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName).indexOf("__inta") == -1 || getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 || getCookie(int_hideCookieBannerName).indexOf("__inta") == -1 || intaCookieConsents?.advertisementCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.staticsticCookies == "false" || intaCookieConsents?.advertisementCookies == "null" && intaCookieConsents?.functionalCookies == "null" && intaCookieConsents?.staticsticCookies== "null"
                            || intaCookieConsents?.advertisementCookies == "" && intaCookieConsents?.functionalCookies == "" && intaCookieConsents?.staticsticCookies == "") {
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
                            } else if(src.indexOf(window.location.hostname) == -1
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
                        } else if(getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName).indexOf("__inta") == -1 || intaCookieConsents?.advertisementCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.staticsticCookies == "false" || intaCookieConsents?.advertisementCookies == "null" && intaCookieConsents?.functionalCookies == "null" && intaCookieConsents?.staticsticCookies== "null"
                        || intaCookieConsents?.advertisementCookies == "" && intaCookieConsents?.functionalCookies == "" && intaCookieConsents?.staticsticCookies == ""
                        ){
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
                            } else if(src.indexOf(window.location.hostname) == -1
                            && src.indexOf("jquery") == 1) {
                                node.type = "text/javascript";
                                node.defer = false;
                                node.async = false;
                            } else {
                                /* if(document.querySelector(scriptTag) === null){
                                    node.parentElement.appendChild(scriptTag);
                                } */
                            }

                            if (
                                notRequired.test(node.innerText)
                                && node.innerText.toLowerCase().indexOf("elementor") == -1
                            ) {
                                node.type = "text/blocked";
                                node.defer = true;
                                node.async = true;
                                /*if(node.parentElement !== null) node.parentElement.removeChild(node);*/
                            } else {
                                /* if(document.querySelector(scriptTag) === null){
                                    node.parentElement.appendChild(scriptTag);
                                } */
                            }
                        }

                        const beforeScriptExecuteListener = function (event) {
                            if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName).indexOf("__inta") == -1 || intaCookieConsents?.advertisementCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.staticsticCookies == "false" || intaCookieConsents?.advertisementCookies == "null" && intaCookieConsents?.functionalCookies == "null" && intaCookieConsents?.staticsticCookies== "null"
                            || intaCookieConsents?.advertisementCookies == "" && intaCookieConsents?.functionalCookies == "" && intaCookieConsents?.staticsticCookies == "") {

                                if (
                                    src.indexOf(window.location.hostname) == -1
                                    && src.indexOf("jquery") == -1 && src.indexOf("elementor") == -1
                                ) {
                                    if (
                                        notRequired.test(src)
                                    ) {
                                        /* console.log(notRequired, src) */
                                        node.defer = true;
                                        node.async = true;
                                        node.type = "text/blocked";
                                        /*if(node.parentElement !== null) node.parentElement.removeChild(node);*/
                                        deleteAllCookies();
                                    }
                                } else if(src.indexOf(window.location.hostname) == -1
                                && src.indexOf("jquery") == 1) {
                                    node.type = "text/javascript";
                                    node.defer = false;
                                    node.async = false;
                                } else {
                                }

                                if (
                                    notRequired.test(node.innerText)
                                    && node.innerText.toLowerCase().indexOf("elementor") == -1
                                ) {
                                    node.defer = true;
                                    node.async = true;
                                    node.type = "text/blocked";
                                    /*if(node.parentElement !== null) node.parentElement.removeChild(node);*/
                                    deleteAllCookies();
                                } else {
                                }
                            } else if(getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName).indexOf("__inta") == -1 || intaCookieConsents?.advertisementCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.staticsticCookies == "false" || intaCookieConsents?.advertisementCookies == "null" && intaCookieConsents?.functionalCookies == "null" && intaCookieConsents?.staticsticCookies== "null"
                            || intaCookieConsents?.advertisementCookies == "" && intaCookieConsents?.functionalCookies == "" && intaCookieConsents?.staticsticCookies == ""){
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
                                } else if(src.indexOf(window.location.hostname) == -1
                                && src.indexOf("jquery") == 1) {
                                    node.type = "text/javascript";
                                    node.defer = false;
                                    node.async = false;
                                } else {
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
                            } else if(intaCookieConsents?.functionalCookies === "checked" &&
                            intaCookieConsents?.advertisementCookies === "checked" &&
                            intaCookieConsents?.staticsticCookies === "checked") {
                                node.type = "text/javascript";
                            }

                            if (node.getAttribute("type") === "text/blocked")
                                event.preventDefault();
                            node.removeEventListener(
                                "beforescriptexecute",
                                beforeScriptExecuteListener
                            );
                        };

                        if(node.getAttribute("type") === "text/blocked"){
                            node.addEventListener(
                                "beforescriptexecute",
                                beforeScriptExecuteListener
                            );
                        }
                    });
                } else if (node.nodeType === 1 && node.tagName === "NOSCRIPT" && node.type !== 'application/ld+json' && node.innerText.indexOf("window.INTA") == -1 && node.innerText.indexOf("window.INT") == -1 && node.innerText.toLowerCase().indexOf("elementor") == -1) {
                    if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName).indexOf("__inta") == -1 || intaCookieConsents?.advertisementCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.staticsticCookies == "false" || intaCookieConsents?.advertisementCookies == "null" && intaCookieConsents?.functionalCookies == "null" && intaCookieConsents?.staticsticCookies== "null"
                    || intaCookieConsents?.advertisementCookies == "" && intaCookieConsents?.functionalCookies == "" && intaCookieConsents?.staticsticCookies == ""){

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
                    } else if(intaCookieConsents?.functionalCookies == "false" || intaCookieConsents?.advertisementCookies == "false" || intaCookieConsents?.staticsticCookies == "false"){
                        
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
                    }else if(intaCookieConsents?.functionalCookies === "checked" &&
                    intaCookieConsents?.advertisementCookies === "checked" &&
                    intaCookieConsents?.staticsticCookies === "checked") {
                        node.type = "text/javascript";
                    }

                    const beforeScriptExecuteListener = function (event) {
                        let src = node.src || "";
                        const scriptTag = document.createElement("script");
                        scriptTag.src = src;
                        if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName).indexOf("__inta") == -1 || intaCookieConsents?.advertisementCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.staticsticCookies == "false" || intaCookieConsents?.advertisementCookies == "null" && intaCookieConsents?.functionalCookies == "null" && intaCookieConsents?.staticsticCookies== "null"
                        || intaCookieConsents?.advertisementCookies == "" && intaCookieConsents?.functionalCookies == "" && intaCookieConsents?.staticsticCookies == "") {
                            if (
                                src.indexOf(window.location.hostname) == -1
                                && src.indexOf("jquery") == -1
                                && src.indexOf("elementor") == -1
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
                            } else if(src.indexOf(window.location.hostname) == -1
                            && src.indexOf("jquery") == 1) {
                                node.type = "text/javascript";
                                node.defer = false;
                                node.async = false;
                            } else {
                                /* if(document.querySelector(scriptTag) === null){
                                    node.parentElement.appendChild(scriptTag);
                                } */
                            }
                        } else if(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "false" ||intaCookieConsents?.advertisementCookies == "false" || intaCookieConsents?.staticsticCookies == "false"){
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
                            } else if(src.indexOf(window.location.hostname) == -1
                            && src.indexOf("jquery") == 1) {
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
                        }else if(intaCookieConsents?.functionalCookies === "checked" &&
                        intaCookieConsents?.advertisementCookies === "checked" &&
                        intaCookieConsents?.staticsticCookies === "checked") {
                            node.type = "text/javascript";
                        }

                        if (node.getAttribute("type") === "text/blocked")
                            event.preventDefault();
                        node.removeEventListener(
                            "beforescriptexecute",
                            beforeScriptExecuteListener
                        );
                    };
                    if(node.getAttribute("type") === "text/blocked"){
                        node.addEventListener(
                            "beforescriptexecute",
                            beforeScriptExecuteListener
                        );
                    }
                    beforeScriptExecuteListener();
                }
            });
        });
    });
    window.addEventListener("load", () => {
        observer.disconnect();
    })
    
    document.querySelectorAll('*').forEach((node) => {
        if (node.nodeType === 1 && node.tagName === "LINK") {
            const linkSrc = node.href;

            if(notRequired.test(linkSrc)){
                if(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1 && !intaCookieConsents?.functionalCookies){
                    if(node.parentElement !== null){
                        node.parentElement.removeChild(node);
                    } 
                }
            }
        }
    })

    startObserving(observer, document.documentElement);
    return observer;

};
function startObserving ( observer ) {
    observer.observe(document.documentElement, {
        childList: !0,
        subtree: !0,
        attributes:    true,
        characterDataOldValue: true
    })
}
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        if (!int__cookiesToKeepRegx.test(name)) {
            let localS = window.INTA.settings === undefined || window.INTA.settings.keepInLocalStorage === undefined ? "" : window.INTA.settings.keepInLocalStorage;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; " + intCookieDomain + " path=/";
            clearLocalStorage(localS);
        }
    }
}

function clearLocalStorage(ls) {
    if (ls != null ) {
        let lsA = Object.values(ls);

        if (lsA.length != 0 || lsA != null) {
            for (let i = 0; i < lsA.length; i++) {
                let item = localStorage.getItem(lsA[i]);
                let itemName = lsA[i];
                /* localStorage.clear();
                sessionStorage.clear(); */
                if(item != undefined || item != null){
                    localStorage.setItem(itemName, item);
                }
            }
        } else {
            /* localStorage.clear();
            sessionStorage.clear(); */
        }
    }
}
/* checkCookieStatus(); */
if (!document.currentScript.async) {
    checkCookieStatus();
}