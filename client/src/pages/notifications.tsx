import _ from "lodash";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Notification, NotificationType } from "src/@types/notification.type";
import { getNotifications } from "src/features/api/api-call";
import ContentHeader from "src/features/dashboard/content-header";
import DashboardContent from "src/features/dashboard/dashboard-content";
import DashboardHeader from "src/features/dashboard/dashboard-header";
import NotificationEmpty from "src/features/notifications/notification-empty";
import NotificationMessage from "src/features/notifications/notification-message";
import CircleLoader from "src/features/ui/loading/circle-loader";
import Tabs from "src/features/ui/tabs/tabs";

type NotificationTab = "all" | "system" | "camera";

const NotificationsPage = () => {
  const [tab, setTab] = useState<NotificationTab>("all");

  const { isLoading, data } = useQuery<Notification[]>(
    "notifications",
    getNotifications
  );

  const notifications = useMemo<Notification[]>(() => {
    if (data) {
      switch (tab) {
        case "all":
          return data;
        case "camera":
          return data.filter((o) => o.type === NotificationType.CAMERA);
        case "system":
          return data.filter((o) => o.type === NotificationType.SYSTEM);
        default:
          return [];
      }
    }
    return [];
  }, [data, tab]);

  return (
    <>
      <DashboardHeader text="Thông báo">
        <Tabs
          className="h-full"
          onChange={(v) => setTab(v)}
          items={[
            { label: "Tất cả", value: "all" },
            { label: "Camera", value: "camera" },
            { label: "Hệ thống", value: "system" },
          ]}
        />
      </DashboardHeader>
      {tab === "all" && (
        <ContentHeader
          title="Tất cả thông báo"
          description="Bao gồm thông báo từ hệ thống và camera"
        />
      )}
      {tab === "system" && (
        <ContentHeader
          title="Thông báo hệ thống"
          description="Các thông báo về phần mềm, sản phẩm, tài khoản."
        />
      )}
      {tab === "camera" && (
        <ContentHeader
          title="Thông báo từ camera"
          description="Các thông báo chống trộm do camera phát hiện."
        />
      )}
      <DashboardContent>
        {isLoading ? (
          <div className="flex-center py-20">
            <CircleLoader />
          </div>
        ) : _.isEmpty(notifications) ? (
          <NotificationEmpty />
        ) : (
          notifications.map((notification) => (
            <NotificationMessage
              key={`notification${notification.id}`}
              notification={notification}
            />
          ))
        )}
      </DashboardContent>
    </>
  );
};

export default NotificationsPage;
