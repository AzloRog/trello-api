import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async getAll(): Promise<User[]> {
    const users = await this.userModel.findAll();
    return users;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(dto);
    return user;
  }
}
