import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransfersModule } from './transfers/transfers.module';
import { ExchangesModule } from './exchanges/exchanges.module';
import { MessagesModule } from './messages/messages.module';
import { HistoriesModule } from './histories/histories.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AccountsRepository } from './accounts/accounts.repository';
import { AtGuard } from './auth/guards';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';

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
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    PrismaService,
    AccountsRepository,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
