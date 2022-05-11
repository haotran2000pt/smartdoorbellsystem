import React, { ReactNode } from "react";

interface DashboardContentProps {
  children?: ReactNode;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ children }) => {
  return <div className="max-w-[800px] ml-10 my-6">{children}</div>;
};

export default DashboardContent;
