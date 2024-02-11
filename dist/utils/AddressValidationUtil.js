"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressValidationUtil = void 0;
const tslib_1 = require("tslib");
const api_1 = tslib_1.__importDefault(require("@easypost/api"));
let log = console.log;
class AddressValidationUtil {
    apiKey;
    client;
    constructor() {
        this.apiKey = process.env.EASYPOST_API_KEY || "";
        this.client = new api_1.default(this.apiKey);
    }
    async validateAddress(address) {
        let wrappedAddress;
        let verificationResult;
        try {
            wrappedAddress = await this.client.Address.create(address);
        }
        catch (error) {
            throw error;
            //throw new Error("UTIL: Failed to wrap address");
        }
        try {
            verificationResult = await this.client.Address.verifyAddress(wrappedAddress.id);
        }
        catch (error) {
            log("addrVer ", error.code);
            log("addrVer ", error.errors);
            throw new Error("AddrValError: Failed to verify address");
        }
        log("verifRes", verificationResult);
        const isInvalid = !verificationResult.verifications.delivery.success;
        if (isInvalid) {
            return { code: "ERROR", data: null };
        }
        const isDifferent = !this.compareAddresses(address, verificationResult);
        log("comparison", isDifferent);
        if (!isDifferent) {
            return { code: "OK", data: null };
        }
        const suggestedAddress = {
            street1: verificationResult.street1 || "",
            street2: null,
            city: verificationResult.city || "",
            state: verificationResult.state || "",
            zip: verificationResult.zip || "",
            country: verificationResult.country || ""
        };
        return { code: "SUSPEND", data: suggestedAddress };
    }
    compareAddresses(address, verificationResult) {
        log("cmprAddr ", address);
        log("cmprAddr ", verificationResult);
        return (address.street1.toLowerCase() ===
            verificationResult.street1.toLowerCase() &&
            address.city.toLowerCase() === verificationResult.city.toLowerCase() &&
            address.state.toLowerCase() === verificationResult.state.toLowerCase() &&
            address.zip.toLowerCase() === verificationResult.zip.toLowerCase() &&
            address.country.toLowerCase() === verificationResult.country.toLowerCase());
    }
}
exports.AddressValidationUtil = AddressValidationUtil;
//# sourceMappingURL=AddressValidationUtil.js.map