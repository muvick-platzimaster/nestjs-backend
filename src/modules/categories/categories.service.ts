import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  private url: string = 'https://api.themoviedb.com';

  constructor(@InjectModel('category') private categoryModel: Model<Category>, private httpService: HttpService) {
  }

  async list(): Promise<Category[]> {
    return this.categoryModel.find({});
  }
}
