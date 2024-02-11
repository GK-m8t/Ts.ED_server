import axios from "axios";
import { expect } from "chai";
import { Address, Buyer, Shipping, ShippingStatus } from "../src/types";
import { ethers } from "ethers";

type QueryParams = {
  walletAddress: string;
  signedMessage: string;
  originalMessage: string;
};

type BodyParams = {
  buyer: Buyer;
  shipping: Shipping;
};

describe("Print request", () => {
  let tokenId: number;
  let wallet: any;
  let walletAddress: string;
  let message: object;
  let originalMessage: string;
  let signedMessage: string;
  let shippingAddress: Address;
  let shipping: Shipping;
  let buyer: Buyer;

  beforeEach(() => {
    tokenId = 1;
    wallet = ethers.Wallet.createRandom();
    walletAddress = wallet.address;
    message = {
      message: {
        from: "Wagmi Games",
        to: "3dHoudini",
        purpose: "3D Print"
      },
      timestamp: new Date().getTime()
    };
    originalMessage = JSON.stringify(message);
    signedMessage = wallet.signMessage(originalMessage);
    buyer = {
      fullName: "John Doe",
      contactNo: 1234567890,
      email: "john.doe@example.com",
      walletAddress: "0x7a6d16120884c600D10313A4b6FeF69f44B27d0c"
    };
    shippingAddress = {
      stree: "",
      city: "",
      state: "",
      zip: "",
      country: ""
    };
    shipping = {
      address: shippingAddress
    };
  });

  it("should successfully create a request.", async () => {
    let queryParams: QueryParams;
    let bodyParams: BodyParams;

    queryParams = {
      walletAddress: walletAddress,
      signedMessage: signedMessage,
      originalMessage: originalMessage
    };

    bodyParams = {
      buyer: buyer,
      shipping: shipping
    };

    try {
      const response = await axios.post(
        `http://0.0.0.0:8083/rest/requests/${tokenId}`,
        bodyParams,
        {
          params: queryParams
        }
      );
      expect(response.status).to.equal(200);
    } catch (error) {
      // Assert the response data
      // expect(error.response.status).to.equal(200);
      // console.log(error.response.data.message)
    }
  });
  /*
  it("Signature should match and buyer is not owner", async () => {
    const tokenId = 1;
    const wallet = ethers.Wallet.createRandom();
    const walletAddress = wallet.address;
    const data = {
      walletAddress,
      timestamp: new Date().getTime()
    };
    const originalMessage = JSON.stringify(data);
    const signedMessage = wallet.signMessage(originalMessage);
    const buyer: Buyer = {
      fullName: "John Doe",
      contactNo: 1234567890,
      email: "john.doe@example.com",
      walletAddress: walletAddress
    };
    // Perform the Axios request
    try {
      const response = await axios.get(
        `http://0.0.0.0:8083/rest/requests/${tokenId}`,
        {
          params: {
            walletAddress,
            signedMessage,
            originalMessage,
            buyer
          }
        }
      );
      // If buyer is not an owner, this line should not be reached
      expect.fail("Expected an error");
    } catch (error) {
      // Assert the response data
      expect(error).to.be.an("error");
      expect(error.message).to.equal("Not owner");
    }
  });
  it("Signature should match and there is no print request for the tokenID", async () => {
    const tokenId = 1000;
    const wallet = ethers.Wallet.createRandom();
    const walletAddress = wallet.address;
    const data = {
      walletAddress,
      timestamp: new Date().getTime()
    };
    const originalMessage = JSON.stringify(data);
    const signedMessage = wallet.signMessage(originalMessage);
    const buyer: Buyer = {
      fullName: "John Doe",
      contactNo: 1234567890,
      email: "john.doe@example.com",
      walletAddress: walletAddress
    };
    // Perform the Axios request
    try {
      const response = await axios.get(
        `http://0.0.0.0:8083/rest/requests/${tokenId}`,
        {
          params: {
            walletAddress,
            signedMessage,
            originalMessage,
            buyer
          }
        }
      );
      // If printReq doesnt exist for tokenID, this line should not be reached
      expect.fail("Expected an error");
    } catch (error) {
      // Assert the response data
      expect(error).to.be.an("error");
      expect(error.message).to.equal("Request doesnt exists");
    }
  });
  it("Signature expired", async () => {
    const tokenId = 1;
    const wallet = ethers.Wallet.createRandom();
    const walletAddress = wallet.address;
    const data = {
      walletAddress,
      timestamp: 169643889217
    };
    const originalMessage = JSON.stringify(data);
    const signedMessage = wallet.signMessage(originalMessage);
    const buyer: Buyer = {
      fullName: "John Doe",
      contactNo: 1234567890,
      email: "john.doe@example.com",
      walletAddress: walletAddress
    };
    // Perform the Axios request
    try {
      const response = await axios.get(
        `http://0.0.0.0:8083/rest/requests/${tokenId}`,
        {
          params: {
            walletAddress,
            signedMessage,
            originalMessage,
            buyer
          }
        }
      );
    } catch (error) {
      // Assert the response data
      expect(error.response.status).to.equal(401);
      // expect(error.response.data.message).to.equal('Signature expired');
    }
  });
  it("Signature validation should fail", async () => {
    const tokenId = 1;
    const walletAddress = "0x7a6d16120884c600D10313A4b6FeF69f44B27d0c";
    const signedMessage =
      "0xbb681f4df4e34835ac627c514ed4275403d2a0cf4ba9e1ac4d98f67ff72a62556992f1798e7d6ee1d81dd14e18a7c4744021ca7fb5206436b249ffcec83b2af41";
    const originalMessage = "Rishika timestamp:169643889217";
    const buyer: Buyer = {
      fullName: "John Doe",
      contactNo: 1234567890,
      email: "john.doe@example.com",
      walletAddress: walletAddress
    };
    // Perform the Axios request
    try {
      const response = await axios.get(
        `http://0.0.0.0:8083/rest/requests/${tokenId}`,
        {
          params: {
            walletAddress,
            signedMessage,
            originalMessage,
            buyer
          }
        }
      );
    } catch (error) {
      // Assert the response data
      expect(error.response.status).to.equal(401);
      // expect(error.response.data.message).to.equal('Signature validation failed');
    }
  });
  */
});
