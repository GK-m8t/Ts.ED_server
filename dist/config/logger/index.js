"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@tsed/common");
const index_1 = require("../envs/index");
if (index_1.isProduction) {
    common_1.$log.appenders.set("stdout", {
        type: "stdout",
        levels: ["info", "debug"],
        layout: {
            type: "json"
        }
    });
    common_1.$log.appenders.set("stderr", {
        levels: ["trace", "fatal", "error", "warn"],
        type: "stderr",
        layout: {
            type: "json"
        }
    });
}
exports.default = {
    disableRoutesSummary: index_1.isProduction
};
//# sourceMappingURL=index.js.map