export declare const Governance: {
    ADMIN_ACCOUNTS: string[];
    ADMIN_PATHS: string[];
    PRINTING_PRICE_IN_USD: number;
    DOMESTIC_SHIPPING_CHARGE_IN_USD: number;
    INTERNATIONAL_SHIPPING_CHARGE_IN_USD: number;
    CREDENTIAL_VALIDITY_IN_SECONDS: number;
    CARD_PAYMENT_VALIDITY_IN_SECONDS: number;
    CRYPTO_PAYMENT_VALIDITY_IN_SECONDS: number;
    PAYMENT_SUCCESS_REDIRECT_URL: string;
    PAYMENT_CANCEL_REDIRECT_URL: string;
};
export declare const System: {
    BLOCKCHAIN_RPC: string;
    CONTRACT_ADDRESS: string;
    CONTRACT_ABI: ({
        inputs: never[];
        name: string;
        type: string;
        anonymous?: undefined;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
};
