(function () {
    var L = window.intastellarSupportedLanguages && window.intastellarSupportedLanguages.norwegian;
    if (!L) {
        return;
    }
    var arrangeWord = (window.INTA && window.INTA.settings && window.INTA.settings.arrange == "ltr") ? "venstre" : "høyre";
    window.__intaCmpLocalePayload = {
        slug: "no",
        cookieSettingsLabel: "Informasjonskapselinnstillinger",
        showHideDetails: "Vis detaljer",
        acceptLabel: "Godta",
        acceptShortLabel: "Godta",
        declineLabel: "Avslå",
        settingsLabel: "Innstillinger",
        policyLinkLabel: "Vår personvern- og informasjonskapsler",
        bannerMessage: "Ved å akseptere alle informasjonskapsler støtter du " + document.domain + " i å utvikle en bedre løsning for deg.</p><p>Velg om du vil tillate bare nødvendige informasjonskapsler eller om du vil tillate alle informasjonskapsler.",
        settingsMessage: "<h3 style=\"    font-size: 25px;\">Du har kontrollen</h3>"
            + "<p>Vi og våre forretningspartnere bruker teknologi, inkludert informasjonskapsler, for å samle inn informasjon om deg for ulike formål, inkludert:</p>"
            + "<ol>"
            + "<li>Funksjonell</li>"
            + "<li>Statistikk</li>"
            + "<li>Markedsføring</li>"
            + "</ol>"
            + "<p>Ved å klikke på \"Godta\", gir du ditt samtykke til alle disse formålene. Du kan også velge å spesifisere formålene du samtykker til ved å krysse av i boksen ved siden av formålet og klikke på \"Lagre innstillinger\".</p>"
            + "<p>Du kan når som helst trekke tilbake ditt samtykke ved å klikke på det lille ikonet nederst " + arrangeWord + " hjørne av nettsiden.</p>",
        settingsMessageSuffix: (window.INTA && window.INTA.settings && window.INTA.settings.popia ? '<button onclick="showPOPIAModal()" class="intastellarCookie-settings__privacyLink">Your Privacy Rights POPIA</button>' : "")
            + (window.INTA && window.INTA.settings && window.INTA.settings.lgpd ? '<button onclick="showLGPDModal()" class="intastellarCookie-settings__privacyLink">Your Privacy Rights LGPD</button>' : "")
            + '<button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International personvernpolicy</button>',
        categories: L
    };
})();
