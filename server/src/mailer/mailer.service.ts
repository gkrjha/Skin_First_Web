// src/mailer/mailer.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService as DefaultMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: DefaultMailerService) {}

  async sendInvite(email: string, inviteLink: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Doctor Registration Invite',
      text: `You have been invited to register. Click here: ${inviteLink}`,
      html: `<p>You have been invited to register. Click <a href="${inviteLink}">here</a> to complete your registration.</p>`,
    });
  }
}
