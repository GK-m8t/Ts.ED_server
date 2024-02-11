/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { MongooseModel } from "@tsed/mongoose";
import { Buyer, Shipping } from "../types";
import { PrintRequestModel } from "../models";
export declare class PrintRequestServiceHelpers {
    printRequestModel: MongooseModel<PrintRequestModel>;
    constructor();
    findPrintRequest(tokenId: number): Promise<(import("mongoose").Document<unknown, {}, import("@tsed/mongoose").MongooseMergedDocument<import("mongoose").Document<any, any, any> & PrintRequestModel & import("@tsed/mongoose").MongooseDocumentMethods<PrintRequestModel>>> & import("@tsed/mongoose").MongooseMergedDocument<import("mongoose").Document<any, any, any> & PrintRequestModel & import("@tsed/mongoose").MongooseDocumentMethods<PrintRequestModel>> & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    checkForExistingRequest(printReq: PrintRequestModel | null, buyer: Buyer): void;
    checkOwnership(isOwner: boolean): void;
    checkAddressValidation(addressValidationResponseData: any): boolean;
    calculatePrice(params: any, shipping: Shipping): {
        printingCost: any;
        shippingCost: any;
    };
    createPrintRequest(tokenId: number, buyer: Buyer, shipping: Shipping, price: any): import("mongoose").Document<unknown, {}, import("@tsed/mongoose").MongooseMergedDocument<import("mongoose").Document<any, any, any> & PrintRequestModel & import("@tsed/mongoose").MongooseDocumentMethods<PrintRequestModel>>> & import("@tsed/mongoose").MongooseMergedDocument<import("mongoose").Document<any, any, any> & PrintRequestModel & import("@tsed/mongoose").MongooseDocumentMethods<PrintRequestModel>> & {
        _id: import("mongoose").Types.ObjectId;
    };
    checkRequestExistence(printReq: PrintRequestModel | null): void;
    findPrintRequests(): Promise<(import("mongoose").Document<unknown, {}, import("@tsed/mongoose").MongooseMergedDocument<import("mongoose").Document<any, any, any> & PrintRequestModel & import("@tsed/mongoose").MongooseDocumentMethods<PrintRequestModel>>> & import("@tsed/mongoose").MongooseMergedDocument<import("mongoose").Document<any, any, any> & PrintRequestModel & import("@tsed/mongoose").MongooseDocumentMethods<PrintRequestModel>> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    checkRequestsExistence(printRequests: PrintRequestModel[]): void;
}
