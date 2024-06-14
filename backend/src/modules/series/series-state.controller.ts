import { Controller, Get, Param } from '@nestjs/common';
import { SeriesStateService } from './series-state.service';

@Controller('series-state')
export class SeriesStateController {
  constructor(private readonly seriesStateService: SeriesStateService) {}

  @Get(':id')
  async getSeriesState(@Param('id') id: string) {
    return this.seriesStateService.getSeriesState(id);
  }
}
