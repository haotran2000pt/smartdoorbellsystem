import _ from "lodash";
import { User } from "../entities";
import { DI } from "../server";

export class UserService {
  public static async get(id: string) {
    const user = await DI.userRepository.findOneOrFail(id);

    return user;
  }

  public static async update(
    currentUser: string | User,
    fields: Partial<User>
  ) {
    let user: User;
    if (_.isString(currentUser)) {
      user = await DI.userRepository.findOneOrFail(currentUser);
    } else {
      user = currentUser;
    }
    DI.userRepository.assign(user, fields);

    await DI.userRepository.persistAndFlush(user);
    return user;
  }
}
