import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdminDocument, Admin } from 'src/Schema/Admin.schema';
import { Model } from 'mongoose';
import { CreateAdminDto } from 'src/DOTS/Admin.dto';
import * as bcrypt from 'bcryptjs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { JwtPayload } from 'jsonwebtoken';
import { DoctorModule } from 'src/doctor/doctor.module';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async adminExists(): Promise<boolean> {
    const admin = await this.adminModel.findOne({ role: 'admin' });
    return !!admin;
  }

  //One-time signup
  async createFirstAdmin(dto: CreateAdminDto) {
    const exists = await this.adminExists();
    if (exists) throw new UnauthorizedException('Admin already exists');

    const hashed = await bcrypt.hash(dto.password, 10);
    const admin = new this.adminModel({ ...dto, password: hashed });
    await admin.save();
    return { message: 'Admin created successfully', email: admin.email };
  }

  async createAdmin(dto: CreateAdminDto) {
    const existing = await this.adminModel.findOne({ email: dto.email });
    if (existing)
      throw new ConflictException('Admin with this email already exists');

    const hashed = await bcrypt.hash(dto.password, 10);
    const admin = new this.adminModel({ ...dto, password: hashed });
    await admin.save();
    return { message: 'Admin created', email: admin.email };
  }

  async validateAdmin(email: string, password: string): Promise<AdminDocument> {
    const admin = await this.adminModel.findOne({ email });
    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return admin;
  }

 
}
