import express, { NextFunction, Request, Response } from "express";
import * as service from "../services/ipfsStorage.service";

export const ipfsStorageRouter = express.Router();

ipfsStorageRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fileName } = req.query;
      res.status(200).json(await service.storeCollection(fileName as string));
    } catch (error: any) {
      next(error);
    }
  }
);
