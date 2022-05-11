import "jsonwebtoken";
import { TokenType } from "./token.type";

declare module "jsonwebtoken" {
  interface JwtPayload {
    type: TokenType;
  }

  export function verify(
    token: string,
    secretOrPublicKey: Secret,
    options?: VerifyOptions & { complete?: false }
  ): JwtPayload;

  export function verify(
    token: string,
    secretOrPublicKey: Secret,
    options?: VerifyOptions
  ): Jwt | JwtPayload;
}
