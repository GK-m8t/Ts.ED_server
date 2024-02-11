"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoCheckoutUtil = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const constants_1 = require("../constants");
class CryptoCheckoutUtil {
    apiKey;
    constructor() {
        this.apiKey = process.env.COINBASE_API_KEY;
    }
    async createSession(tokenId, account, cost) {
        const requestData = JSON.stringify({
            name: `${tokenId}`,
            description: "test description",
            pricing_type: "fixed_price",
            local_price: {
                amount: cost,
                currency: "USD"
            },
            metadata: {
                customer_id: `${tokenId}`,
                customer_name: account.address
            },
            redirect_url: constants_1.Governance.PAYMENT_SUCCESS_REDIRECT_URL,
            cancel_url: constants_1.Governance.PAYMENT_CANCEL_REDIRECT_URL
        });
        const config = {
            method: "post",
            url: "https://api.commerce.coinbase.com/charges",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CC-Version": "2018-03-22",
                "X-CC-Api-Key": this.apiKey
            },
            data: requestData
        };
        let session;
        try {
            session = await (0, axios_1.default)(config);
        }
        catch (error) {
            throw error;
        }
        return session.data.data;
    }
}
exports.CryptoCheckoutUtil = CryptoCheckoutUtil;
//# sourceMappingURL=CryptoCheckoutUtil.js.map