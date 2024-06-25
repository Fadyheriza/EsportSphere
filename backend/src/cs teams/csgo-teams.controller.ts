import { Controller, Get, Param } from '@nestjs/common';
import { CSGOTeamsService } from './csgo-teams.service';

@Controller('csgo-teams')
export class CSGOTeamsController {
  constructor(private readonly csgoTeamsService: CSGOTeamsService) {}

  @Get(':id')
  async getTeam(@Param('id') id: string) {
    return this.csgoTeamsService.getTeam(id);
  }

  @Get(':id/roster')
  async getTeamRoster(@Param('id') id: string) {
    return this.csgoTeamsService.getTeamRoster(id);
  }
}
