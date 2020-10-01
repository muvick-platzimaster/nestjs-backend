import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { History } from './schema/history.schema';
import { Model } from 'mongoose';
import { HistoryAddDto } from './dtos/history-add.dto';

@Injectable()
export class HistoryService {
  constructor(@InjectModel('history') private historyModel: Model<History>) {
  }

  async add (contentData: HistoryAddDto) {
    const document = { email: contentData.email }
    if (contentData.contentType === 'movie') {

    }

    const record = new this.historyModel()
  }
}
