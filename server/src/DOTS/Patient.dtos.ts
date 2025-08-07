import {
  IsString,
  IsEmail,
  IsEnum,
  MinLength,
  IsDateString,
  IsOptional,
  IsUrl,
  IsArray,
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

  @IsOptional()
  @IsDateString()
  dob?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  medicalHistoryNote?: string[];

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true }) // medicalHistory contains URLs of uploaded files
  medicalHistory?: string[];

  @IsOptional()
  @IsUrl()
  profileImage?: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  medicalReports?: string[];

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  insuranceCardImage?: string[];

  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @IsOptional()
  @IsString()
  emergencyContact?: string;
}
