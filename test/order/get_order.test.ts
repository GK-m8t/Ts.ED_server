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

  before("Connect database", async function () {
    await mongoose.connect(mongooseConfig[0].url);
    //await mongoose.connect(mongooseConfig[0].url);
    console.log("Initialised");

    endpoint = "http://0.0.0.0:8083/rest/orders/";
  });

  after("Disconnect database", async () => {
    // await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  beforeEach(async function () {
    await orderBook.deleteOne({ tokenId: 2 });
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
  });

  it("should throw error when order doesnt exist", async () => {
    const tokenId: number = 3;
    const path: string = `${endpoint}${tokenId.toString()}`;
    const response: Response = await axios.get(path, { params: credential });
    log(".........OK\n", response.data);
    expect(response.data.code).to.equal("ERROR");
    expect(response.data.error).to.equal("Order doesn't exist.");
    expect(response.data.data).to.equal(null);
  });
  it("should throw an error when order has active session but the token owner has changed", async () => {});
  it("should throw an error when order has completed payment session but the token owner has changed", async () => {});
  it("should return the order details when there is an active payment session", async () => {
    const tokenId: number = 2;
    const path: string = `${endpoint}${tokenId.toString()}`;
    const response: Response = await axios.get(path, { params: credential });
    log(".........OK\n", response.data);
    expect(response.data.code).to.equal("OK");
    expect(response.data.error).to.equal(null);
    //expect(response.data.data).to.equal(null)
  });
  it("should return the order details when there is an successful payment session", async () => {
    const tokenId: number = 2;
    const path: string = `${endpoint}${tokenId.toString()}`;
    const response: Response = await axios.get(path, { params: credential });
    log(".........OK\n", response.data);
    expect(response.data.code).to.equal("OK");
    expect(response.data.error).to.equal(null);
    //expect(response.data.data).to.equal(null)
  });
  it("should return the order details when there is no payment session", async () => {
    const tokenId: number = 2;
    const path: string = `${endpoint}${tokenId.toString()}`;
    const response: Response = await axios.get(path, { params: credential });
    log(".........OK\n", response.data);
    expect(response.data.code).to.equal("OK");
    expect(response.data.error).to.equal(null);
    //expect(response.data.data).to.equal(null)
  });
  it("should delete existing order and then throw error when the token owner has changed and payment method is not set", async () => {});
});
