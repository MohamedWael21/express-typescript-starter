import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export default function (err: any, _1: Request, res: Response, _2: NextFunction) {

  if (!createHttpError.isHttpError(err)) {
    err = process.env.NODE_ENV === "development" ? err : createHttpError.InternalServerError("Something went wrong");
  }
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    error: {
      message: err.message,
      validationErrors: err.headers,
    },
  });
}
