import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UserCreateDto } from './dtos/user-create.dto';
import { plainToClass } from 'class-transformer';
import { UserReadDto } from './dtos/user-read.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private userModel: Model<User>) {}

  async findAll(): Promise<UserReadDto[]> {
    const users = await this.userModel.find();
    return users.map(u => plainToClass(UserReadDto, u));
  }

  findById(userId: string): Promise<User> {
    return this.userModel.findById(userId);
  }

  create(userCreateDto: UserCreateDto): Promise<User> {
    const userCreated = new this.userModel(userCreateDto);
    return userCreated.save();
  }
}
