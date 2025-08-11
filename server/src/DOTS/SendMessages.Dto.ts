// src/chat/dtos/send-message.dto.ts
import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';

export class SendMessageDto {
  @IsOptional()
  @IsString()
  conversation?: string; // Conversation ID (optional agar new create karna ho)

  @IsOptional()
  @IsString()
  doctor?: string; // Doctor ID (conversation create ke liye)

  @IsOptional()
  @IsString()
  patient?: string; // Patient ID (conversation create ke liye)

  @IsString()
  sender: string; // Sender ID (jo message bhej raha hai)

  @IsEnum(['Doctor', 'Patient'])
  senderModel: 'Doctor' | 'Patient'; // Sender type

  @IsOptional()
  @IsString()
  text?: string; // Optional text message

  @IsOptional()
  @IsArray()
  attachments?: {
    url: string;
    type: 'image' | 'pdf' | 'audio' | 'video';
    filename: string;
  }[];
}
