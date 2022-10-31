import { Sequelize } from "sequelize-typescript";
import { CollectionDao } from "./collection.dao";
import { PackageDao } from "./package.dao";
import { UserDao } from "./user.dao";
import dotenv from "dotenv";
import { NftDao } from "./nft.dao";
import { UserNftDao } from "./userNft.dao";
import { SwapDao } from "./swap.dao";
import { PurchaseDao } from "./purchase.dao";

dotenv.config();

const network = process.env.NETWORK!;
const hostName =
  process.env.ENVIRONMENT === "local" ? "localhost" : process.env.DB_HOST;
const userName = process.env.DB_USER!;
const password =
  process.env.ENVIRONMENT === "local"
    ? process.env.DB_PASSWORD_LOCAL
    : process.env.DB_PASSWORD;
const database = process.env.DB_NAME!.replace("{network}", network);
const dialect: any = process.env.DB_DIALECT;

export const sequelize = new Sequelize(database, userName, password, {
  host: hostName,
  dialect,
  models: [
    UserDao,
    CollectionDao,
    PackageDao,
    NftDao,
    UserNftDao,
    SwapDao,
    PurchaseDao,
  ],
  repositoryMode: true,
});
