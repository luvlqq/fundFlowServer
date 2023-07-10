import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import {
  DeleteUserResponse,
  GetUserInfoResponse,
  SendReviewResponse,
  UpdateUserResponse,
} from './responses';
import { ChangeInfoDto } from './dto/change.info.dto';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  public async getUserInfo(userId: number): Promise<GetUserInfoResponse> {
    return this.repository.getUserInfo(userId);
  }

  public async changeUserInfo(
    userId: number,
    dto: ChangeInfoDto,
  ): Promise<UpdateUserResponse> {
    return this.repository.changeUserInfo(userId, dto);
  }

  public async deleteUser(userId: number): Promise<DeleteUserResponse> {
    return this.repository.deleteUser(userId);
  }

  public async sendReviewForUser(
    userId: number,
    dto: ReviewDto,
    targetId: number,
  ): Promise<SendReviewResponse> {
    if (userId == targetId) {
      throw new BadRequestException('You cant send review to yourself');
    }
    return this.repository.sendReviewForUser(userId, dto, targetId);
  }
}
