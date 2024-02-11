"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerUpController = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const schema_1 = require("@tsed/schema");
let ServerUpController = class ServerUpController {
    get() {
        return "Server is up!";
    }
};
exports.ServerUpController = ServerUpController;
tslib_1.__decorate([
    (0, schema_1.Get)("/"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ServerUpController.prototype, "get", null);
exports.ServerUpController = ServerUpController = tslib_1.__decorate([
    (0, di_1.Controller)("/")
], ServerUpController);
//# sourceMappingURL=ServerUpController.js.map