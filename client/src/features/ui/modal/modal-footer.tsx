import React, { ReactNode } from "react";
import ModalCancelButton from "./modal-cancel-button";

interface ModalFooterProps {
  children?: ReactNode;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
  return (
    <div className="px-8 py-4 border-t flex justify-end space-x-2">
      <div className="flex space-x-2 items-center">
        <ModalCancelButton />
        {children}
      </div>
    </div>
  );
};

export default ModalFooter;
