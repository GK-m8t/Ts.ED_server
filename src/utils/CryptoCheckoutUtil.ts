import axios from "axios";
import { Account } from "../types";
import { Governance } from "../constants";

export class CryptoCheckoutUtil {
  private readonly apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.COINBASE_API_KEY;
  }

  async createSession(
    tokenId: string,
    account: Account,
    cost: number
  ): Promise<any> {
    const requestData = JSON.stringify({
      name: `${tokenId}`,
      description: "test description",
      pricing_type: "fixed_price",
      local_price: {
        amount: cost,
        currency: "USD"
      },
      metadata: {
        customer_id: `${tokenId}`,
        customer_name: account.address
      },
      redirect_url: Governance.PAYMENT_SUCCESS_REDIRECT_URL,
      cancel_url: Governance.PAYMENT_CANCEL_REDIRECT_URL
    });
    const config = {
      method: "post",
      url: "https://api.commerce.coinbase.com/charges",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CC-Version": "2018-03-22",
        "X-CC-Api-Key": this.apiKey
      },
      data: requestData
    };
    let session: any;

    try {
      session = await axios(config);
    } catch (error) {
      throw error;
    }
    return session.data.data;
  }
}
