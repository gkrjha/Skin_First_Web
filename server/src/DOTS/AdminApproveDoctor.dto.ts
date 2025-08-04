import { IsString, IsEnum, IsOptional } from 'class-validator';

export class AdminApproveDoctorDto {
  @IsString()
  doctorId: string; 

  @IsEnum(['approved', 'declined'])
  status: 'approved' | 'declined'; 

  @IsOptional()
  @IsString()
  comment?: string; 
}
