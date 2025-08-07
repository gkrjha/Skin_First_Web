// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import * as twilio from 'twilio';

// @Injectable()
// export class SmsService {
//   private client: twilio.Twilio;
//   private fromNumber: string;

//   constructor(private configService: ConfigService) {
//     const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
//     const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
//    this.fromNumber = this.configService.get<string>('TWILIO_PHONE_NUMBER')!;


//     // ✅ Validate env variables
//     if (!accountSid || !authToken || !this.fromNumber) {
//       throw new Error('Twilio credentials or phone number missing in .env');
//     }

//     this.client = twilio(accountSid, authToken);
//   }

//   async sendSms(phone: string, inviteLink: string) {
//     await this.client.messages.create({
//       body: `Doctor Registration Invite: ${inviteLink}`,
//       from: this.fromNumber,
//       to: phone,
//     });
//   }
// }
