/*
  Functionality:
  - Creates an order with validated shipping address and calculates the total cost.
  - Retrieves an existing order based on the provided tokenId and account.
  - Retrieves all existing orders.
  - Updates an existing order with a new shipping address and recalculates the total cost.
  - Updates the shipping status of an order.
*/

import { Injectable, Inject } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import mongoose from "mongoose";
import {
  Cost,
  Account,
  Shipping,
  Order,
  PostalAddress,
  PaymentStatus,
  ShippingStatus
} from "../../types";
import { AddressValidationUtil,CalculateShippingPrice } from "../../utils";
import { createLogger, transports, format } from "winston";

let log: object = console.log;

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

interface AddressValidationResult {
  code: string;
  data: PostalAddress | null;
}

interface UpdateOrderResult {
  isOrder: boolean;
  data: PostalAddress | Order;
}

@Injectable()
export class OrderService {
  @Inject(Order)
  orderBook: MongooseModel<Order>;
  @Inject()
  private service: AddressValidationUtil;
  @Inject()
  private helper: CalculateShippingPrice;

  async createOrder(
    tokenId: string,
    account: Account,
    shipping: Shipping
  ): Promise<PostalAddress | Order> {
    try {
      const order: Order | null = await this.orderBook.findOne({
        tokenId: tokenId
      });

      if (order instanceof Order && order.status) {
        if (order.status.payment) {
          throw new Error("Payment delayed, pending or completed.");
        } else if (
          order.account.address.toLowerCase() === account.address.toLowerCase()
        ) {
          throw new Error("Order exists.");
        } else {
          await this.orderBook.deleteOne({ tokenId: tokenId });
        }
      }

      const res: AddressValidationResult = await this.service.validateAddress(
        shipping.address
      );
      console.log("Address val result ", res);
      if (res.data) {
        return res.data;
      } else if (res.code === "ERROR") {
        throw new Error("Invalid address");
      } else {
        const cost: Cost = this.helper.calculatePrice(shipping.address);
        const newOrder: any = new this.orderBook({
          tokenId: tokenId,
          account: account,
          cost: cost,
          shipping: shipping,
          payment: null,
          status: null
        });
        await newOrder.save();
        return newOrder._doc;
      }
    } catch (error) {
      throw error;
    }
  }

  async getOrder(tokenId: string, account: Account): Promise<Order> {
    try {
      const order: Order | null = await this.orderBook.findOne({
        tokenId: tokenId
      });

      if (!order) {
        throw new Error("Order doesn't exist.");
      } else if (
        order.account.address.toLowerCase() === account.address.toLowerCase()
      ) {
        return order;
      } else if (order.status && order.status.payment) {
        throw new Error("Payment delayed, pending or completed.");
      } else {
        await this.orderBook.deleteOne({ tokenId: tokenId });
        throw new Error("Order doesn't exist.");
      }
    } catch (error) {
      throw error;
    }
  }

  async getOrders(): Promise<Order[]> {
    try {
      const orders: Order[] = await this.orderBook.find();

      if (!orders || orders.length <= 0) {
        throw new Error("Collection empty.");
      }
      logger.info("Got event");
      return orders;
    } catch (error) {
      console.error("Error fetching data for the tokens:", error);
      throw error;
    }
  }

  async updateOrder(
    tokenId: string,
    account: Account,
    shipping: Shipping
  ): Promise<UpdateOrderResult> {
    try {
      const dbURL = mongoose.connections;
      const order = await this.orderBook.findOne({ tokenId: tokenId });
      console.log(`Checking update order \n`, tokenId);
      if (!order) {
        throw new Error("Order doesn't exist.");
      } else if (order.status && order.status.payment) {
        throw new Error("Payment delayed, pending or completed.");
      } else if (
        order.account.address.toLowerCase() !== account.address.toLowerCase()
      ) {
        throw new Error("Create new order.");
      } else {
        const res: AddressValidationResult = await this.service.validateAddress(
          shipping.address
        );
        console.log("Address val result ", res);
        if (res.data) {
          return { data: res.data, isOrder: false };
        } else if (res.code === "ERROR") {
          throw new Error("Invalid address");
        } else {
          const cost: Cost = this.helper.calculatePrice(shipping.address);
          order.shipping = shipping;
          order.cost=cost;
          await this.orderBook.updateOne(
            { tokenId: tokenId },
            {
              $set: {
                shipping: shipping,
                cost:cost
              }
            }
          );
          return { data: order, isOrder: true };
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async updateStatus(
    tokenId: string,
    shippingStatus: ShippingStatus
  ): Promise<Order> {
    try {
      const dbURL = mongoose.connections;
      const order = await this.orderBook.findOne({ tokenId: tokenId });
      if (!order) {
        throw new Error("Order doesn't exist.");
      } else if (
        order.status &&
        order.status.payment !== PaymentStatus.completed
      ) {
        throw new Error("Payment pending or delayed");
      } else {
        if (order.status) {
          order.status.shipping = shippingStatus;
          await this.orderBook.updateOne(
            { tokenId: tokenId },
            {
              $set: {
                "status.shipping": shippingStatus
              }
            }
          );
          return order;
        } else {
          throw new Error("Status object is not set");
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
