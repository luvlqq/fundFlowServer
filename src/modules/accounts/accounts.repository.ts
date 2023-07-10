import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountDto, UpdateAccountDto } from './dto';
import { Accounts } from '@prisma/client';

@Injectable()
export class AccountsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async getAccountId(accountId: number): Promise<Accounts> {
    return this.prisma.accounts.findUnique({ where: { id: accountId } });
  }

  public async createAnAccount(
    dto: CreateAccountDto,
    userId: number,
  ): Promise<Accounts> {
    return this.prisma.accounts.create({
      data: {
        userId: userId,
        accountName: dto.accountName,
        currency: dto.currency,
      },
    });
  }

  public async getAccountById(accountId: number): Promise<Accounts> {
    return this.prisma.accounts.findUnique({ where: { id: accountId } });
  }

  public async getAllAccounts(userId: number): Promise<Accounts[]> {
    const accounts = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { accounts: true },
    });

    return accounts.accounts;
  }

  public async changeInfoAboutAccount(
    dto: UpdateAccountDto,
    accountId: number,
  ): Promise<Accounts> {
    return this.prisma.accounts.update({
      where: {
        id: accountId,
      },
      data: {
        accountName: dto.accountName,
      },
    });
  }

  public async deleteAccount(accountId: number): Promise<Accounts> {
    return this.prisma.accounts.delete({ where: { id: accountId } });
  }
}
