"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintRequestServiceHelpers = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const models_1 = require("../models");
const params_json_1 = tslib_1.__importDefault(require("../params.json"));
let PrintRequestServiceHelpers = class PrintRequestServiceHelpers {
    printRequestModel;
    constructor() { }
    // HELPERS
    // ==========================================================================
    async findPrintRequest(tokenId) {
        return await this.printRequestModel.findOne({ tokenId: tokenId });
    }
    checkForExistingRequest(printReq, buyer) {
        if (printReq &&
            (printReq.buyer.walletAddress == buyer.walletAddress ||
                printReq.payment ||
                printReq.createdAt + params_json_1.default.requestValidity <
                    Math.floor(Date.now() / 1000))) {
            throw new Error("Request exists");
        }
    }
    checkOwnership(isOwner) {
        if (!isOwner) {
            throw new Error("Not owner");
        }
    }
    checkAddressValidation(addressValidationResponseData) {
        if (!addressValidationResponseData.addressValidation) {
            if (addressValidationResponseData.addressSuggestion.street) {
                return true;
            }
            else {
                throw new Error("Invalid shipping address");
            }
        }
        return false;
    }
    calculatePrice(params, shipping) {
        return {
            printingCost: params.printCost,
            shippingCost: shipping.address.country === params.domesticCode
                ? params.shippingCost.domestic
                : params.shippingCost.international
        };
    }
    createPrintRequest(tokenId, buyer, shipping, price) {
        return new this.printRequestModel({
            tokenId,
            buyer,
            shipping,
            price,
            createdAt: Math.floor(Date.now() / 1000)
        });
    }
    checkRequestExistence(printReq) {
        if (!printReq) {
            throw new Error("Request doesn't exist");
        }
    }
    async findPrintRequests() {
        return await this.printRequestModel.find();
    }
    checkRequestsExistence(printRequests) {
        if (!printRequests || printRequests.length === 0) {
            throw new Error("No requests exist");
        }
    }
};
exports.PrintRequestServiceHelpers = PrintRequestServiceHelpers;
tslib_1.__decorate([
    (0, di_1.Inject)(models_1.PrintRequestModel),
    tslib_1.__metadata("design:type", Object)
], PrintRequestServiceHelpers.prototype, "printRequestModel", void 0);
exports.PrintRequestServiceHelpers = PrintRequestServiceHelpers = tslib_1.__decorate([
    (0, di_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], PrintRequestServiceHelpers);
//# sourceMappingURL=PrintRequestServiceHelpers.js.map