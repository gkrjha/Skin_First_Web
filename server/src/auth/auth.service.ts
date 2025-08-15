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
      role: 'patient',
    };

    const token = this.jwtService.sign(payload);

    const userObj = savedUser.toObject();
    delete (userObj as any).password;

    return { token, user: userObj };
  }

  async login(dto: LoginUserDto): Promise<{ token: string; user: any }> {
    let user;
    let role = '';

    user = await this.patientModel.findOne({ email: dto.email });
    if (user) {
      role = 'patient';
    }

    if (!user) {
      user = await this.doctorModel.findOne({ email: dto.email });
      if (user) {
        role = 'doctor';
        console.log(user.role);
        if (user.status !== 'approved') {
          throw new UnauthorizedException('Doctor account is not approved yet');
        }
      }
    }

    if (!user) {
      user = await this.adminModel.findOne({ email: dto.email });
      if (user) {
        role = 'admin';
        console.log(user.role);
      }
    }

    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user._id,
      email: user.email,
      role,
    };

    const token = this.jwtService.sign(payload);

    const userObj = user.toObject();
    delete userObj.password;
    userObj.role = role;

    return { token, user: userObj };
  }

  private blacklistedTokens: string[] = [];
  blacklistToken(token: string) {
    this.blacklistedTokens.push(token);
  }

  isTokenBlacklisted(token: string): boolean {
    return this.blacklistedTokens.includes(token);
  }
}
