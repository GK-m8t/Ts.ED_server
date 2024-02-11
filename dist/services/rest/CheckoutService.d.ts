import { MongooseModel } from "@tsed/mongoose";
import { Account, Order, PaymentMethod, PaymentLink } from "../../types";
export declare class CheckoutService {
    private cardUtil;
    private cryptoUtil;
    orderBook: MongooseModel<Order>;
    constructor();
    createSession(tokenId: string, account: Account, paymentMethod: PaymentMethod): Promise<PaymentLink>;
    getSession(tokenId: string, account: Account): Promise<PaymentLink>;
}
