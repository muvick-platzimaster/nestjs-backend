import { Body, Controller, Post } from '@nestjs/common';
import { HistoryAddDto } from './dtos/history-add.dto';
import { HistoryService } from './history.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('History')
@Controller('history')
export class HistoryController {
  constructor(private _historyService: HistoryService) {}

  @ApiCreatedResponse({
    description:
      'It returns a boolean if the content is added to the user' + ' history',
  })
  @Post()
  async add(@Body() contentData: HistoryAddDto): Promise<boolean> {
    return this._historyService.add(contentData);
  }
}
