import { Body, Controller, Post } from '@nestjs/common';
import { HistoryAddDto } from './dtos/history-add.dto';

@Controller('history')
export class HistoryController {
  @Post()
  add (@Body() contentData: HistoryAddDto) {

  }

}
