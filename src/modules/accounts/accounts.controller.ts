import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { GetCurrentUserId } from '../auth/decorators';
import { CreateAccountDto, UpdateAccountDto } from './dto';
import {
  CreateAccountResponse,
  GetAllAccountsResponse,
  UpdateAccountResponse,
  DeleteAccountResponse,
  GetAccountResponse,
} from './responses';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('create')
  createAnAccount(
    @GetCurrentUserId() userId: number,
    @Body() dto: CreateAccountDto,
  ): Promise<CreateAccountResponse> {
    return this.accountsService.createAnAccount(dto, userId);
  }

  @Get()
  getAllAccounts(
    @GetCurrentUserId() userId: number,
  ): Promise<GetAllAccountsResponse[]> {
    return this.accountsService.getAllAccounts(userId);
  }

  @Get(':id')
  getAccountById(@Param('id') accountId: number): Promise<GetAccountResponse> {
    return this.accountsService.getAccountById(accountId);
  }

  @Delete('delete/:id')
  deleteAnAccount(
    @GetCurrentUserId() userId: number,
    @Param('id') accountId: number,
  ): Promise<DeleteAccountResponse> {
    return this.accountsService.deleteAnAccount(userId, accountId);
  }

  @Patch('edit/:id')
  editAnAccount(
    @GetCurrentUserId() userId: number,
    @Body() dto: UpdateAccountDto,
    @Param('id') accountId: number,
  ): Promise<UpdateAccountResponse> {
    return this.accountsService.updateAccountData(userId, dto, accountId);
  }
}
