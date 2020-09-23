import { PageResultDto } from 'src/utils/page-result.dto';
import { ApiProperty } from '@nestjs/swagger';
import { MovieReadDto } from './movie-read.dto';

export class MovieResponseDto extends PageResultDto {
  @ApiProperty({ type: MovieReadDto, isArray: true })
  readonly results: MovieReadDto[];
}
