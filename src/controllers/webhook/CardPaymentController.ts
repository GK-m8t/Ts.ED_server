import {
  Post,
  BodyParams,
  Request as TSEDRestRequest,
  Response as TSEDRestResponse
} from "@tsed/common";
import { Configuration } from "@tsed/common";
import { Controller, Inject } from "@tsed/di";
import "@tsed/stripe";
import { Stripe } from "stripe";
import { CardPaymentService } from "../../services";

@Configuration({
  stripe: {
    apiKey: process.env.STRIPE_API_KEY || "",
    apiVersion: "2020-08-27"
  }
})
@Controller("/card")
export class CardPaymentController {
  @Inject() private service: CardPaymentService;
  @Inject() stripe: Stripe;
  private readonly clientKey: string = process.env.STRIPE_API_KEY
    ? process.env.STRIPE_API_KEY
    : "";
  private readonly webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET
    ? process.env.STRIPE_WEBHOOK_SECRET
    : "";

  constructor() {}

  @Post("/")
  async handleEvent(
    @BodyParams() body: any,
    @TSEDRestRequest() request: TSEDRestRequest,
    @TSEDRestResponse() response: TSEDRestResponse
  ) {
    const sig: any = request.headers["stripe-signature"];
    try {
      if (request.rawBody) {
        const event = this.stripe.webhooks.constructEvent(
          request.rawBody,
          sig,
          this.webhookSecret
        );
        await this.service.handleEvent(event);
      }
    } catch (error) {
      console.log("error", error);
      return response.sendStatus(400);
    }
    response.send();
  }
}
