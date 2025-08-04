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
  @IsString() name: string;
  @IsEmail() email: string;
  @IsString() @MinLength(6) password: string;
  @IsString() phone: string;
  @IsEnum(['patient']) role: 'patient';
  @IsDateString() dob?: string;
  @IsOptional() @IsString() gender?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() medicalHistory?: string;
  @IsOptional() @IsUrl() profileImage?: string;
  @IsOptional() @IsArray() @IsUrl({}, { each: true }) medicalReports?: string[];
  @IsOptional() @IsUrl() insuranceCardImage?: string;
  @IsOptional() @IsString() bloodGroup?: string;
  @IsOptional() @IsString() emergencyContact?: string;
}
