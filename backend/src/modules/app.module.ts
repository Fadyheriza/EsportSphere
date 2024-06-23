import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SeriesStateModule } from '../modules/series/series-state.module'; 
import { SeriesEventsModule } from '../modules/websocket/series-events.module';
import { FileDownloadModule } from '../modules/file-download/file-download.module';
import { SeriesStateService } from  '../modules/series/series-state.service';
import { CSGOTeamsModule } from '../cs teams/csgo-teams.module'; // Import the CSGOTeamsModule
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    HttpModule,
    CSGOTeamsModule,
    SeriesStateModule,
    SeriesEventsModule,
    FileDownloadModule,
    
  ],
  controllers: [AppController],
  providers: [AppService, SeriesStateService],
})
export class AppModule {}