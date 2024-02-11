import { Indexed, Model, ObjectID } from "@tsed/mongoose";
import { Property, Required } from "@tsed/schema";
import { Account, Cost, Shipping, Payment, Status } from "../../types";

@Model({ name: "Order", schemaOptions: { timestamps: true } })
export class Order {
  @ObjectID("id")
  _id: string;

  @Property()
  @Indexed()
  @Required()
  tokenId: string;

  @Property()
  @Required()
  account: Account;

  @Property()
  @Required()
  cost: Cost;

  @Property()
  @Required()
  shipping: Shipping;

  @Property()
  payment: Payment | null;

  @Property()
  expiredPayment: Payment | null;

  @Property()
  status: Status | null;
}
