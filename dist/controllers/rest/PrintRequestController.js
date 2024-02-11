"use strict";
/**
 * PrintRequestController is responsible for managing print requests and associated operations.
 *
 * @remarks
 * This controller handles a variety of operations related to print requests, including creating new requests,
 * retrieving existing requests, updating requests, and retrieving a list of all requests (admin-only).
 * It employs signature verification middleware for request validation and security.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintRequestController = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const platform_params_1 = require("@tsed/platform-params");
const schema_1 = require("@tsed/schema");
// import { Post } from "@tsed/schema";
const platform_middlewares_1 = require("@tsed/platform-middlewares");
const middlewares_1 = require("../../middlewares");
const services_1 = require("../../services");
let PrintRequestController = class PrintRequestController {
    service;
    /**
     * Create a new print request based on provided information.
     *
     * @param tokenId - The identifier of the product for which a request is created.
     * @param walletAddress - The wallet address associated with the request.
     * @param signedMessage - The signed message for request validation.
     * @param originalMessage - The original message for request validation.
     * @param isAdmin - A boolean flag indicating admin access.
     * @param buyer - Information about the buyer.
     * @param shipping - Information about the shipping address.
     * @returns Information about the created request, including the given request creation status and associated shipping address validation.
     */
    async createRequest(tokenId, walletAddress, signedMessage, originalMessage, isAdmin, buyer, shipping) {
        const responseData = await this.service.createRequest(tokenId, buyer, shipping);
        return {
            message: responseData.addressValidation
                ? "Request created"
                : "Address Validation pending",
            isValid: responseData.addressValidation,
            suggestedAddress: responseData.addressSuggestion
        };
    }
    /**
     * Retrieve a list of all print requests (admin-only).
     *
     * @param walletAddress - The wallet address associated with the request.
     * @param signedMessage - The signed message for request validation.
     * @param originalMessage - The original message for request validation.
     * @param isAdmin - A boolean flag indicating admin access.
     * @returns A list of all print requests (admin-only).
     */
    async getAllRequests(walletAddress, signedMessage, originalMessage, isAdmin) {
        if (isAdmin) {
            const allTokenRequestData = await this.service.getAllRequests();
            return allTokenRequestData;
        }
        else {
            throw new Error("This is an admin only function");
        }
    }
    /**
     * Retrieve a specific print request based on its identifier.
     *
     * @param tokenId - The identifier of the product for which the request is retrieved.
     * @param walletAddress - The wallet address associated with the request.
     * @param signedMessage - The signed message for request validation.
     * @param originalMessage - The original message for request validation.
     * @param isAdmin - A boolean flag indicating admin access.
     * @returns Information stored in the database about the requested print request.
     */
    async getRequest(tokenId, walletAddress, signedMessage, originalMessage, isAdmin) {
        const tokenRequestData = await this.service.getRequest(tokenId, walletAddress);
        return tokenRequestData;
    }
    /**
     * Update an existing print request based on provided information.
     *
     * @param tokenId - The identifier of the product for which a request is updated.
     * @param walletAddress - The wallet address associated with the request.
     * @param signedMessage - The signed message for request validation.
     * @param originalMessage - The original message for request validation.
     * @param isAdmin - A boolean flag indicating admin access.
     * @param buyer - Information about the buyer.
     * @param shipping - Information about the updated shipping address.
     * @returns Information about the updated request, including the given request update status and associated shipping address validation.
     */
    async updateRequest(tokenId, walletAddress, signedMessage, originalMessage, isAdmin, buyer, shipping) {
        const responseData = await this.service.updateRequest(tokenId, buyer, shipping);
        return {
            message: responseData.addressValidation
                ? "Request Updated"
                : "Address Validation pending",
            isValid: responseData.addressValidation,
            suggestedAddress: responseData.addressSuggestion
        };
    }
};
exports.PrintRequestController = PrintRequestController;
tslib_1.__decorate([
    (0, di_1.Inject)(),
    tslib_1.__metadata("design:type", services_1.PrintRequestService)
], PrintRequestController.prototype, "service", void 0);
tslib_1.__decorate([
    (0, schema_1.Post)("/:tokenId"),
    (0, platform_middlewares_1.Use)(middlewares_1.SignatureVerificationMiddleware),
    tslib_1.__param(0, (0, platform_params_1.PathParams)("tokenId")),
    tslib_1.__param(1, (0, platform_params_1.BodyParams)("walletAddress")),
    tslib_1.__param(2, (0, platform_params_1.BodyParams)("signedMessage")),
    tslib_1.__param(3, (0, platform_params_1.BodyParams)("originalMessage")),
    tslib_1.__param(4, (0, platform_params_1.BodyParams)("isAdmin")),
    tslib_1.__param(5, (0, platform_params_1.BodyParams)("buyer")),
    tslib_1.__param(6, (0, platform_params_1.BodyParams)("shipping")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, String, String, Boolean, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PrintRequestController.prototype, "createRequest", null);
tslib_1.__decorate([
    (0, schema_1.Get)("/"),
    (0, platform_middlewares_1.Use)(middlewares_1.SignatureVerificationMiddleware),
    tslib_1.__param(0, (0, platform_params_1.BodyParams)("walletAddress")),
    tslib_1.__param(1, (0, platform_params_1.BodyParams)("signedMessage")),
    tslib_1.__param(2, (0, platform_params_1.BodyParams)("originalMessage")),
    tslib_1.__param(3, (0, platform_params_1.BodyParams)("isAdmin")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], PrintRequestController.prototype, "getAllRequests", null);
tslib_1.__decorate([
    (0, schema_1.Get)("/:tokenId"),
    (0, platform_middlewares_1.Use)(middlewares_1.SignatureVerificationMiddleware),
    tslib_1.__param(0, (0, platform_params_1.PathParams)("tokenId")),
    tslib_1.__param(1, (0, platform_params_1.BodyParams)("walletAddress")),
    tslib_1.__param(2, (0, platform_params_1.BodyParams)("signedMessage")),
    tslib_1.__param(3, (0, platform_params_1.BodyParams)("originalMessage")),
    tslib_1.__param(4, (0, platform_params_1.BodyParams)("isAdmin")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, String, String, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], PrintRequestController.prototype, "getRequest", null);
tslib_1.__decorate([
    (0, schema_1.Put)("/:tokenId"),
    (0, platform_middlewares_1.Use)(middlewares_1.SignatureVerificationMiddleware),
    tslib_1.__param(0, (0, platform_params_1.PathParams)("tokenId")),
    tslib_1.__param(1, (0, platform_params_1.BodyParams)("walletAddress")),
    tslib_1.__param(2, (0, platform_params_1.BodyParams)("signedMessage")),
    tslib_1.__param(3, (0, platform_params_1.BodyParams)("originalMessage")),
    tslib_1.__param(4, (0, platform_params_1.BodyParams)("isAdmin")),
    tslib_1.__param(5, (0, platform_params_1.BodyParams)("buyer")),
    tslib_1.__param(6, (0, platform_params_1.BodyParams)("shipping")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, String, String, Boolean, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PrintRequestController.prototype, "updateRequest", null);
exports.PrintRequestController = PrintRequestController = tslib_1.__decorate([
    (0, di_1.Controller)("/requests")
], PrintRequestController);
//# sourceMappingURL=PrintRequestController.js.map