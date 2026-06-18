#!/usr/bin/env node
/**
 * Generate dev/languages/{slug}.dev.js from catalog + optional cb.dev.js or existing locale files.
 * Run: node scripts/generate-cmp-locales.mjs
 */
import fs from "fs";
import path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { CMP_LOCALE_CATALOG } from "./cmp-locale-catalog.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const LANG_CATEGORIES = require("./cmp-language-categories.source.js");
const ROOT = path.resolve(__dirname, "..");
const CB_PATH = path.join(ROOT, "dev/cb.dev.js");
const OUT_DIR = path.join(ROOT, "dev/languages");

function parseObjectBlock(source, marker) {
    const start = source.indexOf(marker);
    if (start === -1) {
        return null;
    }
    const braceStart = source.indexOf("{", start);
    let depth = 0;
    for (let i = braceStart; i < source.length; i++) {
        const ch = source[i];
        if (ch === "{") {
            depth++;
        } else if (ch === "}") {
            depth--;
            if (depth === 0) {
                return source.slice(braceStart + 1, i);
            }
        }
    }
    return null;
}

function parseBannerEntries(block) {
    const entries = {};
    const re = /(\w+):\s*"((?:\\.|[^"\\])*)"\s*\+\s*document\.domain\s*\+\s*"((?:\\.|[^"\\])*)"/g;
    let m;
    while ((m = re.exec(block)) !== null) {
        entries[m[1]] = {
            before: m[2].replace(/\\"/g, '"'),
            after: m[3].replace(/\\"/g, '"'),
        };
    }
    return entries;
}

function parseTemplateEntries(block) {
    const entries = {};
    const parts = block.split(/(\w+):\s*`/);
    for (let i = 1; i < parts.length; i += 2) {
        const name = parts[i];
        const rest = parts[i + 1] || "";
        const close = rest.lastIndexOf("`");
        if (close === -1) {
            continue;
        }
        entries[name] = rest.slice(0, close);
    }
    return entries;
}

function jsString(value) {
    return JSON.stringify(value);
}

function lineToExpr(line) {
    const arrangePattern = /\$\{\s*\(window\?\.INTA\?\.settings\.arrange == "ltr"\)\s*\?[^:]*:\s*[^}]*\}/;
    if (!arrangePattern.test(line)) {
        return jsString(line);
    }
    const parts = line.split(arrangePattern);
    return parts.map((part) => jsString(part)).join(" + arrangeWord + ");
}

function transformSettingsTemplate(raw) {
    let body = raw;
    body = body.replace(/\$\{\s*generatePolicyUrl\([^)]*\)\s*\}/g, "");
    body = body.replace(/\$\{\s*window\.INTA\.settings\.popia\s*\?[^}]*\}/g, "");
    body = body.replace(/\$\{\s*window\.INTA\.settings\.lgpd\s*\?[^}]*\}/g, "");
    body = body.replace(/<button onClick="showPrivacy\(\)"[^>]*>[^<]*<\/button>/g, "");
    body = body.replace(/\$\{\s*\(window\.INTA\.settings\.design == "banner"[\s\S]*?\)\s*\}/g, "");
    body = body.replace(/\s+\n/g, "\n").trim();
    const lines = body.split("\n").map((line) => line.trim()).filter(Boolean);
    return lines.map((line) => lineToExpr(line)).join("\n            + ");
}

function buildSettingsSuffix(meta) {
    const chunks = [];
    if (meta.popiaLabel) {
        chunks.push(
            '(window.INTA && window.INTA.settings && window.INTA.settings.popia ? \''
            + '<button onclick="showPOPIAModal()" class="intastellarCookie-settings__privacyLink">'
            + meta.popiaLabel.replace(/'/g, "\\'")
            + "</button>' : \"\")"
        );
    }
    if (meta.lgpdLabel) {
        chunks.push(
            '(window.INTA && window.INTA.settings && window.INTA.settings.lgpd ? \''
            + '<button onclick="showLGPDModal()" class="intastellarCookie-settings__privacyLink">'
            + meta.lgpdLabel.replace(/'/g, "\\'")
            + "</button>' : \"\")"
        );
    }
    chunks.push(
        "'<button onClick=\"showPrivacy()\" class=\"intastellarCookie-settings__privacyLink\">"
        + meta.privacyPolicyButton.replace(/'/g, "\\'")
        + "</button>'"
    );
    return chunks.join("\n            + ");
}

function parseExistingLocaleFile(content) {
    const bannerExpr = content.match(/bannerMessage:\s*([\s\S]*?),\s*\n\s*settingsMessage:/)?.[1]?.trim();
    const settingsMessageExpr = content.match(/settingsMessage:\s*([\s\S]*?),\s*\n\s*settingsMessageSuffix:/)?.[1]?.trim();
    const settingsSuffixExpr = content.match(/settingsMessageSuffix:\s*([\s\S]*?),\s*\n\s*categories:/)?.[1]?.trim();
    if (!bannerExpr || !settingsMessageExpr || !settingsSuffixExpr) {
        return null;
    }
    return { bannerExpr, settingsMessageExpr, settingsSuffixExpr };
}

function serializeCategoriesLiteral(categories) {
    return JSON.stringify(categories, null, 4)
        .replace(/"([^"]+)":/g, "$1:");
}

function buildLocaleFile(meta, bannerExpr, settingsMessageExpr, settingsSuffixExpr, categoriesLiteral) {
    return `(function () {
    var categories = ${categoriesLiteral};
    var arrangeWord = (window.INTA && window.INTA.settings && window.INTA.settings.arrange == "ltr") ? ${jsString(meta.arrangeLtr)} : ${jsString(meta.arrangeRtl)};
    window.__intaCmpLocalePayload = {
        slug: ${jsString(meta.slug)},
        cookieSettingsLabel: ${jsString(meta.cookieSettingsLabel)},
        showHideDetails: ${jsString(meta.showHideDetails)},
        acceptLabel: ${jsString(meta.acceptLabel)},
        acceptShortLabel: ${jsString(meta.acceptShortLabel)},
        declineLabel: ${jsString(meta.declineLabel)},
        settingsLabel: ${jsString(meta.settingsLabel)},
        policyLinkLabel: ${jsString(meta.policyLinkLabel)},
        bannerMessage: ${bannerExpr},
        settingsMessage: ${settingsMessageExpr},
        settingsMessageSuffix: ${settingsSuffixExpr},
        categories: categories
    };
})();
`;
}

function main() {
    let messages = {};
    let settingsTemplates = {};
    if (fs.existsSync(CB_PATH)) {
        const cbSource = fs.readFileSync(CB_PATH, "utf8");
        const messagesBlock = parseObjectBlock(cbSource, "const messages = ");
        const settingsBlock = parseObjectBlock(cbSource, "const settingsMessagesLanguages = ");
        if (messagesBlock) {
            messages = parseBannerEntries(messagesBlock);
        }
        if (settingsBlock) {
            settingsTemplates = parseTemplateEntries(settingsBlock);
        }
    }

    fs.mkdirSync(OUT_DIR, { recursive: true });

    let written = 0;
    for (const meta of CMP_LOCALE_CATALOG) {
        let bannerExpr;
        let settingsMessageExpr;
        let settingsSuffixExpr;

        const bannerParts = messages[meta.langKey] || (meta.bannerBefore && meta.bannerAfter
            ? { before: meta.bannerBefore, after: meta.bannerAfter }
            : null);
        const settingsRaw = settingsTemplates[meta.langKey];

        if (bannerParts && settingsRaw) {
            bannerExpr = jsString(bannerParts.before) + " + document.domain + " + jsString(bannerParts.after);
            settingsMessageExpr = transformSettingsTemplate(settingsRaw);
            settingsSuffixExpr = buildSettingsSuffix(meta);
        } else {
            const existingPath = path.join(OUT_DIR, meta.slug + ".dev.js");
            if (!fs.existsSync(existingPath)) {
                console.warn("Skip " + meta.slug + ": no cb.dev.js source and no existing locale file");
                continue;
            }
            const parsed = parseExistingLocaleFile(fs.readFileSync(existingPath, "utf8"));
            if (!parsed) {
                console.warn("Skip " + meta.slug + ": could not parse existing locale file");
                continue;
            }
            bannerExpr = parsed.bannerExpr;
            settingsMessageExpr = parsed.settingsMessageExpr;
            settingsSuffixExpr = parsed.settingsSuffixExpr;
        }

        const categories = LANG_CATEGORIES[meta.langKey];
        if (!categories) {
            console.warn("Skip " + meta.slug + ": no categories for langKey " + meta.langKey);
            continue;
        }
        const content = buildLocaleFile(
            meta,
            bannerExpr,
            settingsMessageExpr,
            settingsSuffixExpr,
            serializeCategoriesLiteral(categories)
        );
        const outPath = path.join(OUT_DIR, meta.slug + ".dev.js");
        fs.writeFileSync(outPath, content, "utf8");
        written++;
        console.log("Wrote " + path.relative(ROOT, outPath));
    }

    console.log("Generated " + written + " locale files.");
}

main();
