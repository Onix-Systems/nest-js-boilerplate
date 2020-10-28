export interface Mail {
    readonly toEmail: string;
    readonly subject: string;
    readonly text?: string;
    readonly html?: string;
}
