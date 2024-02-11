"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnershipVerificationUtil = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const ethers_1 = require("ethers");
const axios_1 = tslib_1.__importDefault(require("axios"));
const constants_1 = require("../constants");
let log = console.log;
let OwnershipVerificationUtil = class OwnershipVerificationUtil {
    contract;
    deployedContract;
    provider;
    lastUpdate = 0;
    ownersRefetchInterval = 1000;
    owners = {};
    constructor() {
        this.contract = {
            address: constants_1.System.CONTRACT_ADDRESS,
            abi: constants_1.System.CONTRACT_ABI
        };
        this.provider = new ethers_1.ethers.providers.JsonRpcProvider(constants_1.System.BLOCKCHAIN_RPC);
        this.deployedContract = new ethers_1.ethers.Contract(this.contract.address, this.contract.abi, this.provider);
    }
    async verifyOwnership(tokenId, account) {
        try {
            const now = Math.floor(new Date().getTime() / 1000);
            if (now - this.lastUpdate > this.ownersRefetchInterval) {
                await this.updateOwners();
                this.lastUpdate = now;
            }
            let ownerTokens = this.owners[account.address.toLowerCase()];
            if (ownerTokens) {
                return ownerTokens.includes(tokenId);
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async updateOwners() {
        let baseURL = "https://polygon-mainnet.g.alchemy.com/nft/v2/";
        const options = {
            method: "GET",
            url: baseURL + process.env.ALCHEMY_API_KEY + "/getOwnersForCollection",
            params: {
                contractAddress: this.contract.address,
                withTokenBalances: "true"
            },
            headers: { accept: "application/json" }
        };
        try {
            let res = await axios_1.default.request(options);
            let ownrs = res.data.ownerAddresses;
            for (let i = 0; i < ownrs.length; i++) {
                let tkns = ownrs[i].tokenBalances;
                this.owners[ownrs[i].ownerAddress] = [];
                for (let j = 0; j < tkns.length; j++) {
                    this.owners[ownrs[i].ownerAddress].push(parseInt(tkns[j].tokenId, 16).toString());
                }
            }
            console.log("own", this.owners);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
};
exports.OwnershipVerificationUtil = OwnershipVerificationUtil;
exports.OwnershipVerificationUtil = OwnershipVerificationUtil = tslib_1.__decorate([
    (0, di_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], OwnershipVerificationUtil);
//# sourceMappingURL=OwnershipVerificationUtil.js.map