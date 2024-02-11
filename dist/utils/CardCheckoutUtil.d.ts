import "@tsed/stripe";
import { Stripe } from "stripe";
import { Account } from "../types";
export declare class CardCheckoutUtil {
    stripe: Stripe;
    private readonly sessionValidity;
    constructor();
    createSession(tokenId: string, account: Account, cost: number): Promise<object>;
}
