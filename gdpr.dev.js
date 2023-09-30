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
const intastellarCookieBannerRootDomain = "https://consents.cdn.intastellarsolutions.com";
const intastellarAssetsCDNdomain = "https://www.intastellarsolutions.com/assets";
const intaCookieConsents = (getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents : null;
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
const intCookieIcon = intastellarAssetsCDNdomain + "/icons/cookie_settings.svg";

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

const region = (window.INTA?.settings?.requiredCookies) ? {
    cookie: "region",
    purpose: "This cookie is used to set users prefrence regarding the selected region.",
} : {}

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
        },
        region
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
const int__cookiesToKeep = [...inta_requiredCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1);
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
        },
        {
            cookie: "region",
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

/* - - - Function for Partner Url - - - */
function setIntastellarPartnerDomain(){
    if(window.INTA.settings.partnerDomain === null) return

    if (window.INTA.settings.partnerDomain.length > 0) {
        window.INTA.settings.partnerDomain.forEach(function(partner) {
            const partnerDomainIframe = document.createElement("iframe");
            partnerDomainIframe.id = "intastellarCrossSiteCheck";
            partnerDomainIframe.src = "https://" + partner + "?intastellarPartners=" + btoa(JSON.stringify({
                int_staticsticCookies: intaCookieConsents?.staticsticCookies,
                int_FunctionalCookies: intaCookieConsents?.functionalCookies,
                int_hideCookieBannerName: getCookie(int_hideCookieBannerName),
                int_marketingCookies: intaCookieConsents?.advertisementCookies
            }));

            const partnerDomainIframeNoScript = document.createElement("noscript");

            const getIntastellarPartnerScript = document.createElement("script");
            getIntastellarPartnerScript.async = true;
            getIntastellarPartnerScript.src = "https://consent.intastellarsolutions.com/getPartner.js?v=1." + new Date().getTime();
            partnerDomainIframe.style.display = "none";
            partnerDomainIframeNoScript.appendChild(partnerDomainIframe);
            if (!window.location.host.includes(partner)) {
                window.addEventListener("DOMContentLoaded", function(){
                    intHead.appendChild(partnerDomainIframeNoScript);
                   /*  document.body.appendChild(partnerDomainIframe); */
                })
            }else if(window.location.host.includes(partner)){   
                intHead.appendChild(getIntastellarPartnerScript);
            }
        })
    }
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
/* } */

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
        /* 
            "([\-\.]google-analytics+)",
            "([\-\.]googletagmanager+)",
        */
        type: "statics",
        scripts: [
            "(mixpanel)",
            "([\-\.]googleoptimize+)",
            /*"([\-\.]google-analytics+)",*/
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
            "([\-\.]googlesyndication+)",
            "([\-\.]googletagservices+)",
            "([\-\.]googleadservices+)",
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
            "([\-\.]omnisend+)",
            "([\-\.]omnisnippet+)",
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
            "([\-\.]doubleclick+)",
            "([\-\.]pinterest+)",
            "([\-\.]adform+)",
            "([\-\.]adnxs+)",
            "([\-\.]advertising+)",
            "([\-\.]adtech+)",
            "([\-\.]soundestlink+)",
            "([a-z]+){2,5}(:[0-9]{1,5})?(\\\\.*)"
        ]
    },
    {
        /* Functional Scripts which are beeing blocked */
        type: "functional",
        scripts: [
            "(maps.google.com+)",
            "(www.google.com/maps/+)",
            "(recaptcha+)",
            "(grecaptcha+)",
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

function checkCookieStatus() {
    /* To get anonymous cookie banner usage */
    let s = document.createElement("script");
    s.src = "https://www.intastellarsolutions.com/js/analytics.js?v=" + new Date().getTime();
    intHead.appendChild(s);

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
        if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName).indexOf("__inta") == -1 || !intaCookieConsents?.advertisementCookies && script.type == "marketing" && notRequired.test(tweet.className)) {
            let a      = document.createElement('a');
            a.href = tweet.querySelector("a").href;
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

                        node.addEventListener(
                            "beforescriptexecute",
                            beforeScriptExecuteListener
                        );
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
                    node.addEventListener(
                        "beforescriptexecute",
                        beforeScriptExecuteListener
                    );
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
                    console.log("Remove cookie");
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

checkCookieStatus();

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

/* --- Helper function to get Meta tags --- */
function getMeta(name) {
    var mtag = document.getElementsByTagName("meta");
    for (var i = 0; i < mtag.length; i++) {
        if (mtag[i].getAttribute('name') === name) {
            return mtag[i].getAttribute("content")
        }
    }
    return ''
}

function invertColor(color) {
    var r, g, b, hsp;

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
    var theCookies = document.cookie.split(";");
    var aString = "";
    for (var i = 1; i <= theCookies.length; i++) {
        aString += i + " " + theCookies[i - 1] + "\n";
    }
    return aString;
}

function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        values.push(getCookie(keys[i]));
    }

    return values;
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

/* Helper function to list all cookies */
function listAllCookies(cookieList){
    return cookieList.map((cookie) => {
        const vendor = cookie.vendor;
        if(intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK"){
            return `
                <section class="intaCookieListOverview-grid">
                    <section class="intaCookieList-left">
                        <h3 class="intaCookieListOverview-heading">Udbyder</h3>
                        <p class="intaCookieListOverview-vendor">${vendor}</p>
                        <p class="intaCookieListOverview-heading">Privat Politik</p>
                        <p>${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Privatslivs politik`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Privatslivs politik</a>`}</p>
                        <h4 class="intaCookieList-CookieName">Domæne</h4>
                        ${cookie.domains.map((cookie) => {
                            if(cookie == undefined) return;
                            return `
                                
                                <p>${cookie}</p>
                            `
                        }).join(" ")}
                    </section>
                    <section>
                        <h3 class="intaCookieListOverview-heading">Cookies</h3>
                        <section>
                            ${cookie.cookies.map((cookie) => {
                                if(cookie.cookie == undefined) return;
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
        }else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de"){
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">Anbieter</h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">Datenschutzerklährung</p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Datenschutzerklährung`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Datenschutzerklährung</a>`}
                    <h4 class="intaCookieList-CookieName">Domain</h4>
                    ${cookie.domains.map((cookie) => {
                        if(cookie == undefined) return;
                        return `
                            <p>${cookie}</p>
                        `
                    }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">Cookies</h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                            if(cookie.cookie == undefined) return;
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
        }else if(intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US"){
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">Vendor</h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">Privacy policy</p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Privacy policy`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Privacy policy</a>`}
                    <h4 class="intaCookieList-CookieName">Domains</h4>
                    ${cookie.domains.map((cookie) => {
                        if(cookie == undefined) return;
                        return `
                            <p>${cookie}</p>
                        `
                    }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">Cookies</h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                            if(cookie.cookie == undefined) return;
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
        }else {
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">Udbyder</h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">Privat Politik</p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Privatslivs politik`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Privatslivs politik</a>`}
                    <h4 class="intaCookieList-CookieName">Domæne</h4>
                    ${cookie.domains.map((cookie) => {
                        if(cookie == undefined) return;
                        return `
                            <p>${cookie}</p>
                        `
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
            pattern.test(str) && str.indexOf("datenschutz") != -1 ||
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
    var cookies = document.cookie.split(';');
    var ret = '';
    for(var i = 1; i <= cookies.length; i++) {
        ret += i + ' - ' + cookies[i - 1] + "<br>";
    }
    return ret;
}

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

const pluginSource = findScriptParameter("utm_source") === undefined ? "Intastellar+Solutions+Cookiebanner" : findScriptParameter("utm_source");
window.platform = findScriptParameter("utm_source") === undefined ? "Manual" : findScriptParameter("utm_source");

/* Adding Privacy Policy of Intastellar Solutions, International */

let intastellarSolutionsPrivacyPolicy = "https://www.intastellarsolutions.com/about/legal/privacy/gdpr-cookiebanner/embedded/privacy-policy";
const xhr = new XMLHttpRequest();
xhr.onload = function(){
    intastellarSolutionsPrivacyPolicy = "loading...";
    if(this.status === 200){
        intastellarSolutionsPrivacyPolicy = this.responseText;
    }
}

xhr.open("GET", "https://www.intastellarsolutions.com/about/legal/privacy/gdpr-cookiebanner/embedded/privacy-policy?lang=" + (window.INTA.settings === undefined || window.INTA.settings.lang === "auto" || window.INTA.settings.lang === "" ? document.querySelector("html").getAttribute("lang") : window.INTA.settings.language == "german" ? "de" : window.INTA.settings.language == "danish" ? "da" : window.INTA.settings.language == "english" ? "en" : document.querySelector("html").getAttribute("lang")) + "&v=" + new Date().getTime());
xhr.send();

function showPrivacy(){
    document.querySelector(".intLearnMoreBtn").style.display = "none";
    document.querySelector(".intastellarCookieConstents__content").style.scrollPaddingTop = "100px";
    const moreContentText = document.querySelector(".intastellar_privacyPolicy");
    moreContentText.style.height = "100%";
    moreContentText.style.background = "#ffff";
    moreContentText.style.color = "#000";
    moreContentText.style.borderBottom = "1px solid #c4c4c4"
    moreContentText.style.textAlign = "left";
    moreContentText.innerHTML = `
        <div style="padding: 25px;">
            <button onClick="hidePrivacy()" class="intastellarCookieBannerPrivacy-BackButton">Back</button>
            ${intastellarSolutionsPrivacyPolicy}
        </div>
    `;

    moreContentText.scrollIntoView({
        behavior: "smooth",
        block: "start",
    })
}

function hidePrivacy(){
    document.querySelector(".intLearnMoreBtn").style.display = "block";
    const moreContentText = document.querySelector(".intastellar_privacyPolicy");
    moreContentText.style.height = "0";
}

function checkIfIncluded(file) {
    var links = document.getElementsByTagName("link");
    for(var i = 0; i < links.length; i++) {
        if (links[i].href.substr(-file.length) == file)
            return true;
    }

    var scripts = document.getElementsByTagName("script");
    for(var i = 0; i < scripts.length; i++) {
        if (scripts[i].src.substr(-file.length) == file)
            return true;
    }

    return false;
}

/* - - - Helper functions for Validate policy link - - - */
function isValidCCPALink() {
    if (typeof window.INTA.settings.ccpa === "object" && isCCPAURL(window.INTA.settings.ccpa.url)) {
        if (window.INTA.settings.ccpa.url.length > 0 && typeof window.INTA.settings.ccpa.url != "undefined") {
            return true;
        }
    }

    return false;
}

const intastellarCreateBanner = document.createElement("script");
intastellarCreateBanner.async = true;
intastellarCreateBanner.src = intastellarCookieBannerRootDomain + "/cb.js";
if(window.INTA.settings.dev){
    intastellarCreateBanner.src = "../../cb.dev.js";
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

/* - - - Helper functions for Messages */
function generatePolicyUrl(policy_link_text) {
    let url = "";
    if (typeof window.INTA.policy_link === 'undefined') {
        throw new IntastellarSolutionsSDK("Policy URL has not been defined.")
        return;
    }
    if (typeof window.INTA.policy_link === "object") {
        url = "<a href='" + window.INTA.policy_link.url + "' target='" + window.INTA.policy_link.target + "' class='intastellarCookie-settings__privacyLink'>" + policy_link_text + "</a>"
    } else if (typeof window.INTA.policy_link === "string") {
        url = "<a href='" + window.INTA.policy_link + "' class='intastellarCookie-settings__privacyLink'>" + policy_link_text + "</a>";
    }
    return url;
}
function generateCookieButtons(allCookiesText, necessaryCookiesText,cookieSettingsText) {
    return '<button class="intastellarCookie-settings__btn --bg intastellarCookieSettings--acceptAll">' + allCookiesText + '</button>'
        + '<button class="intastellarCookie-settings__btn intastellarCookieBanner__accpetNecssery">' + necessaryCookiesText + '</button>'
        + '<button class="intastellarCookie-settings__btn intastellarCookieBanner__settings">'+ cookieSettingsText +'</button>';
}

function generateCookieSettingsButton(settingsText, allCookiesText) {
    return '<section class="intSettingsButton"><button class="intastellarCookie-settings__btn intastellarCookieBanner__settings --save">'+settingsText+'</button>'
        +   '<button class="intastellarCookie-settings__btn --noBorderRadius --bg intastellarCookieSettings--acceptAll">'+allCookiesText+'</button></section>'
        ;
}
/* - - - Helper function for ccpa URL generator */
function createCCPAPolicyLink(link){
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

if(typeof window.INTA.policy_link === "undefined"){
    const intastellarDefaultConfigFile = "https://downloads.intastellarsolutions.com/cookieconsents/" + window.location.hostname + "/config.js";
    const configScript = document.createElement("script");
    configScript.src = intastellarDefaultConfigFile;

    document.head.insertBefore(configScript, document.currentScript);
}

/* - - - Helper function to learn more - - - */
function learnMore(e) {
    /* if(document.querySelector(".intastellar_privacyPolicy").style.height === "100%") {
        document.querySelector(".intastellar_privacyPolicy").height = "0";
    } */
    document.querySelector(".intReadMore").classList.toggle("view");
    document.querySelector(".intastellarCookieConstents__content").style.scrollPaddingTop = "140px";

    if(document.querySelector(".intReadMore").classList.contains("view")){
        if(intastellarCookieLanguage == "da-DK" || intastellarCookieLanguage == "da" || intastellarCookieLanguage == "dk"){
            e.innerHTML = "Skjul detaljer";
        }else if(intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US"){
            e.innerHTML = "Hide details";
        }else if(intastellarCookieLanguage != null && intastellarCookieLanguage === "de" || intastellarCookieLanguage === "de-DE"){
            e.innerHTML = "Details ausblenden";
        }

        document.querySelector(".intReadMore").scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }else {
        if(intastellarCookieLanguage == "da-DK" || intastellarCookieLanguage == "da" || intastellarCookieLanguage == "dk"){
            e.innerHTML = "Vis details";
        }else if(intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US"){
            e.innerHTML = "Show details";
        }else if(intastellarCookieLanguage != null && intastellarCookieLanguage === "de" || intastellarCookieLanguage === "de-DE"){
            e.innerHTML = "Details einblenden";
        }

        document.querySelector(".intastellarCookieConstents__contentC").scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
}

function startObserving ( observer ) {
    observer.observe(document.documentElement, {
        childList: !0,
        subtree: !0,
        attributes:    true,
        characterDataOldValue: true
    })
}

/* - - - Helper function for saving settings - - - */

/* - - - END - - - */
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}

gtag('consent', 'default', {
    'ad_storage': (!intaCookieConsents.advertisementCookies || intaCookieConsents == null) ? 'denied' : 'granted',
    'personalization_storage': (!intaCookieConsents.advertisementCookies || intaCookieConsents == null) ? 'denied' : 'granted',
    'analytics_storage': (!intaCookieConsents.staticsticCookies || intaCookieConsents == null) ? 'denied' : 'granted',
    'functionality_storage': (!intaCookieConsents.functionalCookies || intaCookieConsents == null) ? 'denied' : 'granted',
    'ads_data_redaction': (!intaCookieConsents.advertisementCookies || intaCookieConsents == null) ? 'denied' : 'granted',
    'security_storage': 'granted',
    'url_passthrough': true,
    'wait_for_update': 500,
});

if(typeof fbq === "undefined" || typeof fbq === "null"){
    function fbq(){}
}
fbq('consent', 'revoke');

function updateConsents(consent, type = null){
    if(consent == "all"){
        let staticCookies = [...inta_statisticCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        let marketingCookie = [...inta_marketingCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        let functionalCookies = [...inta_functionalCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        int__cookiesToKeep.push.apply(int__cookiesToKeep, staticCookies);
        int__cookiesToKeep.push.apply(int__cookiesToKeep, marketingCookie);
        int__cookiesToKeep.push.apply(int__cookiesToKeep, functionalCookies);
        deleteAllCookies();
    }

    if(type.length > 0){
        type.forEach((t) => {
            
            if(t == "staticsticCookies"){
                let staticCookies = [...inta_statisticCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
                const index = int__cookiesToKeep.indexOf(staticCookies);
                if (index == -1) { // only splice array when item is found
                    int__cookiesToKeep.push.apply(int__cookiesToKeep, staticCookies);
                }
                deleteAllCookies();
            }else if(t == "advertisementCookies"){
                let marketingCookie = [...inta_marketingCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
                const index = int__cookiesToKeep.indexOf(marketingCookie);
                if (index == -1) { // only splice array when item is found
                    int__cookiesToKeep.push.apply(int__cookiesToKeep, marketingCookie);
                }
                deleteAllCookies();
            } else if(t == "functionalCookies"){
                let functionalCookies = [...inta_functionalCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
                const index = int__cookiesToKeep.indexOf(functionalCookies);
                if (index == -1) {
                    int__cookiesToKeep.push.apply(int__cookiesToKeep, functionalCookies);
                }
                deleteAllCookies();
            }
        })
    }

    /* if(intaCookieConsents.functionalCookies === "checked" && intaCookieConsents.staticsticCookies === "checked" && intaCookieConsents.advertisementCookies === "checked"){
        const intaBlockItemsContainer = document.querySelectorAll("inta-consents-iframe[data-src]");
        
        intaBlockItemsContainer.forEach((container) => {
            const newIframe = document.createElement("iframe");
            newIframe.border = "0";
            newIframe.frameBorder = "0";
            newIframe.setAttribute("inta-yt-placeholder-img", container.querySelector("inta-consents-bg").getAttribute("inta-bg-img"));
            if(container.getAttribute("data-src").indexOf("youtube") > -1 || container.getAttribute("data-src").indexOf("youtu.be") > -1){
                newIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                newIframe.title = "YouTube video player";
                newIframe.width = "560";
                newIframe.height = "315";
            }
            newIframe.src = container.getAttribute("data-src");
            container.parentElement.replaceChild(newIframe,container);
        })
    } */

    if(intaCookieConsents.staticsticCookies === "checked"){
        let newArray = [...inta_statisticCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray);
        deleteAllCookies();
    }

    if(intaCookieConsents.functionalCookies === "checked"){
        const intaBlockItemsContainer = document.querySelectorAll("inta-consents[data-src]");
        const marketingScriptTags = document.querySelectorAll("script[data-functional]");
        /* generateCookieRegex(); */
        marketingScriptTags.forEach((script) => {
            script.setAttribute("type", "text/javascript");
        })

        let newArray = [...inta_functionalCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray);
        deleteAllCookies();

        intaBlockItemsContainer.forEach((container) => {
            const newIframe = document.createElement("iframe");
            newIframe.border = "0";
            newIframe.frameBorder = "0";

            if(container.getAttribute("data-class")){
                newIframe.setAttribute("class", container.getAttribute("data-class"))
            }else{
                newIframe.width = "560";
                newIframe.height = "315";
            }

            if(container.getAttribute("data-src") !== "undefined"){
                newIframe.src = container.getAttribute("data-src");
                container.parentElement.replaceChild(newIframe,container);
            }
        })
    }

    if(intaCookieConsents.advertisementCookies === "checked"){
        const intaBlockItemsContainer = document.querySelectorAll("inta-consents-iframe[data-src]");
        const marketingScriptTags = document.querySelectorAll("script[data-marketing]");
        let newArray = [...inta_marketingCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray);
        deleteAllCookies();

        fbq('consent', 'grant');

        marketingScriptTags.forEach((script) => {
            script.setAttribute("type", "text/javascript");
        })

        intaBlockItemsContainer.forEach((container) => {
            const newIframe = document.createElement("iframe");
            newIframe.border = "0";
            newIframe.frameBorder = "0";
            newIframe.setAttribute("inta-yt-placeholder-img", container?.querySelector("inta-consents-bg")?.getAttribute("inta-bg-img"));
            
            if(container.getAttribute("data-src").indexOf("youtube") > -1 || container.getAttribute("data-src").indexOf("youtu.be") > -1){
                newIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                newIframe.title = "YouTube video player";
            }

            if(container.getAttribute("data-class")){
                newIframe.setAttribute("class", container.getAttribute("data-class"))
            }else{
                newIframe.width = "560";
                newIframe.height = "315";
            }

            newIframe.src = container.getAttribute("data-src");
            container.parentElement.replaceChild(newIframe,container);
        })
    }
}

function saveINTCookieSettings(consent, type = null) {
    document.querySelector("html").classList.remove("noScroll");
    document.querySelector(".intastellarCookieConstents").classList.remove("--active");
    const FunctionalCheckbox = document.querySelector("#functional");
    const StaticsCheckBox = document.querySelector("#statics");
    const MarketingCheckBox = document.querySelector("#marketing");

    if (StaticsCheckBox?.checked) {
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
        })

    }else {
        gtag('consent', 'update', {
            'analytics_storage': 'denied',
        })
    }

    intaConsentsObjectVariable.consents = {
        staticsticCookies: (StaticsCheckBox?.checked) ? "checked" : false,
        functionalCookies: (FunctionalCheckbox?.checked) ? "checked" : false,
        advertisementCookies: (MarketingCheckBox?.checked) ? "checked" : false,
    };
    intaConsentsObjectVariable.time = new Date().getTime()

    document.cookie = int_hideCookieBannerName + "=__inta1."+ encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable),randomIntFromInterval(20, 34)) +"; expires=" + cookieLifeTime +
    "; path=/; " +
    intCookieDomain +
    "";
    /*window.location.reload();*/
    updateConsents(consent, type);
    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
    .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");
}
const IntastellarCookieConsent = {
    renew: function () {
        document.querySelector(".intastellarCookieConstents").classList.add("--active");
        document.querySelector("html").classList.add("noScroll");
    },
    inizilize: function (template) {
        document.body.append(template);
    }
}

/* setIntastellarPartnerDomain(); */
document.head.prepend(intastellarCreateBanner);
window.addEventListener("load", function () {

    const temp = location.host.split('.').reverse();
    const domain = encodeURI(temp[1] + '.' + temp[0]);
    const trImage = document.createElement("iframe");
    trImage.name = "intastellar-solutions-sharinglibrary-iframe";
    trImage.style.display = "none";
    trImage.title = "Intastellar Solutions cookie sharing library";
    trImage.src = intastellarCookieBannerRootDomain + "/cookieSharingIframe.html";

    document.body.appendChild(trImage);

    gtag('set', {
        'user_id': (getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2])).uid : intaConsentsObjectVariable.uid
    });
    /* Setting Google consent default values to denied & granted based on user selection. Via that Google Ads can be shown on Webpage if user gives consents to Advertisment / Marketing cookies */
    /* (intaCookieConsents?.advertisementCookies == "false") ? '"denied"': '"granted"' */
    if (window.INT != undefined && window.INT.policy_link != undefined) { window.INTA.policy_link = window.INT.policy_link };
    if (window.INT != undefined && window.INT.settings != undefined) { window.INTA.settings = window.INT.settings };
    
    if (isValidPolicyLink()) {
        document.querySelectorAll(".intaCookieListOverview-vendor").forEach((vendor, i) => {
            if(window.INTA.settings.company != "" && window.INTA.settings.company != undefined && vendor.innerText == window.location.host){
                vendor.innerText = window.INTA.settings.company;
                /* let msg = document.querySelectorAll(".intastellarCookie-settings__privacyLink")[i].innerText.replace(window.location.host, ""); */
                /* document.querySelectorAll(".intastellarCookie-settings__privacyLink")[i].innerText = window.INTA.settings.company; */
            }
        });
        document.querySelectorAll(".intCookie_ConsentLogo").forEach((logo) => {
            logo.src = window.INTA.settings.logo;
        });
        /* - - - Helper function for learn more click - - - */
        document.querySelectorAll(".intLearnMoreBtn").forEach((btn) => {
            btn.addEventListener("click", function(e) {
                learnMore(this);
            })
        })

        window.INTA.settings?.partnerDomain?.forEach((domain) => {
            intaConsentsObjectVariable.sharingDomains.push(domain);
        })

        

        document.querySelectorAll(".intaExpandCookieList").forEach((btn, i) => {
            
            btn.addEventListener("click", () => {
                document.querySelectorAll(".intastellar__arrow")[i].classList.toggle("open");
                document.querySelectorAll(".intaCookieListOverview")[i].classList.toggle("view");
            })
        })

        let settings = document.querySelector(".intastellarCookie-settings__container");
        if (document.querySelector(".intastellarCookieBanner") != null) {
            if (getCookie(int_hideCookieBannerName).split(".")[0].indexOf("1") > -1) {
                document.querySelector(".intastellarCookieBanner").style.display = "none";
            } else {
                document.querySelector(".intastellarCookieBanner").style.display = "";
            }
        } else if (getCookie(int_hideCookieBannerName).split(".")[0].indexOf("1") > -1) {
            if (window.INTA.settings.advanced === false || window.INTA.settings.advanced === "" || window.INTA.settings.advanced === undefined) {
                document.querySelector("html").classList.toggle("noScroll");
                if(document.querySelector(".intastellarCookieConstents") != null){
                    document.querySelector(".intastellarCookieConstents").classList.toggle("--active"); 
                }
            } else {
                settings.classList.toggle("intastellarCookie-settings__container--expand");
            }
        }

        document.querySelectorAll(".intastellarCookieBanner__settings").forEach((setting) => {
            setting.addEventListener("click", () => {
                let intCookieSettingsMore = document.querySelector(".intastellarCookieConstents");
                if (!intCookieSettingsMore?.classList.contains("--active")) {
                    intCookieSettingsMore?.classList.add("--active");
                    document.querySelector(".intastellarCookie-settings__container").classList.remove("intastellarCookie-settings__container--expand")
                }
            });
        });

        const FunctionalCheckbox = document.querySelector("#functional");
        const StaticsCheckBox = document.querySelector("#statics");
        const MarketingCheckBox = document.querySelector("#marketing");
        const settingsSaveLang = {};
        
        if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
            settingsSaveLang.necessaryCookiesText = "Decline All";
            settingsSaveLang.saveSettingsText = "Save settings";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
            settingsSaveLang.necessaryCookiesText = "Ablehnen";
            settingsSaveLang.saveSettingsText = "Speichern";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
            settingsSaveLang.necessaryCookiesText = "Afvis";
            settingsSaveLang.saveSettingsText = "Gem indstillinger";
        } else {
            settingsSaveLang.necessaryCookiesText = "Afvis";
            settingsSaveLang.saveSettingsText = "Gem indstillinger";
        }

        FunctionalCheckbox?.addEventListener("change", () => {
            document.querySelector(".intastellarCookie-settings__btn.intastellarCookieBanner__settings.--save").innerText = FunctionalCheckbox?.checked === false
                && StaticsCheckBox?.checked === false
                && MarketingCheckBox?.checked === false
                ? settingsSaveLang.necessaryCookiesText : settingsSaveLang.saveSettingsText;
        })

        StaticsCheckBox?.addEventListener("change", () => {
            document.querySelector(".intastellarCookie-settings__btn.intastellarCookieBanner__settings.--save").innerText = FunctionalCheckbox?.checked === false
                && StaticsCheckBox?.checked === false
                && MarketingCheckBox?.checked === false
                ? settingsSaveLang.necessaryCookiesText : settingsSaveLang.saveSettingsText;
        })

        MarketingCheckBox?.addEventListener("change", () => {
            document.querySelector(".intastellarCookie-settings__btn.intastellarCookieBanner__settings.--save").innerText = FunctionalCheckbox?.checked === false
                && StaticsCheckBox?.checked === false
                && MarketingCheckBox?.checked === false
                ? settingsSaveLang.necessaryCookiesText : settingsSaveLang.saveSettingsText;
        })

        document.querySelector(".intastellarCookie-settings__btn.intastellarCookieBanner__settings.--save").innerText = FunctionalCheckbox?.checked === true
                && StaticsCheckBox?.checked === true
                && MarketingCheckBox?.checked === true
                || FunctionalCheckbox?.checked === true
                || StaticsCheckBox?.checked === true
                || MarketingCheckBox?.checked === true
            ? settingsSaveLang.saveSettingsText : settingsSaveLang.necessaryCookiesText

        document.querySelector(".--save").addEventListener("click",() => {
            const accepted = [];
            if (FunctionalCheckbox?.checked) {
                gtag('consent', 'update', {
                    'functionality_storage': 'granted',
                })
                accepted.push("functionalCookies");
            } else {
                gtag('consent', 'update', {
                    'functionality_storage': 'denied',
                })
                const index = accepted.indexOf("functionalCookies");
                if (index > -1) { // only splice array when item is found
                    accepted.splice(index, 1); // 2nd parameter means remove one item only
                }
            }
        
            if (StaticsCheckBox?.checked) {
                gtag('consent', 'update', {
                    'analytics_storage': 'granted',
                })
                accepted.push("staticsticCookies");
            }else {
                gtag('consent', 'update', {
                    'analytics_storage': 'denied',
                })
                const index = accepted.indexOf("staticsticCookies");
                if (index > -1) { // only splice array when item is found
                    accepted.splice(index, 1); // 2nd parameter means remove one item only
                }
            }
        
            if (MarketingCheckBox?.checked) {
                gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'personalization_storage': 'granted',
                    'ads_data_redaction':  'granted'
                })
                accepted.push("advertisementCookies");
            } else {
                gtag('consent', 'update', {
                    'ad_storage': 'denied',
                    'personalization_storage': 'denied',
                    'ads_data_redaction':  'denied'
                })
                const index = accepted.indexOf("advertisementCookies");
                if (index > -1) { // only splice array when item is found
                    accepted.splice(index, 1); // 2nd parameter means remove one item only
                }
            }
            saveINTCookieSettings("changePermission", accepted);
        });

        if (window.INTA.settings.ccpa !== undefined && window.INTA.settings.ccpa.on) {
            const closeCCPAButton = document.querySelector(".intastellarCCPA__popupClose");

            closeCCPAButton.addEventListener("click", () => {
                document.querySelector(".intastellarCCPApopup").classList.remove("--active");
            });
        }

        if (button__acceptAll != null || button__acceptAll != undefined) {
            button__acceptAll.addEventListener("click", function () {
                var cV = 0;
                intaConsentsObjectVariable.consents = {
                    staticsticCookies: "checked",
                    functionalCookies:  "checked",
                    advertisementCookies: "checked",
                };
                intaConsentsObjectVariable.time = new Date().getTime()
                document.cookie =
                    int_hideCookieBannerName + "=__inta1."+ encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable),randomIntFromInterval(20, 34)) +"; expires=" + cookieLifeTime +
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
                document.querySelector(".intastellarCookieConstents").classList.toggle("--active");

                gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'personalization_storage': 'granted',
                    'analytics_storage': 'granted',
                    'functionality_storage': 'granted',
                    'ads_data_redaction': 'granted',
                    'url_passthrough': true,
                });
                updateConsents("all");
                /*window.location.reload();*/
            });
        }

        if (button__acceptAll != null || button__acceptAll != undefined) {
            button__acceptAll.addEventListener("click", function () {
                var cV = 1;
                intaConsentsObjectVariable.consents = {
                    staticsticCookies: "checked",
                    functionalCookies:  "checked",
                    advertisementCookies: "checked",
                };
                intaConsentsObjectVariable.time = new Date().getTime()
                document.cookie =
                    int_hideCookieBannerName + "=__inta1."+ encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable),randomIntFromInterval(20, 34)) +"; expires=" + cookieLifeTime +
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
                var addedNodes = document.getElementsByTagName("script");
                for (var i = 0; i < addedNodes.length; i++) {
                    addedNodes.type = "";
                }
                document.querySelector("html").classList.toggle("noScroll");
                document.querySelector(".intastellarCookieConstents").classList.toggle("--active");

                window.addEventListener("message", function(e){
                    if(e.data != "ready" && e.origin != intastellarCookieBannerRootDomain) return
                    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                    .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");
                })

                gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'personalization_storage': 'granted',
                    'analytics_storage': 'granted',
                    'functionality_storage': 'granted',
                    'ads_data_redaction': 'granted',
                    'url_passthrough': true,
                });
                updateConsents("all");
                /*window.location.reload();*/
            });
        }

        if (button__acceptAll != null || button__acceptAll != undefined) {
            button__acceptAllNecessary.addEventListener("click", function () {
                intaConsentsObjectVariable.consents = {
                    staticsticCookies: false,
                    functionalCookies:  false,
                    advertisementCookies: false,
                };
                intaConsentsObjectVariable.time = new Date().getTime()
                var cV = 1;
                document.cookie =
                    int_hideCookieBannerName + "=__inta1."+ encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable),randomIntFromInterval(20, 34)) +"; expires=" + cookieLifeTime +
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
                document.querySelector(".intastellarCookieConstents").classList.toggle("--active");

                window.addEventListener("message", function(e){
                    if(e.data != "ready" && e.origin != intastellarCookieBannerRootDomain) return
                    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                    .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");
                })
                
                /*window.location.reload();*/

            });
        }

        if (button__acceptAll != null || button__acceptAll != undefined) {
            const configBtn = document.querySelectorAll(".intastellarCookie-settingsContainer");

            const ness = document.querySelectorAll(".intastellarCookieBanner__accpetNecssery");
            const all = document.querySelectorAll(".intastellarCookieSettings--acceptAll");

            const analyticsBTN = document.querySelector(".analytics");
            const closeSettings = document.querySelector(".intastellarCookie-settings__close");
            const changePermission = document.querySelectorAll(".intastellarCookie-settings__btn.--changePermission");

            changePermission.forEach((change) => {
                change.addEventListener("click", function () {
                    if (this.getAttribute("data-type") == "intMarketingCookies") {
                        document.querySelector("#marketing").checked = true;
                    } else if (this.getAttribute("data-type") == "intFunctionalCookies") {
                        document.querySelector("#functional").checked = true;
                    }
                    saveINTCookieSettings("changePermission", this.getAttribute("data-type"));
                    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                    .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");
                })
            })

            if (window.INTA.settings.advanced === false || window.INTA.settings.advanced === "" || window.INTA.settings.advanced === undefined) {
                configBtn.forEach((configs) => {
                    configs.addEventListener("click", function () {
                        let settings = document.querySelector(".intastellarCookie-settings__container");
                        document.querySelector("html").classList.toggle("noScroll");
                        settings.classList.toggle("intastellarCookie-settings__container--expand");
                    });
                })
            } else {
                configBtn.forEach((configs) => {
                    configs.addEventListener("click", function () {
                        let settings = document.querySelector(".intastellarCookieConstents");
                        /* document.querySelector("html").classList.toggle("noScroll"); */
                        settings.classList.toggle("--active");
                    });
                })
            }
            if (window.INTA.settings.advanced) {
                closeSettings.addEventListener("click", function () {
                    let settings = document.querySelector(".intastellarCookie-settings__container");
                    settings.classList.toggle("intastellarCookie-settings__container--expand");
                })
            }

            if (analyticsBTN != null || analyticsBTN != undefined) {
                analyticsBTN.addEventListener("click", function () {
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName + "=__inta1."+ encodeIntaConsentsObject(JSON.stringify({
                                consents: {
                                    staticsticCookies: (StaticsCheckBox?.checked) ? "checked" : false,
                                    functionalCookies: (FunctionalCheckbox?.checked) ? "checked" : false,
                                    advertisementCookies: (MarketingCheckBox?.checked) ? "checked" : false,
                                },
                                time: new Date().getTime()
                            }),randomIntFromInterval(20, 34)) +"; expires=" + cookieLifeTime +
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
                })
            }

            ness.forEach((n) => {
                n.addEventListener("click", function () {
                    intaConsentsObjectVariable.consents = {
                        staticsticCookies: false,
                        functionalCookies:  false,
                        advertisementCookies: false,
                    };
                    intaConsentsObjectVariable.time = new Date().getTime()
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName + "=__inta1."+ encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable),randomIntFromInterval(20, 34)) +"; expires=" + cookieLifeTime +
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
                    document.querySelector(".intastellarCookieConstents").classList.toggle("--active");

                    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                    .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");

                    gtag('consent', 'update', {
                        'ad_storage': 'denied',
                        'personalization_storage': 'denied',
                        'analytics_storage': 'denied',
                        'functionality_storage': 'denied',
                        'ads_data_redaction': 'denied',
                        'url_passthrough': true,
                    });
                    updateConsents("denied");
                    document.querySelector("#marketing").checked = false;
                    document.querySelector("#statics").checked = false;
                    document.querySelector("#functional").checked = false;
                    /*window.location.reload();*/
                });
            });
            
            all.forEach((a) => {
                a.addEventListener("click", function () {
                    intaConsentsObjectVariable.consents = {
                        staticsticCookies: "checked",
                        functionalCookies:  "checked",
                        advertisementCookies: "checked",
                    };
                    intaConsentsObjectVariable.time = new Date().getTime()
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName + "=__inta1."+ encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable),randomIntFromInterval(20, 34)) +"; expires=" + cookieLifeTime +
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
                    
                    var addedNodes = document.getElementsByTagName("script");
                    for (var i = 0; i < addedNodes.length; i++) {
                        addedNodes.type = "";
                    }



                    document.querySelector("html").classList.toggle("noScroll");
                    document.querySelector(".intastellarCookieConstents").classList.toggle("--active");

                    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                    .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");

                    gtag('consent', 'update', {
                        'ad_storage': 'granted',
                        'personalization_storage': 'granted',
                        'analytics_storage': 'granted',
                        'functionality_storage': 'granted',
                        'ads_data_redaction': 'granted',
                        'url_passthrough': true,
                    });
                    updateConsents("all");
                    document.querySelector("#marketing").checked = true;
                    document.querySelector("#statics").checked = true;
                    document.querySelector("#functional").checked = true;
                    /*window.location.reload();*/
                })
            });
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

            changePermission.forEach((change) => {
                change.addEventListener("click", function () {
                    if (this.getAttribute("data-type") == "intMarketingCookies") {
                        document.querySelector("#marketing").checked = true;
                    } else if (this.getAttribute("data-type") == "intFunctionalCookies") {
                        document.querySelector("#functional").checked = true;
                    }
                    saveINTCookieSettings("changePermission", this.getAttribute("data-type"));
                    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                    .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");
                    
                })
            })
            /* Showing default banner when no custom banner is set */
            if (document.querySelector(".intastellarCookieBanner") == null || document.querySelector(".intastellarCookieBanner") == undefined) {
                if (window.INTA.settings.advanced === false || window.INTA.settings.advanced === "" || window.INTA.settings.advanced === undefined) {
                    document.querySelector("html").classList.toggle("noScroll");
                    document.querySelector(".intastellarCookieConstents").classList.toggle("--active");
                } else {
                    settings.classList.toggle("intastellarCookie-settings__container--expand");
                }
            }

            if (window.INTA.settings.advanced) {
                configBtn.forEach((configs) => {
                    configs.addEventListener("click", function () {
                        let settings = document.querySelector(".intastellarCookie-settings__container");
                        document.querySelector("html").classList.toggle("noScroll");
                        settings.classList.toggle("intastellarCookie-settings__container--expand");
                    });
                })

                config.forEach((configs) => {
                    configs.addEventListener("click", function () {
                        let settings = document.querySelector(".intastellarCookie-settings__container");
                        settings.classList.toggle("intastellarCookie-settings__container--expand");
                    });
                })
            } else {
                configBtn.forEach((configs) => {
                    configs.addEventListener("click", function () {
                        let settings = document.querySelector(".intastellarCookieConstents");
                        document.querySelector("html").classList.toggle("noScroll");
                        settings.classList.add("--active");
                    });
                })
            }
            if (window.INTA.settings.advanced) {
                closeSettings.addEventListener("click", function () {
                    let settings = document.querySelector(".intastellarCookie-settings__container");
                    settings.classList.toggle("intastellarCookie-settings__container--expand");
                })
            }

            ness.forEach((n) => {
                n.addEventListener("click", function () {
                    intaConsentsObjectVariable.consents = {
                        staticsticCookies: false,
                        functionalCookies:  false,
                        advertisementCookies: false,
                    };
                    intaConsentsObjectVariable.time = new Date().getTime()
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName + "=__inta1."+ encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable),randomIntFromInterval(20, 34)) +"; expires=" + cookieLifeTime +
                        "; path=/;" +
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
                    document.querySelector(".intastellarCookieConstents").classList.toggle("--active");

                    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                    .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");
                    document.querySelector("#marketing").checked = false;
                    document.querySelector("#statics").checked = false;
                    document.querySelector("#functional").checked = false;
                    /*window.location.reload();*/
                });
            });

            all.forEach((a) => {
                a.addEventListener("click", function () {
                    var cV = 1;

                    intaConsentsObjectVariable.consents = {
                            staticsticCookies: "checked",
                            functionalCookies:  "checked",
                            advertisementCookies: "checked",
                        };
                    intaConsentsObjectVariable.time = new Date().getTime()

                    document.cookie =
                        int_hideCookieBannerName + "=__inta1."+ encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable),randomIntFromInterval(20, 34)) +"; expires=" + cookieLifeTime +
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
                    
                    var addedNodes = document.getElementsByTagName("script");
                    for (var i = 0; i < addedNodes.length; i++) {
                        addedNodes.type = "";
                    }
                    document.querySelector("html").classList.toggle("noScroll");
                    document.querySelector(".intastellarCookieConstents").classList.toggle("--active");

                    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                    .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");

                    gtag('consent', 'update', {
                        'ad_storage': 'granted',
                        'personalization_storage': 'granted',
                        'analytics_storage': 'granted',
                        'functionality_storage': 'granted',
                        'ads_data_redaction': 'granted',
                        'url_passthrough': true,
                    });
                    
                    updateConsents("all");
                    document.querySelector("#marketing").checked = true;
                    document.querySelector("#statics").checked = true;
                    document.querySelector("#functional").checked = true;
                    /*window.location.reload();*/
                })
            });
        }

        if(window.INTA.settings?.partnerDomain?.includes(window.location.host)){
            document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
            .postMessage("you´re open to share with me", "*");
            window.addEventListener("message", (e) => {
                if(e.data.cookieSharing){
                    const sharedCookies = e.data.cookieSharing;
                    console.log(sharedCookies);
                }
            })
        }

    } else {
        checkCookieStatus();
        /* Displaying a error message if no valid privacy url is giving */
        const errorMessage = document.createElement("div");
        const errorMessageContent = document.createElement("div");

        errorMessage.className = "intastellarErrorMessage";
        errorMessageContent.className = "intastellarErrorMessage-content";

        errorMessageContent.innerHTML = "Intastellar Solutions SDK: Please add a valid privacy & cookie policy to the banner. Read more at <a href='https://developers.intastellarsolutions.com/gdpr-cookiebanner/docs/add-privacy-policy' target='_blank' rel='noopener'>https://developers.intastellarsolutions.com/gdpr-cookiebanner/docs/add-privacy-policy</a>";

        errorMessage.appendChild(errorMessageContent);
        document.body.appendChild(errorMessage);

        throw new IntastellarSolutionsSDK("Please add a valid privacy & cookie policy to the banner. Read more at https://developers.intastellarsolutions.com/gdpr-cookiebanner/docs/add-privacy-policy")
    }
});