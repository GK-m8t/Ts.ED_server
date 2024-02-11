import { PaymentLink } from "../../types";
interface Response {
    code: string;
    data: PaymentLink | null;
    error: string | null;
}
export declare class CheckoutController {
    private service;
    createSession(tokenId: string, credential: any, paymentMethod: any): Promise<Response>;
    getSession(tokenId: string, credential: any): Promise<Response>;
}
export {};
