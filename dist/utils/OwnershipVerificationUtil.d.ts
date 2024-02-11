import { Account } from "../types";
export declare class OwnershipVerificationUtil {
    private readonly contract;
    private readonly deployedContract;
    private readonly provider;
    private lastUpdate;
    private readonly ownersRefetchInterval;
    private readonly owners;
    constructor();
    verifyOwnership(tokenId: string, account: Account): Promise<boolean>;
    private updateOwners;
}
