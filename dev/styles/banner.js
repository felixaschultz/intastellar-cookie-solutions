/* 
Code for Intastellar Consents banner: Banner v1 styling
*/
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

let intCookieIconSmallClass = cookieLogo == intCookieIcon ? " intastellarIcon" : "";
let CompanyLogoName = cookieLogo == intCookieIcon ? "Cookie Icon" : `${document.domain} logo`;

moreintHeader.innerHTML = `
    ${typeof window?.INTA?.settings.logo != "undefined" ? '<img class="intSettingsCompanyLogo" src="' + window?.INTA?.settings.logo + '" alt="' + CompanyLogoName + '" title="' + CompanyLogoName + '">' : ``}
    `;

moreContentText.innerHTML = settingsMessage;

intastellarSettingsButton.appendChild(intastellarSettingsButtonContent);
intaconsentsContainer.appendChild(intastellarSettingsButton);
cookieSettings.appendChild(cookieSettingsContent);
intastellarConsentsBanner.appendChild(intastellarConsentsBannerContent);