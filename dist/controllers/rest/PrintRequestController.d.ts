/**
 * PrintRequestController is responsible for managing print requests and associated operations.
 *
 * @remarks
 * This controller handles a variety of operations related to print requests, including creating new requests,
 * retrieving existing requests, updating requests, and retrieving a list of all requests (admin-only).
 * It employs signature verification middleware for request validation and security.
 */
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
import { Buyer, Shipping } from "../../types";
export declare class PrintRequestController {
    private service;
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
    createRequest(tokenId: number, walletAddress: string, signedMessage: string, originalMessage: string, isAdmin: boolean, buyer: Buyer, shipping: Shipping): Promise<{
        message: string;
        isValid: boolean;
        suggestedAddress: {
            street: string;
            city: string;
            state: string;
            zip: string;
            country: string;
        };
    }>;
    /**
     * Retrieve a list of all print requests (admin-only).
     *
     * @param walletAddress - The wallet address associated with the request.
     * @param signedMessage - The signed message for request validation.
     * @param originalMessage - The original message for request validation.
     * @param isAdmin - A boolean flag indicating admin access.
     * @returns A list of all print requests (admin-only).
     */
    getAllRequests(walletAddress: string, signedMessage: string, originalMessage: string, isAdmin: boolean): Promise<(import("mongoose").Document<unknown, {}, import("@tsed/mongoose").MongooseMergedDocument<import("mongoose").Document<any, any, any> & import("../../models").PrintRequestModel & import("@tsed/mongoose").MongooseDocumentMethods<import("../../models").PrintRequestModel>>> & import("@tsed/mongoose").MongooseMergedDocument<import("mongoose").Document<any, any, any> & import("../../models").PrintRequestModel & import("@tsed/mongoose").MongooseDocumentMethods<import("../../models").PrintRequestModel>> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
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
    getRequest(tokenId: number, walletAddress: string, signedMessage: string, originalMessage: string, isAdmin: boolean): Promise<(import("mongoose").Document<unknown, {}, import("@tsed/mongoose").MongooseMergedDocument<import("mongoose").Document<any, any, any> & import("../../models").PrintRequestModel & import("@tsed/mongoose").MongooseDocumentMethods<import("../../models").PrintRequestModel>>> & import("@tsed/mongoose").MongooseMergedDocument<import("mongoose").Document<any, any, any> & import("../../models").PrintRequestModel & import("@tsed/mongoose").MongooseDocumentMethods<import("../../models").PrintRequestModel>> & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
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
    updateRequest(tokenId: number, walletAddress: string, signedMessage: string, originalMessage: string, isAdmin: boolean, buyer: Buyer, shipping: Shipping): Promise<{
        message: string;
        isValid: boolean;
        suggestedAddress: {
            street: string;
            city: string;
            state: string;
            zip: string;
            country: string;
        };
    }>;
}
