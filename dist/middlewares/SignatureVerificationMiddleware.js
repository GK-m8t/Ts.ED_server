"use strict";
/**
 * SignatureVerificationMiddleware is responsible for verifying the authenticity and integrity of incoming requests.
 *
 * @remarks
 * This middleware performs several checks to ensure the validity of incoming requests. It verifies the provided
 * signature against the original message, checks for timestamp validity, and compares the recovered address with
 * the provided wallet address. Additionally, it can enforce whitelisting for admin access.
 *
 * If any verification step fails, the middleware responds with an appropriate error message and status code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureVerificationMiddleware = void 0;
const tslib_1 = require("tslib");
const platform_params_1 = require("@tsed/platform-params");
const platform_middlewares_1 = require("@tsed/platform-middlewares");
const whitelist_1 = require("../whitelist/whitelist");
const ethers_1 = require("ethers");
let SignatureVerificationMiddleware = class SignatureVerificationMiddleware {
    use($ctx) {
        try {
            const { walletAddress, signedMessage, originalMessage, isAdmin } = $ctx.request.body;
            console.log(walletAddress, signedMessage, originalMessage, isAdmin);
            console.log("originalMessage", originalMessage);
            if (isAdmin) {
                console.log(whitelist_1.whitelistAddress.includes(walletAddress));
                if (!whitelist_1.whitelistAddress.includes(walletAddress)) {
                    console.log("wallet address is not in whitelist");
                    $ctx.response.status(401).body({
                        message: "wallet address is not in whitelist"
                    });
                }
            }
            const timestamp = parseInt(JSON.parse(originalMessage).timestamp);
            console.log("timestamp", timestamp);
            if (!timestamp) {
                $ctx.response.status(401).body({
                    message: "Timestamp not found"
                });
            }
            // Check if the timestamp is older than 5 minutes (300,000 milliseconds)
            const currentTime = new Date().getTime();
            console.log("currentTime", currentTime);
            if (currentTime - timestamp > 300000) {
                $ctx.response.status(401).body({
                    message: "Signature expired"
                });
            }
            console.log("originalMessage", originalMessage);
            const recoveredAddress = ethers_1.ethers.utils.verifyMessage(originalMessage, signedMessage);
            console.log("recoveredAddress", recoveredAddress);
            console.log("walletAddress", walletAddress);
            // Verify the recovered address and the wallet address
            if (recoveredAddress !== walletAddress ||
                currentTime - timestamp > 300000) {
                $ctx.response.status(401).body({
                    message: "Signature verification failed"
                });
            }
        }
        catch (error) {
            // Handle the error by sending a response with an error message and an appropriate status code
            $ctx.response.status(401).body({
                message: error.message
            });
        }
    }
};
exports.SignatureVerificationMiddleware = SignatureVerificationMiddleware;
tslib_1.__decorate([
    tslib_1.__param(0, (0, platform_params_1.Context)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SignatureVerificationMiddleware.prototype, "use", null);
exports.SignatureVerificationMiddleware = SignatureVerificationMiddleware = tslib_1.__decorate([
    (0, platform_middlewares_1.Middleware)()
], SignatureVerificationMiddleware);
//# sourceMappingURL=SignatureVerificationMiddleware.js.map