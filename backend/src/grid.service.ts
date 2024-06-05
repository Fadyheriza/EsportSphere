import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { map, catchError } from 'rxjs/operators';
import { Series } from './series.model';
import { throwError } from 'rxjs';

@Injectable()
export class GridService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly logger = new Logger(GridService.name);

  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
    this.apiUrl = this.configService.get<string>('GRID_API_URL');
    this.apiKey = this.configService.get<string>('GRID_API_KEY');
  }

  async fetchSeriesList(): Promise<Series[]> {
    const query = `
      {
        series {
          id
          name
        }
      }
    `;

    const headers = {
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json',
    };

    this.logger.log('Fetching series list from GRID API');
    this.logger.log(`API URL: ${this.apiUrl}`);
    this.logger.log(`Headers: ${JSON.stringify(headers)}`);
    this.logger.log(`Query: ${query}`);

    return this.httpService.post(this.apiUrl, { query }, { headers })
      .pipe(
        map((response: any) => {
          this.logger.log('Received response from GRID API');
          this.logger.log(`Response data: ${JSON.stringify(response.data)}`);
          if (response.data && response.data.data) {
            return response.data.data.series;
          } else {
            this.logger.error('Invalid response format', response.data);
            throw new Error('Invalid response format');
          }
        }),
        catchError(err => {
          this.logger.error('Error fetching series list', err);
          return throwError(() => new Error('Error fetching series list'));
        })
      )
      .toPromise();
  }
}
