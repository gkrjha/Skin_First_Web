import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Doctor } from './doctor.schema';

export type TempDoctorDocument = TempDoctor & Document;

@Schema({ timestamps: true })
export class TempDoctor {
  @Prop({ type: Types.ObjectId, ref: 'Doctor', required: true })
  doctorId: Doctor | Types.ObjectId;

  @Prop({ type: String, default: null })
  specialization?: string;

  @Prop({ type: Number, default: null })
  experience?: number;

  @Prop({ type: String, default: null })
  licence?: string;

  @Prop({ type: [String], default: null })
  documents?: string[];

  @Prop({ type: String, default: null })
  signatureImage?: string;

  @Prop({ type: [String], default: null })
  certificateImages?: string[];

  @Prop({
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status: 'pending' | 'approved' | 'rejected';
}

export const TempDoctorSchema = SchemaFactory.createForClass(TempDoctor);
