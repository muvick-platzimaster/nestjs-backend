import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private _categoriesService: CategoriesService) {
  }

  @Get('/movies')
  async moviesCategories() {
    return await this._categoriesService.list()
  }


  @Get('/series')
  async seriesCategories() {
    return await this._categoriesService.list()
  }

  @Get('/fill')
  fillCategories () {
    return this._categoriesService.getSeriesCategories()
  }
}
