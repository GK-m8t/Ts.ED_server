"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const index_1 = require("./envs/index");
const index_2 = tslib_1.__importDefault(require("./logger/index"));
const index_3 = tslib_1.__importDefault(require("./mongoose/index"));
const pkg = JSON.parse((0, fs_1.readFileSync)("./package.json", { encoding: "utf8" }));
exports.config = {
    version: pkg.version,
    envs: index_1.envs,
    logger: index_2.default,
    mongoose: index_3.default
    // additional shared configuration
};
//# sourceMappingURL=index.js.map