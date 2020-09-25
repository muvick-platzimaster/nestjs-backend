import { Expose } from 'class-transformer';

export class GenreDto {
  @Expose()
  readonly id:number;
  @Expose()
  readonly name: string;
}
