/**
 * StripeWebhookController is responsible for handling incoming webhooks from Stripe.
 *
 * @remarks
 * This controller receives incoming webhook events and passes them to the PrintRequestService
 * for processing. It acknowledges receipt of the event and handles any errors that may occur during processing.
 */
export declare class StripeWebhookController {
    private service;
    /**
     * Handle incoming webhook events from Stripe.
     *
     * @param event - The incoming webhook event payload.
     * @returns A response indicating whether the webhook event was successfully received.
     * @throws If an error occurs during webhook event processing, it is logged and rethrown.
     */
    handleWebhook(event: any): Promise<any>;
}
