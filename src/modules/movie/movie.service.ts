import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { ConfigEnum } from 'src/config/config.keys';
import axios from 'axios';
import { MovieFilterDto } from './dto/movie-filter.dto';
import { plainToClass } from 'class-transformer';
import { MovieReadDto } from './dto/movie-read.dto';
import { UtilsService } from '../../utils/utils.service';

@Injectable()
export class MovieService {
  TMDB_URL: string;

  constructor(
    private readonly utilsService: UtilsService,
    private readonly _configService: ConfigService) {
    this.TMDB_URL = this._configService.get(ConfigEnum.TMDB_URI);
  }

  async findUpcoming() {
    const result = await axios.get(`${this.TMDB_URL}/movie/upcoming`, {
      headers: this.utilsService.insertRequestHeaders(),
    });
    return this.transformToDto(result);
  }

  async findTopRated() {
    const result = await axios.get(`${this.TMDB_URL}/movie/top_rated`, {
      headers: this.utilsService.insertRequestHeaders(),
    });
    return this.transformToDto(result);
  }

  async findPopular() {
    const result = await axios.get(`${this.TMDB_URL}/movie/popular`, {
      headers: this.utilsService.insertRequestHeaders(),
    });
    return this.transformToDto(result);
  }

  async findAll(filter: MovieFilterDto) {
    const queryParams = this.buildQuery(filter);
    let URL = `${this.TMDB_URL}/discover/movie`;
    URL = `${URL}?${queryParams}`;
    console.log('La URL que se genera es ', URL);
    const result = await axios.get(`${URL}`, {
      headers: this.utilsService.insertRequestHeaders(),
    });
    return this.transformToDto(result);
  }

  private buildQuery(filter: MovieFilterDto): string {
    let query = [];
    query.push(this.queryString('query', filter.query));
    query.push(this.queryList('with_genres', filter.genres));
    let URL = `${this.TMDB_URL}/discover/movie`;
    return query.filter(Boolean).join('&');
  }

  private queryString(key: string, value: string) {
    if (value) {
      return `${key}=${value}`;
    }
    return;
  }

  private queryList(key: string, value: any[]) {
    if (value && value.length > 0) {
      return `${key}=${value.join(',')}`;
    }
    return;
  }

  private transformToDto(result) {
    const resultData = result.data;
    const movieList = resultData.results
      .filter(r => r.backdrop_path)
      .map(movie => plainToClass(MovieReadDto, movie));
    return {
      page: resultData.page,
      // eslint-disable-next-line @typescript-eslint/camelcase
      total_results: resultData.total_results,
      // eslint-disable-next-line @typescript-eslint/camelcase
      total_pages: resultData.total_pages,
      results: movieList,
    };
  }
}
