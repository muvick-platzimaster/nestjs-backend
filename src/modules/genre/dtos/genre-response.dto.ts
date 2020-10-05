import { Expose } from 'class-transformer';
import { GenreDto } from './genre.dto';

export class GenreResponseDto {
  @Expose()
  results: GenreDto[];
}
