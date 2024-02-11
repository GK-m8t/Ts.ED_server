import { Injectable } from "@tsed/di";
import { ethers } from "ethers";
import axios from "axios";
import { Account, Contract } from "../types";
import { System } from "../constants";

let log: any = console.log;

@Injectable()
export class OwnershipVerificationUtil {
  private readonly contract: Contract;
  private readonly deployedContract: ethers.Contract;
  private readonly provider: ethers.providers.JsonRpcProvider;
  private lastUpdate: number = 0;
  private readonly ownersRefetchInterval: number = 1000;
  private readonly owners: any = {};

  constructor() {
    this.contract = {
      address: System.CONTRACT_ADDRESS,
      abi: System.CONTRACT_ABI
    };
    this.provider = new ethers.providers.JsonRpcProvider(System.BLOCKCHAIN_RPC);
    this.deployedContract = new ethers.Contract(
      this.contract.address,
      this.contract.abi,
      this.provider
    );
  }

  async verifyOwnership(tokenId: string, account: Account): Promise<boolean> {
    try {
      const now: number = Math.floor(new Date().getTime() / 1000);
      if (now - this.lastUpdate > this.ownersRefetchInterval) {
        await this.updateOwners();
        this.lastUpdate = now;
      }
      let ownerTokens = this.owners[account.address.toLowerCase()];
      if (ownerTokens) {
        return ownerTokens.includes(tokenId);
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  private async updateOwners() {
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
      let res: any = await axios.request(options);
      let ownrs = res.data.ownerAddresses;
      for (let i = 0; i < ownrs.length; i++) {
        let tkns = ownrs[i].tokenBalances;
        this.owners[ownrs[i].ownerAddress] = [];
        for (let j = 0; j < tkns.length; j++) {
          this.owners[ownrs[i].ownerAddress].push(
            parseInt(tkns[j].tokenId, 16).toString()
          );
        }
      }
      console.log("own", this.owners);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
