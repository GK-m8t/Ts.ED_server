"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.PaymentMethod = exports.ShippingStatus = void 0;
var ShippingStatus;
(function (ShippingStatus) {
    ShippingStatus["prePrint"] = "SS00";
    ShippingStatus["inPrint"] = "SS01";
    ShippingStatus["dispatched"] = "SS02";
    ShippingStatus["delivered"] = "SS03";
})(ShippingStatus || (exports.ShippingStatus = ShippingStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["card"] = "PM00";
    PaymentMethod["crypto"] = "PM01";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["pending"] = "PS00";
    PaymentStatus["completed"] = "PS01";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
//# sourceMappingURL=Order.js.map