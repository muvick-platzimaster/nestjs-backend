import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class MovieDto {
  @Expose()
  @ApiProperty()
  readonly id: number;
  @Expose()
  @ApiProperty()
  readonly popularity: number;
  @Expose()
  @ApiProperty()
  readonly vote_count: number;
  @Expose()
  @ApiProperty()
  readonly video: boolean;
  @Expose()
  @ApiProperty()
  readonly adult: boolean;
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
  readonly original_title: string;
  @Expose()
  @ApiProperty({ type: Number, isArray: true })
  readonly genre_ids: number[];
  @Expose()
  @ApiProperty()
  readonly title: string;
  @Expose()
  @ApiProperty()
  readonly vote_average: number;
  @Expose()
  @ApiProperty()
  readonly overview: string;
  @Expose()
  @ApiProperty()
  readonly release_date: string;
}
