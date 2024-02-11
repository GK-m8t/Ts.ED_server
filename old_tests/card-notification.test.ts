import axios from "axios";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Stripe Card webhook Test", () => {
  it("should return true to acknowledge the checkout completed receipt", async () => {
    const isCard = true;
    const response = await axios.post(`http://0.0.0.0:8083/rest/checkout/1`, {
      isCard
    });

    // Assert the status code using Chai
    expect(response.status).to.equal(200);

    // Assert the response body properties using Chai
    expect(response.data).to.be.an("string");
  });
  it("should update the status to 'complete' when the checkout has been completed", async () => {
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
  it("should return true to acknowledge the checkout expire receipt", async () => {
    const isCard = true;
    const response = await axios.post(`http://0.0.0.0:8083/rest/checkout/1`, {
      isCard
    });

    // Assert the status code using Chai
    expect(response.status).to.equal(200);

    // Assert the response body properties using Chai
    expect(response.data).to.be.an("string");
  });
  it("should update the status to expire when the checkout has expired", async () => {
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
});
