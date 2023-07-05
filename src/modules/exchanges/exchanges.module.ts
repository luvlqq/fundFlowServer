import { Module } from '@nestjs/common';
import { ExchangesService } from './exchanges.service';
import { ExchangesController } from './exchanges.controller';
import { ExchangesRepository } from './exchanges.repository';

@Module({
  controllers: [ExchangesController],
  providers: [ExchangesService, ExchangesRepository],
})
export class ExchangesModule {}
