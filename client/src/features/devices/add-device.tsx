import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { Device } from "src/@types/device.type";
import * as yup from "yup";
import { addDevice } from "../api/api-call";
import Button from "../ui/button/button";
import Input from "../ui/input/input";
import Label from "../ui/label/label";
import Modal from "../ui/modal/modal";
import ModalContent from "../ui/modal/modal-content";
import ModalFooter from "../ui/modal/modal-footer";
import ModalHeader from "../ui/modal/modal-header";

const addDeviceSchema = yup.object({
  deviceId: yup.string().required("Trường này là bắt buộc"),
  deviceName: yup.string().required("Trường này là bắt buộc"),
});

const AddDevice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<{
    deviceId: string;
    deviceName: string;
  }>({
    resolver: yupResolver(addDeviceSchema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(addDevice, {
    onSuccess: (data) => {
      const previousDevices = queryClient.getQueryData<Device[]>("devices");

      queryClient.setQueryData(
        "devices",
        previousDevices ? [...previousDevices, data] : [data]
      );
    },
  });

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutation.mutateAsync(data);
      onClose();
    } catch (e: any) {
      const message = e.response.data.error.message;
      if (message.includes("user_devices_user_id_device_id_unique")) {
        setError("deviceId", { message: "Đã kết nối với thiết bị" });
      }
      if (message.includes("Device not found")) {
        setError("deviceId", { message: "ID thiết bị không tồn tại" });
      }
    }
  });

  return (
    <>
      <Button onClick={onOpen} className="flex items-center space-x-2 px-4">
        <AiOutlinePlus size={20} />
        <div>Thêm thiết bị</div>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>Thêm thiết bị</ModalHeader>
        <ModalContent>
          <div className="space-y-3">
            <div>
              <Label>Tên thiết bị</Label>
              <Input
                error={errors.deviceName?.message}
                {...register("deviceName")}
              />
            </div>
            <div>
              <Label>ID thiết bị</Label>
              <Input
                error={errors.deviceId?.message}
                {...register("deviceId")}
              />
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button
            onClick={onSubmit}
            loading={mutation.isLoading}
            className="px-4"
          >
            Thêm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddDevice;
