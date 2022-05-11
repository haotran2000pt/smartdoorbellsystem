import React from "react";
import { Device } from "src/@types/device.type";
import DeviceMenu from "./device-menu";

interface DeviceItemProps {
  device: Device;
}

const DeviceItem: React.FC<DeviceItemProps> = ({ device }) => {
  return (
    <div className="p-4 transition-colors hover:bg-gray-100 flex font-semibold items-center border-b">
      <div className="flex-1">{device.name}</div>
      <div className="flex-1 flex items-center">
        ID:{" "}
        <span className="ml-1.5 p-0.5 rounded-md bg-gray-200 font-medium">
          {device.id}
        </span>
      </div>
      <div className="flex-shrink-0">
        <DeviceMenu deviceId={device.id} />
      </div>
    </div>
  );
};

export default DeviceItem;
