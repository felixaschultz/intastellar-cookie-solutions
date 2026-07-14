(function () {
    var categories = {
    saveSettings: "Weigeren",
    necessary: {
        title: "Noodzakelijk",
        description: "Noodzakelijke webtechnologieën en cookies maken onze website technisch toegankelijk en bruikbaar voor u. Dit geldt voor fundamentele basisfunctionaliteiten zoals navigatie op de website, correcte weergave in uw internetbrowser of het vragen van uw toestemming. Zonder deze webtechnologieën en cookies werkt onze website niet."
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
};
    var arrangeWord = (window.INTA && window.INTA.settings && window.INTA.settings.arrange == "ltr") ? "linker" : "rechter";
    window.__intaCmpLocalePayload = {
        slug: "nl",
        cookieSettingsLabel: "Cookie-instellingen",
        showHideDetails: "Toon details",
        acceptLabel: "Accepteren",
        acceptShortLabel: "Accepteren",
        declineLabel: "Weigeren",
        settingsLabel: "Instellingen",
        policyLinkLabel: "Ons privacy- en cookiebeleid",
        bannerMessage: "Door alle cookies te accepteren, ondersteunt u " + document.domain + " bij het ontwikkelen van een betere oplossing voor u.</p><p>Kies of u alleen de noodzakelijke cookies wilt toestaan of dat u alle cookies wilt toestaan.",
        settingsMessage: "<h3 style=\"    font-size: 25px;\">U bent in controle</h3>"
            + "<p>Wij en onze zakenpartners gebruiken technologieën, waaronder cookies, om informatie over u te verzamelen voor verschillende doeleinden, waaronder:</p>"
            + "<ol>"
            + "<li>Functioneel</li>"
            + "<li>Statistisch</li>"
            + "<li>Reclame</li>"
            + "</ol>"
            + "<p>Door op 'Accepteren' te klikken, geeft u uw toestemming voor al deze doeleinden. U kunt ook beslissen welke doeleinden u wilt goedkeuren door het selectievakje naast het doel aan te vinken en op 'Instellingen opslaan' te klikken.</p>"
            + "<p>U kunt uw toestemming te allen tijde intrekken door op het kleine pictogram te klikken onderaan de " + arrangeWord + " hoek van de website.</p>",
        settingsMessageSuffix: (window.INTA && window.INTA.settings && window.INTA.settings.popia ? '<button onclick="showPOPIAModal()" class="intastellarCookie-settings__privacyLink">Your Privacy Rights POPIA</button>' : "")
            + (window.INTA && window.INTA.settings && window.INTA.settings.lgpd ? '<button onclick="showLGPDModal()" class="intastellarCookie-settings__privacyLink">Your Privacy Rights LGPD</button>' : "")
            + '<button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International privacybeleid</button>',
        categories: categories
    };
})();
