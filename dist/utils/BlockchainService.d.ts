export declare class BlockchainService {
    private readonly provider;
    constructor();
    verifyOwnership(tokenId: number, walletAddress: string): Promise<boolean>;
}
