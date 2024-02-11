/*
  Functionality:
  - Creates a payment session for a given order and payment method.
  - Verifies order existence, payment status, and user authorization.
  - Updates the order with payment information and status.
  - Retrieves an existing payment session for a given order.
*/

import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import {
  Account,
  Order,
  Payment,
  PaymentMethod,
  PaymentStatus,
  PaymentLink
} from "../../types"; // Import the PaymentMethod enum from your types file
import { CardCheckoutUtil, CryptoCheckoutUtil } from "../../utils";

@Injectable()
export class CheckoutService {
  @Inject() private cardUtil: CardCheckoutUtil;
  @Inject() private cryptoUtil: CryptoCheckoutUtil;
  @Inject(Order)
  orderBook: MongooseModel<Order>;

  constructor() {}

  async createSession(
    tokenId: string,
    account: Account,
    paymentMethod: PaymentMethod
  ): Promise<PaymentLink> {
    let session: any;
    let util: CardCheckoutUtil | CryptoCheckoutUtil;
    let isCard: boolean = paymentMethod === PaymentMethod.card;
    util = isCard ? this.cardUtil : this.cryptoUtil;

    try {
      const order: any = await this.orderBook.findOne({
        tokenId: tokenId
      });

      if (!order) {
        throw new Error("Order doesn't exist.");
      } else if (order.status && order.status.payment) {
        throw new Error("Payment delayed, pending or completed.");
      } else if (
        order.account.address.toLowerCase() !== account.address.toLowerCase()
      ) {
        throw new Error("Unauthorized");
      }

      const totalCost: number = order.cost.print + order.cost.ship;
      session = await util.createSession(tokenId, account, totalCost);

      await this.orderBook.updateOne(
        { tokenId: tokenId },
        {
          $set: {
            payment: {
              method: paymentMethod,
              session: session,
              lastEventId: null
            },
            status: {
              payment: "PS00",
              shipping: null
            }
          }
        }
      );

      if (isCard) {
        return { url: session.url, expiresAt: session.expires_at };
      } else {
        return { url: session.hosted_url, expiresAt: session.expires_at };
      }
    } catch (error) {
      throw error;
    }
  }

  async getSession(tokenId: string, account: Account): Promise<PaymentLink> {
    try {
      const order: Order | null = await this.orderBook.findOne({
        tokenId: tokenId
      });

      if (!order) {
        throw new Error("Order doesn't exist.");
      } else if (!order.payment) {
        throw new Error("Session doesn't exist.");
      } else if (
        order.account.address.toLowerCase() !== account.address.toLowerCase()
      ) {
        throw new Error("Unauthorised");
      }

      // Incomplete implementation.
      return { url: "", expiresAt: new Date() };
    } catch (error) {
      throw error;
    }
  }
}
