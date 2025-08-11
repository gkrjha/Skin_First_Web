import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ namespace: '/chat', cors: { origin: '*' } })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  afterInit() {
    console.log('Chat gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, payload: { conversationId: string }) {
    client.join(payload.conversationId);
    console.log(`Client ${client.id} joined room ${payload.conversationId}`);
  }

  @SubscribeMessage('leave')
  handleLeave(client: Socket, payload: { conversationId: string }) {
    client.leave(payload.conversationId);
    console.log(`Client ${client.id} left room ${payload.conversationId}`);
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: any) {
    const msg = await this.chatService.getOrCreateConversationasync(payload);
    this.server.to(payload.conversation).emit('message', msg);
    return { status: 'ok' };
  }
}
