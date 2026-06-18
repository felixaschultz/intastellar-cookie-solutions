(function () {
    var L = window.intastellarSupportedLanguages && window.intastellarSupportedLanguages.thai;
    if (!L) {
        return;
    }
    var arrangeWord = (window.INTA && window.INTA.settings && window.INTA.settings.arrange == "ltr") ? "ล่างซ้าย" : "ล่างขวา";
    window.__intaCmpLocalePayload = {
        slug: "th",
        cookieSettingsLabel: "การตั้งค่า Cookie",
        showHideDetails: "แสดงรายละเอียด",
        acceptLabel: "ยอมรับทั้งหมด",
        acceptShortLabel: "ยอมรับทั้งหมด",
        declineLabel: "ปฏิเสธทั้งหมด",
        settingsLabel: "การตั้งค่า",
        policyLinkLabel: "นโยบายความเป็นส่วนตัวและคุกกี้ของเรา",
        bannerMessage: "เมื่อคุณยอมรับคุกกี้ทั้งหมด คุณช่วยให้ " + document.domain + " พัฒนาโซลูชันที่ดียิ่งขึ้นสำหรับคุณ</p><p>เลือกว่าต้องการอนุญาตเฉพาะคุกกี้ที่จำเป็นเท่านั้น หรืออนุญาตคุกกี้ทั้งหมด",
        settingsMessage: "<h3 style=\"    font-size: 25px;\">คุณควบคุมข้อมูลของคุณได้</h3>"
            + "<p>เราและพันธมิตรที่เชื่อถือได้ใช้เทคโนโลยี เช่น คุกกี้ เพื่อรวบรวมข้อมูลของคุณเพื่อวัตถุประสงค์ต่าง ๆ รวมถึง:</p>"
            + "<ol>"
            + "<li>การทำงาน</li>"
            + "<li>การวิเคราะห์</li>"
            + "<li>โฆษณา</li>"
            + "</ol>"
            + "<p>เมื่อคลิก 'ยอมรับ' แสดงว่าคุณให้ความยินยอมต่อวัตถุประสงค์ทั้งหมดนี้ หรือคุณสามารถเลือกเฉพาะวัตถุประสงค์ที่ต้องการได้โดยทำเครื่องหมายในช่องแล้วคลิก 'บันทึกการตั้งค่า'</p>"
            + "<p>คุณสามารถถอนความยินยอมได้ตลอดเวลาโดยคลิกไอคอนเล็ก ๆ ที่มุม" + arrangeWord + "ของเว็บไซต์</p>",
        settingsMessageSuffix: (window.INTA && window.INTA.settings && window.INTA.settings.popia ? '<button onclick="showPOPIAModal()" class="intastellarCookie-settings__privacyLink">Your Privacy Rights POPIA</button>' : "")
            + (window.INTA && window.INTA.settings && window.INTA.settings.lgpd ? '<button onclick="showLGPDModal()" class="intastellarCookie-settings__privacyLink">Your Privacy Rights LGPD</button>' : "")
            + '<button onClick="showPrivacy()" class="intastellarCookie-settings__privacyLink">Intastellar Solutions, International นโยบายความเป็นส่วนตัว</button>',
        categories: L
    };
})();
