import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Series } from './interfaces/series.interface';

@Injectable()
export class SeriesService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly logger = new Logger(SeriesService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('GRID_API_URL') ?? '';
    this.apiKey = this.configService.get<string>('GRID_API_KEY') ?? '';
    this.logger.log(`Loaded API URL from process.env: ${process.env.GRID_API_URL}`);
    this.logger.log(`Loaded API Key from process.env: ${process.env.GRID_API_KEY}`);
    this.logger.log(`API URL: ${this.apiUrl}`);
    this.logger.log(`API Key: ${this.apiKey}`);
  }

  async getAllSeries(): Promise<Series[]> {
    if (!this.apiUrl || !this.apiKey) {
      this.logger.error('API URL or API Key is missing');
      throw new Error('API URL or API Key is missing');
    }

    const query = `
      query {
        allSeries(
          first: 50,
          filter: {
            titleId: 6,
            types: ESPORTS
          },
          orderBy: StartTimeScheduled,
          orderDirection: DESC
        ) {
          totalCount
          pageInfo {
            hasPreviousPage
            hasNextPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              title {
                id
              }
              tournament {
                id
                name
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
          if (response.status !== 200) {
            this.logger.error(`Unexpected response status: ${response.status}`);
            throw new Error(`Unexpected response status: ${response.status}`);
          }
          this.logger.log(`Response status: ${response.status}`);
          this.logger.log(`Response data: ${JSON.stringify(response.data)}`);
          return response.data.data.allSeries.edges.map((edge: any) => edge.node);
        }),
        catchError(err => {
          this.logger.error('Error status: ', err.response?.status);
          this.logger.error('Error response data: ', err.response?.data);
          return throwError(() => new Error('Error fetching series data'));
        })
      )
      .toPromise();
  }
}
