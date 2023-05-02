import {
  Table,
  Model,
  Column,
  AllowNull,
  Index,
  DataType,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'thread',
})
export class Thread extends Model {
  @Index
  @AllowNull(false)
  @Column(DataType.STRING(120))
  title: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  createdBy: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  firstMessage: string;
}
