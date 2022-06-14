export interface InvoiceDetails {
    autoId: number;
    invoiceNo: string;
    invoiceDate: Date;
    invoiceDueDate: Date;
    hourlyRate: number
    noHours: number
    adjustmentAmount: number
    videturCommPer: number
    videturCommAmount: number
    latePayment: number
    totalAmount: number
    remarks: string
    preparedBy: string
    preparedFor: string
}

export interface AppearanceInvoiceDetails {
    autoId: number;
    firmName: string;
    firstName: string;
    lastName: string;
    attFirstName: string;
    attLastName: string;
    invoiceNo: string;
    invoiceDate: Date;
    invoiceDueDate: Date;
    hourlyRate: number
    noHours: number
    adjustmentAmount: number
    videturCommPer: number
    videturCommAmount: number
    latePayment: number
    totalAmount: number
    status: string
}
export interface AppearanceInvoiceReceipt {
    autoId: number;
    firmName: string;
    firstName: string;
    lastName: string;
    attFirstName: string;
    attLastName: string;
    invoiceNo: string;
    invoiceDate: Date;
    invoiceDueDate: Date;
    hourlyRate: number
    noHours: number
    adjustmentAmount: number
    videturCommPer: number
    videturCommAmount: number
    latePayment: number
    totalAmount: number
    status: string
    receiptAmount: number
    paymentMode: string
    paymentSatus: string
}