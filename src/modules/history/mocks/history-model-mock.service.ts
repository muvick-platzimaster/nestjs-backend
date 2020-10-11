import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryModelMock {
  static findOne() {}
  static save() {}

  async save() {
    return true
  }
}
