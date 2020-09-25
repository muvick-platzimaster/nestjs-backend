import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import axios from 'axios';
import { ConfigEnum } from '../../config/config.keys';
import { UtilsService } from '../../utils/utils.service';

@Injectable()
export class CategoriesService {
  private readonly TMDB_URL: string;

  constructor(
    private utilsService: UtilsService,
    private httpService: HttpService, private _configService: ConfigService) {
    this.TMDB_URL = this._configService.get(ConfigEnum.TMDB_URI);
  }

  async listMoviesCategories() {
    const request = await axios.get(`${this.TMDB_URL}/genre/movie/list`, {
      headers: this.utilsService.insertRequestHeaders(),
    });
    return request.data;
  }

  async listSeriesCategories() {
    const request = await axios.get(`${this.TMDB_URL}/genre/tv/list`, {
      headers: this.utilsService.insertRequestHeaders(),
    });
    return request.data;
  }
}
