import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDoctorDto } from 'src/DOTS/Doctors.dtos';
import { Doctor, DoctorDocument } from 'src/Schema/doctor.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import * as bcrypt from 'bcryptjs';
import { JwtUserPayload } from 'src/auth/auth.strategy';
@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async createPendingDoctor(
    dto: CreateDoctorDto,
    invitedBy: string,
    files: {
      profileImage?: Express.Multer.File[];
      licence?: Express.Multer.File[];
      signatureImage?: Express.Multer.File[];
      documents?: Express.Multer.File[];
      clinicImages?: Express.Multer.File[];
      certificateImages?: Express.Multer.File[];
    },
  ) {
    const existing = await this.doctorModel.findOne({ email: dto.email });
    if (existing) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const uploadSingle = async (file?: Express.Multer.File[]) =>
      file && file[0]
        ? (await this.cloudinaryService.uploadFile(file[0])).secure_url
        : undefined;

    const uploadMultiple = async (fileArray?: Express.Multer.File[]) =>
      fileArray
        ? Promise.all(
            fileArray.map((f) =>
              this.cloudinaryService
                .uploadFile(f)
                .then((res) => res.secure_url),
            ),
          )
        : [];

    try {
      dto.profileImage = await uploadSingle(files.profileImage);
      dto.licence = await uploadSingle(files.licence);
      dto.signatureImage = await uploadSingle(files.signatureImage);
      dto.documents = await uploadMultiple(files.documents);
      dto.clinicImages = await uploadMultiple(files.clinicImages);
      dto.certificateImages = await uploadMultiple(files.certificateImages);
    } catch (error) {
      console.error('Upload error:', error);
      throw new InternalServerErrorException('File upload failed');
    }

    if (!dto.profileImage)
      throw new BadRequestException('Profile image is required');
    if (!dto.licence)
      throw new BadRequestException('Licence image is required');
    if (!dto.signatureImage)
      throw new BadRequestException('Signature image is required');
    if (!dto.documents || dto.documents.length === 0)
      throw new BadRequestException('At least one document is required');
    if (!dto.clinicImages || dto.clinicImages.length === 0)
      throw new BadRequestException('At least one clinic image is required');

    const doctor = new this.doctorModel({
      ...dto,
      password: hashedPassword,
      status: 'pending',
      invitedBy,
    });

    const saved = await doctor.save();
    const safeData = saved.toObject();
    delete (safeData as any).password;

    return {
      message: 'Doctor registered successfully',
      doctor: safeData,
    };
  }
  async getllfiltereddoctor(query: any): Promise<Doctor[]> {
    const { rating, gender, specialization } = query;
    const filter: any = {};
    if (rating) {
      filter.rating = { $gte: parseFloat(rating) };
    }
    if (gender) {
      filter.gender = gender;
    }
    if (specialization) {
      filter.specialization = specialization;
    }
    return this.doctorModel.find(filter).sort({ rating: -1 }).exec();
  }

  async getDoctorById(id: string): Promise<Doctor> {
    const doctor = await this.doctorModel.findById(id);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    const safeData = doctor.toObject();
    delete (safeData as any).password;
    return safeData;
  }

  async getAllDoctors(): Promise<Doctor[]> {
    console.log('Fetching all doctors sorted by rating');
    return this.doctorModel.find().sort({ rating: -1 }).exec();
  }

  async deleteDoctorById(id: string): Promise<Doctor> {
    const doctor = await this.doctorModel.findById(id);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    const deletedDoctor = await this.doctorModel.findByIdAndDelete(id);
    if (!deletedDoctor) {
      throw new InternalServerErrorException('Failed to delete doctor');
    }

    return deletedDoctor;
  }

  async updateDoctorStatus(
    id: string,
    status: 'approved' | 'declined',
  ): Promise<Doctor> {
    const doctor = await this.doctorModel.findById(id);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    doctor.status = status;
    const updatedDoctor = await doctor.save();
    if (!updatedDoctor) {
      throw new InternalServerErrorException('Failed to update doctor status');
    }
    return updatedDoctor;
  }

  async updateDoctorById(
    id: string,
    dto: CreateDoctorDto,
    files?: {
      profileImage?: Express.Multer.File[];
      licence?: Express.Multer.File[];
      signatureImage?: Express.Multer.File[];
      documents?: Express.Multer.File[];
      clinicImages?: Express.Multer.File[];
      certificateImages?: Express.Multer.File[];
    },
  ): Promise<Doctor> {
    const doctor = await this.doctorModel.findById(id);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    if (files) {
      const uploadSingle = async (file?: Express.Multer.File[]) =>
        file && file[0]
          ? (await this.cloudinaryService.uploadFile(file[0])).secure_url
          : undefined;

      const uploadMultiple = async (fileArray?: Express.Multer.File[]) =>
        fileArray
          ? Promise.all(
              fileArray.map((f) =>
                this.cloudinaryService
                  .uploadFile(f)
                  .then((res) => res.secure_url),
              ),
            )
          : [];

      try {
        dto.profileImage = await uploadSingle(files.profileImage);
        dto.licence = await uploadSingle(files.licence);
        dto.signatureImage = await uploadSingle(files.signatureImage);
        dto.documents = await uploadMultiple(files.documents);
        dto.clinicImages = await uploadMultiple(files.clinicImages);
        dto.certificateImages = await uploadMultiple(files.certificateImages);
      } catch (error) {
        console.error('Upload error:', error);
        throw new InternalServerErrorException('File upload failed');
      }
    }

    Object.assign(doctor, dto);

    const updatedDoctor = await doctor.save();
    if (!updatedDoctor) {
      throw new InternalServerErrorException('Failed to update doctor');
    }
    return updatedDoctor;
  }
  async approvedDoctor(id: string, data: any, user: JwtUserPayload) {
    if (user.role !== 'admin') {
      throw new ForbiddenException('Only admin can approve doctor');
    }

    const doctor = await this.doctorModel.findById(id);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    await doctor.save();

    const { password, ...safeData } = doctor.toObject();
    return safeData;
  }

  
}
