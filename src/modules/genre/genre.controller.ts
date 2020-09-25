import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './genre.service';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('genre')
export class GenreController {
  constructor(private _categoriesService: CategoriesService) {
  }

  @Get('/movies')
  @ApiOperation({ summary: 'Retrieves movies genre (genres)' })
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
    return this._categoriesService.listMoviesCategories();
  }

  @Get('/series')
  @ApiOperation({ summary: 'Retrieves series genre (genres)' })
  @ApiResponse({
    status: 200,
    description: 'An array with all the series genre available in our API',
  })

  async seriesCategories() {
    return this._categoriesService.listSeriesCategories();
  }
}
