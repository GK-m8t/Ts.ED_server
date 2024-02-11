import { Configuration } from "@tsed/common";
import { Inject, Injectable } from "@tsed/di";
import "@tsed/stripe";
import { Stripe } from "stripe";
import { Account } from "../types";
import { Governance } from "../constants";

@Configuration({
  stripe: {
    apiKey: process.env.STRIPE_API_KEY || "",
    apiVersion: "2020-08-27"
  }
})
@Injectable()
export class CardCheckoutUtil {
  @Inject()
  stripe: Stripe;
  private readonly sessionValidity: number;

  constructor() {
    this.sessionValidity = Governance.CARD_PAYMENT_VALIDITY_IN_SECONDS;
  }

  async createSession(
    tokenId: string,
    account: Account,
    cost: number
  ): Promise<object> {
    const now: number = Math.floor(Date.now() / 1000);
    const expiresAt: number = now + this.sessionValidity;
    const config: any = {
      client_reference_id: `${tokenId}`,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Wagmi"
            },
            unit_amount: cost * 100
          },
          quantity: 1
        }
      ],
      mode: "payment",
      expires_at: expiresAt,
      success_url: Governance.PAYMENT_SUCCESS_REDIRECT_URL,
      cancel_url: Governance.PAYMENT_CANCEL_REDIRECT_URL
    };
    let session: any;
    try {
      session = await this.stripe.checkout.sessions.create(config);
    } catch (error) {
      console.log("error", error);
      throw error;
    }
    return session;
  }
}
