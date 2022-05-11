import { NotificationType } from "../entities";
import { DI } from "../server";
import { MailService } from "./email.service";

class NotificationService {
  public static createSystemNotification = async (data: {
    title: string;
    description: string;
    user?: string;
    imageUrl?: string;
  }) => {
    if (data.user)
      await DI.userRepository.findOneOrFail({
        id: data.user,
      });

    const notification = DI.notificationRepository.create({
      ...data,
      type: NotificationType.SYSTEM,
    });

    await DI.notificationRepository.persistAndFlush(notification);

    return notification;
  };

  public static createDeviceNotification = async (
    device: string,
    data: {
      title: string;
      description: string;
      imageUrl: string;
    }
  ) => {
    await DI.deviceRepository.findOneOrFail({
      id: device,
    });

    const notification = DI.notificationRepository.create({
      ...data,
      device,
      type: NotificationType.CAMERA,
    });

    await DI.notificationRepository.persistAndFlush(notification);

    const users = await DI.userRepository.find({ userDevices: { device } });

    users.forEach((user) => {
      MailService.sendCameraNotificationEmail(
        user.email,
        data.title,
        data.description,
        data.imageUrl
      );
    });

    return notification;
  };

  public static getUserNotifications = async (userId: string) => {
    const notifications = await DI.notificationRepository.find(
      {
        $or: [
          {
            device: { userDevices: { user: userId } },
          },
          {
            user: userId,
          },
          { $and: [{ device: null, user: null }] },
        ],
      },
      { orderBy: { createdAt: "desc" } }
    );

    return notifications;
  };
}

export default NotificationService;
