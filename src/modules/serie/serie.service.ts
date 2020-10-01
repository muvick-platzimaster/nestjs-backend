import { Injectable, NotFoundException } from '@nestjs/common';
import { SerieReadDto } from './dto/serie-read.dto';
import { plainToClass } from 'class-transformer';
import { SerieFilterDto } from './dto/serie-filter.dto';
import { UtilService } from 'src/util/util.service';
import { ConfigService } from 'src/config/config.service';
import { ConfigEnum } from 'src/config/config.keys';
import axios from 'axios';
import { SerieDetailDto } from './dto/serie-detail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MyList } from '../my-list/schemas/my-list.schema';
import { Serie } from './schemas/serie.schema';
import { MyListService } from '../my-list/my-list.service';
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

  findPopular(filter: SerieFilterDto) {
    return this.call('tv/popular', filter);
  }

  async findAll(filter: SerieFilterDto) {
    return this.call('discover/tv', filter);
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
      .map(tv => plainToClass(SerieReadDto, tv));
    return {
      page: resultData.page,
      // eslint-disable-next-line @typescript-eslint/camelcase
      total_results: resultData.total_results,
      // eslint-disable-next-line @typescript-eslint/camelcase
      total_pages: resultData.total_pages,
      results: tvList,
    };
  }

  async add(serieId: number, email: any): Promise<boolean> {
    console.log(`Add the serieId: ${serieId} to the ${email} list`);
    const theSerie = await this.getSerie({ id: serieId });
    if (!theSerie) throw new NotFoundException('serie_not_found');
    return this._myListService.add(email, theSerie, false);
  }

  async remove(serieId: number, email: string): Promise<boolean> {
    const theSerie = await this._serieModel.findOne({ id: serieId });
    if (!theSerie) throw new NotFoundException('serie_not_found');
    return this._myListService.remove(email, theSerie, false);
  }

  private async getSerie(filter: SerieFilterDto) {
    try {
      return await this.getFromDB(filter.id);
    } catch (e) {
      console.log('The serie is not in DB. Search in API');
      try {
        const fromAPI = await this.getFromAPI(filter.id);
        if (fromAPI) {
          return this.storeInDB(fromAPI);
        }
        return fromAPI;
      } catch (e) {
        console.error('Serie not found', e.response.data);
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
}
