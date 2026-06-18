#!/usr/bin/env node
/**
 * Generate dev/languages/{slug}.dev.js from cb.dev.js messages + settingsMessagesLanguages.
 * Run: node scripts/generate-cmp-locales.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CMP_LOCALE_CATALOG } from "./cmp-locale-catalog.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CB_PATH = path.join(ROOT, "dev/cb.dev.js");
const OUT_DIR = path.join(ROOT, "dev/languages");

function parseObjectBlock(source, marker) {
    const start = source.indexOf(marker);
    if (start === -1) {
        throw new Error("Could not find " + marker);
    }
    const braceStart = source.indexOf("{", start);
    let depth = 0;
    let i = braceStart;
    for (; i < source.length; i++) {
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
    throw new Error("Unbalanced braces for " + marker);
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

function jsString(value) {
    return JSON.stringify(value);
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
    const parts = lines.map((line) => lineToExpr(line));
    return parts.join("\n            + ");
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
    return chunks.join('\n            + ');
}

function buildLocaleFile(meta, bannerExpr, settingsMessageExpr, settingsSuffixExpr) {
    return `(function () {
    var L = window.intastellarSupportedLanguages && window.intastellarSupportedLanguages.${meta.langKey};
    if (!L) {
        return;
    }
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
        categories: L
    };
})();
`;
}

function main() {
    const cbSource = fs.readFileSync(CB_PATH, "utf8");
    const messagesBlock = parseObjectBlock(cbSource, "const messages = ");
    const settingsBlock = parseObjectBlock(cbSource, "const settingsMessagesLanguages = ");
    const messages = parseBannerEntries(messagesBlock);
    const settingsTemplates = parseTemplateEntries(settingsBlock);

    fs.mkdirSync(OUT_DIR, { recursive: true });

    let written = 0;
    for (const meta of CMP_LOCALE_CATALOG) {
        const bannerParts = messages[meta.langKey] || (meta.bannerBefore && meta.bannerAfter
            ? { before: meta.bannerBefore, after: meta.bannerAfter }
            : null);
        const settingsRaw = settingsTemplates[meta.langKey];
        if (!bannerParts) {
            console.warn("Skip " + meta.slug + ": missing messages." + meta.langKey);
            continue;
        }
        if (!settingsRaw) {
            console.warn("Skip " + meta.slug + ": missing settingsMessagesLanguages." + meta.langKey);
            continue;
        }

        const bannerExpr = jsString(bannerParts.before)
            + " + document.domain + "
            + jsString(bannerParts.after);

        const settingsMessageExpr = transformSettingsTemplate(settingsRaw);
        const settingsSuffixExpr = buildSettingsSuffix(meta);
        const content = buildLocaleFile(meta, bannerExpr, settingsMessageExpr, settingsSuffixExpr);
        const outPath = path.join(OUT_DIR, meta.slug + ".dev.js");
        fs.writeFileSync(outPath, content, "utf8");
        written++;
        console.log("Wrote " + path.relative(ROOT, outPath));
    }

    console.log("Generated " + written + " locale files.");
}

main();
