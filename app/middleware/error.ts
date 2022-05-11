import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";

const errorMiddleware = (
  error: ApiError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  response.status(status).send({
    error: {
      status,
      message,
    },
  });
};

export default errorMiddleware;
