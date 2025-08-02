import { IsString, IsEmail, IsEnum, MinLength } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  phone: string;

  @IsEnum(['doctor'])
  role: 'doctor';

  @IsString()
  specialization: string;

  @IsString()
  experience: string;

  @IsString()
  focus: string;

  @IsString()
  rating: string;

  @IsString()
  profileImage: string;
}
