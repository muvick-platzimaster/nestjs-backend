import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryModelMock {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  static findOne() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  static save() {}

  async save() {
    return true;
  }
}
