import { PageResultDto } from '../../../util/page-result.dto';
import { ApiProperty } from '@nestjs/swagger';
import { MovieDto } from './movie.dto';

export class MovieResponseDto extends PageResultDto {
  @ApiProperty({ type: MovieDto, isArray: true })
  results: MovieDto[];
}
