(function () {
    var L = window.intastellarSupportedLanguages && window.intastellarSupportedLanguages.german;
    if (!L) {
        return;
    }
    var arrangeWord = (window.INTA && window.INTA.settings && window.INTA.settings.arrange == "ltr") ? "linken" : "rechten";
    window.__intaCmpLocalePayload = {
        slug: "de",
        cookieSettingsLabel: "Cookie Einstellungen",
        showHideDetails: "Details einblenden",
        acceptLabel: "Akzeptieren",
        acceptShortLabel: "Akzeptieren",
        declineLabel: "Ablehnen",
        settingsLabel: "Einstellungen",
        policyLinkLabel: "Unsere Datenschutz Erklährung und Cookie politik",
        bannerMessage: "Wenn Sie auf akzeptieren klicken, unterstützen Sie " + document.domain + " bei der Weiterentwicklung von unserer Webseite.</p><p>Wählen Sie zwischen alle Cookies akzeptieren oder Ablehnen.",
        settingsMessage: "<h3 style=\"    font-size: 25px;\">Sie haben die Kontrolle über Ihre Daten</h3>"
            + "<p>Wir und unsere Geschäftspartner nutzen Technologien wie Cookies dazu, personenbezogene Informationen für verschiedene Zwecke zu sammeln, darunter:</p>"
            + "<ol>"
            + "<li>Funktion</li>"
            + "<li>Statistik</li>"
            + "<li>Werbung</li>"
            + "</ol>"
            + "<p>Wenn Sie auf „Akzeptieren“ klicken, erteilen Sie Ihre Einwilligung für alle diese Zwecke. Sie können auch entscheiden, welchen Zwecken Sie zustimmen, indem Sie das Kästchen neben dem Zweck anklicken und auf „Speichern“ klicken.</p>"
            + "<p>Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie auf das kleine Symbol unten in der " + arrangeWord + " Ecke klicken.</p>",
        settingsMessageSuffix: (window.INTA && window.INTA.settings && window.INTA.settings.popia ? '<button onclick="showPOPIAModal()" class="intastellarCookie-settings__privacyLink">Ihre Privatsphäre Rechte POPIA</button>' : "")
            + (window.INTA && window.INTA.settings && window.INTA.settings.lgpd ? '<button onclick="showLGPDModal()" class="intastellarCookie-settings__privacyLink">Ihre Privatsphäre Rechte LGPD</button>' : "")
            + '<button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International Datenschutz erklährung</button>',
        categories: L
    };
})();
