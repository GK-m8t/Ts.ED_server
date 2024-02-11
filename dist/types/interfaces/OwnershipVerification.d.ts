import { ContractInterface } from "ethers";
export interface Contract {
    address: string;
    abi: ContractInterface;
}
export interface TokenCollection {
    contract: Contract;
    members: number[];
}
