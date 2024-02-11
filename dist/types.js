"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.ShippingStatus = exports.PaymentMethod = void 0;
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["card"] = "card";
    PaymentMethod["crypto"] = "crypto";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var ShippingStatus;
(function (ShippingStatus) {
    ShippingStatus["notRequested"] = "notRequested";
    ShippingStatus["inPrint"] = "inPrint";
    ShippingStatus["dispatched"] = "dispatched";
    ShippingStatus["delivered"] = "delivered";
})(ShippingStatus || (exports.ShippingStatus = ShippingStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["pending"] = "pending";
    PaymentStatus["completed"] = "completed";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
//# sourceMappingURL=types.js.map