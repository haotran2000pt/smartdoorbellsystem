import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthHeader from "src/features/users/auth/auth-header";
import Input from "src/features/ui/input/input";
import Button from "src/features/ui/button/button";
import axios from "axios";
import { useAuth } from "src/features/users/auth/auth.context";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Trường này là bắt buộc")
    .email("Địa chỉ email không hợp lệ"),
  password: yup.string().required("Trường này là bắt buộc"),
});

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<{ email: string; password: string }>({
    resolver: yupResolver(loginSchema),
  });

  const { updateUser } = useAuth();

  const onClick = handleSubmit(async (data) => {
    const response = (
      await axios.post("login", data, { withCredentials: true })
    ).data;

    updateUser(response);
  });

  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <AuthHeader>Đăng nhập</AuthHeader>
      <div className="space-y-2 mb-4">
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
      </div>
      <div className="mb-4">
        <Button onClick={onClick} loading={isSubmitting}>
          Đăng nhập
        </Button>
      </div>
      <div className="border-t h-0 mb-3" />
      <div className="text-sm font-medium">
        Chưa có tài khoản?{" "}
        <Link to="/signup">
          <span className="link">Đăng ký</span>
        </Link>
      </div>
    </>
  );
};
