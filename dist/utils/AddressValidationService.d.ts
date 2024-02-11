export declare class AddressValidationService {
    private readonly apiKey;
    private readonly apiUrl;
    constructor();
    validateAddress(address: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    }): Promise<{
        addressValidation: boolean;
        addressSuggestion: {
            street: string;
            city: string;
            state: string;
            zip: string;
            country: string;
        };
    }>;
}
