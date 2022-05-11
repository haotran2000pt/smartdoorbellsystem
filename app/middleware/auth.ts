import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import passport from "passport";
import { User } from "../entities";
import ApiError from "../utils/ApiError";

const verifyCallback =
  (req: Request, resolve: any, reject: any) => async (err: any, user: User) => {
    if (err || !user) {
      return reject(new ApiError(StatusCodes.UNAUTHORIZED, "Unanthenticated"));
    }
    req.currentUser = user;
    resolve();
  };

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

export default auth;
