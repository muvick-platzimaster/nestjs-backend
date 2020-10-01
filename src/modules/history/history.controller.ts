import { Body, Controller, Post } from '@nestjs/common';
import { HistoryAddDto } from './dtos/history-add.dto';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private _historyService: HistoryService) {
  }
  @Post()
  async add (@Body() contentData: HistoryAddDto): Promise<boolean> {
    return this._historyService.add(contentData)
  }

}
