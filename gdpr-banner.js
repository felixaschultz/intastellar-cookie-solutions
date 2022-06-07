/*
 *  GDPR Cookie banner by Intastellar Solutions, International
 *  intastellarsolutions.com/gdpr-cookiebanner
 *  @copy 2022 Intastellar Solutions, International
 *
*/

/* - - - Setup - - - */
const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const int_cookieName = "__inta_ac_cookie";
const int_hideCookieBannerName = "__inta";
const int_analytic = "__inta__analytics";
const button__acceptAll = document.querySelector(".intastellarCookieBanner__acceptAll");
const button__acceptAllNecessary = document.querySelector(".intastellarCookieBanner__acceptNecessary");
const foundScripts = [];

const INTA = window.INTA = {
    policy_link: undefined,
    settings: {
        lang: "auto",
        color: "rgba(0, 51, 153, 1)",
        keepInLocalStorage: [],
        arrange: "ltr",
        logo: "https://img.icons8.com/ios-filled/50/000000/cookie.png",
    }
}

const allowAllCookieName = "__all__cookies";
const essentialsCookieName = "__essential__cookies";
const blockTrackingCookies = "__hideTrackingCookies";
const blockAdvertismentCookies = "__hideAdvertisementCookies";
const intHead = document.querySelector("head");

const cookieLifeTime = new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * 200).toGMTString();

const int__cookiesToKeep = [
    "PHPSESSID",
    int_cookieName,
    int_hideCookieBannerName
];

/* - - - Helper function to get cookie type*/
function intaCookieType(type) {
    if (localStorage.getItem(type) === "checked") return true;
    return (localStorage.getItem(type) === "true")
}

if (intaCookieType("intFunctional")) {
    int__cookiesToKeep.push("region");
    int__cookiesToKeep.push("language");
    int__cookiesToKeep.push("lang");
    int__cookiesToKeep.push("hl");
    int__cookiesToKeep.push("locale");
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

function checkCookieStatus() {

    const allScripts = [
        {
            /* Analytics Scripts who are beeing blocked */
            type: "statics",
            scripts: [
                "(?=gtag|gtm)",
                "(google-analytics+)",
                "(googletagmanager+)",
                "(googleoptimize+)",
                "(piwik+)",
                "(matomo+)",
                "(bing+)",
                "(slideshare+)",
                "(siteimproveanalytics+)",
                "(hotjar+)",
                "(qualtrics+)",
                "(pardot+)",
                "(poultons+)",
                "(clarity+)",
                "(consensu+)",
                "(quantserve+)[a-z]{2,5}(:[0-9]{1,5})?(\\/\\/.*)"
            ]
        },
        {
            /* Marketing Scripts who are beeing blocked */
            type: "marketing",
            scripts: [
                "(?=gtag|gtm)",
                "(_linkedin_partner_id|_linkedin_data_partner_ids)",
                "(googlesyndication+)",
                "(twitter+)",
                "(chimpstatic+)",
                "(trustpilot+)",
                "(mailchimp+)",
                "(linkedin+)",
                "(bing+)",
                "(licdn+)",
                "(amazon-adsystem+)",
                "(adfrom+)",
                "(demdex+)",
                "(stickyadstv+)",
                "(mookie1+)",
                "(bidswitch+)",
                "(jnqsge+)",
                "(syuh+)",
                "(ninthdecimal+)",
                "(casalemedia+)",
                "(adsymptotic+)",
                "(tremorhub+)",
                "(agkn+)",
                "(myvisualiq+)",
                "(exelator+)",
                "(openx+)",
                "(yahoo+)",
                "(advertising+)",
                "(adnxs+)",
                "(scdn+)",
                "(spotify+)",
                "(facebook+)",
                "(doubleclick+)",
                "(pinterest+)",
                "(googleadservices+)",
                "(googletagmanager+)[a-z]{2,5}(:[0-9]{1,5})?(\\/\\/.*)"
            ]
        },
        {
            /* Functional Scripts who are beeing blocked */
            type: "functional",
            scripts: [
                "(googleapis+)",
                "(recaptcha+)",
                "(grecaptcha+)",
                "(disqus+)[a-z]{2,5}(:[0-9]{1,5})?(\\/\\/.*)"
            ] 
        }
    ];
    /* All Scripts who are beeing blocked */
    const findScripts = [
        "(?=linkedin|gtag|grecaptcha|hotjar|gtm)(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+",
        "(google-analytics+)",
        "(!fontawesome+)",
        "(facebook+)",
        "(googlesyndication+)",
        "(googleapis+)",
        "(recaptcha+)",
        "(hotjar+)",
        "(googletagmanager+)",
        "(googleoptimize+)",
        "(trustpilot+)",
        "(piwik+)",
        "(matomo+)",
        "(twitter+)",
        "(chimpstatic+)",
        "(mailchimp+)",
        "(linkedin+)",
        "(licdn+)",
        "(amazon-adsystem+)",
        "(adfrom+)",
        "(demdex+)",
        "(stickyadstv+)",
        "(mookie1+)",
        "(bidswitch+)",
        "(jnqsge+)",
        "(syuh+)",
        "(ninthdecimal+)",
        "(casalemedia+)",
        "(adsymptotic+)",
        "(tremorhub+)",
        "(agkn+)",
        "(myvisualiq+)",
        "(exelator+)",
        "(openx+)",
        "(yahoo+)",
        "(advertising+)",
        "(adnxs+)",
        "(scdn+)",
        "(spotify+)",
        "(bing+)",
        "(doubleclick+)",
        "(pinterest+)",
        "(clarity+)",
        "(slideshare+)",
        "(siteimproveanalytics+)",
        "(googleadservices+)",
        "(consensu+)",
        "(disqus+)",
        "(quantserve+)",
        "[a-z]{2,5}(:[0-9]{1,5})?(\\/\\/.*)?$"
    ];

    /* Helper function to merge arrays */
    const merge = (first, second) => {
        for(let i=0; i<second.length; i++) {
          first.push(second[i]);
        }
        return first;
    }

    let notRequired;
    let m;
    /* Getting user prefrence settings from Local storage: checked means user has allowed. False means cookies needs to be blocked */
    if (localStorage.getItem("intFunctional") == "checked") {
        m = merge(allScripts[1].scripts, allScripts[0].scripts)
        notRequired = new RegExp(m.join("|"), "i"); 
    } else if (localStorage.getItem("intMarketing") == "checked") {
        m = merge(allScripts[2].scripts, allScripts[0].scripts)
        notRequired = new RegExp(m.join("|"), "i");
    } else if (localStorage.getItem("intStatics") == "checked") {
        m = merge(allScripts[1].scripts, allScripts[2].scripts)
        notRequired = new RegExp(m.join("|"), "i");
    } else if (localStorage.getItem("intFunctional") == "checked" && localStorage.getItem("intStatics") == "checked") {
        m = allScripts[1].scripts;
        notRequired = new RegExp(m.join("|"), "i");
    } else if (localStorage.getItem("intFunctional") == "checked" && localStorage.getItem("intMarketing") == "checked") {
        m = allScripts[0].scripts;
        notRequired = new RegExp(m.join("|"), "i");
    } else if (localStorage.getItem("intMarketing") == "checked" && localStorage.getItem("intStatics") == "checked") {
        m = allScripts[2].scripts;
        notRequired = new RegExp(m.join("|"), "i");
    } else {
        notRequired = new RegExp(findScripts.join("|"), "i");
    }

    const dc = getCookie(int_cookieName);
    const analyticsCookies = getCookie(int_analytic);

    if (analyticsCookies == "yes") {
        let s = document.createElement("script");
        s.src = "https://www.intastellarsolutions.com/js/analytics.js?v=" + new Date().getTime();
        intHead.appendChild(s);
    }

    /* - - - Observer - - - */
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(({ addedNodes }) => {
            addedNodes.forEach((node) => {
                if (!allCookiesAllowed() || !intaCookieType("intFunctional")) {
                    deleteAllCookies();
                }
                const iframe = document.querySelectorAll("iframe");
                iframe.forEach((frae) => {
                    if (frae.src.indexOf("maps.google.com") == -1) {
                        if (!intaCookieType("intMarketing")) {
                            frae.src = "about:blank";
                            let settingsContent = document.createElement("section");
                            settingsContent.style = "text-align: center;  padding: 15px;";
                            settingsContent.innerHTML = `
                            
                            <button class='intastellarCookie-settings__btn --changePermission' data-type='intMarketing'>Accept Marketing cookies</button>
                        `;
                            frae.parentElement.appendChild(settingsContent);
                            frae.parentElement.removeChild(frae);
                        }
                    } else {
                        if (!intaCookieType("intFunctional")) {
                            frae.src = "about:blank";
                            let settingsContent = document.createElement("section");
                            settingsContent.style = "text-align: center;  padding: 15px;";
                            settingsContent.innerHTML = `
                            
                            <button class='intastellarCookie-settings__btn --changePermission' data-type='intFunctional'>Accept Functional cookies</button>
                        `;
                            frae.parentElement.appendChild(settingsContent);
                            frae.parentElement.removeChild(frae);
                        }
                    }
                })

                if (node.nodeType === 1 && node.tagName === "SCRIPT" && node.type !== 'application/ld+json' && node.innerText.indexOf("window.INTA") == -1 && node.innerText.toLowerCase().indexOf("elementor") == -1) {
                    let src = node.src || "";
                    node.async = false;
                    foundScripts.push(src);
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
                                    node.type = "text/plain";
                                    
                                    node.parentElement.removeChild(node);
                                    deleteAllCookies();
                                }
                            }

                            if (
                                notRequired.test(node.innerText)
                            ) {

                                node.type = "text/plain";
                                node.parentElement.removeChild(node);
                                deleteAllCookies();
                            }
                        } else if(localStorage.getItem("intFunctional") == "false" || localStorage.getItem("intMarketing") == "false" || localStorage.getItem("intStatics") == "false"){
                            if (
                                src.indexOf(window.location.hostname) == -1
                                && src.indexOf("jquery") == -1 && src.indexOf("elementor") == -1
                            ) {
                                if (
                                    notRequired.test(src)
                                ) {
                                    node.type = "text/plain";
                                    node.parentElement.removeChild(node);
                                }
                            }

                            if (
                                notRequired.test(node.innerText)
                                && node.innerText.toLowerCase().indexOf("elementor") == -1
                            ) {
                                node.type = "text/plain";
                                node.parentElement.removeChild(node);
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
                                        node.type = "text/plain";
                                        node.parentElement.removeChild(node);
                                        deleteAllCookies();
                                    }
                                }

                                if (
                                    notRequired.test(node.innerText)
                                    && node.innerText.toLowerCase().indexOf("elementor") == -1
                                ) {
                                    node.type = "text/plain";
                                    node.parentElement.removeChild(node);
                                    deleteAllCookies();
                                }
                            } else if(localStorage.getItem("intFunctional") == "false" || localStorage.getItem("intMarketing") == "false" || localStorage.getItem("intStatics") == "false"){
                                if (
                                    src.indexOf(window.location.hostname) == -1
                                    && src.indexOf("jquery") == -1 && src.indexOf("elementor") == -1
                                ) {
                                    if (
                                        notRequired.test(src)
                                    ) {
                                        node.type = "text/plain";
                                        node.parentElement.removeChild(node);
                                    }
                                }
    
                                if (
                                    notRequired.test(node.innerText)
                                    && node.innerText.toLowerCase().indexOf("elementor") == -1
                                ) {
                                    node.type = "text/plain";
                                    node.parentElement.removeChild(node);
                                }
                            }

                            if (analyticsCookies == "yes") {
                                let s = document.createElement("script");
                                s.src = "https://www.intastellarsolutions.com/js/analytics.js";
                                intHead.appendChild(s);
                            }

                            if (node.getAttribute("type") === "text/plain")
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
                } else if (node.nodeType === 1 && node.tagName === "NOSCRIPT" && node.type !== 'application/ld+json' && node.innerText.indexOf("window.INTA") == -1 && node.innerText.toLowerCase().indexOf("elementor") == -1) {
                    if (dc == essentialsCookieName || dc == "") {

                        if (
                            notRequired.test(node.innerText)
                            && node.innerText.toLowerCase().indexOf("elementor") == -1
                        ) {
                            node.type = "text/plain";
                            node.parentElement.removeChild(node);
                            deleteAllCookies();
                        }
                    } else if(localStorage.getItem("intFunctional") == "false" || localStorage.getItem("intMarketing") == "false" || localStorage.getItem("intStatics") == "false"){
                        
                        if (
                            notRequired.test(node.innerText)
                            && node.innerText.toLowerCase().indexOf("elementor") == -1
                        ) {
                            node.type = "text/plain";
                            node.parentElement.removeChild(node);
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
                                    node.type = "text/plain";
                                    node.parentElement.removeChild(node);
                                    deleteAllCookies();
                                }
                            }
                        } else if(localStorage.getItem("intFunctional") == "false" || localStorage.getItem("intMarketing") == "false" || localStorage.getItem("intStatics") == "false"){
                            if (
                                src.indexOf(window.location.hostname) == -1
                                && src.indexOf("jquery") == -1 && src.indexOf("elementor") == -1
                            ) {
                                if (
                                    notRequired.test(src)
                                ) {
                                    node.type = "text/plain";
                                    node.parentElement.removeChild(node);
                                }
                            }
                            
                            if (
                                notRequired.test(node.innerText)
                                && node.innerText.toLowerCase().indexOf("elementor") == -1
                            ) {
                                node.type = "text/plain";
                                node.parentElement.removeChild(node);
                            }
                        }

                        if (node.getAttribute("type") === "text/plain")
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
    observer.observe(document.documentElement, {
        childList: !0,
        subtree: !0,
    });
};

checkCookieStatus();

const intaStyleLink = document.createElement('link');
intaStyleLink.rel = 'stylesheet';
intaStyleLink.type = 'text/css';
intaStyleLink.href = 'https://www.intastellarsolutions.com/components/css/jsCookieBannerinfo.css?v=' + new Date().getTime();
intaStyleLink.media = 'all';
intHead.appendChild(intaStyleLink);

domain = (function () {
    "use strict";
    var i = 0,
        d = document.domain || window.location.host,
        p = d.split("."),
        s = int_hideCookieBannerName + "" + new Date().getTime();
    while (i < p.length - 1 && document.cookie.indexOf(s + "=" + s) === -1) {
        d = p.slice(-1 - ++i).join(".");
        document.cookie = s + "=" + s + ";domain=" + d + "; path=/;";
    }
    document.cookie =
        s +
        "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" +
        d +
        "; path=/;";
    return d;
})();

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
        values.push(localStorage.getItem(keys[i]));
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

                const intMarketingLocalStorage = localStorage.getItem("intMarketing");
                const intStaticsLocalStorage = localStorage.getItem("intStatics");
                const intFunctionalLocalStorage = localStorage.getItem("intFunctional");

                localStorage.clear();
                localStorage.setItem(itemName, item);

                localStorage.setItem("intMarketing",intMarketingLocalStorage);
                localStorage.setItem("intStatics",intStaticsLocalStorage);
                localStorage.setItem("intFunctional",intFunctionalLocalStorage);
            }
        } else {
            localStorage.clear();
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
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=" + domain + "; path=/";
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

let intastellarCookieLanguage = window.INTA.settings === undefined || window.INTA.settings.lang === "auto" || window.INTA.settings.lang === "" ? document.querySelector("html").getAttribute("lang") : window.INTA.settings.language == "german" ? "de" : window.INTA.settings.language == "danish" ? "da" : window.INTA.settings.language == "english" ? "en" : document.querySelector("html").getAttribute("lang");
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

    moreSettings.setAttribute("class", "intastellarCookieConstents");
    moreSettingsContent.setAttribute("class", "intastellarCookieConstents__content");
    moreintHeader.setAttribute("class", "intastellarCookieConstents__content-intHeader");
    moreFooter.setAttribute("class", "intastellarCookieConstents__content-footer");

    moreContentText.setAttribute("class", "intastellarCookieConstents__content-main");

    const testSection = document.createElement("section");
    testSection.setAttribute("class", "intastellarCookieConstents__contentC");
    testSection.appendChild(moreintHeader);
    testSection.appendChild(moreContentText);
    moreSettingsContent.appendChild(testSection);
    moreSettingsContent.appendChild(moreFooter);

    const cookieSettings = document.createElement("article");
    const cookieSettingsContent = document.createElement("section");

    bannerContent.setAttribute("class", "intastellarCookie-settingsContainer");
    bannerContent.setAttribute("title", "Cookie Settings");
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
        german: "Wenn Sie auf akzeptieren klicken, unterstützen Sie " + document.domain + " bei der Weiterentwicklung von unserer Webseite.</p><p>Wählen Sie zwischen alle Cookies akzeptieren oder nur notwendige cookies.",
        english: "By accepting all cookies, you support " + document.domain + " in developing a better solution for you. </p><p> Select whether you want to allow only the necessary cookies or whether you want to allow all cookies."
    };
    const messageWrapStart = "<div class='intastellarCookie-settings__contentConatiner'><p>";
    const messageWrapEnd = "</p></div>";

    /* console.log(foundScripts.filter(item => { return item != ''})); */

    const settingsMessages = {
        danish: `<h3 style="    font-size: 25px;">Du bestemmer over dine data</h3>
        <p>Vi og vores samarbejdspartnere bruger teknologier, herunder cookies, til at indsamle oplysninger om dig til forskellige formål, herunder:</p>
        <ol>
            <li>Funktionel</li>
            <li>Statistiske</li>
            <li>Marketing</li>
        </ol>
        <p>Ved at trykke på 'Accepter alle' giver du samtykke til alle disse formål. Du kan også vælge at tilkendegive, hvilke formål du vil give samtykke til ved at benytte checkboksene ud for formålet, og derefter trykke på 'Gem indstillinger'.
        Du kan til enhver tid trække dit samtykke tilbage ved at trykke på det lille ikon nederst i venstre hjørne af hjemmesiden.</p>
        <p>Du kan læse mere om vores brug af cookies og andre teknologier, samt om vores indsamling og behandling af personoplysninger ved at trykke på linket.</p>
        ${generatePolicyUrl('Læs mere om cookies')}
        <article class="intReadMore">
            <section class="required">
                <h3>Nødvendige</h3>
                <p>Påkrævede webteknologier og cookies gør vores hjemmeside teknisk tilgængelig for og brugbar for dig. Dette gælder grundlæggende basisfunktioner såsom navigation på hjemmesiden, korrekt visning i din internetbrowser eller anmodning om dit samtykke. Uden disse webteknologier og cookies fungerer vores hjemmeside ikke.</p>
            </section>
            <section>
                <h3>Funktionel</h3>
                <p>Funktionelle cookies gør det muligt at gemme information, der ændrer måden hjemmesiden fremstår eller fungerer på. For eksempel dit foretrukne sprog eller område.</p>  
            </section>
            <section>
                <h3>Statistik</h3>
                <p>Vi ønsker konstant at forbedre brugervenligheden og ydeevnen på vores hjemmesider. Af denne grund bruger vi analyseteknologier (inklusive cookies), som pseudonymt måler og vurderer, hvilke funktioner og indhold på vores hjemmesider der bruges, hvordan og hvor ofte. På dette grundlag kan vi forbedre vores hjemmesider for brugerne.</p> 
            </section>
            <section>
                <h3>Marketing</h3>
                <p>Vi bruger webteknologier (også cookies) fra udvalgte partnere for at kunne vise dig indhold og annoncer, der er specielt skræddersyet til dig på hjemmesider og sociale medier. Dette indhold udvælges og vises på baggrund af din brugsadfærd.</p>
                <p>Annonce- eller marketingcookies bruges til at give besøgende relevante annoncer og marketingkampagner. Disse cookies sporer besøgende på tværs af websteder og indsamler oplysninger for at levere tilpassede annoncer.</p>
            </section>
        </article>`,
        german: `<h3 style="    font-size: 25px;">Sie haben die Kontrolle über Ihre Daten</h3>
        <p>Wir und unsere Geschäftspartner nutzen Technologien wie Cookies dazu, personenbezogene Informationen für verschiedene Zwecke zu sammeln, darunter:</p>
        <ol>
            <li>Funktionel</li>
            <li>Statistik</li>
            <li>Werbung</li>
        </ol>
        <p>Wenn Sie auf „Akzeptieren“ klicken, erteilen Sie Ihre Einwilligung für alle diese Zwecke. Sie können auch entscheiden, welchen Zwecken Sie zustimmen, indem Sie das Kästchen neben dem Zweck anklicken und auf „Einstellungen speichern“ klicken.</p>
        <p>Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie auf das kleine Symbol unten links auf der Webseite klicken.</p>
        ${generatePolicyUrl('Mehr über cookies erfahren')}
        <article class="intReadMore">
            <section class="required">
                <h3>Erforderliche</h3>
                <p>Erforderliche Webtechnologien und Cookies machen unsere Website für Sie technisch zugänglich und nutzbar. Dies betrifft grundlegende Basisfunktionalitäten wie die Navigation auf der Website, die korrekte Anzeige in Ihrem Internetbrowser oder das Einholen Ihrer Einwilligung. Ohne diese Webtechnologien und Cookies funktioniert unsere Website nicht.</p>
            </section>
            <section>
                <h3>Funktionel</h3>
                <p>Funktionale Cookies ermöglichen es, Informationen zu speichern, die das Erscheinungsbild oder die Handlungen auf der Website ändern können. Dabei könnte es sich um Ihre bevorzugte Sprache oder Region handeln.</p>
            </section>
            <section>
                <h3>Statistik</h3>
                <p>Wir möchten die Benutzerfreundlichkeit und Leistung unserer Websites stetig verbessern. Aus diesem Grund verwenden wir Analysetechnologien (einschließlich Cookies), die pseudonym messen und auswerten, welche Funktionen und Inhalte unserer Websites wie und wie oft genutzt werden. Auf dieser Grundlage können wir unsere Websites für die Nutzer verbessern.</p>
            </section>
            <section>
                <h3>Werbung</h3>
                <p>Wir verwenden Webtechnologien (auch Cookies) ausgewählter Partner, um Ihnen speziell auf Sie zugeschnittene Inhalte und Werbung auf Webseiten und Social-Media-Seiten anzeigen zu können. Diese Inhalte werden anhand Ihres Nutzungsverhaltens ausgewählt und angezeigt.</p>
                <p>Werbe- oder Marketing-Cookies werden verwendet, um Besuchern relevante Anzeigen und Marketingkampagnen bereitzustellen. Diese Cookies verfolgen Besucher über Websites hinweg und sammeln Informationen, um angepasste Anzeigen bereitzustellen.</p>
            </section>
        </article>`,
        english: `<h3 style="    font-size: 25px;">You´re in control</h3>
        <p>We and our business partners uses technologies, including cookies, to collect information about you for various purposes, including:</p>
        <ol>
            <li>Functional</li>
            <li>Statistical</li>
            <li>Marketing</li>
        </ol>
        <p>By clicking 'Accept', you give your consent for all these purposes. You can also choose to specify the purposes you consent to by ticking the checkbox next to the purpose and clicking 'Save settings'.</p>
        <p>You may withdraw your consent at any time by clicking the small icon at the bottom left corner of the website.</p>
        ${generatePolicyUrl('Learn more')}
        <article class="intReadMore">
            <section class="required">
                <h3>Strictly required</h3>
                <p>Required web technologies and cookies make our website technically accessible to and usable for you. This applies to fundamental base functionalities such as navigation on the website, correct display in your internet browser or requesting your consent. Without these web technologies and cookies our website does not work.</p>
            </section>
            <section>
                <h3>Functional</h3>
                <p>Functional cookies make it possible to save information that changes the way the website appears or acts. For instance your preferred language or region.</p>
            </section>
            <section>
                <h3>Statics</h3>
                <p>We want to constantly improve the user-friendliness and performance of our websites. For this reason we use analysis technologies (including cookies) which pseudonymously measure and evaluate which functions and content of our websites are used, how and how often. On this basis we can improve our websites for users.</p>
            </section>
            <section>
                <h3>Marketing</h3>
                <p>We use web technologies (also cookies) from selected partners in order to be able to show you content and advertising specially tailored to you on websites and social media sites. This content is selected and displayed on the basis of your usage behaviour.</p>
                <p>Advertisement or Marketing cookies are used to provide visitors with relevant ads and marketing campaigns. These cookies track visitors across websites and collect information to provide customized ads.</p>
            </section>
        </article>`
    }

    const saveSettings = {
        danish: "Gem indstillinger",
        german: "Einstellungen Speichern",
        english: "Save settings"
    }

    if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
        settingsMessage = settingsMessages.danish;
        message =
            messageWrapStart
            + messages.danish
            + messageWrapEnd
            + generatePolicyUrl('Vores privat og cookie politik');
        cookieBtn = generateCookieButtons('Accepter', 'Kun nødvendige cookies', 'Indstillinger');
        moreFooter.innerHTML = generateCookieSettingsButton(saveSettings.danish, 'Accepter') +
            `<article class="intCookieSetting__form">
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
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${localStorage.getItem("intFunctional")}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">Statistiske</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${localStorage.getItem("intStatics")}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">Marketing</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${localStorage.getItem("intMarketing")}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>`;
    } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
        settingsMessage = settingsMessages.german;
        message = messageWrapStart
            + messages.german
            + messageWrapEnd
            + generatePolicyUrl('Unsere Datenschutz Erklährung und Cookie politik');
        cookieBtn = generateCookieButtons('Akzeptieren', 'Nur notwendige cookies', 'Einstellungen');
        moreFooter.innerHTML =
        generateCookieSettingsButton(saveSettings.german, 'Akzeptieren') +
        `<article class="intCookieSetting__form">
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
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${localStorage.getItem("intFunctional")}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">Statistik</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${localStorage.getItem("intStatics")}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">Werbung</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${localStorage.getItem("intMarketing")}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>`;
    } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
        settingsMessage = settingsMessages.english;
        message =
            messageWrapStart
            + messages.english
            + messageWrapEnd
            + generatePolicyUrl('Our Privacy and cookie Policy');
        cookieBtn = generateCookieButtons('Accept', 'Necessary cookies only', 'Settings');
        moreFooter.innerHTML =
        generateCookieSettingsButton(saveSettings.english, 'Accept') +
        `<article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">Strictly required</span>
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
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${localStorage.getItem("intFunctional")}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">Statics</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${localStorage.getItem("intStatics")}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">Marketing</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${localStorage.getItem("intMarketing")}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>`;
    } else {
        /* Default */
        settingsMessage = settingsMessages.danish;

        message =
            messageWrapStart
            + messages.danish
            + messageWrapEnd
            + generatePolicyUrl('Vores privat og cookie politik');
        cookieBtn = generateCookieButtons('Accepter', 'Kun nødvendige cookies', 'Indstillinger');
        moreFooter.innerHTML = generateCookieSettingsButton(saveSettings.danish, 'Accepter')+
        `<article class="intCookieSetting__form">
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
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${localStorage.getItem("intFunctional")}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">Statistiske</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${localStorage.getItem("intStatics")}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">Marketing</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${localStorage.getItem("intMarketing")}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>`;
    }

    moreContentText.innerHTML = settingsMessage;

    let ccpa = window.INTA.settings === undefined || window.INTA.settings.ccpa === undefined ? false : window.INTA.settings.ccpa.on;
    let ccpaUrl = window.INTA.settings === undefined || window.INTA.settings.ccpa === undefined ? false : window.INTA.settings.ccpa.url;
    let cookieColor = window.INTA.settings === undefined || window.INTA.settings.color === undefined || window.INTA.settings.color.indexOf("[") > -1 || window.INTA.settings.color === ""  ? "rgba(0, 51, 153, 1)" : window.INTA.settings.color;
    let cookieLogo = window.INTA.settings === undefined || window.INTA.settings.logo === undefined || window.INTA.settings.logo === "" || window.INTA.settings.logo.indexOf("[") > -1 ? "https://img.icons8.com/ios-filled/50/000000/cookie.png" : window.INTA.settings.logo;
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

    .configs{
        width: 40px;
        height: 40px;
    }
`;
    let text = "";
    let cookieSize = "100%";
    if (textSettings) {
        withText = `
        .intastellarCookie-settingsContainer{
            border-radius: 20px;
        }
        `;
        text = " Cookie notice";
        cookieSize = "25%";
    }
    s.innerHTML = ".intastellarCookie-settingsContainer,.intastellarCookieConstents__content-intHeader, .intastellarCookie-settings__btn.--bg, .intastellarCookieConstents__content-main, .intastellarCCPAContainer, .intastellarCookie-settings__btn.--changePermission{background: " + cookieColor + " !important;color: #fff !important;} .intCookieSetting__checkbox:checked ~ .checkmark{background: "+ checkMarkColor +";}.intastellarCCPA__popupClose{background:"+ cookieColor +"; color: #fff;} .intastellarCookie-settings__btn.--bg:hover{background: " + brightColor + " !important;}.intastellarCookie-settings__close:hover{background: " + brightColor + " !important;} .intastellarCookieConstents__content-main .intastellarCookie-settings__privacyLink{color: #fff !important;} .intastellarCookie-settings__privacyLink{text-decoration: underline !important;}.intastellarCookie-settings__content .intastellarCookie-settings__privacyLink{color: "+cookieTextColor+";}.intastellarCookie-settings__content p{color: " + cookieTextColor + " !important;}.intastellarCookie-settings__intHeader{color:" + cookieTextColor + " !important;}.intastellarCookie-settings__container{background-color: " + backgroundColor + " !important;} .intastellarCookie-settingsMoreContainer{display:none;position: fixed; top: 50%; left: 50%; background: #fff; padding: 15px;z-index: 1000; transform: translate(-50%,-50%);}" + withText;
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
        console.error("Intastellar Solutions SDK: Please add your valid 'California Consumer Privacy Act' url to the banner: https://www.intastellarsolutions.com/gdpr-cookiebanner");
    }

    cookieSettingsContent.setAttribute("class", "intastellarCookie-settings__content");
    let poweredBy = "";
    if (window.location.host.indexOf("intastellarsolutions") == -1) {
        poweredBy = "<span class='intastellarCookie-settings__poweredBy' alt='This cookie banner is powered by Intastellar Solutions, International'>Powered by <a class='intastellarCookie-settings__poweredByLink' href='https://www.intastellarsolutions.com/gdpr-cookiebanner?utm_source=" + document.domain + "&utm_content=powered_by&utm_medium=referral&utm_campaign=" + pluginSource + "&utm_term=gdpr_banner_logo' target='_blank' rel='noopener'><img class='intastellarCookie-settings__poweredByImg' src='https://assets.intastellar-clients.net/bG9nb3MvaW50YXN0ZWxsYXJfc29sdXRpb25zQDJ4LnBuZw==' alt='Intastellar Solutions, International'></a></span>";
    }
    
    moreintHeader.innerHTML = `
        <img class="intSettingsCompanyLogo" src="${cookieLogo}">
        <section class="intSettingsPoweredBy">${poweredBy}</section>`;
    cookieSettingsContent.innerHTML = '<intHeader class="intastellarCookie-settings__intHeader"><img src="' + cookieLogo + '" alt="' + document.domain + ' logo" title="' + document.domain + ' logo" style="width: 100%;float: left; max-width: 50px;max-height: 50px;object-fit:contain;"><h2>Cookie</h2><button class="intastellarCookie-settings__close" style="background: ' + cookieColor + ';"></button></intHeader>' +
        message + cookieBtn + "" + poweredBy;

    cookieSettings.appendChild(cookieSettingsContent);

    banner.appendChild(cookieSettings);

    banner.setAttribute("class", "intastellarCookie-settings");

    bannerContent.innerHTML = '<svg id="cookie__settingsIcon" width="90%" fill="#fff" data-name="cookie__settingsIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 234.9 235.16"><path d="M227.4,94.6a82.43,82.43,0,0,1-22,6.86,92.26,92.26,0,0,1-96.61,89.44C61.83,188.72,23.58,150.78,21,103.85A92.28,92.28,0,0,1,107.85,6.62l2.81-1.75A112.5,112.5,0,0,0,4.7,120.69c1.81,59.73,51,108.11,110.75,109A112.61,112.61,0,0,0,227.4,94.6Z"/><path d="M108.19,17.79A81.57,81.57,0,1,0,192.9,82.9a60,60,0,0,1-84.71-65.11Zm33.68,83.05a18.45,18.45,0,1,1-18.46,18.45A18.45,18.45,0,0,1,141.87,100.84ZM64.36,62.08a9.23,9.23,0,1,1,9.22,9.23A9.22,9.22,0,0,1,64.36,62.08Zm18.45,70.13a14.77,14.77,0,1,1,14.77-14.77A14.76,14.76,0,0,1,82.81,132.21Z"/></svg> ' + text;

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
    if (typeof window.INTA.policy_link === "string" && isURL(window.INTA.policy_link)) {
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

/* - - - Helper function for saving settings - - - */
function saveINTCookieSettings() {
    const FunctionalCheckbox = document.querySelector("#functional");
    const StaticsCheckBox = document.querySelector("#statics");
    const MarketingCheckBox = document.querySelector("#marketing");

    if (MarketingCheckBox.checked === false && StaticsCheckBox.checked === false && FunctionalCheckbox.checked === false) {
        document.cookie = int_cookieName + "=" + essentialsCookieName + "; expires=" + cookieLifeTime +
                    "; path=/; domain=." +
                    domain +
                    "";
        document.cookie = int_analytic + "=no;expires=" + cookieLifeTime + ";path=/;domain=." + domain + "";
    }

    if (FunctionalCheckbox.checked) {
        localStorage.setItem("intFunctional", "checked");
        document.cookie =
            int_cookieName + "=" + allowAllCookieName + "; expires=" + cookieLifeTime +
            "; path=/; domain=." +
            domain +
            "";
    } else {
        localStorage.setItem("intFunctional", false);
    }

    if (StaticsCheckBox.checked) {
        localStorage.setItem("intStatics", "checked");
        document.cookie =
            int_cookieName + "=" + allowAllCookieName + "; expires=" + cookieLifeTime +
            "; path=/; domain=." +
            domain +
            "";
    } else {
        localStorage.setItem("intStatics", false);
    }

    if (MarketingCheckBox.checked) {
        localStorage.setItem("intMarketing", "checked");
        document.cookie =
            int_cookieName + "=" + allowAllCookieName + "; expires=" + cookieLifeTime +
            "; path=/; domain=." +
            domain +
            "";
    } else {
        localStorage.setItem("intMarketing", false);
    }

    document.cookie =
    int_hideCookieBannerName + "=1; expires=" + cookieLifeTime +
    "; path=/; domain=." +
    domain +
    "";

    window.location.reload();
}
/* - - - END - - - */


window.addEventListener("DOMContentLoaded", function () {
    window.INTA = window.INT;
    if (isValidPolicyLink()) {
        createCookieSettings();

        if (document.querySelector(".intastellarCookieBanner") != null) {
            if (getCookie(int_hideCookieBannerName) == "1") {
                document.querySelector(".intastellarCookieBanner").style.display = "none";
            } else {
                document.querySelector(".intastellarCookieBanner").style.display = "";
            }
        } else if (getCookie(int_hideCookieBannerName) == "1") {
            let settings = document.querySelector(".intastellarCookie-settings__container");
            settings.classList.toggle("intastellarCookie-settings__container--expand");
        }

        function cookieEnabled() {
            let cookieEnabled = navigator.cookieEnabled;
            if (!cookieEnabled) {
                document.cookie = "test";
                cookieEnabled = document.cookie.indexOf("test") !== -1;
            }
            return cookieEnabled;
        }

        const cookiesOn = getCookie(int_cookieName);

        document.querySelectorAll(".intastellarCookieBanner__settings").forEach((setting) => {
            setting.addEventListener("click", () => {
                let intCookieSettingsMore = document.querySelector(".intastellarCookieConstents");
                if (!intCookieSettingsMore.classList.contains("--active")) {
                    intCookieSettingsMore.classList.add("--active");
                }
            });
        });

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
                    "; path=/; domain=." +
                    domain +
                    "";
                document.cookie =
                    int_cookieName + "=" + allowAllCookieName + "; expires=" + cookieLifeTime +
                    "; path=/; domain=." +
                    domain +
                    "";
                document.cookie =
                    "_vis_opt=" +
                    cV +
                    "; expires=" +
                    new Date(
                        new Date().getTime() + 60 * 60 * 1000 * 24 * 100
                    ).toGMTString() +
                    "; path=/; domain=." +
                    domain +
                    "";
                localStorage.setItem("intFunctional", "checked");
                localStorage.setItem("intStatics", "checked");
                localStorage.setItem("intMarketing", "checked");
                window.location.reload();
            });
        }

        if (cookiesOn == "no") {
            if (!document.__defineGetter__) {
                Object.defineProperty(document, "cookie", {
                    get: function () {
                        return "";
                    },
                    set: function () {
                        return !0;
                    },
                });
            } else {
                document.__defineGetter__("cookie", function () {
                    return "";
                });
                document.__defineSetter__("cookie", function () { });
                var cookies = document.cookie.split(";");
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
                    var eqPos = cookie.indexOf("=");
                    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                }
            }
        } else if (cookiesOn == allowAllCookieName) {
            document.cookie = int_cookieName + "=" + allowAllCookieName + "; expires=" + cookieLifeTime +
                "; path=/; domain=." +
                domain +
                "";
        } else if (cookiesOn == "no-set") {
        }

        if (button__acceptAll != null || button__acceptAll != undefined) {
            button__acceptAll.addEventListener("click", function () {
                var cV = 1;
                document.cookie =
                    int_hideCookieBannerName + "=1; expires=" + cookieLifeTime +
                    "; path=/; domain=." +
                    domain +
                    "";
                document.cookie =
                    int_cookieName + "=" + allowAllCookieName + "; expires=" + cookieLifeTime +
                    "; path=/; domain=." +
                    domain +
                    "";
                document.cookie =
                    "_vis_opt=" +
                    cV +
                    "; expires=" +
                    new Date(
                        new Date().getTime() + 60 * 60 * 1000 * 24 * 100
                    ).toGMTString() +
                    "; path=/; domain=." +
                    domain +
                    "";
                var addedNodes = document.getElementsByTagName("script");
                for (var i = 0; i < addedNodes.length; i++) {
                    addedNodes.type = "";
                }

                localStorage.setItem("intFunctional", "checked");
                localStorage.setItem("intStatics", "checked");
                localStorage.setItem("intMarketing", "checked");

                window.location.reload();
            });
        }

        if (button__acceptAll != null || button__acceptAll != undefined) {
            button__acceptAllNecessary.addEventListener("click", function () {
                var cV = 1;
                document.cookie =
                    int_hideCookieBannerName + "=1; expires=" + cookieLifeTime +
                    "; path=/; domain=." +
                    domain +
                    "";
                document.cookie =
                    int_cookieName + "=" + essentialsCookieName + "; expires=" + cookieLifeTime +
                    "; path=/; domain=." +
                    domain +
                    "";
                document.cookie =
                    "_vis_opt=" +
                    cV +
                    "; expires=" + cookieLifeTime +
                    "; path=/; domain=." +
                    domain +
                    "";

                localStorage.setItem("intFunctional", "false");
                localStorage.setItem("intStatics", "false");
                localStorage.setItem("intMarketing", "false");

                window.location.reload();
            });
        }

        if (button__acceptAll != null || button__acceptAll != undefined) {
            const configBtn = document.querySelectorAll(".intastellarCookie-settingsContainer");

            const ness = document.querySelectorAll(".intastellarCookieBanner__accpetNecssery");
            const all = document.querySelectorAll(".intastellarCookieSettings--acceptAll");

            const analyticsBTN = document.querySelector(".analytics");
            const closeSettings = document.querySelector(".intastellarCookie-settings__close");
            const changePermission = document.querySelectorAll(".--changePermission");

            changePermission.forEach((change) => {
                change.addEventListener("click", function () {
                    if (this.getAttribute("data-type") == "intMarketing") {
                        document.querySelector("#marketing").checked = true;
                    } else if (this.getAttribute("data-type") == "intFunctional") {
                        document.querySelector("#functional").checked = true;
                    }
                    saveINTCookieSettings();
                })
            })

            configBtn.forEach((configs) => {
                configs.addEventListener("click", function () {
                    let settings = document.querySelector(".intastellarCookie-settings__container");
                    settings.classList.toggle("intastellarCookie-settings__container--expand");
                });
            })

            closeSettings.addEventListener("click", function () {
                let settings = document.querySelector(".intastellarCookie-settings__container");
                settings.classList.toggle("intastellarCookie-settings__container--expand");
            })

            if (analyticsBTN != null || analyticsBTN != undefined) {
                analyticsBTN.addEventListener("click", function () {
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName + "=1; expires=" + cookieLifeTime +
                        "; path=/; domain=." +
                        domain +
                        "";
                    document.cookie =
                        int_cookieName + "=analytics; expires=" + cookieLifeTime +
                        "; path=/; domain=." +
                        domain +
                        "";
                    document.cookie =
                        "_vis_opt=" +
                        cV +
                        "; expires=" + cookieLifeTime +
                        "; path=/; domain=." +
                        domain +
                        "";
                    window.location.reload();
                })
            }

            ness.forEach((n) => {
                n.addEventListener("click", function () {
                    localStorage.setItem("intFunctional", "false");
                    localStorage.setItem("intStatics", "false");
                    localStorage.setItem("intMarketing", "false");
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName + "=1; expires=" + cookieLifeTime +
                        "; path=/; domain=." +
                        domain +
                        "";
                    document.cookie =
                        int_cookieName + "=" + essentialsCookieName + "; expires=" + cookieLifeTime +
                        "; path=/; domain=." +
                        domain +
                        "";
                    document.cookie =
                        "_vis_opt=" +
                        cV +
                        "; expires=" + cookieLifeTime +
                        "; path=/; domain=." +
                        domain +
                        "";
                    document.cookie = int_analytic + "=no;expires=" + cookieLifeTime + ";path=/;domain=." + domain + "";
                    
                    window.location.reload();
                });
            });
            all.forEach((a) => {
                a.addEventListener("click", function () {
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName + "=1; expires=" + cookieLifeTime +
                        "; path=/; domain=." +
                        domain +
                        "";
                    document.cookie =
                        int_cookieName + "=" + allowAllCookieName + "; expires=" + cookieLifeTime +
                        "; path=/; domain=." +
                        domain +
                        "";
                    document.cookie =
                        "_vis_opt=" +
                        cV +
                        "; expires=" + cookieLifeTime +
                        "; path=/; domain=." +
                        domain +
                        "";
                    document.cookie = int_analytic + "=yes;expires=" + cookieLifeTime + ";path=/;domain=." + domain + "";
                    
                    var addedNodes = document.getElementsByTagName("script");
                    for (var i = 0; i < addedNodes.length; i++) {
                        addedNodes.type = "";
                    }

                    localStorage.setItem("intFunctional", "checked");
                    localStorage.setItem("intStatics", "checked");
                    localStorage.setItem("intMarketing", "checked");

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

            const changePermission = document.querySelectorAll(".--changePermission");

            changePermission.forEach((change) => {
                change.addEventListener("click", function () {
                    if (this.getAttribute("data-type") == "intMarketing") {
                        document.querySelector("#marketing").checked = true;
                    } else if (this.getAttribute("data-type") == "intFunctional") {
                        document.querySelector("#functional").checked = true;
                    }
                    saveINTCookieSettings();
                })
            })

            if (document.querySelector(".intastellarCookieBanner") == null || document.querySelector(".intastellarCookieBanner") == undefined) {
                settings.classList.toggle("intastellarCookie-settings__container--expand");
            }

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

            closeSettings.addEventListener("click", function () {
                let settings = document.querySelector(".intastellarCookie-settings__container");
                settings.classList.toggle("intastellarCookie-settings__container--expand");
            })

            ness.forEach((n) => {
                n.addEventListener("click", function () {
                    localStorage.setItem("intFunctional", "false");
                    localStorage.setItem("intStatics", "false");
                    localStorage.setItem("intMarketing", "false");
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName + "=1; expires=" + cookieLifeTime +
                        "; path=/; domain=." +
                        domain +
                        "";
                    document.cookie =
                        int_cookieName + "=" + essentialsCookieName + "; expires=" + cookieLifeTime +
                        "; path=/; domain=." +
                        domain +
                        "";
                    document.cookie =
                        "_vis_opt=" +
                        cV +
                        "; expires=" + cookieLifeTime +
                        "; path=/; domain=." +
                        domain +
                        "";
                    document.cookie = int_analytic + "=no;expires=" + cookieLifeTime + ";path=/;domain=." + domain + "";
                    
                    window.location.reload();
                });
            });

            all.forEach((a) => {
                a.addEventListener("click", function () {
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName + "=1; expires=" + cookieLifeTime +
                        "; path=/; domain=." +
                        domain +
                        "";
                    document.cookie =
                        int_cookieName + "=" + allowAllCookieName + "; expires=" + cookieLifeTime +
                        "; path=/; domain=." +
                        domain +
                        "";
                    document.cookie =
                        "_vis_opt=" +
                        cV +
                        "; expires=" + cookieLifeTime +
                        "; path=/; domain=." +
                        domain +
                        "";
                    document.cookie = int_analytic + "=yes;expires=" + cookieLifeTime + ";path=/;domain=." + domain + "";
                    
                    var addedNodes = document.getElementsByTagName("script");
                    for (var i = 0; i < addedNodes.length; i++) {
                        addedNodes.type = "";
                    }

                    localStorage.setItem("intFunctional", "checked");
                    localStorage.setItem("intStatics", "checked");
                    localStorage.setItem("intMarketing", "checked");

                    window.location.reload();
                })
            });
        }
    } else {
        checkCookieStatus();
        console.error("Intastellar Solutions SDK: Please add a valid privacy & cookie policy to the banner: https://www.intastellarsolutions.com/gdpr-cookiebanner")
    }
});