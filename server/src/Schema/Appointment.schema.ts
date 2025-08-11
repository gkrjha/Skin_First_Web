import { Schema, Document, Types } from 'mongoose';

export interface AppointmentDocument extends Document {
  doctor: Types.ObjectId;
  patient: Types.ObjectId;
  date: Date;
  timeSlot: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  attachments?: Array<{
    url: string;
    type: 'image' | 'pdf' | 'video' | 'audio';
    filename?: string;
  }>;
}

export const AppointmentSchema = new Schema<AppointmentDocument>({
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  notes: { type: String },
  attachments: [
    {
      url: { type: String, required: true },
      type: {
        type: String,
        enum: ['image', 'pdf', 'video', 'audio'],
        required: true,
      },
      filename: String,
    },
  ],
});
