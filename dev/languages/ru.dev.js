(function () {
    var L = window.intastellarSupportedLanguages && window.intastellarSupportedLanguages.russian;
    if (!L) {
        return;
    }
    var arrangeWord = (window.INTA && window.INTA.settings && window.INTA.settings.arrange == "ltr") ? "левом" : "правом";
    window.__intaCmpLocalePayload = {
        slug: "ru",
        cookieSettingsLabel: "Настройки файлов cookie",
        showHideDetails: "Показать детали",
        acceptLabel: "Принять",
        acceptShortLabel: "Принять",
        declineLabel: "Отклонить",
        settingsLabel: "Настройки",
        policyLinkLabel: "Наша политика конфиденциальности и файлы cookie",
        bannerMessage: "Принимая все файлы cookie, вы поддерживаете " + document.domain + " в разработке лучшего решения для вас.</p><p>Выберите, хотите ли вы разрешить только необходимые файлы cookie или разрешить все файлы cookie.",
        settingsMessage: "<h3 style=\"    font-size: 25px;\">Вы в контроле</h3>"
            + "<p>Мы и наши деловые партнеры используем технологии, включая файлы cookie, для сбора информации о вас для различных целей, включая:</p>"
            + "<ol>"
            + "<li>Функциональный</li>"
            + "<li>Статистика</li>"
            + "<li>Реклама</li>"
            + "</ol>"
            + "<p>Нажимая «Принять», вы даете согласие на все эти цели. Вы также можете решить, какие цели вы согласны утвердить, установив флажок рядом с целью и нажав «Сохранить настройки».</p>"
            + "<p>Вы можете отозвать свое согласие в любое время, нажав на небольшой значок в нижнем " + arrangeWord + " углу веб-сайта.</p>",
        settingsMessageSuffix: (window.INTA && window.INTA.settings && window.INTA.settings.popia ? '<button onclick="showPOPIAModal()" class="intastellarCookie-settings__privacyLink">Jou POPIA-privaatheidsregte</button>' : "")
            + (window.INTA && window.INTA.settings && window.INTA.settings.lgpd ? '<button onclick="showLGPDModal()" class="intastellarCookie-settings__privacyLink">Seus Direitos de Privacidade</button>' : "")
            + '<button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International политика конфиденциальности</button>',
        categories: L
    };
})();
