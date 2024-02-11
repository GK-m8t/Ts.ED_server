import axios from "axios";
import { expect } from "chai";
import { Account, Shipping, ShippingStatus, Credential } from "../src/types";
import { ethers } from "ethers";

type Request = {
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
  let auth: Credential;
  let shipping: Shipping;

  let aliceSecret: string =
    "7faf686795a6326a6276255e41ec7cdd0f06b758342c524e5de51b4c9491441b";
  let bobSecret: string =
    "982eda096e6f9a770f604c9d443da330bd374b0790a3dc1f138cddf3a1ea5c76";

  let alice: any = new ethers.Wallet(aliceSecret);
  let bob: any = new ethers.Wallet(bobSecret);

  beforeEach(async function () {
    endpoint = "http://0.0.0.0:8083/rest/orders";

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
      form: { data: flattened },
      signature: signed,
      signer: alice
    };

    shipping = {
      name: "John Doe",
      email: "john.doe@example.com",
      address: {
        street1: "417 MONTGOMERY ST FL 5",
        street2: null,
        city: "SAN FRANCISCO",
        state: "CA",
        zip: "94104-1129",
        country: "US"
      },
      _phone: "1234567890"
    };
  });

  context("Existing Order Tests", () => {
    it("should throw error when an order exists", async () => {
      const tokenId: number = 11;
      const path: string = `${endpoint}/${tokenId}`;
      const req: Request = {
        shipping: shipping
      };
      try {
        const response = await axios.post(path, req, { params: auth });
        // If order exists for tokenID, this line should not be reached
        expect.fail("Expected an error");
      } catch (error) {
        if (error.response) {
          console.log("ERR:", error.response.data);
        }
      }
    });

    it("should throw error when a payment is pending", async () => {
      const tokenId: number = 12;
      const path: string = `${endpoint}/${tokenId}`;
      const req: Request = {
        shipping: shipping
      };
      try {
        const response = await axios.post(path, req, { params: auth });
        // If order exists for tokenID, this line should not be reached
        expect.fail("Expected an error");
      } catch (error) {
        if (error.response) {
          console.log("ERR:", error.response.data);
        }
      }
    });

    it("should throw error when a payment is completed", async () => {
      const tokenId: number = 13;
      const path: string = `${endpoint}/${tokenId}`;
      const req: Request = {
        shipping: shipping
      };
      try {
        const response = await axios.post(path, req, { params: auth });
        // If order exists for tokenID, this line should not be reached
        expect.fail("Expected an error");
      } catch (error) {
        if (error.response) {
          console.log("ERR:", error.response.data);
        }
      }
    });
  });

  context("New Order Tests", () => {
    it("should throw error when shipping address is invalid", async () => {
      const tokenId: number = 14;
      const path: string = `${endpoint}/${tokenId}`;
      const invalidShipping = shipping;
      invalidShipping.address = {
        street1: "invalid",
        street2: null,
        city: "San Juan",
        state: "PR",
        zip: "00926",
        country: "US"
      };
      const req: Request = {
        shipping: invalidShipping
      };
      try {
        const response = await axios.post(path, req, { params: auth });
      } catch (error) {
        if (error.response) {
          console.log("ERR:", error.response.data);
        }
      }
    });

    it("should return address suggestions when shipping address is partially correct", async () => {
      const tokenId: number = 15;
      const path: string = `${endpoint}/${tokenId}`;
      const partialValidShipping = shipping;
      partialValidShipping.address = {
        street1: "N Calle F Vizcarrondo",
        street2: null,
        city: "San Juan",
        state: "PR",
        zip: "00926",
        country: "US"
      };
      const req: Request = {
        shipping: partialValidShipping
      };
      try {
        const response = await axios.post(path, req, { params: auth });
      } catch (error) {
        if (error.response) {
          console.log("ERR:", error.response.data);
        }
      }
    });

    it("should create and return a new order", async () => {
      const tokenId: number = 16;
      const path: string = `${endpoint}/${tokenId}`;
      const req: Request = {
        shipping: shipping
      };
      try {
        const response = await axios.post(path, req, { params: auth });
      } catch (error) {
        if (error.response) {
          console.log("ERR:", error.response.data);
        }
      }
    });

    it("should delete an existing order and then create a new order when the token owner has changed", async () => {
      const tokenId: number = 17;
      const path: string = `${endpoint}/${tokenId}`;
      const req: Request = {
        shipping: shipping
      };
      try {
        const response = await axios.post(path, req, { params: auth });
        // If an order exists for tokenID, this line should not be reached
        expect.fail("Expected an error");
      } catch (error) {
        if (error.response) {
          console.log("ERR:", error.response.data);
        }
      }
    });
  });
});
