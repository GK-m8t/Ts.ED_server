import { Injectable, Inject } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { Order, PaymentStatus, ShippingStatus,PaymentMethod, } from "../../types";
import { createLogger, transports, format } from "winston";

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: "eventLog.txt" })
  ],
  format: format.combine(
    format.timestamp(),
    format.simple()
  )
});

@Injectable()
export class CryptoPaymentService {
  @Inject(Order)
  orderBook: MongooseModel<Order>;
  private readonly recognisedEvents: string[] = [
    "charge:confirmed",
    "charge:failed",
    "charge:delayed",
    "charge:resolved"
  ];

  private logFile = "eventLog.txt"; // Specify the file name

  constructor() {}

  async handleEvent(event: any): Promise<boolean> {
    if (!this.recognisedEvents.includes(event.type)) {
      return true;
    }

    const sessionInEvent: any = event.data;
    const order: any = await this.orderBook.findOne({
      "payment.session.code": sessionInEvent.code
    });

    if (!order || !order.payment || !order.status) {
      return false;
    }

    if (order.payment.lastEventId === event.id) {
      return true;
    }

    try {
      switch (event.type) {
        case "charge:resolved":
          // notify admin
          await this.orderBook.updateOne(
            { "payment.session.id": sessionInEvent.id },
            {
              $set: {
                "status.payment": PaymentStatus.completed,
                "status.shipping": ShippingStatus.prePrint,
                payment: {
                  method: PaymentMethod.crypto,
                  session: sessionInEvent,
                  lastEventId: event.id
                }
              }
            }
          );
          break;
        case "charge:confirmed":
          await this.orderBook.updateOne(
            { "payment.session.id": sessionInEvent.id },
            {
              $set: {
                "status.payment": PaymentStatus.completed,
                "status.shipping": ShippingStatus.prePrint,
                payment: {
                  method: PaymentMethod.crypto,
                  session: sessionInEvent,
                  lastEventId: event.id
                }
              }
            }
          );
          break;
        case "charge:failed":
          await this.orderBook.updateOne(
            { "payment.session.id": sessionInEvent.id },
            {
              $set: {
                "status.payment": null,
                payment: null,
                expiredPayment: sessionInEvent
              }
            }
          );
          break;
        case "charge:delayed":
          // notify admin
          await this.orderBook.updateOne(
            { "expiredPayment.id": sessionInEvent.id },
            {
              $set: {
                "status.payment": PaymentStatus.delayed,
                payment: {
                  method: PaymentMethod.crypto,
                  session: sessionInEvent,
                  lastEventId: event.id
                },
                expiredPayment:null
              }
            }
          );
          break;
        default:
          logger.info("Event not relevant.");
      }

      logger.info(`Event Type for tokenID ${order.tokenID} and charge code ${sessionInEvent.charge}: ${event.type}`);
      return true;
    } catch (error) {
      logger.error(error.message);
      return false;
    }
  }
}
