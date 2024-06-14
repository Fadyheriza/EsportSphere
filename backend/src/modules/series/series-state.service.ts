import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class SeriesStateService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly logger = new Logger(SeriesStateService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('SERIES_STATE_API_URL') ?? '';
    this.apiKey = this.configService.get<string>('GRID_API_KEY') ?? '';
    this.logger.log(`API URL: ${this.apiUrl}`);
    this.logger.log(`API Key: ${this.apiKey}`);
  }

  async getSeriesState(seriesId: string): Promise<any> {
    if (!this.apiUrl || !this.apiKey) {
      this.logger.error('API URL or API Key is missing');
      throw new Error('API URL or API Key is missing');
    }

    const query = `
      query GetLiveDotaSeriesState {
        seriesState(id: "${seriesId}") {
          valid
          updatedAt
          format
          started
          finished
          teams {
            name
            won
          }
          games(filter: { started: true, finished: false }) {
            sequenceNumber
            teams {
              name
              players {
                name
                kills
                deaths
                netWorth
                money
                position {
                  x
                  y
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
          if (response.status !== 200) {
            this.logger.error(`Unexpected response status: ${response.status}`);
            throw new Error(`Unexpected response status: ${response.status}`);
          }
          return response.data.data.seriesState;
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
            throw new Error('Not Found: The specified series does not exist');
          } else {
            throw new Error('Error fetching series state');
          }
        })
      )
      .toPromise();
  }
}
