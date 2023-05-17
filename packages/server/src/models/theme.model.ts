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
  @AllowNull(false)
  @Column
  name: string;

  @Index
  @AllowNull(false)
  @Unique
  @Column
  userId: number;
}
