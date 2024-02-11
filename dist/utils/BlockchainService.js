"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainService = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const ethers_1 = require("ethers");
const params = tslib_1.__importStar(require("../params.json")); // Import contract parameters from params.json
// import * as contractAbi from "./abi.json"; // Import contract ABI from abi.json
let BlockchainService = class BlockchainService {
    provider;
    constructor() {
        const polygonRpcUrl = params.rpc;
        // const contractAddress = params.contractAddress;
        this.provider = new ethers_1.ethers.providers.JsonRpcProvider(polygonRpcUrl);
    }
    async verifyOwnership(tokenId, walletAddress) {
        try {
            /*
            const contractAbiArray = contractAbi as any[]; // Convert imported ABI to an array
      
            const contract = new ethers.Contract(contractAddress, contractAbiArray, this.provider);
      
            const owner = await contract.ownerOf(tokenId);
      
            return owner === walletAddress.toLowerCase();
            */
            return true;
        }
        catch (error) {
            console.error("Error verifying ownership:", error);
            return false;
        }
    }
};
exports.BlockchainService = BlockchainService;
exports.BlockchainService = BlockchainService = tslib_1.__decorate([
    (0, di_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], BlockchainService);
//# sourceMappingURL=BlockchainService.js.map