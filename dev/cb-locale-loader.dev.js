/**
 * CMP locale loader + generic banner UI builder (one template, per-locale data files).
 * Locale scripts set `window.__intaCmpLocalePayload` before cb.js runs when preloaded from uc.js.
 */
(function () {
    var LOCALE_SLUG_MAP = {
        danish: "da", da: "da", "da-dk": "da",
        english: "en", en: "en", "en-us": "en", "en-gb": "en",
        german: "de", de: "de", "de-de": "de",
        spanish: "es", es: "es", "es-es": "es",
        french: "fr", fr: "fr", "fr-fr": "fr",
        swedish: "sv", sv: "sv", "sv-se": "sv",
        norwegian: "no", no: "no", "no-no": "no",
        dutch: "nl", nl: "nl", "nl-nl": "nl",
        italian: "it", it: "it", "it-it": "it",
        finnish: "fi", fi: "fi", "fi-fi": "fi",
        russian: "ru", ru: "ru", "ru-ru": "ru",
        polish: "pl", pl: "pl", "pl-pl": "pl",
        portuguese: "pt", pt: "pt", "pt-pt": "pt",
        chinese: "zh", zh: "zh", "zh-cn": "zh",
        japanese: "ja", ja: "ja", "ja-jp": "ja",
        korean: "ko", ko: "ko", "ko-kr": "ko",
        turkish: "tr", tr: "tr", "tr-tr": "tr",
        czech: "cs", cs: "cs", "cs-cz": "cs",
        hungarian: "hu", hu: "hu", "hu-hu": "hu",
        greek: "el", el: "el", "el-gr": "el",
        arabic: "ar", ar: "ar", "ar-sa": "ar",
        hindi: "hi", hi: "hi", "hi-in": "hi",
        thai: "th", th: "th", "th-th": "th",
        afrikaans: "af", af: "af", "af-za": "af",
        bulgarian: "bg", bg: "bg", "bg-bg": "bg",
        romanian: "ro", ro: "ro", "ro-ro": "ro",
        hebrew: "he", he: "he", "he-il": "he",
        ukrainian: "uk", uk: "uk", "uk-ua": "uk",
        estonian: "et", et: "et", "et-ee": "et",
        vietnamese: "vi", vi: "vi", "vi-vn": "vi",
        indonesian: "id", id: "id", "id-id": "id",
        malay: "ms", ms: "ms", "ms-my": "ms"
    };

    function intaNormalizeLocaleToken(v) {
        return String(v == null ? "" : v).trim().toLowerCase().replace(/_/g, "-");
    }

    window.intaResolveCmpLocaleSlug = function intaResolveCmpLocaleSlug() {
        var settings = window.INTA && window.INTA.settings;
        if (settings && settings.locale) {
            var forced = intaNormalizeLocaleToken(settings.locale);
            if (LOCALE_SLUG_MAP[forced]) {
                return LOCALE_SLUG_MAP[forced];
            }
            if (/^[a-z]{2}(-[a-z]{2})?$/.test(forced)) {
                return forced.split("-")[0];
            }
        }
    if (settings && settings.language) {
        var fromSetting = intaNormalizeLocaleToken(settings.language);
        if (fromSetting !== "auto" && fromSetting !== "") {
            if (LOCALE_SLUG_MAP[fromSetting]) {
                return LOCALE_SLUG_MAP[fromSetting];
            }
        }
    }
        var browser = intaNormalizeLocaleToken(
            (typeof intastellarCookieLanguage !== "undefined" && intastellarCookieLanguage)
                ? intastellarCookieLanguage
                : (navigator.language || navigator.userLanguage || "en")
        );
        if (LOCALE_SLUG_MAP[browser]) {
            return LOCALE_SLUG_MAP[browser];
        }
        var short = browser.split("-")[0];
        if (LOCALE_SLUG_MAP[short]) {
            return LOCALE_SLUG_MAP[short];
        }
        return "en";
    };

    window.intaCmpLocaleScriptUrl = function intaCmpLocaleScriptUrl(slug) {
        var settings = window.INTA && window.INTA.settings;
        var template = settings && settings.localeUrl;
        if (typeof template === "string" && template.indexOf("{locale}") !== -1) {
            return template.replace(/\{locale\}/g, slug);
        }
        if (typeof intastellarDevMode !== "undefined" && intastellarDevMode) {
            return "../../dev/languages/" + slug + ".dev.js";
        }
        return "https://consents.cdn.intastellarsolutions.com/languages/" + slug + ".js";
    };

    window.intaLoadCmpLocaleScript = function intaLoadCmpLocaleScript(slug) {
        slug = slug || window.intaResolveCmpLocaleSlug();
        if (window.__intaCmpLocalePayload && window.__intaCmpLocalePayload.slug === slug) {
            return Promise.resolve(true);
        }
        return new Promise(function (resolve) {
            var done = false;
            function finish(ok) {
                if (done) {
                    return;
                }
                done = true;
                resolve(!!ok);
            }
            var s = document.createElement("script");
            s.async = true;
            s.src = window.intaCmpLocaleScriptUrl(slug);
            s.onload = function () {
                finish(window.__intaCmpLocalePayload && window.__intaCmpLocalePayload.slug === slug);
            };
            s.onerror = function () {
                finish(false);
            };
            var head = document.head || document.getElementsByTagName("head")[0];
            if (head) {
                head.appendChild(s);
            } else {
                finish(false);
            }
            setTimeout(function () {
                finish(window.__intaCmpLocalePayload && window.__intaCmpLocalePayload.slug === slug);
            }, 4000);
        });
    };

    window.intaBuildCmpUiFromLocale = function intaBuildCmpUiFromLocale(P) {
        if (!P || !P.categories) {
            if (typeof intastellarDevMode !== "undefined" && intastellarDevMode) {
                console.warn("[intaCmpLocale] Missing locale payload or categories", P);
            }
            return false;
        }
        try {
        var C = P.categories;
        var policyLabel = P.policyLinkLabel || "Privacy and cookie policy";
        var acceptShort = P.acceptShortLabel || P.acceptLabel || "Accept";
        var wrapStart = "<div class='intastellarCookie-settings__contentConatiner'><p>";
        var wrapEnd = "</p></div>";
        var builtSettingsMessage = (P.settingsMessage || "")
            + generatePolicyUrl(policyLabel)
            + (P.settingsMessageSuffix || "")
            + (window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "");
        var builtMessage =
            wrapStart
            + (P.bannerMessage || "")
            + wrapEnd
            + generatePolicyUrl(policyLabel)
            + (window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "");
        var builtCookieBtn = generateCookieButtons(P.acceptLabel || "Accept", P.declineLabel || "Decline", P.settingsLabel || "Settings");
        intastellarShowHideDetailsText = P.showHideDetails || "Show details";
        if (P.cookieSettingsLabel) {
            intastellarCookieLanguageSettings = P.cookieSettingsLabel;
        }
        if (typeof bannerContent !== "undefined" && bannerContent && P.cookieSettingsLabel) {
            bannerContent.setAttribute("title", P.cookieSettingsLabel);
        }
        intastellarCookieButtons.innerHTML = '<section class="intCookieSaveSettingsContainer">'
            + ((window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "")
                ? '<img class="intSettingsCompanyLogo" src="' + window.INTA.settings.logo + '" alt="Intastellar Solutions, International">' : "")
            + generateCookieSettingsButton(C.saveSettings, acceptShort)
            + '<button class="intLearnMoreBtn" onclick="learnMore(this)">' + intastellarShowHideDetailsText + '</button>'
            + '<button class="openVendorList" onclick="openVendorList()">' + intaVendorListButtonLabel() + '</button>'
            + (window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")
            + "</section>";
        moreFooter.innerHTML = intaBuildCmpSettingsFooterHtml(C);
        window.intaCmpUiState = {
            message: builtMessage,
            cookieBtn: builtCookieBtn,
            settingsMessage: builtSettingsMessage
        };
        window.__intaCmpLocaleApplied = true;
        return true;
        } catch (err) {
            if (typeof intastellarDevMode !== "undefined" && intastellarDevMode) {
                console.error("[intaCmpLocale] Failed to build banner UI from locale", err);
            }
            return false;
        }
    };

    window.intaBuildCmpSettingsFooterHtml = function intaBuildCmpSettingsFooterHtml(C) {
        var uidHtml = "<p>ID: " + ((getCookie(int_hideCookieBannerName))
            ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName).split(".")[2])).uid
            : intaConsentsObjectVariable.uid) + "</p>";
        return '<article class="intCookieSetting__form">'
            + '<section class="intastellarSettings__control"><label class="intSettingDisabled checkMarkContainer">'
            + '<span class="intSettingsTitle">' + C.necessary.title + '</span>'
            + '<span class="intCheckmarkSliderContainer"><input class="intCookieSetting__checkbox" type="checkbox" disabled checked><span class="checkmark round"></span></span></label></section>'
            + '<section class="intastellarSettings__control"><label class="checkMarkContainer">'
            + '<span class="intSettingsTitle">' + C.functional.title + '</span>'
            + '<span class="intCheckmarkSliderContainer"><input onchange="updateSaveButtonText()" class="intCookieSetting__checkbox" id="functional" type="checkbox" '
            + intaConsentCheckboxAttr("functionalCookies") + '><span class="checkmark round"></span></span></label></section>'
            + '<section class="intastellarSettings__control"><label class="checkMarkContainer">'
            + '<span class="intSettingsTitle">' + C.statisic.title + '</span>'
            + '<span class="intCheckmarkSliderContainer"><input onchange="updateSaveButtonText()" class="intCookieSetting__checkbox" id="statics" type="checkbox" '
            + intaConsentCheckboxAttr("staticsticCookies") + '><span class="checkmark round"></span></span></label></section>'
            + '<section class="intastellarSettings__control"><label class="checkMarkContainer">'
            + '<span class="intSettingsTitle">' + C.marketing.title + '</span>'
            + '<span class="intCheckmarkSliderContainer"><input onchange="updateSaveButtonText()" class="intCookieSetting__checkbox" id="marketing" type="checkbox" '
            + intaConsentCheckboxAttr("advertisementCookies") + '><span class="checkmark round"></span></span></label></section>'
            + "</article>"
            + '<section class="intastellar_privacyPolicy"></section>'
            + '<article class="intReadMore">'
            + '<section class="required">' + uidHtml
            + '<h3 class="intaExpandCookieList">' + C.necessary.title + ' <i class="intastellar__arrow"></i></h3><p>' + C.necessary.description + '</p>'
            + '<article class="intaCookieListOverview">' + listAllCookies(inta_requiredCookieList) + "</article></section>"
            + "<section><h3 class=\"intaExpandCookieList\">" + C.functional.title + ' <i class="intastellar__arrow"></i></h3><p>' + C.functional.description + '</p>'
            + '<article class="intaCookieListOverview">' + listAllCookies(inta_functionalCookieList) + "</article></section>"
            + "<section><h3 class=\"intaExpandCookieList\">" + C.statisic.title + ' <i class="intastellar__arrow"></i></h3><p>' + C.statisic.description + '</p>'
            + '<article class="intaCookieListOverview">' + listAllCookies(inta_statisticCookieList) + "</article></section>"
            + "<section><h3 class=\"intaExpandCookieList\">" + C.marketing.title + ' <i class="intastellar__arrow"></i></h3><p>' + C.marketing.description + '</p>'
            + '<article class="intaCookieListOverview">' + listAllCookies(inta_marketingCookieList) + "</article></section>"
            + "</article>";
    };

    window.intaTryApplyPreloadedCmpLocale = function intaTryApplyPreloadedCmpLocale() {
        var settings = window.INTA && window.INTA.settings;
        if (settings && settings.localeSplit === false) {
            return false;
        }
        if (window.__intaCmpLocalePayload && typeof window.intaBuildCmpUiFromLocale === "function") {
            return window.intaBuildCmpUiFromLocale(window.__intaCmpLocalePayload);
        }
        return false;
    };

    window.intaBuildCmpEnFallbackPayload = function intaBuildCmpEnFallbackPayload() {
        var L = window.intastellarSupportedLanguages && window.intastellarSupportedLanguages.english;
        if (!L) {
            return null;
        }
        var arrangeWord = (window.INTA && window.INTA.settings && window.INTA.settings.arrange == "ltr") ? "left" : "right";
        return {
            slug: "en",
            cookieSettingsLabel: "Cookie Settings",
            showHideDetails: "Show details",
            acceptLabel: "Accept",
            acceptShortLabel: "Accept",
            declineLabel: "Decline All",
            settingsLabel: "Settings",
            policyLinkLabel: "Our Privacy and cookie Policy",
            bannerMessage: "By accepting all cookies, you support " + document.domain + " in developing a better solution for you. </p><p> Select whether you want to allow only the necessary cookies or whether you want to allow all cookies.",
            settingsMessage: '<h3 style="    font-size: 25px;">You´re in control</h3>'
                + "<p>We and our trusted partners use technologies, such as cookies, to collect information for various purposes, including:</p>"
                + "<ol><li>Functionality</li><li>Analytics</li><li>Advertising</li></ol>"
                + "<p>By clicking 'Accept', you consent to all of these purposes. Alternatively, you can select the specific purposes you agree to by ticking the checkboxes and clicking 'Save Settings'.</p>"
                + "<p>You can withdraw your consent at any time by clicking the small icon in the bottom " + arrangeWord + " corner of the website.</p>",
            settingsMessageSuffix: (window.INTA && window.INTA.settings && window.INTA.settings.popia ? '<button onclick="showPOPIAModal()" class="intastellarCookie-settings__privacyLink">Your Privacy Rights POPIA</button>' : "")
                + (window.INTA && window.INTA.settings && window.INTA.settings.lgpd ? '<button onclick="showLGPDModal()" class="intastellarCookie-settings__privacyLink">Your Privacy Rights LGPD</button>' : "")
                + '<button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International privacy policy</button>',
            categories: L
        };
    };

    window.intaEnsureCmpLocaleApplied = function intaEnsureCmpLocaleApplied() {
        if (window.__intaCmpLocalePayload && typeof window.intaBuildCmpUiFromLocale === "function") {
            if (window.intaBuildCmpUiFromLocale(window.__intaCmpLocalePayload)) {
                return true;
            }
        }
        var fallback = window.intaBuildCmpEnFallbackPayload();
        if (fallback && typeof window.intaBuildCmpUiFromLocale === "function") {
            window.__intaCmpLocalePayload = fallback;
            return window.intaBuildCmpUiFromLocale(fallback);
        }
        return false;
    };
})();
