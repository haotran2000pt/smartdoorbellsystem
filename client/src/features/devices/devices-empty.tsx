import React from "react";
import { BsCameraVideoOff } from "react-icons/bs";

const DevicesEmpty = () => {
  return (
    <div className="flex-center py-20 flex-col select-none">
      <BsCameraVideoOff size={70} />
      <div className="mt-2 font-semibold">Bạn chưa thêm thiết bị nào</div>
    </div>
  );
};

export default DevicesEmpty;
