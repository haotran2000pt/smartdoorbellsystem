import { DI } from "../server";
import bcrypt from "bcrypt";
import _ from "lodash";
import TokenService from "./token.service";
import { TokenType } from "../@types/token.type";
import NotificationService from "./notification.service";

class AuthService {
  public static loginWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    const user = await DI.userRepository.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }

    const tokens = await TokenService.generateAuthTokens(user);

    return { user, tokens };
  };

  public static refreshAuth = async (refreshToken: string) => {
    try {
      const payload = await TokenService.verifyJwtToken(refreshToken);
      if (payload.type !== TokenType.REFRESH) {
        throw new Error();
      }
      const user = await DI.userRepository.findOne(payload.sub as string);
      if (!user) {
        throw new Error();
      }
      return await TokenService.generateAuthTokens(user);
    } catch (error) {
      return null;
    }
  };

  public static register = async (userData: {
    email: string;
    username: string;
    password: string;
  }) => {
    const { password, ...registerData } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = DI.userRepository.create({
      password: hashedPassword,
      ...registerData,
    });

    await DI.userRepository.persist(user).flush();

    const tokens = await TokenService.generateAuthTokens(user);

    await NotificationService.createSystemNotification({
      title: "Đăng ký tài khoản thành công",
      description: `Cảm ơn bạn đã đăng ký dịch vụ của chúng tôi. Vào phần thiết bị và thêm thiết bị để nhận thông báo từ camera bạn nhé!`,
      user: user.id,
    });

    return { user, tokens };
  };
}

export default AuthService;
