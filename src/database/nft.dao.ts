import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import { MetadataProperty } from "../models/metadata.model";
import { CollectionDao } from "./collection.dao";
import { UserDao } from "./user.dao";
import { UserNftDao } from "./userNft.dao";

@Table({ tableName: "nfts", modelName: "Nft" })
export class NftDao extends Model {
  @Column
  idInCollection!: number;

  @Column
  name!: string;

  @Column
  description!: string;

  @Column
  imageUri!: string;

  @Column(DataType.JSON)
  properties?: MetadataProperty[];

  @Column
  rarity!: number;

  @ForeignKey(() => CollectionDao)
  @Column
  collectionId!: number;

  @BelongsTo(() => CollectionDao)
  collection!: CollectionDao;

  @BelongsToMany(() => UserDao, () => UserNftDao)
  users!: UserDao[];
}
