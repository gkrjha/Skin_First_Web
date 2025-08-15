import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from '../DOTS/Admin.dto';
import { AuthGuard } from '@nestjs/passport';
import { SetMetadata } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
// import { SmsService } from 'src/sms/sms.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    // private readonly smsService: SmsService,
  ) {}

  //  First time signup, only if no admin exists
  @Post('signup')
  async firstAdminSignup(@Body() dto: CreateAdminDto) {
    return this.adminService.createFirstAdmin(dto);
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @SetMetadata('role', 'admin')
  async createAdmin(@Body() dto: CreateAdminDto, @Request() req) {
    console.log(req);

    if (req.user.role !== 'admin') throw new Error('Unauthorized');
    return this.adminService.createAdmin(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('invite')
  async inviteDoctor(
    @Body() body: { email?: string; phone?: string },

    @Request() req,
  ) {
    console.log(req.user);

    if (req.user.role !== 'admin') throw new Error('Unauthorized');

    const payload = { invitedBy: req.user.id };
    const token = this.jwtService.sign(payload, { expiresIn: '1d' });

    const inviteLink = `http://localhost:5173/doctor/register?token=${encodeURIComponent(token)}`;

    const subject = 'You are invited to join our platform';
    const message = `You have been invited to join our platform. Click the link below to register:\n\n${inviteLink}`;

    if (body.email) {
      await this.mailerService.sendEmail(body.email, message, subject);
    }

    return { message: 'Invite sent', inviteLink };
  }
}
