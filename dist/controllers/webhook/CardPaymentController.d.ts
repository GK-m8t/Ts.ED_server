import { Request as TSEDRestRequest, Response as TSEDRestResponse } from "@tsed/common";
import "@tsed/stripe";
import { Stripe } from "stripe";
export declare class CardPaymentController {
    private service;
    stripe: Stripe;
    private readonly clientKey;
    private readonly webhookSecret;
    constructor();
    handleEvent(body: any, request: TSEDRestRequest, response: TSEDRestResponse): Promise<TSEDRestResponse | undefined>;
}
