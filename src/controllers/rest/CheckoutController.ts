import { Controller, Inject } from "@tsed/di";
import { PathParams, QueryParams, BodyParams } from "@tsed/platform-params";
import { Get, Post } from "@tsed/schema";
import { Use } from "@tsed/platform-middlewares";
import {
  PaymentLink,
  Account
} from "../../types";
import { AuthenticationMiddleware } from "../../middlewares";
import { CheckoutService } from "../../services";

interface Response {
  code: string;
  data: PaymentLink | null;
  error: string | null;
}

@Controller("/checkout")
export class CheckoutController {
  @Inject() private service: CheckoutService;

  @Post("/:tokenId")
  @Use(AuthenticationMiddleware)
  async createSession(
    @PathParams("tokenId") tokenId: string,
    @QueryParams() credential: any,
    @BodyParams() paymentMethod: any
  ): Promise<Response> {
    const account: Account = JSON.parse(credential.signer);
    try {
      const result: PaymentLink = await this.service.createSession(
        tokenId,
        account,
        paymentMethod.paymentMethod
      );
      return { code: "OK", data: result, error: null };
    } catch (error) {
      return { code: "ERROR", data: null, error: error.message };
    }
  }

  @Get("/:tokenId")
  @Use(AuthenticationMiddleware)
  async getSession(
    @PathParams("tokenId") tokenId: string,
    @QueryParams() credential: any
  ): Promise<Response> {
    const account: Account = JSON.parse(credential.signer);

    try {
      const result: PaymentLink = await this.service.getSession(
        tokenId,
        account
      );
      return { code: "OK", data: result, error: null };
    } catch (error) {
      return { code: "ERROR", data: null, error: error.message };
    }
  }
}
