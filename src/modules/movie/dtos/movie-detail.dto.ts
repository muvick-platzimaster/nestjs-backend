import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { GenreDto } from 'src/modules/genre/dtos/genre.dto';

@Exclude()
export class MovieDetailDto {
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
  readonly title: string;
  @Expose()
  @ApiProperty()
  readonly original_title: string;
  @Expose()
  @ApiProperty()
  readonly overview: string;
  @Expose()
  @ApiProperty()
  readonly popularity: number;
  @Expose()
  @ApiProperty()
  readonly release_date: string;
  @Expose()
  @ApiProperty()
  readonly runtime: number;
  @Expose()
  @ApiProperty()
  readonly vote_average: number;
  @Expose()
  @ApiProperty({ type: GenreDto, isArray: true })
  readonly genres: GenreDto[];
}
