import _ from "lodash";
import React from "react";
import { useQuery } from "react-query";
import { Device } from "src/@types/device.type";
import { getDevices } from "src/features/api/api-call";
import ContentHeader from "src/features/dashboard/content-header";
import DashboardContent from "src/features/dashboard/dashboard-content";
import DashboardHeader from "src/features/dashboard/dashboard-header";
import AddDevice from "src/features/devices/add-device";
import DeviceItem from "src/features/devices/device-item";
import DevicesEmpty from "src/features/devices/devices-empty";
import CircleLoader from "src/features/ui/loading/circle-loader";
import Tabs from "src/features/ui/tabs/tabs";

const DevicesPage = () => {
  const { isLoading, data } = useQuery<Device[]>("devices", getDevices);

  return (
    <>
      <DashboardHeader text="Danh sách thiết bị">
        <Tabs className="h-full" items={["Chung"]} />
      </DashboardHeader>
      <ContentHeader
        title="Danh sách thiết bị"
        description="Các thiết bị camera được kết nối với tài khoản của bạn."
      >
        <div className="text-sm">
          <AddDevice />
        </div>
      </ContentHeader>
      <DashboardContent>
        <div>
          {isLoading && (
            <div className="flex-center py-20">
              <CircleLoader />
            </div>
          )}
          {data &&
            (_.isEmpty(data) ? (
              <DevicesEmpty />
            ) : (
              data.map((device) => (
                <DeviceItem device={device} key={`device_item${device.id}`} />
              ))
            ))}
        </div>
      </DashboardContent>
    </>
  );
};

export default DevicesPage;
