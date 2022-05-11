import { RequestHandler } from "express";
import NotificationService from "../services/notification.service";

export const create: RequestHandler = async (req, res) => {
  const notification = await NotificationService.createSystemNotification(
    req.body
  );

  res.send(notification);
};
