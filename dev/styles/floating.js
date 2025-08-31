/*
 *  Cookie Consents Banner by Intastellar Solutions, International
 *  intastellarsolutions.com/gdpr-cookiebanner
 *  consents.cdn.intastellarsolutions.com/uc.js
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

function darkLightCheck(color) {
    let r, g, b, hsp;

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
    if (hsp > 163.5) {

        return 'light';
    }
    else {

        return 'dark';
    }
}

let message = "";
let cookieBtn = "";
/* const poweredBy = `<a class="inta-poweredBy" href='https://www.intastellarsolutions.com?utm_source=${encodeURI(window.location.href)}&utm_content=powered_by&utm_medium=referral&utm_campaign=Consents+Block&utm_term=gdpr_banner_logo' target='_blank' rel='noopener' style="align-items: center; text-decoration: none;font-size: 11.5px; color: #000 !important; display: flex; justify-content: center;">powered by <img width="109px" height="20px" style="width: 109px !important; height: 20px !important;margin-left: 10px;" src="https://www.intastellarsolutions.com/assets/intastellar_solutions.svg" alt="Intastellar Solutions, International"></a>`; */
const banner = document.createElement("inta-consents-settings-btn");
const bannerContent = document.createElement("button");
const intastellarLogoLight = "https://www.intastellar-consents.com/assets/icons/intastellar-logo-white.svg";
const intastellarLogoDark = "https://www.intastellar-consents.com/assets/icons/intastellar-logo-black.svg";
const moreSettings = document.createElement("inta-consents-banner");
const moreSettingsContent = document.createElement("section");
const moreintHeader = document.createElement("intheader");
const moreContentText = document.createElement("section");
const moreFooter = document.createElement("div");
const intaconsents = document.createElement("intastellarconsents");
const pluginSource = findScriptParameter("utm_source") === undefined ? "Intastellar+Solutions+Cookiebanner" : findScriptParameter("utm_source");
window.platform = findScriptParameter("utm_source") === undefined ? "Manual" : findScriptParameter("utm_source");

let intastellarCookieLanguageSettings = "Cookie Indstillinger";
if (intastellarCookieLanguage == "de" || intastellarCookieLanguage == "de-DE" || window.INTA.settings.language == "de" || window.INTA.settings.language == "german") {
    intastellarCookieLanguageSettings = "Cookie Einstellungen";
} else if (intastellarCookieLanguage == "en" || intastellarCookieLanguage == "en-US" || window.INTA.settings.language == "en" || window.INTA.settings.language == "english") {
    intastellarCookieLanguageSettings = "Cookie Settings";
} else if (intastellarCookieLanguage == "es" || intastellarCookieLanguage == "es-ES" || window.INTA.settings.language == "es" || window.INTA.settings.language == "english") {
    intastellarCookieLanguageSettings = "Configuración de cookies";
} else if (intastellarCookieLanguage == "fr" || window.INTA.settings.language == "fr" || window.INTA.settings.language == "french") {
    intastellarCookieLanguageSettings = "Paramètres des cookies";
} else if (intastellarCookieLanguage == "sv" || window.INTA.settings.language == "sv" || window.INTA.settings.language == "swedish") {
    intastellarCookieLanguageSettings = "Kakinställningar";
} else if (intastellarCookieLanguage == "no" || window.INTA.settings.language == "no" || window.INTA.settings.language == "norwegian") {
    intastellarCookieLanguageSettings = "Informasjonskapselinnstillinger";
} else if (intastellarCookieLanguage == "nl" || window.INTA.settings.language == "nl" || window.INTA.settings.language == "dutch") {
    intastellarCookieLanguageSettings = "Cookie-instellingen";
} else if (intastellarCookieLanguage == "it" || window.INTA.settings.language == "it" || window.INTA.settings.language == "italian") {
    intastellarCookieLanguageSettings = "Impostazioni dei cookie";
} else if (intastellarCookieLanguage == "fi" || window.INTA.settings.language == "fi" || window.INTA.settings.language == "finnish") {
    intastellarCookieLanguageSettings = "Evästeasetukset";
} else if (intastellarCookieLanguage == "ru" || window.INTA.settings.language == "ru" || window.INTA.settings.language == "russian") {
    intastellarCookieLanguageSettings = "Настройки файлов cookie";
} else if (intastellarCookieLanguage == "pl" || window.INTA.settings.language == "pl" || window.INTA.settings.language == "polish") {
    intastellarCookieLanguageSettings = "Ustawienia plików cookie";
} else if (intastellarCookieLanguage == "da" || intastellarCookieLanguage == "da-DK" || window.INTA.settings.language == "da" || window.INTA.settings.language == "danish") {
    intastellarCookieLanguageSettings = "Cookie Indstillinger";
} else if (intastellarCookieLanguage == "pt" || intastellarCookieLanguage == "pt-PT" || window.INTA.settings.language == "pt" || window.INTA.settings.language == "portuguese") {
    intastellarCookieLanguageSettings = "Configurações de cookies";
} else if (intastellarCookieLanguage == "zh" || intastellarCookieLanguage == "zh-CN" || window.INTA.settings.language == "zh" || window.INTA.settings.language == "chinese") {
    intastellarCookieLanguageSettings = "Cookie 设置";
} else if (intastellarCookieLanguage == "ja" || intastellarCookieLanguage == "ja-JP" || window.INTA.settings.language == "ja" || window.INTA.settings.language == "japanese") {
    intastellarCookieLanguageSettings = "Cookie 設定";
} else if (intastellarCookieLanguage == "ko" || intastellarCookieLanguage == "ko-KR" || window.INTA.settings.language == "ko" || window.INTA.settings.language == "korean") {
    intastellarCookieLanguageSettings = "쿠키 설정";
} else if (intastellarCookieLanguage == "tr" || intastellarCookieLanguage == "tr-TR" || window.INTA.settings.language == "tr" || window.INTA.settings.language == "turkish") {
    intastellarCookieLanguageSettings = "Çerez Ayarları";
} else if (intastellarCookieLanguage == "cs" || intastellarCookieLanguage == "cs-CZ" || window.INTA.settings.language == "cs" || window.INTA.settings.language == "czech") {
    intastellarCookieLanguageSettings = "Nastavení cookies";
} else if (intastellarCookieLanguage == "hu" || intastellarCookieLanguage == "hu-HU" || window.INTA.settings.language == "hu" || window.INTA.settings.language == "hungarian") {
    intastellarCookieLanguageSettings = "Cookie beállítások";
} else if (intastellarCookieLanguage == "el" || intastellarCookieLanguage == "el" || window.INTA.settings.language == "el" || window.INTA.settings.language == "greek") {
    intastellarCookieLanguageSettings = "Ρυθμίσεις Cookies";
} else if (intastellarCookieLanguage == "ar" || intastellarCookieLanguage == "ar" || window.INTA.settings.language == "ar" || window.INTA.settings.language == "arabic") {
    intastellarCookieLanguageSettings = "إعدادات ملفات تعريف الارتباط";
} else if (intastellarCookieLanguage == "hi" || intastellarCookieLanguage == "hi" || window.INTA.settings.language == "hi" || window.INTA.settings.language == "hindi") {
    intastellarCookieLanguageSettings = "कुकी सेटिंग्स";
} else if (intastellarCookieLanguage == "th" || intastellarCookieLanguage == "th" || window.INTA.settings.language == "th" || window.INTA.settings.language == "thai") {
    intastellarCookieLanguageSettings = "การตั้งค่า Cookie";
} else if (intastellarCookieLanguage == "af" || intastellarCookieLanguage == "af-ZA" || window.INTA.settings.language == "af" || window.INTA.settings.language == "afrikaans") {
    intastellarCookieLanguageSettings = "Koekie Instellings";
} else if (intastellarCookieLanguage == "bg" || intastellarCookieLanguage == "bg-BG" || window.INTA.settings.language == "bg" || window.INTA.settings.language == "bulgarian") {
    intastellarCookieLanguageSettings = "Настройки на бисквитките";
} else if (intastellarCookieLanguage == "ro" || intastellarCookieLanguage == "ro-RO" || window.INTA.settings.language == "ro" || window.INTA.settings.language == "romanian") {
    intastellarCookieLanguageSettings = "Setări cookie";
}

moreSettings.setAttribute("class", "intastellarCookieConstents");
moreSettingsContent.setAttribute("class", "intastellarCookieConstents__content");

if (window.INTA.settings.arrange == "rtl") {
    moreSettingsContent.setAttribute("class", "intastellarCookieConstents__content --right");
}

moreintHeader.setAttribute("class", "intastellarCookieConstents__content-intHeader");
moreFooter.setAttribute("class", "intastellarCookieConstents__content-footer");

if (window.INTA.settings.arrange == "rtl") {
    moreFooter.setAttribute("class", "intastellarCookieConstents__content-footer --left");
}

moreContentText.setAttribute("class", "intastellarCookieConstents__content-main");;

const intastellarCookieConstents__Container = document.createElement("article");
const intastellarCookieButtons = document.createElement("section");

const testSection = document.createElement("section");
testSection.setAttribute("class", "intastellarCookieConstents__contentC");

testSection.appendChild(moreContentText);

moreSettingsContent.appendChild(intastellarCookieConstents__Container);
intastellarCookieConstents__Container.appendChild(testSection);
intastellarCookieConstents__Container.appendChild(intastellarCookieButtons);

const cookieSettings = document.createElement("article");
const cookieSettingsContent = document.createElement("section");

bannerContent.setAttribute("class", "intastellarCookie-settingsContainer");
intastellarCookieButtons.setAttribute("class", "intastellarCookie-settings__buttons");
bannerContent.setAttribute("title", intastellarCookieLanguageSettings);
cookieSettings.setAttribute("class", "intastellarCookie-settings__container");
banner.setAttribute("onclick", "javascript:IntastellarCookieConsent.renew();");
const arrange = window?.INTA?.settings === undefined || window?.INTA?.settings.arrange === undefined ? "" : window?.INTA?.settings.arrange;
const intastellarLogo = darkLightCheck(window.INTA.settings.color) === "light" ? intastellarLogoDark : intastellarLogoLight;

const intaStyleLink = document.createElement('link');
intaStyleLink.rel = 'stylesheet';
intaStyleLink.type = 'text/css';
intaStyleLink.href = 'https://downloads.intastellarsolutions.com/css/gdpr/' + cookieBannerStyles[window.INTA.settings.design || "overlay"] + '?v=' + new Date().getTime();
intaStyleLink.media = 'all';
intHead.insertBefore(intaStyleLink, document.currentScript.previousSibling);

if (window.location.host.indexOf("intastellarsolutions") == -1) {
    poweredBy = "<span class='intastellarCookie-settings__poweredBy' alt='This cookie banner is powered by Intastellar Consents Solutions'>Powered by <a class='intastellarCookie-settings__poweredByLink' href='https://www.intastellarsolutions.com' target='_blank' rel='noopener'><img class='intastellarCookie-settings__poweredByImg' width='100px' height='100px' src='" + intastellarLogo + "' alt='Intastellar Solutions, International'></a></span>";
}
if (arrange == "ltr") {
    bannerContent.classList.add("intastellarCookie-settingsContainer--otherSide");
    cookieSettings.classList.add("intastellarCookie-settings__container--otherSide");
}

function setIntastellarPartnerDomain() {
    if (window?.INTA?.settings.partnerDomain === null) return

    if (window?.INTA?.settings?.partnerDomain?.length > 0) {
        const intastellarSharingIframe = document.createElement("iframe");
        // intastellarSharingIframe.src = "https://consents.cdn.intastellarsolutions.com/cookieSharingIframe.html";
        intastellarSharingIframe.src = "/cookieSharingIframe.html";
        intastellarSharingIframe.id = "intastellarCrossSiteCheck";
        intastellarSharingIframe.style.display = "none";
        intastellarSharingIframe.style.position = "absolute";
        intastellarSharingIframe.style.top = "-100%";
        intastellarSharingIframe.style.left = "-100%";
        //document.body.appendChild(intastellarSharingIframe);

    }
}

function generatePoweredBy() {
    if (window.location.host.indexOf("intastellarsolutions") == -1) {
        let intastellarLogo = intastellarLogoLight;
        if (window.INTA.settings.design == "bannerV2" || window.INTA.settings.design == "floating") {
            intastellarLogo = intastellarLogoDark;
        }
        poweredBy = "<span class='intastellarCookie-settings__poweredBy' alt='This cookie banner is powered by Intastellar Consents Solutions'>Powered by <a class='intastellarCookie-settings__poweredByLink' href='https://www.intastellarsolutions.com' target='_blank' rel='noopener'><img class='intastellarCookie-settings__poweredByImg' width='100px' height='100px' src='" + intastellarLogo + "' alt='Intastellar Solutions, International'></a></span>";
    }
    return `${poweredBy}`;
}

/* - - - Set the intastellarCookieLanguageuage dependent messages */

const messages = {
    danish: "Ved at acceptere alle cookies understøtter du " + document.domain + " med at udvikle en bedre løsning til dig.</p><p>Vælg om du vil tillade kun de nødvendige cookies eller om du vil tillade alle cookies.",
    german: "Wenn Sie auf akzeptieren klicken, unterstützen Sie " + document.domain + " bei der Weiterentwicklung von unserer Webseite.</p><p>Wählen Sie zwischen alle Cookies akzeptieren oder Ablehnen.",
    english: "By accepting all cookies, you support " + document.domain + " in developing a better solution for you. </p><p> Select whether you want to allow only the necessary cookies or whether you want to allow all cookies.",
    spanish: "Al aceptar todas las cookies, apoyas a " + document.domain + " en el desarrollo de una mejor solución para ti.</p><p>Seleccione si desea permitir solo las cookies necesarias o si desea permitir todas las cookies.",
    french: "En acceptant tous les cookies, vous soutenez " + document.domain + " dans le développement d'une meilleure solution pour vous.</p><p>Sélectionnez si vous souhaitez autoriser uniquement les cookies nécessaires ou si vous souhaitez autoriser tous les cookies.",
    swedish: "Genom att acceptera alla cookies stöder du " + document.domain + " i att utveckla en bättre lösning för dig.</p><p>Välj om du vill tillåta endast nödvändiga cookies eller om du vill tillåta alla cookies.",
    norwegian: "Ved å akseptere alle informasjonskapsler støtter du " + document.domain + " i å utvikle en bedre løsning for deg.</p><p>Velg om du vil tillate bare nødvendige informasjonskapsler eller om du vil tillate alle informasjonskapsler.",
    finnish: "Hyväksymällä kaikki evästeet tuet " + document.domain + " paremman ratkaisun kehittämisessä sinulle.</p><p>Valitse, haluatko sallia vain välttämättömät evästeet vai haluatko sallia kaikki evästeet.",
    dutch: "Door alle cookies te accepteren, ondersteunt u " + document.domain + " bij het ontwikkelen van een betere oplossing voor u.</p><p>Kies of u alleen de noodzakelijke cookies wilt toestaan of dat u alle cookies wilt toestaan.",
    italian: "Accettando tutti i cookie, supporti " + document.domain + " nello sviluppo di una soluzione migliore per te.</p><p>Scegli se vuoi consentire solo i cookie necessari o se vuoi consentire tutti i cookie.",
    portuguese: "Ao aceitar todos os cookies, você apoia " + document.domain + " no desenvolvimento de uma solução melhor para você.</p><p>Escolha se deseja permitir apenas os cookies necessários ou se deseja permitir todos os cookies.",
    russian: "Принимая все файлы cookie, вы поддерживаете " + document.domain + " в разработке лучшего решения для вас.</p><p>Выберите, хотите ли вы разрешить только необходимые файлы cookie или разрешить все файлы cookie.",
    polish: "Akceptując wszystkie pliki cookie, wspierasz " + document.domain + " w opracowywaniu lepszego rozwiązania dla Ciebie.</p><p>Wybierz, czy chcesz zezwolić tylko na niezbędne pliki cookie, czy zezwolić na wszystkie pliki cookie.",
    chinese: "通过接受所有cookie，您支持" + document.domain + "为您开发更好的解决方案。</p><p>选择是否只允许必要的cookie或允许所有cookie。",
    japanese: "すべてのCookieを受け入れることで、" + document.domain + "がより良いソリューションを開発するのをサポートします。</p><p>必要なCookieのみを許可するか、すべてのCookieを許可するかを選択してください。",
    greek: "Αποδεχόμενοι όλα τα cookies, υποστηρίζετε το " + document.domain + " στην ανάπτυξη μιας καλύτερης λύσης για εσάς.</p><p>Επιλέξτε αν θέλετε να επιτρέψετε μόνο τα απαραίτητα cookies ή αν θέλετε να επιτρέψετε όλα τα cookies.",
    afrikaans: "Deur alle koekies te aanvaar, ondersteun u " + document.domain + " in die ontwikkeling van 'n beter oplossing vir u.</p><p>Kies of u slegs die nodige koekies wil toelaat of of u alle koekies wil toelaat.",
    arabic: "من خلال قبول جميع ملفات تعريف الارتباط، فإنك تدعم " + document.domain + " في تطوير حل أفضل لك.</p><p>اختر ما إذا كنت تريد السماح فقط بملفات تعريف الارتباط الضرورية أو ما إذا كنت تريد السماح بجميع ملفات تعريف الارتباط.",
    korean: "모든 쿠키를 수락함으로써 " + document.domain + "이(가) 더 나은 솔루션을 개발할 수 있도록 지원합니다.</p><p>필수 쿠키만 허용할지 아니면 모든 쿠키를 허용할지 선택하세요.",
};
const messageWrapStart = "<div class='intastellarCookie-settings__contentConatiner'><p>";
const messageWrapEnd = "</p></div>";

const settingsMessagesLanguages = {
    danish: `<h3 class="intastellarconsents-heading">Du bestemmer selv over dine data!</h3>
    ${generatePoweredBy()}
    <p>Vi og vores samarbejdspartnere bruger teknologier, herunder cookies, til at indsamle oplysninger om dig til forskellige formål, herunder:</p>
    <ol>
        <li>Funktion</li>
        <li>Statistik</li>
        <li>Marketing</li>
    </ol>
    <p>Ved at trykke på 'Accepter' giver du samtykke til alle disse formål. Du kan også vælge hvilke formål du ønsker at give samtykke til ved at benytte checkboksene herunder, og derefter trykke på ”Gem”.
    Du kan til enhver tid trække dit samtykke tilbage ved at trykke på det lille ikon nederst i ${(window?.INTA?.settings.arrange == "ltr") ? "venstre" : "højre"} hjørne af hjemmesiden.</p>
    ${generatePolicyUrl('Vores privat og cookie politik')}
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")}`,
    german: `<h3 class="intastellarconsents-heading">Sie haben die Kontrolle über Ihre Daten</h3>
    <p>Wir und unsere Geschäftspartner nutzen Technologien wie Cookies dazu, personenbezogene Informationen für verschiedene Zwecke zu sammeln, darunter:</p>
    <ol>
        <li>Funktion</li>
        <li>Statistik</li>
        <li>Werbung</li>
    </ol>
    <p>Wenn Sie auf „Akzeptieren“ klicken, erteilen Sie Ihre Einwilligung für alle diese Zwecke. Sie können auch entscheiden, welchen Zwecken Sie zustimmen, indem Sie das Kästchen neben dem Zweck anklicken und auf „Speichern“ klicken.</p>
    <p>Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie auf das kleine Symbol unten in der ${(window?.INTA?.settings.arrange == "ltr") ? "linken" : "rechten"} Ecke klicken.</p>
    ${generatePolicyUrl('Unsere Datenschutz Erklährung und Cookie politik')}
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    english: `<h3 class="intastellarconsents-heading">You´re in control</h3>
    <p>We and our trusted partners use technologies, such as cookies, to collect information for various purposes, including:</p>
    <ol>
        <li>Functionality</li>
        <li>Analytics</li>
        <li>Advertising</li>
    </ol>
    <p>By clicking 'Accept', you consent to all of these purposes. Alternatively, you can select the specific purposes you agree to by ticking the checkboxes and clicking 'Save Settings'.</p>
    <p>You can withdraw your consent at any time by clicking the small icon in the bottom ${(window?.INTA?.settings.arrange == "ltr") ? "left" : "right"} corner of the website.</p>
    ${generatePolicyUrl('Our Privacy and cookie Policy')}
    
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    spanish: `<h3 class="intastellarconsents-heading">Tienes el control</h3>
    <p>Nosotros y nuestros socios comerciales utilizamos tecnologías, incluidas las cookies, para recopilar información sobre usted con diversos fines, incluidos:</p>
    <ol>
        <li>Funcional</li>
        <li>Estadísticas</li>
        <li>Publicidad</li>
    </ol>
    <p>Al hacer clic en "Aceptar", usted da su consentimiento para todos estos fines. También puede decidir a qué fines dar su consentimiento marcando la casilla junto al fin y haciendo clic en "Guardar configuración".</p>
    <p>Puede retirar su consentimiento en cualquier momento haciendo clic en el pequeño icono en la esquina inferior ${(window?.INTA?.settings.arrange == "ltr") ? "izquierda" : "derecha"} del sitio web.</p>
    ${generatePolicyUrl('Nuestra política de privacidad y cookies')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International política de privacidad</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    french: `<h3 class="intastellarconsents-heading">Vous êtes aux commandes</h3>
    <p>Nous et nos partenaires commerciaux utilisons des technologies, y compris des cookies, pour collecter des informations vous concernant à diverses fins, notamment:</p>
    <ol>
        <li>Fonctionnel</li>
        <li>Statistiques</li>
        <li>Publicité</li>
    </ol>
    <p>En cliquant sur "Accepter", vous donnez votre consentement pour tous ces objectifs. Vous pouvez également choisir de spécifier les objectifs auxquels vous consentez en cochant la case à côté de l'objectif et en cliquant sur "Enregistrer les paramètres".</p>
    <p>Vous pouvez retirer votre consentement à tout moment en cliquant sur le petit icône en bas à gauche du site web.</p>
    ${generatePolicyUrl('Notre politique de confidentialité et de cookies')}
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    swedish: `<h3 class="intastellarconsents-heading">Du har kontrollen</h3>
    <p>Vi och våra affärspartners använder teknik, inklusive cookies, för att samla in information om dig för olika ändamål, inklusive:</p>
    <ol>
        <li>Funktionell</li>
        <li>Statistik</li>
        <li>Marknadsföring</li>
    </ol>
    <p>Genom att klicka på "Acceptera" ger du ditt samtycke till alla dessa ändamål. Du kan också välja att specificera de ändamål du samtycker till genom att markera rutan bredvid ändamålet och klicka på "Spara inställningar".</p>
    <p>Du kan återkalla ditt samtycke när som helst genom att klicka på den lilla ikonen längst ned ${(window?.INTA?.settings.arrange == "ltr") ? "vänster" : "höger"} hörn av webbplatsen.</p>
    ${generatePolicyUrl('Vår integritets- och cookiepolicy')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International integritetspolicy</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    norwegian: `<h3 class="intastellarconsents-heading">Du har kontrollen</h3>
    <p>Vi og våre forretningspartnere bruker teknologi, inkludert informasjonskapsler, for å samle inn informasjon om deg for ulike formål, inkludert:</p>
    <ol>
        
        <li>Funksjonell</li>
        <li>Statistikk</li>
        <li>Markedsføring</li>
    </ol>
    <p>Ved å klikke på "Godta", gir du ditt samtykke til alle disse formålene. Du kan også velge å spesifisere formålene du samtykker til ved å krysse av i boksen ved siden av formålet og klikke på "Lagre innstillinger".</p>
    <p>Du kan når som helst trekke tilbake ditt samtykke ved å klikke på det lille ikonet nederst ${(window?.INTA?.settings.arrange == "ltr") ? "venstre" : "høyre"} hjørne av nettsiden.</p>
    ${generatePolicyUrl('Vår personvern- og informasjonskapsler')}
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    finnish: `<h3 class="intastellarconsents-heading">Olet ohjaimissa</h3>
    <p>Me ja liikekumppanimme käytämme teknologioita, mukaan lukien evästeet, kerätäksemme tietoja sinusta eri tarkoituksiin, mukaan lukien:</p>
    <ol>
        <li>Toiminnallinen</li>
        <li>Tilastollinen</li>
        <li>Mainonta</li>
    </ol>
    <p>Klikkaamalla "Hyväksy" annat suostumuksesi kaikkiin näihin tarkoituksiin. Voit myös valita, mihin tarkoituksiin suostut valitsemalla ruudun tarkoituksen vieressä ja napsauttamalla "Tallenna asetukset".</p>
    <p>Voit peruuttaa suostumuksesi milloin tahansa napsauttamalla sivuston alareunan pientä kuvaketta ${(window?.INTA?.settings.arrange == "ltr") ? "vasen" : "oikea"} kulma.</p>
    ${generatePolicyUrl('Tietosuojakäytäntömme ja evästekäytäntömme')}
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    dutch: `<h3 class="intastellarconsents-heading">U bent in controle</h3>
    <p>Wij en onze zakenpartners gebruiken technologieën, waaronder cookies, om informatie over u te verzamelen voor verschillende doeleinden, waaronder:</p>
    <ol>
        <li>Functioneel</li>
        <li>Statistisch</li>
        <li>Reclame</li>
    </ol>
    <p>Door op 'Accepteren' te klikken, geeft u uw toestemming voor al deze doeleinden. U kunt ook beslissen welke doeleinden u wilt goedkeuren door het selectievakje naast het doel aan te vinken en op 'Instellingen opslaan' te klikken.</p>
    <p>U kunt uw toestemming te allen tijde intrekken door op het kleine pictogram te klikken onderaan de ${(window?.INTA?.settings.arrange == "ltr") ? "linker" : "rechter"} hoek van de website.</p>
    ${generatePolicyUrl('Ons privacy- en cookiebeleid')}
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    italian: `<h3 class="intastellarconsents-heading">Sei al comando</h3>
    <p>Noi e i nostri partner commerciali utilizziamo tecnologie, tra cui i cookie, per raccogliere informazioni su di te per vari scopi, tra cui:</p>
    <ol>
        <li>Funzionale</li>
        <li>Statistiche</li>
        <li>Pubblicità</li>
    </ol>
    <p>Cliccando su "Accetta", dai il tuo consenso per tutti questi scopi. Puoi anche decidere a quali scopi acconsentire spuntando la casella accanto allo scopo e cliccando su "Salva impostazioni".</p>
    <p>Puoi revocare il tuo consenso in qualsiasi momento cliccando sull'icona in basso a sinistra del sito web.</p>
    ${generatePolicyUrl('La nostra politica sulla privacy e sui cookie')}
    
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    portuguese: `<h3 class="intastellarconsents-heading">Você está no controle</h3>
    <p>Nós e nossos parceiros comerciais usamos tecnologias, incluindo cookies, para coletar informações sobre você para diversos fins, incluindo:</p>
    <ol>
        <li>Funcional</li>
        <li>Estatísticas</li>
        <li>Publicidade</li>
    </ol>
    <p>Ao clicar em "Aceitar", você dá seu consentimento para todos esses fins. Você também pode optar por especificar os fins aos quais consente marcando a caixa ao lado do fim e clicando em "Salvar configurações".</p>
    <p>Você pode retirar seu consentimento a qualquer momento clicando no pequeno ícone na parte inferior ${(window?.INTA?.settings.arrange == "ltr") ? "esquerda" : "direita"} do site.</p>
    ${generatePolicyUrl('Nossa política de privacidade e cookies')}
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    russian: `<h3 class="intastellarconsents-heading">Вы в контроле</h3>
    <p>Мы и наши деловые партнеры используем технологии, включая файлы cookie, для сбора информации о вас для различных целей, включая:</p>
    <ol>
        <li>Функциональный</li>
        <li>Статистика</li>
        <li>Реклама</li>
    </ol>
    <p>Нажимая «Принять», вы даете согласие на все эти цели. Вы также можете решить, какие цели вы согласны утвердить, установив флажок рядом с целью и нажав «Сохранить настройки».</p>
    <p>Вы можете отозвать свое согласие в любое время, нажав на небольшой значок в нижнем ${(window?.INTA?.settings.arrange == "ltr") ? "левом" : "правом"} углу веб-сайта.</p>
    ${generatePolicyUrl('Наша политика конфиденциальности и файлы cookie')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International политика конфиденциальности</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    polish: `<h3 class="intastellarconsents-heading">Ty decydujesz o swoich danych</h3>
    <p>My i nasi partnerzy biznesowi wykorzystujemy technologie, w tym pliki cookie, do zbierania informacji o Tobie w różnych celach, w tym:</p>
    <ol>
        <li>Funkcjonalność</li>
        <li>Statystyki</li>
        <li>Reklama</li>
    </ol>
    <p>Klikając „Akceptuj”, wyrażasz zgodę na wszystkie te cele. Możesz także zdecydować, które cele chcesz zatwierdzić, zaznaczając pole wyboru obok celu i klikając „Zapisz ustawienia”.</p>
    <p>Możesz wycofać swoją zgodę w dowolnym momencie, klikając małą ikonę w dolnym ${(window?.INTA?.settings.arrange == "ltr") ? "lewy" : "prawy"} rogu strony internetowej.</p>
    ${generatePolicyUrl('Nasza polityka prywatności i plików cookie')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International polityka prywatności</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    afrikaans: `<h3 class="intastellarconsents-heading">Jy is in beheer</h3>
    <p>Ons en ons sakevennote gebruik tegnologieë, insluitend koekies, om inligting oor jou vir verskillende doeleindes in te samel, insluitend:</p>
    <ol>
        <li>Funksionaliteit</li>
        <li>Analise</li>
        <li>Advertering</li>
    </ol>
    <p>Deur op 'Aanvaar' te klik, gee jy toestemming vir al hierdie doeleindes. Jy kan ook die spesifieke doeleindes waarvoor jy toestemming gee, kies deur die keuselys langs die doelwit aan te dui en op 'Stoor instellings' te klik.</p>
    <p>Jy kan jou toestemming te eniger tyd intrek deur op die klein ikoon in die onderkant ${(window?.INTA?.settings.arrange == "ltr") ? "linker" : "regter"} hoek van die webwerf te klik.</p>
    ${generatePolicyUrl('Ons Privaatheids- en koekiebeleid')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International privaatheidsbeleid</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    arabic: `<h3 class="intastellarconsents-heading">أنت المتحكم</h3>
    <p>نحن وشركاؤنا التجاريون نستخدم تقنيات، بما في ذلك ملفات تعريف الارتباط، لجمع المعلومات عنك لأغراض مختلفة، بما في ذلك:</p>
    <ol>
        <li>الوظائف</li>
        <li>التحليلات</li>
        <li>الإعلانات</li>
    </ol>
    <p>من خلال النقر على "قبول"، فإنك توافق على جميع هذه الأغراض. يمكنك أيضًا اختيار الأغراض المحددة التي توافق عليها عن طريق تحديد المربعات بجوار الأغراض والنقر على "حفظ الإعدادات".</p>
    <p>يمكنك سحب موافقتك في أي وقت من خلال النقر على الأيقونة الصغيرة في الزاوية ${(window?.INTA?.settings.arrange == "ltr") ? "اليسرى" : "اليمنى"} السفلية من الموقع.</p>
    ${generatePolicyUrl('سياسة الخصوصية وملفات تعريف الارتباط الخاصة بنا')}
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    greek: `<h3 class="intastellarconsents-heading">Είστε σε έλεγχο</h3>
    <p>Εμείς και οι επιχειρηματικοί μας συνεργάτες χρησιμοποιούμε τεχνολογίες, όπως τα cookies, για να συλλέγουμε πληροφορίες για
    εσάς για διάφορους σκοπούς, συμπεριλαμβανομένων:</p>
    <ol>
        <li>Λειτουργικότητα</li>
        <li>Στατιστικά</li>
        <li>Διαφήμιση</li>
    </ol>
    <p>Κάνοντας κλικ στο "Αποδοχή", συναινείτε σε όλους αυτούς τους σκοπούς. Μπορείτε επίσης να επιλέξετε τους συγκεκριμένους σκοπούς στους οποίους συμφωνείτε, επιλέγοντας τα πλαί
ς δίπλα στον σκοπό και κάνοντας κλικ στο "Αποθήκευση ρυθμίσεων".</p>
    <p>Μπορείτε να ανακαλέσετε τη συγκατάθεσή σας ανά πάσα στιγμή κάνοντας κλικ στο μικρό εικονίδιο στην κάτω ${(window?.INTA?.settings.arrange == "ltr") ? "αριστερή" : "δεξιά"} γωνία της ιστοσελίδας.</p>
    ${generatePolicyUrl('Η Πολιτική Απορρήτου και Cookies μας')}
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    chinese: `<h3 class="intastellarconsents-heading">你掌控一切</h3>
    <p>我们和我们的商业伙伴使用技术，包括 cookies，收集关于您的信息用于各种目的，包括：</p>
    <ol>
        <li>功能性</li>
        <li>统计</li>
        <li>广告</li>
    </ol>
    <p>点击“接受”即表示您同意所有这些目的。您也可以选择您同意的具体目的，通过勾选目的旁边的复选框并点击“保存设置”。</p>
    <p>您可以随时通过点击网站底部 ${(window?.INTA?.settings.arrange == "ltr") ? "左侧" : "右侧"} 角落的小图标来撤销您的同意。</p>
    ${generatePolicyUrl('我们的隐私和 Cookie 政策')}
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    japanese: `<h3 class="intastellarconsents-heading">あなたがコントロール</h3>
    <p>私たちと私たちのビジネスパートナーは、クッキーなどの技術を使用して、あなたに関する情報をさまざまな目的で収集しています。これには以下が含まれます：</p>
    <ol>
        <li>機能性</li>
        <li>統計</li>
        <li>広告</li>
    </ol>
    <p>「承認」をクリックすることで、これらすべての目的に同意します。また、目的の横にあるチェックボックスを選択し、「設定を保存」をクリックすることで、同意する特定の目的を選択することもできます。</p>
    <p>ウェブサイトの下部 ${(window?.INTA?.settings.arrange == "ltr") ? "左側" : "右側"} 角にある小さなアイコンをクリックすることで、いつでも同意を撤回できます。</p>
    ${generatePolicyUrl('私たちのプライバシーとクッキーポリシー')}
    <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International プライバシーポリシー</button>
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    korean: `<h3 class="intastellarconsents-heading">당신이 통제합니다</h3>
    <p>우리는 우리의 비즈니스 파트너와 함께 쿠키와 같은 기술을 사용하여 다양한 목적을 위해 귀하에 대한 정보를 수집합니다. 여기에는 다음이 포함됩니다:</p>
    <ol>
        <li>기능성</li>
        <li>통계</li>
        <li>광고</li>
    </ol>
    <p>'수락'을 클릭함으로써, 당신은 이 모든 목적에 동의합니다. 또한, 목적 옆의 체크박스를 선택하고 '설정 저장'을 클릭함으로써 동의할 특정 목적을 선택할 수 있습니다.</p>
    <p>웹사이트 하단 ${(window?.INTA?.settings.arrange == "ltr") ? "왼쪽" : "오른쪽"} 모서리에 있는 작은 아이콘을 클릭하여 언제든지 동의를 철회할 수 있습니다.</p>
    ${generatePolicyUrl('우리의 개인정보 보호정책 및 쿠키 정책')}
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,
    estonian: `<h3 class="intastellarconsents-heading">Sa oled kontrolli all</h3>
    <p>Meie ja meie äripartnerid kasutame tehnoloogiaid, sealhulgas küpsiseid, et koguda teavet teie kohta erinevatel eesmärkidel, sealhulgas:</p>
    <ol>
        <li>Funktsionaalsus</li>
        <li>Statistika</li>
        <li>Reklaam</li>
    </ol>
    <p>Klikkides "Nõustu", annate nõusoleku kõikidele nendele eesmärkidele. Samuti saate valida, millistele eesmärkidele te nõustute, märkides ruudud eesmärkide kõrval ja klõpsates "Salvesta seaded".</p>
    <p>Te saate oma nõusoleku igal ajal tagasi võtta, klõpsates veebilehe alumises ${(window?.INTA?.settings.arrange == "ltr") ? "vasakus" : "paremas"} nurgas asuvale väikesele ikoonile.</p>
    ${generatePolicyUrl('Meie privaatsus- ja küpsiste poliitika')}
    ${(window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "")
        }`,

}

if (intastellarCookieLanguage != null) {
    if (intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
        settingsMessage = settingsMessagesLanguages.danish;
        intastellarShowHideDetailsText = "Manage Indstillinger";
        message =
            messageWrapStart
            + messages.danish
            + messageWrapEnd
            + generatePolicyUrl('Vores privat og cookie politik')
            + (window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "");
        + `<section class="intCookieSaveSettingsContainer">
        ${generateCookieSettingsButton(intastellarSupportedLanguages.danish.saveSettings, 'Accepter')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = generateCookieButtons('Accepter', 'Afvis', 'Indstillinger');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
        ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.danish.saveSettings, 'Accepter')}
        <button class="intLearnMoreBtn">${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        moreFooter.innerHTML =
            `
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
       
    `;
    } else if (intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
        settingsMessage = settingsMessagesLanguages.german;
        intastellarShowHideDetailsText = "Details einblenden";
        message = messageWrapStart
            + messages.german
            + messageWrapEnd
            + generatePolicyUrl('Unsere Datenschutz Erklährung und Cookie politik')
            + (window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "");
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
        ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.german.saveSettings, 'Akzeptieren')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Akzeptieren', 'Ablehnen', 'Einstellungen');
        moreFooter.innerHTML =
            `
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
    `;
    } else if (intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
        settingsMessage = settingsMessagesLanguages.english;
        intastellarShowHideDetailsText = "Manage Settings";
        message =
            messageWrapStart
            + messages.english
            + messageWrapEnd
            + generatePolicyUrl('Our Privacy and cookie Policy')
            + (window.INTA.settings.design == "banner" && window.innerWidth > 768 ? generatePoweredBy() : "");
        ;
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
        
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
       <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.english.saveSettings, 'Accept')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Accept', 'Decline All', 'Settings');

        moreFooter.innerHTML =
            `
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
    `;
    } else if (intastellarCookieLanguage == "es" || intastellarCookieLanguage == "es-ES") {
        /* Spanish */
        settingsMessage = settingsMessagesLanguages.spanish;
        intastellarShowHideDetailsText = "Mostrar detalles";
        message =
            messageWrapStart
            + messages.spanish
            + messageWrapEnd
            + generatePolicyUrl('Nuestra política de privacidad y cookies');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.spanish.saveSettings, 'Aceptar')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Aceptar', 'Rechazar', 'Configuración');
        moreFooter.innerHTML =
            `
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSetting checkMarkContainer" disabled>
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.spanish.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.spanish.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.spanish.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.spanish.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <p>ID: ${(getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2])).uid : intaConsentsObjectVariable.uid}</p>
                <h3 class="intaExpandCookieList">
                    ${intastellarSupportedLanguages.spanish.necessary.title} <i class="intastellar__arrow"></i>
                </h3>
                <p>${intastellarSupportedLanguages.spanish.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)}
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.spanish.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.spanish.functional.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_functionalCookieList)}
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.spanish.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.spanish.statisic.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)}
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.spanish.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.spanish.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)}
                </article>
            </section>
        </article>
    `;
    } else if (intastellarCookieLanguage == "fr" || intastellarCookieLanguage == "fr-FR") {
        settingsMessage = settingsMessagesLanguages.french;
        intastellarShowHideDetailsText = "Afficher les détails";
        message =
            messageWrapStart
            + messages.french
            + messageWrapEnd
            + generatePolicyUrl('Notre politique de confidentialité et de cookies');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
       <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.french.saveSettings, 'Accepter')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Accepter', 'Refuser', 'Paramètres');
        moreFooter.innerHTML =
            `
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.french.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.french.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.french.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.french.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <p>ID: ${(getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2])).uid : intaConsentsObjectVariable.uid}</p>
                <h3 class="intaExpandCookieList">
                    ${intastellarSupportedLanguages.french.necessary.title} <i class="intastellar__arrow"></i>
                </h3>
                <p>${intastellarSupportedLanguages.french.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)}
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.french.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.french.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.french.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.french.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.french.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.french.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
    `;
    } else if (intastellarCookieLanguage == "sv" || intastellarCookieLanguage == "sv-SE") {
        settingsMessage = settingsMessagesLanguages.swedish;
        intastellarShowHideDetailsText = "Visa detaljer";
        message =
            messageWrapStart
            + messages.swedish
            + messageWrapEnd
            + generatePolicyUrl('Vår sekretesspolicy och cookiepolicy');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
       <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.swedish.saveSettings, 'Acceptera')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Acceptera', 'Avvisa', 'Inställningar');
        moreFooter.innerHTML =
            `
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.swedish.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.swedish.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.swedish.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.swedish.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <p>ID: ${(getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2])).uid : intaConsentsObjectVariable.uid}</p>
                <h3 class="intaExpandCookieList">
                    ${intastellarSupportedLanguages.swedish.necessary.title} <i class="intastellar__arrow"></i>
                </h3>
                <p>${intastellarSupportedLanguages.swedish.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)}
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.swedish.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.swedish.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.swedish.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.swedish.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.swedish.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.swedish.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
    `;
    } else if (intastellarCookieLanguage == "no" || intastellarCookieLanguage == "no-NO") {
        // Norwegian
        settingsMessage = settingsMessagesLanguages.norwegian;
        intastellarShowHideDetailsText = "Manage Indstillinger";
        message =
            messageWrapStart
            + messages.norwegian
            + messageWrapEnd
            + generatePolicyUrl('Vår personvernerklæring og informasjonskapsler');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.norwegian.saveSettings, 'Godta')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Godta', 'Avslå', 'Innstillinger');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo != "" || window.INTA.settings.design == "banner" && window.INTA.settings.logo) ? `
       <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.danish.saveSettings, 'Accept')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;

        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Accepter', 'Afvis', 'Indstillinger');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.norwegian.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.norwegian.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.dutch.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.norwegian.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.norwegian.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.norwegian.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.norwegian.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.norwegian.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.dutch.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.dutch.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.dutch.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.dutch.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
    `;
    } else if (intastellarCookieLanguage == "nl" || intastellarCookieLanguage == "nl-NL") {
        // Dutch
        settingsMessage = settingsMessagesLanguages.dutch;
        intastellarShowHideDetailsText = "Toon details";
        message =
            messageWrapStart
            + messages.dutch
            + messageWrapEnd
            + generatePolicyUrl('Ons privacy- en cookiebeleid');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.dutch.saveSettings, 'Accepteren')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Accepteren', 'Weigeren', 'Instellingen');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.dutch.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.dutch.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.dutch.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.dutch.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.dutch.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.dutch.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.dutch.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.dutch.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.dutch.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.dutch.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.dutch.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.dutch.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
    `;
    } else if (intastellarCookieLanguage == "it" || intastellarCookieLanguage == "it-IT") {
        // Italian
        settingsMessage = settingsMessagesLanguages.italian;
        intastellarShowHideDetailsText = "Mostra dettagli";
        message =
            messageWrapStart
            + messages.italian
            + messageWrapEnd
            + generatePolicyUrl('Ons privacy- en cookiebeleid');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.italian.saveSettings, 'Accetta')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Accetta', 'Rifiuta', 'Impostazioni');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.italian.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.italian.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.italian.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.italian.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.italian.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.italian.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.italian.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.italian.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.italian.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.italian.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.italian.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.italian.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
    `;
    } else if (intastellarCookieLanguage == "fi" || intastellarCookieLanguage == "fi-FI") {
        // Finish
        settingsMessage = settingsMessagesLanguages.finnish;
        intastellarShowHideDetailsText = "Näytä tiedot";
        message =
            messageWrapStart
            + messages.finnish
            + messageWrapEnd
            + generatePolicyUrl('Tietosuojakäytäntömme ja evästekäytäntömme');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.finnish.saveSettings, 'Hyväksy')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Hyväksy', 'Hylkää', 'Asetukset');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.finnish.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.finnish.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.finnish.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.finnish.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.finnish.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.finnish.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.finnish.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.finnish.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.finnish.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.finnish.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.finnish.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.finnish.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
    `;
    } else if (intastellarCookieLanguage == "ru" || intastellarCookieLanguage == "ru-RU") {
        // Russian
        settingsMessage = settingsMessagesLanguages.russian;
        intastellarShowHideDetailsText = "Показать детали";
        message =
            messageWrapStart
            + messages.russian
            + messageWrapEnd
            + generatePolicyUrl('Наша политика конфиденциальности и использования файлов cookie');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.russian.saveSettings, 'Принять')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Принять', 'Отклонить', 'Настройки');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.russian.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.russian.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.russian.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.russian.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.russian.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.russian.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.russian.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.russian.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.russian.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.russian.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.russian.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.russian.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
    `;
    } else if (intastellarCookieLanguage == "pl" || intastellarCookieLanguage == "po-PL") {
        // Polish
        settingsMessage = settingsMessagesLanguages.polish;
        intastellarShowHideDetailsText = "Pokaż szczegóły";
        message =
            messageWrapStart
            + messages.polish
            + messageWrapEnd
            + generatePolicyUrl('Nasza polityka prywatności i plików cookie');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.polish.saveSettings, 'Zaakceptuj')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Zaakceptuj', 'Odrzuć', 'Ustawienia');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.polish.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.polish.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.polish.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.polish.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.polish.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.polish.statisic.description}</p> 
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.polish.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.polish.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.polish.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.polish.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.polish.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.polish.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>
    `;
    } else if (intastellarCookieLanguage == "af" || intastellarCookieLanguage == "af-ZA") {
        // Afrikaans
        settingsMessage = settingsMessagesLanguages.afrikaans;
        intastellarShowHideDetailsText = "Wys besonderhede";
        message =
            messageWrapStart
            + messages.afrikaans
            + messageWrapEnd
            + generatePolicyUrl('Ons privaatheids- en koekiebeleid');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.afrikaans.saveSettings, 'Aanvaar')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Aanvaar', 'Weier', 'Instellings');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.afrikaans.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.afrikaans.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.afrikaans.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.afrikaans.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.afrikaans.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.afrikaans.statisic.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.afrikaans.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.afrikaans.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.afrikaans.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.afrikaans.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.afrikaans.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.afrikaans.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                    </section>
            </article>
    `;
    } else if (intastellarCookieLanguage == "ko" || intastellarCookieLanguage == "ko-KR") {
        // Korean
        settingsMessage = settingsMessagesLanguages.korean;
        intastellarShowHideDetailsText = "세부정보 보기";
        message =
            messageWrapStart
            + messages.korean
            + messageWrapEnd
            + generatePolicyUrl('개인정보 보호정책 및 쿠키 정책');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.korean.saveSettings, '동의')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('동의', '거부', '설정');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.korean.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.korean.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.korean.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.korean.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.korean.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.korean.statisic.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.korean.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.korean.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.korean.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.korean.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer"> 
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.korean.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.korean.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>`;


    } else if (intastellarCookieLanguage == "ar" || intastellarCookieLanguage == "ar-SA") {
        // Arabic
        settingsMessage = settingsMessagesLanguages.arabic;
        intastellarShowHideDetailsText = "إظهار التفاصيل";
        message =
            messageWrapStart
            + messages.arabic
            + messageWrapEnd
            + generatePolicyUrl('سياسة الخصوصية وملفات تعريف الارتباط الخاصة بنا');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.arabic.saveSettings, 'قبول')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('قبول', 'رفض', 'إعدادات');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy">
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.arabic.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.arabic.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.arabic.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.arabic.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.arabic.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.arabic.statisic.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.arabic.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.arabic.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.arabic.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.arabic.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.arabic.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.arabic.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                    </section>
            </article>
        </section>
    `;
    } else if (intastellarCookieLanguage == "et" || intastellarCookieLanguage == "et-EE") {
        // Estonian
        settingsMessage = settingsMessagesLanguages.estonian;
        intastellarShowHideDetailsText = "Näita üksikasju";
        message =
            messageWrapStart
            + messages.estonian
            + messageWrapEnd
            + generatePolicyUrl('Meie privaatsus- ja küpsistepoliitika');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo && window.INTA.settings.logo != "") ? `
         <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.estonian.saveSettings, 'Nõustu')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;
        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Nõustu', 'Keeldu', 'Seaded');
        moreFooter.innerHTML =
            `
        <section class="intastellar_privacyPolicy"></section>
        <article class="intReadMore">
            <section class="required">
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.estonian.necessary.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.estonian.necessary.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_requiredCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.estonian.functional.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.estonian.functional.description}</p>
                <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)
            }
                </article>  
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.estonian.statisic.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.estonian.statisic.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_statisticCookieList)
            }
                </article>
            </section>
            <section>
                <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.estonian.marketing.title} <i class="intastellar__arrow"></i></h3>
                <p>${intastellarSupportedLanguages.estonian.marketing.description}</p>
                <article class="intaCookieListOverview">
                ${listAllCookies(inta_marketingCookieList)
            }
                </article>
            </section>
        </article>
        <article class="intCookieSetting__form">
                <section class="intastellarSettings__control">
                    <label class="intSettingDisabled checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.estonian.necessary.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.estonian.functional.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.estonian.statisic.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
                <section class="intastellarSettings__control">
                    <label class="checkMarkContainer">
                        <span class="intSettingsTitle">${intastellarSupportedLanguages.estonian.marketing.title}</span>
                        <span class="intCheckmarkSliderContainer">
                            <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                            <span class="checkmark round"></span>
                        </span>
                    </label>
                </section>
            </article>`;
    } else {
        /* Default */
        settingsMessage = settingsMessagesLanguages.danish;
        intastellarShowHideDetailsText = "Manage Indstillinger";
        message =
            messageWrapStart
            + messages.danish
            + messageWrapEnd
            + generatePolicyUrl('Vores privat og cookie politik');
        intastellarCookieButtons.innerHTML = `<section class="intCookieSaveSettingsContainer">
    ${(window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2" && window.INTA.settings.logo != "" || window.INTA.settings.design == "banner" && window.INTA.settings.logo) ? `
       <img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">`
                : ""}
        ${generateCookieSettingsButton(intastellarSupportedLanguages.danish.saveSettings, 'Accept')}
        <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
        ${(window.INTA.settings.design == "bannerV2" && window.innerWidth > 768 ? generatePoweredBy() : "")}
    </section>`;

        cookieBtn = (window.INTA.settings.design == "banner" || window.INTA.settings.design == "bannerV2") + `
        ${window.INTA.settings.logo && window.INTA.settings.logo != "" ? `<img class="intSettingsCompanyLogo" src="${window.INTA.settings.logo}" alt="Intastellar Solutions, International">` : ""}
    ` + generateCookieButtons('Accepter', 'Afvis', 'Indstillinger');
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
}

moreContentText.innerHTML = settingsMessage;

let ccpa = window?.INTA?.settings === undefined || window?.INTA?.settings.ccpa === undefined ? false : window?.INTA?.settings.ccpa.on;
let ccpaUrl = window?.INTA?.settings === undefined || window?.INTA?.settings.ccpa === undefined ? false : window?.INTA?.settings.ccpa.url;
let cookieColor = window?.INTA?.settings === undefined || window?.INTA?.settings.color === undefined || window?.INTA?.settings.color === false || window?.INTA?.settings.color.indexOf("[") > -1 || window?.INTA?.settings.color === "" ? "rgba(0, 51, 153, 1)" : window?.INTA?.settings.color;
let cookieLogo = window?.INTA?.settings === undefined || window?.INTA?.settings.logo === undefined || window?.INTA?.settings.logo === "" || window?.INTA?.settings.logo.indexOf("[") > -1 ? null : window?.INTA?.settings.logo;
let backgroundColor = window?.INTA?.settings === undefined || window?.INTA?.settings.background_color === undefined ? "#fff" : window?.INTA?.settings.background_color;
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

let textSettings = window?.INTA?.settings === undefined || window?.INTA?.settings.text === undefined ? false : window?.INTA?.settings.text;
let withText = `
.intastellarCookie-settingsContainer{
    border-radius: 50%;
}

.intastellarCookieConstents__content-main p,
.intastellarCookieConstents__content-main h3,
.intastellarCookieConstents__content-main ol li,
.intastellarCookieConstents__content-main .intastellarCookie-settings__privacyLink{
    color: #000 !important;
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
    text = " <span class=''>Cookie notice</span>";
    cookieSize = "25%";
}
intaCookieBannerStyle.innerHTML = ".intastellarCookieConstents__content-footer,.intastellarCookieConstents__content{border-color: " + cookieColor + ";}.intastellarCookie-settings__btn.--bg{background-color:" + cookieColor + " !important;color: #fff !important;} .intCookie_ConsentLogo-container{border-color: #fff; background: linear-gradient(#fff 0 0) padding-box, " + cookieColor + " border-box;} .intCookie_ConsentContainer-content{border-color: #fff; background: linear-gradient(#fff 0 0) padding-box, " + cookieColor + " border-box;} .intastellarCookie-settings__btn.--changePermission{background: transparent !important; border-image-slice: 1;border-color: " + cookieColor + ";border-image:" + cookieColor + " 1 !important; border-width: 3px; border-style: solid; transition: background .25s ease-in-out; width: max-content; margin-inline: auto !important;} .intastellarCookie-settings__btn.--changePermission:hover{background: " + cookieColor + " !important; color: #fff !important;} .intCookieSetting__checkbox:checked ~ .checkmark{background: " + checkMarkColor + ";}.intastellarCCPA__popupClose{background:" + cookieColor + "; color: #fff;} .intastellarCookie-settings__btn.--bg:hover{background: " + brightColor + " !important;}.intastellarCookie-settings__close:hover{background: " + brightColor + " !important;} .intastellarCookieConstents__content-main .intastellarCookie-settings__privacyLink{color: #fff !important;} .intastellarCookie-settings__privacyLink{text-decoration: underline !important;}.intastellarCookie-settings__content .intastellarCookie-settings__privacyLink{color: " + cookieTextColor + ";}.intastellarCookie-settings__content p{color: " + cookieTextColor + " !important;}.intastellarCookie-settings__intHeader{color:" + cookieTextColor + " !important;}.intastellarCookie-settings__container{background-color: " + backgroundColor + " !important;} .intastellarCookie-settingsMoreContainer{display:none;position: fixed; top: 50%; left: 50%; background: #fff; padding: 15px;z-index: 1000; transform: translate(-50%,-50%);}" + withText;
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

    if (window?.INTA?.settings.ccpa.collection != undefined) {
        instastellarCCPApopupContent.innerHTML = `
        <h2><svg class="intastellarCCPA__icon" width="18px" height="19px" viewBox=".2 0 19.4 20" width="13" xmlns="http://www.w3.org/2000/svg"><path d="m2.2 20c1 0 1.7-.5 2.4-.9.6-.3 1.2-.7 1.9-1 3.2-1.7 6.4-3.5 9.6-5.3 1-.5 2.3-1 3-1.9.2-.3.5-.7.4-1.2-.3-1.1-1.7-1.5-2.6-2-2.2-1.2-4.5-2.5-6.7-3.7-.8-.5-2-1.4-3-.7-.4.2-.6.4-.7.7-.1.4 0 .9 0 1.3v3.2c0 .9-.1 1.6.5 2 .2.1.6.2.9.1 1-.4.7-2.2.7-3.6v-1.1c1.7.9 3.4 1.8 5.1 2.6.6.3 1.6.6 1.8 1.4.2.9-1.7 1.6-2.3 1.9l-6.9 3.9c-.5.3-1.8 1.3-2.6 1-.3-.1-.5-.4-.5-.6-.1-.4-.1-1-.1-1.5v-3.2-5.4c0-.8-.1-1.8.2-2.3.7-1 2.3.8 2.8-.8.1-.4-.1-.8-.3-1-.4-.6-2.2-1.5-2.9-1.7-.2-.1-.7-.2-1-.2-1.7.3-1.3 3-1.3 5v9.9c0 1.5-.2 3.5.4 4.4.3.5.6.5 1.2.7zm5.2-6.5c1.5 0 1.6-1.9.2-2.2-.8-.1-1.4.7-1.2 1.4.2.5.5.6 1 .8z" fill="#000"/></svg> Do not sell my personal data!</h2><button class="intastellarCCPA__popupClose">X</button>
        <p>This section is about our California Consumer Privacy Act.</p>
        ${createCCPAPolicyLink(ccpaUrl)}
        <h3>Personal data we collect:</h3>
        <ul>
            <li>IP-Address</li>
            ${window?.INTA?.settings.ccpa.collection.map(name => '<li>' + name.charAt(0).toUpperCase() + '' + name.slice(1) + '</li>').join('')}
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
} else if (!isValidCCPALink() && "ccpa" in window?.INTA?.settings && window?.INTA?.settings.ccpa.on === "true") {
    throw new IntastellarSolutionsSDK("Please add your valid 'California Consumer Privacy Act' url to the banner. Read more at https://www.intastellarsolutions.com/solutions/cookie-consents");
}

cookieSettingsContent.setAttribute("class", "intastellarCookie-settings__content");

let intCookieIconSmallClass = cookieLogo == intCookieIcon ? " intastellarIcon" : "";
let CompanyLogoName = cookieLogo == intCookieIcon ? "Cookie Icon" : `${document.domain} logo`;

moreintHeader.innerHTML = `
    ${typeof window?.INTA?.settings.logo != "undefined" ? '<img onerror="this.onerror=null; this.style.display:none;" class="intSettingsCompanyLogo" src="' + window?.INTA?.settings.logo + '" alt="' + CompanyLogoName + '" title="' + CompanyLogoName + '">' : ``}
    ${(window.INTA.settings.design == "overlay" || window.INTA.settings.design == undefined || window.innerWidth < 900) ? `<section class="intSettingsPoweredBy">${poweredBy}</section>` : ""}
    `;

cookieSettingsContent.innerHTML = '<intHeader class="intastellarCookie-settings__intHeader"><img onerror="this.onerror=null; this.style.display:none;" src="' + window?.INTA?.settings.logo + '" alt="' + CompanyLogoName + '" title="' + CompanyLogoName + '" style="width: 100%;float: left; max-width: 50px;max-height: 50px;object-fit:contain;"><h2>Cookie</h2><button class="intastellarCookie-settings__close" style="background: ' + cookieColor + ';" aria-label="Close cookie banner"></button></intHeader>' +
    message + cookieBtn + "" + (window.INTA.settings.design !== "overlay" || window.INTA.settings.design != undefined) ? poweredBy : (window.innerWidth < 768) ? null : poweredBy + "";

cookieSettings.appendChild(cookieSettingsContent);

if (window?.INTA?.settings.advanced) {
    //banner.appendChild(cookieSettings);
}

banner.setAttribute("class", "intastellarCookie-settings");

bannerContent.innerHTML = '<img class="intCookieIcon-openSettings" style="filter: brightness(' + (darkLightCheck(window.INTA.settings.color) === "light" ? "0" : "100") + ') !important" src="' + intCookieIcon + '" alt="Cookie Icon">' + IntastellarToolTip + ' ' + text;

banner.appendChild(bannerContent);
moreSettings.appendChild(moreSettingsContent);
intaconsents.appendChild(banner);
intaconsents.appendChild(moreSettings);

intaconsents.appendChild(moreFooter);

if (document.querySelector(".intastellarCCPAContainer") != null) {
    document.querySelector(".intastellarCCPAContainer").addEventListener("click", function () {
        document.querySelector(".intastellarCCPApopup").classList.toggle("--active");
    })
}

function onWindowLoad(callback) {
    if (document.readyState === 'complete') {
        callback();
    } else {
        window.addEventListener('load', callback);
    }
}

onWindowLoad(function () {
    (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;
    const temp = location.host.split('.').reverse();
    const domain = encodeURI(temp[1] + '.' + temp[0]);
    const trImage = document.createElement("iframe");
    trImage.name = "intastellar-solutions-sharinglibrary-iframe";
    trImage.style.display = "none";
    trImage.title = "Intastellar Solutions cookie sharing library";
    trImage.src = intastellarCookieBannerRootDomain + "/cookieSharingIframe.html";

    document.body.appendChild(trImage);

    if (document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]") != null) {
        const intastellariframe = document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]");
        if (window?.INTA?.settings?.partnerDomain) {
            function sendCookieInformation(event) {
                if (event.origin !== "https://consents.cdn.intastellarsolutions.com") return;
                if (event.data === "ready" && intaConsentsObjectVariable.sharingDomains.length > 0 && intaConsentsObjectVariable.sharingDomains.includes(window.location.host)) {
                    intastellariframe.contentWindow.postMessage(intaConsentsObjectVariable, "https://consents.cdn.intastellarsolutions.com");
                }
            }

            window.addEventListener("message", sendCookieInformation);
        }
    }

    gtag('set', {
        'user_id': (getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2])).uid : intaConsentsObjectVariable.uid
    });
    /* Setting Google consent default values to denied & granted based on user selection. Via that Google Ads can be shown on Webpage if user gives consents to Advertisment / Marketing cookies */
    /* (intaCookieConsents?.advertisementCookies == "false") ? '"denied"': '"granted"' */

    if (isValidPolicyLink()) {
        IntastellarCookieConsent.initialize(intaconsents);
        document.querySelectorAll(".intaCookieListOverview-vendor").forEach((vendor, i) => {
            if (window?.INTA?.settings.company != "" && window?.INTA?.settings.company != undefined && vendor.innerText == window.location.host) {
                vendor.innerText = window?.INTA?.settings.company;
                /* let msg = document.querySelectorAll(".intastellarCookie-settings__privacyLink")[i].innerText.replace(window.location.host, ""); */
                /* document.querySelectorAll(".intastellarCookie-settings__privacyLink")[i].innerText = window?.INTA?.settings.company; */
            }
        });
        document.querySelectorAll(".intCookie_ConsentLogo").forEach((logo) => {
            logo.src = window?.INTA?.settings.logo;
        });
        /* - - - Helper function for learn more click - - - */
        document.querySelectorAll(".intLearnMoreBtn").forEach((btn) => {
            btn.addEventListener("click", function (e) {
                learnMore(this);
            })
        })

        window?.INTA?.settings?.partnerDomain?.forEach((domain) => {
            intaConsentsObjectVariable.sharingDomains.push(domain);
        })

        if (window?.INTA?.settings?.partnerDomain) {
            dataLayer.push({
                "linker": {
                    "domains": window?.INTA?.settings?.partnerDomain
                }
            });
        }

        if (getCookie(int_hideCookieBannerName) == "" && getCookie(int_hideCookieBannerName).indexOf("__inta") == -1) {
            document.querySelector(".intastellarCookieConstents").classList.add("--active");
            dataLayer.push({ 'event': 'cookie_consent_widget_visible' });
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
            /* if (window?.INTA?.settings.advanced === false || window?.INTA?.settings.advanced === "" || window?.INTA?.settings.advanced === undefined) { */
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
                    dataLayer.push({ 'event': 'cookie_consent_widget_visible' });
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
            settingsSaveLang.saveSettingsText = "Gem";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "es" || intastellarCookieLanguage === "es-ES") {
            settingsSaveLang.necessaryCookiesText = "Rechazar";
            settingsSaveLang.saveSettingsText = "Guardar";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fr" || intastellarCookieLanguage === "fr-FR") {
            settingsSaveLang.necessaryCookiesText = "Refuser";
            settingsSaveLang.saveSettingsText = "Enregistrer";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "it" || intastellarCookieLanguage === "it-IT") {
            settingsSaveLang.necessaryCookiesText = "Rifiuta";
            settingsSaveLang.saveSettingsText = "Salva";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "nl" || intastellarCookieLanguage === "nl-NL") {
            settingsSaveLang.necessaryCookiesText = "Weigeren";
            settingsSaveLang.saveSettingsText = "Opslaan";

        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pl" || intastellarCookieLanguage === "pl-PL") {
            settingsSaveLang.necessaryCookiesText = "Odrzuć";
            settingsSaveLang.saveSettingsText = "Zapisz";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "sv" || intastellarCookieLanguage === "sv-SE") {
            settingsSaveLang.necessaryCookiesText = "Avvisa";
            settingsSaveLang.saveSettingsText = "Spara";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pt" || intastellarCookieLanguage === "pt-PT") {
            settingsSaveLang.necessaryCookiesText = "Recusar";
            settingsSaveLang.saveSettingsText = "Salvar";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ru" || intastellarCookieLanguage === "ru-RU") {
            settingsSaveLang.necessaryCookiesText = "Отклонить";
            settingsSaveLang.saveSettingsText = "Сохранить";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "no" || intastellarCookieLanguage === "no-NO") {
            settingsSaveLang.necessaryCookiesText = "Avvis";
            settingsSaveLang.saveSettingsText = "Lagre";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fi" || intastellarCookieLanguage === "fi-FI") {
            settingsSaveLang.necessaryCookiesText = "Hylkää";
            settingsSaveLang.saveSettingsText = "Tallenna";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "cs" || intastellarCookieLanguage === "cs-CZ") {
            settingsSaveLang.necessaryCookiesText = "Odmítnout";
            settingsSaveLang.saveSettingsText = "Uložit";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "hu" || intastellarCookieLanguage === "hu-HU") {
            settingsSaveLang.necessaryCookiesText = "Elutasít";
            settingsSaveLang.saveSettingsText = "Mentés";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "tr" || intastellarCookieLanguage === "tr-TR") {
            settingsSaveLang.necessaryCookiesText = "Reddet";
            settingsSaveLang.saveSettingsText = "Ayarları Kaydet";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ch" || intastellarCookieLanguage === "zh-CN") {
            settingsSaveLang.necessaryCookiesText = "拒绝";
            settingsSaveLang.saveSettingsText = "保存设置";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "jp" || intastellarCookieLanguage === "ja-JP") {
            settingsSaveLang.necessaryCookiesText = "拒否";
            settingsSaveLang.saveSettingsText = "設定を保存";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pl" || intastellarCookieLanguage === "pl-PL") {
            settingsSaveLang.necessaryCookiesText = "Odrzuć";
            settingsSaveLang.saveSettingsText = "Zapisz";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ar" || intastellarCookieLanguage === "ar-SA") {
            settingsSaveLang.necessaryCookiesText = "رفض";
            settingsSaveLang.saveSettingsText = "حفظ الإعدادات";

        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "af" || intastellarCookieLanguage === "af-ZA") {
            settingsSaveLang.necessaryCookiesText = "Afwys";
            settingsSaveLang.saveSettingsText = "Stoor instellings";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ko" || intastellarCookieLanguage === "ko-KR") {
            settingsSaveLang.necessaryCookiesText = "거부";
            settingsSaveLang.saveSettingsText = "저장";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "et" || intastellarCookieLanguage === "et-EE") {
            settingsSaveLang.necessaryCookiesText = "Keeldu";
            settingsSaveLang.saveSettingsText = "Salvesta seaded";
        } else {
            settingsSaveLang.necessaryCookiesText = "Afvis";
            settingsSaveLang.saveSettingsText = "Gem";
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

        const ness = document.getElementsByClassName("intastellarCookieBanner__accpetNecssery");
        const all = document.getElementsByClassName("intastellarCookieSettings--acceptAll");
        const changePermission = document.querySelectorAll(".intastellarCookie-settings__btn.--changePermission");

        changePermission.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const intaCookieSettings = (getCookie(int_hideCookieBannerName)) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents : intaConsentsObjectVariable.consents;
                const newIframe = document.createElement("iframe");
                let type = e.target.getAttribute("data-type");
                if (type === "intFunctionalCookies") {
                    intaCookieSettings.functionalCookies = "checked";
                    newIframe.src = e.target.parentElement.parentElement.parentElement.getAttribute("data-src");
                } else if (type === "intMarketingCookies") {
                    intaCookieSettings.advertisementCookies = "checked";
                    newIframe.src = e.target.parentElement.parentElement.parentElement.getAttribute("data-src");
                } else if (type === "intStaticsticCookies") {
                    intaCookieSettings.staticsticCookies = "checked";
                    newIframe.src = e.target.parentElement.parentElement.parentElement.getAttribute("data-src");
                }
                document.cookie = int_hideCookieBannerName + "=__inta1." + encodeIntaConsentsObject(JSON.stringify(intaCookieSettings), randomIntFromInterval(20, 34)) + "; expires=" + cookieLifeTime + "; path=/; " + intCookieDomain + "";

                const parent = e.target.parentElement.parentElement.parentElement.parentNode;
                /* setTimeout(() => {
                    parent.insertBefore(newIframe, e.target.parentElement.parentElement.parentElement);
                    // Step 3: Remove the existing element
                    console.log(JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents);
                }, 1000); */

                // Replace the old cookie with the new one
                //window.location.reload();
            });
        });

        document.querySelector(".--save").addEventListener("click", () => {
            const accepted = [];
            if (FunctionalCheckbox?.checked) {
                gtag('consent', 'update', {
                    'functionality_storage': 'granted',
                })
                accepted.push("functionalCookies");
            } else if (!FunctionalCheckbox?.checked) {
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
                window.clarity('consentV2', {
                    ad_Storage: "denied",
                    analytics_Storage: "granted"
                });
                accepted.push("staticsticCookies");
            } else if (!StaticsCheckBox?.checked) {
                gtag('consent', 'update', {
                    'analytics_storage': 'denied',
                })

                window.clarity('consentV2', {
                    ad_Storage: "denied",
                    analytics_Storage: "denied"
                });

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
                window.uetq.push('consent', 'update', {
                    'ad_storage': 'granted'
                });
                window.clarity('consentV2', {
                    ad_Storage: "granted",
                    analytics_Storage: "denied"
                });
                accepted.push("advertisementCookies");
            } else if (!MarketingCheckBox?.checked || intastellar) {
                window.uetq.push('consent', 'update', {
                    'ad_storage': 'denied'
                });
                gtag('consent', 'update', {
                    'ad_storage': 'denied',
                    'personalization_storage': 'denied',
                    'ads_data_redaction': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied',
                });

                window.clarity('consent', false);

                const index = accepted.indexOf("advertisementCookies");
                if (index > -1) { // only splice array when item is found
                    accepted.splice(index, 1); // 2nd parameter means remove one item only
                }
            }
            saveINTCookieSettings("changePermission", accepted);
        });

        if (window?.INTA?.settings.ccpa !== undefined && window?.INTA?.settings.ccpa.on) {
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
                dataLayer.push({ 'event': 'cookie_consent_widget_visible' });

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
                window.uetq.push('consent', 'update', {
                    'ad_storage': 'granted'
                });
                window.clarity('consentV2', {
                    ad_Storage: "granted",
                    analytics_Storage: "granted"
                });
                dataLayer.push({ 'event': 'cookie_consent_update', 'cookie_consent': intaConsentsObjectVariable.consents });

                window._hsp.push(['setHubSpotConsent', {
                    analytics: true,
                    advertisement: true,
                    functionality: true,
                }]);
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
                dataLayer.push({ 'event': 'cookie_consent_widget_visible' });
                const intastellarShared = {
                    intaConsentsObjectVariable: intaConsentsObjectVariable,
                    partnerDomain: window?.INTA?.settings.partnerDomain,
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
                window.uetq.push('consent', 'update', {
                    'ad_storage': 'granted'
                });
                window._hsp.push(['setHubSpotConsent', {
                    analytics: true,
                    advertisement: true,
                    functionality: true,
                }]);
                window.clarity('consentV2', {
                    ad_Storage: "granted",
                    analytics_Storage: "granted"
                });
                dataLayer.push({ 'event': 'cookie_consent_update', 'cookie_consent': intaConsentsObjectVariable.consents });
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
                dataLayer.push({ 'event': 'cookie_consent_widget_visible' });
                const intastellarShared = {
                    intaConsentsObjectVariable: intaConsentsObjectVariable,
                    partnerDomain: window?.INTA?.settings.partnerDomain,
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
                window.uetq.push('consent', 'update', {
                    'ad_storage': 'denied'
                });
                window._hsp.push(['setHubSpotConsent', {
                    analytics: false,
                    advertisement: false,
                    functionality: false,
                }]);
                window.clarity('consentV2', {
                    ad_Storage: "granted",
                    analytics_Storage: "granted"
                });
                dataLayer.push({ 'event': 'cookie_consent_update', 'cookie_consent': intaConsentsObjectVariable.consents });
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

            if (window?.INTA?.settings.advanced === false || window?.INTA?.settings.advanced === "" || window?.INTA?.settings.advanced === undefined) {
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
                        dataLayer.push({ 'event': 'cookie_consent_widget_visible' });
                    });
                })
            }
            if (window?.INTA?.settings.advanced) {
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
                    dataLayer.push({ 'event': 'cookie_consent_widget_visible' });

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
                    window.uetq.push('consent', 'update', {
                        'ad_storage': 'denied'
                    });
                    dataLayer.push({ 'event': 'cookie_consent_update', 'cookie_consent': intaConsentsObjectVariable.consents });
                    updateConsents("denied");

                    window._hsp.push(['doNotTrack']);
                    window._hsp.push(['revokeCookieConsent']);
                    window._hsp.push(['setHubSpotCookieConsent', {
                        analytics: false,
                        advertisement: false,
                        functionality: false,
                    }]);
                    window.clarity('consent', false);
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
                    dataLayer.push({ 'event': 'cookie_consent_widget_visible' });

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
                    window.uetq.push('consent', 'update', {
                        'ad_storage': 'granted'
                    });
                    window.clarity('consentV2', {
                        ad_Storage: "granted",
                        analytics_Storage: "granted"
                    });
                    dataLayer.push({ 'event': 'cookie_consent_update', 'cookie_consent': intaConsentsObjectVariable.consents });
                    updateConsents("all");

                    window._hsp.push(['doNotTrack', false]);
                    window._hsp.push(['setHubSpotCookieConsent', {
                        analytics: true,
                        advertisement: true,
                        functionality: true,
                    }]);

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
                 if (window?.INTA?.settings.advanced === false || window?.INTA?.settings.advanced === "" || window?.INTA?.settings.advanced === undefined) {
                     debugger;
                     document.querySelector("html").classList.toggle("noScroll");
                     document.querySelector(".intastellarCookieConstents").classList.toggle("--active");
                 } else {
                     settings.classList.toggle("intastellarCookie-settings__container--expand");
                 }
             } */

            if (window?.INTA?.settings.advanced) {
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
                        dataLayer.push({ 'event': 'cookie_consent_widget_visible' });
                    });
                })
            }
            if (window?.INTA?.settings.advanced) {
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
                    dataLayer.push({ 'event': 'cookie_consent_widget_visible' });

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
                    window.uetq.push('consent', 'update', {
                        'ad_storage': 'denied'
                    });
                    window._hsp.push(['doNotTrack']);
                    window._hsp.push(['revokeCookieConsent']);
                    window._hsp.push(['setHubSpotCookieConsent', {
                        analytics: false,
                        advertisement: false,
                        functionality: false,
                    }]);
                    window.clarity('consent', false);

                    dataLayer.push({ 'event': 'cookie_consent_update', 'cookie_consent': intaConsentsObjectVariable.consents });
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
                    dataLayer.push({ 'event': 'cookie_consent_widget_visible' });

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
                    window.uetq.push('consent', 'update', {
                        'ad_storage': 'granted'
                    });

                    window._hsp.push(['doNotTrack', false]);
                    window._hsp.push(['setHubSpotCookieConsent', {
                        analytics: true,
                        advertisement: true,
                        functionality: true,
                    }]);

                    window.clarity('consentV2', {
                        ad_Storage: "granted",
                        analytics_Storage: "granted"
                    });

                    dataLayer.push({ 'event': 'cookie_consent_update', 'cookie_consent': intaConsentsObjectVariable.consents });
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
                    .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");
            }
            if (e.data) {
                const sharedCookies = e.data;
                /* console.log(sharedCookies); */
            }
        })

    } else {
        /* checkCookieStatus(); */
        /* Displaying a error message if no valid privacy url is giving */
        const errorMessage = document.createElement("div");
        const errorMessageContent = document.createElement("div");

        errorMessage.className = "intastellarErrorMessage";
        errorMessageContent.className = "intastellarErrorMessage-content";

        errorMessageContent.innerHTML = "Intastellar Solutions SDK: Please add a valid privacy & cookie policy to the banner. Read more at <a href='https://developers.intastellarsolutions.com/cookie-solutions/docs/add-privacy-policy' target='_blank' rel='noopener'>https://developers.intastellarsolutions.com/cookie-solutions/docs/add-privacy-policy</a>";

        errorMessage.appendChild(errorMessageContent);
        /* document.body.appendChild(errorMessage); */

        throw new IntastellarSolutionsSDK("Please add a valid privacy & cookie policy to the banner. Read more at https://developers.intastellarsolutions.com/cookie-solutions/docs/add-privacy-policy")
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
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                                <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                            `
                } else {
                    return `
                                                <p>${cookie}</p>
                                            `;
                }
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
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
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
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
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
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "es" || intastellarCookieLanguage === "es-ES") {
            // Spanish
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">Proveedor</h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">Política de privacidad</p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Política de privacidad`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Política de privacidad</a>`}
                    <h4 class="intaCookieList-CookieName">Dominios</h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
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
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "sv" || intastellarCookieLanguage === "sv-SE") {
            // Swedish
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">Leverantör</h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Integritetspolicy
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Integritetspolicy`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Integritetspolicy</a>`}
                    <h4 class="intaCookieList-CookieName">Domäner</h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
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
                                </article>`
            }).join(" ")}
                    </section>
                </section>
            </section>
            `;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fr" || intastellarCookieLanguage === "fr-FR") {
            // French
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        Fournisseur
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Politique de confidentialité
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Politique de confidentialité`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Politique de confidentialité</a>`}
                    <h4 class="intaCookieList-CookieName">
                        Domaines
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
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
                                </article>`
            }).join(" ")}
                    </section>
                </section>
            </section>
            `;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pr" || intastellarCookieLanguage === "pr-PT") {
            // Portugese
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        Fornecedor
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Política de privacidade
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Política de privacidade`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Política de privacidade</a>`}
                    <h4 class="intaCookieList-CookieName">
                        Domaines
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
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
                                </article>`
            }).join(" ")}
                    </section>
                </section>
            </section>
            `;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "it" || intastellarCookieLanguage === "it-IT") {
            // Italian
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        Fornitore
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Informativa sulla privacy
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Informativa sulla privacy`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">
                        Informativa sulla privacy
                        </a>`}
                    <h4 class="intaCookieList-CookieName">
                        Domaines
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
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
                                </article>`
            }).join(" ")}
                    </section>
                </section>
            </section>
            `;
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ru" || intastellarCookieLanguage === "ru-RU") {
            // Russian
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        Поставщик
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Политика конфиденциальности
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`Политика конфиденциальности`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Политика конфиденциальности</a>`}
                    <h4 class="intaCookieList-CookieName">
                        Домены
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">
                        Cookies
                    </h3>
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
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fi" || intastellarCookieLanguage === "fi-FI") {
            // Finnish
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        Toimittaja
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Tietosuojakäytäntö
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`
                        Tietosuojakäytäntö`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Tietosuojakäytäntö</a>`}
                    <h4 class="intaCookieList-CookieName">
                        Verkkotunnukset
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">
                        Cookies
                    </h3>
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
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "no" || intastellarCookieLanguage === "no-NO") {
            // Norwegian
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        Leverandør
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Personvernerklæring
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`
                        Personvernerklæring`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Personvernerklæring</a>`}
                    <h4 class="intaCookieList-CookieName">
                        Domener
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">
                        Cookies
                    </h3>
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
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "nl" || intastellarCookieLanguage === "nl-NL") {
            // dutch
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        Leverancier
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Privacybeleid
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`
                        Privacybeleid`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Privacybeleid</a>`}
                    <h4 class="intaCookieList-CookieName">
                        Domeinen
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">
                        Cookies
                    </h3>
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
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pl" || intastellarCookieLanguage === "pl-PL") {
            // polish
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        Dostawca
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Polityka prywatności
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`
                        Polityka prywatności`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Polityka prywatności</a>`}
                    <h4 class="intaCookieList-CookieName">
                        Domeny
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">
                        Cookies
                    </h3>
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
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "af" || intastellarCookieLanguage === "af-ZA") {
            // Afrikaans
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        Verskaffer
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        Privaatheidsbeleid
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`
                        Privaatheidsbeleid`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">Privaatheidsbeleid</a>`}
                    <h4 class="intaCookieList-CookieName">
                        Domeine
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">
                        Cookies
                    </h3>
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
            `;

        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ko" || intastellarCookieLanguage === "ko-KR") {
            // Korean
            return `
            <section class="intaCookieListOverview-grid">
                <section class="intaCookieList-left">
                    <h3 class="intaCookieListOverview-heading">
                        공급자
                    </h3>
                    <p class="intaCookieListOverview-vendor">${vendor}</p>
                    <p class="intaCookieListOverview-heading">
                        개인정보 처리방침
                    </p>
                    ${(cookie.vendor_privacy === null || cookie.vendor_privacy == undefined) ? generatePolicyUrl(`
                        개인정보 처리방침`) : `<a href="${cookie.vendor_privacy}" target="_blank" rel="noopener noreferrer">개인정보 처리방침</a>`}
                    <h4 class="intaCookieList-CookieName">
                        도메인
                    </h4>
                    ${cookie.domains.map((cookie) => {
                if (cookie == undefined) return;
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `;
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
            }).join(" ")}
                </section>
                <section>
                    <h3 class="intaCookieListOverview-heading">
                        쿠키
                    </h3>
                    <section>
                        ${cookie.cookies.map((cookie) => {
                return `
                                <article class="intaCookieList-cookie">
                                    <h4 class="intaCookieList-CookieName">${cookie.cookie}</h4>
                                    <p>${cookie.purpose}</p>
                                </article>
                            `;
            }).join(" ")}
                    </section>
                </section>
            </section>
            `;

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
                if (cookie.indexOf("intastellar") > -1 || cookie.indexOf("intastellarconsents") > -1) {
                    return `
                                            <a href="https://${cookie}" target="_blank" rel="noopener">${cookie}</a>
                                        `
                } else {
                    return `
                                            <p>${cookie}</p>
                                        `;
                }
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
            </ >
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
            pattern.test(str) && str.indexOf("conditions") != -1 ||
            pattern.test(str) && str.indexOf("datenschutz") != -1 ||
            pattern.test(str) && str.indexOf("politica") != -1 ||
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

xhr.open("GET", "https://www.intastellarsolutions.com/about/legal/privacy/gdpr-cookiebanner/embedded/privacy-policy?lang=" + (window?.INTA?.settings === undefined || window?.INTA?.settings.lang === "auto" || window?.INTA?.settings.lang === "" ? document.querySelector("html").getAttribute("lang") : window?.INTA?.settings.language == "german" ? "de" : window?.INTA?.settings.language == "danish" ? "da" : window?.INTA?.settings.language == "english" ? "en" : document.querySelector("html").getAttribute("lang")) + "&v=" + new Date().getTime());
xhr.send();
setIntastellarPartnerDomain();

function showPrivacy() {

    let paddingTop = "100px";
    if (window.INTA.settings.design === "banner") {
        paddingTop = "56px";
    } else if (window.INTA.settings.design === "bannerV2") {
        paddingTop = "26px";
    }

    document.querySelector(".intLearnMoreBtn").style.display = "none";
    document.querySelector(".intastellarCookieConstents__content").style.scrollPaddingTop = paddingTop;
    const moreContentText = document.querySelector(".intastellar_privacyPolicy");
    moreContentText.style.height = "100%";
    moreContentText.style.background = "#ffff";
    moreContentText.style.color = "#000";
    moreContentText.style.borderBottom = "1px solid #c4c4c4"
    moreContentText.style.textAlign = "left";
    moreContentText.innerHTML = `
                <div style = "padding: 25px;">
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
    if (typeof window?.INTA?.settings.ccpa === "object" && isCCPAURL(window?.INTA?.settings.ccpa.url)) {
        if (window?.INTA?.settings.ccpa.url.length > 0 && typeof window?.INTA?.settings.ccpa.url != "undefined") {
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
    return '<section class="intSettingsButton"><button class="intastellarCookie-settings__btn --noBorderRadius --bg intastellarCookieSettings--acceptAll">' + allCookiesText + '</button>'
        + '<button class="intastellarCookie-settings__btn intastellarCookieBanner__settings --save">' + settingsText + '</button>'
        + '</section>';
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

    let paddingTop = "140px";
    if (window.INTA.settings.design === "banner") {
        paddingTop = "56px";
    } else if (window.INTA.settings.design === "bannerV2") {
        paddingTop = "16px";
    }


    document.querySelector(".intastellarCookieConstents__content-footer").classList.toggle("view");
    document.querySelector(".intastellarCookieConstents").classList.toggle("--active");

    if (document.querySelector(".intastellarCookieConstents__content-footer").classList.contains("view")) {
        if (intastellarCookieLanguage == "da-DK" || intastellarCookieLanguage == "da" || intastellarCookieLanguage == "dk") {
            e.innerHTML = "Skjul detaljer";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
            e.innerHTML = "Hide details";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de" || intastellarCookieLanguage === "de-DE") {
            e.innerHTML = "Details ausblenden";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "es" || intastellarCookieLanguage === "es-ES") {
            e.innerHTML = "Ocultar detalles";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fr" || intastellarCookieLanguage === "fr-FR") {
            e.innerHTML = "Masquer les détails";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "it" || intastellarCookieLanguage === "it-IT") {
            e.innerHTML = "Nascondi dettagli";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "nl" || intastellarCookieLanguage === "nl-NL") {
            e.innerHTML = "Verberg details";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pl" || intastellarCookieLanguage === "pl-PL") {
            e.innerHTML = "Ukryj szczegóły";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pt" || intastellarCookieLanguage === "pt-PT") {
            e.innerHTML = "Ocultar detalhes";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ru" || intastellarCookieLanguage === "ru-RU") {
            e.innerHTML = "Скрыть детали";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "sv" || intastellarCookieLanguage === "sv-SE") {
            e.innerHTML = "Dölj detaljer";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "af" || intastellarCookieLanguage === "af-ZA") {
            e.innerHTML = "Versteek besonderhede";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ko" || intastellarCookieLanguage === "ko-KR") {
            e.innerHTML = "세부정보 숨기기";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fi" || intastellarCookieLanguage === "fi-FI") {
            e.innerHTML = "Piilota yksityiskohdat";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "no" || intastellarCookieLanguage === "no-NO") {
            e.innerHTML = "Skjul detaljer";
        }
    } else {
        if (intastellarCookieLanguage == "da-DK" || intastellarCookieLanguage == "da" || intastellarCookieLanguage == "dk") {
            e.innerHTML = "Manage Indstillinger";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
            e.innerHTML = "Manage prefrence";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de" || intastellarCookieLanguage === "de-DE") {
            e.innerHTML = "Einstellungen verwalten";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "es" || intastellarCookieLanguage === "es-ES") {
            e.innerHTML = "Gestionar preferencias";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "fr" || intastellarCookieLanguage === "fr-FR") {
            e.innerHTML = "Gérer les préférences";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "it" || intastellarCookieLanguage === "it-IT") {
            e.innerHTML = "Gestire le preferenze";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "nl" || intastellarCookieLanguage === "nl-NL") {
            e.innerHTML = "Beheer voorkeuren";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pl" || intastellarCookieLanguage === "pl-PL") {
            e.innerHTML = "Zarządzaj preferencjami";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "pt" || intastellarCookieLanguage === "pt-PT") {
            e.innerHTML = "Gerenciar preferências";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ru" || intastellarCookieLanguage === "ru-RU") {
            e.innerHTML = "Управление предпочтениями";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "sv" || intastellarCookieLanguage === "sv-SE") {
            e.innerHTML = "Hantera inställningar";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "af" || intastellarCookieLanguage === "af-ZA") {
            e.innerHTML = "Bestuur voorkeure";
        } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "ko" || intastellarCookieLanguage === "ko-KR") {
            e.innerHTML = "환경설정 관리";
        }
    }
}

/* - - - Helper function for saving settings - - - */

/* - - - END - - - */
function updateConsents(consent, type = null) {

    window.allScripts.map((script) => {
        if (script.type == "marketing") {
            script.scripts.forEach((src) => {
                document.querySelectorAll("script").forEach((script) => {

                    if (new RegExp(src, "ig").test(script.src) || script.innerText.indexOf(src) > -1) {
                        script.type = "text/javascript";
                    }
                })
            })
        }
    })

    let googleAdsScript = document.querySelector("script[src*='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js']")?.src;
    googleAdsScript = googleAdsScript?.split("client=")[1]?.split("&")[0];
    if (consent == "all") {
        let staticCookies = [...inta_statisticCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        let marketingCookie = [...inta_marketingCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        let functionalCookies = [...inta_functionalCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        int__cookiesToKeep.push.apply(int__cookiesToKeep, staticCookies);
        int__cookiesToKeep.push.apply(int__cookiesToKeep, marketingCookie);
        int__cookiesToKeep.push.apply(int__cookiesToKeep, functionalCookies);
        deleteAllCookies();
    }

    /*  if (consent == "all" || type.length > 0 && type.includes("advertisementCookies")) {
         (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;
         (adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 0;
         (adsbygoogle = window.adsbygoogle || []).push({});
     } else {
         (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 1;
         (adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;
     } */

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

    if (intaCookieConsents?.staticsticCookies === "checked") {
        let newArray = [...inta_statisticCookieList.map((cookie) => cookie.cookies.map((c) => (c.cookie != undefined) ? c.cookie : ""))].flat(1)
        int__cookiesToKeep.push.apply(int__cookiesToKeep, newArray);
        deleteAllCookies();

        window.allScripts.map((script) => {
            console.log(script);
            if (script.type == "statics") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {
                        if (new RegExp(src, "ig").test(script.src) || script.innerText.indexOf(src) > -1) {
                            script.type = "text/javascript";
                        }
                    })
                })
            }
        })
    } else {
        window.allScripts.map((script) => {
            if (script.type == "statics") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {
                        if (new RegExp(src, "ig").test(script.src) || script.innerText.indexOf(src) > -1) {
                            script.type = "text/blocked";
                        }
                    })
                })
            }
        })
    }

    if (intaCookieConsents?.functionalCookies === "checked") {
        const intaBlockItemsContainer = document.querySelectorAll("inta-consents[data-src]");

        window.allScripts.map((script) => {
            if (script.type == "functional") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {

                        if (new RegExp(src, "ig").test(script.src) || script.innerText.indexOf(src) > -1) {
                            script.type = "text/javascript";
                        }
                    })
                })
            }
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
    } else {
        window.allScripts.map((script) => {
            if (script.type == "functional") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {

                        if (new RegExp(src, "ig").test(script.src) || script.innerText.indexOf(src) > -1) {
                            script.type = "text/blocked";
                        }
                    })
                })
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

        window.allScripts.map((script) => {
            if (script.type == "marketing") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {

                        if (new RegExp(src, "ig").test(script.src) || script.innerText.indexOf(src) > -1) {
                            script.type = "text/javascript";
                        }
                    })
                })
            }
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
    } else {
        window.allScripts.map((script) => {
            if (script.type == "marketing") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {

                        if (new RegExp(src, "ig").test(script.src) || script.innerText.indexOf(src) > -1) {
                            script.type = "text/blocked";
                        }
                    })
                })
            }
        })
    }
}

function saveINTCookieSettings(consent, type = null) {
    document.querySelector("html").classList.remove("noScroll");
    document.querySelector(".intastellarCookieConstents").classList.remove("--active");
    const FunctionalCheckbox = document.querySelector("#functional");
    const StaticsCheckBox = document.querySelector("#statics");
    const MarketingCheckBox = document.querySelector("#marketing");

    window._hsp.push(['setHubSpotCookieConsent', {
        analytics: StaticsCheckBox?.checked,
        advertisement: MarketingCheckBox?.checked,
        functionality: FunctionalCheckbox?.checked,
    }]);

    if (MarketingCheckBox?.checked) {
        gtag('consent', 'update', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'url_passthrough': true,
        });
        window.uetq.push('consent', 'update', {
            'ad_storage': 'granted'
        });
        window.clarity('consentV2', {
            ad_Storage: "granted",
            analytics_Storage: "denied"
        });
        window._hsp.push(['doNotTrack', false]);

        /* window.allScripts.map((script) => {
            if (script.type == "marketing") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {
                        if (window.notRequired.test(script.src) || window.notRequired.test(script.innerText)) {

                            script.type = "text/javascript";

                        }
                    })
                })
            }
        }) */
    } else {
        window._hsp.push(['doNotTrack']);
        window._hsp.push(['revokeCookieConsent']);
        gtag('consent', 'update', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'url_passthrough': true
        });
        window.uetq.push('consent', 'update', {
            'ad_storage': 'denied'
        });
        window.clarity('consent', false);
        /* window.allScripts.map((script) => {
            if (script.type == "marketing") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {
                        if (window.notRequired.test(script.src) || window.notRequired.test(script.innerText)) {

                            script.type = "text/blocked";

                        }
                    })
                })
            }
        }) */
    }

    if (FunctionalCheckbox?.checked) {
        gtag('consent', 'update', {
            'functionality_storage': 'granted',
            'url_passthrough': true,
        })

        window.clarity('consent', false);

        window._hsp.push(['doNotTrack', false]);
        /* window.allScripts.map((script) => {
            if (script.type == "functional") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {
                        if (window.notRequired.test(script.src) || window.notRequired.test(script.innerText)) {

                            script.type = "text/javascript";

                        }
                    })
                })
            }
        }) */
    } else {
        window._hsp.push(['doNotTrack']);
        window._hsp.push(['revokeCookieConsent']);
        window.clarity('consent', false);
        gtag('consent', 'update', {
            'functionality_storage': 'denied',
        })
        /* window.allScripts.map((script) => {
            if (script.type == "functional") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {
                        if (window.notRequired.test(script.src) || window.notRequired.test(script.innerText)) {

                            script.type = "text/blocked";

                        }
                    })
                })
            }
        }) */
    }

    if (StaticsCheckBox?.checked) {
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'url_passthrough': true,
        })
        window._hsp.push(['doNotTrack', false]);
        window.clarity('consentV2', {
            ad_Storage: "denied",
            analytics_Storage: "granted"
        });

        /* window.allScripts.map((script) => {
            if (script.type == "statics") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {
                        if (window.notRequired.test(script.src) || window.notRequired.test(script.innerText)) {

                            script.type = "text/javascript";

                        }
                    })
                })
            }
        }) */
    } else {

        window._hsp.push(['doNotTrack']);
        window._hsp.push(['revokeCookieConsent']);
        gtag('consent', 'update', {
            'analytics_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'url_passthrough': true,
        })

        window.uetq.push('consent', 'update', {
            'ad_storage': 'denied'
        });
        window.clarity('consent', false);

        /* window.allScripts.map((script) => {
            if (script.type == "statics") {
                script.scripts.forEach((src) => {
                    document.querySelectorAll("script").forEach((script) => {
                        if (window.notRequired.test(script.src) || window.notRequired.test(script.innerText) > -1) {
                            script.type = "text/blocked";
                        }
                    })
                })
            }
        }) */
    }

    intaConsentsObjectVariable.consents = {
        staticsticCookies: (StaticsCheckBox?.checked) ? "checked" : false,
        functionalCookies: (FunctionalCheckbox?.checked) ? "checked" : false,
        advertisementCookies: (MarketingCheckBox?.checked) ? "checked" : false,
    };
    dataLayer.push({ 'event': 'cookie_consent_update', 'cookie_consent': intaConsentsObjectVariable.consents });
    intaConsentsObjectVariable.time = new Date().getTime()

    document.cookie = int_hideCookieBannerName + "=__inta1." + encodeIntaConsentsObject(JSON.stringify(intaConsentsObjectVariable), randomIntFromInterval(20, 34)) + "; expires=" + cookieLifeTime +
        "; path=/; " +
        intCookieDomain +
        "";
    /*window.location.reload();*/
    updateConsents(consent, type);
    setTimeout(() => {
        restartObserver();
    }, 1000);
    document.querySelector("[name=intastellar-solutions-sharinglibrary-iframe]").contentWindow
        .postMessage(JSON.stringify(intaConsentsObjectVariable), "*");
}