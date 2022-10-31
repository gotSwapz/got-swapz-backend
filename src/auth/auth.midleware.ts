import { Request, Response, NextFunction } from "express";
import { ErrorCode } from "../errors/error-code";
import { ErrorException } from "../errors/error-exception";
import * as jwtAuth from "./jwt.auth";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer")) {
    const token = auth.slice(7);

    try {
      const tokenData = jwtAuth.verifyToken(token);
      if (!tokenData.authenticated) {
        throw new ErrorException(ErrorCode.Unauthorized);
      }
      res.locals.tokenData = tokenData;
      next();
    } catch (error) {
      throw new ErrorException(ErrorCode.Unauthorized);
    }
  } else {
    throw new ErrorException(ErrorCode.Unauthorized);
  }
};
