import { Account, Cost, Shipping, Payment, Status } from "../../types";
export declare class Order {
    _id: string;
    tokenId: string;
    account: Account;
    cost: Cost;
    shipping: Shipping;
    payment: Payment | null;
    status: Status | null;
}
