import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ExchangesService {
  constructor(private readonly prisma: PrismaService) {}

  exchangeBetweenUsers() {}

  getCurrencies() {}

  // Function which calculate a profit in deal
  getProfitInExchange() {}
}
