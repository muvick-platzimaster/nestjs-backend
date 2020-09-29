import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { MovieResponseDto } from './dto/movie-response.dto';
import { MovieDetailDto } from './dto/movie-detail.dto';

@ApiTags('The movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly _movieService: MovieService) {}
  @Get()
  @ApiQuery({ name: 'query', required: false })
  @ApiQuery({ name: 'genre', required: false })
  @ApiQuery({ name: 'language', required: false })
  @ApiOkResponse({ type: MovieResponseDto })
  getAll(
    @Query('query') query?: string,
    @Query('genre') genre?: number,
    @Query('language') language?: string,
  ): Promise<MovieResponseDto> {
    return this._movieService.findAll({
      query,
      genres: [genre],
      language,
    });
  }

  @Get(':id/detail')
  @ApiQuery({ name: 'language', required: false })
  @ApiOkResponse({ type: MovieDetailDto })
  getById(@Param('id') id: number, @Query('language') language?: string) {
    console.log('Buscar una pelicula', id);
    return this._movieService.findById({ id, language });
  }

  @Get(':id/recommendations')
  @ApiQuery({ name: 'language', required: false })
  @ApiOkResponse({ type: MovieResponseDto })
  getRecommendations(
    @Param('id') id: number,
    @Query('language') language?: string,
  ) {
    console.log('Buscar una pelicula', id);
    return this._movieService.findRecommendations({ id, language });
  }

  @Get('popular')
  @ApiQuery({ name: 'language', required: false })
  @ApiOkResponse({ type: MovieResponseDto })
  getPopular(@Query('language') language?: string): Promise<MovieResponseDto> {
    return this._movieService.findPopular({ language });
  }

  @Get('top-rated')
  @ApiQuery({ name: 'language', required: false })
  @ApiOkResponse({ type: MovieResponseDto })
  getTopRated(@Query('language') language?: string): Promise<MovieResponseDto> {
    return this._movieService.findTopRated({ language });
  }

  @Get('upcoming')
  @ApiQuery({ name: 'language', required: false })
  @ApiOkResponse({ type: MovieResponseDto })
  getUpcoming(@Query('language') language?: string): Promise<MovieResponseDto> {
    return this._movieService.findUpcoming({ language });
  }
}
