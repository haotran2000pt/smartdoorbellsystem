import { User as UserModel } from "../entities";

declare global {
  namespace Express {
    interface Request {
      currentUser: UserModel;
    }
  }
}
