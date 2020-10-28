import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { Mail } from './interfaces/mail.interface';

@Injectable()
export default class MailService {
  constructor(private readonly mailerService: NestMailerService) {}

  sendMail(mail: Mail) {
    try {
      return this.mailerService.sendMail({
        to: mail.toEmail,
        from: process.env.MAILER_FROM_EMAIL,
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
      });
    } catch {
      throw new ServiceUnavailableException('Failed to send email');
    }
  }
}
