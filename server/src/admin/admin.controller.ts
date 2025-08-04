import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from '../DOTS/Admin.dto';

import { AuthGuard } from '@nestjs/passport';
import { SetMetadata } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  // ✅ First time signup, only if no admin exists
  @Post('signup')
  async firstAdminSignup(@Body() dto: CreateAdminDto) {
    return this.adminService.createFirstAdmin(dto);
  }

  // ✅ Create new admin (authenticated + role 'admin' required)
  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @SetMetadata('role', 'admin')
  async createAdmin(@Body() dto: CreateAdminDto, @Request() req) {
    return this.adminService.createAdmin(dto);
  }
}
