function createCookieSettings() {
    let message = "";
    let cookieBtn = "";
    const banner = document.createElement("inta-consents-settings-btn");
    const bannerContent = document.createElement("button");

    const moreSettings = document.createElement("inta-consents-banner");
    const moreSettingsContent = document.createElement("section");
    const moreintHeader = document.createElement("intheader");
    const moreContentText = document.createElement("section");
    const moreFooter = document.createElement("footer");

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

    const testSection = document.createElement("section");
    testSection.setAttribute("class", "intastellarCookieConstents__contentC");
    testSection.appendChild(moreintHeader);

    testSection.appendChild(moreContentText);

    moreSettingsContent.appendChild(intastellarCookieConstents__Container);
    intastellarCookieConstents__Container.appendChild(testSection);
    intastellarCookieConstents__Container.appendChild(moreFooter);

    const cookieSettings = document.createElement("article");
    const cookieSettingsContent = document.createElement("section");

    bannerContent.setAttribute("class", "intastellarCookie-settingsContainer");
    bannerContent.setAttribute("title", intastellarCookieLanguageSettings);
    cookieSettings.setAttribute("class", "intastellarCookie-settings__container");
    const arrange = window.INTA.settings === undefined || window.INTA.settings.arrange === undefined ? "" : window.INTA.settings.arrange;

    if (arrange == "ltr") {
        bannerContent.classList.add("intastellarCookie-settingsContainer--otherSide");
        cookieSettings.classList.add("intastellarCookie-settings__container--otherSide");
    }
    
    /* cookieSettings.style.opacity = "0"; */
    /* bannerContent.setAttribute("class","intastellarCookie-settingsContainer");
    bannerContent.setAttribute("title", "Cookie Settings"); */

    /* - - - Set the intastellarCookieLanguageuage dependent messages */

    const messages = {
        danish: "Ved at acceptere alle cookies understøtter du " + document.domain + " med at udvikle en bedre løsning til dig.</p><p>Vælg om du vil tillade kun de nødvendige cookies eller om du vil tillade alle cookies.",
        german: "Wenn Sie auf akzeptieren klicken, unterstützen Sie " + document.domain + " bei der Weiterentwicklung von unserer Webseite.</p><p>Wählen Sie zwischen alle Cookies akzeptieren oder Ablehnen.",
        english: "By accepting all cookies, you support " + document.domain + " in developing a better solution for you. </p><p> Select whether you want to allow only the necessary cookies or whether you want to allow all cookies."
    };
    const messageWrapStart = "<div class='intastellarCookie-settings__contentConatiner'><p>";
    const messageWrapEnd = "</p></div>";

    const settingsMessages = {
        danish: `<h3 style="    font-size: 25px;">Du bestemmer over dine data</h3>
        <p>Vi og vores samarbejdspartnere bruger teknologier, herunder cookies, til at indsamle oplysninger om dig til forskellige formål, herunder:</p>
        <ol>
            <li>Funktionel / Præference</li>
            <li>Statistiske</li>
            <li>Marketing</li>
        </ol>
        <p>Ved at trykke på 'Accepter' giver du samtykke til alle disse formål. Du kan også vælge at tilkendegive, hvilke formål du vil give samtykke til ved at benytte checkboksene ud for formålet, og derefter trykke på 'Gem indstillinger'.
        Du kan til enhver tid trække dit samtykke tilbage ved at trykke på det lille ikon nederst i ${(window.INTA.arrange == "ltr") ? "venstre" : "højre"} hjørne af hjemmesiden.</p>
        <p>Du kan læse mere om vores brug af cookies og andre teknologier, samt om vores indsamling og behandling af personoplysninger ved at trykke på linket.</p>
        ${generatePolicyUrl('Vores privat og cookie politik')}
        <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International privat politik</button>`,
        german: `<h3 style="    font-size: 25px;">Sie haben die Kontrolle über Ihre Daten</h3>
        <p>Wir und unsere Geschäftspartner nutzen Technologien wie Cookies dazu, personenbezogene Informationen für verschiedene Zwecke zu sammeln, darunter:</p>
        <ol>
            <li>Funktionel / Präferenz</li>
            <li>Statistik</li>
            <li>Werbung</li>
        </ol>
        <p>Wenn Sie auf „Akzeptieren“ klicken, erteilen Sie Ihre Einwilligung für alle diese Zwecke. Sie können auch entscheiden, welchen Zwecken Sie zustimmen, indem Sie das Kästchen neben dem Zweck anklicken und auf „Speichern“ klicken.</p>
        <p>Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie auf das kleine Symbol unten in der ${(window.INTA.arrange == "ltr") ? "linken" : "rechten"} Ecke klicken.</p>
        ${generatePolicyUrl('Unsere Datenschutz Erklährung und Cookie politik')}
        <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International Datenschutz erklährung</button>`,
        english: `<h3 style="    font-size: 25px;">You´re in control</h3>
        <p>We and our business partners uses technologies, including cookies, to collect information about you for various purposes, including:</p>
        <ol>
            <li>Functional / Preference</li>
            <li>Statistical</li>
            <li>Advertisement</li>
        </ol>
        <p>By clicking 'Accept', you give your consent for all these purposes. You can also choose to specify the purposes you consent to by ticking the checkbox next to the purpose and clicking 'Save settings'.</p>
        <p>You may withdraw your consent at any time by clicking the small icon at the bottom ${(window.INTA.arrange == "ltr") ? "left" : "right"} corner of the website.</p>
        ${generatePolicyUrl('Our Privacy and cookie Policy')}
        <button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International privacy policy</button>` 
    }

    if (intastellarCookieLanguage != null && intastellarCookieLanguage === "da" || intastellarCookieLanguage === "da-DK") {
        settingsMessage = settingsMessages.danish;
        intastellarShowHideDetailsText = "Vis detaljer";
        message =
            messageWrapStart
            + messages.danish
            + messageWrapEnd
            + generatePolicyUrl('Vores privat og cookie politik');
        cookieBtn = generateCookieButtons('Accepter', 'Afvis', 'Indstillinger');
        moreFooter.innerHTML =
            `
                <section class="intCookieSaveSettingsContainer">
                    ${generateCookieSettingsButton(saveSettings.danish, 'Accepter')}
                    <button class="intLearnMoreBtn">${intastellarShowHideDetailsText}</button>
                </section>
                <section class="intastellar_privacyPolicy"></section>
                <article class="intReadMore">
                    <section class="required">
                        <h3 class="intaExpandCookieList">Nødvendige <i class="intastellar__arrow"></i></h3>
                        <p>Påkrævede webteknologier og cookies gør vores hjemmeside teknisk tilgængelig for og brugbar for dig. Dette gælder grundlæggende basisfunktioner såsom navigation på hjemmesiden, korrekt visning i din internetbrowser eller anmodning om dit samtykke. Uden disse webteknologier og cookies fungerer vores hjemmeside ikke.</p>
                        <article class="intaCookieListOverview">
                            ${
                                listAllCookies(inta_requiredCookieList)
                            }
                        </article>
                    </section>
                    <section>
                        <h3 class="intaExpandCookieList">Funktionel / Præference <i class="intastellar__arrow"></i></h3>
                        <p>Funktionelle cookies gør det muligt at gemme information, der ændrer måden hjemmesiden fremstår eller fungerer på. For eksempel dit foretrukne sprog eller område.</p>
                        <article class="intaCookieListOverview">
                        ${
                            listAllCookies(inta_functionalCookieList)
                        }
                        </article>                 
                    </section>
                    <section>
                        <h3 class="intaExpandCookieList">Statistik <i class="intastellar__arrow"></i></h3>
                        <p>Vi ønsker konstant at forbedre brugervenligheden og ydeevnen på vores hjemmesider. Af denne grund bruger vi analyseteknologier (inklusive cookies), som pseudonymt måler og vurderer, hvilke funktioner og indhold på vores hjemmesider der bruges, hvordan og hvor ofte. På dette grundlag kan vi forbedre vores hjemmesider for brugerne.</p>
                        <article class="intaCookieListOverview">
                        ${
                            listAllCookies(inta_statisticCookieList)
                        }
                        </article>
                    </section>
                    <section>
                        <h3 class="intaExpandCookieList">Marketing <i class="intastellar__arrow"></i></h3>
                        <p>Vi bruger webteknologier (også cookies) fra udvalgte partnere for at kunne vise dig indhold og annoncer, der er specielt skræddersyet til dig på hjemmesider og sociale medier. Dette indhold udvælges og vises på baggrund af din brugsadfærd.</p>
                        <p>Annonce- eller marketingcookies bruges til at give besøgende relevante annoncer og marketingkampagner. Disse cookies sporer besøgende på tværs af websteder og indsamler oplysninger for at levere tilpassede annoncer.</p>
                        <article class="intaCookieListOverview">
                        ${
                            listAllCookies(inta_marketingCookieList)
                        }
                        </article>
                    </section>
                </article>
                <article class="intCookieSetting__form">
                    <section class="intastellarSettings__control">
                        <label class="intSettingDisabled checkMarkContainer">
                            <span class="intSettingsTitle">Nødvendige</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Funktionel</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Statistiske</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Marketing</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                </article>
            `;
    } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "de-DE" || intastellarCookieLanguage === "de") {
        settingsMessage = settingsMessages.german;
        intastellarShowHideDetailsText = "Details einblenden";
        message = messageWrapStart
            + messages.german
            + messageWrapEnd
            + generatePolicyUrl('Unsere Datenschutz Erklährung und Cookie politik');
        cookieBtn = generateCookieButtons('Akzeptieren', 'Ablehnen', 'Einstellungen');
        moreFooter.innerHTML =
        `
            <section class="intCookieSaveSettingsContainer">
                ${generateCookieSettingsButton(saveSettings.german, 'Akzeptieren')}
                <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
            </section>
            <section class="intastellar_privacyPolicy"></section>
            <article class="intReadMore">
                <section class="required">
                    <h3 class="intaExpandCookieList">Erforderliche <i class="intastellar__arrow"></i></h3>
                    <p>Erforderliche Webtechnologien und Cookies machen unsere Website für Sie technisch zugänglich und nutzbar. Dies betrifft grundlegende Basisfunktionalitäten wie die Navigation auf der Website, die korrekte Anzeige in Ihrem Internetbrowser oder das Einholen Ihrer Einwilligung. Ohne diese Webtechnologien und Cookies funktioniert unsere Website nicht.</p>
                    <article class="intaCookieListOverview">
                        ${
                            listAllCookies(inta_requiredCookieList)
                        }
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">Funktionel / Präferenz <i class="intastellar__arrow"></i></h3>
                    <p>Funktionale Cookies ermöglichen es, Informationen zu speichern, die das Erscheinungsbild oder die Handlungen auf der Website ändern können. Dabei könnte es sich um Ihre bevorzugte Sprache oder Region handeln.</p>
                    <article class="intaCookieListOverview">
                    ${
                        listAllCookies(inta_functionalCookieList)
                    }
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">Statistik <i class="intastellar__arrow"></i></h3>
                    <p>Wir möchten die Benutzerfreundlichkeit und Leistung unserer Websites stetig verbessern. Aus diesem Grund verwenden wir Analysetechnologien (einschließlich Cookies), die pseudonym messen und auswerten, welche Funktionen und Inhalte unserer Websites wie und wie oft genutzt werden. Auf dieser Grundlage können wir unsere Websites für die Nutzer verbessern.</p>
                    <article class="intaCookieListOverview">
                    ${
                        listAllCookies(inta_statisticCookieList)
                    }
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">Werbung <i class="intastellar__arrow"></i></h3>
                    <p>Wir verwenden Webtechnologien (auch Cookies) ausgewählter Partner, um Ihnen speziell auf Sie zugeschnittene Inhalte und Werbung auf Webseiten und Social-Media-Seiten anzeigen zu können. Diese Inhalte werden anhand Ihres Nutzungsverhaltens ausgewählt und angezeigt.</p>
                    <p>Werbe- oder Marketing-Cookies werden verwendet, um Besuchern relevante Anzeigen und Marketingkampagnen bereitzustellen. Diese Cookies verfolgen Besucher über Websites hinweg und sammeln Informationen, um angepasste Anzeigen bereitzustellen.</p>
                    <article class="intaCookieListOverview">
                    ${
                        listAllCookies(inta_marketingCookieList)
                    }
                    </article>
                </section>
            </article>
            <article class="intCookieSetting__form">
                    <section class="intastellarSettings__control">
                        <label class="intSettingDisabled checkMarkContainer">
                            <span class="intSettingsTitle">Erforderliche</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Funktionel</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Statistik</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Werbung</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="marketing" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.advertisementCookies : false}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                </article>
        `;
    } else if (intastellarCookieLanguage != null && intastellarCookieLanguage === "en" || intastellarCookieLanguage === "en-GB" || intastellarCookieLanguage === "en-US") {
        settingsMessage = settingsMessages.english;
        intastellarShowHideDetailsText = "Show details";
        message =
            messageWrapStart
            + messages.english
            + messageWrapEnd
            + generatePolicyUrl('Our Privacy and cookie Policy');
        cookieBtn = generateCookieButtons('Accept', 'Decline All', 'Settings');
        moreFooter.innerHTML =
        `
            <section class="intCookieSaveSettingsContainer">
                ${generateCookieSettingsButton(saveSettings.english, 'Accept')}
                <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
            </section>
            <section class="intastellar_privacyPolicy"></section>
            <article class="intReadMore">
                <section class="required">
                    <h3 class="intaExpandCookieList">Strictly necessary <i class="intastellar__arrow"></i></h3>
                    <p>Required web technologies and cookies make our website technically accessible to and usable for you. This applies to fundamental base functionalities such as navigation on the website, correct display in your internet browser or requesting your consent. Without these web technologies and cookies our website does not work.</p>
                    <article class="intaCookieListOverview">
                    ${
                        listAllCookies(inta_requiredCookieList)
                    }
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">Functional / Preference <i class="intastellar__arrow"></i></h3>
                    <p>Functional cookies make it possible to save information that changes the way the website appears or acts. For instance your preferred language or region.</p>
                    <article class="intaCookieListOverview">
                    ${
                        listAllCookies(inta_functionalCookieList)
                    }
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">Statics <i class="intastellar__arrow"></i></h3>
                    <p>We want to constantly improve the user-friendliness and performance of our websites. For this reason we use analysis technologies (including cookies) which pseudonymously measure and evaluate which functions and content of our websites are used, how and how often. On this basis we can improve our websites for users.</p>
                    <article class="intaCookieListOverview">
                    ${
                        listAllCookies(inta_statisticCookieList)
                    }
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">Advertisement <i class="intastellar__arrow"></i></h3>
                    <p>We use web technologies (also cookies) from selected partners in order to be able to show you content and advertising specially tailored to you on websites and social media sites. This content is selected and displayed on the basis of your usage behaviour.</p>
                    <p>Advertisement or Marketing cookies are used to provide visitors with relevant ads and marketing campaigns. These cookies track visitors across websites and collect information to provide customized ads.</p>
                    <article class="intaCookieListOverview">
                    ${
                        listAllCookies(inta_marketingCookieList)
                    }
                    </article>
                </section>
            </article>
            <article class="intCookieSetting__form">
                    <section class="intastellarSettings__control">
                        <label class="intSettingDisabled checkMarkContainer">
                            <span class="intSettingsTitle">Strictly necessary</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Functional</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Statics</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Advertisement</span>
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
        settingsMessage = settingsMessages.danish;
        intastellarShowHideDetailsText = "Vis detaljer";
        message =
            messageWrapStart
            + messages.danish
            + messageWrapEnd
            + generatePolicyUrl('Vores privat og cookie politik');
        cookieBtn = generateCookieButtons('Accepter', 'Afvis', 'Indstillinger');
        moreFooter.innerHTML =
        `
            <section class="intCookieSaveSettingsContainer">
                ${generateCookieSettingsButton(saveSettings.danish, 'Accepter')}
                <button class="intLearnMoreBtn" >${intastellarShowHideDetailsText}</button>
            </section>
            <section class="intastellar_privacyPolicy"></section>
            <article class="intReadMore">
                <section class="required">
                    <h3 class="intaExpandCookieList">Nødvendige <i class="intastellar__arrow"></i></h3>
                    <p>Påkrævede webteknologier og cookies gør vores hjemmeside teknisk tilgængelig for og brugbar for dig. Dette gælder grundlæggende basisfunktioner såsom navigation på hjemmesiden, korrekt visning i din internetbrowser eller anmodning om dit samtykke. Uden disse webteknologier og cookies fungerer vores hjemmeside ikke.</p>
                    <article class="intaCookieListOverview">
                    ${
                        listAllCookies(inta_requiredCookieList)
                    }
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">Funktionel / Præference <i class="intastellar__arrow"></i></h3>
                    <p>Funktionelle cookies gør det muligt at gemme information, der ændrer måden hjemmesiden fremstår eller fungerer på. For eksempel dit foretrukne sprog eller område.</p>
                    <article class="intaCookieListOverview">
                        ${
                            listAllCookies(inta_functionalCookieList)
                        }
                    </article>  
                </section>
                <section>
                    <h3 class="intaExpandCookieList">Statistik <i class="intastellar__arrow"></i></h3>
                    <p>Vi ønsker konstant at forbedre brugervenligheden og ydeevnen på vores hjemmesider. Af denne grund bruger vi analyseteknologier (inklusive cookies), som pseudonymt måler og vurderer, hvilke funktioner og indhold på vores hjemmesider der bruges, hvordan og hvor ofte. På dette grundlag kan vi forbedre vores hjemmesider for brugerne.</p> 
                    <article class="intaCookieListOverview">
                    ${
                        listAllCookies(inta_statisticCookieList)
                    }
                    </article>
                </section>
                <section>
                    <h3 class="intaExpandCookieList">Marketing <i class="intastellar__arrow"></i></h3>
                    <p>Vi bruger webteknologier (også cookies) fra udvalgte partnere for at kunne vise dig indhold og annoncer, der er specielt skræddersyet til dig på hjemmesider og sociale medier. Dette indhold udvælges og vises på baggrund af din brugsadfærd.</p>
                    <p>Annonce- eller marketingcookies bruges til at give besøgende relevante annoncer og marketingkampagner. Disse cookies sporer besøgende på tværs af websteder og indsamler oplysninger for at levere tilpassede annoncer.</p>
                    <article class="intaCookieListOverview">
                    ${
                        listAllCookies(inta_marketingCookieList)
                    }
                    </article>
                </section>
            </article>
            <article class="intCookieSetting__form">
                    <section class="intastellarSettings__control">
                        <label class="intSettingDisabled checkMarkContainer">
                            <span class="intSettingsTitle">Nødvendige</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" type="checkbox" disabled checked>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Funktionel</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="functional" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.functionalCookies : false}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Statistiske</span>
                            <span class="intCheckmarkSliderContainer">
                                <input class="intCookieSetting__checkbox" id="statics" type="checkbox" ${(getCookie(int_hideCookieBannerName) != "" && getCookie(int_hideCookieBannerName).indexOf("__inta") > -1) ? JSON.parse(decodeIntaConsentsObject(getCookie(int_hideCookieBannerName)?.split(".")[2]))?.consents?.staticsticCookies : false}>
                                <span class="checkmark round"></span>
                            </span>
                        </label>
                    </section>
                    <section class="intastellarSettings__control">
                        <label class="checkMarkContainer">
                            <span class="intSettingsTitle">Marketing</span>
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
    let cookieColor = window.INTA.settings === undefined || window.INTA.settings.color === undefined || window.INTA.settings.color.indexOf("[") > -1 || window.INTA.settings.color === ""  ? "rgba(0, 51, 153, 1)" : window.INTA.settings.color;
    let cookieLogo = window.INTA.settings === undefined || window.INTA.settings.logo === undefined || window.INTA.settings.logo === "" || window.INTA.settings.logo.indexOf("[") > -1 ? intCookieIcon : window.INTA.settings.logo;
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

    const s = document.createElement("style");

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

    let IntastellarToolTip = '<div class="intastellarToolTip '+ position +'">'+ intastellarCookieLanguageSettings +'</div>';
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
    s.innerHTML = ".intastellarCookie-settingsContainer,.intastellarCookieConstents__contentC, .intastellarCookie-settings__btn.--bg, .intastellarCCPAContainer{background: " + cookieColor + " !important;color: #fff !important;} .intCookie_ConsentLogo-container{border-color: #fff; background: linear-gradient(#fff 0 0) padding-box, "+cookieColor+" border-box;} .intCookie_ConsentContainer-content{border-color: #fff; background: linear-gradient(#fff 0 0) padding-box, "+cookieColor+" border-box;} .intastellarCookie-settings__btn.--changePermission{background: transparent !important; border-image-slice: 1;border-color: "+cookieColor+";border-image:" + cookieColor + " 1 !important; border-width: 3px; border-style: solid; transition: background .25s ease-in-out; width: max-content; margin-inline: auto !important;} .intastellarCookie-settings__btn.--changePermission:hover{background: "+cookieColor+" !important; color: #fff !important;} .intCookieSetting__checkbox:checked ~ .checkmark{background: "+ checkMarkColor +";}.intastellarCCPA__popupClose{background:"+ cookieColor +"; color: #fff;} .intastellarCookie-settings__btn.--bg:hover{background: " + brightColor + " !important;}.intastellarCookie-settings__close:hover{background: " + brightColor + " !important;} .intastellarCookieConstents__content-main .intastellarCookie-settings__privacyLink{color: #fff !important;} .intastellarCookie-settings__privacyLink{text-decoration: underline !important;}.intastellarCookie-settings__content .intastellarCookie-settings__privacyLink{color: "+cookieTextColor+";}.intastellarCookie-settings__content p{color: " + cookieTextColor + " !important;}.intastellarCookie-settings__intHeader{color:" + cookieTextColor + " !important;}.intastellarCookie-settings__container{background-color: " + backgroundColor + " !important;} .intastellarCookie-settingsMoreContainer{display:none;position: fixed; top: 50%; left: 50%; background: #fff; padding: 15px;z-index: 1000; transform: translate(-50%,-50%);}" + withText;
    intHead.appendChild(s);

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
        document.body.appendChild(intastellarCCPAContainer);


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
        }else{
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
        document.body.appendChild(intastellarCCPApopup);
        document.querySelector(".intastellarCCPAContainer").addEventListener("click", function () {
            document.querySelector(".intastellarCCPApopup").classList.toggle("--active");
        })
    } else if (!isValidCCPALink() && "ccpa" in window.INTA.settings && window.INTA.settings.ccpa.on === "true") {
        throw new IntastellarSolutionsSDK("Please add your valid 'California Consumer Privacy Act' url to the banner. Read more at https://www.intastellarsolutions.com/gdpr-cookiebanner");
    }

    cookieSettingsContent.setAttribute("class", "intastellarCookie-settings__content");
    let poweredBy = "";
    if (window.location.host.indexOf("intastellarsolutions") == -1) {
        poweredBy = "<span class='intastellarCookie-settings__poweredBy' alt='This cookie banner is powered by Intastellar Solutions, International'>Powered by <a class='intastellarCookie-settings__poweredByLink' href='https://www.intastellarsolutions.com/gdpr-cookiebanner?utm_source=" + encodeURI(window.location.href) + "&utm_content=powered_by&utm_medium=referral&utm_campaign=" + pluginSource + "&utm_term=gdpr_banner_logo' target='_blank' rel='noopener'><img class='intastellarCookie-settings__poweredByImg' width='189px' height='50px' src='https://www.intastellarsolutions.com/assets/intastellar_solutions.svg' alt='Intastellar Solutions, International'></a></span>";
    }
    
    let intCookieIconSmallClass = cookieLogo == intCookieIcon ? " intastellarIcon" : "";
    let CompanyLogoName = cookieLogo == intCookieIcon ? "Cookie Icon" : `${document.domain} logo`;

    moreintHeader.innerHTML = `
        <img class="intSettingsCompanyLogo${intCookieIconSmallClass}" width="150px" height="auto" src="${cookieLogo}" alt="${CompanyLogoName}">
        <section class="intSettingsPoweredBy">${poweredBy}</section>`;
    
    cookieSettingsContent.innerHTML = '<intHeader class="intastellarCookie-settings__intHeader"><img src="' + cookieLogo + '" alt="' + CompanyLogoName + '" title="' + CompanyLogoName + '" style="width: 100%;float: left; max-width: 50px;max-height: 50px;object-fit:contain;"><h2>Cookie</h2><button class="intastellarCookie-settings__close" style="background: ' + cookieColor + ';" aria-label="Close cookie banner"></button></intHeader>' +
        message + cookieBtn + "" + poweredBy;
    
    cookieSettings.appendChild(cookieSettingsContent);

    if(window.INTA.settings.advanced){
        banner.appendChild(cookieSettings);
    }

    banner.setAttribute("class", "intastellarCookie-settings");

    bannerContent.innerHTML = '<img class="intCookieIcon-openSettings" style="filter: invert(1);" src="'+intCookieIcon+'" alt="Cookie Icon">'+ IntastellarToolTip +' ' + text;

    banner.appendChild(bannerContent);
    moreSettings.appendChild(moreSettingsContent);

    document.body.appendChild(banner);
    document.body.appendChild(moreSettings);
}