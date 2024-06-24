import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { SeriesStateService } from  '../modules/series/series-state.service';

@ApiTags('default')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly seriesStateService: SeriesStateService
  ) {}

  @Get('ongoing-matches')
  getOngoingMatches(){
    return this.appService.getOngoingMatches();
  }

  @Get('game-info')
  getGameInfo() {
    return this.appService.getGameInfo();
  }

  @Get('series-state/:id')
  @ApiOperation({ summary: 'Get Series State' }) // Operation summary
  @ApiResponse({ status: 200, description: 'Successful response' }) // Response details
  async getSeriesState(@Param('id') seriesId: string): Promise<any> {
    return this.seriesStateService.getSeriesInNext24Hours();
  }

  @Get()
  @ApiOperation({ summary: 'Get Hello message' }) // Operation summary
  @ApiResponse({ status: 200, description: 'Successful response' }) // Response details
  getHello(): string {
    return this.appService.getHello();
  }
}
