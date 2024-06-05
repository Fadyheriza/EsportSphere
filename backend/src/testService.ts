import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SeriesService } from './modules/series/series.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seriesService = app.get(SeriesService);
  
  try {
    const series = await seriesService.getAllSeries();
    console.log('Series:', JSON.stringify(series, null, 2));
  } catch (error) {
    console.error('Error fetching series data:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
