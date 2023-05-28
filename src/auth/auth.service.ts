import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login() {}

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

  async logout() {}

  async resetPassword() {}

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
