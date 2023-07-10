import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Reviews, User } from '@prisma/client';
import { ChangeInfoDto } from './dto/change.info.dto';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async getUserInfo(userId): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  public async changeUserInfo(
    userId: number,
    dto: ChangeInfoDto,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        avatarImg: dto.avatarImg,
      },
    });
  }

  public async deleteUser(userId: number): Promise<User> {
    return this.prisma.user.delete({ where: { id: userId } });
  }

  public async sendReviewForUser(
    userId: number,
    dto: ReviewDto,
    targetUserId: number,
  ): Promise<Reviews> {
    return this.prisma.reviews.create({
      data: {
        text: dto.text,
        rating: dto.rating,
        user: { connect: { id: userId } },
        targetUser: { connect: { id: targetUserId } },
      },
    });
  }
}
