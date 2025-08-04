// cloudinary.provider.ts

// Cloudinary SDK ko import kar rahe ho
import { v2 as cloudinary } from 'cloudinary';

// NestJS ka ConfigService import kiya hai taaki .env file ka access mil sake
import { ConfigService } from '@nestjs/config';

// CloudinaryProvider banaya ja raha hai - NestJS Dependency Injection (DI) ke liye
export const CloudinaryProvider = {
  // 'CLOUDINARY' naam ka provider banaya ja raha hai - is naam se hum ise inject karenge
  provide: 'CLOUDINARY',

  // useFactory: function hai jo Cloudinary ko configure karta hai
  useFactory: (configService: ConfigService) => {
    // Cloudinary ko configure kar rahe hain .env se values read karke
    cloudinary.config({
      cloud_name: configService.get('CLOUDINARY_NAME'), // .env → CLOUDINARY_NAME
      api_key: configService.get('CLOUDINARY_API_KEY'), // .env → CLOUDINARY_API_KEY
      api_secret: configService.get('CLOUDINARY_API_SECRET'), // .env → CLOUDINARY_API_SECRET
    });

    // Ab properly configured cloudinary object ko return kar rahe hain
    return cloudinary;
  },

  // inject: yeh define karta hai ki kaun kaun se services is factory function mein inject honge
  inject: [ConfigService], // ConfigService ko inject kiya gaya hai taaki .env access ho
};
