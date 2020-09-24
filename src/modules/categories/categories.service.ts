import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoriesService {
  private url  = 'https://api.themoviedb.com/3/genre';

  constructor(@InjectModel('category') private categoryModel: Model<Category>, private httpService: HttpService, private _configService: ConfigService) {
  }

  async list(): Promise<Category[]> {
    return this.categoryModel.find({});
  }

  async getSeriesCategories () {
    try {
      const categories = this.httpService.get(`${this.url}/tv/list`, {
        headers: { 'Authorization': `Bearer ${this._configService.get('API_KEY_V4_AUTH')}`}
      }).pipe(map(response => console.log(response.data)))
    } catch (err) {
      console.error(err)
    }
  }
}
