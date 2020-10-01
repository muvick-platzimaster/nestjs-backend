import { PageResultDto } from 'src/util/page-result.dto';
import { ApiProperty } from '@nestjs/swagger';
import { SerieReadDto } from './serie-read.dto';

export class SerieResponseDto extends PageResultDto {
  @ApiProperty({ type: SerieReadDto, isArray: true })
  readonly results: SerieReadDto[];
}
