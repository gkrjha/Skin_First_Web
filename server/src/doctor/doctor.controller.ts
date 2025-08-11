import {
  Controller,
  Post,
  Body,
  Query,
  BadRequestException,
  Get,
  Request,
  UseGuards,
  Patch,
  Param,
  UseInterceptors,
  UploadedFiles,
  Put,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from 'src/DOTS/Doctors.dtos';
import { AuthGuard } from '@nestjs/passport';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtPayload } from 'jsonwebtoken';
import { MailerService } from 'src/mailer/mailer.service';

interface JwtUserPayload {
  _id: string;
  email: string;
  role: string;
}

@Controller('doctor')
export class DoctorController {
  constructor(
    private jwtService: JwtService,
    private doctorService: DoctorService,
    private MailerService: MailerService,
  ) {}

  @Post('register')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profileImage', maxCount: 1 },
        { name: 'licence', maxCount: 1 },
        { name: 'signatureImage', maxCount: 1 },
        { name: 'documents', maxCount: 10 },
        { name: 'clinicImages', maxCount: 10 },
        { name: 'certificateImages', maxCount: 10 },
      ],
      {
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
        fileFilter: (req, file, cb) => {
          if (file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
            cb(null, true);
          } else {
            cb(new Error('Only images and PDFs are allowed!'), false);
          }
        },
      },
    ),
  )
  async registerDoctor(
    @Body() dto: CreateDoctorDto,
    @Query('token') token: string,
    @UploadedFiles()
    files: {
      profileImage?: Express.Multer.File[];
      licence?: Express.Multer.File[];
      signatureImage?: Express.Multer.File[];
      documents?: Express.Multer.File[];
      clinicImages?: Express.Multer.File[];
      certificateImages?: Express.Multer.File[];
    },
  ) {
    let payload;
    try {
      payload = this.jwtService.verify(token);
      console.log('Decoded payload:', payload);
    } catch (err) {
      console.error('Token verification error:', err.message);
      throw new BadRequestException('Invalid or expired invite link');
    }

    return this.doctorService.createPendingDoctor(
      dto,
      payload.invitedBy,
      files,
    );
  }

  @Get('filter')
  async getallfiltereddoctor(@Query() query: any) {
    const doctorExists = await this.doctorService.getllfiltereddoctor(query);
    return doctorExists;
  }
  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  async getAllDoctors(@Request() req) {
    const role = req.user?.role;
    if (role !== 'admin' && role !== 'patient') {
      throw new BadRequestException('Unauthorized access');
    }

    const doctors = await this.doctorService.getAllDoctors();
    return doctors;
  }
  @Get(':id')
  async getDoctorById(@Param('id') id: string) {
    const doctor = await this.doctorService.getDoctorById(id);
    if (!doctor) {
      throw new BadRequestException('Doctor not found');
    }
    return doctor;
  }
  @Get('profile/:id')
  @UseGuards(AuthGuard('jwt'))
  async getDoctorProfile(@Param('id') id: string, @Request() req) {
    const loggedInUser = req.user;
    const { role, sub: userId } = loggedInUser;

    if (role !== 'admin' && userId !== id) {
      throw new BadRequestException(
        'You are not allowed to view this doctor profile',
      );
    }
    const doctor = await this.doctorService.getDoctorById(id);
    return doctor;
  }

  @Put('update-status/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateDoctorStatus(
    @Param('id') id: string,
    @Body('status') status: 'approved' | 'declined',
    @Request() req,
  ) {
    const loggedInUser = req.user;
    const { role, sub: userId } = loggedInUser;

    if (role !== 'admin' && userId !== id) {
      throw new BadRequestException(
        'You are not allowed to update this doctor status',
      );
    }
    const Currentstatus = this.doctorService.updateDoctorStatus(id, status);
    const doctor = await this.doctorService.getDoctorById(id);
    if (status === 'approved') {
      let subject = 'Your Doctor Account has been Approved';
      let message = `Congratulations! Your doctor account has been approved. You can now start using the platform.`;
      this.MailerService.sendEmail(doctor.email, message, subject);
    } else if (status === 'declined') {
      let subject = 'Your Doctor Account has been Declined';
      let message = `We regret to inform you that your doctor account application has been declined. If you have any questions, please contact support.`;
      this.MailerService.sendEmail(doctor.email, message, subject);
    }
    return Currentstatus;
  }

  @Patch('update-documents')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'licence', maxCount: 1 },
      { name: 'signatureImage', maxCount: 1 },
      { name: 'documents', maxCount: 10 },
      { name: 'certificateImages', maxCount: 10 },
    ]),
  )
  async updateDoctorDocuments(
    @Request() req,
    @Body() body: { specialization?: string; experience?: number },
  ) {
    const loggedInUser = req.user;
    console.log('Logged in user:', loggedInUser);

    const { _id, role } = loggedInUser;

    if (role !== 'doctor') {
      throw new BadRequestException(
        'You are not allowed to update this doctor documents',
      );
    }

    const files = req.files;
    if (!files) {
      throw new BadRequestException('No files provided for update');
    }

    return this.doctorService.updateDoctorDocument(_id, files, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('approve-documents/:id')
  async approveDoctorDocuments(
    @GetUser() user: JwtUserPayload,
    @Param('id') id: string,
  ) {
    console.log('User attempting to approve documents:', user);

    if (user.role !== 'admin') {
      throw new BadRequestException('Unauthorized access');
    }
    return this.doctorService.approveDoctorDocuments(id);
  }
}
