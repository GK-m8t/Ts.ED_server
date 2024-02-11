import { MongooseModel } from "@tsed/mongoose";
import { Order } from "../../types";
export declare class CryptoPaymentService {
    orderBook: MongooseModel<Order>;
    private readonly recognisedEvents;
    constructor();
    handleEvent(event: any): Promise<boolean>;
}
