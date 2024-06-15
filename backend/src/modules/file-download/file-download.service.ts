import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class FileDownloadService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly logger = new Logger(FileDownloadService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = 'https://api.grid.gg/file-download';
    this.apiKey = this.configService.get<string>('GRID_API_KEY') ?? '';
    this.logger.log(`API URL: ${this.apiUrl}`);
    this.logger.log(`API Key: ${this.apiKey}`);
  }

  async getFilesForSeries(seriesId: string): Promise<any> {
    if (!this.apiUrl || !this.apiKey) {
      this.logger.error('API URL or API Key is missing');
      throw new Error('API URL or API Key is missing');
    }

    const url = `${this.apiUrl}/list/${seriesId}`;
    const headers = {
      'x-api-key': this.apiKey,
      'Accept': 'application/json',
    };

    return this.httpService.get(url, { headers })
      .pipe(
        map((response: any) => {
          if (response.status !== 200) {
            this.logger.error(`Unexpected response status: ${response.status}`);
            throw new Error(`Unexpected response status: ${response.status}`);
          }
          return response.data;
        }),
        catchError(err => {
          const status = err.response?.status;
          const data = err.response?.data;

          this.logger.error(`Error status: ${status}`);
          this.logger.error(`Error response data: ${JSON.stringify(data)}`);

          if (status === 401) {
            throw new Error('Unauthorized: Invalid API key');
          } else if (status === 400) {
            throw new Error(`Bad Request: ${data.message}`);
          } else if (status === 403) {
            throw new Error('Forbidden: Access to the series data is denied');
          } else {
            throw new Error('Error fetching files for series');
          }
        })
      )
      .toPromise();
  }
}
