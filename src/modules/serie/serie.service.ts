import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SerieDto } from './dtos/serie.dto';
import { plainToClass } from 'class-transformer';
import { SerieFilterDto } from './dtos/serie-filter.dto';
import { UtilService } from 'src/util/util.service';
import { ConfigService } from 'src/config/config.service';
import { ConfigEnum } from 'src/config/config.keys';
import axios from 'axios';
import { SerieDetailDto } from './dtos/serie-detail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Serie } from './schemas/serie.schema';
import { MyListService } from '../my-list/my-list.service';
import { SerieWatchDto } from './dtos/serie-watch.dto';
import { queryBuildILike, queryBuildIn } from 'src/util/query.build.util';
import { SerieResponseDto } from './dtos/serie-response.dto';
import { MyListDto } from '../my-list/dtos/my-list.dto';

@Injectable()
export class SerieService {
  private TMDB_URL: string;

  constructor(
    @InjectModel('serie') private _serieModel: Model<Serie>,
    private readonly _myListService: MyListService,
    private readonly _utilService: UtilService,
    private readonly _configService: ConfigService,
  ) {
    this.TMDB_URL = this._configService.get(ConfigEnum.TMDB_URI);
  }

  findTopRated(filter: SerieFilterDto) {
    return this.call('tv/top_rated', filter);
  }

  async findPopular() {
    const theMovies = await this._serieModel
      .find()
      .sort({ popularity: -1 })
      .limit(50)
      .exec();
    const response = new SerieResponseDto();
    response.results = theMovies.map(m => plainToClass(SerieDto, m));
    return response;
  }

  async findAll(filter: SerieFilterDto) {
    const theSeries = await this._serieModel
      .find({
        ...queryBuildILike('name', filter.query),
        ...queryBuildIn('genres.id', filter.genres),
      })
      .limit(50)
      .exec();
    const response = new SerieResponseDto();
    response.results = theSeries.map(m => plainToClass(SerieDto, m));
    return response;
  }

  async findById(filter: SerieFilterDto) {
    const queryParams = this.buildQuery(filter);
    const result = await axios.get(
      `${this.TMDB_URL}/tv/${filter.id}?${queryParams}`,
      {
        headers: this._utilService.insertRequestHeaders(),
      },
    );
    console.log('Detail TV', result.data);
    return plainToClass(SerieDetailDto, result.data);
  }

  private async call(url: string, filter) {
    const queryParams = this.buildQuery(filter);
    const result = await axios.get(`${this.TMDB_URL}/${url}?${queryParams}`, {
      headers: this._utilService.insertRequestHeaders(),
    });
    return this.transformToDto(result);
  }

  private buildQuery(filter: SerieFilterDto): string {
    const query = [];
    query.push(this.queryString('query', filter.query));
    query.push(this.queryList('with_genres', filter.genres));
    query.push(this.queryString('language', filter.language));
    query.push(this.queryString('page', !filter.page ? 1 : filter.page));
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
    const tvList = resultData.results
      .filter(r => r.poster_path)
      .map(tv => plainToClass(SerieDto, tv));
    return {
      page: resultData.page,
      // eslint-disable-next-line @typescript-eslint/camelcase
      total_results: resultData.total_results,
      // eslint-disable-next-line @typescript-eslint/camelcase
      total_pages: resultData.total_pages,
      results: tvList,
    };
  }

  async add(serieId: number, email: any): Promise<MyListDto> {
    console.log(`Add the serieId: ${serieId} to the ${email} list`);
    const theSerie = await this.getSerie({ id: serieId });
    if (!theSerie) throw new NotFoundException('serie_not_found');
    return this._myListService.add(email, theSerie, false);
  }

  async remove(serieId: number, email: string): Promise<MyListDto> {
    const theSerie = await this._serieModel.findOne({ id: serieId });
    if (!theSerie) throw new NotFoundException('serie_not_found');
    return this._myListService.remove(email, theSerie, false);
  }

  private async getSerie(filter: SerieFilterDto) {
    try {
      return await this.getFromDB(filter.id);
    } catch (e) {
      console.log(`The serie ${filter.id} is not in DB. Search in API`);
      try {
        const fromAPI = await this.getFromAPI(filter.id);
        if (fromAPI) {
          if (fromAPI.poster_path && fromAPI.poster_path != null)
            return this.storeInDB(fromAPI);
        }
        return fromAPI;
      } catch (e) {
        console.error(`Serie ${filter.id} not found`, e.response.data);
        return;
      }
    }
  }

  private async getFromDB(serieId: number) {
    const theSerieInDB = await this._serieModel.findOne({ id: serieId });
    if (!theSerieInDB) throw new NotFoundException();
    return theSerieInDB;
  }

  private async getFromAPI(serieId) {
    const queryParams = this.buildQuery({ id: serieId });
    const result = await axios.get(
      `${this.TMDB_URL}/tv/${serieId}?${queryParams}`,
      {
        headers: this._utilService.insertRequestHeaders(),
      },
    );

    return result.data;
  }

  private async storeInDB(theSerie: SerieDetailDto) {
    const toSave = plainToClass(SerieDetailDto, theSerie);
    const theSerieCreated = new this._serieModel(toSave);
    await theSerieCreated.save();
    return theSerieCreated;
  }

  async watch(serie: number) {
    const url = `${this.TMDB_URL}/tv/${serie}/videos`;

    const request = await axios.get(url, {
      headers: this._utilService.insertRequestHeaders(),
    });

    const data = request.data.results[0];
    if (data.site === 'YouTube') {
      return plainToClass(SerieWatchDto, {
        id: serie,
        url: `https://www.youtube.com/embed/${data.key}`,
      });
    }

    throw new InternalServerErrorException('video_not_found');
  }

  async populate() {
    let page = 0;
    let theList;
    do {
      theList = await this.call('discover/tv', {
        page: ++page,
      });
      if (theList.results.length > 0) {
        theList.results.forEach(serie => {
          this.getSerie({ id: serie.id });
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
