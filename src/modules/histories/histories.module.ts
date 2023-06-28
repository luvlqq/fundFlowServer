import { Module } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { HistoriesController } from './histories.controller';
import { HistoriesRepository } from './histories.repository';

@Module({
  controllers: [HistoriesController],
  providers: [HistoriesService, HistoriesRepository],
})
export class HistoriesModule {}
