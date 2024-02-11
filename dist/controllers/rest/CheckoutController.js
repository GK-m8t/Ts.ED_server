"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutController = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const platform_params_1 = require("@tsed/platform-params");
const schema_1 = require("@tsed/schema");
const platform_middlewares_1 = require("@tsed/platform-middlewares");
const middlewares_1 = require("../../middlewares");
const services_1 = require("../../services");
let CheckoutController = class CheckoutController {
    service;
    async createSession(tokenId, credential, paymentMethod) {
        //const form: CustomerForm = JSON.parse(credential.certificate);
        const account = JSON.parse(credential.signer);
        try {
            const result = await this.service.createSession(tokenId, account, 
            //paymentMethod
            paymentMethod.paymentMethod);
            return { code: "OK", data: result, error: null };
        }
        catch (error) {
            return { code: "ERROR", data: null, error: error.message };
        }
    }
    async getSession(tokenId, credential) {
        //const form: CustomerForm = JSON.parse(credential.certificate);
        const account = JSON.parse(credential.signer);
        try {
            const result = await this.service.getSession(tokenId, account);
            return { code: "OK", data: result, error: null };
        }
        catch (error) {
            return { code: "ERROR", data: null, error: error.message };
        }
    }
};
exports.CheckoutController = CheckoutController;
tslib_1.__decorate([
    (0, di_1.Inject)(),
    tslib_1.__metadata("design:type", services_1.CheckoutService)
], CheckoutController.prototype, "service", void 0);
tslib_1.__decorate([
    (0, schema_1.Post)("/:tokenId"),
    (0, platform_middlewares_1.Use)(middlewares_1.AuthenticationMiddleware),
    tslib_1.__param(0, (0, platform_params_1.PathParams)("tokenId")),
    tslib_1.__param(1, (0, platform_params_1.QueryParams)()),
    tslib_1.__param(2, (0, platform_params_1.BodyParams)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CheckoutController.prototype, "createSession", null);
tslib_1.__decorate([
    (0, schema_1.Get)("/:tokenId"),
    (0, platform_middlewares_1.Use)(middlewares_1.AuthenticationMiddleware),
    tslib_1.__param(0, (0, platform_params_1.PathParams)("tokenId")),
    tslib_1.__param(1, (0, platform_params_1.QueryParams)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CheckoutController.prototype, "getSession", null);
exports.CheckoutController = CheckoutController = tslib_1.__decorate([
    (0, di_1.Controller)("/checkout")
], CheckoutController);
//# sourceMappingURL=CheckoutController.js.map