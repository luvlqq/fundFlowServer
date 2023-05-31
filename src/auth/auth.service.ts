import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import * as process from 'process';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const { email, firstName, lastName, password } = dto;
    const foundUser = await this.prisma.user.findUnique({ where: { email } });
    if (foundUser) {
      throw new BadRequestException(
        'User with this email is already been exist!',
      );
    }
    const hashedPassword: string = await this.hashPassword(password);
    await this.prisma.user.create({
      data: { email, firstName, lastName, hashedPassword },
    });
    return { message: 'register was successful ' };
  }

  async login(dto: LoginDto, req: Request, res: Response) {
    const { email, password } = dto;
    const foundUser = await this.prisma.user.findUnique({ where: { email } });
    if (!foundUser) {
      return new BadRequestException('User are not exist!');
    }
    const isMatch = await this.comparePasswords({
      password,
      hash: foundUser.hashedPassword,
    });
    if (!isMatch) {
      throw new BadRequestException('Password doesnt match!');
    }

    const token = await this.signToken({ userEmail: foundUser.email });
    if (!token) {
      throw new ForbiddenException('Login token error!');
    }

    res.cookie('token', token, {});

    return res.send({ message: 'Logged in successful', email });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'Logged out successfully' });
  }

  // TODO transfer this method to user module
  // async resetPassword(email: string, password: string, req: Request) {
  //   // TODO Error: Argument where of type UserWhereUniqueInput needs at least one argument.
  //   const user = await this.prisma.user.findUnique({
  //     where: { email },
  //   });
  //   if (!user) {
  //     throw new BadRequestException('User does not exist!');
  //   }
  //   //
  //   const decodedUser = req.user as { email: string };
  //
  //   if (user.email !== decodedUser.email) {
  //     throw new UnauthorizedException();
  //   }
  //
  //   const hashedPassword: string = await this.hashPassword(password);
  //
  //   const updatedUser = await this.prisma.user.update({
  //     where: { email },
  //     data: { hashedPassword },
  //   });
  //
  //   return { message: 'Password reset successful' };
  // }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { userEmail: string }) {
    const payload = { email: args.userEmail };
    const token = await this.jwt.signAsync(payload, {
      secret: process.env.SECRET,
    });
    return token;
  }
}
