(function () {
    var L = window.intastellarSupportedLanguages && window.intastellarSupportedLanguages.greek;
    if (!L) {
        return;
    }
    var arrangeWord = (window.INTA && window.INTA.settings && window.INTA.settings.arrange == "ltr") ? "αριστερή" : "δεξιά";
    window.__intaCmpLocalePayload = {
        slug: "el",
        cookieSettingsLabel: "Ρυθμίσεις Cookies",
        showHideDetails: "Εμφάνιση λεπτομερειών",
        acceptLabel: "Αποδοχή",
        acceptShortLabel: "Αποδοχή",
        declineLabel: "Απόρριψη",
        settingsLabel: "Ρυθμίσεις",
        policyLinkLabel: "Η Πολιτική Απορρήτου και Cookies μας",
        bannerMessage: "Αποδεχόμενοι όλα τα cookies, υποστηρίζετε το " + document.domain + " στην ανάπτυξη μιας καλύτερης λύσης για εσάς.</p><p>Επιλέξτε αν θέλετε να επιτρέψετε μόνο τα απαραίτητα cookies ή αν θέλετε να επιτρέψετε όλα τα cookies.",
        settingsMessage: "<h3 style=\"    font-size: 25px;\">Είστε σε έλεγχο</h3>"
            + "<p>Εμείς και οι επιχειρηματικοί μας συνεργάτες χρησιμοποιούμε τεχνολογίες, όπως τα cookies, για να συλλέγουμε πληροφορίες για"
            + "εσάς για διάφορους σκοπούς, συμπεριλαμβανομένων:</p>"
            + "<ol>"
            + "<li>Λειτουργικότητα</li>"
            + "<li>Στατιστικά</li>"
            + "<li>Διαφήμιση</li>"
            + "</ol>"
            + "<p>Κάνοντας κλικ στο \"Αποδοχή\", συναινείτε σε όλους αυτούς τους σκοπούς. Μπορείτε επίσης να επιλέξετε τους συγκεκριμένους σκοπούς στους οποίους συμφωνείτε, επιλέγοντας τα πλαί"
            + "ς δίπλα στον σκοπό και κάνοντας κλικ στο \"Αποθήκευση ρυθμίσεων\".</p>"
            + "<p>Μπορείτε να ανακαλέσετε τη συγκατάθεσή σας ανά πάσα στιγμή κάνοντας κλικ στο μικρό εικονίδιο στην κάτω " + arrangeWord + " γωνία της ιστοσελίδας.</p>",
        settingsMessageSuffix: '<button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International πολιτική απορρήτου</button>',
        categories: L
    };
})();
