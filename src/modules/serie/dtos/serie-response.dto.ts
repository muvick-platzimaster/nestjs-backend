import { PageResultDto } from '../../../util/page-result.dto';
import { ApiProperty } from '@nestjs/swagger';
import { SerieDto } from './serie.dto';

export class SerieResponseDto extends PageResultDto {
  @ApiProperty({ type: SerieDto, isArray: true })
  results: SerieDto[];
}
