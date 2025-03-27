const intaconsentsContainer = window.intaconsentsContainer = document.createElement("intastellarconsents");
const intastellarLogoLight = "https://www.intastellar-consents.com/assets/icons/intastellar-logo-white.svg";
const intastellarLogoDark = "https://www.intastellar-consents.com/assets/icons/intastellar-logo-black.svg";
let intastellarSettingsButton = document.createElement("inta-consents-settings-btn");
let intastellarSettingsButtonContent = document.createElement("button");
const intastellarConsentsBanner = document.createElement("inta-consents-banner");
const intastellarConsentsBannerContent = document.createElement("section");
const moreintHeader = document.createElement("intheader");
const moreContentText = document.createElement("section");
const moreSettingsContent = document.createElement("section");
const moreFooter = document.createElement("div");

const intastellarCookieConstents__Container = document.createElement("article");
const intastellarCookieButtons = document.createElement("section");
const testSection = document.createElement("section");

const cookieSettings = document.createElement("article");
const cookieSettingsContent = document.createElement("section");

intastellarConsentsBanner.setAttribute("class", "intastellarCookieConstents");
intastellarConsentsBannerContent.setAttribute("class", "intastellarCookieConstents__content");
moreintHeader.setAttribute("class", "intastellarCookieConstents__content-intHeader");
moreFooter.setAttribute("class", "intastellarCookieConstents__content-footer");

moreContentText.setAttribute("class", "intastellarCookieConstents__content-main");;
moreSettingsContent.setAttribute("class", "intastellarCookieConstents__content");

testSection.setAttribute("class", "intastellarCookieConstents__contentC");
testSection.appendChild(moreintHeader);

testSection.appendChild(moreContentText);

moreSettingsContent.appendChild(intastellarCookieConstents__Container);
intastellarCookieConstents__Container.appendChild(testSection);
intastellarCookieConstents__Container.appendChild(intastellarCookieButtons);
intastellarCookieConstents__Container.appendChild(moreFooter);

intastellarConsentsBannerContent.appendChild(intastellarCookieConstents__Container);

intastellarSettingsButtonContent.setAttribute("class", "intastellarCookie-settingsContainer");
intastellarCookieButtons.setAttribute("class", "intastellarCookie-settings__buttons");
intastellarSettingsButtonContent.setAttribute("title", intastellarCookieLanguageSettings);
cookieSettings.setAttribute("class", "intastellarCookie-settings__container");
intastellarSettingsButton.setAttribute("onclick", "javascript:IntastellarCookieConsent.renew();");
intastellarSettingsButtonContent.innerHTML = '<img class="intCookieIcon-openSettings" style="filter: brightness(' + (darkLightCheck(window.INTA.settings.color) === "light" ? "0" : "100") + ') !important" src="' + intCookieIcon + '" alt="Cookie Icon">' + IntastellarToolTip + ' ' + text;

if (window.location.host.indexOf("intastellarsolutions") == -1) {
    poweredBy = "<span class='intastellarCookie-settings__poweredBy' alt='This cookie banner is powered by Intastellar Consents Solutions'>Powered by <a class='intastellarCookie-settings__poweredByLink' href='https://www.intastellarsolutions.com?utm_source=" + encodeURI(window.location.href) + "&utm_content=powered_by&utm_medium=referral&utm_campaign=" + pluginSource + "&utm_term=gdpr_banner_logo' target='_blank' rel='noopener'><img class='intastellarCookie-settings__poweredByImg' width='100px' height='100px' src='" + intastellarLogo + "' alt='Intastellar Solutions, International'></a></span>";
}
if (arrange == "ltr") {
    intastellarSettingsButton.classList.add("intastellarCookie-settingsContainer--otherSide");
    cookieSettings.classList.add("intastellarCookie-settings__container--otherSide");
}

intastellarSettingsButton.appendChild(intastellarSettingsButtonContent);
cookieSettings.appendChild(cookieSettingsContent);
intastellarConsentsBanner.appendChild(intastellarConsentsBannerContent);

intaconsentsContainer.appendChild(intastellarConsentsBanner);
intaconsentsContainer.appendChild(intastellarSettingsButton);
intaconsentsContainer.appendChild(cookieSettings);