import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({
  namespace: '/series-events',
  cors: {
    origin: '*',
  },
})
export class SeriesEventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('SeriesEventsGateway');

  constructor(private configService: ConfigService) {}

  afterInit(server: Server) {
    this.logger.log('WebSocket Server Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    const apiKey = client.handshake.query.key as string;
    const gridApiKey = this.configService.get<string>('GRID_API_KEY');
    this.logger.log(`Received API Key: ${apiKey}`);
    this.logger.log(`Expected API Key: ${gridApiKey}`);

    if (!apiKey || apiKey !== gridApiKey) {
      client.disconnect();
      this.logger.warn(`Client disconnected due to invalid API key: ${client.id}`);
    } else {
      this.logger.log(`Client connected: ${client.id}`);
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('subscribeToSeries')
  handleSubscribeToSeries(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { seriesId: string }
  ) {
    const room = `series_${data.seriesId}`;
    client.join(room);
    this.logger.log(`Client ${client.id} subscribed to series ${data.seriesId}`);
  }

  sendEventUpdate(seriesId: string, event: any) {
    const room = `series_${seriesId}`;
    this.server.to(room).emit('eventUpdate', event);
    this.logger.log(`Event update sent to series ${seriesId}`);
  }

  // Test function to manually send an event update
  testSendEventUpdate() {
    const testSeriesId = 'series-1'; // Replace with your actual series ID
    const testEvent = { message: 'This is a test event update' };
    this.sendEventUpdate(testSeriesId, testEvent);
  }
}
