import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ enum: ['doctor', 'patient', 'admin'], required: true })
  role: string;

  @Prop()
  gender?: string;

  @Prop()
  dob?: Date;

  @Prop()
  medicalHistory?: string;

  @Prop()
  address?: string;

  @Prop()
  profileImage?: string;
  @Prop({ required: true })
  password: string;

  @Prop()
  specelist: string;

  @Prop()
  experience: string;

  @Prop()
  focus: string;

  @Prop()
  rating?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
