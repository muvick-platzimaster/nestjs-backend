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
    private readonly utilService: UtilService,
    private readonly _configService: ConfigService,
  ) {
    this.TMDB_URL = this._configService.get(ConfigEnum.TMDB_URI);
  }

  findUpcoming(filter?: MovieFilterDto) {
    return this.call('movie/upcoming', filter);
  }

  findTopRated(filter?: MovieFilterDto) {
    return this.call('movie/top_rated', filter);
  }

  findPopular(filter?: MovieFilterDto) {
    return this.call('movie/popular', filter);
  }

  findRecommendations(filter?: MovieFilterDto) {
    return this.call(`/movie/${filter.id}/recommendations`, filter);
  }

  async findAll(filter: MovieFilterDto) {
    return this.call('discover/movie', filter);
  }

  async findById(filter: MovieFilterDto) {
    const queryParams = this.buildQuery(filter);
    const result = await axios.get(
      `${this.TMDB_URL}/movie/${filter.id}?${queryParams}`,
      {
        headers: this.utilService.insertRequestHeaders(),
      },
    );
    console.log('Detail Movie', result.data);
    return plainToClass(MovieDetailDto, result.data);
  }

  private async call(url: string, filter) {
    const queryParams = this.buildQuery(filter);
    const result = await axios.get(`${this.TMDB_URL}/${url}?${queryParams}`, {
      headers: this.utilService.insertRequestHeaders(),
    });
    return this.transformToDto(result);
  }

  private buildQuery(filter: MovieFilterDto): string {
    let query = [];
    if (filter) {
      query.push(this.queryString('query', filter.query));
      query.push(this.queryList('with_genres', filter.genres));
      query.push(this.queryString('language', filter.language));
    }
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
