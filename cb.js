function createCookieSettings(){let t="",e="",i=document.createElement("inta-consents-settings-btn"),n=document.createElement("button"),s=document.createElement("inta-consents-banner"),a=document.createElement("section"),o=document.createElement("intheader"),l=document.createElement("section"),c=document.createElement("footer"),r=document.createElement("intastellar-consents"),p="Cookie Indstillinger";"de"==intastellarCookieLanguage?p="Cookie Einstellungen":"en"==intastellarCookieLanguage&&(p="Cookie Settings"),s.setAttribute("class","intastellarCookieConstents"),a.setAttribute("class","intastellarCookieConstents__content"),o.setAttribute("class","intastellarCookieConstents__content-intHeader"),c.setAttribute("class","intastellarCookieConstents__content-footer"),l.setAttribute("class","intastellarCookieConstents__content-main");let d=document.createElement("article"),k=document.createElement("section");k.setAttribute("class","intastellarCookieConstents__contentC"),k.appendChild(o),k.appendChild(l),a.appendChild(d),d.appendChild(k),d.appendChild(c);let g=document.createElement("article"),h=document.createElement("section");n.setAttribute("class","intastellarCookie-settingsContainer"),n.setAttribute("title",p),g.setAttribute("class","intastellarCookie-settings__container");let C=void 0===window.INTA.settings||void 0===window.INTA.settings.arrange?"":window.INTA.settings.arrange;"ltr"==C&&(n.classList.add("intastellarCookie-settingsContainer--otherSide"),g.classList.add("intastellarCookie-settings__container--otherSide"));let _={danish:"Ved at acceptere alle cookies underst\xf8tter du "+document.domain+" med at udvikle en bedre l\xf8sning til dig.</p><p>V\xe6lg om du vil tillade kun de n\xf8dvendige cookies eller om du vil tillade alle cookies.",german:"Wenn Sie auf akzeptieren klicken, unterst\xfctzen Sie "+document.domain+" bei der Weiterentwicklung von unserer Webseite.</p><p>W\xe4hlen Sie zwischen alle Cookies akzeptieren oder Ablehnen.",english:"By accepting all cookies, you support "+document.domain+" in developing a better solution for you. </p><p> Select whether you want to allow only the necessary cookies or whether you want to allow all cookies."},u="<div class='intastellarCookie-settings__contentConatiner'><p>",m="</p></div>",b={danish:`<h3 style="    font-size: 25px;">Du bestemmer over dine data</h3>
        <p>Vi og vores samarbejdspartnere bruger teknologier, herunder cookies, til at indsamle oplysninger om dig til forskellige form\xe5l, herunder:</p>
        <ol>
            <li>Funktionel</li>
            <li>Statistiske</li>
            <li>Marketing</li>
        </ol>
        <p>Ved at trykke p\xe5 'Accepter' giver du samtykke til alle disse form\xe5l. Du kan ogs\xe5 v\xe6lge at tilkendegive, hvilke form\xe5l du vil give samtykke til ved at benytte checkboksene ud for form\xe5let, og derefter trykke p\xe5 'Gem indstillinger'.
        Du kan til enhver tid tr\xe6kke dit samtykke tilbage ved at trykke p\xe5 det lille ikon nederst i ${"ltr"==window.INTA.settings.arrange?"venstre":"h\xf8jre"} hj\xf8rne af hjemmesiden.</p>
        <p>Du kan l\xe6se mere om vores brug af cookies og andre teknologier, samt om vores indsamling og behandling af personoplysninger ved at trykke p\xe5 linket.</p>
        ${generatePolicyUrl("Vores privat og cookie politik")}
        <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International privat politik</button>`,german:`<h3 style="    font-size: 25px;">Sie haben die Kontrolle \xfcber Ihre Daten</h3>
        <p>Wir und unsere Gesch\xe4ftspartner nutzen Technologien wie Cookies dazu, personenbezogene Informationen f\xfcr verschiedene Zwecke zu sammeln, darunter:</p>
        <ol>
            <li>Funktionelle</li>
            <li>Statistike</li>
            <li>Werbung</li>
        </ol>
        <p>Wenn Sie auf „Akzeptieren“ klicken, erteilen Sie Ihre Einwilligung f\xfcr alle diese Zwecke. Sie k\xf6nnen auch entscheiden, welchen Zwecken Sie zustimmen, indem Sie das K\xe4stchen neben dem Zweck anklicken und auf „Speichern“ klicken.</p>
        <p>Sie k\xf6nnen Ihre Einwilligung jederzeit widerrufen, indem Sie auf das kleine Symbol unten in der ${"ltr"==window.INTA.settings.arrange?"linken":"rechten"} Ecke klicken.</p>
        ${generatePolicyUrl("Unsere Datenschutz Erkl\xe4hrung und Cookie politik")}
        <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International Datenschutz erkl\xe4hrung</button>`,english:`<h3 style="    font-size: 25px;">You\xb4re in control</h3>
        <p>We and our business partners uses technologies, including cookies, to collect information about you for various purposes, including:</p>
        <ol>
            <li>Functional</li>
            <li>Statistical</li>
            <li>Advertisement</li>
        </ol>
        <p>By clicking 'Accept', you give your consent for all these purposes. You can also choose to specify the purposes you consent to by ticking the checkbox next to the purpose and clicking 'Save settings'.</p>
        <p>You may withdraw your consent at any time by clicking the small icon at the bottom ${"ltr"==window.INTA.settings.arrange?"left":"right"} corner of the website.</p>
        ${generatePolicyUrl("Our Privacy and cookie Policy")}
        <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International privacy policy</button>`};null!=intastellarCookieLanguage&&"da"===intastellarCookieLanguage||"da-DK"===intastellarCookieLanguage?(settingsMessage=b.danish,intastellarShowHideDetailsText="Vis detaljer",t=u+_.danish+m+generatePolicyUrl("Vores privat og cookie politik"),e=generateCookieButtons("Accepter","Afvis","Indstillinger"),c.innerHTML=`
            <section class="intCookieSaveSettingsContainer">
                ${generateCookieSettingsButton(intastellarSupportedLanguages.danish.saveSettings,"Accepter")}
                <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
            </section>
            <section class="intastellar_privacyPolicy"></section>
            <article class="intReadMore">
                <section class="required">
                    <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.necessary.title} <i class="intastellar__arrow"></i></h3>
                    <p>${intastellarSupportedLanguages.danish.necessary.description}</p>
                    <article class="intaCookieListOverview">
                    ${listAllCookies(inta_requiredCookieList)}
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.functional.title} <i class="intastellar__arrow"></i></h3>
                    <p>${intastellarSupportedLanguages.danish.functional.description}</p>
                    <article class="intaCookieListOverview">
                        ${listAllCookies(inta_functionalCookieList)}
                    </article>  
                </section>
                <section>
                    <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.statisic.title} <i class="intastellar__arrow"></i></h3>
                    <p>${intastellarSupportedLanguages.danish.statisic.description}</p> 
                    <article class="intaCookieListOverview">
                    ${listAllCookies(inta_statisticCookieList)}
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.marketing.title} <i class="intastellar__arrow"></i></h3>
                    <p>${intastellarSupportedLanguages.danish.marketing.description}</p>
                    <article class="intaCookieListOverview">
                    ${listAllCookies(inta_marketingCookieList)}
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
                                <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${!!(""!=getCookie(int_hideCookieBannerName)&&getCookie(int_hideCookieBannerName).indexOf("__inta")>-1)&&JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.statisic.title}</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${!!(""!=getCookie(int_hideCookieBannerName)&&getCookie(int_hideCookieBannerName).indexOf("__inta")>-1)&&JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.marketing.title}</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${!!(""!=getCookie(int_hideCookieBannerName)&&getCookie(int_hideCookieBannerName).indexOf("__inta")>-1)&&JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                </article>
        `):null!=intastellarCookieLanguage&&"de-DE"===intastellarCookieLanguage||"de"===intastellarCookieLanguage?(settingsMessage=b.german,intastellarShowHideDetailsText="Details einblenden",t=u+_.german+m+generatePolicyUrl("Unsere Datenschutz Erkl\xe4hrung und Cookie politik"),e=generateCookieButtons("Akzeptieren","Ablehnen","Einstellungen"),c.innerHTML=`
            <section class="intCookieSaveSettingsContainer">
                ${generateCookieSettingsButton(intastellarSupportedLanguages.german.saveSettings,"Akzeptieren")}
                <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
            </section>
            <section class="intastellar_privacyPolicy"></section>
            <article class="intReadMore">
                <section class="required">
                    <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.german.necessary.title} <i class="intastellar__arrow"></i></h3>
                    <p>${intastellarSupportedLanguages.german.necessary.description}</p>
                    <article class="intaCookieListOverview">
                        ${listAllCookies(inta_requiredCookieList)}
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.german.functional.title} <i class="intastellar__arrow"></i></h3>
                    <p>${intastellarSupportedLanguages.german.functional.description}</p>
                    <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)}
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.german.statisic.title} <i class="intastellar__arrow"></i></h3>
                    <p>${intastellarSupportedLanguages.german.statisic.description}</p>
                    <article class="intaCookieListOverview">
                    ${listAllCookies(inta_statisticCookieList)}
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.german.marketing.title} <i class="intastellar__arrow"></i></h3>
                    <p>${intastellarSupportedLanguages.german.marketing.description}</p>
                    <article class="intaCookieListOverview">
                    ${listAllCookies(inta_marketingCookieList)}
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
                                <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${!!(""!=getCookie(int_hideCookieBannerName)&&getCookie(int_hideCookieBannerName).indexOf("__inta")>-1)&&JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">${intastellarSupportedLanguages.german.statisic.title}</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${!!(""!=getCookie(int_hideCookieBannerName)&&getCookie(int_hideCookieBannerName).indexOf("__inta")>-1)&&JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">${intastellarSupportedLanguages.german.marketing.title}</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${!!(""!=getCookie(int_hideCookieBannerName)&&getCookie(int_hideCookieBannerName).indexOf("__inta")>-1)&&JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                </article>
        `):null!=intastellarCookieLanguage&&"en"===intastellarCookieLanguage||"en-GB"===intastellarCookieLanguage||"en-US"===intastellarCookieLanguage?(settingsMessage=b.english,intastellarShowHideDetailsText="Show details",t=u+_.english+m+generatePolicyUrl("Our Privacy and cookie Policy"),e=generateCookieButtons("Accept","Decline All","Settings"),c.innerHTML=`
            <section class="intCookieSaveSettingsContainer">
                ${generateCookieSettingsButton(intastellarSupportedLanguages.english.saveSettings,"Accept")}
                <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
            </section>
            <section class="intastellar_privacyPolicy"></section>
            <article class="intReadMore">
                <section class="required">
                    <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.english.necessary.title} <i class="intastellar__arrow"></i></h3>
                    <p>${intastellarSupportedLanguages.english.necessary.description}</p>
                    <article class="intaCookieListOverview">
                    ${listAllCookies(inta_requiredCookieList)}
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.english.functional.title} <i class="intastellar__arrow"></i></h3>
                    <p>${intastellarSupportedLanguages.english.functional.description}</p>
                    <article class="intaCookieListOverview">
                    ${listAllCookies(inta_functionalCookieList)}
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.english.statisic.title} <i class="intastellar__arrow"></i></h3>
                    <p>${intastellarSupportedLanguages.english.statisic.description}</p>
                    <article class="intaCookieListOverview">
                    ${listAllCookies(inta_statisticCookieList)}
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.english.marketing.title} <i class="intastellar__arrow"></i></h3>
                    <p>${intastellarSupportedLanguages.english.marketing.description}</p>
                    <article class="intaCookieListOverview">
                    ${listAllCookies(inta_marketingCookieList)}
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
                                <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${!!(""!=getCookie(int_hideCookieBannerName)&&getCookie(int_hideCookieBannerName).indexOf("__inta")>-1)&&JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">${intastellarSupportedLanguages.english.statisic.title}</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${!!(""!=getCookie(int_hideCookieBannerName)&&getCookie(int_hideCookieBannerName).indexOf("__inta")>-1)&&JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">${intastellarSupportedLanguages.english.marketing.title}</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${!!(""!=getCookie(int_hideCookieBannerName)&&getCookie(int_hideCookieBannerName).indexOf("__inta")>-1)&&JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                </article>
        `):(settingsMessage=b.danish,intastellarShowHideDetailsText="Vis detaljer",t=u+_.danish+m+generatePolicyUrl("Vores privat og cookie politik"),e=generateCookieButtons("Accepter","Afvis","Indstillinger"),c.innerHTML=`
            <section class="intCookieSaveSettingsContainer">
                ${generateCookieSettingsButton(intastellarSupportedLanguages.danish.saveSettings,"Accepter")}
                <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
            </section>
            <section class="intastellar_privacyPolicy"></section>
            <article class="intReadMore">
                <section class="required">
                    <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.necessary.title} <i class="intastellar__arrow"></i></h3>
                    <p>${intastellarSupportedLanguages.danish.necessary.description}</p>
                    <article class="intaCookieListOverview">
                    ${listAllCookies(inta_requiredCookieList)}
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.functional.title} <i class="intastellar__arrow"></i></h3>
                    <p>${intastellarSupportedLanguages.danish.functional.description}</p>
                    <article class="intaCookieListOverview">
                        ${listAllCookies(inta_functionalCookieList)}
                    </article>  
                </section>
                <section>
                    <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.statisic.title} <i class="intastellar__arrow"></i></h3>
                    <p>${intastellarSupportedLanguages.danish.statisic.description}</p> 
                    <article class="intaCookieListOverview">
                    ${listAllCookies(inta_statisticCookieList)}
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">${intastellarSupportedLanguages.danish.marketing.title} <i class="intastellar__arrow"></i></h3>
                    <p>${intastellarSupportedLanguages.danish.marketing.description}</p>
                    <article class="intaCookieListOverview">
                    ${listAllCookies(inta_marketingCookieList)}
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
                                <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${!!(""!=getCookie(int_hideCookieBannerName)&&getCookie(int_hideCookieBannerName).indexOf("__inta")>-1)&&JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.statisic.title}</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${!!(""!=getCookie(int_hideCookieBannerName)&&getCookie(int_hideCookieBannerName).indexOf("__inta")>-1)&&JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">${intastellarSupportedLanguages.danish.marketing.title}</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${!!(""!=getCookie(int_hideCookieBannerName)&&getCookie(int_hideCookieBannerName).indexOf("__inta")>-1)&&JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                </article>
        `),l.innerHTML=settingsMessage;let v=void 0!==window.INTA.settings&&void 0!==window.INTA.settings.ccpa&&window.INTA.settings.ccpa.on,f=void 0!==window.INTA.settings&&void 0!==window.INTA.settings.ccpa&&window.INTA.settings.ccpa.url,S=void 0===window.INTA.settings||void 0===window.INTA.settings.color||!1===window.INTA.settings.color||window.INTA.settings.color.indexOf("[")>-1||""===window.INTA.settings.color?"rgba(0, 51, 153, 1)":window.INTA.settings.color,x=void 0===window.INTA.settings||void 0===window.INTA.settings.logo||""===window.INTA.settings.logo||window.INTA.settings.logo.indexOf("[")>-1?intCookieIcon:window.INTA.settings.logo,y=void 0===window.INTA.settings||void 0===window.INTA.settings.background_color?"#fff":window.INTA.settings.background_color,$=invertColor(y),w="";if(-1!=S.indexOf("var")){let A=document.querySelector(":root");A.style.setProperty(S.split("(")[1].split(")")[0]+"--bright",pSBC(-.6,getComputedStyle(document.documentElement).getPropertyValue(S.split("(")[1].split(")")[0]))),w="var("+S.split("(")[1].split(")")[0]+"--bright)"}else w=pSBC(-.6,S);let T=document.createElement("style"),L=void 0!==window.INTA.settings&&void 0!==window.INTA.settings.text&&window.INTA.settings.text,I=`
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
        content: "\xa7 " counters(item, ".") ". ";
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
    `,P="--right",E="",M="100%";"ltr"==C&&(P="--left");let D='<div class="intastellarToolTip '+P+'">'+p+"</div>";if(L&&(D="",I=`
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
            content: "\xa7 " counters(item, ".") ". ";
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
        `,E=" Cookie notice",M="25%"),T.innerHTML=".intastellarCookie-settingsContainer,.intastellarCookieConstents__contentC, .intastellarCookie-settings__btn.--bg, .intastellarCCPAContainer{background: "+S+" !important;color: #fff !important;} .intCookie_ConsentLogo-container{border-color: #fff; background: linear-gradient(#fff 0 0) padding-box, "+S+" border-box;} .intCookie_ConsentContainer-content{border-color: #fff; background: linear-gradient(#fff 0 0) padding-box, "+S+" border-box;} .intastellarCookie-settings__btn.--changePermission{background: transparent !important; border-image-slice: 1;border-color: "+S+";border-image:"+S+" 1 !important; border-width: 3px; border-style: solid; transition: background .25s ease-in-out; width: max-content; margin-inline: auto !important;} .intastellarCookie-settings__btn.--changePermission:hover{background: "+S+" !important; color: #fff !important;} .intCookieSetting__checkbox:checked ~ .checkmark{background: "+S+";}.intastellarCCPA__popupClose{background:"+S+"; color: #fff;} .intastellarCookie-settings__btn.--bg:hover{background: "+w+" !important;}.intastellarCookie-settings__close:hover{background: "+w+" !important;} .intastellarCookieConstents__content-main .intastellarCookie-settings__privacyLink{color: #fff !important;} .intastellarCookie-settings__privacyLink{text-decoration: underline !important;}.intastellarCookie-settings__content .intastellarCookie-settings__privacyLink{color: "+$+";}.intastellarCookie-settings__content p{color: "+$+" !important;}.intastellarCookie-settings__intHeader{color:"+$+" !important;}.intastellarCookie-settings__container{background-color: "+y+" !important;} .intastellarCookie-settingsMoreContainer{display:none;position: fixed; top: 50%; left: 50%; background: #fff; padding: 15px;z-index: 1000; transform: translate(-50%,-50%);}"+I,intHead.appendChild(T),v&&isValidCCPALink()){let N=document.createElement("inta-consents-ccpa"),O=document.createElement("section");N.setAttribute("class","intastellarCCPAContainer"),N.setAttribute("title","California Consumer Privacy Act: Do not sell my information!"),O.setAttribute("class","intastellarCCPAContainer__content"),O.innerHTML=`
            <svg class="intastellarCCPA__icon" height="14" viewBox=".2 0 19.4 20" width="13" xmlns="http://www.w3.org/2000/svg"><path d="m2.2 20c1 0 1.7-.5 2.4-.9.6-.3 1.2-.7 1.9-1 3.2-1.7 6.4-3.5 9.6-5.3 1-.5 2.3-1 3-1.9.2-.3.5-.7.4-1.2-.3-1.1-1.7-1.5-2.6-2-2.2-1.2-4.5-2.5-6.7-3.7-.8-.5-2-1.4-3-.7-.4.2-.6.4-.7.7-.1.4 0 .9 0 1.3v3.2c0 .9-.1 1.6.5 2 .2.1.6.2.9.1 1-.4.7-2.2.7-3.6v-1.1c1.7.9 3.4 1.8 5.1 2.6.6.3 1.6.6 1.8 1.4.2.9-1.7 1.6-2.3 1.9l-6.9 3.9c-.5.3-1.8 1.3-2.6 1-.3-.1-.5-.4-.5-.6-.1-.4-.1-1-.1-1.5v-3.2-5.4c0-.8-.1-1.8.2-2.3.7-1 2.3.8 2.8-.8.1-.4-.1-.8-.3-1-.4-.6-2.2-1.5-2.9-1.7-.2-.1-.7-.2-1-.2-1.7.3-1.3 3-1.3 5v9.9c0 1.5-.2 3.5.4 4.4.3.5.6.5 1.2.7zm5.2-6.5c1.5 0 1.6-1.9.2-2.2-.8-.1-1.4.7-1.2 1.4.2.5.5.6 1 .8z" fill="#fff"/></svg> Do not sell my personal data!
        `,N.appendChild(O),r.appendChild(N);let z=document.createElement("inta-consents-ccpa-popup");z.setAttribute("class","intastellarCCPApopup");let R=document.createElement("section");R.setAttribute("class","intastellarCCPApopup__content"),void 0!=window.INTA.settings.ccpa.collection?R.innerHTML=`
            <h2><svg class="intastellarCCPA__icon" width="18px" height="19px" viewBox=".2 0 19.4 20" width="13" xmlns="http://www.w3.org/2000/svg"><path d="m2.2 20c1 0 1.7-.5 2.4-.9.6-.3 1.2-.7 1.9-1 3.2-1.7 6.4-3.5 9.6-5.3 1-.5 2.3-1 3-1.9.2-.3.5-.7.4-1.2-.3-1.1-1.7-1.5-2.6-2-2.2-1.2-4.5-2.5-6.7-3.7-.8-.5-2-1.4-3-.7-.4.2-.6.4-.7.7-.1.4 0 .9 0 1.3v3.2c0 .9-.1 1.6.5 2 .2.1.6.2.9.1 1-.4.7-2.2.7-3.6v-1.1c1.7.9 3.4 1.8 5.1 2.6.6.3 1.6.6 1.8 1.4.2.9-1.7 1.6-2.3 1.9l-6.9 3.9c-.5.3-1.8 1.3-2.6 1-.3-.1-.5-.4-.5-.6-.1-.4-.1-1-.1-1.5v-3.2-5.4c0-.8-.1-1.8.2-2.3.7-1 2.3.8 2.8-.8.1-.4-.1-.8-.3-1-.4-.6-2.2-1.5-2.9-1.7-.2-.1-.7-.2-1-.2-1.7.3-1.3 3-1.3 5v9.9c0 1.5-.2 3.5.4 4.4.3.5.6.5 1.2.7zm5.2-6.5c1.5 0 1.6-1.9.2-2.2-.8-.1-1.4.7-1.2 1.4.2.5.5.6 1 .8z" fill="#000"/></svg> Do not sell my personal data!</h2><button class="intastellarCCPA__popupClose">X</button>
            <p>This section is about our California Consumer Privacy Act.</p>
            ${createCCPAPolicyLink(f)}
            <h3>Personal data we collect:</h3>
            <ul>
                <li>IP-Address</li>
                ${window.INTA.settings.ccpa.collection.map(t=>"<li>"+t.charAt(0).toUpperCase()+t.slice(1)+"</li>").join("")}
            </ul>
            `:R.innerHTML=`
            <h2><svg class="intastellarCCPA__icon" width="18px" height="19px" viewBox=".2 0 19.4 20" width="13" xmlns="http://www.w3.org/2000/svg"><path d="m2.2 20c1 0 1.7-.5 2.4-.9.6-.3 1.2-.7 1.9-1 3.2-1.7 6.4-3.5 9.6-5.3 1-.5 2.3-1 3-1.9.2-.3.5-.7.4-1.2-.3-1.1-1.7-1.5-2.6-2-2.2-1.2-4.5-2.5-6.7-3.7-.8-.5-2-1.4-3-.7-.4.2-.6.4-.7.7-.1.4 0 .9 0 1.3v3.2c0 .9-.1 1.6.5 2 .2.1.6.2.9.1 1-.4.7-2.2.7-3.6v-1.1c1.7.9 3.4 1.8 5.1 2.6.6.3 1.6.6 1.8 1.4.2.9-1.7 1.6-2.3 1.9l-6.9 3.9c-.5.3-1.8 1.3-2.6 1-.3-.1-.5-.4-.5-.6-.1-.4-.1-1-.1-1.5v-3.2-5.4c0-.8-.1-1.8.2-2.3.7-1 2.3.8 2.8-.8.1-.4-.1-.8-.3-1-.4-.6-2.2-1.5-2.9-1.7-.2-.1-.7-.2-1-.2-1.7.3-1.3 3-1.3 5v9.9c0 1.5-.2 3.5.4 4.4.3.5.6.5 1.2.7zm5.2-6.5c1.5 0 1.6-1.9.2-2.2-.8-.1-1.4.7-1.2 1.4.2.5.5.6 1 .8z" fill="#000"/></svg> Do not sell my personal data!</h2><button class="intastellarCCPA__popupClose">X</button>
            <h3>Personal data we collect:</h3>
            <p>This section is about our California Consumer Privacy Act.</p>
            <ul>
                <li>IP-Address</li>
            </ul>
            `,z.appendChild(R),r.appendChild(z)}else if(!isValidCCPALink()&&"ccpa"in window.INTA.settings&&"true"===window.INTA.settings.ccpa.on)throw new IntastellarSolutionsSDK("Please add your valid 'California Consumer Privacy Act' url to the banner. Read more at https://www.intastellarsolutions.com/gdpr-cookiebanner");h.setAttribute("class","intastellarCookie-settings__content");let G="";-1==window.location.host.indexOf("intastellarsolutions")&&(G="<span class='intastellarCookie-settings__poweredBy' alt='This cookie banner is powered by Intastellar Solutions, International'>Powered by <a class='intastellarCookie-settings__poweredByLink' href='https://www.intastellarsolutions.com/gdpr-cookiebanner?utm_source="+encodeURI(window.location.href)+"&utm_content=powered_by&utm_medium=referral&utm_campaign="+pluginSource+"&utm_term=gdpr_banner_logo' target='_blank' rel='noopener'><img class='intastellarCookie-settings__poweredByImg' width='189px' height='50px' src='https://www.intastellarsolutions.com/assets/intastellar_solutions.svg' alt='Intastellar Solutions, International'></a></span>");let H=x==intCookieIcon?" intastellarIcon":"",B=x==intCookieIcon?"Cookie Icon":`${document.domain} logo`;o.innerHTML=`
        <img class="intSettingsCompanyLogo${H}" width="150px" height="auto" src="${x}" alt="${B}">
        <section class="intSettingsPoweredBy">${G}</section>`,h.innerHTML='<intHeader class="intastellarCookie-settings__intHeader"><img src="'+x+'" alt="'+B+'" title="'+B+'" style="width: 100%;float: left; max-width: 50px;max-height: 50px;object-fit:contain;"><h2>Cookie</h2><button class="intastellarCookie-settings__close" style="background: '+S+';" aria-label="Close cookie banner"></button></intHeader>'+t+e+G,g.appendChild(h),window.INTA.settings.advanced&&i.appendChild(g),i.setAttribute("class","intastellarCookie-settings"),n.innerHTML='<img class="intCookieIcon-openSettings" style="filter: invert(1);" src="'+intCookieIcon+'" alt="Cookie Icon">'+D+" "+E,i.appendChild(n),s.appendChild(a),r.appendChild(i),r.appendChild(s),document.body.appendChild(r),null!=document.querySelector(".intastellarCCPAContainer")&&document.querySelector(".intastellarCCPAContainer").addEventListener("click",function(){document.querySelector(".intastellarCCPApopup").classList.toggle("--active")})}