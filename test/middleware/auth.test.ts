import axios from "axios";
import { expect } from "chai";
import { Shipping, Credential, Order, Cost } from "../../src/types";
import { ethers } from "ethers";
import mongoose from "mongoose";
import { orderBook } from "../orderBookSchema";
import mongooseConfig from "../../src/config/mongoose/index";

let log: any = console.log;

type Request = {
  shipping: Shipping;
};

type Response = {
  code: string;
  data: any | null;
  error: string | null;
};

type Certificate = {
  form: any;
  timestamp: Date;
};

describe("Authentication middleware", () => {
  let path: string;
  let shipping: Shipping;

  let certificate: any;
  let flattened: any;
  let signature: any;
  let credential: any;

  let request: Request;

  let aliceSecret: string =
    "7faf686795a6326a6276255e41ec7cdd0f06b758342c524e5de51b4c9491441b";
  let bobSecret: string =
    "982eda096e6f9a770f604c9d443da330bd374b0790a3dc1f138cddf3a1ea5c76";

  let alice: any = new ethers.Wallet(aliceSecret);
  let bob: any = new ethers.Wallet(bobSecret);
  log(".........alice", alice.address);
  log(".........bob", bob.address);

  before("Create a request", function () {
    path = "http://0.0.0.0:8083/rest/orders/9";
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
    request = { shipping: shipping };
  });

  beforeEach(function () {
    //tokenId = 9;
  });

  context("Timestamp", () => {
    it("should throw when format is not ISO:8601", async () => {
      certificate = {
        data: {
          intent: "Print",
          clientId: "wagmigames.api.3dHoudini.tech"
        },
        timestamp: "28 July 2023, 8:30PM"
      };
      flattened = JSON.stringify(certificate);
      signature = await alice.signMessage(flattened);

      credential = {
        certificate: { data: flattened },
        signature: signature,
        signer: { address: alice.address }
      };

      let response: any;

      try {
        response = await axios.post(path, request, { params: credential });
        expect(response.data.code).to.equal("ERROR");
        expect(response.data.data).to.be.null;
        expect(response.data.error).to.equal("Auth: Invalid timestamp");
        //log('    .....[OK] ', response.data)
      } catch (error) {
        log("    .....[ERR] ", error);
      }
    });

    it("should throw when credential has expired", async () => {
      const currentDate: number = new Date().getTime();
      const twoHoursInMilliseconds: number = 2 * 60 * 60 * 1000;
      const twoHoursAgo = new Date(currentDate - twoHoursInMilliseconds);

      certificate = {
        data: {
          intent: "Print",
          clientId: "wagmigames.api.3dHoudini.tech"
        },
        timestamp: twoHoursAgo
      };
      flattened = JSON.stringify(certificate);
      signature = await alice.signMessage(flattened);

      credential = {
        certificate: { data: flattened },
        signature: signature,
        signer: { address: alice.address }
      };

      let response: any;

      try {
        response = await axios.post(path, request, { params: credential });
        expect(response.data.code).to.equal("ERROR");
        expect(response.data.data).to.be.null;
        expect(response.data.error).to.equal("Auth: Expired credential");
        //log('    .....[OK] ', response.data)
      } catch (error) {
        log("    .....[ERR] ", error);
      }
    });
  });

  context("Signer and signature", () => {
    it("should throw when signer is not a valid evm address", async () => {
      certificate = {
        data: {
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
        signer: { address: alice.address.substring(2) }
      };

      let response: any;

      try {
        response = await axios.post(path, request, { params: credential });
        expect(response.data.code).to.equal("ERROR");
        expect(response.data.data).to.be.null;
        expect(response.data.error).to.equal("Auth: Invalid signer");
        //log('    .....[OK] ', response.data)
      } catch (error) {
        log("    .....[ERR] ", error.response.data);
      }
    });

    it("should throw when recovered signer does not match", async () => {
      const currentDate: number = new Date().getTime();
      const twoHoursInMilliseconds: number = 2 * 60 * 60 * 1000;
      const twoHoursAgo = new Date(currentDate - twoHoursInMilliseconds);

      certificate = {
        data: {
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
        signer: { address: bob.address }
      };

      let response: any;

      try {
        response = await axios.post(path, request, { params: credential });
        expect(response.data.code).to.equal("ERROR");
        expect(response.data.data).to.be.null;
        expect(response.data.error).to.equal("Auth: False signer");
        //log('    .....[OK] ', response.data)
      } catch (error) {
        log("    .....[ERR] ", error);
      }
    });

    it("should throw when signature is tampered", async () => {
      const currentDate: number = new Date().getTime();
      const twoHoursInMilliseconds: number = 2 * 60 * 60 * 1000;
      const twoHoursAgo = new Date(currentDate - twoHoursInMilliseconds);

      certificate = {
        data: {
          intent: "Print",
          clientId: "wagmigames.api.3dHoudini.tech"
        },
        timestamp: new Date()
      };
      flattened = JSON.stringify(certificate);
      signature = await alice.signMessage(flattened);

      credential = {
        certificate: { data: flattened },
        signature: signature.substring(4),
        signer: { address: alice.address }
      };

      let response: any;

      try {
        response = await axios.post(path, request, { params: credential });
        expect(response.data.code).to.equal("ERROR");
        expect(response.data.data).to.be.null;
        expect(response.data.error).to.equal("Auth: Invalid signature");
        //log('    .....[OK] ', response.data)
      } catch (error) {
        log("    .....[ERR] ", error.response.data);
      }
    });
  });

  context("Admin", () => {
    it("should throw when a non admin account tries to access admin paths", async () => {});
  });
});
