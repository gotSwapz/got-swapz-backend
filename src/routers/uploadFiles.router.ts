import express, { NextFunction, Request, Response } from "express";
import * as service from "../services/uploadFiles.service";

export const uploadFilesRouter = express.Router();

uploadFilesRouter.post(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fileName, currentChunkIndex, totalChunks } = req.query;
      const data = req.body.toString().split(",")[1];
      res
        .status(200)
        .json(
          service.upload(
            data,
            fileName as string,
            +(currentChunkIndex as string),
            +(totalChunks as string),
            req.ip
          )
        );
    } catch (error: any) {
      next(error);
    }
  }
);
