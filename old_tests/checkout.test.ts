import axios from "axios";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Checkout API Test", () => {
  it("should return a string for card checkout", async () => {
    const isCard = true;
    const response = await axios.post(`http://0.0.0.0:8083/rest/checkout/1`, {
      isCard
    });

    // Assert the status code using Chai
    expect(response.status).to.equal(200);

    // Assert the response body properties using Chai
    expect(response.data).to.be.an("string");
  });
  it("should be a valid link for card checkout", async () => {
    // Make a GET request to the API endpoint
    const isCard = true;
    const response = await axios.post(`http://0.0.0.0:8083/rest/checkout/1`, {
      isCard
    });

    // Assert the status code using Chai
    expect(response.status).to.equal(200);

    // Assert the response body properties using Chai
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    expect(response.data).to.match(urlRegex);
  });
  it("should return a string for coinbase checkout", async () => {
    const isCard = false;
    const response = await axios.post(`http://0.0.0.0:8083/rest/checkout/1`, {
      isCard
    });

    // Assert the status code using Chai
    expect(response.status).to.equal(200);

    // Assert the response body properties using Chai
    expect(response.data).to.be.an("string");
  });
  it("should be a valid link for coinbase checkout", async () => {
    // Make a GET request to the API endpoint
    const isCard = false;
    const response = await axios.post(`http://0.0.0.0:8083/rest/checkout/1`, {
      isCard
    });

    // Assert the status code using Chai
    expect(response.status).to.equal(200);

    // Assert the response body properties using Chai
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    expect(response.data).to.match(urlRegex);
  });
});
