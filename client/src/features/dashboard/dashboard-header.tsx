import React, { ReactNode } from "react";
import Helmet from "react-helmet";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavbar } from "../ui/navbar/navbar-context";

interface DashboardHeaderProps {
  text: string;
  children?: ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  text,
  children,
}) => {
  const { close, isOpen, open } = useNavbar();

  return (
    <>
      <Helmet>
        <title>{text}</title>
      </Helmet>
      <div className="bg-white border-b flex items-center justify-between h-[50px] sticky top-0 left-0 self-start">
        <button
          onClick={() => {
            if (isOpen) {
              close();
            } else {
              open();
            }
          }}
          className="p-2 mx-1 md:hidden"
        >
          <AiOutlineMenu size={20} />
        </button>
        <div className="flex flex-1">{children}</div>
      </div>
    </>
  );
};

export default DashboardHeader;
