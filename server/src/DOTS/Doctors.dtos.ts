import {
  IsString,
  IsEmail,
  IsEnum,
  MinLength,
  IsArray,
  IsUrl,
  IsOptional,
} from 'class-validator';
export class CreateDoctorDto {
  @IsString() name: string;
  @IsEmail() email: string;
  @IsString() @MinLength(6) password: string;
  @IsString() phone: string;
  @IsEnum(['doctor']) role: 'doctor';
  @IsString() specialization: string;
  @IsString() experience: string;
  @IsString() focus: string;
  @IsString() rating: string;

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
  @IsOptional() @IsString() profile?: string;
  @IsOptional() @IsString() careerPath?: string;
  @IsOptional() @IsString() highlight?: string;
}
