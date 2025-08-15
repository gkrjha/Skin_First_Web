import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAppointmentDto } from '../DOTS/Appointment.dto';
import { AppointmentDocument } from '../Schema/Appointment.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Express } from 'express';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel('Appointment')
    private appointmentModel: Model<AppointmentDocument>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async createAppointment(
    dto: CreateAppointmentDto,
    files: { attachments?: Express.Multer.File[] },
  ): Promise<AppointmentDocument> {
    if (files?.attachments?.length) {
      const uploadedAttachments: {
        url: string;
        type: 'image' | 'pdf' | 'video' | 'audio';
        filename: string;
      }[] = [];

      for (const file of files.attachments) {
        const uploadResult = await this.cloudinaryService.uploadFile(file);

        uploadedAttachments.push({
          url: uploadResult.secure_url,
          type: this.getFileType(file.mimetype),
          filename: uploadResult.public_id,
        });
      }

      dto.attachments = uploadedAttachments;
    }

    const appointment = new this.appointmentModel(dto);
    return appointment.save();
  }

  getFileType(mimeType: string): 'image' | 'pdf' | 'video' | 'audio' {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType === 'application/pdf') return 'pdf';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    return 'image';
  }

  async getAppointments(): Promise<AppointmentDocument[]> {
    return this.appointmentModel.find().populate('doctor patient').exec();
  }

  async getAppointmentById(id: string): Promise<AppointmentDocument> {
    const appointment = await this.appointmentModel
      .findById(id)
      .populate('doctor patient')
      .exec();

    if (!appointment) {
      throw new NotFoundException(`Appointment with id ${id} not found`);
    }

    return appointment;
  }

  async updateAppointment(
    id: string,
    data: Partial<CreateAppointmentDto>,
  ): Promise<AppointmentDocument> {
    const updatedAppointment = await this.appointmentModel
      .findByIdAndUpdate(id, data, { new: true })
      .populate('doctor patient')
      .exec();

    if (!updatedAppointment) {
      throw new NotFoundException(`Appointment with id ${id} not found`);
    }

    return updatedAppointment;
  }

  async deleteAppointment(id: string): Promise<AppointmentDocument> {
    const deletedAppointment = await this.appointmentModel
      .findByIdAndDelete(id)
      .populate('doctor patient')
      .exec();

    if (!deletedAppointment) {
      throw new NotFoundException(`Appointment with id ${id} not found`);
    }

    return deletedAppointment;
  }

  async countAppointment() {
    const response = await this.appointmentModel.countDocuments().exec();
    return response;
  }
}
