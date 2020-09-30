import { Controller, Get, Query, Param } from '@nestjs/common';
import { SerieService } from './serie.service';
import { SerieResponseDto } from './dto/serie-response.dto';
import { ApiQuery, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SerieDetailDto } from './dto/serie-detail.dto';

@ApiTags('The series')
@Controller('tvs')
export class SerieController {
  constructor(private readonly _SerieService: SerieService) {}
  @Get()
  @ApiQuery({ name: 'query', required: false })
  @ApiQuery({ name: 'genre', required: false })
  @ApiQuery({ name: 'language', required: false })
  @ApiOkResponse({ type: SerieResponseDto })
  getAll(
    @Query('query') query?: string,
    @Query('genre') genre?: number,
    @Query('language') language?: string,
  ): Promise<SerieResponseDto> {
    return this._SerieService.findAll({
      query,
      genres: [genre],
      language,
    });
  }

  @Get(':id/detail')
  @ApiQuery({ name: 'language', required: false })
  @ApiOkResponse({ type: SerieDetailDto })
  getById(@Param('id') id: number, @Query('language') language?: string) {
    return this._SerieService.findById({ id, language });
  }

  @Get('popular')
  @ApiOkResponse({ type: SerieResponseDto })
  getPopular(@Query('language') language?: string): Promise<SerieResponseDto> {
    return this._SerieService.findPopular({ language });
  }

  @Get('top-rated')
  @ApiOkResponse({ type: SerieResponseDto })
  getTopRated(@Query('language') language?: string): Promise<SerieResponseDto> {
    return this._SerieService.findTopRated({ language });
  }
}
