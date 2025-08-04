import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider'; // ✅ provides cloudinary.config
import { CloudinaryService } from './cloudinary.service'; // ✅ actual service

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryService], // ✅ Only CloudinaryService used by other modules
})
export class CloudinaryModule {}
