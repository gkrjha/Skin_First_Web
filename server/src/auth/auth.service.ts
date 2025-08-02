import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { CreatePatientDto } from 'src/DOTS/Patient.dtos';
import { LoginUserDto } from 'src/DOTS/LoginUser.Dto';
import { User, UserDocument } from 'src/Schema/Users.schema';
import { PatientService } from 'src/patient/patient.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private patientService: PatientService,
    private jwtService: JwtService,
  ) {}

  // Signup Logic
  async signup(dto: CreatePatientDto): Promise<{ token: string; user: any }> {
    const existingUser = await this.userModel.findOne({ email: dto.email });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new this.userModel({ ...dto, password: hashedPassword });
    const savedUser = await user.save();

    const payload = {
      sub: savedUser._id,
      email: savedUser.email,
      role: savedUser.role,
    };
    const token = this.jwtService.sign(payload);

    const userObj = savedUser.toObject();
    delete (userObj as any).password;

    return { token, user: userObj };
  }

  // Login Validate
  async login(dto: LoginUserDto): Promise<{ token: string; user: any }> {
    const user = await this.patientService.findUserByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user._id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    const userObj = user.toObject();
    delete (userObj as any).password;

    return { token, user: userObj };
  }


}
