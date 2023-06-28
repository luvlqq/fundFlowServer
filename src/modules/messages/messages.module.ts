import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { MessagesRepository } from './messages.repository';

@Module({
  providers: [MessagesGateway, MessagesService, MessagesRepository],
})
export class MessagesModule {}
