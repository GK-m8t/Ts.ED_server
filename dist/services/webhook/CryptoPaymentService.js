"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoPaymentService = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const types_1 = require("../../types");
let CryptoPaymentService = class CryptoPaymentService {
    orderBook;
    recognisedEvents = [
        "charge:confirmed",
        "charge:failed",
        "charge:delayed",
        "charge:resolved"
    ];
    constructor() { }
    async handleEvent(event) {
        if (!this.recognisedEvents.includes(event.type)) {
            return true;
        }
        const sessionInEvent = event.event.data;
        const order = await this.orderBook.findOne({
            "payment.session.code": sessionInEvent.code
        });
        if (!order || !order.payment || !order.status) {
            return false;
        }
        if (order.payment.lastEventId === event.event.id) {
            return true;
        }
        try {
            switch (event.event.type) {
                case "charge:confirmed":
                    //order.payment.session.timeline = sessionInEvent.timeline;
                    // order.status.payment = PaymentStatus.completed;
                    // await order.save();
                    await this.orderBook.updateOne({ "payment.session.id": sessionInEvent.id }, {
                        $set: {
                            "status.payment": types_1.PaymentStatus.completed,
                            payment: sessionInEvent
                        }
                    });
                    break;
                case "charge:failed":
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
                case "charge:delayed":
                    // notify admin
                    break;
                case "charge:resolved":
                    // notify admin
                    break;
                default:
                    console.log("Event not relevant.");
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
exports.CryptoPaymentService = CryptoPaymentService;
tslib_1.__decorate([
    (0, di_1.Inject)(types_1.Order),
    tslib_1.__metadata("design:type", Object)
], CryptoPaymentService.prototype, "orderBook", void 0);
exports.CryptoPaymentService = CryptoPaymentService = tslib_1.__decorate([
    (0, di_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], CryptoPaymentService);
//# sourceMappingURL=CryptoPaymentService.js.map