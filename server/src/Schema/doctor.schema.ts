import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorDocument = Doctor & Document;

@Schema({ timestamps: true })
export class Doctor {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true }) email: string;
  @Prop({ required: true }) password: string;
  @Prop({ required: true }) phone: string;
  @Prop({ default: 'doctor' }) role: 'doctor';
  @Prop() specialization: string;
  @Prop({ type: Number, default: 0 }) experience: number;
  @Prop({ type: Number, default: 0 }) rating: number;
  @Prop() focus: string;
  @Prop() profileImage: string;
  @Prop() licence: string;
  @Prop({ type: [String], default: [] }) documents: string[];
  @Prop({ type: [String], default: [] }) clinicImages?: string[];
  @Prop() signatureImage?: string;
  @Prop({ type: [String], default: [] }) certificateImages?: string[];
  @Prop() gender?: string;
  @Prop() dob?: string;
  @Prop() profile?: string;
  @Prop() careerPath?: string;
  @Prop() highlight?: string;
  @Prop({
    default: 'pending',
    enum: ['pending', 'approved', 'update', 'declined'],
  })
  status: 'pending' | 'approved' | 'declined';
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
