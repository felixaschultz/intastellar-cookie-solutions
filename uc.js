/*
 *  Intastellar Consents Solutions
 *  intastellarsolutions.com/solutions/cookie-consents
 *  consents.cdn.intastellarsolutions.com/uc.js
 *  @copy 2022-2025 Intastellar Solutions, International
 *
*/
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
        window._gtagDefaultFired = true;
    }
} else if (isGtmMode) {
    console.log('GTM mode detected - skipping consent default initialization');
}

if (typeof fbq === "undefined" || typeof fbq === "null") {
    function fbq() { }
}

window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments) };

window.clarity && window.clarity('consentV2', {
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
/* window._hsp.push(['_setDomainName', window.location.host]);
if (window.INTA?.settings?.hubspotId) {
    window._hsp.push(['_setAccount', window.INTA?.settings?.hubspotId]);
    window._hsp.push(['_trackPageview']);
    window._hsp.push(['_trackPageLoadTime']);
    window._hsp.push(['_setCustomVar', 1, 'Page', window.location.pathname, 1]);
    window._hsp.push(['_setCustomVar', 2, 'Referrer', document.referrer, 1]);
    window._hsp.push(['_setCustomVar', 3, 'Language', intastellarCookieLanguage, 1]);
    window._hsp.push(['_setCustomVar', 4, 'User Agent', navigator.userAgent, 1]);
    window._hsp.push(['_setCustomVar', 5, 'Cookie Consent', intaCookieConsentsUserId, 1]);
} */

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
            if (!document.querySelector(".intastellarCookieConstents")) {
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
/* 
window.addEventListener("load", function(){
    const intastellarCreateBanner = document.createElement("script");

    intastellarCreateBanner.src = intastellarCookieBannerRootDomain + "/cb.js";
    if (window.INTA.settings.design === "floating") {
        intastellarCreateBanner.src = intastellarCookieBannerRootDomain + "/floating.js";
    }
    if (intastellarDevMode) {
        if (window.INTA.settings.design === "floating") {
            intastellarCreateBanner.src = "../../dev/styles/floating.js";
        } else {
            intastellarCreateBanner.src = "../../dev/cb.dev.js";
        }
    }

    document.head.appendChild(intastellarCreateBanner);
}); */

window.addEventListener("DOMContentLoaded", (event) => {

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

    window.clarity && window.clarity('consentV2', {
        ad_Storage: "granted",
        analytics_Storage: "denied"
    });

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
    window.clarity && window.clarity('consentV2', {
        ad_Storage: "denied",
        analytics_Storage: "granted"
    });
    window.uetq.push('consent', 'update', {
        'analytics_storage': 'granted'
    });
}

if (intaCookieConsents?.functionalCookies) {
    gtag('consent', 'update', {
        'functionality_storage': 'granted',
    })
    window.uetq.push('consent', 'update', {
        'functionality_storage': 'granted'
    });

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

// Banner style:
/*
 *  Cookie Consents Banner by Intastellar Solutions, International
 *  intastellarsolutions.com/gdpr-cookiebanner
 *  consents.cdn.intastellarsolutions.com/uc.js
 *  @copy 2022-2024 Intastellar Solutions, International
 *
*/
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
    if (hsp > 163.5) {

        return 'light';
    }
    else {

        return 'dark';
    }
}

let message = "";
let cookieBtn = "";
/* const poweredBy = `<a class="inta-poweredBy" href='https://www.intastellarsolutions.com?utm_source=${encodeURI(window.location.href)}&utm_content=powered_by&utm_medium=referral&utm_campaign=Consents+Block&utm_term=gdpr_banner_logo' target='_blank' rel='noopener' style="align-items: center; text-decoration: none;font-size: 11.5px; color: #000 !important; display: flex; justify-content: center;">powered by <img width="109px" height="20px" style="width: 109px !important; height: 20px !important;margin-left: 10px;" src="https://www.intastellarsolutions.com/assets/intastellar_solutions.svg" alt="Intastellar Solutions, International"></a>`; */
const banner = document.createElement("inta-consents-settings-btn");
const bannerContent = document.createElement("button");
const intastellarLogoLight = "https://www.intastellar-consents.com/assets/icons/intastellar-logo-white.svg";
const intastellarLogoDark = "https://www.intastellar-consents.com/assets/icons/intastellar-logo-black.svg";
const moreSettings = document.createElement("inta-consents-banner");
const moreSettingsContent = document.createElement("section");
const moreintHeader = document.createElement("intheader");
const moreContentText = document.createElement("section");
const moreFooter = document.createElement("div");
const intaconsents = window.intaconsents = document.createElement("intastellarconsents");
const pluginSource = findScriptParameter("utm_source") === undefined ? "Intastellar+Solutions+Cookiebanner" : findScriptParameter("utm_source");
window.platform = findScriptParameter("utm_source") === undefined ? "Manual" : findScriptParameter("utm_source");

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
} else if (intastellarCookieLanguage == "th" || intastellarCookieLanguage == "th" || window.INTA.settings.language == "th" || window.INTA.settings.language == "thai") {
    intastellarCookieLanguageSettings = "การตั้งค่า Cookie";
} else if (intastellarCookieLanguage == "af" || intastellarCookieLanguage == "af-ZA" || window.INTA.settings.language == "af" || window.INTA.settings.language == "afrikaans") {
    intastellarCookieLanguageSettings = "Koekie Instellings";
} else if (intastellarCookieLanguage == "bg" || intastellarCookieLanguage == "bg-BG" || window.INTA.settings.language == "bg" || window.INTA.settings.language == "bulgarian") {
    intastellarCookieLanguageSettings = "Настройки на бисквитките";
} else if (intastellarCookieLanguage == "ro" || intastellarCookieLanguage == "ro-RO" || window.INTA.settings.language == "ro" || window.INTA.settings.language == "romanian") {
    intastellarCookieLanguageSettings = "Setări cookie";
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

const intaStyleLink = document.createElement('link');
intaStyleLink.rel = 'stylesheet';
intaStyleLink.type = 'text/css';
intaStyleLink.href = 'https://downloads.intastellarsolutions.com/css/gdpr/' + cookieBannerStyles[window.INTA.settings.design || "overlay"] + '?v=' + new Date().getTime();
intaStyleLink.media = 'all';
intHead.insertBefore(intaStyleLink, document.currentScript.previousSibling);

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

/* - - - Set the intastellarCookieLanguageuage dependent messages */

const messages = {
    danish: "Ved at acceptere alle cookies understøtter du " + document.domain + " med at udvikle en bedre løsning til dig.</p><p>Vælg om du vil tillade kun de nødvendige cookies eller om du vil tillade alle cookies.",
    german: "Wenn Sie auf akzeptieren klicken, unterstützen Sie " + document.domain + " bei der Weiterentwicklung von unserer Webseite.</p><p>Wählen Sie zwischen alle Cookies akzeptieren oder Ablehnen.",
    english: "By accepting all cookies, you support " + document.domain + " in developing a better solution for you. </p><p> Select whether you want to allow only the necessary cookies or whether you want to allow all cookies.",
    spanish: "Al aceptar todas las cookies, apoyas a " + document.domain + " en el desarrollo de una mejor solución para ti.</p><p>Seleccione si desea permitir solo las cookies necesarias o si desea permitir todas las cookies.",
    french: "En acceptant tous les cookies, vous soutenez " + document.domain + " dans le développement d'une meilleure solution pour vous.</p><p>Sélectionnez si vous souhaitez autoriser uniquement les cookies nécessaires ou si vous souhaitez autoriser tous les cookies.",
    swedish: "Genom att acceptera alla cookies stöder du " + document.domain + " i att utveckla en bättre lösning för dig.</p><p>Välj om du vill tillåta endast nödvändiga cookies eller om du vill tillåta alla cookies.",
    norwegian: "Ved å akseptere alle informasjonskapsler støtter du " + document.domain + " i å utvikle en bedre løsning for deg.</p><p>Velg om du vil tillate bare nødvendige informasjonskapsler eller om du vil tillate alle informasjonskapsler.",
    finnish: "Hyväksymällä kaikki evästeet tuet " + document.domain + " paremman ratkaisun kehittämisessä sinulle.</p><p>Valitse, haluatko sallia vain välttämättömät evästeet vai haluatko sallia kaikki evästeet.",
    dutch: "Door alle cookies te accepteren, ondersteunt u " + document.domain + " bij het ontwikkelen van een betere oplossing voor u.</p><p>Kies of u alleen de noodzakelijke cookies wilt toestaan of dat u alle cookies wilt toestaan.",
    italian: "Accettando tutti i cookie, supporti " + document.domain + " nello sviluppo di una soluzione migliore per te.</p><p>Scegli se vuoi consentire solo i cookie necessari o se vuoi consentire tutti i cookie.",
    portuguese: "Ao aceitar todos os cookies, você apoia " + document.domain + " no desenvolvimento de uma solução melhor para você.</p><p>Escolha se deseja permitir apenas os cookies necessários ou se deseja permitir todos os cookies.",
    russian: "Принимая все файлы cookie, вы поддерживаете " + document.domain + " в разработке лучшего решения для вас.</p><p>Выберите, хотите ли вы разрешить только необходимые файлы cookie или разрешить все файлы cookie.",
    polish: "Akceptując wszystkie pliki cookie, wspierasz " + document.domain + " w opracowywaniu lepszego rozwiązania dla Ciebie.</p><p>Wybierz, czy chcesz zezwolić tylko na niezbędne pliki cookie, czy zezwolić na wszystkie pliki cookie.",
    chinese: "通过接受所有cookie，您支持" + document.domain + "为您开发更好的解决方案。</p><p>选择是否只允许必要的cookie或允许所有cookie。",
    japanese: "すべてのCookieを受け入れることで、" + document.domain + "がより良いソリューションを開発するのをサポートします。</p><p>必要なCookieのみを許可するか、すべてのCookieを許可するかを選択してください。",
    greek: "Αποδεχόμενοι όλα τα cookies, υποστηρίζετε το " + document.domain + " στην ανάπτυξη μιας καλύτερης λύσης για εσάς.</p><p>Επιλέξτε αν θέλετε να επιτρέψετε μόνο τα απαραίτητα cookies ή αν θέλετε να επιτρέψετε όλα τα cookies.",
    afrikaans: "Deur alle koekies te aanvaar, ondersteun u " + document.domain + " in die ontwikkeling van 'n beter oplossing vir u.</p><p>Kies of u slegs die nodige koekies wil toelaat of of u alle koekies wil toelaat.",
    arabic: "من خلال قبول جميع ملفات تعريف الارتباط، فإنك تدعم " + document.domain + " في تطوير حل أفضل لك.</p><p>اختر ما إذا كنت تريد السماح فقط بملفات تعريف الارتباط الضرورية أو ما إذا كنت تريد السماح بجميع ملفات تعريف الارتباط.",
    korean: "모든 쿠키를 수락함으로써 " + document.domain + "이(가) 더 나은 솔루션을 개발할 수 있도록 지원합니다.</p><p>필수 쿠키만 허용할지 아니면 모든 쿠키를 허용할지 선택하세요.",
};
const messageWrapStart = "<div class='intastellarCookie-settings__contentConatiner'><p>";
const messageWrapEnd = "</p></div>";

const settingsMessagesLanguages = {
    danish: `<h3 style="    font-size: 25px;">Du bestemmer selv over dine data!</h3>
    <p>Vi og vores samarbejdspartnere bruger teknologier, herunder cookies, til at indsamle oplysninger om dig til forskellige formål, herunder:</p>
    <ol>
        <li>Funktion</li>
        <li>Statistik</li>
        <li>Marketing</li>
    </ol>
    <p>Ved at trykke på 'Accepter' giver du samtykke til alle disse formål. Du kan også vælge hvilke formål du ønsker at give samtykke til ved at benytte checkboksene herunder, og derefter trykke på ”Gem”.
    Du kan til enhver tid trække dit samtykke tilbage ved at trykke på det lille ikon nederst i ${(window?.INTA?.settings.arrange == "ltr") ? "venstre" : "højre"} hjørne af hjemmesiden.</p>
    <p>Du kan læse mere om vores brug af cookies og andre teknologier, samt om vores indsamling og behandling af personoplysninger ved at trykke på nedenstående links.</p>
    ${generatePolicyUrl('Vores privat og cookie politik')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International privat politik</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")}`,
    german: `<h3 style="    font-size: 25px;">Sie haben die Kontrolle über Ihre Daten</h3>
    <p>Wir und unsere Geschäftspartner nutzen Technologien wie Cookies dazu, personenbezogene Informationen für verschiedene Zwecke zu sammeln, darunter:</p>
    <ol>
        <li>Funktion</li>
        <li>Statistik</li>
        <li>Werbung</li>
    </ol>
    <p>Wenn Sie auf „Akzeptieren“ klicken, erteilen Sie Ihre Einwilligung für alle diese Zwecke. Sie können auch entscheiden, welchen Zwecken Sie zustimmen, indem Sie das Kästchen neben dem Zweck anklicken und auf „Speichern“ klicken.</p>
    <p>Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie auf das kleine Symbol unten in der ${(window?.INTA?.settings.arrange == "ltr") ? "linken" : "rechten"} Ecke klicken.</p>
    ${generatePolicyUrl('Unsere Datenschutz Erklährung und Cookie politik')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International Datenschutz erklährung</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    english: `<h3 style="    font-size: 25px;">You´re in control</h3>
    <p>We and our trusted partners use technologies, such as cookies, to collect information for various purposes, including:</p>
    <ol>
        <li>Functionality</li>
        <li>Analytics</li>
        <li>Advertising</li>
    </ol>
    <p>By clicking 'Accept', you consent to all of these purposes. Alternatively, you can select the specific purposes you agree to by ticking the checkboxes and clicking 'Save Settings'.</p>
    <p>You can withdraw your consent at any time by clicking the small icon in the bottom ${(window?.INTA?.settings.arrange == "ltr") ? "left" : "right"} corner of the website.</p>
    ${generatePolicyUrl('Our Privacy and cookie Policy')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International privacy policy</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    spanish: `<h3 style="    font-size: 25px;">Tienes el control</h3>
    <p>Nosotros y nuestros socios comerciales utilizamos tecnologías, incluidas las cookies, para recopilar información sobre usted con diversos fines, incluidos:</p>
    <ol>
        <li>Funcional</li>
        <li>Estadísticas</li>
        <li>Publicidad</li>
    </ol>
    <p>Al hacer clic en "Aceptar", usted da su consentimiento para todos estos fines. También puede decidir a qué fines dar su consentimiento marcando la casilla junto al fin y haciendo clic en "Guardar configuración".</p>
    <p>Puede retirar su consentimiento en cualquier momento haciendo clic en el pequeño icono en la esquina inferior ${(window?.INTA?.settings.arrange == "ltr") ? "izquierda" : "derecha"} del sitio web.</p>
    ${generatePolicyUrl('Nuestra política de privacidad y cookies')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International política de privacidad</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    french: `<h3 style="    font-size: 25px;">Vous êtes aux commandes</h3>
    <p>Nous et nos partenaires commerciaux utilisons des technologies, y compris des cookies, pour collecter des informations vous concernant à diverses fins, notamment:</p>
    <ol>
        <li>Fonctionnel</li>
        <li>Statistiques</li>
        <li>Publicité</li>
    </ol>
    <p>En cliquant sur "Accepter", vous donnez votre consentement pour tous ces objectifs. Vous pouvez également choisir de spécifier les objectifs auxquels vous consentez en cochant la case à côté de l'objectif et en cliquant sur "Enregistrer les paramètres".</p>
    <p>Vous pouvez retirer votre consentement à tout moment en cliquant sur le petit icône en bas à gauche du site web.</p>
    ${generatePolicyUrl('Notre politique de confidentialité et de cookies')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International politique de confidentialité</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    swedish: `<h3 style="    font-size: 25px;">Du har kontrollen</h3>
    <p>Vi och våra affärspartners använder teknik, inklusive cookies, för att samla in information om dig för olika ändamål, inklusive:</p>
    <ol>
        <li>Funktionell</li>
        <li>Statistik</li>
        <li>Marknadsföring</li>
    </ol>
    <p>Genom att klicka på "Acceptera" ger du ditt samtycke till alla dessa ändamål. Du kan också välja att specificera de ändamål du samtycker till genom att markera rutan bredvid ändamålet och klicka på "Spara inställningar".</p>
    <p>Du kan återkalla ditt samtycke när som helst genom att klicka på den lilla ikonen längst ned ${(window?.INTA?.settings.arrange == "ltr") ? "vänster" : "höger"} hörn av webbplatsen.</p>
    ${generatePolicyUrl('Vår integritets- och cookiepolicy')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International integritetspolicy</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    norwegian: `<h3 style="    font-size: 25px;">Du har kontrollen</h3>
    <p>Vi og våre forretningspartnere bruker teknologi, inkludert informasjonskapsler, for å samle inn informasjon om deg for ulike formål, inkludert:</p>
    <ol>
        
        <li>Funksjonell</li>
        <li>Statistikk</li>
        <li>Markedsføring</li>
    </ol>
    <p>Ved å klikke på "Godta", gir du ditt samtykke til alle disse formålene. Du kan også velge å spesifisere formålene du samtykker til ved å krysse av i boksen ved siden av formålet og klikke på "Lagre innstillinger".</p>
    <p>Du kan når som helst trekke tilbake ditt samtykke ved å klikke på det lille ikonet nederst ${(window?.INTA?.settings.arrange == "ltr") ? "venstre" : "høyre"} hjørne av nettsiden.</p>
    ${generatePolicyUrl('Vår personvern- og informasjonskapsler')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International personvernpolicy</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    finnish: `<h3 style="    font-size: 25px;">Olet ohjaimissa</h3>
    <p>Me ja liikekumppanimme käytämme teknologioita, mukaan lukien evästeet, kerätäksemme tietoja sinusta eri tarkoituksiin, mukaan lukien:</p>
    <ol>
        <li>Toiminnallinen</li>
        <li>Tilastollinen</li>
        <li>Mainonta</li>
    </ol>
    <p>Klikkaamalla "Hyväksy" annat suostumuksesi kaikkiin näihin tarkoituksiin. Voit myös valita, mihin tarkoituksiin suostut valitsemalla ruudun tarkoituksen vieressä ja napsauttamalla "Tallenna asetukset".</p>
    <p>Voit peruuttaa suostumuksesi milloin tahansa napsauttamalla sivuston alareunan pientä kuvaketta ${(window?.INTA?.settings.arrange == "ltr") ? "vasen" : "oikea"} kulma.</p>
    ${generatePolicyUrl('Tietosuojakäytäntömme ja evästekäytäntömme')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International tietosuojakäytäntö</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    dutch: `<h3 style="    font-size: 25px;">U bent in controle</h3>
    <p>Wij en onze zakenpartners gebruiken technologieën, waaronder cookies, om informatie over u te verzamelen voor verschillende doeleinden, waaronder:</p>
    <ol>
        <li>Functioneel</li>
        <li>Statistisch</li>
        <li>Reclame</li>
    </ol>
    <p>Door op 'Accepteren' te klikken, geeft u uw toestemming voor al deze doeleinden. U kunt ook beslissen welke doeleinden u wilt goedkeuren door het selectievakje naast het doel aan te vinken en op 'Instellingen opslaan' te klikken.</p>
    <p>U kunt uw toestemming te allen tijde intrekken door op het kleine pictogram te klikken onderaan de ${(window?.INTA?.settings.arrange == "ltr") ? "linker" : "rechter"} hoek van de website.</p>
    ${generatePolicyUrl('Ons privacy- en cookiebeleid')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International privacybeleid</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    italian: `<h3 style="    font-size: 25px;">Sei al comando</h3>
    <p>Noi e i nostri partner commerciali utilizziamo tecnologie, tra cui i cookie, per raccogliere informazioni su di te per vari scopi, tra cui:</p>
    <ol>
        <li>Funzionale</li>
        <li>Statistiche</li>
        <li>Pubblicità</li>
    </ol>
    <p>Cliccando su "Accetta", dai il tuo consenso per tutti questi scopi. Puoi anche decidere a quali scopi acconsentire spuntando la casella accanto allo scopo e cliccando su "Salva impostazioni".</p>
    <p>Puoi revocare il tuo consenso in qualsiasi momento cliccando sull'icona in basso a sinistra del sito web.</p>
    ${generatePolicyUrl('La nostra politica sulla privacy e sui cookie')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International privacy policy</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    portuguese: `<h3 style="    font-size: 25px;">Você está no controle</h3>
    <p>Nós e nossos parceiros comerciais usamos tecnologias, incluindo cookies, para coletar informações sobre você para diversos fins, incluindo:</p>
    <ol>
        <li>Funcional</li>
        <li>Estatísticas</li>
        <li>Publicidade</li>
    </ol>
    <p>Ao clicar em "Aceitar", você dá seu consentimento para todos esses fins. Você também pode optar por especificar os fins aos quais consente marcando a caixa ao lado do fim e clicando em "Salvar configurações".</p>
    <p>Você pode retirar seu consentimento a qualquer momento clicando no pequeno ícone na parte inferior ${(window?.INTA?.settings.arrange == "ltr") ? "esquerda" : "direita"} do site.</p>
    ${generatePolicyUrl('Nossa política de privacidade e cookies')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International política de privacidade</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    russian: `<h3 style="    font-size: 25px;">Вы в контроле</h3>
    <p>Мы и наши деловые партнеры используем технологии, включая файлы cookie, для сбора информации о вас для различных целей, включая:</p>
    <ol>
        <li>Функциональный</li>
        <li>Статистика</li>
        <li>Реклама</li>
    </ol>
    <p>Нажимая «Принять», вы даете согласие на все эти цели. Вы также можете решить, какие цели вы согласны утвердить, установив флажок рядом с целью и нажав «Сохранить настройки».</p>
    <p>Вы можете отозвать свое согласие в любое время, нажав на небольшой значок в нижнем ${(window?.INTA?.settings.arrange == "ltr") ? "левом" : "правом"} углу веб-сайта.</p>
    ${generatePolicyUrl('Наша политика конфиденциальности и файлы cookie')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International политика конфиденциальности</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    polish: `<h3 style="    font-size: 25px;">Ty decydujesz o swoich danych</h3>
    <p>My i nasi partnerzy biznesowi wykorzystujemy technologie, w tym pliki cookie, do zbierania informacji o Tobie w różnych celach, w tym:</p>
    <ol>
        <li>Funkcjonalność</li>
        <li>Statystyki</li>
        <li>Reklama</li>
    </ol>
    <p>Klikając „Akceptuj”, wyrażasz zgodę na wszystkie te cele. Możesz także zdecydować, które cele chcesz zatwierdzić, zaznaczając pole wyboru obok celu i klikając „Zapisz ustawienia”.</p>
    <p>Możesz wycofać swoją zgodę w dowolnym momencie, klikając małą ikonę w dolnym ${(window?.INTA?.settings.arrange == "ltr") ? "lewy" : "prawy"} rogu strony internetowej.</p>
    ${generatePolicyUrl('Nasza polityka prywatności i plików cookie')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International polityka prywatności</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    afrikaans: `<h3 style="    font-size: 25px;">Jy is in beheer</h3>
    <p>Ons en ons sakevennote gebruik tegnologieë, insluitend koekies, om inligting oor jou vir verskillende doeleindes in te samel, insluitend:</p>
    <ol>
        <li>Funksionaliteit</li>
        <li>Analise</li>
        <li>Advertering</li>
    </ol>
    <p>Deur op 'Aanvaar' te klik, gee jy toestemming vir al hierdie doeleindes. Jy kan ook die spesifieke doeleindes waarvoor jy toestemming gee, kies deur die keuselys langs die doelwit aan te dui en op 'Stoor instellings' te klik.</p>
    <p>Jy kan jou toestemming te eniger tyd intrek deur op die klein ikoon in die onderkant ${(window?.INTA?.settings.arrange == "ltr") ? "linker" : "regter"} hoek van die webwerf te klik.</p>
    ${generatePolicyUrl('Ons Privaatheids- en koekiebeleid')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International privaatheidsbeleid</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    arabic: `<h3 style="    font-size: 25px;">أنت المتحكم</h3>
    <p>نحن وشركاؤنا التجاريون نستخدم تقنيات، بما في ذلك ملفات تعريف الارتباط، لجمع المعلومات عنك لأغراض مختلفة، بما في ذلك:</p>
    <ol>
        <li>الوظائف</li>
        <li>التحليلات</li>
        <li>الإعلانات</li>
    </ol>
    <p>من خلال النقر على "قبول"، فإنك توافق على جميع هذه الأغراض. يمكنك أيضًا اختيار الأغراض المحددة التي توافق عليها عن طريق تحديد المربعات بجوار الأغراض والنقر على "حفظ الإعدادات".</p>
    <p>يمكنك سحب موافقتك في أي وقت من خلال النقر على الأيقونة الصغيرة في الزاوية ${(window?.INTA?.settings.arrange == "ltr") ? "اليسرى" : "اليمنى"} السفلية من الموقع.</p>
    ${generatePolicyUrl('سياسة الخصوصية وملفات تعريف الارتباط الخاصة بنا')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International سياسة الخصوصية</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    greek: `<h3 style="    font-size: 25px;">Είστε σε έλεγχο</h3>
    <p>Εμείς και οι επιχειρηματικοί μας συνεργάτες χρησιμοποιούμε τεχνολογίες, όπως τα cookies, για να συλλέγουμε πληροφορίες για
    εσάς για διάφορους σκοπούς, συμπεριλαμβανομένων:</p>
    <ol>
        <li>Λειτουργικότητα</li>
        <li>Στατιστικά</li>
        <li>Διαφήμιση</li>
    </ol>
    <p>Κάνοντας κλικ στο "Αποδοχή", συναινείτε σε όλους αυτούς τους σκοπούς. Μπορείτε επίσης να επιλέξετε τους συγκεκριμένους σκοπούς στους οποίους συμφωνείτε, επιλέγοντας τα πλαί
ς δίπλα στον σκοπό και κάνοντας κλικ στο "Αποθήκευση ρυθμίσεων".</p>
    <p>Μπορείτε να ανακαλέσετε τη συγκατάθεσή σας ανά πάσα στιγμή κάνοντας κλικ στο μικρό εικονίδιο στην κάτω ${(window?.INTA?.settings.arrange == "ltr") ? "αριστερή" : "δεξιά"} γωνία της ιστοσελίδας.</p>
    ${generatePolicyUrl('Η Πολιτική Απορρήτου και Cookies μας')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International πολιτική απορρήτου</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    chinese: `<h3 style="    font-size: 25px;">你掌控一切</h3>
    <p>我们和我们的商业伙伴使用技术，包括 cookies，收集关于您的信息用于各种目的，包括：</p>
    <ol>
        <li>功能性</li>
        <li>统计</li>
        <li>广告</li>
    </ol>
    <p>点击“接受”即表示您同意所有这些目的。您也可以选择您同意的具体目的，通过勾选目的旁边的复选框并点击“保存设置”。</p>
    <p>您可以随时通过点击网站底部 ${(window?.INTA?.settings.arrange == "ltr") ? "左侧" : "右侧"} 角落的小图标来撤销您的同意。</p>
    ${generatePolicyUrl('我们的隐私和 Cookie 政策')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International 隐私政策</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    japanese: `<h3 style="    font-size: 25px;">あなたがコントロール</h3>
    <p>私たちと私たちのビジネスパートナーは、クッキーなどの技術を使用して、あなたに関する情報をさまざまな目的で収集しています。これには以下が含まれます：</p>
    <ol>
        <li>機能性</li>
        <li>統計</li>
        <li>広告</li>
    </ol>
    <p>「承認」をクリックすることで、これらすべての目的に同意します。また、目的の横にあるチェックボックスを選択し、「設定を保存」をクリックすることで、同意する特定の目的を選択することもできます。</p>
    <p>ウェブサイトの下部 ${(window?.INTA?.settings.arrange == "ltr") ? "左側" : "右側"} 角にある小さなアイコンをクリックすることで、いつでも同意を撤回できます。</p>
    ${generatePolicyUrl('私たちのプライバシーとクッキーポリシー')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International プライバシーポリシー</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    korean: `<h3 style="    font-size: 25px;">당신이 통제합니다</h3>
    <p>우리는 우리의 비즈니스 파트너와 함께 쿠키와 같은 기술을 사용하여 다양한 목적을 위해 귀하에 대한 정보를 수집합니다. 여기에는 다음이 포함됩니다:</p>
    <ol>
        <li>기능성</li>
        <li>통계</li>
        <li>광고</li>
    </ol>
    <p>'수락'을 클릭함으로써, 당신은 이 모든 목적에 동의합니다. 또한, 목적 옆의 체크박스를 선택하고 '설정 저장'을 클릭함으로써 동의할 특정 목적을 선택할 수 있습니다.</p>
    <p>웹사이트 하단 ${(window?.INTA?.settings.arrange == "ltr") ? "왼쪽" : "오른쪽"} 모서리에 있는 작은 아이콘을 클릭하여 언제든지 동의를 철회할 수 있습니다.</p>
    ${generatePolicyUrl('우리의 개인정보 보호정책 및 쿠키 정책')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International 개인정보 보호정책</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    estonian: `<h3 style="    font-size: 25px;">Sa oled kontrolli all</h3>
    <p>Meie ja meie äripartnerid kasutame tehnoloogiaid, sealhulgas küpsiseid, et koguda teavet teie kohta erinevatel eesmärkidel, sealhulgas:</p>
    <ol>
        <li>Funktsionaalsus</li>
        <li>Statistika</li>
        <li>Reklaam</li>
    </ol>
    <p>Klikkides "Nõustu", annate nõusoleku kõikidele nendele eesmärkidele. Samuti saate valida, millistele eesmärkidele te nõustute, märkides ruudud eesmärkide kõrval ja klõpsates "Salvesta seaded".</p>
    <p>Te saate oma nõusoleku igal ajal tagasi võtta, klõpsates veebilehe alumises ${(window?.INTA?.settings.arrange == "ltr") ? "vasakus" : "paremas"} nurgas asuvale väikesele ikoonile.</p>
    ${generatePolicyUrl('Meie privaatsus- ja küpsiste poliitika')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International privatsuspoliitika</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,

}

if (intastellarCookieLanguage != null) {
    if (intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
        settingsMessage = settingsMessagesLanguages.danish;
        intastellarShowHideDetailsText = "Vis detaljer";
        message =
            messageWrapStart
            + messages.danish
            + messageWrapEnd
            + generatePolicyUrl('Vores privat og cookie politik')
            + (window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "");
        + `<section class="intCookieSaveSettingsContainer">
        ${generateCookieSettingsButton(intastellarSupportedLanguages.danish.saveSettings, 'Accepter')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = generateCookieButtons('Accepter', 'Afvis', 'Indstillinger');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
        ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.danish.saveSettings, 'Accepter')}
        <button class="intLearnMoreBtn">${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        moreFooter.innerHTML =
            `
         <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <p>ID: ${(getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2])).uid : intaConsentsObjectVariable.uid}</p>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.danish.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.danish.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.danish.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.danish.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
       
    `;
    } else if (intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
        settingsMessage = settingsMessagesLanguages.german;
        intastellarShowHideDetailsText = "Details einblenden";
        message = messageWrapStart
            + messages.german
            + messageWrapEnd
            + generatePolicyUrl('Unsere Datenschutz Erklährung und Cookie politik')
            + (window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "");
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
        ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.german.saveSettings, 'Akzeptieren')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Akzeptieren', 'Ablehnen', 'Einstellungen');
        moreFooter.innerHTML =
            `
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.german.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.german.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.german.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.german.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <p>ID: ${(getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2])).uid : intaConsentsObjectVariable.uid}</p>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.german.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.german.necessary.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.german.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.german.functional.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_functionalCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.german.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.german.statisic.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.german.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.german.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
    `;
    } else if (intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
        settingsMessage = settingsMessagesLanguages.english;
        intastellarShowHideDetailsText = "Show details";
        message =
            messageWrapStart
            + messages.english
            + messageWrapEnd
            + generatePolicyUrl('Our Privacy and cookie Policy')
            + (window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "");
        ;
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
        
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
       <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.english.saveSettings, 'Accept')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Accept', 'Decline All', 'Settings');

        moreFooter.innerHTML =
            `
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.english.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.english.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.english.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.english.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <p>ID: ${(getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2])).uid : intaConsentsObjectVariable.uid}</p>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.english.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.english.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.english.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.english.functional.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_functionalCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.english.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.english.statisic.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.english.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.english.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
    `;
    } else if (intastellarCookieLanguage == "es" || intastellarCookieLanguage == "es-ES") {
        /* Spanish */
        settingsMessage = settingsMessagesLanguages.spanish;
        intastellarShowHideDetailsText = "Mostrar detalles";
        message =
            messageWrapStart
            + messages.spanish
            + messageWrapEnd
            + generatePolicyUrl('Nuestra política de privacidad y cookies');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.spanish.saveSettings, 'Aceptar')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Aceptar', 'Rechazar', 'Configuración');
        moreFooter.innerHTML =
            `
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSetting checkMarkContainer" disabled>
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.spanish.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.spanish.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.spanish.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.spanish.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <p>ID: ${(getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2])).uid : intaConsentsObjectVariable.uid}</p>
                <h3 class="intaExpandCookieList">
                    ${intastellarSupportedLanguages.spanish.necessary.title} <i class="intastellar__arrow"></i>
                </h3>
                <p>${intastellarSupportedLanguages.spanish.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)}
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.spanish.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.spanish.functional.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_functionalCookieList)}
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.spanish.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.spanish.statisic.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)}
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.spanish.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.spanish.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)}
                </article>
            </section>
        </article>
    `;
    } else if (intastellarCookieLanguage == "fr" || intastellarCookieLanguage == "fr-FR") {
        settingsMessage = settingsMessagesLanguages.french;
        intastellarShowHideDetailsText = "Afficher les détails";
        message =
            messageWrapStart
            + messages.french
            + messageWrapEnd
            + generatePolicyUrl('Notre politique de confidentialité et de cookies');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
       <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.french.saveSettings, 'Accepter')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Accepter', 'Refuser', 'Paramètres');
        moreFooter.innerHTML =
            `
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.french.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.french.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.french.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.french.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <p>ID: ${(getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2])).uid : intaConsentsObjectVariable.uid}</p>
                <h3 class="intaExpandCookieList">
                    ${intastellarSupportedLanguages.french.necessary.title} <i class="intastellar__arrow"></i>
                </h3>
                <p>${intastellarSupportedLanguages.french.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)}
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.french.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.french.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.french.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.french.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.french.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.french.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
    `;
    } else if (intastellarCookieLanguage == "sv" || intastellarCookieLanguage == "sv-SE") {
        settingsMessage = settingsMessagesLanguages.swedish;
        intastellarShowHideDetailsText = "Visa detaljer";
        message =
            messageWrapStart
            + messages.swedish
            + messageWrapEnd
            + generatePolicyUrl('Vår sekretesspolicy och cookiepolicy');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
       <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.swedish.saveSettings, 'Acceptera')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Acceptera', 'Avvisa', 'Inställningar');
        moreFooter.innerHTML =
            `
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.swedish.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.swedish.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.swedish.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.swedish.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <p>ID: ${(getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2])).uid : intaConsentsObjectVariable.uid}</p>
                <h3 class="intaExpandCookieList">
                    ${intastellarSupportedLanguages.swedish.necessary.title} <i class="intastellar__arrow"></i>
                </h3>
                <p>${intastellarSupportedLanguages.swedish.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)}
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.swedish.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.swedish.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.swedish.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.swedish.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.swedish.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.swedish.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
    `;
    } else if (intastellarCookieLanguage == "no" || intastellarCookieLanguage == "no-NO") {
        // Norwegian
        settingsMessage = settingsMessagesLanguages.norwegian;
        intastellarShowHideDetailsText = "Vis detaljer";
        message =
            messageWrapStart
            + messages.norwegian
            + messageWrapEnd
            + generatePolicyUrl('Vår personvernerklæring og informasjonskapsler');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.norwegian.saveSettings, 'Godta')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Godta', 'Avslå', 'Innstillinger');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo != "" || window.INTA.settings.design == "banner" && window.INTA.settings.logo) ? `
       <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.danish.saveSettings, 'Accept')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;

        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Accepter', 'Afvis', 'Indstillinger');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.norwegian.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.norwegian.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.dutch.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.norwegian.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.norwegian.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.norwegian.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.norwegian.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.norwegian.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.dutch.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.dutch.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.dutch.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.dutch.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
    `;
    } else if (intastellarCookieLanguage == "nl" || intastellarCookieLanguage == "nl-NL") {
        // Dutch
        settingsMessage = settingsMessagesLanguages.dutch;
        intastellarShowHideDetailsText = "Toon details";
        message =
            messageWrapStart
            + messages.dutch
            + messageWrapEnd
            + generatePolicyUrl('Ons privacy- en cookiebeleid');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.dutch.saveSettings, 'Accepteren')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Accepteren', 'Weigeren', 'Instellingen');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.dutch.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.dutch.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.dutch.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.dutch.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.dutch.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.dutch.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.dutch.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.dutch.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.dutch.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.dutch.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.dutch.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.dutch.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
    `;
    } else if (intastellarCookieLanguage == "it" || intastellarCookieLanguage == "it-IT") {
        // Italian
        settingsMessage = settingsMessagesLanguages.italian;
        intastellarShowHideDetailsText = "Mostra dettagli";
        message =
            messageWrapStart
            + messages.italian
            + messageWrapEnd
            + generatePolicyUrl('Ons privacy- en cookiebeleid');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.italian.saveSettings, 'Accetta')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Accetta', 'Rifiuta', 'Impostazioni');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.italian.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.italian.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.italian.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.italian.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.italian.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.italian.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.italian.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.italian.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.italian.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.italian.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.italian.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.italian.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
    `;
    } else if (intastellarCookieLanguage == "fi" || intastellarCookieLanguage == "fi-FI") {
        // Finish
        settingsMessage = settingsMessagesLanguages.finnish;
        intastellarShowHideDetailsText = "Näytä tiedot";
        message =
            messageWrapStart
            + messages.finnish
            + messageWrapEnd
            + generatePolicyUrl('Tietosuojakäytäntömme ja evästekäytäntömme');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.finnish.saveSettings, 'Hyväksy')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Hyväksy', 'Hylkää', 'Asetukset');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.finnish.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.finnish.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.finnish.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.finnish.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.finnish.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.finnish.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.finnish.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.finnish.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.finnish.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.finnish.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.finnish.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.finnish.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
    `;
    } else if (intastellarCookieLanguage == "ru" || intastellarCookieLanguage == "ru-RU") {
        // Russian
        settingsMessage = settingsMessagesLanguages.russian;
        intastellarShowHideDetailsText = "Показать детали";
        message =
            messageWrapStart
            + messages.russian
            + messageWrapEnd
            + generatePolicyUrl('Наша политика конфиденциальности и использования файлов cookie');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.russian.saveSettings, 'Принять')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Принять', 'Отклонить', 'Настройки');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.russian.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.russian.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.russian.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.russian.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.russian.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.russian.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.russian.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.russian.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.russian.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.russian.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.russian.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.russian.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
    `;
    } else if (intastellarCookieLanguage == "pl" || intastellarCookieLanguage == "po-PL") {
        // Polish
        settingsMessage = settingsMessagesLanguages.polish;
        intastellarShowHideDetailsText = "Pokaż szczegóły";
        message =
            messageWrapStart
            + messages.polish
            + messageWrapEnd
            + generatePolicyUrl('Nasza polityka prywatności i plików cookie');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.polish.saveSettings, 'Zaakceptuj')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Zaakceptuj', 'Odrzuć', 'Ustawienia');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.polish.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.polish.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.polish.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.polish.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.polish.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.polish.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.polish.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.polish.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.polish.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.polish.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.polish.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.polish.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
    `;
    } else if (intastellarCookieLanguage == "af" || intastellarCookieLanguage == "af-ZA") {
        // Afrikaans
        settingsMessage = settingsMessagesLanguages.afrikaans;
        intastellarShowHideDetailsText = "Wys besonderhede";
        message =
            messageWrapStart
            + messages.afrikaans
            + messageWrapEnd
            + generatePolicyUrl('Ons privaatheids- en koekiebeleid');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.afrikaans.saveSettings, 'Aanvaar')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Aanvaar', 'Weier', 'Instellings');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.afrikaans.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.afrikaans.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.afrikaans.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.afrikaans.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.afrikaans.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.afrikaans.statisic.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.afrikaans.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.afrikaans.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.afrikaans.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.afrikaans.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.afrikaans.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.afrikaans.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                    </section>
            </article>
    `;
    } else if (intastellarCookieLanguage == "ko" || intastellarCookieLanguage == "ko-KR") {
        // Korean
        settingsMessage = settingsMessagesLanguages.korean;
        intastellarShowHideDetailsText = "세부정보 보기";
        message =
            messageWrapStart
            + messages.korean
            + messageWrapEnd
            + generatePolicyUrl('개인정보 보호정책 및 쿠키 정책');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.korean.saveSettings, '동의')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('동의', '거부', '설정');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.korean.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.korean.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.korean.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.korean.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.korean.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.korean.statisic.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.korean.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.korean.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.korean.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.korean.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer"> 
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.korean.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.korean.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>`;


    } else if (intastellarCookieLanguage == "ar" || intastellarCookieLanguage == "ar-SA") {
        // Arabic
        settingsMessage = settingsMessagesLanguages.arabic;
        intastellarShowHideDetailsText = "إظهار التفاصيل";
        message =
            messageWrapStart
            + messages.arabic
            + messageWrapEnd
            + generatePolicyUrl('سياسة الخصوصية وملفات تعريف الارتباط الخاصة بنا');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.arabic.saveSettings, 'قبول')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('قبول', 'رفض', 'إعدادات');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy">
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.arabic.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.arabic.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.arabic.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.arabic.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.arabic.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.arabic.statisic.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.arabic.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.arabic.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.arabic.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.arabic.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.arabic.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.arabic.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                    </section>
            </article>
        </section>
    `;
    } else if (intastellarCookieLanguage == "et" || intastellarCookieLanguage == "et-EE") {
        // Estonian
        settingsMessage = settingsMessagesLanguages.estonian;
        intastellarShowHideDetailsText = "Näita üksikasju";
        message =
            messageWrapStart
            + messages.estonian
            + messageWrapEnd
            + generatePolicyUrl('Meie privaatsus- ja küpsistepoliitika');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.estonian.saveSettings, 'Nõustu')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Nõustu', 'Keeldu', 'Seaded');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.estonian.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.estonian.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.estonian.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.estonian.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.estonian.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.estonian.statisic.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.estonian.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.estonian.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.estonian.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.estonian.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.estonian.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.estonian.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>`;
    } else {
        /* Default */
        settingsMessage = settingsMessagesLanguages.danish;
        intastellarShowHideDetailsText = "Vis detaljer";
        message =
            messageWrapStart
            + messages.danish
            + messageWrapEnd
            + generatePolicyUrl('Vores privat og cookie politik');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo != "" || window.INTA.settings.design == "banner" && window.INTA.settings.logo) ? `
       <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.danish.saveSettings, 'Accept')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;

        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Accepter', 'Afvis', 'Indstillinger');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.danish.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.danish.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.danish.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.danish.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
    `;
    }
}

moreContentText.innerHTML = settingsMessage;

let ccpa = window?.INTA?.settings === undefined || window?.INTA?.settings.ccpa === undefined ? false : window?.INTA?.settings.ccpa.on;
let ccpaUrl = window?.INTA?.settings === undefined || window?.INTA?.settings.ccpa === undefined ? false : window?.INTA?.settings.ccpa.url;
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
    text = " <span class=''>Cookie notice</span>";
    cookieSize = "25%";
}
intaCookieBannerStyle.innerHTML = ".intastellarCookie-settingsContainer,.intastellarCookieConstents__contentC, .intastellarCookie-settings__btn.--bg, .intastellarCCPAContainer{background: " + cookieColor + " !important;color: #fff !important;} .intCookie_ConsentLogo-container{border-color: #fff; background: linear-gradient(#fff 0 0) padding-box, " + cookieColor + " border-box;} .intCookie_ConsentContainer-content{border-color: #fff; background: linear-gradient(#fff 0 0) padding-box, " + cookieColor + " border-box;} .intastellarCookie-settings__btn.--changePermission{background: transparent !important; border-image-slice: 1;border-color: " + cookieColor + ";border-image:" + cookieColor + " 1 !important; border-width: 3px; border-style: solid; transition: background .25s ease-in-out; width: max-content; margin-inline: auto !important;} .intastellarCookie-settings__btn.--changePermission:hover{background: " + cookieColor + " !important; color: #fff !important;} .intCookieSetting__checkbox:checked ~ .checkmark{background: " + checkMarkColor + ";}.intastellarCCPA__popupClose{background:" + cookieColor + "; color: #fff;} .intastellarCookie-settings__btn.--bg:hover{background: " + brightColor + " !important;}.intastellarCookie-settings__close:hover{background: " + brightColor + " !important;} .intastellarCookieConstents__content-main .intastellarCookie-settings__privacyLink{color: #fff !important;} .intastellarCookie-settings__privacyLink{text-decoration: underline !important;}.intastellarCookie-settings__content .intastellarCookie-settings__privacyLink{color: " + cookieTextColor + ";}.intastellarCookie-settings__content p{color: " + cookieTextColor + " !important;}.intastellarCookie-settings__intHeader{color:" + cookieTextColor + " !important;}.intastellarCookie-settings__container{background-color: " + backgroundColor + " !important;} .intastellarCookie-settingsMoreContainer{display:none;position: fixed; top: 50%; left: 50%; background: #fff; padding: 15px;z-index: 1000; transform: translate(-50%,-50%);}" + withText;
intHead.appendChild(intaCookieBannerStyle);

/* Checking for CCPA "Do not sell my personal data" is enabled if so create an info link on the right side of the screen  */
if (ccpa && isValidCCPALink()) {
    const intastellarCCPAContainer = document.createElement("inta-consents-ccpa");
    const intastellarCCPAContainer__content = document.createElement("section");

    intastellarCCPAContainer.setAttribute("class", "intastellarCCPAContainer");
    intastellarCCPAContainer.setAttribute("title", "California Consumer Privacy Act: Do not sell my information!");
    intastellarCCPAContainer__content.setAttribute("class", "intastellarCCPAContainer__content")
    intastellarCCPAContainer__content.innerHTML = `
        <svg class="intastellarCCPA__icon" height="14" viewBox=".2 0 19.4 20" width="13" xmlns="http://www.w3.org/2000/svg"><path d="m2.2 20c1 0 1.7-.5 2.4-.9.6-.3 1.2-.7 1.9-1 3.2-1.7 6.4-3.5 9.6-5.3 1-.5 2.3-1 3-1.9.2-.3.5-.7.4-1.2-.3-1.1-1.7-1.5-2.6-2-2.2-1.2-4.5-2.5-6.7-3.7-.8-.5-2-1.4-3-.7-.4.2-.6.4-.7.7-.1.4 0 .9 0 1.3v3.2c0 .9-.1 1.6.5 2 .2.1.6.2.9.1 1-.4.7-2.2.7-3.6v-1.1c1.7.9 3.4 1.8 5.1 2.6.6.3 1.6.6 1.8 1.4.2.9-1.7 1.6-2.3 1.9l-6.9 3.9c-.5.3-1.8 1.3-2.6 1-.3-.1-.5-.4-.5-.6-.1-.4-.1-1-.1-1.5v-3.2-5.4c0-.8-.1-1.8.2-2.3.7-1 2.3.8 2.8-.8.1-.4-.1-.8-.3-1-.4-.6-2.2-1.5-2.9-1.7-.2-.1-.7-.2-1-.2-1.7.3-1.3 3-1.3 5v9.9c0 1.5-.2 3.5.4 4.4.3.5.6.5 1.2.7zm5.2-6.5c1.5 0 1.6-1.9.2-2.2-.8-.1-1.4.7-1.2 1.4.2.5.5.6 1 .8z" fill="#fff"/></svg> Do not sell my personal data!
    `;

    intastellarCCPAContainer.appendChild(intastellarCCPAContainer__content);
    intaconsents.appendChild(intastellarCCPAContainer);


    const intastellarCCPApopup = document.createElement("inta-consents-ccpa-popup");
    intastellarCCPApopup.setAttribute("class", "intastellarCCPApopup");

    const instastellarCCPApopupContent = document.createElement("section");
    instastellarCCPApopupContent.setAttribute("class", "intastellarCCPApopup__content");

    if (window?.INTA?.settings.ccpa.collection != undefined) {
        instastellarCCPApopupContent.innerHTML = `
        <h2><svg class="intastellarCCPA__icon" width="18px" height="19px" viewBox=".2 0 19.4 20" width="13" xmlns="http://www.w3.org/2000/svg"><path d="m2.2 20c1 0 1.7-.5 2.4-.9.6-.3 1.2-.7 1.9-1 3.2-1.7 6.4-3.5 9.6-5.3 1-.5 2.3-1 3-1.9.2-.3.5-.7.4-1.2-.3-1.1-1.7-1.5-2.6-2-2.2-1.2-4.5-2.5-6.7-3.7-.8-.5-2-1.4-3-.7-.4.2-.6.4-.7.7-.1.4 0 .9 0 1.3v3.2c0 .9-.1 1.6.5 2 .2.1.6.2.9.1 1-.4.7-2.2.7-3.6v-1.1c1.7.9 3.4 1.8 5.1 2.6.6.3 1.6.6 1.8 1.4.2.9-1.7 1.6-2.3 1.9l-6.9 3.9c-.5.3-1.8 1.3-2.6 1-.3-.1-.5-.4-.5-.6-.1-.4-.1-1-.1-1.5v-3.2-5.4c0-.8-.1-1.8.2-2.3.7-1 2.3.8 2.8-.8.1-.4-.1-.8-.3-1-.4-.6-2.2-1.5-2.9-1.7-.2-.1-.7-.2-1-.2-1.7.3-1.3 3-1.3 5v9.9c0 1.5-.2 3.5.4 4.4.3.5.6.5 1.2.7zm5.2-6.5c1.5 0 1.6-1.9.2-2.2-.8-.1-1.4.7-1.2 1.4.2.5.5.6 1 .8z" fill="#000"/></svg> Do not sell my personal data!</h2><button class="intastellarCCPA__popupClose">X</button>
        <p>This section is about our California Consumer Privacy Act.</p>
        ${createCCPAPolicyLink(ccpaUrl)}
        <h3>Personal data we collect:</h3>
        <ul>
            <li>IP-Address</li>
            ${window?.INTA?.settings.ccpa.collection.map(name => '<li>' + name.charAt(0).toUpperCase() + '' + name.slice(1) + '</li>').join('')}
        </ul>
        `;
    } else {
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
    intaconsents.appendChild(intastellarCCPApopup);
} else if (!isValidCCPALink() && "ccpa" in window?.INTA?.settings && window?.INTA?.settings.ccpa.on === "true") {
    throw new IntastellarSolutionsSDK("Please add your valid 'California Consumer Privacy Act' url to the banner. Read more at https://www.intastellarsolutions.com/solutions/cookie-consents");
}

cookieSettingsContent.setAttribute("class", "intastellarCookie-settings__content");

let intCookieIconSmallClass = cookieLogo == intCookieIcon ? " intastellarIcon" : "";
let CompanyLogoName = cookieLogo == intCookieIcon ? "Cookie Icon" : `${document.domain} logo`;

moreintHeader.innerHTML = `
    ${typeof window?.INTA?.settings.logo != "undefined" ? '<img onerror="this.onerror=null; this.style.display:none;" class="intSettingsCompanyLogo" src="' + window?.INTA?.settings.logo + '" alt="' + CompanyLogoName + '" title="' + CompanyLogoName + '">' : ``}
    ${(window.INTA.settings.design == "overlay" || window.INTA.settings.design == undefined || window.innerWidth < 900) ? `<section class="intSettingsPoweredBy">${poweredBy}</section>` : ""}
    `;

cookieSettingsContent.innerHTML = '<intHeader class="intastellarCookie-settings__intHeader"><img onerror="this.onerror=null; this.style.display:none;" src="' + window?.INTA?.settings.logo + '" alt="' + CompanyLogoName + '" title="' + CompanyLogoName + '" style="width: 100%;float: left; max-width: 50px;max-height: 50px;object-fit:contain;"><h2>Cookie</h2><button class="intastellarCookie-settings__close" style="background: ' + cookieColor + ';" aria-label="Close cookie banner"></button></intHeader>' +
    message + cookieBtn + "" + (window.INTA.settings.design !== "overlay" || window.INTA.settings.design != undefined) ? poweredBy : (window.innerWidth < 768) ? null : poweredBy + "";

cookieSettings.appendChild(cookieSettingsContent);

if (window?.INTA?.settings.advanced) {
    //banner.appendChild(cookieSettings);
}

banner.setAttribute("class", "intastellarCookie-settings");

bannerContent.innerHTML = '<img class="intCookieIcon-openSettings" style="filter: brightness(' + (darkLightCheck(window.INTA.settings.color) === "light" ? "0" : "100") + ') !important" src="' + intCookieIcon + '" alt="Cookie Icon">' + IntastellarToolTip + ' ' + text;

banner.appendChild(bannerContent);
moreSettings.appendChild(moreSettingsContent);
intaconsents.appendChild(banner);
intaconsents.appendChild(moreSettings);

setTimeout(() => {
    document.body.appendChild(intaconsents);
}, 200)

if (document.querySelector(".intastellarCCPAContainer") != null) {
    document.querySelector(".intastellarCCPAContainer").addEventListener("click", function () {
        document.querySelector(".intastellarCCPApopup").classList.toggle("--active");
    })
}


function onWindowLoad(callback) {
    window.addEventListener('load', callback);
}

onWindowLoad(function () {
    (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;
    const temp = location.host.split('.').reverse();
    const domain = encodeURI(temp[1] + '.' + temp[0]);
    const trImage = document.createElement("iframe");
    trImage.name = "intastellar-solutions-sharinglibrary-iframe";
    trImage.style.display = "none";
    trImage.title = "Intastellar Solutions cookie sharing library";
    trImage.src = intastellarCookieBannerRootDomain + "/cookieSharingIframe.html";

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
        document.querySelectorAll(".intLearnMoreBtn").forEach((btn) => {
            btn.addEventListener("click", function (e) {
                learnMore(this);
            })
        })

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
            /* if (window?.INTA?.settings.advanced === false || window?.INTA?.settings.advanced === "" || window?.INTA?.settings.advanced === undefined) { */
            document.querySelector("html").classList.remove("noScroll");
            if (document.querySelector(".intastellarCookieConstents") != null) {
                document.querySelector(".intastellarCookieConstents").classList.remove("--active");
            }
            /* } else {
                settings.classList.toggle("intastellarCookie-settings__container--expand");
            } */
        }

        document.querySelectorAll(".intastellarCookieBanner__settings").forEach((setting) => {
            setting.addEventListener("click", () => {
                let intCookieSettingsMore = document.querySelector(".intastellarCookieConstents");
                if (!intCookieSettingsMore?.classList.contains("--active")) {
                    intCookieSettingsMore?.classList.add("--active");
                    dataLayer.push({ 'event': 'intastellar_consents_widget_visible' });
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
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "et" || intastellarCookieLanguage === "et-EE") {
            settingsSaveLang.necessaryCookiesText = "Keeldu";
            settingsSaveLang.saveSettingsText = "Salvesta seaded";
        } else {
            settingsSaveLang.necessaryCookiesText = "Afvis";
            settingsSaveLang.saveSettingsText = "Gem";
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

        const ness = document.getElementsByClassName("intastellarCookieBanner__accpetNecssery");
        const all = document.getElementsByClassName("intastellarCookieSettings--acceptAll");
        const changePermission = document.querySelectorAll(".intastellarCookie-settings__btn.--changePermission");

        changePermission.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const intaCookieSettings = (getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents : intaConsentsObjectVariable.consents;
                const newIframe = document.createElement("iframe");
                let type = e.target.getAttribute("data-type");
                if (type === "intFunctionalCookies") {
                    intaCookieSettings.functionalCookies = "checked";
                    newIframe.src = e.target.parentElement.parentElement.parentElement.getAttribute("data-src");
                } else if (type === "intMarketingCookies") {
                    intaCookieSettings.advertisementCookies = "checked";
                    newIframe.src = e.target.parentElement.parentElement.parentElement.getAttribute("data-src");
                } else if (type === "intStaticsticCookies") {
                    intaCookieSettings.staticsticCookies = "checked";
                    newIframe.src = e.target.parentElement.parentElement.parentElement.getAttribute("data-src");
                }
                document.cookie = int_hideCookieBannerName + "=__inta1." + encodeIntaConsentsObject(JSON.stringify(intaCookieSettings), randomIntFromInterval(20, 34)) + "; expires=" + cookieLifeTime + "; path=/; " + intCookieDomain + "";

                const parent = e.target.parentElement.parentElement.parentElement.parentNode;
                /* setTimeout(() => {
                    parent.insertBefore(newIframe, e.target.parentElement.parentElement.parentElement);
                    // Step 3: Remove the existing element
                    console.log(JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents);
                }, 1000); */

                // Replace the old cookie with the new one
                //window.location.reload();
            });
        });

        document.querySelector(".--save").addEventListener("click", () => {
            const accepted = [];
            if (FunctionalCheckbox?.checked) {
                gtag('consent', 'update', {
                    'functionality_storage': 'granted',
                })
                accepted.push("functionalCookies");
            } else if (!FunctionalCheckbox?.checked) {
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
                    'ad_storage': 'granted',
                    'ad_user_data': 'granted',
                })
                window.clarity('consentV2', {
                    ad_Storage: "denied",
                    analytics_Storage: "granted"
                });
                accepted.push("staticsticCookies");
            } else if (!StaticsCheckBox?.checked) {
                gtag('consent', 'update', {
                    'analytics_storage': 'denied',
                })

                window.clarity('consentV2', {
                    ad_Storage: "denied",
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
                window.clarity('consentV2', {
                    ad_Storage: "granted",
                    analytics_Storage: "denied"
                });
                accepted.push("advertisementCookies");
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

                window.clarity('consent', false);

                const index = accepted.indexOf("advertisementCookies");
                if (index > -1) { // only splice array when item is found
                    accepted.splice(index, 1); // 2nd parameter means remove one item only
                }
            }
            saveINTCookieSettings("changePermission", accepted);
        });

        if (window?.INTA?.settings.ccpa !== undefined && window?.INTA?.settings.ccpa.on) {
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
                    functionalCookies: "checked",
                    advertisementCookies: "checked",
                };
                intaConsentsObjectVariable.time = new Date().getTime()
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
                document.querySelector(".intastellarCookieConstents").classList.toggle("--active");
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
                window.clarity('consentV2', {
                    ad_Storage: "granted",
                    analytics_Storage: "granted"
                });
                dataLayer.push({ 'event': 'cookie_consent_update', 'cookie_consent': intaConsentsObjectVariable.consents });

                window._hsp.push(['setHubSpotConsent', {
                    analytics: true,
                    advertisement: true,
                    functionality: true,
                }]);
                updateConsents("all");
                /*window.location.reload();*/
            });
        }

        if (button__acceptAll != null || button__acceptAll != undefined) {
            button__acceptAll.addEventListener("click", function () {

                var cV = 1;
                intaConsentsObjectVariable.consents = {
                    staticsticCookies: "checked",
                    functionalCookies: "checked",
                    advertisementCookies: "checked",
                };
                intaConsentsObjectVariable.time = new Date().getTime()
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
                var addedNodes = document.getElementsByTagName("script");
                for (var i = 0; i < addedNodes.length; i++) {
                    addedNodes.type = "";
                }
                document.querySelector("html").classList.toggle("noScroll");
                document.querySelector(".intastellarCookieConstents").classList.toggle("--active");
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
                window.clarity('consentV2', {
                    ad_Storage: "granted",
                    analytics_Storage: "granted"
                });
                dataLayer.push({ 'event': 'cookie_consent_update', 'cookie_consent': intaConsentsObjectVariable.consents });
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
                intaConsentsObjectVariable.time = new Date().getTime()
                var cV = 1;
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
                document.querySelector(".intastellarCookieConstents").classList.toggle("--active");
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
                window.clarity('consentV2', {
                    ad_Storage: "granted",
                    analytics_Storage: "granted"
                });
                dataLayer.push({ 'event': 'cookie_consent_update', 'cookie_consent': intaConsentsObjectVariable.consents });
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

            if (window?.INTA?.settings.advanced === false || window?.INTA?.settings.advanced === "" || window?.INTA?.settings.advanced === undefined) {
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
                        dataLayer.push({ 'event': 'intastellar_consents_widget_visible' });
                    });
                })
            }
            if (window?.INTA?.settings.advanced) {
                closeSettings.addEventListener("click", function () {
                    let settings = document.querySelector(".intastellarCookie-settings__container");
                    settings.classList.toggle("intastellarCookie-settings__container--expand");
                })
            }

            ness.forEach((n) => {
                n.addEventListener("click", function () {

                    intaConsentsObjectVariable.consents = {
                        staticsticCookies: false,
                        functionalCookies: false,
                        advertisementCookies: false,
                    };
                    intaConsentsObjectVariable.time = new Date().getTime()
                    var cV = 1;
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
                    document.querySelector(".intastellarCookieConstents").classList.toggle("--active");
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
                    window.uetq.push('consent', 'update', {
                        'ad_storage': 'denied'
                    });
                    dataLayer.push({ 'event': 'cookie_consent_update', 'cookie_consent': intaConsentsObjectVariable.consents });
                    updateConsents("denied");

                    window._hsp.push(['doNotTrack']);
                    window._hsp.push(['revokeCookieConsent']);
                    window._hsp.push(['setHubSpotCookieConsent', {
                        analytics: false,
                        advertisement: false,
                        functionality: false,
                    }]);
                    window.clarity('consent', false);
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
                        functionalCookies: "checked",
                        advertisementCookies: "checked",
                    };
                    intaConsentsObjectVariable.time = new Date().getTime()
                    var cV = 1;
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

                    var addedNodes = document.getElementsByTagName("script");
                    for (var i = 0; i < addedNodes.length; i++) {
                        addedNodes.type = "";
                    }



                    document.querySelector("html").classList.toggle("noScroll");
                    document.querySelector(".intastellarCookieConstents").classList.toggle("--active");
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
                    window.uetq.push('consent', 'update', {
                        'ad_storage': 'granted'
                    });
                    window.clarity('consentV2', {
                        ad_Storage: "granted",
                        analytics_Storage: "granted"
                    });
                    dataLayer.push({ 'event': 'cookie_consent_update', 'cookie_consent': intaConsentsObjectVariable.consents });
                    updateConsents("all");

                    window._hsp.push(['doNotTrack', false]);
                    window._hsp.push(['setHubSpotCookieConsent', {
                        analytics: true,
                        advertisement: true,
                        functionality: true,
                    }]);

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
            /*  if (document.querySelector(".intastellarCookieBanner") == null || document.querySelector(".intastellarCookieBanner") == undefined) {
                 if (window?.INTA?.settings.advanced === false || window?.INTA?.settings.advanced === "" || window?.INTA?.settings.advanced === undefined) {
                     debugger;
                     document.querySelector("html").classList.toggle("noScroll");
                     document.querySelector(".intastellarCookieConstents").classList.toggle("--active");
                 } else {
                     settings.classList.toggle("intastellarCookie-settings__container--expand");
                 }
             } */

            if (window?.INTA?.settings.advanced) {
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
                        dataLayer.push({ 'event': 'intastellar_consents_widget_visible' });
                    });
                })
            }
            if (window?.INTA?.settings.advanced) {
                closeSettings.addEventListener("click", function () {
                    let settings = document.querySelector(".intastellarCookie-settings__container");
                    settings.classList.toggle("intastellarCookie-settings__container--expand");
                })
            }

            ness.forEach((n) => {
                n.addEventListener("click", function () {
                    intaConsentsObjectVariable.consents = {
                        staticsticCookies: false,
                        functionalCookies: false,
                        advertisementCookies: false,
                    };
                    intaConsentsObjectVariable.time = new Date().getTime()
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName + "=__inta1." + encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable), randomIntFromInterval(20, 34)) + "; expires=" + cookieLifeTime +
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
                    dataLayer.push({ 'event': 'intastellar_consents_widget_visible' });

                    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                        .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");
                    document.querySelector("#marketing").checked = false;
                    document.querySelector("#statics").checked = false;
                    document.querySelector("#functional").checked = false;

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
                    window._hsp.push(['doNotTrack']);
                    window._hsp.push(['revokeCookieConsent']);
                    window._hsp.push(['setHubSpotCookieConsent', {
                        analytics: false,
                        advertisement: false,
                        functionality: false,
                    }]);
                    window.clarity('consent', false);

                    dataLayer.push({ 'event': 'cookie_consent_update', 'cookie_consent': intaConsentsObjectVariable.consents });
                    /*window.location.reload();*/
                });
            });

            all.forEach((a) => {
                a.addEventListener("click", function () {

                    var cV = 1;

                    intaConsentsObjectVariable.consents = {
                        staticsticCookies: "checked",
                        functionalCookies: "checked",
                        advertisementCookies: "checked",
                    };
                    intaConsentsObjectVariable.time = new Date().getTime()

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

                    var addedNodes = document.getElementsByTagName("script");
                    for (var i = 0; i < addedNodes.length; i++) {
                        addedNodes.type = "";
                    }
                    document.querySelector("html").classList.toggle("noScroll");
                    document.querySelector(".intastellarCookieConstents").classList.toggle("--active");
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
                    window.uetq.push('consent', 'update', {
                        'ad_storage': 'granted'
                    });

                    window._hsp.push(['doNotTrack', false]);
                    window._hsp.push(['setHubSpotCookieConsent', {
                        analytics: true,
                        advertisement: true,
                        functionality: true,
                    }]);

                    window.clarity('consentV2', {
                        ad_Storage: "granted",
                        analytics_Storage: "granted"
                    });

                    dataLayer.push({ 'event': 'cookie_consent_update', 'cookie_consent': intaConsentsObjectVariable.consents });
                    updateConsents("all");
                    document.querySelector("#marketing").checked = true;
                    document.querySelector("#statics").checked = true;
                    document.querySelector("#functional").checked = true;
                    /*window.location.reload();*/
                })
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
            </ >
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
    var cookies = document.cookie.split(';');
    var ret = '';
    for (var i = 1; i <= cookies.length; i++) {
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
    var links = document.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++) {
        if (links[i].href.substr(-file.length) == file)
            return true;
    }

    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
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
    return '<button class="intastellarCookie-settings__btn --bg intastellarCookieSettings--acceptAll">' + allCookiesText + '</button>'
        + '<button class="intastellarCookie-settings__btn intastellarCookieBanner__accpetNecssery">' + necessaryCookiesText + '</button>'
        + '<button class="intastellarCookie-settings__btn intastellarCookieBanner__settings">' + cookieSettingsText + '</button>';
}

function generateCookieSettingsButton(settingsText, allCookiesText) {
    return '<section class="intSettingsButton"><button class="intastellarCookie-settings__btn intastellarCookieBanner__settings --save">' + settingsText + '</button>'
        + '<button class="intastellarCookie-settings__btn --noBorderRadius --bg intastellarCookieSettings--acceptAll">' + allCookiesText + '</button></section>'
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
    }

    /*  if (consent == "all" || type.length > 0 && type.includes("advertisementCookies")) {
         (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;
         (adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 0;
         (adsbygoogle = window.adsbygoogle || []).push({});
     } else {
         (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 1;
         (adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;
     } */

    if (type.length > 0) {
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
        let newArray = [...inta_statisticCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray);
        deleteAllCookies();

        window.allScripts.map((script) => {
            console.log(script);
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
    document.querySelector("html").classList.remove("noScroll");
    document.querySelector(".intastellarCookieConstents").classList.remove("--active");
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
        window.clarity('consentV2', {
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
        window.clarity('consent', false);
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

        window.clarity('consent', false);

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
        window.clarity('consent', false);
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
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'url_passthrough': true,
        })
        window._hsp.push(['doNotTrack', false]);
        window.clarity('consentV2', {
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

        window._hsp.push(['doNotTrack']);
        window._hsp.push(['revokeCookieConsent']);
        gtag('consent', 'update', {
            'analytics_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'url_passthrough': true,
        })

        window.uetq.push('consent', 'update', {
            'ad_storage': 'denied'
        });
        window.clarity('consent', false);

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
    dataLayer.push({ 'event': 'cookie_consent_update', 'cookie_consent': intaConsentsObjectVariable.consents });
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
    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
        .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");
}