import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreatePatientDto } from 'src/DOTS/Patient.dtos';
import { LoginUserDto } from 'src/DOTS/LoginUser.Dto';
import { User, UserDocument } from 'src/Schema/Users.schema';
@Injectable()
export class PatientService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUserByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }
}
