'use strict';
const { createGdprContext } = require('./helpers/gdpr-context');

let ctx;
beforeEach(() => {
    ctx = createGdprContext();
    ctx.INTA = { settings: {} };
    ctx.navigator.globalPrivacyControl = false;
    ctx.localStorage.clear();
});

// ---------------------------------------------------------------------------
// intaIsUsOptOutRegion
// ---------------------------------------------------------------------------
describe('intaIsUsOptOutRegion', () => {
    test('returns "yes" when ccpa.on=true (California)', () => {
        ctx.INTA.settings.ccpa = { on: true };
        expect(ctx.intaIsUsOptOutRegion()).toBe('yes');
    });

    test('returns "yes" when usPrivacy.on=true', () => {
        ctx.INTA.settings.usPrivacy = { on: true, state: 'VA' };
        expect(ctx.intaIsUsOptOutRegion()).toBe('yes');
    });

    test('returns "no" when usPrivacy.on=false', () => {
        ctx.INTA.settings.usPrivacy = { on: false };
        expect(ctx.intaIsUsOptOutRegion()).toBe('no');
    });

    test.each(['VA', 'CO', 'UT', 'CT'])(
        'returns "yes" when _intaGeo shows US-%s',
        (state) => {
            ctx._intaGeo = { country: 'US', region_code: state };
            expect(ctx.intaIsUsOptOutRegion()).toBe('yes');
        }
    );

    test('returns "no" when _intaGeo shows a non-US-opt-out location', () => {
        ctx._intaGeo = { country: 'DE', region_code: 'BE' };
        expect(ctx.intaIsUsOptOutRegion()).toBe('no');
    });

    test('returns "unknown" when no geo info is available', () => {
        // No ccpa, no usPrivacy, no _intaGeo
        expect(ctx.intaIsUsOptOutRegion()).toBe('unknown');
    });
});

// ---------------------------------------------------------------------------
// intaSyncSalesOfDataAllowedOnConsents
// ---------------------------------------------------------------------------
describe('intaSyncSalesOfDataAllowedOnConsents', () => {
    function withCalifornia(consents) {
        ctx.INTA.settings.ccpa = { on: true };
        ctx.intaSyncSalesOfDataAllowedOnConsents(consents);
    }

    function withUsState(state, consents) {
        ctx.INTA.settings.usPrivacy = { on: true, state };
        ctx.intaSyncSalesOfDataAllowedOnConsents(consents);
    }

    test('sets salesOfDataAllowed=true for CA visitor with marketing consent', () => {
        const consents = { advertisementCookies: 'checked' };
        withCalifornia(consents);
        expect(consents.salesOfDataAllowed).toBe(true);
    });

    test('sets salesOfDataAllowed=false for CA visitor with no marketing consent', () => {
        const consents = { advertisementCookies: 'unchecked' };
        withCalifornia(consents);
        expect(consents.salesOfDataAllowed).toBe(false);
    });

    test.each(['VA', 'CO', 'UT', 'CT'])(
        'sets salesOfDataAllowed for US-%s visitor (opt-out states now included)',
        (state) => {
            const consents = { advertisementCookies: 'checked' };
            withUsState(state, consents);
            expect(consents.salesOfDataAllowed).toBe(true);
        }
    );

    test('salesOfDataAllowed=false when ccpa_opt_out is set in localStorage', () => {
        ctx.localStorage.setItem('ccpa_opt_out', 'true');
        ctx.INTA.settings.ccpa = { on: true };
        const consents = { advertisementCookies: 'checked' };
        ctx.intaSyncSalesOfDataAllowedOnConsents(consents);
        expect(consents.salesOfDataAllowed).toBe(false);
    });

    test('removes salesOfDataAllowed for non-US visitor', () => {
        ctx._intaGeo = { country: 'DE', region_code: 'BE' };
        const consents = { advertisementCookies: 'checked', salesOfDataAllowed: true };
        ctx.intaSyncSalesOfDataAllowedOnConsents(consents);
        expect(Object.prototype.hasOwnProperty.call(consents, 'salesOfDataAllowed')).toBe(false);
    });

    test('leaves salesOfDataAllowed unchanged when region is unknown', () => {
        // No geo info at all → "unknown" → no-op
        const consents = { advertisementCookies: 'checked', salesOfDataAllowed: true };
        ctx.intaSyncSalesOfDataAllowedOnConsents(consents);
        expect(consents.salesOfDataAllowed).toBe(true);
    });

    test('does not throw for null/non-object consents input', () => {
        expect(() => ctx.intaSyncSalesOfDataAllowedOnConsents(null)).not.toThrow();
        expect(() => ctx.intaSyncSalesOfDataAllowedOnConsents('string')).not.toThrow();
    });
});
