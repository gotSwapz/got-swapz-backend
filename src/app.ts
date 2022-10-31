import express from "express";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";

import { authRouter } from "./routers/auth.router";
import { uploadFilesRouter } from "./routers/uploadFiles.router";
import { ipfsStorageRouter } from "./routers/ipfsStorage.router";
import { collectionRouter } from "./routers/collection.router";
import { nftRouter } from "./routers/nft.router";
import { swapRouter } from "./routers/swap.router";
import { userRouter } from "./routers/user.router";
import { testRouter } from "./routers/test.router";

import { sequelize } from "./database/sequelize.db";
import { CollectionDao } from "./database/collection.dao";
import { PackageDao } from "./database/package.dao";
import { UserDao } from "./database/user.dao";
import { NftDao } from "./database/nft.dao";
import { SwapDao } from "./database/swap.dao";
import { UserNftDao } from "./database/userNft.dao";
import { errorHandler } from "./errors/error-handler";
import { listenToEvents } from "./services/eventListener.service";
import { PurchaseDao } from "./database/purchase.dao";

export const userRepository = sequelize.getRepository(UserDao);
export const collectionRepository = sequelize.getRepository(CollectionDao);
export const packageRepository = sequelize.getRepository(PackageDao);
export const swapRepository = sequelize.getRepository(SwapDao);
export const nftRepository = sequelize.getRepository(NftDao);
export const userNftRepository = sequelize.getRepository(UserNftDao);
export const purchaseRepository = sequelize.getRepository(PurchaseDao);

export const app = express();

listenToEvents();

app.use(logger("dev"));
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: "application/octet-stream", limit: "100mb" }));

app.get("/", (_req, res) => {
  res.send("🤘 gotSwapz!");
});
app.use("/auth", authRouter);
app.use("/uploadFiles", uploadFilesRouter);
app.use("/ipfsStorage", ipfsStorageRouter);
app.use("/collection", collectionRouter);
app.use("/nft", nftRouter);
app.use("/swap", swapRouter);
app.use("/user", userRouter);
if (process.env.NODE_ENV === "development") {
  app.use("/test", testRouter);
}

app.use(errorHandler);
