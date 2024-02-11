/**
 * CoinbaseWebhookController is responsible for handling incoming webhooks from Coinbase Commerce.
 *
 * @remarks
 * This controller receives incoming webhook payloads and verifies their authenticity using
 * the provided secret. It then processes the webhook event, such as payment processing, and logs
 * any verification errors or exceptions that may occur during processing.
 */
import { Request } from "express";
declare module "express" {
    interface Request {
        rawBody?: string;
    }
}
export declare class CoinbaseWebhookController {
    private service;
    /**
     * Handle incoming webhooks from Coinbase Commerce.
     *
     * @param request - The Express Request object containing the webhook payload.
     * @returns A string indicating the status of webhook processing.
     * @throws If there is an error during webhook verification, it is logged and rethrown.
     */
    handleWebhook(request: Request): Promise<string>;
}
