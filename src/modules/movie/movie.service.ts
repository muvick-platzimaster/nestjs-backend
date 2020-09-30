import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { ConfigEnum } from 'src/config/config.keys';
import axios from 'axios';
import { MovieFilterDto } from './dto/movie-filter.dto';
import { plainToClass } from 'class-transformer';
import { MovieReadDto } from './dto/movie-read.dto';
import { UtilService } from '../../util/util.service';
import { MovieDetailDto } from './dto/movie-detail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './schemas/movie.schema';
import { MyList } from '../my-list/schemas/my-list.schema';

@Injectable()
export class MovieService {
  private TMDB_URL: string;

  constructor(
    @InjectModel('movie') private _movieModel: Model<Movie>,
    @InjectModel('list') private _myListModel: Model<MyList>,
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
    const theMovie = await this.getMovie(filter);
    return plainToClass(MovieDetailDto, theMovie);
  }

  async add(movieId: number, email: any): Promise<boolean> {
    console.log(`Add the movieId: ${movieId} to the ${email} list`);
    const theMovie = await this.getMovie({ id: movieId });
    let myList = await this._myListModel.findOne({ email });
    try {
      if (!myList) {
        const myListCreated = new this._myListModel({
          email,
          movies: [theMovie],
        });
        await myListCreated.save();
      } else {
        if (!myList.movies.includes(theMovie._id.toString())) {
          myList.movies.push(theMovie);
          await myList.save();
        }
      }
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

  async remove(movieId: number, email: string): Promise<boolean> {
    const myList = await this._myListModel.findOne({ email });
    if (!myList) throw new NotFoundException('my_list_not_found');
    const theMovie = await this._movieModel.findOne({ id: movieId });
    if (!theMovie) throw new NotFoundException('movie_not_found');
    const newMovies = myList.movies.filter(
      movie => movie != theMovie._id.toString(),
    );
    myList.movies = newMovies;
    try {
      await myList.save();
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
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

  private async getMovie(filter: MovieFilterDto) {
    try {
      return await this.getFromDB(filter.id);
    } catch (e) {
      console.log('The movie is not in DB. Search in API');
      const fromAPI = await this.getFromAPI(filter.id);
      if (fromAPI) {
        return this.storeInDB(fromAPI);
      }
      return fromAPI;
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
}
