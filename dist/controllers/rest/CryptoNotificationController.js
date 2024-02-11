"use strict";
/**
 * CoinbaseWebhookController is responsible for handling incoming webhooks from Coinbase Commerce.
 *
 * @remarks
 * This controller receives incoming webhook payloads and verifies their authenticity using
 * the provided secret. It then processes the webhook event, such as payment processing, and logs
 * any verification errors or exceptions that may occur during processing.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinbaseWebhookController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const di_1 = require("@tsed/di");
const coinbase_commerce_node_1 = require("coinbase-commerce-node");
const services_1 = require("../../services");
const webhookSecret = process.env.COINBASE_WEBHOOK_SECRET || "";
let CoinbaseWebhookController = class CoinbaseWebhookController {
    service;
    /**
     * Handle incoming webhooks from Coinbase Commerce.
     *
     * @param request - The Express Request object containing the webhook payload.
     * @returns A string indicating the status of webhook processing.
     * @throws If there is an error during webhook verification, it is logged and rethrown.
     */
    async handleWebhook(request) {
        const eventBody = request.rawBody;
        const signature = request.headers["x-cc-webhook-signature"];
        try {
            const event = coinbase_commerce_node_1.Webhook.verifyEventBody(eventBody, signature, webhookSecret);
            console.log("Webhook Event ID:", event.id);
            // Handle the webhook event here (e.g., process the payment)
            const isWebhookReceived = await this.service.handleWebhookEvent(event, false);
            return "Webhook Received: " + event.id;
        }
        catch (error) {
            console.error("Webhook Verification Error:", error.message);
            throw new Error("Webhook Verification Error");
        }
    }
};
exports.CoinbaseWebhookController = CoinbaseWebhookController;
tslib_1.__decorate([
    (0, di_1.Inject)(),
    tslib_1.__metadata("design:type", services_1.PrintRequestService)
], CoinbaseWebhookController.prototype, "service", void 0);
tslib_1.__decorate([
    (0, common_1.Post)("/"),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CoinbaseWebhookController.prototype, "handleWebhook", null);
exports.CoinbaseWebhookController = CoinbaseWebhookController = tslib_1.__decorate([
    (0, di_1.Controller)("/coinbase-webhook")
], CoinbaseWebhookController);
//# sourceMappingURL=CryptoNotificationController.js.map