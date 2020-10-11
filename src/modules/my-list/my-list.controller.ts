import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MyListService } from './my-list.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MyListDto } from './dtos/my-list.dto';

@ApiTags('My list of movies and series')
@Controller('my-lists')
export class MyListController {
  constructor(private readonly _myListService: MyListService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieves my movies and series' })
  @ApiOkResponse({
    type: MyListDto,
    description: 'An object with my series and movies',
  })
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req) {
    return this._myListService.findAll(req.user.email);
  }
}
