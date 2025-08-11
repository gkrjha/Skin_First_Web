import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from '../DOTS/Appointment.dto';
import { AppointmentDocument } from '../Schema/Appointment.schema';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { memoryStorage } from 'multer';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'attachments', maxCount: 10 }], {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
          'image/jpeg',
          'image/png',
          'image/jpg',
          'application/pdf',
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Only JPG, PNG, PDF files are allowed!'), false);
        }
      },
    }),
  )
  async create(
    @Body() dto: CreateAppointmentDto,
    @UploadedFiles() files: { attachments?: Express.Multer.File[] },
  ): Promise<AppointmentDocument> {
    return this.appointmentService.createAppointment(dto, files);
  }

  @Get()
  async findAll(): Promise<AppointmentDocument[]> {
    return this.appointmentService.getAppointments();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string): Promise<AppointmentDocument> {
    return this.appointmentService.getAppointmentById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateAppointmentDto>,
  ): Promise<AppointmentDocument> {
    return this.appointmentService.updateAppointment(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string): Promise<AppointmentDocument> {
    return this.appointmentService.deleteAppointment(id);
  }
}
