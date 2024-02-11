import { MongooseModel } from "@tsed/mongoose";
import { Account, Shipping, Order, PostalAddress, ShippingStatus } from "../../types";
import { AddressValidationUtil } from "../../utils";
interface UpdateOrderResult {
    isOrder: boolean;
    data: PostalAddress | Order;
}
export declare class OrderService {
    private service;
    orderBook: MongooseModel<Order>;
    constructor(service: AddressValidationUtil);
    createOrder(tokenId: string, account: Account, shipping: Shipping): Promise<PostalAddress | Order>;
    getOrder(tokenId: string, account: Account): Promise<Order>;
    getOrders(): Promise<Order[]>;
    updateOrder(tokenId: string, account: Account, shipping: Shipping): Promise<UpdateOrderResult>;
    updateStatus(tokenId: string, shippingStatus: ShippingStatus): Promise<Order>;
}
export {};
