import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get(':id')
  getAccountDetails() {}

  @Get()
  getAllAccounts() {}

  @Post('create')
  createAnAccount() {}

  @Delete('delete')
  deleteAnAccount() {}

  @Patch('edit')
  editAnAccount() {}
}
