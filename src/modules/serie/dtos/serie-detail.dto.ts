import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { GenreDto } from '../../genre/dtos/genre.dto';

@Exclude()
export class SerieDetailDto {
  @Expose()
  @ApiProperty()
  readonly id: number;
  @Expose()
  @ApiProperty()
  readonly backdrop_path: string;
  @Expose()
  @ApiProperty()
  readonly poster_path: string;
  @Expose()
  @ApiProperty()
  readonly original_language: string;
  @Expose()
  @ApiProperty()
  readonly original_name: string;
  @Expose()
  @ApiProperty()
  readonly name: string;
  @Expose()
  @ApiProperty()
  readonly overview: string;
  @Expose()
  @ApiProperty()
  readonly popularity: number;
  @Expose()
  @ApiProperty()
  readonly first_air_date: string;
  @Expose()
  @ApiProperty()
  readonly vote_count: number;
  @Expose()
  @ApiProperty()
  readonly vote_average: number;
  @Expose()
  @ApiProperty({ type: GenreDto, isArray: true })
  readonly genres: GenreDto[];
}
