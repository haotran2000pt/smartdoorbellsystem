import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  OptionalProps,
  Property,
  Unique,
} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { UserDevices } from "./UserDevices";

enum UserRole {
  USER,
  ADMIN,
}

@Entity()
export class User extends BaseEntity {
  [OptionalProps]?: "createdAt" | "updatedAt" | "role";

  @Property()
  username: string;

  @Property()
  @Unique()
  email: string;

  @Property({ hidden: true })
  password: string;

  @Enum()
  role: UserRole = UserRole.USER;

  @OneToMany(() => UserDevices, (o) => o.user)
  userDevices = new Collection<UserDevices>(this);
}
