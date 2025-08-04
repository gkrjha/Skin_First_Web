import {
  Controller,
  Put,
  Param,
  Post,
  Body,
  Patch,
  Get,
  UseGuards,
  Delete,
  BadRequestException,
  UploadedFiles,
  UploadedFile,
  UseInterceptors,
  ForbiddenException,
  Request,
} from '@nestjs/common';

import { PatientService } from './patient.service';
import { UpdatePatientDto } from 'src/DOTS/UpdatePatient.dtos';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

// ✅ Interface to represent JWT user payload
interface JwtUserPayload {
  _id: string;
  email: string;
  role: string;
}

// ------------------------------------------------------------------------------------------------

@Controller('patient') // ✅ All routes start with /patient
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  // ✅ 1. Update patient profile by ID (PUT)
  @Put('update-patient/:id')
  async updatePatient(
    @Param('id') id: string, // ✅ URL se patient id le rahe ho
    @Body() updatePatientDto: UpdatePatientDto, // ✅ Body se updated data
  ) {
    return this.patientService.updatePatientById(id, updatePatientDto);
  }

  // ------------------------------------------------------------------------------------------------

  // ✅ 2. Get patient by ID – Protected route with JWT
  @UseGuards(AuthGuard('jwt'))
  @Get('get-user/:id')
  async getuserById(@Param('id') id: string) {
    const user = await this.patientService.findPatientById(id);
    return user;
  }

  // ------------------------------------------------------------------------------------------------

  // ✅ 3. Get patient profile using JWT token
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@GetUser() user: JwtUserPayload) {
    const fullUser = await this.patientService.findPatientById(user._id);
    return fullUser;
  }

  // ------------------------------------------------------------------------------------------------

  // ✅ 4. Delete patient by ID – Protected route
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  async deletePatientById(@Param('id') id: string, @Request() req) {
    const loggedInUser = req.user; // JWT se user extract hua
    const { role, sub: userId } = loggedInUser;

    // ✅ Check kar rahe hai ki user admin hai ya same patient
    if (role !== 'admin' && userId !== id) {
      throw new ForbiddenException(
        'You are not allowed to delete this patient',
      );
    }

    const user = await this.patientService.deletePatientById(id);
    return user;
  }

  // ------------------------------------------------------------------------------------------------

  // ✅ 5. Upload Multiple Medical Reports to Cloudinary
  @UseGuards(AuthGuard('jwt'))
  @Put('upload-reports/:id')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      // ✅ Up to 5 files allowed with key 'files'
      storage: memoryStorage(), // ✅ Files stored in memory (RAM) not disk
      limits: { fileSize: 5 * 1024 * 1024 }, // ✅ Max 5MB per file
    }),
  )
  async uploadReports(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[], // ✅ Handle multiple files
  ) {
    if (!files || files.length === 0)
      throw new BadRequestException('No files uploaded'); // ✅ Validation

    const updatedUser = await this.patientService.uploadMedicalReports(
      id,
      files,
    );
    return { message: 'Reports uploaded', user: updatedUser };
  }

  // ------------------------------------------------------------------------------------------------

  // ✅ 6. Upload Medical History Files to Cloudinary
  @UseGuards(AuthGuard('jwt'))
  @Post('upload-history/:id')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    }),
  )
  async uploadHistory(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0)
      throw new BadRequestException('No files uploaded');

    const updatedUser = await this.patientService.uploadMedicalHistoryFiles(
      id,
      files,
    );
    return { message: 'History files uploaded', user: updatedUser };
  }

  // ------------------------------------------------------------------------------------------------

  // ✅ 7. Upload Insurance Card Files to Cloudinary (multiple allowed)
  @UseGuards(AuthGuard('jwt'))
  @Patch('upload-insurance/:id')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      limits: { fileSize: 5 * 1024 * 1024 }, // ✅ Max 5MB
      fileFilter: (req, file, cb) => {
        // ✅ Allow only jpg, jpeg, png, pdf files
        if (file.mimetype.match(/\/(jpg|jpeg|png|pdf|mp4)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Only images and PDFs are allowed!'), false);
        }
      },
    }),
  )
  async uploadInsuranceFiles(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.patientService.uploadInsuranceCards(id, files);
  }
}
