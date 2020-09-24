import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class CategoriesService {
  constructor(private httpService: HttpService, private _configService: ConfigService) {
  }

  listMoviesCategories () {
    // TODO implement request to TMDB to retrieve movies categories
  }

  listSeriesCategories () {
    // TODO implement request to TMDB to retrieve series categories
  }
}
