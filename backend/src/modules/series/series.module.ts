import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SeriesService } from './series.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [SeriesService],
  exports: [SeriesService],
})
export class SeriesModule {}
