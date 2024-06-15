import { Controller, Get, Param } from '@nestjs/common';
import { FileDownloadService } from './file-download.service';

@Controller('file-download')
export class FileDownloadController {
  constructor(private readonly fileDownloadService: FileDownloadService) {}

  @Get('list/:seriesId')
  async getFilesForSeries(@Param('seriesId') seriesId: string) {
    return this.fileDownloadService.getFilesForSeries(seriesId);
  }
}
