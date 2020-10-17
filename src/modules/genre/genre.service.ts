import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import axios from 'axios';
import { ConfigEnum } from '../../config/config.keys';
import { UtilService } from '../../util/util.service';
import { plainToClass } from 'class-transformer';
import { GenreDto } from './dtos/genre.dto';
import { GenreRequestDto } from './dtos/genre-request.dto';

@Injectable()
export class GenreService {
  private readonly TMDB_URL: string;

  constructor(
    private _utilsService: UtilService,
    private _configService: ConfigService,
  ) {
    this.TMDB_URL = this._configService.get(ConfigEnum.TMDB_URI);
  }

  async findFromMovies(language: GenreRequestDto) {
    let url = `${this.TMDB_URL}/genre/movie/list`

    if (language) {
      url += `?language=${language}`;
    }
    const request = await axios.get(url, {
      headers: this._utilsService.insertRequestHeaders(),
    });
    return this.transformToDTO(request.data);
  }

  async findFromSeries(language: GenreRequestDto) {
    let url = `${this.TMDB_URL}/genre/tv/list`
    if (language) {
      url += `?language=${language}`;
    }
    const request = await axios.get(url, {
      headers: this._utilsService.insertRequestHeaders(),
    });

    return this.transformToDTO(request.data);
  }

  private transformToDTO({ genres }) {
    const genreList = genres.map(genre => plainToClass(GenreDto, genre));

    return {
      results: genreList,
    };
  }
}
