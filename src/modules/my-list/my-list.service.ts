import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MyList } from './schemas/my-list.schema';

@Injectable()
export class MyListService {
  constructor(@InjectModel('list') private _myListModel: Model<MyList>) {}

  async findAll(email: string) {
    const theList = await this._myListModel.findOne({ email });
    return theList.populate('movies').execPopulate();
    return theList;
  }
}
