import { Injectable } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  @WebSocketServer() 
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socet) => {
      console.log(socet.id);
      console.log('Connected');
    })

    this.server.off('connection', (socet) => {
      console.log(socet.id);
      console.log('DisConnected');
    })
  }
  
  @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): any {
    onMessage(@MessageBody() body2: any) {
    console.log(' На сервер пришло сообщение!!!', '===', body2);
    this.server.emit('srvMessage', body2)
    // return 'Hello world!';
  }
}
