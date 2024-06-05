import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SeriesModule } from './series/series.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '../config/configuration';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: path.resolve(__dirname, '../../.env'),
    }),
    SeriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
