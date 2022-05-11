import React, { useState } from "react";
import Button from "../ui/button/button";
import Modal from "../ui/modal/modal";
import EditPassword from "./edit-password-form";

interface EditPasswordButtonProps {}

const EditPasswordButton: React.FC<EditPasswordButtonProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={onOpen}>Chỉnh sửa</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <EditPassword />
      </Modal>
    </>
  );
};

export default EditPasswordButton;
