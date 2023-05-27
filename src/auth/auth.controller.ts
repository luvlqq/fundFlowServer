import { Controller, Get, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login() {}

  @Post('register')
  register() {}

  @Get('logout')
  logout() {}

  @Patch('resetpassword')
  resetPassword() {}
}
