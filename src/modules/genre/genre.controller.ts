import { Controller, Get, UseGuards, Param, Query } from '@nestjs/common';
import { GenreService } from './genre.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GenreResponseDto } from './dtos/genre-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { GenreRequestDto } from './dtos/genre-request.dto';

@ApiTags('The Genres')
@Controller('genre')
export class GenreController {
  constructor(private _genreService: GenreService) {}

  @Get('/movies')
  @ApiOperation({ summary: 'Retrieves movies genre' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        genres: {
          type: 'array',
          example: [{ id: 88, name: 'Action' }],
        },
      },
    },
  })
  @UseGuards(AuthGuard('jwt'))
  async getFromMovie(@Query('language') language: GenreRequestDto): Promise<GenreResponseDto> {
    console.log(language)
    return this._genreService.findFromMovies(language);
  }

  @Get('/series')
  @ApiOperation({ summary: 'Retrieves series genre' })
  @ApiResponse({
    status: 200,
    description: 'An array with all the series genre available in our API',
  })
  @UseGuards(AuthGuard('jwt'))
  async getFromSeries(@Query('language') language: GenreRequestDto): Promise<GenreResponseDto> {
    return this._genreService.findFromSeries(language);
  }
}
