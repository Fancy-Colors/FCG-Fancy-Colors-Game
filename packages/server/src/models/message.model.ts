import { Thread } from './thread.model.js';
import {
  Table,
  Model,
  Column,
  AllowNull,
  Index,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'message',
})
export class Message extends Model {
  @Index
  @AllowNull(false)
  @Column(DataType.STRING(1000))
  text: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  createdBy: number;

  @AllowNull(true)
  @Column({
    type: DataType.INTEGER,
  })
  repliedTo: number;

  @AllowNull(false)
  @ForeignKey(() => Thread)
  @Column
  threadId: number;

  @BelongsTo(() => Thread, 'threadId')
  thread: Thread;
}
