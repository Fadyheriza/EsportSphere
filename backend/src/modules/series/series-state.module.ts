import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SeriesStateService } from './series-state.service';
import { SeriesStateController } from './series-state.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [SeriesStateService],
  controllers: [SeriesStateController],
  exports: [SeriesStateService],  // Add this line to export the service
})
export class SeriesStateModule {}
