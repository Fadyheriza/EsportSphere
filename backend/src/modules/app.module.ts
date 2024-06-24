import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { SeriesStateModule } from '../modules/series/series-state.module';
import { SeriesEventsModule } from '../modules/websocket/series-events.module';
import { FileDownloadModule } from '../modules/file-download/file-download.module';
import { SeriesStateService } from '../modules/series/series-state.service';
import { CSGOTeamsModule } from '../cs teams/csgo-teams.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('mongodbUri');
        console.log('MongoDB URI:', uri);  // Debugging line
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
    HttpModule,
    CSGOTeamsModule,
    SeriesStateModule,
    SeriesEventsModule,
    FileDownloadModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeriesStateService],
})
export class AppModule { }
