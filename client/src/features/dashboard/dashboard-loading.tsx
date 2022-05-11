import React from "react";
import ThreeDotsLoader from "../ui/loading/three-dots-loader";

const DashboardLoading = () => {
  return (
    <div className="flex-center w-screen h-screen flex-col">
      <div className="mb-2">
        <ThreeDotsLoader className="!bg-black" />
      </div>
      <div className="font-semibold">Đang tải trang. Vui lòng đợi!</div>
    </div>
  );
};

export default DashboardLoading;
