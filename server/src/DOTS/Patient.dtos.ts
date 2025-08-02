import {
  IsString,
  IsEmail,
  IsEnum,
  MinLength,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  phone: string;

  @IsEnum(['patient'])
  role: 'patient';

  @IsDateString()
  dob?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  medicalHistory?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;
}
