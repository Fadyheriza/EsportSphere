import { Controller, Post } from '@nestjs/common';
import { SeriesEventsGateway } from './series-events.gateway';

@Controller('series-events')
export class SeriesEventsController {
  constructor(private readonly seriesEventsGateway: SeriesEventsGateway) {}

  @Post('test-update')
  testSendEventUpdate() {
    this.seriesEventsGateway.testSendEventUpdate();
    return { message: 'Test event update sent' };
  }
}
