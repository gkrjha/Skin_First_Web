import {
  IsNotEmpty,
  IsMongoId,
  IsDateString,
  IsString,
  IsOptional,
  IsIn,
  IsArray,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsMongoId()
  doctor: string;

  @IsNotEmpty()
  @IsMongoId()
  patient: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsString()
  timeSlot: string;

  @IsOptional()
  @IsIn(['pending', 'confirmed', 'completed', 'cancelled'])
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsArray()
  attachments?: Array<{
    url: string;
    type: 'image' | 'pdf' | 'video' | 'audio';
    filename?: string;
  }>;
}
