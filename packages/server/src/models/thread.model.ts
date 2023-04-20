import {
  Table,
  Model,
  Column,
  AllowNull,
  Unique,
  Index,
  DataType,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'thread',
})
export class Thread extends Model {
  // default id (primary key) will be inherited from base class Model
  // default createdAt
  // default deletedAt
  // default updatedAt

  @Index
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(120))
  title: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  createdBy: number;
}
