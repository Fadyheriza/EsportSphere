import { Controller, Get } from '@nestjs/common';
import { SeriesService } from './series.service';
import { Series } from './interfaces/series.interface';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get()
  async getAllSeries(): Promise<Series[]> {
    return this.seriesService.getAllSeries();
  }
}
