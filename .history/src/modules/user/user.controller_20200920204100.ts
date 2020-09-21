import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dtos/user-create.dto';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  findAll() {
    return this._userService.findAll();
  }

  @Post()
  create(@Body() newUser: UserCreateDto) {
    return this._userService.create(newUser);
  }
}
