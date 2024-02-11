import { Credential, Order, Shipping, PostalAddress } from "../../types";
interface Response {
    code: string;
    data: PostalAddress | Order | Order[] | null;
    error: string | null;
}
export declare class OrderController {
    private service;
    getOrders(credential: Credential): Promise<Response>;
    createOrder(tokenId: string, credential: any, shipping: Shipping): Promise<Response>;
    getOrder(tokenId: string, credential: any): Promise<Response>;
    updateOrder(tokenId: string, credential: any, shipping: Shipping): Promise<Response>;
    updateStatus(tokenId: string, credential: any, shippingStatus: any): Promise<Response>;
}
export {};
