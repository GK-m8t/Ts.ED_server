import axios from "axios";
import { expect } from "chai";
import {
  Shipping,
  Order,
  Cost,
  Payment,
  Status,
  PaymentStatus,
  ShippingStatus,
  PaymentMethod
} from "../../src/types";
import { ethers } from "ethers";
import mongoose from "mongoose";
import { orderBook } from "../orderBookSchema";
import mongooseConfig from "../../src/config/mongoose/index";
import sessionTest from "../crypto_session_test.json";

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

describe("Crypto Webhook endpoint", () => {
  let mongoServer: any;
  let dbUri: string;
  let dbCollection: string;
  let endpoint: string;
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
    const payment_test: Payment = {
      method: PaymentMethod.crypto,
      session: sessionTest,
      lastEventId: null
    };
    const status_test: Status = {
      payment: PaymentStatus.pending,
      shipping: ShippingStatus.prePrint
    };
    const newData = {
      tokenId: "2",
      account: { address: alice.address },
      cost: cost,
      shipping: shipping_test,
      payment: payment_test,
      status: status_test
    };
    console.log("token 2 init");
    return newData;
  }

  before("Connect database", async function () {
    dbUri =
      "mongodb+srv://george:geormatts84@3dh.rncl34v.mongodb.net/3dhoudini";
    mongoose.connect(dbUri);
    //await mongoose.connect(mongooseConfig[0].url);
    console.log("Initialised");
    endpoint = "http://0.0.0.0:8083/webhook/card";
  });

  beforeEach("reset token #2 shipping details", async function () {
    await orderBook.deleteMany({ tokenId: "2" });
    const initData = initialiseDatabaseData();
    const newOrder = new orderBook(initData);
    await newOrder.save();
  });

  after("Disconnect database", async () => {
    // await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  it("should update payment status of token #2 for successful checkout", async () => {
    const tokenId: number = 2;
    const path: string = `${endpoint}`;
    const req: any = sessionTest;
    req.event.type = "charge:confirmed";
    const response = await axios.post(path, req);
    const dbData = await orderBook.findOne({ tokenId: "2" });
    if (dbData && dbData.status && dbData.payment) {
      expect(dbData.status.payment).to.equal(PaymentStatus.completed);
      expect(dbData.payment).to.equal(req);
      //expect(dbData.payment.lastEventId).to.equal("evt_1O4zGF2eZvKYlo2COsw0g4kV");
      //expect(response.data.data).to.equal(null);
    }
  });

  it("should update payment status of token #2 for expired checkout", async () => {
    const tokenId: number = 2;
    const path: string = `${endpoint}`;
    const req: any = sessionTest;
    req.event.type = "charge:failed";
    const response = await axios.post(path, req);
    const dbData = await orderBook.findOne({ tokenId: "2" });
    if (dbData && dbData.status) {
      expect(dbData.status.payment).to.equal(null);
      expect(dbData.payment).to.equal(null);
      //expect(response.data.data).to.equal(null);
    }
  });
});
