import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'Почтовый адрес' })
  readonly email: string;

  @ApiProperty({ example: 'qwer@*&$', description: 'Пароль' })
  readonly password: string;
}
