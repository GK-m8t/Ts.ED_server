"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressValidationService = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
class AddressValidationService {
    apiKey;
    apiUrl;
    constructor() {
        this.apiKey = process.env.EASYPOST_API_KEY || "";
        this.apiUrl = "https://api.easypost.com/v2/addresses/verify"; // Replace with EasyPost API endpoint
    }
    async validateAddress(address) {
        try {
            const response = await axios_1.default.post(this.apiUrl, {
                verify: ["delivery"],
                address: {
                    street1: address.street,
                    city: address.city,
                    state: address.state,
                    zip: address.zip,
                    country: address.country
                }
            }, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`
                }
            });
            console.log(response.data);
            // Check the response from EasyPost
            console.log("Address validation response:", response.data.address);
            console.log("Address validation response:", response.data.address.verifications);
            if (response.data.address.verifications.delivery.success) {
                if (address.street === response.data.address.street1 &&
                    address.city === response.data.address.city &&
                    address.state === response.data.address.state &&
                    address.zip === response.data.address.zip &&
                    address.country === response.data.address.country) {
                    // Address is valid
                    return {
                        addressValidation: true,
                        addressSuggestion: {
                            street: "",
                            city: "",
                            state: "",
                            zip: "",
                            country: ""
                        }
                    };
                }
                else {
                    // Address is invalid with api returning suggested correct address
                    return {
                        addressValidation: false,
                        addressSuggestion: {
                            street: response.data.address.street1,
                            city: response.data.address.city,
                            state: response.data.address.state,
                            zip: response.data.address.zip,
                            country: response.data.address.country
                        }
                    };
                }
            }
            // Address is not valid
            return {
                addressValidation: false,
                addressSuggestion: {
                    street: "",
                    city: "",
                    state: "",
                    zip: "",
                    country: ""
                }
            };
        }
        catch (error) {
            console.error("Error validating address:", error);
            throw error;
        }
    }
}
exports.AddressValidationService = AddressValidationService;
//# sourceMappingURL=AddressValidationService.js.map