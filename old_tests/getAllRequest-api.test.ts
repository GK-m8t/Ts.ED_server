import axios from "axios";
import { expect } from "chai";
import { Buyer, Shipping, ShippingStatus } from "../src/types";
import { ethers } from "ethers";
describe("Print request", () => {
  it("Signature should match and isAdmin", async () => {
    const wallet = ethers.Wallet.createRandom();
    const walletAddress = wallet.address;
    const data = {
      walletAddress,
      timestamp: new Date().getTime()
    };
    const originalMessage = JSON.stringify(data);
    const signedMessage = wallet.signMessage(originalMessage);

    const isAdmin = true;

    // Perform the Axios request
    try {
      const response = await axios.get(`http://0.0.0.0:8083/rest/requests/`, {
        params: {
          walletAddress,
          signedMessage,
          originalMessage,
          isAdmin
        }
      });
      expect(response.status).to.equal(200);
    } catch (error) {
      // Assert the response data
      // expect(error.response.status).to.equal(200);
      // console.log(error.response.data.message)
    }
  });
  it("Signature should match and when isAdmin is false", async () => {
    const wallet = ethers.Wallet.createRandom();
    const walletAddress = wallet.address;
    const data = {
      walletAddress,
      timestamp: new Date().getTime()
    };
    const originalMessage = JSON.stringify(data);
    const signedMessage = wallet.signMessage(originalMessage);
    const isAdmin = false;
    // Perform the Axios request
    try {
      const response = await axios.get(`http://0.0.0.0:8083/rest/requests/`, {
        params: {
          walletAddress,
          signedMessage,
          originalMessage,
          isAdmin
        }
      });
      // If isAdmin is false, this line should not be reached
      expect.fail("Expected an error");
    } catch (error) {
      // Assert the response data
      expect(error).to.be.an("error");
      expect(error.message).to.equal("This is an admin only function");
    }
  });

  it("Signature expired", async () => {
    const wallet = ethers.Wallet.createRandom();
    const walletAddress = wallet.address;
    const data = {
      walletAddress,
      timestamp: 169643889217
    };
    const originalMessage = JSON.stringify(data);
    const signedMessage = wallet.signMessage(originalMessage);
    const isAdmin = true;
    // Perform the Axios request
    try {
      const response = await axios.get(`http://0.0.0.0:8083/rest/requests/`, {
        params: {
          walletAddress,
          signedMessage,
          originalMessage,
          isAdmin
        }
      });
    } catch (error) {
      // Assert the response data
      expect(error.response.status).to.equal(401);
      // expect(error.response.data.message).to.equal('Signature expired');
    }
  });
  it("Signature validation should fail", async () => {
    const walletAddress = "0x7a6d16120884c600D10313A4b6FeF69f44B27d0c";
    const signedMessage =
      "0xbb681f4df4e34835ac627c514ed4275403d2a0cf4ba9e1ac4d98f67ff72a62556992f1798e7d6ee1d81dd14e18a7c4744021ca7fb5206436b249ffcec83b2af41";
    const originalMessage = "Rishika timestamp:169643889217";
    const isAdmin = true;
    // Perform the Axios request
    try {
      const response = await axios.get(`http://0.0.0.0:8083/rest/requests/`, {
        params: {
          walletAddress,
          signedMessage,
          originalMessage,
          isAdmin
        }
      });
    } catch (error) {
      // Assert the response data
      expect(error.response.status).to.equal(401);
      // expect(error.response.data.message).to.equal('Signature validation failed');
    }
  });
});
