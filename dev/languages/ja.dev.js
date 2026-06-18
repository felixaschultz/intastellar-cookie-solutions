(function () {
    var categories = {
    saveSettings: "拒否",
    necessary: {
        title: "必要な",
        description: "必要なWeb技術とCookieは、当社のWebサイトを技術的にアクセス可能で使用可能にします。これは、Webサイトのナビゲーション、インターネットブラウザでの正しい表示、または同意の要求など、基本的な機能に適用されます。これらのWeb技術とCookieがないと、当社のWebサイトは機能しません。"
    },
    functional: {
        title: "機能的",
        description: "機能的なCookieは、Webサイトの外観や動作を変更する情報を保存できます。たとえば、お好みの言語や地域などです。"
    },
    statisic: {
        title: "統計",
        description: "当社は、Webサイトの使いやすさとパフォーマンスを継続的に改善したいと考えています。そのため、分析技術（Cookieを含む）を使用して、当社のWebサイトのどの機能やコンテンツがどのように使用されているかを匿名で測定および評価しています。これに基づいて、ユーザー向けにWebサイトを改善できます。"
    },
    marketing: {
        title: "マーケティング",
        description: "当社は、選択されたパートナーからのWeb技術（Cookieも含む）を使用して、Webサイトやソーシャルメディア上で特にあなた向けにカスタマイズされたコンテンツや広告を表示します。これらのコンテンツは、あなたの使用行動に基づいて選択および表示されます。広告またはマーケティングCookieは、訪問者に関連する広告やマーケティングキャンペーンを提供するために使用されます。これらのCookieは、異なるWebサイトで訪問者を追跡し、個別化された広告を提供するための情報を収集します。"
    }
};
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
        categories: categories
    };
})();
