/**
 * PaymentController is responsible for creating payment sessions for checkout processes.
 *
 * @remarks
 * This controller handles the creation of payment sessions for the 3D printables identified by `tokenId`.
 * It determines whether to use card payments or crypto payment methods based on the `isCard` parameter.
 * The resulting payment link is returned to initiate the payment process.
 */
export declare class PaymentController {
    private cardPaymentService;
    private paymentService;
    /**
     * Create a payment session for a checkout process.
     *
     * @param tokenId - The identifier of the product for which a payment session is created.
     * @param isCard - A boolean flag indicating whether card payment is selected.
     * @returns A payment link to initiate the payment process.
     */
    createCheckoutSession(tokenId: number, isCard: boolean): Promise<any>;
}
