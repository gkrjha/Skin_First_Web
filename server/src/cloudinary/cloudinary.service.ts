import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';


@Injectable()
export class CloudinaryService {
  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    if (!file || !file.buffer) {
      throw new BadRequestException('File or file.buffer is missing');
    }

    return new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'patient-files' },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Upload failed'));
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const publicId = this.extractPublicId(fileUrl);
    if (!publicId) {
      throw new BadRequestException('Invalid file URL or public ID not found');
    }

    await cloudinary.uploader.destroy(publicId);
  }

  private extractPublicId(fileUrl: string): string | null {
    try {
      const url = new URL(fileUrl);
      const pathParts = url.pathname.split('/');
      const fileName = pathParts[pathParts.length - 1];
      const folder = pathParts[pathParts.length - 2];
      const publicId = `${folder}/${fileName.split('.')[0]}`;
      return publicId;
    } catch {
      return null;
    }
  }
}
