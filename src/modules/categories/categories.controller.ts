import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private _categoriesService: CategoriesService) {
  }

  @Get()
  async listCategories() {
    return await this._categoriesService.list()
  }
}
