import { Context } from "@tsed/platform-params";
import { MiddlewareMethods } from "@tsed/platform-middlewares";
import { OwnershipVerificationUtil } from "../utils";
export declare class OwnershipVerificatonMiddleware implements MiddlewareMethods {
    private util;
    constructor(util: OwnershipVerificationUtil);
    use(context: Context, tokenId: string, credential: any): Promise<void>;
}
