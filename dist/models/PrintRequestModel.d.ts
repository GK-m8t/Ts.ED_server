import { Buyer, Shipping, Payment, Price } from "../types";
export declare class PrintRequestModel {
    _id: string;
    tokenId: number;
    buyer: Buyer;
    shipping: Shipping;
    price: Price;
    createdAt: number;
    payment?: Payment;
}
