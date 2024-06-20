import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('default')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ongoing-matches')
  getOngoingMatches(){
    return this.appService.getOngoingMatches();
  }

  @Get('game-info')
  getGameInfo() {
    return this.appService.getGameInfo();
  }

  @Get()
  @ApiOperation({ summary: 'Get Hello message' }) // Operation summary
  @ApiResponse({ status: 200, description: 'Successful response' }) // Response details
  getHello(): string {
    return this.appService.getHello();
  }
}
