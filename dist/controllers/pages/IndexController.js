"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexController = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const platform_params_1 = require("@tsed/platform-params");
const platform_views_1 = require("@tsed/platform-views");
const schema_1 = require("@tsed/schema");
let IndexController = class IndexController {
    swagger;
    get(protocol, host) {
        const hostUrl = `${protocol || "http"}://${host}`;
        return {
            BASE_URL: hostUrl,
            docs: this.swagger.map((conf) => {
                return {
                    url: hostUrl + conf.path,
                    ...conf
                };
            })
        };
    }
};
exports.IndexController = IndexController;
tslib_1.__decorate([
    (0, di_1.Constant)("swagger"),
    tslib_1.__metadata("design:type", Array)
], IndexController.prototype, "swagger", void 0);
tslib_1.__decorate([
    (0, schema_1.Get)("/"),
    (0, platform_views_1.View)("swagger.ejs"),
    (0, schema_1.Returns)(200, String).ContentType("text/html"),
    tslib_1.__param(0, (0, platform_params_1.HeaderParams)("x-forwarded-proto")),
    tslib_1.__param(1, (0, platform_params_1.HeaderParams)("host")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], IndexController.prototype, "get", null);
exports.IndexController = IndexController = tslib_1.__decorate([
    (0, schema_1.Hidden)(),
    (0, di_1.Controller)("/")
], IndexController);
//# sourceMappingURL=IndexController.js.map