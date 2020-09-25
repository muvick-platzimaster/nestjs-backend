import { Controller, Get } from '@nestjs/common';
import { GenreService } from './genre.service';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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

  async moviesCategories() {
    return this._genreService.listMoviesCategories();
  }

  @Get('/series')
  @ApiOperation({ summary: 'Retrieves series genre' })
  @ApiResponse({
    status: 200,
    description: 'An array with all the series genre available in our API',
  })

  async seriesCategories() {
    return this._genreService.listSeriesCategories();
  }
}
