import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axiosApi from "../api/axiosApi";
import Button from "../ui/button/button";
import Input from "../ui/input/input";
import Label from "../ui/label/label";
import ModalContent from "../ui/modal/modal-content";
import { useModal } from "../ui/modal/modal-context";
import ModalFooter from "../ui/modal/modal-footer";
import ModalHeader from "../ui/modal/modal-header";

const updatePasswordSchema = yup.object({
  oldPassword: yup.string().required("Trường này là bắt buộc"),
  newPassword: yup
    .string()
    .required("Trường này là bắt buộc")
    .min(6, "Phải dài ít nhất 6 ký tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Mật khẩu phải trùng nhau"),
});

const EditPassword = () => {
  const { close } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    resolver: yupResolver(updatePasswordSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axiosApi.post("/users/@me/password", {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      close();
    } catch (e: any) {
      const message = e.response.data.error.message;

      if (message.includes("password")) {
        setError("oldPassword", { message: "Sai mật khẩu" });
      }
    }
  });

  return (
    <>
      <ModalHeader>Thay đổi mật khẩu</ModalHeader>
      <ModalContent>
        <div className="space-y-2">
          <div>
            <Label>Mật khẩu hiện tại</Label>
            <Input
              {...register("oldPassword")}
              error={errors.oldPassword?.message}
              type="password"
            />
          </div>
          <div>
            <Label>Mật khẩu mới</Label>
            <Input
              {...register("newPassword")}
              error={errors.newPassword?.message}
              type="password"
            />
          </div>
          <div>
            <Label>Nhập lại mật khẩu</Label>
            <Input
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              type="password"
            />
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button onClick={onSubmit} loading={isSubmitting}>
          Đổi email
        </Button>
      </ModalFooter>
    </>
  );
};

export default EditPassword;
