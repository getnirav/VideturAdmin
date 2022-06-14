export interface LatePaymentCharges {
    autoId: number;
    fromDays: number;
    toDays: number;
    penaltyPercent: number;
    description: string;
}
