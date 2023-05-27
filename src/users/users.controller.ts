import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUserInfo() {}

  @Patch(':id')
  changeUserInfo() {}

  @Delete(':id')
  deleteUser() {}

  @Post('review/:id')
  sendReviewToUser() {}
}
