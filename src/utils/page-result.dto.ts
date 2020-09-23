import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class PageResultDto {
  @Expose()
  @ApiProperty()
  readonly page: number;
  @ApiProperty()
  readonly total_results: number;
  @ApiProperty()
  readonly total_pages: number;
}
