import {
  Table,
  Column,
  Model,
  Unique,
  HasMany,
  BelongsToMany,
  PrimaryKey,
  IsEmail,
} from "sequelize-typescript";
import { CollectionDao } from "./collection.dao";
import { NftDao } from "./nft.dao";
import { SwapDao } from "./swap.dao";
import { UserNftDao } from "./userNft.dao";

@Table({ tableName: "users", modelName: "User" })
export class UserDao extends Model {
  @PrimaryKey
  @Column
  address!: string;

  @Unique
  @Column
  name?: string;

  @Column
  bio?: string;

  @Column
  nonce!: number;

  @Column
  avatarUrl?: string;

  @Column
  bannerUrl?: string;

  @IsEmail
  @Column
  email?: string;

  @Column
  receiveNotifications?: boolean;

  @HasMany(() => CollectionDao)
  collections!: CollectionDao[];

  @HasMany(() => SwapDao, "creator")
  swapsAsCreator!: SwapDao[];

  @HasMany(() => SwapDao, "receiver")
  swapsAsReceiver!: SwapDao[];

  @BelongsToMany(() => NftDao, () => UserNftDao)
  nfts!: NftDao[];
}
