"use strict";
/**
 * PaymentController is responsible for creating payment sessions for checkout processes.
 *
 * @remarks
 * This controller handles the creation of payment sessions for the 3D printables identified by `tokenId`.
 * It determines whether to use card payments or crypto payment methods based on the `isCard` parameter.
 * The resulting payment link is returned to initiate the payment process.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const platform_params_1 = require("@tsed/platform-params");
const schema_1 = require("@tsed/schema");
const services_1 = require("../../services");
let PaymentController = class PaymentController {
    cardPaymentService;
    paymentService;
    /**
     * Create a payment session for a checkout process.
     *
     * @param tokenId - The identifier of the product for which a payment session is created.
     * @param isCard - A boolean flag indicating whether card payment is selected.
     * @returns A payment link to initiate the payment process.
     */
    async createCheckoutSession(tokenId, isCard) {
        const paymentLink = await this.paymentService.createPaymentSession(tokenId, isCard);
        return paymentLink;
    }
};
exports.PaymentController = PaymentController;
tslib_1.__decorate([
    (0, di_1.Inject)(),
    tslib_1.__metadata("design:type", services_1.CardPaymentService)
], PaymentController.prototype, "cardPaymentService", void 0);
tslib_1.__decorate([
    (0, di_1.Inject)(),
    tslib_1.__metadata("design:type", services_1.PaymentService)
], PaymentController.prototype, "paymentService", void 0);
tslib_1.__decorate([
    (0, schema_1.Post)("/:tokenId"),
    tslib_1.__param(0, (0, platform_params_1.PathParams)("tokenId")),
    tslib_1.__param(1, (0, platform_params_1.BodyParams)("isCard")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "createCheckoutSession", null);
exports.PaymentController = PaymentController = tslib_1.__decorate([
    (0, di_1.Controller)("/checkout")
], PaymentController);
//# sourceMappingURL=PaymentController.js.map