export declare enum PaymentMethod {
    card = "card",
    crypto = "crypto"
}
export declare enum ShippingStatus {
    notRequested = "notRequested",
    inPrint = "inPrint",
    dispatched = "dispatched",
    delivered = "delivered"
}
export declare enum PaymentStatus {
    pending = "pending",
    completed = "completed"
}
export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}
export interface Buyer {
    fullName: string;
    contactNo: number;
    email: string;
    walletAddress: string;
}
export interface Shipping {
    address: Address;
    status: ShippingStatus;
}
export interface Price {
    printingCost: number;
    shippingCost: number;
}
export interface Payment {
    method: PaymentMethod;
    link: string;
    status: PaymentStatus;
    createdTimeStamp: number;
}
