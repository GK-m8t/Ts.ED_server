"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintRequestModel = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@tsed/mongoose");
const schema_1 = require("@tsed/schema");
let PrintRequestModel = class PrintRequestModel {
    _id;
    tokenId;
    buyer;
    shipping;
    price;
    createdAt;
    payment;
};
exports.PrintRequestModel = PrintRequestModel;
tslib_1.__decorate([
    (0, mongoose_1.ObjectID)("id"),
    tslib_1.__metadata("design:type", String)
], PrintRequestModel.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, schema_1.Property)(),
    (0, mongoose_1.Indexed)(),
    (0, schema_1.Required)(),
    tslib_1.__metadata("design:type", Number)
], PrintRequestModel.prototype, "tokenId", void 0);
tslib_1.__decorate([
    (0, schema_1.Property)(),
    (0, schema_1.Required)(),
    tslib_1.__metadata("design:type", Object)
], PrintRequestModel.prototype, "buyer", void 0);
tslib_1.__decorate([
    (0, schema_1.Property)(),
    (0, schema_1.Required)(),
    tslib_1.__metadata("design:type", Object)
], PrintRequestModel.prototype, "shipping", void 0);
tslib_1.__decorate([
    (0, schema_1.Property)(),
    tslib_1.__metadata("design:type", Object)
], PrintRequestModel.prototype, "price", void 0);
tslib_1.__decorate([
    (0, schema_1.Property)(),
    tslib_1.__metadata("design:type", Number)
], PrintRequestModel.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, schema_1.Property)(),
    tslib_1.__metadata("design:type", Object)
], PrintRequestModel.prototype, "payment", void 0);
exports.PrintRequestModel = PrintRequestModel = tslib_1.__decorate([
    (0, mongoose_1.Model)({ name: "printRequest", schemaOptions: { timestamps: true } })
], PrintRequestModel);
//# sourceMappingURL=PrintRequestModel.js.map