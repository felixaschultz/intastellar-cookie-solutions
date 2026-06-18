(function () {
    var L = window.intastellarSupportedLanguages && window.intastellarSupportedLanguages.finnish;
    if (!L) {
        return;
    }
    var arrangeWord = (window.INTA && window.INTA.settings && window.INTA.settings.arrange == "ltr") ? "vasen" : "oikea";
    window.__intaCmpLocalePayload = {
        slug: "fi",
        cookieSettingsLabel: "Evästeasetukset",
        showHideDetails: "Näytä tiedot",
        acceptLabel: "Hyväksy",
        acceptShortLabel: "Hyväksy",
        declineLabel: "Hylkää",
        settingsLabel: "Asetukset",
        policyLinkLabel: "Tietosuojakäytäntömme ja evästekäytäntömme",
        bannerMessage: "Hyväksymällä kaikki evästeet tuet " + document.domain + " paremman ratkaisun kehittämisessä sinulle.</p><p>Valitse, haluatko sallia vain välttämättömät evästeet vai haluatko sallia kaikki evästeet.",
        settingsMessage: "<h3 style=\"    font-size: 25px;\">Olet ohjaimissa</h3>"
            + "<p>Me ja liikekumppanimme käytämme teknologioita, mukaan lukien evästeet, kerätäksemme tietoja sinusta eri tarkoituksiin, mukaan lukien:</p>"
            + "<ol>"
            + "<li>Toiminnallinen</li>"
            + "<li>Tilastollinen</li>"
            + "<li>Mainonta</li>"
            + "</ol>"
            + "<p>Klikkaamalla \"Hyväksy\" annat suostumuksesi kaikkiin näihin tarkoituksiin. Voit myös valita, mihin tarkoituksiin suostut valitsemalla ruudun tarkoituksen vieressä ja napsauttamalla \"Tallenna asetukset\".</p>"
            + "<p>Voit peruuttaa suostumuksesi milloin tahansa napsauttamalla sivuston alareunan pientä kuvaketta " + arrangeWord + " kulma.</p>",
        settingsMessageSuffix: (window.INTA && window.INTA.settings && window.INTA.settings.popia ? '<button onclick="showPOPIAModal()" class="intastellarCookie-settings__privacyLink">Your Privacy Rights POPIA</button>' : "")
            + (window.INTA && window.INTA.settings && window.INTA.settings.lgpd ? '<button onclick="showLGPDModal()" class="intastellarCookie-settings__privacyLink">Your Privacy Rights LGPD</button>' : "")
            + '<button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International tietosuojakäytäntö</button>',
        categories: L
    };
})();
