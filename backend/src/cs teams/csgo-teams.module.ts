import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CSGOTeamsService } from './csgo-teams.service';
import { CSGOTeamsController } from './csgo-teams.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [CSGOTeamsService],
  controllers: [CSGOTeamsController],
})
export class CSGOTeamsModule {}
