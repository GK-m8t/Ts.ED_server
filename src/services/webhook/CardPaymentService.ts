import { Injectable, Inject } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { Order, PaymentStatus, ShippingStatus } from "../../types";
import mongoose from "mongoose";

@Injectable()
export class CardPaymentService {
  @Inject(Order)
  orderBook: MongooseModel<Order>;
  private readonly recognisedEvents: string[] = [
    "checkout.session.completed",
    "checkout.session.expired"
  ];

  constructor() {}

  async handleEvent(event: any): Promise<boolean> {
    if (!this.recognisedEvents.includes(event.type)) {
      return true;
    }
    const sessionInEvent: any = event.data.object;
    const order: any = await this.orderBook.findOne({
      "payment.session.id": sessionInEvent.id
    });

    if (!order || !order.payment || !order.status) {
      return false;
    }

    try {
      if (order.payment.lastEventId === event.id) {
        return true;
      }
      switch (event.type) {
        case "checkout.session.completed":
          await this.orderBook.updateOne(
            { "payment.session.id": sessionInEvent.id },
            {
              $set: {
                "payment.session": sessionInEvent,
                "status.payment": PaymentStatus.completed,
                "status.shipping": ShippingStatus.prePrint,
                "payment.lastEventId": event.id
              }
            }
          );
          break;
        case "checkout.session.expired":
          await this.orderBook.updateOne(
            { "payment.session.id": sessionInEvent.id },
            {
              $set: {
                "status.payment": null,
                payment: null
              }
            }
          );
          break;
        default:
          console.log("Unrecognised event.");
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
