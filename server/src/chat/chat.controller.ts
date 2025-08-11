import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { chatFileStorage, chatFileFilter } from '../cloudinary/Common/multer.config';
import { ChatService } from './chat.service';
import { SendMessageDto } from '../DOTS/SendMessages.Dto';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('conversation')
  async createConversation(@Body() body: { doctor: string; patient: string }) {
    return this.chatService.getOrCreateConversation(body.doctor, body.patient);
  }

  @Get('conversation/:id')
  async getConversation(@Param('id') id: string) {
    return this.chatService.getConversationById(id);
  }

  // Send text or attachments
  @Post('message')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'attachments', maxCount: 10 }], {
      storage: chatFileStorage,
      fileFilter: chatFileFilter,
      limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
    }),
  )
  async sendMessage(
    @Body() body: SendMessageDto,
    @UploadedFiles() files: { attachments?: Express.Multer.File[] },
  ) {
    const attachments = (files?.attachments || []).map((f) => {
      const ext = f.mimetype.split('/')[1] || '';
      let type: any = 'image';
      if (/pdf/.test(f.mimetype)) type = 'pdf';
      else if (/audio/.test(f.mimetype)) type = 'audio';
      else if (/video/.test(f.mimetype)) type = 'video';

      return {
        url: `/uploads/chat/${f.filename}`,
        type,
        filename: f.originalname,
      };
    });

    const msg = await this.chatService.sendMessage({
      conversation: body.conversation,
      sender: body.sender,
      senderModel: body.senderModel,
      text: body.text,
      attachments,
    });

    // Emit via gateway (gateway will subscribe to new message events)
    // We return the message; Gateway emits on its own in this example
    return msg;
  }
}
