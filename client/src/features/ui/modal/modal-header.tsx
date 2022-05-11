import React, { ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useModal } from "./modal-context";

interface ModalHeaderProps {
  children?: ReactNode;
}

const ModalHeader = ({ children }: ModalHeaderProps) => {
  const { close } = useModal();

  return (
    <div className="flex items-center justify-between px-8 py-4 font-black">
      <h2 className="text-xl">{children}</h2>
      <button
        onClick={close}
        className="rounded-full bg-gray-200 hover:bg-gray-300 transition-colors p-1"
      >
        <IoCloseOutline size={22} />
      </button>
    </div>
  );
};

export default ModalHeader;
