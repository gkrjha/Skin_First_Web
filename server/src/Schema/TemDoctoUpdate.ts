import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type tempdoctordoc = tempupdate & Document;

@Schema()
export class tempupdate {
  @Prop() specialization: string;
  @Prop({ type: Number, default: 0 }) experience: number;
  @Prop() licence: string;
  @Prop({ type: [String], default: [] }) documents: string[];
  @Prop() signatureImage?: string;
  @Prop({ type: [String], default: [] }) certificateImages?: string[];
}
