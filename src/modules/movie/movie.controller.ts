import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { PageResultDto } from 'src/util/page-result.dto';
import { MovieResponseDto } from './dto/movie-response.dto';

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

  @Get('popular')
  @ApiOkResponse({ type: MovieResponseDto })
  getPopular(): Promise<MovieResponseDto> {
    return this._movieService.findPopular();
  }

  @Get('top_rated')
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
