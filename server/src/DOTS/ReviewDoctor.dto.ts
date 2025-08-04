import { IsString, IsNumber } from 'class-validator';

export class ReviewDoctorDto {
  @IsString()
  doctorId: string;

  @IsString()
  review: string;

  @IsNumber()
  rating: number; 
}
