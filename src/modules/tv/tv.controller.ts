import { Controller, Get, Query, Param } from '@nestjs/common';
import { TvService } from './tv.service';
import { TvResponseDto } from './dto/tv-response.dto';
import { ApiQuery, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TvDetailDto } from './dto/tv-detail.dto';

@ApiTags('The series')
@Controller('tvs')
export class TvController {
  constructor(private readonly _tvService: TvService) {}
  @Get()
  @ApiQuery({ name: 'query', required: false })
  @ApiQuery({ name: 'genre', required: false })
  @ApiQuery({ name: 'language', required: false })
  @ApiOkResponse({ type: TvResponseDto })
  getAll(
    @Query('query') query?: string,
    @Query('genre') genre?: number,
    @Query('language') language?: string,
  ): Promise<TvResponseDto> {
    return this._tvService.findAll({
      query,
      genres: [genre],
      language,
    });
  }

  @Get(':id/detail')
  @ApiQuery({ name: 'language', required: false })
  @ApiOkResponse({ type: TvDetailDto })
  getById(@Param('id') id: number, @Query('language') language?: string) {
    return this._tvService.findById({ id, language });
  }

  @Get('popular')
  @ApiOkResponse({ type: TvResponseDto })
  getPopular(@Query('language') language?: string): Promise<TvResponseDto> {
    return this._tvService.findPopular({ language });
  }

  @Get('top-rated')
  @ApiOkResponse({ type: TvResponseDto })
  getTopRated(@Query('language') language?: string): Promise<TvResponseDto> {
    return this._tvService.findTopRated({ language });
  }
}
