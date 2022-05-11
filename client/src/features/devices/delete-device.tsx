import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Device } from "src/@types/device.type";
import { deleteDevice } from "../api/api-call";
import Button from "../ui/button/button";
import Modal from "../ui/modal/modal";
import ModalContent from "../ui/modal/modal-content";
import ModalFooter from "../ui/modal/modal-footer";
import ModalHeader from "../ui/modal/modal-header";

interface DeleteDeviceProps {
  deviceId: string;
}

const DeleteDevice: React.FC<DeleteDeviceProps> = ({ deviceId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation(deleteDevice, {
    onSuccess: () => {
      const previousDevices = queryClient.getQueryData<Device[]>("devices");

      queryClient.setQueryData(
        "devices",
        previousDevices?.filter((device) => device.id !== deviceId)
      );
    },
  });

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onDelete = () => {
    mutation.mutate(deviceId);
  };

  return (
    <>
      <div
        onClick={onOpen}
        className="py-1 px-2 rounded-md hover:bg-red-100 transition-colors cursor-pointer text-red-600"
      >
        Hủy kết nối
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>Hủy kết nối thiết bị</ModalHeader>
        <ModalContent>
          <div className="font-medium">
            Bạn có chắc hủy kết nối với thiết bị ID:{" "}
            <span className="font-bold">{deviceId}</span>? Bạn vẫn có thể kết
            nối lại sau khi hủy.
          </div>
          {mutation.isError && (
            <div className="text-red-500 bg-red-100 p-2 rounded-md font-bold mt-2">
              Không thể xóa do lỗi máy chủ.
            </div>
          )}
        </ModalContent>
        <ModalFooter>
          <Button
            onClick={onDelete}
            loading={mutation.isLoading}
            theme="danger"
            className="px-4"
          >
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default DeleteDevice;
