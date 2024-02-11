import "@tsed/stripe";
import { Stripe } from "stripe";
export declare class CardPaymentService {
    stripe: Stripe;
    constructor();
    createStripeCharge(tokenId: number, price: number): Promise<{
        payment_url: string;
        timestamp: number;
    }>;
}
