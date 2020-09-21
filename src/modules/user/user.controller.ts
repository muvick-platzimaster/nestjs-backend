import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dtos/user-create.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('The users')
@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this._userService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() newUser: UserCreateDto) {
    return this._userService.create(newUser);
  }
}
