import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreatePatientDto } from 'src/DOTS/Patient.dtos';
import { LoginUserDto } from 'src/DOTS/LoginUser.Dto';
import { Patient, PatientDocument } from 'src/Schema/patient.schema';
import { Doctor, DoctorDocument } from 'src/Schema/doctor.schema';
import { Admin, AdminDocument } from 'src/Schema/Admin.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  // ✅ Patient signup logic (sirf patient ka signup allowed yaha)
  async signup(dto: CreatePatientDto): Promise<{ token: string; user: any }> {
    const existingUser = await this.patientModel.findOne({ email: dto.email });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new this.patientModel({ ...dto, password: hashedPassword });

    const savedUser = await user.save();

    const payload = {
      sub: savedUser._id,
      email: savedUser.email,
      role: 'patient', // ✅ Role hardcoded patient for signup
    };

    const token = this.jwtService.sign(payload);

    const userObj = savedUser.toObject();
    delete (userObj as any).password;

    return { token, user: userObj };
  }

  // ✅ Login Logic for Patient, Doctor, Admin (All handled here)
  async login(dto: LoginUserDto): Promise<{ token: string; user: any }> {
    let user = await this.patientModel.findOne({ email: dto.email });
    let role = 'patient'; // Default maan ke chalte hai

    // ❌ Patient nahi mila, to doctor check karo
    if (!user) {
      user = await this.doctorModel.findOne({ email: dto.email });
      if (user) {
        role = 'doctor';
      }
    }

    // ❌ Doctor bhi nahi mila, ab admin check karo
    if (!user) {
      user = await this.adminModel.findOne({ email: dto.email });
      if (user) {
        role = 'admin';
      }
    }

    // ❌ Agar tino me nahi mila user
    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }

    // ✅ Password validate karo
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // ✅ JWT payload banaao
    const payload = {
      sub: user._id,
      email: user.email,
      role,
    };

    const token = this.jwtService.sign(payload);

    const userObj = user.toObject();
    delete (userObj as any).password;

    return { token, user: userObj };
  }
}
