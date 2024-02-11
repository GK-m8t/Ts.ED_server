import {
  Post,
  BodyParams,
  Request as TSEDRestRequest,
  Response as TSEDRestResponse
} from "@tsed/common";
import { Controller, Inject } from "@tsed/di";
import { Request } from "express"; // Import the Express Request type
import { Webhook } from "coinbase-commerce-node";
import { CryptoPaymentService } from "../../services";

declare module "express" {
  interface Request {
    rawBody?: string; // Define the custom rawBody property
  }
}

@Controller("/crypto")
export class CryptoPaymentController {
  @Inject() private service: CryptoPaymentService;
  private readonly webhookSecret: string = process.env.COINBASE_WEBHOOK_SECRET
    ? process.env.COINBASE_WEBHOOK_SECRET
    : "";

  @Post("/")
  async handleEvent(
    @BodyParams() body: any,
    @TSEDRestRequest() request: TSEDRestRequest,
    @TSEDRestResponse() response: TSEDRestResponse
  ) {
    const sig = request.headers["x-cc-webhook-signature"] as string;

    try {
      if (request.rawBody) {
        const event = Webhook.verifyEventBody(
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