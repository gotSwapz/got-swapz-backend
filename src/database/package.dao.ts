import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { CollectionDao } from "./collection.dao";

@Table({ tableName: "packages", modelName: "Package" })
export class PackageDao extends Model {
  @Column
  units!: number;

  @Column
  price!: string;

  @ForeignKey(() => CollectionDao)
  @Column
  collectionId!: number;

  @BelongsTo(() => CollectionDao)
  collection!: CollectionDao;
}
