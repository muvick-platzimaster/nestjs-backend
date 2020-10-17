import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { ConfigEnum } from '../../config/config.keys';
import axios from 'axios';
import { MovieFilterDto } from './dtos/movie-filter.dto';
import { plainToClass } from 'class-transformer';
import { MovieDto } from './dtos/movie.dto';
import { UtilService } from '../../util/util.service';
import { MovieDetailDto } from './dtos/movie-detail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './schemas/movie.schema';
import { MyListService } from '../my-list/my-list.service';
import { MovieWatchDto } from './dtos/movie-watch.dto';
import { MovieResponseDto } from './dtos/movie-response.dto';
import { queryBuildILike, queryBuildIn } from '../../util/query.build.util';
import { MyListDto } from '../my-list/dtos/my-list.dto';
import { TranslateService } from '../translate/translate.service';
import { TranslationResult } from 'ibm-watson/language-translator/v3';
import * as cacheManager from 'cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');

@Injectable()
export class MovieService {
  private TMDB_URL: string;
  private redisCache;
  private redisClient;

  constructor(
    @InjectModel('movie') private _movieModel: Model<Movie>,
    private readonly _translationService: TranslateService,
    private readonly _myListService: MyListService,
    private readonly utilService: UtilService,
    private readonly _configService: ConfigService,
  ) {
    this.TMDB_URL = this._configService.get(ConfigEnum.TMDB_URI);
    this.redisCache = cacheManager.caching({
      store: redisStore,
      ttl: 86400,
      host: this._configService.get(ConfigEnum.REDIS_ENDPOINT),
      port: this._configService.get(ConfigEnum.REDIS_PORT),
      // eslint-disable-next-line @typescript-eslint/camelcase
      auth_pass: this._configService.get(ConfigEnum.REDIS_PASSWORD),
    });
    this.redisClient = this.redisCache.store.getClient();
  }

  findUpcoming(filter?: MovieFilterDto) {
    return this.call('movie/upcoming', filter);
  }

  findTopRated(filter?: MovieFilterDto) {
    return this.call('movie/top_rated', filter);
  }

  async findPopular(language: string) {
    const theMovies = await this._movieModel
      .find()
      .sort({ popularity: -1 })
      .limit(50)
      .exec();
    const response = new MovieResponseDto();
    if (language === 'es') {
      const key = await this.redisCache.get('movies:spanish:popular');
      if (!key) {
        for (const movie of theMovies) {
          const translationResponse: LanguageTranslatorV3.Response<TranslationResult> = await this._translationService.translate(
            movie.overview,
          );
          if (translationResponse) {
            movie.overview =
              translationResponse.result.translations[0].translation;
          }
        }
        await this.redisCache.set('movies:spanish:popular', theMovies, {
          ttl: 86400,
        });

        response.results = theMovies.map(movie =>
          plainToClass(MovieDto, movie),
        );
      } else {
        response.results = key.map(movie => plainToClass(MovieDto, movie));
      }
    } else {
      response.results = theMovies.map(movie => plainToClass(MovieDto, movie));
    }
    return response;
  }

  findRecommendations(filter?: MovieFilterDto) {
    return this.call(`/movie/${filter.id}/recommendations`, filter);
  }

  async findAll(filter: MovieFilterDto): Promise<MovieResponseDto> {
    const theMovies = await this._movieModel
      .find({
        ...queryBuildILike('title', filter.query),
        ...queryBuildIn('genres.id', filter.genres),
      })
      .limit(50)
      .exec();

    const response = new MovieResponseDto();

    if (filter.language === 'es') {
      const key = await this.redisCache.get('movies:spanish:all');
      if (!key) {
        for (const movie of theMovies) {
          const translationResponse: LanguageTranslatorV3.Response<TranslationResult> = await this._translationService.translate(
            movie.overview,
          );
          if (translationResponse) {
            movie.overview =
              translationResponse.result.translations[0].translation;
          }
        }
        await this.redisCache.set('movies:spanish:all', theMovies, {
          ttl: 86400,
        });

        response.results = theMovies.map(m => plainToClass(MovieDto, m));
      } else {
        response.results = key.map(movie => plainToClass(MovieDto, movie));
      }
    } else {
      response.results = theMovies.map(m => plainToClass(MovieDto, m));
    }

    return response;
  }

  async findById(filter: MovieFilterDto) {
    const theMovie = await this.getMovie(filter);
    return plainToClass(MovieDetailDto, theMovie);
  }

  async add(movieId: number, email: any): Promise<MyListDto> {
    console.log(`Add the movieId: ${movieId} to the ${email} list`);
    const theMovie = await this.getMovie({ id: movieId });
    if (!theMovie) throw new NotFoundException('movie_not_found');
    return this._myListService.add(email, theMovie, true);
  }

  async remove(movieId: number, email: string): Promise<MyListDto> {
    const theMovie = await this._movieModel.findOne({ id: movieId });
    if (!theMovie) throw new NotFoundException('movie_not_found');
    return this._myListService.remove(email, theMovie, true);
  }

  /**
   * Call method performs a request to TMDB
   * */
  private async call(url: string, filter) {
    const queryParams = this.buildQuery(filter);
    const result = await axios.get(`${this.TMDB_URL}/${url}?${queryParams}`, {
      headers: this.utilService.insertRequestHeaders(),
    });
    return this.transformToDto(result);
  }

  private buildQuery(filter: MovieFilterDto): string {
    const query = [];
    if (filter) {
      query.push(this.queryString('query', filter.query)); // title
      query.push(this.queryList('with_genres', filter.genres)); // genre
      query.push(this.queryString('language', filter.language));
      query.push(this.queryString('page', !filter.page ? 1 : filter.page));
    }
    console.log(query);
    return query.filter(Boolean).join('&');
  }

  private queryString(key: string, value: any) {
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
      .map(movie => plainToClass(MovieDto, movie));
    return {
      page: resultData.page,
      // eslint-disable-next-line @typescript-eslint/camelcase
      total_results: resultData.total_results,
      // eslint-disable-next-line @typescript-eslint/camelcase
      total_pages: resultData.total_pages,
      results: movieList,
    };
  }

  private async getMovie(filter: MovieFilterDto) {
    try {
      return await this.getFromDB(filter.id);
    } catch (e) {
      console.log(`The movie ${filter.id} is not in DB. Search in API`);
      try {
        const fromAPI = await this.getFromAPI(filter.id);
        if (fromAPI) {
          if (fromAPI.poster_path && fromAPI.poster_path != null)
            return this.storeInDB(fromAPI);
        }
        return fromAPI;
      } catch (e) {
        console.error(`Movie ${filter.id} not found`, e.response.data);
        return;
      }
    }
  }

  private async getFromDB(movieId: number) {
    const theMovieInDB = await this._movieModel.findOne({ id: movieId });
    if (!theMovieInDB) throw new NotFoundException();
    return theMovieInDB;
  }

  private async getFromAPI(movieId) {
    const queryParams = this.buildQuery({ id: movieId });
    const result = await axios.get(
      `${this.TMDB_URL}/movie/${movieId}?${queryParams}`,
      {
        headers: this.utilService.insertRequestHeaders(),
      },
    );

    return result.data;
  }

  private async storeInDB(theMovie: MovieDetailDto) {
    const toSave = plainToClass(MovieDetailDto, theMovie);
    const theMovieCreated = new this._movieModel(toSave);
    await theMovieCreated.save();
    return theMovieCreated;
  }

  async watch(movie: number): Promise<MovieWatchDto> {
    const url = `${this.TMDB_URL}/movie/${movie}/videos`;

    const request = await axios.get(url, {
      headers: this.utilService.insertRequestHeaders(),
    });

    const data = request.data.results[0];
    if (data.site === 'YouTube') {
      return plainToClass(MovieWatchDto, {
        id: movie,
        url: `https://www.youtube.com/embed/${data.key}`,
      });
    }
    throw new InternalServerErrorException('video_not_found');
  }

  async populate() {
    let page = 0;
    let theList;
    do {
      theList = await this.call('discover/movie', { page: ++page });
      if (theList.results.length > 0) {
        theList.results.forEach(movie => {
          this.getMovie({ id: movie.id });
        });
      }
    } while (theList.total_pages > page);
    // const start = 100000;
    // const end = 200000;
    // for (let i = start; i < end; ++i) {
    //   this.getMovie({ id: i });
    // }
  }
}
