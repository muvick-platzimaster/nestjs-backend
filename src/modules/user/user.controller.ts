import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dtos/user-create.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('The users')
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
