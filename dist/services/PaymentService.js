"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const models_1 = require("../models");
const services_1 = require("../services");
const types_1 = require("../types"); // Import the PaymentMethod enum from your types file
let PaymentService = class PaymentService {
    cardPaymentService;
    cryptoPaymentService;
    PrintRequestModel;
    constructor() { }
    async createPaymentSession(tokenId, isCardFlag) {
        try {
            const printReq = await this.PrintRequestModel.findOne({
                tokenId: tokenId
            });
            let paymentData = { payment_url: "", timestamp: Date.now() };
            if (printReq) {
                const price = printReq.price.printingCost + printReq.price.shippingCost;
                if (printReq?.payment) {
                    return (printReq.payment.status === "completed" ? "" : printReq.payment.link);
                }
                else {
                    if (isCardFlag) {
                        paymentData = await this.cardPaymentService.createStripeCharge(tokenId, price ? price : 0);
                    }
                    else {
                        paymentData = await this.cryptoPaymentService.createCoinbaseCharge(price ? price : 0);
                    }
                }
                printReq.payment = {
                    method: isCardFlag ? types_1.PaymentMethod.card : types_1.PaymentMethod.crypto,
                    link: paymentData.payment_url,
                    status: types_1.PaymentStatus.pending,
                    createdTimeStamp: paymentData.timestamp
                };
                // printReq.payment=null;
                await printReq.save();
                console.log(printReq);
                return paymentData.payment_url;
            }
            else {
                throw new Error("Print Request doesnt exists");
            }
        }
        catch (error) {
            console.error("Error posting data to API:", error);
            throw error;
        }
    }
};
exports.PaymentService = PaymentService;
tslib_1.__decorate([
    (0, di_1.Inject)(),
    tslib_1.__metadata("design:type", services_1.CardPaymentService)
], PaymentService.prototype, "cardPaymentService", void 0);
tslib_1.__decorate([
    (0, di_1.Inject)(),
    tslib_1.__metadata("design:type", services_1.CryptoPaymentService)
], PaymentService.prototype, "cryptoPaymentService", void 0);
tslib_1.__decorate([
    (0, di_1.Inject)(models_1.PrintRequestModel),
    tslib_1.__metadata("design:type", Object)
], PaymentService.prototype, "PrintRequestModel", void 0);
exports.PaymentService = PaymentService = tslib_1.__decorate([
    (0, di_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], PaymentService);
//# sourceMappingURL=PaymentService.js.map