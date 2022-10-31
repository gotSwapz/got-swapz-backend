import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import { NftDao } from "./nft.dao";
import { UserDao } from "./user.dao";

@Table({ tableName: "users_nfts", modelName: "UserNft" })
export class UserNftDao extends Model {
  @ForeignKey(() => UserDao)
  @Column
  userAddress!: string;

  @ForeignKey(() => NftDao)
  @Column
  nftId!: number;

  @Column
  copies!: number;
}
