import { Context } from "@tsed/platform-params";
import { MiddlewareMethods } from "@tsed/platform-middlewares";
export declare class AuthenticationMiddleware implements MiddlewareMethods {
    use(context: Context, credential: any): void;
}
