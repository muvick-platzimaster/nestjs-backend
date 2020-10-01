import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { MyListService } from './my-list.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('my-lists')
export class MyListController {
  constructor(private readonly _myListService: MyListService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req) {
    return this._myListService.findAll(req.user.email);
  }
}
