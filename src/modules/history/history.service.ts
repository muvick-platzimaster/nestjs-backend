import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { History } from './schema/history.schema';
import { Model } from 'mongoose';
import { HistoryAddDto } from './dtos/history-add.dto';
import { Movie } from '../movie/schemas/movie.schema';
import { Serie } from '../serie/schemas/serie.schema';
import { refCount } from 'rxjs/operators';


@Injectable()
export class HistoryService {
  constructor(@InjectModel('history') private historyModel: Model<History>, @InjectModel('movie') private movieModel: Model<Movie>, @InjectModel('serie') private serieModel: Model<Serie>) {
  }

  async add(contentData: HistoryAddDto): Promise<boolean> {
    try {
      const history = await this.historyModel.findOne({ email: contentData.email });
      if (!history) {
        const record = new this.historyModel();
        record.email = contentData.email
        record.movies = []
        record.series = []
        return await this.insertContent(record, contentData.contentType, contentData.contentId)
      }
      return await this.insertContent(history, contentData.contentType, contentData.contentId)

    } catch (err) {
      console.error(err.message);
      console.error(err.stack);
      throw new InternalServerErrorException()
    }
  }

  private async insertContent (record: History, contentType, contentId): Promise<boolean> {
    try {
      if (this.isDuplicated(record, contentType, contentId)) {
        return true
      }

      if (contentType === 'movie') {
        const movie = await this.movieModel.findOne({ _id: contentId });
        record.movies.push(movie);
      } else if (contentType === 'series') {
        const series = await this.serieModel.findOne({ _id: contentId });
        record.series.push(series);
      }
      const saved = await record.save()
      return !!saved
    } catch (err) {
      console.log(err.message)
      console.log(err.stack)
      throw new InternalServerErrorException()
    }
  }

  private isDuplicated (document: History, contentType, contentId): boolean {
    if (contentType === 'movie') {
      return document.movies.includes(contentId)
    }

    if (contentType === 'series') {
      return document.series.includes(contentId)
    }
  }
}
