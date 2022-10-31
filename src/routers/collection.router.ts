import express, { NextFunction, Request, Response } from "express";
import * as service from "../services/collection.service";
import * as purchaseService from "../services/purchase.service";
import multer from "multer";

export const collectionRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 10, // 10MB
  },
});

collectionRouter.put(
  "/",
  [
    upload.fields([
      { name: "logo", maxCount: 1 },
      { name: "banner", maxCount: 1 },
    ]),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(
        await service.update(
          JSON.parse(req.body.collection),
          req.files as {
            [fieldname: string]: Express.Multer.File[];
          }
        )
      );
    } catch (error: any) {
      next(error);
    }
  }
);

collectionRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await service.get(+req.params.id));
    } catch (error: any) {
      next(error);
    }
  }
);

collectionRouter.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await service.getAll());
    } catch (error: any) {
      next(error);
    }
  }
);

collectionRouter.get(
  "/purchase/:requestId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res
        .status(200)
        .json(await purchaseService.isProcessed(req.params.requestId));
    } catch (error: any) {
      next(error);
    }
  }
);

collectionRouter.post(
  "/verifyContract",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res
        .status(200)
        .json(
          await service.verifyContract(
            req.body.contractAddress,
            req.body.owner,
            req.body.name,
            req.body.uri,
            req.body.packageUnits,
            req.body.packagePrices,
            req.body.rarity
          )
        );
    } catch (error: any) {
      next(error);
    }
  }
);
