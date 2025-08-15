import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Param,
  Get,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ChatService } from './chat.service';
import { SendMessageDto } from '../DOTS/SendMessages.Dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { chatFileFilter } from '../cloudinary/Common/multer.config';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get('conversation/:id')
  async getConversation(@Param('id') id: string) {
    return this.chatService.getConversationById(id);
  }

  @Post('message')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'attachments', maxCount: 10 }], {
      storage: memoryStorage(),
      fileFilter: chatFileFilter,
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async sendMessage(
    @Body() body: SendMessageDto,
    @UploadedFiles() files: { attachments?: Express.Multer.File[] },
  ) {
    const attachments: {
      url: string;
      type: 'image' | 'pdf' | 'audio' | 'video';
      filename: string;
    }[] = [];

    if (files?.attachments?.length) {
      for (const file of files.attachments) {
        const uploadResult = await this.cloudinaryService.uploadFile(file);

        let type: 'image' | 'pdf' | 'audio' | 'video' = 'image';
        if (/pdf/.test(file.mimetype)) type = 'pdf';
        else if (/audio/.test(file.mimetype)) type = 'audio';
        else if (/video/.test(file.mimetype)) type = 'video';

        attachments.push({
          url: uploadResult.secure_url,
          type,
          filename: file.originalname,
        });
      }
    }

    const msg = await this.chatService.getOrCreateConversationasync({
      doctor: body.doctor,
      patient: body.patient,
      sender: body.sender,
      senderModel: body.senderModel,
      text: body.text,
      attachments,
    });

    return msg;
  }
}
