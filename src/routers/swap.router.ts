import express, { NextFunction, Request, Response } from "express";
import * as service from "../services/swap.service";
import * as emailService from "../services/email.service";

export const swapRouter = express.Router();

swapRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newSwap = await service.create(req.body);
      emailService.swapEmail(newSwap);
      res.status(200).json({ swapId: newSwap.id });
    } catch (error: any) {
      next(error);
    }
  }
);

swapRouter.put("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedSwap = await service.updateState(req.body.id, req.body.state);
    emailService.swapEmail(updatedSwap);
    res.status(200).json({ success: true });
  } catch (error: any) {
    next(error);
  }
});

swapRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await service.get(+req.params.id));
    } catch (error: any) {
      next(error);
    }
  }
);

swapRouter.get(
  "/byCreator/:address",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await service.getByCreator(req.params.address));
    } catch (error: any) {
      next(error);
    }
  }
);

swapRouter.get(
  "/byReceiver/:address",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await service.getByReceiver(req.params.address));
    } catch (error: any) {
      next(error);
    }
  }
);
