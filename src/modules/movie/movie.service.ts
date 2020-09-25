import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { ConfigEnum } from 'src/config/config.keys';
import axios from 'axios';
import { MovieFilterDto } from './dto/movie-filter.dto';
import { plainToClass } from 'class-transformer';
import { MovieReadDto } from './dto/movie-read.dto';
import { UtilService } from '../../util/util.service';
import { MovieDetailDto } from './dto/movie-detail.dto';

@Injectable()
export class MovieService {
  private TMDB_URL: string;

  constructor(
    private readonly utilsService: UtilService,
    private readonly _configService: ConfigService,
  ) {
    this.TMDB_URL = this._configService.get(ConfigEnum.TMDB_URI);
  }

  findUpcoming() {
    return this.call('movie/upcoming');
  }

  findTopRated() {
    return this.call('movie/top_rated');
  }

  findPopular() {
    return this.call('movie/popular');
  }

  findRecommendations(id: number) {
    return this.call(`/movie/${id}/recommendations`);
  }

  async findAll(filter: MovieFilterDto) {
    const queryParams = this.buildQuery(filter);
    let URL = `discover/movie?${queryParams}`;
    console.log('La URL que se genera es ', URL);
    return this.call(URL);
  }

  async findById(id: number) {
    const result = await axios.get(`${this.TMDB_URL}/movie/${id}`, {
      headers: this.utilsService.insertRequestHeaders(),
    });
    console.log('Detalle', result.data);
    return plainToClass(MovieDetailDto, result.data);
  }

  private async call(url: string) {
    const result = await axios.get(`${this.TMDB_URL}/${url}`, {
      headers: this.utilsService.insertRequestHeaders(),
    });
    return this.transformToDto(result);
  }

  private buildQuery(filter: MovieFilterDto): string {
    let query = [];
    query.push(this.queryString('query', filter.query));
    query.push(this.queryList('with_genres', filter.genres));
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
      .filter(r => r.poster_path)
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
