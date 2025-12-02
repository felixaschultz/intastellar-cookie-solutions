(function () {
    if (window.__INTA_LOADED__) {
        return;
    }
    window.__INTA_LOADED__ = true;

    var defaultConfig = {
        policy_link: "/privacy-policy",
        settings: {
            rootDomain: window.location.hostname,
            language: "english",
            style: "banner"
        }
    };

    var config = window.INTA && typeof window.INTA === "object"
        ? Object.assign({}, defaultConfig, window.INTA)
        : defaultConfig;

    window.INTA = config;

    // load the banner script
    var s = document.createElement("script");
    s.src = "https://consents.cdn.intastellarsolutions.com/uc.js";
    document.head.appendChild(s);
})();
