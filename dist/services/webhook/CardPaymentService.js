"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardPaymentService = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const types_1 = require("../../types");
let CardPaymentService = class CardPaymentService {
    orderBook;
    recognisedEvents = [
        "checkout.session.completed",
        "checkout.session.expired"
    ];
    constructor() { }
    async handleEvent(event) {
        if (!this.recognisedEvents.includes(event.type)) {
            return true;
        }
        const sessionInEvent = event.data.object;
        const order = await this.orderBook.findOne({
            "payment.session.id": sessionInEvent.id
        });
        if (!order || !order.payment || !order.status) {
            return false;
        }
        try {
            if (order.payment.lastEventId === event.id) {
                return true;
            }
            switch (event.type) {
                case "checkout.session.completed":
                    // order.payment.session = sessionInEvent;
                    // order.status.payment = PaymentStatus.completed;
                    // order.payment.lastEventId = event.id;
                    // await order.save();
                    // console.log(order);
                    await this.orderBook.updateOne({ "payment.session.id": sessionInEvent.id }, {
                        $set: {
                            "payment.session": sessionInEvent,
                            "status.payment": types_1.PaymentStatus.completed,
                            "payment.lastEventId": event.id
                        }
                    });
                    break;
                case "checkout.session.expired":
                    // order.payment = null;
                    // order.status.payment = null;
                    // await order.save();
                    await this.orderBook.updateOne({ "payment.session.id": sessionInEvent.id }, {
                        $set: {
                            "status.payment": null,
                            payment: null
                        }
                    });
                    break;
                default:
                    console.log("Unrecognised event.");
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
exports.CardPaymentService = CardPaymentService;
tslib_1.__decorate([
    (0, di_1.Inject)(types_1.Order),
    tslib_1.__metadata("design:type", Object)
], CardPaymentService.prototype, "orderBook", void 0);
exports.CardPaymentService = CardPaymentService = tslib_1.__decorate([
    (0, di_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], CardPaymentService);
//# sourceMappingURL=CardPaymentService.js.map