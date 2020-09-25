import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private _categoriesService: CategoriesService) {
  }

  @Get('/movies')
  async moviesCategories() {
    return this._categoriesService.listMoviesCategories()
  }

  @Get('/series')
  async seriesCategories() {
    return this._categoriesService.listSeriesCategories()
  }
}
