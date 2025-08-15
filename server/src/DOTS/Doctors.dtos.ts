import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsEnum,
  MinLength,
  IsArray,
  IsUrl,
  IsOptional,
  IsNumber,
} from 'class-validator';
export class CreateDoctorDto {
  @IsString() name: string;
  @IsEmail() email: string;
  @IsString() @MinLength(6) password: string;
  @IsString() phone: string;

  @IsString() specialization: string;

  @IsOptional() @IsString() focus: string;
  @IsNumber()
  @Type(() => Number)
  experience: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  rating: number;

  @IsOptional() @IsUrl() profileImage?: string;
  @IsOptional() @IsUrl() licence?: string;
  @IsOptional() @IsUrl() signatureImage?: string;
  @IsOptional() @IsArray() @IsUrl({}, { each: true }) documents?: string[];
  @IsOptional() @IsArray() @IsUrl({}, { each: true }) clinicImages?: string[];
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  certificateImages?: string[];
  @IsOptional() @IsString() gender?: string;
  @IsOptional() @IsString() dob?: string;
  @IsOptional() @IsString() profile: string;
  @IsOptional() @IsString() careerPath?: string;
  @IsOptional() @IsString() highlight?: string;
}
