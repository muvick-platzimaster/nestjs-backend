import { Controller, Get } from '@nestjs/common';
import { GenreService } from './genre.service';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenreResponseDto } from './dtos/genre-response.dto';

@ApiTags('Genres')
@Controller('genre')
export class GenreController {
  constructor(private _genreService: GenreService) {
  }

  @Get('/movies')
  @ApiOperation({ summary: 'Retrieves movies genre' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        genres: {
          type: 'array',
          example: [{id: 88, name: 'Action'}]
        }
      }
    }
  })

  async moviesCategories(): Promise<GenreResponseDto> {
    return this._genreService.findFromMovies();
  }

  @Get('/series')
  @ApiOperation({ summary: 'Retrieves series genre' })
  @ApiResponse({
    status: 200,
    description: 'An array with all the series genre available in our API',
  })

  async seriesCategories(): Promise<GenreResponseDto> {
    return this._genreService.findFromSeries();
  }
}
