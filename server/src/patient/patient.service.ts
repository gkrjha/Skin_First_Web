import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from 'src/Schema/patient.schema';
import { UpdatePatientDto } from 'src/DOTS/UpdatePatient.dtos';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'; // ✅ File upload service

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name)
    private patientModel: Model<PatientDocument>, // ✅ MongoDB model injection
    private cloudinaryService: CloudinaryService, // ✅ Custom cloudinary service
    
  ) {}

  // ✅ 1. Find patient by email
  async findUserByEmail(email: string): Promise<PatientDocument | null> {
    return this.patientModel.findOne({ email }); // ✅ Email se user fetch
  }

  // ✅ 2. Update patient profile by ID
  async updatePatientById(id: string, data: UpdatePatientDto): Promise<any> {
    const updatedPatient = await this.patientModel.findByIdAndUpdate(id, data, {
      new: true, // ✅ Updated patient return karega
      runValidators: true, // ✅ Schema validation karega
    });

    if (!updatedPatient) {
      throw new NotFoundException('Patient Not Found'); // ✅ Agar patient nahi mila
    }

    const { password, ...safeData } = updatedPatient.toObject(); // ✅ Password hide
    return safeData;
  }

  // ✅ 3. Find patient by ID
  async findPatientById(id: string): Promise<PatientDocument> {
    const user = await this.patientModel.findById(id);
    if (!user) {
      throw new NotFoundException('Patient Not Found'); // ✅ ID invalid hai
    }
    return user;
  }

  // ✅ 4. Delete patient by ID
  async deletePatientById(id: string): Promise<any> {
    const user = await this.patientModel.findByIdAndDelete(id);
    return user; // ✅ Deleted user return karega
  }

  // ✅ 5. Get all patients
  async getAllUser(): Promise<PatientDocument[]> {
    const users = await this.patientModel.find(); // ✅ Saare patients laao
    return users;
  }

  // ✅ 6. Upload multiple Medical Reports (PDF/Image) to Cloudinary
  async uploadMedicalReports(
    id: string,
    files: Express.Multer.File[],
  ): Promise<any> {
    const user = await this.patientModel.findById(id);
    if (!user) throw new NotFoundException('Patient not found');

    // ✅ Saare files Cloudinary me upload karo
    for (const file of files) {
      const uploaded = await this.cloudinaryService.uploadFile(file); // ✅ Upload
      if (!user.medicalReports) {
        user.medicalReports = []; // ✅ Array initialize
      }
      user.medicalReports.push(uploaded.secure_url); // ✅ URL push
    }

    await user.save(); // ✅ Save updated user
    const { password, ...safeObj } = user.toObject(); // ✅ Hide password
    return safeObj;
  }

  // ✅ 7. Upload multiple Medical History files
  async uploadMedicalHistoryFiles(
    id: string,
    files: Express.Multer.File[],
  ): Promise<any> {
    const user = await this.patientModel.findById(id);
    if (!user) throw new NotFoundException('Patient not found');

    for (const file of files) {
      const uploaded = await this.cloudinaryService.uploadFile(file);

      if (!user.medicalHistoryFiles) {
        user.medicalHistoryFiles = []; // ✅ Array initialize
      }
      user.medicalHistoryFiles.push(uploaded.secure_url);
    }

    await user.save();
    const { password, ...safeObj } = user.toObject();
    return safeObj;
  }

  // ✅ 8. Upload multiple Insurance Card Images (jpg, png, pdf)
  async uploadInsuranceCards(
    id: string,
    files: Express.Multer.File[],
  ): Promise<any> {
    const user = await this.patientModel.findById(id);
    if (!user) throw new NotFoundException('Patient not found');

    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided'); // ✅ Validate files
    }

    const uploadedUrls: string[] = [];

    // ✅ Upload all files to Cloudinary
    for (const file of files) {
      const uploaded = await this.cloudinaryService.uploadFile(file);
      uploadedUrls.push(uploaded.secure_url); // ✅ Store URL
    }

    user.insuranceCardImage = uploadedUrls; // ✅ Update array field in DB
    await user.save();

    const { password, ...safeObj } = user.toObject();
    return safeObj;
  }
}
