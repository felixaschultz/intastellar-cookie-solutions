/*
 *  Cookie Consents Banner by Intastellar Solutions, International
 *  intastellarsolutions.com/gdpr-cookiebanner
 *  consents.cdn.intastellarsolutions.com/uc.js
 *  @copy 2022-2025 Intastellar Solutions, International
 *
*/
// --- Cross-site Consent Tracking ---
// Request consent state for a user
// Request consent state for a user
function requestConsentState(userId, rootDomain, partnerDomains = []) {
    consentIframe.contentWindow.postMessage({ type: 'getConsent', userId, rootDomain, partnerDomains }, 'https://consents.cdn.intastellarsolutions.com');
}

// Set consent state for a user
function setConsentState(userId, consents, rootDomain, partnerDomains = []) {
    consentIframe.contentWindow.postMessage({ type: 'setConsent', userId, consents, rootDomain, partnerDomains }, 'https://consents.cdn.intastellarsolutions.com');
    // VWO consent update
    updateVwoConsent(consents);
}

const allScripts = window.allScripts = [
    {
        /* Analytics Scripts which are beeing blocked */
        /* "([\-\.]clarity+)", */
        type: "statics",
        scripts: [
            "(mixpanel)",
            "([\-\.]googleoptimize+)",
            "([\-\.]piwik+)",
            "([\-\.]matomo+)",
            "([\-\.]bing+)",
            "([\-\.]slideshare+)",
            "([\-\.]siteimproveanalytics+)",
            "([\-\.]hotjar+)",
            "([\-\.]snapchat)",
            "([\-\.]contentsquare)",
            "([\-\.]6sc)",
            "([\-\.]nr-data)",
            "([\-\.]2o7)",
            "([\-\.]hackerone)",
            "([\-\.]gstatic)",
            "([\-\.]webtrends)",
            "([\-\.]webtrendslive)",
            "([\-\.]amplitude)",
            "([\-\.]adobe)",
            "([\-\.]mxpnl)",
            "([\-\.]mixpanel)",
            "([\-\.]gstatics+)",
            "([\-\.]adobedtm)",
            "([\-\.]adobedc)",
            "([\-\.]qualtrics+)",
            "([\-\.]pardot+)",
            "([\-\.]poultons+)",
            "([\-\.]chartbeat+)",
            "([\-\.]consensu+)",
            "([\-\.]clarity+)",
            "([\-\.]clarity-cdn+)",
            "([\-\.]vwo+)",
            "([\-\.]ip-only+)",
            "([\-\.]ggpht+)",
            "([\-\.]clearbitjs+)",
            "([\-\.]clearbitscripts+)",
            "([\-\.]optimizely+)",
            "([\-\.]segment+)",
            "([\-\.]quantserve+)[a-z]{2,5}(:[0-9]{1,5})?(\\\\.*)"
        ]
    },
    {
        /* Marketing Scripts which are beeing blocked */
        /* 
            "([\-\.]googlesyndication+)",
            "([\-\.]googletagservices+)",
            "([\-\.]googleadservices+)",
            "([\-\.]omnisnippet+)",
        */
        type: "marketing",
        scripts: [
            "(_linkedin_partner_id|_linkedin_data_partner_ids|mailchimp|lntrk|twitter|instagram|trustpilot|chic_lite_data)",
            "([\-\.]twitter+)",
            "([\-\.]ads-twitter+)",
            "([\-\.]casalemedia+)",
            "(chimpstatic+)",
            "([\-\.]trustpilot+)",
            "([\-\.]mailchimp+)",
            "([\-\.]linkedin+)",
            "([\-\.]bing+)",
            "([\-\.]licdn+)",
            "([\-\.]amazon-adsystem+)",
            "([\-\.]adfrom+)",
            "([\-\.]demdex+)",
            "([\-\.]criteo+)",
            "([\-\.]clearbitjs+)",
            "([\-\.]clearbitscripts+)",
            "([\-\.]instagram+)",
            "([\-\.]stickyadstv+)",
            "([\-\.]mookie1+)",
            "([\-\.]doubleclick+)",
            "([\-\.]bidswitch+)",
            "([\-\.]jnqsge+)",
            "([\-\.]syuh+)",
            "([\-\.]youtube+)",
            "([\-\.]vimeo+)",
            "([\-\.]ninthdecimal+)",
            "([\-\.]casalemedia+)",
            "([\-\.]adsymptotic+)",
            "([\-\.]tremorhub+)",
            "([\-\.]agkn+)",
            "([\-\.]myvisualiq+)",
            "([\-\.]exelator+)",
            "([\-\.]openx+)",
            "([\-\.]adsrvr+)",
            "([\-\.]justpremium+)",
            "([\-\.]ants+)",
            "([\-\.]bluekai+)",
            "([\-\.]revcontent+)",
            "([\-\.]outbrain+)",
            "([\-\.]adscale+)",
            "([\-\.]pdst+)",
            "([\-\.]yahoo+)",
            "([\-\.]advertising+)",
            "([\-\.]adnxs+)",
            "([\-\.]scdn+)",
            "([\-\.]spotify+)",
            "([\-\.]facebook+)",
            "([\-\.]pinterest+)",
            "([\-\.]adform+)",
            "([\-\.]adnxs+)",
            "([\-\.]advertising+)",
            "([\-\.]adtech+)",
            "([\-\.]soundestlink+)",
            "([\-\.]soundest+)",
            "([\-\.]soundestvid+)",
            "([\-\.]soundestform+)",
            "([\-\.]tiktok+)",
            "([\-\.]taboola+)",
            "([\-\.]hubspot+)",
            /* "([\-\.]hs-sites+)", */
            "([a-z]+){2,5}(:[0-9]{1,5})?(\\\\.*)"
        ]
    },
    {
        /* Functional Scripts which are beeing blocked */
        type: "functional",
        scripts: [
            "(maps.google.com+)",
            "(www.google.com/maps/+)",
            "([\-\.]googleapis+)",
            "([\-\.]gstatics+)",
            "([\-\.]cludo+)",
            "([\-\.]qbrick+)",
            "([\-\.]klarna+)",
            "([\-\.]paypal+)",
            "([\-\.]usersnap+)",
            "([\-\.]zoom+)",
            "([\-\.]cdnjs+)",
            "([\-\.]jsdelivr+)",
            "([\-\.]disqus+)([a-z]+){2,5}(:[0-9]{1,5})?(\\\\.*)"
        ]
    }
];

// Listen for consent state response
window.addEventListener('message', (event) => {
    if (event.origin !== 'https://consents.cdn.intastellarsolutions.com') return;
    if (event.data.type === 'consentState') {
        // Integrate with your banner logic
        window.intaCookieConsents = event.data.consents;
        // Optionally, update checkboxes or UI elements
        if (typeof updateConsentUI === 'function') {
            updateConsentUI(event.data.consents);
        }
        console.log('Received consent state:', event.data.consents);
    }
});

window["optimizely"] = window["optimizely"] || [];
window["optimizely"].push({
    "type": "optOut",
    "isOptOut": true
});

window.pintrk = window.pintrk || function () {
    window.pintrk.queue.push(Array.prototype.slice.call(arguments));
};
window.pintrk.queue = window.pintrk.queue || [];

pintrk('setconsent', false);

window.VWO = window.VWO || [];
window.VWO.init = window.VWO.init || function(s) { window.VWO.consentState = s; };
window.VWO.init(2); // default to pending
window.INTA = window.INTA || {};
window.INTA.observedCookieSource = 'unknown';
// --- VWO Cookie Consent Integration (latest, per docs) ---
function updateVwoConsent(consents) {
    // VWO expects: 1 = accepted, 2 = pending, 3 = rejected
    let state = 2; // default to pending
    if (consents) {
        if (consents.advertisementCookies === true || consents.advertisementCookies === "checked" || consents.marketing === true) {
            state = 1; // accepted
        } else if (consents.advertisementCookies === false || consents.advertisementCookies === "unchecked" || consents.marketing === false) {
            state = 3; // rejected
        }
    }
    window.VWO = window.VWO || [];
    window.VWO.init = window.VWO.init || function(s) { window.VWO.consentState = s; };
    window.VWO.init(state);
}
// --- End VWO Cookie Consent Integration ---

// --- Helper function to detect Vendors of Cookies ---
function detectCookieVendor(cookie) {
    const VENDOR_MAP = {
        'Google': ['_ga', '_gid', '_gat', '1P_JAR', 'NID', 'CONSENT', '_gcl_au', 'ANID', 'DV', 'OTZ', 'SID', 'HSID', 'APISID', 'SAPISID', 'SSID', 'SIDCC', 'SEARCH_SAMESITE', '_grecaptcha'],
        'Google Ads': ['IDE', 'DSID', 'FLC', 'AID', 'TAID', '__gads', '__gac'],
        'Google Tag Manager': ['_dc_gtm_', '_gat_gtag_'],
        'Google Optimize': ['_gaexp', '_opt_awcid', '_opt_awmid', '_opt_awgid', '_opt_awkid', '_opt_utmc'],
        'Facebook': ['fr', 'datr', 'sb', 'c_user', 'xs', 'wd', 'spin', 'presence', 'act', 'fbm_', 'fbsr_', 'fblo_', 'fbp'],
        'LinkedIn': ['bcookie', 'lidc', 'bscookie', 'lang', 'li_gc', 'li_mc', 'liap', 'lissc', 'UserMatchHistory'],
        'Twitter': ['_twitter_sess', 'personalization_id', 'guest_id', 'ct0', 'external_referer', 'gt'],
        'Hotjar': ['_hjIncludedInSample', '_hjSessionUser', '_hjFirstSeen', '_hjSession', '_hjTLDTest', '_hjAbsoluteSessionInProgress', '_hjIncludedInPageviewSample'],
        'Microsoft': ['MUID', 'ANON', 'SRCHD', 'SRCHUID', '_clsk', 'MSCC', 'SRCHUSR', 'SRCHHPGUSR', 'NAP', 'MH', 'MR', 'MS0', 'MSFPC', 'MicrosoftApplicationsTelemetryFirstLaunchTime', "MicrosoftApplicationsTelemetryDeviceId"],
        'HubSpot': ['hubspotutk', '__hssc', '__hstc', '__hs_opt_out', '__hssrc', '__hs_do_not_track', '__hs_initial_opt_in', '__hs_cookie_cat_pref'],
        'Adobe': ['AMCV_', 's_cc', 's_sq', 'AMCVS_', 'demdex', 'mbox'],
        'Pinterest': ['_pinterest_cm', 'csrftoken', 'sessionid', '_auth', '_pinterest_sess', '_routing_id'],
        'TikTok': ['tt_webid', 'tt_webid_v2', 'tt_csrf_token', 'ttwid', 's_v_web_id'],
        'Snapchat': ['sc_at', 'scid', 'sctr', 'xsrf_token'],
        'Reddit': ['_reddit_session', 'session_tracker', 'loid', 'token_v2', 'clkt', 'edgebucket'],
        'YouTube': ['YSC', 'VISITOR_INFO1_LIVE', 'PREF', 'LOGIN_INFO', 'SID', 'HSID', 'SSID', 'APISID', 'SAPISID'],
        'Vimeo': ['vuid', 'vimeo_sessionid', '__cf_bm'],
        'Spotify': ['sp_t', 'sp_landing', 'sp_ab', 'sp_usid'],
        'Salesforce': ['BrowserId', 'CookieConsent', 'inst', 'oid', 'sid'],
        'CrazyEgg': ['__ceg.s', '__ceg.u', '__utma', '__utmb', '__utmc', '__utmz'],
        'Intastellar Solutions': ['IntastellarConsentSolution', 'intastellar_cookie_consent'],
        'Cloudflare': ['__cfduid', '__cfruid', '__cf_bm'],
        'Segment': ['ajs_anonymous_id', 'ajs_group_id', 'ajs_user_id', 'ajs_group_properties', 'ajs_user_traits'],
        'Matomo': ['_pk_id', '_pk_ses', '_pk_ref', '_pk_cvar'],
        'Mixpanel': ['mp_', 'mp_.*_mixpanel'],
        'Amplitude': ['amplitude_id', 'amplitude_cookie_test'],
        'Intercom': ['intercom-id-', 'intercom-session-', 'intercom-device-id-'],
        'Zendesk': ['__zlcid', '__zlcstore', '__zlcmid', '__cfruid'],
        'Optimizely': ['optimizelyBuckets', 'optimizelyEndUserId', 'optimizelySegments', 'optimizelyRumLB'],
        'AppNexus': ['uuid2', 'anj', 'sess', 'icu', 'token'],
        'DoubleClick': ['id', 'IDE', 'test_cookie'],
        'Taboola': ['t_gid', 'taboola_session_id'],
        'Outbrain': ['obuid', 'adrl'],
        'Quantcast': ['__qca'],
        'Criteo': ['uid', 'eid', 'cto_bundle', 'cto_lwid'],
        'Adform': ['uid', 'cid', 'tid', 'CTAB', 'CTAT'],
        'Teads': ['tt_viewer'],
        'Bing': ['_uetsid', '_uetvid'],
        'Mailchimp': ['mc_cid', 'mc_eid'],
        'Shopify': ['_shopify_y', '_shopify_s', '_shopify_sa_t', '_shopify_sa_p', '_y', '_s'],
        'Stripe': ['__stripe_mid', '__stripe_sid'],
        'Paypal': ['ts', 'ts_c', 'tsrce', 'x-pp-s', 'nsid', 'LANG'],
        'OneTrust': ['OptanonConsent', 'OptanonAlertBoxClosed'],
        'TrustArc': ['notice_preferences', 'notice_gdpr_prefs', 'cmapi_cookie_privacy'],
        'Cookiebot': ['CookieConsent'],
        'Sentry': ['sentryReplaySession'],
        'New Relic': ['NRAGENT', 'JSESSIONID'],
        'Heap': ['heapanalytics'],
        'Clicky': ['_jsuid', 'cluid'],
        'Plausible': ['_plausible_ses', '_plausible_id'],
        'Vercel': ['__vercel_faas'],
        'Cloudinary': ['cloudinary_media_library_last_path'],
        'Calendly': ['calendly_session'],
        'Drift': ['driftt_aid', 'drift_campaign_refresh'],
        'Typeform': ['tf_'],
        'SurveyMonkey': ['ep201', 'ep202'],
        'Mailjet': ['mjx', 'mjx.session'],
        'Sendinblue': ['sib_cuid'],
        'ActiveCampaign': ['prism_'],
        'Zoho': ['zohocares', 'zabUserId'],
        'Pipedrive': ['pipedrive-csrf-token'],
        'Freshdesk': ['_x_w', '_x_m'],
        'LiveChat': ['__lc_cid', '__lc_cst'],
        'Olark': ['hblid', 'wcsid', 'olfsk'],
        'Tawk.to': ['TawkConnectionTime', '__tawkuuid'],
        'Userlike': ['uslk_e'],
        'LogRocket': ['lr_'],
        'FullStory': ['fs_uid'],
        'Mouseflow': ['mf_user'],
        'Lucky Orange': ['lo_uid', 'lo_session'],
        'ClickCease': ['_clickcease'],
        'AdRoll': ['adroll', 'adroll_fpc', 'adroll_s_ref'],
        'Quora': ['m-b', 'm-b_lax', 'm-b_strict'],
        'SnapEngage': ['SnapABugHistory', 'SnapABugRef'],
        'Yandex': ['yandexuid', 'ymex'],
        'Baidu': ['BAIDUID', 'BIDUPSID'],
        'Weibo': ['WBtopGlobal_register_version'],
        'VK': ['remixlang', 'remixstid'],
        'Discord': ['__dcfduid', '__sdcfduid'],
        'Slack': ['d', 'b'],
        'Omnisend': ['omnisendSessionID', 'omnisendVisitorID'],
        'Trello': ['token'],
        'Asana': ['asana-session'],
        'Monday.com': ['visitor_id'],
        'Notion': ['token_v2'],
        'Figma': ['__Host-figma_csrf'],
        'Canva': ['canva.user'],
        'Dropbox': ['gvc'],
        'Box': ['box_visitor_id'],
        'GitHub': ['_octo', 'user_session'],
        'GitLab': ['_gitlab_session'],
        'Bitbucket': ['BITBUCKETSESSION'],
        'Atlassian': ['atlassian.xsrf.token'],
        'Jira': ['JSESSIONID'],
        'Confluence': ['confluence.session.token'],
        'Zoom': ['zm_aid'],
        'Webex': ['SSO_SESSION_ID'],
        'GoToMeeting': ['GoToMeeting'],
        'BlueJeans': ['BJSESSIONID'],
        'TeamViewer': ['TVSESSIONID'],
        'DocuSign': ['__cf_bm', 'docusign'],
        'HelloSign': ['__cf_bm', 'hellosign'],
        'Adobe Sign': ['adobe_sign'],
        'CookieYes': ['CookieYesConsent', 'cookieyes-consent', 'CookieYesAnalytics'],
        // Add more as needed
    };

    for (const [vendor, identifiers] of Object.entries(VENDOR_MAP)) {
        for (const id of identifiers) {
            if (cookie.name.includes(id)) {
                return vendor;
            }
        }
    }
    return 'unknown vendor';
}

// --- Helper: Map cookie name to consent type ---
var COOKIE_CONSENT_TYPE_MAP = {
    // Google Analytics
    '_ga': 'statistics',
    '_gid': 'statistics',
    '_gat': 'statistics',
    '1P_JAR': 'statistics',
    'NID': 'statistics',
    'CONSENT': 'statistics',
    'DV': 'statistics',
    'OTZ': 'statistics',
    'SID': 'functional',
    'HSID': 'functional',
    'APISID': 'functional',
    'SAPISID': 'functional',
    'SSID': 'functional',
    'SIDCC': 'functional',
    'SEARCH_SAMESITE': 'functional',
    // Google Ads
    'IDE': 'marketing',
    'DSID': 'marketing',
    'FLC': 'marketing',
    'AID': 'marketing',
    'TAID': 'marketing',
    '__gads': 'marketing',
    '__gac': 'marketing',
    // Google Tag Manager
    '_dc_gtm_': 'statistics',
    '_gat_gtag_': 'statistics',
    // Google Optimize
    '_gaexp': 'statistics',
    '_opt_awcid': 'statistics',
    '_opt_awmid': 'statistics',
    '_opt_awgid': 'statistics',
    '_opt_awkid': 'statistics',
    '_opt_utmc': 'statistics',
    // Facebook
    'fr': 'marketing',
    'datr': 'marketing',
    'sb': 'marketing',
    'c_user': 'marketing',
    'xs': 'marketing',
    'wd': 'functional',
    'spin': 'marketing',
    'presence': 'functional',
    'act': 'functional',
    'fbm_': 'marketing',
    'fbsr_': 'marketing',
    'fblo_': 'marketing',
    'fbp': 'marketing',
    // LinkedIn
    'bcookie': 'marketing',
    'lidc': 'marketing',
    'bscookie': 'marketing',
    'lang': 'functional',
    'li_gc': 'functional',
    'li_mc': 'functional',
    'liap': 'functional',
    'lissc': 'functional',
    'UserMatchHistory': 'marketing',
    // Twitter
    '_twitter_sess': 'marketing',
    'personalization_id': 'marketing',
    'guest_id': 'marketing',
    'ct0': 'functional',
    'external_referer': 'functional',
    'gt': 'functional',
    // Hotjar
    '_hjIncludedInSample': 'statistics',
    '_hjSessionUser': 'statistics',
    '_hjFirstSeen': 'statistics',
    '_hjSession': 'statistics',
    '_hjTLDTest': 'statistics',
    '_hjAbsoluteSessionInProgress': 'statistics',
    '_hjIncludedInPageviewSample': 'statistics',
    // Microsoft
    'MUID': 'marketing',
    'ANON': 'marketing',
    'SRCHD': 'marketing',
    'SRCHUID': 'marketing',
    '_clsk': 'statistics',
    '_clck': 'statistics',
    'MSCC': 'functional',
    'SRCHUSR': 'marketing',
    'SRCHHPGUSR': 'marketing',
    'NAP': 'functional',
    'MH': 'functional',
    'MR': 'functional',
    'MS0': 'functional',
    'MSFPC': 'functional',
    // HubSpot
    'hubspotutk': 'marketing',
    '__hssc': 'marketing',
    '__hstc': 'marketing',
    '__hs_opt_out': 'functional',
    '__hssrc': 'marketing',
    '__hs_do_not_track': 'functional',
    '__hs_initial_opt_in': 'functional',
    '__hs_cookie_cat_pref': 'functional',
    // Adobe
    'AMCV_': 'marketing',
    's_cc': 'statistics',
    's_sq': 'statistics',
    'AMCVS_': 'marketing',
    'demdex': 'marketing',
    'mbox': 'marketing',
    // Pinterest
    '_pinterest_cm': 'marketing',
    'csrftoken': 'functional',
    'sessionid': 'functional',
    '_auth': 'functional',
    '_pinterest_sess': 'functional',
    '_routing_id': 'functional',
    // TikTok
    'tt_webid': 'marketing',
    'tt_webid_v2': 'marketing',
    'tt_csrf_token': 'functional',
    'ttwid': 'marketing',
    's_v_web_id': 'marketing',
    // Snapchat
    'sc_at': 'marketing',
    'scid': 'marketing',
    'sctr': 'marketing',
    'xsrf_token': 'functional',
    // Reddit
    '_reddit_session': 'marketing',
    'session_tracker': 'marketing',
    'loid': 'marketing',
    'token_v2': 'marketing',
    'clkt': 'marketing',
    'edgebucket': 'marketing',
    // YouTube
    'YSC': 'marketing',
    'VISITOR_INFO1_LIVE': 'marketing',
    'PREF': 'functional',
    'LOGIN_INFO': 'functional',
    // Vimeo
    'vuid': 'marketing',
    'vimeo_sessionid': 'marketing',
    '__cf_bm': 'functional',
    // Spotify
    'sp_t': 'marketing',
    'sp_landing': 'marketing',
    'sp_ab': 'marketing',
    'sp_usid': 'marketing',
    // Salesforce
    'BrowserId': 'functional',
    'CookieConsent': 'functional',
    'inst': 'functional',
    'oid': 'functional',
    'sid': 'functional',
    // CrazyEgg
    '__ceg.s': 'statistics',
    '__ceg.u': 'statistics',
    '__utma': 'statistics',
    '__utmb': 'statistics',
    '__utmc': 'statistics',
    '__utmz': 'statistics',
    // Intastellar
    'IntastellarConsentSolution': 'functional',
    'intastellar_cookie_consent': 'functional',
    // Cloudflare
    '__cfduid': 'functional',
    '__cfruid': 'functional',
    // Segment
    'ajs_anonymous_id': 'statistics',
    'ajs_group_id': 'statistics',
    'ajs_user_id': 'statistics',
    'ajs_group_properties': 'statistics',
    'ajs_user_traits': 'statistics',
    // Matomo
    '_pk_id': 'statistics',
    '_pk_ses': 'statistics',
    '_pk_ref': 'statistics',
    '_pk_cvar': 'statistics',
    // Mixpanel
    'mp_': 'statistics',
    // Amplitude
    'amplitude_id': 'statistics',
    'amplitude_cookie_test': 'statistics',
    // Intercom
    'intercom-id-': 'functional',
    'intercom-session-': 'functional',
    'intercom-device-id-': 'functional',
    // Zendesk
    '__zlcid': 'functional',
    '__zlcstore': 'functional',
    '__zlcmid': 'functional',
    // Optimizely
    'optimizelyBuckets': 'statistics',
    'optimizelyEndUserId': 'statistics',
    'optimizelySegments': 'statistics',
    'optimizelyRumLB': 'statistics',
    // AppNexus
    'uuid2': 'marketing',
    'anj': 'marketing',
    'sess': 'marketing',
    'icu': 'marketing',
    'token': 'marketing',
    // DoubleClick
    'id': 'marketing',
    'test_cookie': 'marketing',
    // Taboola
    't_gid': 'marketing',
    'taboola_session_id': 'marketing',
    // Outbrain
    'obuid': 'marketing',
    'adrl': 'marketing',
    // Quantcast
    '__qca': 'marketing',
    // Criteo
    'uid': 'marketing',
    'eid': 'marketing',
    'cto_bundle': 'marketing',
    'cto_lwid': 'marketing',
    // Adform
    'cid': 'marketing',
    'tid': 'marketing',
    'CTAB': 'marketing',
    'CTAT': 'marketing',
    // Teads
    'tt_viewer': 'marketing',
    // Bing
    '_uetsid': 'marketing',
    '_uetvid': 'marketing',
    // Mailchimp
    'mc_cid': 'marketing',
    'mc_eid': 'marketing',
    // Shopify
    '_shopify_y': 'functional',
    '_shopify_s': 'functional',
    '_shopify_sa_t': 'marketing',
    '_shopify_sa_p': 'marketing',
    '_y': 'functional',
    '_s': 'functional',
    // Stripe
    '__stripe_mid': 'functional',
    '__stripe_sid': 'functional',
    // Paypal
    'ts': 'functional',
    'ts_c': 'functional',
    'tsrce': 'functional',
    'x-pp-s': 'functional',
    'nsid': 'functional',
    'LANG': 'functional',
    // OneTrust
    'OptanonConsent': 'functional',
    'OptanonAlertBoxClosed': 'functional',
    // TrustArc
    'notice_preferences': 'functional',
    'notice_gdpr_prefs': 'functional',
    'cmapi_cookie_privacy': 'functional',
    // Cookiebot
    'CookieConsent': 'functional',
    // Sentry
    'sentryReplaySession': 'statistics',
    // New Relic
    'NRAGENT': 'statistics',
    'JSESSIONID': 'functional',
    // Heap
    'heapanalytics': 'statistics',
    // Clicky
    '_jsuid': 'statistics',
    'cluid': 'statistics',
    // Plausible
    '_plausible_ses': 'statistics',
    '_plausible_id': 'statistics',
    // Vercel
    '__vercel_faas': 'functional',
    // Cloudinary
    'cloudinary_media_library_last_path': 'functional',
    // Calendly
    'calendly_session': 'functional',
    // Drift
    'driftt_aid': 'marketing',
    'drift_campaign_refresh': 'marketing',
    // Typeform
    'tf_': 'functional',
    // SurveyMonkey
    'ep201': 'functional',
    'ep202': 'functional',
    // Mailjet
    'mjx': 'functional',
    'mjx.session': 'functional',
    // Sendinblue
    'sib_cuid': 'marketing',
    // ActiveCampaign
    'prism_': 'marketing',
    // Zoho
    'zohocares': 'functional',
    'zabUserId': 'functional',
    // Pipedrive
    'pipedrive-csrf-token': 'functional',
    // Freshdesk
    '_x_w': 'functional',
    '_x_m': 'functional',
    // LiveChat
    '__lc_cid': 'functional',
    '__lc_cst': 'functional',
    // Olark
    'hblid': 'functional',
    'wcsid': 'functional',
    'olfsk': 'functional',
    // Tawk.to
    'TawkConnectionTime': 'functional',
    '__tawkuuid': 'functional',
    // Userlike
    'uslk_e': 'functional',
    // LogRocket
    'lr_': 'statistics',
    // FullStory
    'fs_uid': 'statistics',
    // Mouseflow
    'mf_user': 'statistics',
    // Lucky Orange
    'lo_uid': 'statistics',
    'lo_session': 'statistics',
    // ClickCease
    '_clickcease': 'marketing',
    // AdRoll
    'adroll': 'marketing',
    'adroll_fpc': 'marketing',
    'adroll_s_ref': 'marketing',
    // Quora
    'm-b': 'marketing',
    'm-b_lax': 'marketing',
    'm-b_strict': 'marketing',
    // SnapEngage
    'SnapABugHistory': 'functional',
    'SnapABugRef': 'functional',
    // Yandex
    'yandexuid': 'marketing',
    'ymex': 'marketing',
    // Baidu
    'BAIDUID': 'marketing',
    'BIDUPSID': 'marketing',
    // Weibo
    'WBtopGlobal_register_version': 'functional',
    // VK
    'remixlang': 'functional',
    'remixstid': 'functional',
    // Discord
    '__dcfduid': 'functional',
    '__sdcfduid': 'functional',
    // Slack
    'd': 'functional',
    'b': 'functional',
    // Trello
    'token': 'functional',
    // Asana
    'asana-session': 'functional',
    // Monday.com
    'visitor_id': 'functional',
    // Notion
    'token_v2': 'functional',
    // Figma
    '__Host-figma_csrf': 'functional',
    // Canva
    'canva.user': 'functional',
    // Dropbox
    'gvc': 'functional',
    // Box
    'box_visitor_id': 'functional',
    // GitHub
    '_octo': 'functional',
    'user_session': 'functional',
    // GitLab
    '_gitlab_session': 'functional',
    // Bitbucket
    'BITBUCKETSESSION': 'functional',
    // Atlassian
    'atlassian.xsrf.token': 'functional',
    // Jira
    'JSESSIONID': 'functional',
    // Confluence
    'confluence.session.token': 'functional',
    // Zoom
    'zm_aid': 'functional',
    // Webex
    'SSO_SESSION_ID': 'functional',
    // GoToMeeting
    'GoToMeeting': 'functional',
    // BlueJeans
    'BJSESSIONID': 'functional',
    // TeamViewer
    'TVSESSIONID': 'functional',
    // DocuSign
    'docusign': 'functional',
    // HelloSign
    'hellosign': 'functional',
    // Adobe Sign
    'adobe_sign': 'functional',
    "MicrosoftApplicationsTelemetryFirstLaunchTime": 'functional',
    "MicrosoftApplicationsTelemetryDeviceId": 'functional',
    // Add more as needed
};

function getConsentTypeForCookie(cookieName) {
    // Try exact match first
    if (COOKIE_CONSENT_TYPE_MAP[cookieName]) return COOKIE_CONSENT_TYPE_MAP[cookieName];
    // Try partial match (for cookies with prefixes)
    for (const key in COOKIE_CONSENT_TYPE_MAP) {
        if (cookieName.startsWith(key)) return COOKIE_CONSENT_TYPE_MAP[key];
    }
    // Fallback
    return 'marketing';
}

// --- Start Cookie Interception ---
(function() {
    const desc = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
    Object.defineProperty(document, 'cookie', {
        configurable: true,
        enumerable: true,
        get: function() {
            return desc.get.call(this);
        },
        set: function(cookieString) {
            window.INTA.observedCookieSource = 'cookie';
            try{
                const cookieName = cookieString.split('=')[0].trim();
                const rawValue = cookieString.split('=')[1]?.split(';')[0];
                const cookieDomain = cookieString.split(';').find(part => part.trim().toLowerCase().startsWith('domain='))?.split('=')[1]?.trim() || window.location.hostname;
                // Use cookie name to determine consent type
                const consentType = getConsentTypeForCookie(cookieName);
                recordCookie({
                    name: cookieName,
                    source: window.INTA.observedCookieSource || 'unknown',
                    observedAt: Date.now(),
                    path: window.location.pathname,
                    domain: window.location.hostname,
                    cookieDomain,
                    rootDomain: window.INTA?.settings?.rootDomain || window.location.hostname,
                    hadValuePreConsent: typeof rawValue === 'string' && rawValue.length > 0,
                    consentGiven: hasConsent(consentType),
                    vendor: detectCookieVendor({ name: cookieName, value: rawValue })
                })
            } catch(e){ /* ignore */ }
            return desc.set.call(this, cookieString);
        }
    });
})();

// --- CookieStorage Observer ---
if ("cookieStore" in window) {
    cookieStore.addEventListener("change", (event) => {
        event.changed.forEach(cookie => {
            window.INTA.observedCookieSource = 'cookieStore';
            const consentType = getConsentTypeForCookie(cookie.name);
            recordCookie({
                name: cookie.name,
                source: 'cookieStore',
                observedAt: Date.now(),
                path: cookie.path || window.location.pathname,
                domain: cookie.domain || window.location.hostname,
                cookieDomain: cookie.domain || window.location.hostname,
                rootDomain: window.INTA?.settings?.rootDomain || window.location.hostname,
                hadValuePreConsent: 0,
                consentGiven: hasConsent(consentType),
                vendor: detectCookieVendor({ name: cookie.name, value: cookie.value })
            })
        })
    });
}

// --- Start localStorage Interception ---
(function() {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
        window.INTA.observedCookieSource = 'localStorage';
        const consentType = getConsentTypeForCookie(key);
        recordCookie({
            name: key,
            source: 'localStorage',
            observedAt: Date.now(),
            path: window.location.pathname,
            domain: window.location.hostname,
            rootDomain: window.INTA?.settings?.rootDomain || window.location.hostname,
            hadValuePreConsent: typeof value === 'string' && value.length > 0,
            consentGiven: hasConsent(consentType),
            vendor: detectCookieVendor({ name: key, value: value })
        });
        return originalSetItem.apply(this, arguments);
    };
})();

// --- Start memory Interception (example) ---
window.INTA.memorySet = function(key, value) {
    window.INTA.observedCookieSource = 'memory';
    const consentType = getConsentTypeForCookie(key);
    recordCookie({
        name: key,
        value: value,
        source: 'memory',
        observedAt: Date.now(),
        path: window.location.pathname,
        domain: window.location.hostname,
        rootDomain: window.INTA?.settings?.rootDomain || window.location.hostname,
        hadValuePreConsent: typeof value === 'string' && value.length > 0,
        consentGiven: hasConsent(consentType),
        vendor: detectCookieVendor({ name: key, value: value })
    });
    window.INTA._memory = window.INTA._memory || {};
    window.INTA._memory[key] = value;
};

function IntastellarSnapShot(stage){
    
}

// Example usage:
// const rootDomain = "group1.com";
// const partnerDomains = ["domain-a.com", "domain-b.com"];
// requestConsentState('user-123', rootDomain, partnerDomains);
// setConsentState('user-123', { marketing: true, statistics: false, functional: true }, rootDomain, partnerDomains);
// --- End Cross-site Consent Tracking ---

/* - - - Setup - - - */

const intaCookiePref = "IntastellarConsentSolution";
const int_hideCookieBannerName = window.int_hideCookieBannerName = intaCookiePref;
const int_FunctionalCookies = intaCookiePref + ":Functional-cookies";
const int_marketingCookies = intaCookiePref + ":Advertisment-cookies";
const int_staticsticCookies = intaCookiePref + ":Statistics-cookies";
const int_visitorCheck = intaCookiePref + "visitorCheck";
const button__acceptAll = document.querySelector(".intastellarCookieBanner__acceptAll");
const button__acceptAllNecessary = document.querySelector(".intastellarCookieBanner__acceptNecessary");
let intastellarShowHideDetailsText = "Show details";
let adsbygoogle = window.adsbygoogle || [];
const intastellarCookieBannerRootDomain = "https://consents.cdn.intastellarsolutions.com";
const intastellarAssetsCDNdomain = "https://www.intastellar-consents.com";
const intaCookieConsents = window.intaCookieConsents = (getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents : null;
// On page load, update VWO consent if consent object exists
if (intaCookieConsents) {
    updateVwoConsent(intaCookieConsents);
}
const intaCookieConsentsUserId = (getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.uid : null;
const isGtmMode = findScriptParameter("ref") === "gtm";
const isWordPress = document.getElementById('intastellar-gdpr-settings-js') !== null;
const FunctionalCheckbox = document.querySelector("#functional");
const StaticsCheckBox = document.querySelector("#statics");
const MarketingCheckBox = document.querySelector("#marketing");
const pluginSource = findScriptParameter("utm_source") === undefined ? "Intastellar+Solutions+Cookiebanner" : findScriptParameter("utm_source");
window.platform = findScriptParameter("utm_source") === undefined ? "Manual" : findScriptParameter("utm_source");
let poweredBy = "";
window.dataLayer = window.dataLayer || [];
let intaConsentsObjectVariable = {
    consents: {
        staticsticCookies: false,
        functionalCookies: false,
        advertisementCookies: false,
    },
    time: new Date().toGMTString(),
    uid: Math.random().toString(16).slice(2),
    domain: window?.INTA?.settings?.rootDomain || window.location.host,
    sharingDomains: [],
}

function gtag() {
    dataLayer.push(arguments);
}

fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        // For California only:
        if (data.country === "US" && data.region_code === "CA") {
            window.INTA = window.INTA || {};
            window.INTA.settings = window.INTA.settings || {};
            window.INTA.settings.ccpa = window.INTA.settings.ccpa || {};
            window.INTA.settings.ccpa.on = true;
        } else {
            // Optionally disable CCPA for non-CA users
            if (window.INTA?.settings?.ccpa) window.INTA.settings.ccpa.on = false;
        }
        // Now continue with your banner initialization
    });

if (window._intaConsentInitialized) {
    console.log('Intastellar consent already initialized, skipping...');
}

window._intaConsentInitialized = true;

if (!isGtmMode && !window._gtagDefaultFired && typeof gtag === 'function') {
    // Only set defaults if GTM hasn't already done so
    if (!window.google_tag_manager || !window.google_tag_manager['consent_default_set']) {
        // Strict opt-in regions (GDPR-style)
        gtag('consent', 'default', {
            "ad_storage": 'denied',
            "personalization_storage": 'denied',
            "analytics_storage": 'denied',
            "functionality_storage": 'denied',
            "ads_data_redaction": 'granted',
            "ad_user_data": 'denied',
            "ad_personalization": 'denied',
            "security_storage": 'granted',
            "url_passthrough": true,
            "wait_for_update": 500,
            "region": ['EU', 'UK', 'CH', 'NO', 'IS', 'LI', 'CA', 'BR', 'ZA', 'TR', 'AR', 'IL']
        });
        /* console.log("Intastellar Consents: Applied STRICT defaults (EU/UK/CA/BR/etc.)"); */

        // California opt-out (Do Not Sell)
        gtag('consent', 'default', {
            "ad_storage": 'granted',
            "personalization_storage": 'granted',
            "analytics_storage": 'granted',
            "functionality_storage": 'granted',
            "ads_data_redaction": 'denied',
            "ad_user_data": 'granted',
            "ad_personalization": 'granted',
            "security_storage": 'granted',
            "url_passthrough": true,
            "wait_for_update": 500,
            "region": ['US-CA']
        });
        /* console.log("Intastellar Consents: Applied CALIFORNIA defaults (US-CA)"); */

        // Rest of the world fallback
        gtag('consent', 'default', {
            "ad_storage": 'granted',
            "personalization_storage": 'granted',
            "analytics_storage": 'granted',
            "functionality_storage": 'granted',
            "ads_data_redaction": 'granted',
            "ad_user_data": 'granted',
            "ad_personalization": 'granted',
            "security_storage": 'granted',
            "url_passthrough": true,
            "wait_for_update": 500
        });
        /* console.log("Intastellar Consents: Applied REST-OF-WORLD defaults"); */
        gtag('consent', 'default', {
            'ad_storage': 'denied',
            'personalization_storage': 'denied',
            'analytics_storage': 'denied',
            'functionality_storage': 'denied',
            'ads_data_redaction': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'security_storage': 'granted',
            'url_passthrough': true,
            'wait_for_update': 500,
        });
        window._gtagDefaultFired = true;
    }
} else if (isGtmMode) {}

if (typeof fbq === "undefined" || typeof fbq === "null") {
    function fbq() { }
}

window._paq = window._paq || [];
_paq.push(['requireConsent']);


window.clarity && window.clarity('consentv2', {
    ad_Storage: "denied",
    analytics_Storage: "denied"
});

window.uetq = window.uetq || [];
window.uetq.push('consent', 'default', {
    'ad_storage': 'denied'
});
window.disableHubSpotCookieBanner = true;
var _hsp = (window._hsp = window._hsp || []);
/* _hsp.push(['doNotTrack']);
_hsp.push(['revokeCookieConsent']); */
window._hsp.push([
    'setHubSpotCookieConsent',
    {
        'analytics': intaCookieConsents?.staticsticCookies === "checked",
        'advertisement': intaCookieConsents?.advertisementCookies === "checked",
        'functional': intaCookieConsents?.functionalCookies === "checked",
    }
]);

window.Shopify = window.Shopify || {};
window.Shopify.customerPrivacy = window.Shopify.customerPrivacy || {};
window.Shopify.customerPrivacy.shouldShowBanner = function() { return false; };

window.Shopify ?? window?.Shopify?.loadFeatures(
    [
        {
            name: 'consent-tracking-api',
            version: '0.1',
        },
    ],
    error => {
        if (error) {
            // Rescue error
            console.error(error);
        }
        // If error is false, the API has loaded and ready to use!
        window.Shopify.customerPrivacy.setTrackingConsent(
            {
                'analytics': intaCookieConsents?.staticsticCookies === "checked",
                'marketing': intaCookieConsents?.advertisementCookies === "checked",
                'preferences': intaCookieConsents?.functionalCookies === "checked",
            },
            () => console.log("Consent captured")
        );
    },
);

function optOutCCPA() {
    // Google Tag Manager / gtag
    gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
    });

    // Microsoft Clarity
    if (window.clarity) {
        try {
            window.clarity('consent', 'denied');
            // For Clarity V2, if used:
            window.clarity('consentv2', {
                ad_Storage: "denied",
                analytics_Storage: "denied"
            });
        } catch (e) { /* ignore */ }
    }

    // Matomo
    if (window._paq) {
        try {
            window._paq.push(['requireConsent']);
            window._paq.push(['forgetUserOptOut']);
        } catch (e) { /* ignore */ }
    }

    // Pintrk
    if (typeof pintrk === 'function') {
        try {
            pintrk('setconsent', false);
        } catch (e) { /* ignore */ }
    }

    // Microsoft UET
    if (window.uetq) {
        try {
            window.uetq.push('consent', 'update', { 'ad_storage': 'denied' });
        } catch (e) { /* ignore */ }
    }

    // HubSpot
    if (window._hsp) {
        try {
            window._hsp.push(['setHubSpotCookieConsent', {
                analytics: false,
                advertisement: false,
                functional: false
            }]);
        } catch (e) { /* ignore */ }
    }

    // Shopify
    if (window.Shopify && window.Shopify.customerPrivacy) {
        try {
            window.Shopify.customerPrivacy.setTrackingConsent({
                analytics: false,
                marketing: false,
                preferences: false
            }, function () {
                console.log("Shopify CCPA opt-out set");
            });
        } catch (e) { /* ignore */ }
    }

    // Store the choice locally
    localStorage.setItem('ccpa_opt_out', 'true');

    alert("Your opt-out has been saved. We won’t sell or share your personal information.");
}

// --- Server-Side Tagging & Interception Implementation ---
// Helper: Determine consent type for a given URL using allScripts regex
function getConsentTypeForUrl(url) {
    if (!url) return 'marketing';
    for (let i = 0; i < window.allScripts.length; i++) {
        const scriptType = window.allScripts[i].type;
        const patterns = window.allScripts[i].scripts;
        for (let j = 0; j < patterns.length; j++) {
            try {
                const regex = new RegExp(patterns[j], 'i');
                if (regex.test(url)) {
                    // statics => statistics
                    if (scriptType === 'statics') return 'statistics';
                    return scriptType;
                }
            } catch (e) { /* ignore invalid regex */ }
        }
    }
    // Default fallback
    return 'marketing';
}

// Helper: Send intercepted data to backend for storage/categorization
async function sendToBackend(data) {
    try {
        const base = (typeof window.INTA?.settings?.backendUrl === 'string') ? window.INTA.settings.backendUrl : 'https://consents.cdn.intastellarsolutions.com/tests/backend/test.php';
        await fetch(base, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
    return;
}

// Helper: Server-side tagging - send GA4 events via backend (consent-aware)
// Server checks consents: accepted = full data (user_id, IP, etc); not accepted = minimal
window.sendEventToServerSideTagging = function (eventName, params, opts) {
    const measurementId = (opts && opts.measurement_id) || (window.INTA && window.INTA.settings && window.INTA.settings.gtagId) || '';
    if (!measurementId || !/^G-[A-Z0-9]+$/i.test(measurementId)) return;
    const consents = window.intaCookieConsents || {};
    var consentAcceptedAt = null;
    try {
        if (typeof getCookie === 'function' && typeof decodeIntaConsentsObject === 'function' && typeof int_hideCookieBannerName !== 'undefined') {
            var c = getCookie(int_hideCookieBannerName);
            if (c && c.indexOf && c.indexOf('__inta') > -1) {
                var parts = c.split('.');
                var decoded = parts[2] ? JSON.parse(decodeIntaConsentsObject(parts[2]) || '{}') : {};
                consentAcceptedAt = decoded.time || null;
            }
        }
    } catch (e) {}
    const uid = (window.intaConsentsObjectVariable && window.intaConsentsObjectVariable.uid) || '';
    const base = (typeof window.INTA !== 'undefined' && typeof window.INTA.settings?.backendUrl === 'string') ? window.INTA.settings.backendUrl : 'https://consents.cdn.intastellarsolutions.com/tests/backend/test.php';
    fetch(base, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: 'ga4_event',
            measurement_id: measurementId,
            consents: consents,
            consent_accepted_at: consentAcceptedAt,
            client_id: (opts && opts.client_id) || ('cid_' + Date.now().toString(36) + Math.random().toString(36).slice(2)),
            user_id: (opts && opts.user_id) || uid,
            session_id: (opts && opts.session_id) || ('sess_' + Date.now()),
            page_location: (opts && opts.page_location) || window.location.href,
            page_title: (opts && opts.page_title) || (document.title || ''),
            events: [{ name: eventName || 'page_view', params: params || {} }]
        })
    }).catch(function () {});
};

// IAB TC String generator
(function (window) {
    // Minimal IAB TCF encoder for browser use
    function padBits(num, len) {
        let s = num.toString(2);
        return "0".repeat(len - s.length) + s;
    }
    function strToBits(str) {
        // 2 chars, each 6 bits (A=0, Z=25, a=26, z=51)
        return padBits(str.charCodeAt(0) - 65, 6) + padBits(str.charCodeAt(1) - 65, 6);
    }
    function base64UrlEncode(bytes) {
        let binary = '';
        for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
        return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    // Minimal TCModel
    function TCModel() {
        this.purposeConsents = [];
        this.vendorConsents = [];
    }

    // Minimal TCString encoder
    var TCString = {
        encode: function (tcModel) {
            // Support all vendors (not just first 24)
            let bits = "";
            bits += padBits(2, 6); // Version
            let now = Math.floor(Date.now() / 100); // 0.1s increments
            bits += padBits(now, 36); // Created
            bits += padBits(now, 36); // LastUpdated
            bits += padBits(1, 12); // CmpId
            bits += padBits(1, 12); // CmpVersion
            bits += padBits(0, 6); // ConsentScreen
            bits += strToBits("EN"); // ConsentLanguage
            bits += padBits(1, 12); // VendorListVersion
            bits += padBits(2, 6); // TCFPolicyVersion
            bits += padBits(0, 1); // IsServiceSpecific
            bits += padBits(0, 1); // UseNonStandardStacks
            bits += padBits(0, 12); // SpecialFeatureOptIns
            // PurposeConsents (24 bits)
            for (let i = 0; i < 24; i++) bits += tcModel.purposeConsents && tcModel.purposeConsents[i] ? "1" : "0";
            // PurposeLegitInterests (24 bits, all 0)
            bits += "0".repeat(24);
            bits += padBits(0, 1); // PurposeOneTreatment
            bits += strToBits("EN"); // PublisherCC
            // VendorConsents (maxVendorId, 16 bits for maxVendorId, then maxVendorId bits for consents)
            let maxVendorId = (tcModel.vendorConsents && tcModel.vendorConsents.length) || 0;
            bits += padBits(maxVendorId, 16);
            for (let i = 0; i < maxVendorId; i++) bits += tcModel.vendorConsents && tcModel.vendorConsents[i] ? "1" : "0";
            // Convert bits to bytes
            let bytes = [];
            for (let i = 0; i < bits.length; i += 8) {
                bytes.push(parseInt(bits.substr(i, 8).padEnd(8, "0"), 2));
            }
            return base64UrlEncode(bytes);
        },
        decode: function (tcString) {
            const binary = base64UrlDecode(tcString);
            let bits = '';
            for (let i = 0; i < binary.length; i++) {
                bits += ('00000000' + binary.charCodeAt(i).toString(2)).slice(-8);
            }
            // Parse fields (see encoder for bit lengths)
            let offset = 0;
            function read(len) {
                const val = bits.substr(offset, len);
                offset += len;
                return val;
            }
            const version = parseInt(read(6), 2);
            const created = parseInt(read(36), 2);
            const lastUpdated = parseInt(read(36), 2);
            const cmpId = parseInt(read(12), 2);
            const cmpVersion = parseInt(read(12), 2);
            const consentScreen = parseInt(read(6), 2);
            const consentLanguage = String.fromCharCode(parseInt(read(6), 2) + 65, parseInt(read(6), 2) + 65);
            const vendorListVersion = parseInt(read(12), 2);
            const tcfPolicyVersion = parseInt(read(6), 2);
            const isServiceSpecific = !!parseInt(read(1), 2);
            const useNonStandardStacks = !!parseInt(read(1), 2);
            const specialFeatureOptIns = read(12);
            const purposes = read(24).split('').map(b => b === '1');
            const purposeLegitInterests = read(24);
            const purposeOneTreatment = !!parseInt(read(1), 2);
            const publisherCC = String.fromCharCode(parseInt(read(6), 2) + 65, parseInt(read(6), 2) + 65);
            const maxVendorId = parseInt(read(16), 2);
            const vendorBits = maxVendorId > 0 ? read(maxVendorId) : '';
            const vendors = vendorBits.split('').map(b => b === '1');
            return {
                version,
                created,
                lastUpdated,
                cmpId,
                cmpVersion,
                consentScreen,
                consentLanguage,
                vendorListVersion,
                tcfPolicyVersion,
                isServiceSpecific,
                useNonStandardStacks,
                specialFeatureOptIns,
                purposes,
                maxVendorId,
                vendors
            };
        }
    };

    window.IABTCF = {
        TCModel: TCModel,
        TCString: TCString
    };
})(window);

// Consent check helper
function hasConsent(type) {
    // type: 'functional', 'statistics', 'marketing'
    if (!window.intaCookieConsents) return false;
    if (type === 'functional') return window.intaCookieConsents.functionalCookies === 'checked';
    if (type === 'statistics') return window.intaCookieConsents.staticsticCookies === 'checked';
    if (type === 'marketing') return window.intaCookieConsents.advertisementCookies === 'checked';
    return false;
}

const ALLOWLIST = [
    location.origin,
    // Add all subdomains of the current host
    ...(() => {
        const host = location.host;
        const parts = host.split('.');
        const subdomains = [];
        for (let i = 0; i < parts.length - 1; i++) {
            subdomains.push(parts.slice(i).join('.'));
        }
        return subdomains;
    })(),
    "https://intastellar.app",
    "https://www.intastellarsolutions.com",
    "https://analytics.intastellarsolutions.com",
    "https://api.intastellarsolutions.com",
    "https://apis.intastellarsolutions.com",
    "https://consents.intastellarsolutions.com",
    "https://vendor-list.consensu.org",
    "/dev/gvl-local.json",
    "https://forms.hsforms.com",
    "https://js.hs-scripts.com",
    "https://js.hsforms.net",
    "https://api.hsforms.com",
    "https://forms.hubspot.com",
    "https://track.hubspot.com",
    "https://js.usemessages.com",
    "https://cdn2.hubspot.net",
    "https://cdn.hsforms.net",
    "https://cdn.weglot.com",
    "https://dev.visualwebsiteoptimizer.com",
    "https://www.google-analytics.com",
    "https://region1.google-analytics.com"
];

function isAllowed(url) {
    try {
        const parsedUrl = new URL(url, window.location.origin);
        // Allow all requests to the same origin
        if (parsedUrl.origin === window.location.origin) return true;

        if (
            /(?:\.hubspot\.com|\.hsforms\.com|\.hs-scripts\.com|\.hsforms\.net|\.usemessages\.com|\.cdn2\.hubspot\.net|\.cdn\.hsforms\.net)$/i.test(parsedUrl.hostname)
        ) {
            return true;
        }

        // Allow if matches any allowlist origin
        if (ALLOWLIST.some(domain => parsedUrl.origin === domain)) return true;

        // Allow all subdomains of the current host/root domain
        const rootHost = window.location.hostname.replace(/^www\./, "");
        const parsedHost = parsedUrl.hostname.replace(/^www\./, "");
        if (parsedHost === rootHost || parsedHost.endsWith('.' + rootHost)) return true;

        // Optionally allow other trusted domains here
        return false;
    } catch (e) {
        return false;
    }
}


// Intercept fetch with consent check
const originalFetch = window.fetch;
window.fetch = function(resource, config) {
    const url = (typeof resource === 'string') ? resource : resource.url;
    // Prevent recursion for backend endpoint
    if (isAllowed(url)) {
        return originalFetch.apply(this, arguments);
    }
    const isExternal = !url.startsWith(window.location.origin);
    if (isExternal) {
        const consentType = getConsentTypeForUrl(url);
        if (!hasConsent(consentType)) {
            if (typeof intastellarDevMode !== 'undefined' && intastellarDevMode) {
                console.log('[GDPR] Blocked fetch:', url, 'type:', consentType);
            }
            // Silently block: return a resolved Promise with undefined
            return Promise.resolve(undefined);
        }
    }
    return originalFetch.apply(this, arguments);
};

// Intercept XMLHttpRequest with consent check
const OriginalXHR = window.XMLHttpRequest;
function CustomXHR() {
    const xhr = new OriginalXHR();
    const open = xhr.open;
    xhr.open = function (method, url, ...args) {
        if (isAllowed(url)) {
            return open.apply(this, arguments);
        }
        const isExternal = !url.startsWith(window.location.origin);
        if (isExternal) {
            const consentType = getConsentTypeForUrl(url);
            if (!hasConsent(consentType)) {
                if (typeof intastellarDevMode !== 'undefined' && intastellarDevMode) {
                    console.log('[GDPR] Blocked XHR:', url, 'type:', consentType);
                }
                // Silently block: do not send request
                return; // open not called, so request never sent
            }
        }
        return open.apply(this, arguments);
    };
    return xhr;
}
window.XMLHttpRequest = CustomXHR;
// Intercept navigator.sendBeacon with consent check
const originalSendBeacon = navigator.sendBeacon;
navigator.sendBeacon = function (url, data) {
    // Prevent recursion for backend endpoint
    if (isAllowed(url)) {
        return originalSendBeacon.apply(this, arguments);
    }
    const isExternal = !url.startsWith(window.location.origin);
    if (isExternal) {
        const consentType = getConsentTypeForUrl(url);
        if (!hasConsent(consentType)) {
            if (typeof intastellarDevMode !== 'undefined' && intastellarDevMode) {
                console.log('[GDPR] Blocked beacon:', url, 'type:', consentType);
            }
            // Silently block: do not send beacon
            return false;
        }
        sendToBackend({
            type: 'beacon',
            url,
            data: typeof data === 'string' ? data : '[binary]',
            consentType,
            timestamp: Date.now()
        });
    }
    return originalSendBeacon.apply(this, arguments);
};
// --- End Server-Side Tagging & Interception Implementtion ---


if (intaCookieConsents?.advertisementCookies !== "checked") {
    fbq('consent', 'revoke');
}

let scriptTypelang = {};
let settingsMessage;
const foundScripts = window.foundScripts = [];
const intCookieIcon = intastellarAssetsCDNdomain + "/assets/icons/cookie_settings.svg";
window.dataLayer = window.dataLayer || [];
(adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 1;
(adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;

/* - - - Setup - - - */
if (window.INTA === undefined) {
    window.INTA = {
        policy_link: undefined,
        settings: {
            company: undefined,
            lang: "auto",
            color: "rgba(0, 51, 153, 1)",
            keepInLocalStorage: ["firstLoad", int_FunctionalCookies, int_hideCookieBannerName, int_marketingCookies, int_staticsticCookies],
            arrange: "ltr",
            logo: intCookieIcon,
            partnerDomain: null,
            StyleSheet: null,
            design: "overlay",
        }
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }

        /* console.log(localStorage.getItem(cname), cname); */

        if (c.indexOf(name) === 0 && localStorage.getItem(cname) === null) {
            return c.substring(name.length, c.length);
        } else if (localStorage.getItem(cname) !== null) {
            return localStorage.getItem(cname);
        }
    }
    return "";
}

function findScriptParameter(value) {
    const currentURL = document.currentScript.src;

    if (currentURL.indexOf(value) > -1) {
        let url = new URL(currentURL);
        let param = url.searchParams;
        return param.get(value);
    }

    return undefined;

}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function encodeIntaConsentsObject(string, base) {
    var number = "0";
    var length = string.length;
    for (var i = 0; i < length; i++)
        number += string.charCodeAt(i).toString(base);
    return base + "." + number;
}

function decodeIntaConsentsObject(number) {
    var string = "";
    number = number?.slice(1);
    var length = number?.length;
    for (var i = 0; i < length;) {
        var code = number?.slice(i, i += 2);
        string += String.fromCharCode(parseInt(code, parseInt(getCookie(int_hideCookieBannerName)?.split(".")[1])));
    }

    return string;
}

const intastellarDevMode = (function () {
    return window.location.host === "localhost"
        || window.location.host.indexOf("127.0.0.1") > -1 && window.INTA.dev === true
        || window.location.host.indexOf("0.0.0.0") > -1 && window.INTA.dev === true
        || window.location.host.indexOf("192.168.") > -1 && window.INTA.dev === true
        || window.location.host.indexOf("::1") > -1 && window.INTA.dev === true
        ? true : false;
})();

/* Object for supported languages */
const intastellarSupportedLanguages = {
    english: {
        saveSettings: "Decline All",
        necessary: { // Object for cookie info
            title: "Necessary", //"Necessary Cookies:",
            description: "Required web technologies and cookies are essential for making our website accessible and functional for you. They enable key features, such as navigation, proper display in your browser, and managing your consent preferences. Without these technologies and cookies, our website cannot function properly.",
        },
        functional: {
            title: "Functional",
            description: "Functional cookies allow us to store information that alters how the website appears or behaves, such as your preferred language or region."
        },
        statisic: {
            title: "Statics",
            description: "We strive to continuously enhance the user experience and performance of our website. To achieve this, we use analytical technologies (including cookies) that pseudonymously track and assess how, when, and which features and content of our website are used. This data helps us improve our site for users."
        },
        marketing: {
            title: "Marketing",
            description: "We use web technologies (including cookies) from trusted partners to deliver content and advertisements tailored specifically to you on websites and social media platforms. This content is selected and displayed based on your browsing behavior. Advertising and marketing cookies are used to show relevant ads and campaigns, tracking visitors across sites and gathering information to present personalized advertisements."
        },
    },
    german: {
        saveSettings: "Ablehnen",
        necessary: {
            title: "Erforderliche", //"Necessary Cookies:",
            description: "Erforderliche Webtechnologien und Cookies sind notwendig, um unsere Website für Sie zugänglich und funktionsfähig zu machen. Sie gewährleisten grundlegende Funktionen wie die Navigation auf der Seite, die korrekte Anzeige im Browser und das Einholen Ihrer Einwilligung. Ohne diese Technologien und Cookies ist die Nutzung unserer Website nicht möglich.",
        },
        functional: {
            title: "Funktionel",
            description: "Funktionale Cookies ermöglichen es, Informationen zu speichern, die das Erscheinungsbild oder Verhalten der Website anpassen, wie zum Beispiel Ihre bevorzugte Sprache oder Region."
        },
        statisic: {
            title: "Statistik",
            description: "Wir möchten die Benutzerfreundlichkeit und Leistung unserer Websites kontinuierlich verbessern. Daher setzen wir Analysetechnologien (einschließlich Cookies) ein, die pseudonym ermitteln und auswerten, welche Funktionen und Inhalte unserer Websites wie und wie oft genutzt werden. Auf dieser Basis können wir unsere Websites für die Nutzer optimieren."
        },
        marketing: {
            title: "Werbung",
            description: "Werbe- oder Marketing-Cookies werden eingesetzt, um Besuchern relevante Anzeigen und Marketingkampagnen anzuzeigen. Diese Cookies verfolgen Besucher über verschiedene Websites und sammeln Informationen, um personalisierte Werbung bereitzustellen."
        },
    },
    danish: {
        saveSettings: "Afvis",
        necessary: {
            title: "Nødvendige", //"Necessary Cookies:",
            description: "Påkrævede webteknologier og cookies gør vores hjemmeside teknisk tilgængelig og brugbar for dig. Dette gælder grundlæggende basisfunktioner såsom navigation rundt på hjemmesiden, korrekt visning i din internetbrowser eller anmodning om dit samtykke. Uden disse webteknologier og cookies fungerer vores hjemmeside ikke.",
        },
        functional: {
            title: "Funktion",
            description: "Funktionelle cookies gør det muligt at gemme information, der ændrer måden hjemmesiden fremstår eller fungerer på. For eksempel dit foretrukne sprog eller område."
        },
        statisic: {
            title: "Statistik",
            description: "Vi ønsker konstant at forbedre brugervenligheden og ydeevnen på vores hjemmesider. Af denne grund bruger vi analyseteknologier (inklusive cookies), som pseudonymt måler og vurderer, hvilke funktioner og indhold på vores hjemmesider der bruges, hvordan og hvor ofte. På dette grundlag kan vi forbedre vores hjemmesider for brugerne."
        },
        marketing: {
            title: "Marketing",
            description: "Vi bruger webteknologier (også cookies) fra udvalgte partnere for at kunne vise dig indhold og annoncer, der er specielt skræddersyet til dig på hjemmesider og sociale medier. Dette indhold udvælges og vises på baggrund af din brugsadfærd. Annonce- eller marketingcookies bruges til at give besøgende relevante annoncer og marketingkampagner. Disse cookies sporer besøgende på tværs af websteder og indsamler oplysninger for at levere tilpassede annoncer."
        }
    },
    spanish: {
        saveSettings: "Rechazar",
        necessary: {
            title: "Necesario", //"Necessary Cookies:",
            description: "Las tecnologías web y las cookies necesarias hacen que nuestro sitio web sea técnicamente accesible y utilizable para usted. Esto se aplica a funcionalidades básicas fundamentales como la navegación en el sitio web, la visualización correcta en su navegador de Internet o la solicitud de su consentimiento. Sin estas tecnologías web y cookies, nuestro sitio web no funciona.",
        },
        functional: {
            title: "Funcional",
            description: "Las cookies funcionales permiten guardar información que cambia la forma en que aparece o actúa el sitio web. Por ejemplo, su idioma o región preferidos."
        },
        statisic: {
            title: "Estadísticas",
            description: "Queremos mejorar constantemente la facilidad de uso y el rendimiento de nuestros sitios web. Por esta razón, utilizamos tecnologías de análisis (incluidas las cookies) que miden y evalúan de forma seudónima qué funciones y contenidos de nuestros sitios web se utilizan, cómo y con qué frecuencia. Sobre esta base, podemos mejorar nuestros sitios web para los usuarios."
        },
        marketing: {
            title: "Marketing",
            description: "Utilizamos tecnologías web (también cookies) de socios seleccionados para poder mostrarle contenido y publicidad especialmente adaptados a usted en sitios web y redes sociales. Este contenido se selecciona y muestra en función de su comportamiento de uso. Las cookies publicitarias o de marketing se utilizan para proporcionar a los visitantes anuncios y campañas de marketing relevantes. Estas cookies rastrean a los visitantes a través de sitios web y recopilan información para proporcionar anuncios personalizados."
        }
    },
    french: {
        saveSettings: "Refuser",
        necessary: {
            title: "Nécessaire", //"Necessary Cookies:",
            description: "Les technologies web et les cookies nécessaires rendent notre site web techniquement accessible et utilisable pour vous. Cela s'applique aux fonctionnalités de base fondamentales telles que la navigation sur le site web, l'affichage correct dans votre navigateur Internet ou la demande de votre consentement. Sans ces technologies web et cookies, notre site web ne fonctionne pas.",
        },
        functional: {
            title: "Fonctionnel",
            description: "Les cookies fonctionnels permettent de stocker des informations qui modifient l'apparence ou le comportement du site web. Par exemple, votre langue ou région préférée."
        },
        statisic: {
            title: "Statistiques",
            description: "Nous voulons constamment améliorer la convivialité et les performances de nos sites web. Pour cette raison, nous utilisons des technologies d'analyse (y compris des cookies) qui mesurent et évaluent de manière pseudonyme quelles fonctions et quels contenus de nos sites web sont utilisés, comment et à quelle fréquence. Sur cette base, nous pouvons améliorer nos sites web pour les utilisateurs."
        },
        marketing: {
            title: "Marketing",
            description: "Nous utilisons des technologies web (également des cookies) de partenaires sélectionnés pour pouvoir vous montrer du contenu et de la publicité spécialement adaptés à vous sur des sites web et des réseaux sociaux. Ce contenu est sélectionné et affiché sur la base de votre comportement d'utilisation. Les cookies publicitaires ou de marketing sont utilisés pour fournir aux visiteurs des annonces et des campagnes marketing pertinentes. Ces cookies suivent les visiteurs à travers les sites web et collectent des informations pour fournir des annonces personnalisées."
        }
    },
    italian: {
        saveSettings: "Rifiuta",
        necessary: {
            title: "Necessario",
            description: "Le tecnologie web e i cookie necessari rendono il nostro sito web tecnicamente accessibile e utilizzabile per te. Questo si applica a funzionalità di base fondamentali come la navigazione sul sito web, la visualizzazione corretta nel tuo browser Internet o la richiesta del tuo consenso. Senza queste tecnologie web e cookie, il nostro sito web non funziona.",
        },
        functional: {
            title: "Funzionale",
            description: "I cookie funzionali consentono di salvare informazioni che modificano l'aspetto o il comportamento del sito web. Ad esempio, la tua lingua o regione preferita."
        },
        statisic: {
            title: "Statistiche",
            description: "Vogliamo migliorare costantemente l'usabilità e le prestazioni dei nostri siti web. Per questo motivo utilizziamo tecnologie di analisi (compresi i cookie) che misurano e valutano in modo pseudonimo quali funzioni e contenuti dei nostri siti web vengono utilizzati, come e con quale frequenza. Su questa base possiamo migliorare i nostri siti web per gli utenti."
        },
        marketing: {
            title: "Marketing",
            description: "Utilizziamo tecnologie web (anche cookie) da partner selezionati per poterti mostrare contenuti e pubblicità appositamente studiati per te su siti web e social media. Questi contenuti vengono selezionati e visualizzati in base al tuo comportamento d'uso. I cookie pubblicitari o di marketing vengono utilizzati per fornire ai visitatori annunci e campagne di marketing pertinenti. Questi cookie tracciano i visitatori tra i siti web e raccolgono informazioni per fornire annunci personalizzati."
        }
    },
    dutch: {
        saveSettings: "Weigeren",
        necessary: {
            title: "Noodzakelijk",
            description: "Noodzakelijke webtechnologieën en cookies maken onze website technisch toegankelijk en bruikbaar voor u. Dit geldt voor fundamentele basisfunctionaliteiten zoals navigatie op de website, correcte weergave in uw internetbrowser of het vragen van uw toestemming. Zonder deze webtechnologieën en cookies werkt onze website niet.",
        },
        functional: {
            title: "Functioneel",
            description: "Functionele cookies maken het mogelijk informatie op te slaan die de manier waarop de website verschijnt of werkt, verandert. Bijvoorbeeld uw voorkeurstaal of regio."
        },
        statisic: {
            title: "Statistieken",
            description: "We willen de gebruiksvriendelijkheid en prestaties van onze websites voortdurend verbeteren. Daarom gebruiken we analyse technologieën (inclusief cookies) die pseudoniem meten en evalueren welke functies en inhoud van onze websites worden gebruikt, hoe en hoe vaak. Op basis hiervan kunnen we onze websites verbeteren voor gebruikers."
        },
        marketing: {
            title: "Marketing",
            description: "We gebruiken webtechnologieën (ook cookies) van geselecteerde partners om u inhoud en advertenties te tonen die speciaal op u zijn afgestemd op websites en sociale media. Deze inhoud wordt geselecteerd en weergegeven op basis van uw gebruiksgedrag. Advertentie- of marketingcookies worden gebruikt om bezoekers relevante advertenties en marketingcampagnes te bieden. Deze cookies volgen bezoekers over websites heen en verzamelen informatie om aangepaste advertenties te leveren."
        }
    },
    portuguese: {
        saveSettings: "Recusar",
        necessary: {
            title: "Necessário",
            description: "As tecnologias web e os cookies necessários tornam o nosso site tecnicamente acessível e utilizável para si. Isto aplica-se a funcionalidades básicas fundamentais como a navegação no site, a visualização correta no seu navegador de Internet ou o pedido do seu consentimento. Sem estas tecnologias web e cookies, o nosso site não funciona.",
        },
        functional: {
            title: "Funcional",
            description: "Os cookies funcionais permitem guardar informações que alteram a forma como o site aparece ou se comporta. Por exemplo, o seu idioma ou região preferidos."
        },
        statisic: {
            title: "Estatísticas",
            description: "Queremos melhorar constantemente a usabilidade e o desempenho dos nossos sites. Para isso, utilizamos tecnologias de análise (incluindo cookies) que medem e avaliam de forma pseudónima quais as funções e conteúdos dos nossos sites que são utilizados, como e com que frequência. Com base nisso, podemos melhorar os nossos sites para os utilizadores."
        },
        marketing: {
            title: "Marketing",
            description: "Utilizamos tecnologias web (também cookies) de parceiros selecionados para lhe mostrar conteúdo e publicidade especialmente adaptados a si em sites web e redes sociais. Este conteúdo é selecionado e exibido com base no seu comportamento de utilização. Os cookies publicitários ou de marketing são utilizados para fornecer aos visitantes anúncios e campanhas de marketing relevantes. Estes cookies rastreiam visitantes em sites web e recolhem informações para fornecer anúncios personalizados."
        }

    },
    russian: {
        saveSettings: "Отклонить",
        necessary: {
            title: "Необходимые", //"Necessary Cookies:",
            description: "Необходимые веб-технологии и файлы cookie делают наш сайт технически доступным и используемым для вас. Это относится к основным базовым функциям, таким как навигация по сайту, правильное отображение в вашем интернет-браузере или запрос вашего согласия. Без этих веб-технологий и файлов cookie наш сайт не работает.",
        },
        functional: {
            title: "Функциональные",
            description: "Функциональные файлы cookie позволяют сохранять информацию, которая изменяет внешний вид или действие сайта. Например, ваш предпочитаемый язык или регион."
        },
        statisic: {
            title: "Статистика",
            description: "Мы постоянно стремимся улучшить удобство использования и производительность наших сайтов. Для этого мы используем технологии анализа (включая файлы cookie), которые псевдонимно измеряют и оценивают, какие функции и содержимое наших сайтов используются, как и как часто. На этой основе мы можем улучшить наши сайты для пользователей."
        },
        marketing: {
            title: "Маркетинг",
            description: "Мы используем веб-технологии (также файлы cookie) от выбранных партнеров, чтобы показывать вам контент и рекламу, специально подобранную для вас на сайтах и социальных сетях. Этот контент выбирается и отображается на основе вашего поведения. Файлы cookie для рекламы или маркетинга используются для предоставления посетителям релевантных объявлений и маркетинговых кампаний. Эти файлы cookie отслеживают посетителей по различным сайтам и собирают информацию для предоставления настраиваемых объявлений."
        }
    },
    swedish: {
        saveSettings: "Avvisa",
        necessary: {
            title: "Nödvändiga", //"Necessary Cookies:",
            description: "Nödvändiga webbteknologier och cookies gör vår webbplats tekniskt tillgänglig och användbar för dig. Detta gäller grundläggande basfunktioner som navigering på webbplatsen, korrekt visning i din webbläsare eller begäran om ditt samtycke. Utan dessa webbteknologier och cookies fungerar inte vår webbplats.",
        },
        functional: {
            title: "Funktionell",
            description: "Funktionella cookies gör det möjligt att spara information som ändrar hur webbplatsen visas eller fungerar. Till exempel ditt föredragna språk eller region."
        },
        statisic: {
            title: "Statistik",
            description: "Vi vill ständigt förbättra användarvänligheten och prestandan på våra webbplatser. Därför använder vi analys tekniker (inklusive cookies) som pseudonymt mäter och utvärderar vilka funktioner och innehåll på våra webbplatser som används, hur och hur ofta. På denna grund kan vi förbättra våra webbplatser för användarna."
        },
        marketing: {
            title: "Marknadsföring",
            description: "Vi använder webbteknologier (även cookies) från utvalda partners för att kunna visa dig innehåll och annonser som är speciellt anpassade för dig på webbplatser och sociala medier. Detta innehåll väljs och visas baserat på ditt användarbeteende. Annons- eller marknadsföringscookies används för att ge besökare relevanta annonser och marknadsföringskampanjer. Dessa cookies spårar besökare över webbplatser och samlar in information för att tillhandahålla anpassade annonser."
        }
    },
    norwegian: {
        saveSettings: "Avslå",
        necessary: {
            title: "Nødvendige", //"Necessary Cookies:",
            description: "Nødvendige webteknologier og informasjonskapsler gjør nettstedet vårt teknisk tilgjengelig og brukbart for deg. Dette gjelder grunnleggende funksjoner som navigasjon på nettstedet, riktig visning i nettleseren din eller forespørsel om samtykke. Uten disse webteknologiene og informasjonskapslene fungerer ikke nettstedet vårt.",
        },
        functional: {
            title: "Funksjonell",
            description: "Funksjonelle informasjonskapsler gjør det mulig å lagre informasjon som endrer måten nettstedet vises eller fungerer på. For eksempel ditt foretrukne språk eller region."
        },
        statisic: {
            title: "Statistikk",
            description: "Vi ønsker å forbedre brukervennligheten og ytelsen til nettstedene våre kontinuerlig. Derfor bruker vi analyse teknologier (inkludert informasjonskapsler) som måler og evaluerer pseudonymt hvilke funksjoner og innhold på nettstedene våre som brukes, hvordan og hvor ofte. På denne bakgrunn kan vi forbedre nettstedene våre for brukerne."
        },
        marketing: {
            title: "Markedsføring",
            description: "Vi bruker webteknologier (også informasjonskapsler) fra utvalgte partnere for å kunne vise deg innhold og annonser som er spesielt tilpasset deg på nettsteder og sosiale medier. Dette innholdet velges og vises basert på bruksatferden din. Annonse- eller markedsføringskapsler brukes til å gi besøkende relevante annonser og markedsføringskampanjer. Disse informasjonskapslene sporer besøkende på tvers av nettsteder og samler inn informasjon for å levere tilpassede annonser."
        }
    },
    finnish: {
        saveSettings: "Hylätä",
        necessary: {
            title: "Välttämätön", //"Necessary Cookies:",
            description: "Välttämättömät verkkoteknologiat ja evästeet tekevät verkkosivustostamme teknisesti saavutettavan ja käyttökelpoisen sinulle. Tämä koskee perustavanlaatuisia perustoimintoja, kuten sivuston navigointia, oikeaa näyttöä Internet-selaimessasi tai suostumuksesi pyytämistä. Ilman näitä verkkoteknologioita ja evästeitä verkkosivustomme ei toimi.",
        },
        functional: {
            title: "Toiminnallinen",
            description: "Toiminnalliset evästeet mahdollistavat tietojen tallentamisen, jotka muuttavat sivuston ulkonäköä tai toimintaa. Esimerkiksi suosikkikieli tai alue."
        },
        statisic: {
            title: "Tilastot",
            description: "Haluamme jatkuvasti parantaa verkkosivustojemme käytettävyyttä ja suorituskykyä. Tätä varten käytämme analyysitekniikoita (mukaan lukien evästeet), jotka mittaavat ja arvioivat pseudonyymisti, mitä sivustojemme toimintoja ja sisältöjä käytetään, miten ja kuinka usein. Tällä perusteella voimme parantaa sivustoja käyttäjille."
        },
        marketing: {
            title: "Markkinointi",
            description: "Käytämme valittujen kumppaneiden web-tekniikoita (myös evästeitä) voidaksemme näyttää sinulle sisältöä ja mainoksia, jotka on räätälöity sinulle erityisesti verkkosivustoilla ja sosiaalisissa medioissa. Tämä sisältö valitaan ja näytetään käyttäytymisesi perusteella. Mainos- tai markkinointievästeitä käytetään tarjoamaan vierailijoille relevantteja mainoksia ja markkinointikampanjoita. Nämä evästeet seuraavat vierailijoita sivustoilla ja keräävät tietoja räätälöityjen mainosten tarjoamiseksi."
        }
    },
    polish: {
        saveSettings: "Odrzuć",
        necessary: {
            title: "Niezbędne", //"Necessary Cookies:",
            description: "Niezbędne technologie internetowe i pliki cookie sprawiają, że nasza strona internetowa jest technicznie dostępna i użyteczna dla Ciebie. Dotyczy to podstawowych funkcji, takich jak nawigacja po stronie, prawidłowe wyświetlanie w przeglądarce internetowej lub żądanie Twojej zgody. Bez tych technologii internetowych i plików cookie nasza strona nie działa.",
        },
        functional: {
            title: "Funkcjonalne",
            description: "Pliki cookie funkcjonalne umożliwiają przechowywanie informacji, które zmieniają wygląd lub działanie strony. Na przykład preferowany język lub region."
        },
        statisic: {
            title: "Statystyki",
            description: "Stale dążymy do poprawy użyteczności i wydajności naszych stron internetowych. Dlatego korzystamy z technologii analitycznych (w tym plików cookie), które pseudonimizują pomiar i ocenę, które funkcje i treści naszych stron są używane, jak i jak często. Na tej podstawie możemy poprawić nasze strony dla użytkowników."
        },
        marketing: {
            title: "Reklama",
            description: "Korzystamy z technologii internetowych (w tym plików cookie) od wybranych partnerów, aby móc wyświetlać Ci treści i reklamy specjalnie dostosowane do Ciebie na stronach internetowych i w mediach społecznościowych. Treści te są wybierane i wyświetlane na podstawie Twojego zachowania podczas korzystania z sieci. Pliki cookie reklamowe lub marketingowe są używane do dostarczania odwiedzającym odpowiednich reklam i kampanii marketingowych. Te pliki cookie śledzą odwiedzających na różnych stronach internetowych i zbierają informacje w celu dostarczenia spersonalizowanych reklam."
        }
    },
    chinese: {
        saveSettings: "拒绝",
        necessary: {
            title: "必要的", //"Necessary Cookies:",
            description: "必要的网络技术和Cookie使我们的网站在技术上对您可访问和可用。这适用于基本的基本功能，例如网站导航、在您的互联网浏览器中的正确显示或请求您的同意。没有这些网络技术和Cookie，我们的网站无法正常工作。",
        },
        functional: {
            title: "功能性",
            description: "功能性Cookie允许我们存储更改网站外观或行为的信息。例如，您首选的语言或地区。"
        },
        statisic: {
            title: "统计",
            description: "我们希望不断改善我们网站的可用性和性能。因此，我们使用分析技术（包括Cookie），这些技术以假名方式测量和评估我们网站的哪些功能和内容被使用、如何使用以及使用频率。基于此，我们可以改善我们的网站以满足用户需求。"
        },
        marketing: {
            title: "营销",
            description: "我们使用来自精选合作伙伴的网络技术（包括Cookie），以便在网站和社交媒体上向您展示特别为您量身定制的内容和广告。这些内容根据您的使用行为进行选择和显示。广告或营销Cookie用于向访问者提供相关的广告和营销活动。这些Cookie在不同的网站上跟踪访问者，并收集信息以提供个性化的广告。"
        }
    },
    japanese: {
        saveSettings: "拒否",
        necessary: {
            title: "必要な", //"Necessary Cookies:",
            description: "必要なWeb技術とCookieは、当社のWebサイトを技術的にアクセス可能で使用可能にします。これは、Webサイトのナビゲーション、インターネットブラウザでの正しい表示、または同意の要求など、基本的な機能に適用されます。これらのWeb技術とCookieがないと、当社のWebサイトは機能しません。",
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
    },
    greek: {
        saveSettings: "Απόρριψη",
        necessary: {
            title: "Απαραίτητα", //"Necessary Cookies:",
            description: "Οι απαραίτητες τεχνολογίες ιστού και τα cookies καθιστούν τον ιστότοπό μας τεχνικά προσβάσιμο και χρήσιμο για εσάς. Αυτό ισχύει για βασικές λειτουργίες όπως η πλοήγηση στον ιστότοπο, η σωστή εμφάνιση στον περιηγητή σας στο διαδίκτυο ή η αίτηση της συγκατάθεσής σας. Χωρίς αυτές τις τεχνολογίες ιστού και cookies, ο ιστότοπός μας δεν λειτουργεί.",
        },
        functional: {
            title: "Λειτουργικά",
            description: "Τα λειτουργικά cookies επιτρέπουν την αποθήκευση πληροφοριών που αλλάζουν την εμφάνιση ή τη λειτουργία του ιστότοπου. Για παράδειγμα, η προτιμώμενη γλώσσα ή περιοχή σας."
        },
        statisic: {
            title: "Στατιστικά",
            description: "Θέλουμε να βελτιώνουμε συνεχώς τη χρησιμότητα και την απόδοση των ιστότοπών μας. Για το λόγο αυτό, χρησιμοποιούμε τεχνολογίες ανάλυσης (συμπεριλαμβανομένων των cookies) που μετρούν και αξιολογούν ανώνυμα ποιες λειτουργίες και περιεχόμενο των ιστότοπών μας χρησιμοποιούνται, πώς και πόσο συχνά. Με βάση αυτό, μπορούμε να βελτιώσουμε τους ιστότοπούς για τους χρήστες."
        },
        marketing: {
            title: "Μάρκετινγκ",
            description: "Χρησιμοποι    ούμε τεχνολογίες ιστού (συμπεριλαμβανομένων των cookies) από επιλεγμένους συνεργάτες για να σας δείχνουμε περιεχόμενο και διαφημίσεις ειδικά προσαρμοσμένες για εσάς σε ιστότοπους και κοινωνικά μέσα. Αυτό το περιεχόμενο επιλέγεται και εμφανίζεται με βάση τη συμπεριφορά χρήσης σας. Τα cookies διαφήμισης ή μάρκετινγκ χρησιμοποιούνται για να παρέχουν στους επισκέπτες σχετικές διαφημίσεις και εκστρατείες μάρκετινγκ. Αυτά τα cookies παρακολουθούν τους επισκέπτες σε διάφορους ιστότοπους και συλλέγουν πληροφορίες για την παροχή εξατομικευμένων διαφημίσεων."
        }
    },
    afrikaans: {
        saveSettings: "Weier",
        necessary: {
            title: "Noodsaaklik", //"Necessary Cookies:",
            description: "Noodsaaklike webtegnologieë en koekies maak ons webwerf tegnies toeganklik en bruikbaar vir u. Dit geld vir fundamentele basiese funksies soos navigasie op die webwerf, korrekte vertoon in u internetblaaier of versoek om u toestemming. Sonder hierdie webtegnologieë en koekies werk ons webwerf nie.",
        },
        functional: {
            title: "Funksioneel",
            description: "Funksionele koekies maak dit moontlik om inligting te stoor wat die voorkoms of gedrag van die webwerf verander. Byvoorbeeld, u voorkeurtaal of -streek."
        },
        statisic: {
            title: "Statistiek",
            description: "Ons wil die bruikbaarheid en prestasie van ons webwerwe voortdurend verbeter. Daarom gebruik ons analise tegnologieë (insluitend koekies) wat pseudoniem meet en evalueer watter funksies en inhoud van ons webwerwe gebruik word, hoe en hoe gereeld. Op hierdie basis kan ons ons webwerwe vir gebruikers verbeter."
        },
        marketing: {
            title: "Bemarking",
            description: "Ons gebruik webtegnologieë (ook koekies) van geselekte vennote om u inhoud en advertensies te wys wat spesifiek vir u opgestel is op webwerwe en sosiale media. Hierdie inhoud word gekies en vertoon op grond van u gebruiksgedrag. Advertensie- of bemarkingskoekies word gebruik om besoekers relevante advertensies en bemarkingsveldtogte te bied. Hierdie koekies volg besoekers oor verskillende webwerwe en versamel inligting om gepersonaliseerde advertensies te lewer."
        }
    },
    arabic: {
        saveSettings: "رفض",
        necessary: {
            title: "ضروري", //"Necessary Cookies:",
            description: "تجعل تقنيات الويب وملفات تعريف الارتباط الضرورية موقعنا الإلكتروني متاحًا تقنيًا وقابلًا للاستخدام بالنسبة لك. ينطبق هذا على الوظائف الأساسية الأساسية مثل التنقل في الموقع، والعرض الصحيح في متصفح الإنترنت الخاص بك، أو طلب موافقتك. بدون هذه التقنيات وملفات تعريف الارتباط، لا يعمل موقعنا الإلكتروني.",
        },
        functional: {
            title: "وظيفي",
            description: "تسمح ملفات تعريف الارتباط الوظيفية بتخزين المعلومات التي تغير مظهر الموقع أو سلوكه. على سبيل المثال، لغتك المفضلة أو منطقتك."
        },
        statisic: {
            title: "إحصائيات",
            description: "نريد تحسين سهولة استخدام وأداء مواقعنا الإلكترونية باستمرار. لهذا السبب، نستخدم تقنيات التحليل (بما في ذلك ملفات تعريف الارتباط) التي تقيس وتقييم بشكل مجهول أي الميزات والمحتوى من مواقعنا الإلكترونية يتم استخدامه، وكيف ومتى. بناءً على ذلك، يمكننا تحسين مواقعنا الإلكترونية للمستخدمين."
        },
        marketing: {
            title: "تسويق",
            description: "نستخدم تقنيات الويب (بما في ذلك ملفات تعريف الارتباط) من شركاء مختارين لعرض محتوى وإعلانات مصممة خصيصًا لك على مواقع الويب ووسائل التواصل الاجتماعي. يتم اختيار هذا المحتوى وعرضه بناءً على سلوك استخدامك. تُستخدم ملفات تعريف الارتباط الإعلانية أو التسويقية لتزويد الزوار بإعلانات وحملات تسويقية ذات صلة. تتبع هذه الملفات الزوار عبر مواقع الويب المختلفة وتجمع المعلومات لتقديم إعلانات مخصصة."
        }
    },
    korean: {
        saveSettings: "거부",
        necessary: {
            title: "필수", //"Necessary Cookies:",
            description: "필수 웹 기술과 쿠키는 웹사이트를 기술적으로 접근 가능하고 사용 가능하게 만듭니다. 이는 웹사이트 탐색, 인터넷 브라우저에서 올바르게 표시 또는 동의 요청과 같은 기본 기능에 적용됩니다. 이러한 웹 기술과 쿠키가 없으면 웹사이트가 작동하지 않습니다.",
        },
        functional: {
            title: "기능적",
            description: "기능적 쿠키는 웹사이트의 모양이나 동작을 변경하는 정보를 저장할 수 있습니다. 예를 들어, 선호하는 언어나 지역입니다."
        },
        statisic: {
            title: "통계",
            description: "우리는 웹사이트의 사용 편의성과 성능을 지속적으로 개선하고자 합니다. 이를 위해 분석 기술(쿠키 포함)을 사용하여 웹사이트의 어떤 기능과 콘텐츠가 어떻게, 얼마나 자주 사용되는지를 익명으로 측정하고 평가합니다. 이를 바탕으로 사용자에게 더 나은 웹사이트를 제공할 수 있습니다."
        },
        marketing: {
            title: "마케팅",
            description: "우리는 선택된 파트너의 웹 기술(쿠키 포함)을 사용하여 웹사이트와 소셜 미디어에서 귀하에게 맞춤형 콘텐츠와 광고를 표시합니다. 이 콘텐츠는 귀하의 사용 행동에 따라 선택되고 표시됩니다. 광고 또는 마케팅 쿠키는 방문자에게 관련 광고와 마케팅 캠페인을 제공하는 데 사용됩니다. 이러한 쿠키는 다양한 웹사이트에서 방문자를 추적하고 개인화된 광고를 제공하기 위해 정보를 수집합니다."
        }
    },
    estonian: {
        saveSettings: "Keeldu",
        necessary: {
            title: "Nõutav", //"Necessary Cookies:",
            description: "Nõutavad veebitehnoloogiad ja küpsised muudavad meie veebisaidi tehniliselt kättesaadavaks ja kasutatavaks. See kehtib põhiliste funktsioonide kohta, nagu veebisaidil navigeerimine, õige kuvamine teie veebibrauseris või teie nõusoleku küsimine. Ilma nende veebitehnoloogiate ja küpsisteta meie veebisait ei tööta.",
        },
        functional: {
            title: "Funktsionaalne",
            description: "Funktsionaalsed küpsised võimaldavad salvestada teavet, mis muudab veebisaidi välimust või käitumist. Näiteks teie eelistatud keel või piirkond."
        },
        statisic: {
            title: "Statistika",
            description: "Soovime pidevalt parandada meie veebisaitide kasutatavust ja jõudlust. Selleks kasutame analüüsitehnoloogiaid (sealhulgas küpsiseid), mis mõõdavad ja hindavad anonüümselt, milliseid funktsioone ja sisu meie veebisaitidel kasutatakse, kuidas ja kui sageli. Selle alusel saame oma veebisaite kasutajatele paremaks muuta."
        },
        marketing: {
            title: "Turundus",
            description: "Kasutame valitud partnerite veebitehnoloogiaid (ka küpsiseid), et näidata teile sisu ja reklaame, mis on spetsiaalselt teie jaoks kohandatud veebisaitidel ja sotsiaalmeedias. See sisu valitakse ja kuvatakse vastavalt teie kasutuskäitumisele. Reklaami- või turundusküpsiseid kasutatakse külastajatele asjakohaste reklaamide ja turunduskampaaniate pakkumiseks. Need küpsised jälgivad külastajaid erinevatel veebisaitidel ja koguvad teavet isikupärastatud reklaamide esitamiseks."
        }
    }
}

let tmpl = document.createElement('template');
tmpl.innerHTML = `
<style>:host { display:block; width: auto; max-width: 560px; }</style> <!-- look ma, scoped styles -->
<slot></slot>
`;

/* - - - Function to get Cookie Settings from url and set the cookie - - - */
function intaSetCookieSettings() {
    const urlParams = new URLSearchParams(window.location.search);
    const cookieSettings = urlParams.get('intaCookieSettings');
    const reload = urlParams.get('reload');

    /*  console.log("Cookie Settings from URL", window.location.host); */
    if (cookieSettings && !reload) {
        /* console.log("Setting the new cookie" + cookieSettings); */

        document.cookie = int_hideCookieBannerName + "=" + cookieSettings + "; expires=" + cookieLifeTime +
            "; path=/; " +
            intCookieDomain +
            "SameSite=Lax";
        // Reload the page and append to exising query string the reload parameter
        window.location.href = window.location.href + "&reload=true";
    }
};

window.addEventListener("DOMContentLoaded", (event) => {
    window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments) };

    window.clarity && window.clarity('consentv2', {
        ad_Storage: "denied",
        analytics_Storage: "denied"
    });

    const optedOut = localStorage.getItem('ccpa_opt_out');
    if (optedOut === 'true') {
        gtag('consent', 'update', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
        });
        // Pintrk
        if (typeof pintrk === 'function') {
            try {
                pintrk('setconsent', false);
            } catch (e) { /* ignore */ }
        }
    }

    if (document.getElementById("intastellar-gdpr-settings-js-after") !== null) {
        console.warn(`IntastellarSolutionsSDK: You´re using an old version of our cookie solutions for WordPress. To make sure to get the latest updates and features, please download the latest version from our Website:
        https://www.intastellarsolutions.com/cookie-solutions/downloads`);
    }
    customElements.define('inta-consents-content', class extends HTMLElement {
        constructor() {
            super(); // always call super() first in the constructor.
            let templ = document.createElement("template");
            templ.innerHTML = `
                <style>
                    :host{
                        min-width: 400px;
                        margin-inline: auto;
                        padding: 25px 15px;
                        color: rgb(36, 36, 36);
                        background-color: #fff;
                        border: 3px dotted;
                        position: relative;
                        text-align: center;
                        border-radius: 5px;
                    }
                </style>
            `
            // Attach a shadow root to the element.
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
            shadowRoot.appendChild(templ.content.cloneNode(true))
        }
        // ...
    });

    customElements.define('intastellar-consents', class extends HTMLElement {
        constructor() {
            super(); // always call super() first in the constructor.
            let templ = document.createElement("template");
            templ.innerHTML = `
                <style>
                    :host{
    
                    }
                </style>
            `
            // Attach a shadow root to the element.
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
            shadowRoot.appendChild(templ.content.cloneNode(true))
        }
    })

    customElements.define('inta-consents-section', class extends HTMLElement {
        constructor() {
            super(); // always call super() first in the constructor.

            // Attach a shadow root to the element.
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
        }
        // ...
    });

    customElements.define('inta-consents-logo', class extends HTMLElement {
        constructor() {
            super(); // always call super() first in the constructor.

            // Attach a shadow root to the element.
            let tmplStyle = document.createElement("template");
            tmplStyle.innerHTML = `<style>:host{display:block; width: auto;}</style><slot></slot>`;
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(tmplStyle.content.cloneNode(true));
        }
        // ...
    });

    customElements.define('inta-consents-bg', class extends HTMLElement {
        constructor() {
            super(); // always call super() first in the constructor.
            // Attach a shadow root to the element.
            let tmplStyle = document.createElement("style");
            tmplStyle.innerHTML = `:host{display:block; width: auto;background-image: url(${this.getAttribute("inta-bg-img")}); background-size: cover;}`;
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(tmplStyle);
        }
        // ...
    });
});

/* Custom error message */

class IntastellarSolutionsSDK extends Error {
    constructor(message) {
        super(message);
        this.name = 'IntastellarSolutionsSDKError';
    }
};

const intCookieDomain = (function () {
    "use strict";
    var i = 0,
        d = (document.domain === "localhost" || window.location.host === "localhost" || document.domain === "" || window.location.host === "127.0.0.1" || window.location.host.indexOf("127.0.0.1") > -1) ? "127.0.0.1" : document.domain || window.location.host,
        p = d.split(".")

    d = p.slice(-1 - ++i).join(".");
    d = d;

    return "domain=." + d + ";";
})();

const intCookieDomainWithWWW = (function () {
    "use strict";
    var i = 0,
        d = (document.domain === "localhost" || window.location.host === "localhost" || document.domain === "127.0.0.1" || window.location.host === "127.0.0.1") ? "" : document.domain || window.location.host,
        p = d.split(".")

    d = p.slice(-1 - ++i).join(".");
    d = d;

    return "domain=www." + d + ";";
})();

/* Find specific parameter on current Script */

function findScriptParameter(value) {
    const currentURL = document.currentScript.src;

    if (currentURL.indexOf(value) > -1) {
        let url = new URL(currentURL);
        let param = url.searchParams;
        return param.get(value);
    }

    return undefined;

}

const allowAllCookieName = "__all__cookies";
const essentialsCookieName = "__essential__cookies";
const blockTrackingCookies = "__hideTrackingCookies";
const blockAdvertismentCookies = "__hideAdvertisementCookies";
const intHead = document.querySelector("head");

const cookieLifeTime = new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * 200).toGMTString();
/* List of cookies that should not be deleted */

const inta_requiredCookieList = [{
    vendor: (window.INTA?.settings?.company) ? window.INTA?.settings?.company : window.location.host,
    cookies: [
        {
            cookie: "PHPSESSID",
            purpose: "This cookie is native to PHP applications. The cookie is used to store and identify a users' unique session ID for the purpose of managing user session on the website. The cookie is a session cookies and is deleted when all the browser windows are closed.",
        },
        {
            cookie: "SCJP",
            purpose: "",
        },
        {
            cookie: "SCJD",
            purpose: "",
        },
        {
            cookie: "SCWCD",
            purpose: "",
        },
        {
            cookie: "SCBCD",
            purpose: "",
        },
        {
            cookie: "SCDJWS",
            purpose: "",
        },
        {
            cookie: "__hs_cookie_cat_pref",
            purpose: "Hubspot uses this cookie to remember the user's cookie consent preferences. It is necessary for HubSpot's Cookie Consent functionality.",
        }
    ],
    domains: [
        window.INTA.settings.rootDomain,
        window.location.host
    ]
},
{
    vendor: "Intastellar Solutions, International",
    cookies: [
        {
            cookie: int_visitorCheck,
            purpose: "It´s function is the find out if a user has already visit the page, to know if information should be collected or not.",
        },
        {
            cookie: int_hideCookieBannerName,
            purpose: "It´s function is to hide the popup window onload after user has accept or rejected cookies.",
        },
        {
            cookie: int_marketingCookies,
            purpose: "Its function is to store users cookie choice regarding marketing / advertising cookies. Its purpose is to store a users cookie choice whether a user allows tracking & cookies for advertising purposes or not.",
        },
        {
            cookie: int_staticsticCookies,
            purpose: "Its function is to store users cookie choice regarding statistical cookies. Its purpose is to store a users cookie choice whether a user allows tracking & cookies for statistical purposes or not.",
        },
        {
            cookie: int_FunctionalCookies,
            purpose: "Its function is to store users cookie choice regarding functional cookies. Its purpose is to store a users cookie choice whether a user allows storing for functional purposes like chosen region, or not.",
        },
        {
            cookie: "c_user",
            purpose: ""
        }
    ],
    vendor_privacy: "https://www.intastellarsolutions.com/about/legal/privacy",
    domains: [
        "intastellarsolutions.com",
        "consents.cdn.intastellarsolutions.com",
        "intastellarconsents.com",
        window.location.host,
        window.INTA.settings.rootDomain
    ]
},
{
    vendor: "WooCommerce",
    cookies: [
        {
            cookie: "woocommerce_cart_hash",
            purpose: "Helps WooCommerce determine when cart contents/data changes",
        },
        {
            cookie: "woocommerce_items_in_cart",
            purpose: "Helps WooCommerce determine when cart contents/data changes.",
        },
        {
            cookie: "wp_woocommerce_session_",
            purpose: "Contains a unique code for each customer so that it knows where to find the cart data in the database for each customer"
        },
        {
            cookie: "woocommerce_recently_viewed",
            purpose: "Powers the Recent Viewed Products widget",
        },
        {
            cookie: "store_notice[notice id]",
            purpose: "Allows customers to dismiss the Store Notice."
        }
    ],
    vendor_privacy: "https://automattic.com/privacy/",
    domains: [
        window.location.host,
        window.INTA.settings.rootDomain
    ]
},
{
    vendor: "Microsoft Inc, ASP.NET",
    cookies: [
        {
            cookie: "ASP.NET_SessionId",
            purpose: "Supports the integration of third-party platform on the Website",
        },
        {
            cookie: ".AspNetCore.Session",
            purpose: ""
        }
    ],
    vendor_privacy: "https://privacy.microsoft.com/en-gb/privacystatement",
    domains: [
        window.location.host,
        window.INTA.settings.rootDomain
    ]
},
{
    vendor: "Amazon Web Services",
    cookies: [
        {
            cookie: "AWSALB",
            purpose: "Required for the website to perform properly.",
        },
        {
            cookie: "AWSALBCORS",
            purpose: "Supports the website's technical functions.",
        }
    ],
    vendor_privacy: "https://aws.amazon.com/privacy/",
    domains: [
        window.location.host,
        window.INTA.settings.rootDomain
    ]
},
{
    vendor: "HubSpot",
    cookies: [
        {
            cookie: "__hs_opt_out",
            purpose: "This cookie is used by the opt-in privacy policy to remember not to ask the visitor to accept cookies again.",
        },
        {
            cookie: "__hs_do_not_track",
            purpose: "This cookie can be set to prevent the HubSpot tracking cookie from being set.",
        },
        {
            cookie: "__hs_initial_opt_in",
            purpose: "This cookie is used to prevent the banner from always displaying when visitors are browsing in strict mode.",
        },
        {
            cookie: "__hs_cookie_cat_prefs",
            purpose: "This cookie is used to store the HubSpot cookie category preferences of a visitor.",
        }
    ],
    vendor_privacy: "https://legal.hubspot.com/privacy-policy",
    domains: [
        window.location.host
    ]
}
];
/* - - - List of Analytics / Statistics cookie names - - - */
const inta_statisticCookieList = [];
inta_statisticCookieList.push({
    vendor: "Microsoft Inc",
    cookies: [
        {
            cookie: "ANONCHK",
            purpose: "Indicates whether MUID is transferred to ANID, a cookie used for advertising. Clarity doesn't use ANID and so this is always set to 0."
        },
        {
            cookie: "MR",
            purpose: "Indicates whether to refresh MUID."
        },
        {
            cookie: "MUID",
            purpose: "Identifies unique web browsers visiting Microsoft sites. These cookies are used for advertising, site analytics, and other operational purposes."
        },
        {
            cookie: "SM",
            purpose: "Used in synchronizing the MUID across Microsoft domains."
        }
    ],
    vendor_privacy: "https://privacy.microsoft.com/en-gb/privacystatement",
    domains: [
        window.location.host,
        "microsoft.com",
        "bing.com",
    ]
});
inta_statisticCookieList.push({
    vendor: "Clarity / Microsoft Inc",
    cookies: [
        {
            cookie: "_clck",
            purpose: "Persists the Clarity User ID and preferences, unique to that site, on the browser. This ensures that behavior in subsequent visits to the same site will be attributed to the same user ID.",
        },
        {
            cookie: "_clsk",
            purpose: "Connects multiple page views by a user into a single Clarity session recording.",
        },
        {
            cookie: "CLID",
            purpose: "Identifies the first-time Clarity saw this user on any site using Clarity."
        }
    ],
    vendor_privacy: "https://privacy.microsoft.com/en-gb/privacystatement",
    domains: [
        window.location.host,
        "microsoft.com",
        "bing.com",
        "clarity.ms"
    ]
})
inta_statisticCookieList.push({
    vendor: "Mixpanel",
    cookies: [
        {
            cookie: "mp_*_mixpanel",
            purpose: "",
        },
        {
            cookie: "mp_[^/a-zA-Z/]_mixpanel",
            purpose: "",
        },
        {
            cookie: "mixpanel_distinct_id",
            purpose: "To store a unique user ID, store account details.",
        },
        {
            cookie: "mixpanel",
            purpose: ""
        }
    ],
    vendor_privacy: "https://mixpanel.com/legal/privacy-policy/",
    domains: [
        window.location.host,
        "mixpanel.com",
    ]
})
inta_statisticCookieList.push({
    vendor: "Google Inc",
    cookies: [
        {
            cookie: "_ga",
            purpose: "to store and count pageviews.",
        },
        {
            cookie: "__gp",
            purpose: "",
        },
        {
            cookie: "_gid",
            purpose: ""
        },
        {
            cookie: "_dc_gtm_",
            purpose: ""
        },
        {
            cookie: "_gaexp_rc",
            purpose: ""
        },
        {
            cookie: "_gaexp",
            purpose: ""
        },
        {
            cookie: "_gat",
            purpose: ""
        },
        {
            cookie: "_opt_expid",
            purpose: ""
        },
        {
            cookie: "FPAU",
            purpose: ""
        },
        {
            cookie: "FPGCLDC",
            purpose: ""
        },
        {
            cookie: "_gcl_dc",
            purpose: ""
        },
        {
            cookie: "_gcl_au",
            purpose: ""
        },
        {
            cookie: "FCNEC",
            purpose: ""
        },
        {
            cookie: "FPLC",
            purpose: ""
        },
        {
            cookie: "FPGCLAW",
            purpose: ""
        },
        {
            cookie: "FPGCLGB",
            purpose: ""
        },
        {
            cookie: "_gcl_aw",
            purpose: ""
        },
        {
            cookie: "_gac_gb_",
            purpose: ""
        },
        {
            cookie: "_gcl_gb",
            purpose: ""
        },
        {
            cookie: "__utma",
            purpose: "to Store the calculation of days and time to purchase."
        },
        {
            cookie: "__utmb",
            purpose: "to store time of visit."
        },
        {
            cookie: "__utmc",
            purpose: "to store time of visit."
        },
        {
            cookie: "__utmt",
            purpose: "to store time of visit."
        },
        {
            cookie: "__utmz",
            purpose: "to store used keyword and search engine."
        },
        {
            cookie: "__utmv",
            purpose: ""
        },
        {
            cookie: "FPID",
            purpose: ""
        },
        {
            cookie: "_opt",
            purpose: ""
        },
        {
            cookie: "_gcl",
            purpose: "to provide ad delivery or retargeting."
        }
    ],
    domains: [
        "youtube.com",
        "youtube-nocookie.com",
        "google.com"
    ],
    vendor_privacy: "https://policies.google.com/privacy"
})

inta_statisticCookieList.push({
    vendor: "Omnisend",
    cookies: [
        {
            cookie: "soundestID",
            purpose: "This cookie is set by the provider Omnisend. This cookie is used for determining if a visitor is new to the website or the visitor had visited before."
        },
        {
            cookie: "omnisendSessionID",
            purpose: "This cookie is set by the provider Omnisend. This cookie is used for setting a unique ID for the session. The cookie collects information on visitor behaviour on the website for statistical purposes."
        },
        {
            cookie: "page-views",
            purpose: null
        }
    ],
    domains: [
        "omnisend.com",
        "omnisnippet1.com",
        "soundestlink.com"
    ],
    vendor_privacy: ""
})

inta_statisticCookieList.push({
    vendor: "HubSpot Inc",
    cookies: [
        {
            "cookie": "__hssc",
            "purpose": "Tracks sessions. This is used to determine if HubSpot should increment the session number and timestamps in the __hstc cookie. It contains the domain, viewCount (increments each pageView in a session), and session start timestamp. It expires in 30 minutes."
        },
        {
            "cookie": "__hssrc",
            "purpose": "Whenever HubSpot changes the session cookie, this cookie is also set to determine if the visitor has restarted their browser. If this cookie doesn't exist when HubSpot manages cookies, it's considered a new session. It contains the value '1' when present. It expires at the end of the session."
        },
        {
            "cookie": "__hstc",
            "purpose": "The main cookie used for tracking visitors. It contains the domain, HubSpotutk, initial timestamp (first visit), last timestamp (last visit), current timestamp (this visit), and session number (increments for each subsequent session). It expires in six months."
        },
        {
            "cookie": "hs-messages-is-open",
            "purpose": `Used to determine and save whether the chat widget is open for future visits.

            It's set in your visitor's browser when they start a new chat, and resets to re-close the widget after 30 minutes of inactivity.`
        },
        {
            "cookie": "Hubspotutk",
            "purpose": "Keeps track of a visitor's identity. It's passed to HubSpot on form submission and used when deduplicating contacts. It contains an opaque GUID to represent the current visitor."
        }
    ],
    domains: [
        "hubspot.com",
        "hs-scripts.com",
        "hs-analytics.net",
        "hsforms.com",
        "hsadspixel.net",
        "hs-banner.com",
        "hscollectedforms.net",
        "hscta.net",
        "hsleadflows.net",
        "hs-scripts.net",
        "hsstatic.net",
        "hubspot.net",
        "hubspot.de",
    ],
    vendor_privacy: "https://legal.hubspot.com/privacy-policy"
})

inta_statisticCookieList.push({
    vendor: "x.clearbitjs.com",
    cookies: [
        {
            cookie: "cb%3Atest",
            purpose: "Collects data on the user's visits to the website, such as the number of visits, average time spent on the website and what pages have been loaded with the purpose of generating reports for optimising the website content."
        }
    ],
    domains: [
        "x.clearbitjs.com",
        "clearbit.com",
        window.location.host,
        window.INTA.settings.rootDomain
    ],
    vendor_privacy: "https://clearbit.com/privacy"
});

inta_statisticCookieList.push({
    vendor: "Hotjar Ltd.",
    cookies: [
        {
            cookie: "_hjIncludedInSample",
            purpose: "Used to determine whether a user is included in the sample which is used to generate funnels."
        },
        {
            cookie: "_hjMinimizedPolls",
            purpose: "This cookie is set when a visitor minimizes a feedback poll."
        },
        {
            cookie: "_hjDonePolls",
            purpose: "This cookie is set once a visitor has completed a feedback poll."
        },
        {
            cookie: "_hjClosedSurveyInvites",
            purpose: "This cookie is set when a visitor closes a survey invitation."
        },
        {
            cookie: "_hjSession",
            purpose: "This cookie is used to identify a single user session."
        },
        {
            cookie: "_hjSessionTooLarge",
            purpose: "This cookie is set to let Hotjar know whether a session recording size exceeded the limit."
        },
        {
            cookie: "_hjSessionResumed",
            purpose: "This cookie is set when a visitor resumes a session recording."
        },
        {
            cookie: "_hjLocalStorageTest",
            purpose: "This cookie is used to check if the visitor's browser supports local storage."
        },
        {
            cookie: "_hjAbsoluteSessionInProgress",
            purpose: "This cookie is used to count how many times a visitor has visited a site in a 30-minute time frame."
        },
        {
            cookie: "_hjTLDTest",
            purpose: "This cookie is used to determine the most generic domain possible to set the cookie for the site."
        },
        {
            cookie: "_hjRecordingEnabled",
            purpose: "This cookie is set to let Hotjar know whether recording is enabled for the session."
        },
        {
            cookie: "_hjRecordingLastActivity",
            purpose: "This cookie is used to store the last activity time of a visitor when they are recording a session."
        },
        {
            cookie: "_hjShownFeedbackMessage",
            purpose: "This cookie is set when a visitor has seen the 'Thank you' message after submitting feedback."
        },
        {
            cookie: "_hjViewportId",
            purpose: "This cookie is used to store the visitor's viewport size."
        },
        {
            cookie: "_hjFirstSeen",
            purpose: "This cookie is set to identify a new user’s first session."
        },
        {
            cookie: "_hjSessionUser_",
            purpose: "This cookie is used to persist the user ID of a returning user."
        },
        {
            cookie: "_hjid",
            purpose: "This cookie is set when the Hotjar script loads and is used to persist the Hotjar User ID."
        }
    ],
    domains: [
        "hotjar.com"
    ],
    vendor_privacy: "https://help.hotjar.com/hc/en-us/articles/115011789248-Hotjar-Cookies"
});

/* - - - List of Marketing cookies - - - */
const inta_marketingCookieList = [];
inta_marketingCookieList.push(
    {
        vendor: "Meta Inc",
        cookies: [
            {
                cookie: "_fbp",
                purpose: "to store and track visits across websites."
            },
            {
                cookie: "fr",
                purpose: "to deliver, measure and improve the relevancy of ads."
            },
            {
                cookie: "datr",
                purpose: "to identify browsers and devices for security and site integrity purposes."
            },
            {
                cookie: "sb",
                purpose: "to identify browsers and devices for security and site integrity purposes."
            },
            {
                cookie: "c_user",
                purpose: ""
            },
            {
                cookie: "xs",
                purpose: ""
            }
        ],
        domains: [
            "facebook.com",
            "facebook.net",
            "fbcdn.net",
            "instagram.com"
        ],
        vendor_privacy: "https://www.facebook.com/privacy/policy/?entry_point=comet_dropdown"
    }
);
inta_marketingCookieList.push({
    vendor: "Google Inc",
    cookies: [
        {
            cookie: "__gsas",
            purpose: ""
        },
        {
            cookie: "__gpi",
            purpose: ""
        },
        {
            cookie: "__gpi_optout",
            purpose: "",
        },
        {
            cookie: "__gads",
            purpose: ""
        },
        {
            cookie: "GED_PLAYLIST_ACTIVITY",
            purpose: ""
        },
        {
            cookie: "FPAU",
            purpose: "",
        },
        {
            cookie: "FPGCLDC",
            purpose: "",
        },
        {
            cookie: "_gcl_dc",
            purpose: "",
        },
        {
            cookie: "_gcl_gb",
            purpose: "",
        },
        {
            cookie: "_gcl_au",
            purpose: "",
        },
        {
            cookie: "FPGCLAW",
            purpose: "",
        },
        {
            cookie: "FPGCLGB",
            purpose: "",
        },
        {
            cookie: "_gac_gb_",
            purpose: "",
        },
        {
            cookie: "CONSENT",
            purpose: "",
        },
        {
            cookie: "_gcl_aw",
            purpose: "",
        },
        {
            cookie: "GoogleAdServingTest",
            purpose: ""
        },
        {
            cookie: "ga-audiences",
            purpose: "Used by Google AdWords to re-engage visitors that are likely convert to customers based on the visitor´s online behaviour across websites."
        }
    ],
    domains: [
        "googletagmanager.com",
        "googleadservice.com",
        "google-analytics.com",
        "google.com"
    ],
    vendor_privacy: "https://policies.google.com/privacy"
});

inta_marketingCookieList.push({
    vendor: "HubSpot Inc",
    cookies: [
        {
            cookie: "hubspotutk",
            purpose: "This cookie is used for to keep track of a visitor's identity. This cookie is passed to HubSpot on form submission and used when de-duplicating contacts."
        },
        {
            cookie: "messagesUtk",
            purpose: "This cookie is used to recognize visitors who chat with you via the messages tool. If the visitor leaves your site before they're added as a contact, they will have this cookie associated with their browser."
        },
        {
            cookie: "__hstc",
            purpose: "The main cookie for tracking visitors. It contains the domain, utk, initial timestamp (first visit), last timestamp (last visit), current timestamp (this visit), and session number (increments for each subsequent session)."
        },
        {
            cookie: "__hssc",
            purpose: "This cookie keeps track of sessions. This is used to determine if HubSpot should increment the session number and timestamps in the __hstc cookie. It contains the domain, viewCount (increments each pageView in a session), and session start timestamp."
        },
        {
            cookie: "__hssrc",
            purpose: "Whenever HubSpot changes the session cookie, this cookie is also set to determine if the visitor has restarted their browser. If this cookie does not exist when HubSpot manages cookies, it is considered a new session."
        },
        {
            cookie: "__hs_opt_out",
            purpose: "This cookie is used by the opt-in privacy policy to remember not to ask the visitor to accept cookies again."
        },
        {
            cookie: "__hs_do_not_track",
            purpose: "This cookie can be set to prevent the tracking code from sending any information to HubSpot. Setting this cookie is different from opting out of cookies, as it still allows anonymized information to be sent to HubSpot."
        },
        {
            cookie: "__cf_bm",
            purpose: "This cookie is used to distinguish between humans and bots. This is beneficial for the website, in order to make valid reports on the use of their website."
        },
        {
            cookie: "_cfuvid",
            purpose: "This cookie is used to distinguish between humans and bots. This is beneficial for the website, in order to make valid reports on the use of their website."
        }
    ],
    domains: [
        "hubspot.com",
        "hs-scripts.com",
        "hs-analytics.net",
        "hsforms.com",
        "hsadspixel.net",
        "hs-banner.com",
        "hscollectedforms.net",
        "hscta.net",
        "hsleadflows.net",
        "hs-scripts.net",
        "hsstatic.net",
        "hubspot.net",
        "hubspot.de",
    ],
    vendor_privacy: "https://legal.hubspot.com/privacy-policy"
});

inta_marketingCookieList.push({
    vendor: "x.clearbitjs.com",
    cookies: [
        {
            cookie: "__tld__",
            purpose: "Used to track visitors on multiple websites, in order to present relevant advertisement based on the visitor's preferences.",
        },
        {
            cookie: "cb_anonymous_id",
            purpose: "Collects data on visitor behaviour from multiple websites, in order to present more relevant advertisement - This also allows the website to limit the number of times that they are shown the same advertisement."
        },
        {
            cookie: "cb_user_id",
            purpose: "Collects data on visitor behaviour from multiple websites, in order to present more relevant advertisement - This also allows the website to limit the number of times that they are shown the same advertisement"
        },
        {
            cookie: "cb_group_id",
            purpose: "Collects data on visitors. This information is used to assign visitors into segments, making website advertisement more efficient."
        },
        {
            cookie: "cb_group_properties",
            purpose: "Collects data on visitor behaviour from multiple websites, in order to present more relevant advertisement - This also allows the website to limit the number of times that they are shown the same advertisement."
        },
        {
            cookie: "cb_user_traits",
            purpose: "Collects data on visitor behaviour from multiple websites, in order to present more relevant advertisement - This also allows the website to limit the number of times that they are shown the same advertisement"
        }
    ],
    domains: [
        "x.clearbitjs.com",
        "clearbit.com",
        window.location.host
    ],
    vendor_privacy: "https://clearbit.com/privacy"
})

inta_marketingCookieList.push({
    vendor: "LinkedIn Inc",
    cookies: [
        {
            cookie: "li_giant",
            purpose: "",
        },
        {
            cookie: "li_fat_id",
            purpose: ""
        },
        {
            cookie: "ln_or",
            purpose: "Used to determine if Oribi analytics can be carried out on a specific domain"
        }
    ],
    domains: [
        "linkedin.com",
        "licdn.com"
    ],
    vendor_privacy: "https://www.linkedin.com/legal/privacy-policy"
});

inta_marketingCookieList.push({
    vendor: "MailChimp",
    cookies: [
        {
            cookie: "MCPopupClosed",
            purpose: "to store if a message has been dismissed.",
        },
        {
            cookie: "Mailchimp.cart.*",
            purpose: ""
        },
        {
            cookie: "mctb_bar_hidden",
            purpose: ""
        },
        {
            cookie: "mailchimp_campaign_id",
            purpose: "to store and track the email campaign."
        },
        {
            cookie: "mailchimp_email_id",
            purpose: "to store and track the email campaign."
        },
        {
            cookie: "Mc_landing_site",
            purpose: "to store which page was visited first."
        },
        {
            cookie: "Mailchimp_landing_site",
            purpose: "to store which page was visited first."
        },
        {
            cookie: "Mailchimp_cart_previous_email",
            purpose: "to store information for remarketing purposes."
        },
        {
            cookie: "Mailchimp_cart_current_email",
            purpose: "to store information for remarketing purposes."
        },
        {
            cookie: "Mailchimp_user_previous_email",
            purpose: ""
        },
        {
            cookie: "mailchimp_user_email",
            purpose: ""
        },
        {
            cookie: "mailchimp.cart.previous_email",
            purpose: "to store information for remarketing purposes."
        },
        {
            cookie: "mailchimp.cart.current_email",
            purpose: "to store information for remarketing purposes."
        }
    ],
    domains: [
        "mailchimp.com",
        "mailchimp.com",
        "mailchimpapp.com",
        "tumblr.com"
    ],
    vendor_privacy: "https://mailchimp.com/en-gb/legal/privacy/"
});

inta_marketingCookieList.push({
    vendor: "Trustpilot A/S",
    cookies: [
        {
            cookie: "CONSENT",
            purpose: "",
        }
    ],
    domains: [
        "trustpilot.com",
        "trustpilot.dk",
        "trustpilot.co.uk",
        "cdn.segment.com",
        "trustpilot-assets.com",
        "trustpilot-api.com",
        "segment.com",
    ],
    vendor_privacy: "https://legal.trustpilot.com/for-reviewers/end-user-privacy-terms"
});

inta_marketingCookieList.push({
    vendor: "YouTube",
    cookies: [
        {
            cookie: "GPS",
            purpose: "",
        },
        {
            cookie: "PREF",
            purpose: "",
        },
        {
            cookie: "VISITOR_INFO1_LIVE",
            purpose: ""
        },
        {
            cookie: "YSC",
            purpose: "",
        }
    ],
    domains: [
        "youtube.com",
        "youtube-nocookie.com"
    ],
    vendor_privacy: "https://policies.google.com/privacy"
});

inta_marketingCookieList.push({
    vendor: "Microsoft Inc",
    cookies: [
        {
            cookie: "_uetvid",
            purpose: "",
        },
    ],
    domains: [
        "bing.com",
        "clarity.com"
    ],
    vendor_privacy: "https://privacy.microsoft.com/en-gb/privacystatement"
});

inta_marketingCookieList.push({
    vendor: "Twitter Intl Co",
    cookies: [
        {
            cookie: "personalization_id",
            purpose: "This cookie tracks activities on and off Twitter for a personalized experience",
        },
    ],
    domains: [
        "t.co",
        "x.com",
        "twitter.com"
    ],
    vendor_privacy: "https://privacy.microsoft.com/en-gb/privacystatement"
});

inta_marketingCookieList.push({
    vendor: "Casale Media",
    cookies: [
        {
            cookie: "CMID",
            purpose: "Casale Media sets thias cookie to collect information on user behavior, for targeted advertising.",
        },
        {
            cookie: "CMPS",
            purpose: "CMPS cookie is set by Casale Media for anonymous tracking based on user´s website visits, for displaying targeted ads.",
        }
    ],
    domains: [],
    vendor_privacy: null
});

inta_marketingCookieList.push({
    vendor: "Vimeo Inc",
    cookies: [
        {
            cookie: "Vuid",
            purpose: "to store the user's usage history.",
        },
        {
            cookie: "__utmt_player",
            purpose: "Google Analytics cookie deployed by Vimeo which is used to throttle the request rate for the service – limiting the collection of data on high traffic sites. As such, this cookie for the Vimeo player assists in the players performance/uptime monitoring and placement on customer sites. “Utmt” Indicates the type of request, which is one of: event, transaction, item, or custom variable. The item in this case being the Vimeo player as indicated by the word “player”."
        }
    ],
    domains: [
        "vimeo.com",
        "player.vimeo.com"
    ],
    vendor_privacy: "https://vimeo.com/privacy"
});

/* - - - List of functional cookies - - - */
const inta_functionalCookieList = [];
inta_functionalCookieList.push({
    vendor: (window.INTA?.settings?.company) ? window.INTA?.settings?.company : window.location.host,
    cookies: [
        {
            cookie: "language",
            purpose: "This cookie is used to set users prefrence regarding the selected language.",
        },
        {
            cookie: "lang",
            purpose: "This cookie is used to set users prefrence regarding the selected language.",
        },
        {
            cookie: "hl",
            purpose: "This cookie is used to set users prefrence regarding the selected language.",
        },
        {
            cookie: "locale",
            purpose: "This cookie is used to set users prefrence regarding the selected region.",
        }
    ],
    vendor_privacy: null,
    domains: [
        window.location.host
    ]
})

inta_functionalCookieList.push({
    vendor: "Google Inc",
    cookies: [
        {
            cookie: "FCCDCF",
            purpose: "",
        },
        {
            cookie: "NID",
            purpose: "",
        },
        {
            cookie: "AMP_TOKEN",
            purpose: "",
        },
        {
            cookie: "_GRECAPTCHA",
            purpose: "Ensures the website and application security.",
        }
    ],
    domains: [
        "googletagmanager.com",
        "googleadservice.com",
        "google-analytics.com",
        "google.com",
        "fonts.google.com"
    ],
    vendor_privacy: "https://policies.google.com/privacy"
})

inta_functionalCookieList.push({
    vendor: "Google Fonts",
    cookies: [
        {
            cookie: "FCCDCF",
            purpose: "",
        },
        {
            cookie: "NID",
            purpose: "",
        },
        {
            cookie: "AMP_TOKEN",
            purpose: "",
        }
    ],
    domains: [
        "fonts.google.com",
        "google.com",
        window.location.host
    ],
    vendor_privacy: "https://policies.google.com/privacy"
})

inta_functionalCookieList.push({
    vendor: "jsdelivr.com",
    cookies: [
        {
            cookie: "__cfduid",
            purpose: "Used by the content network, Cloudflare, to identify trusted web traffic.",
        }
    ],
    domains: [
        "jsdelivr.net",
        "cdnjs.com",
        "cdn.jsdelivr.net",
        "jsdelivr.com",
        "cdnjs.cloudflare.com",
        "cloudflare.com",
        "cloudflare.net",
        "cloudflareinsights.com",
        "cloudflarestream.com",
        "cloudflarewatch.com",
    ],
    vendor_privacy: "https://www.jsdelivr.com/terms/privacy-policy-jsdelivr-net"
})

inta_functionalCookieList.push({
    vendor: "Stripe",
    cookies: [
        {
            cookie: "__stripe_sid",
            purpose: "Fraud prevention",
        },
        {
            cookie: "__stripe_mid",
            purpose: "Fraud prevention",
        },
    ],
    domains: [
        "stripe.com"
    ],
    vendor_privacy: "https://stripe.com/gb/privacy"
})

inta_functionalCookieList.push({
    vendor: "CloudFlare",
    cookies: [
        {
            cookie: "__cf_bm",
            purpose: "to read and filter requests from bots.",
        }
    ],
    domains: [
        "vimeo.com",
        "player.vimeo.com"
    ],
    vendor_privacy: "https://www.cloudflare.com/en-gb/privacypolicy/"
})

inta_functionalCookieList.push({
    vendor: "Dynatrace",
    cookies: [
        {
            cookie: "rxvt",
            purpose: "Dynatrace. Session timeout.",
        },
        {
            cookie: "dtLatC",
            purpose: "Dynatrace. Measures server latency for performance monitoring.",
        },
        {
            cookie: "rxVisitor",
            purpose: "Dynatrace. This cookie is used to store an anonymous ID for the user to correlate across sessions on the world service.",
        },
        {
            cookie: "dtCookie",
            purpose: "Dynatrace. Tracks a visit across multiple requests",
        },
        {
            cookie: "dtPC",
            purpose: "Required to identify proper endpoints for beacon transmission; includes session ID for correlation.",
        }
    ],
    vendor_privacy: "https://www.dynatrace.com/company/trust-center/privacy",
    domains: []
})
let requiredToKeep = inta_requiredCookieList;
window.INTA?.settings?.requiredCookies?.forEach((cookie) => {
    if (cookie.type === "functional") {
        inta_functionalCookieList.forEach((vendor) => {
            if (vendor.vendor === window.INTA?.settings?.company) {
                vendor.cookies.push({
                    cookie: cookie.cookie,
                    purpose: cookie?.purpose,
                    domain: cookie?.domain
                });
            }
        });
    } else if (cookie.type === "statistic") {
        inta_statisticCookieList.forEach((vendor) => {
            if (vendor.vendor === window.INTA?.settings?.company) {
                vendor.cookies.push({
                    cookie: cookie.cookie,
                    purpose: cookie?.purpose,
                    domain: cookie?.domain
                });
                requiredToKeep.push(vendor);
            }
        });
    } else if (cookie.type === "marketing") {
        inta_marketingCookieList.forEach((vendor) => {
            if (vendor.vendor === window.INTA?.settings?.company) {
                vendor.cookies.push({
                    cookie: cookie.cookie,
                    purpose: cookie?.purpose,
                    domain: cookie?.domain
                });
                requiredToKeep.push(vendor);
            }
        });

    } else {
        inta_requiredCookieList.forEach((vendor) => {
            if (vendor.vendor === window.INTA?.settings?.company) {
                vendor.cookies.push({
                    cookie: cookie.cookie,
                    purpose: cookie?.purpose,
                    domain: cookie?.domain
                });
            }
        });
    }
});
const int__cookiesToKeep = [...requiredToKeep.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1);
/* - - - Helper function to get cookie type*/
function intaCookieType(type) {
    if (getCookie(type) === "checked") return true;
    return (getCookie(type) === "true")
}

/* function generateCookieRegex(item){ */
/* Cookie name list for functional cookies */
if (getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && !intaCookieConsents?.functionalCookies) {
    let newArray = [...inta_functionalCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
    int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray);
}
/* Cookie name list for statistical cookies */
if (getCookie(int_hideCookieBannerName) != ""
    && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1
    && intaCookieConsents?.staticsticCookies) {
    let newArray = [...inta_statisticCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
    int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray)
}

/* Cookie name list for marketing / advertisment cookies */
if (getCookie(int_hideCookieBannerName) != ""
    && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1
    && intaCookieConsents?.advertisementCookies) {
    let newArray = [...inta_marketingCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
    int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray)
}

if (getCookie(int_hideCookieBannerName) != ""
    && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1
    && intaCookieConsents?.functionalCookies) {
    let newArray = [...inta_functionalCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
    int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray)
}

const int__cookiesToKeepRegx = new RegExp(int__cookiesToKeep.filter(function (entry) { return entry.trim() != ''; }).join("|"), "i");

const cookieBannerStyles = {
    banner: "banner.css",
    bannerV2: "bannerV2.css",
    overlay: "overlay.css",
    floating: "floating.css"
};

window.INTA.settings.language = typeof window.INTA?.settings?.language === "undefined" ?
    window.INTA?.settings?.language : window.INTA?.settings?.language;

let intastellarCookieLanguage
    = window.intastellarCookieLanguage
    = window.INTA?.settings === undefined
        || window.INTA?.settings?.language === "auto"
        || window.INTA?.settings?.language === ""
        || window.INTA?.settings?.language === undefined
        ? document.querySelector("html").getAttribute("lang")
        : window.INTA?.settings?.language == "german" ? "de"
            : window.INTA?.settings?.language == "danish" ? "da"
                : window.INTA?.settings?.language == "english" ? "en"
                    : window.INTA?.settings?.language == "spanish" ? "es"
                        : window.INTA?.settings?.language == "french" ? "fr"
                            : window.INTA?.settings?.language == "italian" ? "it"
                                : window.INTA?.settings?.language == "dutch" ? "nl"
                                    : window.INTA?.settings?.language == "portuguese" ? "pt"
                                        : window.INTA?.settings?.language == "russian" ? "ru"
                                            : window.INTA?.settings?.language == "swedish" ? "sv"
                                                : window.INTA?.settings?.language == "norwegian" ? "no"
                                                    : window.INTA?.settings?.language == "polish" ? "pl"
                                                        : window.INTA?.settings?.language == "turkish" ? "tr"
                                                            : window.INTA?.settings?.language == "arabic" ? "ar"
                                                                : window.INTA?.settings?.language == "japanese" ? "ja"
                                                                    : window.INTA?.settings?.language == "korean" ? "ko"
                                                                        : window.INTA?.settings?.language == "chinese" ? "zh"
                                                                            : window.INTA?.settings?.language == "ukrainian" ? "uk"
                                                                                : window.INTA?.settings?.language == "czech" ? "cs"
                                                                                    : window.INTA?.settings?.language == "hungarian" ? "hu"
                                                                                        : window.INTA?.settings?.language == "finnish" ? "fi"
                                                                                            : window.INTA?.settings?.language == "greek" ? "el"
                                                                                                : window.INTA?.settings?.language == "bulgarian" ? "bg"
                                                                                                    : window.INTA?.settings?.language == "slovak" ? "sk"
                                                                                                        : window.INTA?.settings?.language == "slovenian" ? "sl"
                                                                                                            : window.INTA?.settings?.language == "croatian" ? "hr"
                                                                                                                : window.INTA?.settings?.language == "lithuanian" ? "lt"
                                                                                                                    : window.INTA?.settings?.language == "latvian" ? "lv"
                                                                                                                        : window.INTA?.settings?.language == "estonian" ? "et"
                                                                                                                            : window.INTA?.settings?.language == "arabic" ? "ar"
                                                                                                                                : window.INTA?.settings?.language == "malay" ? "ms"
                                                                                                                                    : window.INTA?.settings?.language == "thai" ? "th"
                                                                                                                                        : window.INTA?.settings?.language == "vietnamese" ? "vi"
                                                                                                                                            : window.INTA?.settings?.language == "indonesian" ? "id"
                                                                                                                                                : window.INTA?.settings?.language == "filipino" ? "tl"
                                                                                                                                                    : window.INTA?.settings?.language == "hebrew" ? "he"
                                                                                                                                                        : window.INTA?.settings?.language == "afrikaans" ? "af"

                                                                                                                                                            : document.querySelector("html").getAttribute("lang");

if (document.querySelector("html").getAttribute("lang") == null) {
    intastellarCookieLanguage = "en";
}

if (intaCookieConsents?.advertisementCookies) {
    gtag('consent', 'update', {
        'personalization_storage': 'granted',
        'ads_data_redaction': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'url_passthrough': true,
    });


    // Pintrk
    if (typeof pintrk === 'function') {
        try {
            pintrk('setconsent', true);
        } catch (e) { /* ignore */ }
    }

    window.uetq.push('consent', 'update', {
        'ad_storage': 'granted'
    });

    window.clarity && window.clarity('consentv2', {
        ad_Storage: "granted",
        analytics_Storage: "denied"
    });

    window.Shopify ?? window.Shopify.customerPrivacy.setTrackingConsent(
        {
            'analytics': false,
            'marketing': true,
            'preferences': false,
        },
        () => console.log("Consent captured")
    );

    fbq('consent', 'grant');
    // Enable ads
    (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;
    (adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 0;

}

if (intaCookieConsents?.staticsticCookies) {
    gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'url_passthrough': true,
    })
    window.clarity && window.clarity('consentv2', {
        ad_Storage: "denied",
        analytics_Storage: "granted"
    });
    window.uetq.push('consent', 'update', {
        'analytics_storage': 'granted'
    });

    _paq.push(['setConsentGiven']);

    window.Shopify ?? window.Shopify.customerPrivacy.setTrackingConsent(
        {
            'analytics': true,
            'marketing': false,
            'preferences': false,
        },
        () => console.log("Consent captured")
    );
}

if (intaCookieConsents?.functionalCookies) {
    gtag('consent', 'update', {
        'functionality_storage': 'granted',
    })
    window.uetq.push('consent', 'update', {
        'functionality_storage': 'granted'
    });

    window.Shopify ?? window.Shopify.customerPrivacy.setTrackingConsent(
        {
            'analytics': false,
            'marketing': false,
            'preferences': true,
        },
        () => console.log("Consent captured")
    );

}

/* --- Segment Consent Integration (classic analytics.js) --- */
(function initSegmentConsent() {
    function hasAnalyticsConsent() {
        const c = window.intaCookieConsents;
        return c?.staticsticCookies === "checked" ||
            c?.functionalCookies === "checked";
    }
    function getSegmentConsent() {
        var c = window.intaCookieConsents || {};
        var isChecked = function(v) { return v === "checked" || v === true; };
        return {
            categoryPreferences: {
                Analytics: isChecked(c.staticsticCookies),
                Advertising: isChecked(c.advertisementCookies),
                Functional: isChecked(c.functionalCookies)
            }
        };
    }
    function injectConsentIntoOptions(opts) {
        if (opts && typeof opts === "function") return injectConsentIntoOptions({});
        var consent = getSegmentConsent();
        opts = opts && typeof opts === "object" ? opts : {};
        opts.context = Object.assign({}, opts.context || {}, { consent: consent });
        return opts;
    }
    function injectConsentIntoQueuedArgs(args) {
        if (!Array.isArray(args) || args.length < 1) return;
        var method = args[0];
        if (method !== "track" && method !== "page" && method !== "identify") return;
        var opts;
        if (method === "track") {
            opts = (args.length >= 4 && typeof args[3] === "object" && !Array.isArray(args[3])) ? args[3] : {};
            opts = injectConsentIntoOptions(opts);
            if (args.length >= 4) {
                args[3] = opts;
            } else {
                args.push(opts);
            }
        } else if (method === "page") {
            opts = (args.length >= 4 && typeof args[3] === "object" && !Array.isArray(args[3])) ? args[3] : {};
            opts = injectConsentIntoOptions(opts);
            if (args.length >= 4) {
                args[3] = opts;
            } else {
                args.push(opts);
            }
        } else if (method === "identify") {
            opts = (args.length >= 3 && typeof args[2] === "object" && !Array.isArray(args[2])) ? args[2] : {};
            opts = injectConsentIntoOptions(opts);
            if (args.length >= 3) {
                args[2] = opts;
            } else {
                args.push(opts);
            }
        }
    }
    function wrapStubQueue(analytics) {
        if (!analytics || !analytics.push) return;
        var origPush = analytics.push;
        analytics.push = function() {
            if (!hasAnalyticsConsent()) return this.length;
            for (var i = 0; i < arguments.length; i++) {
                if (Array.isArray(arguments[i])) injectConsentIntoQueuedArgs(arguments[i]);
            }
            return origPush.apply(this, arguments);
        };
        if (hasAnalyticsConsent()) {
            for (var j = 0; j < analytics.length; j++) {
                if (Array.isArray(analytics[j])) injectConsentIntoQueuedArgs(analytics[j]);
            }
        } else {
            for (var k = analytics.length - 1; k >= 0; k--) {
                if (Array.isArray(analytics[k]) && ["track", "page", "identify"].indexOf(analytics[k][0]) >= 0) {
                    analytics.splice(k, 1);
                }
            }
        }
    }
    function wrapSegmentAnalytics() {
        if (!window.analytics) return false;
        wrapStubQueue(window.analytics);
        if (typeof window.analytics.ready !== "function") return true;
        window.analytics.ready(function() {
            var origTrack = window.analytics.track;
            var origPage = window.analytics.page;
            var origIdentify = window.analytics.identify;
            if (typeof origTrack === "function") {
                window.analytics.track = function(event, properties, options, callback) {
                    if (!hasAnalyticsConsent()) return this;
                    if (typeof options === "function") { callback = options; options = {}; }
                    options = injectConsentIntoOptions(options);
                    return callback ? origTrack.call(this, event, properties, options, callback) : origTrack.call(this, event, properties, options);
                };
            }
            if (typeof origPage === "function") {
                window.analytics.page = function() {
                    if (!hasAnalyticsConsent()) return this;
                    var args = Array.prototype.slice.call(arguments);
                    var opts = (args.length >= 4 && typeof args[3] === "object") ? args[3] : {};
                    opts = injectConsentIntoOptions(opts);
                    args.length >= 4 ? (args[3] = opts) : args.push(opts);
                    return origPage.apply(this, args);
                };
            }
            if (typeof origIdentify === "function") {
                window.analytics.identify = function(userId, traits, options, callback) {
                    if (!hasAnalyticsConsent()) return this;
                    if (typeof options === "function") { callback = options; options = {}; }
                    options = injectConsentIntoOptions(options);
                    return callback ? origIdentify.call(this, userId, traits, options, callback) : origIdentify.call(this, userId, traits, options);
                };
            }
        });
        return true;
    }
    if (wrapSegmentAnalytics()) return;
    var attempts = 0;
    var t = setInterval(function() {
        if (wrapSegmentAnalytics() || ++attempts > 100) clearInterval(t);
    }, 20);
})();
/* --- End Segment Consent Integration --- */

if (window.INTA?.settings?.gtagId) {
    gtag('config', window.INTA?.settings?.gtagId, {
        'user_id': '' + intaCookieConsentsUserId + ''
    });
}

let notRequired;
let m;
/* Helper function to merge arrays */
const merge = (first, second, third) => {
    /* first.splice(1, 0, "^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+"); */
    for (let i = 0; i < second.length; i++) {
        first.push(second[i]);
    }
    if (third !== undefined) {
        for (let i = 0; i < third.length; i++) {
            first.push(third[i])
        }
    }
    return first;
}
/* autoads-preview.googleusercontent.com */
/* Getting user prefrence settings from Local storage: checked means user has allowed. False means cookies needs to be blocked */
if (intaCookieConsents?.functionalCookies === "checked" &&
    intaCookieConsents?.staticsticCookies !== "checked" &&
    intaCookieConsents?.advertisementCookies !== "checked") {
    m = merge(allScripts[1].scripts, allScripts[0].scripts);
} else if (intaCookieConsents?.advertisementCookies === "checked" &&
    intaCookieConsents?.staticsticCookies !== "checked" &&
    intaCookieConsents?.functionalCookies !== "checked") {
    m = merge(allScripts[2].scripts, allScripts[0].scripts);
} else if (intaCookieConsents?.staticsticCookies === "checked" &&
    intaCookieConsents?.functionalCookies !== "checked" &&
    intaCookieConsents?.advertisementCookies !== "checked") {
    m = merge(allScripts[1].scripts, allScripts[2].scripts);
} else if (intaCookieConsents?.functionalCookies === "checked" &&
    intaCookieConsents?.staticsticCookies === "checked") {
    m = allScripts[1].scripts;
} else if (intaCookieConsents?.functionalCookies === "checked" &&
    intaCookieConsents?.advertisementCookies === "checked") {
    m = allScripts[0].scripts;
} else if (intaCookieConsents?.advertisementCookies === "checked" &&
    intaCookieConsents?.staticsticCookies === "checked") {
    m = allScripts[2].scripts;
} else {
    m = merge(allScripts[0].scripts, allScripts[1].scripts, allScripts[2].scripts);
}
notRequired = window.notRequired = new RegExp(m.join("|"), "ig");
let analyticsScript = document.createElement("script");
analyticsScript.async = true;
analyticsScript.src = "https://www.intastellarsolutions.com/js/analytics.js?v=" + new Date().getTime();


intHead.appendChild(analyticsScript);

const intastellarCreateBanner = document.createElement("script");
intastellarCreateBanner.src = "https://consents.cdn.intastellarsolutions.com/cb.js";
if (window.INTA.settings.design === "floating") {
    intastellarCreateBanner.src = "https://consents.cdn.intastellarsolutions.com/floating.js";
}
if (intastellarDevMode) {
    if (window.INTA.settings.design === "floating") {
        intastellarCreateBanner.src = "../../dev/styles/floating.js";
    } else {
        intastellarCreateBanner.src = "../../dev/cb.dev.js";
    }
}

intastellarCreateBanner.async = true;
intastellarCreateBanner.defer = true;

setTimeout(() => {
    if (window.INTA.settings) {
        intHead.appendChild(intastellarCreateBanner);
    }
}, 800);

function updateCookiePreferenceOfBlockedIframes(dataType) {
    if (dataType == "intMarketingCookies") {
        document.querySelector("#marketing").checked = true;
    } else if (dataType == "intFunctionalCookies") {
        document.querySelector("#functional").checked = true;
    }
    saveINTCookieSettings("changePermission");
    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
        .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");
    // Dispatch TCF event after user action
    dispatchTCFConsentChangedIfAvailable();

    window.location.reload();
}
window.__INTA__COOKIE_EVENTS__ = window.__INTA__COOKIE_EVENTS__ || [];

function recordCookie(value) {
    window.__INTA__COOKIE_EVENTS__ = window.__INTA__COOKIE_EVENTS__ || [];
    window.__INTA__COOKIE_EVENTS__.push(value);

    try{
        // Save the collected cookies in the DB

        // Fetch call saving the data
        const IntastellarCookieSave = fetch('https://consents.intastellarsolutions.com/api/v1/cookie-events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event: value,
                website: window.location.href,
                timestamp: new Date().toISOString()
            })
        });

        IntastellarCookieSave.then(response => {
            return response.json();
        })

    } catch (e) {}

}

/* Helper function to create Consents Block message for iframes etc.*/
function ConsentsBlock(logo, textLanguage, btnText, datatype, img) {
    let p = "";
    if (window.location.host.indexOf("intastellarsolutions.com") == -1) {
        p = `<a class="inta-poweredBy" href='https://www.intastellarsolutions.com' target='_blank' rel='noopener' style="align-items: center; text-decoration: none;font-size: 11.5px; color: #000 !important; display: flex; justify-content: center;">powered by <img width="90px" height="40px" style="width: 170px !important; height: 40px !important;margin-left: 10px;" src="https://www.intastellarsolutions.com/assets/logos/intastellar-consents-logo.svg" alt="Intastellar Consents"></a>`;
    }
    if (img !== undefined && img != "") {
        return `
        <inta-consents-content class="intCookie_ConsentContainer-content yt-frame">
            <inta-consents-bg class="intCookie_ConsentContainer-bgIMG" inta-bg-img="${img}"></inta-consents-bg>
            <inta-consents-section class="intCookie_ConsentContainer-info">
                ${textLanguage}
                <button class='intastellarCookie-settings__btn --changePermission' onClick='updateCookiePreferenceOfBlockedIframes("${datatype}")' data-type='${datatype}'>${btnText}</button>
                ${p}
            </inta-consents-section>
        </inta-consents-content>
        `
    } else {
        return `
            <inta-consents-content class="intCookie_ConsentContainer-content">
                ${logo === null ? "" : `
                <inta-consents-logo class="intCookie_ConsentLogo-container">
                    <img src="${logo}" class="intCookie_ConsentLogo" alt="Company logo">
                </inta-consents-logo>
                `}
                
                <inta-consents-section class="intCookie_ConsentContainer-info">
                    ${textLanguage}
                    <button class='intastellarCookie-settings__btn --changePermission' onClick='updateCookiePreferenceOfBlockedIframes("${datatype}")' data-type='${datatype}'>${btnText}</button>
                    ${p}
                </inta-consents-section>
            </inta-consents-content>
        `
    }
}

/* Helper function to check class names */
function containsClass(element, searchString) {
    return element?.classList?.contains(searchString) || element?.className?.split(' ')?.some(cls => cls?.includes(searchString));
}

function loopBlock(addedNodes, message, script, buttonText, logo) {
    addedNodes.forEach((frae) => {
        if (getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.advertisementCookies === "checked"
            && intaCookieConsents?.functionalCookies === "checked" && intaCookieConsents?.staticsticCookies === "checked") {
            return;
        }
        let settingsContent = document.createElement("inta-consents-iframe");
        if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1 || getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && !intaCookieConsents?.advertisementCookies && script.type == "statics") {
            if (frae?.src?.indexOf("hs-sites.com") > -1) {
                frae?.parentElement?.replaceChild("", frae);
            }
        }
        if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1 || getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && !intaCookieConsents?.advertisementCookies && script.type == "marketing") {
            // Check if an element is from Facebook, check by looking at the class name if it contains "fb"
            if (containsClass(frae, "fb-") && frae.getAttribute("data-href")?.indexOf("facebook.com") > -1) {
                frae?.parentElement?.replaceChild(settingsContent, frae);
            }
            if (new RegExp(script.scripts.join("|"), "ig").test(frae.src) || frae?.className?.match(new RegExp(script.scripts.join("|"), "ig"))) {
                frae.sandbox = "";
                let ytIMG = "";
                let video_id = "";

                if (frae.src != undefined) {
                    if (frae.src.match("^(?:https?:)?//[^/]*(?:youtube(?:-nocookie)?\.com|youtu\.be).*[=/]([-\\w]{11})(?:\\?|=|&|$)")) {
                        video_id = frae?.src?.match("^(?:https?:)?//[^/]*(?:youtube(?:-nocookie)?\.com|youtu\.be).*[=/]([-\\w]{11})(?:\\?|=|&|$)")?.pop();
                        if (video_id && !frae?.hasAttribute("inta-yt-placeholder-img")) {
                            ytIMG = "https://img.youtube.com/vi/" + video_id + "/maxresdefault.jpg";
                        } else if (frae?.hasAttribute("inta-yt-placeholder-img")) {
                            ytIMG = frae?.getAttribute("inta-yt-placeholder-img");
                        }
                    } else {
                        if (frae?.hasAttribute("inta-yt-placeholder-img")) {
                            ytIMG = frae?.getAttribute("inta-yt-placeholder-img");
                        }
                    }
                }
                let a = document.createElement('a');
                a.href = frae.src;
                let externalDomain = a.hostname;


                inta_marketingCookieList.forEach((cookie) => {
                    var i = 0,
                        d = externalDomain,
                        p = d.split(".")

                    d = p.slice(-1 - ++i).join(".");
                    externalDomain = d;

                    if (cookie?.domains?.includes(externalDomain)) {
                        externalDomain = cookie.vendor;
                    }
                })
                if (frae.src !== window.INTA?.settings?.partnerDomain) {
                    frae.src = "about:blank";
                }
                let textLanguage;
                let btnText;

                if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
                    textLanguage = message(externalDomain, frae).danish;
                    btnText = buttonText().danish;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
                    textLanguage = message(externalDomain, frae).german;
                    btnText = buttonText().german;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
                    textLanguage = message(externalDomain, frae).english;
                    btnText = buttonText().english;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "es" || intastellarCookieLanguage === "es-ES") {
                    textLanguage = message(externalDomain, frae).spanish;
                    btnText = buttonText().spanish;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fr" || intastellarCookieLanguage === "fr-FR") {
                    textLanguage = message(externalDomain, frae).french;
                    btnText = buttonText().french;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "it" || intastellarCookieLanguage === "it-IT") {
                    textLanguage = message(externalDomain, frae).italian;
                    btnText = buttonText().italian;

                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ru" || intastellarCookieLanguage === "ru-RU") {
                    textLanguage = message(externalDomain, frae).russian;
                    btnText = buttonText().russian;

                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "sv" || intastellarCookieLanguage === "sv-SE") {
                    textLanguage = message(externalDomain, frae).swedish;
                    btnText = buttonText().swedish;

                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "no" || intastellarCookieLanguage === "no-NO") {
                    textLanguage = message(externalDomain, frae).norwegian;
                    btnText = buttonText().norwegian;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "nl" || intastellarCookieLanguage === "nl-NL") {
                    textLanguage = message(externalDomain, frae).dutch;
                    btnText = buttonText().dutch;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fi" || intastellarCookieLanguage === "fi-FI") {
                    textLanguage = message(externalDomain, frae).finish;
                    btnText = buttonText().finish;
                } else {
                    textLanguage = message(externalDomain, frae).danish;
                    btnText = buttonText().danish;
                }
                if (!frae.classList.contains("trustpilot-widget")) {
                    settingsContent.setAttribute("data-src", a?.href);
                }
                settingsContent.classList.add("intCookie_ConsentContainer");
                if (ytIMG !== undefined && ytIMG != "") {
                    settingsContent.classList.add("yt-frame");
                }
                if (frae.classList.length > 0) {
                    settingsContent.setAttribute("data-class", frae.className);
                }
                settingsContent.innerHTML = ConsentsBlock(logo, textLanguage, btnText, "intMarketingCookies", ytIMG);

                if (frae.style.display != "none" && frae.src != undefined) {
                    frae?.parentElement?.replaceChild(settingsContent, frae);
                }

            }
        } else if (getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && !intaCookieConsents?.functionalCookies && script.type == "functional") {
            if (new RegExp(script.scripts.join("|"), "ig").test(frae.src)) {
                frae.sandbox = "";
                let a = document.createElement('a');
                a.href = frae.src;
                let externalDomain = a.hostname;
                /* frae.src = "about:blank"; */


                inta_functionalCookieList.forEach((cookie) => {
                    var i = 0,
                        d = externalDomain,
                        p = d.split(".")

                    d = p.slice(-1 - ++i).join(".");
                    externalDomain = d;
                    if (cookie?.domains?.includes(externalDomain)) {
                        externalDomain = cookie.vendor;
                    }
                })

                let textLanguage;
                let btnText;

                if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
                    textLanguage = bannerContentMessage(externalDomain).danish;
                    btnText = buttonText().danish;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
                    textLanguage = bannerContentMessage(externalDomain).german;
                    btnText = buttonText().german;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
                    textLanguage = bannerContentMessage(externalDomain).english;
                    btnText = buttonText().english;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "es" || intastellarCookieLanguage === "es-ES") {
                    textLanguage = bannerContentMessage(externalDomain).spanish;
                    btnText = buttonText().spanish;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "no" || intastellarCookieLanguage === "no-NO") {
                    textLanguage = bannerContentMessage(externalDomain).norwegian;
                    btnText = buttonText().norwegian;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "nl" || intastellarCookieLanguage === "nl-NL") {
                    textLanguage = bannerContentMessage(externalDomain).dutch;
                    btnText = buttonText().dutch;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fi" || intastellarCookieLanguage === "fi-FI") {
                    textLanguage = bannerContentMessage(externalDomain).finish;
                    btnText = buttonText().finish;
                } else {
                    textLanguage = bannerContentMessage(externalDomain).danish;
                    btnText = buttonText().danish;
                }

                let settingsContent = document.createElement("inta-consents");
                settingsContent.classList.add("intCookie_ConsentContainer");
                settingsContent.setAttribute("data-src", a.href);
                settingsContent.innerHTML = ConsentsBlock(logo, textLanguage, btnText, "intFunctionalCookies");

                if (frae?.src?.indexOf("hs-sites.com") > -1) {
                    frae?.parentElement?.replaceChild("", frae);
                } else {
                    if (frae.style.display != "none" && frae.src != undefined) {

                        frae?.parentElement?.replaceChild(settingsContent, frae);
                    }

                }
            } else if (frae?.id?.indexOf("map") > -1 || frae?.id?.indexOf("google") > -1 && frae?.id?.indexOf("google_translate_element2") == -1) {
                let externalDomain = "www.google.com";
                inta_functionalCookieList.forEach((cookie) => {
                    var i = 0,
                        d = externalDomain,
                        p = d.split(".")

                    d = p.slice(-1 - ++i).join(".");
                    externalDomain = d;
                    if (cookie?.domains?.includes(externalDomain)) {
                        externalDomain = cookie.vendor;
                    }
                })

                let textLanguage;
                let btnText;
                if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
                    textLanguage = bannerContentMessage(externalDomain).danish;
                    btnText = buttonText().danish;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
                    textLanguage = bannerContentMessage(externalDomain).german;
                    btnText = buttonText().german;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
                    textLanguage = bannerContentMessage(externalDomain).english;
                    btnText = buttonText().english;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "es" || intastellarCookieLanguage === "es-ES") {
                    textLanguage = bannerContentMessage(externalDomain).spanish;
                    btnText = buttonText().spanish;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "nl" || intastellarCookieLanguage === "nl-NL") {
                    textLanguage = bannerContentMessage(externalDomain).dutch;
                    btnText = buttonText().dutch;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fr" || intastellarCookieLanguage === "fr-FR") {
                    textLanguage = bannerContentMessage(externalDomain).french;
                    btnText = buttonText().french;
                } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fi" || intastellarCookieLanguage === "fi-FI") {
                    textLanguage = bannerContentMessage(externalDomain).finish;
                    btnText = buttonText().finish;
                } else {
                    textLanguage = bannerContentMessage(externalDomain).danish;
                    btnText = buttonText().danish;
                }

                let settingsContent = document.createElement("inta-consents");
                settingsContent.classList.add("intCookie_ConsentContainer");

                settingsContent.innerHTML = ConsentsBlock(logo, textLanguage, btnText, "intFunctionalCookies");

                settingsContent.setAttribute("data-src", frae.src);
                if (frae?.src?.indexOf("hs-sites.com") > -1) {
                    frae?.parentElement?.replaceChild("", frae);
                } else {
                    if (frae.style.display != "none" && frae.src != undefined) {
                        frae.parentElement.replaceChild(settingsContent, frae);
                    }
                }
            } else if (frae?.id?.indexOf("google_translate_element2") > -1) {
                frae?.parentElement?.replaceChild("", frae);
            }
        }
    })
}

function blockBlockQuotes(tweet, message, script, buttonText, logo) {
    if (tweet != " " && getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1 || !intaCookieConsents?.advertisementCookies && script.type == "marketing" && notRequired.test(tweet.className)) {
        let a = document.createElement('a');
        a.href = tweet.querySelector("a").href;
        let externalDomain = a.hostname;

        inta_marketingCookieList.forEach((cookie) => {
            var i = 0,
                d = externalDomain,
                p = d.split(".")

            d = p.slice(-1 - ++i).join(".");
            externalDomain = d;

            if (cookie?.domains?.includes(externalDomain)) {
                externalDomain = cookie.vendor;
            }
        })

        let textLanguage;
        let btnText;
        if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
            textLanguage = message(externalDomain).danish;
            btnText = buttonText().danish;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
            textLanguage = message(externalDomain).german;
            btnText = buttonText().german;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
            textLanguage = message(externalDomain).english;
            btnText = buttonText().english;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "es" || intastellarCookieLanguage === "es-ES") {
            textLanguage = bannerContentMessage(externalDomain).spanish;
            btnText = buttonText().spanish;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "sv" || intastellarCookieLanguage === "sv-SE") {
            // Swedish
            textLanguage = message(externalDomain).swedish;
            btnText = buttonText().swedish;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fr" || intastellarCookieLanguage === "fr-FR") {
            // French
            textLanguage = message(externalDomain).french;
            btnText = buttonText().french;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pr" || intastellarCookieLanguage === "pr-PT") {
            // Portuguese
            textLanguage = message(externalDomain).portuguese;
            btnText = buttonText().portuguese;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "it" || intastellarCookieLanguage === "it-IT") {
            // Italian
            textLanguage = message(externalDomain).italian;
            btnText = buttonText().italian;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ru" || intastellarCookieLanguage === "ru-RU") {
            textLanguage = message(externalDomain, frae).russian;
            btnText = buttonText().russian;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "no") {
            textLanguage = message(externalDomain, frae).norwegian;
            btnText = buttonText().norwegian;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fi" || intastellarCookieLanguage === "fi-FI") {
            textLanguage = message(externalDomain, frae).finish;
            btnText = buttonText().finish;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "nl" || intastellarCookieLanguage === "nl-NL") {
            textLanguage = message(externalDomain, frae).dutch;
            btnText = buttonText().dutch;
        } else {
            textLanguage = message(externalDomain).danish;
            btnText = buttonText().danish;
        }
        let settingsContent = document.createElement("inta-consents");
        settingsContent.classList.add("intCookie_ConsentContainer");
        settingsContent.innerHTML = ConsentsBlock(logo, textLanguage, btnText, "intMarketingCookies");

        settingsContent.setAttribute("data-src", a.href);
        if (tweet.src.indexOf("hs-sites.com") > -1) {
            tweet.parentElement.replaceChild("", tweet);
        } else {
            if (tweet.style.display != "none" && tweet.src != undefined) {
                tweet.parentElement.replaceChild(settingsContent, tweet);

            }
        }
    }
}

/* - - - Helper function for message on the content block - - - */
const bannerContentMessage = (domain, node) => {
    if (node?.classList?.contains("trustpilot-widget")) {
        domain = "www.trustpilot.com";
    }
    inta_marketingCookieList.forEach((cookie) => {
        var i = 0,
            d = domain,
            p = d.split(".")

        d = p.slice(-1 - ++i).join(".");
        domain = d;

        if (cookie?.domains?.includes(domain)) {
            domain = cookie.vendor;
        }
    })
    return {
        danish: `<p>Dette indhold leveres af ${domain}.</p>`,
        english: `<p>This content is provided by ${domain}.</p>`,
        german: `<p>Dieser Inhalt wird von ${domain} bereitgestellt.</p>`,
        spanish: `<p>Este contenido es proporcionado por ${domain}.</p>`,
        swedish: `<p>Denna innehåll tillhandahålls av ${domain}.</p>`,
        french: `<p>Ce contenu est fourni par ${domain}.</p>`,
        portuguese: `<p>Este conteúdo é fornecido por ${domain}.</p>`,
        italian: `<p>Questo contenuto è fornito da ${domain}.</p>`,
        russian: `<p>Этот контент предоставлен ${domain}.</p>`,
        norwegian: `<p>Dette innholdet leveres av ${domain}.</p>`,
        finish: `<p>Tämä sisältö toimitetaan ${domain}.</p>`,
        dutch: `<p>Deze inhoud wordt geleverd door ${domain}.</p>`,
        polish: `<p>Ta zawartość jest dostarczana przez ${domain}.</p>`,
        afrikaans: `<p>Hierdie inhoud word verskaf deur ${domain}.</p>`,
        arabic: `<p>هذا المحتوى مقدم من ${domain}.</p>`,
        hindi: `<p>यह सामग्री ${domain} द्वारा प्रदान की गई है।</p>`,
        turkish: `<p>Bu içerik ${domain} tarafından sağlanmaktadır.</p>`,
        japanese: `<p>このコンテンツは${domain}によって提供されています。</p>`,
        korean: `<p>이 콘텐츠는 ${domain}에서 제공됩니다.</p>`,
        thai: `<p>เนื้อหานี้จัดทำโดย ${domain}.</p>`,
        vietnamese: `<p>Nội dung này được cung cấp bởi ${domain}.</p>`,
        indonesian: `<p>Konten ini disediakan oleh ${domain}.</p>`,
        filipino: `<p>Ang nilalamang ito ay ibinibigay ng ${domain}.</p>`,
        malay: `<p>Kandungan ini disediakan oleh ${domain}.</p>`,
        ukrainian: `<p>Цей контент надається ${domain}.</p>`,
        hebrew: `<p>תוכן זה מסופק על ידי ${domain}.</p>`,
        arabic: `<p>هذا المحتوى مقدم من ${domain}.</p>`,
    }
};

function handleInputChange(event) {
    const target = event.target;
    if (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA') {

        // Update consent tracker object for checkbox inputs
        if (target.type === 'checkbox') {
            if (target.name === "statics" || target.id === "statics") {
                window.pendingConsents = window.pendingConsents || {};
                window.pendingConsents.staticsticCookies = target.checked ? "checked" : "false";
            } else if (target.name === "functional" || target.id === "functional") {
                window.pendingConsents = window.pendingConsents || {};
                window.pendingConsents.functionalCookies = target.checked ? "checked" : "false";
            } else if (target.name === "advertisement" || target.id === "marketing") {
                window.pendingConsents = window.pendingConsents || {};
                window.pendingConsents.advertisementCookies = target.checked ? "checked" : "false";
            }
        }
    }
}

document.addEventListener('change', handleInputChange);

function updateNotRequiredRegexp() {
    // Create the correct RegExp based on current consent settings
    let m;
    if (intaCookieConsents?.functionalCookies === "checked" &&
        intaCookieConsents?.staticsticCookies !== "checked" &&
        intaCookieConsents?.advertisementCookies !== "checked") {
        allScripts.forEach((script) => {
            if (script.type === "functional") {
                m = merge(allScripts[1].scripts, allScripts[0].scripts);
            }
        });
    } else if (intaCookieConsents?.advertisementCookies === "checked" &&
        intaCookieConsents?.staticsticCookies !== "checked" &&
        intaCookieConsents?.functionalCookies !== "checked") {

        allScripts.forEach((script) => {
            if (script.type === "marketing") {
                m = merge(script.scripts, allScripts[0].scripts);
            }
        });

    } else if (intaCookieConsents?.staticsticCookies === "checked" &&
        intaCookieConsents?.functionalCookies !== "checked" &&
        intaCookieConsents?.advertisementCookies !== "checked") {
        allScripts.forEach((script) => {
            if (script.type === "statics") {
                m = merge(script.scripts, allScripts[2].scripts);
            }
        });
    } else if (intaCookieConsents?.functionalCookies === "checked" &&
        intaCookieConsents?.staticsticCookies === "checked") {
        m = allScripts[1].scripts;
    } else if (intaCookieConsents?.functionalCookies === "checked" &&
        intaCookieConsents?.advertisementCookies === "checked") {
        m = allScripts[0].scripts;
    } else if (intaCookieConsents?.advertisementCookies === "checked" &&
        intaCookieConsents?.staticsticCookies === "checked") {
        m = allScripts[2].scripts;
    } else if (intaCookieConsents?.functionalCookies === "checked" &&
        intaCookieConsents?.advertisementCookies === "checked" &&
        intaCookieConsents?.staticsticCookies === "checked") {
        m = [];
    } else {
        m = merge(allScripts[0].scripts, allScripts[1].scripts, allScripts[2].scripts);
    }

    // Update the notRequired RegExp
    notRequired = new RegExp(m.length ? m.join("|") : "^$", "ig");
    window.notRequired = notRequired;
    console.log("Updated consent blocking patterns");

    // Process existing scripts that may need to be updated
    processExistingScripts();
}

function processExistingScripts() {
    // Process blocked scripts that should now be allowed
    document.querySelectorAll('script[type="text/blocked"]').forEach(script => {
        const src = script.src || '';
        if (!notRequired.test(src) && !notRequired.test(script.innerText)) {
            // This script should now be allowed - replace it
            const newScript = document.createElement('script');
            newScript.type = 'text/javascript';
            if (script.src) newScript.src = script.src;
            if (script.innerText) newScript.text = script.innerText;
            script.parentNode?.replaceChild(newScript, script);
        }
    });

    // Process blocked iframes that should now be allowed
    document.querySelectorAll('inta-consents-iframe[data-src], inta-consents[data-src]').forEach(blocked => {
        const type = blocked.querySelector('.--changePermission')?.dataset?.type;
        if ((type === 'intMarketingCookies' && intaCookieConsents?.advertisementCookies === "checked") ||
            (type === 'intFunctionalCookies' && intaCookieConsents?.functionalCookies === "checked") ||
            (type === 'intStaticsCookies' && intaCookieConsents?.staticsticCookies === "checked")) {

            const iframe = document.createElement('iframe');
            iframe.src = blocked.getAttribute('data-src');
            iframe.border = '0';
            iframe.frameBorder = '0';

            if (blocked.getAttribute('data-class')) {
                iframe.setAttribute('class', blocked.getAttribute('data-class'));
            } else {
                iframe.width = '560';
                iframe.height = '315';
            }

            blocked.parentElement?.replaceChild(iframe, blocked);
        }
    });
}


function restartObserver() {
    // Disconnect any existing observer
    if (window.currentObserver) {
        window.currentObserver.disconnect();
    }

    // Create a new observer with updated consent settings
    window.currentObserver = checkCookieStatus();

    // Process any existing blocked content that should now be allowed
    processExistingScripts();

}

const beforeScriptExecuteListener = function (event, node) {
    let src = node.src || "";

    if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1 || intaCookieConsents?.advertisementCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.staticsticCookies == "false" || intaCookieConsents?.advertisementCookies == "null" && intaCookieConsents?.functionalCookies == "null" && intaCookieConsents?.staticsticCookies == "null"
        || intaCookieConsents?.advertisementCookies == "" && intaCookieConsents?.functionalCookies == "" && intaCookieConsents?.staticsticCookies == ""
        || !FunctionalCheckbox?.checked || !StaticsCheckBox?.checked || !MarketingCheckBox?.checked
    ) {
        if (
            src.indexOf(window.location.hostname) == -1
            && src.indexOf("jquery") == -1 && src.indexOf("elementor") == -1
        ) {
            if (
                notRequired.test(src)
            ) {
                node.defer = true;
                node.async = true;
                node.type = "text/blocked";
                /*if(node.parentElement !== null) node.parentElement.removeChild(node);*/
            }
        } else if (src.indexOf(window.location.hostname) == -1
            && src.indexOf("jquery") > -1) {
            node.type = "text/javascript";
            node.defer = false;
            node.async = false;
        } else {
            node.type = "text/javascript";
            /* if(document.querySelector(scriptTag) === null){
                node.parentElement.appendChild(scriptTag);
            } */
        }

        if (
            notRequired.test(node.innerText)
            && node.innerText.toLowerCase().indexOf("elementor") == -1
        ) {
            node.defer = true;
            node.async = true;
            node.type = "text/blocked";
            /*if(node.parentElement !== null) node.parentElement.removeChild(node);*/
        } else {
            /* if(document.querySelector(scriptTag) === null){
                node.parentElement.appendChild(scriptTag);
            } */
        }
    } else if (intaCookieConsents?.functionalCookies === "checked" &&
        intaCookieConsents?.advertisementCookies === "checked" &&
        intaCookieConsents?.staticsticCookies === "checked"
        || FunctionalCheckbox?.checked && StaticsCheckBox?.checked && MarketingCheckBox?.checked) {
        node.type = "text/javascript";
    }

    if (node.getAttribute("type") === "text/blocked")
        event.preventDefault();
    node.removeEventListener(
        "beforescriptexecute",
        (e, node) => beforeScriptExecuteListener(e, node)
    );

    // Disconnect the observer if it exists
    if (window.currentObserver) {
        window.currentObserver.disconnect();
    }
};

function checkCookieStatus() {
    if (isGtmMode) {
        /* console.log("Observer disabled in GTM mode"); */
        return null; // Return null instead of creating an observer
    }
    /* To get anonymous cookie banner usage */
    /* - - - Observer - - - */

    const observer = new MutationObserver((mutations) => {
        requestAnimationFrame(() => {
            mutations.forEach(({ addedNodes }) => {
                addedNodes.forEach((node) => {

                    if (node.nodeType === 1 && node.tagName === "DIV" || node.nodeType === 1 && node.tagName === "IFRAME") {
                        allScripts.map((script) => {

                            const buttonText = () => {
                                if (script.type == "marketing") {
                                    scriptTypelang = {
                                        danish: "marketing",
                                        english: "marketing",
                                        german: "werbe",
                                        spanish: "publicidad",
                                        swedish: "marknadsföring",
                                        french: "publicité",
                                        portuguese: "publicidade",
                                        italian: "pubblicità",
                                        russian: "реклама",
                                        norwegian: "markedsføring",
                                        finish: "mainonta",
                                        dutch: "reclame",
                                        polish: "reklama",
                                        afrikaans: "bemarking",
                                        arabic: "تسويق",
                                        hindi: "विपणन",
                                        turkish: "pazarlama",
                                        japanese: "マーケティング",
                                        korean: "마케팅",
                                        thai: "การตลาด",
                                        vietnamese: "tiếp thị",
                                        indonesian: "pemasaran",
                                        filipino: "pagmemerkado",
                                        malay: "pemasaran",
                                        chinese: "营销",
                                        ukrainian: "маркетинг",
                                        hebrew: "שיווק",
                                    }
                                } else if (script.type == "functional") {
                                    scriptTypelang = {
                                        danish: "funktionelle",
                                        english: "functional",
                                        german: "funktionelle",
                                        spanish: "funcional",
                                        swedish: "funktionell",
                                        french: "fonctionnel",
                                        portuguese: "funcional",
                                        italian: "funzionale",
                                        russian: "функциональный",
                                        norwegian: "funksjonelle",
                                        finish: "toiminnallinen",
                                        dutch: "functioneel",
                                        polish: "funkcjonalne",
                                        afrikaans: "funksionele",
                                        arabic: "وظيفي",
                                        hindi: "कार्यात्मक",
                                        turkish: "fonksiyonel",
                                        japanese: "機能的",
                                        korean: "기능적",
                                        thai: "ฟังก์ชัน",
                                        vietnamese: "chức năng",
                                        indonesian: "fungsional",
                                        filipino: "pampagana",
                                        chinese: "功能性",
                                        malay: "fungsional",
                                        ukrainian: "функціональний",
                                        hebrew: "פונקציונלי",
                                    }
                                } else if (script.type == "statics") {
                                    scriptTypelang = {
                                        danish: "statistiske",
                                        english: "statics",
                                        german: "statistische",
                                        spanish: "estadísticas",
                                        swedish: "statistik",
                                        french: "statistiques",
                                        portuguese: "estatísticas",
                                        italian: "statistico",
                                        russian: "статистика",
                                        norwegian: "statistiske",
                                        finish: "tilastollinen",
                                        dutch: "statistieken",
                                        polish: "statystyczne",
                                        afrikaans: "statistiese",
                                        arabic: "إحصائية",
                                        hindi: "सांख्यिकी",
                                        turkish: "istatistik",
                                        japanese: "統計",
                                        korean: "통계",
                                        thai: "สถิติ",
                                        vietnamese: "thống kê",
                                        indonesian: "statistik",
                                        filipino: "istatiska",
                                        malay: "statistik",
                                        chinese: "统计",
                                        ukrainian: "статистичний",
                                        hebrew: "סטטיסטי",
                                    }
                                }

                                return {
                                    danish: `Accepter ${scriptTypelang.danish} cookies`,
                                    english: `Accept ${scriptTypelang.english} cookies`,
                                    german: `Akzeptiere ${scriptTypelang.german} cookies`,
                                    spanish: `Aceptar cookies ${scriptTypelang.spanish}`,
                                    swedish: `Acceptera ${scriptTypelang.swedish} cookies`,
                                    french: `Accepter les cookies ${scriptTypelang.french}`,
                                    portuguese: `Aceitar cookies ${scriptTypelang.portuguese}`,
                                    italian: `Accetta i cookie ${scriptTypelang.italian}`,
                                    russian: `Принять файлы cookie ${scriptTypelang.russian}`,
                                    norwegian: `Aksepter ${scriptTypelang.danish} cookies`,
                                    finish: `Hyväksy ${scriptTypelang.danish} evästeet`,
                                    dutch: `Accepteer ${scriptTypelang.danish} cookies`,
                                    polish: `Akceptuj pliki cookie ${scriptTypelang.polish}`,
                                    afrikaans: `Aanvaar ${scriptTypelang.afrikaans} koekies`,
                                    arabic: `قبول ملفات تعريف الارتباط ${scriptTypelang.arabic}`,
                                    hindi: `स्वीकार करें ${scriptTypelang.hindi} कुकीज़`,
                                    turkish: `Kabul et ${scriptTypelang.turkish} çerezleri`,
                                    japanese: `クッキーを受け入れる ${scriptTypelang.japanese}`,
                                    korean: `쿠키 수락 ${scriptTypelang.korean}`,
                                    thai: `ยอมรับคุกกี้ ${scriptTypelang.thai}`,
                                    vietnamese: `Chấp nhận cookie ${scriptTypelang.vietnamese}`,
                                    indonesian: `Terima cookie ${scriptTypelang.indonesian}`,
                                    filipino: `Tanggapin ang cookies ${scriptTypelang.filipino}`,
                                    malay: `Terima kuki ${scriptTypelang.malay}`,
                                    chinese: `接受 ${scriptTypelang.chinese} cookies`,
                                    ukrainian: `Прийняти файли cookie ${scriptTypelang.ukrainian}`,
                                    hebrew: `קבל עוגיות ${scriptTypelang.hebrew}`,
                                }
                            }
                            let INTAlogo = (window.INT) ? window.INT.settings.logo : (window.INTA?.settings?.logo) ? window.INTA?.settings?.logo : null;
                            loopBlock(addedNodes, bannerContentMessage, script, buttonText, INTAlogo);
                        })
                    }
                    if (node.nodeType === 1 && node.tagName === "IFRAME") {
                        allScripts.map((script) => {

                            const buttonText = () => {
                                if (script.type == "marketing") {
                                    scriptTypelang = {
                                        danish: "marketing",
                                        english: "marketing",
                                        german: "werbe",
                                        spanish: "publicidad",
                                        swedish: "marknadsföring",
                                        french: "publicité",
                                        portuguese: "publicidade",
                                        italian: "pubblicità",
                                        russian: "реклама",
                                        norwegian: "markedsføring",
                                        finish: "mainonta",
                                        dutch: "reclame",
                                        polish: "reklama",
                                        afrikaans: "bemarking",
                                        arabic: "تسويق",
                                        hindi: "विपणन",
                                        turkish: "pazarlama",
                                        japanese: "マーケティング",
                                        korean: "마케팅",
                                        thai: "การตลาด",
                                        vietnamese: "tiếp thị",
                                        indonesian: "pemasaran",
                                        filipino: "pagmemerkado",
                                        malay: "pemasaran",
                                        chinese: "营销",
                                        ukrainian: "маркетинг",
                                        hebrew: "שיווק",
                                    }
                                } else if (script.type == "functional") {
                                    scriptTypelang = {
                                        danish: "funktionelle",
                                        english: "functional",
                                        german: "funktionelle",
                                        spanish: "funcional",
                                        swedish: "funktionell",
                                        french: "fonctionnel",
                                        portuguese: "funcional",
                                        italian: "funzionale",
                                        russian: "функциональный",
                                        norwegian: "funksjonelle",
                                        finish: "toiminnallinen",
                                        dutch: "functioneel",
                                        polish: "funkcjonalne",
                                        afrikaans: "funksionele",
                                        arabic: "وظيفي",
                                        hindi: "कार्यात्मक",
                                        turkish: "fonksiyonel",
                                        japanese: "機能的",
                                        korean: "기능적",
                                        thai: "ฟังก์ชัน",
                                        vietnamese: "chức năng",
                                        indonesian: "fungsional",
                                        filipino: "pampagana",
                                        chinese: "功能性",
                                        malay: "fungsional",
                                        ukrainian: "функціональний",
                                        hebrew: "פונקציונלי",
                                    }
                                } else if (script.type == "statics") {
                                    scriptTypelang = {
                                        danish: "statistiske",
                                        english: "statics",
                                        german: "statistische",
                                        spanish: "estadísticas",
                                        swedish: "statistik",
                                        french: "statistiques",
                                        portuguese: "estatísticas",
                                        italian: "statistico",
                                        russian: "статистика",
                                        norwegian: "statistiske",
                                        finish: "tilastollinen",
                                        dutch: "statistieken",
                                        polish: "statystyczne",
                                        afrikaans: "statistiese",
                                        arabic: "إحصائية",
                                        hindi: "सांख्यिकी",
                                        turkish: "istatistik",
                                        japanese: "統計",
                                        korean: "통계",
                                        thai: "สถิติ",
                                        vietnamese: "thống kê",
                                        indonesian: "statistik",
                                        filipino: "istatiska",
                                        malay: "statistik",
                                        chinese: "统计",
                                        ukrainian: "статистичний",
                                        hebrew: "סטטיסטי",
                                    }
                                }

                                return {
                                    danish: `Accepter ${scriptTypelang.danish} cookies`,
                                    english: `Accept ${scriptTypelang.english} cookies`,
                                    german: `Akzeptiere ${scriptTypelang.german} cookies`,
                                    spanish: `Aceptar cookies ${scriptTypelang.spanish}`,
                                    swedish: `Acceptera ${scriptTypelang.swedish} cookies`,
                                    french: `Accepter les cookies ${scriptTypelang.french}`,
                                    portuguese: `Aceitar cookies ${scriptTypelang.portuguese}`,
                                    italian: `Accetta i cookie ${scriptTypelang.italian}`,
                                    russian: `Принять файлы cookie ${scriptTypelang.russian}`,
                                    norwegian: `Aksepter ${scriptTypelang.danish} cookies`,
                                    finish: `Hyväksy ${scriptTypelang.danish} evästeet`,
                                    dutch: `Accepteer ${scriptTypelang.danish} cookies`,
                                    polish: `Akceptuj pliki cookie ${scriptTypelang.polish}`,
                                    afrikaans: `Aanvaar ${scriptTypelang.afrikaans} koekies`,
                                    arabic: `قبول ملفات تعريف الارتباط ${scriptTypelang.arabic}`,
                                    hindi: `स्वीकार करें ${scriptTypelang.hindi} कुकीज़`,
                                    turkish: `Kabul et ${scriptTypelang.turkish} çerezleri`,
                                    japanese: `クッキーを受け入れる ${scriptTypelang.japanese}`,
                                    korean: `쿠키 수락 ${scriptTypelang.korean}`,
                                    thai: `ยอมรับคุกกี้ ${scriptTypelang.thai}`,
                                    vietnamese: `Chấp nhận cookie ${scriptTypelang.vietnamese}`,
                                    indonesian: `Terima cookie ${scriptTypelang.indonesian}`,
                                    filipino: `Tanggapin ang cookies ${scriptTypelang.filipino}`,
                                    malay: `Terima kuki ${scriptTypelang.malay}`,
                                    chinese: `接受 ${scriptTypelang.chinese} cookies`,
                                    ukrainian: `Прийняти файли cookie ${scriptTypelang.ukrainian}`,
                                    hebrew: `קבל עוגיות ${scriptTypelang.hebrew}`,
                                }
                            }
                            let INTAlogo = (window.INT) ? window.INT.settings.logo : (window.INTA?.settings?.logo) ? window.INTA?.settings?.logo : null;
                            loopBlock(addedNodes, bannerContentMessage, script, buttonText, INTAlogo);
                        })
                    }

                    if (node.nodeType === 1 && node.tagName === "BLOCKQUOTE") {
                        allScripts.map((script) => {
                            addedNodes.forEach((tweet) => {

                                const buttonText = () => {
                                    if (script.type == "marketing") {
                                        scriptTypelang = {
                                            danish: "marketing",
                                            english: "marketing",
                                            german: "werbe",
                                            spanish: "publicidad",
                                            swedish: "marknadsföring",
                                            french: "publicité",
                                            portuguese: "publicidade",
                                            italian: "pubblicità",
                                            russian: "реклама",
                                            norwegian: "markedsføring",
                                            finish: "mainonta",
                                            dutch: "reclame",
                                            polish: "reklama",
                                            afrikaans: "bemarking",
                                            arabic: "تسويق",
                                            hindi: "विपणन",
                                            turkish: "pazarlama",
                                            japanese: "マーケティング",
                                            korean: "마케팅",
                                            thai: "การตลาด",
                                            vietnamese: "tiếp thị",
                                            indonesian: "pemasaran",
                                            filipino: "pagmemerkado",
                                            malay: "pemasaran",
                                            chinese: "营销",
                                            ukrainian: "маркетинг",
                                            hebrew: "שיווק",
                                        }
                                    } else if (script.type == "functional") {
                                        scriptTypelang = {
                                            danish: "funktionelle",
                                            english: "functional",
                                            german: "funktionelle",
                                            spanish: "funcional",
                                            swedish: "funktionell",
                                            french: "fonctionnel",
                                            portuguese: "funcional",
                                            italian: "funzionale",
                                            russian: "функциональный",
                                            norwegian: "funksjonelle",
                                            finish: "toiminnallinen",
                                            dutch: "functioneel",
                                            polish: "funkcjonalne",
                                            afrikaans: "funksionele",
                                            arabic: "وظيفي",
                                            hindi: "कार्यात्मक",
                                            turkish: "fonksiyonel",
                                            japanese: "機能的",
                                            korean: "기능적",
                                            thai: "ฟังก์ชัน",
                                            vietnamese: "chức năng",
                                            indonesian: "fungsional",
                                            filipino: "pampagana",
                                            chinese: "功能性",
                                            malay: "fungsional",
                                            ukrainian: "функціональний",
                                            hebrew: "פונקציונלי",
                                        }
                                    } else if (script.type == "statics") {
                                        scriptTypelang = {
                                            danish: "statistiske",
                                            english: "statics",
                                            german: "statistische",
                                            spanish: "estadísticas",
                                            swedish: "statistik",
                                            french: "statistiques",
                                            portuguese: "estatísticas",
                                            italian: "statistico",
                                            russian: "статистика",
                                            norwegian: "statistiske",
                                            finish: "tilastollinen",
                                            dutch: "statistieken",
                                            polish: "statystyczne",
                                            afrikaans: "statistiese",
                                            arabic: "إحصائية",
                                            hindi: "सांख्यिकी",
                                            turkish: "istatistik",
                                            japanese: "統計",
                                            korean: "통계",
                                            thai: "สถิติ",
                                            vietnamese: "thống kê",
                                            indonesian: "statistik",
                                            filipino: "istatiska",
                                            malay: "statistik",
                                            chinese: "统计",
                                            ukrainian: "статистичний",
                                            hebrew: "סטטיסטי",
                                        }
                                    }

                                    return {
                                        danish: `Accepter ${scriptTypelang.danish} cookies`,
                                        english: `Accept ${scriptTypelang.english} cookies`,
                                        german: `Akzeptiere ${scriptTypelang.german} cookies`,
                                        spanish: `Aceptar cookies ${scriptTypelang.spanish}`,
                                        swedish: `Acceptera ${scriptTypelang.swedish} cookies`,
                                        french: `Accepter les cookies ${scriptTypelang.french}`,
                                        portuguese: `Aceitar cookies ${scriptTypelang.portuguese}`,
                                        italian: `Accetta i cookie ${scriptTypelang.italian}`,
                                        russian: `Принять файлы cookie ${scriptTypelang.russian}`,
                                        norwegian: `Aksepter ${scriptTypelang.danish} cookies`,
                                        finish: `Hyväksy ${scriptTypelang.danish} evästeet`,
                                        dutch: `Accepteer ${scriptTypelang.danish} cookies`,
                                        polish: `Akceptuj pliki cookie ${scriptTypelang.polish}`,
                                        afrikaans: `Aanvaar ${scriptTypelang.afrikaans} koekies`,
                                        arabic: `قبول ملفات تعريف الارتباط ${scriptTypelang.arabic}`,
                                        hindi: `स्वीकार करें ${scriptTypelang.hindi} कुकीज़`,
                                        turkish: `Kabul et ${scriptTypelang.turkish} çerezleri`,
                                        japanese: `クッキーを受け入れる ${scriptTypelang.japanese}`,
                                        korean: `쿠키 수락 ${scriptTypelang.korean}`,
                                        thai: `ยอมรับคุกกี้ ${scriptTypelang.thai}`,
                                        vietnamese: `Chấp nhận cookie ${scriptTypelang.vietnamese}`,
                                        indonesian: `Terima cookie ${scriptTypelang.indonesian}`,
                                        filipino: `Tanggapin ang cookies ${scriptTypelang.filipino}`,
                                        malay: `Terima kuki ${scriptTypelang.malay}`,
                                        chinese: `接受 ${scriptTypelang.chinese} cookies`,
                                        ukrainian: `Прийняти файли cookie ${scriptTypelang.ukrainian}`,
                                        hebrew: `קבל עוגיות ${scriptTypelang.hebrew}`,
                                    }
                                }
                                let INTAlogo = (window.INT) ? window.INT.settings.logo : (window.INTA?.settings?.logo) ? window.INTA?.settings?.logo : null;
                                blockBlockQuotes(tweet, bannerContentMessage, script, buttonText, INTAlogo);
                            })
                        });
                    }

                    if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1 || intaCookieConsents?.advertisementCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.staticsticCookies == "false" || intaCookieConsents?.advertisementCookies == "null" && intaCookieConsents?.functionalCookies == "null" && intaCookieConsents?.staticsticCookies == "null"
                        || intaCookieConsents?.advertisementCookies == "" && intaCookieConsents?.functionalCookies == "" && intaCookieConsents?.staticsticCookies == "") {
                        if (node.nodeType === 1 && node.tagName === "LINK") {
                            addedNodes.forEach((link) => {
                                const linkSrc = link.href;
                                if (notRequired.test(linkSrc)) {
                                    link.disabled = true;
                                }
                            })
                        }
                    }

                    if (node.nodeType === 1 && node.tagName === "SCRIPT" && node.type !== 'application/ld+json' && node.innerText.indexOf("window.INTA") == -1 && node.innerText.indexOf("window.INT") == -1 && node.innerText.indexOf("window.INTA") == -1 && node.innerText.toLowerCase().indexOf("elementor") == -1 && node.innerText.toLowerCase().indexOf("chic_lite_data") == -1 && node.innerText.toLowerCase().indexOf("mailchimp_public_data") == -1 && node.innerText.toLowerCase().indexOf("monsterinsights_frontend") == -1) {
                        let src = node.src || "";


                        node.removeAttribute("charset");
                        addedNodes.forEach((node) => {

                            src = node.src;
                            if (src.indexOf(window.location.hostname) == -1) {
                                if (src.trim() === "") {
                                    return;
                                }
                                window.foundScripts.push(src);
                                // Filter out scripts that are empty or contain only whitespace

                            }

                            if (intaCookieConsents?.advertisementCookies === "checked" || intaCookieConsents?.functionalCookies === "checked" || intaCookieConsents?.staticsticCookies === "checked"
                                || FunctionalCheckbox?.checked || StaticsCheckBox?.checked || MarketingCheckBox?.checked
                            ) {
                                node.type = "text/javascript";
                                return;
                            }



                            if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1 || getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1 || intaCookieConsents?.advertisementCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.staticsticCookies == "false" || intaCookieConsents?.advertisementCookies == "null" && intaCookieConsents?.functionalCookies == "null" && intaCookieConsents?.staticsticCookies == "null"
                                || intaCookieConsents?.advertisementCookies == "" && intaCookieConsents?.functionalCookies == "" && intaCookieConsents?.staticsticCookies == ""
                                || !FunctionalCheckbox?.checked && !StaticsCheckBox?.checked && !MarketingCheckBox?.checked
                            ) {
                                if (
                                    src.indexOf(window.location.hostname) == -1
                                    && src.indexOf("jquery") == -1 && src.indexOf("elementor") == -1
                                ) {
                                    if (
                                        notRequired.test(src)
                                    ) {
                                        node.type = "text/blocked";
                                        node.defer = true;
                                        node.async = true;

                                        /*if(node.parentElement !== null) node.parentElement.removeChild(node);*/

                                        /* deleteAllCookies(); */
                                    }
                                } else if (src.indexOf(window.location.hostname) == -1
                                    && src.indexOf("jquery") == 1) {
                                    node.type = "text/javascript";
                                    node.defer = false;
                                    node.async = false;
                                }

                                if (
                                    notRequired.test(node.innerText)
                                ) {
                                    node.defer = true;
                                    node.async = true;
                                    node.type = "text/blocked";
                                    /*if(node.parentElement !== null) node.parentElement.removeChild(node);*/
                                    /* deleteAllCookies(); */
                                }
                            } else if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1
                                || intaCookieConsents?.advertisementCookies == "false" &&
                                getCookie(int_hideCookieBannerName) != "" &&
                                getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 &&
                                intaCookieConsents?.functionalCookies == "false" &&
                                getCookie(int_hideCookieBannerName) != "" &&
                                getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 &&
                                intaCookieConsents?.staticsticCookies == "false" ||
                                intaCookieConsents?.advertisementCookies == "null" &&
                                intaCookieConsents?.functionalCookies == "null" &&
                                intaCookieConsents?.staticsticCookies == "null"
                                || intaCookieConsents?.advertisementCookies == "" &&
                                intaCookieConsents?.functionalCookies == "" &&
                                intaCookieConsents?.staticsticCookies == ""
                                || !FunctionalCheckbox?.checked &&
                                !StaticsCheckBox?.checked &&
                                !MarketingCheckBox?.checked
                            ) {
                                if (
                                    src.indexOf(window.location.hostname) == -1
                                    && src.indexOf("jquery") == -1 && src.indexOf("elementor") == -1
                                ) {
                                    if (
                                        notRequired.test(src)
                                    ) {
                                        node.type = "text/blocked";
                                        node.defer = true;
                                        node.async = true;
                                        /*if(node.parentElement !== null) node.parentElement.removeChild(node);*/
                                    }
                                } else if (src.indexOf(window.location.hostname) == -1
                                    && src.indexOf("jquery") == 1) {
                                    node.type = "text/javascript";
                                    node.defer = false;
                                    node.async = false;
                                }
                                if (
                                    notRequired.test(node.innerText)
                                    && node.innerText.toLowerCase().indexOf("elementor") == -1
                                ) {
                                    node.type = "text/blocked";
                                    node.defer = true;
                                    node.async = true;
                                    /*if(node.parentElement !== null) node.parentElement.removeChild(node);*/
                                }
                            }

                            if (node.getAttribute("type") === "text/blocked") {
                                node.addEventListener(
                                    "beforescriptexecute",
                                    (e) => beforeScriptExecuteListener(e, node)
                                );
                            }
                        });
                    } else if (node.nodeType === 1 && node.tagName === "NOSCRIPT" && node.type !== 'application/ld+json' && node.innerText.indexOf("window.INTA") == -1 && node.innerText.indexOf("window.INT") == -1 && node.innerText.toLowerCase().indexOf("elementor") == -1) {
                        if (getCookie(int_hideCookieBannerName) == "" || getCookie(int_hideCookieBannerName)?.indexOf("__inta") == -1 || intaCookieConsents?.advertisementCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.functionalCookies == "false" && getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName)?.indexOf("__inta") > -1 && intaCookieConsents?.staticsticCookies == "false" || intaCookieConsents?.advertisementCookies == "null" && intaCookieConsents?.functionalCookies == "null" && intaCookieConsents?.staticsticCookies == "null"
                            || intaCookieConsents?.advertisementCookies == "" && intaCookieConsents?.functionalCookies == "" && intaCookieConsents?.staticsticCookies == ""
                            || FunctionalCheckbox?.checked && StaticsCheckBox?.checked && MarketingCheckBox?.checked
                        ) {

                            if (
                                notRequired.test(node.innerText)
                                && node.innerText.toLowerCase().indexOf("elementor") == -1
                            ) {
                                node.defer = true;
                                node.async = true;
                                node.type = "text/blocked";
                                /*if(node.parentElement !== null) node.parentElement.removeChild(node);*/
                                /* deleteAllCookies(); */
                            }
                        } else if (intaCookieConsents?.functionalCookies == "false" && intaCookieConsents?.advertisementCookies == "false" && intaCookieConsents?.staticsticCookies == "false"
                            || !FunctionalCheckbox?.checked && !StaticsCheckBox?.checked && !MarketingCheckBox?.checked
                        ) {

                            if (
                                notRequired.test(node.innerText)
                                && node.innerText.toLowerCase().indexOf("elementor") == -1
                            ) {
                                node.defer = true;
                                node.async = true;
                                node.type = "text/blocked";
                                /*if(node.parentElement !== null) node.parentElement.removeChild(node);*/
                            } else {
                                /* node.parentElement.appendChild(node); */
                            }
                        } else if (intaCookieConsents?.functionalCookies === "checked" &&
                            intaCookieConsents?.advertisementCookies === "checked" &&
                            intaCookieConsents?.staticsticCookies === "checked" ||
                            FunctionalCheckbox?.checked &&
                            StaticsCheckBox?.checked &&
                            MarketingCheckBox?.checked

                        ) {
                            node.type = "text/javascript";
                        }


                        if (node.getAttribute("type") === "text/blocked") {
                            node.addEventListener(
                                "beforescriptexecute",
                                (e) => beforeScriptExecuteListener(e, node)
                            );
                        }
                        beforeScriptExecuteListener(null, node);
                    }
                });
            });
        });
    });
    startObserving(observer, document.documentElement);
    return observer;

}

function startObserving(observer) {
    observer.observe(document.documentElement, {
        childList: !0,
        subtree: !0,
        attributes: true,
        attributeFilter: ["src", "href", "type", "value", "checked", "innerText"],
    })
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        if (!int__cookiesToKeepRegx.test(name)) {
            let localS = window.INTA?.settings === undefined || window.INTA?.settings?.keepInLocalStorage === undefined ? "" : window.INTA?.settings?.keepInLocalStorage;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; " + intCookieDomain + " path=/";
            clearLocalStorage(localS);
        }
    }
}

function clearLocalStorage(ls) {
    if (ls != null) {
        let lsA = Object.values(ls);

        if (lsA.length != 0 || lsA != null) {
            for (let i = 0; i < lsA.length; i++) {
                let item = localStorage.getItem(lsA[i]);
                let itemName = lsA[i];
                localStorage.clear();
                sessionStorage.clear();
                if (item != undefined || item != null) {
                    localStorage.setItem(itemName, item);
                }
            }
        } else {
            localStorage.clear();
            sessionStorage.clear();
        }
    } else {
        localStorage.clear();
        sessionStorage.clear();
    }
}
/* deleteAllCookies();
clearLocalStorage(); */
if (!isGtmMode) {
    checkCookieStatus();
}

// Recommended approach for monitoring: use addEventListener to detect user consent actions (TCF)
function registerTCFEventListener(retries) {
    retries = retries || 0;
    if (typeof window.__tcfapi === 'function') {
        window.__tcfapi('addEventListener', 2, function (tcData, success) {
            if (success && tcData.eventStatus === 'useractioncomplete') {
                if (window.dataLayer) window.dataLayer.push({ event: 'intastellar_tcf_useractioncomplete', tcData: tcData });
                window.dispatchEvent(new CustomEvent('intastellar_consent_user_action', { detail: tcData }));
            }
        });
    } else if (retries < 50) {
        setTimeout(function () { registerTCFEventListener(retries + 1); }, 100);
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerTCFEventListener);
} else {
    registerTCFEventListener();
}