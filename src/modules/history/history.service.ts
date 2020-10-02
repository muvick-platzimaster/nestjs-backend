import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { History } from './schema/history.schema';
import { Model } from 'mongoose';
import { HistoryAddDto } from './dtos/history-add.dto';
import { Movie } from '../movie/schemas/movie.schema';
import { Serie } from '../serie/schemas/serie.schema';


@Injectable()
export class HistoryService {
  constructor(@InjectModel('history') private historyModel: Model<History>, @InjectModel('movie') private movieModel: Model<Movie>, @InjectModel('serie') private serieModel: Model<Serie>) {
  }

  async add(contentData: HistoryAddDto): Promise<boolean> {
    const history = await this.historyModel.findOne({ email: contentData.email });
    if (!history) {
      const record = new this.historyModel();
      record.email = contentData.email;
      record.movies = [];
      record.series = [];
      return await this.insertContent(record, contentData.contentType, contentData.contentId);
    }
    return await this.insertContent(history, contentData.contentType, contentData.contentId);

  }

  private async insertContent(record: History, contentType, contentId): Promise<boolean> {
    if (this.isDuplicated(record, contentType, contentId)) {
      return true;
    }
    return await this.addContentToHistory(record, contentType, contentId);
  }

  private isDuplicated(document: History, contentType, contentId): boolean {
    if (contentType === 'movie') {
      return document.movies.includes(contentId);
    }

    if (contentType === 'series') {
      return document.series.includes(contentId);
    }

    throw new BadRequestException('contentType_not_allowed');
  }

  private async addContentToHistory(record: History, contentType, contentId): Promise<boolean> {
    if (!record || !contentId) {
      throw new InternalServerErrorException();
    }

    if (contentType === 'movie') {
      const movie = await this.movieModel.findOne({ _id: contentId });
      if (!movie) {
        throw new BadRequestException('invalid_id');
      }
      record.movies.push(movie);
      const saved = await record.save();
      return !!saved;
    } else if (contentType === 'series') {
      const series = await this.serieModel.findOne({ _id: contentId });
      if (!series) {
        throw new BadRequestException('invalid_id');
      }
      record.series.push(series);
      const saved = await record.save();
      return !!saved;
    } else {
      throw new InternalServerErrorException('contentType_not_allowed');
    }

  }
}
