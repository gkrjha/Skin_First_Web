import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './Database/database.service';

import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AdminModule } from './admin/admin.module';
import { MailerModule } from './mailer/mailer.module';
// import { SmsModule } from './sms/sms.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
        retryAttempts: 3,
        retryDelay: 2000,
      }),
    }),
    PatientModule,
    DoctorModule,
    AppointmentModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        global: true, // ✅ This makes JwtService globally available
        secret: config.get<string>('JWT_SECRET'), // ✅ Must exist in .env
        signOptions: { expiresIn: '1d' },
        
      }),
    }),
    
    AuthModule,
    CloudinaryModule,
    AdminModule,
    MailerModule,
    // SmsModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})

export class AppModule {}
