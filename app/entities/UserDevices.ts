import {
  Entity,
  ManyToOne,
  OptionalProps,
  Property,
  Unique,
} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { Device } from "./Device";
import { User } from "./User";

@Entity()
@Unique({ properties: ["user", "device"] })
export class UserDevices extends BaseEntity {
  [OptionalProps]?: "createdAt" | "updatedAt";

  @ManyToOne()
  user: User;

  @ManyToOne()
  device: Device;

  @Property()
  name: string;
}
