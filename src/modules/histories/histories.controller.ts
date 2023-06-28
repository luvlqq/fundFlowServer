import { Controller, Get } from '@nestjs/common';
import { HistoriesService } from './histories.service';

@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Get(':id')
  getHistoryOfAccount() {}

  @Get('')
  getHistoryOfAllAccounts() {}
}
