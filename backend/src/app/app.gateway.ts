import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  @WebSocketServer() server: Server;
  
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('server message!!!', '===', payload);
    return 'Hello world!';
  }
}
