(function () {
    var L = window.intastellarSupportedLanguages && window.intastellarSupportedLanguages.polish;
    if (!L) {
        return;
    }
    var arrangeWord = (window.INTA && window.INTA.settings && window.INTA.settings.arrange == "ltr") ? "lewy" : "prawy";
    window.__intaCmpLocalePayload = {
        slug: "pl",
        cookieSettingsLabel: "Ustawienia plików cookie",
        showHideDetails: "Pokaż szczegóły",
        acceptLabel: "Zaakceptuj",
        acceptShortLabel: "Zaakceptuj",
        declineLabel: "Odrzuć",
        settingsLabel: "Ustawienia",
        policyLinkLabel: "Nasza polityka prywatności i plików cookie",
        bannerMessage: "Akceptując wszystkie pliki cookie, wspierasz " + document.domain + " w opracowywaniu lepszego rozwiązania dla Ciebie.</p><p>Wybierz, czy chcesz zezwolić tylko na niezbędne pliki cookie, czy zezwolić na wszystkie pliki cookie.",
        settingsMessage: "<h3 style=\"    font-size: 25px;\">Ty decydujesz o swoich danych</h3>"
            + "<p>My i nasi partnerzy biznesowi wykorzystujemy technologie, w tym pliki cookie, do zbierania informacji o Tobie w różnych celach, w tym:</p>"
            + "<ol>"
            + "<li>Funkcjonalność</li>"
            + "<li>Statystyki</li>"
            + "<li>Reklama</li>"
            + "</ol>"
            + "<p>Klikając „Akceptuj”, wyrażasz zgodę na wszystkie te cele. Możesz także zdecydować, które cele chcesz zatwierdzić, zaznaczając pole wyboru obok celu i klikając „Zapisz ustawienia”.</p>"
            + "<p>Możesz wycofać swoją zgodę w dowolnym momencie, klikając małą ikonę w dolnym " + arrangeWord + " rogu strony internetowej.</p>",
        settingsMessageSuffix: (window.INTA && window.INTA.settings && window.INTA.settings.popia ? '<button onclick="showPOPIAModal()" class="intastellarCookie-settings__privacyLink">Jou POPIA-privaatheidsregte</button>' : "")
            + '<button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International polityka prywatności</button>',
        categories: L
    };
})();
