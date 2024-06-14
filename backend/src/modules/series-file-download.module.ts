import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SeriesFileDownloadService } from './series/series-file-download.service';
import { SeriesFileDownloadController } from './series/series-file-download.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [SeriesFileDownloadService],
  controllers: [SeriesFileDownloadController],
  exports: [SeriesFileDownloadService],
})
export class SeriesFileDownloadModule {}
