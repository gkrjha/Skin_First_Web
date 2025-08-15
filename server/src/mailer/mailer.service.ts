
import { Injectable } from '@nestjs/common';
import { MailerService as DefaultMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: DefaultMailerService) {}

  async sendEmail(email: string, message: string, subject: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: subject,
      text: message,
    });
  }
}



