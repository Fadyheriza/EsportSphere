import { Controller, Get, Param, Res } from '@nestjs/common';
import { SeriesFileDownloadService } from './series-file-download.service';
import { Response } from 'express';

@Controller('series-file')
export class SeriesFileDownloadController {
  constructor(private readonly seriesFileDownloadService: SeriesFileDownloadService) {}

  @Get('download/:id')
  async downloadSeriesFile(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const file = await this.seriesFileDownloadService.downloadSeriesFile(id);
    res.setHeader('Content-Disposition', `attachment; filename=${id}.json`);
    res.setHeader('Content-Type', 'application/json');
    res.send(file.data);
  }
}
