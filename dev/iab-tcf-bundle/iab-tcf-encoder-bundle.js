(function(window){
  // Minimal IAB TCF encoder for browser use
  function padBits(num, len) {
    let s = num.toString(2);
    return "0".repeat(len - s.length) + s;
  }
  function strToBits(str) {
    // 2 chars, each 6 bits (A=0, Z=25, a=26, z=51)
    return padBits(str.charCodeAt(0) - 65, 6) + padBits(str.charCodeAt(1) - 65, 6);
  }
  function base64UrlEncode(bytes) {
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  // Minimal TCModel
  function TCModel() {
    this.purposeConsents = [];
    this.vendorConsents = [];
  }

  // Minimal TCString encoder
  var TCString = {
    encode: function(tcModel) {
      // Only supports first 24 purposes and vendors for demo
      let bits = "";
      bits += padBits(2, 6); // Version
      let now = Math.floor(Date.now() / 100); // 0.1s increments
      bits += padBits(now, 36); // Created
      bits += padBits(now, 36); // LastUpdated
      bits += padBits(1, 12); // CmpId
      bits += padBits(1, 12); // CmpVersion
      bits += padBits(0, 6); // ConsentScreen
      bits += strToBits("EN"); // ConsentLanguage
      bits += padBits(1, 12); // VendorListVersion
      bits += padBits(2, 6); // TCFPolicyVersion
      bits += padBits(0, 1); // IsServiceSpecific
      bits += padBits(0, 1); // UseNonStandardStacks
      bits += padBits(0, 12); // SpecialFeatureOptIns
      // PurposeConsents (24 bits)
      for (let i = 0; i < 24; i++) bits += tcModel.purposeConsents && tcModel.purposeConsents[i] ? "1" : "0";
      // PurposeLegitInterests (24 bits, all 0)
      bits += "0".repeat(24);
      bits += padBits(0, 1); // PurposeOneTreatment
      bits += strToBits("EN"); // PublisherCC
      // VendorConsents (maxVendorId=24, 16 bits for maxVendorId, then 24 bits for consents)
      bits += padBits(24, 16);
      for (let i = 0; i < 24; i++) bits += tcModel.vendorConsents && tcModel.vendorConsents[i] ? "1" : "0";
      // Convert bits to bytes
      let bytes = [];
      for (let i = 0; i < bits.length; i += 8) {
        bytes.push(parseInt(bits.substr(i, 8).padEnd(8, "0"), 2));
      }
      return base64UrlEncode(bytes);
    },
    decode: function(tcString) {
      // Not implemented in minimal version
      return null;
    }
  };

  window.IABTCF = {
    TCModel: TCModel,
    TCString: TCString
  };
})(window);
