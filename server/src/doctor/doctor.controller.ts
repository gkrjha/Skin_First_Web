import {
  Controller,
  Post,
  Body,
  Query,
  BadRequestException,
  Get,
  Request,
  UseGuards,
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

@Controller('doctor')
export class DoctorController {
  constructor(
    private jwtService: JwtService,
    private doctorService: DoctorService,
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

    return this.doctorService.updateDoctorStatus(id, status);
  }
}
