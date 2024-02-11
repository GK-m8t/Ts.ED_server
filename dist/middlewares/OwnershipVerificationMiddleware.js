"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnershipVerificatonMiddleware = void 0;
const tslib_1 = require("tslib");
const platform_params_1 = require("@tsed/platform-params");
const platform_middlewares_1 = require("@tsed/platform-middlewares");
const utils_1 = require("../utils");
let log = console.log;
let OwnershipVerificatonMiddleware = class OwnershipVerificatonMiddleware {
    util;
    constructor(util) {
        this.util = util;
    }
    async use(context, tokenId, credential) {
        const account = JSON.parse(credential.signer);
        try {
            const result = await this.util.verifyOwnership(tokenId, account);
            if (!result) {
                context.response.status(403).body({
                    message: "OwnerVerifError: Account not owner."
                });
            }
        }
        catch (error) {
            context.response.status(500).body({
                message: `OwnerVerifError: ${error.message}`
            });
        }
    }
};
exports.OwnershipVerificatonMiddleware = OwnershipVerificatonMiddleware;
tslib_1.__decorate([
    tslib_1.__param(0, (0, platform_params_1.Context)()),
    tslib_1.__param(1, (0, platform_params_1.PathParams)("tokenId")),
    tslib_1.__param(2, (0, platform_params_1.QueryParams)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OwnershipVerificatonMiddleware.prototype, "use", null);
exports.OwnershipVerificatonMiddleware = OwnershipVerificatonMiddleware = tslib_1.__decorate([
    (0, platform_middlewares_1.Middleware)(),
    tslib_1.__metadata("design:paramtypes", [utils_1.OwnershipVerificationUtil])
], OwnershipVerificatonMiddleware);
//# sourceMappingURL=OwnershipVerificationMiddleware.js.map