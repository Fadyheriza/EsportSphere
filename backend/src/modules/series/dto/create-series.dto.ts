import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSeriesDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly startTimeScheduled: string;

  @IsString()
  @IsNotEmpty()
  readonly tournamentName: string;
}
