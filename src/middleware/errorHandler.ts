import { NextFunction, Response, Request } from "express";
import HttpError from "../errors/HttpError";

export default function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.shouldLog && err.innerError) console.error(err.innerError);
  res.status(err.status).json({
    message: err.message,
    status: err.status,
    ...(err.detail && { detail: err.detail }),
  });
}
