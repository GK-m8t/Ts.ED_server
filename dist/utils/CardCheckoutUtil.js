"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardCheckoutUtil = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const di_1 = require("@tsed/di");
require("@tsed/stripe");
const stripe_1 = require("stripe");
const constants_1 = require("../constants");
let CardCheckoutUtil = class CardCheckoutUtil {
    stripe;
    sessionValidity;
    constructor() {
        this.sessionValidity = constants_1.Governance.CARD_PAYMENT_VALIDITY_IN_SECONDS;
    }
    async createSession(tokenId, account, cost) {
        const now = Math.floor(Date.now() / 1000);
        const expiresAt = now + this.sessionValidity;
        const config = {
            client_reference_id: `${tokenId}`,
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Wagmi"
                        },
                        unit_amount: cost * 100
                    },
                    quantity: 1
                }
            ],
            mode: "payment",
            expires_at: expiresAt,
            success_url: constants_1.Governance.PAYMENT_SUCCESS_REDIRECT_URL,
            cancel_url: constants_1.Governance.PAYMENT_CANCEL_REDIRECT_URL
        };
        let session;
        try {
            session = await this.stripe.checkout.sessions.create(config);
        }
        catch (error) {
            console.log("error", error);
            throw error;
        }
        return session;
    }
};
exports.CardCheckoutUtil = CardCheckoutUtil;
tslib_1.__decorate([
    (0, di_1.Inject)(),
    tslib_1.__metadata("design:type", stripe_1.Stripe)
], CardCheckoutUtil.prototype, "stripe", void 0);
exports.CardCheckoutUtil = CardCheckoutUtil = tslib_1.__decorate([
    (0, common_1.Configuration)({
        stripe: {
            apiKey: process.env.STRIPE_API_KEY || "",
            apiVersion: "2020-08-27"
        }
    }),
    (0, di_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], CardCheckoutUtil);
//# sourceMappingURL=CardCheckoutUtil.js.map