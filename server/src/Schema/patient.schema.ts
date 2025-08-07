import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema({ timestamps: true })
export class Patient {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true }) email: string;
  @Prop({ required: true }) password: string;
  @Prop({ required: true }) phone: string;
  @Prop({ default: 'patient' }) role: string;
  @Prop() dob?: string;
  @Prop() gender?: string;
  @Prop() address?: string;
  @Prop({ default: [] }) medicalHistoryNote?: string[];
  @Prop({ type: [String], default: [] })
  medicalReports: string[];
  @Prop({ type: [String], default: [] })
  medicalHistoryFiles: string[];
  @Prop({ type: [String], default: [] })
  insuranceCardImage: string[];
  @Prop() profileImage?: string;
  @Prop() bloodGroup?: string;
  @Prop() emergencyContact?: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
