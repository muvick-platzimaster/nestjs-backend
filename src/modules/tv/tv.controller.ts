import { Controller, Get, Query } from '@nestjs/common';
import { TvService } from './tv.service';
import { TvResponseDto } from './dto/tv-response.dto';
import { ApiQuery, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('The series')
@Controller('tvs')
export class TvController {
  constructor(private readonly _tvService: TvService) {}
  @Get()
  @ApiQuery({ name: 'query', required: false })
  @ApiQuery({ name: 'genre', required: false })
  @ApiOkResponse({ type: TvResponseDto })
  getAll(
    @Query('query') query?: string,
    @Query('genre') genre?: number,
  ): Promise<TvResponseDto> {
    return this._tvService.findAll({
      query,
      genres: [genre],
    });
  }

  @Get('popular')
  @ApiOkResponse({ type: TvResponseDto })
  getPopular(): Promise<TvResponseDto> {
    return this._tvService.findPopular();
  }

  @Get('top-rated')
  @ApiOkResponse({ type: TvResponseDto })
  getTopRated(): Promise<TvResponseDto> {
    return this._tvService.findTopRated();
  }
}
