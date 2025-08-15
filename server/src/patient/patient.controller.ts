import {
  Controller,
  Put,
  Param,
  Post,
  Body,
  Patch,
  Get,
  UseGuards,
  Query,
  Delete,
  BadRequestException,
  UploadedFiles,
  UseInterceptors,
  ForbiddenException,
  Request,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { PatientService } from './patient.service';
import { UpdatePatientDto } from 'src/DOTS/UpdatePatient.dtos';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient } from 'src/Schema/patient.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreatePatientDto } from 'src/DOTS/Patient.dtos';

interface JwtUserPayload {
  _id: string;
  email: string;
  role: string;
}

@Controller('patient')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly cloudinaryService: CloudinaryService,
    private jwtService: JwtService,
    @InjectModel(Patient.name) private readonly patientModel: Model<Patient>,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('get-all')
  async getAllPatients(@GetUser() user: JwtUserPayload) {
    const patients = await this.patientService.getAllUser(user);
    return patients;
  }

  @Get('coutn/patient')
  async countpatient() {
    return this.patientService.countpatient();
  }

  @Patch('update-patient/:id')
  async updatePatient(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientService.updatePatientById(id, updatePatientDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-user/:id')
  async getUserById(@Param('id') id: string, @GetUser() user: JwtUserPayload) {
    const fetcheduser = await this.patientService.findPatientById(id, user);
    return fetcheduser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@GetUser() user: JwtUserPayload) {
    console.log(user);
    const fullUser = await this.patientService.logeduser(user._id, user);
    return fullUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  async deletePatientById(@Param('id') id: string, @Request() req) {
    const loggedInUser = req.user;
    const { role, sub: userId } = loggedInUser;

    if (role !== 'admin' && userId !== id) {
      throw new ForbiddenException(
        'You are not allowed to delete this patient',
      );
    }

    const user = await this.patientService.deletePatientById(id);
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('upload-all')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'medicalHistory', maxCount: 5 },
        { name: 'medicalReports', maxCount: 5 },
        { name: 'insuranceCardImage', maxCount: 5 },
      ],
      {
        storage: memoryStorage(),
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
  async uploadDocuments(
    @UploadedFiles()
    files: {
      medicalHistory?: Express.Multer.File[];
      medicalReports?: Express.Multer.File[];
      insuranceCardImage?: Express.Multer.File[];
    },
    @GetUser() user: JwtUserPayload,
  ) {
    return this.patientService.uploadDocuments(user, files);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete-file')
  async deleteFile(
    @Query('fileUrl') fileUrl: string,
    @Query('fileType')
    fileType: 'medicalHistoryFiles' | 'medicalReports' | 'insuranceCardImage',
    @GetUser() user: JwtUserPayload,
  ) {
    console.log(fileType);

    return this.patientService.deleteDocument(user._id, fileType, fileUrl);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('recent-patient')
  async getrecent() {
    return this.patientService.recentpatient();
  }
}
