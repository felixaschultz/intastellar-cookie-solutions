/*
 *  GDPR Cookie banner by Intastellar Solutions, International
 *  intastellarsolutions.com/gdpr-cookiebanner
 *  @copy 2022 Intastellar Solutions, International
 *
*/
"use strict";
/* - - - Setup - - - */
const intaCookiePref = "__inta-cookieconsents:";
const int_hideCookieBannerName = intaCookiePref + "hideBanner";
const int_cookieName = intaCookiePref + "ac_cookie";
const int_FunctionalCookies = intaCookiePref + "Functional-cookies";
const int_marketingCookies = intaCookiePref + "Advertisment-cookies";
const int_staticsticCookies = intaCookiePref + "Statistics-cookies";
const int_analytic = intaCookiePref + "analytics";
const int_gmc = intaCookiePref + "gmc";
const int_visitorCheck = intaCookiePref + "visitorCheck";
const button__acceptAll = document.querySelector(".intastellarCookieBanner__acceptAll");
const button__acceptAllNecessary = document.querySelector(".intastellarCookieBanner__acceptNecessary");
let scriptTypelang = {};
let settingsMessage;

const intCookieIcon = "https://www.intastellarsolutions.com/assets/icons/cookie_settings.svg";

const saveSettings = {
    danish: "Afvis",
    german: "Ablehnen",
    english: "Decline All"
}

const INTA = window.INTA = {
    policy_link: undefined,
    settings: {
        lang: "auto",
        color: "rgba(0, 51, 153, 1)",
        keepInLocalStorage: [],
        arrange: "ltr",
        logo: intCookieIcon
    }
}

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
        d = (document.domain === "localhost" || window.location.host === "localhost" || document.domain === "127.0.0.1" || window.location.host === "127.0.0.1") ? "" : "." + document.domain || window.location.host,
        p = d.split(".")
    
        d = p.slice(-1 - ++i).join(".");
        d = d;

    return  "domain="+d +";";
})();

const intCookieDomainWithWWW = (function () {
    "use strict";
    var i = 0,
        d = (document.domain === "localhost" || window.location.host === "localhost" || document.domain === "127.0.0.1" || window.location.host === "127.0.0.1") ? "" : "." + document.domain || window.location.host,
        p = d.split(".")
    
        d = p.slice(-1 - ++i).join(".");
        d = d;

    return  "domain=www"+d +";";
})();

const allowAllCookieName = "__all__cookies";
const essentialsCookieName = "__essential__cookies";
const blockTrackingCookies = "__hideTrackingCookies";
const blockAdvertismentCookies = "__hideAdvertisementCookies";
const intHead = document.querySelector("head");

const cookieLifeTime = new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * 200).toGMTString();

/* List of cookies that should not be deleted */
const inta_requiredCookieList = [
    "PHPSESSID",
    "SCJP",
    "SCJD",
    "SCWCD",
    "SCBCD",
    "SCDJWS",
    int_FunctionalCookies,
    int_staticsticCookies,
    int_marketingCookies,
    int_cookieName,
    int_hideCookieBannerName,
    int_visitorCheck
];
const int__cookiesToKeep = inta_requiredCookieList.slice();

/* - - - List of Analytics / Statistics cookie names - - - */
const inta_statisticCookieList = [];
inta_statisticCookieList.push("_clck");
inta_statisticCookieList.push("_clsk");
inta_statisticCookieList.push("CLID");
inta_statisticCookieList.push("ANONCHK");
inta_statisticCookieList.push("MR");
inta_statisticCookieList.push("MUID");
inta_statisticCookieList.push("SM");
inta_statisticCookieList.push("_ga");
inta_statisticCookieList.push("__gp");
inta_statisticCookieList.push("_gid");
inta_statisticCookieList.push("_dc_gtm_");
inta_statisticCookieList.push("_gaexp_rc");
inta_statisticCookieList.push("_gaexp");
inta_statisticCookieList.push("_gat");
inta_statisticCookieList.push("_opt_expid");
inta_statisticCookieList.push("_clsk");
inta_statisticCookieList.push("_uetvid");
inta_statisticCookieList.push("FPAU");
inta_statisticCookieList.push("FPGCLDC");
inta_statisticCookieList.push("_gcl_dc");
inta_statisticCookieList.push("_gcl_au");
inta_statisticCookieList.push("FCNEC");
inta_statisticCookieList.push("FPLC");
inta_statisticCookieList.push("FPGCLAW");
inta_statisticCookieList.push("FPGCLGB");
inta_statisticCookieList.push("_gcl_gb");
inta_statisticCookieList.push("_gac_gb_");
inta_statisticCookieList.push("_gcl_aw");
inta_statisticCookieList.push("__utma");
inta_statisticCookieList.push("__utmb");
inta_statisticCookieList.push("__utmc");
inta_statisticCookieList.push("__utmt");
inta_statisticCookieList.push("__utmz");
inta_statisticCookieList.push("__utmv");
inta_statisticCookieList.push("FPID");
inta_statisticCookieList.push("_opt");
inta_statisticCookieList.push("_gcl");
inta_statisticCookieList.push("_hjSessionUser_");
inta_statisticCookieList.push("_hjid");
inta_statisticCookieList.push("_hjFirstSeen");
inta_statisticCookieList.push("_hjUserAttributesHash");
inta_statisticCookieList.push("_hjCachedUserAttributes");
inta_statisticCookieList.push("_hjViewportId");
inta_statisticCookieList.push("_hjSession_");
inta_statisticCookieList.push("_hjSessionTooLarge");
inta_statisticCookieList.push("_hjSessionRejected");
inta_statisticCookieList.push("_hjSessionResumed");
inta_statisticCookieList.push("_hjLocalStorageTest");
inta_statisticCookieList.push("_hjIncludedInPageviewSample");
inta_statisticCookieList.push("_hjIncludedInSessionSample");
inta_statisticCookieList.push("_hjAbsoluteSessionInProgress");
inta_statisticCookieList.push("_hjTLDTest");
inta_statisticCookieList.push("_hjRecordingEnabled");
inta_statisticCookieList.push("_hjRecordingLastActivity");
inta_statisticCookieList.push("_hjClosedSurveyInvites");
inta_statisticCookieList.push("_hjDonePolls");
inta_statisticCookieList.push("_hjMinimizedPolls");
inta_statisticCookieList.push("_hjShownFeedbackMessage");

/* - - - List of Marketing cookies - - - */
const inta_marketingCookieList = [];
inta_marketingCookieList.push("_fbp");
inta_marketingCookieList.push("__gsas");
inta_marketingCookieList.push("__gpi");
inta_marketingCookieList.push("li_giant");
inta_marketingCookieList.push("li_fat_id");
inta_marketingCookieList.push("__gpi_optout");
inta_marketingCookieList.push("__gads");
inta_marketingCookieList.push("GED_PLAYLIST_ACTIVITY");
inta_marketingCookieList.push("FPAU");
inta_marketingCookieList.push("FPGCLDC");
inta_marketingCookieList.push("_gcl_dc");
inta_marketingCookieList.push("_gcl_gb");
inta_marketingCookieList.push("_gcl_au");
inta_marketingCookieList.push("FPGCLAW");
inta_marketingCookieList.push("FPGCLGB");
inta_marketingCookieList.push("_gac_gb_");
inta_marketingCookieList.push("_gac_");
inta_marketingCookieList.push("_gcl_aw");
inta_marketingCookieList.push("_gcl");
inta_marketingCookieList.push("GoogleAdServingTest");
inta_marketingCookieList.push("_uetvid");

/* - - - List of functional cookies - - - */
const inta_functionalCookieList = [];
inta_functionalCookieList.push("region");
inta_functionalCookieList.push("language");
inta_functionalCookieList.push("lang");
inta_functionalCookieList.push("hl");
inta_functionalCookieList.push("locale");
inta_functionalCookieList.push("FCCDCF");
inta_functionalCookieList.push("NID");
inta_functionalCookieList.push("AMP_TOKEN");
inta_functionalCookieList.push("__stripe_sid");
inta_functionalCookieList.push("__stripe_mid");

/* - - - Helper function to get cookie type*/
function intaCookieType(type) {
    if (getCookie(type) === "checked") return true;
    return (getCookie(type) === "true")
}
/* if (intaCookieType(int_FunctionalCookies) != false || intaCookieType(int_staticsticCookies) != false || intaCookieType(int_marketingCookies) != false) {
    const allCookies = document.cookie.split(";").reduce((cookies, cookie) => {
        const [name, val] = cookie.split("=").map(c => {c.trim()})

        int__cookiesToKeep.push(name);
    })
} */

/* Cookie name list for functional cookies */
if (intaCookieType(int_FunctionalCookies)) {
    int__cookiesToKeep.push("region");
    int__cookiesToKeep.push("language");
    int__cookiesToKeep.push("lang");
    int__cookiesToKeep.push("hl");
    int__cookiesToKeep.push("locale");
    int__cookiesToKeep.push("FCCDCF");
    int__cookiesToKeep.push("NID");
    int__cookiesToKeep.push("AMP_TOKEN");
    int__cookiesToKeep.push("__stripe_sid");
    int__cookiesToKeep.push("__stripe_mid");
}
/* Cookie name list for statistical cookies */
if(intaCookieType(int_staticsticCookies)){
    int__cookiesToKeep.push("_clck");
    int__cookiesToKeep.push("_clsk");
    int__cookiesToKeep.push("CLID");
    int__cookiesToKeep.push("ANONCHK");
    int__cookiesToKeep.push("MR");
    int__cookiesToKeep.push("MUID");
    int__cookiesToKeep.push("SM");
    int__cookiesToKeep.push("_ga");
    int__cookiesToKeep.push("__gp");
    int__cookiesToKeep.push("_gid");
    int__cookiesToKeep.push("_dc_gtm_");
    int__cookiesToKeep.push("_gaexp_rc");
    int__cookiesToKeep.push("_gaexp");
    int__cookiesToKeep.push("_gat");
    int__cookiesToKeep.push("_opt_expid");
    int__cookiesToKeep.push("_clsk");
    int__cookiesToKeep.push("_uetvid");
    int__cookiesToKeep.push("FPAU");
    int__cookiesToKeep.push("FPGCLDC");
    int__cookiesToKeep.push("_gcl_dc");
    int__cookiesToKeep.push("_gcl_au");
    int__cookiesToKeep.push("FCNEC");
    int__cookiesToKeep.push("FPLC");
    int__cookiesToKeep.push("FPGCLAW");
    int__cookiesToKeep.push("FPGCLGB");
    int__cookiesToKeep.push("_gcl_gb");
    int__cookiesToKeep.push("_gac_gb_");
    int__cookiesToKeep.push("_gcl_aw");
    int__cookiesToKeep.push("__utma");
    int__cookiesToKeep.push("__utmb");
    int__cookiesToKeep.push("__utmc");
    int__cookiesToKeep.push("__utmt");
    int__cookiesToKeep.push("__utmz");
    int__cookiesToKeep.push("__utmv");
    int__cookiesToKeep.push("FPID");
    int__cookiesToKeep.push("_opt");
    int__cookiesToKeep.push("_gcl");
    int__cookiesToKeep.push("_hjSessionUser_");
    int__cookiesToKeep.push("_hjid");
    int__cookiesToKeep.push("_hjFirstSeen");
    int__cookiesToKeep.push("_hjUserAttributesHash");
    int__cookiesToKeep.push("_hjCachedUserAttributes");
    int__cookiesToKeep.push("_hjViewportId");
    int__cookiesToKeep.push("_hjSession_");
    int__cookiesToKeep.push("_hjSessionTooLarge");
    int__cookiesToKeep.push("_hjSessionRejected");
    int__cookiesToKeep.push("_hjSessionResumed");
    int__cookiesToKeep.push("_hjLocalStorageTest");
    int__cookiesToKeep.push("_hjIncludedInPageviewSample");
    int__cookiesToKeep.push("_hjIncludedInSessionSample");
    int__cookiesToKeep.push("_hjAbsoluteSessionInProgress");
    int__cookiesToKeep.push("_hjTLDTest");
    int__cookiesToKeep.push("_hjRecordingEnabled");
    int__cookiesToKeep.push("_hjRecordingLastActivity");
    int__cookiesToKeep.push("_hjClosedSurveyInvites");
    int__cookiesToKeep.push("_hjDonePolls");
    int__cookiesToKeep.push("_hjMinimizedPolls");
    int__cookiesToKeep.push("_hjShownFeedbackMessage");
}
/* Cookie name list for marketing / advertisment cookies */
if (intaCookieType(int_marketingCookies)) {
    int__cookiesToKeep.push("_fbp");
    int__cookiesToKeep.push("__gsas");
    int__cookiesToKeep.push("__gpi");
    int__cookiesToKeep.push("li_giant");
    int__cookiesToKeep.push("li_fat_id");
    
    int__cookiesToKeep.push("__gpi_optout");
    int__cookiesToKeep.push("__gads");
    int__cookiesToKeep.push("GED_PLAYLIST_ACTIVITY");
    int__cookiesToKeep.push("FPAU");
    int__cookiesToKeep.push("FPGCLDC");
    int__cookiesToKeep.push("_gcl_dc");
    int__cookiesToKeep.push("_gcl_gb");
    int__cookiesToKeep.push("_gcl_au");
    int__cookiesToKeep.push("FPGCLAW");
    int__cookiesToKeep.push("FPGCLGB");
    int__cookiesToKeep.push("_gac_gb_");
    int__cookiesToKeep.push("_gac_");
    int__cookiesToKeep.push("_gcl_aw");
    int__cookiesToKeep.push("_gcl");
    int__cookiesToKeep.push("GoogleAdServingTest");
    int__cookiesToKeep.push("_uetvid");
}

const int__cookiesToKeepReg = new RegExp(int__cookiesToKeep.join("|"), "i");

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
const contentPolicyMetaTag = document.createElement('meta');
/* Adding security meta tag */
/* contentPolicyMetaTag.httpEquiv = "Content-Security-Policy";
contentPolicyMetaTag.content = "*.usercontent.one";

if (getCookie(int_cookieName) == essentialsCookieName || getCookie(int_cookieName) == null) {
    intHead.insertBefore(contentPolicyMetaTag, intHead.firstChild);
} */
const intaStyleLink = document.createElement('link');
intaStyleLink.rel = 'stylesheet';
intaStyleLink.type = 'text/css';
intaStyleLink.href = 'https://downloads.intastellarsolutions.com/css/gdpr/banner.css?v=' + new Date().getTime();
intaStyleLink.media = 'all';
intHead.insertBefore(intaStyleLink, document.scripts[document.scripts.length - 1]);

function checkCookieStatus() {
    /* To get anonymous cookie banner usage */
    let s = document.createElement("script");
    s.src = "https://www.intastellarsolutions.com/js/analytics.js?v=" + new Date().getTime();
    intHead.appendChild(s);

    const allScripts = [
        {
            /* Analytics Scripts which are beeing blocked */
            type: "statics",
            scripts: [
                "([\-\.]google-analytics+)",
                "([\-\.]googletagmanager+)",
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
            type: "marketing",
            scripts: [
                "(_linkedin_partner_id|_linkedin_data_partner_ids|mailchimp|lntrk|twitter|instagram|trustpilot)",
                "([\-\.]googlesyndication+)",
                "([\-\.]googletagservices+)",
                "([\-\.]twitter+)",
                "([\-\.]ads-twitter+)",
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
                "([\-\.]googleadservices+)",
                "([a-z]+){2,5}(:[0-9]{1,5})?(\\\\.*)"
            ]
        },
        {
            /* Functional Scripts which are beeing blocked */
            type: "functional",
            scripts: [
                "(maps.google.com)",
                "(www.google.com/maps/)",
                "(recaptcha+)",
                "(grecaptcha+)",
                "([\-\.]googleapis+)",
                /* "([\-\.]google+)", */
                "([\-\.]gstatics+)",
                "([\-\.]cludo+)",
                "([\-\.]qbrick+)",
                "([\-\.]klarna+)",
                "([\-\.]paypal+)",
                "([\-\.]usersnap+)",
                "([\-\.]zoom+)",
                "([\-\.]disqus+)([a-z]+){2,5}(:[0-9]{1,5})?(\\\\.*)"
            ] 
        }
    ];

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

    let notRequired;
    let m;
    /* autoads-preview.googleusercontent.com */
    /* Getting user prefrence settings from Local storage: checked means user has allowed. False means cookies needs to be blocked */
    if (getCookie(int_FunctionalCookies) == "checked" && getCookie(int_staticsticCookies) != "checked" && getCookie(int_marketingCookies) != "checked") {
        m = merge(allScripts[1].scripts, allScripts[0].scripts)
        notRequired = new RegExp(m.join("|"), "ig"); 
    } else if (getCookie(int_marketingCookies) == "checked" && getCookie(int_staticsticCookies) != "checked" && getCookie(int_FunctionalCookies) != "checked") {
        m = merge(allScripts[2].scripts, allScripts[0].scripts)
        notRequired = new RegExp(m.join("|"), "ig");
    } else if (getCookie(int_staticsticCookies) == "checked" && getCookie(int_FunctionalCookies) != "checked" && getCookie(int_marketingCookies) != "checked") {
        m = merge(allScripts[1].scripts, allScripts[2].scripts)
        notRequired = new RegExp(m.join("|"), "ig");
    } else if (getCookie(int_FunctionalCookies) == "checked" && getCookie(int_staticsticCookies) == "checked") {
        m = allScripts[1].scripts;
        notRequired = new RegExp(m.join("|"), "ig");
    } else if (getCookie(int_FunctionalCookies) == "checked" && getCookie(int_marketingCookies) == "checked") {
        m = allScripts[0].scripts;
        notRequired = new RegExp(m.join("|"), "ig");
    } else if (getCookie(int_marketingCookies) == "checked" && getCookie(int_staticsticCookies) == "checked") {
        m = allScripts[2].scripts;
        notRequired = new RegExp(m.join("|"), "ig");
    } else {
        m = merge(allScripts[0].scripts, allScripts[1].scripts, allScripts[2].scripts);
        notRequired = new RegExp(m.join("|"), "ig");
    }

    const dc = getCookie(int_cookieName);
    const analyticsCookies = getCookie(int_analytic);

    /* Helper function to create Consents Block message for iframes etc.*/
    function ConsentsBlock(logo, textLanguage, btnText, datatype){
        let p = "";
        if(window.location.host.indexOf("intastellarsolutions.com") == -1){
            p = `<a href='https://www.intastellarsolutions.com?utm_source=${encodeURI(window.location.href)}&utm_content=powered_by&utm_medium=referral&utm_campaign=Consents+Block&utm_term=gdpr_banner_logo' target='_blank' rel='noopener' style="align-items: center; text-decoration: none;font-size: 11.5px; padding: .5em 0 0; display: flex; justify-content: center;">powered by <img width="109px" height="20px" style="width: 109px !important; height: 20px !important;margin-left: 10px;" src="https://www.intastellarsolutions.com/assets/intastellar_solutions.svg" alt="Intastellar Solutions, International"></a>`;
        }
        return `
        <section class="intCookie_ConsentContainer-content">
            <section class="intCookie_ConsentLogo-container">
                <img src="${logo}" class="intCookie_ConsentLogo">
            </section>
            ${textLanguage}
            <button class='intastellarCookie-settings__btn --changePermission' data-type='${datatype}'>${btnText}</button>
            ${p}
        </section>
        `
    }

    function loopBlock(addedNodes, message, script, buttonText, logo) {
        addedNodes.forEach((frae) => {
            if (!intaCookieType(int_marketingCookies) && script.type == "marketing") {
                if (new RegExp(script.scripts.join("|"), "ig").test(frae.src) || frae.className.match(new RegExp(script.scripts.join("|"), "ig"))) {
                    let a      = document.createElement('a');
                    a.href = frae.src;
                    let externalDomain = a.hostname;
                    
                    frae.src = "about:blank";
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

                    let settingsContent = document.createElement("article");
                    settingsContent.classList.add("intCookie_ConsentContainer");
                    settingsContent.innerHTML = ConsentsBlock(logo, textLanguage, btnText, "intMarketingCookies");
                    if (frae.style.display != "none") {
                        frae.parentElement.replaceChild(settingsContent, frae);
                    }
                }
            } else if (!intaCookieType(int_FunctionalCookies) && script.type == "functional") {
                if (new RegExp(script.scripts.join("|"), "ig").test(frae.src)) {
                    let a      = document.createElement('a');
                    a.href = frae.src;
                    let externalDomain = a.hostname;
                    frae.src = "about:blank";

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

                    let settingsContent = document.createElement("article");
                    settingsContent.classList.add("intCookie_ConsentContainer");
                    settingsContent.innerHTML = ConsentsBlock(logo, textLanguage, btnText, "intFunctionalCookies");
                    if (frae.style.display != "none") {
                    frae.parentElement.replaceChild(settingsContent, frae);
                    }
                } else if (frae.id.indexOf("map") > -1 || frae.id.indexOf("google") > -1) {

                    let textLanguage;
                    let btnText;
                    let intastellarCookieLanguage = window.intastellarCookieLanguage = window.INTA.settings === undefined || window.INTA.settings.lang === "auto" || window.INTA.settings.lang === "" ? document.querySelector("html").getAttribute("lang") : window.INTA.settings.language == "german" ? "de" : window.INTA.settings.language == "danish" ? "da" : window.INTA.settings.language == "english" ? "en" : document.querySelector("html").getAttribute("lang");
                    if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
                        textLanguage = message("www.google.com").danish;
                        btnText = buttonText().danish;
                    } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
                        textLanguage = message("www.google.com").german;
                        btnText = buttonText().german;
                    } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
                        textLanguage = message("www.google.com").english;
                        btnText = buttonText().english;
                    } else {
                        textLanguage = message(externalDomain).danish;
                        btnText = buttonText().danish;
                    }

                    let settingsContent = document.createElement("article");
                    settingsContent.classList.add("intCookie_ConsentContainer");
                    settingsContent.innerHTML = ConsentsBlock(logo, textLanguage, btnText, "intFunctionalCookies");
                    if (frae.style.display != "none") {
                        frae.parentElement.replaceChild(settingsContent, frae);
                    }
                }
            }
        })
    }

    function blockBlockQuotes(tweet, message, script, buttonText, logo) {
        if (!intaCookieType(int_marketingCookies) && script.type == "marketing" && notRequired.test(tweet.className)) {
            let a      = document.createElement('a');
            a.href = tweet.querySelector("a").href;
            let externalDomain = a.hostname;

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
            let settingsContent = document.createElement("article");
            settingsContent.classList.add("intCookie_ConsentContainer");
            settingsContent.innerHTML = ConsentsBlock(logo, textLanguage, btnText, "intMarketingCookies");
            if (tweet.style.display != "none") {
                tweet.parentElement.replaceChild(settingsContent, tweet);
            }
        }
    }

    /* - - - Observer - - - */
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(({ addedNodes }) => {
            addedNodes.forEach((node) => {
                if (!allCookiesAllowed() || !intaCookieType(int_FunctionalCookies)) {
                    deleteAllCookies();
                }

                /* Adding  custom button to all blocked embedded content on the site */
                if (node.nodeType === 1 && node.tagName === "IFRAME") {
                    allScripts.map((script) => {
                        const message = (domain) => {
                            return {
                                danish: `<p>Dette indhold hostes af en tredjepart (${domain}). Ved at vise dig det eksterne indhold accepterer du cookies fra ${domain}.</p>`,
                                english: `<p>This content is hosted by a third party (${domain}). By showing you the external content you accept the cookies provided by ${domain}.</p>`,
                                german: `<p>Dieser Inhalt wird von einem Drittanbieter (${domain}) gehostet. Indem Sie die externen Inhalte anzeigen, akzeptieren Sie die von ${domain} bereitgestellten Cookies.</p>`
                            }
                        };

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
                        let INTAlogo = (window.INT) ? window.INT.settings.logo : (window.INTA.settings.logo) ? window.INTA.settings.logo : intCookieIcon;
                        loopBlock(addedNodes, message, script, buttonText, INTAlogo);
                    });   
                }

                if (node.nodeType === 1 && node.tagName === "DIV") {
                    allScripts.map((script) => {
                        
                        const message = (domain) => {
                            if(node.classList.contains("trustpilot-widget")){
                                domain = "trustpilot.com";
                            }
                            return {
                                danish: `<p>Dette indhold hostes af en tredjepart (${domain}). Ved at vise dig det eksterne indhold accepterer du cookies fra ${domain}.</p>`,
                                english: `<p>This content is hosted by a third party (${domain}). By showing you the external content you accept the cookies provided by ${domain}.</p>`,
                                german: `<p>Dieser Inhalt wird von einem Drittanbieter (${domain}) gehostet. Indem Sie die externen Inhalte anzeigen, akzeptieren Sie die von ${domain} bereitgestellten Cookies.</p>`
                            }
                        };
                        
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
                        let INTAlogo = (window.INT) ? window.INT.settings.logo : (window.INTA.settings.logo) ? window.INTA.settings.logo : intCookieIcon;
                        loopBlock(addedNodes, message, script, buttonText, INTAlogo);
                    })
                }

                if (node.nodeType === 1 && node.tagName === "BLOCKQUOTE") {
                    allScripts.map((script) => {
                        addedNodes.forEach((tweet) => {
                            const message = (domain) => {
                                return {
                                    danish: `<p>Dette indhold leveres af en tredjepart (${domain}). Ved at vise dig det eksterne indhold accepterer du cookies fra ${domain}.</p>`,
                                    english: `<p>This content is provided by a third party (${domain}). By showing you the external content you accept the cookies provided by ${domain}.</p>`,
                                    german: `<p>Dieser Inhalt wird von einem Drittanbieter (${domain}) bereitgestellt. Indem Sie die externen Inhalte anzeigen, akzeptieren Sie die von ${domain} bereitgestellten Cookies.</p>`
                                }
                            };

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
                            let INTAlogo = (window.INT) ? window.INT.settings.logo : (window.INTA.settings.logo) ? window.INTA.settings.logo : intCookieIcon;
                            blockBlockQuotes(tweet, message, script, buttonText, INTAlogo);

                        })
                    });   
                }

                if (node.nodeType === 1 && node.tagName === "SCRIPT" && node.type !== 'application/ld+json' && node.innerText.indexOf("window.INTA") == -1 && node.innerText.indexOf("window.INT") == -1 && node.innerText.indexOf("window.INTA") == -1 && node.innerText.toLowerCase().indexOf("elementor") == -1 && node.innerText.toLowerCase().indexOf("chic_lite_data") == -1 && node.innerText.toLowerCase().indexOf("mailchimp_public_data") == -1 && node.innerText.toLowerCase().indexOf("monsterinsights_frontend") == -1) {
                    let src = node.src || "";
                    node.removeAttribute("charset");
                    addedNodes.forEach((node) => {
                        src = node.src;

                        if (dc == essentialsCookieName || dc == "") {
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
                                    
                                    if(node.parentElement !== null) node.parentElement.removeChild(node);

                                    deleteAllCookies();
                                }
                            } else if(src.indexOf(window.location.hostname) == -1
                            && src.indexOf("jquery") == 1) {
                                node.type = "text/javascript";
                                node.defer = false;
                                node.async = false;
                            } else {
                                node.type = "text/javascript";
                            }

                            if (
                                notRequired.test(node.innerText)
                            ) {
                                node.defer = true;
                                node.async = true;
                                node.type = "text/blocked";
                                if(node.parentElement !== null) node.parentElement.removeChild(node);
                                deleteAllCookies();
                            }
                        } else if(getCookie(int_FunctionalCookies) == "false" || getCookie(int_marketingCookies) == "false" || getCookie(int_staticsticCookies) == "false" || getCookie(int_FunctionalCookies) == "null" || getCookie(int_marketingCookies) == "null" || getCookie(int_staticsticCookies) == "null"
                            || getCookie(int_FunctionalCookies) == "" || getCookie(int_marketingCookies) == "" || getCookie(int_staticsticCookies) == ""
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
                                    if(node.parentElement !== null) node.parentElement.removeChild(node);
                                }
                            } else if(src.indexOf(window.location.hostname) == -1
                            && src.indexOf("jquery") == 1) {
                                node.type = "text/javascript";
                                node.defer = false;
                                node.async = false;
                            } else {
                                node.type = "text/javascript";
                            }

                            if (
                                notRequired.test(node.innerText)
                                && node.innerText.toLowerCase().indexOf("elementor") == -1
                            ) {
                                node.type = "text/blocked";
                                node.defer = true;
                                node.async = true;
                                if(node.parentElement !== null) node.parentElement.removeChild(node);
                            } else {
                                node.type = "text/javascript";
                            }
                        }

                        const beforeScriptExecuteListener = function (event) {
                            if (dc == essentialsCookieName || dc == "") {

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
                                        if(node.parentElement !== null) node.parentElement.removeChild(node);
                                        deleteAllCookies();
                                    }
                                } else if(src.indexOf(window.location.hostname) == -1
                                && src.indexOf("jquery") == 1) {
                                    node.type = "text/javascript";
                                    node.defer = false;
                                    node.async = false;
                                } else {
                                    node.type = "text/javascript";
                                }

                                if (
                                    notRequired.test(node.innerText)
                                    && node.innerText.toLowerCase().indexOf("elementor") == -1
                                ) {
                                    node.defer = true;
                                    node.async = true;
                                    node.type = "text/blocked";
                                    if(node.parentElement !== null) node.parentElement.removeChild(node);
                                    deleteAllCookies();
                                } else {
                                    node.type = "text/javascript";
                                }
                            } else if(getCookie(int_FunctionalCookies) == "false" || getCookie(int_marketingCookies) == "false" || getCookie(int_staticsticCookies) == "false" || getCookie(int_FunctionalCookies) == "null" || getCookie(int_marketingCookies) == "null" || getCookie(int_staticsticCookies) == "null"
                            || getCookie(int_FunctionalCookies) == "" || getCookie(int_marketingCookies) == "" || getCookie(int_staticsticCookies) == ""){
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
                                        if(node.parentElement !== null) node.parentElement.removeChild(node);
                                    }
                                } else if(src.indexOf(window.location.hostname) == -1
                                && src.indexOf("jquery") == 1) {
                                    node.type = "text/javascript";
                                    node.defer = false;
                                    node.async = false;
                                } else {
                                    node.type = "text/javascript";
                                }
    
                                if (
                                    notRequired.test(node.innerText)
                                    && node.innerText.toLowerCase().indexOf("elementor") == -1
                                ) {
                                    node.defer = true;
                                    node.async = true;
                                    node.type = "text/blocked";
                                    if(node.parentElement !== null) node.parentElement.removeChild(node);
                                } else {
                                    node.type = "text/javascript";
                                }
                            }

                            if (analyticsCookies == "yes") {
                                let s = document.createElement("script");
                                s.src = "https://www.intastellarsolutions.com/js/analytics.js";
                                intHead.appendChild(s);
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
                    if (dc == essentialsCookieName || dc == "") {

                        if (
                            notRequired.test(node.innerText)
                            && node.innerText.toLowerCase().indexOf("elementor") == -1
                        ) {
                            node.defer = true;
                            node.async = true;
                            node.type = "text/blocked";
                            if(node.parentElement !== null) node.parentElement.removeChild(node);
                            deleteAllCookies();
                        }
                    } else if(getCookie(int_FunctionalCookies) == "false" || getCookie(int_marketingCookies) == "false" || getCookie(int_staticsticCookies) == "false"){
                        
                        if (
                            notRequired.test(node.innerText)
                            && node.innerText.toLowerCase().indexOf("elementor") == -1
                        ) {
                            node.defer = true;
                            node.async = true;
                            node.type = "text/blocked";
                            if(node.parentElement !== null) node.parentElement.removeChild(node);
                        } else {
                            node.type = "text/javascript";
                        }
                    }

                    const beforeScriptExecuteListener = function (event) {
                        let src = node.src || "";
                        if (dc == essentialsCookieName || dc == "") {
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
                                    if(node.parentElement !== null) node.parentElement.removeChild(node);
                                    deleteAllCookies();
                                }
                            } else if(src.indexOf(window.location.hostname) == -1
                            && src.indexOf("jquery") == 1) {
                                node.type = "text/javascript";
                                node.defer = false;
                                node.async = false;
                            } else {
                                node.type = "text/javascript";
                            }
                        } else if(getCookie(int_FunctionalCookies) == "false" || getCookie(int_marketingCookies) == "false" || getCookie(int_staticsticCookies) == "false"){
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
                                    if(node.parentElement !== null) node.parentElement.removeChild(node);
                                }
                            } else if(src.indexOf(window.location.hostname) == -1
                            && src.indexOf("jquery") == 1) {
                                node.type = "text/javascript";
                                node.defer = false;
                                node.async = false;
                            } else {
                                node.type = "text/javascript";
                            }
                            
                            if (
                                notRequired.test(node.innerText)
                                && node.innerText.toLowerCase().indexOf("elementor") == -1
                            ) {
                                node.defer = true;
                                node.async = true;
                                node.type = "text/blocked";
                                if(node.parentElement !== null) node.parentElement.removeChild(node);
                            } else {
                                node.type = "text/javascript";
                            }
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

                    /* if(getCookie(int_FunctionalCookies) != "false"){
                        if(window.INTA.settings.styleSheets){
                            window.INTA.settings.styleSheets.forEach((style) => {
                                const link = document.createElement("link");
                                link.href = style;
                                console.log(document.querySelectorAll("[href='"+style+"']"));
                                if(document.querySelectorAll("[href='"+style+"']").length === 0){
                                    intHead.appendChild(link);
                                }
                            })
                        }
                    } */
                }
            });
        });
    });
    observer.observe(document.documentElement, {
        childList: !0,
        subtree: !0,
        attributes:    true,
    });
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
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
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
    if (ls != null) {
        let lsA = Object.values(ls);
        if (lsA.length != 0 || lsA != null) {
            for (let i = 0; i < lsA.length; i++) {
                let item = localStorage.getItem(lsA[i]);
                let itemName = lsA[i];

                localStorage.clear();
                sessionStorage.clear();
                if(item != undefined || item != null){
                    localStorage.setItem(itemName, item);
                }
            }
        } else {
            localStorage.clear();
            sessionStorage.clear();
        }
    }
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        if (!int__cookiesToKeepReg.test(name)) {
            let localS = window.INTA.settings === undefined || window.INTA.settings.keepInLocalStorage === undefined ? "" : window.INTA.settings.keepInLocalStorage;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; " + intCookieDomain + " path=/";
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; " + intCookieDomainWithWWW + " path=/";
            clearLocalStorage(localS);
        }
    }
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

/* Helper function to allow all cookies */

function allCookiesAllowed() {
    if (getCookie(int_cookieName) == allowAllCookieName) {
        return true;
    } else {
        return false;
    }
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

let intastellarSolutionsPrivacyPolicy = "https://www.intastellarsolutions.com/about/legal/privacy/gdpr-cookiebanner/embedded/index.php";
const xhr = new XMLHttpRequest();
xhr.onload = function(){
    intastellarSolutionsPrivacyPolicy = "loading...";
    if(this.status === 200){
        intastellarSolutionsPrivacyPolicy = this.responseText;
    }
}

xhr.open("GET", "https://www.intastellarsolutions.com/about/legal/privacy/gdpr-cookiebanner/embedded/index.php?lang=" + (window.INTA.settings === undefined || window.INTA.settings.lang === "auto" || window.INTA.settings.lang === "" ? document.querySelector("html").getAttribute("lang") : window.INTA.settings.language == "german" ? "de" : window.INTA.settings.language == "danish" ? "da" : window.INTA.settings.language == "english" ? "en" : document.querySelector("html").getAttribute("lang")) + "&v=" + new Date().getTime());
xhr.send();

function showPrivacy(){
    document.querySelector(".intLearnMoreBtn").style.display = "none";
    document.querySelector(".intastellarCookieConstents__content").style.scrollPaddingTop = "206px";
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

/* - - - Helper functions for Validate policy link - - - */
function isValidCCPALink() {
    if (typeof window.INTA.settings.ccpa === "object" && isCCPAURL(window.INTA.settings.ccpa.url)) {
        if (window.INTA.settings.ccpa.url.length > 0 && typeof window.INTA.settings.ccpa.url != "undefined") {
            return true;
        }
    }

    return false;
}

function createCookieSettings() {

    let message = "";
    let cookieBtn = "";
    const banner = document.createElement("article");
    const bannerContent = document.createElement("button");

    const moreSettings = document.createElement("article");
    const moreSettingsContent = document.createElement("section");
    const moreintHeader = document.createElement("intheader");
    const moreContentText = document.createElement("section");
    const moreFooter = document.createElement("footer");

    let intastellarCookieLanguageSettings = "Cookie Indstillinger";
    if (intastellarCookieLanguage == "de") {
        intastellarCookieLanguageSettings = "Cookie Einstellungen";
    } else if (intastellarCookieLanguage == "en") {
        intastellarCookieLanguageSettings = "Cookie Settings";
    }

    moreSettings.setAttribute("class", "intastellarCookieConstents");
    moreSettingsContent.setAttribute("class", "intastellarCookieConstents__content");
    moreintHeader.setAttribute("class", "intastellarCookieConstents__content-intHeader");
    moreFooter.setAttribute("class", "intastellarCookieConstents__content-footer");

    moreContentText.setAttribute("class", "intastellarCookieConstents__content-main");;

    const intastellarCookieConstents__Container = document.createElement("article");

    const testSection = document.createElement("section");
    testSection.setAttribute("class", "intastellarCookieConstents__contentC");
    testSection.appendChild(moreintHeader);

    testSection.appendChild(moreContentText);

    moreSettingsContent.appendChild(intastellarCookieConstents__Container);
    intastellarCookieConstents__Container.appendChild(testSection);
    intastellarCookieConstents__Container.appendChild(moreFooter);

    const cookieSettings = document.createElement("article");
    const cookieSettingsContent = document.createElement("section");

    bannerContent.setAttribute("class", "intastellarCookie-settingsContainer");
    bannerContent.setAttribute("title", intastellarCookieLanguageSettings);
    cookieSettings.setAttribute("class", "intastellarCookie-settings__container");
    const arrange = window.INTA.settings === undefined || window.INTA.settings.arrange === undefined ? "" : window.INTA.settings.arrange;

    if (arrange == "ltr") {
        bannerContent.classList.add("intastellarCookie-settingsContainer--otherSide");
        cookieSettings.classList.add("intastellarCookie-settings__container--otherSide");
    }
    
    /* cookieSettings.style.opacity = "0"; */
    /* bannerContent.setAttribute("class","intastellarCookie-settingsContainer");
    bannerContent.setAttribute("title", "Cookie Settings"); */

    /* - - - Set the intastellarCookieLanguageuage dependent messages */

    const messages = {
        danish: "Ved at acceptere alle cookies understøtter du " + document.domain + " med at udvikle en bedre løsning til dig.</p><p>Vælg om du vil tillade kun de nødvendige cookies eller om du vil tillade alle cookies.",
        german: "Wenn Sie auf akzeptieren klicken, unterstützen Sie " + document.domain + " bei der Weiterentwicklung von unserer Webseite.</p><p>Wählen Sie zwischen alle Cookies akzeptieren oder Ablehnen.",
        english: "By accepting all cookies, you support " + document.domain + " in developing a better solution for you. </p><p> Select whether you want to allow only the necessary cookies or whether you want to allow all cookies."
    };
    const messageWrapStart = "<div class='intastellarCookie-settings__contentConatiner'><p>";
    const messageWrapEnd = "</p></div>";

    const settingsMessages = {
        danish: `<h3 style="    font-size: 25px;">Du bestemmer over dine data</h3>
        <p>Vi og vores samarbejdspartnere bruger teknologier, herunder cookies, til at indsamle oplysninger om dig til forskellige formål, herunder:</p>
        <ol>
            <li>Funktionel / Præference</li>
            <li>Statistiske</li>
            <li>Marketing</li>
        </ol>
        <p>Ved at trykke på 'Accepter alle' giver du samtykke til alle disse formål. Du kan også vælge at tilkendegive, hvilke formål du vil give samtykke til ved at benytte checkboksene ud for formålet, og derefter trykke på 'Gem indstillinger'.
        Du kan til enhver tid trække dit samtykke tilbage ved at trykke på det lille ikon nederst i ${(window.INTA.arrange == "ltr") ? "venstre" : "højre"} hjørne af hjemmesiden.</p>
        <p>Du kan læse mere om vores brug af cookies og andre teknologier, samt om vores indsamling og behandling af personoplysninger ved at trykke på linket.</p>
        ${generatePolicyUrl('Vores privat og cookie politik')}
        <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International privat politik</button>`,
        german: `<h3 style="    font-size: 25px;">Sie haben die Kontrolle über Ihre Daten</h3>
        <p>Wir und unsere Geschäftspartner nutzen Technologien wie Cookies dazu, personenbezogene Informationen für verschiedene Zwecke zu sammeln, darunter:</p>
        <ol>
            <li>Funktionel / Präferenz</li>
            <li>Statistik</li>
            <li>Werbung</li>
        </ol>
        <p>Wenn Sie auf „Akzeptieren“ klicken, erteilen Sie Ihre Einwilligung für alle diese Zwecke. Sie können auch entscheiden, welchen Zwecken Sie zustimmen, indem Sie das Kästchen neben dem Zweck anklicken und auf „Speichern“ klicken.</p>
        <p>Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie auf das kleine Symbol unten in der ${(window.INTA.arrange == "ltr") ? "linken" : "rechten"} Ecke klicken.</p>
        ${generatePolicyUrl('Unsere Datenschutz Erklährung und Cookie politik')}
        <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International Datenschutz erklährung</button>`,
        english: `<h3 style="    font-size: 25px;">You´re in control</h3>
        <p>We and our business partners uses technologies, including cookies, to collect information about you for various purposes, including:</p>
        <ol>
            <li>Functional / Preference</li>
            <li>Statistical</li>
            <li>Advertisement</li>
        </ol>
        <p>By clicking 'Accept', you give your consent for all these purposes. You can also choose to specify the purposes you consent to by ticking the checkbox next to the purpose and clicking 'Save settings'.</p>
        <p>You may withdraw your consent at any time by clicking the small icon at the bottom ${(window.INTA.arrange == "ltr") ? "left" : "right"} corner of the website.</p>
        ${generatePolicyUrl('Our Privacy and cookie Policy')}
        <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International privacy policy</button>` 
    }

    if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
        settingsMessage = settingsMessages.danish;
        message =
            messageWrapStart
            + messages.danish
            + messageWrapEnd
            + generatePolicyUrl('Vores privat og cookie politik');
        cookieBtn = generateCookieButtons('Accepter', 'Afvis', 'Indstillinger');
        moreFooter.innerHTML =
            `
                <section class="intCookieSaveSettingsContainer">
                    ${generateCookieSettingsButton(saveSettings.danish, 'Accepter')}
                    <button class="intLearnMoreBtn">Læs mere om cookies</button>
                    <article class="intCookieSetting__form">
                        <section class="intastellarSettings__control">
                            <label class="intSettingDisabled checkMarkContainer">
                                <span class="intSettingsTitle">Nødvendige</span>
                                <span class="intCheckmarkSliderContainer">
                                    <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                                    <span class="checkmark round"></span>
                                </span>
                            </label>
                        </section>
                        <section class="intastellarSettings__control">
                            <label class="checkMarkContainer">
                                <span class="intSettingsTitle">Funktionel</span>
                                <span class="intCheckmarkSliderContainer">
                                    <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${getCookie(int_FunctionalCookies)}>
                                    <span class="checkmark round"></span>
                                </span>
                            </label>
                        </section>
                        <section class="intastellarSettings__control">
                            <label class="checkMarkContainer">
                                <span class="intSettingsTitle">Statistiske</span>
                                <span class="intCheckmarkSliderContainer">
                                    <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${getCookie(int_staticsticCookies)}>
                                    <span class="checkmark round"></span>
                                </span>
                            </label>
                        </section>
                        <section class="intastellarSettings__control">
                            <label class="checkMarkContainer">
                                <span class="intSettingsTitle">Marketing</span>
                                <span class="intCheckmarkSliderContainer">
                                    <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${getCookie(int_marketingCookies)}>
                                    <span class="checkmark round"></span>
                                </span>
                            </label>
                        </section>
                    </article>
                </section>
                <section class="intastellar_privacyPolicy"></section>
                <article class="intReadMore">
                    <section class="required">
                        <h3 class="intaExpandCookieList">Nødvendige <i class="intastellar__arrow"></i></h3>
                        <p>Påkrævede webteknologier og cookies gør vores hjemmeside teknisk tilgængelig for og brugbar for dig. Dette gælder grundlæggende basisfunktioner såsom navigation på hjemmesiden, korrekt visning i din internetbrowser eller anmodning om dit samtykke. Uden disse webteknologier og cookies fungerer vores hjemmeside ikke.</p>
                        <article class="intaCookieListOverview">
                            <table>
                            ${
                                inta_requiredCookieList.map((cookie) => {
                                    let purpose = "<br>";
                                    if(cookie == int_staticsticCookies){
                                        purpose = `
                                            Its function is to store users cookie choice regarding statistical cookies. Its purpose is to store a users cookie choice whether a user allows tracking & cookies for statistical purposes or not.
                                        `
                                    } else if(cookie == int_marketingCookies){
                                        purpose = `
                                        Its function is to store users cookie choice regarding marketing / advertising cookies. Its purpose is to store a users cookie choice whether a user allows tracking & cookies for advertising purposes or not.
                                        `
                                    } else if(cookie == int_FunctionalCookies){
                                        purpose = `
                                            Its function is to store users cookie choice regarding functional cookies. Its purpose is to store a users cookie choice whether a user allows storing for functional purposes like chosen region, or not.
                                        `
                                    }else if(cookie == int_hideCookieBannerName){

                                    }else if (cookie == int_cookieName){

                                    }else if(cookie == int_visitorCheck){

                                    }

                                    return `
                                        <tr>
                                            <td>${cookie}</td>
                                            <td>${purpose}</td>
                                        </tr>
                                        `
                                }).join(" ")
                            }
                            </table>
                        </article>
                    </section>
                    <section>
                        <h3 class="intaExpandCookieList">Funktionel / Præference <i class="intastellar__arrow"></i></h3>
                        <p>Funktionelle cookies gør det muligt at gemme information, der ændrer måden hjemmesiden fremstår eller fungerer på. For eksempel dit foretrukne sprog eller område.</p>
                        <article class="intaCookieListOverview">
                            <table>
                            ${
                                inta_functionalCookieList.map((cookie) => {
                                    return `
                                        <tr>
                                            <td>${cookie}</td>
                                            <td></td>
                                        </tr>`
                                }).join(" ")
                            }
                            </table>  
                        </article>                 
                    </section>
                    <section>
                        <h3 class="intaExpandCookieList">Statistik <i class="intastellar__arrow"></i></h3>
                        <p>Vi ønsker konstant at forbedre brugervenligheden og ydeevnen på vores hjemmesider. Af denne grund bruger vi analyseteknologier (inklusive cookies), som pseudonymt måler og vurderer, hvilke funktioner og indhold på vores hjemmesider der bruges, hvordan og hvor ofte. På dette grundlag kan vi forbedre vores hjemmesider for brugerne.</p>
                        <article class="intaCookieListOverview">
                            <table>
                            ${
                                inta_statisticCookieList.map((cookie) => {
                                    return `
                                        <tr>
                                            <td>${cookie}</td>
                                            <td></td>
                                        </tr>`
                                }).join(" ")
                            }
                            </table>
                        </article>
                    </section>
                    <section>
                        <h3 class="intaExpandCookieList">Marketing <i class="intastellar__arrow"></i></h3>
                        <p>Vi bruger webteknologier (også cookies) fra udvalgte partnere for at kunne vise dig indhold og annoncer, der er specielt skræddersyet til dig på hjemmesider og sociale medier. Dette indhold udvælges og vises på baggrund af din brugsadfærd.</p>
                        <p>Annonce- eller marketingcookies bruges til at give besøgende relevante annoncer og marketingkampagner. Disse cookies sporer besøgende på tværs af websteder og indsamler oplysninger for at levere tilpassede annoncer.</p>
                        <article class="intaCookieListOverview">
                            <table>
                            ${
                                inta_marketingCookieList.map((cookie) => {
                                    return `
                                        <tr>
                                            <td>${cookie}</td>
                                            <td></td>
                                        </tr>`
                                }).join(" ")
                            }
                            </table>
                        </article>
                    </section>
                </article>
            `;
    } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
        settingsMessage = settingsMessages.german;
        message = messageWrapStart
            + messages.german
            + messageWrapEnd
            + generatePolicyUrl('Unsere Datenschutz Erklährung und Cookie politik');
        cookieBtn = generateCookieButtons('Akzeptieren', 'Ablehnen', 'Einstellungen');
        moreFooter.innerHTML =
        `
            <section class="intCookieSaveSettingsContainer">
                ${generateCookieSettingsButton(saveSettings.german, 'Akzeptieren')}
                <button class="intLearnMoreBtn" >Mehr Erfahren</button>
                <article class="intCookieSetting__form">
                    <section class="intastellarSettings__control">
                        <label class="intSettingDisabled checkMarkContainer">
                            <span class="intSettingsTitle">Erforderliche</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Funktionel</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${getCookie(int_FunctionalCookies)}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Statistik</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${getCookie(int_staticsticCookies)}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Werbung</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${getCookie(int_marketingCookies)}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                </article>
            </section>
            <section class="intastellar_privacyPolicy"></section>
            <article class="intReadMore">
                <section class="required">
                    <h3 class="intaExpandCookieList">Erforderliche <i class="intastellar__arrow"></i></h3>
                    <p>Erforderliche Webtechnologien und Cookies machen unsere Website für Sie technisch zugänglich und nutzbar. Dies betrifft grundlegende Basisfunktionalitäten wie die Navigation auf der Website, die korrekte Anzeige in Ihrem Internetbrowser oder das Einholen Ihrer Einwilligung. Ohne diese Webtechnologien und Cookies funktioniert unsere Website nicht.</p>
                    <article class="intaCookieListOverview">
                        <table>
                        ${
                            inta_requiredCookieList.map((cookie) => {
                                let purpose = "<br>";
                                if(cookie == int_staticsticCookies){
                                    purpose = `
                                        Its function is to store users cookie choice regarding statistical cookies. Its purpose is to store a users cookie choice whether a user allows tracking & cookies for statistical purposes or not.
                                    `
                                } else if(cookie == int_marketingCookies){
                                    purpose = `
                                    Its function is to store users cookie choice regarding marketing / advertising cookies. Its purpose is to store a users cookie choice whether a user allows tracking & cookies for advertising purposes or not.
                                    `
                                } else if(cookie == int_FunctionalCookies){
                                    purpose = `
                                        Its function is to store users cookie choice regarding functional cookies. Its purpose is to store a users cookie choice whether a user allows storing for functional purposes like chosen region, or not.
                                    `
                                }else if(cookie == int_hideCookieBannerName){

                                }else if (cookie == int_cookieName){

                                }else if(cookie == int_visitorCheck){

                                }

                                return `
                                    <tr>
                                        <td>${cookie}</td>
                                        <td>${purpose}</td>
                                    </tr>
                                    `
                            }).join(" ")
                        }
                        </table>
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">Funktionel / Präferenz <i class="intastellar__arrow"></i></h3>
                    <p>Funktionale Cookies ermöglichen es, Informationen zu speichern, die das Erscheinungsbild oder die Handlungen auf der Website ändern können. Dabei könnte es sich um Ihre bevorzugte Sprache oder Region handeln.</p>
                    <article class="intaCookieListOverview">
                        <table>
                        ${
                            inta_functionalCookieList.map((cookie) => {
                                return `
                                    <tr>
                                        <td>${cookie}</td>
                                        <td></td>
                                    </tr>`
                            }).join(" ")
                        }
                        </table>
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">Statistik <i class="intastellar__arrow"></i></h3>
                    <p>Wir möchten die Benutzerfreundlichkeit und Leistung unserer Websites stetig verbessern. Aus diesem Grund verwenden wir Analysetechnologien (einschließlich Cookies), die pseudonym messen und auswerten, welche Funktionen und Inhalte unserer Websites wie und wie oft genutzt werden. Auf dieser Grundlage können wir unsere Websites für die Nutzer verbessern.</p>
                    <article class="intaCookieListOverview">
                        <table>
                        ${
                            inta_statisticCookieList.map((cookie) => {
                                return `
                                    <tr>
                                        <td>${cookie}</td>
                                        <td></td>
                                    </tr>`
                            }).join(" ")
                        }
                        </table>
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">Werbung <i class="intastellar__arrow"></i></h3>
                    <p>Wir verwenden Webtechnologien (auch Cookies) ausgewählter Partner, um Ihnen speziell auf Sie zugeschnittene Inhalte und Werbung auf Webseiten und Social-Media-Seiten anzeigen zu können. Diese Inhalte werden anhand Ihres Nutzungsverhaltens ausgewählt und angezeigt.</p>
                    <p>Werbe- oder Marketing-Cookies werden verwendet, um Besuchern relevante Anzeigen und Marketingkampagnen bereitzustellen. Diese Cookies verfolgen Besucher über Websites hinweg und sammeln Informationen, um angepasste Anzeigen bereitzustellen.</p>
                    <article class="intaCookieListOverview">
                        <table>
                        ${
                            inta_marketingCookieList.map((cookie) => {
                                return `
                                    <tr>
                                        <td>${cookie}</td>
                                        <td></td>
                                    </tr>`
                            }).join(" ")
                        }
                        </table>
                    </article>
                </section>
            </article>
        `;
    } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
        settingsMessage = settingsMessages.english;
        message =
            messageWrapStart
            + messages.english
            + messageWrapEnd
            + generatePolicyUrl('Our Privacy and cookie Policy');
        cookieBtn = generateCookieButtons('Accept', 'Decline All', 'Settings');
        moreFooter.innerHTML =
        `
            <section class="intCookieSaveSettingsContainer">
                ${generateCookieSettingsButton(saveSettings.english, 'Accept')}
                <button class="intLearnMoreBtn" >Show details</button>
                <article class="intCookieSetting__form">
                    <section class="intastellarSettings__control">
                        <label class="intSettingDisabled checkMarkContainer">
                            <span class="intSettingsTitle">Strictly necessary</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Functional</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${getCookie(int_FunctionalCookies)}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Statics</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${getCookie(int_staticsticCookies)}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Advertisement</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${getCookie(int_marketingCookies)}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                </article>
            </section>
            <section class="intastellar_privacyPolicy"></section>
            <article class="intReadMore">
                <section class="required">
                    <h3 class="intaExpandCookieList">Strictly necessary <i class="intastellar__arrow"></i></h3>
                    <p>Required web technologies and cookies make our website technically accessible to and usable for you. This applies to fundamental base functionalities such as navigation on the website, correct display in your internet browser or requesting your consent. Without these web technologies and cookies our website does not work.</p>
                    <article class="intaCookieListOverview">
                        <table>
                        ${
                            inta_requiredCookieList.map((cookie) => {
                                let purpose = "<br>";
                                if(cookie == int_staticsticCookies){
                                    purpose = `
                                        Its function is to store users cookie choice regarding statistical cookies. Its purpose is to store a users cookie choice whether a user allows tracking & cookies for statistical purposes or not.
                                    `
                                } else if(cookie == int_marketingCookies){
                                    purpose = `
                                    Its function is to store users cookie choice regarding marketing / advertising cookies. Its purpose is to store a users cookie choice whether a user allows tracking & cookies for advertising purposes or not.
                                    `
                                } else if(cookie == int_FunctionalCookies){
                                    purpose = `
                                        Its function is to store users cookie choice regarding functional cookies. Its purpose is to store a users cookie choice whether a user allows storing for functional purposes like chosen region, or not.
                                    `
                                }else if(cookie == int_hideCookieBannerName){

                                }else if (cookie == int_cookieName){

                                }else if(cookie == int_visitorCheck){

                                }

                                return `
                                    <tr>
                                        <td>${cookie}</td>
                                        <td>${purpose}</td>
                                    </tr>
                                    `
                            }).join(" ")
                        }
                        </table>
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">Functional / Preference <i class="intastellar__arrow"></i></h3>
                    <p>Functional cookies make it possible to save information that changes the way the website appears or acts. For instance your preferred language or region.</p>
                    <article class="intaCookieListOverview">
                        <table>
                        ${
                            inta_functionalCookieList.map((cookie) => {
                                return `
                                    <tr>
                                        <td>${cookie}</td>
                                        <td></td>
                                    </tr>`
                            }).join(" ")
                        }
                        </table>
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">Statics <i class="intastellar__arrow"></i></h3>
                    <p>We want to constantly improve the user-friendliness and performance of our websites. For this reason we use analysis technologies (including cookies) which pseudonymously measure and evaluate which functions and content of our websites are used, how and how often. On this basis we can improve our websites for users.</p>
                    <article class="intaCookieListOverview">
                        <table>
                        ${
                            inta_statisticCookieList.map((cookie) => {
                                return `
                                    <tr>
                                        <td>${cookie}</td>
                                        <td></td>
                                    </tr>`
                            }).join(" ")
                        }
                        </table>
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">Advertisement <i class="intastellar__arrow"></i></h3>
                    <p>We use web technologies (also cookies) from selected partners in order to be able to show you content and advertising specially tailored to you on websites and social media sites. This content is selected and displayed on the basis of your usage behaviour.</p>
                    <p>Advertisement or Marketing cookies are used to provide visitors with relevant ads and marketing campaigns. These cookies track visitors across websites and collect information to provide customized ads.</p>
                    <article class="intaCookieListOverview">
                        <table>
                        ${
                            inta_marketingCookieList.map((cookie) => {
                                return `
                                    <tr>
                                        <td>${cookie}</td>
                                        <td></td>
                                    </tr>`
                            }).join(" ")
                        }
                        </table>
                    </article>
                </section>
            </article>
        `;
    } else {
        /* Default */
        settingsMessage = settingsMessages.danish;
        
        message =
            messageWrapStart
            + messages.danish
            + messageWrapEnd
            + generatePolicyUrl('Vores privat og cookie politik');
        cookieBtn = generateCookieButtons('Accepter', 'Afvis', 'Indstillinger');
        moreFooter.innerHTML =
        `
            <section class="intCookieSaveSettingsContainer">
                ${generateCookieSettingsButton(saveSettings.danish, 'Accepter')}
                <button class="intLearnMoreBtn" >Læs mere om cookies</button>
                <article class="intCookieSetting__form">
                    <section class="intastellarSettings__control">
                        <label class="intSettingDisabled checkMarkContainer">
                            <span class="intSettingsTitle">Nødvendige</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Funktionel</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${getCookie(int_FunctionalCookies)}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Statistiske</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${getCookie(int_staticsticCookies)}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Marketing</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${getCookie(int_marketingCookies)}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                </article>
            </section>
            <section class="intastellar_privacyPolicy"></section>
            <article class="intReadMore">
                <section class="required">
                    <h3 class="intaExpandCookieList">Nødvendige <i class="intastellar__arrow"></i></h3>
                    <p>Påkrævede webteknologier og cookies gør vores hjemmeside teknisk tilgængelig for og brugbar for dig. Dette gælder grundlæggende basisfunktioner såsom navigation på hjemmesiden, korrekt visning i din internetbrowser eller anmodning om dit samtykke. Uden disse webteknologier og cookies fungerer vores hjemmeside ikke.</p>
                    <article class="intaCookieListOverview">
                        <table>
                        ${
                            inta_requiredCookieList.map((cookie) => {
                                let purpose = "<br>";
                                if(cookie == int_staticsticCookies){
                                    purpose = `
                                        Its function is to store users cookie choice regarding statistical cookies. Its purpose is to store a users cookie choice whether a user allows tracking & cookies for statistical purposes or not.
                                    `
                                } else if(cookie == int_marketingCookies){
                                    purpose = `
                                    Its function is to store users cookie choice regarding marketing / advertising cookies. Its purpose is to store a users cookie choice whether a user allows tracking & cookies for advertising purposes or not.
                                    `
                                } else if(cookie == int_FunctionalCookies){
                                    purpose = `
                                        Its function is to store users cookie choice regarding functional cookies. Its purpose is to store a users cookie choice whether a user allows storing for functional purposes like chosen region, or not.
                                    `
                                }else if(cookie == int_hideCookieBannerName){

                                }else if (cookie == int_cookieName){

                                }else if(cookie == int_visitorCheck){

                                }

                                return `
                                    <tr>
                                        <td>${cookie}</td>
                                        <td>${purpose}</td>
                                    </tr>
                                    `
                            }).join(" ")
                        }
                        </table>
                    </article>
                </section>
                <section>
                    <h3>Funktionel / Præference <i class="intastellar__arrow"></i></h3>
                    <p>Funktionelle cookies gør det muligt at gemme information, der ændrer måden hjemmesiden fremstår eller fungerer på. For eksempel dit foretrukne sprog eller område.</p>
                    <table>
                    ${
                        inta_functionalCookieList.map((cookie) => {
                            return `
                                <tr>
                                    <td>${cookie}</td>
                                    <td></td>
                                </tr>`
                        }).join(" ")
                    }
                    </table>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">Statistik <i class="intastellar__arrow"></i></h3>
                    <p>Vi ønsker konstant at forbedre brugervenligheden og ydeevnen på vores hjemmesider. Af denne grund bruger vi analyseteknologier (inklusive cookies), som pseudonymt måler og vurderer, hvilke funktioner og indhold på vores hjemmesider der bruges, hvordan og hvor ofte. På dette grundlag kan vi forbedre vores hjemmesider for brugerne.</p> 
                    <article class="intaCookieListOverview">
                        <table>
                        ${
                            inta_statisticCookieList.map((cookie) => {
                                return `
                                    <tr>
                                        <td>${cookie}</td>
                                        <td></td>
                                    </tr>`
                            }).join(" ")
                        }
                        </table>
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">Marketing <i class="intastellar__arrow"></i></h3>
                    <p>Vi bruger webteknologier (også cookies) fra udvalgte partnere for at kunne vise dig indhold og annoncer, der er specielt skræddersyet til dig på hjemmesider og sociale medier. Dette indhold udvælges og vises på baggrund af din brugsadfærd.</p>
                    <p>Annonce- eller marketingcookies bruges til at give besøgende relevante annoncer og marketingkampagner. Disse cookies sporer besøgende på tværs af websteder og indsamler oplysninger for at levere tilpassede annoncer.</p>
                    <article class="intaCookieListOverview">
                        <table>
                        ${
                            inta_marketingCookieList.map((cookie) => {
                                return `
                                    <tr>
                                        <td>${cookie}</td>
                                        <td></td>
                                    </tr>`
                            }).join(" ")
                        }
                        </table>
                    </article>
                </section>
            </article>
        `;
    }

    moreContentText.innerHTML = settingsMessage;

    let ccpa = window.INTA.settings === undefined || window.INTA.settings.ccpa === undefined ? false : window.INTA.settings.ccpa.on;
    let ccpaUrl = window.INTA.settings === undefined || window.INTA.settings.ccpa === undefined ? false : window.INTA.settings.ccpa.url;
    let cookieColor = window.INTA.settings === undefined || window.INTA.settings.color === undefined || window.INTA.settings.color.indexOf("[") > -1 || window.INTA.settings.color === ""  ? "rgba(0, 51, 153, 1)" : window.INTA.settings.color;
    let cookieLogo = window.INTA.settings === undefined || window.INTA.settings.logo === undefined || window.INTA.settings.logo === "" || window.INTA.settings.logo.indexOf("[") > -1 ? intCookieIcon : window.INTA.settings.logo;
    let backgroundColor = window.INTA.settings === undefined || window.INTA.settings.background_color === undefined ? "#fff" : window.INTA.settings.background_color;
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

    const s = document.createElement("style");

    let textSettings = window.INTA.settings === undefined || window.INTA.settings.text === undefined ? false : window.INTA.settings.text;
    let withText = `
    .intastellarCookie-settingsContainer{
        border-radius: 50%;
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

    let IntastellarToolTip = '<div class="intastellarToolTip '+ position +'">'+ intastellarCookieLanguageSettings +'</div>';
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
        text = " Cookie notice";
        cookieSize = "25%";
    }
    s.innerHTML = ".intastellarCookie-settingsContainer,.intastellarCookieConstents__contentC, .intastellarCookie-settings__btn.--bg, .intastellarCCPAContainer{background: " + cookieColor + " !important;color: #fff !important;} .intCookie_ConsentLogo-container{border-color: #fff; background: linear-gradient(#fff 0 0) padding-box, "+cookieColor+" border-box;} .intCookie_ConsentContainer-content{border-color: #fff; background: linear-gradient(#fff 0 0) padding-box, "+cookieColor+" border-box;} .intastellarCookie-settings__btn.--changePermission{border-image-slice: 1;border-color: "+cookieColor+";border-image:" + cookieColor + " 1 !important; border-width: 3px; border-style: solid; background: "+cookieColor+" !important;color: #fff !important; transition: background .25s ease-in-out; width: max-content; margin-inline: auto !important;} .intastellarCookie-settings__btn.--changePermission:hover{background-color: transparent !important; background: transparent !important; color: currentColor !important;} .intCookieSetting__checkbox:checked ~ .checkmark{background: "+ checkMarkColor +";}.intastellarCCPA__popupClose{background:"+ cookieColor +"; color: #fff;} .intastellarCookie-settings__btn.--bg:hover{background: " + brightColor + " !important;}.intastellarCookie-settings__close:hover{background: " + brightColor + " !important;} .intastellarCookieConstents__content-main .intastellarCookie-settings__privacyLink{color: #fff !important;} .intastellarCookie-settings__privacyLink{text-decoration: underline !important;}.intastellarCookie-settings__content .intastellarCookie-settings__privacyLink{color: "+cookieTextColor+";}.intastellarCookie-settings__content p{color: " + cookieTextColor + " !important;}.intastellarCookie-settings__intHeader{color:" + cookieTextColor + " !important;}.intastellarCookie-settings__container{background-color: " + backgroundColor + " !important;} .intastellarCookie-settingsMoreContainer{display:none;position: fixed; top: 50%; left: 50%; background: #fff; padding: 15px;z-index: 1000; transform: translate(-50%,-50%);}" + withText;
    intHead.appendChild(s);

    /* Checking for CCPA "Do not sell my personal data" is enabled if so create an info link on the right side of the screen  */
    if (ccpa && isValidCCPALink()) {
        const intastellarCCPAContainer = document.createElement("article");
        const intastellarCCPAContainer__content = document.createElement("section");

        intastellarCCPAContainer.setAttribute("class", "intastellarCCPAContainer");
        intastellarCCPAContainer.setAttribute("title", "California Consumer Privacy Act: Do not sell my information!");
        intastellarCCPAContainer__content.setAttribute("class", "intastellarCCPAContainer__content")
        intastellarCCPAContainer__content.innerHTML = `
            <svg class="intastellarCCPA__icon" height="14" viewBox=".2 0 19.4 20" width="13" xmlns="http://www.w3.org/2000/svg"><path d="m2.2 20c1 0 1.7-.5 2.4-.9.6-.3 1.2-.7 1.9-1 3.2-1.7 6.4-3.5 9.6-5.3 1-.5 2.3-1 3-1.9.2-.3.5-.7.4-1.2-.3-1.1-1.7-1.5-2.6-2-2.2-1.2-4.5-2.5-6.7-3.7-.8-.5-2-1.4-3-.7-.4.2-.6.4-.7.7-.1.4 0 .9 0 1.3v3.2c0 .9-.1 1.6.5 2 .2.1.6.2.9.1 1-.4.7-2.2.7-3.6v-1.1c1.7.9 3.4 1.8 5.1 2.6.6.3 1.6.6 1.8 1.4.2.9-1.7 1.6-2.3 1.9l-6.9 3.9c-.5.3-1.8 1.3-2.6 1-.3-.1-.5-.4-.5-.6-.1-.4-.1-1-.1-1.5v-3.2-5.4c0-.8-.1-1.8.2-2.3.7-1 2.3.8 2.8-.8.1-.4-.1-.8-.3-1-.4-.6-2.2-1.5-2.9-1.7-.2-.1-.7-.2-1-.2-1.7.3-1.3 3-1.3 5v9.9c0 1.5-.2 3.5.4 4.4.3.5.6.5 1.2.7zm5.2-6.5c1.5 0 1.6-1.9.2-2.2-.8-.1-1.4.7-1.2 1.4.2.5.5.6 1 .8z" fill="#fff"/></svg> Do not sell my personal data!
        `;

        intastellarCCPAContainer.appendChild(intastellarCCPAContainer__content);
        document.body.appendChild(intastellarCCPAContainer);


        const intastellarCCPApopup = document.createElement("article");
        intastellarCCPApopup.setAttribute("class", "intastellarCCPApopup");
        
        const instastellarCCPApopupContent = document.createElement("section");
        instastellarCCPApopupContent.setAttribute("class", "intastellarCCPApopup__content");

        if (window.INTA.settings.ccpa.collection != undefined) {
            instastellarCCPApopupContent.innerHTML = `
            <h2><svg class="intastellarCCPA__icon" width="18px" height="19px" viewBox=".2 0 19.4 20" width="13" xmlns="http://www.w3.org/2000/svg"><path d="m2.2 20c1 0 1.7-.5 2.4-.9.6-.3 1.2-.7 1.9-1 3.2-1.7 6.4-3.5 9.6-5.3 1-.5 2.3-1 3-1.9.2-.3.5-.7.4-1.2-.3-1.1-1.7-1.5-2.6-2-2.2-1.2-4.5-2.5-6.7-3.7-.8-.5-2-1.4-3-.7-.4.2-.6.4-.7.7-.1.4 0 .9 0 1.3v3.2c0 .9-.1 1.6.5 2 .2.1.6.2.9.1 1-.4.7-2.2.7-3.6v-1.1c1.7.9 3.4 1.8 5.1 2.6.6.3 1.6.6 1.8 1.4.2.9-1.7 1.6-2.3 1.9l-6.9 3.9c-.5.3-1.8 1.3-2.6 1-.3-.1-.5-.4-.5-.6-.1-.4-.1-1-.1-1.5v-3.2-5.4c0-.8-.1-1.8.2-2.3.7-1 2.3.8 2.8-.8.1-.4-.1-.8-.3-1-.4-.6-2.2-1.5-2.9-1.7-.2-.1-.7-.2-1-.2-1.7.3-1.3 3-1.3 5v9.9c0 1.5-.2 3.5.4 4.4.3.5.6.5 1.2.7zm5.2-6.5c1.5 0 1.6-1.9.2-2.2-.8-.1-1.4.7-1.2 1.4.2.5.5.6 1 .8z" fill="#000"/></svg> Do not sell my personal data!</h2><button class="intastellarCCPA__popupClose">X</button>
            <p>This section is about our California Consumer Privacy Act.</p>
            ${createCCPAPolicyLink(ccpaUrl)}
            <h3>Personal data we collect:</h3>
            <ul>
                <li>IP-Address</li>
                ${window.INTA.settings.ccpa.collection.map(name => '<li>' + name.charAt(0).toUpperCase() + '' + name.slice(1) + '</li>').join('')}
            </ul>
            `;
        }else{
            instastellarCCPApopupContent.innerHTML = `
            <h2><svg class="intastellarCCPA__icon" width="18px" height="19px" viewBox=".2 0 19.4 20" width="13" xmlns="http://www.w3.org/2000/svg"><path d="m2.2 20c1 0 1.7-.5 2.4-.9.6-.3 1.2-.7 1.9-1 3.2-1.7 6.4-3.5 9.6-5.3 1-.5 2.3-1 3-1.9.2-.3.5-.7.4-1.2-.3-1.1-1.7-1.5-2.6-2-2.2-1.2-4.5-2.5-6.7-3.7-.8-.5-2-1.4-3-.7-.4.2-.6.4-.7.7-.1.4 0 .9 0 1.3v3.2c0 .9-.1 1.6.5 2 .2.1.6.2.9.1 1-.4.7-2.2.7-3.6v-1.1c1.7.9 3.4 1.8 5.1 2.6.6.3 1.6.6 1.8 1.4.2.9-1.7 1.6-2.3 1.9l-6.9 3.9c-.5.3-1.8 1.3-2.6 1-.3-.1-.5-.4-.5-.6-.1-.4-.1-1-.1-1.5v-3.2-5.4c0-.8-.1-1.8.2-2.3.7-1 2.3.8 2.8-.8.1-.4-.1-.8-.3-1-.4-.6-2.2-1.5-2.9-1.7-.2-.1-.7-.2-1-.2-1.7.3-1.3 3-1.3 5v9.9c0 1.5-.2 3.5.4 4.4.3.5.6.5 1.2.7zm5.2-6.5c1.5 0 1.6-1.9.2-2.2-.8-.1-1.4.7-1.2 1.4.2.5.5.6 1 .8z" fill="#000"/></svg> Do not sell my personal data!</h2><button class="intastellarCCPA__popupClose">X</button>
            <h3>Personal data we collect:</h3>
            <p>This section is about our California Consumer Privacy Act.</p>
            <ul>
                <li>IP-Address</li>
            </ul>
            `;
        }
        intastellarCCPApopup.appendChild(instastellarCCPApopupContent);
        document.body.appendChild(intastellarCCPApopup);
        document.querySelector(".intastellarCCPAContainer").addEventListener("click", function () {
            document.querySelector(".intastellarCCPApopup").classList.toggle("--active");
        })
    } else if (!isValidCCPALink() && "ccpa" in window.INTA.settings && window.INTA.settings.ccpa.on === "true") {
        throw new IntastellarSolutionsSDK("Please add your valid 'California Consumer Privacy Act' url to the banner. Read more at https://www.intastellarsolutions.com/gdpr-cookiebanner");
    }

    cookieSettingsContent.setAttribute("class", "intastellarCookie-settings__content");
    let poweredBy = "";
    if (window.location.host.indexOf("intastellarsolutions") == -1) {
        poweredBy = "<span class='intastellarCookie-settings__poweredBy' alt='This cookie banner is powered by Intastellar Solutions, International'>Powered by <a class='intastellarCookie-settings__poweredByLink' href='https://www.intastellarsolutions.com/gdpr-cookiebanner?utm_source=" + encodeURI(window.location.href) + "&utm_content=powered_by&utm_medium=referral&utm_campaign=" + pluginSource + "&utm_term=gdpr_banner_logo' target='_blank' rel='noopener'><img class='intastellarCookie-settings__poweredByImg' width='189px' height='50px' src='https://www.intastellarsolutions.com/assets/intastellar_solutions.svg' alt='Intastellar Solutions, International'></a></span>";
    }
    
    let intCookieIconSmallClass = cookieLogo == intCookieIcon ? " intastellarIcon" : "";
    let CompanyLogoName = cookieLogo == intCookieIcon ? "Cookie Icon" : `${document.domain} logo`;

    moreintHeader.innerHTML = `
        <img class="intSettingsCompanyLogo${intCookieIconSmallClass}" width="150px" height="auto" src="${cookieLogo}" alt="${CompanyLogoName}">
        <section class="intSettingsPoweredBy">${poweredBy}</section>`;
    
    cookieSettingsContent.innerHTML = '<intHeader class="intastellarCookie-settings__intHeader"><img src="' + cookieLogo + '" alt="' + CompanyLogoName + '" title="' + CompanyLogoName + '" style="width: 100%;float: left; max-width: 50px;max-height: 50px;object-fit:contain;"><h2>Cookie</h2><button class="intastellarCookie-settings__close" style="background: ' + cookieColor + ';"></button></intHeader>' +
        message + cookieBtn + "" + poweredBy;

    cookieSettings.appendChild(cookieSettingsContent);

    banner.appendChild(cookieSettings);

    banner.setAttribute("class", "intastellarCookie-settings");

    bannerContent.innerHTML = '<img class="intCookieIcon-openSettings" style="filter: invert(1);" src="'+intCookieIcon+'" alt="Cookie Icon">'+ IntastellarToolTip +' ' + text;

    banner.appendChild(bannerContent);
    moreSettings.appendChild(moreSettingsContent);

    document.body.appendChild(banner);
    document.body.appendChild(moreSettings);
}

/* - - - Helper functions for Messages */
function generatePolicyUrl(policy_link_text) {
    let url = "";
    if (typeof window.INTA.policy_link === 'undefined') {
        console.log("Error: Policy URL has not been defined.");
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

/* - - - Helper function to learn more - - - */
function learnMore(e) {
    /* if(document.querySelector(".intastellar_privacyPolicy").style.height === "100%") {
        document.querySelector(".intastellar_privacyPolicy").height = "0";
    } */
    document.querySelector(".intReadMore").classList.toggle("view");
    document.querySelector(".intastellarCookieConstents__content").style.scrollPaddingTop = "225px";
    document.querySelector(".intReadMore").scrollIntoView({
        behavior: "smooth",
        block: "start",
    });

    if(document.querySelector(".intReadMore").classList.contains("view")){
        e.innerHTML = "Hide details";
    }else {
        e.innerHTML = "Show details";
    }
}

/* - - - Helper function for saving settings - - - */
function saveINTCookieSettings() {
    const FunctionalCheckbox = document.querySelector("#functional");
    const StaticsCheckBox = document.querySelector("#statics");
    const MarketingCheckBox = document.querySelector("#marketing");

    if (MarketingCheckBox.checked === false && StaticsCheckBox.checked === false && FunctionalCheckbox.checked === false) {
        document.cookie = int_cookieName + "=" + essentialsCookieName + "; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";
        document.cookie = int_analytic + "=no;expires=" + cookieLifeTime + ";path=/;" + intCookieDomain + "";
    }

    if (FunctionalCheckbox.checked) {
        /* localStorage.setItem("intFunctionalCookies", "checked"); */
        document.cookie = int_FunctionalCookies+"=checked; expires=" + cookieLifeTime +
        "; path=/; " +
        intCookieDomain +
            "";
        
        document.cookie =
        int_cookieName + "=" + allowAllCookieName + "; expires=" + cookieLifeTime +
        "; path=/; " +
        intCookieDomain +
            "";
        
        contentPolicyMetaTag.content += "";
    } else {
        document.cookie = int_FunctionalCookies+"=false; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";
    }

    if (StaticsCheckBox.checked) {
        /* localStorage.setItem("intStaticsCookies", "checked"); */
        document.cookie = int_staticsticCookies+"=checked; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";
        document.cookie =
            int_cookieName + "=" + allowAllCookieName + "; expires=" + cookieLifeTime +
            "; path=/; " +
            intCookieDomain +
            "";
        contentPolicyMetaTag.content += "";
    }else {
        document.cookie = int_staticsticCookies+"=false; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";
    }

    if (MarketingCheckBox.checked) {
        /* localStorage.setItem("intMarketingCookies", "checked"); */
        document.cookie = int_marketingCookies+"=checked; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";
        document.cookie =
            int_cookieName + "=" + allowAllCookieName + "; expires=" + cookieLifeTime +
            "; path=/; " +
            intCookieDomain +
            "";
        contentPolicyMetaTag.content += "";
    } else {
        document.cookie = int_marketingCookies+"=false; expires=" + cookieLifeTime + "; path=/; " +
                    intCookieDomain +
                    "";
    }

    document.cookie =
    int_hideCookieBannerName + "=1; expires=" + cookieLifeTime +
    "; path=/; " +
    intCookieDomain +
    "";

    window.location.reload();
}
/* - - - END - - - */


window.addEventListener("DOMContentLoaded", function () {
    /* Setting Google consent default values to denied & granted based on user selection. Via that Google Ads can be shown on Webpage if user gives consents to Advertisment / Marketing cookies */

    if(typeof gtag !== "undefined"){
        gtag('consent', 'default', {
            'ad_storage': (getCookie(int_marketingCookies) == "false") ? '"denied"': '"granted"',
            'personalization_storage': (getCookie(int_marketingCookies) == "false") ? '"denied"': '"granted"',
            'analytics_storage': (getCookie(int_staticsticCookies) == "false") ? '"denied"': '"granted"',
            'functionality_storage': (getCookie(int_FunctionalCookies) == "false") ? '"denied"': '"granted"'
        });
    }

    if (window.INT != undefined && window.INT.policy_link != undefined) { window.INTA.policy_link = window.INT.policy_link };
    if (window.INT != undefined && window.INT.settings != undefined) { window.INTA.settings = window.INT.settings };

    let intastellarCookieLanguage = window.intastellarCookieLanguage = window.INTA.settings === undefined || window.INTA.settings.lang === "auto" || window.INTA.settings.lang === "" ? document.querySelector("html").getAttribute("lang") : window.INTA.settings.language == "german" ? "de" : window.INTA.settings.language == "danish" ? "da" : window.INTA.settings.language == "english" ? "en" : document.querySelector("html").getAttribute("lang");
    if (isValidPolicyLink()) {
        createCookieSettings();
        /* - - - Helper function for learn more click - - - */
        document.querySelectorAll(".intLearnMoreBtn").forEach((btn) => {
            btn.addEventListener("click", function(e) {
                learnMore(this);
            })
        })

        document.querySelectorAll(".intaExpandCookieList").forEach((btn, i) => {
            
            btn.addEventListener("click", () => {
                document.querySelectorAll(".intastellar__arrow")[i].classList.toggle("open");
                document.querySelectorAll(".intaCookieListOverview")[i].classList.toggle("view");
            })
        })
        /* 
        const intaCookieList = Object.fromEntries(document.cookie.split('; ').map(c => c.split('=')));
        const intaRequiredCookieList = [];

        for (const [key] of Object.entries(intaCookieList)) {
            intaRequiredCookieList.push(key);
        }

        let test = Object.keys(intaRequiredCookieList);
        localStorage.setItem("test", intaRequiredCookieList);


        document.querySelector(".cookiesList").innerHTML =
            `<ul>
                ${
                    localStorage.getItem("test").split(",").map((t) => `<li>${t}</li>`).join("\n")
                }
            </ul>
            `;
        ; */

        let settings = document.querySelector(".intastellarCookie-settings__container");
        if (document.querySelector(".intastellarCookieBanner") != null) {
            if (getCookie(int_hideCookieBannerName) == "1") {
                document.querySelector(".intastellarCookieBanner").style.display = "none";
            } else {
                document.querySelector(".intastellarCookieBanner").style.display = "";
            }
        } else if (getCookie(int_hideCookieBannerName) == "1") {
            if (window.INTA.settings.advanced === false || window.INTA.settings.advanced === "" || window.INTA.settings.advanced === undefined) {
                document.querySelector(".intastellarCookieConstents").classList.toggle("--active");
            } else {
                settings.classList.toggle("intastellarCookie-settings__container--expand");
            }
        }

        function cookieEnabled() {
            let cookieEnabled = navigator.cookieEnabled;
            if (!cookieEnabled) {
                document.cookie = "test";
                cookieEnabled = document.cookie.indexOf("test") !== -1;
            }
            return cookieEnabled;
        }

        document.querySelectorAll(".intastellarCookieBanner__settings").forEach((setting) => {
            setting.addEventListener("click", () => {
                let intCookieSettingsMore = document.querySelector(".intastellarCookieConstents");
                if (!intCookieSettingsMore.classList.contains("--active")) {
                    intCookieSettingsMore.classList.add("--active");
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

        FunctionalCheckbox.addEventListener("change", () => {
            document.querySelector(".intastellarCookie-settings__btn.intastellarCookieBanner__settings.--save").innerText = FunctionalCheckbox.checked === false
                && StaticsCheckBox.checked === false
                && MarketingCheckBox.checked === false
                ? settingsSaveLang.necessaryCookiesText : settingsSaveLang.saveSettingsText;
        })

        StaticsCheckBox.addEventListener("change", () => {
            document.querySelector(".intastellarCookie-settings__btn.intastellarCookieBanner__settings.--save").innerText = FunctionalCheckbox.checked === false
                && StaticsCheckBox.checked === false
                && MarketingCheckBox.checked === false
                ? settingsSaveLang.necessaryCookiesText : settingsSaveLang.saveSettingsText;
        })

        MarketingCheckBox.addEventListener("change", () => {
            document.querySelector(".intastellarCookie-settings__btn.intastellarCookieBanner__settings.--save").innerText = FunctionalCheckbox.checked === false
                && StaticsCheckBox.checked === false
                && MarketingCheckBox.checked === false
                ? settingsSaveLang.necessaryCookiesText : settingsSaveLang.saveSettingsText;
        })

        document.querySelector(".intastellarCookie-settings__btn.intastellarCookieBanner__settings.--save").innerText = FunctionalCheckbox.checked === true
                && StaticsCheckBox.checked === true
                && MarketingCheckBox.checked === true
                || FunctionalCheckbox.checked === true
                || StaticsCheckBox.checked === true
                || MarketingCheckBox.checked === true
            ? settingsSaveLang.saveSettingsText : settingsSaveLang.necessaryCookiesText

        document.querySelector(".--save").addEventListener("click",() => {
            saveINTCookieSettings();
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

                document.cookie =
                    int_hideCookieBannerName + "=1; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";
                document.cookie =
                    int_cookieName + "=" + allowAllCookieName + "; expires=" + cookieLifeTime +
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
                if (getMeta("Content-Security-Policy")) {
                    /* intHead.removeChild(contentPolicyMetaTag); */
                }

                

                document.cookie = int_FunctionalCookies + "=checked; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";
                document.cookie = int_staticsticCookies + "=checked; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";
                document.cookie = int_marketingCookies + "=checked; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";
                window.location.reload();
            });
        }

        if (button__acceptAll != null || button__acceptAll != undefined) {
            button__acceptAll.addEventListener("click", function () {
                var cV = 1;
                document.cookie =
                    int_hideCookieBannerName + "=1; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";
                document.cookie =
                    int_cookieName + "=" + allowAllCookieName + "; expires=" + cookieLifeTime +
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

                

                document.cookie = int_FunctionalCookies + "=checked; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";
                document.cookie = int_staticsticCookies + "=checked; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";
                document.cookie = int_marketingCookies + "=checked; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";
                if (getMeta("Content-Security-Policy")) {
                    /* intHead.removeChild(contentPolicyMetaTag); */
                }
                window.location.reload();
            });
        }

        if (button__acceptAll != null || button__acceptAll != undefined) {
            button__acceptAllNecessary.addEventListener("click", function () {
                var cV = 1;
                document.cookie =
                    int_hideCookieBannerName + "=1; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";
                document.cookie =
                    int_cookieName + "=" + essentialsCookieName + "; expires=" + cookieLifeTime +
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

                    
                
                document.cookie = int_FunctionalCookies + "=checked; expires=" + cookieLifeTime +
                "; path=/; " +
                    intCookieDomain +
                    "";
                document.cookie = int_marketingCookies + "=checked; expires=" + cookieLifeTime +
                "; path=/; " +
                    intCookieDomain +
                    "";
                document.cookie = int_staticsticCookies + "=checked; expires=" + cookieLifeTime +
                "; path=/; " +
                    intCookieDomain +
                    "";

                window.location.reload();
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
                    saveINTCookieSettings();
                })
            })

            if (window.INTA.settings.advanced === false || window.INTA.settings.advanced === "" || window.INTA.settings.advanced === undefined) {
                configBtn.forEach((configs) => {
                    configs.addEventListener("click", function () {
                        let settings = document.querySelector(".intastellarCookie-settings__container");
                        settings.classList.toggle("intastellarCookie-settings__container--expand");
                    });
                })
            } else {
                configBtn.forEach((configs) => {
                    configs.addEventListener("click", function () {
                        let settings = document.querySelector(".intastellarCookieConstents");
                        settings.classList.toggle("--active");
                    });
                })
            }

            closeSettings.addEventListener("click", function () {
                let settings = document.querySelector(".intastellarCookie-settings__container");
                settings.classList.toggle("intastellarCookie-settings__container--expand");
            })

            if (analyticsBTN != null || analyticsBTN != undefined) {
                analyticsBTN.addEventListener("click", function () {
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName + "=1; expires=" + cookieLifeTime +
                        "; path=/; " +
                        intCookieDomain +
                        "";
                    document.cookie =
                        int_cookieName + "=analytics; expires=" + cookieLifeTime +
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
                    window.location.reload();
                })
            }

            ness.forEach((n) => {
                n.addEventListener("click", function () {

                    document.cookie = int_FunctionalCookies + "=false; expires=" + cookieLifeTime +
                    "; path=/; " +
                        intCookieDomain +
                        "";
                    document.cookie = int_staticsticCookies + "=false; expires=" + cookieLifeTime +
                    "; path=/; " +
                        intCookieDomain +
                        "";
                    document.cookie = int_marketingCookies + "=false; expires=" + cookieLifeTime +
                    "; path=/; " +
                        intCookieDomain +
                        "";
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName + "=1; expires=" + cookieLifeTime +
                        "; path=/; " +
                        intCookieDomain +
                        "";
                    document.cookie =
                        int_cookieName + "=" + essentialsCookieName + "; expires=" + cookieLifeTime +
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
                    document.cookie = int_analytic + "=no;expires=" + cookieLifeTime + ";path=/;" + intCookieDomain;
                    
                    window.location.reload();
                });
            });
            all.forEach((a) => {
                a.addEventListener("click", function () {
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName + "=1; expires=" + cookieLifeTime +
                        "; path=/; " +
                        intCookieDomain +
                        "";
                    document.cookie =
                        int_cookieName + "=" + allowAllCookieName + "; expires=" + cookieLifeTime +
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
                    document.cookie = int_analytic + "=yes;expires=" + cookieLifeTime + ";path=/;" + intCookieDomain;
                    
                    var addedNodes = document.getElementsByTagName("script");
                    for (var i = 0; i < addedNodes.length; i++) {
                        addedNodes.type = "";
                    }

                    

                    document.cookie = int_FunctionalCookies + "=checked; expires=" + cookieLifeTime +
                        "; path=/; " +
                        intCookieDomain +
                        "";
                    document.cookie = int_staticsticCookies + "=checked; expires=" + cookieLifeTime +
                        "; path=/; " +
                        intCookieDomain +
                        "";
                    document.cookie = int_marketingCookies + "=checked; expires=" + cookieLifeTime +
                        "; path=/; " +
                        intCookieDomain +
                        "";
                    if (getMeta("Content-Security-Policy")) {
                        /* intHead.removeChild(contentPolicyMetaTag); */
                    }
                    window.location.reload();
                })
            });
        } else {
            const configBtn = document.querySelectorAll(".intastellarCookie-settingsContainer");
            const config = document.querySelectorAll(".config");

            const ness = document.querySelectorAll(".intastellarCookieBanner__accpetNecssery");
            const all = document.querySelectorAll(".intastellarCookieSettings--acceptAll");
            const closeCCPAButton = document.querySelector(".intastellarCCPA__popupClose");

            const analyticsBTN = document.querySelector(".analytics");
            const closeSettings = document.querySelector(".intastellarCookie-settings__close");
            let settings = document.querySelector(".intastellarCookie-settings__container");

            const changePermission = document.querySelectorAll(".intastellarCookie-settings__btn.--changePermission");

            changePermission.forEach((change) => {
                change.addEventListener("click", function () {
                    if (this.getAttribute("data-type") == "intMarketingCookies") {
                        document.querySelector("#marketing").checked = true;
                    } else if (this.getAttribute("data-type") == "intFunctionalCookies") {
                        document.querySelector("#functional").checked = true;
                    }
                    saveINTCookieSettings();
                })
            })
            /* Showing default banner when no custom banner is set */
            if (document.querySelector(".intastellarCookieBanner") == null || document.querySelector(".intastellarCookieBanner") == undefined) {
                if (window.INTA.settings.advanced === false || window.INTA.settings.advanced === "" || window.INTA.settings.advanced === undefined) {
                    document.querySelector(".intastellarCookieConstents").classList.toggle("--active");
                } else {
                    settings.classList.toggle("intastellarCookie-settings__container--expand");
                }
            }

            if (window.INTA.settings.advanced) {
                configBtn.forEach((configs) => {
                    configs.addEventListener("click", function () {
                        let settings = document.querySelector(".intastellarCookie-settings__container");
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
                        settings.classList.add("--active");
                    });
                })
            }

            closeSettings.addEventListener("click", function () {
                let settings = document.querySelector(".intastellarCookie-settings__container");
                settings.classList.toggle("intastellarCookie-settings__container--expand");
            })

            ness.forEach((n) => {
                n.addEventListener("click", function () {

                    document.cookie = int_FunctionalCookies + "=false; expires=" + cookieLifeTime +
                    "; path=/; " +
                        intCookieDomain +
                        "";
                    document.cookie = int_staticsticCookies + "=false; expires=" + cookieLifeTime +
                    "; path=/; " +
                        intCookieDomain +
                        "";
                    document.cookie = int_marketingCookies + "=false; expires=" + cookieLifeTime +
                    "; path=/; " +
                        intCookieDomain +
                        "";
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName + "=1; expires=" + cookieLifeTime +
                        "; path=/;" +
                        intCookieDomain +
                        "";
                    document.cookie =
                        int_cookieName + "=" + essentialsCookieName + "; expires=" + cookieLifeTime +
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
                    document.cookie = int_analytic + "=no;expires=" + cookieLifeTime + ";path=/;" + intCookieDomain;
                    
                    window.location.reload();
                });
            });

            all.forEach((a) => {
                a.addEventListener("click", function () {
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName + "=1; expires=" + cookieLifeTime +
                        "; path=/; " +
                        intCookieDomain +
                        "";
                    document.cookie =
                        int_cookieName + "=" + allowAllCookieName + "; expires=" + cookieLifeTime +
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
                    document.cookie = int_analytic + "=yes;expires=" + cookieLifeTime + ";path=/;" + intCookieDomain + "";
                    
                    var addedNodes = document.getElementsByTagName("script");
                    for (var i = 0; i < addedNodes.length; i++) {
                        addedNodes.type = "";
                    }


                    document.cookie = int_FunctionalCookies + "=checked; expires=" + cookieLifeTime +
                        "; path=/; " +
                        intCookieDomain +
                        "";
                    document.cookie = int_staticsticCookies + "=checked; expires=" + cookieLifeTime +
                        "; path=/; " +
                        intCookieDomain +
                        "";
                    document.cookie = int_marketingCookies + "=checked; expires=" + cookieLifeTime +
                        "; path=/; " +
                        intCookieDomain +
                        "";
                    if (getMeta("Content-Security-Policy")) {
                        /* intHead.removeChild(contentPolicyMetaTag); */
                    }
                    window.location.reload();
                })
            });
        }
    } else {
        checkCookieStatus();
        /* Displaying a error message if no valid privacy url is giving */
        const errorMessage = document.createElement("div");
        const errorMessageContent = document.createElement("div");

        errorMessage.className = "intastellarErrorMessage";
        errorMessageContent.className = "intastellarErrorMessage-content";

        errorMessageContent.innerHTML = "Intastellar Solutions SDK: Please add a valid privacy & cookie policy to the banner. Read more at <a href='https://developers.intastellarsolutions.com/gdpr-cookiebanner/docs/wordpress-docs#privacy' target='_blank' rel='noopener'>https://developers.intastellarsolutions.com/gdpr-cookiebanner/docs/wordpress-docs#privacy</a>";

        errorMessage.appendChild(errorMessageContent);
        document.body.appendChild(errorMessage);

        throw new IntastellarSolutionsSDK("Please add a valid privacy & cookie policy to the banner. Read more at https://developers.intastellarsolutions.com/gdpr-cookiebanner/docs/wordpress-docs#privacy")
    }
});