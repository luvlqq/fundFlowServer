import { Controller, Get, Post } from '@nestjs/common';
import { ExchangesService } from './exchanges.service';

@Controller('exchanges')
export class ExchangesController {
  constructor(private readonly exchangesService: ExchangesService) {}

  @Post('send')
  exchangeBetweenUsers() {}

  @Get('info')
  getExchangeInfo() {}
}
