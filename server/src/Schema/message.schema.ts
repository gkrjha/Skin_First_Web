import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Conversation', required: true })
  conversation: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  sender: Types.ObjectId;

  @Prop({ required: true, enum: ['Doctor', 'Patient'] })
  senderModel: 'Doctor' | 'Patient';

  @Prop()
  text?: string;

  @Prop({
    type: [
      {
        url: String,
        type: { type: String, enum: ['image', 'pdf', 'video', 'audio'] },
        filename: String,
      },
    ],
  })
  attachments?: {
    url: string;
    type: 'image' | 'pdf' | 'video' | 'audio';
    filename?: string;
  }[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);
