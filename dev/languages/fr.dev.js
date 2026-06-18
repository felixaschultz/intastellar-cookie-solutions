(function () {
    var L = window.intastellarSupportedLanguages && window.intastellarSupportedLanguages.french;
    if (!L) {
        return;
    }
    var arrangeWord = (window.INTA && window.INTA.settings && window.INTA.settings.arrange == "ltr") ? "gauche" : "droite";
    window.__intaCmpLocalePayload = {
        slug: "fr",
        cookieSettingsLabel: "Paramètres des cookies",
        showHideDetails: "Afficher les détails",
        acceptLabel: "Accepter",
        acceptShortLabel: "Accepter",
        declineLabel: "Refuser",
        settingsLabel: "Paramètres",
        policyLinkLabel: "Notre politique de confidentialité et de cookies",
        bannerMessage: "En acceptant tous les cookies, vous soutenez " + document.domain + " dans le développement d'une meilleure solution pour vous.</p><p>Sélectionnez si vous souhaitez autoriser uniquement les cookies nécessaires ou si vous souhaitez autoriser tous les cookies.",
        settingsMessage: "<h3 style=\"    font-size: 25px;\">Vous êtes aux commandes</h3>"
            + "<p>Nous et nos partenaires commerciaux utilisons des technologies, y compris des cookies, pour collecter des informations vous concernant à diverses fins, notamment:</p>"
            + "<ol>"
            + "<li>Fonctionnel</li>"
            + "<li>Statistiques</li>"
            + "<li>Publicité</li>"
            + "</ol>"
            + "<p>En cliquant sur \"Accepter\", vous donnez votre consentement pour tous ces objectifs. Vous pouvez également choisir de spécifier les objectifs auxquels vous consentez en cochant la case à côté de l'objectif et en cliquant sur \"Enregistrer les paramètres\".</p>"
            + "<p>Vous pouvez retirer votre consentement à tout moment en cliquant sur le petit icône en bas à gauche du site web.</p>",
        settingsMessageSuffix: (window.INTA && window.INTA.settings && window.INTA.settings.popia ? '<button onclick="showPOPIAModal()" class="intastellarCookie-settings__privacyLink">Your Privacy Rights POPIA</button>' : "")
            + (window.INTA && window.INTA.settings && window.INTA.settings.lgpd ? '<button onclick="showLGPDModal()" class="intastellarCookie-settings__privacyLink">Your Privacy Rights LGPD</button>' : "")
            + '<button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International politique de confidentialité</button>',
        categories: L
    };
})();
