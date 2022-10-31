import { Request, Response, NextFunction } from "express";
import { ErrorException } from "./error-exception";
import { ErrorCode } from "./error-code";
import { ErrorModel } from "./error.model";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(`\n❌ ERROR for ${req.path}:`, err);

  if (err instanceof ErrorException) {
    res.status(err.status).json(err);
  } else {
    res
      .status(500)
      .json(new ErrorModel(ErrorCode.UnexpectedError, 500, err.message));
  }
};
