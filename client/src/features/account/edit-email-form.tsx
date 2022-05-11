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
import { useAuth } from "../users/auth/auth.context";

const updateEmailSchema = yup.object({
  email: yup
    .string()
    .required("Trường này là bắt buộc")
    .email("Địa chỉ email không hợp lệ"),
  password: yup.string().required("Trường này là bắt buộc"),
});

const EditEmail = () => {
  const { close } = useModal();
  const { updateUserField, user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setError,
  } = useForm<{
    email: string;
    password: string;
  }>({
    resolver: yupResolver(updateEmailSchema),
    defaultValues: { email: user?.email },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axiosApi.post("/users/@me/email", data);
      updateUserField({ email: getValues("email") });
      close();
    } catch (e: any) {
      const message = e.response.data.error.message;

      if (message.includes("password")) {
        setError("password", { message: "Sai mật khẩu" });
      }

      if (message.includes("email")) {
        setError("email", { message: "Email bị trùng" });
      }
    }
  });

  return (
    <>
      <ModalHeader>Thay đổi địa chỉ email</ModalHeader>
      <ModalContent>
        <div className="space-y-2">
          <div>
            <Label>Email</Label>
            <Input {...register("email")} error={errors.email?.message} />
          </div>
          <div>
            <Label>Mật khẩu</Label>
            <Input
              {...register("password")}
              error={errors.password?.message}
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

export default EditEmail;
