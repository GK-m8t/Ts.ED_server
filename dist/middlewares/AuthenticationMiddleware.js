"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationMiddleware = void 0;
const tslib_1 = require("tslib");
const platform_params_1 = require("@tsed/platform-params");
const platform_middlewares_1 = require("@tsed/platform-middlewares");
const ethers_1 = require("ethers");
const constants_1 = require("../constants");
let log = console.log;
let AuthenticationMiddleware = class AuthenticationMiddleware {
    use(context, credential) {
        const path = context.endpoint.propertyKey;
        const adminPaths = constants_1.Governance.ADMIN_PATHS;
        const adminAccounts = constants_1.Governance.ADMIN_ACCOUNTS;
        const credentialValidity = constants_1.Governance.CREDENTIAL_VALIDITY_IN_SECONDS;
        const timestampPattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}\.\d{3})Z$/;
        const ethAddressPattern = /^0x[0-9a-fA-F]{40}$/;
        const now = Math.floor(new Date().getTime() / 1000);
        let certificate;
        let signedAt;
        let claimed;
        let recovered;
        let isAdminAccount;
        let isAdminPath;
        let timestamp;
        try {
            certificate = JSON.parse(credential.certificate);
            if (!timestampPattern.test(certificate.timestamp.toString())) {
                throw new Error("Auth: Invalid timestamp");
            }
            signedAt = Math.floor(new Date(certificate.timestamp).getTime() / 1000);
            if (Math.abs(now - signedAt) > credentialValidity) {
                throw new Error("Auth: Expired credential");
            }
            claimed = JSON.parse(credential.signer);
            if (!ethAddressPattern.test(claimed.address)) {
                throw new Error("Auth: Invalid signer");
            }
            try {
                recovered = {
                    address: ethers_1.ethers.utils.verifyMessage(credential.certificate, credential.signature)
                };
            }
            catch (error) {
                throw new Error("Auth: Invalid signature" + error.message);
            }
            if (recovered.address.toLowerCase() !== claimed.address.toLowerCase()) {
                throw new Error("Auth: False signer");
            }
            isAdminAccount = adminAccounts.includes(recovered.address);
            isAdminPath = adminPaths.includes(path);
            if (isAdminPath && !isAdminAccount) {
                throw new Error("Auth: Access denied");
            }
        }
        catch (error) {
            context.response.status(200).body({
                code: "ERROR",
                data: null,
                error: error.message
            });
        }
    }
};
exports.AuthenticationMiddleware = AuthenticationMiddleware;
tslib_1.__decorate([
    tslib_1.__param(0, (0, platform_params_1.Context)()),
    tslib_1.__param(1, (0, platform_params_1.QueryParams)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthenticationMiddleware.prototype, "use", null);
exports.AuthenticationMiddleware = AuthenticationMiddleware = tslib_1.__decorate([
    (0, platform_middlewares_1.Middleware)()
], AuthenticationMiddleware);
//# sourceMappingURL=AuthenticationMiddleware.js.map