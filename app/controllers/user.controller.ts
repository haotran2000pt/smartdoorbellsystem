import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { DI } from "../server";
import { DeviceService } from "../services/device.service";
import { MailService } from "../services/email.service";
import NotificationService from "../services/notification.service";
import { UserService } from "../services/user.service";
import ApiError from "../utils/ApiError";

export const getMe: RequestHandler = async (req, res) => {
  res.send(req.currentUser);
};

export const updateMe: RequestHandler = async (req, res) => {
  const { email, password, ...fields } = req.body;

  const user = await UserService.update(req.currentUser, fields);

  res.send(user);
};

export const updateEmail: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).send();
  }

  if (!(await bcrypt.compare(password, req.currentUser.password))) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "wrong password");
  }

  try {
    await DI.userRepository.findOneOrFail({ email });
    throw new ApiError(StatusCodes.BAD_REQUEST, "email is in used");
  } catch {
    const user = await UserService.update(req.currentUser, { email });
    await NotificationService.createSystemNotification({
      title: "Thay đổi email",
      description: `Bạn vừa thay đổi email thành công sang ${email}.`,
      user: req.currentUser.id,
    });

    res.send(user);
  }
};

export const updatePassword: RequestHandler = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.send(StatusCodes.BAD_REQUEST);
  }

  if (!(await bcrypt.compare(oldPassword, req.currentUser.password))) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "wrong password");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  const user = await UserService.update(req.currentUser, {
    password: hashedNewPassword,
  });

  await NotificationService.createSystemNotification({
    title: "Thay đổi mật khẩu",
    description: `Bạn vừa thay đổi mật khẩu thành công.`,
    user: req.currentUser.id,
  });

  res.send(user);
};
export const getDevices: RequestHandler = async (req, res) => {
  const devices = await DeviceService.getUserDevices(req.currentUser.id);

  res.send(devices);
};

export const addDevice: RequestHandler = async (req, res) => {
  const device = await DeviceService.addUserDevice(
    req.body.deviceId,
    req.body.deviceName,
    req.currentUser
  );

  res.send(device);
};

export const removeDevice: RequestHandler = async (req, res) => {
  await DeviceService.removeDevice(req.params.deviceId, req.currentUser);

  res.status(StatusCodes.ACCEPTED).send();
};

export const getNotifications: RequestHandler = async (req, res) => {
  const notifications = await NotificationService.getUserNotifications(
    req.currentUser.id
  );

  res.send(notifications);
};

export const updateDevice: RequestHandler = async (req, res) => {
  const notifications = await DeviceService.updateDevice(
    req.params.deviceId,
    req.currentUser,
    req.body
  );

  res.send(notifications);
};
