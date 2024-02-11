"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutService = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const types_1 = require("../../types"); // Import the PaymentMethod enum from your types file
const utils_1 = require("../../utils");
let CheckoutService = class CheckoutService {
    cardUtil;
    cryptoUtil;
    orderBook;
    constructor() { }
    async createSession(tokenId, account, paymentMethod) {
        let session;
        let util;
        let isCard = paymentMethod === types_1.PaymentMethod.card;
        util = isCard ? this.cardUtil : this.cryptoUtil;
        try {
            const order = await this.orderBook.findOne({
                tokenId: tokenId
            });
            if (!order) {
                throw new Error("Order doesn't exist.");
            }
            else if (order.status && order.status.payment) {
                throw new Error("Payment pending or completed.");
            }
            else if (order.account.address.toLowerCase() !== account.address.toLowerCase()) {
                throw new Error("Unauthorized");
            }
            const totalCost = order.cost.print + order.cost.ship;
            session = await util.createSession(tokenId, account, totalCost);
            // order.payment = {
            //   method: paymentMethod,
            //   session: session,
            //   lastEventId: null
            // };
            // order.status = { payment: PaymentStatus.pending, shipping: null };
            // await order.save();
            await this.orderBook.updateOne({ tokenId: tokenId }, {
                $set: {
                    payment: {
                        method: paymentMethod,
                        session: session,
                        lastEventId: null
                    },
                    status: {
                        payment: "PS00",
                        shipping: null
                    }
                }
            });
            if (isCard) {
                return { url: session.url, expiresAt: session.expires_at };
            }
            else {
                return { url: session.hosted_url, expiresAt: session.expires_at };
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getSession(tokenId, account) {
        try {
            const order = await this.orderBook.findOne({
                tokenId: tokenId
            });
            if (!order) {
                throw new Error("Order doesn't exist.");
            }
            else if (!order.payment) {
                throw new Error("Session doesn't exist.");
            }
            else if (order.account.address.toLowerCase() !== account.address.toLowerCase()) {
                throw new Error("Unauthorised");
            }
            // Incomplete implementation.
            return { url: "", expiresAt: new Date() };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.CheckoutService = CheckoutService;
tslib_1.__decorate([
    (0, di_1.Inject)(),
    tslib_1.__metadata("design:type", utils_1.CardCheckoutUtil)
], CheckoutService.prototype, "cardUtil", void 0);
tslib_1.__decorate([
    (0, di_1.Inject)(),
    tslib_1.__metadata("design:type", utils_1.CryptoCheckoutUtil)
], CheckoutService.prototype, "cryptoUtil", void 0);
tslib_1.__decorate([
    (0, di_1.Inject)(types_1.Order),
    tslib_1.__metadata("design:type", Object)
], CheckoutService.prototype, "orderBook", void 0);
exports.CheckoutService = CheckoutService = tslib_1.__decorate([
    (0, di_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], CheckoutService);
//# sourceMappingURL=CheckoutService.js.map