(function () {
    var categories = {
    saveSettings: "Afvis",
    necessary: {
        title: "Nødvendige",
        description: "Påkrævede webteknologier og cookies gør vores hjemmeside teknisk tilgængelig og brugbar for dig. Dette gælder grundlæggende basisfunktioner såsom navigation rundt på hjemmesiden, korrekt visning i din internetbrowser eller anmodning om dit samtykke. Uden disse webteknologier og cookies fungerer vores hjemmeside ikke."
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
};
    var arrangeWord = (window.INTA && window.INTA.settings && window.INTA.settings.arrange == "ltr") ? "venstre" : "højre";
    window.__intaCmpLocalePayload = {
        slug: "da",
        cookieSettingsLabel: "Cookie Indstillinger",
        showHideDetails: "Vis detaljer",
        acceptLabel: "Accepter",
        acceptShortLabel: "Accepter",
        declineLabel: "Afvis",
        settingsLabel: "Indstillinger",
        policyLinkLabel: "Vores privat og cookie politik",
        bannerMessage: "Ved at acceptere alle cookies understøtter du " + document.domain + " med at udvikle en bedre løsning til dig.</p><p>Vælg om du vil tillade kun de nødvendige cookies eller om du vil tillade alle cookies.",
        settingsMessage: "<h3 style=\"    font-size: 25px;\">Du bestemmer selv over dine data!</h3>"
            + "<p>Vi og vores samarbejdspartnere bruger teknologier, herunder cookies, til at indsamle oplysninger om dig til forskellige formål, herunder:</p>"
            + "<ol>"
            + "<li>Funktion</li>"
            + "<li>Statistik</li>"
            + "<li>Marketing</li>"
            + "</ol>"
            + "<p>Ved at trykke på 'Accepter' giver du samtykke til alle disse formål. Du kan også vælge hvilke formål du ønsker at give samtykke til ved at benytte checkboksene herunder, og derefter trykke på ”Gem”."
            + "Du kan til enhver tid trække dit samtykke tilbage ved at trykke på det lille ikon nederst i " + arrangeWord + " hjørne af hjemmesiden.</p>"
            + "<p>Du kan læse mere om vores brug af cookies og andre teknologier, samt om vores indsamling og behandling af personoplysninger ved at trykke på nedenstående links.</p>",
        settingsMessageSuffix: (window.INTA && window.INTA.settings && window.INTA.settings.lgpd ? '<button onclick="showLGPDModal()" class="intastellarCookie-settings__privacyLink">Seus Direitos de Privacidade</button>' : "")
            + '<button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International privat politik</button>',
        categories: categories
    };
})();
