import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PatientModule } from 'src/patient/patient.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Patient,
  PatientDocument,
  PatientSchema,
} from 'src/Schema/patient.schema';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './auth.strategy';
import { DoctorModule } from 'src/doctor/doctor.module';
import { Doctor, DoctorSchema } from 'src/Schema/doctor.schema';
import { Admin, AdminSchema } from 'src/Schema/Admin.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Patient.name, schema: PatientSchema },
      { name: Doctor.name, schema: DoctorSchema },
      { name: Admin.name, schema: AdminSchema },
    ]),

    PatientModule,
    DoctorModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET') || 'Secret_123',
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
