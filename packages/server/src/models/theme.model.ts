import {
  Table,
  Model,
  Column,
  AllowNull,
  Unique,
  Index,
} from 'sequelize-typescript';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'theme',
})
export class Theme extends Model {
  @Index
  @AllowNull(false)
  @Unique
  @Column
  name: string;

  @AllowNull(false)
  @Unique
  @Column
  colors: string;
}
