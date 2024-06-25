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

  async getTeam(teamId: string): Promise<any> {
    const query = `
      query GetTeam {
        team(id: "${teamId}") {
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
    `;

    const headers = {
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json',
    };

    return this.httpService.post(this.apiUrl, { query }, { headers })
      .pipe(
        map((response: any) => {
          if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
          }
          return response.data.data.team;
        }),
        catchError(err => {
          const status = err.response?.status;
          const data = err.response?.data;

          if (status === 401) {
            throw new Error('Unauthorized: Invalid API key');
          } else if (status === 400) {
            throw new Error(`Bad Request: ${data.errors?.[0]?.message}`);
          } else if (status === 404) {
            throw new Error('Not Found: The specified team does not exist');
          } else {
            throw new Error('Error fetching team details');
          }
        })
      )
      .toPromise();
  }

  async getTeamRoster(teamId: string): Promise<any> {
    const query = `
      query GetTeamRoster {
        players(filter: {teamIdFilter: {id: "${teamId}"}}) {
          edges {
            node {
              id
              nickname
              title {
                name
              }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
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
          if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
          }
          return response.data.data.players.edges.map(edge => edge.node);
        }),
        catchError(err => {
          const status = err.response?.status;
          const data = err.response?.data;

          if (status === 401) {
            throw new Error('Unauthorized: Invalid API key');
          } else if (status === 400) {
            throw new Error(`Bad Request: ${data.errors?.[0]?.message}`);
          } else if (status === 404) {
            throw new Error('Not Found: The specified team does not exist');
          } else {
            throw new Error('Error fetching team roster');
          }
        })
      )
      .toPromise();
  }
}
