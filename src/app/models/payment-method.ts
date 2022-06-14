export interface PaymentMethod {
    autoId: number;
    paymentImage: string;
    paymentCode: string;
    paymentDescription: string;
    paymentChargesPercentage: number;
    paymentChargesFixed: number;
}
