import express, { NextFunction, Request, Response } from "express";
import * as signatureService from "../auth/signature.auth";
import * as jwtService from "../auth/jwt.auth";
import * as userService from "../services/user.service";

export const authRouter = express.Router();

authRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { address } = req.query;
    res.status(200).json(await signatureService.getNonce(address as string));
  } catch (error: any) {
    next(error);
  }
});

authRouter.post(
  "/verifySignature",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res
        .status(200)
        .json(
          await signatureService.verifySignature(
            req.body.address,
            req.body.signature
          )
        );
    } catch (error: any) {
      next(error);
    }
  }
);

authRouter.post(
  "/verifyJwt",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authData = jwtService.verifyToken(req.body.token);
      if (authData.authenticated) {
        const user = await userService.get(authData.data.address);
        authData.data.avatar = user?.avatarUrl;
      }
      res.status(200).json(authData);
    } catch (error: any) {
      next(error);
    }
  }
);
