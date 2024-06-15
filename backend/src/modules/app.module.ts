import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SeriesStateModule } from '../modules/series/series-state.module'; // Correct import path
import { SeriesEventsModule } from '../modules/websocket/series-events.module';
import { FileDownloadModule } from '../modules/file-download/file-download.module';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    SeriesStateModule,
    SeriesEventsModule,
    FileDownloadModule,
  ],
})
export class AppModule {}