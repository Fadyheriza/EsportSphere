import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class SeriesFileDownloadService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly logger = new Logger(SeriesFileDownloadService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('FILE_DOWNLOAD_API_URL') ?? '';
    this.apiKey = this.configService.get<string>('FILE_DOWNLOAD_API_KEY') ?? '';
    this.logger.log(`File Download API URL: ${this.apiUrl}`);
    this.logger.log(`File Download API Key: ${this.apiKey}`);
  }

  async downloadSeriesFile(seriesId: string): Promise<AxiosResponse<any>> {
    if (!this.apiUrl || !this.apiKey) {
      this.logger.error('File Download API URL or API Key is missing');
      throw new Error('File Download API URL or API Key is missing');
    }

    const url = `${this.apiUrl}/download/${seriesId}`;
    const headers = {
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json',
    };

    return this.httpService.get(url, { headers, responseType: 'arraybuffer' })
      .pipe(
        catchError(err => {
          this.logger.error('Error status: ', err.response?.status);
          this.logger.error('Error response data: ', err.response?.data);
          return throwError(() => new Error('Error downloading series file'));
        })
      )
      .toPromise();
  }
}
