import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { CollectionDao } from "./collection.dao";
import { UserDao } from "./user.dao";

@Table({ tableName: "swaps", modelName: "Swap" })
export class SwapDao extends Model {
  @Column(DataType.ARRAY(DataType.INTEGER))
  creatorNfts!: number[];

  @Column(DataType.ARRAY(DataType.INTEGER))
  receiverNfts!: number[];

  @Column
  state!: number;

  @Column
  swapIdInCollection!: number;

  @ForeignKey(() => UserDao)
  @Column
  creator!: string;

  @BelongsTo(() => UserDao)
  swapsAsCreator!: UserDao;

  @ForeignKey(() => UserDao)
  @Column
  receiver!: string;

  @BelongsTo(() => UserDao)
  swapsAsReceiver!: UserDao;

  @ForeignKey(() => CollectionDao)
  @Column
  collectionId!: number;

  @BelongsTo(() => CollectionDao)
  collection!: UserDao;
}
