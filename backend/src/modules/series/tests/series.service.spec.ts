import { Test, TestingModule } from '@nestjs/testing';
import { SeriesService } from '../series.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('SeriesService', () => {
  let service: SeriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [SeriesService],
    }).compile();

    service = module.get<SeriesService>(SeriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch series', async () => {
    const series = await service.getAllSeries();
    expect(series).toBeDefined();
    expect(series).toBeInstanceOf(Array);
  });
});
