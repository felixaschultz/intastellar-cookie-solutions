'use strict';
const fs = require('fs');
const path = require('path');

function readLocale(lang) {
    return fs.readFileSync(
        path.join(__dirname, '../../languages', `${lang}.js`),
        'utf8'
    );
}

// ---------------------------------------------------------------------------
// English locale
// ---------------------------------------------------------------------------
describe('languages/en.js — settingsMessageSuffix buttons', () => {
    let src;
    beforeAll(() => { src = readLocale('en'); });

    // Regression — must not have broken existing buttons
    test('still contains showPOPIAModal()', () => {
        expect(src).toContain('showPOPIAModal()');
    });
    test('still contains showLGPDModal()', () => {
        expect(src).toContain('showLGPDModal()');
    });

    // New — v1.6.0 additions
    test('contains showLaw25Modal()', () => {
        expect(src).toContain('showLaw25Modal()');
    });
    test('contains showPIPEDAModal()', () => {
        expect(src).toContain('showPIPEDAModal()');
    });
    test('contains showAustralianPrivacyModal()', () => {
        expect(src).toContain('showAustralianPrivacyModal()');
    });
    test('contains showPDPLModal()', () => {
        expect(src).toContain('showPDPLModal()');
    });

    // Law 25 and PIPEDA must be mutually exclusive (nested ternary, not separate conditions)
    test('Law 25 and PIPEDA buttons use a single nested ternary (mutually exclusive)', () => {
        const law25Idx = src.indexOf('showLaw25Modal()');
        const pipedalIdx = src.indexOf('showPIPEDAModal()');
        // They should be close together (within 300 chars) as part of one expression
        expect(Math.abs(law25Idx - pipedalIdx)).toBeLessThan(300);
    });
});

// ---------------------------------------------------------------------------
// French locale
// ---------------------------------------------------------------------------
describe('languages/fr.js — settingsMessageSuffix buttons', () => {
    let src;
    beforeAll(() => { src = readLocale('fr'); });

    test('still contains showPOPIAModal()', () => {
        expect(src).toContain('showPOPIAModal()');
    });
    test('still contains showLGPDModal()', () => {
        expect(src).toContain('showLGPDModal()');
    });
    test('contains showLaw25Modal() with French label', () => {
        expect(src).toContain('showLaw25Modal()');
        expect(src).toContain('Loi 25');
    });
    test('contains showPIPEDAModal() with French label', () => {
        expect(src).toContain('showPIPEDAModal()');
        expect(src).toContain('PIPEDA');
    });
    test('contains showAustralianPrivacyModal()', () => {
        expect(src).toContain('showAustralianPrivacyModal()');
    });
    test('contains showPDPLModal()', () => {
        expect(src).toContain('showPDPLModal()');
    });
    test('Law 25 label is in French (Vos droits)', () => {
        expect(src).toContain('Vos droits');
    });
});

// ---------------------------------------------------------------------------
// Arabic locale
// ---------------------------------------------------------------------------
describe('languages/ar.js — settingsMessageSuffix buttons', () => {
    let src;
    beforeAll(() => { src = readLocale('ar'); });

    // ar.js was missing ALL regulation buttons before v1.6.0
    test('now contains showPOPIAModal() (parity with en/fr)', () => {
        expect(src).toContain('showPOPIAModal()');
    });
    test('now contains showLGPDModal() (parity with en/fr)', () => {
        expect(src).toContain('showLGPDModal()');
    });
    test('contains showLaw25Modal()', () => {
        expect(src).toContain('showLaw25Modal()');
    });
    test('contains showPIPEDAModal()', () => {
        expect(src).toContain('showPIPEDAModal()');
    });
    test('contains showAustralianPrivacyModal()', () => {
        expect(src).toContain('showAustralianPrivacyModal()');
    });
    test('contains showPDPLModal() with Arabic label', () => {
        expect(src).toContain('showPDPLModal()');
        // Arabic label for PDPL button
        expect(src).toContain('PDPL');
        expect(src).toContain('حقوق'); // حقوق
    });
});
