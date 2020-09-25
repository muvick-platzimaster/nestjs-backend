import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GenreDto {
  @Expose()
  @ApiProperty()
  readonly id: number;
  @Expose()
  @ApiProperty()
  readonly name: string;
}
