import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { GetCurrentUser, GetCurrentUserId, Public } from './decorators';
import { RtGuard } from './guards';
import { JwtTokensService } from './jwt.token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtTokenService: JwtTokensService,
  ) {}

  @Public()
  @Post('register')
  public async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.register(dto, res);
  }

  @Public()
  @Post('login')
  public async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(dto, res);
  }

  @Post('signOut')
  public async signOut(
    @GetCurrentUserId() userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return this.authService.signOut(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  public async refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<void> {
    await this.jwtTokenService.refreshTokens(userId, refreshToken);
  }
}
