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
        // Optional: URL template for server-stored text presets (default: downloads…/text-overrides/{id}.json)
        // textOverridesPresetUrl: 'https://downloads.intastellarsolutions.com/cookieconsents/text-overrides/{id}.json',
        variants: {
            control: { weight: 10 },
            variant_bannerV2: {
                weight: 90,
                settings: {
                    // Either inline textOverrides, or a preset id that matches your CDN/DB-backed JSON file:
                    textOverridePresetId: 'my-preset-slug',
                    // textOverrides: { bannerMessageHtml: '<p>…</p>', … }
                }
            }
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
        language: "auto",
        design: "bannerV2",
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
            on: true,
            // Optional (when ipapi/geo is unavailable): force CA for `salesOfDataAllowed` in consent cookie
            // inUsCalifornia: true,
            // Or server-injected: country: "US", regionCode: "CA"
        },
        lgpd: {
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