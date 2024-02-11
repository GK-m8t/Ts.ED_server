export interface Account {
    address: string;
}
export interface Certificate<Form> {
    form: Form;
    timestamp: Date;
}
export interface FlattenedCertificate {
    data: string;
}
export interface Credential {
    certificate: FlattenedCertificate;
    signature: string;
    signer: Account;
}
export interface CustomerForm {
    intent: string;
    clientId: string;
}
export interface ClientForm {
    intent: string;
    group: string;
}
export interface AdminForm {
    intent: string;
    group: string;
}
