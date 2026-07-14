(function () {
    var categories = {
    saveSettings: "Ablehnen",
    necessary: {
        title: "Erforderliche",
        description: "Erforderliche Webtechnologien und Cookies sind notwendig, um unsere Website für Sie zugänglich und funktionsfähig zu machen. Sie gewährleisten grundlegende Funktionen wie die Navigation auf der Seite, die korrekte Anzeige im Browser und das Einholen Ihrer Einwilligung. Ohne diese Technologien und Cookies ist die Nutzung unserer Website nicht möglich."
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
    }
};
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
        categories: categories
    };
})();
