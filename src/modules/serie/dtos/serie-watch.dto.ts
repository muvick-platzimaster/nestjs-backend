import { ApiProperty } from '@nestjs/swagger';

export class SerieWatchDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  url: string;

}
