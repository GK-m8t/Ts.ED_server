import { Account } from "../types";
export declare class CryptoCheckoutUtil {
    private readonly apiKey;
    constructor();
    createSession(tokenId: string, account: Account, cost: number): Promise<any>;
}
