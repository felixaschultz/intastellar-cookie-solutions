'use strict';
const fs = require('fs');
const path = require('path');

const cbSrc = fs.readFileSync(path.join(__dirname, '../../dev/cb.dev.js'), 'utf8');
const gdprSrc = fs.readFileSync(path.join(__dirname, '../../dev/gdpr.dev.js'), 'utf8');

// ---------------------------------------------------------------------------
// Modal function definitions — cb.dev.js must declare each create/show/close trio
// ---------------------------------------------------------------------------
describe('cb.dev.js — PIPEDA modal functions', () => {
    test('createPIPEDAModal() is defined', () => {
        expect(cbSrc).toContain('function createPIPEDAModal()');
    });
    test('showPIPEDAModal() is defined', () => {
        expect(cbSrc).toContain('function showPIPEDAModal()');
    });
    test('closePIPEDAModal() is defined', () => {
        expect(cbSrc).toContain('function closePIPEDAModal()');
    });
    test('PIPEDA modal has correct DOM id', () => {
        expect(cbSrc).toContain('id="pipeda-modal"');
    });
    test('PIPEDA modal close button calls closePIPEDAModal()', () => {
        expect(cbSrc).toContain('onclick="closePIPEDAModal()"');
    });
});

describe('cb.dev.js — Law 25 modal functions', () => {
    test('createLaw25Modal() is defined', () => {
        expect(cbSrc).toContain('function createLaw25Modal()');
    });
    test('showLaw25Modal() is defined', () => {
        expect(cbSrc).toContain('function showLaw25Modal()');
    });
    test('closeLaw25Modal() is defined', () => {
        expect(cbSrc).toContain('function closeLaw25Modal()');
    });
    test('Law 25 modal has correct DOM id', () => {
        expect(cbSrc).toContain('id="law25-modal"');
    });
    test('Law 25 modal is in French (title contains "Vos droits")', () => {
        expect(cbSrc).toContain('Vos droits');
    });
    test('Law 25 modal references the CAI supervisory authority', () => {
        expect(cbSrc).toContain("Commission d'accès à l'information");
    });
});

describe('cb.dev.js — Australian Privacy Act modal functions', () => {
    test('createAustralianPrivacyModal() is defined', () => {
        expect(cbSrc).toContain('function createAustralianPrivacyModal()');
    });
    test('showAustralianPrivacyModal() is defined', () => {
        expect(cbSrc).toContain('function showAustralianPrivacyModal()');
    });
    test('closeAustralianPrivacyModal() is defined', () => {
        expect(cbSrc).toContain('function closeAustralianPrivacyModal()');
    });
    test('Australian modal has correct DOM id', () => {
        expect(cbSrc).toContain('id="au-privacy-modal"');
    });
    test('Australian modal references the OAIC', () => {
        expect(cbSrc).toContain('OAIC');
    });
    test('Australian modal references the Privacy Act 1988', () => {
        expect(cbSrc).toContain('Privacy Act 1988');
    });
});

describe('cb.dev.js — Saudi PDPL modal functions', () => {
    test('createPDPLModal() is defined', () => {
        expect(cbSrc).toContain('function createPDPLModal()');
    });
    test('showPDPLModal() is defined', () => {
        expect(cbSrc).toContain('function showPDPLModal()');
    });
    test('closePDPLModal() is defined', () => {
        expect(cbSrc).toContain('function closePDPLModal()');
    });
    test('PDPL modal has correct DOM id', () => {
        expect(cbSrc).toContain('id="pdpl-modal"');
    });
    test('PDPL modal contains Arabic content with dir=rtl', () => {
        expect(cbSrc).toContain('dir="rtl"');
    });
    test('PDPL modal references SDAIA', () => {
        expect(cbSrc).toContain('SDAIA');
    });
    test('PDPL modal contains Arabic text', () => {
        // Arabic title text from the modal
        expect(cbSrc).toContain('حقوقك في مجال حماية البيانات');
    });
});

// ---------------------------------------------------------------------------
// initTemplate() wiring — all new modals must be conditionally created
// ---------------------------------------------------------------------------
describe('cb.dev.js — initTemplate() wiring', () => {
    test('creates Law 25 modal when settings.law25 is truthy', () => {
        expect(cbSrc).toContain('settings.law25');
        expect(cbSrc).toContain('createLaw25Modal()');
        // law25 check must come before pipeda (stricter law takes precedence)
        const law25Idx = cbSrc.indexOf('settings.law25');
        const pipedalIdx = cbSrc.indexOf('settings.pipeda');
        expect(law25Idx).toBeLessThan(pipedalIdx);
    });
    test('creates PIPEDA modal when settings.pipeda is truthy (and law25 is not)', () => {
        expect(cbSrc).toContain('settings.pipeda');
        expect(cbSrc).toContain('createPIPEDAModal()');
    });
    test('creates Australian Privacy modal when settings.australianPrivacy is truthy', () => {
        expect(cbSrc).toContain('settings.australianPrivacy');
        expect(cbSrc).toContain('createAustralianPrivacyModal()');
    });
    test('creates PDPL modal when settings.pdpl is truthy', () => {
        expect(cbSrc).toContain('settings.pdpl');
        expect(cbSrc).toContain('createPDPLModal()');
    });
});

// ---------------------------------------------------------------------------
// gdpr.dev.js — geo detection blocks must be present
// ---------------------------------------------------------------------------
describe('gdpr.dev.js — geo detection source structure', () => {
    test('contains US state opt-out list [VA, CO, UT, CT]', () => {
        expect(gdprSrc).toContain('"VA"');
        expect(gdprSrc).toContain('"CO"');
        expect(gdprSrc).toContain('"UT"');
        expect(gdprSrc).toContain('"CT"');
    });
    test('contains intaIsUsOptOutRegion function', () => {
        expect(gdprSrc).toContain('function intaIsUsOptOutRegion()');
    });
    test('intaSyncSalesOfDataAllowedOnConsents calls intaIsUsOptOutRegion (not the old CA-only function)', () => {
        const fnBody = gdprSrc.slice(
            gdprSrc.indexOf('function intaSyncSalesOfDataAllowedOnConsents('),
            gdprSrc.indexOf('function intaSyncSalesOfDataAllowedOnConsents(') + 400
        );
        expect(fnBody).toContain('intaIsUsOptOutRegion');
        expect(fnBody).not.toContain('intaCaliforniaRegionState');
    });
    test('contains Canadian geo detection (country === "CA")', () => {
        expect(gdprSrc).toContain('"CA"');
        expect(gdprSrc).toContain('pipeda');
        expect(gdprSrc).toContain('law25');
    });
    test('contains Australian geo detection (country === "AU")', () => {
        expect(gdprSrc).toContain('"AU"');
        expect(gdprSrc).toContain('australianPrivacy');
    });
    test('contains Saudi geo detection (country === "SA")', () => {
        expect(gdprSrc).toContain('"SA"');
        expect(gdprSrc).toContain('pdpl');
    });
    test('Google Consent Mode region list includes AU and SA', () => {
        expect(gdprSrc).toContain("'AU'");
        expect(gdprSrc).toContain("'SA'");
    });
    test('Google Consent Mode region list includes US state opt-out regions', () => {
        expect(gdprSrc).toContain("'US-VA'");
        expect(gdprSrc).toContain("'US-CO'");
        expect(gdprSrc).toContain("'US-UT'");
        expect(gdprSrc).toContain("'US-CT'");
    });
});
