"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexController = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const schema_1 = require("@tsed/schema");
let IndexController = class IndexController {
    get() {
        return {
            title: "3dHoudini",
            description: "webhook",
            routes: ["/card", "/crypto"]
        };
    }
};
exports.IndexController = IndexController;
tslib_1.__decorate([
    (0, schema_1.Get)("/"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], IndexController.prototype, "get", null);
exports.IndexController = IndexController = tslib_1.__decorate([
    (0, di_1.Controller)("/")
], IndexController);
//# sourceMappingURL=IndexController.js.map