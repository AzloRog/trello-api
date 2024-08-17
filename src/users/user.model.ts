import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор пользователя',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Почтовый адрес',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({
    example: '123@&$',
    description: 'Пароль пользователя',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    example: '[2, 3, 5]',
    description: 'Массив колонок',
  })
  @Column({ type: DataType.ARRAY(DataType.INTEGER) })
  columns: Array<Number>;
}
