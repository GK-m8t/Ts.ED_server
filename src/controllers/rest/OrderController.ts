import { Controller, Inject } from "@tsed/di";
import { Get, Post, Put } from "@tsed/schema";
import { Use } from "@tsed/platform-middlewares";
import { PathParams, QueryParams, BodyParams } from "@tsed/platform-params";

import {
  Credential,
  Account,
  Order,
  Shipping,
  PostalAddress,
} from "../../types";
import {
  AuthenticationMiddleware,
  OwnershipVerificatonMiddleware
} from "../../middlewares";
import { OrderService } from "../../services";

interface Response {
  code: string;
  data: PostalAddress | Order | Order[] | null;
  error: string | null;
}

let log: object = console.log;

@Controller("/orders")
export class OrderController {
  @Inject() private service: OrderService;

  @Get("/")
  @Use(AuthenticationMiddleware)
  async getOrders(@QueryParams() credential: Credential): Promise<Response> {
    try {
      const result: Order[] = await this.service.getOrders();
      return { code: "OK", data: result, error: null };
    } catch (error) {
      return { code: "ERROR", data: null, error: error.message };
    }
  }

  @Post("/:tokenId")
  @Use(OwnershipVerificatonMiddleware)
  @Use(AuthenticationMiddleware)
  async createOrder(
    @PathParams("tokenId") tokenId: string,
    @QueryParams() credential: any,
    @BodyParams("shipping") shipping: Shipping
  ): Promise<Response> {
    const account: Account = JSON.parse(credential.signer);
    let result: PostalAddress | Order;

    try {
      result = await this.service.createOrder(tokenId, account, shipping);
      if (result.hasOwnProperty("tokenId")) {
        return { code: "OK", data: result, error: null };
      } else {
        return {
          code: "SUSPEND",
          data: result,
          error: "Address partially invalid."
        };
      }
    } catch (error) {
      return { code: "ERROR", data: null, error: error.message };
    }
  }

  @Get("/:tokenId")
  @Use(OwnershipVerificatonMiddleware)
  @Use(AuthenticationMiddleware)
  async getOrder(
    @PathParams("tokenId") tokenId: string,
    @QueryParams() credential: any
  ): Promise<Response> {
    const account: Account = JSON.parse(credential.signer);

    try {
      const result: Order = await this.service.getOrder(tokenId, account);
      return { code: "OK", data: result, error: null };
    } catch (error) {
      return { code: "ERROR", data: null, error: error.message };
    }
  }

  @Put("/:tokenId")
  @Use(AuthenticationMiddleware)
  @Use(OwnershipVerificatonMiddleware)
  async updateOrder(
    @PathParams("tokenId") tokenId: string,
    @QueryParams() credential: any,
    @BodyParams("shipping") shipping: Shipping
  ): Promise<Response> {
    const account: Account = JSON.parse(credential.signer);
    let result: any;

    try {
      const result = await this.service.updateOrder(tokenId, account, shipping);
      if (result.isOrder) {
        return { code: "OK", data: result.data, error: null };
      } else {
        return {
          code: "SUSPEND",
          data: result.data,
          error: "Address partially invalid."
        };
      }
    } catch (error) {
      return { code: "ERROR", data: null, error: error.message };
    }
  }

  @Put("/status/:tokenId")
  @Use(AuthenticationMiddleware)
  async updateStatus(
    @PathParams("tokenId") tokenId: string,
    @QueryParams() credential: any,
    @BodyParams() shippingStatus: any
  ): Promise<Response> {
    //const form: UserForm = JSON.parse(credential.form);
    let result: Order;
    try {
      const result: Order = await this.service.updateStatus(
        tokenId,
        shippingStatus.shippingStatus
      );
      return { code: "OK", data: result, error: null };
    } catch (error) {
      return { code: "ERROR", data: null, error: error.message };
    }
  }
}
