import { Resolver, Query } from '@nestjs/graphql';
import { GridService } from './grid.service';
import { Series } from './series.model';

@Resolver()
export class GridResolver {
  constructor(private readonly gridService: GridService) {}

  @Query(() => [Series])
  async seriesList() {
    return this.gridService.fetchSeriesList();
  }
}
