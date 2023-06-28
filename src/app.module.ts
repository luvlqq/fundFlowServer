import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { TransfersModule } from './modules/transfers/transfers.module';
import { ExchangesModule } from './modules/exchanges/exchanges.module';
import { MessagesModule } from './modules/messages/messages.module';
import { HistoriesModule } from './modules/histories/histories.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AccountsRepository } from './modules/accounts/accounts.repository';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AccountsModule,
    TransfersModule,
    ExchangesModule,
    MessagesModule,
    HistoriesModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [PrismaService, AccountsRepository],
})
export class AppModule {}
