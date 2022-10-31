import { Table, Column, Model, PrimaryKey } from "sequelize-typescript";

@Table({ tableName: "purchases", modelName: "Purchases" })
export class PurchaseDao extends Model {
  @PrimaryKey
  @Column
  requestId!: string;

  @Column
  buyer!: string;

  @Column
  collectionAddress!: string;

  @Column
  units!: number;

  @Column
  processed!: boolean;
}
