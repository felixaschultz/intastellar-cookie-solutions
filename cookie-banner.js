/*
 *  Intastellar Cookie Banner
 *  intastellarsolutions.com/gdpr-cookiebanner
 *  @copy 2021 intastellarsolutions.com
 *
*/ 

/* - - - Setup - - - */
const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const settingsCheckboxes = document.querySelectorAll(".cookie-settings-checkbox");
const int_cookieName = "__inta_ac_cookie";
const int_hideCookieBannerName = "__inta";
const analytic = "__inta__analytics";
const button__acceptAll = document.querySelector(".intastellarCookieBanner__acceptAll");
const button__acceptAllNecessary = document.querySelector(".intastellarCookieBanner__acceptNecessary");


const INT = window.INT = {
    policy_link: undefined,
    settings: {
        language: "auto",
        color: "rgba(0, 51, 153, 1)",
        keepInLocalStorage: [],
        arrange: "ltr",
        logo: "https://img.icons8.com/ios-filled/50/000000/cookie.png",
    }
}

/* [\-\]| */

const allowAllCookieName = "__all__cookies";
const essentialsCookieName = "__essential__cookies";
const blockTrackingCookies = "__hideTrackingCookies";
const blockAdvertismentCookies = "__hideAdvertisementCookies";
const intHead = document.querySelector("head");

const cookieLifeTime = new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * 200).toGMTString();

const notExternalCookies = [
    "_visit_opt",
    "region",
    "PHPSESSID",
    int_cookieName,
    int_hideCookieBannerName
];
const noCookies = new RegExp(notExternalCookies.join("|"), "i");

const pSBC = (p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}

function checkCookieStatus() {
    const findScripts = [
        "(?=linkedin|gtag)(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+",
        "(google-analytics+)",
        "(!fontawesome+)",
        "(facebook+)",
        "(googlesyndication+)",
        "(googleapis+)",
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
        "(bing+)",
        "(doubleclick+)",
        "(pinterest+)",
        "(clarity+)",
        "(googleadservices+)",
        "(consensu+)",
        "(disqus+)",
        "(quantserve+)",
        "[a-z]{2,5}(:[0-9]{1,5})?(\\/\\/.*)?$"
    ];
    
    const allowAna = [
        "(?=linkedin)(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+",
        "([\-\]|facebook+)",
        "([\-\]|googlesyndication+)",
        "([\-\]|googleapis+)",
        "([\-\]|trustpilot+)",
        "([\-\]|twitter+)",
        "([\-\]|chimpstatic+)",
        "([\-\]|mailchimp+)",
        "([\-\]|linkedin+)",
        "([\-\]|licdn+)",
        "([\-\]|bing+)",
        "([\-\]|doubleclick+)",
        "([\-\]|pinterest+)",
        "([\-\]|googleadservices+)",
        "\.[a-z]{2,5}(:[0-9]{1,5})?(\\/\\/.*)?$"
    ];
    
    
    const reg = new RegExp(expression);
    const notRequired = new RegExp(findScripts.join("|"), "ig");
    const allowAnalytics = new RegExp(allowAna.join("|"), "i");
    const dc = getCookie(int_cookieName);
    const analyticsCookies = getCookie(analytic);
    const thirdC = getCookie("_vis_opt");

    /* (function () { */
        if (analyticsCookies == "yes") {
            let s = document.createElement("script");
            s.src = "https://www.intastellarsolutions.com/js/analytics.js?v="+ new Date().getTime();
            intHead.appendChild(s);
        }
    /* })(); */

    const observer = new MutationObserver((mutations) => {
        mutations.forEach(({ addedNodes }) => {
            addedNodes.forEach((node) => {

                if(allCookiesAllowed() == false){
                    deleteAllCookies();
                }

                if(allCookiesAllowed()){
                    const iframe = document.querySelectorAll("iframe");
                    iframe.forEach((frae) => {
                        if(frae.hasAttribute("data-src")){
                            const iframeSrc = frae.getAttribute("data-src");
    
                            frae.src = iframeSrc;
                        }
                    })
                }

                if (node.nodeType === 1 && node.tagName === "SCRIPT" && node.type !== 'application/ld+json' && node.innerText.indexOf("window.INT") == -1 && node.innerText.toLowerCase().indexOf("elementor") == -1) {
                    let src = node.src || "";
                    node.async = false;

                    node.removeAttribute("charset");
                    addedNodes.forEach((node) => {
                        src = node.src;
                        
                        if(dc == essentialsCookieName || dc == "") {
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
                        } else if (dc == allowAllCookieName && thirdC == "0") {
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
    
                                if (
                                    notRequired.test(node.innerText)
                                ) {
                                    node.type = "text/plain";
                                    node.parentElement.removeChild(node);
                                    deleteAllCookies();
                                }
                            }
                        }
    
                        const beforeScriptExecuteListener = function (event) {
                            if(dc == essentialsCookieName || dc == "") {

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
                            } else if (dc == allowAllCookieName && thirdC == "0") {
                                if (
                                    src.indexOf(window.location.hostname) == -1
                                    && src.indexOf("jquery") == -1 && src.indexOf("elementor") == -1
                                ) {
                                    
                                    if (
                                        notRequired.test(src)
                                        && node.innerText.toLowerCase().indexOf("elementor") == -1
                                    ) {
                                        node.type = "text/plain";
                                        node.parentElement.removeChild(node);
                                        deleteAllCookies();
                                    }
                                    
                                    if (
                                        notRequired.test(node.innerText)
                                        && node.innerText.toLowerCase().indexOf("elementor") == -1
                                    ) {
                                        node.type = "text/plain";
                                        node.parentElement.removeChild(node);
                                        deleteAllCookies();
                                    }
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
                } else if (node.nodeType === 1 && node.tagName === "NOSCRIPT" && node.type !== 'application/ld+json' && node.innerText.indexOf("window.INT") == -1 && node.innerText.toLowerCase().indexOf("elementor") == -1) {
                    if(dc == essentialsCookieName || dc == "") {
                        
                        if (
                            notRequired.test(node.innerText)
                            && node.innerText.toLowerCase().indexOf("elementor") == -1
                        ) {
                            node.type = "text/plain";
                            node.parentElement.removeChild(node);
                            deleteAllCookies();
                        }
                    } else if (dc == allowAllCookieName && thirdC == "0") {
                        if (
                            src.indexOf(window.location.hostname) == -1
                            && src.indexOf("jquery") == -1
                            && src.indexOf("elementor") == -1
                        ) {
                            
                            if (
                                notRequired.test(src)
                                && node.innerText.toLowerCase().indexOf("elementor") == -1
                            ) {
                                node.type = "text/plain";
                                node.parentElement.removeChild(node);
                                deleteAllCookies();
                            }
                            
                            if (
                                notRequired.test(node.innerText)
                                && node.innerText.toLowerCase().indexOf("elementor") == -1
                            ) {
                                node.type = "text/plain";
                                node.parentElement.removeChild(node);
                                deleteAllCookies();
                            }
                        }
                    }
    
                    const beforeScriptExecuteListener = function (event) {
                        let src = node.src || "";

                        if(dc == essentialsCookieName || dc == "") {
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
                        } else if (dc == allowAllCookieName && thirdC == "0") {
                            if (
                                src.indexOf(window.location.hostname) == -1
                                && src.indexOf("jquery") == -1
                                && src.indexOf("elementor") == -1
                            ) {
                                
                                if (
                                    notRequired.test(src)
                                    && node.innerText.toLowerCase().indexOf("elementor") == -1
                                ) {
                                    node.type = "text/plain";
                                    node.parentElement.removeChild(node);
                                    deleteAllCookies();
                                }
                                
                                if (
                                    notRequired.test(node.innerText)
                                    && node.innerText.toLowerCase().indexOf("elementor") == -1
                                ) {
                                    node.type = "text/plain";
                                    node.parentElement.removeChild(node);
                                    deleteAllCookies();
                                }
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

const link  = document.createElement('link');
link.rel  = 'stylesheet';
link.type = 'text/css';
link.href = 'https://www.intastellarsolutions.com/components/css/jsCookieBannerinfo.css?v=' + new Date().getTime();
link.media = 'all';
intHead.appendChild(link);

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
    if (hsp>=0 && 165>hsp) {
        return '#fff';
    }else {
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

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}

function clearLocalStorage(ls){
    if(ls != null){
        let lsA = Object.values(ls);
        if(lsA.length != 0 || lsA != null){
            for(let i = 0; i<lsA.length; i++){
                let item = localStorage.getItem(lsA[i]);
                let itemName = lsA[i];
                localStorage.clear();
                localStorage.setItem(itemName, item);
            }
        }else{
            localStorage.clear();
        }
    }
}

function deleteAllCookies(){
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        if(!noCookies.test(name)){
            let localS = window.INT.settings === undefined || window.INT.settings.keepInLocalStorage === undefined ? "" : window.INT.settings.keepInLocalStorage;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; domain="+domain+"; path=/";
            clearLocalStorage(localS);
        }
    }
}

function isURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    const tmp = document.createElement('a');
    tmp.href = str;

    if(tmp.host !== window.location.host || tmp.host == window.location.host){
        return true;
    }else{
        return false;
    }
}

/* const isExternal = function (url) {
    const domain = function (url) {
        return url.replace("http://", "").replace("https://", "").split("/")[0];
    };
    return domain(window.location.href) !== domain(url);
};

function listCookies() {
    var theCookies = document.cookie.split(";");
    var aString = "";
    for (var i = 1; i <= theCookies.length; i++) {
        aString += i + " " + theCookies[i - 1] + "\n";
    }
    return aString;
} */

function allCookiesAllowed(){
    if(getCookie(int_cookieName) == allowAllCookieName){
        return true;
    }else{
        return false;
    }
}

function createCookieSettings() {

    let message = "";
    let cookieBtn = "";
    const banner = document.createElement("article");
    const bannerContent = document.createElement("section");


    const moreSettings = document.createElement("article");
    const moreSettingsContent = document.createElement("section");
    const moreintHeader = document.createElement("header");
    const moreContentText = document.createElement("section");
    const moreFooter = document.createElement("footer");

    moreSettings.setAttribute("class", "intastellarCookieConstents");
    moreSettingsContent.setAttribute("class", "intastellarCookieConstents__content");
    moreintHeader.setAttribute("class", "intastellarCookieConstents__content-intHeader");
    moreFooter.setAttribute("class", "intastellarCookieConstents__content-footer");

    moreContentText.setAttribute("class", "intastellarCookieConstents__content-main");

    moreContentText.innerHTML = `<h3>You´re in control</h3>
        <p></p>
    `;

    moreSettingsContent.appendChild(moreintHeader);
    moreSettingsContent.appendChild(moreContentText);
    moreSettingsContent.appendChild(moreFooter);

    moreintHeader.innerHTML = "<h2>Cookie Settings</h2>";
    moreFooter.innerHTML = "<button class='cookie-settings__btn --save'>Save settings</button><button class='cookie-settings__btn --noBorderRadius --bg intastellarCookieSettings--acceptAll'>Accept all</button>";

    const cookieSettings = document.createElement("article");
    const cookieSettingsContent = document.createElement("section");

    const cookieSettingMore = document.createElement("article");
    const cookieSettingMoreContent = document.createElement("section");

    cookieSettingMore.setAttribute("class", "cookie-settingsMoreContainer");
    cookieSettingMoreContent.setAttribute("class", "cookie-settingsMoreContent");

    cookieSettingMoreContent.innerHTML = `
        Allow Analytics <input type="checkbox" class="cookie-settingsBtn cookie-settingsBtn--allowAnalytics">
    `;

    bannerContent.setAttribute("class", "cookie-settingsContainer");
    bannerContent.setAttribute("title", "Cookie Settings");
    cookieSettings.setAttribute("class", "cookie-settings__container");
    const arrange = window.INT.settings === undefined || window.INT.settings.arrange === undefined ? "" : window.INT.settings.arrange;

    if (arrange == "ltr") {
        bannerContent.classList.add("cookie-settingsContainer--otherSide");
        cookieSettings.classList.add("cookie-settings__container--otherSide");
    }

    /* cookieSettings.style.opacity = "0"; */
    /* bannerContent.setAttribute("class","cookie-settingsContainer");
    bannerContent.setAttribute("title", "Cookie Settings"); */





    /* - - - Set the language dependent messages */

    let lang = window.INT.settings === undefined || window.INT.settings.language === "auto" || window.INT.settings.language === "" ? document.querySelector("html").getAttribute("lang") : window.INT.settings.language == "german" ? "de" : window.INT.settings.language == "danish" ? "da" : "gb";
    const messages = {
        danish: "Ved at acceptere alle cookies understøtter du " + document.domain + " med at udvikle en bedre løsning til dig.</p><p>Vælg om du vil tillade kun de nødvendige cookies eller om du vil tillade alle cookies.",
        german: "Wenn Sie auf akzeptieren klicken, unterstützen Sie " + document.domain + " bei der Weiterentwicklung von unserer Webseite.</p><p>Wählen Sie zwischen allen Cookies akzeptieren oder ob Sie nur notwendige cookies unterstützen wollen.",
        english: "By accepting all cookies, you support "+ document.domain +" in developing a better solution for you. </p><p> Select whether you want to allow only the necessary cookies or whether you want to allow all cookies."
    };
    const messageWrapStart = "<div class='cookie-settings__contentConatiner'><p>";
    const messageWrapEnd = "</p></div>";

    if (lang != null && lang === "da" || lang === "da-DK") {
        message = 
            messageWrapStart 
            + messages.danish 
            + messageWrapEnd 
            + generatePolicyUrl('Vores privat og cookie politik');
        cookieBtn = generateCookieButtons('Accepter alle','Kun nødvendige cookies');
    } else if (lang != null && lang === "de-DE" || lang === "de") {
        message = messageWrapStart 
            + messages.german 
            + messageWrapEnd 
            + generatePolicyUrl('Unsere Datenschutz Erklährung und Cookie politik');
        cookieBtn = generateCookieButtons('Alle akzeptieren','Nur notwendige cookies');
    } else if (lang != null && lang === "en" || lang === "en-GB" || lang === "en-US") {
        message = 
            messageWrapStart 
            + messages.english 
            + messageWrapEnd 
            + generatePolicyUrl('Our Privacy and cookie Policy');
        cookieBtn = generateCookieButtons('Allow all', 'Necessary cookies only');
    } else {
        /* Default */
        message = 
            messageWrapStart 
            + messages.danish 
            + messageWrapEnd 
            + generatePolicyUrl('Vores privat og cookie politik');
        cookieBtn = generateCookieButtons('Accepter alle', 'Kun nødvendige cookies');
    }




    

    let cookieColor = window.INT.settings === undefined || window.INT.settings.color === undefined || window.INT.settings.color === "" ? "rgba(0, 51, 153, 1)" : window.INT.settings.color;
    let cookieLogo = window.INT.settings === undefined || window.INT.settings.logo === undefined || window.INT.settings.logo === "" ? "https://img.icons8.com/ios-filled/50/000000/cookie.png" : window.INT.settings.logo;
    let backgroundColor = window.INT.settings === undefined || window.INT.settings.background_color === undefined ? "#fff" : window.INT.settings.background_color;
    let cookieTextColor = invertColor(backgroundColor);

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
        
        brightColor = "var("+cookieColor.split("(")[1].split(")")[0] + "--bright)";
    } else {
        brightColor = pSBC(-0.60, cookieColor);
    }

    const s = document.createElement("style");

    let textSettings = window.INT.settings === undefined || window.INT.settings.text === undefined ? false : window.INT.settings.text;
    let withText = `
    .cookie-settingsContainer{
        border-radius: 50%;
    }

    .configs{
        width: 40px;
        height: 40px;
    }
`;
    let text = "";
    let cookieSize = "100%";
    if(textSettings){
        withText = `
        .cookie-settingsContainer{
            border-radius: 20px;
        }
        `;
        text = " Cookie notice";
        cookieSize = "25%";
    }
    s.innerHTML = ".cookie-settingsContainer,.intastellarCookieConstents__content-intHeader, .cookie-settings__btn.--bg{background: "+cookieColor+" !important;color: #fff !important;} .cookie-settings__btn.--bg:hover{background: "+brightColor+" !important;}.cookie-settings__close:hover{background: "+brightColor+" !important;} .cookie-settings__privacyLink{color: "+cookieColor+" !important;}.cookie-settings__content p{color: "+cookieTextColor+" !important;}.cookie-settings__intHeader{color:"+cookieTextColor+" !important;}.cookie-settings__container{background-color: "+backgroundColor+" !important;} .cookie-settingsMoreContainer{display:none;position: fixed; top: 50%; left: 50%; background: #fff; padding: 15px;z-index: 1000; transform: translate(-50%,-50%);}"+withText;
    intHead.appendChild(s);

    cookieSettingsContent.setAttribute("class", "cookie-settings__content");
    /* <button class="analytics">Analytics</button> */
    let poweredBy = "";
    if(window.location.host.indexOf("intastellarsolutions") == -1){
        poweredBy = "<span class='cookie-settings__poweredBy' alt='This cookie banner is powered by Intastellar Solutions, International'>Powered by <a class='cookie-settings__poweredByLink' href='https://www.intastellarsolutions.com/gdpr-cookiebanner?utm_link="+document.domain+"&utm_source=Intastellar+Solutions+Cookiebanner' target='_blank' rel='noopener'><img class='cookie-settings__poweredByImg' src='https://assets.intastellar-clients.net/bG9nb3MvaW50YXN0ZWxsYXJfc29sdXRpb25zQDJ4LnBuZw==' alt='Intastellar Solutions, International'></a></span>";
    }

    cookieSettingsContent.innerHTML = '<intHeader class="cookie-settings__intHeader"><img src="'+cookieLogo+'" alt="'+document.domain+' logo" title="'+document.domain+' logo" style="width: 100%;float: left; max-width: 50px;max-height: 50px;object-fit:contain;"><h2>Cookie</h2><button class="cookie-settings__close" style="background-color: '+cookieColor+';"></button></intHeader>'+
    message + cookieBtn + "" + poweredBy;

    cookieSettings.appendChild(cookieSettingsContent);

    banner.appendChild(cookieSettings);

    banner.setAttribute("class", "cookie-settings");

    bannerContent.innerHTML = '<span class="configs"><img src="https://img.icons8.com/ios-filled/50/000000/cookie.png" alt="Cookie" style="width: '+cookieSize+';filter: invert(100);"> '+text+'</span>';

    banner.appendChild(bannerContent);
    moreSettings.appendChild(moreSettingsContent);
    
    document.body.appendChild(banner);
    /* document.body.appendChild(moreSettings); */
}

/* - - - Helper functions for Messages */
function generatePolicyUrl(policy_link_text) {
    let url = "";
    if(typeof window.INT.policy_link === 'undefined') {
        console.log("Error: Policy URL has not been defined.");
        return;
    }
    if (typeof window.INT.policy_link === "object") {
        url = "<a href='" + window.INT.policy_link.url + "' target='" + window.INT.policy_link.target + "' class='cookie-settings__privacyLink'>"+ policy_link_text +"</a>"
    } else if (typeof window.INT.policy_link === "string") {
        url = "<a href='" + window.INT.policy_link + "' class='cookie-settings__privacyLink'>"+ policy_link_text +"</a>";
    }
    return url;
}
function generateCookieButtons(allCookiesText,necessaryCookiesText) {
    return '<button class="cookie-settings__btn --bg intastellarCookieSettings--acceptAll">'+ allCookiesText +'</button>' 
    + '<button class="cookie-settings__btn nesse">' + necessaryCookiesText + '</button>';
}

/* - - - END - - - */




window.addEventListener("DOMContentLoaded", function () {
    if(window.INT.policy_link != undefined && isURL(window.INT.policy_link) && window.INT.policy_link.length > 0 || typeof window.INT.policy_link === "object" && window.INT.policy_link.url.length > 0){
        createCookieSettings();
        if (getCookie(int_hideCookieBannerName) == "") {
            document.body.style.overflow = "hidden";
            document.querySelector("html").style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            document.querySelector("html").style.overflow = "";
        }
    
        if(document.querySelector(".intastellarCookieBanner") != null){
            if(getCookie(int_hideCookieBannerName) == "1"){
                document.querySelector(".intastellarCookieBanner").style.display = "none";
            }else{
                document.querySelector(".intastellarCookieBanner").style.display = "";
            }
        }else if(getCookie(int_hideCookieBannerName) == "1"){
            let settings = document.querySelector(".cookie-settings__container");
            settings.classList.toggle("cookie-settings__container--expand");
        }

        function cookieEnabled() {
            var cookieEnabled = navigator.cookieEnabled;
            if (!cookieEnabled) {
                document.cookie = "test";
                cookieEnabled = document.cookie.indexOf("test") !== -1;
            }
            return cookieEnabled;
        }

        function slideUp(el) {
            var elem = document.querySelector(el);
            elem.style.transition = "all 2s ease-in-out";
            /* elem.style.bottom = "-1500px"; */
            elem.style.display = "none";
        }

        function slideDown(el) {
            var elem = document.querySelector(el);
            elem.style.transition = "all 2s ease-in-out";
            /* elem.style.bottom = "0"; */
            elem.style.display = "block";
        }

        var cookiesOn = getCookie(int_cookieName);



        if(button__acceptAll != null || button__acceptAll != undefined){
            button__acceptAll.addEventListener("click", function () {
                var cV = 0;

                document.cookie =
                    int_hideCookieBannerName + "=1; expires=" + cookieLifeTime +
                    "; path=/; domain=." +
                    domain +
                    "";
                document.cookie =
                    int_cookieName+"="+allowAllCookieName+"; expires=" + cookieLifeTime +
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
                document.body.style.overflow = "auto";
                slideUp(".intastellarCookieBanner");
                //window.location.reload();
            });
        }

        var thirdC = getCookie("_vis_opt");

        if (cookiesOn == "no" || thirdC == "0") {
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
                document.body.style.overflow = "auto";
            }
        } else if (cookiesOn == allowAllCookieName) {
            document.cookie = int_cookieName+"="+allowAllCookieName+"; expires=" + cookieLifeTime +
                "; path=/; domain=." +
                domain +
                "";
            document.body.style.overflow = "auto";
        } else if (cookiesOn == "no-set") {
        }

        if(button__acceptAll != null || button__acceptAll != undefined){
            button__acceptAll.addEventListener("click", function () {
                var cV = 1;
                document.cookie =
                    int_hideCookieBannerName+"=1; expires=" + cookieLifeTime +
                    "; path=/; domain=." +
                    domain +
                    "";
                document.cookie =
                    int_cookieName+"="+allowAllCookieName+"; expires=" + cookieLifeTime +
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
                document.body.style.overflow = "auto";
                var addedNodes = document.getElementsByTagName("script");
                for (var i = 0; i < addedNodes.length; i++) {
                    addedNodes.type = "";
                }
                slideUp(".intastellarCookieBanner");
                window.location.reload();
            });
        }

        if(button__acceptAll != null || button__acceptAll != undefined){
            button__acceptAllNecessary.addEventListener("click", function () {
                var cV = 1;
                document.cookie =
                    int_hideCookieBannerName+"=1; expires=" + cookieLifeTime +
                    "; path=/; domain=." +
                    domain +
                    "";
                    document.cookie =
                    int_cookieName+"="+essentialsCookieName+"; expires=" + cookieLifeTime +
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
                document.body.style.overflow = "auto";
                slideUp(".intastellarCookieBanner");
                window.location.reload();
            });
        }

        if(button__acceptAll != null || button__acceptAll != undefined){
            const configBtn = document.querySelectorAll(".cookie-settingsContainer");

            const config = document.querySelectorAll(".config");

            const ness = document.querySelector(".nesse");
            const all = document.querySelectorAll(".intastellarCookieSettings--acceptAll");

            const analyticsBTN = document.querySelector(".analytics");
            const closeSettings = document.querySelector(".cookie-settings__close");

            configBtn.forEach((configs) => {
                configs.addEventListener("click", function(){
                    let settings = document.querySelector(".cookie-settings__container");
                    settings.classList.toggle("cookie-settings__container--expand");
                });
            })

            config.forEach((configs) => {
                configs.addEventListener("click", function(){
                    let settings = document.querySelector(".cookie-settings__container");
                    settings.classList.toggle("cookie-settings__container--expand");
                });
            })

            closeSettings.addEventListener("click", function(){
                let settings = document.querySelector(".cookie-settings__container");
                settings.classList.toggle("cookie-settings__container--expand");
            })

            if(analyticsBTN != null || analyticsBTN != undefined){
                analyticsBTN.addEventListener("click", function(){
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName+"=1; expires=" + cookieLifeTime +
                        "; path=/; domain=." +
                        domain +
                        "";
                        document.cookie =
                        int_cookieName+"=analytics; expires=" + cookieLifeTime +
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
                    document.body.style.overflow = "auto";
                    slideUp(".intastellarCookieBanner");
                    window.location.reload();
                })
            }

            ness.addEventListener("click", function(){
                var cV = 1;
                document.cookie =
                    int_hideCookieBannerName+"=1; expires=" + cookieLifeTime +
                    "; path=/; domain=." +
                    domain +
                    "";
                    document.cookie =
                    int_cookieName+"="+essentialsCookieName+"; expires=" + cookieLifeTime +
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
                document.cookie = analytic+"=no;expires="+cookieLifeTime+";path=/;domain=."+domain+"";
                document.body.style.overflow = "auto";
                slideUp(".intastellarCookieBanner");
                window.location.reload();
            });

            all.forEach((a)=>{
                a.addEventListener("click", function(){
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName+"=1; expires=" + cookieLifeTime +
                        "; path=/; domain=." +
                        domain +
                        "";
                    document.cookie =
                        int_cookieName+"="+allowAllCookieName+"; expires=" + cookieLifeTime +
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
                    document.cookie = analytic+"=yes;expires="+cookieLifeTime+";path=/;domain=."+domain+"";
                    document.body.style.overflow = "auto";
                    var addedNodes = document.getElementsByTagName("script");
                    for (var i = 0; i < addedNodes.length; i++) {
                        addedNodes.type = "";
                    }
                    slideUp(".intastellarCookieBanner");
                    window.location.reload();
                })
            });
        }else{
            const configBtn = document.querySelectorAll(".cookie-settingsContainer");
            const config = document.querySelectorAll(".config");

            const ness = document.querySelector(".nesse");
            const all = document.querySelectorAll(".intastellarCookieSettings--acceptAll");

            const analyticsBTN = document.querySelector(".analytics");
            const closeSettings = document.querySelector(".cookie-settings__close");
            let settings = document.querySelector(".cookie-settings__container");
            if(document.querySelector(".intastellarCookieBanner") == null || document.querySelector(".intastellarCookieBanner") == undefined){
                settings.classList.toggle("cookie-settings__container--expand");
            }

            configBtn.forEach((configs) => {
                configs.addEventListener("click", function(){
                    let settings = document.querySelector(".cookie-settings__container");
                    settings.classList.toggle("cookie-settings__container--expand");
                });
            })

            config.forEach((configs) => {
                configs.addEventListener("click", function(){
                    let settings = document.querySelector(".cookie-settings__container");
                    settings.classList.toggle("cookie-settings__container--expand");
                });
            })

            closeSettings.addEventListener("click", function(){
                let settings = document.querySelector(".cookie-settings__container");
                settings.classList.toggle("cookie-settings__container--expand");
            })

            ness.addEventListener("click", function(){
                var cV = 1;
                document.cookie =
                    int_hideCookieBannerName+"=1; expires=" + cookieLifeTime +
                    "; path=/; domain=." +
                    domain +
                    "";
                    document.cookie =
                    int_cookieName+"="+essentialsCookieName+"; expires=" + cookieLifeTime +
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
                document.cookie = analytic+"=no;expires="+cookieLifeTime+";path=/;domain=."+domain+"";
                document.body.style.overflow = "auto";
                window.location.reload();
            });

            all.forEach((a)=>{
                a.addEventListener("click", function(){
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName+"=1; expires=" + cookieLifeTime +
                        "; path=/; domain=." +
                        domain +
                        "";
                    document.cookie =
                        int_cookieName+"="+allowAllCookieName+"; expires=" + cookieLifeTime +
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
                    document.cookie = analytic+"=yes;expires="+cookieLifeTime+";path=/;domain=."+domain+"";
                    document.body.style.overflow = "auto";
                    var addedNodes = document.getElementsByTagName("script");
                    for (var i = 0; i < addedNodes.length; i++) {
                        addedNodes.type = "";
                    }
                    window.location.reload();
                })
            });
        }
    }else{
        checkCookieStatus();
        console.error("Intastellar Cookie Banner SDK: Please add a privacy & cookie policy to the banner: https://www.intastellarsolutions.com/gdpr-cookiebanner")
    }
});