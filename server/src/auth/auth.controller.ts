import {
  Controller,
  Post,
  Req,
  Body,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/DOTS/LoginUser.Dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreatePatientDto } from 'src/DOTS/Patient.dtos';
import { AuthGuard } from '@nestjs/passport';
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

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@Req() req: Request) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
      this.authService.blacklistToken(token);
      return { message: 'Logout successful' };
    }
    return { message: 'No token found' };
  }
}
