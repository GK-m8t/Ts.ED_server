import { Request as TSEDRestRequest, Response as TSEDRestResponse } from "@tsed/common";
declare module "express" {
    interface Request {
        rawBody?: string;
    }
}
export declare class CryptoPaymentController {
    private service;
    private readonly webhookSecret;
    handleEvent(body: any, request: TSEDRestRequest, response: TSEDRestResponse): Promise<TSEDRestResponse | undefined>;
}
