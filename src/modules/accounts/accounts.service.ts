import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountDto, UpdateAccountDto } from './dto';
import { AccountsRepository } from './accounts.repository';
import {
  CreateAccountResponse,
  DeleteAccountResponse,
  GetAllAccountsResponse,
  UpdateAccountResponse,
} from './responses';

@Injectable()
export class AccountsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly repository: AccountsRepository,
  ) {}

  public async createAnAccount(
    dto: CreateAccountDto,
    userId: number,
  ): Promise<CreateAccountResponse> {
    return this.repository.createAnAccount(dto, userId);
  }

  public async getAllAccounts(
    userId: number,
  ): Promise<GetAllAccountsResponse[]> {
    return this.repository.getAllAccounts(userId);
  }

  public async getAccountById(
    accountId: number,
  ): Promise<GetAllAccountsResponse> {
    await this.findAccount(accountId);
    return this.repository.getAccountById(accountId);
  }

  public async updateAccountData(
    userId: number,
    dto: UpdateAccountDto,
    accountId: number,
  ): Promise<UpdateAccountResponse> {
    await this.findAccount(accountId);
    await this.compareUserIdAndAccountId(userId, accountId);
    return this.repository.changeInfoAboutAccount(dto, accountId);
  }

  public async deleteAnAccount(
    userId: number,
    accountId: number,
  ): Promise<DeleteAccountResponse> {
    await this.findAccount(accountId);
    await this.compareUserIdAndAccountId(userId, accountId);
    return this.repository.deleteAccount(accountId);
  }

  /**
   * Find an account in db and check, exist or no.
   */
  public async findAccount(accountId): Promise<void> {
    const findAccount = await this.repository.getAccountId(accountId);
    if (!findAccount) {
      throw new BadRequestException('Account with this id doesnt exist');
    }
  }

  /**
   * Compare userId and Account Id for check owner of Account. User can delete only their account.
   **/
  public async compareUserIdAndAccountId(
    userId: number,
    accountId: number,
  ): Promise<void> {
    const getAccountOwnerId = await this.repository.getAccountId(accountId);
    console.log(userId);
    if (userId != getAccountOwnerId.userId) {
      throw new HttpException('Account owner id and owner dont match', 403);
    }
  }
}
