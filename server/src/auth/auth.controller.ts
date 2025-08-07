import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/DOTS/LoginUser.Dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreatePatientDto } from 'src/DOTS/Patient.dtos';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const result = await this.authService.login(dto);
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return result;
  }

  @Post('signup')
  async signup(@Body() dto: CreatePatientDto) {
    return this.authService.signup(dto);
  }
}
