import React, { useState } from "react";
import Button from "../ui/button/button";
import Modal from "../ui/modal/modal";
import EditEmail from "./edit-email-form";

const EditEmailButton = () => {
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
        <EditEmail />
      </Modal>
    </>
  );
};

export default EditEmailButton;
