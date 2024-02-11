"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoPaymentController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const di_1 = require("@tsed/di");
const coinbase_commerce_node_1 = require("coinbase-commerce-node");
const services_1 = require("../../services");
let CryptoPaymentController = class CryptoPaymentController {
    service;
    webhookSecret = process.env.COINBASE_WEBHOOK_SECRET
        ? process.env.COINBASE_WEBHOOK_SECRET
        : "";
    async handleEvent(body, request, response) {
        const sig = request.headers["x-cc-webhook-signature"];
        try {
            const event = coinbase_commerce_node_1.Webhook.verifyEventBody(body, sig, this.webhookSecret);
        }
        catch (error) {
            return response.sendStatus(400);
        }
        await this.service.handleEvent(body);
        response.send();
    }
};
exports.CryptoPaymentController = CryptoPaymentController;
tslib_1.__decorate([
    (0, di_1.Inject)(),
    tslib_1.__metadata("design:type", services_1.CryptoPaymentService)
], CryptoPaymentController.prototype, "service", void 0);
tslib_1.__decorate([
    (0, common_1.Post)("/"),
    tslib_1.__param(0, (0, common_1.BodyParams)()),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__param(2, (0, common_1.Response)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CryptoPaymentController.prototype, "handleEvent", null);
exports.CryptoPaymentController = CryptoPaymentController = tslib_1.__decorate([
    (0, di_1.Controller)("/crypto")
], CryptoPaymentController);
//# sourceMappingURL=CryptoPaymentController.js.map