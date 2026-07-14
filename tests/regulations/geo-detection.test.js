'use strict';
const { createGdprContext } = require('./helpers/gdpr-context');

// Fresh context + clean INTA state before every test
let ctx;
beforeEach(() => {
    ctx = createGdprContext();
    ctx.INTA = { settings: {} };
    ctx.navigator.globalPrivacyControl = false;
    ctx.localStorage.clear();
});

// ---------------------------------------------------------------------------
// US State opt-out laws
// ---------------------------------------------------------------------------
describe('intaApplyGeoRegionalDefaults — US state opt-out laws', () => {
    test.each([
        ['VA', 'CDPA'],
        ['CO', 'CPA'],
        ['UT', 'UCPA'],
        ['CT', 'CTDPA'],
    ])('US-%s (%s) sets usPrivacy.on=true and state=%s', (state) => {
        ctx.intaApplyGeoRegionalDefaults({ country: 'US', region_code: state });
        expect(ctx.INTA.settings.usPrivacy.on).toBe(true);
        expect(ctx.INTA.settings.usPrivacy.state).toBe(state);
        // Must not incorrectly activate California path
        expect(ctx.INTA.settings.ccpa?.on).toBeFalsy();
    });

    test('US-CA sets ccpa.on=true and does NOT set usPrivacy', () => {
        ctx.intaApplyGeoRegionalDefaults({ country: 'US', region_code: 'CA' });
        expect(ctx.INTA.settings.ccpa.on).toBe(true);
        expect(ctx.INTA.settings.usPrivacy?.on).toBeFalsy();
    });

    test('non-opt-out state visitor clears previously-set usPrivacy.on', () => {
        ctx.INTA.settings.usPrivacy = { on: true, state: 'VA' };
        ctx.intaApplyGeoRegionalDefaults({ country: 'DE', region_code: '' });
        expect(ctx.INTA.settings.usPrivacy.on).toBe(false);
    });

    test('non-US country does not set usPrivacy', () => {
        ctx.intaApplyGeoRegionalDefaults({ country: 'FR', region_code: '' });
        expect(ctx.INTA.settings.usPrivacy?.on).toBeFalsy();
    });
});

// ---------------------------------------------------------------------------
// GPC — Global Privacy Control
// ---------------------------------------------------------------------------
describe('intaApplyGeoRegionalDefaults — GPC signal', () => {
    test('GPC=true + US country sets ccpa_opt_out in localStorage', () => {
        ctx.navigator.globalPrivacyControl = true;
        ctx.intaApplyGeoRegionalDefaults({ country: 'US', region_code: 'CO' });
        expect(ctx.localStorage.getItem('ccpa_opt_out')).toBe('true');
    });

    test('GPC=true + non-US country does NOT set ccpa_opt_out', () => {
        ctx.navigator.globalPrivacyControl = true;
        ctx.intaApplyGeoRegionalDefaults({ country: 'DE', region_code: '' });
        expect(ctx.localStorage.getItem('ccpa_opt_out')).toBeNull();
    });

    test('GPC=false + US country does NOT set ccpa_opt_out', () => {
        ctx.navigator.globalPrivacyControl = false;
        ctx.intaApplyGeoRegionalDefaults({ country: 'US', region_code: 'CT' });
        expect(ctx.localStorage.getItem('ccpa_opt_out')).toBeNull();
    });
});

// ---------------------------------------------------------------------------
// Canada — PIPEDA + Law 25
// ---------------------------------------------------------------------------
describe('intaApplyGeoRegionalDefaults — Canada', () => {
    test('CA (non-QC) sets pipeda=true, law25 remains false', () => {
        ctx.intaApplyGeoRegionalDefaults({ country: 'CA', region_code: 'ON' });
        expect(ctx.INTA.settings.pipeda).toBe(true);
        expect(ctx.INTA.settings.law25).toBeFalsy();
    });

    test('CA + QC sets pipeda=true AND law25=true', () => {
        ctx.intaApplyGeoRegionalDefaults({ country: 'CA', region_code: 'QC' });
        expect(ctx.INTA.settings.pipeda).toBe(true);
        expect(ctx.INTA.settings.law25).toBe(true);
    });

    test('non-CA country clears previously-set pipeda and law25', () => {
        ctx.INTA.settings.pipeda = true;
        ctx.INTA.settings.law25 = true;
        ctx.intaApplyGeoRegionalDefaults({ country: 'US', region_code: 'NY' });
        expect(ctx.INTA.settings.pipeda).toBe(false);
        expect(ctx.INTA.settings.law25).toBe(false);
    });

    test('non-QC province clears previously-set law25', () => {
        ctx.INTA.settings.law25 = true;
        ctx.intaApplyGeoRegionalDefaults({ country: 'CA', region_code: 'BC' });
        expect(ctx.INTA.settings.pipeda).toBe(true);
        expect(ctx.INTA.settings.law25).toBe(false);
    });
});

// ---------------------------------------------------------------------------
// Australian Privacy Act
// ---------------------------------------------------------------------------
describe('intaApplyGeoRegionalDefaults — Australia', () => {
    test('AU sets australianPrivacy=true', () => {
        ctx.intaApplyGeoRegionalDefaults({ country: 'AU', region_code: '' });
        expect(ctx.INTA.settings.australianPrivacy).toBe(true);
    });

    test('non-AU country clears previously-set australianPrivacy', () => {
        ctx.INTA.settings.australianPrivacy = true;
        ctx.intaApplyGeoRegionalDefaults({ country: 'NZ', region_code: '' });
        expect(ctx.INTA.settings.australianPrivacy).toBe(false);
    });
});

// ---------------------------------------------------------------------------
// Saudi Arabia PDPL
// ---------------------------------------------------------------------------
describe('intaApplyGeoRegionalDefaults — Saudi Arabia', () => {
    test('SA sets pdpl=true', () => {
        ctx.intaApplyGeoRegionalDefaults({ country: 'SA', region_code: '' });
        expect(ctx.INTA.settings.pdpl).toBe(true);
    });

    test('non-SA country clears previously-set pdpl', () => {
        ctx.INTA.settings.pdpl = true;
        ctx.intaApplyGeoRegionalDefaults({ country: 'AE', region_code: '' });
        expect(ctx.INTA.settings.pdpl).toBe(false);
    });
});

// ---------------------------------------------------------------------------
// Regression — existing regulations must still work
// ---------------------------------------------------------------------------
describe('intaApplyGeoRegionalDefaults — regression (LGPD, POPIA)', () => {
    test('BR still sets lgpd=true', () => {
        ctx.intaApplyGeoRegionalDefaults({ country: 'BR', region_code: '' });
        expect(ctx.INTA.settings.lgpd).toBe(true);
    });

    test('ZA still sets popia=true', () => {
        ctx.intaApplyGeoRegionalDefaults({ country: 'ZA', region_code: '' });
        expect(ctx.INTA.settings.popia).toBe(true);
    });
});
