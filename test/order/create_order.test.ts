import axios from "axios";
import { expect } from "chai";
import { Shipping, Credential, Order, Cost } from "../../src/types";
import { ethers } from "ethers";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
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

describe("Create print order", () => {
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
  let cost: Cost;
  let shipping: Shipping;

  let aliceSecret: string =
    "7faf686795a6326a6276255e41ec7cdd0f06b758342c524e5de51b4c9491441b";
  let bobSecret: string =
    "982eda096e6f9a770f604c9d443da330bd374b0790a3dc1f138cddf3a1ea5c76";

  let alice: any = new ethers.Wallet(aliceSecret);
  let bob: any = new ethers.Wallet(bobSecret);

  log(".........alice", alice.address);
  log(".........bob", bob.address);

  before("Connect database", async function () {
    mongoServer = await MongoMemoryServer.create();
    dbUri = mongoServer.getUri();
    dbCollection = "orders";
    await mongoose.connect(`${dbUri}${dbCollection}`);
    //await mongoose.connect(mongooseConfig[0].url);

    endpoint = "http://0.0.0.0:8083/rest/orders/";
  });

  after("Disconnect database", async () => {
    // await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async function () {
    await orderBook.deleteMany({});

    tokenId = 9;

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

  context("Address validation", () => {
    it("should throw error when shipping address is invalid", async () => {
      const path: string = `${endpoint}${tokenId}`;
      const invalidShipping = shipping;
      invalidShipping.address = {
        street1: "test",
        street2: null,
        city: "San Francisco",
        state: "CA",
        zip: "94104-1129",
        country: "US"
      };

      const req: Request = { shipping: invalidShipping };
      let response: any;
      try {
        response = await axios.post(path, req, { params: credential });
        log(".........OK\n", response.data);
      } catch (error) {
        log(".........ERR\n", error.response.data);
      }

      expect(response.data.code).should.equal("ERROR");
      expect(response.data.error).should.equal("Invalid address");
    });

    /*
    it("should return address suggestions when shipping address is partially correct", async () => {
      const tokenId: number = 13;
      const path: string = `${endpoint}${tokenId}`;
      const partialValidShipping = shipping;
      partialValidShipping.address = {
        "street1": "N Calle F Vizcarrondo",
        "street2": null,
        "city": "San Juan",
        "state": "PR",
        "zip": "00926",
        "country": "US"
      };
      const req: Request = {
        shipping: partialValidShipping
      };
        const response = await axios.post(path, req, { params: credential });
        expect(response.data.code).should.equal('SUSPEND')
        expect(response.data.error).should.equal('Address partially invalid.')
    });

    after("should create and return a new order", async () => {
      const tokenId: number = 13;
      const path: string = `${endpoint}${tokenId}`;
      const req: Request = {
        shipping: shipping
      };
        const response = await axios.post(path, req, { params: credential });
        expect(response.data.code).should.equal('OK')
        expect(response.data.error).should.equal(null)
    });
   */
  });

  /*
  context("Existing Order Tests", () => {
    it("should throw error when an order exists", async () => {
      const tokenId: number = 13;
      const path: string = `${endpoint}${tokenId.toString()}`;
      const req: Request = {
        shipping: shipping
      };
        const response = await axios.post(path, req, { params: credential });
        expect(response.data.code).should.equal('ERROR')
        expect(response.data.error).should.equal('Order exists.')
    });

    it("should throw error when a payment is pending", async () => {
      const tokenId: number = 14;
      const path: string = `${endpoint}${tokenId.toString()}`;
      const req: Request = {
        shipping: shipping
      };
        const response = await axios.post(path, req, { params: credential });
        expect(response.data.code).should.equal('ERROR')
        expect(response.data.error).should.equal('Payment pending or completed.')
    });

    it("should throw error when a payment is completed", async () => {
      const tokenId: number = 15;
      const path: string = `${endpoint}${tokenId.toString()}`;
      const req: Request = {
        shipping: shipping
      };
        const response = await axios.post(path, req, { params: credential });
        expect(response.data.code).should.equal('ERROR')
        expect(response.data.error).should.equal('Payment pending or completed.')
    });

    it("should delete an existing order and then create a new order when the token owner has changed", async () => {
      const tokenId: number = 16;
      const path: string = `${endpoint}${tokenId.toString()}`;
      const req: Request = {
        shipping: shipping
      };
        const response = await axios.post(path, req, { params: credential });
        expect(response.data.code).should.equal('OK')
        expect(response.data.error).should.equal(null)
    });
  });
  */
});
