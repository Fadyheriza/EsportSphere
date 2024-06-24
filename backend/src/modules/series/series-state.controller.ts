import { Controller, Get } from '@nestjs/common';
import { SeriesStateService } from './series-state.service';

@Controller('series-state')
export class SeriesStateController {
  constructor(private readonly seriesStateService: SeriesStateService) {}

  @Get('next-24-hours')
  async getSeriesInNext24Hours() {
    return this.seriesStateService.getSeriesInNext24Hours();
  }
}
