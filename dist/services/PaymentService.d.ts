import { MongooseModel } from "@tsed/mongoose";
import { PrintRequestModel } from "../models";
export declare class PaymentService {
    private cardPaymentService;
    private cryptoPaymentService;
    PrintRequestModel: MongooseModel<PrintRequestModel>;
    constructor();
    createPaymentSession(tokenId: number, isCardFlag: boolean): Promise<any>;
}
