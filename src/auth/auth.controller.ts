import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Request() req, @Response() res, @Body() dto: LoginDto) {
    return this.authService.login(dto, req, res);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Get('logout')
  logout(@Request() req, @Response() res) {
    return this.authService.logout(req, res);
  }

  // TODO transfer this to user controller module
  // @UseGuards(JwtAuthGuard)
  // @Patch('resetpassword')
  // resetPassword(
  //   @Param() params: { email: string; password: string },
  //   @Req() req,
  // ) {
  //   return this.authService.resetPassword(params.email, params.password, req);
  // }

  // resetPassword(@Body() dto: LoginDto, @Req() req: Request) {
  //   return this.authService.resetPassword(dto, req);
  // }
}
