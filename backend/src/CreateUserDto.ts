import { ApiProperty } from '@nestjs/swagger';

export class SeriesStateDto {
  @ApiProperty({ example: '1', description: 'The ID of the series state' })
  id: string;

  @ApiProperty({ example: 'Active', description: 'The status of the series state' })
  status: string;
}
