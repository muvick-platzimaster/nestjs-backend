import { ApiProperty } from '@nestjs/swagger';

export class MovieWatchDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  url: string;
}
