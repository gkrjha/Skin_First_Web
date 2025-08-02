import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PatientModule } from 'src/patient/patient.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schema/Users.schema';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './auth.strategy';
import { DoctorModule } from 'src/doctor/doctor.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
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
