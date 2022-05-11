import jwt, { JwtPayload } from "jsonwebtoken";
import moment, { Moment } from "moment";
import { TokenType } from "../@types/token.type";
import authConfig from "../config/auth.config";
import { User } from "../entities";

class TokenService {
  public static generateJwtToken = (
    userId: string,
    expires: Moment,
    type: TokenType
  ) => {
    const payload: JwtPayload = {
      sub: userId,
      type,
      iat: moment().unix(),
      exp: expires.unix(),
    };
    return jwt.sign(payload, authConfig.jwtSecret);
  };

  public static verifyJwtToken = async (token: string) => {
    const payload = jwt.verify(token, authConfig.jwtSecret);
    return payload;
  };

  public static generateAuthTokens = async (user: User) => {
    const accessTokenExpires = moment().add(
      authConfig.accessExpirationMinutes,
      "minutes"
    );
    const accessToken = this.generateJwtToken(
      user.id,
      accessTokenExpires,
      TokenType.ACCESS
    );

    const refreshTokenExpires = moment().add(
      authConfig.refreshExpirationDays,
      "days"
    );
    const refreshToken = this.generateJwtToken(
      user.id,
      refreshTokenExpires,
      TokenType.REFRESH
    );

    return {
      access: accessToken,
      refresh: refreshToken,
    };
  };

  public static generateResetPasswordToken = async (user: User) => {
    const expires = moment().add(
      authConfig.resetPasswordExpirationMinutes,
      "minutes"
    );
    const resetPasswordToken = this.generateJwtToken(
      user.id,
      expires,
      TokenType.RESET_PASSWORD
    );
    return resetPasswordToken;
  };

  public static generateVerifyEmailToken = async (user: User) => {
    const expires = moment().add(
      authConfig.verifyEmailExpirationMinutes,
      "minutes"
    );
    const verifyEmailToken = this.generateJwtToken(
      user.id,
      expires,
      TokenType.VERIFY_EMAIL
    );
    return verifyEmailToken;
  };
}

export default TokenService;
