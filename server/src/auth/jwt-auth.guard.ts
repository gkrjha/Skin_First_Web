import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// ✅ JwtAuthGuard ban raha hai jo 'jwt' strategy use karega (defined in JwtStrategy)
export class JwtAuthGuard extends AuthGuard('jwt') {}
