import React, { ReactNode } from "react";

interface ModalContentProps {
  children?: ReactNode;
}

const ModalContent: React.FC<ModalContentProps> = ({ children }) => {
  return <div className="px-8 py-4 max-w-full">{children}</div>;
};

export default ModalContent;
