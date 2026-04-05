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
    this.vendorLegitimateInterests = [];
    // TCF 2.3: which vendors were disclosed to the user (shown in CMP). Same length as vendorConsents, 1 = disclosed.
    this.disclosedVendors = [];
  }

  /**
   * Encode the TCF 2.3 Disclosed Vendors segment (segment type 1).
   * @param {number} maxVendorId - highest vendor ID disclosed
   * @param {boolean[]} disclosed - disclosed[i] = true if vendor i+1 was disclosed to user
   * @returns {string} base64url-encoded segment (no dot)
   */
  function encodeDisclosedVendorsSegment(maxVendorId, disclosed) {
    if (maxVendorId <= 0) return '';
    let bits = '';
    bits += padBits(1, 3);   // segment type 1 = vendorsDisclosed (TCF 2.3)
    bits += padBits(maxVendorId, 16);
    for (let i = 0; i < maxVendorId; i++) bits += (disclosed && disclosed[i]) ? '1' : '0';
    let bytes = [];
    for (let i = 0; i < bits.length; i += 8) bytes.push(parseInt(bits.substr(i, 8).padEnd(8, '0'), 2));
    return base64UrlEncode(bytes);
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
      bits += padBits(3, 6); // TCFPolicyVersion 3 = TCF 2.3
      bits += padBits(0, 1); // IsServiceSpecific
      bits += padBits(0, 1); // UseNonStandardStacks
      bits += padBits(0, 12); // SpecialFeatureOptIns
      // PurposeConsents (24 bits)
      for (let i = 0; i < 24; i++) bits += tcModel.purposeConsents && tcModel.purposeConsents[i] ? "1" : "0";
      // PurposeLegitInterests (24 bits, all 0)
      bits += "0".repeat(24);
      bits += padBits(0, 1); // PurposeOneTreatment
      bits += strToBits("EN"); // PublisherCC
      // VendorConsents: maxVendorId from actual array length (GVL can have hundreds of vendors)
      var maxVendorId = Math.max(1, (tcModel.vendorConsents && tcModel.vendorConsents.length) || (tcModel.disclosedVendors && tcModel.disclosedVendors.length) || 1);
      maxVendorId = Math.min(maxVendorId, 65536);
      bits += padBits(maxVendorId, 16);
      for (let i = 0; i < maxVendorId; i++) bits += tcModel.vendorConsents && tcModel.vendorConsents[i] ? "1" : "0";
      // Convert bits to bytes
      let bytes = [];
      for (let i = 0; i < bits.length; i += 8) {
        bytes.push(parseInt(bits.substr(i, 8).padEnd(8, "0"), 2));
      }
      var coreString = base64UrlEncode(bytes);
      // TCF 2.3: append mandatory Disclosed Vendors segment (as of Feb 28, 2026)
      var disclosed = tcModel.disclosedVendors && tcModel.disclosedVendors.length >= maxVendorId
        ? tcModel.disclosedVendors.slice(0, maxVendorId)
        : (tcModel.vendorConsents || []).slice(0, maxVendorId).map(function() { return true; }); // default: all disclosed
      var disclosedSegment = encodeDisclosedVendorsSegment(maxVendorId, disclosed);
      return disclosedSegment ? coreString + "." + disclosedSegment : coreString;
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
