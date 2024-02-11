"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoPaymentService = void 0;
class CryptoPaymentService {
    constructor() { }
    async createCoinbaseCharge(price) {
        try {
            const coinbaseAPIKey = process.env.COINBASE_API_KEY || "";
            const apiUrl = "https://api.commerce.coinbase.com/charges";
            const coinbaseHeaders = new Headers();
            coinbaseHeaders.append("Content-Type", "application/json");
            coinbaseHeaders.append("Accept", "application/json");
            coinbaseHeaders.append("X-CC-Api-Key", coinbaseAPIKey);
            const requestData = {
                name: "test",
                description: "test description",
                pricing_type: "fixed_price",
                local_price: {
                    amount: price,
                    currency: "USD"
                }
            };
            const raw = JSON.stringify(requestData);
            const requestOptions = {
                method: "POST",
                headers: coinbaseHeaders,
                body: raw,
                redirect: "follow"
            };
            const coinbaseChargeApiResponse = await fetch(apiUrl, requestOptions);
            if (!coinbaseChargeApiResponse.ok) {
                throw new Error(`Failed to post data to Coinbase API. Status: ${coinbaseChargeApiResponse.status}`);
            }
            const coinbaseData = await coinbaseChargeApiResponse.json();
            // console.log(coinbaseData.data);
            return {
                payment_url: coinbaseData.data.hosted_url,
                timestamp: new Date(coinbaseData.data.created_at).valueOf
            };
        }
        catch (error) {
            console.error("Error posting data to Coinbase API:", error);
            throw error;
        }
    }
}
exports.CryptoPaymentService = CryptoPaymentService;
//# sourceMappingURL=CryptoPaymentService.js.map