import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { MessagesService } from './messages.service';

@WebSocketGateway()
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('getAllMessages')
  getAllMessages() {}

  @SubscribeMessage('sendMessage')
  sendMessage() {}
}
