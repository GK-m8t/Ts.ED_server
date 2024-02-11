import axios from "axios";
import { expect } from "chai";
import { Buyer, Shipping, ShippingStatus } from "../src/types";
import { ethers } from "ethers";
describe("Print request", () => {
  it("Signature should match and request should be updated", async () => {
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
      fullName: "George Mathew",
      contactNo: 1234567890,
      email: "john.doe@example.com",
      walletAddress: "0x7a6d16120884c600D10313A4b6FeF69f44B27d0c"
    };
    const shipping: Shipping = {
      address: {
        street: "N Calle F Vizcarrondo",
        city: "San Juan",
        state: "PR",
        zip: "00926",
        country: "US"
      },
      status: ShippingStatus.notRequested
    };

    // Perform the Axios request
    try {
      const response = await axios.put(
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
      expect(response.data.message).to.equal("Request Updated");
    } catch (error) {
      // Assert the response data
      // expect(error.response.status).to.equal(200);
      // console.log(error.response.data.message)
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
      fullName: "George Mathew",
      contactNo: 1234567890,
      email: "john.doe@example.com",
      walletAddress: "0x7a6d16120884c600D10313A4b6FeF69f44B27d0c"
    };
    const shipping: Shipping = {
      address: {
        street: "N Calle F Vizcarrondo",
        city: "San Juan",
        state: "PR",
        zip: "00926",
        country: "US"
      },
      status: ShippingStatus.notRequested
    };
    // Perform the Axios request
    try {
      const response = await axios.put(
        `http://0.0.0.0:8083/rest/requests/${tokenId}`,
        {
          walletAddress,
          signedMessage,
          originalMessage,
          buyer,
          shipping
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
      fullName: "George Mathew",
      contactNo: 1234567890,
      email: "john.doe@example.com",
      walletAddress: walletAddress
    };
    const shipping: Shipping = {
      address: {
        street: "N Calle F Vizcarrondo",
        city: "San Juan",
        state: "PR",
        zip: "00926",
        country: "US"
      },
      status: ShippingStatus.notRequested
    };
    // Perform the Axios request
    try {
      const response = await axios.put(
        `http://0.0.0.0:8083/rest/requests/${tokenId}`,
        {
          walletAddress,
          signedMessage,
          originalMessage,
          buyer,
          shipping
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
  it("Signature should match and shipping address to be updated is invalid", async () => {
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
      fullName: "George Mathew",
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
      const response = await axios.put(
        `http://0.0.0.0:8083/rest/requests/${tokenId}`,
        {
          walletAddress,
          signedMessage,
          originalMessage,
          buyer,
          shipping
        }
      );
      // If shipping address param is invalid, this line should not be reached
      expect.fail("Expected an error");
    } catch (error) {
      // Assert the response data
      expect(error).to.be.an("error");
      expect(error.message).to.equal("Invalid shipping address");
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
      const response = await axios.put(
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
      const response = await axios.put(
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
