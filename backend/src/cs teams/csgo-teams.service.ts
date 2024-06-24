import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class CSGOTeamsService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly logger = new Logger(CSGOTeamsService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('gridApiUrl') ?? '';
    this.apiKey = this.configService.get<string>('gridApiKey') ?? '';
    this.logger.log(`API URL: ${this.apiUrl}`);
    this.logger.log(`API Key: ${this.apiKey}`);
  }

  async getTeamsByTitleId(titleId: number): Promise<any> {
    if (!this.apiUrl || !this.apiKey) {
      this.logger.error('API URL or API Key is missing');
      throw new Error('API URL or API Key is missing');
    }

    const query = `
      query GetTeams {
        teams(first: 50, after: null, filter: {
          titleId: ${titleId}
        }) {
          totalCount
          pageInfo {
            hasPreviousPage
            hasNextPage
            startCursor
            endCursor
          }
          edges {
            cursor
            node {
              id
              name
              colorPrimary
              colorSecondary
              logoUrl
              externalLinks {
                dataProvider {
                  name
                }
                externalEntity {
                  id
                }
              }
            }
          }
        }
      }
    `;

    const headers = {
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json',
    };

    return this.httpService.post(this.apiUrl, { query }, { headers })
      .pipe(
        map((response: any) => {
          this.logger.log(`Response status: ${response.status}`);
          this.logger.log(`Response data: ${JSON.stringify(response.data)}`);
          if (response.status !== 200) {
            this.logger.error(`Unexpected response status: ${response.status}`);
            throw new Error(`Unexpected response status: ${response.status}`);
          }
          return response.data.data.teams;
        }),
        catchError(err => {
          const status = err.response?.status;
          const data = err.response?.data;

          this.logger.error(`Error status: ${status}`);
          this.logger.error(`Error response data: ${JSON.stringify(data)}`);

          if (status === 401) {
            throw new Error('Unauthorized: Invalid API key');
          } else if (status === 400) {
            throw new Error(`Bad Request: ${data.errors?.[0]?.message}`);
          } else if (status === 404) {
            throw new Error('Not Found: The specified resource does not exist');
          } else {
            throw new Error('Error fetching teams details');
          }
        })
      )
      .toPromise();
  }

  async getTeam(teamId: string): Promise<any> {
    const titleId = 28; // Fixed titleId as per requirement
    const teamsData = await this.getTeamsByTitleId(titleId);
    const team = teamsData.edges.find(team => team.node.id === teamId)?.node;

    if (!team) {
      this.logger.error(`Team with ID ${teamId} not found`);
      throw new Error('Not Found: The specified team does not exist');
    }

    return team;
  }
}