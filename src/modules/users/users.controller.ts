import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetCurrentUserId } from '../auth/decorators';
import {
  DeleteUserResponse,
  GetUserInfoResponse,
  SendReviewResponse,
  UpdateUserResponse,
} from './responses';
import { ChangeInfoDto } from './dto/change.info.dto';
import { ReviewDto } from './dto/review.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async getUserInfo(
    @GetCurrentUserId() userId: number,
  ): Promise<GetUserInfoResponse> {
    return this.usersService.getUserInfo(userId);
  }

  @Patch()
  public async changeUserInfo(
    @GetCurrentUserId() userId: number,
    @Body() dto: ChangeInfoDto,
  ): Promise<UpdateUserResponse> {
    return this.usersService.changeUserInfo(userId, dto);
  }

  @Delete()
  public async deleteUser(
    @GetCurrentUserId() userId: number,
  ): Promise<DeleteUserResponse> {
    return this.usersService.deleteUser(userId);
  }

  /**
   * Paste in `id` field userId, which u want to get review
   */
  @Post('review/:id')
  public async sendReviewToUser(
    @GetCurrentUserId() userId: number,
    @Body() dto: ReviewDto,
    @Param('id') targetId: number,
  ): Promise<SendReviewResponse> {
    return this.usersService.sendReviewForUser(userId, dto, targetId);
  }
}
