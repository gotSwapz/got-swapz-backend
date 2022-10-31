import express, { NextFunction, Request, Response } from "express";
import * as service from "../services/nft.service";

export const nftRouter = express.Router();

nftRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await service.get(+req.params.id));
    } catch (error: any) {
      next(error);
    }
  }
);
