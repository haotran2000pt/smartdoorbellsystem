import React from "react";
import { BsThreeDots } from "react-icons/bs";
import Popover from "../ui/popover/popover";
import DeleteDevice from "./delete-device";
import DeviceInfoButton from "./device-info-button";

const DeviceMenu = ({ deviceId }: { deviceId: string }) => {
  return (
    <Popover
      content={
        <div className="p-2 min-w-[180px] font-semibold">
          <DeviceInfoButton deviceId={deviceId} />
          <DeleteDevice deviceId={deviceId} />
        </div>
      }
      placement="bottom-end"
    >
      <button className="p-2 rounded bg-white hover:bg-gray-100 border-gray-300 transition-colors border">
        <BsThreeDots />
      </button>
    </Popover>
  );
};

export default DeviceMenu;
