"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardPaymentService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const di_1 = require("@tsed/di");
require("@tsed/stripe");
const stripe_1 = require("stripe");
let CardPaymentService = class CardPaymentService {
    stripe;
    constructor() { }
    async createStripeCharge(tokenId, price) {
        const charge = await this.stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `token ${tokenId}`
                        },
                        unit_amount: price * 100
                    },
                    quantity: 1
                }
            ],
            mode: "payment",
            success_url: `http://localhost:8083/success.html`,
            cancel_url: `http://localhost:8083/cancel.html`
        });
        // console.log((charge as any).created);
        return {
            payment_url: charge.url,
            timestamp: charge.created
        };
    }
};
exports.CardPaymentService = CardPaymentService;
tslib_1.__decorate([
    (0, di_1.Inject)(),
    tslib_1.__metadata("design:type", stripe_1.Stripe)
], CardPaymentService.prototype, "stripe", void 0);
exports.CardPaymentService = CardPaymentService = tslib_1.__decorate([
    (0, common_1.Configuration)({
        stripe: {
            apiKey: process.env.STRIPE_API_KEY || "",
            apiVersion: "2020-08-27"
        }
    }),
    (0, di_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], CardPaymentService);
//# sourceMappingURL=CardPaymentService.js.map