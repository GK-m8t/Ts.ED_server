"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@tsed/mongoose");
const schema_1 = require("@tsed/schema");
let Order = class Order {
    _id;
    tokenId;
    account;
    cost;
    shipping;
    payment;
    status;
};
exports.Order = Order;
tslib_1.__decorate([
    (0, mongoose_1.ObjectID)("id"),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, schema_1.Property)(),
    (0, mongoose_1.Indexed)(),
    (0, schema_1.Required)(),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "tokenId", void 0);
tslib_1.__decorate([
    (0, schema_1.Property)(),
    (0, schema_1.Required)(),
    tslib_1.__metadata("design:type", Object)
], Order.prototype, "account", void 0);
tslib_1.__decorate([
    (0, schema_1.Property)(),
    (0, schema_1.Required)(),
    tslib_1.__metadata("design:type", Object)
], Order.prototype, "cost", void 0);
tslib_1.__decorate([
    (0, schema_1.Property)(),
    (0, schema_1.Required)(),
    tslib_1.__metadata("design:type", Object)
], Order.prototype, "shipping", void 0);
tslib_1.__decorate([
    (0, schema_1.Property)(),
    tslib_1.__metadata("design:type", Object)
], Order.prototype, "payment", void 0);
tslib_1.__decorate([
    (0, schema_1.Property)(),
    tslib_1.__metadata("design:type", Object)
], Order.prototype, "status", void 0);
exports.Order = Order = tslib_1.__decorate([
    (0, mongoose_1.Model)({ name: "Order", schemaOptions: { timestamps: true } })
], Order);
//# sourceMappingURL=Order.js.map