import { Module } from '@nestjs/common';
import { SeriesEventsGateway } from './series-events.gateway';
import { SeriesEventsController } from './series-events.controller';

@Module({
  providers: [SeriesEventsGateway],
  controllers: [SeriesEventsController],
})
export class SeriesEventsModule {}
