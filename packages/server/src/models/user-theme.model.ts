import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Theme } from './theme.model.js';

@Table({
  timestamps: false,
  tableName: 'user_theme',
})
export class UserTheme extends Model {
  @ForeignKey(() => Theme)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'theme_id',
  })
  themeId: number;

  @Column
  device: string;

  // TODO: добавить ForeignKey -> UserModel
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;
}
