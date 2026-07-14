(function () {
    var categories = {
    saveSettings: "Refuser",
    necessary: {
        title: "Nécessaire",
        description: "Les technologies web et les cookies nécessaires rendent notre site web techniquement accessible et utilisable pour vous. Cela s'applique aux fonctionnalités de base fondamentales telles que la navigation sur le site web, l'affichage correct dans votre navigateur Internet ou la demande de votre consentement. Sans ces technologies web et cookies, notre site web ne fonctionne pas."
    },
    functional: {
        title: "Fonctionnel",
        description: "Les cookies fonctionnels permettent de stocker des informations qui modifient l'apparence ou le comportement du site web. Par exemple, votre langue ou région préférée."
    },
    statisic: {
        title: "Statistiques",
        description: "Nous voulons letamment améliorer la convivialité et les performances de nos sites web. Pour cette raison, nous utilisons des technologies d'analyse (y compris des cookies) qui mesurent et évaluent de manière pseudonyme quelles fonctions et quels contenus de nos sites web sont utilisés, comment et à quelle fréquence. Sur cette base, nous pouvons améliorer nos sites web pour les utilisateurs."
    },
    marketing: {
        title: "Marketing",
        description: "Nous utilisons des technologies web (également des cookies) de partenaires sélectionnés pour pouvoir vous montrer du contenu et de la publicité spécialement adaptés à vous sur des sites web et des réseaux sociaux. Ce contenu est sélectionné et affiché sur la base de votre comportement d'utilisation. Les cookies publicitaires ou de marketing sont utilisés pour fournir aux visiteurs des annonces et des campagnes marketing pertinentes. Ces cookies suivent les visiteurs à travers les sites web et collectent des informations pour fournir des annonces personnalisées."
    }
};
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
        categories: categories
    };
})();
