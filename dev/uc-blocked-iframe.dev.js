/**
 * Lazy-loaded blocked-iframe copy (content + accept-button labels per locale/script type).
 * Loaded on first iframe/embed block via loadUcBlockedIframeMessages() in uc.js.
 */
(function () {
    var SCRIPT_TYPE_LABELS = {
        marketing: {
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
            hebrew: "שיווק"
        },
        functional: {
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
            hebrew: "פונקציונלי"
        },
        statics: {
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
            hebrew: "סטטיסטי"
        }
    };

    var CONTENT_TEMPLATES = {
        danish: function (domain) { return "<p>Dette indhold leveres af " + domain + ".</p>"; },
        english: function (domain) { return "<p>This content is provided by " + domain + ".</p>"; },
        german: function (domain) { return "<p>Dieser Inhalt wird von " + domain + " bereitgestellt.</p>"; },
        spanish: function (domain) { return "<p>Este contenido es proporcionado por " + domain + ".</p>"; },
        swedish: function (domain) { return "<p>Denna innehåll tillhandahålls av " + domain + ".</p>"; },
        french: function (domain) { return "<p>Ce contenu est fourni par " + domain + ".</p>"; },
        portuguese: function (domain) { return "<p>Este conteúdo é fornecido por " + domain + ".</p>"; },
        italian: function (domain) { return "<p>Questo contenuto è fornito da " + domain + ".</p>"; },
        russian: function (domain) { return "<p>Этот контент предоставлен " + domain + ".</p>"; },
        norwegian: function (domain) { return "<p>Dette innholdet leveres av " + domain + ".</p>"; },
        finish: function (domain) { return "<p>Tämä sisältö toimitetaan " + domain + ".</p>"; },
        dutch: function (domain) { return "<p>Deze inhoud wordt geleverd door " + domain + ".</p>"; },
        polish: function (domain) { return "<p>Ta zawartość jest dostarczana przez " + domain + ".</p>"; },
        afrikaans: function (domain) { return "<p>Hierdie inhoud word verskaf deur " + domain + ".</p>"; },
        arabic: function (domain) { return "<p>هذا المحتوى مقدم من " + domain + ".</p>"; },
        hindi: function (domain) { return "<p>यह सामग्री " + domain + " द्वारा प्रदान की गई है।</p>"; },
        turkish: function (domain) { return "<p>Bu içerik " + domain + " tarafından sağlanmaktadır.</p>"; },
        japanese: function (domain) { return "<p>このコンテンツは" + domain + "によって提供されています。</p>"; },
        korean: function (domain) { return "<p>이 콘텐츠는 " + domain + "에서 제공됩니다.</p>"; },
        thai: function (domain) { return "<p>เนื้อหานี้จัดทำโดย " + domain + ".</p>"; },
        vietnamese: function (domain) { return "<p>Nội dung này được cung cấp bởi " + domain + ".</p>"; },
        indonesian: function (domain) { return "<p>Konten ini disediakan oleh " + domain + ".</p>"; },
        filipino: function (domain) { return "<p>Ang nilalamang ito ay ibinibigay ng " + domain + ".</p>"; },
        malay: function (domain) { return "<p>Kandungan ini disediakan oleh " + domain + ".</p>"; },
        ukrainian: function (domain) { return "<p>Цей контент надається " + domain + ".</p>"; },
        hebrew: function (domain) { return "<p>תוכן זה מסופק על ידי " + domain + ".</p>"; }
    };

    function labelFor(scriptType, localeKey) {
        var bucket = SCRIPT_TYPE_LABELS[scriptType] || SCRIPT_TYPE_LABELS.marketing;
        return bucket[localeKey] || bucket.english || "marketing";
    }

    function buildButtonText(scriptType, localeKey) {
        var label = labelFor(scriptType, localeKey);
        var fallbackLabel = labelFor(scriptType, "danish");
        switch (localeKey) {
            case "spanish":
                return "Aceptar cookies " + label;
            case "french":
                return "Accepter les cookies " + label;
            case "portuguese":
                return "Aceitar cookies " + label;
            case "italian":
                return "Accetta i cookie " + label;
            case "russian":
                return "Принять файлы cookie " + label;
            case "norwegian":
                return "Aksepter " + fallbackLabel + " cookies";
            case "finish":
                return "Hyväksy " + fallbackLabel + " evästeet";
            case "dutch":
                return "Accepteer " + fallbackLabel + " cookies";
            case "polish":
                return "Akceptuj pliki cookie " + label;
            case "afrikaans":
                return "Aanvaar " + label + " koekies";
            case "arabic":
                return "قبول ملفات تعريف الارتباط " + label;
            case "hindi":
                return "स्वीकार करें " + label + " कुकीज़";
            case "turkish":
                return "Kabul et " + label + " çerezleri";
            case "japanese":
                return "クッキーを受け入れる " + label;
            case "korean":
                return "쿠키 수락 " + label;
            case "thai":
                return "ยอมรับคุกกี้ " + label;
            case "vietnamese":
                return "Chấp nhận cookie " + label;
            case "indonesian":
                return "Terima cookie " + label;
            case "filipino":
                return "Tanggapin ang cookies " + label;
            case "malay":
                return "Terima kuki " + label;
            case "chinese":
                return "接受 " + label + " cookies";
            case "ukrainian":
                return "Прийняти файли cookie " + label;
            case "hebrew":
                return "קבל עוגיות " + label;
            case "german":
                return "Akzeptiere " + label + " cookies";
            case "swedish":
                return "Acceptera " + label + " cookies";
            case "english":
                return "Accept " + label + " cookies";
            case "danish":
            default:
                return "Accepter " + label + " cookies";
        }
    }

    var BROWSER_LANG_TO_KEY = {
        da: "danish", "da-dk": "danish",
        en: "english", "en-us": "english", "en-gb": "english",
        de: "german", "de-de": "german",
        es: "spanish", "es-es": "spanish",
        fr: "french", "fr-fr": "french",
        it: "italian", "it-it": "italian",
        ru: "russian", "ru-ru": "russian",
        sv: "swedish", "sv-se": "swedish",
        no: "norwegian", "no-no": "norwegian",
        nl: "dutch", "nl-nl": "dutch",
        fi: "finish", "fi-fi": "finish",
        he: "hebrew", "he-il": "hebrew",
        ar: "arabic", "ar-sa": "arabic",
        hi: "hindi", "hi-in": "hindi",
        tr: "turkish", "tr-tr": "turkish",
        ja: "japanese", "ja-jp": "japanese",
        ko: "korean", "ko-kr": "korean",
        th: "thai", "th-th": "thai",
        vi: "vietnamese", "vi-vn": "vietnamese",
        id: "indonesian", "id-id": "indonesian",
        tl: "filipino", "tl-ph": "filipino",
        ms: "malay", "ms-my": "malay",
        pl: "polish", "pl-pl": "polish",
        af: "afrikaans", "af-za": "afrikaans",
        pt: "portuguese", "pt-pt": "portuguese",
        pr: "portuguese", "pr-pt": "portuguese",
        zh: "chinese", "zh-cn": "chinese",
        uk: "ukrainian", "uk-ua": "ukrainian",
        danish: "danish", english: "english", german: "german", spanish: "spanish",
        french: "french", italian: "italian", russian: "russian", swedish: "swedish",
        norwegian: "norwegian", dutch: "dutch", finnish: "finish", finish: "finish"
    };

    window.__intaResolveBlockedIframeLocaleKey = function intaResolveBlockedIframeLocaleKey() {
        var raw = typeof intastellarCookieLanguage !== "undefined" && intastellarCookieLanguage
            ? String(intastellarCookieLanguage).trim().toLowerCase().replace(/_/g, "-")
            : "en";
        if (BROWSER_LANG_TO_KEY[raw]) {
            return BROWSER_LANG_TO_KEY[raw];
        }
        var short = raw.split("-")[0];
        if (BROWSER_LANG_TO_KEY[short]) {
            return BROWSER_LANG_TO_KEY[short];
        }
        return "danish";
    };

    window.__intaBlockedIframeContentMessage = function intaBlockedIframeContentMessage(domain, localeKey) {
        localeKey = localeKey || window.__intaResolveBlockedIframeLocaleKey();
        var tpl = CONTENT_TEMPLATES[localeKey] || CONTENT_TEMPLATES.danish;
        return tpl(domain);
    };

    window.__intaBlockedIframeButtonText = function intaBlockedIframeButtonText(scriptType, localeKey) {
        localeKey = localeKey || window.__intaResolveBlockedIframeLocaleKey();
        return buildButtonText(scriptType, localeKey);
    };
})();
