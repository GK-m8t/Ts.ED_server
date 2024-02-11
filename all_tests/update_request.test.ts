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

type Request = {
  buyer: Buyer;
  shipping: Shipping;
};

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

describe("Create request endpoint", () => {
  let endpoint: string;

  let raw: RawMessage;
  let flattened: string;
  let signed: string;
  let signer: any;

  let auth: Authentication;

  let buyer: Buyer;
  let shipping: Shipping;

  let aliceSecret: string =
    "7faf686795a6326a6276255e41ec7cdd0f06b758342c524e5de51b4c9491441b";
  let bobSecret: string =
    "982eda096e6f9a770f604c9d443da330bd374b0790a3dc1f138cddf3a1ea5c76";

  let alice: any = new ethers.Wallet(aliceSecret);
  let bob: any = new ethers.Wallet(bobSecret);

  beforeEach(async function () {
    endpoint = "http://0.0.0.0:8083/rest/requests";

    alice = new ethers.Wallet(aliceSecret);
    bob = new ethers.Wallet(bobSecret);

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

    buyer = {
      fullName: "John Doe",
      contactNo: 1234567890,
      email: "john.doe@example.com",
      walletAddress: alice.address
    };

    shipping = {
      address: {
        street: "417 MONTGOMERY ST FL 5",
        city: "SAN FRANCISCO",
        state: "CA",
        zip: "94104-1129",
        country: "US"
      },
      status: ShippingStatus.paymentPending
    };
  });

  /* it("should create a print request", async () => {
    const tokenId: number = 11;
    const path: string = `${endpoint}/${tokenId}`;
    
    const partiallyCorrectAddress: Shipping = {
      ...shipping,
      address: {
        ...shipping.address,
        city: 'san fran'
      }
    };
    
    const req: Request = {
      buyer: buyer,
      shipping: shipping
    };

    try {
      const res = await axios.post(path, req, { params: auth, });
      console.log('RES:', res.data);
    } catch (error) {
      if (error.response) {
        console.log('ERR:', error.response.data);
      }
    }
  });
  */
  it("should throw error when an order exist", async () => {});
  it("should throw error when a payment is pending", async () => {});
  it("should throw error when a payment is completed", async () => {});
  it("should throw error when the token owner has changed", async () => {});
  it("should throw error when shipping address is invalid", async () => {});
  it("should return address suggestion when shipping address is partially correct", async () => {});
  it("should update and return the existing order", async () => {});
});
