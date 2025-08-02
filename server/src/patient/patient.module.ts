import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientService } from './patient.service';
import { User, UserSchema } from 'src/Schema/Users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // ✅ IMPORTANT
  ],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
