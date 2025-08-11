// src/chat/dtos/send-message.dto.ts
import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';

export class SendMessageDto {
  @IsString()
  conversation: string; // Conversation ID

  @IsString()
  sender: string; // User ID

  @IsString()
  senderModel: 'Doctor' | 'Patient'; // For polymorphic sender type

  @IsOptional()
  @IsString()
  text?: string; // Optional text

  @IsOptional()
  @IsArray()
  attachments?: {
    url: string;
    type: 'image' | 'pdf' | 'audio' | 'video';
    filename: string;
  }[];
}
