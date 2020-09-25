import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private _categoriesService: CategoriesService) {
  }

  @Get('/movies')
  @ApiOperation({ summary: 'Retrieves movies categories (genres)' })
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
  @ApiOperation({ summary: 'Retrieves series categories (genres)' })
  @ApiResponse({
    status: 200,
    description: 'An array with all the series categories available in our API',
  })

  async seriesCategories() {
    return this._categoriesService.listSeriesCategories();
  }
}
