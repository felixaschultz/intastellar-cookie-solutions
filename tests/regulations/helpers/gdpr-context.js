'use strict';
const vm = require('vm');
const fs = require('fs');
const path = require('path');
const { extractFunction } = require('./extract-fn');

const SRC = fs.readFileSync(
    path.join(__dirname, '../../../dev/gdpr.dev.js'),
    'utf8'
);

// Functions needed for the regulation tests and their dependencies
const FN_NAMES = [
    'intaCaliforniaRegionState',
    'intaIsUsOptOutRegion',
    'intaMarketingConsentImpliesSaleAllowed',
    'intaSyncSalesOfDataAllowedOnConsents',
    'intaApplyGeoRegionalDefaults',
    'intaGeoAlreadyConfigured',
];

const EXTRACTED_SRC = FN_NAMES.map(name => {
    const body = extractFunction(SRC, name);
    if (!body) throw new Error(`Could not extract function: ${name} — check it still exists in gdpr.dev.js`);
    return body;
}).join('\n\n');

/**
 * Creates a fresh vm context with the geo/consent functions available as properties.
 * Each call returns an independent context so tests cannot bleed state into each other.
 *
 * Usage:
 *   const ctx = createGdprContext();
 *   ctx.INTA = { settings: {} };
 *   ctx.intaApplyGeoRegionalDefaults({ country: 'AU', region_code: '' });
 *   expect(ctx.INTA.settings.australianPrivacy).toBe(true);
 */
function createGdprContext(overrides = {}) {
    const store = {};
    const localStorage = {
        getItem:    (k) => Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null,
        setItem:    (k, v) => { store[k] = String(v); },
        removeItem: (k) => { delete store[k]; },
        clear:      () => { Object.keys(store).forEach(k => delete store[k]); },
        _store:     store,
    };

    const ctx = {
        // Will be set to ctx itself so `window.X === ctx.X` inside the vm
        window:    null,
        INTA:      undefined,
        _intaGeo:  null,
        localStorage,
        navigator: { globalPrivacyControl: false },
        console,
        ...overrides,
    };

    ctx.window = ctx;
    vm.createContext(ctx);
    vm.runInContext(EXTRACTED_SRC, ctx);
    return ctx;
}

module.exports = { createGdprContext, SRC };
