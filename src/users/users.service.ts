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

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { email } });
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(dto);
    return user;
  }
}
