(function () {
    var L = window.intastellarSupportedLanguages && window.intastellarSupportedLanguages.korean;
    if (!L) {
        return;
    }
    var arrangeWord = (window.INTA && window.INTA.settings && window.INTA.settings.arrange == "ltr") ? "왼쪽" : "오른쪽";
    window.__intaCmpLocalePayload = {
        slug: "ko",
        cookieSettingsLabel: "쿠키 설정",
        showHideDetails: "세부정보 보기",
        acceptLabel: "동의",
        acceptShortLabel: "동의",
        declineLabel: "거부",
        settingsLabel: "설정",
        policyLinkLabel: "우리의 개인정보 보호정책 및 쿠키 정책",
        bannerMessage: "모든 쿠키를 수락함으로써 " + document.domain + "이(가) 더 나은 솔루션을 개발할 수 있도록 지원합니다.</p><p>필수 쿠키만 허용할지 아니면 모든 쿠키를 허용할지 선택하세요.",
        settingsMessage: "<h3 style=\"    font-size: 25px;\">당신이 통제합니다</h3>"
            + "<p>우리는 우리의 비즈니스 파트너와 함께 쿠키와 같은 기술을 사용하여 다양한 목적을 위해 귀하에 대한 정보를 수집합니다. 여기에는 다음이 포함됩니다:</p>"
            + "<ol>"
            + "<li>기능성</li>"
            + "<li>통계</li>"
            + "<li>광고</li>"
            + "</ol>"
            + "<p>'수락'을 클릭함으로써, 당신은 이 모든 목적에 동의합니다. 또한, 목적 옆의 체크박스를 선택하고 '설정 저장'을 클릭함으로써 동의할 특정 목적을 선택할 수 있습니다.</p>"
            + "<p>웹사이트 하단 " + arrangeWord + " 모서리에 있는 작은 아이콘을 클릭하여 언제든지 동의를 철회할 수 있습니다.</p>",
        settingsMessageSuffix: '<button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International 개인정보 보호정책</button>',
        categories: L
    };
})();
