import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { AuthRepository } from './auth.repository';
import { Constants } from './constants';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtTokensService } from './jwt.token.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly repository: AuthRepository,
    private readonly jwtTokenService: JwtTokensService,
  ) {}

  public async register(dto: RegisterDto, res: Response): Promise<void> {
    const findUser = await this.repository.foundUser(dto);

    if (findUser) {
      throw new BadRequestException('User with this email is already exist');
    }

    const hashedPassword = await this.hashData(dto.password);

    const newUser = await this.repository.createNewUser(dto, hashedPassword);

    const tokens = await this.jwtTokenService.signTokens(
      newUser.id,
      newUser.email,
    );
    await this.jwtTokenService.updateRtHash(newUser.id, tokens.refreshToken);
    await this.jwtTokenService.putTokensToCookies(
      newUser.id,
      newUser.email,
      res,
    );
  }

  public async login(dto: LoginDto, res: Response) {
    const findUser = await this.repository.foundUser(dto);

    if (!findUser) {
      throw new NotFoundException('User with this email is not found');
    }

    const passwordMatches = await bcrypt.compare(
      dto.password,
      findUser.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Access denied! Incorrect password!');
    }

    const tokens = await this.jwtTokenService.signTokens(
      findUser.id,
      findUser.email,
    );
    await this.jwtTokenService.updateRtHash(findUser.id, tokens.refreshToken);
    await this.jwtTokenService.putTokensToCookies(
      findUser.id,
      findUser.email,
      res,
    );
  }

  public async signOut(userId: number): Promise<void> {
    await this.repository.signOut(userId);
  }

  public async hashData(data: string): Promise<string> {
    const saltOfRounds = Constants.roundOfSalt;
    return await bcrypt.hash(data, saltOfRounds);
  }
}
