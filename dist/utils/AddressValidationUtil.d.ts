import { PostalAddress } from "../types";
interface Response {
    code: string;
    data: PostalAddress | null;
}
export declare class AddressValidationUtil {
    private readonly apiKey;
    private readonly client;
    constructor();
    validateAddress(address: PostalAddress): Promise<Response>;
    private compareAddresses;
}
export {};
