import React, { useState } from "react";
import Modal from "../ui/modal/modal";
import DeviceInfo from "./device-info";

interface DeviceInfoButtonProps {
  deviceId: string;
}

const DeviceInfoButton: React.FC<DeviceInfoButtonProps> = ({ deviceId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        onClick={onOpen}
        className="py-1 px-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
      >
        Thông tin thiết bị
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <DeviceInfo deviceId={deviceId} />
      </Modal>
    </>
  );
};

export default DeviceInfoButton;
