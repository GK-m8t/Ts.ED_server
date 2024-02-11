"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProduction = exports.envs = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
exports.envs = {
    ...process.env,
    ...dotenv_1.default.config().parsed
};
exports.isProduction = process.env.NODE_ENV === "production";
//# sourceMappingURL=index.js.map