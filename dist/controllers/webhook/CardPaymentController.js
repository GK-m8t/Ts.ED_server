"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardPaymentController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const common_2 = require("@tsed/common");
const di_1 = require("@tsed/di");
require("@tsed/stripe");
const stripe_1 = require("stripe");
const services_1 = require("../../services");
let CardPaymentController = class CardPaymentController {
    service;
    stripe;
    clientKey = process.env.STRIPE_API_KEY
        ? process.env.STRIPE_API_KEY
        : "";
    webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
        ? process.env.STRIPE_WEBHOOK_SECRET
        : "";
    //private readonly clientKey: string = "will-add-later";
    //private readonly webhookSecret: string = "will-add-later";
    constructor() { }
    async handleEvent(body, request, response) {
        const sig = request.headers["stripe-signature"];
        /* For testing purpose
        const event = {
          id: "evt_1O4zGF2eZvKYlo2COsw0g4kV",
          object: "event",
          api_version: "2019-02-19",
          created: Date.now(),
          data: {
            object: body
          },
          livemode: false,
          pending_webhooks: 0,
          request: {
            id: null,
            idempotency_key: null
          },
          type:
            body.object === "checkout.session.completed"
              ? "checkout.session.completed"
              : "checkout.session.expired"
        };
        */
        try {
            //const client = new Stripe(this.clientKey);
            if (request.rawBody) {
                const event = this.stripe.webhooks.constructEvent(
                //body,
                request.rawBody, sig, this.webhookSecret);
                await this.service.handleEvent(event);
            }
        }
        catch (error) {
            console.log("error", error);
            return response.sendStatus(400);
        }
        response.send();
    }
};
exports.CardPaymentController = CardPaymentController;
tslib_1.__decorate([
    (0, di_1.Inject)(),
    tslib_1.__metadata("design:type", services_1.CardPaymentService)
], CardPaymentController.prototype, "service", void 0);
tslib_1.__decorate([
    (0, di_1.Inject)(),
    tslib_1.__metadata("design:type", stripe_1.Stripe)
], CardPaymentController.prototype, "stripe", void 0);
tslib_1.__decorate([
    (0, common_1.Post)("/"),
    tslib_1.__param(0, (0, common_1.BodyParams)()),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__param(2, (0, common_1.Response)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CardPaymentController.prototype, "handleEvent", null);
exports.CardPaymentController = CardPaymentController = tslib_1.__decorate([
    (0, common_2.Configuration)({
        stripe: {
            apiKey: process.env.STRIPE_API_KEY || "",
            apiVersion: "2020-08-27"
        }
    }),
    (0, di_1.Controller)("/card"),
    tslib_1.__metadata("design:paramtypes", [])
], CardPaymentController);
//# sourceMappingURL=CardPaymentController.js.map