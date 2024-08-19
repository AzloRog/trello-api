import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    userDto: CreateUserDto,
  ): Promise<{ access_token: string } | UnauthorizedException> {
    const user = await this.usersService.findOneByEmail(userDto.email);
    const isPasswordCorrect =
      user && (await bcrypt.compare(userDto.password, user.password));

    if (!user || !isPasswordCorrect) {
      return new UnauthorizedException({
        message: 'Неверный email адрес или пароль',
      });
    }

    const accessToken = this.generateToken(user);
    return accessToken;
  }

  async registration(
    userDto: CreateUserDto,
  ): Promise<{ access_token: string } | HttpException> {
    const candidate = await this.usersService.findOneByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'Пользователь c таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.create({
      email: userDto.email,
      password: hashPassword,
    });

    const accessToken = this.generateToken(user);
    return accessToken;
  }

  private async generateToken(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
