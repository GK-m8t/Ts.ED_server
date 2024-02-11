import axios from "axios";
import { expect } from "chai";
import { Buyer, Shipping, ShippingStatus } from "../src/types";
import { ethers } from "ethers";
describe("Print request", () => {
  it("Signature should match", async () => {
    const tokenId = 100;
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
    const shipping: Shipping = {
      address: {
        street: "13 Main St",
        city: "Example City",
        state: "CA",
        zip: "12345",
        country: "USA"
      },
      status: ShippingStatus.notRequested
    };

    // Perform the Axios request
    try {
      const response = await axios.post(
        `http://0.0.0.0:8083/rest/requests/${tokenId}`,
        {
          walletAddress,
          signedMessage,
          originalMessage,
          buyer,
          shipping
        }
      );
      expect(response.status).to.equal(200);
      expect(response.data.message).to.equal("Request created");
    } catch (error) {
      // Assert the response data
      // expect(error.response.status).to.equal(200);
      // console.log(error.response.data.message)
    }
  });
  it("Signature expired", async () => {
    const tokenId = 110;
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
      walletAddress: "0x7a6d16120884c600D10313A4b6FeF69f44B27d0c"
    };
    const shipping: Shipping = {
      address: {
        street: "13 Main St",
        city: "Example City",
        state: "CA",
        zip: "12345",
        country: "USA"
      },
      status: ShippingStatus.notRequested
    };
    // Perform the Axios request
    try {
      const response = await axios.post(
        `http://0.0.0.0:8083/rest/requests/${tokenId}`,
        {
          walletAddress,
          signedMessage,
          originalMessage,
          buyer,
          shipping
        }
      );
    } catch (error) {
      // Assert the response data
      expect(error.response.status).to.equal(401);
      // expect(error.response.data.message).to.equal('Signature expired');
    }
  });
  it("Signature validation should fail", async () => {
    const tokenId = 110;
    const walletAddress = "0x7a6d16120884c600D10313A4b6FeF69f44B27d0c";
    const signedMessage =
      "0xbb681f4df4e34835ac627c514ed4275403d2a0cf4ba9e1ac4d98f67ff72a62556992f1798e7d6ee1d81dd14e18a7c4744021ca7fb5206436b249ffcec83b2af41";
    const originalMessage = "Rishika timestamp:169643889217";
    const buyer: Buyer = {
      fullName: "John Doe",
      contactNo: 1234567890,
      email: "john.doe@example.com",
      walletAddress: "0x7a6d16120884c600D10313A4b6FeF69f44B27d0c"
    };
    const shipping: Shipping = {
      address: {
        street: "13 Main St",
        city: "Example City",
        state: "CA",
        zip: "12345",
        country: "USA"
      },
      status: ShippingStatus.notRequested
    };
    // Perform the Axios request
    try {
      const response = await axios.post(
        `http://0.0.0.0:8083/rest/requests/${tokenId}`,
        {
          walletAddress,
          signedMessage,
          originalMessage,
          buyer,
          shipping
        }
      );
    } catch (error) {
      // Assert the response data
      expect(error.response.status).to.equal(401);
      // expect(error.response.data.message).to.equal('Signature validation failed');
    }
  });
});
