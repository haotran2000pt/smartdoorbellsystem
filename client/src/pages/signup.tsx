import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Helmet from "react-helmet";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "src/features/ui/button/button";
import Input from "src/features/ui/input/input";
import AuthHeader from "src/features/users/auth/auth-header";
import { useAuth } from "src/features/users/auth/auth.context";
import * as yup from "yup";

const registerSchema = yup.object({
  username: yup
    .string()
    .required("Trường này là bắt buộc")
    .min(6, "Độ dài phải từ 6 đến 32")
    .max(32, "Độ dài phải từ 6 đến 32"),
  email: yup
    .string()
    .required("Trường này là bắt buộc")
    .email("Địa chỉ email không hợp lệ"),
  password: yup
    .string()
    .required("Trường này là bắt buộc")
    .min(6, "Phải dài ít nhất 6 ký tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu phải trùng nhau"),
});

export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    resolver: yupResolver(registerSchema),
  });

  const { updateUser } = useAuth();

  const onClick = handleSubmit(async (data) => {
    const { confirmPassword, ...userData } = data;

    try {
      const user = (
        await axios.post("register", userData, { withCredentials: true })
      ).data;
      updateUser(user);
    } catch (e: any) {
      const message = e.response.data.error.message;
      if (message.includes("username_unique")) {
        setError("username", { message: "Tài khoản đã được dùng" });
      }
      if (message.includes("email_unique")) {
        setError("email", { message: "Email đã được dùng" });
      }
    }
  });

  return (
    <>
      <Helmet>
        <title>Đăng ký</title>
      </Helmet>
      <AuthHeader>Đăng ký tài khoản</AuthHeader>
      <div className="space-y-2 mb-4">
        <Input
          error={errors?.username?.message}
          {...register("username")}
          placeholder="Họ tên"
        />
        <Input
          error={errors?.email?.message}
          {...register("email")}
          placeholder="Email"
        />
        <Input
          error={errors?.password?.message}
          {...register("password")}
          placeholder="Mật khẩu"
          type="password"
        />
        <Input
          error={errors?.confirmPassword?.message}
          {...register("confirmPassword")}
          placeholder="Xác nhận mật khẩu"
          type="password"
        />
      </div>
      <div className="mb-4">
        <Button onClick={onClick} loading={isSubmitting}>
          Đăng ký
        </Button>
      </div>
      <div className="border-t h-0 mb-3" />
      <div className="text-sm font-medium">
        Đã có tài khoản?{" "}
        <Link to="/login">
          <span className="link">Đăng nhập</span>
        </Link>
      </div>
    </>
  );
};
