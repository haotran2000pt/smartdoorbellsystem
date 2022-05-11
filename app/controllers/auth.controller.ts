import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import AuthService from "../services/auth.service";
import ApiError from "../utils/ApiError";
import dayjs from "dayjs";
import authConfig from "../config/auth.config";

export const register: RequestHandler = async (req, res, next) => {
  try {
    const responseData = await AuthService.register(req.body);

    res
      .cookie("refresh_token", responseData.tokens.refresh, {
        httpOnly: true,
        expires: dayjs()
          .add(parseInt(authConfig.refreshExpirationDays), "days")
          .toDate(),
      })
      .status(StatusCodes.OK)
      .send(responseData);
  } catch (e: any) {
    throw new ApiError(StatusCodes.BAD_REQUEST, e?.message);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const loginResponse = await AuthService.loginWithEmailAndPassword(
      req.body.email,
      req.body.password
    );

    if (!loginResponse) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "User not found");
    }

    res
      .cookie("refresh_token", loginResponse.tokens.refresh, {
        httpOnly: true,
        expires: dayjs()
          .add(parseInt(authConfig.refreshExpirationDays), "days")
          .toDate(),
      })
      .send(loginResponse);
  } catch (e: any) {
    throw new ApiError(StatusCodes.BAD_REQUEST, e?.message);
  }
};

export const refreshToken: RequestHandler = async (req, res) => {
  try {
    const tokens = await AuthService.refreshAuth(req.cookies.refresh_token);

    res.send(tokens);
  } catch (e: any) {
    throw new ApiError(StatusCodes.BAD_REQUEST, e?.message);
  }
};

export const logout: RequestHandler = async (req, res) => {
  res.clearCookie("refresh_token", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.send();
};
