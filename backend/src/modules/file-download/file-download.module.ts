import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { FileDownloadService } from './file-download.service';
import { FileDownloadController } from './file-download.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [FileDownloadService],
  controllers: [FileDownloadController],
})
export class FileDownloadModule {}
