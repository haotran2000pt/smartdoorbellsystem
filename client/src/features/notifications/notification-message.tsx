import classNames from "classnames";
import moment from "moment";
import React from "react";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { Notification, NotificationType } from "src/@types/notification.type";

interface NotificationMessageProps {
  notification: Notification;
}

const NotificationMessage: React.FC<NotificationMessageProps> = ({
  notification,
}) => {
  return (
    <div className="flex border-b mb-4 pb-3">
      <div className="flex-shrink-0 mr-3">
        <div
          className={classNames(
            "w-8 h-8 rounded-full overflow-hidden flex-center text-white",
            {
              "bg-red-600": notification.type === NotificationType.CAMERA,
              "bg-blue-600": notification.type === NotificationType.SYSTEM,
            }
          )}
        >
          {notification.type === NotificationType.CAMERA && (
            <AiOutlineVideoCamera size={20} />
          )}
          {notification.type === NotificationType.SYSTEM && (
            <IoSettingsOutline size={20} />
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="text-[15px] font-bold mb-1">
          {notification.title}{" "}
          <span className="ml-1 text-sm font-medium text-gray-600">
            {moment(notification.createdAt).fromNow()}
          </span>
        </div>
        <div className="mb-2 font-medium text-gray-700">
          {notification.description}
        </div>
        {notification.imageUrl && (
          <div>
            <img src={notification.imageUrl} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationMessage;
