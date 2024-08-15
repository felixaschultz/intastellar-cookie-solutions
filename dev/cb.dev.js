/*
 *  GDPR Cookie banner by Intastellar Solutions, International
 *  intastellarsolutions.com/gdpr-cookiebanner
 *  consents.cdn.intastellarsolutions.com/gdpr.js
 *  @copy 2022-2024 Intastellar Solutions, International
 *
*/

const pSBC = (p, c0, c1, l) => {
    let r, g, b, P, f, t, h, i = parseInt, m = Math.round, a = typeof (c1) == "string";
    if (typeof (p) != "number" || p < -1 || p > 1 || typeof (c0) != "string" || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null;
    if (!this.pSBCr) this.pSBCr = (d) => {
        let n = d.length, x = {};
        if (n > 9) {
            [r, g, b, a] = d = d.split(","), n = d.length;
            if (n < 3 || n > 4) return null;
            x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1
        } else {
            if (n == 8 || n == 6 || n < 4) return null;
            if (n < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
            d = i(d.slice(1), 16);
            if (n == 9 || n == 5) x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000;
            else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1
        } return x
    };
    h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == "c" ? !h : false : h, f = this.pSBCr(c0), P = p < 0, t = c1 && c1 != "c" ? this.pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }, p = P ? p * -1 : p, P = 1 - p;
    if (!f || !t) return null;
    if (l) r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b);
    else r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5);
    a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
    if (h) return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";
    else return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2)
}

let message = "";
let cookieBtn = "";
const banner = document.createElement("inta-consents-settings-btn");
const bannerContent = document.createElement("button");

const moreSettings = document.createElement("inta-consents-banner");
const moreSettingsContent = document.createElement("section");
const moreintHeader = document.createElement("intheader");
const moreContentText = document.createElement("section");
const moreFooter = document.createElement("footer");
const intaconsents = document.createElement("intastellarconsents");
const pluginSource = findScriptParameter("utm_source") === undefined ? "Intastellar+Solutions+Cookiebanner" : findScriptParameter("utm_source");
window.platform = findScriptParameter("utm_source") === undefined ? "Manual" : findScriptParameter("utm_source");

let intastellarCookieLanguageSettings = "Cookie Indstillinger";
if (intastellarCookieLanguage == "de") {
    intastellarCookieLanguageSettings = "Cookie Einstellungen";
} else if (intastellarCookieLanguage == "en") {
    intastellarCookieLanguageSettings = "Cookie Settings";
}

moreSettings.setAttribute("class", "intastellarCookieConstents");
moreSettingsContent.setAttribute("class", "intastellarCookieConstents__content");
moreintHeader.setAttribute("class", "intastellarCookieConstents__content-intHeader");
moreFooter.setAttribute("class", "intastellarCookieConstents__content-footer");

moreContentText.setAttribute("class", "intastellarCookieConstents__content-main");;

const intastellarCookieConstents__Container = document.createElement("article");
const intastellarCookieButtons = document.createElement("section");

const testSection = document.createElement("section");
testSection.setAttribute("class", "intastellarCookieConstents__contentC");
testSection.appendChild(moreintHeader);

testSection.appendChild(moreContentText);

moreSettingsContent.appendChild(intastellarCookieConstents__Container);
intastellarCookieConstents__Container.appendChild(testSection);
intastellarCookieConstents__Container.appendChild(intastellarCookieButtons);
intastellarCookieConstents__Container.appendChild(moreFooter);

const cookieSettings = document.createElement("article");
const cookieSettingsContent = document.createElement("section");

bannerContent.setAttribute("class", "intastellarCookie-settingsContainer");
intastellarCookieButtons.setAttribute("class", "intastellarCookie-settings__buttons");
bannerContent.setAttribute("title", intastellarCookieLanguageSettings);
cookieSettings.setAttribute("class", "intastellarCookie-settings__container");
banner.setAttribute("onclick", "javascript:IntastellarCookieConsent.renew();");
const arrange = window.INTA.settings === undefined || window.INTA.settings.arrange === undefined ? "" : window.INTA.settings.arrange;

if (arrange == "ltr") {
    bannerContent.classList.add("intastellarCookie-settingsContainer--otherSide");
    cookieSettings.classList.add("intastellarCookie-settings__container--otherSide");
}

function setIntastellarPartnerDomain() {
    if (window.INTA.settings.partnerDomain === null) return

    if (window.INTA.settings?.partnerDomain?.length > 0) {
        const intastellarSharingIframe = document.createElement("iframe");
        // intastellarSharingIframe.src = "https://consents.cdn.intastellarsolutions.com/cookieSharingIframe.html";
        intastellarSharingIframe.src = "/cookieSharingIframe.html";
        intastellarSharingIframe.id = "intastellarCrossSiteCheck";
        intastellarSharingIframe.style.display = "none";
        intastellarSharingIframe.style.position = "absolute";
        intastellarSharingIframe.style.top = "-100%";
        intastellarSharingIframe.style.left = "-100%";

        document.body.appendChild(intastellarSharingIframe);
    }
}
setIntastellarPartnerDomain();
if (document.getElementById("intastellarCrossSiteCheck") != null) {
    const intastellariframe = document.getElementById("intastellarCrossSiteCheck");
    window.addEventListener("message", function (event) {
        if (event.origin !== "https://consents.cdn.intastellarsolutions.com") return;
        if (event.data === "ready") {
            intastellariframe.contentWindow.postMessage(intaConsentsObjectVariable, "https://consents.cdn.intastellarsolutions.com");
        }
    });
}

/* - - - Set the intastellarCookieLanguageuage dependent messages */

const messages = {
    danish: "Ved at acceptere alle cookies understøtter du " + document.domain + " med at udvikle en bedre løsning til dig.</p><p>Vælg om du vil tillade kun de nødvendige cookies eller om du vil tillade alle cookies.",
    german: "Wenn Sie auf akzeptieren klicken, unterstützen Sie " + document.domain + " bei der Weiterentwicklung von unserer Webseite.</p><p>Wählen Sie zwischen alle Cookies akzeptieren oder Ablehnen.",
    english: "By accepting all cookies, you support " + document.domain + " in developing a better solution for you. </p><p> Select whether you want to allow only the necessary cookies or whether you want to allow all cookies."
};
const messageWrapStart = "<div class='intastellarCookie-settings__contentConatiner'><p>";
const messageWrapEnd = "</p></div>";

const settingsMessagesLanguages = {
    danish: `<h3 style="    font-size: 25px;">Du bestemmer over dine data</h3>
    <p>Vi og vores samarbejdspartnere bruger teknologier, herunder cookies, til at indsamle oplysninger om dig til forskellige formål, herunder:</p>
    <ol>
        <li>Funktionel</li>
        <li>Statistiske</li>
        <li>Marketing</li>
    </ol>
    <p>Ved at trykke på 'Accepter' giver du samtykke til alle disse formål. Du kan også vælge at tilkendegive, hvilke formål du vil give samtykke til ved at benytte checkboksene ud for formålet, og derefter trykke på 'Gem indstillinger'.
    Du kan til enhver tid trække dit samtykke tilbage ved at trykke på det lille ikon nederst i ${(window.INTA.settings.arrange == "ltr") ? "venstre" : "højre"} hjørne af hjemmesiden.</p>
    <p>Du kan læse mere om vores brug af cookies og andre teknologier, samt om vores indsamling og behandling af personoplysninger ved at trykke på linket.</p>
    ${generatePolicyUrl('Vores privat og cookie politik')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International privat politik</button>`,
    german: `<h3 style="    font-size: 25px;">Sie haben die Kontrolle über Ihre Daten</h3>
    <p>Wir und unsere Geschäftspartner nutzen Technologien wie Cookies dazu, personenbezogene Informationen für verschiedene Zwecke zu sammeln, darunter:</p>
    <ol>
        <li>Funktionelle</li>
        <li>Statistike</li>
        <li>Werbung</li>
    </ol>
    <p>Wenn Sie auf „Akzeptieren“ klicken, erteilen Sie Ihre Einwilligung für alle diese Zwecke. Sie können auch entscheiden, welchen Zwecken Sie zustimmen, indem Sie das Kästchen neben dem Zweck anklicken und auf „Speichern“ klicken.</p>
    <p>Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie auf das kleine Symbol unten in der ${(window.INTA.settings.arrange == "ltr") ? "linken" : "rechten"} Ecke klicken.</p>
    ${generatePolicyUrl('Unsere Datenschutz Erklährung und Cookie politik')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International Datenschutz erklährung</button>`,
    english: `<h3 style="    font-size: 25px;">You´re in control</h3>
    <p>We and our business partners uses technologies, including cookies, to collect information about you for various purposes, including:</p>
    <ol>
        <li>Functional</li>
        <li>Statistical</li>
        <li>Advertisement</li>
    </ol>
    <p>By clicking 'Accept', you give your consent for all these purposes. You can also choose to specify the purposes you consent to by ticking the checkbox next to the purpose and clicking 'Save settings'.</p>
    <p>You may withdraw your consent at any time by clicking the small icon at the bottom ${(window.INTA.settings.arrange == "ltr") ? "left" : "right"} corner of the website.</p>
    ${generatePolicyUrl('Our Privacy and cookie Policy')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International privacy policy</button>`
}

if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
    settingsMessage = settingsMessagesLanguages.danish;
    intastellarShowHideDetailsText = "Vis detaljer";
    message =
        messageWrapStart
        + messages.danish
        + messageWrapEnd
        + generatePolicyUrl('Vores privat og cookie politik')
        + `<section class="intCookieSaveSettingsContainer">
        ${generateCookieSettingsButton(intastellarSupportedLanguages.danish.saveSettings, 'Accepter')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
    </section>`;
    cookieBtn = generateCookieButtons('Accepter', 'Afvis', 'Indstillinger');
    intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
        ${generateCookieSettingsButton(intastellarSupportedLanguages.danish.saveSettings, 'Accepter')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
    </section>`;
    moreFooter.innerHTML =
        `
        
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <p>ID: ${(getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2])).uid : intaConsentsObjectVariable.uid}</p>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.danish.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
        }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.danish.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
        }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.danish.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
        }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.danish.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
        }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
    `;
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
    settingsMessage = settingsMessagesLanguages.german;
    intastellarShowHideDetailsText = "Details einblenden";
    message = messageWrapStart
        + messages.german
        + messageWrapEnd
        + generatePolicyUrl('Unsere Datenschutz Erklährung und Cookie politik')
        ;
    intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
        ${generateCookieSettingsButton(intastellarSupportedLanguages.german.saveSettings, 'Akzeptieren')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
    </section>`;
    cookieBtn = generateCookieButtons('Akzeptieren', 'Ablehnen', 'Einstellungen');
    moreFooter.innerHTML =
        `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <p>ID: ${(getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2])).uid : intaConsentsObjectVariable.uid}</p>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.german.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.german.necessary.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_requiredCookieList)
        }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.german.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.german.functional.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_functionalCookieList)
        }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.german.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.german.statisic.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
        }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.german.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.german.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
        }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.german.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.german.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.german.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.german.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
    `;
} else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
    settingsMessage = settingsMessagesLanguages.english;
    intastellarShowHideDetailsText = "Show details";
    message =
        messageWrapStart
        + messages.english
        + messageWrapEnd
        + generatePolicyUrl('Our Privacy and cookie Policy')
        ;
    intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
        ${generateCookieSettingsButton(intastellarSupportedLanguages.english.saveSettings, 'Accept')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
    </section>`;
    cookieBtn = generateCookieButtons('Accept', 'Decline All', 'Settings');
    moreFooter.innerHTML =
        `
        
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <p>ID: ${(getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2])).uid : intaConsentsObjectVariable.uid}</p>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.english.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.english.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
        }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.english.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.english.functional.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_functionalCookieList)
        }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.english.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.english.statisic.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
        }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.english.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.english.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
        }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.english.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.english.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.english.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.english.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
    `;
} else {
    /* Default */
    settingsMessage = settingsMessagesLanguages.danish;
    intastellarShowHideDetailsText = "Vis detaljer";
    message =
        messageWrapStart
        + messages.danish
        + messageWrapEnd
        + generatePolicyUrl('Vores privat og cookie politik');
    intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
        ${generateCookieSettingsButton(intastellarSupportedLanguages.danish.saveSettings, 'Accept')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
    </section>`;

    cookieBtn = generateCookieButtons('Accepter', 'Afvis', 'Indstillinger');
    moreFooter.innerHTML =
        `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.danish.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
        }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.danish.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
        }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.danish.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
        }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.danish.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
        }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
    `;
}

moreContentText.innerHTML = settingsMessage;

let ccpa = window.INTA.settings === undefined || window.INTA.settings.ccpa === undefined ? false : window.INTA.settings.ccpa.on;
let ccpaUrl = window.INTA.settings === undefined || window.INTA.settings.ccpa === undefined ? false : window.INTA.settings.ccpa.url;
let cookieColor = window.INTA.settings === undefined || window.INTA.settings.color === undefined || window.INTA.settings.color === false || window.INTA.settings.color.indexOf("[") > -1 || window.INTA.settings.color === "" ? "rgba(0, 51, 153, 1)" : window.INTA.settings.color;
let cookieLogo = window.INTA.settings === undefined || window.INTA.settings.logo === undefined || window.INTA.settings.logo === "" || window.INTA.settings.logo.indexOf("[") > -1 ? null : window.INTA.settings.logo;
let backgroundColor = window.INTA.settings === undefined || window.INTA.settings.background_color === undefined ? "#fff" : window.INTA.settings.background_color;
let cookieTextColor = invertColor(backgroundColor);
const checkMarkColor = cookieColor;
let brightColor = "";
if (cookieColor.indexOf("var") != -1) {
    /* document.documentElement.style
        .setProperty(cookieColor.split("(")[1].split(")")[0] + "--bright", pSBC(-0.60, getComputedStyle(document.documentElement)
            .getPropertyValue(cookieColor.split("(")[1].split(")")[0]))); */
    /* document.documentElement.style.setProperty(cookieColor.split("(")[1].split(")")[0] + "--bright", pSBC(-0.60, getComputedStyle(document.documentElement)
        .getPropertyValue(cookieColor.split("(")[1].split(")")[0]))); */
    const root = document.querySelector(':root');
    root.style.setProperty(cookieColor.split("(")[1].split(")")[0] + "--bright", pSBC(-0.60, getComputedStyle(document.documentElement)
        .getPropertyValue(cookieColor.split("(")[1].split(")")[0])));

    brightColor = "var(" + cookieColor.split("(")[1].split(")")[0] + "--bright)";
} else {
    brightColor = pSBC(-0.60, cookieColor);
}

const intaCookieBannerStyle = document.createElement("style");

let textSettings = window.INTA.settings === undefined || window.INTA.settings.text === undefined ? false : window.INTA.settings.text;
let withText = `
.intastellarCookie-settingsContainer{
    border-radius: 50%;
}

.intaGDPR-content p{
    color: #000 !important;
    text-align: left !important;
    font-size: 16px;
    line-height: 17px;
}

.intaGDPR-content ol {
    list-style: none;
    counter-reset: item;
    padding: 0 !important;
}

.intaGDPR-content .paragraph__list:before {
    content: "§ " counters(item, ".") ". ";
    counter-increment: item;
}

.intaGDPR-content ol li {
    color: #000 !important;
    font-size: 16px;
    line-height: 17px;
}

.intaGDPR-content a{
    display: inline-block;
    padding: 5px 0px;
    color: #00a0a0;
}

.intaGDPR-content h2{
    text-align: left;
}

.intaGDPR-content h3{
    font-weight: lighter;
    font-size: 17px;
}

.intCookieIcon-openSettings{
    width: 55px;
    height: 55px;
}
`;
let position = "--right";
let text = "";
let cookieSize = "100%";
if (arrange == "ltr") {
    position = "--left";
}

let IntastellarToolTip = '<div class="intastellarToolTip ' + position + '">' + intastellarCookieLanguageSettings + '</div>';
if (textSettings) {
    IntastellarToolTip = "";
    withText = `
    .intastellarCookie-settingsContainer{
        border-radius: 20px;
    }
    .intCookieIcon-openSettings{
        width: 40px;
        height: 40px;
    }
    .intaGDPR-content p{
        color: #000 !important;
        text-align: left !important;
        font-size: 16px;
        line-height: 17px;
    }

    .intaGDPR-content ol {
        list-style: none;
        counter-reset: item;
        padding: 0 !important;
    }

    .intaGDPR-content .paragraph__list:before {
        content: "§ " counters(item, ".") ". ";
        counter-increment: item;
    }

    .intaGDPR-content ol li {
        color: #000 !important;
        font-size: 16px;
        line-height: 17px;
    }

    .intaGDPR-content a{
        display: inline-block;
        padding: 5px 0px;
        color: #00a0a0;
    }

    .intaGDPR-content h2{
        text-align: left;
    }

    .intaGDPR-content h3{
        font-weight: lighter;
        font-size: 17px;
    }
    `;
    text = " Cookie notice";
    cookieSize = "25%";
}
intaCookieBannerStyle.innerHTML = ".intastellarCookie-settingsContainer,.intastellarCookieConstents__contentC, .intastellarCookie-settings__btn.--bg, .intastellarCCPAContainer{background: " + cookieColor + " !important;color: #fff !important;} .intCookie_ConsentLogo-container{border-color: #fff; background: linear-gradient(#fff 0 0) padding-box, " + cookieColor + " border-box;} .intCookie_ConsentContainer-content{border-color: #fff; background: linear-gradient(#fff 0 0) padding-box, " + cookieColor + " border-box;} .intastellarCookie-settings__btn.--changePermission{background: transparent !important; border-image-slice: 1;border-color: " + cookieColor + ";border-image:" + cookieColor + " 1 !important; border-width: 3px; border-style: solid; transition: background .25s ease-in-out; width: max-content; margin-inline: auto !important;} .intastellarCookie-settings__btn.--changePermission:hover{background: " + cookieColor + " !important; color: #fff !important;} .intCookieSetting__checkbox:checked ~ .checkmark{background: " + checkMarkColor + ";}.intastellarCCPA__popupClose{background:" + cookieColor + "; color: #fff;} .intastellarCookie-settings__btn.--bg:hover{background: " + brightColor + " !important;}.intastellarCookie-settings__close:hover{background: " + brightColor + " !important;} .intastellarCookieConstents__content-main .intastellarCookie-settings__privacyLink{color: #fff !important;} .intastellarCookie-settings__privacyLink{text-decoration: underline !important;}.intastellarCookie-settings__content .intastellarCookie-settings__privacyLink{color: " + cookieTextColor + ";}.intastellarCookie-settings__content p{color: " + cookieTextColor + " !important;}.intastellarCookie-settings__intHeader{color:" + cookieTextColor + " !important;}.intastellarCookie-settings__container{background-color: " + backgroundColor + " !important;} .intastellarCookie-settingsMoreContainer{display:none;position: fixed; top: 50%; left: 50%; background: #fff; padding: 15px;z-index: 1000; transform: translate(-50%,-50%);}" + withText;
intHead.appendChild(intaCookieBannerStyle);

/* Checking for CCPA "Do not sell my personal data" is enabled if so create an info link on the right side of the screen  */
if (ccpa && isValidCCPALink()) {
    const intastellarCCPAContainer = document.createElement("inta-consents-ccpa");
    const intastellarCCPAContainer__content = document.createElement("section");

    intastellarCCPAContainer.setAttribute("class", "intastellarCCPAContainer");
    intastellarCCPAContainer.setAttribute("title", "California Consumer Privacy Act: Do not sell my information!");
    intastellarCCPAContainer__content.setAttribute("class", "intastellarCCPAContainer__content")
    intastellarCCPAContainer__content.innerHTML = `
        <svg class="intastellarCCPA__icon" height="14" viewBox=".2 0 19.4 20" width="13" xmlns="http://www.w3.org/2000/svg"><path d="m2.2 20c1 0 1.7-.5 2.4-.9.6-.3 1.2-.7 1.9-1 3.2-1.7 6.4-3.5 9.6-5.3 1-.5 2.3-1 3-1.9.2-.3.5-.7.4-1.2-.3-1.1-1.7-1.5-2.6-2-2.2-1.2-4.5-2.5-6.7-3.7-.8-.5-2-1.4-3-.7-.4.2-.6.4-.7.7-.1.4 0 .9 0 1.3v3.2c0 .9-.1 1.6.5 2 .2.1.6.2.9.1 1-.4.7-2.2.7-3.6v-1.1c1.7.9 3.4 1.8 5.1 2.6.6.3 1.6.6 1.8 1.4.2.9-1.7 1.6-2.3 1.9l-6.9 3.9c-.5.3-1.8 1.3-2.6 1-.3-.1-.5-.4-.5-.6-.1-.4-.1-1-.1-1.5v-3.2-5.4c0-.8-.1-1.8.2-2.3.7-1 2.3.8 2.8-.8.1-.4-.1-.8-.3-1-.4-.6-2.2-1.5-2.9-1.7-.2-.1-.7-.2-1-.2-1.7.3-1.3 3-1.3 5v9.9c0 1.5-.2 3.5.4 4.4.3.5.6.5 1.2.7zm5.2-6.5c1.5 0 1.6-1.9.2-2.2-.8-.1-1.4.7-1.2 1.4.2.5.5.6 1 .8z" fill="#fff"/></svg> Do not sell my personal data!
    `;

    intastellarCCPAContainer.appendChild(intastellarCCPAContainer__content);
    intaconsents.appendChild(intastellarCCPAContainer);


    const intastellarCCPApopup = document.createElement("inta-consents-ccpa-popup");
    intastellarCCPApopup.setAttribute("class", "intastellarCCPApopup");

    const instastellarCCPApopupContent = document.createElement("section");
    instastellarCCPApopupContent.setAttribute("class", "intastellarCCPApopup__content");

    if (window.INTA.settings.ccpa.collection != undefined) {
        instastellarCCPApopupContent.innerHTML = `
        <h2><svg class="intastellarCCPA__icon" width="18px" height="19px" viewBox=".2 0 19.4 20" width="13" xmlns="http://www.w3.org/2000/svg"><path d="m2.2 20c1 0 1.7-.5 2.4-.9.6-.3 1.2-.7 1.9-1 3.2-1.7 6.4-3.5 9.6-5.3 1-.5 2.3-1 3-1.9.2-.3.5-.7.4-1.2-.3-1.1-1.7-1.5-2.6-2-2.2-1.2-4.5-2.5-6.7-3.7-.8-.5-2-1.4-3-.7-.4.2-.6.4-.7.7-.1.4 0 .9 0 1.3v3.2c0 .9-.1 1.6.5 2 .2.1.6.2.9.1 1-.4.7-2.2.7-3.6v-1.1c1.7.9 3.4 1.8 5.1 2.6.6.3 1.6.6 1.8 1.4.2.9-1.7 1.6-2.3 1.9l-6.9 3.9c-.5.3-1.8 1.3-2.6 1-.3-.1-.5-.4-.5-.6-.1-.4-.1-1-.1-1.5v-3.2-5.4c0-.8-.1-1.8.2-2.3.7-1 2.3.8 2.8-.8.1-.4-.1-.8-.3-1-.4-.6-2.2-1.5-2.9-1.7-.2-.1-.7-.2-1-.2-1.7.3-1.3 3-1.3 5v9.9c0 1.5-.2 3.5.4 4.4.3.5.6.5 1.2.7zm5.2-6.5c1.5 0 1.6-1.9.2-2.2-.8-.1-1.4.7-1.2 1.4.2.5.5.6 1 .8z" fill="#000"/></svg> Do not sell my personal data!</h2><button class="intastellarCCPA__popupClose">X</button>
        <p>This section is about our California Consumer Privacy Act.</p>
        ${createCCPAPolicyLink(ccpaUrl)}
        <h3>Personal data we collect:</h3>
        <ul>
            <li>IP-Address</li>
            ${window.INTA.settings.ccpa.collection.map(name => '<li>' + name.charAt(0).toUpperCase() + '' + name.slice(1) + '</li>').join('')}
        </ul>
        `;
    } else {
        instastellarCCPApopupContent.innerHTML = `
        <h2><svg class="intastellarCCPA__icon" width="18px" height="19px" viewBox=".2 0 19.4 20" width="13" xmlns="http://www.w3.org/2000/svg"><path d="m2.2 20c1 0 1.7-.5 2.4-.9.6-.3 1.2-.7 1.9-1 3.2-1.7 6.4-3.5 9.6-5.3 1-.5 2.3-1 3-1.9.2-.3.5-.7.4-1.2-.3-1.1-1.7-1.5-2.6-2-2.2-1.2-4.5-2.5-6.7-3.7-.8-.5-2-1.4-3-.7-.4.2-.6.4-.7.7-.1.4 0 .9 0 1.3v3.2c0 .9-.1 1.6.5 2 .2.1.6.2.9.1 1-.4.7-2.2.7-3.6v-1.1c1.7.9 3.4 1.8 5.1 2.6.6.3 1.6.6 1.8 1.4.2.9-1.7 1.6-2.3 1.9l-6.9 3.9c-.5.3-1.8 1.3-2.6 1-.3-.1-.5-.4-.5-.6-.1-.4-.1-1-.1-1.5v-3.2-5.4c0-.8-.1-1.8.2-2.3.7-1 2.3.8 2.8-.8.1-.4-.1-.8-.3-1-.4-.6-2.2-1.5-2.9-1.7-.2-.1-.7-.2-1-.2-1.7.3-1.3 3-1.3 5v9.9c0 1.5-.2 3.5.4 4.4.3.5.6.5 1.2.7zm5.2-6.5c1.5 0 1.6-1.9.2-2.2-.8-.1-1.4.7-1.2 1.4.2.5.5.6 1 .8z" fill="#000"/></svg> Do not sell my personal data!</h2><button class="intastellarCCPA__popupClose">X</button>
        <h3>Personal data we collect:</h3>
        <p>This section is about our California Consumer Privacy Act.</p>
        <ul>
            <li>IP-Address</li>
        </ul>
        `;
    }
    intastellarCCPApopup.appendChild(instastellarCCPApopupContent);
    intaconsents.appendChild(intastellarCCPApopup);
} else if (!isValidCCPALink() && "ccpa" in window.INTA.settings && window.INTA.settings.ccpa.on === "true") {
    throw new IntastellarSolutionsSDK("Please add your valid 'California Consumer Privacy Act' url to the banner. Read more at https://www.intastellarsolutions.com/gdpr-cookiebanner");
}

cookieSettingsContent.setAttribute("class", "intastellarCookie-settings__content");

if (window.location.host.indexOf("intastellarsolutions") == -1) {
    poweredBy = "<span class='intastellarCookie-settings__poweredBy' alt='This cookie banner is powered by Intastellar Consents Solutions'>Powered by <a class='intastellarCookie-settings__poweredByLink' href='https://www.intastellarsolutions.com/gdpr-cookiebanner?utm_source=" + encodeURI(window.location.href) + "&utm_content=powered_by&utm_medium=referral&utm_campaign=" + pluginSource + "&utm_term=gdpr_banner_logo' target='_blank' rel='noopener'><img class='intastellarCookie-settings__poweredByImg' width='100px' height='100px' src='https://www.intastellarsolutions.com/assets/logos/intastellar-logo-new.svg' alt='Intastellar Solutions, International'></a></span>";
}

let intCookieIconSmallClass = cookieLogo == intCookieIcon ? " intastellarIcon" : "";
let CompanyLogoName = cookieLogo == intCookieIcon ? "Cookie Icon" : `${document.domain} logo`;

moreintHeader.innerHTML = `
    ${typeof window.INTA.settings.logo != "undefined" ? '<img class="intSettingsCompanyLogo" src="' + window.INTA.settings.logo + '" alt="' + CompanyLogoName + '" title="' + CompanyLogoName + '">' : ``}
    <section class="intSettingsPoweredBy">${poweredBy}</section>`;

cookieSettingsContent.innerHTML = '<intHeader class="intastellarCookie-settings__intHeader"><img src="' + window.INTA.settings.logo + '" alt="' + CompanyLogoName + '" title="' + CompanyLogoName + '" style="width: 100%;float: left; max-width: 50px;max-height: 50px;object-fit:contain;"><h2>Cookie</h2><button class="intastellarCookie-settings__close" style="background: ' + cookieColor + ';" aria-label="Close cookie banner"></button></intHeader>' +
    message + cookieBtn + "" + poweredBy;

cookieSettings.appendChild(cookieSettingsContent);

if (window.INTA.settings.advanced) {
    banner.appendChild(cookieSettings);
}

banner.setAttribute("class", "intastellarCookie-settings");

bannerContent.innerHTML = '<img class="intCookieIcon-openSettings" style="filter: invert(1);" src="' + intCookieIcon + '" alt="Cookie Icon">' + IntastellarToolTip + ' ' + text;

banner.appendChild(bannerContent);
moreSettings.appendChild(moreSettingsContent);
intaconsents.appendChild(banner);
intaconsents.appendChild(moreSettings);

if (document.querySelector(".intastellarCCPAContainer") != null) {
    document.querySelector(".intastellarCCPAContainer").addEventListener("click", function () {
        document.querySelector(".intastellarCCPApopup").classList.toggle("--active");
    })
}

IntastellarCookieConsent.inizilize(
    intaconsents
)

window.addEventListener("load", function () {
    (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;
    const temp = location.host.split('.').reverse();
    const domain = encodeURI(temp[1] + '.' + temp[0]);
    const trImage = document.createElement("iframe");
    trImage.name = "intastellar-solutions-sharinglibrary-iframe";
    trImage.style.display = "none";
    trImage.title = "Intastellar Solutions cookie sharing library";
    trImage.src = intastellarCookieBannerRootDomain + "/cookieSharingIframe.html";

    document.body.appendChild(trImage);
    console.log(trImage);

    gtag('set', {
        'user_id': (getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2])).uid : intaConsentsObjectVariable.uid
    });
    /* Setting Google consent default values to denied & granted based on user selection. Via that Google Ads can be shown on Webpage if user gives consents to Advertisment / Marketing cookies */
    /* (intaCookieConsents?.advertisementCookies == "false") ? '"denied"': '"granted"' */
    if (window.INT != undefined && window.INT.policy_link != undefined) { window.INTA.policy_link = window.INT.policy_link };
    if (window.INT != undefined && window.INT.settings != undefined) { window.INTA.settings = window.INT.settings };

    if (isValidPolicyLink()) {
        document.querySelectorAll(".intaCookieListOverview-vendor").forEach((vendor, i) => {
            if (window.INTA.settings.company != "" && window.INTA.settings.company != undefined && vendor.innerText == window.location.host) {
                vendor.innerText = window.INTA.settings.company;
                /* let msg = document.querySelectorAll(".intastellarCookie-settings__privacyLink")[i].innerText.replace(window.location.host, ""); */
                /* document.querySelectorAll(".intastellarCookie-settings__privacyLink")[i].innerText = window.INTA.settings.company; */
            }
        });
        document.querySelectorAll(".intCookie_ConsentLogo").forEach((logo) => {
            logo.src = window.INTA.settings.logo;
        });
        /* - - - Helper function for learn more click - - - */
        document.querySelectorAll(".intLearnMoreBtn").forEach((btn) => {
            btn.addEventListener("click", function (e) {
                learnMore(this);
            })
        })

        window.INTA.settings?.partnerDomain?.forEach((domain) => {
            intaConsentsObjectVariable.sharingDomains.push(domain);
        })

        if (window.INTA.settings?.partnerDomain) {
            dataLayer.push({
                "linker": {
                    "domains": window.INTA.settings?.partnerDomain
                }
            });
        }

        if (getCookie(int_hideCookieBannerName) == "" && getCookie(int_hideCookieBannerName).indexOf("__inta") == -1) {
            document.querySelector(".intastellarCookieConstents").classList.add("--active");
        }

        document.querySelectorAll(".intaExpandCookieList").forEach((btn, i) => {

            btn.addEventListener("click", () => {
                document.querySelectorAll(".intastellar__arrow")[i].classList.toggle("open");
                document.querySelectorAll(".intaCookieListOverview")[i].classList.toggle("view");
            })
        })

        let settings = document.querySelector(".intastellarCookie-settings__container");
        if (document.querySelector(".intastellarCookieBanner") != null) {
            if (getCookie(int_hideCookieBannerName).split(".")[0].indexOf("1") > -1) {
                document.querySelector(".intastellarCookieBanner").style.display = "none";
            } else {
                document.querySelector(".intastellarCookieBanner").style.display = "";
            }
        } else if (getCookie(int_hideCookieBannerName).split(".")[0].indexOf("1") > -1) {
            /* if (window.INTA.settings.advanced === false || window.INTA.settings.advanced === "" || window.INTA.settings.advanced === undefined) { */
            document.querySelector("html").classList.remove("noScroll");
            if (document.querySelector(".intastellarCookieConstents") != null) {
                document.querySelector(".intastellarCookieConstents").classList.remove("--active");
            }
            /* } else {
                settings.classList.toggle("intastellarCookie-settings__container--expand");
            } */
        }

        document.querySelectorAll(".intastellarCookieBanner__settings").forEach((setting) => {
            setting.addEventListener("click", () => {
                let intCookieSettingsMore = document.querySelector(".intastellarCookieConstents");
                if (!intCookieSettingsMore?.classList.contains("--active")) {
                    intCookieSettingsMore?.classList.add("--active");
                    document.querySelector(".intastellarCookie-settings__container").classList.remove("intastellarCookie-settings__container--expand")
                }
            });
        });

        const FunctionalCheckbox = document.querySelector("#functional");
        const StaticsCheckBox = document.querySelector("#statics");
        const MarketingCheckBox = document.querySelector("#marketing");
        const settingsSaveLang = {};

        if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
            settingsSaveLang.necessaryCookiesText = "Decline All";
            settingsSaveLang.saveSettingsText = "Save settings";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
            settingsSaveLang.necessaryCookiesText = "Ablehnen";
            settingsSaveLang.saveSettingsText = "Speichern";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
            settingsSaveLang.necessaryCookiesText = "Afvis";
            settingsSaveLang.saveSettingsText = "Gem indstillinger";
        } else {
            settingsSaveLang.necessaryCookiesText = "Afvis";
            settingsSaveLang.saveSettingsText = "Gem indstillinger";
        }

        FunctionalCheckbox?.addEventListener("change", () => {
            document.querySelector(".intastellarCookie-settings__btn.intastellarCookieBanner__settings.--save").innerText = FunctionalCheckbox?.checked === false
                && StaticsCheckBox?.checked === false
                && MarketingCheckBox?.checked === false
                ? settingsSaveLang.necessaryCookiesText : settingsSaveLang.saveSettingsText;
        })

        StaticsCheckBox?.addEventListener("change", () => {
            document.querySelector(".intastellarCookie-settings__btn.intastellarCookieBanner__settings.--save").innerText = FunctionalCheckbox?.checked === false
                && StaticsCheckBox?.checked === false
                && MarketingCheckBox?.checked === false
                ? settingsSaveLang.necessaryCookiesText : settingsSaveLang.saveSettingsText;
        })

        MarketingCheckBox?.addEventListener("change", () => {
            document.querySelector(".intastellarCookie-settings__btn.intastellarCookieBanner__settings.--save").innerText = FunctionalCheckbox?.checked === false
                && StaticsCheckBox?.checked === false
                && MarketingCheckBox?.checked === false
                ? settingsSaveLang.necessaryCookiesText : settingsSaveLang.saveSettingsText;
        })

        document.querySelector(".intastellarCookie-settings__btn.intastellarCookieBanner__settings.--save").innerText = FunctionalCheckbox?.checked === true
            && StaticsCheckBox?.checked === true
            && MarketingCheckBox?.checked === true
            || FunctionalCheckbox?.checked === true
            || StaticsCheckBox?.checked === true
            || MarketingCheckBox?.checked === true
            ? settingsSaveLang.saveSettingsText : settingsSaveLang.necessaryCookiesText

        document.querySelector(".--save").addEventListener("click", () => {
            const accepted = [];
            if (FunctionalCheckbox?.checked) {
                gtag('consent', 'update', {
                    'functionality_storage': 'granted',
                })
                accepted.push("functionalCookies");
            } else {
                gtag('consent', 'update', {
                    'functionality_storage': 'denied',
                })
                const index = accepted.indexOf("functionalCookies");
                if (index > -1) { // only splice array when item is found
                    accepted.splice(index, 1); // 2nd parameter means remove one item only
                }
            }

            if (StaticsCheckBox?.checked) {
                gtag('consent', 'update', {
                    'analytics_storage': 'granted',
                    'ad_storage': 'granted',
                    'ad_user_data': 'granted',
                })
                accepted.push("staticsticCookies");
            } else {
                gtag('consent', 'update', {
                    'analytics_storage': 'denied',
                })
                const index = accepted.indexOf("staticsticCookies");
                if (index > -1) { // only splice array when item is found
                    accepted.splice(index, 1); // 2nd parameter means remove one item only
                }
            }

            if (MarketingCheckBox?.checked) {
                gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'personalization_storage': 'granted',
                    'ads_data_redaction': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted',
                });
                accepted.push("advertisementCookies");
            } else {
                gtag('consent', 'update', {
                    'ad_storage': 'denied',
                    'personalization_storage': 'denied',
                    'ads_data_redaction': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied',
                });
                const index = accepted.indexOf("advertisementCookies");
                if (index > -1) { // only splice array when item is found
                    accepted.splice(index, 1); // 2nd parameter means remove one item only
                }
            }
            saveINTCookieSettings("changePermission", accepted);
        });

        if (window.INTA.settings.ccpa !== undefined && window.INTA.settings.ccpa.on) {
            const closeCCPAButton = document.querySelector(".intastellarCCPA__popupClose");

            closeCCPAButton.addEventListener("click", () => {
                document.querySelector(".intastellarCCPApopup").classList.remove("--active");
            });
        }

        if (button__acceptAll != null || button__acceptAll != undefined) {
            button__acceptAll.addEventListener("click", function () {

                var cV = 0;
                intaConsentsObjectVariable.consents = {
                    staticsticCookies: "checked",
                    functionalCookies: "checked",
                    advertisementCookies: "checked",
                };
                intaConsentsObjectVariable.time = new Date().getTime()
                document.cookie =
                    int_hideCookieBannerName + "=__inta1." + encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable), randomIntFromInterval(20, 34)) + "; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";

                document.cookie =
                    "_vis_opt=" +
                    cV +
                    "; expires=" +
                    new Date(
                        new Date().getTime() + 60 * 60 * 1000 * 24 * 100
                    ).toGMTString() +
                    "; path=/; " +
                    intCookieDomain +
                    "";

                document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                    .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");

                document.querySelector("html").classList.toggle("noScroll");
                document.querySelector(".intastellarCookieConstents").classList.toggle("--active");

                gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'personalization_storage': 'granted',
                    'analytics_storage': 'granted',
                    'functionality_storage': 'granted',
                    'ads_data_redaction': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted',
                    'url_passthrough': true,
                });
                dataLayer.push({ 'event': 'cookie_consent_update' })
                updateConsents("all");
                /*window.location.reload();*/
            });
        }

        if (button__acceptAll != null || button__acceptAll != undefined) {
            button__acceptAll.addEventListener("click", function () {

                var cV = 1;
                intaConsentsObjectVariable.consents = {
                    staticsticCookies: "checked",
                    functionalCookies: "checked",
                    advertisementCookies: "checked",
                };
                intaConsentsObjectVariable.time = new Date().getTime()
                document.cookie =
                    int_hideCookieBannerName + "=__inta1." + encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable), randomIntFromInterval(20, 34)) + "; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";
                document.cookie =
                    "_vis_opt=" +
                    cV +
                    "; expires=" +
                    new Date(
                        new Date().getTime() + 60 * 60 * 1000 * 24 * 100
                    ).toGMTString() +
                    "; path=/; " +
                    intCookieDomain +
                    "";
                var addedNodes = document.getElementsByTagName("script");
                for (var i = 0; i < addedNodes.length; i++) {
                    addedNodes.type = "";
                }
                document.querySelector("html").classList.toggle("noScroll");
                document.querySelector(".intastellarCookieConstents").classList.toggle("--active");
                const intastellarShared = {
                    intaConsentsObjectVariable: intaConsentsObjectVariable,
                    partnerDomain: window.INTA.settings.partnerDomain,
                }
                window.addEventListener("message", function (e) {
                    if (e.data != "ready" && e.origin != intastellarCookieBannerRootDomain) return
                    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                        .postMessage(JSON.stringify(intastellarShared), "*");
                })

                gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'personalization_storage': 'granted',
                    'analytics_storage': 'granted',
                    'functionality_storage': 'granted',
                    'ads_data_redaction': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted',
                    'url_passthrough': true,
                });
                dataLayer.push({ 'event': 'cookie_consent_update' })
                updateConsents("all");
                /*window.location.reload();*/
            });
        }

        if (button__acceptAll != null || button__acceptAll != undefined) {
            button__acceptAllNecessary.addEventListener("click", function () {
                intaConsentsObjectVariable.consents = {
                    staticsticCookies: false,
                    functionalCookies: false,
                    advertisementCookies: false,
                };
                intaConsentsObjectVariable.time = new Date().getTime()
                var cV = 1;
                document.cookie =
                    int_hideCookieBannerName + "=__inta1." + encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable), randomIntFromInterval(20, 34)) + "; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";
                document.cookie =
                    "_vis_opt=" +
                    cV +
                    "; expires=" + cookieLifeTime +
                    "; path=/; " +
                    intCookieDomain +
                    "";

                document.querySelector("html").classList.toggle("noScroll");
                document.querySelector(".intastellarCookieConstents").classList.toggle("--active");
                const intastellarShared = {
                    intaConsentsObjectVariable: intaConsentsObjectVariable,
                    partnerDomain: window.INTA.settings.partnerDomain,
                }
                window.addEventListener("message", function (e) {
                    if (e.data != "ready" && e.origin != intastellarCookieBannerRootDomain) return
                    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                        .postMessage(JSON.stringify(intastellarShared), "*");
                })
                gtag('consent', 'update', {
                    'ad_storage': 'denied',
                    'personalization_storage': 'denied',
                    'analytics_storage': 'denied',
                    'functionality_storage': 'denied',
                    'ads_data_redaction': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied',
                    'url_passthrough': true,
                });
                dataLayer.push({ 'event': 'cookie_consent_update' })
                /*window.location.reload();*/

            });
        }

        if (button__acceptAll != null || button__acceptAll != undefined) {
            const configBtn = document.querySelectorAll(".intastellarCookie-settingsContainer");

            const ness = document.querySelectorAll(".intastellarCookieBanner__accpetNecssery");
            const all = document.querySelectorAll(".intastellarCookieSettings--acceptAll");

            const analyticsBTN = document.querySelector(".analytics");
            const closeSettings = document.querySelector(".intastellarCookie-settings__close");
            const changePermission = document.querySelectorAll(".intastellarCookie-settings__btn.--changePermission");

            changePermission.forEach((change) => {
                change.addEventListener("click", function () {
                    if (this.getAttribute("data-type") == "intMarketingCookies") {
                        document.querySelector("#marketing").checked = true;
                    } else if (this.getAttribute("data-type") == "intFunctionalCookies") {
                        document.querySelector("#functional").checked = true;
                    }
                    saveINTCookieSettings("changePermission", this.getAttribute("data-type"));
                    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                        .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");
                })
            })

            if (window.INTA.settings.advanced === false || window.INTA.settings.advanced === "" || window.INTA.settings.advanced === undefined) {
                configBtn.forEach((configs) => {
                    configs.addEventListener("click", function () {
                        let settings = document.querySelector(".intastellarCookie-settings__container");
                        document.querySelector("html").classList.toggle("noScroll");
                        settings.classList.toggle("intastellarCookie-settings__container--expand");
                    });
                })
            } else {
                configBtn.forEach((configs) => {
                    configs.addEventListener("click", function () {
                        let settings = document.querySelector(".intastellarCookieConstents");
                        /* document.querySelector("html").classList.toggle("noScroll"); */
                        settings.classList.toggle("--active");
                    });
                })
            }
            if (window.INTA.settings.advanced) {
                closeSettings.addEventListener("click", function () {
                    let settings = document.querySelector(".intastellarCookie-settings__container");
                    settings.classList.toggle("intastellarCookie-settings__container--expand");
                })
            }

            ness.forEach((n) => {
                n.addEventListener("click", function () {

                    intaConsentsObjectVariable.consents = {
                        staticsticCookies: false,
                        functionalCookies: false,
                        advertisementCookies: false,
                    };
                    intaConsentsObjectVariable.time = new Date().getTime()
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName + "=__inta1." + encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable), randomIntFromInterval(20, 34)) + "; expires=" + cookieLifeTime +
                        "; path=/; " +
                        intCookieDomain +
                        "";
                    document.cookie =
                        "_vis_opt=" +
                        cV +
                        "; expires=" + cookieLifeTime +
                        "; path=/; " +
                        intCookieDomain +
                        "";
                    document.querySelector("html").classList.toggle("noScroll");
                    document.querySelector(".intastellarCookieConstents").classList.toggle("--active");

                    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                        .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");

                    gtag('consent', 'update', {
                        'ad_storage': 'denied',
                        'personalization_storage': 'denied',
                        'analytics_storage': 'denied',
                        'functionality_storage': 'denied',
                        'ads_data_redaction': 'denied',
                        'ad_user_data': 'denied',
                        'ad_personalization': 'denied',
                        'url_passthrough': true,
                    });
                    dataLayer.push({ 'event': 'cookie_consent_update' })
                    updateConsents("denied");
                    document.querySelector("#marketing").checked = false;
                    document.querySelector("#statics").checked = false;
                    document.querySelector("#functional").checked = false;
                    /*window.location.reload();*/
                });
            });

            all.forEach((a) => {
                a.addEventListener("click", function () {
                    intaConsentsObjectVariable.consents = {
                        staticsticCookies: "checked",
                        functionalCookies: "checked",
                        advertisementCookies: "checked",
                    };
                    intaConsentsObjectVariable.time = new Date().getTime()
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName + "=__inta1." + encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable), randomIntFromInterval(20, 34)) + "; expires=" + cookieLifeTime +
                        "; path=/; " +
                        intCookieDomain +
                        "";
                    document.cookie =
                        "_vis_opt=" +
                        cV +
                        "; expires=" + cookieLifeTime +
                        "; path=/; " +
                        intCookieDomain +
                        "";

                    var addedNodes = document.getElementsByTagName("script");
                    for (var i = 0; i < addedNodes.length; i++) {
                        addedNodes.type = "";
                    }



                    document.querySelector("html").classList.toggle("noScroll");
                    document.querySelector(".intastellarCookieConstents").classList.toggle("--active");

                    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                        .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");

                    gtag('consent', 'update', {
                        'ad_storage': 'granted',
                        'personalization_storage': 'granted',
                        'analytics_storage': 'granted',
                        'functionality_storage': 'granted',
                        'ads_data_redaction': 'granted',
                        'ad_user_data': 'granted',
                        'ad_personalization': 'granted',
                        'url_passthrough': true,
                    });
                    dataLayer.push({ 'event': 'cookie_consent_update' })
                    updateConsents("all");
                    document.querySelector("#marketing").checked = true;
                    document.querySelector("#statics").checked = true;
                    document.querySelector("#functional").checked = true;
                    /*window.location.reload();*/
                })
            });
        } else {
            const configBtn = document.querySelectorAll(".intastellarCookie-settingsContainer");
            const config = document.querySelectorAll(".config");

            const ness = document.querySelectorAll(".intastellarCookieBanner__accpetNecssery");
            const all = document.querySelectorAll(".intastellarCookieSettings--acceptAll");
            const changePermission = document.querySelectorAll(".intastellarCookie-settings__btn.--changePermission");
            const closeCCPAButton = document.querySelector(".intastellarCCPA__popupClose");

            const analyticsBTN = document.querySelector(".analytics");
            const closeSettings = document.querySelector(".intastellarCookie-settings__close");
            let settings = document.querySelector(".intastellarCookie-settings__container");

            changePermission.forEach((change) => {
                change.addEventListener("click", function () {
                    if (this.getAttribute("data-type") == "intMarketingCookies") {
                        document.querySelector("#marketing").checked = true;
                    } else if (this.getAttribute("data-type") == "intFunctionalCookies") {
                        document.querySelector("#functional").checked = true;
                    }
                    saveINTCookieSettings("changePermission", this.getAttribute("data-type"));
                    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                        .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");

                })
            })
            /* Showing default banner when no custom banner is set */
            /*  if (document.querySelector(".intastellarCookieBanner") == null || document.querySelector(".intastellarCookieBanner") == undefined) {
                 if (window.INTA.settings.advanced === false || window.INTA.settings.advanced === "" || window.INTA.settings.advanced === undefined) {
                     debugger;
                     document.querySelector("html").classList.toggle("noScroll");
                     document.querySelector(".intastellarCookieConstents").classList.toggle("--active");
                 } else {
                     settings.classList.toggle("intastellarCookie-settings__container--expand");
                 }
             } */

            if (window.INTA.settings.advanced) {
                configBtn.forEach((configs) => {
                    configs.addEventListener("click", function () {
                        let settings = document.querySelector(".intastellarCookie-settings__container");
                        document.querySelector("html").classList.toggle("noScroll");
                        settings.classList.toggle("intastellarCookie-settings__container--expand");
                    });
                })

                config.forEach((configs) => {
                    configs.addEventListener("click", function () {
                        let settings = document.querySelector(".intastellarCookie-settings__container");
                        settings.classList.toggle("intastellarCookie-settings__container--expand");
                    });
                })
            } else {
                configBtn.forEach((configs) => {
                    configs.addEventListener("click", function () {
                        let settings = document.querySelector(".intastellarCookieConstents");
                        document.querySelector("html").classList.toggle("noScroll");
                        settings.classList.add("--active");
                    });
                })
            }
            if (window.INTA.settings.advanced) {
                closeSettings.addEventListener("click", function () {
                    let settings = document.querySelector(".intastellarCookie-settings__container");
                    settings.classList.toggle("intastellarCookie-settings__container--expand");
                })
            }

            ness.forEach((n) => {
                n.addEventListener("click", function () {
                    intaConsentsObjectVariable.consents = {
                        staticsticCookies: false,
                        functionalCookies: false,
                        advertisementCookies: false,
                    };
                    intaConsentsObjectVariable.time = new Date().getTime()
                    var cV = 1;
                    document.cookie =
                        int_hideCookieBannerName + "=__inta1." + encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable), randomIntFromInterval(20, 34)) + "; expires=" + cookieLifeTime +
                        "; path=/;" +
                        intCookieDomain +
                        "";
                    document.cookie =
                        "_vis_opt=" +
                        cV +
                        "; expires=" + cookieLifeTime +
                        "; path=/; " +
                        intCookieDomain +
                        "";
                    document.querySelector("html").classList.toggle("noScroll");
                    document.querySelector(".intastellarCookieConstents").classList.toggle("--active");

                    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                        .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");
                    document.querySelector("#marketing").checked = false;
                    document.querySelector("#statics").checked = false;
                    document.querySelector("#functional").checked = false;

                    gtag('consent', 'update', {
                        'ad_storage': 'denied',
                        'personalization_storage': 'denied',
                        'analytics_storage': 'denied',
                        'functionality_storage': 'denied',
                        'ads_data_redaction': 'denied',
                        'ad_user_data': 'denied',
                        'ad_personalization': 'denied',
                        'url_passthrough': true,
                    });

                    dataLayer.push({ 'event': 'cookie_consent_update' })
                    /*window.location.reload();*/
                });
            });

            all.forEach((a) => {
                a.addEventListener("click", function () {

                    var cV = 1;

                    intaConsentsObjectVariable.consents = {
                        staticsticCookies: "checked",
                        functionalCookies: "checked",
                        advertisementCookies: "checked",
                    };
                    intaConsentsObjectVariable.time = new Date().getTime()

                    document.cookie =
                        int_hideCookieBannerName + "=__inta1." + encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable), randomIntFromInterval(20, 34)) + "; expires=" + cookieLifeTime +
                        "; path=/; " +
                        intCookieDomain +
                        "";
                    document.cookie =
                        "_vis_opt=" +
                        cV +
                        "; expires=" + cookieLifeTime +
                        "; path=/; " +
                        intCookieDomain +
                        "";

                    var addedNodes = document.getElementsByTagName("script");
                    for (var i = 0; i < addedNodes.length; i++) {
                        addedNodes.type = "";
                    }
                    document.querySelector("html").classList.toggle("noScroll");
                    document.querySelector(".intastellarCookieConstents").classList.toggle("--active");

                    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                        .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");

                    gtag('consent', 'update', {
                        'ad_storage': 'granted',
                        'personalization_storage': 'granted',
                        'analytics_storage': 'granted',
                        'functionality_storage': 'granted',
                        'ads_data_redaction': 'granted',
                        'ad_user_data': 'granted',
                        'ad_personalization': 'granted',
                        'url_passthrough': true,
                    });

                    dataLayer.push({ 'event': 'cookie_consent_update' })
                    updateConsents("all");
                    document.querySelector("#marketing").checked = true;
                    document.querySelector("#statics").checked = true;
                    document.querySelector("#functional").checked = true;
                    /*window.location.reload();*/
                })
            });
        }


        window.addEventListener("message", (e) => {
            if (e.data == "ready") {
                document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
                    .postMessage("you´re open to share with me", "*");
            }
            if (e.data) {
                const sharedCookies = e.data;
                /* console.log(sharedCookies); */
            }
        })

    } else {
        checkCookieStatus();
        /* Displaying a error message if no valid privacy url is giving */
        const errorMessage = document.createElement("div");
        const errorMessageContent = document.createElement("div");

        errorMessage.className = "intastellarErrorMessage";
        errorMessageContent.className = "intastellarErrorMessage-content";

        errorMessageContent.innerHTML = "Intastellar Solutions SDK: Please add a valid privacy & cookie policy to the banner. Read more at <a href='https://developers.intastellarsolutions.com/gdpr-cookiebanner/docs/add-privacy-policy' target='_blank' rel='noopener'>https://developers.intastellarsolutions.com/gdpr-cookiebanner/docs/add-privacy-policy</a>";

        errorMessage.appendChild(errorMessageContent);
        /* document.body.appendChild(errorMessage); */

        throw new IntastellarSolutionsSDK("Please add a valid privacy & cookie policy to the banner. Read more at https://developers.intastellarsolutions.com/gdpr-cookiebanner/docs/add-privacy-policy")
    }
});

/* --- Helper function to get Meta tags --- */
function getMeta(name) {
    var mtag = document.getElementsByTagName("meta");
    for (var i = 0; i < mtag.length; i++) {
        if (mtag[i].getAttribute('name') === name) {
            return mtag[i].getAttribute("content")
        }
    }
    return ''
}

function invertColor(color) {
    var r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {

        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
            color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );
    // Using the HSP value, determine whether the color is light or dark
    if (hsp >= 0 && 165 > hsp) {
        return '#fff';
    } else {
        return '#000';
    }
}

function listCookies() {
    var theCookies = document.cookie.split(";");
    var aString = "";
    for (var i = 1; i <= theCookies.length; i++) {
        aString += i + " " + theCookies[i - 1] + "\n";
    }
    return aString;
}

function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        values.push(getCookie(keys[i]));
    }

    return values;
}

/* Helper function to list all cookies */
function listAllCookies(cookieList) {
    return cookieList.map((cookie) => {
        const vendor = cookie.vendor;
        if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
            return `
                <section class="intaCookieListOverview-grid">
                    <section class="intaCookieList-left">
                        <h3 class="intaCookieListOverview-heading">Udbyder</h3>
                        <p class="intaCookieListOverview-vendor">${vendor}</p>
                        <p class="intaCookieListOverview-heading">Privat Politik</p>
                        <p>${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Privatslivs politik`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Privatslivs politik</a>`}</p>
                        <h4 class="intaCookieList-CookieName">Domæne</h4>
                        ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                return `
                                
                                <p>${cookie}</p>
                            `
            }).join(" ")}
                    </section>
                    <section>
                        <h3 class="intaCookieListOverview-heading">Cookies</h3>
                        <section>
                            ${cookie.cookies.map((cookie) => {
                if (cookie.cookie == undefined) return;
                return `
                                    <article class="intaCookieList-cookie">
                                        <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                        <p>${cookie.purpose}</p>
                                    </article>
                                `
            }).join(" ")}
                        </section>
                    </section>
                </section>
                `
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">Anbieter</h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">Datenschutzerklährung</p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Datenschutzerklährung`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Datenschutzerklährung</a>`}
                    <h4 class="intaCookieList-CookieName">Domain</h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                return `
                            <p>${cookie}</p>
                        `
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">Cookies</h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                if (cookie.cookie == undefined) return;
                return `
                                <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>
                            `
            }).join(" ")}
                    </section>
                </section>
            </section>
            `
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">Vendor</h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">Privacy policy</p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Privacy policy`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Privacy policy</a>`}
                    <h4 class="intaCookieList-CookieName">Domains</h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                return `
                            <p>${cookie}</p>
                        `
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">Cookies</h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                if (cookie.cookie == undefined) return;
                return `
                                <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>
                            `
            }).join(" ")}
                    </section>
                </section>
            </section>
            `
        } else {
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">Udbyder</h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">Privat Politik</p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Privatslivs politik`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Privatslivs politik</a>`}
                    <h4 class="intaCookieList-CookieName">Domæne</h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                return `
                            <p>${cookie}</p>
                        `
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">Cookies</h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                return `
                                <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>
                            `
            }).join(" ")}
                    </section>
                </section>
            </section>
            `
        }
    }).join(" ")
}

function isURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    const tmp = document.createElement('a');
    tmp.href = str;

    if (tmp.host !== window.location.host || tmp.host == window.location.host) {
        if (pattern.test(str) && str.indexOf("policy") != -1 ||
            pattern.test(str) && str.indexOf("cookie") != -1 ||
            pattern.test(str) && str.indexOf("privat") != -1 ||
            pattern.test(str) && str.indexOf("privacy") != -1 ||
            pattern.test(str) && str.indexOf("datenschutz") != -1 ||
            pattern.test(str) && str.indexOf("handelsbetingelser") != -1) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function isCCPAURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    const tmp = document.createElement('a');
    tmp.href = str;

    if (tmp.host !== window.location.host || tmp.host == window.location.host) {
        if (pattern.test(str) && str.indexOf("policy") != -1 ||
            pattern.test(str) && str.indexOf("ccpa") != -1 ||
            pattern.test(str) && str.indexOf("california-consumer-privacy-act") != -1 ||
            pattern.test(str) && str.indexOf("california") != -1 ||
            pattern.test(str) && str.indexOf("privacy-act") != -1 ||
            pattern.test(str) && str.indexOf("california-consumer") != -1) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/* Helper function to get list of cookies */

function getCookies() {
    var cookies = document.cookie.split(';');
    var ret = '';
    for (var i = 1; i <= cookies.length; i++) {
        ret += i + ' - ' + cookies[i - 1] + "<br>";
    }
    return ret;
}

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

/* Adding Privacy Policy of Intastellar Solutions, International */

let intastellarSolutionsPrivacyPolicy = "https://www.intastellarsolutions.com/about/legal/privacy/gdpr-cookiebanner/embedded/privacy-policy";
const xhr = new XMLHttpRequest();
xhr.onload = function () {
    intastellarSolutionsPrivacyPolicy = "loading...";
    if (this.status === 200) {
        intastellarSolutionsPrivacyPolicy = this.responseText;
    }
}

xhr.open("GET", "https://www.intastellarsolutions.com/about/legal/privacy/gdpr-cookiebanner/embedded/privacy-policy?lang=" + (window.INTA.settings === undefined || window.INTA.settings.lang === "auto" || window.INTA.settings.lang === "" ? document.querySelector("html").getAttribute("lang") : window.INTA.settings.language == "german" ? "de" : window.INTA.settings.language == "danish" ? "da" : window.INTA.settings.language == "english" ? "en" : document.querySelector("html").getAttribute("lang")) + "&v=" + new Date().getTime());
xhr.send();

function showPrivacy() {
    document.querySelector(".intLearnMoreBtn").style.display = "none";
    document.querySelector(".intastellarCookieConstents__content").style.scrollPaddingTop = "100px";
    const moreContentText = document.querySelector(".intastellar_privacyPolicy");
    moreContentText.style.height = "100%";
    moreContentText.style.background = "#ffff";
    moreContentText.style.color = "#000";
    moreContentText.style.borderBottom = "1px solid #c4c4c4"
    moreContentText.style.textAlign = "left";
    moreContentText.innerHTML = `
        <div style="padding: 25px;">
            <button onClick="hidePrivacy()" class="intastellarCookieBannerPrivacy-BackButton">Back</button>
            ${intastellarSolutionsPrivacyPolicy}
        </div>
    `;

    moreContentText.scrollIntoView({
        behavior: "smooth",
        block: "start",
    })
}

function hidePrivacy() {
    document.querySelector(".intLearnMoreBtn").style.display = "block";
    const moreContentText = document.querySelector(".intastellar_privacyPolicy");
    moreContentText.style.height = "0";
}

function checkIfIncluded(file) {
    var links = document.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++) {
        if (links[i].href.substr(-file.length) == file)
            return true;
    }

    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src.substr(-file.length) == file)
            return true;
    }

    return false;
}

/* - - - Helper functions for Validate policy link - - - */
function isValidCCPALink() {
    if (typeof window.INTA.settings.ccpa === "object" && isCCPAURL(window.INTA.settings.ccpa.url)) {
        if (window.INTA.settings.ccpa.url.length > 0 && typeof window.INTA.settings.ccpa.url != "undefined") {
            return true;
        }
    }

    return false;
}

/* - - - Helper functions for Messages */
function generatePolicyUrl(policy_link_text) {
    let url = "";
    /* if (typeof window.INTA.policy_link === 'undefined') {
        throw new IntastellarSolutionsSDK("Policy URL has not been defined.")
        return;
    } */
    if (typeof window.INTA.policy_link === "object") {
        url = "<a href='" + window.INTA.policy_link.url + "' target='" + window.INTA.policy_link.target + "' class='intastellarCookie-settings__privacyLink'>" + policy_link_text + "</a>"
    } else if (typeof window.INTA.policy_link === "string") {
        url = "<a href='" + window.INTA.policy_link + "' class='intastellarCookie-settings__privacyLink'>" + policy_link_text + "</a>";
    }
    return url;
}
function generateCookieButtons(allCookiesText, necessaryCookiesText, cookieSettingsText) {
    return '<button class="intastellarCookie-settings__btn --bg intastellarCookieSettings--acceptAll">' + allCookiesText + '</button>'
        + '<button class="intastellarCookie-settings__btn intastellarCookieBanner__accpetNecssery">' + necessaryCookiesText + '</button>'
        + '<button class="intastellarCookie-settings__btn intastellarCookieBanner__settings">' + cookieSettingsText + '</button>';
}

function generateCookieSettingsButton(settingsText, allCookiesText) {
    return '<section class="intSettingsButton"><button class="intastellarCookie-settings__btn intastellarCookieBanner__settings --save">' + settingsText + '</button>'
        + '<button class="intastellarCookie-settings__btn --noBorderRadius --bg intastellarCookieSettings--acceptAll">' + allCookiesText + '</button></section>'
        ;
}
/* - - - Helper function for ccpa URL generator */
function createCCPAPolicyLink(link) {
    let url = "";
    url = "<a href='" + link + "' class='intastellarCookie-settings__privacyLink'>Read more about our ccpa</a>";
    return url;
}
/* - - - Helper functions for Validate policy link - - - */
function isValidPolicyLink() {
    if (typeof window.INTA.policy_link === 'string' && isURL(window.INTA.policy_link)) {
        if (window.INTA.policy_link.length > 0) {
            return true;
        }
    }

    if (typeof window.INTA.policy_link === "object" && isURL(window.INTA.policy_link.url)) {
        if (window.INTA.policy_link.url.length > 0 && typeof window.INTA.policy_link.url != "undefined") {
            return true;
        }
    }

    return false;
}

/* - - - Helper function to learn more - - - */
function learnMore(e) {
    /* if(document.querySelector(".intastellar_privacyPolicy").style.height === "100%") {
        document.querySelector(".intastellar_privacyPolicy").height = "0";
    } */
    document.querySelector(".intReadMore").classList.toggle("view");
    document.querySelector(".intastellarCookieConstents__content").style.scrollPaddingTop = "140px";

    if (document.querySelector(".intReadMore").classList.contains("view")) {
        if (intastellarCookieLanguage == "da-DK" || intastellarCookieLanguage == "da" || intastellarCookieLanguage == "dk") {
            e.innerHTML = "Skjul detaljer";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
            e.innerHTML = "Hide details";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de" || intastellarCookieLanguage === "de-DE") {
            e.innerHTML = "Details ausblenden";
        }

        document.querySelector(".intReadMore").scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    } else {
        if (intastellarCookieLanguage == "da-DK" || intastellarCookieLanguage == "da" || intastellarCookieLanguage == "dk") {
            e.innerHTML = "Vis details";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
            e.innerHTML = "Show details";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de" || intastellarCookieLanguage === "de-DE") {
            e.innerHTML = "Details einblenden";
        }

        document.querySelector(".intastellarCookieConstents__contentC").scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
}

/* - - - Helper function for saving settings - - - */

/* - - - END - - - */
function updateConsents(consent, type = null) {
    let googleAdsScript = document.querySelector("script[src*='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js']")?.src;
    googleAdsScript = googleAdsScript.split("client=")[1].split("&")[0];
    if (consent == "all") {
        let staticCookies = [...inta_statisticCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        let marketingCookie = [...inta_marketingCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        let functionalCookies = [...inta_functionalCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        int__cookiesToKeep.push.apply(int__cookiesToKeep, staticCookies);
        int__cookiesToKeep.push.apply(int__cookiesToKeep, marketingCookie);
        int__cookiesToKeep.push.apply(int__cookiesToKeep, functionalCookies);
        deleteAllCookies();
    }

    if (consent == "all" || type.length > 0 && type.includes("advertisementCookies")) {
        (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;
        (adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 0;
        (adsbygoogle = window.adsbygoogle || []).push({});
    } else {
        (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 1;
        (adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;
    }

    if (type.length > 0) {
        type.forEach((t) => {

            if (t == "staticsticCookies") {
                let staticCookies = [...inta_statisticCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
                const index = int__cookiesToKeep.indexOf(staticCookies);
                if (index == -1) { // only splice array when item is found
                    int__cookiesToKeep.push.apply(int__cookiesToKeep, staticCookies);
                }
                deleteAllCookies();
            } else if (t == "advertisementCookies") {
                let marketingCookie = [...inta_marketingCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
                const index = int__cookiesToKeep.indexOf(marketingCookie);
                if (index == -1) { // only splice array when item is found
                    int__cookiesToKeep.push.apply(int__cookiesToKeep, marketingCookie);
                }
                deleteAllCookies();
            } else if (t == "functionalCookies") {
                let functionalCookies = [...inta_functionalCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
                const index = int__cookiesToKeep.indexOf(functionalCookies);
                if (index == -1) {
                    int__cookiesToKeep.push.apply(int__cookiesToKeep, functionalCookies);
                }
                deleteAllCookies();
            }
        })
    }

    /* if(intaCookieConsents?.functionalCookies === "checked" && intaCookieConsents?.staticsticCookies === "checked" && intaCookieConsents?.advertisementCookies === "checked"){
        const intaBlockItemsContainer = document.querySelectorAll("inta-consents-iframe[data-src]");
        
        intaBlockItemsContainer.forEach((container) => {
            const newIframe = document.createElement("iframe");
            newIframe.border = "0";
            newIframe.frameBorder = "0";
            newIframe.setAttribute("inta-yt-placeholder-img", container.querySelector("inta-consents-bg").getAttribute("inta-bg-img"));
            if(container.getAttribute("data-src").indexOf("youtube") > -1 || container.getAttribute("data-src").indexOf("youtu.be") > -1){
                newIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                newIframe.title = "YouTube video player";
                newIframe.width = "560";
                newIframe.height = "315";
            }
            newIframe.src = container.getAttribute("data-src");
            container.parentElement.replaceChild(newIframe,container);
        })
    } */

    if (intaCookieConsents?.staticsticCookies === "checked") {
        let newArray = [...inta_statisticCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray);
        deleteAllCookies();
    }

    if (intaCookieConsents?.functionalCookies === "checked") {
        const intaBlockItemsContainer = document.querySelectorAll("inta-consents[data-src]");
        const marketingScriptTags = document.querySelectorAll("script[data-functional]");
        /* generateCookieRegex(); */
        marketingScriptTags.forEach((script) => {
            script.setAttribute("type", "text/javascript");
        })

        let newArray = [...inta_functionalCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray);
        deleteAllCookies();

        intaBlockItemsContainer.forEach((container) => {
            const newIframe = document.createElement("iframe");
            newIframe.border = "0";
            newIframe.frameBorder = "0";

            if (container.getAttribute("data-class")) {
                newIframe.setAttribute("class", container.getAttribute("data-class"))
            } else {
                newIframe.width = "560";
                newIframe.height = "315";
            }

            if (container.getAttribute("data-src") !== "undefined") {
                newIframe.src = container.getAttribute("data-src");
                container.parentElement.replaceChild(newIframe, container);
            }
        })
    }

    if (intaCookieConsents?.advertisementCookies === "checked") {
        const intaBlockItemsContainer = document.querySelectorAll("inta-consents-iframe[data-src]");
        const marketingScriptTags = document.querySelectorAll("script[data-marketing]");
        let newArray = [...inta_marketingCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray);
        deleteAllCookies();

        fbq('consent', 'grant');

        marketingScriptTags.forEach((script) => {
            script.setAttribute("type", "text/javascript");
        })

        intaBlockItemsContainer.forEach((container) => {
            const newIframe = document.createElement("iframe");
            newIframe.border = "0";
            newIframe.frameBorder = "0";
            newIframe.setAttribute("inta-yt-placeholder-img", container?.querySelector("inta-consents-bg")?.getAttribute("inta-bg-img"));

            if (container.getAttribute("data-src").indexOf("youtube") > -1 || container.getAttribute("data-src").indexOf("youtu.be") > -1) {
                newIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                newIframe.title = "YouTube video player";
            }

            if (container.getAttribute("data-class")) {
                newIframe.setAttribute("class", container.getAttribute("data-class"))
            } else {
                newIframe.width = "560";
                newIframe.height = "315";
            }

            newIframe.src = container.getAttribute("data-src");
            container.parentElement.replaceChild(newIframe, container);
        })
    }
}

function saveINTCookieSettings(consent, type = null) {
    document.querySelector("html").classList.remove("noScroll");
    document.querySelector(".intastellarCookieConstents").classList.remove("--active");
    const FunctionalCheckbox = document.querySelector("#functional");
    const StaticsCheckBox = document.querySelector("#statics");
    const MarketingCheckBox = document.querySelector("#marketing");

    if (StaticsCheckBox?.checked) {
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'url_passthrough': true,
        })

    } else {
        gtag('consent', 'update', {
            'analytics_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'url_passthrough': true,
        })
    }
    dataLayer.push({ 'event': 'cookie_consent_update' })

    intaConsentsObjectVariable.consents = {
        staticsticCookies: (StaticsCheckBox?.checked) ? "checked" : false,
        functionalCookies: (FunctionalCheckbox?.checked) ? "checked" : false,
        advertisementCookies: (MarketingCheckBox?.checked) ? "checked" : false,
    };
    intaConsentsObjectVariable.time = new Date().getTime()

    document.cookie = int_hideCookieBannerName + "=__inta1." + encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable), randomIntFromInterval(20, 34)) + "; expires=" + cookieLifeTime +
        "; path=/; " +
        intCookieDomain +
        "";
    /*window.location.reload();*/
    updateConsents(consent, type);
    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
        .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");
}