import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async foundUser(dto): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email: dto.email },
    });
  }

  public async createNewUser(dto: RegisterDto, hashedPassword): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });
  }

  public async signOut(userId: number): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashRt: {
          not: null,
        },
      },
      data: {
        hashRt: null,
      },
    });
    return true;
  }

  public async foundUserById(userId: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: +userId } });
  }

  public async updateRtHash(userId: number, hash: string): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashRt: hash,
      },
    });
  }
}
