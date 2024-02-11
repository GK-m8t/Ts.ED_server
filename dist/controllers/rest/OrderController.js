"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const schema_1 = require("@tsed/schema");
const platform_middlewares_1 = require("@tsed/platform-middlewares");
const platform_params_1 = require("@tsed/platform-params");
const middlewares_1 = require("../../middlewares");
const services_1 = require("../../services");
let log = console.log;
let OrderController = class OrderController {
    service;
    async getOrders(credential) {
        try {
            const result = await this.service.getOrders();
            return { code: "OK", data: result, error: null };
        }
        catch (error) {
            return { code: "ERROR", data: null, error: error.message };
        }
    }
    async createOrder(tokenId, credential, shipping) {
        const account = JSON.parse(credential.signer);
        let result;
        try {
            result = await this.service.createOrder(tokenId, account, shipping);
            if (result.hasOwnProperty("tokenId")) {
                return { code: "OK", data: result, error: null };
            }
            else {
                return {
                    code: "SUSPEND",
                    data: result,
                    error: "Address partially invalid."
                };
            }
        }
        catch (error) {
            return { code: "ERROR", data: null, error: error.message };
        }
    }
    async getOrder(tokenId, credential) {
        //const form: UserForm = JSON.parse(credential.form);
        const account = JSON.parse(credential.signer);
        try {
            const result = await this.service.getOrder(tokenId, account);
            return { code: "OK", data: result, error: null };
        }
        catch (error) {
            return { code: "ERROR", data: null, error: error.message };
        }
    }
    async updateOrder(tokenId, credential, shipping) {
        //const form: UserForm = JSON.parse(credential.form);
        const account = JSON.parse(credential.signer);
        //let result: PostalAddress | Order;
        let result;
        try {
            const result = await this.service.updateOrder(tokenId, account, shipping);
            if (result.isOrder) {
                return { code: "OK", data: result.data, error: null };
            }
            else {
                return {
                    code: "SUSPEND",
                    data: result.data,
                    error: "Address partially invalid."
                };
            }
        }
        catch (error) {
            return { code: "ERROR", data: null, error: error.message };
        }
    }
    //@Use(OwnershipVerificatonMiddleware)
    async updateStatus(tokenId, credential, shippingStatus) {
        //const form: UserForm = JSON.parse(credential.form);
        let result;
        try {
            const result = await this.service.updateStatus(tokenId, shippingStatus.shippingStatus);
            return { code: "OK", data: result, error: null };
        }
        catch (error) {
            return { code: "ERROR", data: null, error: error.message };
        }
    }
};
exports.OrderController = OrderController;
tslib_1.__decorate([
    (0, di_1.Inject)(),
    tslib_1.__metadata("design:type", services_1.OrderService)
], OrderController.prototype, "service", void 0);
tslib_1.__decorate([
    (0, schema_1.Get)("/"),
    (0, platform_middlewares_1.Use)(middlewares_1.AuthenticationMiddleware),
    tslib_1.__param(0, (0, platform_params_1.QueryParams)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "getOrders", null);
tslib_1.__decorate([
    (0, schema_1.Post)("/:tokenId"),
    (0, platform_middlewares_1.Use)(middlewares_1.OwnershipVerificatonMiddleware),
    (0, platform_middlewares_1.Use)(middlewares_1.AuthenticationMiddleware),
    tslib_1.__param(0, (0, platform_params_1.PathParams)("tokenId")),
    tslib_1.__param(1, (0, platform_params_1.QueryParams)()),
    tslib_1.__param(2, (0, platform_params_1.BodyParams)("shipping")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
tslib_1.__decorate([
    (0, schema_1.Get)("/:tokenId"),
    (0, platform_middlewares_1.Use)(middlewares_1.OwnershipVerificatonMiddleware),
    (0, platform_middlewares_1.Use)(middlewares_1.AuthenticationMiddleware),
    tslib_1.__param(0, (0, platform_params_1.PathParams)("tokenId")),
    tslib_1.__param(1, (0, platform_params_1.QueryParams)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "getOrder", null);
tslib_1.__decorate([
    (0, schema_1.Put)("/:tokenId"),
    (0, platform_middlewares_1.Use)(middlewares_1.AuthenticationMiddleware),
    (0, platform_middlewares_1.Use)(middlewares_1.OwnershipVerificatonMiddleware),
    tslib_1.__param(0, (0, platform_params_1.PathParams)("tokenId")),
    tslib_1.__param(1, (0, platform_params_1.QueryParams)()),
    tslib_1.__param(2, (0, platform_params_1.BodyParams)("shipping")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrder", null);
tslib_1.__decorate([
    (0, schema_1.Put)("/status/:tokenId"),
    (0, platform_middlewares_1.Use)(middlewares_1.AuthenticationMiddleware)
    //@Use(OwnershipVerificatonMiddleware)
    ,
    tslib_1.__param(0, (0, platform_params_1.PathParams)("tokenId")),
    tslib_1.__param(1, (0, platform_params_1.QueryParams)()),
    tslib_1.__param(2, (0, platform_params_1.BodyParams)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "updateStatus", null);
exports.OrderController = OrderController = tslib_1.__decorate([
    (0, di_1.Controller)("/orders")
], OrderController);
//# sourceMappingURL=OrderController.js.map