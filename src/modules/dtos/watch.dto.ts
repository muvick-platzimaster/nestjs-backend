import { ApiProperty } from '@nestjs/swagger';

export class WatchDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  url: string;
}
