import axios from "axios";
import { expect } from "chai";
import {
  Shipping,
  Credential,
  Order,
  Cost,
  PaymentStatus,
  ShippingStatus,
  PaymentMethod
} from "../../src/types";
import { ethers } from "ethers";
import mongoose from "mongoose";
import { orderBook } from "../orderBookSchema";
import mongooseConfig from "../../src/config/mongoose/index";

let log: any = console.log;
type Request = {
  shipping: Shipping;
};

type Response = {
  success: boolean;
  code: string;
  data: any;
  error: string;
};

type Certificate = {
  data: any;
  timestamp: Date;
};

describe("Update order endpoint", () => {
  let mongoServer: any;
  let dbUri: string;
  let dbCollection: string;
  let endpoint: string;
  //let certificate: Certificate;
  let certificate: any;
  let flattened: string;
  let signature: string;
  let credential: Credential;
  let tokenId: number;
  let shipping: Shipping;

  let aliceSecret: string =
    "8860867b39fe8801ade0162a2a65c0c45c7c63f473a4b9ad8f6def06d1541cab";
  let bobSecret: string =
    "982eda096e6f9a770f604c9d443da330bd374b0790a3dc1f138cddf3a1ea5c76";

  let alice: any = new ethers.Wallet(aliceSecret);
  let bob: any = new ethers.Wallet(bobSecret);

  log(".........alice", alice.address);
  log(".........bob", bob.address);

  function initialiseDatabaseData(): any {
    const cost: Cost = { print: 50.0, ship: 5.0 };
    const shipping_test: Shipping = {
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
    const newData = {
      tokenId: "2",
      account: { address: alice.address },
      cost: cost,
      shipping: shipping_test,
      payment: null,
      status: null
    };
    console.log("token 2 init");
    return newData;
  }

  before("Connect database and create credentials", async function () {
    dbUri = "mongodb+srv://george:geormatts84@3dh.rncl34v.mongodb.net/";
    mongoose.connect(dbUri);
    //await mongoose.connect(mongooseConfig[0].url);
    console.log("Initialised");
    certificate = {
      form: {
        intent: "Print",
        clientId: "wagmigames.api.3dHoudini.tech"
      },
      timestamp: new Date()
    };
    flattened = JSON.stringify(certificate);
    signature = await alice.signMessage(flattened);

    credential = {
      certificate: { data: flattened },
      signature: signature,
      signer: { address: alice.address }
    };

    shipping = {
      name: "John Updated",
      email: "john.doeupdate@example.com",
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
    endpoint = "http://0.0.0.0:8083/rest/orders/";
  });

  after("Disconnect database", async () => {
    // await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  describe("alice requests to update shipping details for token #2 when its not been created", () => {
    beforeEach("reset token #2 shipping details", async function () {
      await orderBook.deleteOne({ tokenId: "2" });
    });

    after("clean database", async () => {
      await orderBook.deleteMany({});
    });

    it("should not let alice update the shipping details for token #2 if token ID shipping request hasnt been created already", async () => {
      const tokenId: number = 2;
      await orderBook.deleteOne({ tokenId: tokenId.toString() });
      const path: string = `${endpoint}${tokenId.toString()}`;
      const req: Request = {
        shipping: shipping
      };
      const response = await axios.put(path, req, { params: credential });
      expect(response.data.code).to.equal("ERROR");
      expect(response.data.error).to.equal("Order doesn't exist.");
      expect(response.data.data).to.equal(null);
    });
  });
  describe("alice requests to update shipping details for token #2 when checkout payment is active", () => {
    beforeEach("reset token #2 shipping details", async function () {
      await orderBook.deleteOne({ tokenId: "2" });
      const initData = initialiseDatabaseData();
      initData.payment = {
        method: PaymentMethod.card,
        session: {},
        lastEventId: null
      };
      initData.status = {
        payment: PaymentStatus.pending,
        shipping: ShippingStatus.prePrint
      };
      const newOrder = new orderBook(initData);
      await newOrder.save();
    });

    after("clean database", async () => {
      await orderBook.deleteMany({});
    });
    it("should not allow alice to update shipping details if payment is pending", async () => {
      const tokenId: number = 2;
      const path: string = `${endpoint}${tokenId.toString()}`;
      const req: Request = {
        shipping: shipping
      };
      const response = await axios.put(path, req, { params: credential });
      log(".........OK\n", response.data);
      expect(response.data.code).to.equal("ERROR");
      expect(response.data.error).to.equal("Payment pending or completed.");
      expect(response.data.data).to.equal(null);
    });

    it("should not allow alice to update shipping details if payment is completed", async () => {
      const tokenId: number = 2;
      const path: string = `${endpoint}${tokenId.toString()}`;
      const req: Request = {
        shipping: shipping
      };
      const response = await axios.put(path, req, { params: credential });
      log(".........OK\n", response.data);
      expect(response.data.code).to.equal("ERROR");
      expect(response.data.error).to.equal("Payment pending or completed.");
      expect(response.data.data).to.equal(null);
    });
  });

  describe("bob sells token #2 to Alice", () => {
    beforeEach(
      "reset token #2 shipping details with bobs address",
      async function () {
        await orderBook.deleteOne({ tokenId: "2" });
        const initData = initialiseDatabaseData();
        initData.account = { address: bob.address };
        const newOrder = new orderBook(initData);
        await newOrder.save();
      }
    );

    after("clean database", async () => {
      await orderBook.deleteMany({});
    });
    it("should not allow alice to update bob's shipping details and would prompt alice to create a new shipping order", async () => {
      const tokenId: number = 2;

      const path: string = `${endpoint}${tokenId.toString()}`;
      const req: Request = {
        shipping: shipping
      };
      const response = await axios.put(path, req, { params: credential });
      log(".........OK\n", response.data);
      expect(response.data.code).to.equal("ERROR");
      expect(response.data.error).to.equal("Create new order.");
      expect(response.data.data).to.equal(null);
    });
  });
  describe("alice requests to update shipping details for token #2", () => {
    beforeEach("reset token #2 shipping details", async function () {
      await orderBook.deleteOne({ tokenId: "2" });
      const initData = initialiseDatabaseData();
      const newOrder = new orderBook(initData);
      await newOrder.save();
    });

    after("clean database", async () => {
      await orderBook.deleteMany({});
    });
    it("should throw error when shipping address is invalid", async () => {
      const tokenId: number = 2;
      const path: string = `${endpoint}${tokenId.toString()}`;
      const invalidAddress: Shipping = {
        ...shipping,
        address: {
          ...shipping.address,
          street1: "Wrong data"
        }
      };
      const req: Request = {
        shipping: shipping
      };
      const response = await axios.put(path, req, { params: credential });
      log(".........OK\n", response.data);
      expect(response.data.code).to.equal("ERROR");
      expect(response.data.error).to.equal("Invalid address");
      expect(response.data.data).to.equal(null);
    });
    it("should return address suggestion when shipping address is partially correct", async () => {
      const tokenId: number = 2;
      const path: string = `${endpoint}${tokenId.toString()}`;
      const partiallyCorrectAddress: Shipping = {
        ...shipping,
        address: {
          ...shipping.address,
          street1: "417 MONTGOMERY ST FL"
        }
      };
      const req: Request = {
        shipping: partiallyCorrectAddress
      };
      const response = await axios.put(path, req, { params: credential });
      log(".........OK\n", response.data);
      expect(response.data.code).to.equal("SUSPEND");
      expect(response.data.error).to.equal("Address partially invalid.");
      // expect(response.data.data).to.equal(null)
    });
    it("should update and return the existing order", async () => {
      const tokenId: number = 2;
      const path: string = `${endpoint}${tokenId.toString()}`;
      const req: Request = {
        shipping: shipping
      };
      const response = await axios.put(path, req, { params: credential });
      log(".........OK\n", response.data);
      expect(response.data.code).to.equal("OK");
      expect(response.data.error).to.equal(null);
      //expect(response.data.data).to.equal(null)
    });
  });
});
