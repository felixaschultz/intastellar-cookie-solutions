
const intaconsentsContainer = window.intaconsentsContainer = document.createElement("intastellarconsents");
/* const intastellarLogoLight = "https://www.intastellarsolutions.com/assets/logos/intastellar-logo-new-white.svg";
const intastellarLogoDark = "https://www.intastellarsolutions.com/assets/logos/intastellar-logo-new.svg"; */
let banner = document.createElement("inta-consents-settings-btn");
let bannerContent2 = document.createElement("button");
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

bannerContent2.setAttribute("class", "intastellarCookie-settingsContainer");
intastellarCookieButtons.setAttribute("class", "intastellarCookie-settings__buttons");
bannerContent2.setAttribute("title", intastellarCookieLanguageSettings);
cookieSettings.setAttribute("class", "intastellarCookie-settings__container");
banner.setAttribute("onclick", "javascript:IntastellarCookieConsent.renew();");
