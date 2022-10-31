import express, { NextFunction, Request, Response } from "express";
import * as service from "../services/user.service";
import multer from "multer";
import { authMiddleware } from "../auth/auth.midleware";
import { ErrorException } from "../errors/error-exception";
import { ErrorCode } from "../errors/error-code";

export const userRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 10, // 10MB
  },
});

userRouter.put(
  "/",
  authMiddleware,
  [
    upload.fields([
      { name: "avatar", maxCount: 1 },
      { name: "banner", maxCount: 1 },
    ]),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (res.locals.tokenData.address !== req.body.user.address) {
        throw new ErrorException(ErrorCode.Unauthorized);
      }

      res.status(200).json(
        await service.update(
          JSON.parse(req.body.user),
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

userRouter.get(
  "/full/:address",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.tokenData.data.address !== req.params.address) {
      throw new ErrorException(ErrorCode.Unauthorized);
    }

    try {
      res.status(200).json(await service.get(req.params.address, true));
    } catch (error: any) {
      next(error);
    }
  }
);

userRouter.get(
  "/:address",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await service.get(req.params.address));
    } catch (error: any) {
      next(error);
    }
  }
);
