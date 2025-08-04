import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/Schema/Admin.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module'; // ✅ Correct import

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    CloudinaryModule, 
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
