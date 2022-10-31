import {
  Table,
  Column,
  Model,
  HasMany,
  Unique,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { NftDao } from "./nft.dao";
import { PackageDao } from "./package.dao";
import { SwapDao } from "./swap.dao";
import { UserDao } from "./user.dao";

@Table({ tableName: "collections", modelName: "Collection" })
export class CollectionDao extends Model {
  @Unique
  @Column
  address?: string;

  @Unique
  @Column
  name?: string;

  @Column(DataType.STRING(650))
  description?: string;

  @Unique
  @Column
  metadataUri!: string;

  @Unique
  @Column
  nftImagesUri!: string;

  @Column
  numberOfItems!: number;

  @Column
  logoUrl?: string;

  @Column
  bannerUrl?: string;

  @Column
  raritySum?: number;

  @ForeignKey(() => UserDao)
  @Column
  owner?: string;

  @BelongsTo(() => UserDao)
  user?: UserDao;

  @HasMany(() => PackageDao)
  packages!: PackageDao[];

  @HasMany(() => NftDao)
  nfts!: NftDao[];

  @HasMany(() => SwapDao)
  swaps!: SwapDao[];
}
