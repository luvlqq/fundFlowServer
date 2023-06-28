import { Module } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { TransfersRepository } from './transfers.repository';

@Module({
  controllers: [TransfersController],
  providers: [TransfersService, TransfersRepository],
})
export class TransfersModule {}
