export interface Notification {
    autoId: number;
    eventCode: string;
    notificationType: string;
    tone: string;
    appFrequency: number;
    appFrequencyInterval: string;
    appContent: string;
    emailFrequency: number;
    emailFrequencyInterval: string;
    emailSubject: string;
    emailContent: string;
    smtpServer: string;
    smtpPort: number;
    smtpSsl: string;
    smtpFromName: string;
    smtpEmail: string;
    smtpPassword: string;
}
