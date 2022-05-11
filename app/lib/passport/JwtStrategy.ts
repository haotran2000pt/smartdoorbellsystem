import { JwtPayload } from "jsonwebtoken";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  VerifiedCallback,
} from "passport-jwt";
import authConfig from "../../config/auth.config";
import { UserService } from "../../services/user.service";
import { TokenType } from "../../@types/token.type";

const jwtOptions = {
  secretOrKey: authConfig.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: JwtPayload, verify: VerifiedCallback) => {
  try {
    if (payload.type !== TokenType.ACCESS) {
      throw new Error("Invalid token type");
    }
    const user = await UserService.get(payload.sub as string);
    if (!user) {
      return verify(null, false);
    }
    verify(null, user);
  } catch (error: any) {
    verify(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;
