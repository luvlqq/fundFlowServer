import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransfersModule } from './transfers/transfers.module';
import { ExchangesModule } from './exchanges/exchanges.module';
import { MessagesModule } from './messages/messages.module';
import { HistoriesModule } from './histories/histories.module';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

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
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
