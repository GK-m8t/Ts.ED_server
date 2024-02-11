import { PaymentMethod, PaymentStatus, ShippingStatus } from "src/types/enums";
export interface Cost {
    print: number;
    ship: number;
}
export interface Shipping {
    name: string;
    email: string;
    address: PostalAddress;
    _phone: string | null;
}
export interface Payment {
    method: PaymentMethod;
    session: object;
    lastEventId: string | null;
}
export interface Status {
    payment: PaymentStatus | null;
    shipping: ShippingStatus | null;
}
export interface PostalAddress {
    street1: string;
    street2: string | null;
    city: string;
    state: string;
    zip: string;
    country: string;
}
export interface PaymentLink {
    url: string;
    expiresAt: Date;
}
export interface ChangeLog<P> {
    timestamp: Date;
    previous: P;
    next: P;
    _remark: string | null;
}
export interface History {
    payment: ChangeLog<Payment>[];
    shipping: ChangeLog<Shipping>[];
    status: ChangeLog<Status>[];
}
