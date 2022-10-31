import express, { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";
import * as emailService from "../services/email.service";
import { userRepository } from "../app";

export const testRouter = express.Router();

testRouter.post(
  "/createUser",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userRepository.create(req.body);
      res.json({ user });
    } catch (error: any) {
      next(error);
    }
  }
);

testRouter.post(
  "/addNfts",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      userService.addNfts(req.body.userAddress, req.body.nftIds);
      res.json({ message: "success" });
    } catch (error: any) {
      next(error);
    }
  }
);

testRouter.post(
  "/removeNfts",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      userService.removeNfts(req.body.userAddress, req.body.nftIds);
      res.json({ message: "success" });
    } catch (error: any) {
      next(error);
    }
  }
);
