import { Governance } from "../constants";
import { PostalAddress,Cost, } from "../types";

let log: any = console.log;

export class CalculateShippingPrice {

  constructor() {
  }

  calculatePrice(address: PostalAddress):Cost {
    return {
      print: Governance.PRINTING_PRICE_IN_USD,
      ship:
        address.country === Governance.DOMESTIC_COUNTRY
          ? Governance.DOMESTIC_SHIPPING_CHARGE_IN_USD
          : Governance.INTERNATIONAL_SHIPPING_CHARGE_IN_USD
    };
  }


}
