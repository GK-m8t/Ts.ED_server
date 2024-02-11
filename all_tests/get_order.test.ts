import axios from "axios";
import { expect } from "chai";
import {
  Address,
  Buyer,
  Shipping,
  ShippingStatus,
  Authentication
} from "../src/types";
import { ethers } from "ethers";

type Response = {
  success: boolean;
  code: string;
  data: any;
  error: string;
};

type RawMessage = {
  signer: string;
  server: string;
  timestamp: number;
};

describe("Get request endpoint", () => {
  let endpoint: string;

  let raw: RawMessage;
  let flattened: string;
  let signed: string;
  let signer: any;

  let auth: Authentication;

  let aliceSecret: string =
    "7faf686795a6326a6276255e41ec7cdd0f06b758342c524e5de51b4c9491441b";
  let bobSecret: string =
    "982eda096e6f9a770f604c9d443da330bd374b0790a3dc1f138cddf3a1ea5c76";

  let alice: any = new ethers.Wallet(aliceSecret);
  let bob: any = new ethers.Wallet(bobSecret);

  beforeEach(async function () {
    endpoint = "http://0.0.0.0:8083/rest/requests";

    raw = {
      signer: alice.address,
      server: "wagmigames.api.3dHoudini.tech",
      timestamp: new Date().getTime()
    };
    flattened = JSON.stringify(raw);
    signed = await alice.signMessage(flattened);

    auth = {
      flattenedRawMessage: flattened,
      signedMessage: signed
    };
  });

  it("should get the request", async () => {
    const tokenId: number = 11;
    const path: string = `${endpoint}/${tokenId}`;

    try {
      const response: Response = await axios.get(path, { params: auth });
      console.log("RES:", response.data);
    } catch (error) {
      if (error.response) {
        console.log("ERR: ", error.response.data);
      }
    }
  });
  it("should throw error when order doesnt exist", async () => {});
  it("should throw an error when order has active session but the token owner has changed", async () => {});
  it("should throw an error when order has completed payment session but the token owner has changed", async () => {});
  it("should return the order details when there is an active payment session", async () => {});
  it("should return the order details when there is an successful payment session", async () => {});
  it("should return the order details when there is no payment session", async () => {});
  it("should delete existing order and then throw error when the token owner has changed and payment method is not set", async () => {});
});
