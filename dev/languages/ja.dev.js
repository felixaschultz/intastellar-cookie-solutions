(function () {
    var L = window.intastellarSupportedLanguages && window.intastellarSupportedLanguages.japanese;
    if (!L) {
        return;
    }
    var arrangeWord = (window.INTA && window.INTA.settings && window.INTA.settings.arrange == "ltr") ? "左側" : "右側";
    window.__intaCmpLocalePayload = {
        slug: "ja",
        cookieSettingsLabel: "Cookie 設定",
        showHideDetails: "詳細を表示",
        acceptLabel: "承認",
        acceptShortLabel: "承認",
        declineLabel: "拒否",
        settingsLabel: "設定",
        policyLinkLabel: "私たちのプライバシーとクッキーポリシー",
        bannerMessage: "すべてのCookieを受け入れることで、" + document.domain + "がより良いソリューションを開発するのをサポートします。</p><p>必要なCookieのみを許可するか、すべてのCookieを許可するかを選択してください。",
        settingsMessage: "<h3 style=\"    font-size: 25px;\">あなたがコントロール</h3>"
            + "<p>私たちと私たちのビジネスパートナーは、クッキーなどの技術を使用して、あなたに関する情報をさまざまな目的で収集しています。これには以下が含まれます：</p>"
            + "<ol>"
            + "<li>機能性</li>"
            + "<li>統計</li>"
            + "<li>広告</li>"
            + "</ol>"
            + "<p>「承認」をクリックすることで、これらすべての目的に同意します。また、目的の横にあるチェックボックスを選択し、「設定を保存」をクリックすることで、同意する特定の目的を選択することもできます。</p>"
            + "<p>ウェブサイトの下部 " + arrangeWord + " 角にある小さなアイコンをクリックすることで、いつでも同意を撤回できます。</p>",
        settingsMessageSuffix: '<button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International プライバシーポリシー</button>',
        categories: L
    };
})();
