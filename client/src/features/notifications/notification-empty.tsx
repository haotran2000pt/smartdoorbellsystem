import React from "react";
import { IoNotificationsOffOutline } from "react-icons/io5";

const NotificationEmpty = () => {
  return (
    <div className="w-full h-full flex-center py-40 select-none flex-col">
      <IoNotificationsOffOutline size={70} />
      <div className="mt-2 font-semibold text-[15px]">Bạn đang không có thông báo nào</div>
    </div>
  );
};

export default NotificationEmpty;
