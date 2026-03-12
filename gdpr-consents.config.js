window.INTA = {
    dev: true,
    // A/B experiment (optional): overrides settings per variant
    // experiment: {
    //     id: 'banner-design-test',
    //     variants: {
    //         control: { weight: 50 },
    //         variant_bannerV2: { weight: 50, settings: { design: 'bannerV2' } }
    //     }
    // },
    /* experiment: {
        id: 'floating-banner-test',
        variants: {
            control: { weight: 25 },
            variant_bannerV2: { weight: 50, settings: { design: 'banner', color: '#c4c4c4' } }
        }
    }, */
    policy_link: {
        target: "_blank",
        url: "https://www.intastellarsolutions.com/about/legal/privacy"
    },
    settings: {
        company: "Test Company",
        logo: "https://www.intastellarsolutions.com/assets/logos/intastellar-new-planet.svg",
        /* color: "radial-gradient(circle,rgba(226, 0, 15, 1) 0%,rgba(182, 0, 15, 1) 100%)", */
        /* color: "#c33333", */
        rootDomain: "example.com",
        color: "#197da1ff",
        text: false,
        language: "japanese",
        design: "bannerV2",
        tcf: true,
        requiredCookies: [
            {
                cookie: "region",
                domain: "cykelfaergen.info",
                type: "functional",
                purpose: "Used to store the user's region",
            },
            {
                cookie: "modal",
                domain: "cykelfaergen.info",
                purpose: "Used to store users choice of modal",
            }
        ],
        partnerDomain: [
            "intastellarsolutions.com"
        ],
        ccpa: {
            on: true
        },
        gtagId: "G-XDDJRGFS76",
        arrange: "rtl",
        styleSheets: [
            "https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;600;700;800&display=swap",
            "https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;900&display=swap"
        ],
    }
};