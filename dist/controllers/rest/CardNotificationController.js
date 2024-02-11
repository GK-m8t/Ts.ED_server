"use strict";
/**
 * StripeWebhookController is responsible for handling incoming webhooks from Stripe.
 *
 * @remarks
 * This controller receives incoming webhook events and passes them to the PrintRequestService
 * for processing. It acknowledges receipt of the event and handles any errors that may occur during processing.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeWebhookController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const di_1 = require("@tsed/di");
const services_1 = require("../../services");
let StripeWebhookController = class StripeWebhookController {
    service;
    /**
     * Handle incoming webhook events from Stripe.
     *
     * @param event - The incoming webhook event payload.
     * @returns A response indicating whether the webhook event was successfully received.
     * @throws If an error occurs during webhook event processing, it is logged and rethrown.
     */
    async handleWebhook(event) {
        try {
            // Handle the event
            const isWebhookReceived = await this.service.handleWebhookEvent(event, true);
            // Return a response to acknowledge receipt of the event
            return { received: isWebhookReceived };
        }
        catch (error) {
            // Handle any errors that occur during webhook processing
            console.error("Webhook processing error:", error);
            throw error;
        }
    }
};
exports.StripeWebhookController = StripeWebhookController;
tslib_1.__decorate([
    (0, di_1.Inject)(),
    tslib_1.__metadata("design:type", services_1.PrintRequestService)
], StripeWebhookController.prototype, "service", void 0);
tslib_1.__decorate([
    (0, common_1.Post)("/"),
    tslib_1.__param(0, (0, common_1.BodyParams)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StripeWebhookController.prototype, "handleWebhook", null);
exports.StripeWebhookController = StripeWebhookController = tslib_1.__decorate([
    (0, di_1.Controller)("/cardwebhook")
], StripeWebhookController);
//# sourceMappingURL=CardNotificationController.js.map