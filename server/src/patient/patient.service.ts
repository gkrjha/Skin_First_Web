import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  UploadedFiles,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from 'src/Schema/patient.schema';
import { UpdatePatientDto } from 'src/DOTS/UpdatePatient.dtos';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtUserPayload } from 'src/auth/auth.strategy';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name)
    private patientModel: Model<PatientDocument>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findUserByEmail(email: string): Promise<PatientDocument | null> {
    return this.patientModel.findOne({ email });
  }

  async countpatient() {
    const responst = await this.patientModel.countDocuments().exec();
    return responst;
  }
  async updatePatientById(id: string, data: UpdatePatientDto) {
    const updateOps: any = {};

    if (data.name) updateOps.$set = { ...updateOps.$set, name: data.name };
    if (data.medicalHistoryNote) {
      updateOps.$addToSet = {
        ...updateOps.$addToSet,
        medicalHistoryNote: { $each: data.medicalHistoryNote },
      };
    }
    if (data.medicalReports) {
      updateOps.$push = {
        ...updateOps.$push,
        medicalReports: { $each: data.medicalReports },
      };
    }
    if (data.medicalHistory) {
      updateOps.$push = {
        ...updateOps.$push,
        medicalHistoryFiles: { $each: data.medicalHistory },
      };
    }
    if (data.insuranceCardImage) {
      updateOps.$push = {
        ...updateOps.$push,
        insuranceCardImage: { $each: data.insuranceCardImage },
      };
    }

    const updatedPatient = await this.patientModel.findByIdAndUpdate(
      id,
      updateOps,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedPatient) throw new NotFoundException('Patient Not Found');

    const { password, ...safeData } = updatedPatient.toObject();
    return safeData;
  }

  async findPatientById(
    id: string,
    user: JwtUserPayload,
  ): Promise<PatientDocument> {
    console.log(user);

    if ((user.role !== 'admin' && user._id !== id) || user.role !== 'doctor') {
      throw new BadRequestException(
        'Access denied: Admins or own profile only',
      );
    }
    const fetcheduser = await this.patientModel.findById(id);
    if (!fetcheduser) {
      throw new NotFoundException('Patient Not Found');
    }
    return fetcheduser;
  }

  async logeduser(id: string, user: JwtUserPayload): Promise<PatientDocument> {
    console.log(user);

    const fetcheduser = await this.patientModel.findById(id);
    if (!fetcheduser) {
      throw new NotFoundException('Patient Not Found');
    }
    return fetcheduser;
  }

  async deletePatientById(id: string): Promise<any> {
    const user = await this.patientModel.findByIdAndDelete(id);
    return user;
  }

  async getAllUser(user: JwtUserPayload): Promise<PatientDocument[]> {
    if (user.role !== 'admin') {
      throw new BadRequestException('Access denied: Admins only');
    }
    const users = await this.patientModel.find();
    return users;
  }

  async uploadDocuments(
    user: JwtUserPayload,
    files: {
      medicalHistory?: Express.Multer.File[];
      medicalReports?: Express.Multer.File[];
      insuranceCardImage?: Express.Multer.File[];
    },
  ) {
    const patient = await this.patientModel.findById(user._id);
    if (!patient) throw new NotFoundException('Patient not found');

    const uploadMultiple = async (fileArray?: Express.Multer.File[]) => {
      if (fileArray && fileArray.length > 0) {
        const urls = await Promise.all(
          fileArray.map((file) =>
            this.cloudinaryService
              .uploadFile(file)
              .then((res) => res.secure_url),
          ),
        );
        return urls;
      }
      return [];
    };

    try {
      const medicalHistoryUrls = await uploadMultiple(files.medicalHistory);
      const medicalReportsUrls = await uploadMultiple(files.medicalReports);
      const insuranceCardImageUrls = await uploadMultiple(
        files.insuranceCardImage,
      );

      if (medicalHistoryUrls.length > 0) {
        patient.medicalHistoryFiles.push(...medicalHistoryUrls);
      }
      if (medicalReportsUrls.length > 0) {
        patient.medicalReports.push(...medicalReportsUrls);
      }
      if (insuranceCardImageUrls.length > 0) {
        patient.insuranceCardImage.push(...insuranceCardImageUrls);
      }

      await patient.save();

      const { password, ...safeUser } = patient.toObject();
      return {
        message: 'Documents uploaded successfully',
        user: safeUser,
      };
    } catch (error) {
      console.error('Upload or save error:', error);
      throw new InternalServerErrorException('Failed to upload documents');
    }
  }

  async deleteDocument(
    id: string,
    fileType: string,
    fileUrl: string,
  ): Promise<any> {
    const patient = await this.patientModel.findById(id);
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    console.log(fileType);

    let fileArray: string[];
    switch (fileType) {
      case 'medicalHistoryFiles':
        fileArray = patient.medicalHistoryFiles;
        console.log(fileArray.indexOf(fileUrl));
        break;
      case 'medicalReports':
        fileArray = patient.medicalReports;
        break;
      case 'insuranceCardImage':
        fileArray = patient.insuranceCardImage;
        break;
      default:
        throw new BadRequestException('Invalid document type');
    }

    const fileIndex = fileArray.indexOf(fileUrl);
    if (fileIndex === -1) {
      throw new NotFoundException(
        'File not found in the specified document type',
      );
    }
    try {
      fileArray.splice(fileIndex, 1);
      await patient.save();

      await this.cloudinaryService.deleteFile(fileUrl);

      return {
        message: 'File deleted successfully',
        user: patient,
      };
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new InternalServerErrorException('Failed to delete file');
    }
  }

  async recentpatient() {
    const recent = await this.patientModel.find().sort({ createdAt: 1 }).limit(5);
    return recent
  }
}
