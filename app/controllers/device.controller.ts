import { RequestHandler } from "express";
import { DeviceService } from "../services/device.service";
import ApiError from "../utils/ApiError";
import StatusCodes from "http-status-codes";
import NotificationService from "../services/notification.service";

export const create: RequestHandler = async (req, res) => {
  try {
    if (!req.body.id) {
      throw new Error("id is missing.");
    }

    const device = await DeviceService.create(
      req.body.id,
      req.body.createdDate
    );

    res.send(device);
  } catch (e: any) {
    throw new ApiError(StatusCodes.BAD_REQUEST, e?.message);
  }
};

export const createNotification: RequestHandler = async (req, res) => {
  const notification = await NotificationService.createDeviceNotification(
    req.params.deviceId,
    req.body
  );

  res.send(notification);
};

export const getInfo: RequestHandler = async (req, res) => {
  const device = await DeviceService.getDeviceInfo(req.params.deviceId);

  res.send(device);
};
