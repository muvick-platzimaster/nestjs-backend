import { Injectable } from '@nestjs/common';
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
    try {
      const history = await this.historyModel.findOne({ email: contentData.email });
      if (!history) {
        const record = new this.historyModel();
        record.email = contentData.email
        record.movies = []
        record.series = []

        if (contentData.contentType === 'movie') {
          const movie = await this.movieModel.findOne({ _id: contentData.contentId });
          record.movies.push(movie);
        } else if (contentData.contentType === 'series') {
          const series = await this.serieModel.findOne({ _id: contentData.contentId });
          record.series.push(series);
        }
        console.log(record)

        const saved = await record.save();
        return !!saved;
      }

      console.log(history)
      if (contentData.contentType === 'movie') {
        const movie = await this.movieModel.findOne({ _id: contentData.contentId });
        history.movies.push(movie);
      } else if (contentData.contentType === 'series') {
        const series = await this.serieModel.findOne({ _id: contentData.contentId });
        history.series.push(series);
      }
      await history.save()

    } catch (err) {
      console.error(err.message);
      console.error(err.stack);
    }
  }

  async insertContent (contentType, contentId) {
    if (contentType === 'movie') {
      const movie = await this.movieModel.findOne({ _id: contentId });
      history.movies.push(movie);
    } else if (contentType === 'series') {
      const series = await this.serieModel.findOne({ _id: contentId });
      history.series.push(series);
    }
  }
}
