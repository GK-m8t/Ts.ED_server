/**
 * SignatureVerificationMiddleware is responsible for verifying the authenticity and integrity of incoming requests.
 *
 * @remarks
 * This middleware performs several checks to ensure the validity of incoming requests. It verifies the provided
 * signature against the original message, checks for timestamp validity, and compares the recovered address with
 * the provided wallet address. Additionally, it can enforce whitelisting for admin access.
 *
 * If any verification step fails, the middleware responds with an appropriate error message and status code.
 */
import { Context } from "@tsed/platform-params";
import { MiddlewareMethods } from "@tsed/platform-middlewares";
export declare class SignatureVerificationMiddleware implements MiddlewareMethods {
    use($ctx: Context): void;
}
