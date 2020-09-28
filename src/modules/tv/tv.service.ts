import { Injectable } from '@nestjs/common';
import { TvReadDto } from './dto/tv-read.dto';
import { plainToClass } from 'class-transformer';
import { TvFilterDto } from './dto/tv-filter.dto';
import { UtilService } from 'src/util/util.service';
import { ConfigService } from 'src/config/config.service';
import { ConfigEnum } from 'src/config/config.keys';
import axios from 'axios';
import { TvDetailDto } from './dto/tv-detail.dto';
@Injectable()
export class TvService {
  private TMDB_URL: string;

  constructor(
    private readonly utilService: UtilService,
    private readonly _configService: ConfigService,
  ) {
    this.TMDB_URL = this._configService.get(ConfigEnum.TMDB_URI);
  }

  findTopRated(filter: TvFilterDto) {
    return this.call('tv/top_rated', filter);
  }

  findPopular(filter: TvFilterDto) {
    return this.call('tv/popular', filter);
  }

  async findAll(filter: TvFilterDto) {
    return this.call('discover/tv', filter);
  }

  async findById(filter: TvFilterDto) {
    const queryParams = this.buildQuery(filter);
    const result = await axios.get(
      `${this.TMDB_URL}/tv/${filter.id}?${queryParams}`,
      {
        headers: this.utilService.insertRequestHeaders(),
      },
    );
    console.log('Detail TV', result.data);
    return plainToClass(TvDetailDto, result.data);
  }

  private async call(url: string, filter) {
    const queryParams = this.buildQuery(filter);
    const result = await axios.get(`${this.TMDB_URL}/${url}?${queryParams}`, {
      headers: this.utilService.insertRequestHeaders(),
    });
    return this.transformToDto(result);
  }

  private buildQuery(filter: TvFilterDto): string {
    let query = [];
    query.push(this.queryString('query', filter.query));
    query.push(this.queryList('with_genres', filter.genres));
    query.push(this.queryString('language', filter.language));
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
    const tvList = resultData.results
      .filter(r => r.poster_path)
      .map(tv => plainToClass(TvReadDto, tv));
    return {
      page: resultData.page,
      // eslint-disable-next-line @typescript-eslint/camelcase
      total_results: resultData.total_results,
      // eslint-disable-next-line @typescript-eslint/camelcase
      total_pages: resultData.total_pages,
      results: tvList,
    };
  }
}
