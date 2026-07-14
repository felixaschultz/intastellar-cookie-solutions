'use strict';

/**
 * Extracts a named top-level function declaration and its entire balanced body
 * from a JavaScript source string. Works for well-formed, non-minified JS.
 */
function extractFunction(src, name) {
    const marker = `function ${name}(`;
    const start = src.indexOf(marker);
    if (start === -1) return null;

    let depth = 0, i = start, opened = false;
    while (i < src.length) {
        const ch = src[i];
        if (ch === '{') { depth++; opened = true; }
        else if (ch === '}') {
            depth--;
            if (opened && depth === 0) return src.slice(start, i + 1);
        }
        i++;
    }
    return null;
}

module.exports = { extractFunction };
