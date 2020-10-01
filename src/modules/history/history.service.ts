import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { History } from './schema/history.schema';
import { Model, Schema } from 'mongoose';
import { HistoryAddDto } from './dtos/history-add.dto';

@Injectable()
export class HistoryService {
  constructor(@InjectModel('history') private historyModel: Model<History>) {
  }

  async add(contentData: HistoryAddDto) {
    try {
      const history = await this.historyModel.findOne({ email: contentData.email})
      if (!history) {
        const record = new this.historyModel();
        record.email = contentData.email
        if (contentData.contentType === 'movie') {
          record.movies.push(contentData.contentId)
        } else if (contentData.contentType === 'series') {
          record.series.push(contentData.contentId)
        }

        const saved = await record.save()
        return !!saved;

      }
    } catch (err) {

    }
  }
}
