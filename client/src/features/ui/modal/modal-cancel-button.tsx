import React from "react";
import { useModal } from "./modal-context";

const ModalCancelButton = () => {
  const { close } = useModal();

  return (
    <button
      onClick={close}
      className="py-2 px-3 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
    >
      Đóng
    </button>
  );
};

export default ModalCancelButton;
