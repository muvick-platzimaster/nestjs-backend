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
  @ApiOkResponse({ type: MovieResponseDto })
  getAll(
    @Query('query') query?: string,
    @Query('genre') genre?: number,
  ): Promise<MovieResponseDto> {
    return this._movieService.findAll({
      query,
      genres: [genre],
    });
  }

  @Get(':id/detail')
  @ApiOkResponse({ type: MovieDetailDto })
  getById(@Param('id') id: number) {
    console.log('Buscar una pelicula', id);
    return this._movieService.findById(id);
  }

  @Get(':id/recommendations')
  @ApiOkResponse({ type: MovieResponseDto })
  getRecommendations(@Param('id') id: number) {
    console.log('Buscar una pelicula', id);
    return this._movieService.findRecommendations(id);
  }

  @Get('popular')
  @ApiOkResponse({ type: MovieResponseDto })
  getPopular(): Promise<MovieResponseDto> {
    return this._movieService.findPopular();
  }

  @Get('top-rated')
  @ApiOkResponse({ type: MovieResponseDto })
  getTopRated(): Promise<MovieResponseDto> {
    return this._movieService.findTopRated();
  }

  @Get('upcoming')
  @ApiOkResponse({ type: MovieResponseDto })
  getUpcoming(): Promise<MovieResponseDto> {
    return this._movieService.findUpcoming();
  }
}
