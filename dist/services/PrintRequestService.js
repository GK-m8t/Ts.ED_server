"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintRequestService = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const types_1 = require("../types");
const models_1 = require("../models");
const utils_1 = require("../utils");
const params_json_1 = tslib_1.__importDefault(require("../params.json"));
let PrintRequestService = class PrintRequestService {
    blockchainService;
    addressValidationService;
    printServiceHelpers;
    printRequestModel;
    constructor(blockchainService, addressValidationService, printServiceHelpers) {
        this.blockchainService = blockchainService;
        this.addressValidationService = addressValidationService;
        this.printServiceHelpers = printServiceHelpers;
    }
    async createRequest(tokenId, buyer, shipping) {
        try {
            // check whether buyer is token owner
            // if not, then throw error
            // else, proceed
            const isOwner = await this.blockchainService.verifyOwnership(tokenId, buyer.walletAddress);
            this.printServiceHelpers.checkOwnership(isOwner);
            // check whether a valid request is already created by the buyer
            // if created, then throw error
            // else, proceed
            const printReq = await this.printServiceHelpers.findPrintRequest(tokenId);
            this.printServiceHelpers.checkForExistingRequest(printReq, buyer);
            // validate shipping address via easypost
            // if incorrect or invalid, then throw error
            // else, proceed
            const addressValidationResponseData = await this.addressValidationService.validateAddress(shipping.address);
            const isAddressSuggested = this.printServiceHelpers.checkAddressValidation(addressValidationResponseData);
            if (isAddressSuggested) {
                return addressValidationResponseData;
            }
            // calculate total cost considering shipping address
            const price = this.printServiceHelpers.calculatePrice(params_json_1.default, shipping);
            // create a new request
            const newReq = this.printServiceHelpers.createPrintRequest(tokenId, buyer, shipping, price);
            await newReq.save();
            return addressValidationResponseData;
        }
        catch (error) {
            console.error("Error creating data for the token id:", error);
            throw error;
        }
    }
    async getRequest(tokenId, walletAddress) {
        try {
            // check whether buyer is token owner
            // if not, then throw error
            // else, proceed
            const isOwner = await this.blockchainService.verifyOwnership(tokenId, walletAddress);
            this.printServiceHelpers.checkOwnership(isOwner);
            // check whether the request exists
            // if not, then throw error
            // else, proceed
            const printReq = await this.printServiceHelpers.findPrintRequest(tokenId);
            this.printServiceHelpers.checkRequestExistence(printReq);
            return printReq;
        }
        catch (error) {
            console.error("Error fetching data for the token id:", error);
            throw error;
        }
    }
    async getAllRequests() {
        try {
            const printRequests = await this.printServiceHelpers.findPrintRequests();
            this.printServiceHelpers.checkRequestsExistence(printRequests);
            return printRequests;
        }
        catch (error) {
            console.error("Error fetching data for the tokens:", error);
            throw error;
        }
    }
    async updateRequest(tokenId, buyer, shipping) {
        try {
            // check whether buyer is token owner
            // if not, then throw error
            // else, proceed
            const isOwner = await this.blockchainService.verifyOwnership(tokenId, buyer.walletAddress);
            this.printServiceHelpers.checkOwnership(isOwner);
            const printReq = await this.printServiceHelpers.findPrintRequest(tokenId);
            if (printReq) {
                if (JSON.stringify(printReq.buyer) !== JSON.stringify(buyer)) {
                    printReq.buyer = buyer;
                }
                if (JSON.stringify(printReq.shipping) !== JSON.stringify(shipping)) {
                    const addressValidationResponseData = await this.addressValidationService.validateAddress(shipping.address);
                    if (!addressValidationResponseData.addressValidation) {
                        if (addressValidationResponseData.addressSuggestion.street) {
                            return addressValidationResponseData;
                        }
                        else {
                            throw new Error("Invalid shipping address");
                        }
                    }
                    else {
                        printReq.shipping = shipping;
                    }
                }
                await printReq.save();
                return {
                    addressValidation: true,
                    addressSuggestion: {
                        street: "",
                        city: "",
                        state: "",
                        zip: "",
                        country: ""
                    }
                };
            }
            else {
                throw new Error("Request doesn't exist");
            }
        }
        catch (error) {
            console.error("Error updating data for the token id:", error);
            throw error;
        }
    }
    async handleWebhookEvent(event, isCard) {
        try {
            var checkoutID = "";
            var status = "";
            switch (event.type) {
                case "checkout.session.completed" && isCard:
                    checkoutID = event.data.object.id;
                    status = types_1.PaymentStatus.completed;
                    console.log("Payment Successful");
                    break;
                case "checkout.session.expired" && isCard:
                    checkoutID = event.data.object.id;
                    status = "Expired";
                    console.log("Expired");
                    break;
                case "charge:confirmed" && !isCard:
                    checkoutID = event.data.code;
                    status = types_1.PaymentStatus.completed;
                    console.log("Payment Successful");
                    break;
                case "charge:failed" && !isCard:
                    checkoutID = event.data.code;
                    status = "Expired";
                    console.log("Expired");
                    break;
                // ... handle other event types
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }
            if (status === "Expired" ||
                status === types_1.PaymentStatus.completed ||
                status === types_1.PaymentStatus.pending) {
                const isSuccessfull = await this.updatePaymentStatus(checkoutID, status);
                return isSuccessfull;
            }
            return false;
        }
        catch (error) {
            console.error("Error determining event:", error);
            //throw error;
            return false;
        }
    }
    async updatePaymentStatus(checkoutId, status) {
        try {
            const printReq = await this.printRequestModel.findOne({
                "payment.link": {
                    $regex: checkoutId
                }
            });
            if (!printReq) {
                throw new Error("Request with this checkoutID doesnt exists");
            }
            else {
                if (status === "Expired") {
                    delete printReq.payment;
                }
                else {
                    if (printReq.payment) {
                        // printReq.payment.link = "";
                        printReq.payment.status = status;
                    }
                }
                await printReq.save();
                return true;
            }
        }
        catch (error) {
            console.error("Error updating data for the checkoutID:", error);
            // throw error;
            return false;
        }
    }
};
exports.PrintRequestService = PrintRequestService;
tslib_1.__decorate([
    (0, di_1.Inject)(models_1.PrintRequestModel),
    tslib_1.__metadata("design:type", Object)
], PrintRequestService.prototype, "printRequestModel", void 0);
exports.PrintRequestService = PrintRequestService = tslib_1.__decorate([
    (0, di_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [utils_1.BlockchainService,
        utils_1.AddressValidationService,
        utils_1.PrintRequestServiceHelpers])
], PrintRequestService);
//# sourceMappingURL=PrintRequestService.js.map